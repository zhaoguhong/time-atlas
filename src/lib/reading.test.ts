import { describe, expect, it } from 'vitest'
import { events, people, eventById } from '../data/content'
import { dynasties } from '../data/dynasties'
import { tours, periods } from '../data/periods'
import { matchesEvent } from './history'

describe('historical reading and learning paths', () => {
  it('finds major events by their common names and ignores search spacing', () => {
    expect(matchesEvent(eventById.get('sino-japanese')!, '甲午中日战争')).toBe(true)
    expect(matchesEvent(eventById.get('opium-war')!, '第一次 鸦片战争')).toBe(true)
    expect(matchesEvent(eventById.get('hundred-days')!, '戊戌变法')).toBe(true)
    expect(matchesEvent(eventById.get('opium-war')!, '1840')).toBe(true)
    expect(matchesEvent(eventById.get('sino-japanese')!, '鸦片战争')).toBe(false)
  })
  it('offers a distinct narrative plus background and impact for every event', () => {
    for (const event of events) {
      expect(event.details?.length, event.id).toBeGreaterThan(0)
      const text = [event.summary, ...(event.details ?? []), event.background, event.impact].join(
        '',
      )
      expect(text.length, event.id).toBeGreaterThan(125)
      expect((text.match(/[。；！？]/g) ?? []).length, event.id).toBeGreaterThanOrEqual(4)
      expect(event.details?.includes(event.summary), event.id).toBe(false)
    }
    for (const id of ['opium-war', 'second-opium', 'sino-japanese', 'self-strengthening']) {
      expect(eventById.get(id)!.details!.length, id).toBeGreaterThanOrEqual(2)
      expect(
        eventById.get(id)!.sources.some((source) => source.url.includes('wikisource.org')),
        id,
      ).toBe(true)
    }
  })
  it('gives every dynasty political and social reading with useful depth', () => {
    for (const dynasty of dynasties) {
      expect(dynasty.sections?.length, dynasty.id).toBeGreaterThanOrEqual(2)
      expect(
        dynasty.sections!.every((section) => section.title && section.text.length > 45),
        dynasty.id,
      ).toBe(true)
    }
  })
  it('covers each navigation period and includes separate Qing wars and reform stages', () => {
    for (const period of periods) {
      expect(
        events.filter((event) => event.year >= period.from && event.year <= period.to).length,
        period.id,
      ).toBeGreaterThanOrEqual(period.from < -475 ? 2 : 9)
    }
    for (const id of [
      'opium-war',
      'second-opium',
      'sino-japanese',
      'self-strengthening',
      'humen-treaty',
      'tianjin-treaties',
      'yellow-sea-1894',
      'weihai-1895',
      'late-qing-new-policies',
    ])
      expect(eventById.has(id), id).toBe(true)
  })
  it('provides source-backed introductions and map questions across chronological topic chapters', () => {
    expect(tours.length).toBeGreaterThanOrEqual(10)
    for (const topic of tours) {
      expect(topic.introduction!.length, topic.id).toBeGreaterThanOrEqual(3)
      expect(topic.introduction!.join('').length, topic.id).toBeGreaterThan(140)
      expect(topic.sources!.length, topic.id).toBeGreaterThan(0)
      expect(
        topic.chapters!.map((chapter) => chapter.eventId),
        topic.id,
      ).toEqual(topic.steps)
      const years = topic.steps.map((id) => eventById.get(id)!.year)
      expect(years, topic.id).toEqual([...years].sort((a, b) => a - b))
      expect(
        topic.chapters!.every(
          (chapter) => chapter.explanation.length > 20 && chapter.mapReading.length > 20,
        ),
        topic.id,
      ).toBe(true)
      expect(topic.question && topic.conclusion, topic.id).toBeTruthy()
    }
  })
  it('provides fuller biographies and links new military, diplomatic and education figures', () => {
    for (const name of [
      '苏轼',
      '康熙帝',
      '赵匡胤',
      '秦始皇',
      '慈禧',
      '林则徐',
      '于谦',
      '关天培',
      '曾纪泽',
      '容闳',
      '徐光启',
      '利玛窦',
    ]) {
      const person = people.find((person) => person.name === name)!
      expect(person.biography.length, name).toBeGreaterThan(160)
      expect(person.biography.split('\n\n').length, name).toBeGreaterThanOrEqual(2)
      expect(
        events.some((event) => event.people.includes(person.id)),
        name,
      ).toBe(true)
    }
    expect(people.find((person) => person.name === '奕䜣')!.aliases).toContain('恭亲王')
  })
})
