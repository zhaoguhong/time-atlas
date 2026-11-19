import type { Tour } from '../types'

export const topicDirectoryLayouts = [
  { id: 'cards', label: '图文卡片' },
  { id: 'list', label: '紧凑列表' },
  { id: 'directory', label: '分类目录' },
] as const

export type TopicDirectoryLayout = (typeof topicDirectoryLayouts)[number]['id']
export interface TopicDirectoryPreferences {
  layout: TopicDirectoryLayout
  subject: string
  query: string
}

export const topicDirectoryStorageKey = 'time-atlas:topic-directory:v1'
const defaults: TopicDirectoryPreferences = { layout: 'cards', subject: '全部', query: '' }

export function readTopicDirectoryPreferences(): TopicDirectoryPreferences {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(topicDirectoryStorageKey) ?? 'null')
    if (!saved || typeof saved !== 'object') return { ...defaults }
    const value = saved as Partial<TopicDirectoryPreferences>
    return {
      layout: topicDirectoryLayouts.some((layout) => layout.id === value.layout)
        ? value.layout!
        : defaults.layout,
      subject: typeof value.subject === 'string' ? value.subject.slice(0, 80) : defaults.subject,
      query: typeof value.query === 'string' ? value.query.slice(0, 160) : defaults.query,
    }
  } catch {
    return { ...defaults }
  }
}

export function writeTopicDirectoryPreferences(value: TopicDirectoryPreferences) {
  try {
    localStorage.setItem(topicDirectoryStorageKey, JSON.stringify(value))
  } catch {
    // Browsing and filtering remain available when storage is unavailable.
  }
}

export function topicMatchesQuery(
  topic: Pick<Tour, 'name' | 'description' | 'question' | 'subject'> & {
    searchTerms?: string[]
    article?: { headings?: Record<number, string> }
  },
  query: string,
) {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean)
  const text = [
    topic.name,
    topic.description,
    topic.question,
    topic.subject,
    ...(topic.searchTerms ?? []),
    ...Object.values(topic.article?.headings ?? {}),
  ]
    .join(' ')
    .toLocaleLowerCase()
  return terms.every((term) => text.includes(term))
}

/** Approximate article length; the related event records are separate reading. */
export function topicReadingStats<
  T extends Pick<Tour, 'introduction' | 'description' | 'conclusion'> & {
    article?: { paragraphs: string[]; headings?: Record<number, string> }
  },
>(topic: T) {
  const text = [
    ...(topic.introduction ?? [topic.description]),
    ...Object.values(topic.article?.headings ?? {}),
    ...(topic.article?.paragraphs ?? []),
    topic.conclusion ?? '',
  ].join('')
  const characters = text.match(/[\p{L}\p{N}]/gu)?.length ?? 0
  return { characters, minutes: Math.max(1, Math.ceil(characters / 350)) }
}
