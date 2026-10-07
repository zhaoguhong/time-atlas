import { describe, expect, it } from 'vitest'
import { people, events } from '../data/content'
import { dynasties, dynastyById, dynastyForMap } from '../data/dynasties'
import { matchesPerson } from './journeys'

describe('expanded historical coverage', () => {
  it('provides introductions and traceable references for every person and dynasty', () => {
    for (const person of people) {
      expect(person.biography.trim().length, person.name).toBeGreaterThan(3)
      expect(person.role.trim().length, person.name).toBeGreaterThan(0)
      expect(person.sources.length, person.name).toBeGreaterThan(0)
      for (const source of person.sources) {
        expect(source.title.trim().length, person.name).toBeGreaterThan(0)
        expect(new URL(source.url).protocol, person.name).toBe('https:')
      }
    }
    expect(new Set(dynasties.map((dynasty) => dynasty.id)).size).toBe(dynasties.length)
    for (const dynasty of dynasties) {
      expect(dynasty.from, dynasty.name).toBeLessThanOrEqual(dynasty.to)
      expect(dynasty.summary.length, dynasty.name).toBeGreaterThan(10)
      expect(dynasty.context.length, dynasty.name).toBeGreaterThan(15)
      expect(dynasty.capital.length, dynasty.name).toBeGreaterThan(0)
      expect(dynasty.sources.length, dynasty.name).toBeGreaterThan(0)
    }
  })

  it('separates actual dynasty dates and overlapping source map names from navigation periods', () => {
    expect(dynastyById.get('yuan')).toMatchObject({ from: 1271, to: 1368 })
    expect(dynastyById.get('qing')).toMatchObject({ from: 1636, to: 1912 })
    expect(dynastyForMap('Han Dynasty', 100)?.name).toBe('东汉')
    expect(dynastyForMap('Han Dynasty', -100)?.name).toBe('西汉')
    expect(dynastyForMap('Han Dynasty', 230)).toBeUndefined()
    expect(dynastyForMap('Western Jin', 383)?.name).toBe('东晋')
    expect(dynastyForMap('Later Jin', 940)?.name).toBe('后晋')
    expect(dynastyForMap('Later Jin Dynasty', 1620)?.name).toBe('后金')
    expect(dynastyById.get('xia-early')?.to).toBeLessThan(-475)
  })

  it('keeps cultural history searchable and distinguishes people with similar names', () => {
    for (const name of [
      '孔子',
      '李白',
      '李清照',
      '苏东坡',
      '司马光',
      '王阳明',
      '徐霞客',
      '鲁迅',
      '陆逊',
    ])
      expect(
        people.some((person) => matchesPerson(person, name)),
        name,
      ).toBe(true)
    const writer = people.find((person) => person.name === '鲁迅')!
    const general = people.find((person) => person.name === '陆逊')!
    expect(writer.id).not.toBe(general.id)
    expect(writer.birth).toBe(1881)
    expect(general.death).toBe(245)
    for (const keyword of ['兰亭', '玄奘', '活字', '赤壁赋', '苏堤', '天工开物', '康熙字典'])
      expect(
        events.some((event) => event.title.includes(keyword)),
        keyword,
      ).toBe(true)
  })

  it('covers founder and cultural lives while requiring explanations for posthumous links', () => {
    for (const [name, minimum] of [
      ['赵匡胤', 10],
      ['包拯', 3],
      ['李清照', 3],
      ['朱熹', 3],
      ['王守仁', 2],
      ['李时珍', 2],
    ] as const) {
      const person = people.find((person) => person.name === name)!
      expect(
        events.filter((event) => event.people.includes(person.id)).length,
        name,
      ).toBeGreaterThanOrEqual(minimum)
    }
    for (const event of events)
      for (const id of event.people) {
        const person = people.find((person) => person.id === id)!
        if (person.death !== null && event.year > person.death)
          expect(event.peopleNotes?.[id], `${event.id} → ${person.name}`).toBeTruthy()
        if (person.birth !== null)
          expect(event.year, `${event.id} → ${person.name}`).toBeGreaterThanOrEqual(person.birth)
      }
    expect(people.find((person) => person.name === '建文帝')?.death).toBeNull()
    expect(people.find((person) => person.name === '李清照')?.death).toBeNull()
  })
})
