import { expect, test, type Page } from '@playwright/test'
import { setSheet } from './mobile-sheet-helpers'

async function menu(page: Page) {
  await page.getByRole('button', { name: '更多操作', exact: true }).click()
}
for (const [width, height] of [
  [360, 640],
  [390, 844],
  [844, 390],
]) {
  test(`article summary comes before secondary actions at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    await page.goto('/#visual=pillar&year=1885&span=900&event=france-peace')
    await setSheet(page, 'split')
    await expect(page.locator('.event-detail > .detail-lead')).toBeInViewport()
    await expect(page.locator('.panel-tabs')).toBeHidden()
    await expect(page.getByRole('button', { name: '关闭详情', exact: true })).toHaveCount(0)
    const summary = await page.locator('.event-detail > .detail-lead').boundingBox()
    const action = await page.locator('.event-map-link').boundingBox()
    expect(summary!.y).toBeLessThan(action!.y)
    await page.screenshot({ path: info.outputPath(`reading-${width}.png`) })
    await page.locator('.detail-navigation > button').click()
    await expect(page.locator('.panel-tabs')).toBeVisible()
  })
}

for (const [width, height] of [
  [390, 844],
  [568, 320],
  [844, 390],
]) {
  test(`compact person heading uses the full reading width at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    await page.goto('/#visual=pillar&year=1082&person=sushi')
    await setSheet(page, 'split')
    const heading = page.locator('.person-hero h2')
    await expect(heading).toHaveText(/苏轼/)
    const box = await heading.boundingBox()
    expect(box!.width).toBeGreaterThan(150)
    expect(box!.height).toBeLessThan(45)
    await expect(page.locator('.person-biography p').first()).toBeInViewport()
    await page.screenshot({ path: info.outputPath(`person-${width}.png`) })
  })
}

test('year navigation is direct and optional settings start collapsed', async ({ page }, info) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#visual=pillar&year=1500&span=900')
  await page.locator('.pillar-now').click()
  await expect(page.locator('#pillar-jump')).toBeFocused()
  await expect(page.getByRole('combobox', { name: '时空柱历史时期' })).toBeInViewport({ ratio: 1 })
  await expect(page.getByRole('radio', { name: '琉璃时柱', exact: true })).toBeHidden()
  await page.screenshot({ path: info.outputPath('navigation-settings.png') })
  await page.locator('#pillar-jump').fill('-221')
  await page.getByRole('button', { name: '前往', exact: true }).click()
  await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', '-221')
  await expect(page.locator('.pillar-now')).toBeFocused()
})

test('continuing records are discoverable alongside a visible start node', async ({
  page,
}, info) => {
  await page.goto('/#visual=pillar&year=-3946&span=200.06&scope=period')
  await expect(page.locator('.pillar-card[data-event-id="sannai-maruyama"]')).toBeVisible()
  await expect(page.locator('.pillar-continuing-chip')).toContainText('5')
  await page.locator('.pillar-continuing-chip').click()
  await expect(page.locator('.pillar-cluster-list button')).toHaveCount(5)
  await expect(page.locator('.pillar-cluster-list')).toContainText('仰韶')
  await page.screenshot({ path: info.outputPath('continuing-records.png') })
})

test('directory search explains no matches and fits only matching records', async ({ page }) => {
  await page.goto('/#visual=pillar&year=1500&span=900')
  await page.getByRole('button', { name: '时空柱筛选与设置', exact: true }).click()
  await page.getByRole('button', { name: /^查看这段时间的全部/ }).click()
  const search = page.getByRole('textbox', { name: '搜索聚合事件' })
  await search.fill('不存在的测试记录')
  await expect(page.locator('.pillar-search-count')).toContainText('找到 0 件')
  await expect(page.getByRole('button', { name: '查看搜索结果的时间范围' })).toBeDisabled()
  await page.getByRole('button', { name: '清空搜索', exact: true }).click()
  await expect(search).toBeFocused()
  await search.fill('牛顿')
  await expect(page.locator('.pillar-cluster-list button')).toHaveCount(1)
  await page.getByRole('button', { name: '查看搜索结果的时间范围' }).click()
  await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', '1687')
})

