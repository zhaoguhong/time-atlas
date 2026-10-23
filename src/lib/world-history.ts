import type { HistoryEvent, Period } from '../types'
import { toOrdinal } from './history'

// Navigation windows only: societies do not share a single historical periodization.
export const worldPeriods: Period[] = [
  ['world-prehistory', '史前与聚落', '史前', -10000, -3501, -7000],
  ['world-civilizations', '早期文明', '早期文明', -3500, -501, -1500],
  ['world-classical', '古典时代', '古典', -500, 499, 200],
  ['world-medieval', '中古世界', '中古', 500, 999, 800],
  ['world-connections', '交流与变迁', '交流与变迁', 1000, 1499, 1200],
  ['world-oceans', '跨洋联系', '跨洋联系', 1500, 1749, 1600],
  ['world-revolutions', '革命与工业', '革命与工业', 1750, 1849, 1800],
  ['world-transformations', '帝国与变革', '帝国与变革', 1850, 1912, 1900],
].map(([id, name, short, from, to, focus]) => ({
  id: String(id),
  name: String(name),
  short: String(short),
  from: Number(from),
  to: Number(to),
  focus: Number(focus),
  color: '#658a87',
  subtitle: '世界历史 · 阅读分段',
  summary:
    '沿已收录的重要事件，比较不同地区的变化。这里的时间分段用于导航，不代表各地区有统一的历史分期。',
}))

export const worldPeriodAt = (year: number) =>
  worldPeriods.find((period) => year >= period.from && year <= period.to) ?? worldPeriods[0]

export function worldPeriodEvents(events: HistoryEvent[], year: number) {
  const period = worldPeriodAt(year)
  return events
    .filter(
      (event) =>
        toOrdinal(event.year) <= toOrdinal(period.to) &&
        toOrdinal(event.endYear ?? event.year) >= toOrdinal(period.from),
    )
    .sort((a, b) => a.year - b.year || b.importance - a.importance)
}

// Geographic reading frames, never historical borders or event filters.
export const worldRegionBounds: Record<string, [[number, number], [number, number]]> = {
  all: [
    [-175, -55],
    [180, 75],
  ],
  europe: [
    [-16, 30],
    [48, 68],
  ],
  'west-asia': [
    [24, 10],
    [64, 46],
  ],
  'central-asia': [
    [45, 28],
    [91, 56],
  ],
  'south-asia': [
    [60, 3],
    [94, 38],
  ],
  'east-asia': [
    [118, 20],
    [148, 48],
  ],
  'southeast-asia': [
    [90, -12],
    [142, 29],
  ],
  africa: [
    [-20, -36],
    [55, 39],
  ],
  americas: [
    [-170, -56],
    [-30, 74],
  ],
  // Cross the date line in a continuous Pacific frame. The map enables longitude
  // wrapping for this region, keeping Hawaii and Australasia visible on phones.
  oceania: [
    [110, -55],
    [225, 35],
  ],
}
