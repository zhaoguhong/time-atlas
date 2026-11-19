import type { HistoryEvent, ReadingArticle } from '../types'

export type TopicEvent = Pick<
  HistoryEvent,
  'id' | 'title' | 'year' | 'dateLabel' | 'location' | 'locationNote' | 'coordinates' | 'summary'
>

// These supporting cases remain in the full event index. The adjacent links focus
// on the question of the chapter, rather than repeating every event it mentions.
const indexOnly: Record<string, readonly string[]> = {
  'opium-wars': [
    'humen-treaty',
    'yuanmingyuan',
    'beijing-treaties',
    'zongli-yamen',
    'students-abroad',
    'beiyang-fleet',
    'pyongyang-1894',
    'lushun-1894',
    'weihai-1895',
    'exams-end',
    'provincial-assemblies',
  ],
  'silk-road': ['zhangqian-second', 'ban-chao', 'completeness-turkic-dictionary'],
}

export const articleRouteLabels: Record<string, string> = {
  'silk-road': '丝路与远行路线图',
  'age-of-exploration': '大航海的三条航线图',
  'buddhist-texts-and-networks': '玄奘与鉴真的行旅图',
}

export function articleReadingLinks(
  topic: ReadingArticle,
  events: ReadonlyMap<string, TopicEvent>,
) {
  const groups = new Map<number, { eventId: string; label: string }[]>()
  for (const stop of topic.article.mapStops ?? []) {
    if (
      !events.has(stop.eventId) ||
      !(topic.guideId || topic.relatedEventIds?.includes(stop.eventId))
    )
      continue
    if (
      indexOnly[topic.id]?.includes(stop.eventId) &&
      topic.relatedEventIds?.includes(stop.eventId)
    )
      continue
    const group = groups.get(stop.afterParagraph) ?? []
    if (!group.some((link) => link.eventId === stop.eventId)) {
      group.push({ eventId: stop.eventId, label: events.get(stop.eventId)!.title })
      groups.set(stop.afterParagraph, group)
    }
  }
  return groups
}
