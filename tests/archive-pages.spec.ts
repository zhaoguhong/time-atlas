import { readFile } from 'node:fs/promises'
import { expect, test } from '@playwright/test'
import { dynasties } from '../src/data/dynasties'
import { worldPolities } from '../src/data/world-polities'
import { places } from '../src/lib/exploration'
import { placeReading } from '../src/data/place-reading'

const escape = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  )

test('every archive has complete source text, metadata, sources and a unique sitemap entry', async () => {
  const routes = JSON.parse(await readFile('src/data/generated/reading-routes.json', 'utf8'))
  const sitemap = await readFile('dist/sitemap.xml', 'utf8')
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  expect(new Set(locations).size).toBe(locations.length)
  for (const [kind, records] of [
    ['dynasties', dynasties],
    ['polities', worldPolities],
    ['places', places],
  ] as const) {
    for (const record of records) {
      const path = `/${kind}/${routes[kind][record.id]}/`
      const html = await readFile(`dist${path}index.html`, 'utf8')
      expect(html, path).toContain(`<h1>${escape(record.name)}</h1>`)
      expect(html, path).toContain(`rel="canonical" href="https://history.zhaoguhong.com${path}"`)
      expect(locations).toContain(`https://history.zhaoguhong.com${path}`)
      const paragraphs =
        'summary' in record
          ? [
              record.summary,
              record.context,
              record.dateNote,
              ...(record.sections ?? []).map((s) => s.text),
            ]
          : [placeReading[record.id]?.text]
      for (const paragraph of paragraphs.filter(Boolean)) {
        for (const part of paragraph!.split(/\n\s*\n/)) expect(html, path).toContain(escape(part))
      }
      const sources =
        'sources' in record ? record.sources : (placeReading[record.id]?.sources ?? [])
      for (const source of sources) expect(html, path).toContain(`href="${escape(source.url)}"`)
      const breadcrumb = JSON.parse(
        html.match(/id="breadcrumb-structured-data"[^>]*>(.*?)<\/script>/)![1],
      )
      expect(breadcrumb.itemListElement.at(-1).item).toBe(`https://history.zhaoguhong.com${path}`)
    }
  }
})

test('archive directories and reading links work with JavaScript disabled', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false })
  const page = await context.newPage()
  for (const [kind, count] of [
    ['dynasties', 53],
    ['polities', 55],
    ['places', 80],
  ] as const) {
    await page.goto(`/${kind}/`)
    await expect(page.locator(`li a[href^="/${kind}/"]`)).toHaveCount(count)
    await page.locator(`li a[href^="/${kind}/"]`).first().click()
    await expect(page.locator('article h1')).toBeVisible()
    await expect(page.locator('nav[aria-label="当前位置"]')).toBeVisible()
  }
  await page.goto('/places/changan/')
  await expect(page.locator('article')).toContainText('不证明本人曾到此地')
  await expect(page.locator('article a[href^="/events/"]').first()).toBeVisible()
  await context.close()
})
