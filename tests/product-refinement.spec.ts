import { expect, test, type Page } from '@playwright/test'
import { setSheet } from './mobile-sheet-helpers'
import { pillarSideButton } from './refinement-helpers'

async function menu(page: Page) {
  await page.getByRole('button', { name: '更多操作', exact: true }).click()
}

test('map list shortcut fixes geographic bounds and can release them without losing category', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#visual=map&year=1750&scope=nearby&category=战争')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  const scope = page.locator('.map-event-scope')
  await expect(scope).toContainText('“附近”指时间相近')
  await scope.getByRole('button', { name: '只看当前地图范围', exact: true }).click()
  await expect(page).toHaveURL(/bounds=/)
  await expect(scope).toContainText('已固定选取范围')
  await scope.getByRole('button', { name: '取消地图范围限制', exact: true }).click()
  await expect(page).not.toHaveURL(/bounds=/)
  await expect(page.locator('.category-filters button[aria-pressed="true"]')).toHaveText('战争')
})

for (const [width, height] of [
  [1440, 900],
  [390, 844],
  [568, 320],
]) {
  test(`empty filters offer a usable recovery at ${width}x${height}`, async ({ page }, info) => {
    await page.setViewportSize({ width, height })
    await page.goto('/#visual=pillar&year=208&span=216&side=world&region=africa&category=哲学')
    if (width <= 700 || height <= 540) await setSheet(page, 'map')
    const empty = page.locator('.pillar-empty')
    await expect(empty).toContainText('全部年代均无已收录事件')
    await expect(page.getByRole('button', { name: '放眼历史全貌', exact: true })).toHaveCount(0)
    const recovery = page.getByRole('button', { name: '清除筛选并查看已收录事件' })
    await recovery.scrollIntoViewIfNeeded()
    await expect(recovery).toBeInViewport({ ratio: 1 })
    if (height <= 540) {
      const card = (await empty.boundingBox())!
      const stage = (await page.locator('.pillar-stage').boundingBox())!
      expect(card.y + card.height).toBeLessThanOrEqual(stage.y + stage.height)
    }
    await page.screenshot({ path: info.outputPath(`empty-recovery-${width}.png`) })
    await recovery.click()
    await expect(empty).toHaveCount(0)
    await expect(page.locator('.pillar-card').first()).toBeVisible()
    await expect(page).toHaveURL(/side=world/)
    await expect(page).toHaveURL(/region=all/)
  })
}

test('empty custom dates can expand matching records without discarding the category', async ({
  page,
}) => {
  await page.goto('/#visual=pillar&year=-8100&span=4&range=-8102,-8098&category=战争')
  await expect(page.locator('.pillar-empty')).toContainText('其他年代还有')
  await page.getByRole('button', { name: '展开该筛选的全部年代', exact: true }).click()
  await expect(page.locator('.pillar-card').first()).toBeVisible()
  await expect(page).not.toHaveURL(/range=/)
  await expect(page).toHaveURL(new RegExp(`category=${encodeURIComponent('战争')}`))
})

