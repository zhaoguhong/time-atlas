import { expect, test } from 'vitest'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { events, people } from '../data/content'
import { events as eventIndex, people as peopleIndex } from '../data/catalog'

test('every deferred article exactly preserves its authoritative record and hash', () => {
  for (const [records, indexes] of [
    [events, eventIndex],
    [people, peopleIndex],
  ] as const) {
    expect(indexes.map((record) => record.id)).toEqual(records.map((record) => record.id))
    expect(new Set(indexes.map((record) => record.readingPath)).size).toBe(records.length)
    records.forEach((record, i) => {
      expect(indexes[i].readingPath).toMatch(
        /^data\/reading\/(events|people)\/[a-zA-Z0-9_-]+\.json$/,
      )
      const text = readFileSync(`public/${indexes[i].readingPath}`, 'utf8')
      expect(JSON.parse(text)).toEqual(record)
      expect(indexes[i].readingPath).toContain(
        createHash('sha256').update(text).digest('hex').slice(0, 16),
      )
    })
  }
})

test('catalog retains every navigation, chronology and evidence-note field', () => {
  events.forEach((event, i) => {
    const { details, background, impact, sources, ...metadata } = event
    const {
      readingPath,
      background: _background,
      impact: _impact,
      sources: _sources,
      ...indexed
    } = eventIndex[i]
    expect(indexed).toEqual(metadata)
  })
  people.forEach((person, i) => {
    const { biography, sources, ...metadata } = person
    const {
      readingPath,
      biography: _biography,
      sources: _sources,
      biographyLength,
      ...indexed
    } = peopleIndex[i]
    expect(indexed).toEqual(metadata)
    expect(biographyLength).toBe(biography.length)
  })
})
