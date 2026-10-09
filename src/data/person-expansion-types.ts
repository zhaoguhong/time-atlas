import type { Source } from '../types'

export interface PersonExpansion {
  id: string
  summary: string
  biography: string
  sources: Source[]
  role?: string
}

export interface EventAssociation {
  eventId: string
  personId: string
  note: string
  sources: Source[]
}
