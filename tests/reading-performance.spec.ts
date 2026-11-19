import { readFile, stat } from 'node:fs/promises'
import { gzipSync } from 'node:zlib'
import { expect, test } from '@playwright/test'

const paths = [
  ['/people/li-bai/', '李白'],
  ['/events/battle-of-chibi/', '赤壁之战'],
  ['/dynasties/tang/', '唐朝'],
  ['/polities/roman-empire/', '罗马帝国'],
  ['/places/changan/', '长安 / 西安'],
] as const

test('publication reuses HTML records and no longer distributes duplicate reading JSON', async () => {
  await expect(stat('dist/data/reading')).rejects.toThrow()
  for (const [path] of paths.slice(0, 2)) {
    const html = await readFile(`dist${path}index.html`, 'utf8')
    const payload = JSON.parse(
      html.match(/id="reading-record" type="application\/json">(.*?)<\/script>/s)![1],
    )
    expect(payload.id).toBeTruthy()
    expect(payload.sources.length).toBeGreaterThan(0)
    expect(payload.biography || payload.narrative || payload.background).toBeTruthy()
    expect(payload.coordinates).toBeUndefined()
  }
})

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
  { width: 844, height: 390 },
]) {
  test(`light reading, optional atlas, storage and native navigation ${viewport.width}`, async ({
    page,
    baseURL,
  }, info) => {
    await page.setViewportSize(viewport)
    const errors: string[] = []
    const requests: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    page.on('request', (r) => requests.push(r.url()))
    for (const [path, title] of paths) {
      requests.length = 0
      await page.goto(path)
      await expect(page.locator('.reader-body h1')).toHaveText(title)
      await page.waitForLoadState('networkidle')
      expect(
        requests.filter((url) => /geojson|app-entry|maplibre|reading\/.*json/.test(url)),
      ).toEqual([])
      await expect(page.locator('canvas,.atlas-app')).toHaveCount(0)
      expect(
        await page.evaluate(() =>
          performance
            .getEntriesByType('resource')
            .filter((r) => r.name.endsWith('.js'))
            .reduce((sum, r) => sum + (r as PerformanceResourceTiming).decodedBodySize, 0),
        ),
      ).toBeLessThan(20_000)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      )
      await page.screenshot({ path: info.outputPath(`${path.split('/')[1]}-reader.png`) })
    }
    await page.goto('/people/li-bai/')
    await page.getByRole('button', { name: '收藏', exact: true }).click()
    await expect(page.getByRole('button', { name: '已收藏', exact: true })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    await page.evaluate(() => window.scrollTo(0, 400))
    await expect
      .poll(() =>
        page.evaluate(() =>
          Number(localStorage.getItem('time-atlas:reader-position:/people/li-bai/')),
        ),
      )
      .toBeGreaterThan(250)
    await page.reload()
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(250)
    await expect(page.getByRole('button', { name: '已收藏', exact: true })).toBeAttached()
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.getByRole('button', { name: '分享', exact: true }).click()
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      new URL('/people/li-bai/', baseURL).href,
    )
    await page.getByRole('button', { name: '在地图中查看', exact: true }).click()
    await expect(page.locator('.person-biography')).toBeVisible()
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    await expect(page).toHaveURL('/people/li-bai/')
    await page.reload()
    await expect(page.locator('.reader-body h1')).toHaveText('李白')
    await page.getByRole('button', { name: '在地图中查看', exact: true }).click()
    await expect(page.locator('.person-biography')).toBeVisible()
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    const event = page.locator('.person-events a').first()
    const destination = await event.getAttribute('href')
    const response = page.waitForResponse(
      (r) => new URL(r.url()).pathname === destination && r.request().resourceType() === 'fetch',
    )
    await event.click()
    expect((await response).status()).toBe(200)
    await expect(page.locator('.event-detail .reference-list')).toBeVisible()
    await page.goBack()
    await expect(page.locator('.person-detail h2')).toHaveText('李白字 太白')
    await page.locator('.reader-return').click()
    await expect(page.locator('.reader-body h1')).toHaveText('李白')
    await expect(page.locator('canvas,.atlas-app')).toHaveCount(0)
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(250)
    await page.goto('/')
    await expect(page.locator('.home-resume')).toContainText('李白')
    await page.locator('.home-resume').click()
    await expect(page.locator('.reader-body h1')).toHaveText('李白')
    expect(errors).toEqual([])
  })
}

