/** Public paths describe the current article independently of internal data IDs. */
export const articleSlugs: Record<string, string> = {
  'qin-unification': 'chinese-statecraft',
  'tang-turning-point': 'tang-turning-point',
  'opium-wars': 'late-qing-reforms',
  'xinhai-revolution': 'xinhai-revolution',
  'silk-road': 'silk-road',
  'mongol-conquests': 'mongol-conquests',
  'age-of-exploration': 'age-of-exploration',
  reformation: 'religion-and-society',
  'buddhist-texts-and-networks': 'translating-buddhist-texts',
  'qiaopi-remittances': 'qiaopi-remittances',
  'nanhai-shipwreck': 'nanhai-shipwreck',
  'porcelain-world': 'porcelain-world',
  'constitutions-rights-and-participation': 'rights-and-citizenship',
  'industry-transport-and-life': 'industrial-revolution',
  'world-wars': 'world-wars',
  'grand-canal': 'rivers-and-cities',
  'tax-money-markets': 'state-and-markets',
  'writing-and-knowledge': 'books-and-society',
  'chinese-literature-and-performance': 'chinese-literature',
  'observing-sky-measuring-position': 'time-and-science',
  'disease-medicine-public-health': 'medicine-and-public-health',
  'west-asian-urban-worlds': 'world-civilizations',
}
export function articleSlug(id: string) {
  const slug = articleSlugs[id]
  if (!slug) throw new Error(`Missing article slug: ${id}`)
  return slug
}
