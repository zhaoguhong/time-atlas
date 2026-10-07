import { formatEventDate } from '../lib/history'
import { readingSourceUrl } from '../lib/source-links'
import { ArrowRight, BookOpen, Compass } from 'lucide-react'
import type { TopicProgress } from '../lib/reading-progress'
import type { Tour, HistoryEvent } from '../types'

export default function TopicPanel({
  topic,
  eventById,
  onChapter,
  progress,
  onResume,
}: {
  topic: Tour
  eventById: Map<string, HistoryEvent>
  onChapter: (index: number) => void
  progress?: TopicProgress
  onResume: () => void
}) {
  return (
    <article className="topic-introduction">
      <span className="eyebrow">历史专题 · 导读</span>
      <h2>{topic.name}</h2>
      <p className="topic-question">{topic.question}</p>
      {(topic.introduction ?? [topic.description]).map((text, index) => (
        <p key={index}>{text}</p>
      ))}
      <button className="outline-action" onClick={() => onChapter(0)}>
        <Compass size={16} />
        开始地图学习
        <ArrowRight size={15} />
      </button>
      {progress && (
        <div className="resume-reading">
          <p>
            已读 {progress.read.filter((step) => step < topic.steps.length).length} /{' '}
            {topic.steps.length} 章；打开章节不会自动标记为已读。
          </p>
          <button onClick={onResume}>
            继续第 {Math.min(topic.steps.length, progress.lastStep + 1)} 章<ArrowRight size={15} />
          </button>
        </div>
      )}
      <h3>学习路径 · {topic.steps.length} 章</h3>
      <p className="topic-reading-help">
        每一章同步切换历史年份，标出专题相关地点，并说明应该观察什么。可以按顺序学习，也可以直接打开感兴趣的一章。
      </p>
      <ol className="topic-chapter-list">
        {topic.steps.map((id, index) => {
          const event = eventById.get(id)!
          return (
            <li key={id}>
              <button onClick={() => onChapter(index)}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <small>
                    {formatEventDate(event)} · {event.location}
                  </small>
                  <strong>
                    {event.title}
                    {progress?.read.includes(index) && (
                      <small className="chapter-read-mark">已读</small>
                    )}
                  </strong>
                  <p>{topic.chapters?.[index]?.explanation}</p>
                </div>
                <ArrowRight size={14} />
              </button>
            </li>
          )
        })}
      </ol>
      {topic.conclusion && (
        <div className="topic-conclusion">
          <h3>读完后再想一想</h3>
          <p>{topic.conclusion}</p>
        </div>
      )}
      {topic.sources && (
        <div className="reference-list">
          <span className="eyebrow">专题参考资料</span>
          {topic.sources.map((source) => (
            <a
              key={source.url}
              href={readingSourceUrl(source.url)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookOpen size={14} />
              <span>{source.title}</span>
            </a>
          ))}
        </div>
      )}
    </article>
  )
}
