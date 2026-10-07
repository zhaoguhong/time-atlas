import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { events, eventById } from '../data/content'
import { periods } from '../data/periods'
import { timelineLabels, groupTimelineEvents } from './markers'
import { activeMapFeatures } from './maps'
import { readingSourceUrl } from './source-links'
import { journeyMotionProgress } from './playback'
import { eventsInScope, formatEventDate, MIN_YEAR, periodAt } from './history'
const mapData = (id: string) =>
  JSON.parse(
    readFileSync(new URL(`../../.cache/map-archives/${id}.geojson`, import.meta.url), 'utf8'),
  ).features

describe('larger historical workspace', () => {
  it('retains Xia and keeps early dates, intervals and map uncertainty explicit', () => {
    expect(MIN_YEAR).toBe(-10000)
    expect(periods.slice(2, 6).map((p) => p.id)).toEqual(['xia', 'shang', 'western-zhou', 'spring'])
    expect(periodAt(-1046).id).toBe('western-zhou')
    expect(formatEventDate(eventById.get('erlitou-centre')!)).toContain('约')
    expect(eventsInScope(events, -1650, 'year').some((e) => e.id === 'erlitou-centre')).toBe(true)
    expect(
      activeMapFeatures(mapData('western-zhou'), -1046).some(
        (f) => f.properties.name === 'Shang Dynasty',
      ),
    ).toBe(false)
    expect(
      activeMapFeatures(mapData('spring'), -651).find((f) => f.properties.name === 'Later Zhou')
        ?.properties.nameZh,
    ).toContain('周王室')
    expect(
      mapData('xia').some((f: { properties: { name: string } }) => /Xia/.test(f.properties.name)),
    ).toBe(false)
  })
  it('preserves historic polygons outside the earlier East Asian crop', () => {
    const ancient = activeMapFeatures(mapData('three'), 230)
    expect(
      ancient.some((f) => f.properties.name === 'Roman Empire' && f.properties.label[0] < 40),
    ).toBe(true)
    expect(ancient.some((f) => f.properties.label[0] < -30)).toBe(true)
    const modern = activeMapFeatures(mapData('qing'), 1840)
    expect(modern.some((f) => f.properties.name === 'United States of America')).toBe(true)
    expect(modern.some((f) => f.properties.label[1] < -12)).toBe(true)
  })
  it('fits sparse labels, reserves the selected event, and never moves date pins', () => {
    const data = [0, 1, 2, 50, 99].map((year, i) => ({
      ...events[0],
      id: String(i),
      year: year + 1,
      title: '重要历史事件' + i,
      importance: 3,
    }))
    const groups = groupTimelineEvents(data, 1, 100, 360)
    const before = JSON.stringify(groups)
    const labels = timelineLabels(groups, 360, '3')
    expect([...labels.values()].some((label) => label.event.id === '3')).toBe(true)
    const ordered = [...labels.values()].sort((a, b) => a.left - b.left)
    ordered.forEach((label, i) => {
      expect(label.left).toBeGreaterThanOrEqual(0)
      expect(label.left + label.width).toBeLessThanOrEqual(360)
      if (i)
        expect(label.left).toBeGreaterThanOrEqual(ordered[i - 1].left + ordered[i - 1].width + 10)
    })
    expect(JSON.stringify(groups)).toBe(before)
    expect(groups.flatMap((g) => g.events)).toHaveLength(5)
    expect(timelineLabels(groups, 1000).size).toBeGreaterThanOrEqual(labels.size)
  })
  it('uses simplified display variants without changing source identities or anchors', () => {
    const original = 'https://zh.wikisource.org/wiki/史記/卷002?oldid=123#禹'
    const simplified = new URL(readingSourceUrl(original))
    expect(decodeURI(simplified.pathname)).toBe('/zh-hans/史記/卷002')
    expect(simplified.searchParams.get('oldid')).toBe('123')
    expect(decodeURI(simplified.hash)).toBe('#禹')
    expect(readingSourceUrl('https://zh.wikipedia.org/zh-tw/夏朝')).toContain('/zh-hans/')
    expect(
      readingSourceUrl('https://zh.wikisource.org/w/index.php?title=史記&oldid=123'),
    ).toContain('variant=zh-hans')
    expect(readingSourceUrl('https://www.dpm.org.cn/court/lineage/226256.html')).toBe(
      'https://www.dpm.org.cn/court/lineage/226256.html',
    )
    expect(original).toContain('/wiki/')
  })
  it('eases only the illustrative journey while retaining endpoint reading pauses', () => {
    expect(journeyMotionProgress(0.1)).toBe(0)
    expect(journeyMotionProgress(0.5)).toBeCloseTo(0.5)
    expect(journeyMotionProgress(0.9)).toBe(1)
    let previous = 0
    for (let n = 0; n <= 100; n++) {
      const p = journeyMotionProgress(n / 100)
      expect(p).toBeGreaterThanOrEqual(previous)
      expect(p).toBeLessThanOrEqual(1)
      previous = p
    }
  })
})
