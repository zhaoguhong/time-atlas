import { readFile, readdir } from 'node:fs/promises'
import { expect, test } from '@playwright/test'
import { setSheet } from './mobile-sheet-helpers'

const escape = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  )
test('all generated record pages contain source text, sources, canonical metadata and sitemap entries', async () => {
  const routes = JSON.parse(await readFile('src/data/generated/reading-routes.json', 'utf8'))
  const sitemap = await readFile('dist/sitemap.xml', 'utf8')
  for (const kind of ['events', 'people']) {
    const files = await readdir(`public/data/reading/${kind}`)
    expect(files.length).toBe(Object.keys(routes[kind]).length)
    for (const file of files) {
      const record = JSON.parse(await readFile(`public/data/reading/${kind}/${file}`, 'utf8'))
      const path = `/${kind}/${routes[kind][record.id]}/`
      const html = await readFile(`dist${path}index.html`, 'utf8')
      expect(html, path).toContain(`<h1>${escape(record.title ?? record.name)}</h1>`)
      expect(html, path).toContain(`rel="canonical" href="https://history.zhaoguhong.com${path}"`)
      expect(sitemap).toContain(`<loc>https://history.zhaoguhong.com${path}</loc>`)
      const paragraphs =
        kind === 'people'
          ? record.biography.split(/\n\s*\n/)
          : record.narrative
            ? record.narrative.sections.flatMap((s: { paragraphs: string[] }) => s.paragraphs)
            : [...(record.details ?? []), record.background, record.impact]
      for (const paragraph of paragraphs.filter(Boolean))
        expect(html, path).toContain(escape(paragraph))
      for (const source of record.sources)
        expect(html, path).toContain(`href="${escape(source.url)}"`)
    }
  }
})

test('directories and sample pages work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false })
  const page = await context.newPage()
  for (const [kind, count] of [
    ['people', 1504],
    ['events', 2024],
  ] as const) {
    await page.goto(`/${kind}/`)
    await expect(page.locator(`li a[href^="/${kind}/"]`)).toHaveCount(count)
  }
  await page.goto('/people/li-bai/')
  await expect(page.locator('article h1')).toHaveText('李白')
  await page.goto('/events/battle-of-chibi/')
  await expect(page.locator('article h1')).toContainText('赤壁')
  await context.close()
})

test('a shared event can be followed and revisited without JavaScript', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false })
  try {
    const page = await context.newPage()
    await page.goto('/events/shiting/')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('石亭之战')
    const relations = page.getByRole('region', { name: '沿着线索，继续读' })
    const next = relations.getByRole('link', { name: '孙权称帝' })
    const row = relations.getByRole('listitem').filter({
      has: page.getByRole('link', { name: '孙权称帝' }),
    })
    await expect(next).toHaveAttribute('href', '/events/wu-emperor/')
    await expect(row).toContainText('公元 229 年')
    await expect(row).toContainText('共同关联：孙权、陆逊')

    await page.reload()
    await next.click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('孙权称帝')
    await page.goBack()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('石亭之战')
    await expect(next).toBeVisible()
  } finally {
    await context.close()
  }
})

test('a shared event links to curated related reading without JavaScript', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false })
  try {
    const page = await context.newPage()
    await page.goto('/events/calendar/')
    const relations = page.locator('.reader-event-relations')
    const row = relations.getByRole('listitem').filter({ hasText: '历法之外的史官著述' })
    await expect(row).toHaveCount(1)
    await expect(row).toContainText('前104年起（著述阶段）')
    await expect(row).toContainText('两条记录共享前104年参照')
    const link = row.getByRole('link', { name: '司马迁承接父志，持续编纂《史记》' })
    await expect(link).toHaveAttribute('href', '/events/simaqian-shiji-writing/')
    await link.click()
    await expect(page).toHaveURL(/\/events\/simaqian-shiji-writing\/$/)
    await expect(page.locator('article h1')).toHaveText('司马迁承接父志，持续编纂《史记》')
  } finally {
    await context.close()
  }
})

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
]) {
  test(`event links return to the same atlas reading position at ${viewport.width}px`, async ({
    page,
  }) => {
    const compact = viewport.width < 700
    await page.setViewportSize(viewport)
    await page.goto('/events/battle-of-chibi/')
    await page.getByRole('button', { name: '在地图中查看', exact: true }).click()
    await expect(page.locator('.event-article')).toBeVisible()
    if (compact) await setSheet(page, 'reading')

    const panel = page.locator('.panel-scroll')
    const relation = page.locator('.event-relations li').filter({ hasText: '刘备取得益州' })
    const link = relation.getByRole('link')
    await link.scrollIntoViewIfNeeded()
    await expect(link).toBeInViewport({ ratio: 1 })
    await expect(link).toHaveCSS('display', 'grid')
    await expect(link).toHaveAttribute('href', '/events/yizhou/')
    await expect(relation.locator('.event-relation-meta')).toHaveText('同一人物 · 公元 214 年')
    await expect(relation.locator('small')).not.toBeEmpty()
    const position = await panel.evaluate((element) => element.scrollTop)
    expect(position).toBeGreaterThan(0)

    await link.click()
    await expect(page.locator('.event-detail h2')).toHaveText('刘备取得益州')
    await expect(page).toHaveURL(/\/events\/yizhou\/$/)
    await expect(page.locator('.atlas-app')).toBeVisible()
    if (compact) await page.getByRole('button', { name: '返回事件', exact: true }).click()
    else await page.goBack()
    await expect(page).toHaveURL(/\/events\/battle-of-chibi\/$/)
    await expect(page.locator('.event-detail h2')).toHaveText('赤壁之战')
    await expect(link).toBeInViewport({ ratio: 1 })
    await expect.poll(() => panel.evaluate((element) => element.scrollTop)).toBeCloseTo(position, 0)
  })
}
