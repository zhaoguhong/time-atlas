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
  TERRITORY_MAX_YEAR,
  toOrdinal,
} from './history'
import { parseViewParams } from './navigation'
import { pillarWindow } from './time-pillar'
import { pillarBrowseStops } from './pillar-browse'
import { worldPeriodAt } from './world-history'
import { mapTerritorySlice } from './maps'
import { eventById } from '../data/content'
import { modernMapPlaceLabel, modernMapNotes, modernMapPlacesById } from '../data/modern-map-places'

describe('modern reading and historical map boundaries', () => {
  it('restores dates and ranges within the limits of each view', () => {
    expect(MAX_YEAR).toBe(1950)
    expect(PILLAR_MAX_YEAR).toBe(2000)
    expect(parseHash('#visual=pillar&year=1943').year).toBe(1943)
    expect(parseHash('#year=1943').year).toBe(1943)
    expect(parseHash('#year=1969').year).toBe(1950)
    expect(parseHash('#visual=pillar&year=9999').year).toBe(2000)
    expect(parseHash('#visual=pillar&year=1943&compare=1969').compare).toBe(1950)
    expect(parseViewParams('#visual=pillar&range=1939,1945').exploration.range).toEqual([
      1939, 1945,
    ])
    expect(parseViewParams('#range=1939,1945').exploration.range).toEqual([1939, 1945])
    expect(parseViewParams('#range=1945,1969').exploration.range).toBeNull()
    expect(parseViewParams('#visual=pillar&range=1990,2001').exploration.range).toBeNull()
    expect(clampYear(1969)).toBe(1950)
    expect(clampPillarYear(1943)).toBe(1943)
  })

  it('uses a modern reading period rather than returning to prehistory or Qing', () => {
    expect(periodAt(1912).id).toBe('qing')
    expect(periodAt(1943)).toMatchObject({ from: 1913, to: 1950, id: 'early-modern-china' })
    expect(periodAt(1951)).toMatchObject({ from: 1951, to: 2000, name: '20世纪' })
    expect(worldPeriodAt(1950).id).toBe('world-wars')
    expect(worldPeriodAt(1968).id).toBe('modern-reading')
    expect(scopeDescription(1943, 'nearby', PILLAR_MAX_YEAR)).toBe('1938—1948 · 前后五年')
    expect(scopeDescription(2000, 'nearby', PILLAR_MAX_YEAR)).toBe('1995—2000 · 前后五年')
    expect(scopeDescription(1950, 'nearby')).toBe('1945—1950 · 前后五年')
  })

  it('preserves the Taiwan and Penghu return and founding dates without borrowing boundaries', () => {
    expect(mapTerritorySlice(TERRITORY_MAX_YEAR)).toBe('qing/13')
    for (const year of [1913, 1937, 1945, 1949, 1950]) expect(mapTerritorySlice(year)).toBeNull()
    expect(modernMapPlaceLabel('taipei', '台北', 1944)).toBe('台北')
    for (const year of [1945, 1949, 1950]) {
      expect(modernMapPlaceLabel('taipei', '台北', year)).toBe('台北（中国）')
      expect(modernMapPlaceLabel('penghu', '澎湖', year)).toBe('澎湖（中国）')
      expect(modernMapNotes(year)[0].text).toContain('1945年')
    }
    expect(eventById.get('exp-em-taiwan-retrocession')).toMatchObject({
      dateLabel: '1945年10月25日',
      placeIds: ['taipei', 'penghu'],
    })
    expect(eventById.get('modern-prc-founded')?.dateLabel).toBe('1949年10月1日')
  })

  it('labels Huangyan Dao by the name recorded for each observation year', () => {
    expect(modernMapPlacesById.get('huangyan')).toMatchObject({ from: 1935, to: 1950 })
    for (const year of [1935, 1946])
      expect(modernMapPlaceLabel('huangyan', '黄岩岛', year)).toBe('黄岩岛（时称斯卡巴洛礁）')
    for (const year of [1947, 1950])
      expect(modernMapPlaceLabel('huangyan', '黄岩岛', year)).toBe('黄岩岛（时称民主礁）')
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
