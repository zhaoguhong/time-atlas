import catalog from './generated/reading-catalog.json'
import type { HistoryEvent, Person } from '../types'

export type CatalogEvent = HistoryEvent & { readingPath: string }
export type CatalogPerson = Person & { readingPath: string; biographyLength: number }
export const events = catalog.events as unknown as CatalogEvent[]
export const people = catalog.people as CatalogPerson[]
export const eventById = new Map(events.map((event) => [event.id, event]))
export const personById = new Map(people.map((person) => [person.id, person]))
