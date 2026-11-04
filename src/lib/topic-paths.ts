import type { Tour } from '../types'

export interface EventTopicPath {
  topic: Tour
  chapter: number
}

/** Only explicit chapter membership creates a path; shared keywords do not. */
export function indexTopicPaths(topics: readonly Tour[]) {
  const index = new Map<string, EventTopicPath[]>()
  for (const topic of topics) {
    if (!topic.chapters?.length) continue
    topic.steps.forEach((eventId, chapter) => {
      const paths = index.get(eventId) ?? []
      if (!paths.some((path) => path.topic.id === topic.id)) paths.push({ topic, chapter })
      index.set(eventId, paths)
    })
  }
  return index
}
