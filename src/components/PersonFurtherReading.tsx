import { BookOpen, ExternalLink } from 'lucide-react'
import type { Person } from '../types'
import { personReadingLinks } from '../lib/person-reading-links'
import { readingSourceUrl } from '../lib/source-links'

export default function PersonFurtherReading({ person }: { person: Person }) {
  const links = personReadingLinks(person)
  if (!links.length) return null
  return (
    <section className="person-further-reading" aria-label={`${person.name}的延伸阅读`}>
      <div className="further-reading-heading">
        <h3>
          <BookOpen size={15} aria-hidden="true" /> 延伸阅读
        </h3>
        <span>在新标签页打开</span>
      </div>
      <div className="further-reading-links">
        {links.map((link) => (
          <a
            key={link.url}
            href={readingSourceUrl(link.url)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="further-reading-label">
              <span className="further-reading-kind">{link.kind}</span>
              <span>{link.provider}</span>
            </span>
            <strong>{link.title}</strong>
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  )
}
