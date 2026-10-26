import { describe, expect, it } from 'vitest'
import { events, people, eventById } from '../data/content'
import { eventCategories, matchesEventCategory } from './event-categories'
import { eventRegion } from './time-pillar'
import { MAX_YEAR, PILLAR_MAX_YEAR } from './history'
import { journeys } from '../data/journeys'

describe('detailed historical and twentieth-century reading', () => {
  it('provides Sartre as a readable author with several separately dated works', () => {
    const sartre = people.find((person) => person.aliases?.includes('Sartre'))!
    expect(sartre).toMatchObject({ birth: 1905, death: 1980, recordKind: 'curated' })
    const works = events.filter((event) => event.people.includes(sartre.id))
    expect(works.length).toBeGreaterThanOrEqual(4)
    expect(eventById.get('modern-sartre-being-nothingness')).toMatchObject({
      year: 1943,
      themes: expect.arrayContaining(['哲学']),
    })
    expect(works.some((event) => event.year === 1946 && event.title.includes('人道主义'))).toBe(
      true,
    )
    // A book's place of publication must never become a fabricated journey.
    expect(journeys.some((journey) => journey.personId === sartre.id)).toBe(false)
  })

  it('contains ancient, modern and twentieth-century material in every category', () => {
    for (const category of eventCategories.filter((item) => item !== '全部')) {
      const matching = events.filter((event) => matchesEventCategory(event, category))
      expect(
        matching.some((event) => event.year <= MAX_YEAR),
        category,
      ).toBe(true)
      expect(
        matching.some((event) => event.year > MAX_YEAR),
        category,
      ).toBe(true)
      expect(
        matching.some((event) => eventRegion(event) === 'china'),
        category,
      ).toBe(true)
      expect(
        matching.some((event) => eventRegion(event) !== 'china'),
        category,
      ).toBe(true)
      expect(
        matching.every((event) => (event.endYear ?? event.year) <= PILLAR_MAX_YEAR),
        category,
      ).toBe(true)
    }
  })

  it('opens the authors and researchers linked to scientific and artistic milestones', () => {
    for (const [eventId, name] of [
      ['modern-general-relativity', '爱因斯坦'],
      ['world-darwin', '达尔文'],
      ['depth-hamlet', '莎士比亚'],
      ['depth-van-gogh-starry-night', '梵高'],
    ]) {
      const event = eventById.get(eventId)!
      const author = people.find((person) => person.aliases?.includes(name))!
      expect(author?.recordKind, name).toBe('curated')
      expect(event.people, eventId).toContain(author.id)
      expect(event.peopleNotes?.[author.id], eventId).toBeTruthy()
      expect(
        journeys.some((journey) => journey.personId === author.id),
        name,
      ).toBe(false)
    }
  })

  it('separates creative and scientific milestones from broader period events', () => {
    for (const [id, year, category] of [
      ['depth-honglou-chengjia', 1791, '文学艺术'],
      ['depth-hamlet', 1601, '文学艺术'],
      ['depth-mendel-paper', 1866, '科技医学'],
      ['depth-tokyo-university', 1877, '教育学术'],
      ['depth-amsterdam-wisselbank', 1609, '经济贸易'],
      ['depth-taj-mahal', 1632, '工程建筑'],
      ['depth-tripitaka-koreana', 1237, '宗教'],
    ] as const) {
      const event = eventById.get(id)!
      expect(event?.year, id).toBe(year)
      expect(matchesEventCategory(event, category), id).toBe(true)
      expect(
        event.sources.every((source) => source.note?.length),
        id,
      ).toBe(true)
    }
    expect(eventById.get('depth-oxford-teaching')?.dateNote).toContain('不据此宣称')
    expect(eventById.get('depth-hamlet')?.dateNote).toContain('1603年初版')
    expect(eventById.get('depth-mendel-paper')?.details?.join('')).toContain('1865年报告')
  })
})
