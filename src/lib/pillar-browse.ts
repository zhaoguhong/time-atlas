import type { HistoryEvent } from '../types'
import { PILLAR_MAX_YEAR as MAX_YEAR, MIN_YEAR } from './history'

export type BrowseStop = { year: number; event: HistoryEvent }

/** Wide views visit landmarks; zoomed views admit smaller historical nodes. */
export function pillarBrowseStops(
  events: HistoryEvent[],
  span: number,
  range: [number, number] | null,
): BrowseStop[] {
  const [first, last] = range ?? [MIN_YEAR, MAX_YEAR]
  const importance = span >= 800 ? 5 : span >= 160 ? 4 : 1
  const stops = new Map<number, HistoryEvent>()
  for (const event of events) {
    if (event.importance < importance || event.year > last || (event.endYear ?? event.year) < first)
      continue
    const year = Math.max(first, event.year)
    const previous = stops.get(year)
    if (
      !previous ||
      event.importance > previous.importance ||
      (event.importance === previous.importance && event.id < previous.id)
    )
      stops.set(year, event)
  }
  return [...stops].sort(([a], [b]) => a - b).map(([year, event]) => ({ year, event }))
}
