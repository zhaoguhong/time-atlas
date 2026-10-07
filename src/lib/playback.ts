import type { JourneyNode } from '../types'

export const PLAYBACK_SPEEDS = [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 5, 10, 20] as const
export const YEAR_DURATION_MS = 900
export const JOURNEY_LEG_DURATION_MS = 4000
export const TOPIC_CHAPTER_DURATION_MS = 12000
export const EVENT_YEAR_DURATION_MS = 4000

/** Multiple records in one year are read together; unknown intervening years are skipped. */
export function eventPlaybackYears(
  events: { year: number; endYear?: number }[],
  range?: [number, number] | null,
) {
  const matching = range
    ? events.filter((event) => event.year <= range[1] && (event.endYear ?? event.year) >= range[0])
    : events
  // For a ranged record, the filter's first year is an observation within its source interval.
  return [
    ...new Set(matching.map((event) => (range ? Math.max(event.year, range[0]) : event.year))),
  ].sort((a, b) => a - b)
}

/** Leave a short reading pause at each end, then ease along the schematic line. */
export function journeyMotionProgress(elapsed: number) {
  const t = Math.min(1, Math.max(0, (elapsed - 0.12) / 0.76))
  return t * t * (3 - 2 * t)
}

export function nextJourneyNode(nodes: JourneyNode[], activeId: string | null) {
  const index = nodes.findIndex((node) => node.id === activeId)
  return nodes[index + 1] ?? null
}

// The dashed map line is straight in Web Mercator. Interpolate in that same
// projection, so the traveler remains on the schematic line at every frame.
export function interpolateJourneyCoordinates(
  from: [number, number],
  to: [number, number],
  progress: number,
): [number, number] {
  const ratio = Math.min(1, Math.max(0, progress))
  const radians = Math.PI / 180
  const mercator = (latitude: number) => Math.log(Math.tan(Math.PI / 4 + (latitude * radians) / 2))
  const y = mercator(from[1]) + (mercator(to[1]) - mercator(from[1])) * ratio
  return [from[0] + (to[0] - from[0]) * ratio, (2 * Math.atan(Math.exp(y)) - Math.PI / 2) / radians]
}
