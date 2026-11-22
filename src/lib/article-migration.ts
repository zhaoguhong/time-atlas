import type { Tour } from '../types'
import type { ReadingProgress } from './reading-progress'

type Catalog = readonly Pick<Tour, 'id' | 'name' | 'steps'>[]

export function consolidateBookmarks(bookmarks: string[], aliases: ReadonlyMap<string, string>) {
  return [
    ...new Set(
      bookmarks.map((key) => {
        if (!key.startsWith('topic:')) return key
        const id = key.slice(6)
        return `topic:${aliases.get(id) ?? id}`
      }),
    ),
  ]
}

/** Keep a deliberate unmark from being reintroduced by a retained legacy guide. */
export function toggleArticleEventRead(
  progress: ReadingProgress,
  catalog: Catalog,
  aliases: ReadonlyMap<string, string>,
  activeId: string,
  step: number,
): ReadingProgress {
  const active = catalog.find((guide) => guide.id === activeId)
  const eventId = active?.steps[step]
  if (!eventId) return progress
  const canonical = aliases.get(activeId) ?? activeId
  const marked = progress.topics[activeId]?.read.includes(step) ?? false
  const topics = { ...progress.topics }
  for (const guide of catalog) {
    if ((aliases.get(guide.id) ?? guide.id) !== canonical) continue
    const index = guide.steps.indexOf(eventId)
    const prior = topics[guide.id]
    if (index < 0 || (!prior && guide.id !== activeId && guide.id !== canonical)) continue
    topics[guide.id] = {
      lastStep: guide.id === activeId ? step : (prior?.lastStep ?? index),
      read: marked
        ? (prior?.read ?? []).filter((value) => value !== index)
        : [...new Set([...(prior?.read ?? []), index])],
    }
  }
  return { ...progress, topics }
}

/** Move explicit event marks by event ID, retaining legacy guides for old event links. */
export function consolidateArticleProgress(
  progress: ReadingProgress,
  catalog: Catalog,
  aliases: ReadonlyMap<string, string>,
): ReadingProgress {
  const guides = new Map(catalog.map((guide) => [guide.id, guide]))
  const topics = { ...progress.topics }
  for (const canonical of new Set(aliases.values())) {
    const target = guides.get(canonical)
    if (!target) continue
    const ids = [...aliases].filter(([, id]) => id === canonical).map(([id]) => id)
    const entries = ids.filter((id) => progress.topics[id] && guides.has(id))
    if (!entries.length) continue
    const read = new Set<number>()
    for (const id of entries) {
      const source = guides.get(id)!
      for (const step of progress.topics[id].read) {
        const index = target.steps.indexOf(source.steps[step])
        if (index >= 0) read.add(index)
      }
    }
    const latest =
      progress.recent
        .map((entry) => (entry.key.startsWith('topic:') ? entry.key.slice(6) : ''))
        .find((id) => entries.includes(id)) ?? entries[0]
    const lastEvent = guides.get(latest)!.steps[progress.topics[latest].lastStep]
    topics[canonical] = {
      lastStep: Math.max(0, target.steps.indexOf(lastEvent)),
      read: [...read].sort((a, b) => a - b),
    }
    for (const id of ids) {
      if (id === canonical) continue
      const source = guides.get(id)
      if (!source) continue
      const prior = topics[id]
      topics[id] = {
        lastStep: prior?.lastStep ?? Math.max(0, source.steps.indexOf(lastEvent)),
        read: source.steps.flatMap((eventId, index) =>
          read.has(target.steps.indexOf(eventId)) ? [index] : [],
        ),
      }
    }
  }
  const seen = new Set<string>()
  const recent = progress.recent.flatMap((entry) => {
    const oldId = entry.key.startsWith('topic:') ? entry.key.slice(6) : undefined
    const id = oldId ? aliases.get(oldId) : undefined
    const key = id ? `topic:${id}` : entry.key
    if (seen.has(key)) return []
    seen.add(key)
    return [{ ...entry, key, title: id ? (guides.get(id)?.name ?? entry.title) : entry.title }]
  })
  return { topics, recent }
}
