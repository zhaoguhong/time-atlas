import type { HistoryEvent, Person } from '../types'

export const normalizeSearchText = (value: string) => value.toLocaleLowerCase().replace(/\s+/g, '')

export interface EventSearchMatch {
  rank: number
  reason?: string
}

const eventFields = new WeakMap<HistoryEvent, ReturnType<typeof prepareEvent>>()
const personNames = new WeakMap<Person, string[]>()

function prepareEvent(event: HistoryEvent) {
  return {
    names: [event.title, ...(event.aliases ?? [])].map(normalizeSearchText),
    datesAndPlace: [event.location, String(event.year), event.dateLabel ?? ''].map(
      normalizeSearchText,
    ),
    themes: (event.themes ?? []).map((theme) => ({
      label: theme,
      text: normalizeSearchText(theme),
    })),
    summary: normalizeSearchText(event.summary),
  }
}

/** Search the lightweight catalog; names are resolved only through explicit person links. */
export function eventSearchMatch(
  event: HistoryEvent,
  query: string,
  peopleById?: ReadonlyMap<string, Person>,
): EventSearchMatch | undefined {
  const text = normalizeSearchText(query)
  if (!text) return { rank: 0 }
  let fields = eventFields.get(event)
  if (!fields) {
    fields = prepareEvent(event)
    eventFields.set(event, fields)
  }
  if (fields.names.includes(text)) return { rank: 0 }
  if (fields.names.some((name) => name.includes(text))) return { rank: 1 }
  if (fields.datesAndPlace.some((value) => value.includes(text))) return { rank: 2 }
  const theme = fields.themes.find((value) => value.text.includes(text))
  if (theme) return { rank: 3, reason: `主题：${theme.label}` }
  if (peopleById) {
    for (const id of event.people) {
      const person = peopleById.get(id)
      if (!person) continue
      let names = personNames.get(person)
      if (!names) {
        names = [person.name, person.courtesy ?? '', ...(person.aliases ?? [])].map(
          normalizeSearchText,
        )
        personNames.set(person, names)
      }
      if (names.some((name) => name.includes(text)))
        return { rank: 4, reason: `相关人物：${person.name}` }
    }
  }
  if (fields.summary.includes(text))
    return { rank: 5, reason: `介绍提及“${query.trim().slice(0, 20)}”` }
  return undefined
}
