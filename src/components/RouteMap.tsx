import { useEffect, useMemo, useRef, useState } from 'react'
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import type { Feature, LineString, MultiLineString } from 'geojson'
import type { RouteCoordinate, TopicRoute } from '../data/topic-routes'
import { routeGeometry, routeMapSegments } from '../lib/topic-routes'
import { layoutMapLabels, shortMapLabel } from '../lib/map-labels'

maplibregl.setWorkerUrl(maplibreWorkerUrl)
export const routeColors = ['#a94729', '#376f97', '#72558c', '#477162', '#9a742b']

const lineFeature = (coordinates: number[][]): Feature<LineString> => ({
  type: 'Feature',
  properties: {},
  geometry: { type: 'LineString', coordinates },
})

interface MapStop {
  routeId: string
  index: number
  name: string
  coordinates: RouteCoordinate
  color: string
}

interface MarkerElements extends MapStop {
  button: HTMLButtonElement
  label: HTMLButtonElement
  width: number
  height: number
}

function palette(instance: maplibregl.Map, dark: boolean) {
  if (!instance.getLayer('land')) return
  instance.setPaintProperty('ocean', 'background-color', dark ? '#101e29' : '#e3ebeb')
  instance.setPaintProperty('land', 'fill-color', dark ? '#263336' : '#e8e8df')
  instance.setPaintProperty('coast', 'line-color', dark ? '#52676c' : '#b9c6c0')
  instance.setPaintProperty('route-halo', 'line-color', dark ? '#b8c6b5' : '#fff9e8')
  instance.setPaintProperty('route-halo', 'line-opacity', dark ? 0.4 : 0.8)
}

