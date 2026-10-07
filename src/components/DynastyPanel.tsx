import { readingSourceUrl } from '../lib/source-links'
import { ArrowRight, BookOpen } from 'lucide-react'
import { useRef } from 'react'
import type { Dynasty, HistoryEvent } from '../types'
import ReadingText from './ReadingText'
import { compactYear, matchesEvent, MAX_YEAR, MIN_YEAR } from '../lib/history'
export function DynastyIntroduction({ dynasty }: { dynasty: Dynasty }) {
  return (
    <div className="dynasty-introduction">
      <p className="detail-lead">{dynasty.summary}</p>
      <div className="dynasty-facts">
        <span>
          政权档案纪年
          <strong>
            {compactYear(dynasty.from)}—{compactYear(dynasty.to)}
          </strong>
        </span>
        <span>
          都城与中心<strong>{dynasty.capital}</strong>
        </span>
      </div>
      {dynasty.dateNote && <p className="dynasty-date-note">{dynasty.dateNote}</p>}
      <h3>时代背景</h3>
      <p className="dynasty-context">{dynasty.context}</p>
      {dynasty.sections?.map((section) => (
        <section className="dynasty-reading-section" key={section.title}>
          <h3>{section.title}</h3>
          <ReadingText text={section.text} />
        </section>
      ))}
    </div>
  )
}
export default function DynastyPanel({
  dynasty,
  onYear,
  events,
  onEvent,
  query,
  onQuery,
}: {
  dynasty: Dynasty
  onYear: (year: number) => void
  events: HistoryEvent[]
  onEvent: (id: string) => void
  query: string
  onQuery: (value: string) => void
}) {
  const inRange = dynasty.from >= MIN_YEAR && dynasty.from <= MAX_YEAR
  const chronologyRef = useRef<HTMLElement>(null)
  const allEvents = events.filter((event) => event.year >= dynasty.from && event.year <= dynasty.to)
  const chronology = allEvents.filter((event) => matchesEvent(event, query.trim()))
  return (
    <article className="dynasty-detail">
      <span className="eyebrow">朝代与政权档案</span>
      <h2>{dynasty.name}</h2>
      {allEvents.length > 0 && (
        <button
          className="dynasty-jump"
          onClick={() =>
            chronologyRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
          }
        >
          浏览这一时期的大事 · {allEvents.length} 件 <ArrowRight size={13} />
        </button>
      )}
      <DynastyIntroduction dynasty={dynasty} />
      {dynasty.to < MIN_YEAR && (
        <p className="dynasty-date-note">
          这一朝代早于本版地图范围（约前2070—1912年）；可阅读档案，暂不绘制这一时期的疆域。
        </p>
      )}
      {inRange && (
        <button className="outline-action" onClick={() => onYear(dynasty.from)}>
          {dynasty.dateNote && dynasty.from < -841 ? '查看约定起始年代' : '查看建立年份的地图'}
          <ArrowRight size={14} />
        </button>
      )}
      {allEvents.length > 0 && (
        <section ref={chronologyRef} className="dynasty-chronology">
          <h3>
            同时期主要大事 <small>{allEvents.length} 件</small>
          </h3>
          <p className="person-relation-note">
            覆盖这一政权的存续年份，包含同时并立政权和周边地区的事件；按时间顺序阅读。
          </p>
          <input
            className="dynasty-event-filter"
            aria-label="筛选朝代大事"
            placeholder="查找事件、地点或年份"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
          />
          {query && (
            <p className="dynasty-filter-count">
              找到 {chronology.length} 件 <button onClick={() => onQuery('')}>显示全部</button>
            </p>
          )}
          <ol>
            {chronology.map((event) => (
              <li key={event.id}>
                <button onClick={() => onEvent(event.id)}>
                  <span>{event.dateLabel ?? compactYear(event.year)}</span>
                  <div>
                    <small>
                      {event.category} · {event.location}
                    </small>
                    <strong>{event.title}</strong>
                  </div>
                  <ArrowRight size={13} />
                </button>
              </li>
            ))}
          </ol>
        </section>
      )}
      <div className="reference-list">
        <span className="eyebrow">继续阅读 · 参考资料</span>
        {dynasty.sources.map((source) => (
          <a
            key={source.url}
            href={readingSourceUrl(source.url)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BookOpen size={14} />
            <span>{source.title}</span>
          </a>
        ))}
      </div>
    </article>
  )
}
