import { useEffect, useMemo, useRef, useState } from 'react'
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import type { FeatureCollection } from 'geojson'
import { LocateFixed, Minus, Plus } from 'lucide-react'
import type { ArticleMap, PolityFeature, PolityProperties } from '../types'
import type { TopicEvent } from '../lib/topic-reading-presentation'
import { activeMapFeatures, polityOrder } from '../lib/maps'
import {
  clampYear,
  formatEventDate,
  formatYear,
  MAX_YEAR,
  periodAt,
  toOrdinal,
} from '../lib/history'
import Sources from './Sources'
import { topicRouteById } from '../data/topic-routes'
import { routeMapSegments } from '../lib/topic-routes'
import { layoutMapLabels, shortMapLabel } from '../lib/map-labels'
import '../topic-inline-map.css'

// Keep the same explicit ESM worker mechanism as the main atlas.
maplibregl.setWorkerUrl(maplibreWorkerUrl)
const base = import.meta.env.BASE_URL
const collectionCache = new Map<string, FeatureCollection>()

async function collection(path: string, signal: AbortSignal): Promise<FeatureCollection> {
  const cached = collectionCache.get(path)
  if (cached) {
    collectionCache.delete(path)
    collectionCache.set(path, cached)
    return cached
  }
  const response = await fetch(`${base}data/${path}.geojson`, { signal })
  if (!response.ok) throw new Error(`Map data HTTP ${response.status}`)
  const data = (await response.json()) as FeatureCollection
  if (data.type !== 'FeatureCollection' || !Array.isArray(data.features))
    throw new Error('Invalid map data')
  collectionCache.set(path, data)
  while (collectionCache.size > 5) collectionCache.delete(collectionCache.keys().next().value!)
  return data
}

function palette(instance: maplibregl.Map, dark: boolean) {
  if (!instance.getLayer('inline-land')) return
  instance.setPaintProperty('inline-water', 'background-color', dark ? '#101e29' : '#e3ebeb')
  instance.setPaintProperty('inline-land', 'fill-color', dark ? '#263336' : '#e8e8df')
  instance.setPaintProperty('inline-coast', 'line-color', dark ? '#52676c' : '#b9c6c0')
  instance.setPaintProperty('inline-territories', 'fill-opacity', dark ? 0.46 : 0.7)
  instance.setPaintProperty('inline-borders', 'line-color', dark ? '#b0c0ba' : '#fffef6')
  instance.setPaintProperty('inline-lakes', 'fill-color', dark ? '#1b3442' : '#c9d8d7')
  instance.setPaintProperty('inline-rivers', 'line-color', dark ? '#7ca6b1' : '#6e979b')
}

