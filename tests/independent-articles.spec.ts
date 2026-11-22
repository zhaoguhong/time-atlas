import { articleSlugs } from '../src/data/article-slugs'
import { expect, test, type Page } from '@playwright/test'

const viewports = [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
  { width: 844, height: 390 },
]
const independentArticles = [
  { id: 'observing-sky-measuring-position', title: '船上正午，港口几点？航海钟与经度' },
  { id: 'tax-money-markets', title: '青苗钱：北宋官府为什么要给农户放贷' },
]
const geography = /\/data\/(?:maps\/|land\.geojson|lakes\.geojson|rivers_lake_centerlines\.geojson)/

function viewState(page: Page) {
  const params = new URLSearchParams(new URL(page.url()).hash.slice(1))
  return Object.fromEntries(
    ['year', 'scope', 'category', 'lng', 'lat', 'zoom'].map((key) => [key, params.get(key)]),
  )
}
async function noHorizontalOverflow(page: Page, width: number) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
}

for (const viewport of viewports) {
  for (const article of independentArticles) {
    test(`独立文章无需事件或地图 ${article.id} ${viewport.width}`, async ({ page }, info) => {
      await page.setViewportSize(viewport)
      const mapRequests: string[] = []
      const errors: string[] = []
      page.on('request', (request) => {
        if (geography.test(request.url())) mapRequests.push(request.url())
      })
      page.on('pageerror', (error) => errors.push(error.message))
      await page.goto(`/topics/${articleSlugs[article.id]}/`)
      await expect(page.locator('.topic-introduction h2')).toHaveText(article.title)
      await expect(page.getByRole('region', { name: '专题讲解' })).toBeVisible()
      await expect(page.locator('.atlas-app')).toHaveAttribute('data-topic-reading', 'true')
      await expect(page.locator('.map-canvas, .pillar-stage')).toHaveCount(0)
      await expect(
        page.locator(
          '.topic-related-events, .topic-chapter-list, .topic-inline-map-entry, .topic-map-stop',
        ),
      ).toHaveCount(0)
      await expect(
        page.getByRole('button', { name: /开始地图学习|查看专题地点|查看路线地图/ }),
      ).toHaveCount(0)
      await expect(page.locator('#topic-sources a').first()).toHaveAttribute('href', /^https:/)
      expect(mapRequests).toEqual([])
      await page.reload()
      await expect(page.locator('.topic-introduction h2')).toHaveText(article.title)
      await expect(page.locator('.map-canvas, .topic-inline-map')).toHaveCount(0)
      expect(mapRequests).toEqual([])
      expect(errors).toEqual([])
      await noHorizontalOverflow(page, viewport.width)
      await page.screenshot({
        path: info.outputPath(`independent-${article.id}-${viewport.width}.png`),
        fullPage: true,
      })
    })
  }

  test(`读独立文章并返回保留主图年份筛选和最新相机 ${viewport.width}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/#year=741&scope=nearby&category=战争&lng=105&lat=36&zoom=3.2')
    const mainMap = page.locator('.map-canvas')
    await expect(mainMap).toHaveAttribute('data-rendered', 'true')
    await expect.poll(() => Number(viewState(page).zoom)).toBeCloseTo(3.2, 2)
    await page.getByRole('button', { name: '放大地图', exact: true }).click()
    await expect.poll(() => Number(viewState(page).zoom)).toBeCloseTo(4.2, 2)
    await expect(mainMap).toHaveAttribute('data-rendered', 'true')
    const before = viewState(page)
    expect(before.year).toBe('741')
    expect(before.scope).toBe('nearby')
    expect(before.category).toBe('战争')
    await page.locator('.main-nav').getByRole('button', { name: '历史专题', exact: true }).click()
    await expect(page.locator('.topic-directory')).toBeVisible()
    await expect(mainMap).toHaveCount(0)
    await page
      .getByRole('link', { name: '阅读专题：船上正午，港口几点？航海钟与经度', exact: true })
      .click()
    await expect(page.locator('.topic-introduction h2')).toHaveText(
      '船上正午，港口几点？航海钟与经度',
    )
    await expect(page).toHaveURL(/\/topics\/time-and-science\/$/)
    await page.reload()
    await expect(page.locator('.topic-introduction h2')).toBeVisible()
    await expect(page).toHaveURL(/\/topics\/time-and-science\/$/)
    await page.locator('.main-nav').getByRole('button', { name: '地图', exact: true }).click()
    await expect(mainMap).toHaveAttribute('data-rendered', 'true')
    await expect(page.locator('.topic-reader-layout')).toHaveCount(0)
    await expect.poll(() => viewState(page)).toEqual(before)
    await noHorizontalOverflow(page, viewport.width)
  })

  test(`文中地图按需加载并保持文章和主图状态 ${viewport.width}`, async ({ page }, info) => {
    await page.setViewportSize(viewport)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const mapRequests: string[] = []
    page.on('request', (request) => {
      if (geography.test(request.url())) mapRequests.push(request.url())
    })
    await page.goto('/topics/silk-road/#year=741&scope=nearby&category=战争')
    await expect(page.locator('.topic-introduction h2')).toHaveText(
      '丝绸之路：陆海之间的贸易与文明交流',
    )
    const entry = page.locator('[data-article-block="map-hexi-corridor"]')
    const toggle = entry.locator('.topic-map-visibility')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(entry.locator('.topic-inline-map')).toHaveCount(0)
    await expect(page.locator('.map-canvas')).toHaveCount(0)
    expect(mapRequests).toEqual([])
    const address = page.url()
    const before = viewState(page)
    await entry.scrollIntoViewIfNeeded()
    await expect(entry.locator('canvas')).toHaveCount(0)
    expect(mapRequests).toEqual([])
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    const inline = entry.locator('.topic-inline-map')
    await expect(inline).toHaveAttribute('data-ready', 'true')
    await expect(inline).toHaveAttribute('data-map-year', '-121')
    await expect(inline.locator('.topic-inline-map-canvas canvas')).toBeVisible()
    expect(mapRequests.some((url) => /\/data\/maps\//.test(url))).toBe(true)
    expect(mapRequests.some((url) => url.endsWith('/data/land.geojson'))).toBe(true)
    await expect(page.locator('.map-canvas')).toHaveCount(0)
    await expect(page).toHaveURL(address)
    expect(viewState(page)).toEqual(before)
    await inline.locator('.topic-inline-map-places button').first().click()
    await expect(inline.locator('.topic-inline-map-selection strong')).toHaveCount(1)
    await expect(page).toHaveURL(address)
    await page.screenshot({
      path: info.outputPath(`inline-map-${viewport.width}.png`),
      fullPage: true,
    })
    await inline.locator('.topic-inline-map-canvas canvas').focus()
    await page.keyboard.press('Escape')
    await expect(inline).toHaveCount(0)
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(toggle).toBeFocused()
    expect(viewState(page)).toEqual(before)
    await noHorizontalOverflow(page, viewport.width)
  })

  test(`文中地图失败后继续阅读与重试 ${viewport.width}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.route('**/data/land.geojson', (route) => route.abort())
    await page.goto('/topics/silk-road/#year=741')
    const entry = page.locator('[data-article-block="map-hexi-corridor"]')
    await entry.getByRole('button', { name: '展开地图：河西走廊的位置' }).click()
    const inline = entry.locator('.topic-inline-map')
    await expect(inline.getByRole('status')).toContainText('地图暂时无法载入，可以继续阅读正文')
    await expect(page.getByRole('region', { name: '专题讲解' })).toContainText('西域')
    const address = page.url()
    await page.unroute('**/data/land.geojson')
    await inline.getByRole('button', { name: '重新载入文中地图', exact: true }).click()
    await expect(inline).toHaveAttribute('data-ready', 'true')
    await expect(inline.locator('.topic-inline-map-canvas canvas')).toBeVisible()
    await expect(page).toHaveURL(address)
    await expect(page.locator('.map-canvas')).toHaveCount(0)
    await noHorizontalOverflow(page, viewport.width)
  })

  test(`文中地图放大保留选点、相机与正文位置 ${viewport.width}`, async ({ page }, info) => {
    await page.setViewportSize(viewport)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/topics/silk-road/#year=741&scope=nearby&category=战争')
    const figure = page.locator('[data-article-block="map-hexi-corridor"]')
    await figure.getByRole('button', { name: '展开地图：河西走廊的位置' }).click()
    const inline = figure.locator('.topic-inline-map')
    await expect(inline).toHaveAttribute('data-ready', 'true')
    await inline.locator('.topic-inline-map-places button').first().click()
    const selection = await inline.locator('.topic-inline-map-selection strong').innerText()
    const canvas = await inline.locator('canvas').elementHandle()
    const address = page.url()
    const enlarge = figure.locator('.topic-map-enlarge')
    await enlarge.scrollIntoViewIfNeeded()
    const position = (await enlarge.boundingBox())!.y
    await enlarge.click()
    const dialog = page.getByRole('dialog', { name: '放大地图：河西走廊的位置', exact: true })
    await expect(dialog).toBeVisible()
    await expect(dialog.locator('.topic-inline-map')).toHaveAttribute('data-ready', 'true')
    expect(
      await dialog.locator('canvas').evaluate((element, original) => element === original, canvas),
    ).toBe(true)
    await expect(dialog.locator('.topic-inline-map-selection strong')).toHaveText(selection)
    await expect(page).toHaveURL(address)
    await expect(dialog.locator('canvas')).toBeVisible()
    await page.screenshot({ path: info.outputPath(`enlarged-map-${viewport.width}.png`) })
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(enlarge).toBeFocused()
    expect(
      await inline.locator('canvas').evaluate((element, original) => element === original, canvas),
    ).toBe(true)
    expect((await enlarge.boundingBox())!.y).toBeCloseTo(position, 0)
    await expect(page).toHaveURL(address)
    await noHorizontalOverflow(page, viewport.width)
  })
}

