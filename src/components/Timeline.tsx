import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Minus,
  Plus,
  ChevronDown,
  X,
  BookOpen,
  Layers,
  PanelRightOpen,
  SlidersHorizontal,
} from 'lucide-react'
import { periods as chinaPeriods } from '../data/periods'
import type { HistoryEvent, Period } from '../types'
import {
  compactYear,
  formatEventDate,
  formatYear,
  fromOrdinal,
  MAX_YEAR,
  MIN_YEAR,
  periodAt,
  PILLAR_MAX_YEAR,
  TERRITORY_MAX_YEAR,
  toOrdinal,
} from '../lib/history'
import { groupTimelineEvents, timelineLabels, type TimelineGroup } from '../lib/markers'
import {
  JOURNEY_LEG_DURATION_MS,
  TOPIC_CHAPTER_DURATION_MS,
  PLAYBACK_SPEEDS,
  YEAR_DURATION_MS,
  EVENT_YEAR_DURATION_MS,
} from '../lib/playback'

interface Props {
  historyPeriods?: Period[]
  year: number
  playing: boolean
  events: HistoryEvent[]
  onYear: (year: number) => void
  onJumpYear: (year: number, span?: number) => void
  onPlay: () => void
  onEvent: (id: string) => void
  onSpeed: (speed: number) => void
  speed: number
  onPeriod: (id: string) => void
  onOverview: () => void
  onCompare: () => void
  comparing: boolean
  readerCollapsed: boolean
  onExpandReader: () => void
  selectedId?: string
  range?: [number, number] | null
  playbackMode: 'years' | 'events'
  onPlaybackMode: (mode: 'years' | 'events') => void
  journey?: {
    name: string
    from: number
    to: number
    canPrevious: boolean
    canNext: boolean
    onPrevious: () => void
    onNext: () => void
  }
  topic?: {
    name: string
    from: number
    to: number
    canPrevious: boolean
    canNext: boolean
    onPrevious: () => void
    onNext: () => void
  }
}
export default function Timeline({
  historyPeriods,
  year,
  playing,
  events,
  onYear,
  onJumpYear,
  onPlay,
  onEvent,
  onSpeed,
  speed,
  onPeriod,
  onOverview,
  onCompare,
  comparing,
  readerCollapsed,
  onExpandReader,
  journey,
  topic,
  selectedId,
  range,
  playbackMode,
  onPlaybackMode,
}: Props) {
  const [overview, setOverview] = useState(false)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(String(year))
  const [inputError, setInputError] = useState('')
  const [width, setWidth] = useState(800)
  const [opened, setOpened] = useState<TimelineGroup | null>(null)
  const [optionsOpen, setOptionsOpen] = useState(false)
  const yearEditor = useRef<HTMLDivElement>(null)
  const yearTrigger = useRef<HTMLButtonElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)
  const optionsTrigger = useRef<HTMLButtonElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const dynastyRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuTrigger = useRef<HTMLButtonElement | null>(null)
  const periods = historyPeriods ?? chinaPeriods
  const period = periods.find((item) => year >= item.from && year <= item.to) ?? periodAt(year)
  const from = Math.min(
    MAX_YEAR,
    journey?.from ?? topic?.from ?? range?.[0] ?? (overview ? MIN_YEAR : period.from),
  )
  const to = Math.min(
    MAX_YEAR,
    journey?.to ?? topic?.to ?? range?.[1] ?? (overview ? MAX_YEAR : period.to),
  )
  const continuesInPillar = to === MAX_YEAR && !journey && !topic
  const continuesOnMap = to === TERRITORY_MAX_YEAR && to < MAX_YEAR && !journey && !topic && !range
  const min = toOrdinal(from),
    max = toOrdinal(to),
    value = toOrdinal(year)
  const percent = Math.min(100, Math.max(0, ((value - min) / Math.max(1, max - min)) * 100))
  const previousEvent = [...events]
    .filter((event) => event.year < year)
    .sort((a, b) => b.year - a.year)[0]
  const nextEvent = [...events]
    .filter((event) => event.year > year)
    .sort((a, b) => a.year - b.year)[0]
  const tickCount = Math.min(width < 540 ? 5 : 7, max - min + 1)
  const ticks = Array.from({ length: tickCount }, (_, i) =>
    fromOrdinal(Math.round(min + ((max - min) * i) / Math.max(1, tickCount - 1))),
  )
  const groups = useMemo(
    () =>
      groupTimelineEvents(
        events.filter((event) => journey || topic || !overview || event.importance >= 5),
        from,
        to,
        width,
      ),
    [events, overview, from, to, width, journey, topic],
  )
  const labels = useMemo(
    () =>
      timelineLabels(
        groups,
        width,
        selectedId ??
          [...events].sort((a, b) => Math.abs(a.year - year) - Math.abs(b.year - year))[0]?.id,
      ),
    [groups, width, selectedId, events, year],
  )
  useEffect(() => {
    const strip = dynastyRef.current
    const item = strip?.querySelector<HTMLElement>('[aria-current="true"]')
    if (!strip || !item) return
    strip.scrollTo({
      left: Math.max(
        0,
        item.offsetLeft - strip.offsetLeft - strip.clientWidth / 2 + item.clientWidth / 2,
      ),
      behavior: 'auto',
    })
  }, [period.id, width])
  function closeMenu() {
    setOpened(null)
    menuTrigger.current?.focus()
  }
  useEffect(() => {
    if (!railRef.current) return
    const observer = new ResizeObserver((entries) => setWidth(entries[0].contentRect.width))
    observer.observe(railRef.current)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    setOpened(null)
  }, [year, overview])
  useEffect(() => {
    if (!editing) return
    const outside = (event: PointerEvent) => {
      if (!yearEditor.current?.contains(event.target as Node)) setEditing(false)
    }
    document.addEventListener('pointerdown', outside)
    return () => document.removeEventListener('pointerdown', outside)
  }, [editing])
  useEffect(() => {
    if (!optionsOpen) return
    const outside = (event: PointerEvent) => {
      const target = event.target as Node
      if (!optionsRef.current?.contains(target) && !optionsTrigger.current?.contains(target))
        setOptionsOpen(false)
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOptionsOpen(false)
        optionsTrigger.current?.focus()
      }
    }
    const resize = () => setOptionsOpen(false)
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    window.addEventListener('resize', resize)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
      window.removeEventListener('resize', resize)
    }
  }, [optionsOpen])
  useEffect(() => {
    if (!opened) return
    menuRef.current?.querySelector('button')?.focus()
    function outside(event: PointerEvent) {
      const target = event.target as HTMLElement
      if (!menuRef.current?.contains(target) && !target.closest('.rail-event,.rail-label'))
        setOpened(null)
    }
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape') closeMenu()
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [opened])
  function closeYearEditor() {
    setEditing(false)
    yearTrigger.current?.focus({ preventScroll: true })
  }
  function submitYear() {
    const value = Number(draft)
    if (!/^-?\d+$/.test(draft) || value === 0 || value < MIN_YEAR || value > PILLAR_MAX_YEAR) {
      setInputError(
        `请输入前${Math.abs(MIN_YEAR)}年至${PILLAR_MAX_YEAR}年之间的整数。没有公元0年。`,
      )
      return
    }
    closeYearEditor()
    onJumpYear(value)
  }
  return (
    <section className="timeline" aria-label="历史时间轴">
      <nav ref={dynastyRef} className="dynasty-strip" aria-label="历史时期导航">
        {periods.map((item) => (
          <button
            key={item.id}
            aria-current={period.id === item.id ? 'true' : undefined}
            aria-label={item.from > MAX_YEAR ? `${item.name}（时空柱）` : undefined}
            data-pillar-period={item.from > MAX_YEAR || undefined}
            title={`${item.name} · ${compactYear(item.from)}—${compactYear(item.to)}年${item.from > MAX_YEAR ? ' · 时空柱' : ''}`}
            onClick={() => onPeriod(item.id)}
          >
            {item.short}
            {item.from > MAX_YEAR && <ArrowUpRight size={12} aria-hidden="true" />}
          </button>
        ))}
      </nav>
      <div className="timeline-top">
        <div className="time-readout">
          <span className="eyebrow">
            {journey ? `${journey.name} · 行迹时间轴` : topic ? '专题时间轴' : '此刻的历史'}
          </span>
          <div
            className="year-jump"
            ref={yearEditor}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setEditing(false)
            }}
            onKeyDown={(event) => {
              if (editing && event.key === 'Escape') {
                event.stopPropagation()
                closeYearEditor()
              }
            }}
          >
            <button
              ref={yearTrigger}
              className="year-jump-trigger"
              aria-label={`${formatYear(year)}，跳转年份`}
              title="跳转年份"
              aria-expanded={editing}
              aria-controls={editing ? 'timeline-year-jump' : undefined}
              onClick={() => {
                if (editing) {
                  closeYearEditor()
                  return
                }
                setDraft(String(year))
                setInputError('')
                setEditing(true)
              }}
            >
              <span className="year-title">
                {year < 0 && <small>公元前 </small>}
                <strong>{Math.abs(year)}</strong>
                <small> 年</small>
              </span>
              <ChevronDown className="year-jump-chevron" size={15} aria-hidden="true" />
            </button>
            {editing && (
              <form
                id="timeline-year-jump"
                className="year-jump-popover"
                noValidate
                onSubmit={(event) => {
                  event.preventDefault()
                  submitYear()
                }}
              >
                <div className="year-jump-header">
                  <label htmlFor="timeline-year-input">输入历史年份</label>
                  <button type="button" aria-label="关闭年份跳转" onClick={closeYearEditor}>
                    <X size={16} aria-hidden="true" />
                  </button>
                </div>
                <div className="year-jump-input-row">
                  <input
                    autoFocus
                    onFocus={(event) => event.currentTarget.select()}
                    id="timeline-year-input"
                    type="number"
                    min={MIN_YEAR}
                    max={PILLAR_MAX_YEAR}
                    value={draft}
                    aria-invalid={!!inputError}
                    aria-describedby={inputError ? 'timeline-year-error' : 'timeline-year-help'}
                    onChange={(event) => {
                      setDraft(event.target.value)
                      setInputError('')
                    }}
                  />
                  <button className="year-jump-submit" type="submit">
                    前往
                  </button>
                </div>
                {inputError ? (
                  <p id="timeline-year-error" role="alert">
                    {inputError}
                  </p>
                ) : (
                  <p id="timeline-year-help">公元前用负数。{MAX_YEAR}年后的史事在时空柱中查看。</p>
                )}
              </form>
            )}
          </div>
          <select
            className="timeline-period-select"
            aria-label="切换历史时期"
            title={`切换历史时期 · 当前为${period.name}`}
            value={period.id}
            onChange={(event) => onPeriod(event.target.value)}
          >
            {periods.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
                {item.from > MAX_YEAR && ` · ${item.from}—${item.to}年（时空柱）`}
              </option>
            ))}
          </select>
        </div>
        <div className="play-controls">
          <button
            aria-label={journey ? '上一条人物行迹' : topic ? '专题上一章' : '上一个历史事件'}
            title={journey ? '上一条人物行迹' : topic ? '专题上一章' : '上一个历史事件'}
            onClick={() =>
              journey
                ? journey.onPrevious()
                : topic
                  ? topic.onPrevious()
                  : onYear(previousEvent?.year ?? year)
            }
            disabled={journey ? !journey.canPrevious : topic ? !topic.canPrevious : !previousEvent}
          >
            <ChevronLeft size={19} />
          </button>
          <button
            className="play-button"
            aria-label={
              topic
                ? playing
                  ? '暂停专题播放'
                  : '播放专题'
                : playing
                  ? '暂停时间播放'
                  : '播放时间'
            }
            title={topic ? '按章节播放 / 暂停' : '空格播放 / 暂停'}
            onClick={onPlay}
          >
            {playing ? (
              <Pause size={17} fill="currentColor" />
            ) : (
              <Play size={17} fill="currentColor" />
            )}
          </button>
          <button
            aria-label={journey ? '下一条人物行迹' : topic ? '专题下一章' : '下一个历史事件'}
            title={journey ? '下一条人物行迹' : topic ? '专题下一章' : '下一个历史事件'}
            onClick={() =>
              journey ? journey.onNext() : topic ? topic.onNext() : onYear(nextEvent?.year ?? year)
            }
            disabled={journey ? !journey.canNext : topic ? !topic.canNext : !nextEvent}
          >
            <ChevronRight size={19} />
          </button>
        </div>
        <select
          className="playback-speed"
          aria-label="播放速度"
          title={
            journey
              ? `1× = 每条记录 ${JOURNEY_LEG_DURATION_MS / 1000} 秒`
              : topic
                ? `1× = 每章 ${TOPIC_CHAPTER_DURATION_MS / 1000} 秒`
                : playbackMode === 'events'
                  ? `1× = 每个有事件的年份 ${EVENT_YEAR_DURATION_MS / 1000} 秒；沿用类别、地点与自定时间段筛选`
                  : `1× = 每 ${YEAR_DURATION_MS / 1000} 秒一年`
          }
          value={speed}
          onChange={(event) => onSpeed(Number(event.target.value))}
        >
          {PLAYBACK_SPEEDS.map((value) => (
            <option key={value} value={value}>
              {value}×{value === 1 ? ' 标准' : ''}
            </option>
          ))}
        </select>
        <button
          ref={optionsTrigger}
          className="timeline-options-toggle"
          aria-label="时间轴选项"
          title="时间轴选项"
          aria-expanded={optionsOpen}
          aria-controls="timeline-options"
          onClick={() => setOptionsOpen((open) => !open)}
        >
          <SlidersHorizontal size={18} />
        </button>
        <div
          id="timeline-options"
          ref={optionsRef}
          className="timeline-zoom"
          data-open={optionsOpen}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest('button')) {
              setOptionsOpen(false)
              if (optionsTrigger.current?.getClientRects().length)
                optionsTrigger.current.focus({ preventScroll: true })
            }
          }}
        >
          {!journey && !topic && (
            <select
              className="playback-mode"
              aria-label="播放方式"
              value={playbackMode}
              onChange={(event) => onPlaybackMode(event.target.value as 'years' | 'events')}
              title="逐年播放，或仅停留在符合类别、地点与自定时间段的事件年份"
            >
              <option value="years">逐年播放</option>
              <option value="events">事件年份</option>
            </select>
          )}
          {!journey && !topic && !range && (
            <button
              onClick={() => setOverview((value) => !value)}
              aria-label={overview ? '放大到当前时期' : '缩小到地图全时段'}
              title={
                overview ? '查看当前时期的详细时间轴' : `查看前10000年至${MAX_YEAR}年的地图时间轴`
              }
            >
              {overview ? <Plus size={14} /> : <Minus size={14} />}
              <span>{overview ? '看当前时期' : '看地图全时段'}</span>
            </button>
          )}
          <button
            className="timeline-context-action"
            aria-label="查看时代背景"
            title="查看时代背景"
            onClick={onOverview}
          >
            <BookOpen size={16} />
            <span>时代背景</span>
          </button>
          <button
            className="timeline-context-action"
            aria-label="年份对比"
            title="年份对比"
            aria-pressed={comparing}
            onClick={onCompare}
          >
            <Layers size={16} />
            <span>年份对比</span>
          </button>
          {readerCollapsed && (
            <button
              className="timeline-context-action reader-toggle"
              aria-label="展开历史资料"
              title="展开历史资料"
              aria-expanded="false"
              onClick={onExpandReader}
            >
              <PanelRightOpen size={16} />
              <span>展开资料</span>
            </button>
          )}
          <span className="keyboard-hint">
            {journey
              ? '1× · 每条记录4秒'
              : topic
                ? '1× · 每章12秒'
                : playbackMode === 'events'
                  ? '1× · 事件年份停留4秒'
                  : '1× · 0.9秒/年'}
          </span>
        </div>
      </div>
      <div
        className="time-rail"
        ref={railRef}
        data-continues={continuesOnMap ? 'map' : continuesInPillar ? 'pillar' : undefined}
      >
        <div className="rail-track" />
        <div className="rail-progress" style={{ width: `${percent}%` }} />
        {groups.map((group, groupIndex) => {
          const multiple = group.events.length > 1
          const reading = labels.get(groupIndex)
          const label = multiple
            ? `${group.events.some((e) => e.dateLabel) ? '约' : ''}${compactYear(group.events[0].year)}—${compactYear(group.events.at(-1)!.year)}年，${group.events.length}${journey ? '条行迹' : '件事件'}`
            : `${formatEventDate(group.events[0])}，${group.events[0].title}`
          return (
            <div className="rail-node" key={group.events.map((event) => event.id).join('-')}>
              <button
                key={group.events.map((event) => event.id).join('-')}
                className={`rail-event ${multiple ? 'grouped' : ''} ${group.events.some((event) => event.year === year) ? 'current' : ''}`}
                style={{ left: `clamp(10px, ${group.position * 100}%, calc(100% - 10px))` }}
                title={label}
                aria-label={multiple ? `展开${label}` : label}
                onClick={(event) => {
                  if (multiple) {
                    menuTrigger.current = event.currentTarget
                    setOpened(group)
                  } else onEvent(group.events[0].id)
                }}
              >
                {multiple ? group.events.length : ''}
              </button>
              {reading && (
                <button
                  className={`rail-label ${group.events.some((event) => event.id === selectedId) ? 'selected' : ''}`}
                  style={
                    {
                      left: reading.left,
                      width: reading.width,
                      '--pin-offset': `${group.position * width - reading.left}px`,
                    } as React.CSSProperties
                  }
                  title={label}
                  aria-label={
                    multiple
                      ? `阅读${reading.event.title}等${group.events.length}个事件`
                      : `阅读${reading.event.title}`
                  }
                  onClick={(event) => {
                    if (multiple) {
                      menuTrigger.current = event.currentTarget
                      setOpened(group)
                    } else onEvent(reading.event.id)
                  }}
                >
                  <strong>
                    {reading.event.title}
                    {multiple && <span> +{group.events.length - 1}</span>}
                  </strong>
                  {multiple && (
                    <small>
                      {compactYear(group.events[0].year)}
                      {group.events[0].year !== group.events.at(-1)!.year
                        ? `—${compactYear(group.events.at(-1)!.year)}`
                        : ''}{' '}
                      · {group.events.length}
                      {journey ? '条记录' : '件事件'}
                    </small>
                  )}
                </button>
              )}
            </div>
          )
        })}
        <input
          className="year-slider"
          type="range"
          aria-label="拖动历史时间轴"
          aria-valuetext={formatYear(year)}
          min={min}
          max={max}
          step={1}
          value={value}
          onChange={(event) => onYear(fromOrdinal(Number(event.target.value)))}
        />
        <div className="time-ticks">
          {ticks.map((tick, index) => (
            <span key={index} style={{ left: `${(index / (ticks.length - 1)) * 100}%` }}>
              {compactYear(tick)}
            </span>
          ))}
        </div>
        {(continuesOnMap || continuesInPillar) && (
          <button
            className="timeline-continuation"
            onClick={() => {
              if (continuesOnMap) onJumpYear(to + 1)
              else
                onJumpYear(
                  Math.round((MAX_YEAR + 1 + PILLAR_MAX_YEAR) / 2),
                  PILLAR_MAX_YEAR - MAX_YEAR - 1,
                )
            }}
            aria-label={
              continuesOnMap
                ? `在地图查看${to + 1}—${MAX_YEAR}年`
                : `在时空柱查看${to + 1}—${PILLAR_MAX_YEAR}年`
            }
          >
            {continuesOnMap && (
              <span>
                {to + 1}—{MAX_YEAR}年
              </span>
            )}
            <span>
              {continuesOnMap ? '地点地图' : '后续史事'} <ArrowRight size={13} aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
      <div className="era-band" aria-label="导航分期按时间长度显示">
        {journey ? (
          <span className="journey-era-caption">
            {compactYear(from)}—{compactYear(to)} · 拖动年份查看已有记录 · 未推断缺失年份的位置
          </span>
        ) : (
          periods
            .filter((item) => item.from <= to && item.to >= from)
            .map((item) => {
              const start = Math.max(min, toOrdinal(item.from)),
                end = Math.min(max, toOrdinal(item.to))
              const share = (end - start + 1) / (max - min + 1)
              return (
                <button
                  key={item.id}
                  className={item.id === period.id ? 'selected' : ''}
                  style={
                    {
                      left: `${((start - min) / (max - min + 1)) * 100}%`,
                      width: `${share * 100}%`,
                      '--era-color': item.color,
                    } as React.CSSProperties
                  }
                  onClick={() => onPeriod(item.id)}
                  title={`${item.name} · 导航分期 ${compactYear(item.from)}—${compactYear(item.to)}`}
                  aria-label={`选择${item.name}代表年份`}
                >
                  {share * width > 44
                    ? `${item.short}${overview ? '' : ` · ${compactYear(from)}—${compactYear(to)}`}`
                    : ''}
                </button>
              )
            })
        )}
      </div>
      {opened && (
        <div
          ref={menuRef}
          className="timeline-event-menu"
          role="dialog"
          aria-label={journey ? '时间轴行迹列表' : '时间轴事件列表'}
        >
          <div>
            <span>{opened.events.length} 个相近节点</span>
            <button
              aria-label={journey ? '关闭时间轴行迹列表' : '关闭时间轴事件列表'}
              onClick={closeMenu}
            >
              <X size={16} />
            </button>
          </div>
          {opened.events.map((event) => (
            <button
              className="timeline-event-choice"
              key={event.id}
              onClick={() => {
                setOpened(null)
                onEvent(event.id)
              }}
            >
              <span>{formatEventDate(event)}</span>
              <strong>{event.title}</strong>
              <ChevronRight size={14} />
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
