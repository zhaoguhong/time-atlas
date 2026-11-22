import { defaultPreferences } from './history'

/** Keep the default landing page bare; explicit map views retain shareable state. */
export function mapUrl(base: string, state: URLSearchParams) {
  const params = new URLSearchParams(state)
  const defaults: Record<string, string> = {
    year: String(defaultPreferences.year),
    scope: defaultPreferences.scope,
    view: 'events',
    category: '全部',
    cities: '1',
    events: '1',
  }
  const defaultCamera =
    !params.has('lng') ||
    (params.get('lng') === '109.5' &&
      params.get('lat') === '34.5' &&
      ['3.45', '2.65'].includes(params.get('zoom') ?? ''))
  const cameraKeys = ['lng', 'lat', 'zoom']
  if (
    defaultCamera &&
    [...params].every(([key, value]) => cameraKeys.includes(key) || defaults[key] === value)
  )
    return base
  // Retain preference-backed fields so a shared map overrides the recipient's settings.
  if (params.get('view') === 'events') params.delete('view')
  if (params.get('category') === '全部') params.delete('category')
  return `${base}#${params}`
}
