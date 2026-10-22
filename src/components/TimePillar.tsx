import { type CSSProperties, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronsUpDown,
  ChevronDown,
  List,
  Globe2,
  Layers3,
  LocateFixed,
  Maximize2,
  Minus,
  Pause,
  Play,
  Plus,
  Search,
  Settings2,
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
  layoutPillar,
  MAX_SPAN,
  MIN_SPAN,
  pillarTicks,
  pillarWindow,
  type PillarSide,
} from '../lib/time-pillar'
import { periods } from '../data/periods'
import { eventPlaybackYears, PLAYBACK_SPEEDS } from '../lib/playback'
import '../time-pillar.css'

type Props = {
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
  speed: number
  playbackMode: 'years' | 'events'
  range: [number, number] | null
  onNavigate: (year: number, span: number) => void
  onPause: () => void
  onPlay: () => void
  onSide: (side: PillarSide) => void
  onRegion: (region: string) => void
  onCategory: (category: Category | '全部') => void
  onSpeed: (speed: number) => void
  onPlaybackMode: (mode: 'years' | 'events') => void
  onRange: (range: [number, number] | null) => void
  onEvent: (id: string) => void
  onRead: () => void
}
const categories: (Category | '全部')[] = ['全部', '政治', '战争', '文化', '交流', '社会']
const niceSpan = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)} 千年` : `${Math.round(n)} 年`
export default function TimePillar(p: Props) {
  const stage = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const optionsTrigger = useRef<HTMLButtonElement>(null)
  const modalTrigger = useRef<HTMLElement | null>(null)
  const [size, setSize] = useState({ width: 800, height: 500 })
  const [draft, setDraft] = useState<{ year: number; span: number } | null>(null)
  const [modal, setModal] = useState<'settings' | 'cluster' | null>(null)
  const [cluster, setCluster] = useState<HistoryEvent[]>([])
  const [jump, setJump] = useState('')
  const [rangeFrom, setRangeFrom] = useState('')
  const [rangeTo, setRangeTo] = useState('')
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [dragging, setDragging] = useState(false)
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
    span: number
    anchor: number
    top: number
    moved: boolean
  } | null>(null)
  const suppressClick = useRef(false)
  const year = draft?.year ?? p.year,
    span = draft?.span ?? p.span
  const narrow = size.width < 560
  const single = p.side !== 'compare'
  const axis = single ? 46 : size.width / 2
  const radius = single ? 20 : narrow ? 26 : 46
  const padding = 28
  const height = Math.max(48, size.height - padding - 54)
  const cardHeight = Math.min(size.height < 260 ? 66 : narrow ? 68 : 78, Math.max(48, height - 6))
  const summaryVisible = cardHeight >= 78 && !narrow && (single || size.width >= 900)
  const windowRange = pillarWindow(year, span)
  const cards = useMemo(
    () => layoutPillar(p.events, year, span, height, cardHeight, p.side, p.selectedId),
    [p.events, year, span, height, cardHeight, p.side, p.selectedId],
  )
  const ticks = useMemo(
    () => pillarTicks(windowRange.bottom, windowRange.top, height),
    [windowRange.bottom, windowRange.top, height],
  )
  const visibleCount = cards.reduce((n, c) => n + 1 + c.hidden.length, 0)
  const yFor = (ordinal: number) =>
    padding + ((windowRange.top - ordinal) / windowRange.span) * height
  const position = (y: number) => Math.max(0, Math.min(1, (y - padding) / height))
  const limited = (ordinal: number) =>
    fromOrdinal(Math.round(Math.max(toOrdinal(MIN_YEAR), Math.min(toOrdinal(MAX_YEAR), ordinal))))
  const commit = (next: { year: number; span: number }) => {
    preview.current = null
    setDraft(null)
    current.current.onNavigate(next.year, clampSpan(next.span))
  }
  const flush = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
    if (preview.current) commit(preview.current)
  }
  const showPreview = (next: { year: number; span: number }) => {
    preview.current = next
    if (frame.current === null)
      frame.current = requestAnimationFrame(() => {
        frame.current = null
        setDraft(preview.current)
      })
  }
  const zoom = (factor: number, fraction = 0.5) => {
    const state = preview.current ?? { year: current.current.year, span: current.current.span }
    const w = pillarWindow(state.year, state.span),
      newSpan = clampSpan(state.span * factor)
    const anchor = w.top - fraction * w.span
    return { year: limited(anchor + (fraction - 0.5) * newSpan), span: newSpan }
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
      current.current.onPause()
      const state = preview.current ?? { year: current.current.year, span: current.current.span }
      const dy = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? height : 1)
      const next =
        event.ctrlKey || event.metaKey
          ? zoom(
              Math.exp(Math.max(-0.4, Math.min(0.4, dy * 0.004))),
              position(event.clientY - element.getBoundingClientRect().top),
            )
          : { year: limited(toOrdinal(state.year) - (dy / height) * state.span), span: state.span }
      showPreview(next)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(flush, 140)
    }
    element.addEventListener('wheel', wheel, { passive: false })
    return () => element.removeEventListener('wheel', wheel)
  }, [height])
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    },
    [],
  )
  useEffect(() => {
    if (modal) {
      current.current.onPause()
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
    const state = preview.current ?? { year: p.year, span: p.span }
    const y = points.reduce((n, v) => n + v.y, 0) / points.length
    const fraction = position(y - (stage.current?.getBoundingClientRect().top ?? 0))
    const w = pillarWindow(state.year, state.span)
    gesture.current = {
      y,
      distance:
        points.length > 1 ? Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y) : 0,
      ...state,
      anchor: w.top - fraction * w.span,
      top: w.top,
      moved: false,
    }
  }
  function openPanel(type: 'settings' | 'cluster', trigger: HTMLElement) {
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
  function step(direction: number) {
    p.onPause()
    const years = eventPlaybackYears(p.events, p.range)
    const next =
      direction > 0 ? years.find((y) => y > p.year) : [...years].reverse().find((y) => y < p.year)
    if (next !== undefined) p.onNavigate(next, p.span)
  }
  function openCluster(records: HistoryEvent[], trigger: HTMLElement) {
    flush()
    p.onPause()
    setCluster([...records].sort((a, b) => a.year - b.year || b.importance - a.importance))
    openPanel('cluster', trigger)
  }
  const eraBands =
    p.side === 'world'
      ? []
      : periods.filter(
          (era) =>
            toOrdinal(era.to) >= windowRange.bottom && toOrdinal(era.from) <= windowRange.top,
        )
  return (
    <section
      className="time-pillar"
      aria-label="时空柱"
      data-side={p.side}
      data-narrow={narrow}
      data-short={size.height < 260}
      data-summary={summaryVisible}
      data-dragging={dragging}
      style={{ '--axis': `${axis}px` } as CSSProperties}
    >
      <header className="pillar-header">
        <div className="pillar-tabs" role="group" aria-label="历史对照方式">
          {(
            [
              ['compare', '中外对照'],
              ['world', '世界历史'],
              ['china', '中国历史'],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              aria-pressed={p.side === value}
              onClick={() => {
                flush()
                p.onSide(value)
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="pillar-side-select">
          <select
            aria-label="切换历史范围"
            value={p.side}
            onChange={(event) => {
              flush()
              p.onSide(event.target.value as PillarSide)
            }}
          >
            <option value="compare">中外对照</option>
            <option value="world">世界历史</option>
            <option value="china">中国历史</option>
          </select>
          <ChevronDown size={14} aria-hidden="true" />
        </label>
        <button
          ref={optionsTrigger}
          className="pillar-settings"
          aria-label="时空柱筛选与设置"
          title="筛选、年份定位与播放范围"
          onClick={(event) => {
            flush()
            openPanel('settings', event.currentTarget)
          }}
        >
          <Settings2 size={18} />
          <span>筛选与定位</span>
          {(p.category !== '全部' || p.region !== 'all' || p.range || p.hasSpatialFilter) && <i />}
        </button>
      </header>
      <div
        ref={stage}
        className="pillar-stage"
        tabIndex={0}
        role="region"
        aria-label="时间画布：上下拖动浏览，双指或 Ctrl 加滚轮缩放，方向键移动，加减键缩放"
        data-year={year}
        data-span={Math.round(span)}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return
          const moves: Record<string, () => void> = {
            ArrowUp: () => commit({ year: limited(toOrdinal(year) + span * 0.15), span }),
            ArrowDown: () => commit({ year: limited(toOrdinal(year) - span * 0.15), span }),
            '+': () => commit(zoom(0.6)),
            '=': () => commit(zoom(0.6)),
            '-': () => commit(zoom(1.6)),
            Home: () => commit({ year: MIN_YEAR, span }),
            End: () => commit({ year: MAX_YEAR, span }),
          }
          if (moves[event.key]) {
            event.preventDefault()
            p.onPause()
            moves[event.key]()
          }
        }}
        onPointerDown={(event) => {
          if (event.button !== 0 || (event.target as HTMLElement).closest('[data-pillar-control]'))
            return
          flush()
          p.onPause()
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
            nextOrdinal = toOrdinal(g.year) + ((y - g.y) / height) * g.span
          if (points.length > 1 && g.distance) {
            const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y)
            nextSpan = clampSpan((g.span * g.distance) / Math.max(20, distance))
            const fraction = position(y - event.currentTarget.getBoundingClientRect().top)
            nextOrdinal = g.anchor + (fraction - 0.5) * nextSpan
          }
          showPreview({ year: limited(nextOrdinal), span: nextSpan })
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
          setDraft(null)
          preview.current = null
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
        <div className="pillar-grain" aria-hidden="true" />
        <div className="pillar-cylinder" aria-hidden="true">
          <div className="pillar-cap" />
          <div className="pillar-foot" />
        </div>
        <svg className="pillar-lines" width="100%" height="100%" aria-hidden="true">
          <defs>
            <linearGradient id="pillar-ring">
              <stop stopColor="#6ca7da" stopOpacity=".55" />
              <stop offset=".5" stopColor="#f7e5bf" stopOpacity=".85" />
              <stop offset="1" stopColor="#d39a74" stopOpacity=".55" />
            </linearGradient>
          </defs>
          {ticks.map((t) => (
            <g key={t}>
              <line
                x1="8%"
                x2="92%"
                y1={yFor(toOrdinal(t))}
                y2={yFor(toOrdinal(t))}
                stroke="#345b48"
                strokeOpacity=".09"
                strokeDasharray="2 5"
              />
              <ellipse
                cx={axis}
                cy={yFor(toOrdinal(t))}
                rx={radius}
                ry={narrow ? 9 : 15}
                fill="none"
                stroke="url(#pillar-ring)"
              />
            </g>
          ))}
          {cards.map((c) => (
            <path
              key={c.event.id}
              d={`M ${axis + (!single && c.side === 'world' ? -1 : 1) * radius} ${padding + c.anchorY} L ${axis + (!single && c.side === 'world' ? -1 : 1) * (radius + 8)} ${padding + c.anchorY} L ${axis + (!single && c.side === 'world' ? -1 : 1) * (radius + 12)} ${padding + c.y}`}
              fill="none"
              stroke={c.side === 'world' ? '#568fc2' : '#bb7753'}
              strokeOpacity=".55"
            />
          ))}
        </svg>
        <div className="pillar-periods" aria-hidden="true">
          {eraBands.map((era) => {
            const top = yFor(Math.min(windowRange.top, toOrdinal(era.to))),
              bottom = yFor(Math.max(windowRange.bottom, toOrdinal(era.from)))
            return bottom - top > 25 ? (
              <span key={era.id} style={{ top, height: bottom - top, borderColor: era.color }}>
                {bottom - top > 52 ? era.short : ''}
              </span>
            ) : null
          })}
        </div>
        {ticks.map((t) => (
          <span key={t} className="pillar-tick" style={{ top: yFor(toOrdinal(t)) }}>
            {compactYear(t)}
            <small>{t < 0 ? 'BCE' : 'CE'}</small>
          </span>
        ))}
        <div className="pillar-now" style={{ top: yFor(toOrdinal(year)) }} aria-hidden="true">
          <span>{compactYear(year)}</span>
        </div>
        {cards.map((c) => (
          <div
            key={c.event.id}
            className={`pillar-card ${c.side} ${c.event.id === p.selectedId ? 'selected' : ''}`}
            data-event-id={c.event.id}
            data-category={c.event.category}
            style={{ top: padding + c.y - cardHeight / 2, height: cardHeight }}
          >
            <button
              className="pillar-event"
              onClick={() => {
                flush()
                p.onEvent(c.event.id)
              }}
              aria-label={`${c.event.title}，${formatEventDate(c.event)}`}
            >
              <span className="pillar-card-meta">
                <time>{c.event.dateLabel ?? `${compactYear(c.event.year)} 年`}</time>
                <small>
                  {c.event.importance >= 5 ? '✦ ' : ''}
                  {c.event.category}
                </small>
              </span>
              <strong>{c.event.title}</strong>
              {summaryVisible && <p>{c.event.summary}</p>}
            </button>
          </div>
        ))}
        {!cards.length && (
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
        <div className="pillar-zoom" data-pillar-control>
          <button
            aria-label="放大时间"
            disabled={span <= MIN_SPAN}
            onClick={() => {
              p.onPause()
              commit(zoom(0.6))
            }}
          >
            <Plus size={18} />
          </button>
          <span>{niceSpan(span)}</span>
          <button
            aria-label="缩小时间"
            disabled={span >= MAX_SPAN}
            onClick={() => {
              p.onPause()
              commit(zoom(1.6))
            }}
          >
            <Minus size={18} />
          </button>
          <button
            aria-label="查看历史全貌"
            title="历史全貌"
            onClick={() => {
              p.onPause()
              commit({
                year: limited((toOrdinal(MAX_YEAR) + toOrdinal(MIN_YEAR)) / 2),
                span: MAX_SPAN,
              })
            }}
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
      <footer className="pillar-footer">
        <button
          className="pillar-year"
          title="定位年份"
          onClick={(event) => {
            setJump(String(year))
            openPanel('settings', event.currentTarget)
          }}
        >
          <span>此刻的世界</span>
          <strong>
            {compactYear(year)}
            <small>年</small>
          </strong>
        </button>
        <div className="pillar-play">
          <button aria-label="上一个事件年份" onClick={() => step(-1)}>
            <ArrowDown size={18} />
          </button>
          <button
            className="pillar-play-main"
            aria-label={p.playing ? '暂停时空柱' : '播放时空柱'}
            onClick={() => {
              flush()
              p.onPlay()
            }}
          >
            {p.playing ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button aria-label="下一个事件年份" onClick={() => step(1)}>
            <ArrowUp size={18} />
          </button>
        </div>
        <div className="pillar-footer-info">
          <span>同一时刻，不同的世界</span>
          <small>拖动探索 · 双指缩放 · 点击阅读</small>
        </div>
        <button
          className="pillar-cluster"
          aria-label={`查看这段时间的全部${visibleCount}个事件`}
          disabled={!visibleCount}
          onClick={(event) =>
            openCluster(
              cards.flatMap((c) => [c.event, ...c.hidden]),
              event.currentTarget,
            )
          }
        >
          <List size={17} aria-hidden="true" />
          <span>
            <strong>{visibleCount} 件</strong>
            <small>全部事件</small>
          </span>
        </button>
        <button className="pillar-reader" aria-label="打开历史资料" onClick={p.onRead}>
          <Layers3 size={18} />
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
              {modal === 'cluster' ? `这段历史 · ${cluster.length} 件事件` : '寻找你的时间坐标'}
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
                p.onNavigate(limited((a + b) / 2), clampSpan(Math.max(8, (b - a) * 1.4)))
              }}
            >
              <ChevronsUpDown size={16} />
              放大这段时间
            </button>
          </>
        ) : (
          <div className="pillar-options">
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
                p.onNavigate(n, p.span)
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
                  p.onNavigate(
                    limited((toOrdinal(a) + toOrdinal(b)) / 2),
                    clampSpan(toOrdinal(b) - toOrdinal(a)),
                  )
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
            <div className="pillar-option-grid">
              <label>
                播放方式
                <select
                  aria-label="时空柱播放方式"
                  value={p.playbackMode}
                  onChange={(e) => p.onPlaybackMode(e.target.value as 'years' | 'events')}
                >
                  <option value="events">逐事件年份 · 停下来读</option>
                  <option value="years">连续年份 · 看历史流动</option>
                </select>
              </label>
              <label>
                播放速度
                <select
                  aria-label="时空柱播放速度"
                  value={p.speed}
                  onChange={(e) => p.onSpeed(Number(e.target.value))}
                >
                  {PLAYBACK_SPEEDS.map((n) => (
                    <option key={n} value={n}>
                      {n}×
                    </option>
                  ))}
                </select>
              </label>
            </div>
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
                p.onNavigate(
                  limited((toOrdinal(a) + toOrdinal(b)) / 2),
                  clampSpan(toOrdinal(b) - toOrdinal(a)),
                )
              }}
            >
              <label>限定探索与播放范围</label>
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
