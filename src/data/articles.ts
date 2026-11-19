import type { ReadingArticle, Tour } from '../types'
import { topicTours } from './topics'
import { standaloneArticles } from './standalone-articles'
import { eventById } from './catalog'
import { canonicalSources } from './sources'
import { articleGroups, canonicalArticleId, previousMergedArticleGroups } from './article-groups'
import {
  articleEssays,
  previousArticleTitles,
  recentArticleTitles,
  retainedGuideEvents,
} from './article-essays'
import { articleVisuals } from './article-media'

const legacyArticles: (Tour | ReadingArticle)[] = [...topicTours, ...standaloneArticles]
const legacyById = new Map(legacyArticles.map((article) => [article.id, article]))
const geographicArticles = new Set([
  'qin-unification',
  'tang-turning-point',
  'opium-wars',
  'xinhai-revolution',
  'mongol-conquests',
  'silk-road',
  'grand-canal',
  'age-of-exploration',
  'west-asian-urban-worlds',
])
const explanatoryArticles = new Set([
  'chinese-literature-and-performance',
  'writing-and-knowledge',
  'tax-money-markets',
  'observing-sky-measuring-position',
])
const readingPairs = [
  ['nanhai-shipwreck', 'porcelain-world'],
  ['buddhist-texts-and-networks', 'reformation'],
  ['buddhist-texts-and-networks', 'writing-and-knowledge'],
  ['age-of-exploration', 'observing-sky-measuring-position'],
  ['opium-wars', 'xinhai-revolution'],
  ['tang-turning-point', 'chinese-literature-and-performance'],
] as const
const unique = <T>(values: T[]) => [...new Set(values)]

function originalsFor(id: string, aliases: readonly string[]) {
  return [id, ...aliases].flatMap((key) => {
    const original = legacyById.get(key)
    if (!original && (key !== id || !articleEssays[id]))
      throw new Error(`Missing legacy article: ${key}`)
    return original ? [original] : []
  })
}

/** Canonical guides keep all explicitly associated events; old guides remain addressable. */
function createArticleGuide([id, ...aliases]: readonly string[]): Tour[] {
  const originals = originalsFor(id, aliases).filter(
    (original): original is Tour => 'steps' in original,
  )
  const essay = articleEssays[id]
  if (!essay) throw new Error(`Missing authored essay: ${id}`)
  const steps = unique([
    ...originals.flatMap((original) => original.steps),
    ...(retainedGuideEvents[id] ?? []),
    ...(essay.eventIds ?? []),
  ])
  if (!steps.length) return []
  for (const eventId of steps)
    if (!eventById.has(eventId)) throw new Error(`Unknown article event: ${id}/${eventId}`)
  steps.sort((a, b) => eventById.get(a)!.year - eventById.get(b)!.year)
  const chapters = new Map(
    originals.flatMap((original) =>
      (original.chapters ?? []).map((chapter) => [chapter.eventId, chapter] as const),
    ),
  )
  return [
    {
      ...originals[0],
      id,
      name: essay.name,
      description: essay.description,
      subtitle: `${steps.length} 则相关史事`,
      color: essay.color ?? originals[0]?.color ?? '#71836b',
      icon: essay.icon ?? originals[0]?.icon ?? 'route',
      subject: essay.subject ?? originals[0]?.subject,
      steps,
      chapters: steps.map(
        (eventId) =>
          chapters.get(eventId) ?? {
            eventId,
            explanation: eventById.get(eventId)!.summary,
            mapReading: '',
          },
      ),
      routeIds: unique(originals.flatMap((original) => original.routeIds ?? [])),
      sources: canonicalSources([
        ...originals.flatMap((original) => original.sources ?? []),
        ...(essay.sources ?? []),
      ]),
    },
  ]
}
export const articleGuides: Tour[] = articleGroups.flatMap(createArticleGuide)
const currentIds = new Set(articleGuides.map((guide) => guide.id))
const previousGuides = previousMergedArticleGroups
  .filter(([id]) => !currentIds.has(id))
  .flatMap(createArticleGuide)
