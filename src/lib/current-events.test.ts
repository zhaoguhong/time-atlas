import { describe, expect, it } from 'vitest'
import { events, eventById } from '../data/content'
import { civilizationEvents } from '../data/civilizations'
import { eventsAtYear } from './current-events'
import { MIN_YEAR, periodAt } from './history'

describe('chronological map reading', () => {
  it('spotlights actual events without pulling future events into the current year', () => {
    expect(eventsAtYear(events, 1894)[0].id).toBe('sino-japanese')
    expect(eventsAtYear(events, 1893).some((e) => e.id === 'sino-japanese')).toBe(false)
    expect(eventsAtYear(events, 1895).some((e) => e.id === 'shimonoseki')).toBe(true)
  })
  it('keeps archaeological intervals visible and preserves their dating caveats', () => {
    expect(MIN_YEAR).toBe(-10000)
    expect(periodAt(-7000).id).toBe('prehistory')
    expect(periodAt(-3000).id).toBe('early-civilizations')
    const liangzhu = eventById.get('liangzhu-city')!
    expect(eventsAtYear(events, -3000)).toContain(liangzhu)
    expect(eventsAtYear(events, -2200)).not.toContain(liangzhu)
    for (const e of civilizationEvents) {
      expect(e.sources.length).toBeGreaterThan(0)
      expect(e.dateNote).toBeTruthy()
      expect(e.locationNote).toBeTruthy()
      expect(e.background).toBeTruthy()
      expect(e.impact).toBeTruthy()
      expect(e.details?.join('').length).toBeGreaterThan(80)
      expect(e.people).toEqual([])
    }
  })
})
