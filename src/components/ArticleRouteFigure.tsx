import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Expand, Minus, Plus } from 'lucide-react'
import type { TopicRoute } from '../data/topic-routes'
import CanvasBoundary from './CanvasBoundary'

const RouteOverviewMap = lazy(() => import('./RouteOverviewMap'))
const TopicRouteReader = lazy(() => import('./TopicRouteReader'))
const routeColors = ['#a94729', '#376f97', '#72558c', '#477162', '#9a742b']

/** The article and its enlarged reader use the same sourced route definitions. */
export default function ArticleRouteFigure({
  routes,
  title,
}: {
  routes: Pick<TopicRoute, 'id' | 'name' | 'period'>[]
  title: string
}) {
  const figure = useRef<HTMLElement>(null)
  const enlarge = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const [near, setNear] = useState(false)
  const [collapsed, setCollapsed] = useState(true)
  const [opened, setOpened] = useState<{ routeId?: string; selected?: number } | null>(null)
  const routeIds = useMemo(() => routes.map((route) => route.id), [routes])
  useEffect(() => {
    const element = figure.current
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
  function open(routeId?: string, selected = -1) {
    returnFocus.current = document.activeElement as HTMLElement | null
    setOpened({ routeId, selected })
  }
  function close() {
    setOpened(null)
    requestAnimationFrame(() => {
      const target = returnFocus.current?.isConnected ? returnFocus.current : enlarge.current
      target?.focus({ preventScroll: true })
    })
  }
  if (!routes.length) return null
  const placeholder = (
    <div className="topic-route-placeholder" role="status">
      <strong>{title}</strong>
      <span>{opened ? '正在大图中阅读' : '展开后查看交互地图'}</span>
    </div>
  )
  return (
    <figure
      ref={figure}
      id="topic-route-overview"
      tabIndex={-1}
      className="topic-route-entry topic-route-overview"
      data-article-block="route-overview"
      aria-label={title}
    >
      <figcaption className="topic-route-overview-heading">
        <strong>{title}</strong>
        <span>路线总览 · {routes.length} 条路线</span>
      </figcaption>
      {!collapsed &&
        (near && !opened ? (
          <CanvasBoundary onRetry={() => window.location.reload()}>
            <Suspense fallback={placeholder}>
              <RouteOverviewMap
                routeIds={routeIds}
                onSelect={(routeId, index) => open(routeId, index)}
              />
            </Suspense>
          </CanvasBoundary>
        ) : (
          placeholder
        ))}
      <div className="topic-route-legend" aria-label="总览中的路线">
        {routes.map((route, index) => (
          <button key={route.id} data-route-id={route.id} onClick={() => open(route.id)}>
            <span style={{ background: routeColors[index % routeColors.length] }} />
            <span>
              {route.name}
              <small>{route.period}</small>
            </span>
          </button>
        ))}
      </div>
      <p className="topic-route-overview-caption">
        各条路线的年代见图例，虚线表示主要地点间的示意联系。点地名或选择路线，可放大并逐站阅读。
      </p>
      <div className="topic-route-overview-actions">
        <button ref={enlarge} className="topic-route-open" onClick={() => open()}>
          <Expand size={16} />
          放大查看路线与地点
        </button>
        <button
          className="topic-route-visibility"
          aria-expanded={!collapsed}
          aria-label={`${collapsed ? '展开' : '收起'}路线总览`}
          onClick={() => {
            setCollapsed(!collapsed)
            setNear(true)
          }}
        >
          {collapsed ? <Plus size={14} /> : <Minus size={14} />}
          {collapsed ? '展开地图' : '收起地图'}
        </button>
      </div>
      {opened && (
        <CanvasBoundary onRetry={() => window.location.reload()}>
          <Suspense fallback={<p role="status">正在打开路线…</p>}>
            <TopicRouteReader
              routeIds={routeIds}
              initialRouteId={opened.routeId}
              initialSelected={opened.selected}
              onClose={close}
            />
          </Suspense>
        </CanvasBoundary>
      )}
    </figure>
  )
}
