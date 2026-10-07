import { compactYear, formatEventDate, toOrdinal } from '../lib/history'
import type { Dynasty, HistoryEvent } from '../types'

export default function ComparisonPanel({
  year,
  reference,
  events,
  dynasties,
  onEvent,
  onDynasty,
  all,
  onAll,
}: {
  year: number
  reference: number
  events: HistoryEvent[]
  dynasties: Dynasty[]
  onEvent: (id: string) => void
  onDynasty: (id: string) => void
  all: boolean
  onAll: (value: boolean) => void
}) {
  const from = Math.min(year, reference),
    to = Math.max(year, reference)
  const interval = events.filter(
    (event) => event.year <= to && (event.endYear ?? event.year) >= from,
  )
  const visible = all ? interval : interval.filter((event) => event.importance >= 4)
  const polities = dynasties.filter((dynasty) => dynasty.from <= to && dynasty.to >= from)
  const duration = Math.max(1, toOrdinal(to) - toOrdinal(from))
  return (
    <article className="comparison-reading">
      <span className="eyebrow">年份对比 · 阅读变化</span>
      <h2>
        {compactYear(from)}—{compactYear(to)}年
      </h2>
      <p>
        相隔 {Math.abs(toOrdinal(to) - toOrdinal(from))}{' '}
        年。结合地图叠加与这段时期的记录，观察政治格局和社会生活的变化。
      </p>
      <div className="comparison-years">
        {[from, to].map((value, index) => (
          <section key={index}>
            <h3>{compactYear(value)}年</h3>
            <p>本版收录且存续于此年的朝代 / 政权</p>
            {dynasties
              .filter((dynasty) => dynasty.from <= value && dynasty.to >= value)
              .map((dynasty) => (
                <button key={dynasty.id} onClick={() => onDynasty(dynasty.id)}>
                  {dynasty.name}
                </button>
              ))}
          </section>
        ))}
      </div>
      <h3>同时期的朝代 / 政权</h3>
      <p className="person-relation-note">
        时间带表示档案记载的存续区间，不代表疆域面积或统治范围。地图资料的适用区间可能不同。
      </p>
      <div className="polity-timebands">
        {polities.map((dynasty) => (
          <button key={dynasty.id} onClick={() => onDynasty(dynasty.id)}>
            <span>
              {dynasty.name}
              <small>
                {compactYear(dynasty.from)}—{compactYear(dynasty.to)}
              </small>
            </span>
            <span className="polity-timeband">
              <i
                style={{
                  left: `${(Math.max(0, toOrdinal(dynasty.from) - toOrdinal(from)) / duration) * 100}%`,
                  width: `${Math.max(1, ((Math.min(toOrdinal(to), toOrdinal(dynasty.to)) - Math.max(toOrdinal(from), toOrdinal(dynasty.from))) / duration) * 100)}%`,
                }}
              />
            </span>
          </button>
        ))}
      </div>
      <h3>这段时间的历史线索 · {interval.length} 件</h3>
      <p>以下按时间排列；同时或先后发生不等于存在因果关系。事件覆盖仍以中国及周边为主。</p>
      <label className="check-label">
        <input type="checkbox" checked={all} onChange={(e) => onAll(e.target.checked)} />
        显示全部记录（默认主要节点）
      </label>
      {!visible.length && <p>当前筛选没有主要节点，可显示全部记录或调整对比年份。</p>}
      <div className="archive-event-list">
        {visible.map((event) => (
          <button key={event.id} onClick={() => onEvent(event.id)}>
            <small>
              {formatEventDate(event)} · {event.category}
            </small>
            <strong>{event.title}</strong>
            <span>{event.summary}</span>
          </button>
        ))}
      </div>
    </article>
  )
}
