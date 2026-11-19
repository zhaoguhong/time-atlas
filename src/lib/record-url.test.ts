import { expect, test } from 'vitest'
import { events, people } from '../data/catalog'
import { dynasties } from '../data/dynasties'
import { worldPolities } from '../data/world-polities'
import { places } from './exploration'
import { dynastyUrl, placeUrl, eventUrl, personUrl, recordFromPath } from './record-url'

test('every event and person has a unique ASCII route that resolves its stable record ID', () => {
  const paths = [...events.map((r) => eventUrl(r.id)), ...people.map((r) => personUrl(r.id))]
  expect(new Set(paths).size).toBe(events.length + people.length)
  for (const path of paths) expect(path).toMatch(/^\/(events|people)\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/)
  for (const event of events)
    expect(recordFromPath(eventUrl(event.id))).toEqual({ type: 'event', id: event.id })
  for (const person of people)
    expect(recordFromPath(personUrl(person.id))).toEqual({ type: 'person', id: person.id })
  expect(personUrl('libai')).toBe('/people/li-bai/')
  expect(eventUrl('chibi')).toBe('/events/battle-of-chibi/')
  expect(recordFromPath('/people/not-a-person/')).toBeNull()
})

test('all authored dynasties, polities and places have distinct readable routes', () => {
  const records = [
    ...[...dynasties, ...worldPolities].map((r) => ({
      path: dynastyUrl(r.id),
      type: 'dynasty',
      id: r.id,
    })),
    ...places.map((r) => ({ path: placeUrl(r.id), type: 'place', id: r.id })),
  ]
  expect(new Set(records.map((r) => r.path)).size).toBe(records.length)
  for (const { path, type, id } of records) {
    expect(path).toMatch(/^\/(dynasties|polities|places)\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/)
    expect(recordFromPath(path)).toEqual({ type, id })
    expect(recordFromPath(`${path}index.html`)).toEqual({ type, id })
  }
  expect(dynastyUrl('xia-early')).toBe('/dynasties/xia/')
  expect(dynastyUrl('xia')).toBe('/dynasties/western-xia/')
  expect(dynastyUrl('world-roman-empire')).toBe('/polities/roman-empire/')
  expect(placeUrl('changan')).toBe('/places/changan/')
})
