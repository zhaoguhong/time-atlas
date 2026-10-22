import { describe, expect, it } from 'vitest'
import { events } from '../data/content'
import { worldEvents } from '../data/world-events'
import { toOrdinal } from './history'
import { parseViewParams } from './navigation'
import {
  clampSpan,
  eventRegion,
  historyRegions,
  layoutPillar,
  MAX_SPAN,
  pillarMatches,
  pillarTicks,
  pillarWindow,
  relatedReading,
} from './time-pillar'

describe('time pillar chronology and disclosure', () => {
  it('rejects malformed shared filters including inherited object properties', () => {
    for (const region of ['china', '__proto__', 'toString', 'unknown'])
      expect(parseViewParams(`#visual=pillar&region=${region}&span=NaN`).pillarRegion).toBe('all')
    expect(parseViewParams('#visual=pillar&side=world&region=africa&span=80')).toMatchObject({
      visualization: 'pillar',
      pillarSide: 'world',
      pillarRegion: 'africa',
      pillarSpan: 80,
    })
  })
  it('bounds windows and produces readable ticks on either side of the common era', () => {
    for (const year of [-10000, -1, 1, 1500, 1912])
      for (const span of [4, 80, 600, MAX_SPAN]) {
        const w = pillarWindow(year, span)
        expect(w.bottom).toBeGreaterThanOrEqual(toOrdinal(-10000))
        expect(w.top).toBeLessThanOrEqual(toOrdinal(1912))
        const ticks = pillarTicks(w.bottom, w.top, 600)
        expect(ticks).not.toContain(0)
        expect(ticks.every((t) => toOrdinal(t) >= w.bottom && toOrdinal(t) <= w.top)).toBe(true)
      }
    expect(pillarTicks(toOrdinal(1000), toOrdinal(1912), 600)).toContain(1800)
    expect(clampSpan(Infinity)).toBe(600)
    expect(clampSpan(0)).toBe(4)
  })
  it('packs cards without overlaps while retaining every in-range event in a cluster', () => {
    for (const height of [48, 130, 350, 580])
      for (const year of [-2500, -1, 800, 1500, 1900])
        for (const span of [8, 100, 900, MAX_SPAN]) {
          const cardHeight = Math.min(112, height)
          const cards = layoutPillar(events, year, span, height, cardHeight, 'compare')
          const w = pillarWindow(year, span)
          const expected = events.filter(
            (e) => toOrdinal(e.year) <= w.top && toOrdinal(e.endYear ?? e.year) >= w.bottom,
          )
          const ids = cards.flatMap((c) => [c.event.id, ...c.hidden.map((e) => e.id)])
          expect(new Set(ids).size).toBe(ids.length)
          expect(new Set(ids)).toEqual(new Set(expected.map((e) => e.id)))
          for (const lane of ['world', 'china']) {
            const laneCards = cards.filter((c) => c.side === lane).sort((a, b) => a.y - b.y)
            for (let i = 0; i < laneCards.length; i++) {
              expect(laneCards[i].y - cardHeight / 2).toBeGreaterThanOrEqual(-0.001)
              expect(laneCards[i].y + cardHeight / 2).toBeLessThanOrEqual(height + 0.001)
              if (i)
                expect(laneCards[i].y - laneCards[i - 1].y).toBeGreaterThanOrEqual(
                  cardHeight + 9.99,
                )
            }
          }
        }
  })
  it('promotes the selected event and reveals previously clustered events on zoom', () => {
    const broad = layoutPillar(events, 1500, 1000, 550, 100, 'compare')
    const hidden = broad.flatMap((c) => c.hidden).find((e) => e.id === 'world-printing')!
    expect(hidden).toBeDefined()
    expect(
      layoutPillar(events, hidden.year, 15, 550, 100, 'compare', hidden.id).some(
        (c) => c.event.id === hidden.id,
      ),
    ).toBe(true)
  })
  it('classifies old world records and filters the actual event subject rather than coordinates', () => {
    expect(eventRegion(events.find((e) => e.id === 'kuk-early-farming')!)).toBe('oceania')
    const china = events.find((e) => e.id === 'zhangqian')!
    const europe = events.find((e) => e.id === 'world-printing')!
    expect(pillarMatches(china, 'compare', 'africa')).toBe(true)
    expect(pillarMatches(china, 'world', 'all')).toBe(false)
    expect(pillarMatches(europe, 'world', 'europe')).toBe(true)
    expect(pillarMatches(europe, 'world', 'africa')).toBe(false)
  })
  it('provides sourced reading, honest date ranges and resolvable relationships for world events', () => {
    expect(worldEvents.length).toBeGreaterThanOrEqual(100)
    for (const e of worldEvents) {
      expect(e.year).not.toBe(0)
      expect(e.endYear ?? e.year).toBeLessThanOrEqual(1912)
      expect(e.region && historyRegions[e.region]).toBeTruthy()
      expect(
        e.summary.length + e.background.length + e.details!.join('').length + e.impact.length,
      ).toBeGreaterThan(150)
      expect(e.sources.every((s) => s.url.startsWith('https://'))).toBe(true)
      if (e.endYear) expect(e.dateNote && e.dateLabel).toBeTruthy()
      for (const r of e.relatedEvents ?? []) expect(events.some((t) => t.id === r.id)).toBe(true)
      const relations = relatedReading(e, events)
      expect(new Set(relations.map((r) => r.event.id)).size).toBe(relations.length)
      expect(relations.some((r) => r.event.id === e.id)).toBe(false)
    }
    expect(worldEvents.find((e) => e.id === 'world-magna-carta')!.title).toContain('约翰王')
    expect(worldEvents.find((e) => e.id === 'world-meroe')!.dateLabel).toContain('公元 350')
    for (const region of Object.keys(historyRegions).filter((r) => r !== 'china'))
      expect(worldEvents.some((e) => e.region === region)).toBe(true)
  })
})