test('文章内全局搜索事件会退出文章并能返回原文', async ({ page }) => {
  await page.goto('/topics/time-and-science/#year=741')
  await expect(page.locator('.topic-introduction h2')).toHaveText(
    '船上正午，港口几点？航海钟与经度',
  )
  const search = page.getByRole('combobox', { name: '搜索历史事件、人物或地名' })
  await search.fill('赤壁之战')
  await page
    .getByRole('listbox', { name: '历史搜索结果' })
    .getByRole('option')
    .filter({ has: page.getByText('赤壁之战', { exact: true }) })
    .click()
  await expect(page.locator('.event-detail h2')).toHaveText('赤壁之战')
  await expect(page.locator('.topic-reader-layout')).toHaveCount(0)
  await expect(page).toHaveURL(/\/events\/battle-of-chibi\/$/)
  await page.goBack()
  await expect(page.locator('.topic-introduction h2')).toHaveText(
    '船上正午，港口几点？航海钟与经度',
  )
})

test('旧专题链接在省略章节下标时仍优先打开明确事件', async ({ page }) => {
  await page.goto(
    '/#visual=pillar&tour=disease-medicine-public-health&event=modern-smallpox-eradication',
  )
  await expect(page.locator('.event-detail h2')).toHaveText('世界卫生组织宣布天花被根除')
  await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', '1980')
  await expect(page).toHaveURL(/\/events\/modern-smallpox-eradication\/$/)
  await expect(page.locator('.topic-reader-layout')).toHaveCount(0)
})

