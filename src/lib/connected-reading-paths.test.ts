import { describe, expect, it } from 'vitest'
import { eventById, personById } from '../data/content'
import { connectedReadings } from '../data/content-connections'
import { chinesePersonEventConnections } from '../data/content-connections-china'
import { worldPersonEventConnections } from '../data/content-connections-world'
import { connectedTopicTours, expandedConnectedReadings } from '../data/connected-reading-paths'
import { indexTopicPaths } from './topic-paths'
import { relatedReading } from './time-pillar'

describe('connected reading paths', () => {
  it('retains each added person role through content enrichment, including posthumous works', () => {
    for (const additions of [chinesePersonEventConnections, worldPersonEventConnections]) {
      for (const [eventId, roles] of Object.entries(additions)) {
        const event = eventById.get(eventId)!
        expect(event, eventId).toBeDefined()
        for (const [personId, note] of Object.entries(roles)) {
          const person = personById.get(personId)!
          expect(person, personId).toBeDefined()
          expect(
            event.people.filter((id) => id === personId),
            `${eventId}/${personId}`,
          ).toHaveLength(1)
          expect(event.peopleNotes?.[personId]).toBe(note)
          if (person.birth !== null) expect(event.year).toBeGreaterThanOrEqual(person.birth)
          if (person.death !== null && event.year > person.death)
            expect(note).toMatch(/身后|去世|后世|整理|采用/)
        }
      }
    }
    const folio = eventById.get('exp-em-first-folio')!
    expect(folio.peopleNotes?.['category-person-shakespeare']).toContain('去世后')
  })

  it('keeps every editorial pair distinct and readable in both directions before automatic suggestions', () => {
    const keys = connectedReadings.map(([first, second]) => [first, second].sort().join('\0'))
    expect(new Set(keys).size).toBe(keys.length)
    for (const [first, second, forward, backward, note] of expandedConnectedReadings) {
      expect(first).not.toBe(second)
      expect(forward.trim() && backward.trim() && note.trim()).toBeTruthy()
      const earlier = eventById.get(first)!
      const later = eventById.get(second)!
      expect(earlier, first).toBeDefined()
      expect(later, second).toBeDefined()
      expect(relatedReading(earlier, [...eventById.values()])).toContainEqual({
        event: later,
        label: forward,
        note,
      })
      expect(relatedReading(later, [...eventById.values()])).toContainEqual({
        event: earlier,
        label: backward,
        note,
      })
    }
  })

  it('connects explicit topic chapters and reuses their existing references without dropping pending notes', () => {
    const paths = indexTopicPaths(connectedTopicTours)
    for (const topic of connectedTopicTours) {
      expect(new Set(topic.steps).size, topic.id).toBe(topic.steps.length)
      expect(topic.chapters?.map((chapter) => chapter.eventId)).toEqual(topic.steps)
      const references = topic.steps.flatMap((id) => eventById.get(id)!.sources)
      for (const source of topic.sources ?? []) {
        expect(
          references.some((reference) => reference.url === source.url),
          `${topic.id}: ${source.url}`,
        ).toBe(true)
      }
      topic.steps.forEach((eventId, chapter) => {
        expect(paths.get(eventId)).toContainEqual({ topic, chapter })
        const pending = eventById
          .get(eventId)!
          .sources.filter((source) => source.note?.includes('参考入口待核'))
        for (const source of pending) {
          const reference = topic.sources?.find((entry) => entry.url === source.url)
          if (reference) expect(reference.note).toContain('参考入口待核')
        }
      })
    }
  })

  it('cites the actual Ming annals for the Songjin war rather than an unrelated biography volume', () => {
    const event = eventById.get('songjin-battle')!
    expect(
      event.sources.some((source) => source.url === 'https://zh.wikisource.org/wiki/明史/卷24'),
    ).toBe(true)
    expect(
      event.sources.some((source) => source.url === 'https://zh.wikisource.org/wiki/明史/卷260'),
    ).toBe(false)
  })
})
