import type { HistoryEvent } from '../types'

/** Ranged archaeology records remain present throughout their stated interval. */
export function eventsAtYear(events: HistoryEvent[], year: number) {
  return events
    .filter((event) => event.year <= year && (event.endYear ?? event.year) >= year)
    .sort((a, b) => b.importance - a.importance || b.year - a.year || a.id.localeCompare(b.id))
}
