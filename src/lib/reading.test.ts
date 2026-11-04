import { describe, expect, it } from 'vitest'
import { events, people, eventById } from '../data/content'
import { dynasties } from '../data/dynasties'
import { tours, periods } from '../data/periods'
import { matchesEvent } from './history'
import { eventNarratives } from '../data/event-narratives'

describe('historical reading and learning paths', () => {
  it('keeps individual articles and their sources after combining regional and modern collections', () => {
    for (const [id, article] of Object.entries(eventNarratives)) {
      const event = eventById.get(id)
      expect(event, id).toBeDefined()
      expect(event!.narrative, id).toEqual(article.narrative)
      expect(event!.details, id).toBeUndefined()
      for (const source of article.sources)
        expect(
          event!.sources.some((entry) => entry.url === source.url),
          id,
        ).toBe(true)
    }
  })
  it('finds major events by their common names and ignores search spacing', () => {
    expect(matchesEvent(eventById.get('sino-japanese')!, '甲午中日战争')).toBe(true)
    expect(matchesEvent(eventById.get('opium-war')!, '第一次 鸦片战争')).toBe(true)
    expect(matchesEvent(eventById.get('hundred-days')!, '戊戌变法')).toBe(true)
    expect(matchesEvent(eventById.get('opium-war')!, '1840')).toBe(true)
    expect(matchesEvent(eventById.get('sino-japanese')!, '鸦片战争')).toBe(false)
  })
  it('keeps event-specific prose separate from summaries without a uniform length requirement', () => {
    for (const event of events) {
      const paragraphs = event.narrative
        ? event.narrative.sections.flatMap((section) => section.paragraphs)
        : (event.details ?? [])
      expect(paragraphs.length, event.id).toBeGreaterThan(0)
      // docs/event-writing.md assigns length and structure to the individual subject.
      expect(
        paragraphs.every((text) => text.trim().length > 0),
        event.id,
      ).toBe(true)
      expect(new Set(paragraphs).size, event.id).toBe(paragraphs.length)
      expect(paragraphs.includes(event.summary), event.id).toBe(false)
    }
    for (const id of ['opium-war', 'second-opium', 'sino-japanese', 'self-strengthening']) {
      const event = eventById.get(id)!
      const paragraphs = event.narrative
        ? event.narrative.sections.flatMap((section) => section.paragraphs)
        : (event.details ?? [])
      expect(paragraphs.length, id).toBeGreaterThanOrEqual(2)
      expect(
        eventById.get(id)!.sources.some((source) => source.url.includes('wikisource.org')),
        id,
      ).toBe(true)
    }
  })
  it('keeps dynasty introductions readable with optional section headings', () => {
    for (const dynasty of dynasties) {
      const paragraphs = [
        dynasty.context,
        ...(dynasty.sections ?? []).map((section) => section.text),
      ]
      expect(paragraphs.length, dynasty.id).toBeGreaterThanOrEqual(2)
      expect(
        paragraphs.every((text) => text.trim().length > 0),
        dynasty.id,
      ).toBe(true)
      const titles = (dynasty.sections ?? []).flatMap((section) =>
        section.title ? [section.title] : [],
      )
      expect(new Set(titles).size, dynasty.id).toBe(titles.length)
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
      expect(topic.introduction!.length, topic.id).toBeGreaterThan(0)
      expect(
        topic.introduction!.every((text) => text.trim()),
        topic.id,
      ).toBe(true)
      expect(topic.sources!.length, topic.id).toBeGreaterThan(0)
      expect(
        topic.chapters!.map((chapter) => chapter.eventId),
        topic.id,
      ).toEqual(topic.steps)
      const years = topic.steps.map((id) => eventById.get(id)!.year)
      expect(years, topic.id).toEqual([...years].sort((a, b) => a - b))
      expect(
        topic.chapters!.every(
          (chapter) =>
            chapter.explanation.trim() &&
            chapter.mapReading.trim() &&
            chapter.explanation.trim() !== chapter.mapReading.trim(),
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
      expect(person.recordKind, name).toBe('curated')
      expect(person.biography.trim(), name).not.toBe(person.summary.trim())
      expect(
        events.some((event) => event.people.includes(person.id)),
        name,
      ).toBe(true)
    }
    expect(people.find((person) => person.name === '奕䜣')!.aliases).toContain('恭亲王')
  })
})
