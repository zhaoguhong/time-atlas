import { periods } from '../data/periods'
import type { EventScope, HistoryEvent, Person, Preferences } from '../types'

export const MIN_YEAR = -10000
export const MAX_YEAR = 1912
export const DEFAULT_YEAR = 230
export const toOrdinal = (year: number) => (year > 0 ? year - 1 : year)
export const fromOrdinal = (ordinal: number) => (ordinal >= 0 ? ordinal + 1 : ordinal)
export const formatYear = (year: number) =>
  year < 0 ? `公元前 ${Math.abs(year)} 年` : `公元 ${year} 年`
export const compactYear = (year: number) => (year < 0 ? `前${Math.abs(year)}` : `${year}`)
export const formatEventDate = (event: HistoryEvent) => event.dateLabel ?? formatYear(event.year)
export const eventDateRelation = (event: HistoryEvent, year: number) =>
  event.dateLabel ? (event.endYear ? '阶段记录' : '约定纪年') : eventRelation(event.year, year)
export const clampYear = (year: number) =>
  Math.min(MAX_YEAR, Math.max(MIN_YEAR, year === 0 ? 1 : Math.round(year)))
export const periodAt = (year: number) =>
  periods.find((p) => year >= p.from && year <= p.to) ?? periods[0]
export const lifeDates = (person: Person) =>
  `${person.birth === null ? '?' : compactYear(person.birth)} — ${person.death === null ? '?' : compactYear(person.death)}`

export function matchesEvent(event: HistoryEvent, query: string) {
  const text = query.toLocaleLowerCase().replace(/\s+/g, '')
  return [event.title, event.location, String(event.year), ...(event.aliases ?? [])].some((value) =>
    value.toLocaleLowerCase().replace(/\s+/g, '').includes(text),
  )
}

export function eventsInPeriod(events: HistoryEvent[], year: number) {
  const period = periodAt(year)
  return events.filter(
    (event) => (event.endYear ?? event.year) >= period.from && event.year <= period.to,
  )
}

export function nearbyEvents(events: HistoryEvent[], year: number) {
  return [...eventsInPeriod(events, year)].sort(
    (a, b) => Math.abs(a.year - year) - Math.abs(b.year - year) || a.year - b.year,
  )
}

export function eventsInScope(events: HistoryEvent[], year: number, scope: EventScope, radius = 5) {
  const candidates =
    scope === 'period'
      ? eventsInPeriod(events, year)
      : events.filter(
          (event) =>
            toOrdinal(event.year) <= toOrdinal(year) + (scope === 'year' ? 0 : radius) &&
            toOrdinal(event.endYear ?? event.year) >=
              toOrdinal(year) - (scope === 'year' ? 0 : radius),
        )
  return [...candidates].sort((a, b) =>
    scope === 'period'
      ? a.year - b.year
      : Math.abs(toOrdinal(a.year) - toOrdinal(year)) -
          Math.abs(toOrdinal(b.year) - toOrdinal(year)) || a.year - b.year,
  )
}
export function eventRelation(eventYear: number, year: number) {
  const distance = toOrdinal(eventYear) - toOrdinal(year)
  return distance === 0 ? '当年' : `${distance < 0 ? '早' : '晚'} ${Math.abs(distance)} 年`
}
export function scopeDescription(year: number, scope: EventScope) {
  if (scope === 'year') return `${formatYear(year)} · 当年事件`
  if (scope === 'period') {
    const period = periodAt(year)
    return `${period.name} · ${compactYear(period.from)}—${compactYear(period.to)}`
  }
  return `${compactYear(clampYear(fromOrdinal(toOrdinal(year) - 5)))}—${compactYear(clampYear(fromOrdinal(toOrdinal(year) + 5)))} · 前后五年`
}

export function parseHash(hash: string) {
  const params = new URLSearchParams(hash.replace(/^#/, ''))
  const rawYear = params.get('year')
  const year = rawYear !== null && /^-?\d+$/.test(rawYear) ? clampYear(Number(rawYear)) : undefined
  const event = params.get('event')
  const person = params.get('person')
  const rawScope = params.get('scope')
  const scope: EventScope | undefined =
    rawScope === 'year' || rawScope === 'nearby' || rawScope === 'period' ? rawScope : undefined
  const rawCompare = params.get('compare')
  const compare =
    rawCompare !== null && /^-?\d+$/.test(rawCompare) ? clampYear(Number(rawCompare)) : undefined
  return {
    year,
    event,
    person,
    scope,
    compare,
    dynasty: params.get('dynasty'),
    journey: params.get('journey'),
    point: params.get('point'),
    future: params.get('future') === '1',
    tour: params.get('tour'),
    step: /^-?\d+$/.test(params.get('step') ?? '') ? Number(params.get('step')) : undefined,
  }
}

export const defaultPreferences: Preferences = {
  year: DEFAULT_YEAR,
  cities: true,
  events: true,
  bookmarks: [],
  scope: 'nearby',
}
export function readPreferences(): Preferences {
  try {
    const value: unknown = JSON.parse(localStorage.getItem('time-atlas:v1') ?? 'null')
    if (!value || typeof value !== 'object') return defaultPreferences
    const data = value as Record<string, unknown>
    return {
      year:
        typeof data.year === 'number' && Number.isFinite(data.year)
          ? clampYear(data.year)
          : DEFAULT_YEAR,
      cities: typeof data.cities === 'boolean' ? data.cities : true,
      events: typeof data.events === 'boolean' ? data.events : true,
      bookmarks: Array.isArray(data.bookmarks)
        ? data.bookmarks.filter((v): v is string => typeof v === 'string')
        : [],
      scope: data.scope === 'year' || data.scope === 'period' ? data.scope : 'nearby',
    }
  } catch {
    return defaultPreferences
  }
}

export function writePreferences(preferences: Preferences) {
  try {
    localStorage.setItem('time-atlas:v1', JSON.stringify(preferences))
  } catch {
    /* Browsing also works when storage is unavailable. */
  }
}
