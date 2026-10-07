import { useEffect, useState } from 'react'
import { places } from '../lib/exploration'
import { compactYear, MAX_YEAR, MIN_YEAR } from '../lib/history'
import type { ExplorationFilter, MapBounds } from '../types'

export default function ExplorationFilters({
  value,
  onChange,
  bounds,
  open,
  onOpen,
}: {
  value: ExplorationFilter
  onChange: (value: ExplorationFilter) => void
  bounds: MapBounds | null
  open: boolean
  onOpen: (value: boolean) => void
}) {
  const [from, setFrom] = useState(String(value.range?.[0] ?? ''))
  const [to, setTo] = useState(String(value.range?.[1] ?? ''))
  const [error, setError] = useState('')
  useEffect(() => {
    setFrom(String(value.range?.[0] ?? ''))
    setTo(String(value.range?.[1] ?? ''))
  }, [value.range])
  const active = !!value.place || !!value.range || !!value.bounds
  return (
    <details
      className="exploration-filters"
      open={open}
      onToggle={(event) => onOpen(event.currentTarget.open)}
    >
      <summary>
        地点与时间段
        {value.range
          ? ` · ${compactYear(value.range[0])}—${compactYear(value.range[1])}年`
          : active
            ? ' · 筛选中'
            : ''}
      </summary>
      <div>
        <label>
          地点
          <select
            aria-label="筛选事件地点"
            value={value.place}
            onChange={(e) => onChange({ ...value, place: e.target.value, bounds: null })}
          >
            <option value="">全部地点</option>
            {places.map((place) => (
              <option value={place.id} key={place.id}>
                {place.name}
              </option>
            ))}
          </select>
        </label>
        <button disabled={!bounds} onClick={() => onChange({ ...value, bounds, place: '' })}>
          限定当前地图范围
        </button>
        {value.bounds && (
          <p>
            已固定选取的地理范围；移动地图后可重新选取。地理范围不代表古代疆域。
            <button onClick={() => onChange({ ...value, bounds: null })}>取消范围</button>
          </p>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const a = Number(from),
              b = Number(to)
            if (
              ![from, to].every((s) => /^-?\d+$/.test(s)) ||
              ![a, b].every(
                (n) => Number.isInteger(n) && n !== 0 && n >= MIN_YEAR && n <= MAX_YEAR,
              ) ||
              a > b
            ) {
              setError('请按先后输入前10000至1912年，公元前用负数，没有0年。')
              return
            }
            setError('')
            onChange({ ...value, range: [a, b] })
          }}
        >
          <label>
            起年
            <input
              aria-label="筛选起始年份"
              inputMode="text"
              value={from}
              placeholder="例如 618"
              onChange={(e) => setFrom(e.target.value)}
            />
          </label>
          <label>
            止年
            <input
              aria-label="筛选结束年份"
              inputMode="text"
              value={to}
              placeholder="例如 907"
              onChange={(e) => setTo(e.target.value)}
            />
          </label>
          <button type="submit">应用时间段</button>
        </form>
        {error && <p role="alert">{error}</p>}
        {value.range && (
          <p>
            {compactYear(value.range[0])}—{compactYear(value.range[1])}年 · 代替“当年 / 前后五年 /
            整个时期”范围
          </p>
        )}
        {active && (
          <button
            onClick={() => {
              onChange({ place: '', range: null, bounds: null })
              setError('')
            }}
          >
            清除地点与时间段
          </button>
        )}
      </div>
    </details>
  )
}
