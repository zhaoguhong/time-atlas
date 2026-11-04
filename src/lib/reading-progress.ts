import type { Selection, Tour } from '../types'

export interface TopicProgress {
  lastStep: number
  read: number[]
}
export interface RecentReading {
  key: string
  title: string
  hash: string
}
export interface ReadingProgress {
  topics: Record<string, TopicProgress>
  recent: RecentReading[]
}
export const readingKey = 'time-atlas:reading:v2'
const legacyReadingKey = 'time-atlas:reading:v1'
type TopicCatalog = readonly Pick<Tour, 'id' | 'steps'>[]

export function topicStepFromHash(topic: Pick<Tour, 'steps'>, hash: string) {
  const params = new URLSearchParams(hash.replace(/^#/, ''))
  const eventStep = topic.steps.indexOf(params.get('event') ?? '')
  if (eventStep >= 0) return eventStep
  const step = params.get('step')
  if (step !== null && /^\d+$/.test(step) && Number(step) < topic.steps.length) return Number(step)
  return undefined
}
export const emptyProgress: ReadingProgress = { topics: {}, recent: [] }
export function readProgress(catalog: TopicCatalog): ReadingProgress {
  try {
    const saved = localStorage.getItem(readingKey)
    const value = JSON.parse(saved ?? localStorage.getItem(legacyReadingKey) ?? 'null')
    if (!value || typeof value !== 'object') return { topics: {}, recent: [] }
    const topics: ReadingProgress['topics'] = {}
    const byId = new Map(catalog.map((topic) => [topic.id, topic]))
    for (const [id, entry] of Object.entries(value.topics ?? {}).slice(0, 100)) {
      const topic = byId.get(id)
      if (!topic?.steps.length || !entry || typeof entry !== 'object') continue
      if (saved !== null) {
        const item = entry as { lastEventId?: unknown; readEventIds?: unknown }
        if (typeof item.lastEventId !== 'string' || !Array.isArray(item.readEventIds)) continue
        topics[id] = {
          lastStep: Math.max(0, topic.steps.indexOf(item.lastEventId)),
          read: [
            ...new Set(
              item.readEventIds
                .filter((eventId): eventId is string => typeof eventId === 'string')
                .map((eventId) => topic.steps.indexOf(eventId))
                .filter((step) => step >= 0),
            ),
          ],
        }
      } else {
        // Migrate the old positional format once, using the current chapter catalog.
        const item = entry as TopicProgress
        if (!Number.isInteger(item.lastStep) || item.lastStep < 0 || !Array.isArray(item.read))
          continue
        const recent = Array.isArray(value.recent)
          ? value.recent.find((record: RecentReading) => record?.key === `topic:${id}`)
          : undefined
        const resumedStep =
          typeof recent?.hash === 'string' ? topicStepFromHash(topic, recent.hash) : undefined
        topics[id] = {
          lastStep: resumedStep ?? Math.min(item.lastStep, topic.steps.length - 1),
          read: [
            ...new Set(
              item.read
                .filter((step) => Number.isInteger(step) && step >= 0)
                // If a saved event exposes a reorder, other positional marks are ambiguous.
                .filter(
                  (step) =>
                    resumedStep === undefined ||
                    resumedStep === item.lastStep ||
                    step === item.lastStep,
                )
                .map((step) =>
                  step === item.lastStep && resumedStep !== undefined ? resumedStep : step,
                )
                .filter((step) => step < topic.steps.length),
            ),
          ],
        }
      }
    }
    const recent = Array.isArray(value.recent)
      ? value.recent
          .filter(
            (item: RecentReading) =>
              item &&
              typeof item.key === 'string' &&
              typeof item.title === 'string' &&
              typeof item.hash === 'string' &&
              item.hash.startsWith('#'),
          )
          .slice(0, 12)
      : []
    return { topics, recent }
  } catch {
    return { topics: {}, recent: [] }
  }
}
export function writeProgress(progress: ReadingProgress, catalog: TopicCatalog) {
  try {
    const topics = Object.fromEntries(
      catalog.flatMap((topic) => {
        const item = progress.topics[topic.id]
        if (!item || !topic.steps.length) return []
        return [
          [
            topic.id,
            {
              lastEventId: topic.steps[item.lastStep] ?? topic.steps[0],
              readEventIds: [
                ...new Set(item.read.map((step) => topic.steps[step]).filter(Boolean)),
              ],
            },
          ],
        ]
      }),
    )
    localStorage.setItem(readingKey, JSON.stringify({ topics, recent: progress.recent }))
  } catch {
    /* Reading still works when storage is unavailable. */
  }
}
export function readingSelectionKey(selection: Selection | null) {
  return selection && selection.type !== 'polity' ? `${selection.type}:${selection.id}` : null
}
