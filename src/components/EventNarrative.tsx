import type { HistoryEvent } from '../types'

export default function EventNarrative({
  narrative,
}: {
  narrative: NonNullable<HistoryEvent['narrative']>
}) {
  return (
    <div className="event-article">
      {narrative.sections.map((section, index) => (
        <section className="event-article-section" key={index}>
          {section.title && <h3>{section.title}</h3>}
          {section.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex}>{paragraph}</p>
          ))}
        </section>
      ))}
      {narrative.note && <p className="event-article-note">{narrative.note}</p>}
    </div>
  )
}
