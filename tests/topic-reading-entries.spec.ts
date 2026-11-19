import { articleSlugs } from '../src/data/article-slugs'
import { readFileSync } from 'node:fs'
import { expect, test, type Page } from '@playwright/test'
import { TOPIC_CHAPTER_DURATION_MS } from '../src/lib/playback'
import { articleGroups } from '../src/data/article-groups'

const eventSlugs: Record<string, string> = JSON.parse(
  readFileSync('src/data/generated/reading-routes.json', 'utf8'),
).events

const ids = process.env.READING_PILOT
  ? ['opium-wars', 'silk-road']
  : articleGroups.map(([id]) => id)
const routeArticles = [
  { id: 'silk-road', routes: 5 },
  { id: 'age-of-exploration', routes: 3 },
  { id: 'buddhist-texts-and-networks', routes: 2 },
]

function mapViewState(page: Page) {
  const params = new URLSearchParams(new URL(page.url()).hash.slice(1))
  return Object.fromEntries(
    ['year', 'scope', 'category', 'lng', 'lat', 'zoom'].map((key) => [key, params.get(key)]),
  )
}
for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
  { width: 844, height: 390 },
]) {
  test(`专题入口布局与完整索引 ${viewport.width}`, async ({ page }, info) => {
    test.setTimeout(120000) // Traverses the complete directory in a single browser context.
    await page.setViewportSize(viewport)
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    for (const id of ids) {
      await page.goto(`/topics/${articleSlugs[id]}/`)
      await expect(page.locator('.topic-reader-layout')).toHaveAttribute(
        'data-link-layout',
        'compact',
      )
      await expect(page.locator('.topic-map-stop')).toHaveCount(0)
      const links = page.locator('.topic-event-link')
      for (const link of await links.all()) {
        const box = await link.boundingBox()
        expect(box!.height).toBeGreaterThanOrEqual(44)
        expect(box!.width).toBeGreaterThanOrEqual(44)
        await expect(link.locator('svg')).toHaveCount(0)
      }
      const index = page.locator('.topic-related-events details')
      if (await index.count()) {
        await expect(index).not.toHaveAttribute('open', '')
        await index.locator('summary').click()
        await expect(index).toHaveAttribute('open', '')
        const allIds = await index
          .locator('[data-event-id]')
          .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-event-id')))
        expect(new Set(allIds).size).toBe(allIds.length)
        for (const link of await links.all())
          expect(allIds).toContain(await link.getAttribute('data-event-id'))
        await expect(index.locator('.topic-chapter-list p')).toHaveCount(0)
        await index.locator('summary').click()
      }
      if (['opium-wars', 'silk-road', 'reformation', 'porcelain-world'].includes(id)) {
        if (await links.count()) await links.first().scrollIntoViewIfNeeded()
        else await page.locator('.topic-article h3').first().scrollIntoViewIfNeeded()
        await page.screenshot({ path: info.outputPath(`${id}-${viewport.width}.png`) })
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        viewport.width,
      )
    }
    expect(errors).toEqual([])
  })

  test(`索引展开、刷新与事件往返 ${viewport.width}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/topics/late-qing-reforms/')
    const details = page.locator('.topic-related-events details')
    await details.locator('summary').click()
    const target = details.locator('[data-event-id="fuzhou-shipyard"]')
    await target.scrollIntoViewIfNeeded()
    await expect(target).toBeInViewport()
    await page.reload()
    await expect(details).toHaveAttribute('open', '')
    await expect(target).toBeInViewport()
    await target.click()
    await expect(page.locator('.event-detail h2')).toBeVisible()
    await page.getByRole('button', { name: '专题导读与目录', exact: true }).click()
    await expect(details).toHaveAttribute('open', '')
    await expect(target).toBeInViewport()
    await details.locator('summary').click()
    await expect(details).not.toHaveAttribute('open', '')
    const toc = page.getByRole('navigation', { name: '文章目录', exact: true })
    if (viewport.width <= 900)
      await toc.getByRole('button', { name: '文章目录', exact: true }).click()
    await toc.getByRole('button', { name: '相关史事', exact: true }).click()
    await expect(details).toHaveAttribute('open', '')
    await expect(details.locator('summary')).toBeInViewport()
  })

  test(`路线专题展开总览并展示所有路线 ${viewport.width}`, async ({ page }, info) => {
    test.setTimeout(90000) // Visit all three route articles.
    await page.setViewportSize(viewport)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    for (const article of routeArticles) {
      await page.goto(`/topics/${articleSlugs[article.id]}/`)
      const overview = page.locator('.topic-route-overview')
      await overview.scrollIntoViewIfNeeded()
      await expect(overview.locator('.topic-route-visibility')).toHaveAttribute(
        'aria-expanded',
        'false',
      )
      await expect(overview.locator('canvas')).toHaveCount(0)
      await overview.getByRole('button', { name: '展开路线总览' }).click()
      await expect(overview.locator('.topic-route-map')).toHaveAttribute('data-ready', 'true')
      await expect(overview.locator('.topic-route-visibility')).toHaveAttribute(
        'aria-expanded',
        'true',
      )
      await expect(overview.locator('.topic-route-legend button')).toHaveCount(article.routes)
      await expect(page.getByRole('dialog')).toHaveCount(0)
      await expect(page.locator('.map-canvas, .pillar-stage')).toHaveCount(0)
      const representedRoutes = await overview
        .locator('.route-marker')
        .evaluateAll((markers) => [
          ...new Set(markers.map((marker) => marker.getAttribute('data-route-id'))),
        ])
      expect(representedRoutes).toHaveLength(article.routes)
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        viewport.width,
      )
    }
    await page.screenshot({ path: info.outputPath(`route-overview-${viewport.width}.png`) })
  })

  test(`总览图例和地名进入对应路线并保留全站状态 ${viewport.width}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(
      '/topics/silk-road/#year=741&scope=nearby&category=战争&lng=105&lat=36&zoom=3.2',
    )
    const overview = page.locator('.topic-route-overview')
    await overview.scrollIntoViewIfNeeded()
    await overview.getByRole('button', { name: '展开路线总览' }).click()
    await expect(overview.locator('.topic-route-map')).toHaveAttribute('data-ready', 'true')
    const address = page.url()
    const state = mapViewState(page)
    const route = overview.locator('.topic-route-legend button[data-route-id="silk-south"]')
    await route.scrollIntoViewIfNeeded()
    const before = (await route.boundingBox())!
    await route.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog.getByLabel('选择路线')).toHaveValue('silk-south')
    await expect(dialog.locator('.topic-route-map')).toHaveAttribute('data-ready', 'true')
    await expect(overview.locator('.topic-route-map')).toHaveCount(0)
    await dialog.getByRole('button', { name: '从第一站开始', exact: true }).click()
    await expect(dialog.locator('.route-current-stop h3')).toHaveText('敦煌')
    await expect(page).toHaveURL(address)
    expect(mapViewState(page)).toEqual(state)
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(route).toBeFocused()
    await expect(overview.locator('.topic-route-map')).toHaveAttribute('data-ready', 'true')
    const after = (await route.boundingBox())!
    expect(after.y).toBeCloseTo(before.y, 0)

    const point = overview.locator('.map-point-label:not([hidden])').first()
    await expect(point).toBeVisible()
    const routeId = await point.getAttribute('data-route-id')
    const name = (await point.getAttribute('aria-label'))!.replace(/^地图地名：/, '')
    await point.click()
    await expect(dialog.getByLabel('选择路线')).toHaveValue(routeId!)
    await expect(dialog.locator('.route-current-stop h3')).toHaveText(name)
    await expect(page).toHaveURL(address)
    await dialog.getByRole('button', { name: '关闭路线地图，返回文章', exact: true }).click()
    await expect(dialog).toHaveCount(0)
    await expect(overview.locator('.topic-route-open')).toBeFocused()
    await expect(overview.locator('.topic-route-map')).toHaveAttribute('data-ready', 'true')
    expect(mapViewState(page)).toEqual(state)
    await page.locator('.main-nav').getByRole('button', { name: '地图', exact: true }).click()
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    await expect.poll(() => mapViewState(page)).toEqual(state)
  })
}

