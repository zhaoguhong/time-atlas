import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ArrowRight, X, Expand } from 'lucide-react'
import { topicRouteById } from '../data/topic-routes'
import RouteMap from './RouteMap'
import Sources from './Sources'
import '../topic-routes.css'

export default function TopicRouteReader({
  routeIds,
  onClose,
  initialRouteId,
  initialSelected = -1,
}: {
  routeIds: string[]
  onClose: () => void
  initialRouteId?: string
  initialSelected?: number
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [routeId, setRouteId] = useState(
    initialRouteId && routeIds.includes(initialRouteId) ? initialRouteId : routeIds[0],
  )
  const [selected, setSelected] = useState(initialSelected)
  const [focusVersion, setFocusVersion] = useState(0)
  const chooseStop = (index: number) => {
    setSelected(index)
    setFocusVersion((version) => version + 1)
    const stages = dialog.current?.querySelector('.route-reader-stages')
    if (window.innerWidth > 700) stages?.scrollTo({ top: 0 })
    else
      dialog.current?.querySelector('.route-reader-geography')?.scrollIntoView({ block: 'start' })
  }
  const route = topicRouteById.get(routeId)!
  const routes = useMemo(() => [route], [route])
  const stop = selected >= 0 ? route.stops[selected] : null
  useEffect(() => {
    const element = dialog.current!
    const previousFocus = document.activeElement as HTMLElement | null
    element.showModal()
    return () => {
      element.close()
      previousFocus?.focus({ preventScroll: true })
    }
  }, [])
  return createPortal(
    <dialog
      ref={dialog}
      className="topic-route-dialog"
      aria-labelledby="route-reader-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      <header className="route-reader-header">
        <div>
          <span className="eyebrow">沿地图读历史 · {route.period}</span>
          <h2 id="route-reader-title">{route.name}</h2>
        </div>
        <button className="route-close" aria-label="关闭路线地图，返回文章" onClick={onClose}>
          <X size={22} />
        </button>
      </header>
      {routeIds.length > 1 && (
        <label className="route-switch">
          选择路线
          <select
            value={routeId}
            onChange={(event) => {
              setSelected(-1)
              setRouteId(event.target.value)
            }}
          >
            {routeIds.map((id) => (
              <option key={id} value={id}>
                {topicRouteById.get(id)!.name}
              </option>
            ))}
          </select>
        </label>
      )}
      <div className="route-reader-body">
        <div className="route-reader-geography">
          <RouteMap
            key={routeId}
            routes={routes}
            selectedRouteId={routeId}
            colorOffset={routeIds.indexOf(routeId)}
            selected={selected}
            focusVersion={focusVersion}
            onSelect={(_, index) => chooseStop(index)}
          />
          <details className="route-precision-details">
            <summary>示意路线 · 查看航次与定位说明</summary>
            <p className="route-precision-note">{route.note}</p>
          </details>
        </div>
        <section className="route-reader-stages" aria-label="路线逐站阅读">
          <nav className="route-stage-controls" aria-label="路线阅读控制">
            <button onClick={() => chooseStop(-1)} aria-pressed={selected < 0}>
              <Expand size={16} />
              全程
            </button>
            <button
              aria-label="上一站"
              disabled={selected <= 0}
              onClick={() => chooseStop(selected - 1)}
            >
              <ArrowLeft size={16} />
            </button>
            <span>
              {selected < 0
                ? `${route.stops.length} 个地点`
                : `${selected + 1} / ${route.stops.length}`}
            </span>
            <button
              aria-label={selected < 0 ? '从第一站开始' : '下一站'}
              disabled={selected === route.stops.length - 1}
              onClick={() => chooseStop(selected + 1)}
            >
              <ArrowRight size={16} />
            </button>
          </nav>
          <div className="route-current-stop" aria-live="polite">
            {stop ? (
              <>
                <h3>{stop.name}</h3>
                <p className="route-date">{stop.dateLabel}</p>
                <p>{stop.text}</p>
                <Sources key={stop.id} sources={stop.sources} title="本站依据" initialLimit={1} />
              </>
            ) : (
              <>
                <h3>先看全程，再选一个地点</h3>
                <p>
                  点地图上的地名、站点或下面的列表，查看这一站发生了什么。可以自由缩放和拖动地图；关闭后继续读文章。
                </p>
              </>
            )}
          </div>
          <ol className="route-stop-list">
            {route.stops.map((item, index) => (
              <li key={item.id}>
                <button
                  aria-current={index === selected ? 'step' : undefined}
                  onClick={() => chooseStop(index)}
                >
                  <span>{index + 1}</span>
                  <strong>{item.name}</strong>
                </button>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </dialog>,
    document.body,
  )
}
