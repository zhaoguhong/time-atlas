import { type CSSProperties, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  Check,
  ChevronsUpDown,
  List,
  Globe2,
  PanelRightClose,
  PanelRightOpen,
  LocateFixed,
  Minus,
  Pause,
  Play,
  Plus,
  Search,
  Settings,
  X,
} from 'lucide-react'
import type { Category, HistoryEvent } from '../types'
import {
  compactYear,
  formatEventDate,
  fromOrdinal,
  MAX_YEAR,
  MIN_YEAR,
  toOrdinal,
} from '../lib/history'
import {
  clampSpan,
  eventRegion,
  historyRegions,
  MAX_SPAN,
  MIN_SPAN,
  pillarTicks,
  pillarDateLabel,
  pillarWindow,
  type PillarSide,
} from '../lib/time-pillar'
import { pillarBrowseStops } from '../lib/pillar-browse'
import { usePillarBrowse } from '../hooks/use-pillar-browse'
import { usePillarTheme } from '../lib/pillar-theme'
import { usePillarView } from '../hooks/use-pillar-view'
import type { PillarView } from '../hooks/use-pillar-view'
import { createPillarScene, samplePillarScene } from '../lib/pillar-scene'
import { PillarAppearance, PillarScenery } from './PillarAppearance'
import '../time-pillar.css'
import '../pillar-themes.css'

