import { describe, expect, it } from 'vitest'
import type { HistoryEvent } from '../types'
import {
  clampPillarYear,
  clampYear,
  MAX_YEAR,
  PILLAR_MAX_YEAR,
  parseHash,
  periodAt,
  scopeDescription,
  toOrdinal,
} from './history'
import { parseViewParams } from './navigation'
import { pillarWindow } from './time-pillar'
import { pillarBrowseStops } from './pillar-browse'
import { worldPeriodAt } from './world-history'

describe('modern reading and historical map boundaries', () => {
  it('restores modern pillar dates and ranges without expanding the historical map limit', () => {
    expect(MAX_YEAR).toBe(1912)
    expect(PILLAR_MAX_YEAR).toBe(2000)
    expect(parseHash('#visual=pillar&year=1943').year).toBe(1943)
    expect(parseHash('#year=1943').year).toBe(1912)
    expect(parseHash('#visual=pillar&year=9999').year).toBe(2000)
    expect(parseHash('#visual=pillar&year=1943&compare=1940').compare).toBe(1912)
    expect(parseViewParams('#visual=pillar&range=1939,1945').exploration.range).toEqual([
      1939, 1945,
    ])
    expect(parseViewParams('#range=1939,1945').exploration.range).toBeNull()
    expect(parseViewParams('#visual=pillar&range=1990,2001').exploration.range).toBeNull()
    expect(clampYear(1943)).toBe(1912)
    expect(clampPillarYear(1943)).toBe(1943)
  })

  it('uses a modern reading period rather than returning to prehistory or Qing', () => {
    expect(periodAt(1912).id).toBe('qing')
    expect(periodAt(1943)).toMatchObject({ from: 1913, to: 2000, name: '20世纪' })
    expect(worldPeriodAt(1968).id).toBe('modern-reading')
    expect(scopeDescription(1943, 'nearby', PILLAR_MAX_YEAR)).toBe('1938—1948 · 前后五年')
    expect(scopeDescription(2000, 'nearby', PILLAR_MAX_YEAR)).toBe('1995—2000 · 前后五年')
    expect(scopeDescription(1912, 'nearby')).toBe('1907—1912 · 前后五年')
  })

  it('keeps modern events in pillar windows and automatic browsing while rejecting future entries', () => {
    const window = pillarWindow(1943, 80)
    expect(window.bottom).toBeLessThan(toOrdinal(1943))
    expect(window.top).toBeGreaterThan(toOrdinal(1943))
    expect(pillarWindow(2000, 80).top).toBe(toOrdinal(2000))
    const records = [1943, 1968, 2000, 2001].map(
      (year) =>
        ({
          id: `modern-${year}`,
          year,
          importance: 5,
        }) as HistoryEvent,
    )
    expect(pillarBrowseStops(records, 900, null).map((stop) => stop.year)).toEqual([
      1943, 1968, 2000,
    ])
    expect(pillarBrowseStops(records, 900, [1940, 1950]).map((stop) => stop.year)).toEqual([1943])
  })
})
