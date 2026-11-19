import { articleSlugs } from '../src/data/article-slugs'
import { expect, test } from '@playwright/test'

test('every sitemap article serves complete text and unique metadata without JavaScript', async ({
  browser,
  baseURL,
  request,
}) => {
  const sitemap = await (await request.get('/sitemap.xml')).text()
  const paths = [...sitemap.matchAll(/<loc>https:\/\/[^<]+?(\/topics\/[^<]+\/)<\/loc>/g)].map(
    (m) => m[1],
  )
  expect(paths).toHaveLength(Object.keys(articleSlugs).length)
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false })
  const page = await context.newPage()
  for (const path of paths) {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    await expect(page.locator('article h1')).toBeVisible()
    expect((await page.locator('article').innerText()).length).toBeGreaterThan(500)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://history.zhaoguhong.com${path}`,
    )
    expect(await page.title()).toContain(await page.locator('article h1').innerText())
    expect(await page.locator('article a').count()).toBeGreaterThan(0)
    const schema = JSON.parse(
      (await page.locator('#article-structured-data').textContent()) ?? '{}',
    )
    expect(schema.url).toBe(`https://history.zhaoguhong.com${path}`)
  }
  await page.goto('/')
  expect(await page.locator('a[href^="/topics/"]').count()).toBeGreaterThanOrEqual(
    Object.keys(articleSlugs).length,
  )
  await context.close()
})

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
  { width: 844, height: 390 },
]) {
  test(`article navigation, refresh and history ${viewport.width}`, async ({
    page,
    baseURL,
  }, info) => {
    await page.setViewportSize(viewport)
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    await page.goto('/topics/')
    const link = page.locator('a.tour-card[href="/topics/silk-road/"]')
    await expect(link).toBeVisible()
    await link.click()
    await expect(page).toHaveURL(/\/topics\/silk-road\/$/)
    await expect(page.locator('.topic-introduction h2')).toContainText('丝绸之路')
    await expect(page).toHaveTitle(/丝绸之路/)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://history.zhaoguhong.com/topics/silk-road/',
    )
    await page.reload()
    await expect(page.locator('.topic-introduction h2')).toContainText('丝绸之路')
    await expect(page.locator('.topic-introduction')).toBeVisible()
    await page.screenshot({ path: info.outputPath('article.png') })
    await page.getByRole('button', { name: '全部专题', exact: true }).click()
    await expect(page).toHaveURL(/\/topics\/$/)
    await expect(page.locator('a.tour-card')).toHaveCount(Object.keys(articleSlugs).length)
    await page.goForward()
    await expect(page.locator('.topic-introduction h2')).toContainText('丝绸之路')
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.getByRole('button', { name: '分享专题', exact: true }).click()
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      new URL('/topics/silk-road/', baseURL).href,
    )
    expect(errors).toEqual([])
  })
}

test('all public article paths open the matching interactive article without URL state', async ({
  page,
}) => {
  for (const slug of Object.values(articleSlugs)) {
    await page.goto(`/topics/${slug}/`)
    await expect(page.locator('.topic-introduction h2')).toBeVisible()
    await expect(page).toHaveURL(`/topics/${slug}/`)
    const title = await page.locator('.topic-introduction h2').innerText()
    await expect(page).toHaveTitle(`${title} · 山河纪`)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://history.zhaoguhong.com/topics/${slug}/`,
    )
  }
})
