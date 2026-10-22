import { useCallback, useEffect, useState } from 'react'

export type PillarTheme = 'column' | 'line' | 'night'

export const DEFAULT_PILLAR_THEME: PillarTheme = 'column'
export const PILLAR_THEME_STORAGE_KEY = 'time-atlas:pillar-theme:v1'

export const pillarThemes: ReadonlyArray<{
  id: PillarTheme
  name: string
  description: string
}> = [
  { id: 'column', name: '琉璃时柱', description: '通透的时柱，中外相映' },
  { id: 'line', name: '素笺编年', description: '淡雅的纸面，清晰的细线' },
  { id: 'night', name: '星夜时柱', description: '深蓝与暖铜，静阅岁月' },
]

export function parsePillarTheme(value: unknown): PillarTheme {
  return value === 'column' || value === 'line' || value === 'night' ? value : DEFAULT_PILLAR_THEME
}

export function readPillarTheme(): PillarTheme {
  try {
    return parsePillarTheme(localStorage.getItem(PILLAR_THEME_STORAGE_KEY))
  } catch {
    return DEFAULT_PILLAR_THEME
  }
}

export function writePillarTheme(theme: PillarTheme): void {
  try {
    localStorage.setItem(PILLAR_THEME_STORAGE_KEY, parsePillarTheme(theme))
  } catch {
    // Appearance remains usable when the browser disallows storage.
  }
}

export function usePillarTheme(): readonly [PillarTheme, (theme: PillarTheme) => void] {
  const [theme, setTheme] = useState(readPillarTheme)
  const changeTheme = useCallback((next: PillarTheme) => {
    const value = parsePillarTheme(next)
    setTheme(value)
    writePillarTheme(value)
  }, [])

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === PILLAR_THEME_STORAGE_KEY || event.key === null) {
        setTheme(parsePillarTheme(event.newValue))
      }
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  return [theme, changeTheme]
}
