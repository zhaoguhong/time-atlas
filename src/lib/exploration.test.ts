import { describe, expect, it } from 'vitest'
import { events } from '../data/content'
import { filterExploration, insideBounds, namesPlace, placeById } from './exploration'
import { parseViewParams } from './navigation'
import { eventPlaybackYears } from './playback'
import { groupTimelineEvents } from './markers'

describe('exploration contracts', () => {
  it('handles wrapped map bounds and global bounds', () => {
    expect(insideBounds([179, 10], [170, -20, -170, 20])).toBe(true)
    expect(insideBounds([-179, 10], [170, -20, -170, 20])).toBe(true)
    expect(insideBounds([0, 10], [170, -20, -170, 20])).toBe(false)
    expect(insideBounds([100, 30], [-200, -60, 200, 60])).toBe(true)
  })
  it('matches city labels without confusing Tokyo in Japan with Kaifeng', () => {
    const place = placeById.get('kaifeng')!
    expect(namesPlace('东京（今河南开封）', place)).toBe(true)
    expect(namesPlace('日本东京', place)).toBe(false)
    expect(namesPlace('京都', place)).toBe(false)
  })
  it('keeps ranged archaeological records overlapping the chosen interval', () => {
    const record = events.find((event) => event.endYear && event.endYear > event.year)!
    const middle = Math.floor((record.year + record.endYear!) / 2)
    expect(
      filterExploration([record], { place: '', range: [middle, middle], bounds: null }),
    ).toEqual([record])
    expect(
      filterExploration([record], {
        place: '',
        range: [record.endYear! + 1, record.endYear! + 2],
        bounds: null,
      }),
    ).toEqual([])
  })
  it('rejects year zero, reversed ranges and invalid boxes in shared links', () => {
    expect(parseViewParams('#range=-1,0&bounds=0,100,20,110').exploration).toEqual({
      place: '',
      range: null,
      bounds: null,
    })
    expect(parseViewParams('#range=200,100').exploration.range).toBeNull()
    expect(parseViewParams('#range=-1,1&cities=0&events=1').exploration.range).toEqual([-1, 1])
  })
  it('sorts filtered event years, preserving the transition with no year zero', () => {
    expect(eventPlaybackYears([{ year: 1 }, { year: -1 }, { year: 1 }, { year: 5 }])).toEqual([
      -1, 1, 5,
    ])
    expect(eventPlaybackYears([])).toEqual([])
  })
  it('reads a ranged record within the chosen observation interval', () => {
    expect(eventPlaybackYears([{ year: -3300, endYear: -2300 }], [-2500, -2400])).toEqual([-2500])
    expect(eventPlaybackYears([{ year: -3300, endYear: -2300 }], [-2200, -2100])).toEqual([])
  })
  it('keeps a single-year timeline finite and groups coincident records', () => {
    const event = events.find((item) => item.year === 755)!
    const groups = groupTimelineEvents([event, { ...event, id: 'other' }], 755, 755, 300)
    expect(groups).toHaveLength(1)
    expect(groups[0].position).toBe(0)
    expect(groups[0].events).toHaveLength(2)
  })
})