type Props = {
  focused?: boolean
  year: number
  span: number
  side: PillarSide
  region: string
  category: Category | '全部'
  events: HistoryEvent[]
  hasSpatialFilter: boolean
  onClearSpatial: () => void
  selectedId?: string
  playing: boolean
  range: [number, number] | null
  onNavigate: (year: number, span: number) => void
  onPause: () => void
  onBrowseStart: () => void
  onBrowseNavigate: (year: number, span: number) => void
  onSide: (side: PillarSide) => void
  onRegion: (region: string) => void
  onCategory: (category: Category | '全部') => void
  onRange: (range: [number, number] | null) => void
  onEvent: (id: string) => void
  readerCollapsed: boolean
  onToggleReader: () => void
}
const categories: (Category | '全部')[] = ['全部', '政治', '战争', '文化', '交流', '社会']
const niceSpan = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)} 千年` : `${Math.round(n)} 年`
export default function TimePillar(p: Props) {
  const [theme, setTheme] = usePillarTheme()
  const stage = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const optionsTrigger = useRef<HTMLButtonElement>(null)
  const modalTrigger = useRef<HTMLElement | null>(null)
  const [size, setSize] = useState({ width: 800, height: 500 })
  const [draft, setDraft] = useState<PillarView | null>(null)
  const [precise, setPrecise] = useState<PillarView | null>(null)
  const [modal, setModal] = useState<'settings' | 'cluster' | null>(null)
  const [cluster, setCluster] = useState<HistoryEvent[]>([])
  const [jump, setJump] = useState('')
  const [rangeFrom, setRangeFrom] = useState('')
  const [rangeTo, setRangeTo] = useState('')
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [dragging, setDragging] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [dwell, setDwell] = useState(6)
  const autoPreview = useRef(false)
  const current = useRef(p)
  current.current = p
  const preview = useRef(draft)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const frame = useRef<number | null>(null)
  const pointerState = useRef(new Map<number, { x: number; y: number }>())
  const gesture = useRef<{
    y: number
    distance: number
    year: number
    ordinal: number
    span: number
    anchor: number
    top: number
    moved: boolean
  } | null>(null)
  const suppressClick = useRef(false)
  const targetOrdinal =
    draft?.ordinal ??
    (precise?.year === p.year && precise.span === p.span ? precise.ordinal : undefined) ??
    toOrdinal(draft?.year ?? p.year)
  const { year, span, ordinal, moving, settle } = usePillarView(
    draft?.year ?? p.year,
    draft?.span ?? p.span,
    draft !== null || dragging,
    targetOrdinal,
  )
  const rendered = useRef({ year, span, ordinal })
  rendered.current = { year, span, ordinal }
  const target = useRef<PillarView>({ year: p.year, span: p.span, ordinal: targetOrdinal })
  target.current = { year: p.year, span: p.span, ordinal: targetOrdinal }
  const stops = useMemo(
    () => pillarBrowseStops(p.events, p.span, p.range),
    [p.events, p.span, p.range],
  )
  const browse = usePillarBrowse({
    active: p.playing,
    stops,
    dwell,
    view: rendered.current,
    onFrame: (view) => {
      autoPreview.current = true
      preview.current = view
      setDraft(view)
    },
    onArrive: (view) => {
      autoPreview.current = false
      settle(view)
      commit(view, true)
    },
    onStop: () => pauseRef.current(),
  })
  const priorityId = p.selectedId ?? browse.stop?.event.id
  const narrow = size.width < 560
  const footerZoom = size.width >= 760
  const single = p.side !== 'compare'
  const axis = single ? 40 : size.width / 2
  const railGap = narrow ? 29 : 42
  const padding = p.focused ? 78 : 34
  const height = Math.max(48, size.height - padding - 12)
  const cardHeight = Math.min(showSummary ? 76 : 44, height)
  const summaryVisible = showSummary && cardHeight >= 64
  // Fractional ordinal time keeps even a four-year window pixel-smooth. Civil
  // years and shared URLs still use whole years, with no year zero.
  const windowAt = (center: number, duration: number) => {
    const w = pillarWindow(fromOrdinal(Math.round(center)), duration)
    const bottom = Math.max(
      toOrdinal(MIN_YEAR),
      Math.min(toOrdinal(MAX_YEAR) - w.span, center - w.span / 2),
    )
    return { bottom, top: bottom + w.span, span: w.span }
  }
  const windowRange = windowAt(ordinal, span)
  const scene = useMemo(
    () =>
      createPillarScene(p.events, { ...windowRange, year }, height, cardHeight, p.side, priorityId),
    // A pan changes only the scene transform, never its packing or identities.
    // New scale/geometry/filter/selection deliberately establishes a new scene.
    [p.events, span, height, cardHeight, p.side, priorityId],
  )
  const { cards: bufferedCards, offset } = samplePillarScene(scene, windowRange)
  // CSS geometry rounds subpixels; omit zero-area boundary fragments instead
  // of retaining an effectively offscreen button because of float residue.
  const cards = bufferedCards.filter(
    (c) => c.y + offset + cardHeight / 2 > 0.5 && c.y + offset - cardHeight / 2 < height - 0.5,
  )
  const windowEvents = useMemo(
    () =>
      p.events.filter(
        (e) =>
          toOrdinal(e.year) <= windowRange.top &&
          toOrdinal(e.endYear ?? e.year) >= windowRange.bottom,
      ),
    [p.events, windowRange.top, windowRange.bottom],
  )
  const ticks = useMemo(
    () => pillarTicks(windowRange.bottom, windowRange.top, height),
    [windowRange.bottom, windowRange.top, height],
  )
  const visibleCount = windowEvents.length
  const yFor = (ordinal: number) =>
    padding + ((windowRange.top - ordinal) / windowRange.span) * height
  const position = (y: number) => Math.max(0, Math.min(1, (y - padding) / height))
  const limited = (ordinal: number) =>
    fromOrdinal(Math.round(Math.max(toOrdinal(MIN_YEAR), Math.min(toOrdinal(MAX_YEAR), ordinal))))
  const continuous = (ordinal: number, span: number) => {
    const center = Math.max(toOrdinal(MIN_YEAR), Math.min(toOrdinal(MAX_YEAR), ordinal))
    return { year: limited(center), span, ordinal: center }
  }
  const commit = (next: PillarView, automatic = false) => {
    preview.current = null
    setDraft(null)
    setPrecise(next.ordinal === undefined ? null : next)
    const navigate = automatic ? current.current.onBrowseNavigate : current.current.onNavigate
    navigate(next.year, clampSpan(next.span))
  }
  const pauseBrowsing = () => {
    browse.cancel()
    if (autoPreview.current) {
      autoPreview.current = false
      const view = rendered.current
      settle(view)
      target.current = view
      commit(view)
    }
    current.current.onPause()
  }
  const pauseRef = useRef(pauseBrowsing)
  pauseRef.current = pauseBrowsing
  // External reading/navigation may stop browsing and choose a new year in one commit.
  // Drop the unfinished preview without overwriting that explicit destination.
  useLayoutEffect(() => {
    if (!p.playing && autoPreview.current) {
      browse.cancel()
      autoPreview.current = false
      preview.current = null
      setDraft(null)
      settle({ year: p.year, span: p.span })
    }
  }, [p.playing, p.year, p.span, browse.cancel, settle])
  const flush = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
    if (frame.current !== null) cancelAnimationFrame(frame.current)
    frame.current = null
    if (preview.current) {
      const next = { ...preview.current, span: clampSpan(preview.current.span) }
      settle(next)
      commit(next)
    }
  }
  const showPreview = (next: PillarView) => {
    preview.current = next
    if (frame.current === null)
      frame.current = requestAnimationFrame(() => {
        frame.current = null
        setDraft(preview.current)
      })
  }
  const zoom = (
    factor: number,
    fraction = 0.5,
    state: PillarView = preview.current ?? target.current,
  ) => {
    const w = windowAt(state.ordinal ?? toOrdinal(state.year), state.span),
      newSpan = clampSpan(state.span * factor)
    const anchor = w.top - fraction * w.span
    return continuous(anchor + (fraction - 0.5) * newSpan, newSpan)
  }
  // Parent reading/focus changes resize the canvas in this same React commit.
  // Measure before paint so cards never retain the previous, taller layout.
  useLayoutEffect(() => {
    const bounds = stage.current?.getBoundingClientRect()
    if (bounds)
      setSize((previous) =>
        previous.width === bounds.width && previous.height === bounds.height
          ? previous
          : { width: bounds.width, height: bounds.height },
      )
  })
  useLayoutEffect(() => {
    const element = stage.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) =>
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height }),
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    const element = stage.current
    if (!element) return
    const wheel = (event: WheelEvent) => {
      if ((event.target as HTMLElement).closest('[data-pillar-control]')) return
      event.preventDefault()
      pauseRef.current()
      const state = preview.current ?? rendered.current
      const dy = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? height : 1)
      const next =
        event.ctrlKey || event.metaKey
          ? zoom(
              Math.exp(Math.max(-0.4, Math.min(0.4, dy * 0.004))),
              position(event.clientY - element.getBoundingClientRect().top),
              state,
            )
          : continuous(
              (state.ordinal ?? toOrdinal(state.year)) - (dy / height) * state.span,
              state.span,
            )
      showPreview(next)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(flush, 140)
    }
    element.addEventListener('wheel', wheel, { passive: false })
    return () => element.removeEventListener('wheel', wheel)
  }, [height])
  useEffect(() => {
    if (precise && (precise.year !== p.year || precise.span !== p.span)) setPrecise(null)
  }, [p.year, p.span, precise])
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    },
    [],
  )
  useEffect(() => {
    if (modal) {
      pauseRef.current()
      dialog.current?.showModal()
    } else dialog.current?.close()
  }, [modal])
  useEffect(() => {
    setRangeFrom(p.range ? String(p.range[0]) : '')
    setRangeTo(p.range ? String(p.range[1]) : '')
  }, [p.range])
  function startGesture() {
    const points = [...pointerState.current.values()]
    if (!points.length) return
    const state = preview.current ?? rendered.current
    const y = points.reduce((n, v) => n + v.y, 0) / points.length
    const fraction = position(y - (stage.current?.getBoundingClientRect().top ?? 0))
    const center = state.ordinal ?? toOrdinal(state.year)
    const w = windowAt(center, state.span)
    gesture.current = {
      y,
      distance:
        points.length > 1 ? Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y) : 0,
      ...state,
      ordinal: center,
      anchor: w.top - fraction * w.span,
      top: w.top,
      moved: false,
    }
  }
  function openPanel(type: 'settings' | 'cluster', trigger: HTMLElement) {
    pauseBrowsing()
    modalTrigger.current = trigger
    setModal(type)
  }
  function closeModal() {
    setModal(null)
    setError('')
    setQuery('')
    requestAnimationFrame(() =>
      (modalTrigger.current?.isConnected ? modalTrigger.current : optionsTrigger.current)?.focus(),
    )
  }
  function openCluster(records: HistoryEvent[], trigger: HTMLElement) {
    pauseBrowsing()
    flush()
    setCluster([...records].sort((a, b) => a.year - b.year || b.importance - a.importance))
    openPanel('cluster', trigger)
  }
  const zoomControls = (
    <div
      className="pillar-zoom"
      data-pillar-control
      role="group"
      aria-label={`时间缩放，当前跨度${niceSpan(span)}`}
      title={`当前时间跨度：${niceSpan(span)}`}
    >
      <button
        aria-label="放大时间"
        disabled={p.span <= MIN_SPAN}
        onClick={() => {
          pauseBrowsing()
          commit(zoom(0.6))
        }}
      >
        <Plus size={18} />
      </button>
      <span>{niceSpan(span)}</span>
      <button
        aria-label="缩小时间"
        disabled={p.span >= MAX_SPAN}
        onClick={() => {
          pauseBrowsing()
          commit(zoom(1.6))
        }}
      >
        <Minus size={18} />
      </button>
    </div>
  )
  return (
    <section
      className="time-pillar"
      aria-label="时空柱"
      data-side={p.side}
      data-theme={theme}
      data-focused={!!p.focused}
      data-narrow={narrow}
      data-summary={summaryVisible}
      data-dragging={dragging}
      style={
        {
          '--axis': `${axis}px`,
          '--pillar-top': `${padding}px`,
          '--pillar-bottom': '12px',
          '--scene-zoom': 1 + Math.log(MAX_SPAN / span) * 0.015,
          '--scene-drift': `${(ordinal / MAX_SPAN) * 18}px`,
        } as CSSProperties
      }
    >
      <div
        ref={stage}
        className="pillar-stage"
        tabIndex={0}
        role="region"
        aria-label="时间画布：上下拖动浏览，双指或 Ctrl 加滚轮缩放，方向键移动，加减键缩放"
        data-year={year}
        data-ordinal={ordinal}
        data-span={Math.round(span)}
        data-motion={moving || browse.travelling}
        data-browsing={p.playing}
        data-browse-phase={p.playing ? (browse.travelling ? 'moving' : 'reading') : 'stopped'}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return
          if (p.playing && (event.key === ' ' || event.key === 'Escape')) {
            event.preventDefault()
            pauseBrowsing()
            return
          }
          const target = p.playing ? rendered.current : current.current
          const moves: Record<string, () => void> = {
            ArrowUp: () =>
              commit({
                year: limited(toOrdinal(target.year) + target.span * 0.15),
                span: target.span,
              }),
            ArrowDown: () =>
              commit({
                year: limited(toOrdinal(target.year) - target.span * 0.15),
                span: target.span,
              }),
            '+': () => commit(zoom(0.6)),
            '=': () => commit(zoom(0.6)),
            '-': () => commit(zoom(1.6)),
            Home: () => commit({ year: MIN_YEAR, span: target.span }),
            End: () => commit({ year: MAX_YEAR, span: target.span }),
          }
          if (moves[event.key]) {
            event.preventDefault()
            pauseBrowsing()
            moves[event.key]()
          }
        }}
        onPointerDown={(event) => {
          if (event.button !== 0 || (event.target as HTMLElement).closest('[data-pillar-control]'))
            return
          pauseBrowsing()
          flush()
          if (moving) showPreview(rendered.current)
          suppressClick.current = false
          pointerState.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
          startGesture()
        }}
        onPointerMove={(event) => {
          if (!pointerState.current.has(event.pointerId) || !gesture.current) return
          pointerState.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
          const points = [...pointerState.current.values()]
          const g = gesture.current
          const y = points.reduce((n, v) => n + v.y, 0) / points.length
          if (Math.abs(y - g.y) > 5 || points.length > 1) {
            g.moved = true
            suppressClick.current = true
            setDragging(true)
            event.currentTarget.setPointerCapture(event.pointerId)
          }
          if (!g.moved) return
          let nextSpan = g.span,
            nextOrdinal = g.ordinal + ((y - g.y) / height) * g.span
          if (points.length > 1 && g.distance) {
            const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y)
            nextSpan = clampSpan((g.span * g.distance) / Math.max(20, distance))
            const fraction = position(y - event.currentTarget.getBoundingClientRect().top)
            nextOrdinal = g.anchor + (fraction - 0.5) * nextSpan
          }
          showPreview(continuous(nextOrdinal, nextSpan))
        }}
        onPointerUp={(event) => {
          if (!pointerState.current.has(event.pointerId)) return
          pointerState.current.delete(event.pointerId)
          if (!pointerState.current.size) {
            gesture.current = null
            setDragging(false)
            flush()
          } else startGesture()
        }}
        onPointerCancel={() => {
          pointerState.current.clear()
          gesture.current = null
          setDragging(false)
          flush()
        }}
        onClickCapture={(event) => {
          if (suppressClick.current) {
            event.preventDefault()
            event.stopPropagation()
            suppressClick.current = false
          }
        }}
      >
        <div className="pillar-lanes" aria-hidden="true">
          <span>
            <i />
            {p.side === 'china' ? '中国历史' : '世界历史'}
            <small>
              {p.side === 'china'
                ? '历代脉络'
                : p.region === 'all'
                  ? '中国之外'
                  : historyRegions[p.region as keyof typeof historyRegions]}
            </small>
          </span>
          <span>
            {p.side === 'compare' ? (
              <>
                <i />
                中国历史<small>历代脉络</small>
              </>
            ) : (
              <small>更近的年代 ↑</small>
            )}
          </span>
        </div>
        <div className="pillar-spine" aria-hidden="true" />
        <PillarScenery />
        <svg className="pillar-lines" width="100%" height="100%" aria-hidden="true">
          {ticks.map((t) => (
            <line
              key={t}
              x1={single ? axis : 16}
              x2={size.width - 16}
              y1={yFor(toOrdinal(t))}
              y2={yFor(toOrdinal(t))}
              className="pillar-gridline"
            />
          ))}
          <svg x={0} y={padding} width="100%" height={height} overflow="hidden">
            <g transform={`translate(0 ${offset})`}>
              {cards.map((c) => {
                const direction = !single && c.side === 'world' ? -1 : 1
                const start = axis + direction * 4
                const end = single ? 72 : axis + direction * railGap
                return (
                  <g key={c.event.id} className={`pillar-connector ${c.side}`}>
                    <path
                      d={
                        theme === 'ribbon'
                          ? `M ${start} ${c.anchorY} L ${end} ${c.y}`
                          : theme === 'scroll'
                            ? `M ${start} ${c.anchorY} L ${start} ${c.y} L ${end} ${c.y}`
                            : `M ${start} ${c.anchorY} C ${end} ${c.anchorY}, ${start} ${c.y}, ${end} ${c.y}`
                      }
                      fill="none"
                    />
                    <circle cx={start} cy={c.anchorY} r={2} />
                  </g>
                )
              })}
            </g>
          </svg>
        </svg>
        {ticks
          .filter(
            (t) =>
              t !== year &&
              Math.abs(yFor(toOrdinal(t)) - yFor(ordinal)) > (t < 0 || year < 0 ? 34 : 25),
          )
          .map((t) => (
            <span key={t} className="pillar-tick" style={{ top: yFor(toOrdinal(t)) }}>
              {t < 0 && <small>公元前</small>}
              {Math.abs(t)}年
            </span>
          ))}
        <div className="pillar-now" style={{ top: yFor(ordinal) }} aria-hidden="true">
          <span>
            {year < 0 && <small>公元前</small>}
            {Math.abs(year)}年
          </span>
        </div>
        <div className="pillar-events">
          <div
            className="pillar-event-track"
            style={{ transform: `translate3d(0, ${offset}px, 0)` }}
          >
            {cards.map((c) => (
              <div
                key={c.event.id}
                className={`pillar-card ${c.side} ${c.event.id === p.selectedId || (p.playing && !browse.travelling && c.event.id === browse.stop?.event.id) ? 'selected' : ''}`}
                data-event-id={c.event.id}
                data-category={c.event.category}
                style={
                  {
                    top: c.y - cardHeight / 2,
                    height: cardHeight,
                  } as CSSProperties
                }
              >
                <button
                  className="pillar-event"
                  aria-current={
                    p.playing && !browse.travelling && c.event.id === browse.stop?.event.id
                      ? 'step'
                      : undefined
                  }
                  tabIndex={
                    c.y + offset - cardHeight / 2 >= 0 && c.y + offset + cardHeight / 2 <= height
                      ? undefined
                      : -1
                  }
                  onClick={() => {
                    pauseBrowsing()
                    flush()
                    p.onEvent(c.event.id)
                  }}
                  aria-label={`${c.event.title}，${formatEventDate(c.event)}`}
                  title={`${formatEventDate(c.event)} · ${c.event.title}`}
                >
                  <span className="pillar-event-line">
                    <time>{pillarDateLabel(c.event)}</time>
                    <strong>{c.event.title}</strong>
                  </span>
                  {summaryVisible && <p>{c.event.summary}</p>}
                </button>
              </div>
            ))}
          </div>
        </div>
        {!visibleCount && !cards.length && (
          <div className="pillar-empty">
            <Globe2 size={32} />
            <h2>这一段，留给继续发现</h2>
            <p>当前范围与筛选下没有已收录的事件。</p>
            <button data-pillar-control onClick={() => commit({ year: year, span: MAX_SPAN })}>
              放眼历史全貌
            </button>
            <button
              data-pillar-control
              onClick={(event) => openPanel('settings', event.currentTarget)}
            >
              调整筛选
            </button>
          </div>
        )}
        {!!visibleCount && !cards.length && (
          <div className="pillar-empty pillar-continuing">
            <p>部分事件跨越多年，起点位于当前视野之外。</p>
            <button
              data-pillar-control
              onClick={(event) => openCluster(windowEvents, event.currentTarget)}
            >
              <List size={16} aria-hidden="true" />
              查看这段时间的 {visibleCount} 个事件
            </button>
          </div>
        )}
        <div className="pillar-controls" data-pillar-control>
          <button
            ref={optionsTrigger}
            className="pillar-settings"
            aria-label="时空柱筛选与设置"
            aria-haspopup="dialog"
            data-filtered={
              !!(p.range || p.region !== 'all' || p.category !== '全部' || p.hasSpatialFilter)
            }
            aria-description={
              p.range || p.region !== 'all' || p.category !== '全部' || p.hasSpatialFilter
                ? '已应用筛选'
                : undefined
            }
            title="主题、历史范围、筛选与年份定位"
            onClick={(event) => {
              pauseBrowsing()
              flush()
              setJump(String(year))
              openPanel('settings', event.currentTarget)
            }}
          >
            <Settings size={20} aria-hidden="true" />
          </button>
        </div>
        {!footerZoom && <div className="pillar-zoom-dock">{zoomControls}</div>}
      </div>
      <footer className="pillar-footer">
        <div className="pillar-year">
          <span>
            {p.side === 'compare' ? '中外对照' : p.side === 'world' ? '世界历史' : '中国历史'}
          </span>
          <strong>
            {compactYear(year)}
            <small>年</small>
          </strong>
        </div>
        {p.playing && (
          <button
            className="pillar-browse-stop"
            aria-label="停止自动浏览"
            title={
              browse.travelling
                ? '正在移向下一站，点击停止'
                : `当前停留：${browse.stop?.event.title ?? '历史事件'}，点击停止`
            }
            onClick={pauseBrowsing}
          >
            <Pause size={16} aria-hidden="true" />
            <span>自动浏览</span>
          </button>
        )}
        {footerZoom && zoomControls}
        <button
          className="pillar-cluster"
          aria-label={`查看这段时间的全部${visibleCount}个事件`}
          disabled={!visibleCount}
          onClick={(event) => openCluster(windowEvents, event.currentTarget)}
        >
          <List size={17} aria-hidden="true" />
          <span>
            <strong>{visibleCount} 件</strong>
            <small>全部事件</small>
          </span>
        </button>
        <button
          className="pillar-reader"
          aria-label={p.readerCollapsed ? '展开历史资料' : '收起历史资料'}
          title={p.readerCollapsed ? '展开历史资料' : '收起历史资料，展开时空柱'}
          aria-expanded={!p.readerCollapsed}
          aria-controls="history-reading-content"
          onClick={p.onToggleReader}
        >
          {p.readerCollapsed ? (
            <PanelRightOpen size={18} aria-hidden="true" />
          ) : (
            <PanelRightClose size={18} aria-hidden="true" />
          )}
        </button>
      </footer>
      <dialog
        ref={dialog}
        className="pillar-dialog"
        aria-labelledby="pillar-dialog-title"
        onCancel={(event) => {
          event.preventDefault()
          closeModal()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeModal()
        }}
      >
        <div className="pillar-dialog-head">
          <div>
            <span className="eyebrow">TIME ATLAS · 时空柱</span>
            <h2 id="pillar-dialog-title">
              {modal === 'cluster' ? `这段历史 · ${cluster.length} 件事件` : '时空柱设置'}
            </h2>
          </div>
          <button aria-label="关闭时空柱面板" onClick={closeModal}>
            <X size={20} />
          </button>
        </div>
        {modal === 'cluster' ? (
          <>
            <label className="pillar-cluster-search">
              <Search size={16} />
              <input
                aria-label="搜索聚合事件"
                placeholder="在这组事件中搜索"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <div className="pillar-cluster-list">
              {cluster
                .filter((e) => (e.title + e.summary).includes(query))
                .map((e) => (
                  <button
                    key={e.id}
                    onClick={() => {
                      closeModal()
                      p.onEvent(e.id)
                    }}
                  >
                    <time>{formatEventDate(e)}</time>
                    <strong>{e.title}</strong>
                    <p>{e.summary}</p>
                    <span>
                      {historyRegions[eventRegion(e)]} · {e.category}
                    </span>
                  </button>
                ))}
            </div>
            <button
              className="pillar-primary"
              onClick={() => {
                const years = cluster.map((e) => toOrdinal(e.year)),
                  a = Math.min(...years),
                  b = Math.max(...years)
                closeModal()
                commit({ year: limited((a + b) / 2), span: clampSpan(Math.max(8, (b - a) * 1.4)) })
              }}
            >
              <ChevronsUpDown size={16} />
              放大这段时间
            </button>
          </>
        ) : (
          <div className="pillar-options">
            <p className="pillar-view-window">
              当前视野：{compactYear(fromOrdinal(Math.round(windowRange.bottom)))}年—
              {compactYear(fromOrdinal(Math.round(windowRange.top)))}年 · {niceSpan(span)}
            </p>
            <button
              className="pillar-reset pillar-overview"
              aria-label="查看历史全貌"
              onClick={() => {
                closeModal()
                pauseBrowsing()
                commit({
                  year: limited((toOrdinal(MAX_YEAR) + toOrdinal(MIN_YEAR)) / 2),
                  span: MAX_SPAN,
                })
              }}
            >
              查看历史全貌
              <small>公元前10000年—1912年</small>
            </button>
            {p.hasSpatialFilter && (
              <div className="pillar-filter-note">
                <p>当前还保留着地点或地图视野筛选，可能只显示少数事件。</p>
                <button className="pillar-reset" onClick={p.onClearSpatial}>
                  解除地点与视野限制
                </button>
              </div>
            )}
            <label>
              浏览方式
              <select
                aria-label="时空柱浏览方式"
                value={p.side}
                onChange={(e) => p.onSide(e.target.value as PillarSide)}
              >
                <option value="compare">中外对照</option>
                <option value="world">仅世界历史</option>
                <option value="china">仅中国历史</option>
              </select>
            </label>
            <PillarAppearance value={theme} onChange={setTheme} />
            <label className="pillar-summary-option">
              <span>
                <strong>显示事件简介</strong>
                <small>默认只展示日期与标题，留出更多历史节点</small>
              </span>
              <span className="pillar-summary-toggle">
                <input
                  type="checkbox"
                  checked={showSummary}
                  onChange={(event) => setShowSummary(event.target.checked)}
                />
                <span aria-hidden="true" />
              </span>
            </label>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const n = Number(jump)
                if (
                  !jump.trim() ||
                  !Number.isInteger(n) ||
                  n === 0 ||
                  n < MIN_YEAR ||
                  n > MAX_YEAR
                ) {
                  setError('请输入前 10000 年至 1912 年之间的整数；公元前用负数，没有公元 0 年。')
                  return
                }
                closeModal()
                commit({ year: n, span: p.span })
              }}
            >
              <label htmlFor="pillar-jump">直接前往年份</label>
              <div className="pillar-input-row">
                <input
                  id="pillar-jump"
                  type="number"
                  placeholder="例如 1453；公元前填负数"
                  value={jump}
                  onChange={(e) => setJump(e.target.value)}
                />
                <button className="pillar-primary" type="submit">
                  <LocateFixed size={16} />
                  前往
                </button>
              </div>
            </form>
            <div className="pillar-option-grid">
              <label>
                世界历史地区
                <select
                  aria-label="世界历史地区"
                  value={p.region}
                  disabled={p.side === 'china'}
                  onChange={(e) => p.onRegion(e.target.value)}
                >
                  <option value="all">所有地区</option>
                  {Object.entries(historyRegions)
                    .filter(([id]) => id !== 'china')
                    .map(([id, label]) => (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    ))}
                </select>
              </label>
              <label>
                事件类别
                <select
                  aria-label="时空柱事件类别"
                  value={p.category}
                  onChange={(e) => p.onCategory(e.target.value as Category | '全部')}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c === '全部' ? '全部类别' : c}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              快速展开时期
              <select
                aria-label="时空柱历史时期"
                value=""
                onChange={(e) => {
                  const [a, b] = e.target.value.split(',').map(Number)
                  if (!a || !b) return
                  closeModal()
                  commit({
                    year: limited((toOrdinal(a) + toOrdinal(b)) / 2),
                    span: clampSpan(toOrdinal(b) - toOrdinal(a)),
                  })
                }}
              >
                <option value="" disabled>
                  选择一段历史…
                </option>
                {[
                  [-10000, -3000, '史前与早期聚落'],
                  [-3000, -500, '早期文明'],
                  [-500, 500, '古典时代'],
                  [500, 1000, '中古世界'],
                  [1000, 1500, '交流与变迁'],
                  [1500, 1800, '跨洋联系'],
                  [1800, 1912, '工业时代'],
                ].map(([a, b, t]) => (
                  <option value={`${a},${b}`} key={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <section className="pillar-browse-options" aria-labelledby="pillar-browse-title">
              <h3 id="pillar-browse-title">自动浏览</h3>
              <p>
                从当前年份向前，按事件逐站停留。大跨度优先重要事件，放大后纳入更多事件；到筛选范围末尾自动结束。
              </p>
              <p>拖动、缩放或打开事件会立即停止，留在原处慢慢读。</p>
              <div className="pillar-option-grid">
                <label>
                  每站停留
                  <select
                    aria-label="自动浏览停留时间"
                    value={dwell}
                    onChange={(e) => setDwell(Number(e.target.value))}
                  >
                    {[4, 6, 10].map((seconds) => (
                      <option key={seconds} value={seconds}>
                        {seconds} 秒
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  className="pillar-primary"
                  disabled={!stops.some((stop) => stop.year >= p.year)}
                  onClick={() => {
                    closeModal()
                    p.onBrowseStart()
                  }}
                >
                  <Play size={16} aria-hidden="true" />
                  开始自动浏览
                </button>
              </div>
              {!stops.some((stop) => stop.year >= p.year) && (
                <p>当前年份之后没有符合条件的事件。可移向更早的年份，或调整跨度与筛选。</p>
              )}
            </section>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const a = Number(rangeFrom),
                  b = Number(rangeTo)
                if (
                  !Number.isInteger(a) ||
                  !Number.isInteger(b) ||
                  !a ||
                  !b ||
                  a > b ||
                  a < MIN_YEAR ||
                  b > MAX_YEAR
                ) {
                  setError('请填写有效的起止年份，起始年不能晚于结束年。')
                  return
                }
                p.onRange([a, b])
                closeModal()
                commit({
                  year: limited((toOrdinal(a) + toOrdinal(b)) / 2),
                  span: clampSpan(toOrdinal(b) - toOrdinal(a)),
                })
              }}
            >
              <label>限定探索与自动浏览范围</label>
              <div className="pillar-range-row">
                <input
                  aria-label="时空柱起始年份"
                  type="number"
                  placeholder="起始年"
                  value={rangeFrom}
                  onChange={(e) => setRangeFrom(e.target.value)}
                />
                <span>—</span>
                <input
                  aria-label="时空柱结束年份"
                  type="number"
                  placeholder="结束年"
                  value={rangeTo}
                  onChange={(e) => setRangeTo(e.target.value)}
                />
                <button type="submit" aria-label="应用时空柱时间范围">
                  <Check size={18} />
                </button>
              </div>
            </form>
            {(p.range || p.region !== 'all' || p.category !== '全部') && (
              <button
                className="pillar-reset"
                onClick={() => {
                  p.onRange(null)
                  p.onRegion('all')
                  p.onCategory('全部')
                  setError('')
                }}
              >
                清除时间、地区与类别筛选
              </button>
            )}
            {error && (
              <p role="alert" className="pillar-error">
                {error}
              </p>
            )}
            <p className="pillar-help">
              上下拖动或滚动，沿年代探索；手机双指捏合，或按住 Ctrl / ⌘ 滚动缩放。键盘方向键移动，＋
              / − 缩放。较早的年代在下方，没有公元 0
              年。时间范围越小，事件越展开；“＋”可查看聚合内容。
            </p>
          </div>
        )}
      </dialog>
    </section>
  )
}
