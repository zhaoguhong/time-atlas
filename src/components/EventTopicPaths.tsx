import { ArrowRight } from 'lucide-react'
import type { EventTopicPath } from '../lib/topic-paths'
import '../topic-paths.css'

export default function EventTopicPaths({
  paths,
  activeTopicId,
  onRead,
}: {
  paths: EventTopicPath[]
  activeTopicId?: string
  onRead: (topicId: string, chapter: number) => void
}) {
  const available = paths.filter((path) => path.topic.id !== activeTopicId)
  if (!available.length) return null
  return (
    <section className="event-topic-paths" aria-label="相关专题阅读路径">
      <span className="eyebrow">把这一篇放回更长的历史中</span>
      <h3>沿专题继续读</h3>
      {available.map(({ topic, chapter }) => (
        <button
          key={topic.id}
          aria-label={`从本章进入专题：${topic.name}`}
          onClick={() => onRead(topic.id, chapter)}
        >
          <span>
            <small>
              共 {topic.steps.length} 章 · 本篇在第 {chapter + 1} 章
            </small>
            <strong>{topic.name}</strong>
            <span>{topic.question}</span>
          </span>
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      ))}
    </section>
  )
}
