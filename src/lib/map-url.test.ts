import { expect, test } from 'vitest'
import { mapUrl } from './map-url'
import { breadcrumbData } from './seo'

test('default homepage is bare while deliberate map views preserve sharing context', () => {
  const defaults = new URLSearchParams(
    'year=230&scope=nearby&view=events&category=全部&cities=1&events=1',
  )
  expect(mapUrl('/', defaults)).toBe('/')
  defaults.set('lng', '109.5')
  defaults.set('lat', '34.5')
  defaults.set('zoom', '2.65')
  expect(mapUrl('/atlas/', defaults)).toBe('/atlas/')
  defaults.set('year', '-100')
  const url = new URL(mapUrl('/', defaults), 'https://example.com')
  const shared = new URLSearchParams(url.hash.slice(1))
  expect(shared.get('year')).toBe('-100')
  expect(shared.get('cities')).toBe('1')
  expect(shared.get('scope')).toBe('nearby')
  expect(shared.get('lng')).toBe('109.5')
  expect(shared.has('category')).toBe(false)
  defaults.set('year', '230')
  defaults.append('hide', 'Tang')
  expect(mapUrl('/', defaults)).toContain('hide=Tang')
})

test('breadcrumbs describe the current record and support subdirectory hosting', () => {
  const data = breadcrumbData(
    '/atlas/polities/roman-empire/',
    '罗马帝国',
    'https://example.com/atlas/',
  )
  expect(data.itemListElement.map((item) => item.item)).toEqual([
    'https://example.com/atlas/',
    'https://example.com/atlas/polities/',
    'https://example.com/atlas/polities/roman-empire/',
  ])
  expect(data.itemListElement.map((item) => item.position)).toEqual([1, 2, 3])
})
