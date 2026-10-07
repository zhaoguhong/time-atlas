import { formatEventDate, eventDateRelation } from '../lib/history'
import { useEffect, useRef, useState } from 'react'
import * as maplibregl from 'maplibre-gl'
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import type { FeatureCollection, LineString } from 'geojson'
import { Minus, Plus, LocateFixed, Compass, AlertCircle, LoaderCircle, Globe2 } from 'lucide-react'
import type {
  City,
  MapBounds,
  HistoryEvent,
  JourneyView,
  PolityFeature,
  PolityProperties,
  Selection,
} from '../types'
import { placeForCity, placeById } from '../lib/exploration'
import { cities, silkRoadCoordinates } from '../data/periods'
import { compactYear, formatYear, periodAt, toOrdinal, fromOrdinal, MAX_YEAR } from '../lib/history'
import { groupMapEvents, intersects, type EventGroup } from '../lib/markers'
import { activeMapFeatures, polityOrder } from '../lib/maps'
import { eventsAtYear } from '../lib/current-events'
import { journeySegments } from '../lib/journeys'
import {
  interpolateJourneyCoordinates,
  journeyMotionProgress,
  JOURNEY_LEG_DURATION_MS,
  nextJourneyNode,
} from '../lib/playback'

// Explicit bundling keeps MapLibre 6's module worker and its imports valid in
// Vite development and in a static production build, including a subdirectory.
maplibregl.setWorkerUrl(maplibreWorkerUrl)

export interface Camera {
  lng: number
  lat: number
  zoom: number
}
export const chinaCamera: Camera = { lng: 109.5, lat: 34.5, zoom: 3.45 }
type Focus =
  | { coordinates: [number, number]; zoom?: number; token: number }
  | { region: 'china' | 'silk'; token: number }
  | { bounds: [[number, number], [number, number]]; token: number }
  | { camera: Camera; token: number }
function defaultCamera(container: HTMLElement): Camera {
  return { ...chinaCamera, zoom: container.clientWidth < 600 ? 2.65 : chinaCamera.zoom }
}
// Preserve space for labels without exhausting a short phone/landscape map.
function readingPadding(container: HTMLElement, topic = false) {
  return {
    top: Math.min(topic ? 130 : 115, container.clientHeight * 0.36),
    bottom: topic
      ? Math.min(90, container.clientHeight * 0.24)
      : Math.min(110, container.clientHeight * 0.32),
    left: Math.min(100, container.clientWidth * 0.22),
    right: Math.min(105, container.clientWidth * 0.24),
  }
}
interface Props {
  year: number
  events: HistoryEvent[]
  showCities: boolean
  showEvents: boolean
  showRoutes: boolean
  hiddenPolities: string[]
  selection: Selection | null
  focus: Focus | null
  initialCamera: Camera | null
  onSelect: (selection: Selection) => void
  onPolities: (polities: PolityProperties[]) => void
  onCamera: (camera: Camera) => void
  onBounds: (bounds: MapBounds) => void
  compareYear: number | null
  trail: JourneyView | null
  topicSteps?: string[]
  journeyResetToken: number
  playing: boolean
  speed: number
  spotlightId?: string
  onJourneyArrival: (id: string) => void
  onJourneyNode: (id: string) => void
}
const empty: FeatureCollection = { type: 'FeatureCollection', features: [] }
const cache = new Map<string, FeatureCollection>()
const pending = new Map<string, Promise<FeatureCollection>>()
function mapSlice(year: number) {
  const period = periodAt(year)
  return `${period.id}/${Math.floor((toOrdinal(year) - toOrdinal(period.from)) / 20)}`
}
const base = import.meta.env.BASE_URL
async function loadCollection(id: string): Promise<FeatureCollection> {
  const cached = cache.get(id)
  if (cached) {
    cache.delete(id)
    cache.set(id, cached)
    return cached
  }
  const existing = pending.get(id)
  if (existing) return existing
  const request = (async () => {
    const response = await fetch(`${base}data/maps/${id}.geojson`)
    if (!response.ok) throw new Error(String(response.status))
    const data = (await response.json()) as FeatureCollection
    if (data.type !== 'FeatureCollection') throw new Error('Invalid map')
    cache.set(id, data)
    while (cache.size > 4) cache.delete(cache.keys().next().value!)
    return data
  })()
  pending.set(id, request)
  try {
    return await request
  } finally {
    pending.delete(id)
  }
}

interface MapLabel {
  key?: string
  marker: maplibregl.Marker
  element: HTMLElement
  priority: number
  capital?: boolean
  kind: 'polity' | 'city' | 'event'
}

function graticule(): FeatureCollection<LineString> {
  const features: FeatureCollection<LineString>['features'] = []
  for (let lon = -180; lon <= 180; lon += 10) {
    features.push({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [
          [lon, -80],
          [lon, 80],
        ],
      },
    })
  }
  for (let lat = -80; lat <= 80; lat += 10) {
    features.push({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: Array.from({ length: 73 }, (_, i) => [-180 + i * 5, lat]),
      },
    })
  }
  return { type: 'FeatureCollection', features }
}

