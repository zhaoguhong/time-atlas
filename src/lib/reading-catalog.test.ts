import { expect, test } from 'vitest'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { gzipSync } from 'node:zlib'
import { events, people } from '../data/content'
import { events as eventIndex, people as peopleIndex } from '../data/catalog'
import eventSources from '../data/generated/reading-sources.json'

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
    const { details, narrative, background, impact, sources, ...metadata } = event
    const {
      readingPath,
      background: _background,
      impact: _impact,
      sources: _sources,
      ...indexed
    } = eventIndex[i]
    expect(indexed).toEqual(metadata)
    expect(eventIndex[i].sources).toEqual([])
    expect(eventIndex[i].background).toBe('')
    expect(eventIndex[i].impact).toBe('')
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
    expect(peopleIndex[i].biography).toBe(person.summary)
    expect(peopleIndex[i].sources).toEqual([])
  })
})

test('the separately loaded source index preserves every event citation and note', () => {
  expect(eventSources).toEqual(Object.fromEntries(events.map((event) => [event.id, event.sources])))
})

test('the compact catalog stays substantially smaller than the compatible runtime records', () => {
  const compact = readFileSync('src/data/generated/reading-catalog.json')
  const expanded = Buffer.from(JSON.stringify({ events: eventIndex, people: peopleIndex }))
  expect(compact.byteLength).toBeLessThan(expanded.byteLength * 0.7)
  expect(gzipSync(compact).byteLength).toBeLessThan(gzipSync(expanded).byteLength * 0.85)
})
