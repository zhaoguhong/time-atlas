import type { Category, HistoryEvent, HistoryRegion, Person, Source } from '../types'
import { bookUrl } from './sources'

/** Authoring helpers only: all prose, dates, places and relationships are supplied by editors. */
export type EventDraft = {
  id: string
  year: number
  endYear?: number
  dateLabel?: string
  dateNote?: string
  title: string
  category: Category
  themes: string[]
  place: [string, [number, number]]
  summary: string
  text: string | string[]
  impact: string
  sources: Source[]
  people?: string[]
  peopleNotes?: Record<string, string>
  relatedEvents?: HistoryEvent['relatedEvents']
  importance?: number
  locationNote?: string
  placeIds?: string[]
  region?: HistoryRegion
}

export type PersonDraft = {
  id: string
  name: string
  birth: number | null
  death: number | null
  role: string
  summary: string
  text: string
  sources: Source[]
  aliases?: string[]
  courtesy?: string
  era?: string
  color?: string
}

export function makeEvents(region: HistoryRegion, drafts: EventDraft[]): HistoryEvent[] {
  return drafts.map(({ place, text, ...draft }) => ({
    ...draft,
    region: draft.region ?? region,
    location: place[0],
    coordinates: place[1],
    people: draft.people ?? [],
    importance: draft.importance ?? 3,
    background: Array.isArray(text) ? text[0] : text,
    narrative: { sections: [{ paragraphs: Array.isArray(text) ? text : [text] }] },
  }))
}

export function makePeople(drafts: PersonDraft[]): Person[] {
  return drafts.map(({ text, ...draft }) => ({
    ...draft,
    biography: text,
    color: draft.color ?? '#71836b',
    recordKind: 'curated',
  }))
}

export const bookSource = (name: string, volume: string, note?: string): Source => ({
  title: `《${name}》${volume ? `卷${volume}` : ''}`,
  url: bookUrl(name, volume),
  ...(note ? { note } : {}),
})

export const webSource = (title: string, url: string, note?: string): Source => ({
  title,
  url,
  ...(note ? { note } : {}),
})
