import { useRef, useState, type RefObject } from 'react'
import { formatEventDate, MAX_YEAR } from '../lib/history'
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  ChevronDown,
  Compass,
  Expand,
  List,
  Share2,
  X,
} from 'lucide-react'
import type { TopicProgress } from '../lib/reading-progress'
import { articleUrl } from '../lib/article-url'
import { topicReadingStats } from '../lib/topic-directory'
import {
  articleReadingLinks,
  articleRouteLabels,
  type TopicEvent,
} from '../lib/topic-reading-presentation'
import { useTopicPosition, type TopicPosition } from '../hooks/use-topic-position'
import type { ArticleMedia, ReadingArticle } from '../types'
import type { TopicRoute } from '../data/topic-routes'
import Sources from './Sources'
import '../topic-routes.css'
import ArticleMapFigure from './ArticleMapFigure'
import ArticleRouteFigure from './ArticleRouteFigure'

function ArticleFigure({ media }: { media: ArticleMedia }) {
  const [failed, setFailed] = useState(false)
  const [enlarged, setEnlarged] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const previewRef = useRef<HTMLButtonElement>(null)
  const src = /^(https?:|data:|blob:|\/)/.test(media.src)
    ? media.src
    : `${import.meta.env.BASE_URL}${media.src.replace(/^\/+/, '')}`
  const caption = (
    <>
      <span>{media.caption}</span>
      {(media.aiGenerated || media.credit || media.sourceUrl) && (
        <small>
          {media.aiGenerated && <span className="topic-image-kind">AI生成示意图</span>}
          {media.sourceUrl ? (
            <a href={media.sourceUrl} target="_blank" rel="noopener noreferrer">
              {media.credit ?? '图片来源'} ↗
            </a>
          ) : (
            media.credit && <span>{media.credit}</span>
          )}
        </small>
      )}
    </>
  )
  return (
    <figure className="topic-article-figure" data-article-block={`media-${media.id}`}>
      {failed ? (
        <div className="topic-image-fallback" role="status">
          <p>{media.alt}</p>
          <button className="outline-action" onClick={() => setFailed(false)}>
            重新加载图片
          </button>
        </div>
      ) : (
        <button
          ref={previewRef}
          className="topic-image-preview"
          aria-label={`放大查看图片：${media.alt}`}
          aria-haspopup="dialog"
          onClick={() => {
            setEnlarged(true)
            if (!dialogRef.current?.open) dialogRef.current?.showModal()
          }}
        >
          <img
            src={src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
          <span>
            <Expand size={14} />
            放大查看图片
          </span>
        </button>
      )}
      <figcaption>{caption}</figcaption>
      <dialog
        ref={dialogRef}
        className="topic-image-dialog"
        aria-label={`图片详情：${media.alt}`}
        onClose={() => {
          setEnlarged(false)
          previewRef.current?.focus({ preventScroll: true })
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current.close()
        }}
      >
        <div className="topic-image-dialog-toolbar">
          <span>原尺寸图片 · 可滚动查看细节</span>
          <button
            className="icon-button"
            aria-label="关闭图片，返回文章"
            onClick={() => dialogRef.current?.close()}
          >
            <X size={20} />
          </button>
        </div>
        <div className="topic-image-canvas" role="region" aria-label="图片细节" tabIndex={0}>
          {enlarged && (
            <img
              src={src}
              alt={media.alt}
              width={media.width}
              height={media.height}
              style={{ width: media.width, height: 'auto' }}
            />
          )}
        </div>
        <div className="topic-image-dialog-caption">{caption}</div>
      </dialog>
    </figure>
  )
}

export default function TopicPanel({
  topic,
  openingPosition,
  routes,
  eventById,
  onEvent,
  progress,
  onResume,
  panelRef,
  onLibrary,
  bookmarked,
  onBookmark,
  onShare,
  onMapOverview,
}: {
  topic: ReadingArticle
  openingPosition?: TopicPosition | null
  routes: Pick<TopicRoute, 'id' | 'name' | 'period'>[]
  eventById: ReadonlyMap<string, TopicEvent>
  onEvent: (eventId: string) => void
  progress?: TopicProgress
  onResume?: () => void
  panelRef: RefObject<HTMLDivElement | null>
  onLibrary: () => void
  bookmarked: boolean
  onBookmark: () => void
  onShare: () => void
  onMapOverview?: () => void
}) {
  const linksByParagraph = articleReadingLinks(topic, eventById)
  const indexStorageKey = `time-atlas:topic-event-index:v1:${topic.id}`
  const [eventsOpen, setEventsOpen] = useState(() => {
    try {
      return sessionStorage.getItem(indexStorageKey) === 'open'
    } catch {
      return false
    }
  })
  function expandEvents(open: boolean) {
    setEventsOpen(open)
    try {
      sessionStorage.setItem(indexStorageKey, open ? 'open' : 'closed')
    } catch {
      /* Reading works without storage. */
    }
  }
  const [contentsOpen, setContentsOpen] = useState(false)
  const articleRef = useRef<HTMLElement>(null)
  const contentsToggleRef = useRef<HTMLButtonElement>(null)
  useTopicPosition(topic.id, articleRef, panelRef, openingPosition)
  const related = (topic.relatedEventIds ?? []).flatMap((id, step) => {
    const event = eventById.get(id)
    return event ? [{ event, step }] : []
  })
  const hasOverview = !!topic.mapOverview && !!onMapOverview
  const hasSources = !!topic.sources?.length
  const hasProgress = !!topic.guideId && !!progress && related.length > 0
  const resumeStep = progress ? Math.min(related.length - 1, Math.max(0, progress.lastStep)) : 0
  const sections = Object.entries(topic.article.headings ?? {}).map(([index, title]) => ({
    id: `topic-paragraph-${index}`,
    title,
  }))
  const contents = [
    { id: 'topic-start', title: '文章开头' },
    ...(topic.routeIds?.length ? [{ id: 'topic-route-overview', title: '路线总览' }] : []),
    ...sections,
    ...(hasOverview ? [{ id: 'topic-map-overview', title: '地图一览' }] : []),
    ...(related.length ? [{ id: 'topic-events', title: '相关史事' }] : []),
    ...(hasSources ? [{ id: 'topic-sources', title: '参考资料' }] : []),
  ]
  function scrollTo(id: string) {
    const element = articleRef.current?.querySelector<HTMLElement>(`#${id}`)
    if (!element || !panelRef.current) return
    setContentsOpen(false)
    if (id === 'topic-events') expandEvents(true)
    requestAnimationFrame(() => {
      if (!panelRef.current || !element.isConnected) return
      const toggleHeight = contentsToggleRef.current?.getBoundingClientRect().height ?? 0
      panelRef.current.scrollTop +=
        element.getBoundingClientRect().top -
        panelRef.current.getBoundingClientRect().top -
        toggleHeight -
        24
      element.focus({ preventScroll: true })
    })
  }
  return (
    <div className="topic-reader-layout" data-link-layout="compact">
      <div className="topic-reader-tools">
        <div className="topic-reader-actions">
          <button onClick={onLibrary}>
            <ArrowLeft size={15} />
            全部专题
          </button>
          <div>
            <button aria-label={bookmarked ? '取消收藏专题' : '收藏专题'} onClick={onBookmark}>
              <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} />
              <span>{bookmarked ? '已收藏' : '收藏'}</span>
            </button>
            <button aria-label="分享专题" onClick={onShare}>
              <Share2 size={16} />
              <span>分享</span>
            </button>
          </div>
        </div>
        <nav className="topic-contents" aria-label="文章目录" data-open={contentsOpen}>
          <button
            ref={contentsToggleRef}
            className="topic-contents-toggle"
            aria-expanded={contentsOpen}
            onClick={() => setContentsOpen((value) => !value)}
          >
            <List size={16} />
            文章目录 <ChevronDown size={13} aria-hidden="true" />
          </button>
          <span className="topic-contents-label">本文目录</span>
          <div className="topic-contents-links">
            {contents.map((section) => (
              <button key={section.id} onClick={() => scrollTo(section.id)}>
                {section.title}
              </button>
            ))}
          </div>
        </nav>
      </div>
      <article className="topic-introduction" ref={articleRef}>
        <header id="topic-start" tabIndex={-1} data-article-block="start">
          <span className="eyebrow">历史专题 · {topic.subject ?? '历史阅读'}</span>
          <h2>{topic.name}</h2>
          <p className="topic-reader-meta">约 {topicReadingStats(topic).minutes} 分钟阅读</p>
          {topic.question && topic.question !== topic.name && (
            <p className="topic-reader-question">{topic.question}</p>
          )}
        </header>
        <div className="topic-reader-introduction">
          {(topic.introduction ?? [topic.description]).map((text, index) => (
            <p key={index} data-article-block={`introduction-${index}`}>
              {text}
            </p>
          ))}
        </div>
        {routes.length ? (
          <ArticleRouteFigure
            key={topic.id}
            routes={routes}
            title={articleRouteLabels[topic.id] ?? '路线与地点总览'}
          />
        ) : null}
        <section className="topic-article" aria-label="专题讲解">
          {topic.article.paragraphs.map((paragraph, index) => (
            <div key={index}>
              {topic.article.headings?.[index] && (
                <h3
                  id={`topic-paragraph-${index}`}
                  tabIndex={-1}
                  data-article-block={`heading-${index}`}
                >
                  {topic.article.headings[index]}
                </h3>
              )}
              <p data-article-block={`paragraph-${index}`}>{paragraph}</p>
              {topic.article.media
                ?.filter((media) => media.afterParagraph === index)
                .map((media) => (
                  <ArticleFigure key={media.id} media={media} />
                ))}
              {topic.article.maps
                ?.filter((map) => map.afterParagraph === index)
                .map((map) => (
                  <ArticleMapFigure key={map.id} map={map} eventById={eventById} />
                ))}
              {linksByParagraph.has(index) && (
                <aside className="topic-reading-links" aria-label="本节延伸阅读">
                  <span>延伸阅读</span>
                  <ul>
                    {linksByParagraph.get(index)!.map((link) => (
                      <li key={link.eventId}>
                        <button
                          className="topic-event-link"
                          data-event-id={link.eventId}
                          onClick={() => onEvent(link.eventId)}
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}
            </div>
          ))}
          {topic.conclusion && (
            <div className="topic-conclusion" data-article-block="conclusion">
              <p>{topic.conclusion}</p>
            </div>
          )}
        </section>
        {!!topic.relatedArticles?.length && (
          <nav className="topic-companions" aria-label="相关专题">
            <span>相关专题</span>
            {topic.relatedArticles.map((other) => (
              <a key={other.id} href={articleUrl(other.id)}>
                {other.name}
                <ArrowRight size={15} />
              </a>
            ))}
          </nav>
        )}
        {hasOverview && (
          <div
            id="topic-map-overview"
            className="topic-article-overview"
            tabIndex={-1}
            data-article-block="overview"
          >
            <button className="outline-action" onClick={onMapOverview}>
              <Compass size={16} />
              查看专题地点
              <ArrowRight size={15} />
            </button>
          </div>
        )}
        {related.length > 0 && (
          <section id="topic-events" className="topic-related-events" tabIndex={-1}>
            {hasProgress && onResume && (
              <div className="topic-event-actions">
                <button className="outline-action" onClick={onResume}>
                  继续第 {resumeStep + 1} 则史事
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
            {hasProgress && (
              <p className="topic-reading-help">
                相关史事已读{' '}
                {
                  progress!.read.filter((step) => related.some((entry) => entry.step === step))
                    .length
                }{' '}
                / {related.length}；已读标记由你手动记录。
              </p>
            )}
            <details
              open={eventsOpen}
              onToggle={(event) => {
                if (event.currentTarget.open !== eventsOpen) expandEvents(event.currentTarget.open)
              }}
            >
              <summary className="topic-events-summary" data-article-block="events">
                相关史事 · {related.length} 则<span>完整索引</span>
              </summary>
              <p className="topic-reading-help">
                继续阅读事件，可以查看相关人物、年代、地点与出处。
                {related.some(({ event }) => event.year > MAX_YEAR) &&
                  `${MAX_YEAR}年后的史事可在时空柱中阅读。`}
              </p>
              <ol className="topic-chapter-list">
                {related.map(({ event, step }) => (
                  <li key={event.id}>
                    <button
                      data-event-id={event.id}
                      data-article-block={`event-${event.id}`}
                      onClick={() => onEvent(event.id)}
                    >
                      <span>{String(step + 1).padStart(2, '0')}</span>
                      <div>
                        <small>
                          {formatEventDate(event)} · {event.location}
                        </small>
                        <strong>
                          {event.title}
                          {hasProgress && progress!.read.includes(step) && (
                            <small className="chapter-read-mark">已读</small>
                          )}
                        </strong>
                      </div>
                      <ArrowRight size={14} />
                    </button>
                  </li>
                ))}
              </ol>
            </details>
          </section>
        )}
        {hasSources && (
          <section id="topic-sources" tabIndex={-1} data-article-block="sources">
            <Sources sources={topic.sources!} title="专题参考资料" initialLimit={8} />
          </section>
        )}
        <button className="outline-action topic-reader-footer" onClick={onLibrary}>
          浏览其他专题
          <ArrowRight size={15} />
        </button>
      </article>
    </div>
  )
}
