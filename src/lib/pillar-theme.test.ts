import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  parsePillarTheme,
  PILLAR_THEME_STORAGE_KEY,
  readPillarTheme,
  writePillarTheme,
} from './pillar-theme'

afterEach(() => vi.unstubAllGlobals())

describe('saved pillar appearance', () => {
  it('treats absent, obsolete and untrusted preferences as the default column', () => {
    for (const value of [null, undefined, '', 'dark', '__proto__', 'toString', '"night"', {}, 1])
      expect(parsePillarTheme(value)).toBe('column')
    for (const value of ['column', 'line', 'night']) expect(parsePillarTheme(value)).toBe(value)
  })

  it('retains the selected appearance without changing unrelated saved reading data', () => {
    const values = new Map([['time-atlas:v1', '{"year":1450}']])
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    })
    expect(readPillarTheme()).toBe('column')
    writePillarTheme('night')
    expect(readPillarTheme()).toBe('night')
    writePillarTheme('line')
    expect(readPillarTheme()).toBe('line')
    expect(values.get('time-atlas:v1')).toBe('{"year":1450}')
    expect([...values.keys()]).toEqual(['time-atlas:v1', PILLAR_THEME_STORAGE_KEY])
    values.set(PILLAR_THEME_STORAGE_KEY, '{"theme":"night"}')
    expect(readPillarTheme()).toBe('column')
  })

  it('still opens with the default when reading browser storage is forbidden or absent', () => {
    vi.stubGlobal('localStorage', {
      getItem() {
        throw new DOMException('Storage denied', 'SecurityError')
      },
    })
    expect(readPillarTheme()).toBe('column')
    vi.stubGlobal('localStorage', undefined)
    expect(readPillarTheme()).toBe('column')
    expect(() => writePillarTheme('night')).not.toThrow()
  })

  it('does not interrupt browsing if saving a preference reaches the storage quota', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => 'line',
      setItem() {
        throw new DOMException('Quota reached', 'QuotaExceededError')
      },
    })
    expect(() => writePillarTheme('night')).not.toThrow()
    expect(readPillarTheme()).toBe('line')
  })
})
