import wikipediaLinks from '../data/generated/person-reading-links.json'
import type { Person, Source } from '../types'
import { readingSourceUrl } from './source-links'

export interface PersonReadingLink extends Source {
  kind: string
  provider: string
}

const encyclopediaByEntity: Record<string, { title: string; revision: number }> = wikipediaLinks

function describeSource(source: Source): PersonReadingLink {
  const hostname = new URL(source.url).hostname
  if (hostname === 'zh.wikipedia.org') return { ...source, kind: '百科介绍', provider: '维基百科' }
  if (hostname === 'zh.wikisource.org') return { ...source, kind: '原典阅读', provider: '维基文库' }
  if (hostname === 'www.wikidata.org') return { ...source, kind: '基础资料', provider: '维基数据' }
  return {
    ...source,
    kind: /年谱|年表/.test(source.title) ? '生平年谱' : '专题资料',
    provider: source.title.includes(' · ') ? source.title.split(' · ')[0] : hostname,
  }
}

/** Use a revision-matched entity sitelink, never a guessed page title from a person's name. */
export function personReadingLinks(person: Person): PersonReadingLink[] {
  const encyclopedia = person.wikidata ? encyclopediaByEntity[person.wikidata] : undefined
  const sources = [...person.sources]
  if (encyclopedia && encyclopedia.revision === person.revision) {
    sources.unshift({
      title: `维基百科 · ${person.name}`,
      url: `https://zh.wikipedia.org/wiki/${encodeURIComponent(encyclopedia.title)}`,
    })
  }
  const links = sources.map(describeSource)
  const encyclopediaLink = links.find((link) => link.provider === '维基百科')
  const referenceLinks = links.filter((link) => !['维基百科', '维基数据'].includes(link.provider))
  // Prioritize biographies and chronologies over original texts, retaining source order within each.
  referenceLinks.sort(
    (a, b) => Number(a.provider === '维基文库') - Number(b.provider === '维基文库'),
  )
  const candidates = [
    ...(encyclopediaLink ? [encyclopediaLink] : []),
    ...referenceLinks,
    ...(!encyclopediaLink && !referenceLinks.length
      ? links.filter((link) => link.provider === '维基数据')
      : []),
  ]
  const seen = new Set<string>()
  return candidates
    .filter((link) => {
      const url = readingSourceUrl(link.url)
      if (seen.has(url)) return false
      seen.add(url)
      return true
    })
    .slice(0, 3)
}
