import { slugify } from 'transliteration'

export function buildReadingRoutes(events, people, dynasties = [], polities = [], places = []) {
  function routes(records, kind) {
    const result = {}
    const used = new Set()
    for (const record of records) {
      let slug =
        kind === 'people'
          ? slugify(record.name)
          : record.id.replace(/^(?:early-plus-|region-|expanded-)/, '')
      slug = slug.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      if (kind === 'events' && record.id === 'chibi') slug = 'battle-of-chibi'
      if (kind === 'dynasties') slug = slug.replace(/-early$/, '')
      if (kind === 'dynasties' && record.id === 'xia') slug = 'western-xia'
      if (kind === 'dynasties' && record.id === 'chu-ten') slug = 'chu'
      if (kind === 'polities') slug = slug.replace(/^world-/, '')
      if (!slug) throw new Error(`Cannot name public route: ${record.id}`)
      if (used.has(slug))
        slug += `-${slugify(record.id)
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')}`
      if (used.has(slug) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
        throw new Error(`Invalid or duplicate public route: ${record.id}`)
      used.add(slug)
      result[record.id] = slug
    }
    return result
  }
  return {
    events: routes(events, 'events'),
    people: routes(people, 'people'),
    dynasties: routes(dynasties, 'dynasties'),
    polities: routes(polities, 'polities'),
    places: routes(places, 'places'),
  }
}
