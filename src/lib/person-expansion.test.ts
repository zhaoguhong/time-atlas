import { describe, expect, it } from 'vitest'
import { eventById, events, personById } from '../data/content'
import importedPeople from '../data/generated/people.json'
import { expandedPersonProfiles } from '../data/person-expansion'
import { journeys } from '../data/journeys'

describe('important person biography expansion', () => {
  it('retains the pinned identities and dates while providing fifty curated biographies', () => {
    expect(expandedPersonProfiles).toHaveLength(50)
    expect(new Set(expandedPersonProfiles.map((profile) => profile.id)).size).toBe(50)
    for (const profile of expandedPersonProfiles) {
      const person = personById.get(profile.id)!
      const imported = importedPeople.find((entry) => entry.id === profile.id)!
      expect(imported, profile.id).toBeDefined()
      expect(
        [person.id, person.birth, person.death, person.wikidata, person.revision],
        person.name,
      ).toEqual([imported.id, imported.birth, imported.death, imported.wikidata, imported.revision])
      expect(person.recordKind, person.name).toBe('curated')
      expect(person.biography.length, person.name).toBeGreaterThanOrEqual(160)
      expect(
        person.sources.some((source) => !/wikidata\.org|wikipedia\.org/.test(source.url)),
        person.name,
      ).toBe(true)
    }
  })

  it('does not turn undated traditions and technical works into guessed event or journey nodes', () => {
    for (const id of ['q9333', 'q47739', 'q37151', 'q6697537']) {
      const person = personById.get(id)!
      expect(person.birth, person.name).toBeNull()
      expect(person.death, person.name).toBeNull()
      expect(
        events.some((event) => event.people.includes(id)),
        person.name,
      ).toBe(false)
    }
    for (const profile of expandedPersonProfiles)
      expect(
        journeys.some((journey) => journey.personId === profile.id),
        profile.id,
      ).toBe(false)
  })

  it('restores the named participants in existing Qin and Han events', () => {
    for (const [eventId, personId] of [
      ['mengtian-north', 'q1151702'],
      ['qin-straight-road', 'q1151702'],
      ['hongmen', 'q701326'],
      ['baideng', 'q707658'],
      ['han-wendi', 'q707658'],
      ['han-wendi', 'q7221'],
    ]) {
      const event = eventById.get(eventId)!
      expect(event.people, eventId).toContain(personId)
      expect(event.peopleNotes?.[personId], eventId).toBeTruthy()
    }
    expect(eventById.get('han-wendi')?.peopleNotes?.q298039).toContain('不是本人参加')
    expect(eventById.get('qin-straight-road')?.dateNote).toContain('不表示全线竣工')
  })

  it('preserves captured and military roles without changing the event geography', () => {
    expect(eventById.get('tumu')?.people).toContain('q9983')
    expect(eventById.get('duomen-coup')?.people).toContain('q9983')
    expect(eventById.get('yangzhou-1645')?.people).toContain('q3274611')
    expect(eventById.get('ming-founded')?.peopleNotes?.q1355886).toContain('北伐')
    expect(eventById.get('ming-founded')?.coordinates).toEqual([118.78, 32.06])
  })
})
