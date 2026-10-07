import type { HistoryEvent } from '../types'
import { toOrdinal } from './history'

export interface ScreenPoint {
  x: number
  y: number
}
export interface EventGroup {
  events: HistoryEvent[]
  coordinates: [number, number]
}
export interface Rect {
  left: number
  top: number
  right: number
  bottom: number
}

export function intersects(a: Rect, b: Rect, padding = 4) {
  return (
    a.left < b.right + padding &&
    a.right > b.left - padding &&
    a.top < b.bottom + padding &&
    a.bottom > b.top - padding
  )
}

// Screen distance controls grouping; connected components avoid splitting coincident
// events across grid-cell edges. Coordinates remain representative group positions.
export function groupMapEvents(
  events: HistoryEvent[],
  project: (coordinates: [number, number]) => ScreenPoint,
  radius = 38,
): EventGroup[] {
  const points = events.map((event) => project(event.coordinates))
  const parents = events.map((_, i) => i)
  function root(i: number): number {
    while (parents[i] !== i) {
      parents[i] = parents[parents[i]]
      i = parents[i]
    }
    return i
  }
  for (let i = 0; i < events.length; i++)
    for (let j = 0; j < i; j++) {
      if (Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y) < radius)
        parents[root(i)] = root(j)
    }
  const groups = new Map<number, HistoryEvent[]>()
  events.forEach((event, i) => {
    const key = root(i)
    groups.set(key, [...(groups.get(key) ?? []), event])
  })
  return [...groups.values()].map((items) => ({
    events: [...items].sort((a, b) => a.year - b.year),
    coordinates: [
      items.reduce((sum, item) => sum + item.coordinates[0], 0) / items.length,
      items.reduce((sum, item) => sum + item.coordinates[1], 0) / items.length,
    ],
  }))
}

export interface TimelineGroup {
  events: HistoryEvent[]
  position: number
}

/** Place reading labels independently of date pins. Never move a pin to make text fit. */
export function timelineLabels(groups: TimelineGroup[], width: number, selectedId?: string) {
  const occupied: { left: number; right: number }[] = []
  const output = new Map<number, { left: number; width: number; event: HistoryEvent }>()
  const candidates = groups
    .map((group, index) => {
      const selected = group.events.find((event) => event.id === selectedId)
      const event = selected ?? [...group.events].sort((a, b) => b.importance - a.importance)[0]
      return { group, index, event, priority: selected ? 100 : event.importance }
    })
    .sort((a, b) => b.priority - a.priority || a.index - b.index)
  for (const { group, index, event } of candidates) {
    const natural = Math.min(
      156,
      width,
      Math.max(76, event.title.length * 11 + (group.events.length > 1 ? 30 : 8)),
    )
    const pin = group.position * width
    let placed = false
    for (const size of [natural, Math.min(natural, 100), Math.min(natural, 76)]) {
      for (const anchor of [pin - size / 2, pin, pin - size]) {
        const left = Math.max(0, Math.min(width - size, anchor)),
          right = left + size
        if (occupied.some((box) => left < box.right + 10 && right > box.left - 10)) continue
        occupied.push({ left, right })
        output.set(index, { left, width: size, event })
        placed = true
        break
      }
      if (placed) break
    }
  }
  return output
}
export function groupTimelineEvents(
  events: HistoryEvent[],
  from: number,
  to: number,
  width: number,
  gap = 24,
): TimelineGroup[] {
  const min = toOrdinal(from),
    duration = Math.max(1, toOrdinal(to) - min)
  const groups: TimelineGroup[] = []
  for (const event of [...events]
    .filter((e) => e.year >= from && e.year <= to)
    .sort((a, b) => a.year - b.year)) {
    const position = (toOrdinal(event.year) - min) / duration
    const previous = groups.at(-1)
    if (previous && (position - previous.position) * width < gap) {
      previous.events.push(event)
      previous.position =
        previous.events.reduce((sum, item) => sum + (toOrdinal(item.year) - min) / duration, 0) /
        previous.events.length
    } else groups.push({ events: [event], position })
  }
  return groups
}
