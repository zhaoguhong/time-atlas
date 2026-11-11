import { expect, test } from '@playwright/test'
import { setSheet } from './mobile-sheet-helpers'

for (const [width, height] of [
  [1440, 900],
  [390, 844],
  [844, 390],
]) {
  test(`远航专题路线、逐站与返回 ${width}x${height}`, async ({ page }, info) => {
    await page.setViewportSize({ width, height })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const compact = width <= 700 || height <= 540
    await page.goto('/#tour=age-of-exploration&step=-1')
    if (compact) await setSheet(page, 'reading')
    await expect(page.locator('.topic-introduction h2')).toHaveText(
      '大航海时代：几片海洋怎样连成一个世界',
    )
    await expect(page.getByRole('region', { name: '专题讲解' })).toContainText(
      '香料、丝织品、金银和知识',
    )
    await expect(page.locator('.topic-route-map')).toHaveCount(0)
    const entry = page.getByRole('button', { name: '查看路线地图', exact: true })
    await entry.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.locator('.topic-route-map')).toHaveAttribute('data-ready', 'true')
    await dialog.getByLabel('选择路线').selectOption('first-circumnavigation')
    await expect(dialog.locator('.topic-route-map')).toHaveAttribute('data-ready', 'true')
    await expect(dialog.locator('.route-precision-note')).toContainText('绝非麦哲伦个人全程')
    // A full-route camera must include all unwrapped itinerary stops, even on phones.
    const mapBounds = await dialog.locator('.topic-route-map').boundingBox()
    for (const marker of await dialog.locator('.route-marker').all()) {
      await expect(marker).toBeVisible()
      const box = await marker.boundingBox()
      expect(box!.x).toBeGreaterThanOrEqual(mapBounds!.x)
      expect(box!.x + box!.width).toBeLessThanOrEqual(mapBounds!.x + mapBounds!.width)
    }
    await page.screenshot({
      path: info.outputPath(`circumnavigation-${width}.png`),
      fullPage: true,
    })
    await dialog.getByRole('button', { name: '从第一站开始', exact: true }).click()
    await expect(dialog.locator('.route-current-stop h3')).toHaveText('圣卢卡尔')
    await dialog.getByRole('button', { name: '下一站', exact: true }).click()
    await expect(dialog.locator('.route-current-stop h3')).toHaveText('特内里费岛')
    await dialog
      .locator('.route-stop-list')
      .getByRole('button', { name: '7 关岛', exact: true })
      .click()
    await expect(dialog.locator('.route-current-stop h3')).toHaveText('关岛')
    await expect(dialog.locator('.route-current-stop')).toContainText('坏血病')
    await expect(
      dialog.getByRole('button', { name: '地图站点 7：关岛', exact: true }),
    ).toHaveAttribute('aria-pressed', 'true')
    await expect(dialog.locator('.route-current-stop h3')).toBeInViewport()
    await page.screenshot({ path: info.outputPath(`route-stop-${width}.png`), fullPage: true })
    await dialog.getByRole('button', { name: '关闭路线地图，返回文章' }).click()
    await expect(dialog).toHaveCount(0)
    await expect(entry).toBeFocused()
    await expect(page).toHaveURL(/tour=age-of-exploration&step=-1/)
    await expect(page.getByRole('region', { name: '专题讲解' })).toContainText(
      '葡萄牙人沿非洲海岸逐步推进',
    )
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    )
  })
}

test('郑和航次切换与地图失败后继续阅读、恢复', async ({ page }, info) => {
  await page.goto('/#tour=zheng-he-voyages&step=-1')
  await expect(page.locator('.topic-introduction h2')).toContainText('郑和下西洋')
  await expect(page.getByRole('region', { name: '专题讲解' })).toContainText('1433年以后')
  // Block only after the primary atlas has had its own chance to load.
  await page.route('**/data/land.geojson', (route) => route.abort())
  await page.getByRole('button', { name: '查看路线地图', exact: true }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog.getByRole('status')).toContainText('地图暂时无法载入')
  await dialog.getByRole('button', { name: '从第一站开始', exact: true }).click()
  await expect(dialog.locator('.route-current-stop')).toContainText('1431年')
  await page.screenshot({ path: info.outputPath('route-map-fallback.png') })
  await page.unroute('**/data/land.geojson')
  await dialog.getByRole('button', { name: '重新载入地图' }).click()
  await expect(dialog.locator('.topic-route-map')).toHaveAttribute('data-ready', 'true')
  await expect(
    dialog.getByRole('button', { name: '地图站点 1：南京龙湾', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true')
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(page.locator('.topic-introduction h2')).toContainText('郑和下西洋')
})

test('陆路网络与人物行程分别呈现', async ({ page }) => {
  await page.goto('/#tour=silk-road&step=-1')
  await page.getByRole('button', { name: '查看路线地图', exact: true }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog.locator('.route-precision-note')).toContainText('不是某个人的行程')
  await dialog.getByLabel('选择路线').selectOption('silk-south')
  await expect(dialog.locator('.route-stop-list li')).toHaveCount(4)
  await dialog.getByLabel('选择路线').selectOption('xuanzang-west')
  await dialog.getByRole('button', { name: '从第一站开始', exact: true }).click()
  await expect(dialog.locator('.route-current-stop')).toContainText('另有627、628年说')
  await expect(dialog.locator('.topic-route-map')).toHaveAttribute('data-ready', 'true')
})

test('手动逐站镜头移动与中断，使用可控时钟', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.clock.install()
  await page.goto('/#tour=gama-indian-ocean&step=-1')
  await page.getByRole('button', { name: '查看路线地图', exact: true }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog.locator('.topic-route-map')).toHaveAttribute('data-ready', 'true')
  await page.clock.pauseAt(await page.evaluate(() => Date.now() + 100))
  const marker = dialog.getByRole('button', { name: '地图站点 1：里斯本', exact: true })
  const before = (await marker.boundingBox())!
  await dialog.getByRole('button', { name: '从第一站开始', exact: true }).click()
  await page.clock.runFor(300)
  const midway = (await marker.boundingBox())!
  expect(Math.abs(midway.x - before.x) + Math.abs(midway.y - before.y)).toBeGreaterThan(5)
  await page.clock.runFor(400)
  const end = (await marker.boundingBox())!
  const map = (await dialog.locator('.topic-route-map').boundingBox())!
  expect(end.x + end.width / 2).toBeCloseTo(map.x + map.width / 2, 0)
  expect(end.y + end.height / 2).toBeCloseTo(map.y + map.height / 2, 0)
  await dialog.getByRole('button', { name: '下一站', exact: true }).click()
  await page.clock.runFor(200)
  await dialog.getByRole('button', { name: '全程', exact: true }).click()
  await page.clock.runFor(700)
  const restored = await marker.boundingBox()
  await page.clock.runFor(2000)
  expect(await marker.boundingBox()).toEqual(restored)
  await expect(dialog.locator('.route-current-stop h3')).toHaveText('先看全程，再选一个地点')
})