test('夜间与存储不可用时仍可用键盘打开史事索引', async ({ page }, info) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'sessionStorage', {
      get() {
        throw new Error('Storage unavailable')
      },
    })
  })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/topics/silk-road/')
  const night = page.getByRole('button', { name: '切换到夜间模式', exact: true })
  if (await night.isVisible()) await night.click()
  else {
    await page.getByRole('button', { name: '更多操作', exact: true }).click()
    await night.click()
  }
  const index = page.locator('.topic-related-events details')
  const summary = index.locator('summary')
  await summary.focus()
  await page.keyboard.press('Enter')
  await expect(index).toHaveAttribute('open', '')
  await page.keyboard.press('Space')
  await expect(index).not.toHaveAttribute('open', '')
  const link = page.locator('.topic-event-link').first()
  await link.scrollIntoViewIfNeeded()
  await link.focus()
  await expect(link).toBeFocused()
  await page.screenshot({ path: info.outputPath('night-mobile.png') })
  await page.reload()
  await expect(page.locator('.topic-related-events details')).not.toHaveAttribute('open', '')
})

test('从完整索引进入史事后可暂停、继续并在末章停止播放', async ({ page }) => {
  const now = new Date('2026-01-01T00:00:00Z')
  await page.clock.install({ time: now })
  await page.clock.pauseAt(now)
  await page.goto('/topics/late-qing-reforms/')
  await page.locator('.topic-events-summary').click()
  const rows = page.locator('.topic-chapter-list button')
  const count = await rows.count()
  const penultimate = await rows.nth(count - 2).getAttribute('data-event-id')
  const last = await rows.last().getAttribute('data-event-id')
  const lastTitle = await rows.last().locator('strong').innerText()
  await rows.nth(count - 2).click()
  await expect(page.locator('.event-detail h2')).toBeVisible()
  await page.locator('.main-nav').getByRole('button', { name: '地图', exact: true }).click()
  await page.getByRole('combobox', { name: '播放速度', exact: true }).selectOption('20')
  const duration = TOPIC_CHAPTER_DURATION_MS / 20
  const play = page.getByRole('button', { name: '播放专题', exact: true })
  await play.click()
  await page.clock.runFor(duration / 2)
  await page.getByRole('button', { name: '暂停专题播放', exact: true }).click()
  await page.clock.runFor(duration * 2)
  await expect(page).toHaveURL(`/events/${eventSlugs[penultimate!]}/`)
  await play.click()
  await page.clock.runFor(duration + 50)
  // Playback coalesces URL writes; first observe the actual reading transition.
  await expect(page.locator('.event-detail h2')).toHaveText(lastTitle)
  await page.clock.runFor(duration + 50)
  await expect(play).toBeVisible()
  await page.clock.runFor(duration * 2)
  await expect(page).toHaveURL(`/events/${eventSlugs[last!]}/`)
  await page.getByRole('button', { name: '专题导读与目录', exact: true }).click()
  await expect(page.locator('.topic-related-events details')).toHaveAttribute('open', '')
})