test('empty sidebar recovery expands the actual pillar window', async ({ page }) => {
  await page.goto('/#visual=pillar&year=-8100&span=4&scope=period')
  await page.locator('.events-panel').getByRole('button', { name: '战争', exact: true }).click()
  await expect(page.locator('.events-panel .empty-state')).toBeVisible()
  await page.locator('.events-panel').getByRole('button', { name: '查看这一时期' }).click()
  await expect(page.locator('.pillar-stage')).not.toHaveAttribute('data-span', '4')
  await expect(page.locator('.event-card').first()).toBeVisible()
})

test('map and pillar remember separate list scopes including after reload', async ({ page }) => {
  await page.goto('/#year=1500&scope=nearby')
  await page.getByRole('button', { name: '时空柱', exact: true }).click()
  await expect(page.locator('.event-scope button').filter({ hasText: '当前画布' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await page.locator('.event-scope').getByRole('button', { name: '仅当年' }).click()
  await page.getByRole('button', { name: '地图', exact: true }).click()
  await expect(page.locator('.event-scope button').filter({ hasText: '前后5年' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await page.reload()
  await page.getByRole('button', { name: '时空柱', exact: true }).click()
  await expect(page.locator('.event-scope button').filter({ hasText: '仅当年' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
})

test('cold catalog loads no article and failed reading can retry without losing position', async ({
  page,
}) => {
  const articles: string[] = []
  page.on('request', (request) => {
    if (request.url().includes('/data/reading/')) articles.push(request.url())
  })
  await page.goto('/#visual=pillar&year=1687&span=200')
  await expect(page.locator('.pillar-stage')).toBeVisible()
  expect(articles).toHaveLength(0)
  await page.route('**/data/reading/events/**', (route) =>
    route.fulfill({ status: 503, headers: { 'Cache-Control': 'no-store' }, body: 'Unavailable' }),
  )
  const card = page.locator('.pillar-card[data-event-id="world-newton"] .pillar-event')
  await card.click()
  await expect(page.locator('.event-detail > .detail-lead')).toContainText('牛顿')
  await expect(page.locator('.reading-status')).toContainText('正文暂未加载')
  const url = page.url()
  await page.unroute('**/data/reading/events/**')
  await page.getByRole('button', { name: '重新加载正文', exact: true }).click()
  await expect(page.locator('.event-narrative')).toBeVisible()
  await expect(page.locator('.event-detail .reference-list a').first()).toBeVisible()
  await expect(page).toHaveURL(url)
  await expect(page.locator('.reading-status')).toHaveCount(0)
})

for (const [visual, module, canvas] of [
  ['pillar', 'TimePillar', '.pillar-stage'],
  ['map', 'HistoryMap', '.map-canvas'],
]) {
  test(`a failed ${visual} chunk preserves the reader and offers reload`, async ({ page }) => {
    const chunk = `**/assets/${module}-*.js`
    await page.route(chunk, (route) => route.fulfill({ status: 503, body: 'Unavailable' }))
    await page.goto(`/#visual=${visual}&year=1687&event=world-newton`)
    await expect(page.locator('.canvas-error')).toBeVisible()
    await expect(page.locator('.event-narrative')).toBeVisible()
    await page.unroute(chunk)
    await page.getByRole('button', { name: '重新加载画布', exact: true }).click()
    await expect(page.locator(canvas)).toBeVisible()
    await expect(page.locator('.event-detail h2')).toContainText('牛顿')
  })
}

test('desktop actions use one menu and an empty map reports its actual state', async ({
  page,
}, info) => {
  await page.goto('/#year=-8100')
  await expect(page.getByRole('button', { name: '全屏浏览', exact: true })).toBeHidden()
  await menu(page)
  await expect(page.getByRole('button', { name: '我的阅读', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: '全屏浏览', exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'GitHub 开源项目', exact: true })).toHaveCount(0)
  await page.screenshot({ path: info.outputPath('desktop-menu.png') })
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: '更多操作', exact: true })).toBeFocused()
  await menu(page)
  await page.getByRole('button', { name: '数据与来源', exact: true }).click()
  await expect(page.getByRole('dialog', { name: '每一次探索，都有出处' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: '更多操作', exact: true })).toBeFocused()
  await page.getByRole('button', { name: '地图图层', exact: true }).click()
  await expect(page.locator('.legend-empty')).toContainText('暂无可用疆域轮廓')
})
