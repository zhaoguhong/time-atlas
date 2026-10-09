import type { HistoryEvent, Person, Source } from '../types'
import { ancientAssociations, ancientProfiles } from './person-expansion-ancient'
import { medievalAssociations, medievalProfiles } from './person-expansion-medieval'
import { lateAssociations, lateEventSourceSupplements, lateProfiles } from './person-expansion-late'

export const expandedPersonProfiles = [...ancientProfiles, ...medievalProfiles, ...lateProfiles]
export const expandedPersonAssociations = [
  ...ancientAssociations,
  ...medievalAssociations,
  ...lateAssociations,
]

function mergeSources(first: Source[], second: Source[]): Source[] {
  const seen = new Set<string>()
  return [...first, ...second].filter((source) => {
    if (seen.has(source.url)) return false
    seen.add(source.url)
    return true
  })
}

export function expandPersonContent(people: Person[]): Person[] {
  const profiles = new Map(expandedPersonProfiles.map((profile) => [profile.id, profile]))
  return people.map((person): Person => {
    const profile = profiles.get(person.id)
    return profile
      ? {
          ...person,
          ...profile,
          recordKind: 'curated',
          sources: mergeSources(profile.sources, person.sources),
        }
      : person
  })
}

export function linkExpandedPersonEvents(events: HistoryEvent[]): HistoryEvent[] {
  return events.map((event) => {
    const associations = expandedPersonAssociations.filter((entry) => entry.eventId === event.id)
    const supplements = lateEventSourceSupplements[event.id] ?? []
    if (!associations.length && !supplements.length) return event
    return {
      ...event,
      people: [...new Set([...event.people, ...associations.map((entry) => entry.personId)])],
      peopleNotes: {
        ...event.peopleNotes,
        ...Object.fromEntries(associations.map((entry) => [entry.personId, entry.note])),
      },
      sources: mergeSources(
        [...supplements, ...associations.flatMap((entry) => entry.sources)],
        event.sources,
      ),
    }
  })
}
