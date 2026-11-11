import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import type { ReactNode } from 'react'
import type { JourneyView, PersonJourney } from '../types'
import { compactYear, formatYear } from '../lib/history'
import ReadingText from './ReadingText'
import { SourceCitation } from './Sources'

export default function JourneyPanel({
  journey,
  biography,
  view,
  year,
  onNode,
  onStep,
  furtherReading,
}: {
  journey: PersonJourney
  biography: string
  view: JourneyView
  year: number
  onNode: (id: string) => void
  onStep: (offset: number) => void
  furtherReading?: ReactNode
}) {
  const index = view.nodes.findIndex((node) => node.id === view.activeId)
  const active = view.nodes[index]
  return (
    <section className="person-journey" aria-label={`${view.name}的生平行迹`}>
      <h3>
        有据可查的生平行迹 <small>{view.nodes.length} 条</small>
      </h3>
      <p className="journey-reading-note">
        动画按记录先后示意，连线不表示真实道路或航线；两条记录之间的行程与停留未作推断。
      </p>
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
            <SourceCitation className="journey-citation" key={source.url} source={source} />
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
      {furtherReading}
      <details className="journey-biography">
        <summary>人物简介与行迹说明</summary>
        <ReadingText className="detail-lead" text={biography} />
        <p className="journey-introduction">{journey.introduction}</p>
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
