import { describe, expect, it } from 'vitest'
import type { HistoryEvent } from '../types'
import { pillarBrowseStops } from './pillar-browse'

const event = (id: string, year: number, importance: number, endYear?: number) =>
  ({ id, year, importance, endYear }) as HistoryEvent

describe('pillar automatic browsing', () => {
  const events = [event('major', 1500, 5), event('medium', 1510, 4), event('local', 1520, 2)]
  it('admits more stops as the visible span narrows', () => {
    expect(pillarBrowseStops(events, 900, null).map((s) => s.event.id)).toEqual(['major'])
    expect(pillarBrowseStops(events, 300, null).map((s) => s.event.id)).toEqual(['major', 'medium'])
    expect(pillarBrowseStops(events, 100, null).map((s) => s.event.id)).toEqual([
      'major',
      'medium',
      'local',
    ])
  })
  it('groups concurrent records deterministically at their highest importance', () => {
    const concurrent = [event('b', 1600, 5), event('a', 1600, 5), event('c', 1600, 3)]
    expect(pillarBrowseStops(concurrent, 50, null).map((s) => s.event.id)).toEqual(['a'])
    expect(pillarBrowseStops([...concurrent].reverse(), 50, null)).toEqual(
      pillarBrowseStops(concurrent, 50, null),
    )
  })
  it('clamps observation of ongoing records to the selected range without changing source dates', () => {
    const ongoing = event('ongoing', -10, 5, 10)
    const stops = pillarBrowseStops(
      [ongoing, event('past', -5, 5), event('future', 11, 5)],
      30,
      [1, 10],
    )
    expect(stops).toEqual([{ year: 1, event: ongoing }])
    expect(ongoing.year).toBe(-10)
  })
  it('sorts across BCE/CE, retains year one and respects the 1912 limit', () => {
    const records = [
      event('late', 1913, 5),
      event('ce', 1, 5),
      event('bce', -1, 5),
      event('end', 1912, 5),
    ]
    expect(pillarBrowseStops(records, 900, null).map((s) => s.year)).toEqual([-1, 1, 1912])
    expect(pillarBrowseStops(records, 900, [2, 1900])).toEqual([])
  })
})
