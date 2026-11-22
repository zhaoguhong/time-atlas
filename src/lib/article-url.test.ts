import { afterEach, expect, test, vi } from 'vitest'
import { readingArticles } from '../data/articles'
import { articleSlugs } from '../data/article-slugs'
import {
  articleUrl,
  articleIdFromPath,
  readingContextHash,
  saveReadingContext,
} from './article-url'

afterEach(() => vi.unstubAllGlobals())
test('every article has one unique descriptive public path independent of its internal ID', () => {
  const paths = readingArticles.map((article) => articleUrl(article.id))
  expect(Object.keys(articleSlugs).sort()).toEqual(readingArticles.map((a) => a.id).sort())
  expect(new Set(paths).size).toBe(readingArticles.length)
  for (const article of readingArticles) {
    expect(articleUrl(article.id)).toMatch(/^\/topics\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/)
    expect(articleIdFromPath(articleUrl(article.id))).toBe(article.id)
  }
  expect(articleIdFromPath('/topics/reformation/')).toBeNull()
  expect(articleIdFromPath('/topics/religion-and-society/')).toBe('reformation')
  expect(articleIdFromPath('/topics/unknown/')).toBeNull()
})
test('hidden context restores only for a matching reload and tolerates unavailable storage', () => {
  const values = new Map<string, string>()
  vi.stubGlobal('sessionStorage', {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
  })
  vi.stubGlobal('window', {
    location: { pathname: '/topics/silk-road/', hash: '' },
    history: {
      state: { timeAtlas: { version: 1, view: { mode: 'tours', articleId: 'silk-road' } } },
    },
  })

  saveReadingContext('/topics/silk-road/', '#year=741&category=战争')
  expect(readingContextHash()).toBe('#year=741&category=战争')
  const savedState = window.history.state.timeAtlas
  window.history.state.timeAtlas = null
  expect(readingContextHash()).toBe('')
  window.history.state.timeAtlas = savedState

  saveReadingContext('/topics/religion-and-society/', '#year=1517')
  expect(readingContextHash()).toBe('')
  vi.stubGlobal('sessionStorage', {
    getItem: () => {
      throw new Error('denied')
    },
    setItem: () => {
      throw new Error('denied')
    },
  })
  expect(() => saveReadingContext('/topics/', '#year=741')).not.toThrow()
  expect(readingContextHash()).toBe('')
})
