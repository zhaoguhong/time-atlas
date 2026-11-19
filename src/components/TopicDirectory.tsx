import { articleUrl } from '../lib/article-url'
import { useEffect, useState, type CSSProperties, type MouseEvent } from 'react'
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Ship,
  Compass,
  Landmark,
  LayoutGrid,
  List,
  ListTree,
  Search,
  Swords,
  X,
} from 'lucide-react'
import type { ReadingArticle } from '../types'
import type { ReadingProgress } from '../lib/reading-progress'
import {
  readTopicDirectoryPreferences,
  topicDirectoryLayouts,
  topicMatchesQuery,
  topicReadingStats,
  writeTopicDirectoryPreferences,
} from '../lib/topic-directory'
import '../topic-directory.css'

const layoutIcons = { cards: LayoutGrid, list: List, directory: ListTree }

export default function TopicDirectory({
  topics,
  progress,
  onOpen,
  onResume,
}: {
  topics: ReadingArticle[]
  progress: ReadingProgress
  onOpen: (id: string) => void
  onResume: (id: string) => void
}) {
  const [preferences, setPreferences] = useState(readTopicDirectoryPreferences)
  const { layout, query } = preferences
  const subjects = [...new Set(topics.map((topic) => topic.subject ?? '其他专题'))]
  const subject = subjects.includes(preferences.subject) ? preferences.subject : '全部'
  const matching = topics.filter((topic) => topicMatchesQuery(topic, query))
  const available = matching.filter(
    (topic) => subject === '全部' || (topic.subject ?? '其他专题') === subject,
  )
  const latest = progress.recent
    .filter((entry) => entry.key.startsWith('topic:'))
    .map((entry) => topics.find((topic) => `topic:${topic.id}` === entry.key))
    .find((topic) => topic !== undefined)

  useEffect(() => writeTopicDirectoryPreferences(preferences), [preferences])

  function chooseSubject(next: string) {
    setPreferences((old) => ({ ...old, subject: next }))
  }

  function openLink(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    onOpen(id)
  }

  function renderTopic(topic: ReadingArticle) {
    const reading = topicReadingStats(topic)
    const saved = progress.topics[topic.guideId ?? topic.id]
    const readCount = new Set(
      saved?.read.filter((step) => step >= 0 && step < (topic.relatedEventIds?.length ?? 0)),
    ).size
    const CoverIcon =
      topic.icon === 'swords'
        ? Swords
        : /城市|地区|制度/.test(topic.subject ?? '')
          ? Landmark
          : /交流|交通/.test(topic.subject ?? '')
            ? Compass
            : BookOpen
    return (
      <article
        className="topic-directory-item"
        key={topic.id}
        style={{ '--tour-color': topic.color } as CSSProperties}
      >
        <a
          href={articleUrl(topic.id)}
          className="tour-card"
          aria-label={`阅读专题：${topic.name}`}
          onClick={(event) => openLink(event, topic.id)}
        >
          <span className="topic-directory-cover" aria-hidden="true">
            {topic.cover ? (
              <img
                className="topic-cover-image"
                src={
                  /^(https?:|data:|blob:|\/)/.test(topic.cover.src)
                    ? topic.cover.src
                    : `${import.meta.env.BASE_URL}${topic.cover.src}`
                }
                alt=""
                width={topic.cover.width}
                height={topic.cover.height}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <CoverIcon size={44} strokeWidth={1.15} />
            )}
          </span>
          <span className="topic-directory-card-body">
            <span className="topic-directory-meta">
              <span>{topic.subject ?? '历史专题'}</span>
              <span className="topic-directory-duration">
                <Clock3 size={12} />约 {reading.minutes} 分钟
              </span>
            </span>
            <strong className="topic-directory-title">{topic.name}</strong>
            <span className="topic-directory-description">{topic.description}</span>
            {saved && !!topic.relatedEventIds?.length && (
              <span className="topic-directory-progress">
                相关史事已读 {readCount} / {topic.relatedEventIds?.length ?? 0}
              </span>
            )}
            <span className="tour-card-action">
              <BookOpen size={14} />
              <span>阅读文章</span>
              <span className="topic-directory-length">
                约 {reading.characters.toLocaleString('zh-CN')} 字
              </span>
              <ArrowRight size={15} />
            </span>
          </span>
        </a>
      </article>
    )
  }

  return (
    <div className="tours-panel topic-directory" data-topic-layout={layout}>
      <header className="topic-directory-heading">
        <h2>历史专题</h2>
      </header>
      {layout === 'cards' &&
        !query.trim() &&
        subject === '全部' &&
        topics.some((topic) => topic.id === 'qiaopi-remittances') && (
          <section className="topic-directory-selection" aria-label="选读专题">
            <a
              className="topic-feature-letter"
              href={articleUrl('qiaopi-remittances')}
              onClick={(event) => openLink(event, 'qiaopi-remittances')}
            >
              <span className="topic-feature-copy">
                <small>侨批 · 家书与汇款</small>
                <strong>
                  <span>寄回家的钱，</span>
                  <span>收到了吗？</span>
                </strong>
                <span>
                  读这篇 <ArrowRight size={16} />
                </span>
              </span>
              <span className="topic-feature-envelope" aria-hidden="true">
                <i>家書</i>
              </span>
            </a>
            <div className="topic-feature-pair">
              <a
                href={articleUrl('grand-canal')}
                onClick={(event) => openLink(event, 'grand-canal')}
              >
                <Ship size={19} />
                <span>漕粮如何进京</span>
                <ArrowRight size={14} />
              </a>
              <a
                href={articleUrl('observing-sky-measuring-position')}
                onClick={(event) => openLink(event, 'observing-sky-measuring-position')}
              >
                <Compass size={19} />
                <span>怎样测出经度</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </section>
        )}

      <div className="topic-directory-search-row">
        <label className="topic-directory-search">
          <Search size={17} />
          <input
            type="search"
            aria-label="搜索历史专题"
            placeholder="搜索标题、简介或分类"
            value={query}
            onChange={(event) => setPreferences((old) => ({ ...old, query: event.target.value }))}
          />
          {query && (
            <button
              aria-label="清除专题搜索"
              onClick={() => setPreferences((old) => ({ ...old, query: '' }))}
            >
              <X size={16} />
            </button>
          )}
        </label>
        <label className="topic-directory-subject">
          <span>专题分类</span>
          <select value={subject} onChange={(event) => chooseSubject(event.target.value)}>
            <option value="全部">全部专题</option>
            {subjects.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="topic-directory-subjects" role="group" aria-label="按分类浏览专题">
        {['全部', ...subjects].map((name) => (
          <button key={name} aria-pressed={subject === name} onClick={() => chooseSubject(name)}>
            {name === '全部' ? '全部专题' : name}
            <span aria-hidden="true">
              {
                matching.filter(
                  (topic) => name === '全部' || (topic.subject ?? '其他专题') === name,
                ).length
              }
            </span>
          </button>
        ))}
      </div>

      {latest && !query && subject === '全部' && (
        <section className="topic-directory-resume" aria-label="继续上次的专题">
          <BookOpen size={21} strokeWidth={1.5} />
          <div>
            <span>继续上次的专题</span>
            <strong>{latest.name}</strong>
          </div>
          <button onClick={() => onResume(latest.id)}>
            继续阅读 <ArrowRight size={15} />
          </button>
        </section>
      )}

      <div className="topic-directory-toolbar">
        <p role="status" aria-live="polite">
          {query.trim() ? '找到 ' : '共 '}
          <strong>{available.length}</strong> 篇文章
          {subject !== '全部' && <span> · {subject}</span>}
        </p>
        <div className="topic-directory-layouts" role="group" aria-label="专题展示方式">
          {topicDirectoryLayouts.map((item) => {
            const Icon = layoutIcons[item.id]
            return (
              <button
                key={item.id}
                aria-label={item.label}
                aria-pressed={layout === item.id}
                onClick={() => setPreferences((old) => ({ ...old, layout: item.id }))}
              >
                <Icon size={15} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {available.length ? (
        layout === 'directory' ? (
          <div className="topic-directory-groups">
            {subjects.map((name) => {
              const entries = available.filter((topic) => (topic.subject ?? '其他专题') === name)
              return entries.length ? (
                <section key={name} className="topic-directory-group" aria-label={name}>
                  <h3>
                    {name}
                    <span>{entries.length} 篇</span>
                  </h3>
                  <div className="topic-directory-entries">{entries.map(renderTopic)}</div>
                </section>
              ) : null
            })}
          </div>
        ) : (
          <div className="topic-directory-entries">{available.map(renderTopic)}</div>
        )
      ) : (
        <div className="topic-directory-empty">
          <BookOpen size={27} strokeWidth={1.2} />
          <p>没有找到匹配的专题。</p>
          <span>试试另一个词，或查看全部文章。</span>
          <button onClick={() => setPreferences((old) => ({ ...old, subject: '全部', query: '' }))}>
            查看全部专题 <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  )
}
