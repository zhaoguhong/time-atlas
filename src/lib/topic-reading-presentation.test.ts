import { expect, test } from 'vitest'
import { readingArticles } from '../data/articles'
import { eventById } from '../data/catalog'
import { articleReadingLinks, articleRouteLabels } from './topic-reading-presentation'

test('every original chapter event remains nearby or in the complete index', () => {
  for (const article of readingArticles) {
    const groups = articleReadingLinks(article, eventById)
    const visible = new Set([...groups.values()].flat().map((link) => link.eventId))
    const available = new Set([...visible, ...(article.relatedEventIds ?? [])])
    for (const stop of article.article.mapStops ?? [])
      expect(available.has(stop.eventId)).toBe(true)
    for (const [paragraph, links] of groups) {
      expect(paragraph).toBeLessThan(article.article.paragraphs.length)
      expect(new Set(links.map((link) => link.eventId)).size).toBe(links.length)
      for (const link of links) expect(link.label).toBe(eventById.get(link.eventId)!.title)
    }
    if (article.routeIds?.length) expect(articleRouteLabels[article.id]).toBeTruthy()
  }
})

test('late Qing and silk-road supporting cases remain addressable in their index', () => {
  for (const [id, eventId] of [
    ['opium-wars', 'beiyang-fleet'],
    ['silk-road', 'zhangqian-second'],
  ]) {
    const article = readingArticles.find((a) => a.id === id)!
    const links = [...articleReadingLinks(article, eventById).values()].flat()
    expect(links.some((link) => link.eventId === eventId)).toBe(false)
    expect(article.relatedEventIds).toContain(eventId)
    // If an independent article has no index, its only path must not disappear.
    const independent = { ...article, relatedEventIds: undefined }
    expect(
      [...articleReadingLinks(independent, eventById).values()]
        .flat()
        .some((link) => link.eventId === eventId),
    ).toBe(true)
  }
})
