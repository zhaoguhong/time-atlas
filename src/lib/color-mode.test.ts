import { afterEach, describe, expect, it, vi } from 'vitest'
import { COLOR_MODE_STORAGE_KEY, readColorMode, savedColorMode } from './color-mode'

afterEach(() => vi.unstubAllGlobals())
function system(dark: boolean) {
  vi.stubGlobal('window', { matchMedia: () => ({ matches: dark }) })
}
describe('global color preference', () => {
  it('retains a legacy night choice when migration cannot save a new preference', () => {
    system(false)
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => (key === 'time-atlas:pillar-theme:v1' ? 'night' : null),
    })
    expect(readColorMode()).toBe('dark')
  })
  it('uses an explicit choice ahead of the operating-system preference', () => {
    system(true)
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => (key === COLOR_MODE_STORAGE_KEY ? 'light' : null),
    })
    expect(readColorMode()).toBe('light')
    system(false)
    vi.stubGlobal('localStorage', { getItem: () => 'dark' })
    expect(readColorMode()).toBe('dark')
  })
  it('follows the system for absent or invalid settings', () => {
    for (const value of [null, '', 'night', '__proto__', '{"mode":"dark"}']) {
      vi.stubGlobal('localStorage', { getItem: () => value })
      expect(savedColorMode()).toBeNull()
      system(true)
      expect(readColorMode()).toBe('dark')
      system(false)
      expect(readColorMode()).toBe('light')
    }
  })
  it('still selects a usable system appearance when storage is unavailable', () => {
    system(true)
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new DOMException('Denied', 'SecurityError')
      },
    })
    expect(readColorMode()).toBe('dark')
    vi.stubGlobal('localStorage', undefined)
    expect(readColorMode()).toBe('dark')
  })
})
