import { expect, test } from 'vitest'
import { readingArticles, articleById, articleGuides } from '../data/articles'
import { canonicalArticleId, articleGroups } from '../data/article-groups'
import { topicTours } from '../data/topics'
import { standaloneArticles } from '../data/standalone-articles'
import { eventById } from '../data/catalog'
import { canonicalSource } from '../data/sources'
import { topicMatchesQuery } from './topic-directory'
import {
  articleEssays,
  previousArticleTitles,
  recentArticleTitles,
  retainedGuideEvents,
} from '../data/article-essays'

const oldArticles = [...topicTours, ...standaloneArticles]

test('the public directory exposes only current article IDs', () => {
  expect(readingArticles).toHaveLength(22)
  const newIds = ['xinhai-revolution', 'mongol-conquests', 'reformation', 'world-wars']
  expect(articleById.size).toBe(readingArticles.length)
  for (const id of newIds) {
    const article = articleById.get(id)!
    expect(article.id).toBe(id)
    expect(article.sources?.length).toBeGreaterThan(0)
    expect(articleGuides.find((guide) => guide.id === id)?.steps.length).toBeGreaterThan(0)
  }
  for (const [id, ...aliases] of articleGroups) {
    expect(articleById.get(id)?.id).toBe(id)
    for (const oldId of aliases) expect(articleById.has(oldId)).toBe(false)
  }
  expect(
    readingArticles
      .filter((article) => topicMatchesQuery(article, '纸币'))
      .map((article) => article.id),
  ).toEqual(['tax-money-markets'])
  for (const [id, title] of Object.entries(previousArticleTitles))
    expect(topicMatchesQuery(articleById.get(canonicalArticleId.get(id) ?? id)!, title)).toBe(true)
  for (const [id, title] of Object.entries(recentArticleTitles))
    expect(topicMatchesQuery(articleById.get(id)!, title)).toBe(true)
  expect(articleById.get('silk-road')).not.toBe(articleById.get('age-of-exploration'))
  expect(
    new Set(
      [
        'west-asian-urban-worlds',
        'south-asian-societies',
        'southeast-asian-centres',
        'african-cities-and-networks',
        'american-urban-traditions',
      ].map((id) => articleById.get(canonicalArticleId.get(id) ?? id)),
    ).size,
  ).toBe(1)
})

test('consolidation retains inherited sources and route maps', () => {
  for (const original of oldArticles) {
    const article = articleById.get(canonicalArticleId.get(original.id) ?? original.id)!
    const urls = new Set(article.sources?.map((source) => source.url))
    for (const source of original.sources ?? [])
      expect(urls.has(canonicalSource(source).url)).toBe(true)
    for (const id of original.routeIds ?? []) expect(article.routeIds).toContain(id)
    expect(article.searchTerms).toContain(original.name)
  }
})

test('combined event guides retain explicit membership, unique IDs and chronological order', () => {
  for (const guide of articleGuides) {
    const group = articleGroups.find(([id]) => id === guide.id)!
    const ids = new Set([
      ...topicTours
        .filter((topic) => (group as readonly string[]).includes(topic.id))
        .flatMap((topic) => topic.steps),
      ...(retainedGuideEvents[guide.id] ?? []),
      ...(articleEssays[guide.id].eventIds ?? []),
    ])
    expect(new Set(guide.steps)).toEqual(ids)
    expect(guide.steps).toHaveLength(ids.size)
    expect(guide.chapters?.map((chapter) => chapter.eventId)).toEqual(guide.steps)
    const years = guide.steps.map((id) => eventById.get(id)!.year)
    expect(years).toEqual([...years].sort((a, b) => a - b))
  }
})

test('section figures, maps and links stay attached to real paragraphs and events', () => {
  for (const article of readingArticles) {
    const paragraphs = article.article.paragraphs
    expect(paragraphs.every((paragraph) => paragraph.trim().length > 0)).toBe(true)
    for (const entry of [
      ...(article.article.media ?? []),
      ...(article.article.maps ?? []),
      ...(article.article.mapStops ?? []),
    ]) {
      expect(entry.afterParagraph).toBeGreaterThanOrEqual(0)
      expect(entry.afterParagraph).toBeLessThan(paragraphs.length)
    }
    const guide = articleGuides.find((guide) => guide.id === article.guideId)
    for (const link of article.article.mapStops ?? []) expect(guide?.steps).toContain(link.eventId)
  }
})

test('porcelain is a sourced independent article without an invented event guide', () => {
  const article = articleById.get('porcelain-world')!
  expect(article.sources!.length).toBeGreaterThan(0)
  expect(article.guideId).toBeUndefined()
  expect(article.article.paragraphs.length).toBeGreaterThan(0)
})

test('every topic has a cover and all editorial illustrations stay beside their named section', async () => {
  const { articleVisuals } = await import('../data/article-media')
  const { topicRouteById } = await import('../data/topic-routes')
  for (const article of readingArticles) {
    expect(article.cover?.src, article.id).toBeTruthy()
    expect(article.article.media?.length, article.id).toBeGreaterThan(0)
    for (const visual of articleVisuals[article.id] ?? []) {
      const section = articleEssays[article.id].sections.find((s) => s.title === visual.section)!
      expect(section, visual.media.id).toBeDefined()
      const localIndex = visual.paragraph ?? section.paragraphs.length - 1
      expect(localIndex).toBeGreaterThanOrEqual(0)
      expect(localIndex).toBeLessThan(section.paragraphs.length)
      const figure = article.article.media?.find((m) => m.id === visual.media.id)
      expect(article.article.paragraphs[figure!.afterParagraph]).toBe(
        section.paragraphs[localIndex],
      )
    }
    for (const map of article.article.maps ?? []) {
      for (const id of map.routeIds ?? []) expect(topicRouteById.has(id)).toBe(true)
      for (const id of map.eventIds ?? []) expect(eventById.has(id)).toBe(true)
      for (const place of map.places ?? []) {
        expect(Math.abs(place.coordinates[0])).toBeLessThanOrEqual(180)
        expect(Math.abs(place.coordinates[1])).toBeLessThan(90)
      }
    }
  }
})
