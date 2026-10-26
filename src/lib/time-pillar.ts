import type { HistoryEvent, HistoryRegion } from '../types'
import {
  compactYear,
  fromOrdinal,
  PILLAR_MAX_YEAR as MAX_YEAR,
  MIN_YEAR,
  toOrdinal,
} from './history'

export type PillarSide = 'compare' | 'china' | 'world'
// Keep the source's primary date; axis-conversion and contextual notes stay in the reader.
export const pillarDateLabel = (event: HistoryEvent) =>
  (event.dateLabel ?? `${compactYear(event.year)}年`)
    .split(/\s*·\s*/)[0]
    .replace(/\s+/g, '')
    .replace(/公元前/g, '前')

export const historyRegions: Record<HistoryRegion, string> = {
  china: '中国',
  europe: '欧洲',
  'west-asia': '西亚',
  'central-asia': '中亚',
  'south-asia': '南亚',
  'east-asia': '东亚其他地区',
  'southeast-asia': '东南亚',
  africa: '非洲',
  americas: '美洲',
  oceania: '大洋洲',
}
const existingWorld: Record<string, HistoryRegion> = {
  'gobekli-tepe': 'west-asia',
  'jericho-neolithic': 'west-asia',
  catalhoyuk: 'west-asia',
  'choirokoitia-village': 'west-asia',
  'kuk-early-farming': 'oceania',
  'sannai-maruyama': 'east-asia',
  'uruk-city': 'west-asia',
  'uruk-writing': 'west-asia',
  'egypt-unification': 'africa',
  'dholavira-city': 'south-asia',
  'moenjodaro-city': 'south-asia',
  'caral-city': 'americas',
  'skara-brae': 'europe',
  'djoser-step-pyramid': 'africa',
  'khufu-pyramid': 'africa',
}
export const eventRegion = (event: HistoryEvent): HistoryRegion =>
  event.region ?? existingWorld[event.id] ?? 'china'
export const pillarMatches = (event: HistoryEvent, side: PillarSide, region: string) => {
  const r = eventRegion(event)
  return (
    (side === 'compare' || (side === 'china' ? r === 'china' : r !== 'china')) &&
    (r === 'china' || region === 'all' || r === region)
  )
}
export const MIN_SPAN = 4
export const MAX_SPAN = toOrdinal(MAX_YEAR) - toOrdinal(MIN_YEAR)
export const clampSpan = (span: number) =>
  Number.isFinite(span) ? Math.min(MAX_SPAN, Math.max(MIN_SPAN, span)) : 600
export function pillarWindow(year: number, span: number) {
  span = clampSpan(span)
  const bottom = Math.max(
    toOrdinal(MIN_YEAR),
    Math.min(toOrdinal(MAX_YEAR) - span, toOrdinal(year) - span / 2),
  )
  return { bottom, top: bottom + span, span }
}
export function pillarTicks(bottom: number, top: number, height: number) {
  const rough = (top - bottom) / Math.max(2, Math.floor(height / 90))
  const power = 10 ** Math.floor(Math.log10(Math.max(1, rough)))
  const step =
    [1, 2, 2.5, 5, 10].map((n) => Math.ceil(n * power)).find((n) => n >= rough) ?? power * 10
  const ticks: number[] = []
  for (let n = Math.ceil(fromOrdinal(bottom) / step) * step; n <= fromOrdinal(top); n += step) {
    const year = n === 0 ? 1 : n
    if (toOrdinal(year) >= bottom && toOrdinal(year) <= top) ticks.push(year)
  }
  return ticks
}
// Editorial landmarks only break ties within the existing importance level.
// Dates, event content and map rankings remain unchanged.
const landmarks = new Set([
  'liangzhu-city',
  'shang-begins',
  'muye',
  'zhou-east',
  'kongzi-teaching',
  'shangyang',
  'qin-unifies',
  'han-founded',
  'zhangqian',
  'eastern-han',
  'chibi',
  'jin-unifies',
  'sui-unifies',
  'tang-founded',
  'an-lushan',
  'song-founded',
  'jingkang',
  'yuan-founded',
  'ming-founded',
  'qing-enters',
  'opium-war',
  'xinhai',
  'republic-founded',
  'uruk-writing',
  'egypt-unification',
  'moenjodaro-city',
  ...[
    'hammurabi',
    'cyrus',
    'athens',
    'buddhism',
    'alexander',
    'augustus',
    'west-rome',
    'hijra',
    'abbasid',
    'charlemagne',
    'mansa-musa',
    'black-death',
    'renaissance',
    'ottoman-constantinople',
    'columbus',
    'reformation',
    'newton',
    'industrial',
    'french-revolution',
    'meiji',
    'berlin-africa',
  ].map((id) => `world-${id}`),
])
export interface PillarCard {
  event: HistoryEvent
  y: number
  anchorY: number
  side: 'china' | 'world'
  hidden: HistoryEvent[]
}
/** Importance-first packing; all omitted records remain reachable in their nearest cluster. */
export function layoutPillar(
  events: HistoryEvent[],
  year: number,
  span: number,
  height: number,
  cardHeight: number,
  side: PillarSide,
  selectedId?: string,
  gap = 10,
): PillarCard[] {
  return layoutPillarWindow(
    events,
    pillarWindow(year, span),
    height,
    cardHeight,
    side,
    selectedId,
    gap,
    year,
  )
}

