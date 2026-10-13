import { useEffect, useRef, useState } from 'react'

type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null
  webkitFullscreenEnabled?: boolean
  webkitExitFullscreen?: () => Promise<void> | void
}

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void
}

type InstallPromptEvent = Event & {
  prompt: () => Promise<void> | void
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function fullscreenElement() {
  const currentDocument = document as FullscreenDocument
  return currentDocument.fullscreenElement ?? currentDocument.webkitFullscreenElement ?? null
}

function supportsFullscreen() {
  const currentDocument = document as FullscreenDocument
  const root = document.documentElement as FullscreenElement
  return Boolean(
    (typeof root.requestFullscreen === 'function' && currentDocument.fullscreenEnabled !== false) ||
    (typeof root.webkitRequestFullscreen === 'function' &&
      currentDocument.webkitFullscreenEnabled !== false),
  )
}

function standaloneDisplay() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

export function useDisplayMode() {
  const [fullscreen, setFullscreen] = useState(() => Boolean(fullscreenElement()))
  const [canFullscreen] = useState(supportsFullscreen)
  const [fullscreenPending, setFullscreenPending] = useState(false)
  const [fullscreenError, setFullscreenError] = useState<string | null>(null)
  const [standalone, setStandalone] = useState(standaloneDisplay)
  const [installed, setInstalled] = useState(false)
  const [canInstall, setCanInstall] = useState(false)
  const [installPending, setInstallPending] = useState(false)
  const installPrompt = useRef<InstallPromptEvent | null>(null)
  const fullscreenRequest = useRef(false)
  const installationRequest = useRef(false)

  useEffect(() => {
    const updateFullscreen = () => setFullscreen(Boolean(fullscreenElement()))
    const reportFullscreenError = () => {
      setFullscreenError('浏览器未能切换全屏，请重试，或选择下面的浏览方式。')
      updateFullscreen()
    }
    const displayQuery = window.matchMedia('(display-mode: standalone)')
    const updateDisplay = () => setStandalone(standaloneDisplay())
    const retainInstallPrompt = (event: Event) => {
      const promptEvent = event as InstallPromptEvent
      if (typeof promptEvent.prompt !== 'function' || !promptEvent.userChoice) return
      event.preventDefault()
      installPrompt.current = promptEvent
      setCanInstall(true)
    }
    const installedApp = () => {
      installPrompt.current = null
      setCanInstall(false)
      setInstalled(true)
    }

    document.addEventListener('fullscreenchange', updateFullscreen)
    document.addEventListener('webkitfullscreenchange', updateFullscreen)
    document.addEventListener('fullscreenerror', reportFullscreenError)
    document.addEventListener('webkitfullscreenerror', reportFullscreenError)
    window.addEventListener('beforeinstallprompt', retainInstallPrompt)
    window.addEventListener('appinstalled', installedApp)
    window.addEventListener('pageshow', updateDisplay)
    displayQuery.addEventListener('change', updateDisplay)
    return () => {
      document.removeEventListener('fullscreenchange', updateFullscreen)
      document.removeEventListener('webkitfullscreenchange', updateFullscreen)
      document.removeEventListener('fullscreenerror', reportFullscreenError)
      document.removeEventListener('webkitfullscreenerror', reportFullscreenError)
      window.removeEventListener('beforeinstallprompt', retainInstallPrompt)
      window.removeEventListener('appinstalled', installedApp)
      window.removeEventListener('pageshow', updateDisplay)
      displayQuery.removeEventListener('change', updateDisplay)
    }
  }, [])

  async function toggleFullscreen(): Promise<boolean> {
    if (fullscreenRequest.current) return false
    const currentDocument = document as FullscreenDocument
    const root = document.documentElement as FullscreenElement
    fullscreenRequest.current = true
    setFullscreenPending(true)
    setFullscreenError(null)
    try {
      if (fullscreenElement()) {
        if (typeof currentDocument.exitFullscreen === 'function')
          await currentDocument.exitFullscreen()
        else if (currentDocument.webkitExitFullscreen) await currentDocument.webkitExitFullscreen()
        else throw new Error('Fullscreen exit is unavailable')
      } else if (
        typeof root.requestFullscreen === 'function' &&
        currentDocument.fullscreenEnabled !== false
      ) {
        await root.requestFullscreen()
      } else if (
        root.webkitRequestFullscreen &&
        currentDocument.webkitFullscreenEnabled !== false
      ) {
        await root.webkitRequestFullscreen()
      } else {
        throw new Error('Fullscreen is unavailable')
      }
      setFullscreen(Boolean(fullscreenElement()))
      return true
    } catch {
      setFullscreenError('浏览器未能切换全屏，请重试，或选择下面的浏览方式。')
      setFullscreen(Boolean(fullscreenElement()))
      return false
    } finally {
      fullscreenRequest.current = false
      setFullscreenPending(false)
    }
  }

  async function promptInstall(): Promise<'accepted' | 'dismissed' | 'unavailable' | 'error'> {
    const promptEvent = installPrompt.current
    if (!promptEvent || installationRequest.current) return 'unavailable'
    // A deferred browser prompt can only be consumed once, even if the user dismisses it.
    installPrompt.current = null
    installationRequest.current = true
    setCanInstall(false)
    setInstallPending(true)
    try {
      await promptEvent.prompt()
      return (await promptEvent.userChoice).outcome
    } catch {
      return 'error'
    } finally {
      installationRequest.current = false
      setInstallPending(false)
    }
  }

  return {
    fullscreen,
    canFullscreen,
    fullscreenPending,
    fullscreenError,
    clearFullscreenError: () => setFullscreenError(null),
    toggleFullscreen,
    isInstalled: installed || standalone,
    canInstall,
    installPending,
    promptInstall,
  }
}
