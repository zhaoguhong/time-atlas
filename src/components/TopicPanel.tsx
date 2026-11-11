import { lazy, Suspense, useState } from 'react'
import { formatEventDate, MAX_YEAR } from '../lib/history'
import { ArrowRight, Compass } from 'lucide-react'
import type { TopicProgress } from '../lib/reading-progress'
import type { Tour, HistoryEvent } from '../types'
import Sources from './Sources'
import CanvasBoundary from './CanvasBoundary'
import '../topic-routes.css'
const TopicRouteReader = lazy(() => import('./TopicRouteReader'))

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
  const [routeOpen, setRouteOpen] = useState(false)
  return (
    <article className="topic-introduction">
      <span className="eyebrow">历史专题{topic.subject ? ` · ${topic.subject}` : ' · 导读'}</span>
      <h2>{topic.name}</h2>
      <p className="topic-question">{topic.question}</p>
      {(topic.introduction ?? [topic.description]).map((text, index) => (
        <p key={index}>{text}</p>
      ))}
      {topic.routeIds?.length ? (
        <div className="topic-route-entry">
          <p>想看看途中经过哪里，可以打开路线地图，逐站阅读后再回来继续。</p>
          <button className="outline-action" onClick={() => setRouteOpen(true)}>
            <Compass size={16} />
            查看路线地图
            <ArrowRight size={15} />
          </button>
          {routeOpen && (
            <CanvasBoundary onRetry={() => window.location.reload()}>
              <Suspense fallback={<p role="status">正在打开路线…</p>}>
                <TopicRouteReader
                  key={topic.id}
                  routeIds={topic.routeIds}
                  onClose={() => setRouteOpen(false)}
                />
              </Suspense>
            </CanvasBoundary>
          )}
        </div>
      ) : null}
      {topic.article && (
        <section className="topic-article" aria-label="专题讲解">
          {topic.article.paragraphs.map((paragraph, index) => (
            <div key={index}>
              {topic.article?.headings?.[index] && <h3>{topic.article.headings[index]}</h3>}
              <p>{paragraph}</p>
              {topic.article?.mapStops
                ?.filter((stop) => stop.afterParagraph === index)
                .map((stop) => (
                  <button
                    key={stop.eventId}
                    className="outline-action topic-map-stop"
                    onClick={() => onChapter(topic.steps.indexOf(stop.eventId))}
                  >
                    <Compass size={16} />
                    {stop.label}
                    <ArrowRight size={15} />
                  </button>
                ))}
            </div>
          ))}
          <div className="topic-conclusion">
            <p>{topic.conclusion}</p>
          </div>
          <p className="topic-reading-help">沿下面的史事继续阅读，可以查看相关地点、人物和出处。</p>
        </section>
      )}
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
      {topic.conclusion && !topic.article && (
        <div className="topic-conclusion">
          <h3>读完后再想一想</h3>
          <p>{topic.conclusion}</p>
        </div>
      )}
      <Sources sources={topic.sources ?? []} title="专题参考资料" />
    </article>
  )
}
