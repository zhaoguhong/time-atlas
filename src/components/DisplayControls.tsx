import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Expand, Minimize, MonitorDown, Scan, X } from 'lucide-react'
import { useDisplayMode } from '../hooks/use-display-mode'
import '../display-controls.css'

type DisplayControlsProps = {
  onAction: () => void
  onFocusMode: () => void
}

function installationSteps() {
  const agent = navigator.userAgent
  if (/MicroMessenger/i.test(agent)) {
    return [
      '点击微信右上角的「…」，选择在浏览器中打开。',
      '在浏览器菜单中选择「添加到主屏幕」或「安装应用」；iPhone 可用 Safari 的分享菜单。',
      '以后从手机主屏幕上的「山河纪」图标进入。',
    ]
  }
  if (
    /iPhone|iPad|iPod/i.test(agent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  ) {
    return [
      '打开浏览器的分享菜单，选择「添加到主屏幕」；若没有这一项，可先用 Safari 打开本站。',
      '若出现「作为网页 App 打开」选项，请保持开启，再点「添加」。',
      '以后从主屏幕上的「山河纪」图标进入，即可使用独立窗口。',
    ]
  }
  if (/Android/i.test(agent)) {
    return [
      '打开浏览器右上角的菜单。',
      '选择「安装应用」或「添加到主屏幕」，按提示完成添加。',
      '以后从主屏幕上的「山河纪」图标进入；如果仍在浏览器标签页打开，可换用支持安装网页应用的浏览器。',
    ]
  }
  return [
    '在浏览器地址栏或菜单中查找「安装应用」或「将此网站安装为应用」。',
    '完成安装后，从「山河纪」应用图标打开，即可使用独立窗口。',
    '如果浏览器没有安装入口，可以继续在网页中使用全屏或专注模式。',
  ]
}

export default function DisplayControls({ onAction, onFocusMode }: DisplayControlsProps) {
  const display = useDisplayMode()
  const [explanation, setExplanation] = useState<'fullscreen' | 'install' | null>(null)
  const [installError, setInstallError] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const restoreFocus = useRef(true)
  const focusFrame = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current)
    },
    [],
  )

  useEffect(() => {
    if (display.fullscreenError) setExplanation('fullscreen')
  }, [display.fullscreenError])

  useEffect(() => {
    const currentDialog = dialog.current
    if (!currentDialog) return
    if (explanation) {
      if (!currentDialog.open) currentDialog.showModal()
      closeButton.current?.focus({ preventScroll: true })
    } else if (currentDialog.open) currentDialog.close()
  }, [explanation])

  function startAction(target: HTMLElement) {
    opener.current = target
    restoreFocus.current = true
    onAction()
  }

  function closeExplanation() {
    display.clearFullscreenError()
    setExplanation(null)
    dialog.current?.close()
  }

  function returnFocus() {
    if (dialog.current?.open) return
    setExplanation(null)
    if (!restoreFocus.current) return
    if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current)
    // Wait for pending buttons, closed menus and installed-app visibility to commit.
    focusFrame.current = requestAnimationFrame(() => {
      focusFrame.current = null
      if (!restoreFocus.current || document.querySelector('dialog[open]')) return
      const focusedWorkspace = document.querySelector('.atlas-app[data-focus-mode="true"]')
      const candidates = focusedWorkspace
        ? [focusedWorkspace.querySelector<HTMLElement>('.focus-mode-exit')]
        : [
            opener.current,
            document.querySelector<HTMLElement>('.header-more'),
            document.querySelector<HTMLElement>('.display-mode-button'),
          ]
      const target = candidates.find(
        (candidate) =>
          candidate?.isConnected &&
          candidate.getClientRects().length > 0 &&
          !candidate.matches(':disabled, [aria-disabled="true"]') &&
          !candidate.closest('[inert]') &&
          getComputedStyle(candidate).visibility !== 'hidden',
      )
      target?.focus({ preventScroll: true })
    })
  }

  async function install(target: HTMLElement) {
    startAction(target)
    setInstallError(false)
    if (display.canInstall) {
      const outcome = await display.promptInstall()
      if (outcome === 'accepted' || outcome === 'dismissed') {
        returnFocus()
        return
      }
      setInstallError(outcome === 'error')
    }
    setExplanation('install')
  }

  const fullscreenLabel = display.fullscreen ? '退出全屏' : '全屏浏览'
  const title = explanation === 'install' ? '添加到主屏幕' : '全屏浏览'

  return (
    <>
      <button
        className={`icon-button display-mode-button ${display.fullscreen ? 'active' : ''}`}
        aria-label={fullscreenLabel}
        title={fullscreenLabel}
        aria-pressed={display.fullscreen}
        disabled={display.fullscreenPending}
        onClick={(event) => {
          startAction(event.currentTarget)
          display.clearFullscreenError()
          if (!display.canFullscreen && !display.fullscreen) setExplanation('fullscreen')
          else {
            void display.toggleFullscreen().then((completed) => {
              if (completed) returnFocus()
              else setExplanation('fullscreen')
            })
          }
        }}
      >
        {display.fullscreen ? (
          <Minimize size={18} aria-hidden="true" />
        ) : (
          <Expand size={18} aria-hidden="true" />
        )}
      </button>
      {!display.isInstalled && (
        <button
          className="icon-button display-mode-button"
          aria-label="添加到主屏幕"
          title="添加到主屏幕"
          disabled={display.installPending}
          onClick={(event) => void install(event.currentTarget)}
        >
          <MonitorDown size={18} aria-hidden="true" />
        </button>
      )}
      {createPortal(
        <dialog
          ref={dialog}
          className="display-mode-dialog"
          aria-labelledby="display-mode-title"
          aria-describedby="display-mode-description"
          onCancel={(event) => {
            event.preventDefault()
            closeExplanation()
          }}
          onClose={returnFocus}
        >
          <div className="display-mode-dialog-heading">
            <h2 id="display-mode-title">{title}</h2>
            <button
              ref={closeButton}
              className="display-mode-close"
              aria-label="关闭显示说明"
              onClick={closeExplanation}
            >
              <X size={21} aria-hidden="true" />
            </button>
          </div>
          {explanation === 'install' ? (
            <>
              <p id="display-mode-description">
                {installError
                  ? '浏览器未能打开安装提示，也可以按下面的步骤添加。'
                  : '从主屏幕以独立网页应用打开，可以腾出浏览器地址栏占用的空间。'}
              </p>
              <ol className="display-mode-steps">
                {installationSteps().map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <p className="display-mode-note">
                添加后仍需联网加载地图和内容。菜单名称因浏览器版本而异。
              </p>
              <div className="display-mode-dialog-actions">
                <button className="display-mode-primary" onClick={closeExplanation}>
                  知道了
                </button>
              </div>
            </>
          ) : (
            <>
              <p id="display-mode-description">
                {display.fullscreenError ?? '当前浏览器暂不能让整个网页进入全屏。'}
              </p>
              <p>
                专注模式会收起山河纪的顶部导航，为地图和阅读腾出空间；浏览器地址栏仍由浏览器控制。
              </p>
              <div className="display-mode-dialog-actions">
                <button
                  className="display-mode-primary"
                  onClick={() => {
                    restoreFocus.current = false
                    closeExplanation()
                    onAction()
                    onFocusMode()
                  }}
                >
                  <Scan size={17} aria-hidden="true" />
                  进入专注模式
                </button>
                {!display.isInstalled && (
                  <button
                    className="display-mode-secondary"
                    onClick={() => {
                      setInstallError(false)
                      setExplanation('install')
                    }}
                  >
                    <MonitorDown size={17} aria-hidden="true" />
                    添加到主屏幕
                  </button>
                )}
              </div>
            </>
          )}
        </dialog>,
        document.body,
      )}
    </>
  )
}
