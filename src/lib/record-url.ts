import routes from '../data/generated/reading-routes.json'
import type { Selection } from '../types'
const base = import.meta.env.BASE_URL
const events = routes.events as Record<string, string>
const people = routes.people as Record<string, string>
const dynasties = routes.dynasties as Record<string, string>
const polities = routes.polities as Record<string, string>
const places = routes.places as Record<string, string>
export const eventUrl = (id: string) => `${base}events/${events[id]}/`
export const personUrl = (id: string) => `${base}people/${people[id]}/`
export const dynastyUrl = (id: string) =>
  dynasties[id] ? `${base}dynasties/${dynasties[id]}/` : `${base}polities/${polities[id]}/`
export const placeUrl = (id: string) => `${base}places/${places[id]}/`
const records = new Map<string, Selection>([
  ...Object.keys(events).map((id) => [eventUrl(id), { type: 'event', id }] as [string, Selection]),
  ...Object.keys(people).map(
    (id) => [personUrl(id), { type: 'person', id }] as [string, Selection],
  ),
  ...[...Object.keys(dynasties), ...Object.keys(polities)].map(
    (id) => [dynastyUrl(id), { type: 'dynasty', id }] as [string, Selection],
  ),
  ...Object.keys(places).map((id) => [placeUrl(id), { type: 'place', id }] as [string, Selection]),
])
export function recordFromPath(path: string) {
  path = path.replace(/\/index\.html$/, '/')
  return records.get(path.endsWith('/') ? path : `${path}/`) ?? null
}
export function recordUrl(selection: Selection | null) {
  return selection?.type === 'event'
    ? eventUrl(selection.id)
    : selection?.type === 'person'
      ? personUrl(selection.id)
      : selection?.type === 'dynasty'
        ? dynastyUrl(selection.id)
        : selection?.type === 'place'
          ? placeUrl(selection.id)
          : null
}
