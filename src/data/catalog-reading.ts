import type { Person } from '../types'
import { catalogRoles } from './catalog-roles'
import { catalogMainReading } from './catalog-reading-main'
import { catalogClassicReading } from './catalog-reading-classic'
import { catalogThoughtReading } from './catalog-reading-thought'
import { catalogPolitiesReading } from './catalog-reading-polities'

const profiles = {
  ...catalogMainReading,
  ...catalogClassicReading,
  ...catalogThoughtReading,
  ...catalogPolitiesReading,
}

/** Editorial prose is separate from the versioned identity import. */
export function enrichCatalogReading(people: Person[]): Person[] {
  return people.map<Person>((person) => {
    const profile = profiles[person.id]
    if (!profile) return person
    return {
      ...person,
      ...profile,
      role: catalogRoles[person.id] ?? person.role,
      recordKind: 'curated',
      sources: [
        ...new Map(
          [...profile.sources, ...person.sources].map((source) => [source.url, source]),
        ).values(),
      ],
    }
  })
}
