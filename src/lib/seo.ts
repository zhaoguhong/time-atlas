export const readingDirectories = {
  topics: '历史专题',
  people: '历史人物',
  events: '历史事件',
  dynasties: '朝代与政权',
  polities: '世界政权',
  places: '历史地点',
} as const

export function breadcrumbData(path: string, title: string, siteUrl: string) {
  const root = new URL(siteUrl)
  const relative = path.startsWith(root.pathname) ? path.slice(root.pathname.length) : path
  const group = relative.split('/')[0] as keyof typeof readingDirectories
  const items = [{ name: '山河纪', item: root.href }]
  if (readingDirectories[group]) {
    items.push({ name: readingDirectories[group], item: new URL(`${group}/`, root).href })
    if (relative.split('/').filter(Boolean).length > 1)
      items.push({ name: title, item: new URL(path, root).href })
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      ...item,
    })),
  }
}