for (const [width, height] of [
  [1440, 900],
  [320, 700],
  [390, 844],
  [568, 320],
  [844, 390],
]) {
  test(`direct pillar controls and modern map context remain usable at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    await page.goto('/#visual=pillar&year=1943&span=80&event=modern-sartre-being-nothingness')
    if (width <= 700 || height <= 540) await setSheet(page, 'map')
    const actions = page.getByRole('group', { name: '时空柱工具' })
    await expect(actions.getByRole('button', { name: /^打开事件目录/ })).toHaveCount(0)
    const mobile = width <= 700 || height <= 540
    await expect(actions.getByRole('button', { name: '自动浏览当前筛选' })).toHaveCount(0)
    if (mobile)
      await expect(actions.getByRole('button', { name: '放大时间', exact: true })).toHaveCount(0)
    const buttons = await actions.getByRole('button').all()
    let previousBottom = 0
    for (const button of buttons) {
      await expect(button).toBeInViewport({ ratio: 1 })
      const box = (await button.boundingBox())!
      expect(box.width).toBeGreaterThanOrEqual(44)
      expect(box.height).toBeGreaterThanOrEqual(44)
      expect(box.y).toBeGreaterThanOrEqual(previousBottom)
      previousBottom = box.y + box.height
    }
    await expect(actions.getByRole('button')).toHaveCount(mobile ? 1 : 3)
    const stage = (await page.locator('.pillar-stage').boundingBox())!
    const clip = (await page.locator('.pillar-events').boundingBox())!
    expect(clip.y + clip.height).toBeCloseTo(stage.y + stage.height, 0)
    await expect(page.locator('[data-clear-tools]')).toHaveCount(0)
    await page.getByRole('button', { name: '时空柱筛选与设置', exact: true }).click()
    await page.locator('.pillar-cluster').click()
    await expect(page.getByRole('textbox', { name: '搜索聚合事件' })).toBeFocused()
    await page.getByRole('button', { name: '关闭时空柱面板' }).click()
    await expect(page.getByRole('button', { name: '时空柱筛选与设置', exact: true })).toBeFocused()
    await expect(page.locator('.pillar-quick-actions')).toHaveCount(0)
    await page.getByRole('button', { name: '时空柱筛选与设置', exact: true }).click()
    await pillarSideButton(page, 'world').click()
    await page.getByRole('button', { name: '关闭时空柱面板', exact: true }).click()
    await expect(page.locator('.time-pillar')).toHaveAttribute('data-side', 'world')
    await expect(page.locator('.pillar-card.china')).toHaveCount(0)
    await page.screenshot({ path: info.outputPath(`pillar-controls-${width}.png`) })
    await page
      .getByRole('group', { name: '探索模式', exact: true })
      .getByRole('button', { name: '地图', exact: true })
      .click()
    if (width <= 700 || height <= 540) await setSheet(page, 'map')
    else await page.getByRole('button', { name: '收起历史资料', exact: true }).click()
    const context = page.getByRole('note', { name: '地图年代说明' })
    await expect(context).toBeInViewport({ ratio: 1 })
    await expect(context).toContainText('事件 1943 年 / 疆域 1912 年')
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    await page.screenshot({ path: info.outputPath(`map-context-${width}.png`) })
  })
}

test('settings starts and stops browsing without adding canvas controls', async ({ page }) => {
  await page.goto('/#visual=pillar&year=1500&span=900')
  const actions = page.getByRole('group', { name: '时空柱工具' })
  await expect(actions.getByRole('button', { name: '自动浏览当前筛选', exact: true })).toHaveCount(
    0,
  )
  await page.getByRole('button', { name: '时空柱筛选与设置', exact: true }).click()
  await page.getByText('自动浏览与停留', { exact: true }).click()
  await page.getByRole('button', { name: '开始自动浏览', exact: true }).click()
  await expect(page.locator('.pillar-stage')).toHaveAttribute('data-browsing', 'true')
  await expect(actions.getByRole('button', { name: '停止自动浏览', exact: true })).toHaveCount(0)
  await page.getByRole('button', { name: '时空柱筛选与设置', exact: true }).click()
  await expect(page.locator('.pillar-stage')).toHaveAttribute('data-browsing', 'false')
})

test('phone pillar titles use two lines with enough card height to read and open them', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#visual=pillar&year=1978&span=54')
  await setSheet(page, 'map')
  const card = page.getByRole('button', {
    name: '中国恢复高等学校统一招生考试，公元 1977 年',
    exact: true,
  })
  const title = card.locator('strong')
  await expect(card).toBeInViewport({ ratio: 1 })
  const titleBox = await title.boundingBox()
  const cardBox = await card.boundingBox()
  expect(titleBox!.height).toBeGreaterThan(18)
  expect(titleBox!.y + titleBox!.height).toBeLessThanOrEqual(cardBox!.y + cardBox!.height)
  await page.screenshot({ path: info.outputPath('phone-two-line-titles.png') })
  await card.click()
  await expect(page.locator('.event-detail h2')).toHaveText('中国恢复高等学校统一招生考试')
})
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

test('content filters lead settings and year navigation opens its collapsed group', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#visual=pillar&year=1500&span=900')
  await page.getByRole('button', { name: '时空柱筛选与设置', exact: true }).click()
  const region = page.getByRole('combobox', { name: '世界历史地区', exact: true })
  const category = page.getByRole('combobox', { name: '时空柱事件类别', exact: true })
  await expect(pillarSideButton(page, 'compare')).toHaveAttribute('aria-pressed', 'true')
  await expect(pillarSideButton(page, 'china')).toBeInViewport({ ratio: 1 })
  await expect(region).toBeInViewport({ ratio: 1 })
  await expect(category).toBeInViewport({ ratio: 1 })
  await expect(page.locator('#pillar-jump')).toBeHidden()
  await expect(page.getByRole('radio', { name: '琉璃时柱', exact: true })).toBeHidden()
  await page.screenshot({ path: info.outputPath('content-first-settings.png') })
  await region.selectOption('europe')
  await pillarSideButton(page, 'china').click()
  await expect(region).toHaveCount(0)
  await expect(category).toBeVisible()
  await pillarSideButton(page, 'world').click()
  await expect(region).toHaveValue('europe')
  await page.getByRole('button', { name: '关闭时空柱面板', exact: true }).click()
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
  await expect(page.locator('.pillar-continuing-chip')).toHaveCount(0)
  await page.getByRole('button', { name: '时空柱筛选与设置', exact: true }).click()
  await page.locator('.pillar-cluster').click()
  await page.getByRole('checkbox', { name: '只看延续中的记录 · 5' }).check()
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

test('a non-ASCII person ID keeps its shared address and loads an ASCII article path', async ({
  page,
}) => {
  const article = page.waitForResponse(
    (response) =>
      response.url().includes('/data/reading/people/record-') && response.status() === 200,
  )
  await page.goto(`/#visual=pillar&year=-350&person=${encodeURIComponent('reviewed-梁惠王')}`)
  const response = await article
  expect(new URL(response.url()).pathname).toMatch(
    /^\/data\/reading\/people\/[a-zA-Z0-9_-]+\.json$/,
  )
  const record = await response.json()
  expect(record.id).toBe('reviewed-梁惠王')
  await expect(page.locator('.person-hero h2')).toContainText('梁惠王')
  await expect(page.locator('.person-biography')).toHaveText(record.biography)
  await expect(page.locator('.person-detail .reference-list a').first()).toBeVisible()
  expect(new URLSearchParams(new URL(page.url()).hash.slice(1)).get('person')).toBe(
    'reviewed-梁惠王',
  )
})
