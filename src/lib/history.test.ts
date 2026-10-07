import { describe, expect, it } from 'vitest'
import { events, people } from '../data/content'
import { periods, tours } from '../data/periods'
import { profiles, periodCourses } from '../data/learning'
import {
  clampYear,
  eventsInPeriod,
  eventsInScope,
  eventRelation,
  formatYear,
  fromOrdinal,
  MAX_YEAR,
  MIN_YEAR,
  parseHash,
  periodAt,
  scopeDescription,
  toOrdinal,
} from './history'

describe('historical chronology', () => {
  it('steps directly between 1 BCE and 1 CE in either direction', () => {
    expect(fromOrdinal(toOrdinal(-1) + 1)).toBe(1)
    expect(fromOrdinal(toOrdinal(1) - 1)).toBe(-1)
    for (let year = MIN_YEAR; year <= MAX_YEAR; year++)
      if (year !== 0) expect(fromOrdinal(toOrdinal(year))).toBe(year)
  })
  it('formats BCE dates and clamps out-of-range years', () => {
    expect(formatYear(-138)).toBe('公元前 138 年')
    expect(clampYear(-99999)).toBe(MIN_YEAR)
    expect(clampYear(9999)).toBe(MAX_YEAR)
    expect(clampYear(0)).toBe(1)
  })
  it('covers the entire navigation range with exactly one period per year', () => {
    for (let year = MIN_YEAR; year <= MAX_YEAR; year++) {
      if (year === 0) continue
      expect(
        periods.filter((p) => p.from <= year && p.to >= year),
        `year ${year}`,
      ).toHaveLength(1)
    }
    expect(periodAt(230).id).toBe('three')
    expect(periodAt(-138).id).toBe('han')
  })
  it('keeps period-wide events distinct from events in the selected year', () => {
    expect(eventsInPeriod(events, 230).some((e) => e.id === 'wu-emperor' && e.year === 229)).toBe(
      true,
    )
    expect(eventsInPeriod(events, 230).some((e) => e.id === 'chibi')).toBe(false)
  })
  it('ignores malformed years in shared URLs', () => {
    expect(parseHash('#year=garbage').year).toBeUndefined()
    expect(parseHash('#year=230.5').year).toBeUndefined()
    expect(parseHash('#year=-138&event=zhangqian')).toMatchObject({
      year: -138,
      event: 'zhangqian',
    })
    expect(parseHash('#year=9999').year).toBe(MAX_YEAR)
  })
  it('distinguishes a five-year window from the current year and navigation period', () => {
    expect(eventsInScope(events, 230, 'year')).toEqual([])
    expect(eventsInScope(events, 230, 'nearby').map((event) => event.id)).toEqual(
      expect.arrayContaining(['wu-emperor', 'northern-expedition', 'wuzhang']),
    )
    expect(eventsInScope(events, 219, 'nearby').some((event) => event.id === 'wei-founded')).toBe(
      true,
    )
    expect(eventsInScope(events, 219, 'period').some((event) => event.id === 'wei-founded')).toBe(
      false,
    )
    const periodYears = eventsInScope(events, 230, 'period').map((event) => event.year)
    expect(periodYears).toEqual([...periodYears].sort((a, b) => a - b))
  })
  it('describes relative dates without a year zero and bounds the displayed range', () => {
    expect(eventRelation(-1, 1)).toBe('早 1 年')
    expect(eventRelation(1, -1)).toBe('晚 1 年')
    expect(eventRelation(230, 230)).toBe('当年')
    expect(scopeDescription(-1, 'nearby')).toBe('前6—5 · 前后五年')
    expect(scopeDescription(MIN_YEAR, 'nearby')).toBe('前10000—前9995 · 前后五年')
    expect(scopeDescription(MAX_YEAR, 'nearby')).toBe('1907—1912 · 前后五年')
  })
  it('validates and restores comparison and scope parameters', () => {
    expect(parseHash('#year=230&scope=period&compare=-138')).toMatchObject({
      year: 230,
      scope: 'period',
      compare: -138,
    })
    expect(parseHash('#scope=all&compare=abc').scope).toBeUndefined()
    expect(parseHash('#scope=all&compare=abc').compare).toBeUndefined()
  })
})

describe('historical content integrity', () => {
  it('provides a chronological reading path and valid related people for every period', () => {
    const eventIds = new Map(events.map((event) => [event.id, event]))
    const personIds = new Set(people.map((person) => person.id))
    expect(periodCourses).toHaveLength(periods.length)
    for (const period of periods) {
      const profile = profiles[period.id]
      expect(profile, period.id).toBeDefined()
      expect(period.focus).toBeGreaterThanOrEqual(period.from)
      expect(period.focus).toBeLessThanOrEqual(period.to)
      expect(profile.steps.length).toBeGreaterThan(1)
      const years: number[] = []
      for (const id of profile.steps) {
        expect(eventIds.has(id), `${period.id} -> ${id}`).toBe(true)
        years.push(eventIds.get(id)!.year)
      }
      expect(years, period.id).toEqual([...years].sort((a, b) => a - b))
      for (const id of profile.people) expect(personIds.has(id), `${period.id} -> ${id}`).toBe(true)
    }
  })
  it('gives every event its own background instead of repeating the period overview', () => {
    for (const event of events) {
      expect(event.background.length, event.id).toBeGreaterThan(15)
      expect(event.background, event.id).not.toBe(event.summary)
      expect(event.background, event.id).not.toBe(periodAt(event.year).summary)
    }
    expect(new Set(events.map((event) => event.background)).size).toBe(events.length)
  })
  it('has unique identifiers and no orphaned person or tour references', () => {
    expect(new Set(events.map((e) => e.id)).size).toBe(events.length)
    expect(new Set(people.map((p) => p.id)).size).toBe(people.length)
    const personIds = new Set(people.map((p) => p.id)),
      eventIds = new Set(events.map((e) => e.id))
    for (const event of events)
      for (const id of event.people) expect(personIds.has(id), `${event.id} -> ${id}`).toBe(true)
    for (const tour of tours)
      for (const id of tour.steps) expect(eventIds.has(id), `${tour.id} -> ${id}`).toBe(true)
  })
  it('provides dates, coordinates and reference links for every event', () => {
    for (const event of events) {
      expect(event.year).not.toBe(0)
      expect(event.year).toBeGreaterThanOrEqual(MIN_YEAR)
      expect(event.year).toBeLessThanOrEqual(MAX_YEAR)
      expect(event.coordinates[0]).toBeGreaterThanOrEqual(-180)
      expect(event.coordinates[0]).toBeLessThanOrEqual(180)
      expect(event.coordinates[1]).toBeGreaterThanOrEqual(-85)
      expect(event.coordinates[1]).toBeLessThanOrEqual(85)
      expect(event.sources.length).toBeGreaterThan(0)
      for (const source of event.sources) expect(new URL(source.url).protocol).toBe('https:')
    }
    for (const person of people) {
      if (person.birth !== null && person.death !== null)
        expect(person.birth).toBeLessThanOrEqual(person.death)
      expect(person.sources.length).toBeGreaterThan(0)
    }
  })
})
