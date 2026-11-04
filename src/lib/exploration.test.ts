import { describe, expect, it } from 'vitest'
import { events } from '../data/content'
import { eventAtPlace, filterExploration, insideBounds, namesPlace, placeById } from './exploration'
import { parseViewParams } from './navigation'
import { eventPlaybackYears } from './playback'
import { groupTimelineEvents } from './markers'

describe('exploration contracts', () => {
  it('connects Timbuktu records under both Chinese spellings without changing record titles', () => {
    const place = placeById.get('timbuktu')!
    const event = events.find((record) => record.id === 'world-timbuktu-learning')!
    expect(event.location).toBe('通布图')
    expect(place.name).toBe('廷巴克图')
    expect(eventAtPlace(event, place)).toBe(true)
    expect(filterExploration([event], { place: place.id, range: null, bounds: null })).toEqual([
      event,
    ])
  })
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
  it('distinguishes world cities from similarly named regions and other cities', () => {
    const rome = placeById.get('rome')!
    const delhi = placeById.get('delhi')!
    const constantinople = placeById.get('constantinople')!
    expect(namesPlace('罗马', rome)).toBe(true)
    expect(namesPlace('东罗马帝国', rome)).toBe(false)
    expect(namesPlace('罗马尼亚', rome)).toBe(false)
    expect(namesPlace('马德里', delhi)).toBe(false)
    expect(namesPlace('德里', delhi)).toBe(true)
    expect(namesPlace('君士坦丁堡', constantinople)).toBe(true)
    expect(namesPlace('伊斯坦布尔', constantinople)).toBe(true)
  })
  it('uses explicit place associations consistently for reading and filtering', () => {
    const place = placeById.get('rome')!
    const original = events.find((event) => event.id === 'world-roman-republic')!
    const associated = { ...original, location: '意大利半岛的政治中心', placeIds: ['rome'] }
    const excluded = { ...original, placeIds: [] }
    expect(eventAtPlace(associated, place)).toBe(true)
    expect(eventAtPlace(excluded, place)).toBe(false)
    expect(eventAtPlace({ ...original, placeIds: undefined }, place)).toBe(true)
    expect(
      filterExploration([associated, excluded], { place: 'rome', range: null, bounds: null }),
    ).toEqual([associated])
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
