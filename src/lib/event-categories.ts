import type { Category, HistoryEvent } from '../types'
import { eventTopics } from '../data/event-topics'

export type EventCategory = Category | keyof typeof eventTopics
export type EventCategoryFilter = '全部' | EventCategory

// One level: a topic can be selected directly without first choosing a parent.
export const eventCategories: readonly EventCategoryFilter[] = [
  '全部',
  '战争',
  '政治',
  '哲学',
  '宗教',
  '文学艺术',
  '科技医学',
  '教育学术',
  '经济贸易',
  '工程建筑',
  '文化',
  '交流',
  '社会',
]
const topicIds = new Map<string, ReadonlySet<string>>(
  Object.entries(eventTopics).map(([topic, ids]) => [topic, new Set<string>(ids)]),
)
export function parseEventCategory(value: string | null): EventCategoryFilter {
  return eventCategories.includes(value as EventCategoryFilter)
    ? (value as EventCategoryFilter)
    : '全部'
}
export function matchesEventCategory(
  event: Pick<HistoryEvent, 'id' | 'category' | 'themes'>,
  category: EventCategoryFilter,
): boolean {
  return (
    category === '全部' ||
    event.category === category ||
    event.themes?.includes(category) === true ||
    !!topicIds.get(category)?.has(event.id)
  )
}
