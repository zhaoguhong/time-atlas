import type { FeatureCollection, LineString } from 'geojson'
import type { HistoryEvent, JourneyNode, JourneyView, Person, PersonJourney } from '../types'
import { clampYear } from './history'
import { periods } from '../data/periods'

export function activeJourneyNode(nodes: JourneyNode[], year: number, selectedId?: string | null) {
  const selected = nodes.find((node) => node.id === selectedId && node.year === year)
  return selected ?? nodes.filter((node) => node.year <= year).at(-1) ?? null
}
export function visibleJourneyNodes(view: JourneyView) {
  if (view.showFuture) return view.nodes
  const index = view.nodes.findIndex((node) => node.id === view.activeId)
  return index < 0 ? [] : view.nodes.slice(0, index + 1)
}
export function journeySegments(view: JourneyView): FeatureCollection<LineString> {
  const nodes = visibleJourneyNodes(view)
  const activeIndex = view.nodes.findIndex((node) => node.id === view.activeId)
  const features: FeatureCollection<LineString>['features'] = []
  for (let index = 1; index < nodes.length; index++) {
    const from = nodes[index - 1],
      to = nodes[index]
    if (from.coordinates.every((value, dimension) => value === to.coordinates[dimension])) continue
    features.push({
      type: 'Feature',
      properties: {
        fromId: from.id,
        toId: to.id,
        fromYear: from.year,
        toYear: to.year,
        status: index > activeIndex ? 'future' : index === activeIndex ? 'current' : 'past',
      },
      // Direction follows the source's chronological order, including repeated cities.
      geometry: { type: 'LineString', coordinates: [from.coordinates, to.coordinates] },
    })
  }
  return { type: 'FeatureCollection', features }
}
export function journeyEvents(nodes: JourneyNode[], personId: string): HistoryEvent[] {
  return nodes.map((node) => ({
    ...node,
    category: '文化',
    background: node.summary,
    impact: '',
    people: [personId],
    importance: 5,
  }))
}
export function personFocusYear(person: Person, year: number, journey?: PersonJourney) {
  const era = periods.find((period) => period.id === person.era)
  const inLife =
    (person.birth === null || year >= person.birth) &&
    (person.death === null || year <= person.death)
  const completeDates = person.birth !== null && person.death !== null
  if (inLife && (completeDates || (era && year >= era.from && year <= era.to))) return year
  return clampYear(journey?.nodes[0]?.year ?? person.birth ?? person.death ?? era?.focus ?? year)
}
export function matchesPerson(person: Person, query: string) {
  const text = query.trim().toLocaleLowerCase().replace(/\s+/g, '')
  return [person.name, person.courtesy ?? '', person.role, ...(person.aliases ?? [])].some(
    (value) => value.toLocaleLowerCase().replace(/\s+/g, '').includes(text),
  )
}
