import { expect, test } from 'vitest'
import { readingArticles, articleGuides, articleTourCatalog } from '../data/article-runtime'
import {
  readingArticles as originals,
  articleGuides as guides,
  articleTourCatalog as catalog,
} from '../data/articles'

test('runtime catalog preserves authored articles and exact current and saved event memberships', () => {
  expect(readingArticles.map((a) => a.id)).toEqual(originals.map((a) => a.id))
  for (const [index, article] of readingArticles.entries()) {
    const original = originals[index]
    expect(article.article.paragraphs).toEqual(original.article.paragraphs)
    expect(article.article.headings).toEqual(original.article.headings)
    expect(article.sources).toEqual(original.sources)
    expect(article.relatedEventIds).toEqual(original.relatedEventIds)
    expect(article.article.maps).toEqual(original.article.maps)
    for (const media of [article.cover, ...(article.article.media ?? [])].filter(Boolean))
      expect(media!.src).not.toContain('/src/')
  }
  expect(articleGuides.map(({ id, steps, chapters }) => ({ id, steps, chapters }))).toEqual(
    guides.map(({ id, steps, chapters }) => ({ id, steps, chapters })),
  )
  expect(articleTourCatalog.map(({ id, steps }) => ({ id, steps }))).toEqual(
    catalog.map(({ id, steps }) => ({ id, steps })),
  )
})
