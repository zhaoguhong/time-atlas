import { readingSourceUrl } from '../lib/source-links'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import type { JourneyView, PersonJourney } from '../types'
import { compactYear, formatYear } from '../lib/history'
import ReadingText from './ReadingText'

export default function JourneyPanel({
  journey,
  biography,
  view,
  year,
  onNode,
  onStep,
}: {
  journey: PersonJourney
  biography: string
  view: JourneyView
  year: number
  onNode: (id: string) => void
  onStep: (offset: number) => void
}) {
  const index = view.nodes.findIndex((node) => node.id === view.activeId)
  const active = view.nodes[index]
  return (
    <section className="person-journey" aria-label={`${view.name}的生平行迹`}>
      <h3>
        有据可查的生平行迹 <small>{view.nodes.length} 条</small>
      </h3>
      {active && (
        <div className="journey-active-card" aria-live="polite">
          <span className="eyebrow">
            {active.year === year ? '当年收录记录' : `截至${compactYear(year)}年的最近记录`} ·{' '}
            {index + 1}/{view.nodes.length}
          </span>
          <h4>{active.title}</h4>
          <p className="journey-location">
            <MapPin size={13} />
            {formatYear(active.year)} · {active.kind} · {active.location}
          </p>
          <p>{active.summary}</p>
          {active.year !== year && (
            <p className="journey-gap">
              距此记录 {year - active.year} 年；不能据此认定{view.name}仍在该地。
            </p>
          )}
          {active.dateNote && <p className="journey-date-note">{active.dateNote}</p>}
          <p className="journey-date-note">{active.locationNote}</p>
          {active.sources.map((source) => (
            <a
              className="journey-citation"
              key={source.url}
              href={readingSourceUrl(source.url)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {source.title}
            </a>
          ))}
          <div className="journey-step-controls">
            <button onClick={() => onStep(-1)} disabled={index <= 0}>
              <ChevronLeft size={14} />
              上一条
            </button>
            <button onClick={() => onStep(1)} disabled={index >= view.nodes.length - 1}>
              下一条
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
      <details className="journey-biography">
        <summary>人物简介与行迹说明</summary>
        <ReadingText className="detail-lead" text={biography} />
        <p className="journey-introduction">{journey.introduction}</p>
        <div className="journey-reading-note">
          箭头表示两条记录的先后顺序，省略中间行程，不表示实际道路。未收录的年份与地点不作推断。
        </div>
      </details>
      <ol className="journey-node-list">
        {view.nodes.map((node, i) => (
          <li key={node.id}>
            <button
              className={`${i === index ? 'active' : ''} ${i > index ? 'later' : ''}`}
              aria-current={i === index ? 'step' : undefined}
              onClick={() => onNode(node.id)}
            >
              <span className="journey-order">{i + 1}</span>
              <span>
                <small>
                  {compactYear(node.year)}年 · {node.kind}
                </small>
                <strong>{node.title}</strong>
                <small>{node.location}</small>
              </span>
              <ChevronRight size={13} />
            </button>
          </li>
        ))}
      </ol>
    </section>
  )
}
