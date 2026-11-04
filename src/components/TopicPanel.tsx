import { formatEventDate, MAX_YEAR } from '../lib/history'
import { ArrowRight, Compass } from 'lucide-react'
import type { TopicProgress } from '../lib/reading-progress'
import type { Tour, HistoryEvent } from '../types'
import Sources from './Sources'

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
        每一章同步切换阅读年份，并提供地理观察提示。可以按顺序学习，也可以直接打开感兴趣的一章。
        {topic.steps.some((id) => eventById.get(id)!.year > MAX_YEAR) &&
          '1912年后的章节在时空柱中阅读；历史疆域地图仍止于1912年。'}
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
      <Sources sources={topic.sources ?? []} title="专题参考资料" />
    </article>
  )
}
