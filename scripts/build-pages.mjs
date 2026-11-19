import { mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createServer, minifySync } from 'vite'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, 'dist')
const template = (await readFile(resolve(dist, 'index.html'), 'utf8'))
  .replace(
    /<script>([\s\S]*?)<\/script>/g,
    (_, code) => `<script>${minifySync('theme.js', code, { module: false }).code}</script>`,
  )
  .replace(/>\s+</g, '><')
const base = template.match(/src="([^"]*)assets\/[^"/]+\.js"/)?.[1]
if (!base?.startsWith('/')) throw new Error('Static pages require an absolute Vite base path')
const origin = new URL(template.match(/rel="canonical" href="([^"]+)"/)[1]).origin
const escape = (value = '') =>
  String(value).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  )
const url = (path) => new URL(`${base}${path}`, origin).href
const server = await createServer({
  root,
  server: { middlewareMode: true, ws: false },
  optimizeDeps: { noDiscovery: true, include: [] },
  logLevel: 'error',
})
try {
  const { events, people } = await server.ssrLoadModule('/src/data/content.ts')
  const { formatEventDate, lifeDates, compactYear, MIN_YEAR } =
    await server.ssrLoadModule('/src/lib/history.ts')
  const { dynasties } = await server.ssrLoadModule('/src/data/dynasties.ts')
  const { worldPolities } = await server.ssrLoadModule('/src/data/world-polities.ts')
  const { places, eventAtPlace, namesPlace } = await server.ssrLoadModule('/src/lib/exploration.ts')
  const { placeReading } = await server.ssrLoadModule('/src/data/place-reading.ts')
  const { journeys } = await server.ssrLoadModule('/src/data/journeys.ts')
  const { eventRegion, relatedReading } = await server.ssrLoadModule('/src/lib/time-pillar.ts')
  const { readingDirectories, breadcrumbData } = await server.ssrLoadModule('/src/lib/seo.ts')
  const routes = JSON.parse(
    await readFile(resolve(root, 'src/data/generated/reading-routes.json'), 'utf8'),
  )
  const eventHref = (id) => `${base}events/${routes.events[id]}/`
  const personHref = (id) => `${base}people/${routes.people[id]}/`
  const placeHref = (id) => `${base}places/${routes.places[id]}/`
  const linkList = (records, href, title) =>
    `<ul>${records.map((r) => `<li><a href="${href(r.id)}">${escape(title(r))}</a></li>`).join('')}</ul>`
  const sourcesHtml = (sources) =>
    `<h2>参考来源</h2><ul>${sources.map((s) => `<li><a href="${escape(s.url)}">${escape(s.title)}</a>${s.note ? `<p>${escape(s.note)}</p>` : ''}</li>`).join('')}</ul>`
  const paragraphsHtml = (text) =>
    String(text ?? '')
      .split(/\n\s*\n/)
      .filter(Boolean)
      .map((p) => `<p>${escape(p)}</p>`)
      .join('')
  const { readingArticles, articleTourCatalog } =
    await server.ssrLoadModule('/src/data/articles.ts')
  const { periodCourses } = await server.ssrLoadModule('/src/data/learning.ts')
  const { topicRouteById } = await server.ssrLoadModule('/src/data/topic-routes.ts')
  const { articleReadingLinks } = await server.ssrLoadModule(
    '/src/lib/topic-reading-presentation.ts',
  )
  const topicGuides = [...articleTourCatalog, ...periodCourses].map(({ id, name, steps }) => ({
    id,
    name,
    steps,
  }))
  const eventsById = new Map(events.map((event) => [event.id, event]))
  const { articleSlugs, articleSlug } = await server.ssrLoadModule('/src/data/article-slugs.ts')
  const slugs = readingArticles.map((a) => articleSlug(a.id))
  if (
    new Set(slugs).size !== slugs.length ||
    Object.keys(articleSlugs).length !== readingArticles.length ||
    slugs.some((slug) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
  )
    throw new Error('Article slugs must be complete, unique and URL-safe')
  const directory = `<h1>历史专题</h1><ul>${readingArticles.map((a) => `<li><a href="${base}topics/${articleSlug(a.id)}/">${escape(a.name)}</a><p>${escape(a.description)}</p></li>`).join('')}</ul>`
  const recordEntries = new Map()
  for (const [kind, records] of Object.entries({
    events,
    people,
    dynasties,
    polities: worldPolities,
    places,
  })) {
    for (const record of records)
      recordEntries.set(`${kind}/${routes[kind][record.id]}/`, {
        key: `${kind === 'events' ? 'event' : kind === 'people' ? 'person' : kind === 'places' ? 'place' : 'dynasty'}:${record.id}`,
        payload:
          kind === 'events'
            ? {
                id: record.id,
                sources: record.sources,
                background: record.background,
                impact: record.impact,
                details: record.details,
                narrative: record.narrative,
              }
            : kind === 'people'
              ? { id: record.id, sources: record.sources, biography: record.biography }
              : null,
      })
  }
  async function page(path, title, description, body, article = false, interactive = true, topic) {
    const canonical = url(path)
    const lightReader = !!path && !path.startsWith('topics/')
    const entry = recordEntries.get(path)
    const payload = entry?.payload
      ? `<script id="reading-record" type="application/json">${JSON.stringify(entry.payload).replace(/</g, '\\u003c')}</script>`
      : ''
    const topicPayload = topic
      ? `<script id="reading-topic" type="application/json">${JSON.stringify(topic).replace(/</g, '\\u003c')}</script>`
      : ''
    let html = template.replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
    for (const [attribute, key, value] of [
      ['name', 'description', description],
      ['property', 'og:title', title],
      ['property', 'og:description', description],
      ['property', 'og:url', canonical],
      ['property', 'og:type', article ? 'article' : 'website'],
    ])
      html = html.replace(
        new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*/>`),
        `<meta ${attribute}="${key}" content="${escape(value)}" />`,
      )
    html = html.replace(
      /<link rel="canonical" href="[^"]+"\s*\/>/,
      `<link rel="canonical" href="${escape(canonical)}" />`,
    )
    const schema = article
      ? `<script id="article-structured-data" type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: title.replace(/ · 山河纪$/, ''), description, url: canonical, mainEntityOfPage: canonical, inLanguage: 'zh-CN', isPartOf: { '@type': 'WebSite', name: '山河纪 · Time Atlas', url: url('') } }).replace(/</g, '\\u003c')}</script>`
      : ''
    const breadcrumbs = path
      ? breadcrumbData(`${base}${path}`, title.replace(/ · 山河纪$/, ''), url(''))
      : null
    const breadcrumbSchema = breadcrumbs
      ? `<script id="breadcrumb-structured-data" type="application/ld+json">${JSON.stringify(breadcrumbs).replace(/</g, '\\u003c')}</script>`
      : ''
    const navigation = Object.entries(readingDirectories)
      .map(([folder, name]) => `<a href="${base}${folder}/">${name}</a>`)
      .join(' · ')
    const breadcrumbHtml = breadcrumbs
      ? `<nav aria-label="当前位置">${breadcrumbs.itemListElement.map((item, index) => (index === breadcrumbs.itemListElement.length - 1 ? `<span aria-current="page">${escape(item.name)}</span>` : `<a href="${escape(item.item)}">${escape(item.name)}</a>`)).join(' › ')}</nav>`
      : ''
    html = html
      .replace('</head>', `${schema}${breadcrumbSchema}${payload}${topicPayload}</head>`)
      .replace(
        '<div id="root"></div>',
        lightReader
          ? `<div id="root"><div class="static-reader" data-static-reader${entry ? ` data-record-key="${escape(entry.key)}"` : ''}><header class="reader-header"><a class="reader-brand" href="${base}">山河纪<small>TIME ATLAS</small></a><details><summary>浏览目录</summary><nav aria-label="内容目录">${navigation.replaceAll(' · ', '')}</nav></details><button data-reader-theme aria-label="切换日间与夜间模式">日 / 夜</button></header><div class="reader-layout"><main class="reader-main"><div class="reader-breadcrumb">${breadcrumbHtml}</div><div class="reader-actions">${entry ? '<button data-reader-map>在地图中查看</button><button data-reader-bookmark aria-pressed="false">收藏</button>' : ''}<button data-reader-share>分享</button></div><p class="reader-status" data-reader-status role="status"></p>${!entry ? '<form class="reader-filter" data-reader-filter role="search" hidden><label>查找本页记录<input type="search" placeholder="输入名称、年代或关键词" /></label></form>' : ''}<div class="reader-body">${body}</div></main><aside class="reader-sidebar" data-reader-contents hidden><strong>本页目录</strong></aside></div></div></div>`
          : `<div id="root"><main class="seo-content"><nav aria-label="内容目录"><a href="${base}">山河纪</a> · ${navigation}</nav>${breadcrumbHtml}${body}</main></div>`,
      )
    if (!interactive && !lightReader)
      html = html.replace(/<script type="module"[^>]*>[\s\S]*?<\/script>/g, '')
    const output = resolve(dist, path, 'index.html')
    await mkdir(resolve(output, '..'), { recursive: true })
    await writeFile(output, html)
  }
  await page(
    '',
    '山河纪 · Time Atlas',
    '在地图上读历史，在时间中看山河。探索历史疆域、事件、人物与历史专题。',
    `<h1>山河纪 · Time Atlas</h1><p>在地图上读历史，在时间中看山河。</p>${directory.replace('<h1>', '<h2>').replace('</h1>', '</h2>')}`,
  )
  await page(
    'topics/',
    '历史专题 · 山河纪',
    '阅读山河纪历史专题，沿正文、地图与史料来源理解历史。',
    directory,
  )
  for (const a of readingArticles) {
    if (!/^[a-z0-9-]+$/.test(a.id)) throw new Error(`Invalid article ID: ${a.id}`)
    const links = articleReadingLinks(a, eventsById)
    const contents = Object.entries(a.article.headings ?? {})
      .map(([index, title]) => `<li><a href="#topic-paragraph-${index}">${escape(title)}</a></li>`)
      .join('')
    const paragraphs = a.article.paragraphs
      .map(
        (p, i) =>
          `${a.article.headings?.[i] ? `<h2 id="topic-paragraph-${i}" data-article-block="heading-${i}">${escape(a.article.headings[i])}</h2>` : ''}<p data-article-block="paragraph-${i}">${escape(p)}</p>${
            links.has(i)
              ? `<p>延伸阅读 · ${links
                  .get(i)
                  .map(
                    ({ eventId, label }) => `<a href="${eventHref(eventId)}">${escape(label)}</a>`,
                  )
                  .join(' · ')}</p>`
              : ''
          }`,
      )
      .join('')
    const sources = (a.sources ?? [])
      .map(
        (s) =>
          `<li><a href="${escape(s.url)}">${escape(s.title)}</a>${s.note ? `<p>${escape(s.note)}</p>` : ''}</li>`,
      )
      .join('')
    const introduction = (a.introduction ?? [a.description])
      .map((p, i) => `<p data-article-block="introduction-${i}">${escape(p)}</p>`)
      .join('')
    const companions = a.relatedArticles?.length
      ? `<nav aria-label="相关专题"><h2>相关专题</h2>${linkList(
          a.relatedArticles,
          (id) => `${base}topics/${articleSlug(id)}/`,
          (item) => item.name,
        )}</nav>`
      : ''
    const body = `<article data-static-topic><h1 data-article-block="start">${escape(a.name)}</h1>${contents ? `<nav aria-label="文章目录"><ol>${contents}</ol></nav>` : ''}${introduction}${paragraphs}${a.conclusion ? `<p data-article-block="conclusion">${escape(a.conclusion)}</p>` : ''}${companions}${sources ? `<section data-article-block="sources"><h2>参考来源</h2><ul>${sources}</ul></section>` : ''}</article><p><a href="${base}topics/">浏览全部专题</a></p>`
    const eventIds = new Set([
      ...(a.relatedEventIds ?? []),
      ...(a.article.mapStops ?? []).map(({ eventId }) => eventId),
      ...(a.article.maps ?? []).flatMap(({ eventIds }) => eventIds ?? []),
    ])
    const topicEvents = [...eventIds].flatMap((id) => {
      const event = eventsById.get(id)
      if (!event) return []
      const { year, dateLabel, title, location, locationNote, coordinates, summary } = event
      return [{ id, year, dateLabel, title, location, locationNote, coordinates, summary }]
    })
    const topicRoutes = (a.routeIds ?? []).flatMap((id) => {
      const route = topicRouteById.get(id)
      return route ? [{ id, name: route.name, period: route.period }] : []
    })
    await page(
      `topics/${articleSlug(a.id)}/`,
      `${a.name} · 山河纪`,
      a.description,
      body,
      true,
      true,
      {
        article: a,
        events: topicEvents,
        routes: topicRoutes,
        guides: topicGuides,
      },
    )
  }
  for (const event of events) {
    const relatedEvents = relatedReading(event, events, people)
    const nextReading = relatedEvents.length
      ? `<section class="reader-event-relations" aria-labelledby="related-events"><h2 id="related-events">沿着线索，继续读</h2><ul>${relatedEvents.map(({ event: target, label, note }) => `<li><a href="${eventHref(target.id)}">${escape(target.title)}</a> · ${escape(formatEventDate(target))}<p>${escape(label)} · ${escape(note)}</p></li>`).join('')}</ul></section>`
      : ''
    const narrative = event.narrative
      ? event.narrative.sections
          .map(
            (section) =>
              `${section.title ? `<h2>${escape(section.title)}</h2>` : ''}${section.paragraphs.map(paragraphsHtml).join('')}`,
          )
          .join('') + paragraphsHtml(event.narrative.note)
      : (event.details ?? []).map(paragraphsHtml).join('') +
        `<h2>当时是什么局势？</h2>${paragraphsHtml(event.background)}<h2>它改变了什么？</h2>${paragraphsHtml(event.impact)}`
    const related = event.people
      .filter((id) => routes.people[id])
      .map(
        (id) =>
          `<a href="${personHref(id)}">${escape(people.find((person) => person.id === id)?.name)}</a>`,
      )
      .join(' · ')
    await page(
      `events/${routes.events[event.id]}/`,
      `${event.title} · 山河纪`,
      event.summary,
      `<article><h1>${escape(event.title)}</h1><p>${escape(formatEventDate(event))} · ${escape(event.location)}</p>${paragraphsHtml(event.dateNote)}${paragraphsHtml(event.locationNote)}${paragraphsHtml(event.summary)}${narrative}${nextReading}${related ? `<h2>相关人物</h2><p>${related}</p>` : ''}${
        places.some((p) => eventAtPlace(event, p))
          ? `<h2>相关地点</h2>${linkList(
              places.filter((p) => eventAtPlace(event, p)),
              placeHref,
              (p) => p.name,
            )}`
          : ''
      }${sourcesHtml(event.sources)}</article>`,
      true,
    )
  }
  for (const [kind, records] of [
    ['dynasties', dynasties],
    ['polities', worldPolities],
  ]) {
    for (const dynasty of records) {
      const world = kind === 'polities'
      const related = events.filter(
        (event) =>
          (!world || eventRegion(event) !== 'china') &&
          (world ? (event.endYear ?? event.year) : event.year) >= dynasty.from &&
          event.year <= dynasty.to,
      )
      const chronologyNote = world
        ? '列出档案时间范围内的世界历史节点，用于同时代对照，不表示这些事件都发生在这一政权境内。'
        : '覆盖这一政权的存续年份，包含同时并立政权和周边地区的事件；按时间顺序阅读。'
      await page(
        `${kind}/${routes[kind][dynasty.id]}/`,
        `${dynasty.name} · 山河纪`,
        dynasty.summary,
        `<article><h1>${escape(dynasty.name)}</h1>${paragraphsHtml(dynasty.summary)}<p>政权档案纪年：${escape(compactYear(dynasty.from))}—${escape(compactYear(dynasty.to))}</p><p>都城与中心：${escape(dynasty.capital)}</p>${paragraphsHtml(dynasty.dateNote)}${paragraphsHtml(dynasty.context)}${(dynasty.sections ?? []).map((s) => `${s.title ? `<h2>${escape(s.title)}</h2>` : ''}${paragraphsHtml(s.text)}`).join('')}${dynasty.to < MIN_YEAR ? '<p>这一朝代早于本版地图范围（约前2070—1912年）；可阅读档案，暂不绘制这一时期的疆域。</p>' : ''}${related.length ? `<h2>同时期主要大事</h2><p>${chronologyNote}</p>${linkList(related, eventHref, (e) => `${formatEventDate(e)} · ${e.title}`)}` : ''}${sourcesHtml(dynasty.sources)}</article>`,
        true,
      )
    }
    await page(
      `${kind}/`,
      `${readingDirectories[kind]} · 山河纪`,
      '阅读政权档案、存续纪年、都城、时代背景与参考来源。',
      `<h1>${readingDirectories[kind]}</h1>${linkList(
        records,
        (id) => `${base}${kind}/${routes[kind][id]}/`,
        (d) => `${d.name} · ${compactYear(d.from)}—${compactYear(d.to)}`,
      )}`,
      false,
      false,
    )
  }
  for (const place of places) {
    const intro = placeReading[place.id]
    const related = events.filter((e) => eventAtPlace(e, place))
    const peopleIds = new Set(related.flatMap((e) => e.people))
    const visits = journeys.flatMap((journey) =>
      journey.nodes
        .filter((node) => namesPlace(node.location, place))
        .map((node) => ({ person: people.find((p) => p.id === journey.personId), node })),
    )
    const sources = [
      ...(intro?.sources ?? []),
      ...visits.flatMap((v) => v.node.sources),
      ...related.flatMap((e) => e.sources),
    ]
    const uniqueSources = [...new Map(sources.map((s) => [JSON.stringify(s), s])).values()]
    await page(
      `places/${routes.places[place.id]}/`,
      `${place.name} · 山河纪`,
      intro?.text ?? `${place.name}的历史事件、地名与已核对行迹。`,
      `<article><h1>${escape(place.name)}</h1><p>${escape(place.modern)}</p>${paragraphsHtml(intro?.text)}<p>不同年代的城址与行政范围有所变化，地图坐标为区域参照。以下汇集本版收录的事件与独立核对的行迹。</p><h2>本版地图中的地名标签</h2><p>以下是标签在本版地图中的显示区间，不代表建城、改名或城市存续的准确年代。</p><ul>${place.labels.map((label) => `<li>${escape(label.name)} · ${escape(compactYear(label.from))}—${escape(compactYear(label.to))}年</li>`).join('')}</ul><h2>相关事件</h2>${related.length ? linkList(related, eventHref, (e) => `${formatEventDate(e)} · ${e.title}`) : '<p>此地暂未收录可关联的事件。地名标签本身不代表完整的地方史。</p>'}${
        peopleIds.size
          ? `<h2>事件中的关联人物</h2><p>事件参与、决策等关系不证明本人曾到此地。</p>${linkList(
              people.filter((p) => peopleIds.has(p.id)),
              personHref,
              (p) => p.name,
            )}`
          : ''
      }<h2>独立核对的行迹记录</h2>${visits.length ? visits.map(({ person, node }) => `<section><h3><a href="${personHref(person.id)}">${escape(person.name)}</a> · ${escape(compactYear(node.year))}年 · ${escape(node.kind)} · ${escape(node.location)}</h3>${paragraphsHtml(node.dateNote)}${paragraphsHtml(node.summary)}${paragraphsHtml(node.locationNote)}</section>`).join('') : '<p>本版尚无匹配的已核对行迹，不从关联事件推断到访。</p>'}${sourcesHtml(uniqueSources)}</article>`,
      true,
    )
  }
  await page(
    'places/',
    '历史地点 · 山河纪',
    '沿地点阅读本版收录的历史事件、地名与已核对行迹。',
    `<h1>历史地点</h1>${linkList(places, placeHref, (p) => `${p.name} · ${p.modern}`)}`,
    false,
    false,
  )
  for (const person of people) {
    const related = events.filter((event) => event.people.includes(person.id))
    await page(
      `people/${routes.people[person.id]}/`,
      `${person.name} · 山河纪`,
      person.summary,
      `<article><h1>${escape(person.name)}</h1><p>人物档案 · ${escape(lifeDates(person))} · ${escape(person.role)}</p>${person.courtesy ? `<p>字 ${escape(person.courtesy)}</p>` : ''}${paragraphsHtml(person.biography)}${related.length ? `<h2>相关事件</h2><ul>${related.map((event) => `<li><a href="${eventHref(event.id)}">${escape(event.title)}</a></li>`).join('')}</ul>` : ''}${sourcesHtml(person.sources)}</article>`,
      true,
    )
  }
  await page(
    'people/',
    '历史人物 · 山河纪',
    '历史人物档案、来源与相关事件。',
    `<h1>历史人物</h1><ul>${people.map((person) => `<li><a href="${personHref(person.id)}">${escape(person.name)}</a> · ${escape(lifeDates(person))} · ${escape(person.role)}</li>`).join('')}</ul>`,
    false,
    false,
  )
  await page(
    'events/',
    '历史事件 · 山河纪',
    '按时间阅读历史事件、背景、影响与来源。',
    `<h1>历史事件</h1><ul>${events.map((event) => `<li><a href="${eventHref(event.id)}">${escape(event.title)}</a> · ${escape(formatEventDate(event))}</li>`).join('')}</ul>`,
    false,
    false,
  )
  // Production reading reuses each page's embedded record; separate development JSON is redundant.
  await rm(resolve(dist, 'data/reading'), { recursive: true, force: true })
  const paths = [
    'dynasties/',
    'polities/',
    'places/',
    ...dynasties.map((d) => `dynasties/${routes.dynasties[d.id]}/`),
    ...worldPolities.map((d) => `polities/${routes.polities[d.id]}/`),
    ...places.map((p) => `places/${routes.places[p.id]}/`),
    '',
    'topics/',
    'people/',
    'events/',
    ...readingArticles.map((a) => `topics/${articleSlug(a.id)}/`),
    ...people.map((person) => `people/${routes.people[person.id]}/`),
    ...events.map((event) => `events/${routes.events[event.id]}/`),
  ]
  await writeFile(
    resolve(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>${escape(url(p))}</loc></url>`).join('')}</urlset>\n`,
  )
  await writeFile(
    resolve(dist, 'robots.txt'),
    `User-agent: *\nAllow: /\nSitemap: ${url('sitemap.xml')}\n`,
  )
  console.log(
    `Static HTML ready: ${readingArticles.length} topics, ${people.length} people, ${events.length} events, ${dynasties.length} dynasties, ${worldPolities.length} polities, ${places.length} places, directories, home, sitemap and robots.txt.`,
  )
} finally {
  await server.close()
}
