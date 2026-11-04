import catalog from './generated/reading-catalog.json'
import type { HistoryEvent, Person } from '../types'

export type CatalogEvent = HistoryEvent & { readingPath: string }
export type CatalogPerson = Person & { readingPath: string; biographyLength: number }

type Columns = Record<string, unknown[] | { values: unknown[]; nulls?: number[] }>
type CompactRecord = { id: string; readingHash: string; readingId?: string }

function expand<T extends CompactRecord>(columns: Columns): T[] {
  const rows: Record<string, unknown>[] = (columns.id as unknown[]).map(() => ({}))
  for (const [field, column] of Object.entries(columns)) {
    const dense = Array.isArray(column)
    const values = dense ? column : column.values
    const nulls = new Set(dense ? [] : column.nulls)
    values.forEach((value, index) => {
      if (dense || value !== null || nulls.has(index)) rows[index][field] = value
    })
  }
  return rows as T[]
}

export const events = expand<
  CompactRecord & Omit<CatalogEvent, 'sources' | 'background' | 'impact'>
>(catalog.events as Columns).map(({ readingHash, readingId, ...event }): CatalogEvent => ({
  ...event,
  readingPath: `data/reading/events/${readingId ?? event.id}-${readingHash}.json`,
  sources: [],
  background: '',
  impact: '',
}))
export const people = expand<CompactRecord & Omit<CatalogPerson, 'sources' | 'biography'>>(
  catalog.people as Columns,
).map(({ readingHash, readingId, ...person }): CatalogPerson => ({
  ...person,
  readingPath: `data/reading/people/${readingId ?? person.id}-${readingHash}.json`,
  sources: [],
  biography: person.summary,
}))
export const eventById = new Map(events.map((event) => [event.id, event]))
export const personById = new Map(people.map((person) => [person.id, person]))