/** Loads near the reading viewport; all interactions remain local to the figure. */
export default function TopicInlineMap({
  map: figure,
  eventById,
  expanded = false,
}: {
  map: ArticleMap
  eventById: ReadonlyMap<string, TopicEvent>
  expanded?: boolean
}) {
  const container = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<maplibregl.Map | null>(null)
  const markers = useRef<maplibregl.Marker[]>([])
  const labels = useRef<
    {
      element: HTMLSpanElement
      coordinates: [number, number]
      eventId?: string
      button?: HTMLButtonElement
    }[]
  >([])
  const positionLabels = useRef<() => void>(() => {})
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const selectedEventRef = useRef(selectedEvent)
  selectedEventRef.current = selectedEvent
  const [selectedPolity, setSelectedPolity] = useState<PolityProperties | null>(null)
  const [emptyYear, setEmptyYear] = useState(false)
  const [dark, setDark] = useState(() => document.documentElement.dataset.colorMode === 'dark')
  const darkRef = useRef(dark)
  darkRef.current = dark
  const mapYear = clampYear(figure.year)
  const events = useMemo(
    () =>
      (figure.eventIds ?? []).flatMap((id) => {
        const event = eventById.get(id)
        return event ? [event] : []
      }),
    [figure.eventIds, eventById],
  )
  const routes = useMemo(
    () =>
      (figure.routeIds ?? []).flatMap((id) => {
        const route = topicRouteById.get(id)
        return route ? [route] : []
      }),
    [figure.routeIds],
  )
  const routeColors = ['#a94729', '#376f97', '#72558c']
  const event = selectedEvent ? eventById.get(selectedEvent) : undefined

  useEffect(() => {
    const observer = new MutationObserver(() =>
      setDark(document.documentElement.dataset.colorMode === 'dark'),
    )
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-color-mode'],
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const element = container.current
    if (!element) return
    setReady(false)
    setFailed(false)
    setSelectedEvent(null)
    setSelectedPolity(null)
    setEmptyYear(false)
    const controller = new AbortController()
    let disposed = false
    let loadFailed = false
    let instance: maplibregl.Map | undefined
    let resize: ResizeObserver | undefined
    let timer: ReturnType<typeof setTimeout>
    const fail = () => {
      loadFailed = true
      clearTimeout(timer)
      controller.abort()
      if (!disposed) {
        setFailed(true)
        setReady(false)
      }
    }
    timer = setTimeout(fail, 30_000)
    if (
      !Number.isFinite(figure.year) ||
      figure.year === 0 ||
      !figure.center.every(Number.isFinite)
    ) {
      fail()
      return
    }
    const period = periodAt(mapYear)
    const slice = Math.floor((toOrdinal(mapYear) - toOrdinal(period.from)) / 20)
    async function setup(container: HTMLDivElement) {
      instance = new maplibregl.Map({
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        maxTileCacheSize: 32,
        container,
        bounds: figure.bounds,
        fitBoundsOptions: { padding: 20, maxZoom: figure.zoom ?? 3 },
        center: figure.center,
        zoom: figure.zoom ?? 3,
        minZoom: -1,
        maxZoom: 8,
        maxPitch: 0,
        dragRotate: false,
        renderWorldCopies: false,
        cooperativeGestures: true,
        attributionControl: false,
        locale: {
          'CooperativeGesturesHandler.WindowsHelpText': '双指捏合缩放，或按住 Ctrl 键并滚动',
          'CooperativeGesturesHandler.MacHelpText': '双指捏合缩放，或按住 ⌘ 键并滚动',
          'CooperativeGesturesHandler.MobileHelpText': '用双指移动或捏合缩放地图',
        },
        style: {
          version: 8,
          sources: {
            'inline-land': { type: 'geojson', data: `${base}data/land.geojson` },
            'inline-lakes': { type: 'geojson', data: `${base}data/lakes.geojson` },
            'inline-rivers': {
              type: 'geojson',
              data: `${base}data/rivers_lake_centerlines.geojson`,
            },
          },
          layers: [
            {
              id: 'inline-water',
              type: 'background',
              paint: { 'background-color': darkRef.current ? '#101e29' : '#e3ebeb' },
            },
          ],
        },
      })
      instanceRef.current = instance
      instance.touchZoomRotate.disableRotation()
      instance.addControl(
        new maplibregl.AttributionControl({
          compact: true,
          customAttribution:
            '<a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener noreferrer">Natural Earth</a> · <a href="https://github.com/Seshat-Global-History-Databank/cliopatria" target="_blank" rel="noopener noreferrer">Cliopatria / Seshat</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>',
        }),
        'bottom-right',
      )
      instance.on('error', fail)
      resize = new ResizeObserver(() => instance?.resize())
      resize.observe(container)
      const [territories] = await Promise.all([
        collection(`maps/${period.id}/${slice}`, controller.signal),
        instance.once('load'),
      ])
      if (disposed || loadFailed) return
      const features = activeMapFeatures(territories.features as PolityFeature[], mapYear)
      const byName = new Map<string, PolityProperties>()
      for (const feature of [...features].sort((a, b) => polityOrder(a.properties, b.properties)))
        if (!byName.has(feature.properties.name))
          byName.set(feature.properties.name, feature.properties)
      setEmptyYear(features.length === 0)
      instance.addSource('inline-territories', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features },
      })
      instance.addLayer({
        id: 'inline-land',
        type: 'fill',
        source: 'inline-land',
        paint: { 'fill-color': '#e8e8df' },
      })
      instance.addLayer({
        id: 'inline-coast',
        type: 'line',
        source: 'inline-land',
        paint: { 'line-color': '#b9c6c0', 'line-width': 0.8 },
      })
      instance.addLayer({
        id: 'inline-territories',
        type: 'fill',
        source: 'inline-territories',
        paint: { 'fill-color': ['get', 'color'], 'fill-opacity': 0.7 },
      })
      instance.addLayer({
        id: 'inline-borders',
        type: 'line',
        source: 'inline-territories',
        paint: {
          'line-color': '#fffef6',
          'line-width': 1,
          'line-opacity': 0.7,
          'line-dasharray': [4, 2],
        },
      })
      instance.addLayer({
        id: 'inline-lakes',
        type: 'fill',
        source: 'inline-lakes',
        paint: { 'fill-color': '#c9d8d7', 'fill-opacity': 0.8 },
      })
      instance.addLayer({
        id: 'inline-rivers',
        type: 'line',
        source: 'inline-rivers',
        paint: { 'line-color': '#6e979b', 'line-width': 1, 'line-opacity': 0.6 },
      })
      if (routes.length) {
        instance.addSource('inline-routes', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: routes.map((route, index) => ({
              type: 'Feature',
              properties: { color: routeColors[index % routeColors.length] },
              geometry: { type: 'MultiLineString', coordinates: routeMapSegments(route) },
            })),
          },
        })
        instance.addLayer({
          id: 'inline-route-halo',
          type: 'line',
          source: 'inline-routes',
          paint: { 'line-color': '#fff9e8', 'line-width': 5, 'line-opacity': 0.8 },
        })
        instance.addLayer({
          id: 'inline-route-lines',
          type: 'line',
          source: 'inline-routes',
          paint: {
            'line-color': ['get', 'color'],
            'line-width': 2.5,
            'line-dasharray': [3, 2],
          },
        })
      }
      palette(instance, darkRef.current)
      instance.on('click', 'inline-territories', (click) => {
        const name = click.features?.[0]?.properties?.name
        const polity = typeof name === 'string' ? byName.get(name) : undefined
        if (polity) {
          setSelectedPolity(polity)
          setSelectedEvent(null)
        }
      })
      instance.on('mouseenter', 'inline-territories', () => {
        if (instance) instance.getCanvas().style.cursor = 'pointer'
      })
      instance.on('mouseleave', 'inline-territories', () => {
        if (instance) instance.getCanvas().style.cursor = ''
      })
      for (const [index, item] of events.entries()) {
        const button = document.createElement('button')
        button.type = 'button'
        button.className = 'topic-inline-event-marker'
        button.textContent = String(index + 1)
        button.title = item.title
        button.setAttribute('aria-label', `地图地点 ${index + 1}：${item.title}`)
        button.onclick = (click) => {
          click.stopPropagation()
          setSelectedEvent(item.id)
          setSelectedPolity(null)
        }
        button.onfocus = () => positionLabels.current()
        button.onblur = () => positionLabels.current()
        markers.current.push(
          new maplibregl.Marker({ element: button }).setLngLat(item.coordinates).addTo(instance),
        )
        const label = document.createElement('span')
        label.className = 'topic-inline-place-label topic-inline-event-label'
        label.textContent = shortMapLabel(item.location)
        label.setAttribute('aria-hidden', 'true')
        label.onclick = button.onclick
        instance.getCanvasContainer().append(label)
        labels.current.push({
          element: label,
          coordinates: item.coordinates,
          eventId: item.id,
          button,
        })
      }
      for (const place of figure.places ?? []) {
        const point = document.createElement('span')
        point.className = 'topic-inline-reference-marker'
        point.setAttribute('aria-hidden', 'true')
        markers.current.push(
          new maplibregl.Marker({ element: point }).setLngLat(place.coordinates).addTo(instance),
        )
        const label = document.createElement('span')
        label.className = 'topic-inline-place-label'
        label.textContent = shortMapLabel(place.name)
        label.title = place.name
        label.setAttribute('aria-hidden', 'true')
        instance.getCanvasContainer().append(label)
        labels.current.push({ element: label, coordinates: place.coordinates })
      }
      const updateLabels = () => {
        if (!instance) return
        const { clientWidth: width, clientHeight: height } = instance.getContainer()
        const points = labels.current.map((entry) => {
          const point = instance!.project(entry.coordinates)
          entry.element.hidden = false
          entry.element.style.visibility = 'hidden'
          const selected = entry.eventId === selectedEventRef.current
          const focused = entry.button === document.activeElement
          entry.element.classList.toggle('is-selected', selected)
          return {
            x: point.x,
            y: point.y,
            width: entry.element.offsetWidth,
            height: entry.element.offsetHeight,
            priority: focused ? 3 : selected ? 2 : entry.eventId ? 1 : 0,
          }
        })
        const positions = layoutMapLabels(points, { width, height }, [
          { x: width - 56, y: 8, width: 48, height: 138 },
          { x: width - 220, y: height - 32, width: 220, height: 32 },
        ])
        labels.current.forEach(({ element }, index) => {
          const position = positions[index]
          element.hidden = !position
          element.style.visibility = ''
          if (position) element.style.transform = `translate(${position.x}px, ${position.y}px)`
        })
      }
      positionLabels.current = updateLabels
      instance.on('render', updateLabels)
      updateLabels()
      instance.once('idle', () => {
        clearTimeout(timer)
        if (!disposed && !loadFailed) setReady(true)
      })
    }
    void setup(element).catch(fail)
    return () => {
      disposed = true
      controller.abort()
      clearTimeout(timer)
      resize?.disconnect()
      for (const marker of markers.current) marker.remove()
      markers.current = []
      labels.current.forEach(({ element }) => element.remove())
      labels.current = []
      positionLabels.current = () => {}
      instance?.remove()
      instanceRef.current = null
    }
  }, [
    figure.id,
    figure.year,
    figure.center,
    figure.zoom,
    mapYear,
    events,
    routes,
    figure.places,
    figure.bounds,
    attempt,
  ])

  useEffect(() => {
    const instance = instanceRef.current
    if (ready && instance) palette(instance, dark)
  }, [dark, ready])

  useEffect(() => {
    const instance = instanceRef.current
    if (!ready || !instance) return
    if (expanded) instance.cooperativeGestures.disable()
    else instance.cooperativeGestures.enable()
    instance.resize()
    positionLabels.current()
  }, [expanded, ready])

  useEffect(() => {
    markers.current.slice(0, events.length).forEach((marker, index) => {
      const selected = events[index]?.id === selectedEvent
      marker.getElement().classList.toggle('is-selected', selected)
      marker.getElement().setAttribute('aria-pressed', String(selected))
    })
    positionLabels.current()
  }, [selectedEvent, events, ready])

  const duration = () => (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 350)
  function locate(item: TopicEvent) {
    setSelectedEvent(item.id)
    setSelectedPolity(null)
    instanceRef.current?.easeTo({ center: item.coordinates, duration: duration() })
  }
  return (
    <div
      className="topic-inline-map"
      role="group"
      aria-label={figure.title}
      data-map-year={mapYear}
      data-ready={ready && !failed}
    >
      <header className="topic-inline-map-heading">
        <strong>{figure.title}</strong>
        <span>{formatYear(mapYear)} · 章节地理背景</span>
      </header>
      <div className="topic-inline-map-stage">
        <div
          ref={container}
          className="topic-inline-map-canvas"
          role="region"
          aria-label={`${figure.title}交互地图`}
          onKeyDown={(event) => {
            if (
              [
                'ArrowUp',
                'ArrowDown',
                'ArrowLeft',
                'ArrowRight',
                '+',
                '-',
                '=',
                'PageUp',
                'PageDown',
              ].includes(event.key)
            )
              event.stopPropagation()
          }}
        />
        <div className="topic-inline-map-controls" aria-label="文章地图操作">
          <button
            aria-label="放大文章地图"
            disabled={!ready}
            onClick={() => instanceRef.current?.zoomIn({ duration: duration() })}
          >
            <Plus size={17} />
          </button>
          <button
            aria-label="缩小文章地图"
            disabled={!ready}
            onClick={() => instanceRef.current?.zoomOut({ duration: duration() })}
          >
            <Minus size={17} />
          </button>
          <button
            aria-label="重置文章地图视野"
            disabled={!ready}
            onClick={() => {
              if (figure.bounds)
                instanceRef.current?.fitBounds(figure.bounds, {
                  padding: 20,
                  maxZoom: figure.zoom ?? 3,
                  duration: duration(),
                })
              else
                instanceRef.current?.easeTo({
                  center: figure.center,
                  zoom: figure.zoom ?? 3,
                  duration: duration(),
                })
            }}
          >
            <LocateFixed size={17} />
          </button>
        </div>
        {!ready && !failed && (
          <p className="topic-inline-map-status" role="status">
            正在载入文中地图…
          </p>
        )}
        {failed && (
          <div className="topic-inline-map-status" role="status">
            <p>地图暂时无法载入，可以继续阅读正文。</p>
            <button onClick={() => setAttempt((value) => value + 1)}>重新载入文中地图</button>
          </div>
        )}
      </div>
      {!!routes.length && (
        <div className="topic-inline-map-legend" aria-label="图中路线">
          {routes.map((route, index) => (
            <p key={route.id}>
              <span style={{ background: routeColors[index % routeColors.length] }} />
              <strong>{route.name}</strong> · {route.period}
            </p>
          ))}
        </div>
      )}
      {figure.caption && <p className="topic-inline-map-caption">{figure.caption}</p>}
      {figure.year > MAX_YEAR && (
        <p className="topic-inline-map-note">
          本段涉及{formatYear(figure.year)}
          ，历史疆域资料止于1912年；图中1912年疆域仅作地点参照，不代表事件当年。
        </p>
      )}
      {emptyYear && !failed && (
        <p className="topic-inline-map-note">
          这一年暂无可用疆域轮廓，保留已有地点与自然地理参照。
        </p>
      )}
      <p className="topic-inline-map-note">
        空白处表示暂缺合适的疆域资料。河流、湖泊与海岸采用现代地理参照；地点标记不表示精确范围或行程路线。
      </p>
      {!!events.length && (
        <div className="topic-inline-map-places" aria-label="文中地图地点">
          {events.map((item, index) => (
            <button
              key={item.id}
              onClick={() => locate(item)}
              aria-pressed={selectedEvent === item.id}
            >
              <span>{index + 1}</span>
              {item.location}
              <small>{formatEventDate(item)}</small>
            </button>
          ))}
        </div>
      )}
      {event && (
        <div className="topic-inline-map-selection">
          <strong>{event.title}</strong>
          <p>{event.summary}</p>
          {event.locationNote && <p>{event.locationNote}</p>}
          <small>
            {formatEventDate(event)} · {event.location}
          </small>
        </div>
      )}
      {selectedPolity && (
        <div className="topic-inline-map-selection">
          <strong>{selectedPolity.nameZh}</strong>
          {selectedPolity.displayNote && <p>{selectedPolity.displayNote}</p>}
          <small>
            来源图形适用区间：{formatYear(selectedPolity.from)}—{formatYear(selectedPolity.to)}
          </small>
        </div>
      )}
      {!!(figure.sources?.length || routes.length) && (
        <details className="topic-inline-map-evidence">
          <summary>路线说明与地图资料</summary>
          {routes.map((route) => (
            <p key={route.id}>
              <strong>{route.name}</strong>：{route.note}
            </p>
          ))}
          <Sources
            sources={[
              ...new Map(
                [...(figure.sources ?? []), ...routes.flatMap((route) => route.sources)].map(
                  (source) => [source.url, source],
                ),
              ).values(),
            ]}
            title="文中地图参考资料"
          />
        </details>
      )}
    </div>
  )
}
