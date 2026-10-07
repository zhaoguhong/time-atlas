import type { Source } from '../types'

// These spellings follow links in each work's Wikisource contents page. The
// catalogs use different padding widths; a generic three-digit URL caused 404s.
const widths: Record<string, number> = {
  史記: 3,
  漢書: 3,
  三國志: 2,
  晉書: 3,
  宋史: 3,
  元史: 3,
  隋書: 2,
  後漢書: 0,
  宋書: 0,
  魏書: 0,
  南齊書: 0,
  梁書: 2,
  陳書: 0,
  北齊書: 0,
  周書: 2,
  舊唐書: 0,
  明史: 0,
  金史: 0,
  清史稿: 0,
  舊五代史: 0,
  遼史: 0,
}
export function bookUrl(name: string, volume = '') {
  if (!volume) return `https://zh.wikisource.org/wiki/${name}`
  const match = volume.match(/^(\d+)(.*)$/)
  const normalized =
    match && name in widths
      ? `${String(Number(match[1])).padStart(widths[name], '0')}${match[2]}`
      : volume
  return `https://zh.wikisource.org/wiki/${name}/卷${normalized}`
}
export function canonicalSource(source: Source): Source {
  if (source.url === 'https://zh.wikisource.org/wiki/金石錄後序')
    return { ...source, url: 'https://zh.wikisource.org/wiki/金石錄後序_(李清照)' }
  if (source.url === 'https://zh.wikisource.org/wiki/中國同盟會革命方略')
    return {
      ...source,
      url: 'https://zh.wikisource.org/wiki/同盟會革命方略',
      note: '1908年的革命纲领，用于说明同盟会理念；1905年成立纪年另见成立史料。',
    }
  if (source.url === 'https://www.bl.uk/collection-items/the-diamond-sutra')
    return { ...source, url: 'https://idp.bl.uk/references/DiamondSutra/' }
  const match = source.url.match(/^https:\/\/zh.wikisource.org\/wiki\/([^/]+)\/卷(\d+.*)$/)
  if (!match) return source
  const volume = match[1] === '後漢書' && Number(match[2]) === 1 ? '1上' : match[2]
  return { ...source, url: bookUrl(match[1], volume) }
}
export const canonicalSources = (sources: Source[]) => sources.map(canonicalSource)
