import type { ArticleMap, ArticleMedia, Source } from '../../types'

export interface EssaySection {
  title: string
  paragraphs: string[]
  eventLinks?: { eventId: string; label: string }[]
  map?: Omit<ArticleMap, 'afterParagraph'>
  media?: Omit<ArticleMedia, 'afterParagraph'>[]
}

/** Authored long-form text. Legacy guides supply compatible event and route metadata. */
export interface ArticleEssay {
  name: string
  description: string
  subject?: string
  color?: string
  icon?: 'route' | 'swords'
  /** Explicit links for new essays, independent of any legacy tour. */
  eventIds?: string[]
  introduction: string[]
  sections: EssaySection[]
  conclusion?: string
  sources?: Source[]
}