/** The article overview and enlarged reader share route geometry and place labels. */
export default function RouteMap({
  routes,
  selectedRouteId,
  selected = -1,
  onSelect,
  focusVersion = 0,
  overview = false,
  colorOffset = 0,
}: {
  routes: TopicRoute[]
  selectedRouteId?: string
  selected?: number
  onSelect: (routeId: string, index: number) => void
  focusVersion?: number
  overview?: boolean
  colorOffset?: number
}) {
  const container = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const markers = useRef<MarkerElements[]>([])
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const selectRef = useRef(onSelect)
  selectRef.current = onSelect
  const selection = useRef({ routeId: selectedRouteId ?? routes[0]?.id, index: selected })
  selection.current = { routeId: selectedRouteId ?? routes[0]?.id, index: selected }
  const geometry = useMemo(() => {
    const paths = routes.map((route, index) => ({
      route,
      color: routeColors[(index + colorOffset) % routeColors.length],
      geometry: routeGeometry(route),
      segments: routeMapSegments(route),
    }))
    const stops: MapStop[] = []
    const seen = new Set<string>()
    for (const path of paths)
      path.route.stops.forEach((stop, index) => {
        const coordinates = overview ? stop.coordinates : path.geometry.stops[index]
        const key = `${coordinates[0].toFixed(4)},${coordinates[1].toFixed(4)}:${shortMapLabel(stop.name)}`
        if (overview && seen.has(key)) return
        seen.add(key)
        stops.push({
          routeId: path.route.id,
          index,
          name: stop.name,
          coordinates,
          color: path.color,
        })
      })
    const line = paths.flatMap((path) => (overview ? path.segments.flat() : path.geometry.line))
    return { paths, stops, line }
  }, [routes, overview, colorOffset])

  useEffect(() => {
    if (!container.current || !geometry.line.length) return
    setReady(false)
    setError(false)
    const abort = new AbortController()
    let disposed = false
    let instance: maplibregl.Map | undefined
    let resize: ResizeObserver | undefined
    let mode: MutationObserver | undefined
    let activeMarker: HTMLButtonElement | null = null
    const fail = () => {
      if (!disposed) setError(true)
    }
    const timer = window.setTimeout(() => {
      fail()
      abort.abort()
    }, 30_000)
    const fit = (duration: number) => {
      const bounds = new maplibregl.LngLatBounds()
      geometry.line.forEach((point) => bounds.extend(point))
      instance?.fitBounds(bounds, {
        padding: { top: 48, bottom: 48, left: 46, right: 58 },
        duration,
        maxZoom: 5,
      })
    }
    void fetch(`${import.meta.env.BASE_URL}data/land.geojson`, { signal: abort.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Land unavailable')
        return response.json()
      })
      .then((land) => {
        if (disposed) return
        instance = new maplibregl.Map({
          pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
          maxTileCacheSize: 32,
          container: container.current!,
          attributionControl: false,
          center: [0, 15],
          zoom: 1,
          minZoom: -2,
          // Trackpad pinch is delivered as Ctrl + wheel too. Cooperative gestures
          // leave plain scrolling to the article without disabling pinch zoom.
          scrollZoom: true,
          cooperativeGestures: overview,
          locale: {
            'CooperativeGesturesHandler.WindowsHelpText': '双指捏合缩放，或按住 Ctrl 键并滚动',
            'CooperativeGesturesHandler.MacHelpText': '双指捏合缩放，或按住 ⌘ 键并滚动',
            'CooperativeGesturesHandler.MobileHelpText': '用双指移动或捏合缩放地图',
          },
          // A whole-world journey must fit narrow maps without Mercator's height limit.
          transformConstrain: (center, zoom) => ({
            center: new maplibregl.LngLat(center.lng, Math.max(-80, Math.min(80, center.lat))),
            zoom: Math.max(-2, Math.min(8, zoom)),
          }),
          maxZoom: 8,
          style: {
            version: 8,
            sources: {},
            layers: [{ id: 'ocean', type: 'background', paint: { 'background-color': '#e3ebeb' } }],
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
            paint: { 'fill-color': '#e8e8df' },
          })
          instance.addLayer({
            id: 'coast',
            type: 'line',
            source: 'land',
            paint: { 'line-color': '#b9c6c0', 'line-width': 0.8 },
          })
          instance.addSource('route', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: geometry.paths.map((path): Feature<LineString | MultiLineString> => ({
                type: 'Feature',
                properties: { color: path.color },
                geometry: overview
                  ? { type: 'MultiLineString', coordinates: path.segments }
                  : { type: 'LineString', coordinates: path.geometry.line },
              })),
            },
          })
          instance.addLayer({
            id: 'route-halo',
            type: 'line',
            source: 'route',
            paint: { 'line-color': '#fff9e8', 'line-width': 5, 'line-opacity': 0.8 },
          })
          instance.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            paint: { 'line-color': ['get', 'color'], 'line-width': 2.5, 'line-dasharray': [2, 2] },
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
          const applyMode = () => {
            if (instance) palette(instance, document.documentElement.dataset.colorMode === 'dark')
          }
          applyMode()
          mode = new MutationObserver(applyMode)
          mode.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-color-mode'],
          })
          fit(0)
          markers.current = geometry.stops.map((stop) => {
            const button = document.createElement('button')
            button.type = 'button'
            button.className = overview ? 'route-marker route-marker-overview' : 'route-marker'
            button.textContent = overview ? '' : String(stop.index + 1)
            button.dataset.routeId = stop.routeId
            button.dataset.stopIndex = String(stop.index)
            button.style.setProperty('--route-color', stop.color)
            button.setAttribute('aria-label', `地图站点 ${stop.index + 1}：${stop.name}`)
            button.title = stop.name
            const label = document.createElement('button')
            label.type = 'button'
            label.className = 'map-point-label'
            label.textContent = shortMapLabel(stop.name)
            label.dataset.routeId = stop.routeId
            label.dataset.stopIndex = String(stop.index)
            label.setAttribute('aria-label', `地图地名：${stop.name}`)
            label.title = stop.name
            for (const element of [button, label]) {
              element.onclick = (event) => {
                event.stopPropagation()
                selectRef.current(stop.routeId, stop.index)
              }
              instance!.getCanvasContainer().append(element)
            }
            // A visible label must stay under the pointer while it is clicked.
            // Only focusing the stationary marker promotes a hidden label.
            button.onfocus = () => {
              activeMarker = button
              positionMarkers()
            }
            button.onblur = () => {
              activeMarker = null
              positionMarkers()
            }
            return {
              ...stop,
              button,
              label,
              width: label.offsetWidth || label.textContent!.length * 12 + 16,
              height: label.offsetHeight || 26,
            }
          })
          // Project unwrapped stops together, rather than Marker smart-wrapping each one.
          const positionMarkers = () => {
            if (!instance) return
            const { clientWidth: width, clientHeight: height } = instance.getContainer()
            const selectedPath = geometry.paths.find(
              (path) => path.route.id === selection.current.routeId,
            )
            const referenceLongitude =
              !overview && selection.current.index >= 0 && selectedPath
                ? (selectedPath.geometry.stops[selection.current.index]?.[0] ?? 0)
                : (Math.min(...geometry.line.map((p) => p[0])) +
                    Math.max(...geometry.line.map((p) => p[0]))) /
                  2
            const shift = 360 * Math.round((instance.getCenter().lng - referenceLongitude) / 360)
            const points = markers.current.map((marker) => {
              const point = instance!.project([
                marker.coordinates[0] + shift,
                marker.coordinates[1],
              ])
              marker.button.style.transform = `translate(${point.x - 14.5}px, ${point.y - 14.5}px)`
              marker.button.hidden =
                point.x < -14 || point.x > width + 14 || point.y < -14 || point.y > height + 14
              const isSelected =
                marker.routeId === selection.current.routeId &&
                marker.index === selection.current.index
              marker.button.classList.toggle('is-selected', isSelected)
              marker.button.setAttribute('aria-pressed', String(isSelected))
              marker.label.classList.toggle('is-selected', isSelected)
              return {
                x: point.x,
                y: point.y,
                width: marker.width,
                height: marker.height,
                priority: isSelected ? 20 : marker.button === activeMarker ? 10 : 0,
              }
            })
            const placements = layoutMapLabels(points, { width, height }, [
              { x: width - 55, y: 0, width: 55, height: 110 },
              { x: width - 190, y: height - 35, width: 190, height: 35 },
              { x: 0, y: height - 35, width: 170, height: 35 },
            ])
            markers.current.forEach((marker, index) => {
              const placement = placements[index]
              marker.label.hidden = !placement
              if (placement)
                marker.label.style.transform = `translate(${placement.x}px, ${placement.y}px)`
            })
          }
          instance.on('render', positionMarkers)
          positionMarkers()
          instance.once('idle', () => {
            window.clearTimeout(timer)
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
      window.clearTimeout(timer)
      abort.abort()
      resize?.disconnect()
      mode?.disconnect()
      instance?.remove()
      map.current = null
      markers.current = []
    }
  }, [geometry, overview, attempt])

  useEffect(() => {
    const instance = map.current
    if (!ready || !instance || overview) return
    instance.stop()
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 650
    const path = geometry.paths.find((item) => item.route.id === selection.current.routeId)
    const source = instance.getSource('selected-leg') as maplibregl.GeoJSONSource
    source.setData(
      selected > 0 && path?.geometry.legs[selected - 1]
        ? lineFeature(path.geometry.legs[selected - 1])
        : { type: 'FeatureCollection', features: [] },
    )
    if (selected < 0) {
      const bounds = new maplibregl.LngLatBounds()
      geometry.line.forEach((point) => bounds.extend(point))
      instance.fitBounds(bounds, {
        padding: { top: 48, bottom: 48, left: 46, right: 58 },
        duration,
        maxZoom: 5,
      })
    } else if (path?.geometry.stops[selected])
      instance.easeTo({ center: path.geometry.stops[selected], zoom: 3.7, duration })
  }, [ready, selected, selectedRouteId, geometry, focusVersion, overview])

  return (
    <div className="topic-route-map-wrap">
      <div
        ref={container}
        className="topic-route-map"
        role="region"
        aria-label={overview ? '专题路线概览地图' : '专题路线地图'}
        data-ready={ready && !error}
      />
      {!ready && !error && (
        <p className="route-map-status" role="status">
          正在载入路线地图…
        </p>
      )}
      {error && (
        <div className="route-map-status" role="status">
          <p>地图暂时无法载入，仍可阅读路线与地点说明。</p>
          <button onClick={() => setAttempt((value) => value + 1)}>重新载入地图</button>
        </div>
      )}
      <div className="route-map-key" aria-hidden="true">
        <span /> 主要地点与示意连接
      </div>
    </div>
  )
}
