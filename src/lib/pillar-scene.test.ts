import { describe, expect, it } from 'vitest'
import { events } from '../data/content'
import type { HistoryEvent } from '../types'
import { createPillarScene, samplePillarScene } from './pillar-scene'
import { layoutPillar, pillarWindow } from './time-pillar'

const fixture: HistoryEvent[] = Array.from({ length: 391 }, (_, index) => ({
  ...events[0],
  id: `pan-${index}`,
  year: -6000 + index * 20,
  endYear: undefined,
  importance: 1 + (index % 3),
  region: index % 2 ? 'china' : 'europe',
}))

describe('stable pillar pan scene', () => {
  it('preserves the canonical first tile, including ranking near clamped history limits', () => {
    for (const year of [-10000, -1, 1500, 1900, 1912])
      for (const side of ['compare', 'world', 'china'] as const) {
        const window = { ...pillarWindow(year, 900), year }
        const scene = createPillarScene(events, window, 550, 44, side)
        expect(scene.tiles.get(0)).toEqual(
          layoutPillar(events, year, 900, 550, 44, side, undefined, 4),
        )
      }
  })

  it('moves retained rows and their date anchors by one common sub-year offset', () => {
    const window = { ...pillarWindow(-2000, 600), year: -2000 }
    const scene = createPillarScene(fixture, window, 600, 44, 'compare')
    const before = samplePillarScene(scene, window)
    const next = samplePillarScene(scene, {
      ...window,
      top: window.top + 0.125,
      bottom: window.bottom + 0.125,
    })
    expect(next.offset - before.offset).toBeCloseTo(0.125)
    expect(next.cards).toEqual(before.cards)
    for (const card of before.cards) {
      const retained = next.cards.find((candidate) => candidate.event.id === card.event.id)!
      expect(retained.y + next.offset - (card.y + before.offset)).toBeCloseTo(0.125)
      expect(retained.anchorY + next.offset - (card.anchorY + before.offset)).toBeCloseTo(0.125)
    }
    // Finishing a gesture samples the same scene, without canonical repacking.
    expect(
      samplePillarScene(scene, {
        ...window,
        top: window.top + 0.125,
        bottom: window.bottom + 0.125,
      }),
    ).toEqual(next)
  })

  it('retains every still-visible row when extending through a tile boundary', () => {
    const window = { ...pillarWindow(-2000, 600), year: -2000 }
    const scene = createPillarScene(fixture, window, 600, 44, 'compare')
    let previous = samplePillarScene(scene, window)
    for (const travel of [0.2, 0.9, 1.01, 1.4, 2.1, 1.9, 1.01, 0.9, -0.2, -1.1]) {
      const next = samplePillarScene(scene, {
        ...window,
        top: window.top + travel * window.span,
        bottom: window.bottom + travel * window.span,
      })
      for (const card of previous.cards) {
        const beforeY = card.y + previous.offset
        const afterY = card.y + next.offset
        if (beforeY > -22 && beforeY < 622 && afterY > -22 && afterY < 622) {
          expect(next.cards.find((candidate) => candidate.event.id === card.event.id)).toBe(card)
        }
      }
      previous = next
    }
  })

  it('bounds a long bidirectional pan cache and never duplicates or overlaps ranged events', () => {
    const ranged: HistoryEvent = {
      ...fixture[0],
      id: 'long-process',
      year: -9000,
      endYear: 1800,
      importance: 5,
    }
    const window = { ...pillarWindow(-2000, 100), year: -2000 }
    const scene = createPillarScene([...fixture, ranged], window, 500, 44, 'compare')
    const travel = [
      ...Array.from({ length: 61 }, (_, index) => index / 2),
      ...Array.from({ length: 121 }, (_, index) => 30 - index / 2),
      ...Array.from({ length: 61 }, (_, index) => -30 + index / 2),
    ]
    for (const distance of travel) {
      const sample = samplePillarScene(scene, {
        ...window,
        top: window.top + distance * window.span,
        bottom: window.bottom + distance * window.span,
      })
      expect(scene.tiles.size).toBeLessThanOrEqual(5)
      const ids = sample.cards.map((card) => card.event.id)
      expect(new Set(ids).size).toBe(ids.length)
      expect(
        sample.cards.some((card) => card.y + sample.offset >= 0 && card.y + sample.offset <= 500),
      ).toBe(true)
      for (const side of ['china', 'world']) {
        const lane = sample.cards.filter((card) => card.side === side).sort((a, b) => a.y - b.y)
        for (let index = 1; index < lane.length; index++)
          expect(lane[index].y - lane[index - 1].y).toBeGreaterThanOrEqual(48 - 1e-8)
      }
    }
  })

  it('uses actual window movement at BCE/CE and history boundaries, and rejects a changed scale', () => {
    const window = { ...pillarWindow(-1, 80), year: -1 }
    const scene = createPillarScene(events, window, 400, 44, 'compare')
    expect(samplePillarScene(scene, pillarWindow(1, 80)).offset).toBe(5)
    const endWindow = { ...pillarWindow(1912, 900), year: 1912 }
    const endScene = createPillarScene(events, endWindow, 400, 44, 'compare')
    expect(samplePillarScene(endScene, pillarWindow(1900, 900)).offset).toBe(0)
    expect(() => samplePillarScene(scene, pillarWindow(-1, 40))).toThrow(RangeError)
  })
})
