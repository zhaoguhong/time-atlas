import type { EventScope } from '../types'

const key = 'time-atlas:scope-by-mode:v1'
export function readScopePreferences(legacyMap: EventScope = 'nearby') {
  const defaults = { map: legacyMap, pillar: 'period' as EventScope }
  try {
    const saved = JSON.parse(localStorage.getItem(key) ?? 'null')
    for (const mode of ['map', 'pillar'] as const)
      if (['year', 'nearby', 'period'].includes(saved?.[mode])) defaults[mode] = saved[mode]
  } catch {
    /* Storage is optional. */
  }
  return defaults
}
export function writeScopePreference(
  mode: 'map' | 'pillar',
  scope: EventScope,
  legacyMap: EventScope,
) {
  try {
    localStorage.setItem(key, JSON.stringify({ ...readScopePreferences(legacyMap), [mode]: scope }))
  } catch {
    /* Browsing remains available without storage. */
  }
}
