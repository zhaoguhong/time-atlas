import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Bookmark,
  Compass,
  Info,
  Moon,
  MoreHorizontal,
  PanelTopClose,
  PanelTopOpen,
  Search,
  Share2,
  Sun,
} from 'lucide-react'
import AtlasNavigation from './components/AtlasNavigation'
import DisplayControls from './components/DisplayControls'
import TopicPanel from './components/TopicPanel'
import { canonicalArticleId } from './data/article-groups'
import type { TopicRoute } from './data/topic-routes'
import { useReadingResize } from './hooks/use-reading-resize'
import { topicPositionAt, type TopicPosition } from './hooks/use-topic-position'
import { consolidateArticleProgress, consolidateBookmarks } from './lib/article-migration'
import { useColorMode } from './lib/color-mode'
import { readPreferences, writePreferences } from './lib/history'
import { readProgress, writeProgress } from './lib/reading-progress'
import type { NavigationView } from './lib/navigation'
import type { TopicAction } from './lib/topic-action'
import type { TopicEvent } from './lib/topic-reading-presentation'
import type { ReadingArticle, Tour } from './types'
import './atlas-styles'

type TopicPage = {
  article: ReadingArticle
  events: TopicEvent[]
  routes: Pick<TopicRoute, 'id' | 'name' | 'period'>[]
  guides: Pick<Tour, 'id' | 'name' | 'steps'>[]
}

const base = import.meta.env.BASE_URL
const libraryUrl = `${base}topics/`

