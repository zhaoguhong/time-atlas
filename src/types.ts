import type { Feature, MultiPolygon, Polygon } from 'geojson'

export type Category = '战争' | '政治' | '文化' | '交流' | '社会'
export type EventScope = 'year' | 'nearby' | 'period'
export interface Source {
  title: string
  url: string
  note?: string
}
export interface Period {
  id: string
  name: string
  short: string
  from: number
  to: number
  focus: number
  color: string
  summary: string
  subtitle: string
}
export interface HistoryEvent {
  id: string
  year: number
  endYear?: number
  dateLabel?: string
  title: string
  category: Category
  aliases?: string[]
  location: string
  coordinates: [number, number]
  summary: string
  background: string
  impact: string
  people: string[]
  sources: Source[]
  importance: number
  locationNote?: string
  dateNote?: string
  peopleNotes?: Record<string, string>
  details?: string[]
}
export interface Person {
  id: string
  name: string
  courtesy?: string
  birth: number | null
  death: number | null
  role: string
  color: string
  summary: string
  biography: string
  sources: Source[]
  aliases?: string[]
  era?: string
  recordKind?: 'catalog' | 'curated'
  wikidata?: string
  revision?: number | null
}
export interface JourneyNode {
  id: string
  year: number
  /** Order within the same year comes from the cited chronology, never spatial sorting. */
  title: string
  location: string
  coordinates: [number, number]
  kind: '出生' | '任职' | '居住' | '到访' | '出行' | '逝世'
  summary: string
  sources: Source[]
  dateNote?: string
  locationNote: string
}
export interface PersonJourney {
  personId: string
  introduction: string
  nodes: JourneyNode[]
}
export interface JourneyView {
  personId: string
  name: string
  nodes: JourneyNode[]
  activeId: string | null
  showFuture: boolean
}
export interface Dynasty {
  id: string
  name: string
  aliases: string[]
  mapNames: string[]
  from: number
  to: number
  capital: string
  summary: string
  context: string
  sources: Source[]
  dateNote?: string
  sections?: { title: string; text: string }[]
}
export interface City {
  id: string
  name: string
  modern: string
  coordinates: [number, number]
  from: number
  to: number
  capitals: [number, number][]
}
export interface Tour {
  id: string
  name: string
  subtitle: string
  description: string
  color: string
  icon: 'route' | 'swords'
  steps: string[]
  question?: string
  introduction?: string[]
  conclusion?: string
  chapters?: { eventId: string; explanation: string; mapReading: string }[]
  sources?: Source[]
}
export interface PeriodProfile {
  focusReason: string
  question: string
  context: string
  chronologyNote: string
  polities: string[]
  people: string[]
  steps: string[]
}
export interface PolityProperties {
  id: string
  name: string
  nameZh: string
  from: number
  to: number
  color: string
  label: [number, number]
  area: number
  source: string
  wikidata: string
  wikipedia: string
  displayNote?: string
}
export type PolityFeature = Feature<Polygon | MultiPolygon, PolityProperties>
export type Selection = { type: 'event' | 'person' | 'polity' | 'dynasty' | 'place'; id: string }
export type PanelMode =
  'events' | 'people' | 'dynasties' | 'places' | 'tours' | 'saved' | 'overview' | 'comparison'
export type MapBounds = [number, number, number, number]
export interface ExplorationFilter {
  place: string
  range: [number, number] | null
  bounds: MapBounds | null
}
export interface Preferences {
  year: number
  cities: boolean
  events: boolean
  bookmarks: string[]
  scope: EventScope
}
