import { expect, test, type Page } from '@playwright/test'
import { setSheet } from './mobile-sheet-helpers'

const uncaught = new WeakMap<Page, string[]>()
test.beforeEach(async ({ page }) => {
  const messages: string[] = []
  uncaught.set(page, messages)
  page.on('pageerror', (error) => messages.push(error.message))
})
test.afterEach(async ({ page }) => {
  expect(uncaught.get(page) ?? [], 'uncaught application errors').toEqual([])
})

async function reading(page: Page) {
  const viewport = page.viewportSize()!
  if (viewport.width <= 700 || viewport.height <= 540) await setSheet(page, 'reading')
}

async function map(page: Page) {
  const viewport = page.viewportSize()!
  if (viewport.width <= 700 || viewport.height <= 540) await setSheet(page, 'map')
}

async function noHorizontalOverflow(page: Page) {
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    'the page must fit the viewport horizontally',
  ).toBe(true)
}

for (const [width, height] of [
  [1440, 900],
  [390, 844],
  [844, 390],
]) {
  test(`world place archives open events and return at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    for (const [id, name, year] of [
      ['rome', '罗马', -27],
      ['baghdad', '巴格达', 825],
    ] as const) {
      await page.goto(`/#visual=map&year=${year}&place=${id}&view=places`)
      await reading(page)
      const archive = page.locator('.place-detail')
      await expect(archive.locator('h2')).toHaveText(name)
      await expect(archive.locator('.detail-lead')).toBeVisible()
      const event = archive.locator('.archive-event-list button').first()
      await expect(event).toBeVisible()
      const title = await event.locator('strong').innerText()
      await archive.getByRole('button', { name: '在地图上查看此地', exact: true }).click()
      await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
      await expect
        .poll(() => Number(new URLSearchParams(new URL(page.url()).hash.slice(1)).get('lat')))
        .toBeCloseTo(id === 'rome' ? 41.89 : 33.32, 1)
      await reading(page)
      await noHorizontalOverflow(page)
      await page.screenshot({ path: info.outputPath(`${id}-archive-${width}x${height}.png`) })
      await event.click()
      await expect(page.locator('.event-detail h2')).toHaveText(title)
      await expect(page.locator('.event-detail .reference-list a').first()).toBeAttached()
      await page.getByRole('button', { name: '返回地点', exact: true }).click()
      await expect(archive.locator('h2')).toHaveText(name)
      await expect(archive.locator('.archive-event-list button').first()).toContainText(title)
    }
  })

  test(`Lu Xun opens his linked literary work at ${width}x${height}`, async ({ page }, info) => {
    await page.setViewportSize({ width, height })
    await page.goto('/#visual=map&year=1918&person=luxun-writer')
    await reading(page)
    await expect(page.locator('.person-hero h2')).toContainText('鲁迅')
    const work = page.locator('.person-events button').filter({ hasText: '鲁迅《狂人日记》发表' })
    await expect(work).toBeAttached()
    await work.click()
    await expect(page.locator('.event-detail h2')).toHaveText('鲁迅《狂人日记》发表')
    await expect(page.locator('.event-article p').first()).toBeAttached()
    await expect(page.locator('.event-detail .reference-list a').first()).toBeAttached()
    await expect(page).toHaveURL(/event=modern-luxun-diary/)
    await noHorizontalOverflow(page)
    await page.screenshot({ path: info.outputPath(`luxun-work-${width}x${height}.png`) })
  })

  test(`Xu Xiake journey selects dated records and synchronizes the map at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    await page.goto('/#visual=map&year=1613&person=xuxiake')
    await reading(page)
    await expect(page.locator('.person-hero h2')).toContainText('徐霞客')
    await expect(page.locator('.person-record-status')).toContainText('10 条行迹记录')
    await page.getByRole('button', { name: '在地图上看人物经历', exact: true }).click()
    await reading(page)
    await expect(page.locator('.journey-node-list button')).toHaveCount(10)
    await page.locator('.journey-node-list button').filter({ hasText: '登太室山' }).click()
    await expect(page.locator('.journey-active-card h4')).toHaveText('登太室山')
    await expect(page.locator('.journey-active-card .journey-location')).toContainText('1623')
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-map-year', '1623')
    await page.locator('.journey-node-list button').filter({ hasText: '游悬空寺后登恒山' }).click()
    await expect(page.locator('.journey-active-card h4')).toHaveText('游悬空寺后登恒山')
    await expect(page.locator('.journey-active-card .journey-location')).toContainText('1633')
    await expect(page.locator('.journey-active-card .journey-citation').first()).toHaveAttribute(
      'href',
      /徐霞客|%E5%BE%90/,
    )
    await expect(page).toHaveURL(/journey=xuxiake/)
    await expect(page).toHaveURL(/point=xuxiake-hengshan/)
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-map-year', '1633')
    await page.locator('.journey-active-card').scrollIntoViewIfNeeded()
    await noHorizontalOverflow(page)
    await page.screenshot({ path: info.outputPath(`xuxiake-record-${width}x${height}.png`) })
    await map(page)
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    await expect(page.locator('.journey-marker.selected[data-visible="true"]')).toBeVisible()
    await expect
      .poll(() => Number(new URLSearchParams(new URL(page.url()).hash.slice(1)).get('lat')))
      .toBeCloseTo(39.67, 1)
    await page.screenshot({ path: info.outputPath(`xuxiake-map-${width}x${height}.png`) })
  })
}
