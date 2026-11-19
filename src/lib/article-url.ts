import { recordFromPath } from './record-url'
import { articleSlugs, articleSlug } from '../data/article-slugs'
import { canonicalArticleId } from '../data/article-groups'
export const siteBase = import.meta.env.BASE_URL
export const topicDirectoryUrl = `${siteBase}topics/`
export const articleUrl = (id: string) => `${topicDirectoryUrl}${articleSlug(id)}/`
const idsBySlug = new Map(Object.entries(articleSlugs).map(([id, slug]) => [slug, id]))
export function articleIdFromPath(path: string) {
  path = path.replace(/\/index\.html$/, '/')
  if (!path.startsWith(topicDirectoryUrl)) return null
  const slug = path.slice(topicDirectoryUrl.length).replace(/\/$/, '')
  return idsBySlug.get(slug) ?? null
}

/** Older bookmarks named either an article or the introduction to a retired guide. */
export function articleIdFromLegacyHash(hash: string) {
  const params = new URLSearchParams(hash.replace(/^#/, ''))
  if (params.has('event')) return null
  const article = params.get('article')
  if (article) return canonicalArticleId.get(article) ?? null
  const tour = params.get('tour')
  if (!tour || params.get('step') !== '-1') return null
  const destination = canonicalArticleId.get(tour)
  return destination && (destination !== tour || tour === 'buddhist-texts-and-networks')
    ? destination
    : null
}

const contextKey = 'time-atlas:reading-context'
/** Restore this tab's hidden map state on reload, never on a fresh shared visit. */
export function readingContextHash() {
  if (window.location.hash) return window.location.hash
  if (
    window.location.pathname !== topicDirectoryUrl &&
    !articleIdFromPath(window.location.pathname) &&
    !recordFromPath(window.location.pathname)
  )
    return ''
  const entry = window.history?.state?.timeAtlas
  const expectedId = articleIdFromPath(window.location.pathname)
  const record = recordFromPath(window.location.pathname)
  if (entry?.version !== 1) return ''
  if (
    record
      ? entry.view?.selection?.type !== record.type || entry.view?.selection?.id !== record.id
      : entry.view?.mode !== 'tours' || (entry.view.articleId ?? null) !== expectedId
  )
    return ''
  try {
    const saved = JSON.parse(sessionStorage.getItem(contextKey) ?? 'null')
    return saved?.path === window.location.pathname && typeof saved.hash === 'string'
      ? saved.hash
      : ''
  } catch {
    return ''
  }
}
export function saveReadingContext(path: string, hash: string) {
  try {
    sessionStorage.setItem(contextKey, JSON.stringify({ path, hash }))
  } catch {
    /* Storage is optional. */
  }
}
