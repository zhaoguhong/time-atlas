import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Expand, X } from 'lucide-react'
import type { ArticleMap } from '../types'
import type { TopicEvent } from '../lib/topic-reading-presentation'
import { formatYear } from '../lib/history'
import CanvasBoundary from './CanvasBoundary'
import '../topic-inline-map.css'
const TopicInlineMap = lazy(() => import('./TopicInlineMap'))

/** Create a canvas only on request and release it when the reader moves away. */
export default function ArticleMapFigure({
  map,
  eventById,
}: {
  map: ArticleMap
  eventById: ReadonlyMap<string, TopicEvent>
}) {
  const ref = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const expand = useRef<HTMLButtonElement>(null)
  const inlineMount = useRef<HTMLDivElement>(null)
  const dialogMount = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const wasEnlarged = useRef(false)
  const [mapHost] = useState(() => {
    const element = document.createElement('div')
    element.className = 'topic-map-host'
    return element
  })
  const [near, setNear] = useState(false)
  const [collapsed, setCollapsed] = useState(true)
  const [enlarged, setEnlarged] = useState(false)
  const [inlineHeight, setInlineHeight] = useState(450)
  // Move the existing map rather than creating another WebGL context. Its camera,
  // selections and loaded data survive opening and closing the enlarged view.
  useLayoutEffect(() => {
    const destination = enlarged ? dialogMount.current : inlineMount.current
    destination?.append(mapHost)
    const element = dialog.current
    if (enlarged) {
      if (element && !element.open) element.showModal()
    } else {
      if (element?.open) element.close()
      if (wasEnlarged.current) expand.current?.focus({ preventScroll: true })
    }
    wasEnlarged.current = enlarged
  }, [enlarged, mapHost])
  useEffect(
    () => () => {
      dialog.current?.close()
      mapHost.remove()
    },
    [mapHost],
  )
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      (entries) => {
        setNear(entries.some((entry) => entry.isIntersecting))
      },
      { rootMargin: '240px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  const placeholder = (
    <div className="topic-map-placeholder" role="status">
      <strong>{map.title}</strong>
      <span>{formatYear(map.year)} · 展开后查看交互地图</span>
      <p>{map.caption}</p>
    </div>
  )
  return (
    <figure
      ref={ref}
      className="topic-inline-map-entry topic-map-figure"
      data-article-block={`map-${map.id}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && !collapsed && !enlarged) {
          event.stopPropagation()
          event.preventDefault()
          setCollapsed(true)
          toggle.current?.focus({ preventScroll: true })
        }
      }}
    >
      <div
        ref={inlineMount}
        className="topic-map-inline-mount"
        style={enlarged ? { height: inlineHeight } : undefined}
      >
        {enlarged && (
          <div className="topic-map-expanded-placeholder" aria-hidden="true">
            <strong>{map.title}</strong>
            <span>正在放大查看地图</span>
          </div>
        )}
        {!collapsed && !near && placeholder}
      </div>
      {!collapsed &&
        (near || enlarged) &&
        createPortal(
          <CanvasBoundary
            onRetry={() => {
              setNear(false)
              requestAnimationFrame(() => setNear(true))
            }}
          >
            <Suspense fallback={placeholder}>
              <TopicInlineMap map={map} eventById={eventById} expanded={enlarged} />
            </Suspense>
          </CanvasBoundary>,
          mapHost,
        )}
      <div className="topic-map-actions">
        {!collapsed && (
          <button
            ref={expand}
            className="topic-map-enlarge"
            aria-label={`放大查看地图：${map.title}`}
            aria-haspopup="dialog"
            onClick={() => {
              setInlineHeight(inlineMount.current?.getBoundingClientRect().height ?? 450)
              setNear(true)
              setEnlarged(true)
            }}
          >
            <Expand size={15} />
            放大查看地图
          </button>
        )}
        <button
          ref={toggle}
          className="topic-map-visibility"
          aria-expanded={!collapsed}
          aria-label={`${collapsed ? '展开' : '收起'}地图：${map.title}`}
          onClick={() => {
            setCollapsed(!collapsed)
            setNear(true)
          }}
        >
          {collapsed ? `${map.title} · ${formatYear(map.year)} · 展开地图` : '收起地图'}
        </button>
      </div>
      {createPortal(
        <dialog
          ref={dialog}
          className="topic-map-dialog"
          aria-label={`放大地图：${map.title}`}
          onCancel={(event) => {
            event.preventDefault()
            event.stopPropagation()
            setEnlarged(false)
          }}
          onClick={(event) => {
            if (event.target === dialog.current) setEnlarged(false)
          }}
        >
          <header className="topic-map-dialog-toolbar">
            <span>章节地图 · {formatYear(map.year)}</span>
            <button aria-label="关闭地图，返回文章" onClick={() => setEnlarged(false)}>
              <X size={22} />
            </button>
          </header>
          <div ref={dialogMount} className="topic-map-dialog-content" />
        </dialog>,
        document.body,
      )}
    </figure>
  )
}
