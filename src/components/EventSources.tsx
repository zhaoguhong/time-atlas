import type { Source } from '../types'
import { useEventSources } from '../hooks/use-event-sources'
import Sources from './Sources'

export default function EventSources({
  eventIds,
  sources = [],
  title,
  initialLimit,
}: {
  eventIds: string[]
  sources?: Source[]
  title?: string
  initialLimit?: number
}) {
  const related = useEventSources(eventIds)
  const merged = new Map<string, Source>()
  const notes = new Map<string, Set<string>>()
  for (const source of [...sources, ...related.sources]) {
    const sourceNotes = notes.get(source.url) ?? new Set<string>()
    if (source.note) sourceNotes.add(source.note)
    notes.set(source.url, sourceNotes)
    merged.set(source.url, { ...source, note: [...sourceNotes].join('\n') || undefined })
  }
  return (
    <Sources
      sources={[...merged.values()]}
      title={title}
      initialLimit={initialLimit}
      loading={related.loading}
      failed={related.failed}
      retry={related.retry}
    />
  )
}
