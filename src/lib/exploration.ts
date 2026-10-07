import { cities } from '../data/periods'
import type { City, ExplorationFilter, HistoryEvent, MapBounds } from '../types'
import { toOrdinal } from './history'

export interface Place {
  id: string
  name: string
  modern: string
  names: string[]
  coordinates: [number, number]
  labels: City[]
}

// These are reading groups for existing city labels, not reconstructions of city boundaries.
const groups = [
  { id: 'changan', name: '长安 / 西安', names: ['长安', '西安'], ids: ['changan'] },
  {
    id: 'nanjing',
    name: '南京一带',
    names: ['建业', '建康', '金陵', '南京'],
    ids: ['jianye', 'jiankang', 'nanjing'],
  },
  {
    id: 'kaifeng',
    name: '开封一带',
    names: ['大梁', '开封', '汴京', '东京'],
    ids: ['daliang', 'tokyo'],
  },
  { id: 'hangzhou', name: '杭州一带', names: ['临安', '杭州'], ids: ['linan'] },
  { id: 'beijing', name: '北京一带', names: ['大都', '北京'], ids: ['dadu', 'beijing'] },
  { id: 'lhasa', name: '拉萨一带', names: ['逻些', '拉萨'], ids: ['lhasa', 'lhasa-later'] },
]
const groupedIds = new Set(groups.flatMap((group) => group.ids))
export const places: Place[] = [
  ...groups.map((group) => {
    const labels = cities.filter((city) => group.ids.includes(city.id))
    return {
      id: group.id,
      name: group.name,
      names: group.names,
      modern: labels.at(-1)!.modern,
      coordinates: labels.at(-1)!.coordinates,
      labels,
    }
  }),
  ...cities
    .filter((city) => !groupedIds.has(city.id))
    .map((city) => ({
      id: city.id,
      name: city.name,
      modern: city.modern,
      names: [city.name],
      coordinates: city.coordinates,
      labels: [city],
    })),
]
export const placeById = new Map(places.map((place) => [place.id, place]))
export const placeForCity = (id: string) =>
  places.find((place) => place.labels.some((city) => city.id === id))

export function namesPlace(location: string, place: Place) {
  return place.names.some((name) => {
    // 东京 can also refer to Japan; the stored location must identify the Chinese city.
    if (name === '东京')
      return /东京.*(?:开封|汴)|(?:开封|汴).*东京/.test(location) || location === '东京'
    return location.includes(name)
  })
}

export function insideBounds([lng, lat]: [number, number], [west, south, east, north]: MapBounds) {
  const longitude = ((((lng + 180) % 360) + 360) % 360) - 180
  if (east - west >= 360) return lat >= south && lat <= north
  const w = ((((west + 180) % 360) + 360) % 360) - 180
  const e = ((((east + 180) % 360) + 360) % 360) - 180
  return (
    lat >= south &&
    lat <= north &&
    (w <= e ? longitude >= w && longitude <= e : longitude >= w || longitude <= e)
  )
}

export function filterExploration(events: HistoryEvent[], filter: ExplorationFilter) {
  const place = placeById.get(filter.place)
  return events.filter(
    (event) =>
      (!filter.range ||
        (toOrdinal(event.year) <= toOrdinal(filter.range[1]) &&
          toOrdinal(event.endYear ?? event.year) >= toOrdinal(filter.range[0]))) &&
      (!place || namesPlace(event.location, place)) &&
      (!filter.bounds || insideBounds(event.coordinates, filter.bounds)),
  )
}

export const emptyExploration: ExplorationFilter = { place: '', range: null, bounds: null }
