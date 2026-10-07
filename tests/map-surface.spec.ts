import { expect, test } from '@playwright/test'

test('ignores legacy route toggles outside the Silk Road topic', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('time-atlas:v1', JSON.stringify({ year: 1092, routes: true }))
  })
  await page.goto('/#year=1092&routes=1')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-route-rendered', 'false')
  await expect(page.locator('.route-note')).toHaveCount(0)
  await page.getByRole('button', { name: '地图图层', exact: false }).click()
  await expect(page.getByRole('switch', { name: '丝路节点示意' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: '切换丝绸之路图层' })).toHaveCount(0)
  await expect(page).not.toHaveURL(/routes=/)
})

test('restores Silk Road drawing with its topic and clears it on independent searches', async ({
  page,
}) => {
  await page.goto('/#year=-138&tour=silk-road&step=0&event=zhangqian&lng=80&lat=38&zoom=2.6')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-route-rendered', 'true')
  await expect(page.locator('.event-detail h2')).toHaveText('张骞第一次出使西域')
  await page.reload()
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-route-rendered', 'true')
  await page.getByRole('combobox', { name: '搜索历史事件、人物或地名' }).fill('苏轼')
  await page.getByRole('option').first().click()
  await expect(page.locator('.person-hero h2')).toContainText('苏轼')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-route-rendered', 'false')
  await expect(page.locator('.route-note')).toHaveCount(0)
  await page.goBack()
  await expect(page.locator('.event-detail h2')).toHaveText('张骞第一次出使西域')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-route-rendered', 'true')
  await page.getByRole('button', { name: '退出导览', exact: true }).click()
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-route-rendered', 'false')
})

test('keeps reader reopening outside the map during a Silk Road chapter', async ({ page }) => {
  await page.goto('/#year=-138&tour=silk-road&step=0&event=zhangqian')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-route-rendered', 'true')
  await page.getByRole('button', { name: '收起历史资料', exact: true }).click()
  const reopen = page.getByRole('button', { name: '展开历史资料', exact: true })
  await expect(page.locator('.panel-scroll')).toBeHidden()
  await expect(
    page.locator('.timeline').getByRole('button', { name: '展开历史资料' }),
  ).toBeVisible()
  await expect(
    page.locator('.map-shell').getByRole('button', { name: '展开历史资料' }),
  ).toHaveCount(0)
  await reopen.click()
  await expect(page.locator('.event-detail h2')).toHaveText('张骞第一次出使西域')
  await page.getByRole('button', { name: '收起历史资料', exact: true }).click()
  await page.getByRole('button', { name: '下一站', exact: false }).click()
  await expect(page).toHaveURL(/step=1(?:&|$)/)
  // Selecting another chapter intentionally opens its reading panel.
  await expect(page.locator('.story-panel')).toBeVisible()
  await expect(page.locator('.event-detail h2')).toHaveText('河西之战')
})

for (const [width, height] of [
  [1440, 900],
  [1280, 800],
  [1024, 768],
  [768, 1024],
  [390, 844],
  [360, 640],
  [844, 390],
]) {
  test(`keeps map and relocated controls clear at ${width} by ${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    await page.goto('/#year=1092')
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    await expect(page.locator('.map-title')).toHaveCount(0)
    const geometry = await page.evaluate(() => {
      const selectors = [
        '.year-title',
        '.timeline-period-select',
        '.play-controls',
        '.playback-speed',
        '.playback-mode',
        '.timeline-zoom > button',
        '.rail-event',
        '.panel-tabs',
        '.panel-toolbar .reader-toggle',
      ]
      const elements = selectors.flatMap((selector) => [...document.querySelectorAll(selector)])
      const rects = elements
        .filter((element) => element.getBoundingClientRect().width > 0)
        .map((element) => ({
          name: element.getAttribute('aria-label') || element.className,
          box: element.getBoundingClientRect(),
        }))
      const overlaps: string[][] = []
      rects.forEach((a, i) =>
        rects.slice(0, i).forEach((b) => {
          if (
            a.box.left < b.box.right &&
            a.box.right > b.box.left &&
            a.box.top < b.box.bottom &&
            a.box.bottom > b.box.top
          )
            overlaps.push([a.name, b.name])
        }),
      )
      const map = document.querySelector('.map-canvas')!.getBoundingClientRect()
      const workspace = document.querySelector('.topbar')!.getBoundingClientRect()
      const header = document.querySelector('.topbar')!.getBoundingClientRect()
      const ticks = [...document.querySelectorAll('.time-ticks > span')]
      return {
        overlaps,
        mapTop: map.top,
        headerBottom: workspace.height > 0 ? workspace.bottom : header.bottom,
        overflow: document.documentElement.scrollWidth > innerWidth,
        ticksVisible: ticks.every((tick) => tick.getBoundingClientRect().bottom <= innerHeight),
      }
    })
    expect(geometry.overlaps).toEqual([])
    expect(geometry.mapTop).toBe(geometry.headerBottom)
    expect(geometry.overflow).toBe(false)
    expect(geometry.ticksVisible).toBe(true)
    const overview = page.getByRole('button', { name: '查看时代背景', exact: true })
    const compare = page.getByRole('button', { name: '年份对比', exact: true })
    await expect(overview).toBeInViewport({ ratio: 1 })
    await expect(compare).toBeInViewport({ ratio: 1 })
    await overview.click()
    await expect(page.locator('.period-overview')).toBeVisible()
    await compare.click()
    await expect(page.locator('.comparison-controls')).toBeVisible()
    await expect(compare).toHaveAttribute('aria-pressed', 'true')
  })
}