test('directory search and night mode remain small native enhancements', async ({ page }) => {
  await page.goto('/people/')
  await page.getByLabel('查找本页记录').fill('李白')
  await expect(page.locator('.reader-body > ul > li:visible')).toHaveCount(1)
  await page.getByRole('button', { name: '切换日间与夜间模式' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-color-mode', 'dark')
  await page.locator('.reader-body li:visible a').click()
  await expect(page.locator('.reader-body h1')).toHaveText('李白')
  await expect(page.locator('html')).toHaveAttribute('data-color-mode', 'dark')
  const chapter = page.locator('.reader-sidebar a').first()
  const anchor = await chapter.getAttribute('href')
  await chapter.click()
  const heading = await page.locator(anchor!).boundingBox()
  const actions = await page.locator('.reader-actions').boundingBox()
  expect(heading!.y).toBeGreaterThanOrEqual(actions!.y + actions!.height)
})

test('slow topic startup transfers the paragraph already visible in static HTML', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.addInitScript(() => {
    localStorage.setItem(
      'time-atlas:topic-article:v7:silk-road',
      JSON.stringify({ block: 'introduction-0', offset: 0 }),
    )
  })
  let releaseApp!: () => void
  const holdApp = new Promise<void>((resolve) => {
    releaseApp = resolve
  })
  await page.route(/\/assets\/topic-entry-.*\.js$/, async (route) => {
    await holdApp
    await route.continue()
  })
  await page.goto('/topics/silk-road/')
  const paragraph = page.locator('.seo-content article p').filter({ hasText: '西域都护' }).first()
  const text = await paragraph.innerText()
  try {
    await paragraph.evaluate((element) => {
      const box = element.getBoundingClientRect()
      window.scrollBy(0, box.top + box.height / 3)
    })
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500)
  } finally {
    releaseApp()
  }

  const resumed = page.locator('.topic-article p').getByText(text, { exact: true })
  await expect(resumed).toBeVisible()
  await expect
    .poll(() =>
      resumed.evaluate((element) => {
        const box = element.getBoundingClientRect()
        const panelTop = element.closest('.panel-scroll')!.getBoundingClientRect().top
        return Math.abs((panelTop - box.top) / box.height - 1 / 3)
      }),
    )
    .toBeLessThan(0.08)
})

test('topic maps load only after opening, render and release their canvases', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 })
  const requests: string[] = []
  page.on('request', (r) => requests.push(r.url()))
  await page.goto('/topics/silk-road/')
  await expect(page.locator('.topic-introduction h2')).toBeVisible()
  await page.waitForLoadState('networkidle')
  expect(
    requests.filter((url) =>
      /geojson|maplibre|app-entry|HistoryMap|RouteMap|TopicInlineMap/.test(url),
    ),
  ).toEqual([])
  const scripts = new Set(
    requests.map((url) => new URL(url).pathname).filter((path) => path.endsWith('.js')),
  )
  const scriptBytes = (
    await Promise.all([...scripts].map((path) => readFile(`dist${path}`)))
  ).reduce((sum, script) => sum + gzipSync(script).byteLength, 0)
  expect(scriptBytes).toBeGreaterThan(0)
  expect(scriptBytes).toBeLessThanOrEqual(200 * 1024)
  await info.attach('topic-initial-javascript', {
    body: `${scriptBytes} bytes gzipped`,
    contentType: 'text/plain',
  })

  const contents = page.getByRole('navigation', { name: '文章目录' })
  await contents.getByRole('button', { name: '文章目录', exact: true }).click()
  await contents.getByRole('button', { name: '路线总览', exact: true }).click()
  await expect(page.locator('#topic-route-overview')).toBeInViewport()
  const figure = page.locator('.topic-map-figure').first()
  await figure.scrollIntoViewIfNeeded()
  await expect(figure.locator('canvas')).toHaveCount(0)
  await figure.locator('.topic-map-visibility').click()
  await expect(figure.locator('.topic-inline-map')).toHaveAttribute('data-ready', 'true')
  await page.screenshot({ path: info.outputPath('requested-map.png') })
  const expand = figure.locator('.topic-map-enlarge')
  await expand.scrollIntoViewIfNeeded()
  const position = (await expand.boundingBox())!.y
  await expand.click()
  const dialog = page.getByRole('dialog', { name: /^放大地图：/ })
  await expect(dialog.locator('canvas')).toBeVisible()
  await dialog.getByRole('button', { name: '关闭地图，返回文章' }).click()
  await expect(dialog).toHaveCount(0)
  await expect(expand).toBeFocused()
  expect((await expand.boundingBox())!.y).toBeCloseTo(position, 0)
  await figure.locator('.topic-map-visibility').click()
  await expect(figure.locator('canvas')).toHaveCount(0)
  const overview = page.locator('.topic-route-overview')
  await overview.scrollIntoViewIfNeeded()
  await overview.locator('.topic-route-visibility').click()
  await expect(overview.locator('.topic-route-map')).toHaveAttribute('data-ready', 'true')
  await overview.locator('.topic-route-visibility').click()
  await expect(page.locator('canvas')).toHaveCount(0)
})

test('related topic events keep the canvas off until the reader requests it', async ({ page }) => {
  const requests: string[] = []
  page.on('request', (r) => requests.push(r.url()))
  await page.goto('/topics/silk-road/')
  await page.locator('.topic-events-summary').click()
  const chapter = page.locator('.topic-chapter-list li').first().getByRole('button')
  await chapter.click()
  await expect(page.locator('.event-detail h2')).toBeVisible()
  await page.waitForLoadState('networkidle')
  expect(
    requests.filter((url) => /geojson|maplibre|HistoryMap|RouteMap|TopicInlineMap/.test(url)),
  ).toEqual([])
  await expect(page.locator('canvas')).toHaveCount(0)
  await page.goBack()
  await expect(page).toHaveURL(/\/topics\/silk-road\/$/)
  await expect(chapter).toBeInViewport()
  await chapter.click()
  await expect(page.locator('.event-detail h2')).toBeVisible()
  await page.locator('.main-nav').getByRole('button', { name: '地图', exact: true }).click()
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
})