export default function HistoryMap(props: Props) {
  const container = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const current = useRef(props)
  current.current = props
  const labels = useRef<MapLabel[]>([])
  const territoryKey = useRef('')
  const cityLabels = useRef<MapLabel[]>([])
  const eventLabels = useRef<MapLabel[]>([])
  const placeLabels = useRef<MapLabel[]>([])
  const traveler = useRef<maplibregl.Marker | null>(null)
  const travelProgress = useRef({ key: '', value: 0 })
  const arrange = useRef<() => void>(() => {})
  const rebuildEvents = useRef<() => void>(() => {})
  const eventPopup = useRef<HTMLDivElement>(null)
  const eventTrigger = useRef<HTMLElement | null>(null)
  const [eventGroup, setEventGroup] = useState<EventGroup | null>(null)
  const [referenceLoading, setReferenceLoading] = useState(false)
  const [referenceError, setReferenceError] = useState(false)
  const [ready, setReady] = useState(false)
  const [focusRevision, setFocusRevision] = useState(0)
  const pendingFocus = useRef(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reload, setReload] = useState(0)
  const [city, setCity] = useState<City | null>(null)
  const [collection, setCollection] = useState<FeatureCollection | null>(null)
  const [loadedPeriod, setLoadedPeriod] = useState('')
  const slice = mapSlice(props.year)

  function closeEventGroup() {
    setEventGroup(null)
    arrange.current()
    requestAnimationFrame(() => eventTrigger.current?.focus())
  }

  useEffect(() => {
    if (!container.current) return
    let instance: maplibregl.Map
    try {
      const camera = current.current.initialCamera ?? defaultCamera(container.current)
      instance = new maplibregl.Map({
        container: container.current,
        center: [camera.lng, camera.lat],
        zoom: camera.zoom,
        minZoom: -1,
        maxZoom: 8,
        maxPitch: 0,
        attributionControl: false,
        renderWorldCopies: false,
        style: {
          version: 8,
          sources: {},
          layers: [{ id: 'water', type: 'background', paint: { 'background-color': '#e3ebeb' } }],
        },
      })
    } catch {
      setError('当前浏览器无法开启地图，请使用支持 WebGL 的浏览器。事件与人物仍可浏览。')
      setLoading(false)
      return
    }
    map.current = instance
    instance.addControl(
      new maplibregl.AttributionControl({
        compact: true,
        customAttribution:
          '<a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener noreferrer">Natural Earth</a> · <a href="https://github.com/Seshat-Global-History-Databank/cliopatria" target="_blank" rel="noopener noreferrer">Cliopatria / Seshat</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>',
      }),
      'bottom-right',
    )
    instance.on('load', () => {
      instance.addSource('land', { type: 'geojson', data: `${base}data/land.geojson` })
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
        paint: { 'line-color': '#c0ccc7', 'line-width': 0.8 },
      })
      instance.addSource('grid', { type: 'geojson', data: graticule() })
      instance.addLayer({
        id: 'grid',
        type: 'line',
        source: 'grid',
        paint: {
          'line-color': '#afbdb9',
          'line-width': 0.5,
          'line-opacity': 0.24,
          'line-dasharray': [2, 5],
        },
      })
      instance.addSource('territories', { type: 'geojson', data: empty, promoteId: 'id' })
      instance.addLayer({
        id: 'territories',
        type: 'fill',
        source: 'territories',
        paint: { 'fill-color': ['get', 'color'], 'fill-opacity': 0.73 },
      })
      instance.addLayer({
        id: 'territory-borders',
        type: 'line',
        source: 'territories',
        paint: {
          'line-color': '#fffef6',
          'line-width': 1.2,
          'line-opacity': 0.72,
          'line-dasharray': [4, 2],
        },
      })
      instance.addLayer({
        id: 'territory-selected',
        type: 'line',
        source: 'territories',
        filter: ['==', ['get', 'name'], ''],
        paint: { 'line-color': '#426454', 'line-width': 2.2 },
      })
      instance.addSource('lakes', { type: 'geojson', data: `${base}data/lakes.geojson` })
      instance.addLayer({
        id: 'lakes',
        type: 'fill',
        source: 'lakes',
        paint: { 'fill-color': '#c9d8d7', 'fill-opacity': 0.75 },
      })
      instance.addSource('rivers', {
        type: 'geojson',
        data: `${base}data/rivers_lake_centerlines.geojson`,
      })
      instance.addLayer({
        id: 'rivers',
        type: 'line',
        source: 'rivers',
        paint: {
          'line-color': '#6e979b',
          'line-width': ['interpolate', ['linear'], ['zoom'], 2, 0.5, 6, 1.5],
          'line-opacity': 0.5,
        },
      })
      instance.addSource('route', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: { type: 'LineString', coordinates: silkRoadCoordinates },
            },
          ],
        },
      })
      instance.addLayer({
        id: 'route-halo',
        type: 'line',
        source: 'route',
        layout: { visibility: 'none' },
        paint: { 'line-color': '#fff8e4', 'line-width': 5, 'line-opacity': 0.9 },
      })
      instance.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: { visibility: 'none' },
        paint: { 'line-color': '#a58250', 'line-width': 2, 'line-dasharray': [3, 2] },
      })
      instance.addSource('reference-territories', { type: 'geojson', data: empty })
      instance.addLayer(
        {
          id: 'reference-borders',
          type: 'line',
          source: 'reference-territories',
          paint: {
            'line-color': '#557da8',
            'line-width': 2,
            'line-dasharray': [3, 2],
            'line-opacity': 0.9,
          },
        },
        'territory-selected',
      )
      instance.addSource('person-trail', { type: 'geojson', data: empty })
      instance.addSource('journey-progress', { type: 'geojson', data: empty })
      const arrowCanvas = document.createElement('canvas')
      arrowCanvas.width = 40
      arrowCanvas.height = 40
      const arrowContext = arrowCanvas.getContext('2d')!
      // The image points up; +90° makes its head follow the line's forward tangent.
      arrowContext.beginPath()
      arrowContext.moveTo(20, 5)
      arrowContext.lineTo(31, 23)
      arrowContext.lineTo(24, 20)
      arrowContext.lineTo(24, 34)
      arrowContext.lineTo(16, 34)
      arrowContext.lineTo(16, 20)
      arrowContext.lineTo(9, 23)
      arrowContext.closePath()
      arrowContext.fillStyle = '#fff'
      arrowContext.fill()
      instance.addImage('journey-arrow', arrowContext.getImageData(0, 0, 40, 40), {
        sdf: true,
        pixelRatio: 2,
      })
      instance.addLayer({
        id: 'person-trail',
        type: 'line',
        source: 'person-trail',
        paint: {
          'line-color': [
            'match',
            ['get', 'status'],
            'future',
            '#b4b6b9',
            'current',
            '#a37330',
            '#74648f',
          ],
          'line-width': 2.4,
          'line-dasharray': [3, 2],
          'line-opacity': ['case', ['==', ['get', 'status'], 'future'], 0.45, 0.9],
        },
      })
      instance.addLayer({
        id: 'journey-progress-halo',
        type: 'line',
        source: 'journey-progress',
        paint: { 'line-color': '#fff9de', 'line-width': 7, 'line-opacity': 0.85 },
      })
      instance.addLayer({
        id: 'journey-progress-line',
        type: 'line',
        source: 'journey-progress',
        paint: { 'line-color': '#aa7634', 'line-width': 3 },
      })
      instance.addLayer({
        id: 'person-trail-arrows',
        type: 'symbol',
        source: 'person-trail',
        layout: {
          'symbol-placement': 'line-center',
          'icon-image': 'journey-arrow',
          'icon-size': 0.85,
          'icon-rotation-alignment': 'map',
          'icon-rotate': 90,
          'icon-keep-upright': false,
          'icon-allow-overlap': true,
        },
        paint: {
          'icon-color': [
            'match',
            ['get', 'status'],
            'future',
            '#b4b6b9',
            'current',
            '#a37330',
            '#74648f',
          ],
          'icon-halo-color': '#fffdf4',
          'icon-halo-width': 1.5,
          'icon-opacity': ['case', ['==', ['get', 'status'], 'future'], 0.45, 1],
        },
      })
      instance.on('click', 'territories', (event) => {
        if ((event.originalEvent.target as HTMLElement).closest('button')) return
        const name = event.features?.[0]?.properties?.name as string | undefined
        if (name) current.current.onSelect({ type: 'polity', id: name })
      })
      instance.on('mouseenter', 'territories', () => {
        instance.getCanvas().style.cursor = 'pointer'
      })
      instance.on('mouseleave', 'territories', () => {
        instance.getCanvas().style.cursor = ''
      })
      instance.on('idle', () => {
        if (container.current) {
          container.current.dataset.rendered = String(
            instance.isSourceLoaded('land') &&
              instance.isSourceLoaded('territories') &&
              instance.queryRenderedFeatures({ layers: ['land'] }).length > 0,
          )
          container.current.dataset.referenceRendered = String(
            current.current.compareYear !== null &&
              instance.isSourceLoaded('reference-territories') &&
              instance.queryRenderedFeatures({ layers: ['reference-borders'] }).length > 0,
          )
          container.current.dataset.routeRendered = String(
            current.current.showRoutes &&
              instance.queryRenderedFeatures({ layers: ['route'] }).length > 0,
          )
          container.current.dataset.trailRendered = String(
            Boolean(current.current.trail) &&
              instance.isSourceLoaded('person-trail') &&
              instance.queryRenderedFeatures({ layers: ['person-trail'] }).length > 0,
          )
          container.current.dataset.trailArrowsRendered = String(
            Boolean(current.current.trail) &&
              instance.queryRenderedFeatures({ layers: ['person-trail-arrows'] }).length > 0,
          )
        }
      })
      const bounds = instance.getBounds()
      current.current.onBounds([
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth(),
      ])
      const center = instance.getCenter()
      current.current.onCamera({
        lng: +center.lng.toFixed(3),
        lat: +center.lat.toFixed(3),
        zoom: +instance.getZoom().toFixed(2),
      })
      setReady(true)
    })
    instance.on('moveend', () => {
      const bounds = instance.getBounds()
      current.current.onBounds([
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth(),
      ])
      const center = instance.getCenter()
      current.current.onCamera({
        lng: +center.lng.toFixed(3),
        lat: +center.lat.toFixed(3),
        zoom: +instance.getZoom().toFixed(2),
      })
    })
    instance.on('error', (event) => {
      if (/fetch|network|404|worker/i.test(event.error.message))
        setError('地图文件或引擎加载失败，请检查网络后重试。')
    })
    let frame: number | null = null
    const layout = () => {
      frame = null
      if (!container.current) return
      const viewport = container.current.getBoundingClientRect()
      const obstacles = [
        ...container.current
          .closest('.map-shell')!
          .querySelectorAll<HTMLElement>(
            '.layers-button,.map-legend,.layers-popover,.map-controls,.tour-banner,.comparison-controls,.trail-note,.map-event-popup,.city-popup,.focus-explanation[open] > div,.early-map-note,.maplibregl-ctrl-attrib',
          ),
      ]
        .filter((el) => el.offsetWidth > 0)
        .map((el) => el.getBoundingClientRect())
      const occupied = [...obstacles]
      const items = [
        ...labels.current,
        ...cityLabels.current,
        ...eventLabels.current,
        ...placeLabels.current,
      ].sort((a, b) => b.priority - a.priority)
      for (const item of items) {
        const fits = (rect: DOMRect) =>
          rect.left >= viewport.left + 5 &&
          rect.right <= viewport.right - 5 &&
          rect.top >= viewport.top + 5 &&
          rect.bottom <= viewport.bottom - 12 &&
          !occupied.some((other) => intersects(rect, other, 3))
        const movable = item.element.matches(
          '.topic-marker.selected,.journey-marker.selected,.named-event.selected,.polity-label.major,.place-focus-label',
        )
        if (movable) item.element.style.translate = 'none'
        let rect = item.element.getBoundingClientRect()
        const anchor = instance.project(item.marker.getLngLat())
        const anchorInside =
          anchor.x >= 0 &&
          anchor.x <= viewport.width &&
          anchor.y >= 0 &&
          anchor.y <= viewport.height
        if (movable && anchorInside && !fits(rect)) {
          // Keep the geographic anchor unchanged; move only the reading label.
          const horizontalFit = Math.min(
            Math.max(0, viewport.left + 8 - rect.left),
            viewport.right - 8 - rect.right,
          )
          const offsets = item.element.classList.contains('polity-label')
            ? [
                [-90, 0],
                [90, 0],
                [0, 48],
                [0, -48],
                [-90, 48],
                [90, 48],
              ]
            : item.element.classList.contains('journey-marker')
              ? [
                  [-70, 32],
                  [70, 32],
                  [-70, 52],
                  [70, 52],
                ]
              : [
                  [horizontalFit, 0],
                  [0, rect.height + 8],
                  [-50, rect.height + 8],
                  [50, rect.height + 8],
                  [horizontalFit, rect.height + 8],
                ]
          for (const [x, y] of offsets) {
            item.element.style.translate = `${x}px ${y}px`
            rect = item.element.getBoundingClientRect()
            if (fits(rect)) break
          }
        }
        const visible =
          anchorInside &&
          fits(rect) &&
          !(
            item.kind === 'city' &&
            !item.capital &&
            instance.getZoom() < 3.6 &&
            !current.current.showRoutes
          )

        item.element.style.visibility = visible ? 'visible' : 'hidden'
        item.element.dataset.visible = String(visible)
        if (visible) occupied.push(rect)
      }
    }
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(layout)
    }
    arrange.current = schedule
    instance.on('move', schedule)
    instance.on('idle', schedule)
    instance.on('zoomend', () => {
      rebuildEvents.current()
      schedule()
    })
    let previousSize = [container.current.clientWidth, container.current.clientHeight]
    let wasHidden = !previousSize[0] || !previousSize[1]
    const observer = new ResizeObserver(() => {
      if (!container.current) return
      // Reading mode hides the canvas. Preserve its camera instead of resizing
      // to a zero-sized box and publishing artificial bounds/history updates.
      if (!container.current.clientWidth || !container.current.clientHeight) {
        wasHidden = true
        instance.stop()
        return
      }
      instance.resize()
      if (pendingFocus.current) {
        pendingFocus.current = false
        setFocusRevision((revision) => revision + 1)
      }
      const element = container.current!
      const changed =
        wasHidden ||
        element.clientWidth !== previousSize[0] ||
        element.clientHeight !== previousSize[1]
      wasHidden = false
      previousSize = [element.clientWidth, element.clientHeight]
      // A responsive layout changes the usable map, not the selected place.
      // Reframe only the active reading location when it would leave that area.
      const state = current.current
      const node = state.trail?.nodes.find((item) => item.id === state.trail?.activeId)
      const event = state.events.find((item) =>
        state.topicSteps ? item.id === state.selection?.id : item.id === state.spotlightId,
      )
      const location =
        state.playing && node && traveler.current
          ? traveler.current.getLngLat().toArray()
          : (node?.coordinates ??
            (state.selection?.type === 'place'
              ? placeById.get(state.selection.id)?.coordinates
              : undefined) ??
            event?.coordinates)
      if (changed && location && element.clientWidth > 100 && element.clientHeight > 100) {
        const point = instance.project(location)
        const padding = readingPadding(element, !!state.topicSteps)
        if (
          point.x < padding.left ||
          point.x > element.clientWidth - padding.right ||
          point.y < padding.top ||
          point.y > element.clientHeight - padding.bottom
        ) {
          instance.stop()
          instance.jumpTo({ center: location, padding })
        }
      }
      rebuildEvents.current()
      schedule()
    })
    observer.observe(container.current)
    const overlays = new MutationObserver(schedule)
    overlays.observe(container.current.closest('.map-shell')!, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['open'],
    })
    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      observer.disconnect()
      overlays.disconnect()
      for (const item of [
        ...labels.current,
        ...cityLabels.current,
        ...eventLabels.current,
        ...placeLabels.current,
      ])
        item.marker.remove()
      instance.remove()
      map.current = null
      arrange.current = () => {}
      rebuildEvents.current = () => {}
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    const id = slice
    const loadingNotice = window.setTimeout(() => setLoading(true), 180)
    setEventGroup(null)
    const load = async () => {
      try {
        const data = await loadCollection(id)
        if (cancelled) return
        window.clearTimeout(loadingNotice)
        setCollection(data)
        setLoadedPeriod(id)
        setError(null)
        setLoading(false)
      } catch {
        if (!cancelled) {
          window.clearTimeout(loadingNotice)
          setError('新年份疆域尚未加载，当前保留上一幅地图。请重试；事件与人物仍可阅读。')
          setLoading(false)
        }
      }
    }
    void load()
    return () => {
      cancelled = true
      window.clearTimeout(loadingNotice)
    }
  }, [slice, reload])

  useEffect(() => {
    if (!props.playing) return
    const period = periodAt(props.year)
    const chunk = Math.floor((toOrdinal(props.year) - toOrdinal(period.from)) / 20)
    const nextYear = fromOrdinal(
      Math.min(toOrdinal(period.to) + 1, toOrdinal(period.from) + (chunk + 1) * 20),
    )
    if (nextYear <= MAX_YEAR) void loadCollection(mapSlice(nextYear)).catch(() => {})
  }, [props.playing, slice])

  useEffect(() => {
    const instance = map.current
    if (!ready || !instance || !collection || loadedPeriod !== slice) return
    if (container.current) container.current.dataset.mapYear = String(props.year)
    const features = activeMapFeatures(collection.features as PolityFeature[], props.year)
    const unique = new Map(features.map((feature) => [feature.properties.name, feature.properties]))
    current.current.onPolities([...unique.values()].sort(polityOrder))
    const visible = features.filter((f) => !props.hiddenPolities.includes(f.properties.name))
    const nextKey = visible.map((f) => f.properties.id + ':' + f.properties.nameZh).join('|')
    if (territoryKey.current === nextKey) {
      arrange.current()
      return
    }
    territoryKey.current = nextKey
    if (container.current) container.current.dataset.rendered = 'false'
    ;(instance.getSource('territories') as maplibregl.GeoJSONSource).setData({
      type: 'FeatureCollection',
      features: visible,
    })
    const previous = new Map(labels.current.map((label) => [label.key, label]))
    labels.current = []
    const seenLabels = new Set<string>()
    for (const feature of visible) {
      const p = feature.properties
      // Keep unfamiliar small regional entities in the clickable map, without flooding the map with labels.
      if (p.area < 0.1) continue
      const key = `${p.name}:${p.nameZh}:${p.label.join(',')}`
      if (seenLabels.has(key)) continue
      seenLabels.add(key)
      const retained = previous.get(key)
      if (retained) {
        labels.current.push(retained)
        previous.delete(key)
        continue
      }
      const element = document.createElement('button')
      element.className = `polity-label ${p.nameZh === p.name ? 'foreign' : p.area > 90 ? 'major' : ''}`
      element.textContent = p.nameZh
      element.setAttribute('aria-label', `查看${p.nameZh}疆域资料`)
      element.addEventListener('click', () =>
        current.current.onSelect({ type: 'polity', id: p.name }),
      )
      element.style.visibility = 'hidden'
      labels.current.push({
        key,
        marker: new maplibregl.Marker({ element }).setLngLat(p.label).addTo(instance),
        element,
        priority:
          p.name === props.selection?.id ? 350 : p.nameZh !== p.name && p.area > 90 ? 150 : 70,
        kind: 'polity',
      })
    }
    previous.forEach((label) => label.marker.remove())
    arrange.current()
  }, [ready, collection, loadedPeriod, slice, props.year, props.hiddenPolities, props.selection])

  useEffect(() => {
    const instance = map.current
    if (!ready || !instance) return
    const rebuild = () => {
      const previous = new Map(eventLabels.current.map((item) => [item.key, item]))
      eventLabels.current = []
      if (!current.current.showEvents) {
        previous.forEach((item) => item.marker.remove())
        arrange.current()
        return
      }
      const groups = groupMapEvents(current.current.events, (coordinates) =>
        instance.project(coordinates),
      )
      for (const group of groups) {
        const selected = group.events.some((event) =>
          current.current.trail
            ? event.id === current.current.trail.activeId
            : event.id === current.current.spotlightId ||
              (current.current.selection?.type === 'event' &&
                event.id === current.current.selection.id),
        )
        const single = group.events.length === 1 ? group.events[0] : null
        const activeJourneyRecord = selected
          ? current.current.trail?.nodes.find((node) => node.id === current.current.trail!.activeId)
          : undefined
        const topicEvent = current.current.topicSteps
          ? (group.events.find(
              (event) =>
                current.current.selection?.type === 'event' &&
                event.id === current.current.selection.id,
            ) ?? single)
          : null
        const namedEvent =
          !current.current.trail && !topicEvent
            ? (group.events.find((event) => event.id === current.current.spotlightId) ??
              group.events.find(
                (event) =>
                  current.current.selection?.type === 'event' &&
                  event.id === current.current.selection.id,
              ) ??
              eventsAtYear(group.events, current.current.year)[0] ??
              (single && (single.importance >= 5 || instance.getZoom() >= 4) ? single : null))
            : null
        const key = [
          group.events.map((e) => e.id).join(','),
          selected,
          current.current.trail?.activeId ?? '',
          topicEvent?.id ?? '',
          namedEvent?.id ?? '',
          single ? eventDateRelation(single, current.current.year) === '当年' : '',
          single ? single.year > current.current.year : '',
        ].join('|')
        const retained = previous.get(key)
        if (retained) {
          if (single)
            retained.element.title = `${formatEventDate(single)} · ${single.title} · ${eventDateRelation(single, current.current.year)}`
          eventLabels.current.push(retained)
          previous.delete(key)
          continue
        }
        const element = document.createElement('button')
        element.style.visibility = 'hidden'
        const relation = single
          ? eventDateRelation(single, current.current.year)
          : `${compactYear(group.events[0].year)}—${compactYear(group.events.at(-1)!.year)}`
        element.className = `event-marker ${current.current.trail ? 'journey-marker' : current.current.topicSteps ? 'topic-marker' : namedEvent ? 'named-event' : ''} ${selected ? 'selected' : ''} ${single && single.year > current.current.year ? 'future' : ''} ${single && single.year === current.current.year ? 'present' : ''}`
        const dot = document.createElement('span')
        dot.className = 'event-marker-dot'
        dot.textContent =
          selected && current.current.trail
            ? String(
                current.current.trail.nodes.findIndex(
                  (node) => node.id === current.current.trail!.activeId,
                ) + 1,
              )
            : single && current.current.trail
              ? String(current.current.trail.nodes.findIndex((node) => node.id === single.id) + 1)
              : topicEvent && current.current.topicSteps
                ? String(current.current.topicSteps.indexOf(topicEvent.id) + 1)
                : single
                  ? ''
                  : String(group.events.length)
        const date = document.createElement('small')
        date.textContent = single
          ? compactYear(single.year)
          : current.current.trail
            ? '行迹'
            : '事件'
        element.append(dot, date)
        if (current.current.trail) {
          const nodes = group.events.map((event) =>
            current.current.trail!.nodes.find((node) => node.id === event.id)!,
          )
          const label = document.createElement('span')
          label.className = 'journey-node-label'
          const location = document.createElement('strong')
          const activity = document.createElement('span')
          const active =
            nodes.find((node) => node.id === current.current.trail!.activeId) ?? nodes.at(-1)!
          const places = [...new Set(nodes.map((node) => node.location.split(' · ')[0]))]
          location.textContent =
            single || selected || places.length === 1
              ? active.location
              : `${places.slice(0, 2).join(' / ')}${places.length > 2 ? `等${places.length}处` : ''}`
          activity.textContent =
            single || selected
              ? active.kind
              : `${[...new Set(nodes.map((node) => node.kind))].join(' / ')} · ${nodes.length} 条`
          date.textContent =
            single || selected
              ? `${compactYear(active.year)}年${single ? '' : ` · 另 ${nodes.length - 1} 条`}`
              : `${compactYear(nodes[0].year)}—${compactYear(nodes.at(-1)!.year)}`
          label.append(location, activity)
          element.append(label)
          element.dataset.activity = nodes.map((node) => node.kind).join(',')
        } else if (topicEvent) {
          const title = document.createElement('strong')
          title.className = 'topic-marker-label'
          title.textContent = topicEvent.title
          date.textContent = `${compactYear(topicEvent.year)}${single ? '' : ` · 另 ${group.events.length - 1} 章`}`
          element.dataset.activeEvent = topicEvent.id
          element.append(title)
        } else if (namedEvent) {
          const title = document.createElement('strong')
          title.className = 'named-event-title'
          title.textContent = namedEvent.title
          date.textContent = `${namedEvent.dateLabel ? '约' : ''}${compactYear(namedEvent.year)}${namedEvent.endYear ? '—' + compactYear(namedEvent.endYear) : ''} · ${namedEvent.category}${single ? '' : ` · 另${group.events.length - 1}件`}`
          element.dataset.activeEvent = namedEvent.id
          element.append(title)
        }
        element.title = single
          ? `${formatEventDate(single)} · ${single.title} · ${relation}`
          : `${topicEvent ? `${topicEvent.title} · ` : ''}${group.events.length} 个事件 · ${relation}，点击展开`
        element.setAttribute(
          'aria-label',
          single
            ? `${formatEventDate(single)}，${current.current.trail?.nodes.find((node) => node.id === single.id)?.kind ?? single.category}，${single.title}`
            : `展开 ${group.events.length} 个${current.current.trail ? '行迹记录' : '地点事件'}`,
        )
        element.dataset.eventYears = group.events.map((event) => event.year).join(',')
        element.dataset.eventIds = group.events.map((event) => event.id).join(' ')
        element.addEventListener('click', (event) => {
          event.stopPropagation()
          setCity(null)
          if (single) {
            setEventGroup(null)
            if (current.current.trail) current.current.onJourneyNode(single.id)
            else current.current.onSelect({ type: 'event', id: single.id })
          } else {
            eventTrigger.current = element
            setEventGroup(group)
          }
        })
        eventLabels.current.push({
          key,
          marker: new maplibregl.Marker({
            element,
            anchor: 'bottom',
            offset: [0, current.current.trail ? -63 : -3],
          })
            .setLngLat(
              activeJourneyRecord?.coordinates ??
                topicEvent?.coordinates ??
                namedEvent?.coordinates ??
                group.coordinates,
            )
            .addTo(instance),
          element,
          kind: 'event',
          priority: selected ? 450 : namedEvent ? 280 : 120,
        })
      }
      previous.forEach((item) => item.marker.remove())
      arrange.current()
    }
    rebuildEvents.current = rebuild
    rebuild()

    const routesVisible = props.showRoutes && props.year >= -138 && props.year <= 1600
    instance.setLayoutProperty('route', 'visibility', routesVisible ? 'visible' : 'none')
    instance.setLayoutProperty('route-halo', 'visibility', routesVisible ? 'visible' : 'none')
    arrange.current()
  }, [
    ready,
    props.events,
    props.showEvents,
    props.showRoutes,
    props.year,
    props.selection,
    props.trail,
    props.topicSteps,
    props.spotlightId,
  ])

  useEffect(() => {
    const instance = map.current
    if (!ready || !instance) return
    const previous = new Map(cityLabels.current.map((label) => [label.key, label]))
    cityLabels.current = []
    if (!props.showCities) {
      previous.forEach((label) => label.marker.remove())
      return
    }
    for (const city of cities.filter((c) => c.from <= props.year && c.to >= props.year)) {
      const capital = city.capitals.some(([from, to]) => props.year >= from && props.year <= to)
      const key = `${city.id}:${capital}`
      const retained = previous.get(key)
      if (retained) {
        cityLabels.current.push(retained)
        previous.delete(key)
        continue
      }
      const element = document.createElement('button')
      element.className = `city-label ${capital ? 'capital' : ''}`
      const dot = document.createElement('span')
      dot.className = 'city-dot'
      dot.textContent = capital ? '✦' : ''
      const text = document.createElement('span')
      text.textContent = city.name
      element.append(dot, text)
      element.setAttribute('aria-label', `查看${city.name}古今地名`)
      element.addEventListener('click', () => {
        setEventGroup(null)
        setCity(city)
      })
      element.style.visibility = 'hidden'
      cityLabels.current.push({
        key,
        marker: new maplibregl.Marker({ element, anchor: 'left', offset: [-4, 0] })
          .setLngLat(city.coordinates)
          .addTo(instance),
        element,
        kind: 'city',
        priority: capital ? 100 : 55,
        capital,
      })
    }
    previous.forEach((label) => label.marker.remove())
    arrange.current()
  }, [ready, props.showCities, props.year])

  useEffect(() => {
    const instance = map.current
    if (!ready || !instance) return
    instance.setFilter('territory-selected', [
      '==',
      ['get', 'name'],
      props.selection?.type === 'polity' ? props.selection.id : '',
    ])
  }, [ready, props.selection])

  useEffect(() => {
    if (!ready || !map.current) return
    const instance = map.current
    let cancelled = false
    setReferenceError(false)
    if (container.current) container.current.dataset.referenceRendered = 'false'
    ;(instance.getSource('reference-territories') as maplibregl.GeoJSONSource).setData(empty)
    if (props.compareYear === null) {
      setReferenceLoading(false)
      return
    }
    setReferenceLoading(true)
    const referenceYear = props.compareYear
    void loadCollection(mapSlice(referenceYear))
      .then((data) => {
        if (cancelled) return
        const features = activeMapFeatures(data.features as PolityFeature[], referenceYear)
        ;(instance.getSource('reference-territories') as maplibregl.GeoJSONSource).setData({
          type: 'FeatureCollection',
          features,
        })
        setReferenceLoading(false)
      })
      .catch(() => {
        if (!cancelled) {
          setReferenceLoading(false)
          setReferenceError(true)
        }
      })
    return () => {
      cancelled = true
    }
  }, [ready, props.compareYear, reload])

  useEffect(() => {
    if (!ready || !map.current) return
    if (container.current) {
      container.current.dataset.trailRendered = 'false'
      container.current.dataset.trailArrowsRendered = 'false'
    }
    ;(map.current.getSource('person-trail') as maplibregl.GeoJSONSource).setData(
      props.trail ? journeySegments(props.trail) : empty,
    )
  }, [ready, props.trail])

  useEffect(() => {
    if (!ready || !map.current || !props.trail) return
    const instance = map.current
    const element = document.createElement('div')
    element.className = 'journey-traveler'
    element.setAttribute('role', 'img')
    element.innerHTML = `<span class="traveler-halo"></span><svg class="traveler-figure" viewBox="0 0 40 52" aria-hidden="true"><ellipse class="traveler-shadow" cx="20" cy="48" rx="11" ry="3"/><g class="traveler-body"><path class="traveler-pack" d="M11 23Q4 23 6 33L12 36Z"/><circle class="traveler-head" cx="20" cy="10" r="6"/><path class="traveler-hat" d="M12 8L16 3H25L28 8Z"/><path class="traveler-coat" d="M16 19Q20 16 25 20L29 37Q20 41 11 36Z"/><path class="traveler-sash" d="M15 24L26 31"/><path class="traveler-arm" d="M24 21L31 27L34 25"/><path class="traveler-staff" d="M34 23L33 47"/><path class="traveler-leg traveler-leg-left" d="M17 37L14 46L10 47"/><path class="traveler-leg traveler-leg-right" d="M23 37L25 46L29 47"/></g></svg><span class="traveler-name"></span>`
    element.querySelector('.traveler-name')!.textContent = props.trail.name
    const marker = new maplibregl.Marker({ element, anchor: 'bottom', offset: [0, -5] })
    traveler.current = marker
    return () => {
      marker.remove()
      traveler.current = null
      travelProgress.current = { key: '', value: 0 }
      ;(instance.getSource('journey-progress') as maplibregl.GeoJSONSource | undefined)?.setData(
        empty,
      )
    }
  }, [ready, props.trail?.personId])

  useEffect(() => {
    if (!ready || !map.current || !traveler.current || !props.trail) return
    const view = props.trail
    const from = view.nodes.find((node) => node.id === view.activeId)
    const to = nextJourneyNode(view.nodes, view.activeId)
    if (!from) return
    const marker = traveler.current
    const instance = map.current
    const source = instance.getSource('journey-progress') as maplibregl.GeoJSONSource
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const key = `${view.personId}:${from.id}:${props.journeyResetToken}`
    if (travelProgress.current.key !== key) travelProgress.current = { key, value: 0 }
    const element = marker.getElement()
    element.dataset.from = from.id
    element.dataset.to = to?.id ?? ''
    element.dataset.direction = to && to.coordinates[0] < from.coordinates[0] ? 'left' : 'right'
    element.dataset.playing = String(props.playing && Boolean(to))
    element.setAttribute(
      'aria-label',
      `${view.name} · ${to ? '两条年谱记录间的示意动画' : '最后一条年谱记录'}`,
    )
    marker.setLngLat(from.coordinates).addTo(instance)
    function draw(progress: number) {
      const visibleProgress = reduced && progress < 1 ? 0 : journeyMotionProgress(progress)
      const point = to
        ? interpolateJourneyCoordinates(from!.coordinates, to.coordinates, visibleProgress)
        : from!.coordinates
      marker.setLngLat(point)
      element.dataset.progress = progress.toFixed(4)
      element.dataset.phase =
        visibleProgress === 0 ? 'rest' : visibleProgress >= 1 ? 'arrived' : 'moving'
      const caption = element.querySelector<HTMLElement>('.traveler-name')!
      caption.textContent = to
        ? `${view.name} · ${visibleProgress >= 1 ? '抵达 ' + to.location : visibleProgress === 0 ? from!.location : '前往 ' + to.location}`
        : view.name
      // At rest the numbered record remains directly clickable beside the traveler.
      marker.setOffset(visibleProgress === 0 ? [24, -5] : [0, -5])
      const projected = instance.project(point)
      const width = container.current!.clientWidth
      const captionX = projected.x + (visibleProgress === 0 ? 24 : 0)
      const halfCaption = caption.offsetWidth / 2
      caption.style.translate = `${Math.max(halfCaption + 8, Math.min(width - halfCaption - 8, captionX)) - captionX}px 0`
      // A resize or an unfinished entry camera can change framing mid-segment.
      // Follow again only when the traveler leaves the readable map area.
      const padding = readingPadding(container.current!)
      if (
        current.current.playing &&
        !instance.isMoving() &&
        (projected.x < padding.left ||
          projected.x > width - padding.right ||
          projected.y < padding.top ||
          projected.y > container.current!.clientHeight - padding.bottom)
      ) {
        instance.easeTo({ center: point, padding, duration: reduced ? 0 : 400 })
      }
      source.setData(
        to && visibleProgress > 0
          ? {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: { type: 'LineString', coordinates: [from!.coordinates, point] },
                },
              ],
            }
          : empty,
      )
    }
    draw(travelProgress.current.value)
    if (!props.playing || !to) {
      if (travelProgress.current.value > 0) instance.stop()
      return
    }
    const padding = readingPadding(container.current!)
    const safelyVisible = (coordinates: [number, number]) => {
      const point = instance.project(coordinates)
      return (
        point.x > padding.left &&
        point.x < container.current!.clientWidth - padding.right &&
        point.y > padding.top &&
        point.y < container.current!.clientHeight - padding.bottom
      )
    }
    if (
      travelProgress.current.value === 0 &&
      (!safelyVisible(from.coordinates) || !safelyVisible(to.coordinates))
    ) {
      instance.fitBounds(
        [
          [
            Math.min(from.coordinates[0], to.coordinates[0]),
            Math.min(from.coordinates[1], to.coordinates[1]),
          ],
          [
            Math.max(from.coordinates[0], to.coordinates[0]),
            Math.max(from.coordinates[1], to.coordinates[1]),
          ],
        ],
        {
          absolutePadding: true,
          padding: readingPadding(container.current!),
          maxZoom: 4.1,
          duration: reduced ? 0 : Math.min(700, (JOURNEY_LEG_DURATION_MS / props.speed) * 0.25),
        },
      )
    }
    let frame = 0
    let previous = performance.now()
    let lastPaint = 0
    function animate(now: number) {
      const elapsed = document.hidden ? 0 : Math.min(now - previous, 100)
      previous = now
      travelProgress.current.value = Math.min(
        1,
        travelProgress.current.value + (elapsed * current.current.speed) / JOURNEY_LEG_DURATION_MS,
      )
      // The marker moves every frame; source updates are capped at 30 fps.
      const progress = travelProgress.current.value
      const point = interpolateJourneyCoordinates(
        from!.coordinates,
        to!.coordinates,
        reduced ? (progress < 1 ? 0 : 1) : journeyMotionProgress(progress),
      )
      marker.setLngLat(point)
      element.dataset.progress = progress.toFixed(4)
      if (now - lastPaint > 33 || progress === 1) {
        draw(progress)
        lastPaint = now
      }
      if (progress >= 1) {
        current.current.onJourneyArrival(to!.id)
        return
      }
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [ready, props.trail?.personId, props.trail?.activeId, props.playing, props.journeyResetToken])

  useEffect(() => {
    const instance = map.current
    const place = props.selection?.type === 'place' ? placeById.get(props.selection.id) : undefined
    if (!ready || !instance || !place) return
    const element = document.createElement('button')
    element.className = 'place-focus-label'
    element.style.visibility = 'hidden'
    element.setAttribute('aria-label', `阅读${place.name}地点档案`)
    const caption = document.createElement('small')
    caption.textContent = '地点参照'
    const title = document.createElement('strong')
    title.textContent = place.name
    element.append(caption, title)
    element.onclick = (event) => {
      event.stopPropagation()
      current.current.onSelect({ type: 'place', id: place.id })
    }
    const marker = new maplibregl.Marker({ element, anchor: 'bottom', offset: [0, -5] })
      .setLngLat(place.coordinates)
      .addTo(instance)
    placeLabels.current = [{ marker, element, priority: 3000, kind: 'event' }]
    arrange.current()
    return () => {
      marker.remove()
      placeLabels.current = []
      arrange.current()
    }
  }, [ready, props.selection?.type, props.selection?.id])

  useEffect(() => {
    setEventGroup(null)
    setCity(null)
    arrange.current()
  }, [props.year, props.events, props.compareYear, props.selection])

  useEffect(() => {
    const instance = map.current
    if (!ready || !instance || !props.playing || !props.showEvents || !props.spotlightId) return
    const event = props.events.find((e) => e.id === props.spotlightId)
    if (!event) return
    const point = instance.project(event.coordinates)
    const padding = readingPadding(container.current!)
    if (
      point.x < padding.left ||
      point.x > container.current!.clientWidth - padding.right ||
      point.y < padding.top ||
      point.y > container.current!.clientHeight - padding.bottom
    )
      instance.easeTo({
        center: event.coordinates,
        zoom: Math.min(instance.getZoom(), 3.45),
        padding,
        duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 500,
      })
  }, [ready, props.spotlightId, props.playing, props.showEvents])

  useEffect(() => {
    arrange.current()
  }, [eventGroup, city, referenceLoading, referenceError])

  useEffect(() => {
    if (!eventGroup) return
    const frame = requestAnimationFrame(() => eventPopup.current?.querySelector('button')?.focus())
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeEventGroup()
      }
    }
    document.addEventListener('keydown', escape)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', escape)
    }
  }, [eventGroup])

  useEffect(() => {
    const instance = map.current
    if (!ready || !instance || !props.focus) return
    setCity(null)
    // A hidden map still needs the selected camera for sharing. Apply it without
    // animation, then reframe against the visible viewport when it returns.
    const hidden = !container.current?.clientWidth || !container.current.clientHeight
    pendingFocus.current = hidden
    if ('camera' in props.focus) {
      instance.jumpTo({
        center: [props.focus.camera.lng, props.focus.camera.lat],
        zoom: props.focus.camera.zoom,
        padding: { top: 0, bottom: 0, left: 0, right: 0 },
      })
    } else if ('bounds' in props.focus) {
      const compact = container.current!.clientWidth < 600
      instance.fitBounds(props.focus.bounds, {
        absolutePadding: true,
        padding:
          current.current.trail || current.current.topicSteps
            ? readingPadding(container.current!, !!current.current.topicSteps)
            : compact
              ? { top: 28, bottom: 68, left: 36, right: 65 }
              : { top: 55, bottom: 110, left: 55, right: 75 },
        maxZoom: 4.1,
        duration: hidden ? 0 : 1000,
      })
    } else if ('region' in props.focus) {
      if (props.focus.region === 'silk')
        instance.fitBounds(
          [
            [59, 24],
            [123, 47],
          ],
          {
            absolutePadding: true,
            padding: readingPadding(container.current!, true),
            duration: hidden ? 0 : 1200,
          },
        )
      else
        instance.flyTo({
          center: [chinaCamera.lng, chinaCamera.lat],
          zoom: defaultCamera(container.current!).zoom,
          padding: { top: 0, bottom: 0, left: 0, right: 0 },
          duration: hidden ? 0 : 1000,
        })
    } else
      instance.flyTo({
        center: props.focus.coordinates,
        zoom: props.focus.zoom ?? 4.9,
        padding:
          current.current.trail || current.current.topicSteps
            ? readingPadding(container.current!, !!current.current.topicSteps)
            : 0,
        duration: hidden ? 0 : 1100,
      })
  }, [ready, props.focus, focusRevision])

  return (
    <div className="map-area">
      <div
        ref={container}
        className="map-canvas"
        role="region"
        aria-label={`${formatYear(props.year)}历史地图`}
      />
      <div className="map-annotation">
        <span className="annotation-line" />
        全球历史疆域
        <span className="annotation-dot" />
        空白处暂缺资料
      </div>
      {props.year < -475 && (
        <details className="early-map-note">
          <summary>
            {props.year < -2070
              ? '考古年代区间 · 遗址不代表国界'
              : props.year < -1600
                ? '夏代：看遗址与文献，暂无可靠疆界'
                : '早期疆域：来源年代较粗，点此了解'}
          </summary>
          <p>
            {props.year < -2070
              ? '这里以遗址和文明发展节点阅读史前与早期社会。所列年代为考古区间或约定观察点，不表示精确建城年。考古文化不等于王朝，空白表示暂无可靠疆域；现代河流与海岸仅供定位参照。'
              : props.year < -1600
                ? '约前2070年是采用的传统纪年框架。二里头是考古遗址，与夏王朝的对应仍需讨论；不将文化分布画成精确国界。全球其他地区显示来源已收录的同年轮廓。'
                : '商周源图按较粗年代采样，起讫不等于王朝存续年。商的轮廓在约前1046年后不再展示，周的轮廓从来源的前1000年起可用。空白表示尚缺合适轮廓，不表示无人居住。'}
          </p>
        </details>
      )}
      <div className="map-compass" aria-hidden="true">
        <span>N</span>
        <Compass size={35} strokeWidth={1} />
      </div>
      <div className="map-controls">
        <button title="放大" aria-label="放大地图" onClick={() => map.current?.zoomIn()}>
          <Plus size={19} />
        </button>
        <button title="缩小" aria-label="缩小地图" onClick={() => map.current?.zoomOut()}>
          <Minus size={19} />
        </button>
        <button
          title="查看全球疆域"
          aria-label="查看全球疆域"
          onClick={() =>
            map.current?.fitBounds(
              [
                [-175, -55],
                [180, 75],
              ],
              { absolutePadding: true, padding: 26, duration: 1000, maxZoom: 1.8 },
            )
          }
        >
          <Globe2 size={18} />
        </button>
        <span className="control-divider" />
        <button
          title="回到中国视野"
          aria-label="回到中国视野"
          onClick={() =>
            map.current?.flyTo({
              center: [chinaCamera.lng, chinaCamera.lat],
              zoom: defaultCamera(container.current!).zoom,
              padding: { top: 0, bottom: 0, left: 0, right: 0 },
            })
          }
        >
          <LocateFixed size={18} />
        </button>
      </div>
      {loading && (
        <div className="map-status" role="status">
          <LoaderCircle size={16} className="spin" />
          正在展开这一年的山河…
        </div>
      )}
      {error && (
        <div className="map-error">
          <AlertCircle size={18} />
          <p>{error}</p>
          <button onClick={() => setReload((v) => v + 1)}>重新加载</button>
        </div>
      )}
      {referenceLoading && (
        <div className="reference-status" role="status">
          正在加载参考年份…
        </div>
      )}
      {referenceError && (
        <div className="reference-status error" role="alert">
          参考地图加载失败 <button onClick={() => setReload((value) => value + 1)}>重试</button>
        </div>
      )}
      {eventGroup && (
        <div
          ref={eventPopup}
          className="map-event-popup"
          role="dialog"
          aria-label={props.trail ? '此处的人物行迹' : '此处的历史事件'}
        >
          <button className="popup-close" aria-label="关闭地点事件" onClick={closeEventGroup}>
            ×
          </button>
          <span className="eyebrow">
            此处附近 · {eventGroup.events.length} {props.trail ? '条行迹记录' : '个事件'}
          </span>
          <h3>附近的历史节点</h3>
          {eventGroup.events.map((event) => (
            <button
              className="map-event-choice"
              key={event.id}
              onClick={() => {
                setEventGroup(null)
                if (props.trail) props.onJourneyNode(event.id)
                else props.onSelect({ type: 'event', id: event.id })
              }}
            >
              <span>{formatEventDate(event)}</span>
              <strong>{event.title}</strong>
              <small>
                {props.trail
                  ? `${props.trail.nodes.find((node) => node.id === event.id)?.kind} · ${event.location}`
                  : eventDateRelation(event, props.year)}
              </small>
            </button>
          ))}
        </div>
      )}
      {city && (
        <div className="city-popup">
          <button className="popup-close" aria-label="关闭地名介绍" onClick={() => setCity(null)}>
            ×
          </button>
          <span className="eyebrow">古今地名</span>
          <h3>{city.name}</h3>
          <p>{city.modern}</p>
          <button
            className="city-archive-link"
            onClick={() => {
              const place = placeForCity(city.id)
              if (place) current.current.onSelect({ type: 'place', id: place.id })
              setCity(null)
            }}
          >
            阅读此地历代记录
          </button>
          <small>坐标为城市区域参照，非古城边界。</small>
        </div>
      )}
      {props.showRoutes && (
        <div className="route-note">
          <span />
          丝路节点连接示意{props.year < -138 || props.year > 1600 ? ' · 当前年份未显示' : ''}
        </div>
      )}
    </div>
  )
}
