import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import * as maplibregl from 'maplibre-gl'
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import { ArrowLeft, ArrowRight, X, Expand } from 'lucide-react'
import type { Feature, LineString } from 'geojson'
import { topicRouteById, type TopicRoute } from '../data/topic-routes'
import { routeGeometry } from '../lib/topic-routes'
import Sources from './Sources'
import '../topic-routes.css'

maplibregl.setWorkerUrl(maplibreWorkerUrl)
const lineFeature = (coordinates: number[][]): Feature<LineString> => ({
  type: 'Feature',
  properties: {},
  geometry: { type: 'LineString', coordinates },
})
function RouteMap({
  route,
  selected,
  onSelect,
  focusVersion,
}: {
  route: TopicRoute
  selected: number
  onSelect: (index: number) => void
  focusVersion: number
}) {
  const container = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const markers = useRef<HTMLButtonElement[]>([])
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const selectedRef = useRef(selected)
  selectedRef.current = selected
  const selectRef = useRef(onSelect)
  selectRef.current = onSelect
  const geometry = useMemo(() => routeGeometry(route), [route])
  useEffect(() => {
    if (!container.current) return
    setReady(false)
    setError(false)
    const abort = new AbortController()
    let disposed = false
    let instance: maplibregl.Map | undefined
    let resize: ResizeObserver | undefined
    const fail = () => {
      if (!disposed) setError(true)
    }
    // Reading the article does not request geographic data or create another map.
    void fetch(`${import.meta.env.BASE_URL}data/land.geojson`, { signal: abort.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Land unavailable')
        return response.json()
      })
      .then((land) => {
        if (disposed) return
        instance = new maplibregl.Map({
          container: container.current!,
          attributionControl: false,
          center: [0, 15],
          zoom: 1,
          minZoom: -2,
          // Allow a whole-world route to fit a narrow viewport without the default
          // Mercator constraint zooming back in to fill its vertical extent.
          transformConstrain: (center, zoom) => ({
            center: new maplibregl.LngLat(center.lng, Math.max(-80, Math.min(80, center.lat))),
            zoom: Math.max(-2, Math.min(8, zoom)),
          }),
          maxZoom: 8,
          style: {
            version: 8,
            sources: {},
            layers: [{ id: 'ocean', type: 'background', paint: { 'background-color': '#dcebef' } }],
          },
        })
        map.current = instance
        instance.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
        instance.addControl(
          new maplibregl.AttributionControl({
            compact: true,
            customAttribution:
              '<a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener noreferrer">Natural Earth</a> · 地理底图',
          }),
          'bottom-right',
        )
        instance.on('error', fail)
        instance.on('load', () => {
          if (disposed || !instance) return
          instance.addSource('land', { type: 'geojson', data: land })
          instance.addLayer({
            id: 'land',
            type: 'fill',
            source: 'land',
            paint: { 'fill-color': '#f1eee2' },
          })
          instance.addLayer({
            id: 'coast',
            type: 'line',
            source: 'land',
            paint: { 'line-color': '#b4bdae', 'line-width': 0.8 },
          })
          instance.addSource('route', { type: 'geojson', data: lineFeature(geometry.line) })
          instance.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            paint: { 'line-color': '#367783', 'line-width': 2.5, 'line-dasharray': [2, 2] },
          })
          instance.addSource('selected-leg', {
            type: 'geojson',
            data: { type: 'FeatureCollection', features: [] },
          })
          instance.addLayer({
            id: 'selected-leg',
            type: 'line',
            source: 'selected-leg',
            paint: { 'line-color': '#b24f35', 'line-width': 4, 'line-dasharray': [2, 1] },
          })
          const bounds = new maplibregl.LngLatBounds()
          geometry.line.forEach((point) => bounds.extend(point))
          instance.fitBounds(bounds, { padding: 45, duration: 0, maxZoom: 5 })
          markers.current = geometry.stops.map((_, i) => {
            const button = document.createElement('button')
            button.type = 'button'
            button.className = 'route-marker'
            button.textContent = String(i + 1)
            button.setAttribute('aria-label', `地图站点 ${i + 1}：${route.stops[i].name}`)
            button.title = route.stops[i].name
            button.onclick = () => selectRef.current(i)
            instance!.getCanvasContainer().append(button)
            return button
          })
          // Project the unwrapped itinerary directly. Marker smart wrapping would move
          // a stop to another world copy during a full circumnavigation fit.
          const positionMarkers = () => {
            if (!instance) return
            const { clientWidth, clientHeight } = instance.getContainer()
            markers.current.forEach((button, i) => {
              const referenceLongitude =
                selectedRef.current >= 0
                  ? geometry.stops[selectedRef.current][0]
                  : (Math.min(...geometry.line.map((p) => p[0])) +
                      Math.max(...geometry.line.map((p) => p[0]))) /
                    2
              const shift = 360 * Math.round((instance!.getCenter().lng - referenceLongitude) / 360)
              const point = instance!.project([geometry.stops[i][0] + shift, geometry.stops[i][1]])
              button.style.transform = `translate(${point.x - 14.5}px, ${point.y - 14.5}px)`
              button.hidden =
                point.x < -20 ||
                point.x > clientWidth + 20 ||
                point.y < -20 ||
                point.y > clientHeight + 20
            })
          }
          instance.on('render', positionMarkers)
          positionMarkers()
          instance.once('idle', () => {
            if (!disposed) setReady(true)
          })
        })
        resize = new ResizeObserver(() => instance?.resize())
        resize.observe(container.current!)
      })
      .catch((err: unknown) => {
        if (!(err instanceof DOMException && err.name === 'AbortError')) fail()
      })
    return () => {
      disposed = true
      abort.abort()
      resize?.disconnect()
      instance?.remove()
      map.current = null
      markers.current = []
    }
  }, [route, geometry, attempt])
  useEffect(() => {
    const instance = map.current
    if (!ready || !instance) return
    instance.stop()
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 650
    markers.current.forEach((button, i) => {
      button.classList.toggle('is-selected', selected === i)
      button.setAttribute('aria-pressed', String(selected === i))
    })
    const source = instance.getSource('selected-leg') as maplibregl.GeoJSONSource
    source.setData(
      selected > 0
        ? lineFeature(geometry.legs[selected - 1])
        : { type: 'FeatureCollection', features: [] },
    )
    if (selected < 0) {
      const bounds = new maplibregl.LngLatBounds()
      geometry.line.forEach((point) => bounds.extend(point))
      instance.fitBounds(bounds, { padding: 45, duration, maxZoom: 5 })
    } else instance.easeTo({ center: geometry.stops[selected], zoom: 3.7, duration })
  }, [ready, selected, geometry, focusVersion])
  return (
    <div className="topic-route-map-wrap">
      <div
        ref={container}
        className="topic-route-map"
        aria-label="专题路线地图"
        data-ready={ready && !error}
      />
      {!ready && !error && (
        <p className="route-map-status" role="status">
          正在载入路线地图…
        </p>
      )}
      {error && (
        <div className="route-map-status" role="status">
          <p>地图暂时无法载入，仍可逐站阅读下方行程。</p>
          <button onClick={() => setAttempt((value) => value + 1)}>重新载入地图</button>
        </div>
      )}
      <div className="route-map-key" aria-hidden="true">
        <span /> 主要地点与示意连接
      </div>
    </div>
  )
}

export default function TopicRouteReader({
  routeIds,
  onClose,
}: {
  routeIds: string[]
  onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [routeId, setRouteId] = useState(routeIds[0])
  const [selected, setSelected] = useState(-1)
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
            route={route}
            selected={selected}
            focusVersion={focusVersion}
            onSelect={chooseStop}
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
                  点地图上的数字或下面的地名，查看这一站发生了什么。可以自由缩放和拖动地图；关闭后继续读文章。
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
