import { useEffect, useRef, useState } from 'react'

export type ColorMode = 'light' | 'dark'
export const COLOR_MODE_STORAGE_KEY = 'time-atlas:color-mode:v1'
export const COLOR_MODE_QUERY = '(prefers-color-scheme: dark)'

export function savedColorMode(): ColorMode | null {
  try {
    const value = localStorage.getItem(COLOR_MODE_STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}
export function readColorMode(): ColorMode {
  const saved = savedColorMode()
  if (saved) return saved
  try {
    // Also retain the old choice if the early migration could not write at quota.
    if (
      localStorage.getItem(COLOR_MODE_STORAGE_KEY) === null &&
      localStorage.getItem('time-atlas:pillar-theme:v1') === 'night'
    )
      return 'dark'
  } catch {
    /* The system preference remains available without storage. */
  }
  return window.matchMedia(COLOR_MODE_QUERY).matches ? 'dark' : 'light'
}
export function applyColorMode(mode: ColorMode) {
  document.documentElement.dataset.colorMode = mode
  document.documentElement.style.colorScheme = mode
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', mode === 'dark' ? '#142127' : '#fffefb')
}
export function useColorMode(): readonly [ColorMode, () => void] {
  const [mode, setMode] = useState(readColorMode)
  const explicit = useRef(savedColorMode() !== null)
  useEffect(() => applyColorMode(mode), [mode])
  useEffect(() => {
    const media = window.matchMedia(COLOR_MODE_QUERY)
    const systemChange = () => {
      if (!explicit.current) setMode(readColorMode())
    }
    const storageChange = (event: StorageEvent) => {
      if (event.key === COLOR_MODE_STORAGE_KEY || event.key === null) {
        explicit.current = savedColorMode() !== null
        setMode(readColorMode())
      }
    }
    media.addEventListener('change', systemChange)
    window.addEventListener('storage', storageChange)
    return () => {
      media.removeEventListener('change', systemChange)
      window.removeEventListener('storage', storageChange)
    }
  }, [])
  return [
    mode,
    () => {
      const next = mode === 'light' ? 'dark' : 'light'
      explicit.current = true
      setMode(next)
      try {
        localStorage.setItem(COLOR_MODE_STORAGE_KEY, next)
      } catch {
        /* Session switching still works without storage. */
      }
    },
  ]
}