/** Pack an explicit time tile without clamping its scale at the history boundaries. */
export function layoutPillarWindow(
  events: HistoryEvent[],
  window: { bottom: number; top: number; span: number },
  height: number,
  cardHeight: number,
  side: PillarSide,
  selectedId?: string,
  gap = 10,
  year = fromOrdinal((window.bottom + window.top) / 2),
): PillarCard[] {
  const { bottom, top } = window
  const visible = events.filter(
    (e) => toOrdinal(e.year) <= top && toOrdinal(e.endYear ?? e.year) >= bottom,
  )
  const result: PillarCard[] = []
  const lanes =
    side === 'compare' ? (['world', 'china'] as const) : ([side] as ('world' | 'china')[])
  for (const lane of lanes) {
    const candidates = visible.filter(
      (e) => (eventRegion(e) === 'china' ? 'china' : 'world') === lane,
    )
    const cards: PillarCard[] = []
    const anchor = (e: HistoryEvent) =>
      Math.max(0, Math.min(height, ((top - toOrdinal(e.year)) / (top - bottom)) * height))
    const ranked = [...candidates].sort(
      (a, b) =>
        Number(b.id === selectedId) - Number(a.id === selectedId) ||
        b.importance - a.importance ||
        Number(landmarks.has(b.id)) - Number(landmarks.has(a.id)) ||
        Math.abs(a.year - year) - Math.abs(b.year - year) ||
        a.year - b.year ||
        a.id.localeCompare(b.id),
    )
    const capacity = Math.max(1, Math.floor((height + gap) / (cardHeight + gap)))
    while (ranked.length && cards.length < capacity) {
      // Spread equally important landmarks across the window instead of filling
      // the middle with one dense era. A lower importance cannot displace a higher one.
      const score = (e: HistoryEvent) =>
        Number(e.id === selectedId) * 10000 +
        e.importance * 200 +
        Number(landmarks.has(e.id)) * 20 +
        (cards.length
          ? (Math.min(...cards.map((c) => Math.abs(c.anchorY - anchor(e)))) / height) * 80
          : 0)
      ranked.sort(
        (a, b) =>
          score(b) - score(a) ||
          Math.abs(a.year - year) - Math.abs(b.year - year) ||
          a.id.localeCompare(b.id),
      )
      const event = ranked.shift()!
      const proposed: PillarCard[] = [
        ...cards.map((c) => ({ ...c })),
        { event, anchorY: anchor(event), y: 0, side: lane, hidden: [] },
      ].sort((a, b) => a.anchorY - b.anchorY || a.event.id.localeCompare(b.event.id))
      proposed.forEach((c, i) => {
        const desired = Math.max(cardHeight / 2, Math.min(height - cardHeight / 2, c.anchorY))
        c.y = Math.max(desired, i ? proposed[i - 1].y + cardHeight + gap : cardHeight / 2)
      })
      for (let i = proposed.length - 1; i >= 0; i--) {
        proposed[i].y = Math.min(
          proposed[i].y,
          i === proposed.length - 1
            ? height - cardHeight / 2
            : proposed[i + 1].y - cardHeight - gap,
        )
      }
      if (
        proposed.every(
          (c) =>
            c.y >= cardHeight / 2 &&
            Math.abs(
              c.y - Math.max(cardHeight / 2, Math.min(height - cardHeight / 2, c.anchorY)),
            ) <=
              cardHeight * 1.1,
        )
      ) {
        cards.splice(0, cards.length, ...proposed)
      }
    }
    const chosen = new Set(cards.map((c) => c.event.id))
    for (const event of candidates) {
      if (chosen.has(event.id)) continue
      const nearest = [...cards].sort(
        (a, b) => Math.abs(anchor(event) - a.anchorY) - Math.abs(anchor(event) - b.anchorY),
      )[0]
      nearest?.hidden.push(event)
    }
    result.push(...cards.sort((a, b) => a.y - b.y))
  }
  return result
}

export function relatedReading(event: HistoryEvent, events: HistoryEvent[]) {
  const explicit = (event.relatedEvents ?? []).flatMap((relation) => {
    const target = events.find((e) => e.id === relation.id)
    return target ? [{ event: target, label: relation.label, note: relation.note }] : []
  })
  const used = new Set([event.id, ...explicit.map((r) => r.event.id)])
  const themed = events
    .filter((e) => !used.has(e.id) && e.themes?.some((t) => event.themes?.includes(t)))
    .sort((a, b) => Math.abs(a.year - event.year) - Math.abs(b.year - event.year))
    .slice(0, 3)
    .map((e) => ({ event: e, label: '同一主题', note: '主题相近，可沿这条线索继续阅读。' }))
  themed.forEach((r) => used.add(r.event.id))
  const others = events
    .filter(
      (e) =>
        !used.has(e.id) &&
        (eventRegion(e) === 'china') !== (eventRegion(event) === 'china') &&
        Math.abs(toOrdinal(e.year) - toOrdinal(event.year)) <= 30,
    )
    .sort(
      (a, b) =>
        Math.abs(a.year - event.year) - Math.abs(b.year - event.year) ||
        b.importance - a.importance,
    )
    .slice(0, 2)
    .map((e) => ({
      event: e,
      label: e.year === event.year ? '同年对照' : '相近年代',
      note: '时间对照，不表示两件事存在因果关系。',
    }))
  return [...explicit, ...themed, ...others]
}
