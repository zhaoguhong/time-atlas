import { describe, expect, it } from 'vitest'
import { events } from '../data/content'
import { events as catalog } from '../data/catalog'
import { eventTopics } from '../data/event-topics'
import { eventCategories, matchesEventCategory, parseEventCategory } from './event-categories'
import { parseViewParams } from './navigation'
import { filterExploration } from './exploration'
import { eventRegion, pillarMatches } from './time-pillar'
import { pillarBrowseStops } from './pillar-browse'

const event = (id: string) => events.find((item) => item.id === id)!
describe('curated event category filters', () => {
  it('keeps topic IDs unique, valid and reachable in the reading catalog', () => {
    for (const ids of Object.values(eventTopics)) {
      expect(new Set(ids).size).toBe(ids.length)
      for (const id of ids) expect(event(id), id).toBeDefined()
    }
    for (const category of eventCategories) {
      const ids = events
        .filter((item) => matchesEventCategory(item, category))
        .map((item) => item.id)
      expect(ids.length, category).toBeGreaterThan(0)
      expect(
        catalog.filter((item) => matchesEventCategory(item, category)).map((item) => item.id),
      ).toEqual(ids)
    }
  })
  it('finds philosophy across original categories without treating passing words as topics', () => {
    for (const id of [
      'kongzi-teaching',
      'goose-lake-meeting',
      'qingyuan-faction-ban',
      'world-enlightenment',
      'world-manifesto',
    ]) {
      expect(matchesEventCategory(event(id), '哲学'), id).toBe(true)
    }
    // Natural philosophy in a book title and a philosopher leading troops are
    // not enough to classify these records as philosophical discussion.
    expect(matchesEventCategory(event('world-newton'), '哲学')).toBe(false)
    expect(matchesEventCategory(event('wangyangming-ning'), '哲学')).toBe(false)
    expect(matchesEventCategory(event('world-buddhism'), '哲学')).toBe(true)
    expect(matchesEventCategory(event('world-buddhism'), '宗教')).toBe(true)
    expect(matchesEventCategory(event('white-deer-academy'), '教育学术')).toBe(true)
  })
  it('includes wars originally filed under politics, culture and exchange', () => {
    for (const id of ['world-marathon', 'world-ashoka', 'imjin', 'chibi']) {
      expect(matchesEventCategory(event(id), '战争'), id).toBe(true)
    }
    expect(matchesEventCategory(event('sushi-red-cliff'), '战争')).toBe(false)
    expect(matchesEventCategory(event('world-marathon'), '政治')).toBe(true)
    for (const item of events) {
      expect(matchesEventCategory(item, item.category)).toBe(true)
      expect(matchesEventCategory(item, '全部')).toBe(true)
    }
  })
  it('covers each selectable category in China and the rest of the world', () => {
    for (const category of eventCategories.filter((item) => item !== '全部')) {
      const matching = events.filter((item) => matchesEventCategory(item, category))
      expect(
        matching.some((item) => eventRegion(item) === 'china'),
        category,
      ).toBe(true)
      expect(
        matching.some((item) => eventRegion(item) !== 'china'),
        category,
      ).toBe(true)
    }
    const philosophy = events.filter((item) => matchesEventCategory(item, '哲学'))
    expect(philosophy.length).toBeGreaterThanOrEqual(60)
    for (const name of ['康德', '柏拉图', '亚里士多德', '墨子', '庄子', '商羯罗', '西田']) {
      expect(
        philosophy.some((item) => item.title.includes(name)),
        name,
      ).toBe(true)
    }
    // Reading articles and wide-span browsing must both include the two sides.
    const stops = pillarBrowseStops(philosophy, 3000, null)
    expect(stops.some((stop) => stop.event.id === 'east-laozi-text')).toBe(true)
    expect(stops.some((stop) => stop.event.id === 'phil-kant-pure-reason')).toBe(true)
  })
  it('restores both new and legacy category links and rejects unknown values', () => {
    for (const category of eventCategories) {
      expect(parseViewParams(`#category=${encodeURIComponent(category)}`).category).toBe(category)
    }
    expect(parseEventCategory(null)).toBe('全部')
    expect(parseViewParams('#category=不存在').category).toBe('全部')
  })
  it('combines topic, geography and dates for the same automatic browsing input', () => {
    const range: [number, number] = [1100, 1250]
    const filtered = filterExploration(events, { place: '', bounds: null, range }).filter(
      (item) => matchesEventCategory(item, '哲学') && pillarMatches(item, 'china', 'all'),
    )
    expect(filtered.map((item) => item.id)).toEqual([
      'goose-lake-meeting',
      'white-deer-academy',
      'east-lu-jiuyuan-mind',
      'east-zhuxi-four-books',
      'qingyuan-faction-ban',
    ])
    expect(pillarBrowseStops(filtered, 100, range).map((stop) => stop.event.id)).toEqual([
      'goose-lake-meeting',
      'east-zhuxi-four-books',
      'qingyuan-faction-ban',
    ])
  })
})
