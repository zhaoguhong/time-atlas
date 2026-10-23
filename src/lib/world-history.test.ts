import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { events } from '../data/content'
import { worldAsiaAfricaEvents } from '../data/world-expansion-asia-africa'
import { worldAtlanticEvents } from '../data/world-expansion-atlantic'
import { worldPolities, worldPolityForMap } from '../data/world-polities'
import { eventRegion, pillarMatches } from './time-pillar'
import { activeMapFeatures } from './maps'
import { groupMapEvents } from './markers'
import { toOrdinal } from './history'
import { worldPeriodAt, worldPeriodEvents, worldPeriods, worldRegionBounds } from './world-history'
import type { PolityFeature } from '../types'

describe('shared world history', () => {
  it('covers the full navigation range without year zero or gaps', () => {
    expect(worldPeriods[0].from).toBe(-10000)
    expect(worldPeriods.at(-1)!.to).toBe(1912)
    worldPeriods.forEach((period, index) => {
      expect(period.focus).toBeGreaterThanOrEqual(period.from)
      expect(period.focus).toBeLessThanOrEqual(period.to)
      expect(period.focus).not.toBe(0)
      if (index) expect(toOrdinal(period.from)).toBe(toOrdinal(worldPeriods[index - 1].to) + 1)
    })
    expect(worldPeriodAt(-1).id).toBe(worldPeriodAt(1).id)
  })
  it('retains long processes crossing a world-era boundary', () => {
    const events = [
      { id: 'crossing', year: 1740, endYear: 1760 },
      { id: 'earlier', year: 1740 },
      { id: 'later', year: 1850 },
    ] as typeof worldAtlanticEvents
    expect(worldPeriodEvents(events, 1800).map((event) => event.id)).toEqual(['crossing'])
  })
  it('includes both Hawaii and Australasia in the Pacific reading frame', () => {
    const [westSouth, eastNorth] = worldRegionBounds.oceania
    for (const [lng, lat] of [
      [-159.5, 22.04],
      [151.2, -33.9],
      [174.8, -41.3],
    ]) {
      const wrappedLng = lng < westSouth[0] ? lng + 360 : lng
      expect(wrappedLng).toBeGreaterThanOrEqual(westSouth[0])
      expect(wrappedLng).toBeLessThanOrEqual(eastNorth[0])
      expect(lat).toBeGreaterThanOrEqual(westSouth[1])
      expect(lat).toBeLessThanOrEqual(eastNorth[1])
    }
  })
  it('keeps date-line clusters in the Pacific without changing event coordinates', () => {
    const records = [
      { id: 'west', year: 1800, coordinates: [179, -20] },
      { id: 'east', year: 1801, coordinates: [-179, -20] },
    ] as typeof worldAtlanticEvents
    const before = JSON.stringify(records)
    const groups = groupMapEvents(records, ([lng, lat]) => ({
      x: lng < 0 ? lng + 360 : lng,
      y: lat,
    }))
    expect(groups).toHaveLength(1)
    expect(groups[0].coordinates).toEqual([180, -20])
    expect(JSON.stringify(records)).toBe(before)
  })
  it('keeps selected additions readable in both shared mode filters', () => {
    const added = [...worldAsiaAfricaEvents, ...worldAtlanticEvents]
    expect(added).toHaveLength(78)
    expect(new Set(added.map((event) => event.id)).size).toBe(added.length)
    expect(added.filter((event) => event.region === 'central-asia').length).toBeGreaterThanOrEqual(
      8,
    )
    for (const event of added) {
      expect(events.find((record) => record.id === event.id)).toEqual(event)
      expect(pillarMatches(event, 'world', 'all')).toBe(true)
      expect(pillarMatches(event, 'china', 'all')).toBe(false)
      expect(eventRegion(event)).not.toBe('china')
      expect(event.year).toBeLessThanOrEqual(1912)
      expect(event.endYear ?? event.year).toBeLessThanOrEqual(1912)
      expect(event.locationNote).toBeTruthy()
      if (event.endYear) {
        expect(event.dateLabel).toBeTruthy()
        expect(event.dateNote).toBeTruthy()
      }
    }
    for (const id of ['world-turkic-khaganate', 'world-suez-canal', 'world-glorious-revolution'])
      expect(added.some((event) => event.id === id)).toBe(true)
  })
  it('only translates exact map identities within a qualified historical range', () => {
    for (const profile of worldPolities) {
      expect(profile.dateNote).toBeTruthy()
      expect(profile.sources.length).toBeGreaterThan(0)
      for (const alias of profile.mapNames) {
        expect(worldPolityForMap(alias, profile.from)?.id).toBe(profile.id)
        expect(worldPolityForMap(alias, profile.to)?.id).toBe(profile.id)
      }
    }
    expect(worldPolityForMap('An invented Roman border', 200)).toBeUndefined()
  })
  for (const [period, year, rawName] of [
    ['han', 200, 'Roman Empire'],
    ['qing', 1900, 'German Empire'],
  ] as const) {
    it(`preserves original global map geometry, dates and identity in ${year}`, () => {
      const source: PolityFeature[] = JSON.parse(
        readFileSync(
          new URL(`../../.cache/map-archives/${period}.geojson`, import.meta.url),
          'utf8',
        ),
      ).features
      const before = JSON.stringify(source)
      const active = activeMapFeatures(source, year)
      const displayed = active.find((feature) => feature.properties.name === rawName)!
      expect(displayed).toBeDefined()
      const original = source.find((feature) => feature.properties.id === displayed.properties.id)!
      expect(displayed.properties.nameZh).toBe(worldPolityForMap(rawName, year)?.name)
      expect(displayed.geometry).toEqual(original.geometry)
      for (const property of ['id', 'name', 'from', 'to', 'source', 'color'] as const)
        expect(displayed.properties[property]).toEqual(original.properties[property])
      expect(JSON.stringify(source)).toBe(before)
    })
  }
})
