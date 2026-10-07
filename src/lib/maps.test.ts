import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import type { PolityFeature } from '../types'
import { activeMapFeatures, polityOrder } from './maps'

const mapData = (id: string): PolityFeature[] =>
  JSON.parse(
    readFileSync(new URL(`../../.cache/map-archives/${id}.geojson`, import.meta.url), 'utf8'),
  ).features

describe('historical map source corrections', () => {
  it('shows Wei, Shu and Wu in 230 without extending Han beyond its end', () => {
    const active = activeMapFeatures(mapData('three'), 230)
    const names = new Set(active.map((feature) => feature.properties.name))
    expect(names.has('Han Dynasty')).toBe(false)
    for (const name of ['Cao Wei', 'Shu Han', 'Eastern Wu']) expect(names.has(name)).toBe(true)
    const legend = [...new Map(active.map((f) => [f.properties.name, f.properties])).values()].sort(
      polityOrder,
    )
    expect(legend.slice(0, 3).map((p) => p.name)).toEqual(
      expect.arrayContaining(['Cao Wei', 'Shu Han', 'Eastern Wu']),
    )
  })
  it('discloses display-name corrections while preserving the original records', () => {
    const source = mapData('jin')
    const before = JSON.stringify(source)
    const jin = activeMapFeatures(source, 350).find((f) => f.properties.name === 'Western Jin')!
    expect(jin.properties.nameZh).toBe('东晋')
    expect(jin.properties.displayNote).toContain('原始名称和时间区间保留')
    expect(JSON.stringify(source)).toBe(before)
    const wu = activeMapFeatures(mapData('han'), 208).find(
      (f) => f.properties.name === 'Eastern Wu',
    )!
    expect(wu.properties.nameZh).toBe('孙氏势力')
    expect(wu.properties.name).toBe('Eastern Wu')
  })
  it('keeps source qualifications in details rather than ancient map names', () => {
    for (const [period, year, original, label] of [
      ['shang', -1200, 'Shang Dynasty', '商'],
      ['western-zhou', -1000, 'Zhou Dynasty', '周'],
      ['spring', -500, 'Later Zhou', '周王室'],
    ] as const) {
      const source = mapData(period)
      const before = JSON.stringify(source)
      const displayed = activeMapFeatures(source, year).find((f) => f.properties.name === original)!
      expect(displayed).toBeDefined()
      expect(displayed.properties.nameZh).toBe(label)
      expect(displayed.properties.displayNote).toMatch(/来源|原始记录/)
      expect(JSON.stringify(source)).toBe(before)
    }
  })
  it('does not present a combined period polygon as a single dynasty', () => {
    const source = mapData('song')
    const combined = source.find(
      (feature) => feature.properties.name === '(Five Dynasties and Ten Kingdoms)',
    )!
    const displayed = activeMapFeatures(source, 960).find(
      (feature) => feature.properties.id === combined.properties.id,
    )!
    expect(displayed.properties.nameZh).toBe('五代十国')
    expect(displayed.properties.displayNote).toContain('不是一个统一政权')
    expect(displayed.geometry).toEqual(combined.geometry)
    expect(displayed.properties.from).toBe(combined.properties.from)
    expect(combined.properties.nameZh).toBe('(Five Dynasties and Ten Kingdoms)')
  })
})
