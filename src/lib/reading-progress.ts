import type { Selection } from '../types'

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
export const readingKey = 'time-atlas:reading:v1'
export const emptyProgress: ReadingProgress = { topics: {}, recent: [] }
export function readProgress(): ReadingProgress {
  try {
    const value = JSON.parse(localStorage.getItem(readingKey) ?? 'null')
    if (!value || typeof value !== 'object') return emptyProgress
    const topics: ReadingProgress['topics'] = {}
    for (const [id, entry] of Object.entries(value.topics ?? {}).slice(0, 100)) {
      const item = entry as TopicProgress
      if (
        !item ||
        !Number.isInteger(item.lastStep) ||
        item.lastStep < 0 ||
        !Array.isArray(item.read)
      )
        continue
      topics[id] = {
        lastStep: item.lastStep,
        read: [...new Set(item.read.filter((step) => Number.isInteger(step) && step >= 0))],
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
    return emptyProgress
  }
}
export function writeProgress(progress: ReadingProgress) {
  try {
    localStorage.setItem(readingKey, JSON.stringify(progress))
  } catch {
    /* Reading still works when storage is unavailable. */
  }
}
export function readingSelectionKey(selection: Selection | null) {
  return selection && selection.type !== 'polity' ? `${selection.type}:${selection.id}` : null
}
