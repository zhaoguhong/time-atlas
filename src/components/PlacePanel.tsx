import { MapPin, ArrowRight } from 'lucide-react'
import type { HistoryEvent, Person, PersonJourney } from '../types'
import { namesPlace, type Place } from '../lib/exploration'
import { compactYear, formatEventDate, periodAt } from '../lib/history'
import { readingSourceUrl } from '../lib/source-links'

export default function PlacePanel({
  place,
  events,
  people,
  journeys,
  onEvent,
  onPerson,
  onLocate,
  period,
  onPeriod,
}: {
  place: Place
  events: HistoryEvent[]
  people: Map<string, Person>
  journeys: PersonJourney[]
  onEvent: (id: string) => void
  onPerson: (id: string) => void
  onLocate: () => void
  period: string
  onPeriod: (value: string) => void
}) {
  const related = events.filter((event) => namesPlace(event.location, place))
  const periods = [
    ...new Map(
      related.map((event) => {
        const p = periodAt(event.year)
        return [p.id, p]
      }),
    ).values(),
  ]
  const visible = related.filter((event) => period === 'all' || periodAt(event.year).id === period)
  const peopleIds = [...new Set(visible.flatMap((event) => event.people))]
  const visits = journeys.flatMap((journey) =>
    journey.nodes
      .filter((node) => namesPlace(node.location, place))
      .map((node) => ({ person: people.get(journey.personId)!, node })),
  )
  const sources = [
    ...new Map(
      [
        ...related.flatMap((event) => event.sources),
        ...visits.flatMap((visit) => visit.node.sources),
      ].map((source) => [source.url, source]),
    ).values(),
  ]
  return (
    <article className="place-detail">
      <span className="eyebrow">地点档案 · 本版收录的历史线索</span>
      <h2>{place.name}</h2>
      <p className="detail-location">
        <MapPin size={14} />
        {place.modern}
      </p>
      <p>
        沿着地点读历史：这里汇集事件记录中明确提到的地名。不同年代的城址、城区和行政范围可能不同，地图坐标仅为区域参照。
      </p>
      <button className="outline-action" onClick={onLocate}>
        在地图上查看此地
        <ArrowRight size={15} />
      </button>
      <details className="place-names">
        <summary>本版地图中的地名标签</summary>
        <p>以下是标签在本版地图中的显示区间，不代表建城、改名或城市存续的准确年代。</p>
        {place.labels.map((label) => (
          <p key={label.id}>
            <strong>{label.name}</strong> · {compactYear(label.from)}—{compactYear(label.to)}年
          </p>
        ))}
      </details>
      <div className="archive-heading">
        <h3>相关事件 · {visible.length}</h3>
        <select aria-label="地点档案时期" value={period} onChange={(e) => onPeriod(e.target.value)}>
          <option value="all">历代记录</option>
          {periods.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      {!visible.length && <p>此地暂未收录可关联的事件。地名标签本身不代表完整的地方史。</p>}
      <div className="archive-event-list">
        {visible.map((event) => (
          <button key={event.id} onClick={() => onEvent(event.id)}>
            <small>
              {formatEventDate(event)} · {event.category}
            </small>
            <strong>{event.title}</strong>
            <span>{event.summary}</span>
            <small>{event.location}</small>
          </button>
        ))}
      </div>
      {!!peopleIds.length && (
        <>
          <h3>事件中的关联人物</h3>
          <p className="person-relation-note">事件参与、决策等关系不证明本人曾到此地。</p>
          <div className="place-people">
            {peopleIds.map((id) => (
              <button key={id} onClick={() => onPerson(id)}>
                {people.get(id)?.name}
              </button>
            ))}
          </div>
        </>
      )}
      <h3>独立核对的行迹记录 · {visits.length}</h3>
      {!visits.length ? (
        <p>本版尚无匹配的已核对行迹，不从关联事件推断到访。</p>
      ) : (
        <div className="place-visits">
          {visits.map(({ person, node }) => (
            <div key={`${person.id}:${node.id}`}>
              <button onClick={() => onPerson(person.id)}>{person.name}</button>
              <strong>
                {compactYear(node.year)}年 · {node.kind} · {node.location}
              </strong>
              <p>{node.summary}</p>
              <small>{node.locationNote}</small>
              {node.sources.map((source) => (
                <a
                  key={source.url}
                  href={readingSourceUrl(source.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {source.title}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
      {!!sources.length && (
        <div className="reference-list">
          <span className="eyebrow">地点线索的来源 · 各事件中保留完整引用</span>
          {sources.slice(0, 8).map((source) => (
            <a
              key={source.url}
              href={readingSourceUrl(source.url)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {source.title}
            </a>
          ))}
        </div>
      )}
    </article>
  )
}
