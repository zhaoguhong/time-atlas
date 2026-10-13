import { useEffect, useRef, type RefObject } from 'react'
import { BookOpen, ChevronUp, Maximize2, Minimize2, PanelRightClose } from 'lucide-react'

type View = 'map' | 'split' | 'reading'
const views: View[] = ['map', 'split', 'reading']
const mobileQuery = '(max-width: 700px), (max-width: 1000px) and (max-height: 540px)'
// The width floor keeps a portrait phone's keyboard from switching to side-by-side panes.
const landscapeQuery =
  '(min-width: 560px) and (max-width: 1000px) and (max-height: 540px) and (orientation: landscape)'

/** Shares the existing reading state/history; only an active drag has a pixel height. */
export default function MobileSheetHandle({
  view,
  title,
  panelRef,
  onView,
}: {
  view: View
  title: string
  panelRef: RefObject<HTMLDivElement | null>
  onView: (view: View) => void
}) {
  const handleRef = useRef<HTMLButtonElement>(null)
  const suppressClick = useRef(false)
  useEffect(() => {
    const handle = handleRef.current!
    const panel = panelRef.current!
    const sheet = handle.closest<HTMLElement>('.story-panel')!
    const app = handle.closest<HTMLElement>('.atlas-app')!
    const media = matchMedia(mobileQuery)
    const landscape = matchMedia(landscapeQuery)
    let gesture: {
      x: number
      y: number
      dy: number
      height: number
      maximum: number
      fromContent: boolean
      atTop: boolean
      claimed: boolean
    } | null = null
    let frame = 0
    const clear = () => {
      cancelAnimationFrame(frame)
      app.style.removeProperty('--sheet-drag-height')
      delete app.dataset.sheetDragging
      gesture = null
    }
    const start = (x: number, y: number, fromContent: boolean) => {
      if (!media.matches || landscape.matches) return
      suppressClick.current = false
      const maximum =
        app.querySelector('.timeline')!.getBoundingClientRect().top -
        app.querySelector('.topbar')!.getBoundingClientRect().bottom
      gesture = {
        x,
        y,
        dy: 0,
        height: sheet.getBoundingClientRect().height,
        maximum,
        fromContent,
        atTop: panel.scrollTop <= 1,
        claimed: false,
      }
    }
    const move = (x: number, y: number, event: Event) => {
      if (!gesture) return
      const dx = x - gesture.x
      const dy = y - gesture.y
      if (!gesture.claimed) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) < 8) return
        // Let horizontal controls and an already-scrolled article keep their gesture.
        if (
          Math.abs(dx) > Math.abs(dy) ||
          (gesture.fromContent && (dy > 0 ? !gesture.atTop : view === 'reading'))
        ) {
          gesture = null
          return
        }
        gesture.claimed = true
        suppressClick.current = true
      }
      if (event.cancelable) event.preventDefault()
      gesture.dy = dy
      const height = Math.max(44, Math.min(gesture.maximum, gesture.height - dy))
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        app.style.setProperty('--sheet-drag-height', `${height}px`)
        app.dataset.sheetDragging = 'true'
      })
    }
    const finish = (cancelled = false) => {
      if (!gesture) return
      const { dy, claimed, height, maximum } = gesture
      if (claimed && !cancelled) {
        const splitHeight = Math.max(44, maximum - Math.max(160, Math.min(maximum * 0.37, 280)))
        const stops = [44, splitHeight, maximum]
        const target = Math.max(44, Math.min(maximum, height - dy))
        let index = stops.reduce(
          (best, stop, i) => (Math.abs(stop - target) < Math.abs(stops[best] - target) ? i : best),
          0,
        )
        // A deliberate short swipe still moves one stop, including on tall phones.
        if (Math.abs(dy) >= 40 && index === views.indexOf(view))
          index = Math.max(0, Math.min(2, index + (dy < 0 ? 1 : -1)))
        if (index === 0 && sheet.contains(document.activeElement))
          handle.focus({ preventScroll: true })
        onView(views[index])
      }
      clear()
    }
    const down = (e: PointerEvent) => {
      if (!e.isPrimary || e.button !== 0) return
      start(e.clientX, e.clientY, false)
      if (gesture) handle.setPointerCapture(e.pointerId)
    }
    const pointerMove = (e: PointerEvent) => move(e.clientX, e.clientY, e)
    const up = () => finish()
    const cancel = () => finish(true)
    const touchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) {
        cancel()
        return
      }
      const target = e.target as HTMLElement
      if (target.closest('input, select, textarea, [contenteditable="true"]')) return
      start(e.touches[0].clientX, e.touches[0].clientY, true)
    }
    const touchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) {
        cancel()
        return
      }
      move(e.touches[0].clientX, e.touches[0].clientY, e)
    }
    const resetClick = () => {
      suppressClick.current = false
    }
    const stopClick = (e: MouseEvent) => {
      if (suppressClick.current) {
        e.preventDefault()
        e.stopPropagation()
        suppressClick.current = false
      }
    }
    handle.addEventListener('pointerdown', down)
    handle.addEventListener('pointermove', pointerMove)
    handle.addEventListener('pointerup', up)
    handle.addEventListener('pointercancel', cancel)
    handle.addEventListener('lostpointercapture', cancel)
    panel.addEventListener('touchstart', touchStart, { passive: true })
    panel.addEventListener('touchmove', touchMove, { passive: false })
    panel.addEventListener('touchend', up)
    panel.addEventListener('touchcancel', cancel)
    sheet.addEventListener('pointerdown', resetClick, true)
    sheet.addEventListener('click', stopClick, true)
    window.addEventListener('resize', cancel)
    return () => {
      clear()
      handle.removeEventListener('pointerdown', down)
      handle.removeEventListener('pointermove', pointerMove)
      handle.removeEventListener('pointerup', up)
      handle.removeEventListener('pointercancel', cancel)
      handle.removeEventListener('lostpointercapture', cancel)
      panel.removeEventListener('touchstart', touchStart)
      panel.removeEventListener('touchmove', touchMove)
      panel.removeEventListener('touchend', up)
      panel.removeEventListener('touchcancel', cancel)
      sheet.removeEventListener('pointerdown', resetClick, true)
      sheet.removeEventListener('click', stopClick, true)
      window.removeEventListener('resize', cancel)
    }
  }, [view, onView, panelRef])

  return (
    <>
      <div className="mobile-landscape-controls">
        <span className="landscape-panel-title" title={title}>
          {title}
        </span>
        {view !== 'map' && (
          <button
            className="landscape-reading-toggle"
            aria-label={view === 'reading' ? '返回地图与资料' : '展开阅读'}
            title={view === 'reading' ? '返回地图与资料' : '展开阅读'}
            aria-controls="history-reading-content"
            onClick={() => onView(view === 'reading' ? 'split' : 'reading')}
          >
            {view === 'reading' ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          </button>
        )}
        <button
          className="landscape-panel-toggle"
          aria-label={view === 'map' ? '打开资料面板' : '收起资料面板'}
          title={view === 'map' ? `打开资料：${title}` : '收起资料面板'}
          aria-expanded={view !== 'map'}
          aria-controls="history-reading-content"
          onClick={() => onView(view === 'map' ? 'split' : 'map')}
        >
          {view === 'map' ? <BookOpen size={18} /> : <PanelRightClose size={18} />}
          {view === 'map' && <span>资料</span>}
        </button>
      </div>
      <button
        ref={handleRef}
        className="mobile-sheet-handle"
        aria-label="调整资料面板高度"
        aria-expanded={view !== 'map'}
        aria-controls="history-reading-content"
        aria-describedby="sheet-instructions"
        onClick={() => onView(views[(views.indexOf(view) + 1) % views.length])}
        onKeyDown={(event) => {
          const index = views.indexOf(view)
          const next =
            event.key === 'ArrowUp'
              ? Math.min(2, index + 1)
              : event.key === 'ArrowDown'
                ? Math.max(0, index - 1)
                : event.key === 'Home'
                  ? 0
                  : event.key === 'End'
                    ? 2
                    : null
          if (next !== null) {
            event.preventDefault()
            onView(views[next])
          }
        }}
      >
        <span className="sheet-grip" aria-hidden="true" />
        <span className="sheet-title">{title}</span>
        <span id="sheet-instructions" className="sheet-hint">
          {view === 'map' ? '上拉查看资料' : view === 'split' ? '上拉展开 · 下拉收起' : '下拉收起'}
        </span>
        <ChevronUp size={16} aria-hidden="true" />
      </button>
    </>
  )
}
