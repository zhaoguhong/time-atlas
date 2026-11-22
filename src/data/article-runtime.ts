import generated from './generated/article-runtime.json'
import type { ReadingArticle, Tour } from '../types'
export { canonicalArticleId } from './article-groups'

export const readingArticles = generated.readingArticles as unknown as ReadingArticle[]
export const articleById = new Map(readingArticles.map((article) => [article.id, article]))
export const articleGuides = generated.articleGuides as Tour[]
// Previous memberships are retained for saved event marks, without shipping old prose.
export const articleTourCatalog = [...articleGuides, ...generated.legacyTours] as Tour[]
export const legacyTourSteps = generated.legacyTourSteps