const mergedGuideIds = new Set([...articleGuides, ...previousGuides].map((guide) => guide.id))
/** Read older event marks against their full former membership before migrating them. */
export const articleTourCatalog: Tour[] = [
  ...articleGuides,
  ...previousGuides,
  ...topicTours.filter((guide) => !mergedGuideIds.has(guide.id)),
]
const guideById = new Map(articleGuides.map((guide) => [guide.id, guide]))

export const readingArticles: ReadingArticle[] = articleGroups.map(([id, ...aliases]) => {
  const originals = originalsFor(id, aliases)
  const base = originals[0]
  const essay = articleEssays[id]
  if (!essay) throw new Error(`Missing authored essay: ${id}`)
  const guide = guideById.get(id)
  const paragraphs: string[] = []
  const headings: Record<number, string> = {}
  const mapStops: NonNullable<ReadingArticle['article']['mapStops']> = []
  const maps: NonNullable<ReadingArticle['article']['maps']> = []
  const media: NonNullable<ReadingArticle['article']['media']> = []
  const visuals = articleVisuals[id] ?? []
  for (const section of essay.sections) {
    const sectionStart = paragraphs.length
    headings[sectionStart] = section.title
    paragraphs.push(...section.paragraphs)
    const afterParagraph = paragraphs.length - 1
    mapStops.push(...(section.eventLinks ?? []).map((link) => ({ ...link, afterParagraph })))
    media.push(
      ...visuals
        .filter((visual) => visual.section === section.title)
        .map((visual) => ({
          ...visual.media,
          afterParagraph:
            visual.paragraph === undefined ? afterParagraph : sectionStart + visual.paragraph,
        })),
    )
    if (section.map) maps.push({ ...section.map, afterParagraph })
    media.push(...(section.media ?? []).map((image) => ({ ...image, afterParagraph })))
  }
  return {
    id,
    legacyIds: aliases.slice(),
    cover: visuals[0]?.media,
    relatedArticles: readingPairs
      .filter((pair) => pair.some((key) => key === id))
      .map((pair) => {
        const other = pair[0] === id ? pair[1] : pair[0]
        return { id: other, name: articleEssays[other].name }
      }),
    searchTerms: [
      ...(recentArticleTitles[id] ? [recentArticleTitles[id]] : []),
      ...[id, ...aliases].flatMap((key) =>
        previousArticleTitles[key] ? [previousArticleTitles[key]] : [],
      ),
      ...originals.flatMap((original) => [
        original.name,
        original.description,
        original.question ?? '',
        ...Object.values(original.article?.headings ?? {}),
      ]),
    ],
    name: essay.name,
    subtitle: '历史专题读本',
    description: essay.description,
    subject: essay.subject ?? base?.subject ?? '重大历史转折',
    color: essay.color ?? base?.color ?? '#71836b',
    icon: essay.icon ?? base?.icon ?? 'route',
    introduction: essay.introduction,
    conclusion: essay.conclusion,
    guideId: guide?.id,
    relatedEventIds: explanatoryArticles.has(id) ? undefined : guide?.steps,
    mapOverview: geographicArticles.has(id) || undefined,
    routeIds: guide?.routeIds?.length ? guide.routeIds : undefined,
    sources: canonicalSources([
      ...(essay.sources ?? []),
      ...originals.flatMap((original) =>
        (original.sources ?? []).map((source) => ({
          ...source,
          note: source.note ? `既有专题的来源记录：${source.note}` : undefined,
        })),
      ),
    ]),
    article: {
      paragraphs,
      headings,
      mapStops: mapStops.length ? mapStops : undefined,
      maps: maps.length ? maps : undefined,
      media: media.length ? media : undefined,
    },
  }
})

export const articleById = new Map(readingArticles.map((article) => [article.id, article]))
export { canonicalArticleId }
