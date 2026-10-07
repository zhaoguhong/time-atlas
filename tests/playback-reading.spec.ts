import { expect, test } from '@playwright/test'

test('names the current event, synchronizes reading, and keeps fixed reading across pause', async ({
  page,
}) => {
  await page.goto('/#year=1893&scope=period')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true', {
    timeout: 15000,
  })
  await page.getByRole('combobox', { name: '播放速度' }).selectOption('0.25')
  await page.getByRole('button', { name: '播放时间', exact: true }).click()
  await expect(page.locator('.live-reading h2')).toHaveText('甲午战争开始', { timeout: 8000 })
  await expect(page.locator('.named-event.selected')).toContainText('甲午战争开始')
  await expect(page.locator('.named-event.selected')).toHaveAttribute('data-visible', 'true')
  await page.getByRole('button', { name: '固定阅读', exact: true }).click()
  await expect(page.locator('.event-detail h2')).toHaveText('甲午战争开始')
  await expect(page.locator('.year-title')).toContainText('1895', { timeout: 8000 })
  await page.getByRole('button', { name: '暂停时间播放', exact: true }).click()
  await expect(page.locator('.event-detail h2')).toHaveText('甲午战争开始')
  await page.getByRole('button', { name: '跟随年份', exact: true }).click()
  await expect(page.locator('.live-reading h2')).toHaveText('马关条约签订')
  await page.getByRole('button', { name: '暂停并阅读全文' }).click()
  await expect(page.locator('.event-detail h2')).toHaveText('马关条约签订')
})

test('collapses the desktop reader and resizes the canvas without covering the timeline', async ({
  page,
}) => {
  await page.goto('/#year=1894')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true', {
    timeout: 15000,
  })
  const before = (await page.locator('.map-canvas').boundingBox())!.width
  await page.getByRole('button', { name: '收起历史资料', exact: true }).click()
  await expect(page.locator('.panel-scroll')).toBeHidden()
  await expect
    .poll(async () => (await page.locator('.map-canvas').boundingBox())!.width)
    .toBeGreaterThan(before + 300)
  await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
  expect((await page.locator('.timeline').boundingBox())!.height).toBeLessThanOrEqual(140)
  await page.getByRole('button', { name: '展开历史资料', exact: true }).click()
  await expect(page.locator('.story-panel')).toBeVisible()
})

test('retains unchanged city and polity DOM during year changes and delayed slice loading', async ({
  page,
}) => {
  let release!: () => void
  const blocked = new Promise<void>((resolve) => {
    release = resolve
  })
  await page.route('**/data/maps/qing/10.geojson', async (route) => {
    await blocked
    await route.continue()
  })
  await page.goto('/#year=1843')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true', {
    timeout: 15000,
  })
  const polity = await page
    .getByRole('button', { name: '查看清朝疆域资料', exact: true })
    .elementHandle()
  const city = await page.locator('.city-label').first().elementHandle()
  await page.locator('.year-title').click()
  await page.getByRole('spinbutton', { name: '输入历史年份' }).fill('1844')
  await page.getByRole('spinbutton', { name: '输入历史年份' }).press('Enter')
  await expect(page.locator('.map-status')).toBeVisible()
  expect(await polity!.evaluate((e) => e.isConnected)).toBe(true)
  expect(await city!.evaluate((e) => e.isConnected)).toBe(true)
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-map-year', '1843')
  release()
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-map-year', '1844')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true', {
    timeout: 15000,
  })
  expect(await polity!.evaluate((e) => e.isConnected)).toBe(true)
})

for (const [width, height] of [
  [390, 844],
  [1440, 900],
]) {
  test(`opens early civilizations and Liangzhu with dating caveats at ${width}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height })
    await page.goto('/#year=-7000')
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true', {
      timeout: 15000,
    })
    await page.getByRole('combobox', { name: '切换历史时期' }).selectOption('early-civilizations')
    await expect(page.locator('.year-title')).toContainText('3000')
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-map-year', '-3000')
    const search = page.getByRole('combobox', { name: '搜索历史事件、人物或地名' })
    await search.fill('良渚')
    await page.getByRole('option').filter({ hasText: '良渚古城' }).click()
    await expect(page.locator('.event-detail h2')).toContainText('良渚')
    await expect(page.locator('.event-detail')).toContainText('考古年代')
    await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })
}

test('reframes a paused current event after shrinking to phone size', async ({ page }) => {
  await page.goto('/#year=1894')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true', {
    timeout: 15000,
  })
  await page.getByRole('button', { name: '播放时间', exact: true }).click()
  await page.getByRole('button', { name: '暂停时间播放', exact: true }).click()
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.locator('.named-event[data-active-event="sino-japanese"]')).toHaveAttribute(
    'data-visible',
    'true',
  )
})

test('fits the civilization overview after mobile playback without accumulating camera padding', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  const warnings: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'warning') warnings.push(message.text())
  })
  await page.goto('/#year=1894')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true', {
    timeout: 15000,
  })
  await page.getByRole('button', { name: '播放时间', exact: true }).click()
  await expect(page.locator('.named-event.selected')).toHaveAttribute('data-visible', 'true')
  await page.getByRole('button', { name: '暂停时间播放', exact: true }).click()
  await page.getByRole('combobox', { name: '切换历史时期' }).selectOption('early-civilizations')
  await expect
    .poll(() => Number(new URLSearchParams(new URL(page.url()).hash.slice(1)).get('zoom')))
    .toBeLessThan(1.25)
  await expect(page.locator('.named-event.selected')).toHaveAttribute('data-visible', 'true')
  expect(warnings.filter((message) => message.includes('cannot fit'))).toEqual([])
  await expect(page.locator('.period-overview')).toContainText('文化与文明区域')
  await expect(page.locator('.period-overview')).not.toContainText('相关人物')
})
