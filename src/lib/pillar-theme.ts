import { useCallback, useEffect, useState } from 'react'

export type PillarTheme =
  'column' | 'line' | 'scroll' | 'ribbon' | 'minimal' | 'editorial' | 'observatory'

export const DEFAULT_PILLAR_THEME: PillarTheme = 'column'
export const PILLAR_THEME_STORAGE_KEY = 'time-atlas:pillar-theme:v1'

export const pillarThemes: ReadonlyArray<{
  id: PillarTheme
  name: string
  description: string
}> = [
  { id: 'column', name: '琉璃时柱', description: '通透的时柱，中外相映' },
  { id: 'line', name: '素笺编年', description: '淡雅的纸面，清晰的细线' },
  { id: 'scroll', name: '山河长卷', description: '卷轴与印记，铺陈历史' },
  { id: 'ribbon', name: '经纬织带', description: '双轨与几何，交织时代' },
  { id: 'minimal', name: '留白', description: '现代极简，专注文字与时间' },
  { id: 'editorial', name: '大事记', description: '黑白刊物，大年份与宋体标题' },
  { id: 'observatory', name: '观测站', description: '科学图谱，标尺与规整信息框' },
]

export function parsePillarTheme(value: unknown): PillarTheme {
  return pillarThemes.find((theme) => theme.id === value)?.id ?? DEFAULT_PILLAR_THEME
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