function TopicReader({
  page,
  path,
  openAtlas,
  openingPosition,
}: {
  page: TopicPage
  path: string
  openAtlas: (action: TopicAction) => Promise<void>
  openingPosition: TopicPosition | null
}) {
  const { article, guides, routes } = page
  const [events] = useState(() => new Map(page.events.map((event) => [event.id, event])))
  const [progress] = useState(() =>
    consolidateArticleProgress(readProgress(guides), guides, canonicalArticleId),
  )
  const [bookmarks, setBookmarks] = useState(() =>
    consolidateBookmarks(readPreferences().bookmarks, canonicalArticleId),
  )
  const [colorMode, toggleColorMode] = useColorMode()
  const [moreOpen, setMoreOpen] = useState(false)
  const [focusMode, setFocusMode] = useState(false)
  const [message, setMessage] = useState('')
  const [query, setQuery] = useState('')
  const action = useRef<TopicAction | null>(null)
  const panel = useRef<HTMLDivElement>(null)
  const header = useRef<HTMLElement>(null)
  const more = useRef<HTMLButtonElement>(null)
  const enterFocus = useRef<HTMLButtonElement>(null)
  const exitFocus = useRef<HTMLButtonElement>(null)
  const bookmarkKey = `topic:${article.id}`
  const themeLabel = colorMode === 'light' ? '切换到夜间模式' : '切换到白天模式'
  const ThemeIcon = colorMode === 'light' ? Moon : Sun
  useReadingResize(panel, [article.id])

  useEffect(() => {
    writeProgress(
      {
        topics: progress.topics,
        recent: [
          { key: bookmarkKey, title: article.name, hash: path },
          ...progress.recent.filter(({ key }) => key !== bookmarkKey),
        ].slice(0, 12),
      },
      guides,
    )
  }, [article.name, bookmarkKey, guides, path, progress])
  useEffect(() => writePreferences({ ...readPreferences(), bookmarks }), [bookmarks])
  useEffect(() => {
    const initialPath = location.pathname
    function restoreDocument() {
      if (location.pathname !== initialPath) location.reload()
    }
    // A topic reached inside the atlas can share a history document with the
    // directory. After a reload, the standalone reader only owns its topic path.
    window.addEventListener('popstate', restoreDocument)
    return () => window.removeEventListener('popstate', restoreDocument)
  }, [])
  useEffect(() => {
    if (!moreOpen && !focusMode) return
    function close(event: KeyboardEvent | PointerEvent) {
      if (event instanceof KeyboardEvent) {
        if (event.key !== 'Escape' || document.querySelector('dialog[open]')) return
        if (focusMode) setFocusMode(false)
        else more.current?.focus({ preventScroll: true })
      } else if (focusMode || header.current?.contains(event.target as Node)) return
      setMoreOpen(false)
    }
    document.addEventListener('keydown', close)
    document.addEventListener('pointerdown', close)
    return () => {
      document.removeEventListener('keydown', close)
      document.removeEventListener('pointerdown', close)
    }
  }, [focusMode, moreOpen])
  const wasFocused = useRef(false)
  useEffect(() => {
    if (focusMode) exitFocus.current?.focus({ preventScroll: true })
    else if (wasFocused.current) {
      const opener = more.current?.getClientRects().length ? more.current : enterFocus.current
      opener?.focus({ preventScroll: true })
    }
    wasFocused.current = focusMode
  }, [focusMode])

  function library() {
    const stack: NavigationView[] | undefined = history.state?.timeAtlas?.stack
    const last = Array.isArray(stack) ? stack.at(-1) : undefined
    if (last?.mode === 'tours' && !last.articleId && !last.tourState && !last.selection)
      history.back()
    else location.assign(libraryUrl)
  }
  async function activate(next: TopicAction) {
    if (action.current) {
      if (next.type === 'search' && action.current.type === 'search')
        action.current.query = next.query
      return
    }
    action.current = next
    setMessage('正在打开…')
    try {
      await openAtlas(next)
    } catch {
      action.current = null
      setMessage('暂时无法打开，请检查网络后重试。')
    }
  }
  async function share() {
    setMoreOpen(false)
    const url = new URL(path, location.origin).href
    try {
      await navigator.clipboard.writeText(url)
      setMessage('阅读链接已复制。')
    } catch {
      setMessage(`分享地址：${url}`)
    }
  }
  function changeTheme() {
    setMoreOpen(false)
    toggleColorMode()
  }
  function focus() {
    setMoreOpen(false)
    setFocusMode(true)
  }

  return (
    <div
      className="atlas-app"
      data-mobile-view="reading"
      data-canvas-enabled="false"
      data-topic-reading="true"
      data-topic-overview="true"
      data-focus-mode={focusMode}
    >
      {focusMode && (
        <button
          ref={exitFocus}
          className="focus-mode-exit"
          aria-label="退出专注模式"
          onClick={() => setFocusMode(false)}
        >
          <PanelTopOpen size={20} />
        </button>
      )}
      <header className="topbar" inert={focusMode} ref={header}>
        <AtlasNavigation
          base={base}
          topicsActive
          onHome={() => void activate({ type: 'home' })}
          onVisualization={(type) => void activate({ type })}
          onTopics={library}
        />
        <div className="top-search">
          <Search size={16} />
          <input
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="false"
            aria-label="搜索历史事件、人物或地名"
            placeholder="寻找事件、人物、地名…"
            value={query}
            onChange={(event) => {
              setQuery(event.currentTarget.value)
              void activate({ type: 'search', query: event.currentTarget.value })
            }}
          />
          <kbd>探索</kbd>
          <button className="search-dismiss" onClick={(event) => event.currentTarget.blur()}>
            取消搜索
          </button>
        </div>
        <button
          ref={more}
          className="header-more"
          aria-label="更多操作"
          aria-expanded={moreOpen}
          onClick={() => setMoreOpen((value) => !value)}
        >
          <MoreHorizontal size={21} />
        </button>
        <div className={`header-actions ${moreOpen ? 'mobile-open' : ''}`}>
          <button
            className="icon-button navigation-menu-entry"
            aria-label="返回自由探索"
            onClick={() => void activate({ type: 'explore' })}
          >
            <Compass size={18} />
          </button>
          <span className="menu-group-label">显示方式</span>
          <button
            className="icon-button color-mode-menu-entry"
            aria-label={themeLabel}
            aria-pressed={colorMode === 'dark'}
            onClick={changeTheme}
          >
            <ThemeIcon size={18} />
          </button>
          <DisplayControls onAction={() => setMoreOpen(false)} onFocusMode={focus} />
          <button
            ref={enterFocus}
            className="icon-button focus-mode-enter"
            title="进入专注模式"
            aria-label="进入专注模式"
            onClick={focus}
          >
            <PanelTopClose size={18} />
          </button>
          <span className="menu-group-label">阅读与分享</span>
          <button
            className="icon-button"
            aria-label="我的阅读"
            title="我的阅读：收藏与最近浏览"
            onClick={() => void activate({ type: 'saved' })}
          >
            <Bookmark size={18} />
            {bookmarks.length > 0 && <span className="bookmark-dot" />}
          </button>
          <button
            className="icon-button"
            aria-label="数据与来源"
            title="数据与来源"
            onClick={() => void activate({ type: 'sources' })}
          >
            <Info size={18} />
          </button>
          <span className="header-separator" />
          <button className="share-button" aria-label="分享此刻" onClick={share}>
            <Share2 size={15} />
            <span>分享此刻</span>
          </button>
        </div>
        <button
          className="color-mode-toggle"
          aria-label={themeLabel}
          title={themeLabel}
          aria-pressed={colorMode === 'dark'}
          onClick={changeTheme}
        >
          <ThemeIcon size={19} />
        </button>
      </header>
      <main className="story-panel" aria-label="历史内容">
        <div id="history-reading-content" className="panel-scroll" ref={panel}>
          <TopicPanel
            topic={article}
            openingPosition={openingPosition}
            routes={routes}
            eventById={events}
            panelRef={panel}
            onLibrary={library}
            onEvent={(id) => void activate({ type: 'event', id })}
            progress={article.guideId ? progress.topics[article.guideId] : undefined}
            onResume={article.guideId ? () => void activate({ type: 'resume' }) : undefined}
            onMapOverview={
              article.mapOverview && article.guideId
                ? () => void activate({ type: 'overview' })
                : undefined
            }
            bookmarked={bookmarks.includes(bookmarkKey)}
            onBookmark={() =>
              setBookmarks((old) =>
                old.includes(bookmarkKey)
                  ? old.filter((item) => item !== bookmarkKey)
                  : [...old, bookmarkKey],
              )
            }
            onShare={share}
          />
        </div>
      </main>
      {message && (
        <div className="toast" role="status">
          {message}
        </div>
      )}
    </div>
  )
}

export function mountTopic(payload: HTMLScriptElement) {
  const page: TopicPage = JSON.parse(payload.textContent ?? '{}')
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')!
  const path = new URL(canonical.href).pathname
  const container = document.getElementById('root')!
  const article = container.querySelector<HTMLElement>('[data-static-topic]')
  const openingPosition = article && window.scrollY > 8 ? topicPositionAt(article, 0) : null
  const root = createRoot(container)
  if (!location.hash && (location.pathname !== path || location.search))
    history.replaceState(history.state, '', path)
  root.render(
    <TopicReader
      page={page}
      openingPosition={openingPosition}
      path={path}
      openAtlas={async (action) => {
        const { mountAtlas } = await import('./app-entry')
        mountAtlas(root, action)
      }}
    />,
  )
}