for (const viewport of viewports) {
  test(`原理图片放大与焦点返回 ${viewport.width}`, async ({ page }, info) => {
    await page.setViewportSize(viewport)
    await page.goto('/topics/time-and-science/#year=741')
    const figure = page.locator('[data-article-block="media-longitude-two-times"]')
    const image = figure.locator('img').first()
    await image.scrollIntoViewIfNeeded()
    await expect
      .poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth))
      .toBe(600)
    const preview = figure.getByRole('button', { name: /^放大查看图片：/ })
    await preview.scrollIntoViewIfNeeded()
    const panel = page.locator('#history-reading-content')
    const before = await panel.evaluate((element) => element.scrollTop)
    const address = page.url()
    await preview.click()
    const dialog = page.getByRole('dialog', { name: /^图片详情：/ })
    await expect(dialog).toBeVisible()
    await expect(dialog.locator('img')).toHaveAttribute('width', '600')
    await expect(dialog.getByRole('region', { name: '图片细节' })).toBeVisible()
    if (viewport.width < 600)
      expect(
        await dialog
          .locator('.topic-image-canvas')
          .evaluate((element) => element.scrollWidth > element.clientWidth),
      ).toBe(true)
    await page.screenshot({ path: info.outputPath(`image-viewer-${viewport.width}.png`) })
    await page.keyboard.press('Escape')
    await expect(dialog).not.toBeVisible()
    await expect(preview).toBeFocused()
    await expect(page).toHaveURL(address)
    expect(Math.abs((await panel.evaluate((element) => element.scrollTop)) - before)).toBeLessThan(
      5,
    )
    await noHorizontalOverflow(page, viewport.width)
  })
}
