import { expandPillarOptions } from './refinement-helpers'
import { expect, test, type Page } from '@playwright/test'
import { setSheet } from './mobile-sheet-helpers'
import { toOrdinal } from '../src/lib/history'

test.use({ hasTouch: true })
async function ready(page: Page, hash = 'year=1500&span=900') {
  await page.goto(`/#visual=pillar&${hash}`)
  await expect(page.locator('.pillar-stage')).toBeVisible()
  await expect(page.locator('.pillar-card').first()).toBeVisible()
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  )
}
async function settings(page: Page) {
  await page.getByRole('button', { name: '时空柱筛选与设置', exact: true }).click()
  await expect(page.locator('.pillar-dialog')).toBeVisible()
  await expandPillarOptions(page, '外观与简介')
  await expandPillarOptions(page, '自动浏览与停留')
}
async function closeSettings(page: Page) {
  await page.getByRole('button', { name: '关闭时空柱面板', exact: true }).click()
  await expect(page.locator('.pillar-dialog')).not.toBeVisible()
}
async function geometry(page: Page) {
  const problems = await page.evaluate(() => {
    const problems: string[] = []
    if (document.documentElement.scrollWidth > innerWidth) problems.push('horizontal overflow')
    if (document.documentElement.scrollHeight > innerHeight) problems.push('vertical overflow')
    const stage = document.querySelector('.pillar-stage')!.getBoundingClientRect()
    const viewport = document.querySelector('.pillar-events')!
    const clip = viewport.getBoundingClientRect()
    const overflow = getComputedStyle(viewport).overflowY
    if (!['hidden', 'clip'].includes(overflow)) problems.push('unclipped event viewport')
    if (clip.top < stage.top - 0.5 || clip.bottom > stage.bottom + 0.5)
      problems.push('event viewport outside canvas')
    const cards = [...document.querySelectorAll('.pillar-card')]
    for (const card of cards) {
      const r = card.getBoundingClientRect()
      if (r.left < stage.left - 0.5 || r.right > stage.right + 0.5)
        problems.push('horizontally clipped card ' + card.getAttribute('data-event-id'))
      // Panning keeps rows fixed to the chronology, so boundary rows deliberately
      // pass through the clipped event viewport instead of being repacked inside it.
      if (r.bottom <= clip.top || r.top >= clip.bottom)
        problems.push('offscreen card rendered ' + card.getAttribute('data-event-id'))
      if (
        (r.top < clip.top - 0.5 || r.bottom > clip.bottom + 0.5) &&
        card.querySelector('button')!.tabIndex !== -1
      )
        problems.push(
          'partly clipped card remains in tab order ' + card.getAttribute('data-event-id'),
        )
      const title = card.querySelector('.pillar-event-line')!.getBoundingClientRect()
      if (title.bottom > r.bottom - 3 || title.top < r.top + 3)
        problems.push('clipped title ' + card.getAttribute('data-event-id'))
    }
    for (let i = 0; i < cards.length; i++)
      for (let j = i + 1; j < cards.length; j++) {
        const a = cards[i].getBoundingClientRect(),
          b = cards[j].getBoundingClientRect()
        if (a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top)
          problems.push('overlapping cards')
      }
    const pillar = document.querySelector('.time-pillar')!.getBoundingClientRect()
    if (Math.abs(stage.bottom - pillar.bottom) > 0.5)
      problems.push('canvas does not fill former footer space')
    if (document.querySelector('.pillar-footer, .pillar-year, .pillar-zoom-dock'))
      problems.push('obsolete footer or separate dock')
    const toolButtons = [...document.querySelectorAll('.pillar-controls button')].filter(
      (el) => el.getBoundingClientRect().width > 0,
    )
    const dock = document.querySelector('.pillar-controls')!.getBoundingClientRect()
    for (const button of toolButtons) {
      const box = button.getBoundingClientRect()
      if (box.width < 44 || box.height < 44) problems.push('small floating control')
      if (
        box.left < dock.left ||
        box.right > dock.right ||
        box.top < dock.top ||
        box.bottom > dock.bottom
      )
        problems.push('control outside unified dock')
      const hit = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2)
      if (!button.contains(hit)) problems.push('floating control is obscured')
    }
    for (let i = 1; i < toolButtons.length; i++) {
      if (
        toolButtons[i - 1].getBoundingClientRect().right >
        toolButtons[i].getBoundingClientRect().left + 0.5
      )
        problems.push('overlapping floating controls')
    }
    if (
      dock.right > stage.right + 0.5 ||
      dock.left < stage.left - 0.5 ||
      dock.bottom > stage.bottom
    )
      problems.push('floating tools outside canvas')
    return problems
  })
  expect(problems).toEqual([])
}
for (const [width, height] of [
  [1440, 900],
  [1024, 768],
  [820, 1180],
  [390, 844],
  [360, 640],
  [844, 390],
  [568, 320],
]) {
  test(`responsive canvas and single-side reading at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    await ready(page)
    await geometry(page)
    await expect(page.locator('.pillar-event p')).toHaveCount(0)
    for (const event of await page.locator('.pillar-event').all()) {
      expect((await event.boundingBox())!.height).toBeGreaterThanOrEqual(44)
      await expect(event.locator('time')).toBeVisible()
      await expect(event.locator('strong')).toBeVisible()
    }
    if (width === 390 || width === 360) {
      await expect(page.locator('.pillar-header')).toHaveCount(0)
      const canvas = (await page.locator('.pillar-stage').boundingBox())!
      const header = (await page.locator('.topbar').boundingBox())!
      expect(canvas.y).toBeLessThanOrEqual(header.y + header.height + 1)
      expect(await page.locator('.pillar-card').count()).toBeGreaterThanOrEqual(
        width === 390 ? 24 : 16,
      )
      await expect(page.locator('.pillar-now')).toContainText('1500年')
    }
    if (width === 1440 || width === 844)
      expect(await page.locator('.pillar-card').count()).toBeGreaterThanOrEqual(
        width === 1440 ? 28 : 8,
      )
    await page.screenshot({ path: info.outputPath(`compare-${width}x${height}.png`) })
    expect(await page.locator('.pillar-card').count()).toBeLessThanOrEqual(
      2 * Math.floor((await page.locator('.pillar-stage').boundingBox())!.height / 44),
    )
    for (const control of ['放大时间', '缩小时间', '时空柱筛选与设置']) {
      const button = page.getByRole('button', { name: control, exact: true })
      await expect(button).toBeInViewport({ ratio: 1 })
      const box = (await button.boundingBox())!
      expect(box.width).toBeGreaterThanOrEqual(44)
      expect(box.height).toBeGreaterThanOrEqual(44)
    }
    await settings(page)
    await page.getByLabel('时空柱浏览方式', { exact: true }).selectOption('world')
    await closeSettings(page)
    await expect(page.locator('.pillar-card.china')).toHaveCount(0)
    const stage = (await page.locator('.pillar-stage').boundingBox())!,
      card = (await page.locator('.pillar-card').first().boundingBox())!
    expect(card.width).toBeGreaterThan(stage.width * 0.5)
    await geometry(page)
    await page.screenshot({ path: info.outputPath(`world-${width}x${height}.png`) })
    await settings(page)
    await page.getByLabel('时空柱浏览方式', { exact: true }).selectOption('china')
    await closeSettings(page)
    await expect(page.locator('.pillar-card.world')).toHaveCount(0)
    await geometry(page)
    await page.screenshot({ path: info.outputPath(`china-${width}x${height}.png`) })
  })
}
test('wheel, pointer drag, keyboard and BCE zoom retain shared state', async ({ page }) => {
  await ready(page)
  const canvas = page.locator('.pillar-stage'),
    box = (await canvas.boundingBox())!
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.4)
  await page.mouse.wheel(0, 90)
  await expect.poll(() => canvas.getAttribute('data-year')).not.toBe('1500')
  const before = Number(await canvas.getAttribute('data-year'))
  await page.mouse.down()
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.4 + 70, { steps: 8 })
  await page.mouse.up()
  await expect
    .poll(async () => Number(await canvas.getAttribute('data-year')))
    .toBeGreaterThan(before)
  await page.getByRole('button', { name: '放大时间', exact: true }).click()
  await expect(canvas).toHaveAttribute('data-span', '540')
  await canvas.focus()
  await page.keyboard.press('Home')
  await expect(canvas).toHaveAttribute('data-year', '-10000')
  await page.keyboard.press('End')
  await expect(canvas).toHaveAttribute('data-year', '1912')
  await settings(page)
  await page.locator('#pillar-jump').fill('0')
  await page.getByRole('button', { name: '前往', exact: true }).click()
  await expect(page.getByRole('alert')).toContainText('没有公元 0 年')
  await page.locator('#pillar-jump').fill('-1')
  await page.getByRole('button', { name: '前往', exact: true }).click()
  await expect(canvas).toHaveAttribute('data-year', '-1')
  await expect(page).toHaveURL(/visual=pillar/)
  await expect(page).toHaveURL(/span=540/)
  await page.reload()
  await expect(canvas).toHaveAttribute('data-year', '-1')
  await expect(canvas).toHaveAttribute('data-span', '540')
})
test('clusters expose all hidden content, reading has relations and sources, map switch preserves selection', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await ready(page)
  await settings(page)
  await page.locator('.pillar-cluster').click()
  await expect(page.locator('.pillar-dialog')).toBeVisible()
  expect(await page.locator('.pillar-cluster-list button').count()).toBeGreaterThan(1)
  await page.locator('.pillar-cluster-list button').first().click()
  await expect(page.locator('.event-detail')).toBeVisible()
  const title = await page.locator('.event-detail h2').innerText()
  await expect(page.locator('.event-narrative')).toBeVisible()
  expect(await page.locator('.event-detail .reference-list a').count()).toBeGreaterThan(0)
  await expect(page.locator('.event-relations')).toBeVisible()
  await page.getByRole('button', { name: '在地图中查看', exact: true }).click()
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  await expect(page.locator('.event-detail h2')).toHaveText(title)
  await page.getByRole('button', { name: '在时空柱中对照', exact: true }).click()
  await expect(page.locator('.time-pillar')).toBeVisible()
  await expect(page.locator('.event-detail h2')).toHaveText(title)
  await page.reload()
  await expect(page.locator('.event-detail h2')).toHaveText(title)
  await page.screenshot({ path: info.outputPath('detail-and-pillar.png') })
})
test('filtered automatic browsing respects the range and stops for reading', async ({ page }) => {
  await ready(page, 'year=1776&span=150&side=world')
  await settings(page)
  await page.getByLabel('世界历史地区', { exact: true }).selectOption('americas')
  await page.getByLabel('时空柱事件类别', { exact: true }).selectOption('政治')
  await page.getByLabel('时空柱起始年份', { exact: true }).fill('1776')
  await page.getByLabel('时空柱结束年份', { exact: true }).fill('1804')
  await page.getByRole('button', { name: '应用时空柱时间范围', exact: true }).click()
  await expect(page.locator('.pillar-stage')).toHaveAttribute('data-motion', 'false')
  await page.clock.install()
  await settings(page)
  await page.getByRole('button', { name: '开始自动浏览', exact: true }).click()
  await page.clock.runFor(1400)
  const stage = page.locator('.pillar-stage')
  expect(Number(await stage.getAttribute('data-year'))).toBeGreaterThanOrEqual(1791)
  expect(Number(await stage.getAttribute('data-year'))).toBeLessThanOrEqual(1804)
  await expect(stage).toHaveAttribute('data-browse-phase', 'reading')
  const beforeReading = await stage.getAttribute('data-year')
  await page.locator('.pillar-event:not([tabindex="-1"])').first().click()
  await expect(stage).toHaveAttribute('data-year', beforeReading!)
  await expect(stage).toHaveAttribute('data-browsing', 'false')
  await expect(page.locator('.event-detail h2')).toBeVisible()
  await page.clock.runFor(1500)
  const year = await stage.getAttribute('data-year')
  await page.clock.runFor(20000)
  await expect(stage).toHaveAttribute('data-year', year!)
})
test('mobile reading remains usable through rotation and supports split canvas', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await ready(page, 'year=1687&span=200&event=world-newton')
  await setSheet(page, 'reading')
  await expect(page.locator('.event-detail h2')).toContainText('牛顿')
  await page.setViewportSize({ width: 844, height: 390 })
  await setSheet(page, 'split')
  await expect(page.locator('.event-detail h2')).toContainText('牛顿')
  await geometry(page)
  expect(await page.locator('.pillar-card').count()).toBeGreaterThanOrEqual(4)
  await page.screenshot({ path: info.outputPath('landscape-reading.png') })
  await page.setViewportSize({ width: 390, height: 844 })
  await setSheet(page, 'reading')
  await expect(page.locator('.event-detail h2')).toContainText('牛顿')
  await expect(page).toHaveURL(/event=world-newton/)
  await setSheet(page, 'map')
  await geometry(page)
})
test('cold pillar does not load map data, and rapid navigation has bounded rendering', async ({
  page,
}) => {
  const errors: string[] = [],
    requests: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('requestfailed', (r) => errors.push(r.url()))
  page.on('request', (r) => requests.push(r.url()))
  await ready(page)
  expect(requests.filter((u) => /HistoryMap-|\/data\/maps\/|\.geojson/.test(u))).toEqual([])
  const canvas = page.locator('.pillar-stage')
  await canvas.focus()
  for (let i = 0; i < 15; i++) await page.keyboard.press(i % 2 ? 'ArrowUp' : 'ArrowDown')
  await geometry(page)
  expect(await page.locator('.pillar-card').count()).toBeLessThanOrEqual(
    2 * Math.floor((await page.locator('.pillar-stage').boundingBox())!.height / 44),
  )
  expect(errors).toEqual([])
})
test('trusted two-finger gesture zooms without opening an event', async ({
  page,
  context,
}, info) => {
  test.skip(info.project.name !== 'chrome', 'Trusted multi-touch uses the Chromium input protocol.')
  await page.setViewportSize({ width: 390, height: 844 })
  await ready(page)
  const stage = (await page.locator('.pillar-stage').boundingBox())!,
    x = stage.x + stage.width / 2,
    y = stage.y + stage.height / 2
  const session = await context.newCDPSession(page)
  await session.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [
      { x: x - 15, y: y - 45, id: 1 },
      { x: x + 15, y: y + 45, id: 2 },
    ],
  })
  for (let i = 1; i <= 5; i++)
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [
        { x: x - 15, y: y - 45 - i * 12, id: 1 },
        { x: x + 15, y: y + 45 + i * 12, id: 2 },
      ],
    })
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  await expect
    .poll(async () => Number(await page.locator('.pillar-stage').getAttribute('data-span')))
    .toBeLessThan(700)
  await expect(page.locator('.event-detail')).toHaveCount(0)
  await expect(page.locator('.pillar-dialog')).not.toBeVisible()
  await geometry(page)
})
for (const [width, height] of [
  [360, 640],
  [390, 844],
]) {
  test(`portrait event reading keeps the canvas and controls usable at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    await ready(page, 'year=1687&span=400')
    await page.locator('.pillar-event').first().click()
    await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'split')
    await expect(page.locator('.event-detail h2')).toBeInViewport({ ratio: 1 })
    await geometry(page)
    for (const name of ['放大时间', '时空柱筛选与设置'])
      await expect(page.getByRole('button', { name, exact: true })).toBeInViewport({ ratio: 1 })
    await page.screenshot({ path: info.outputPath(`portrait-split-${width}.png`) })
  })
}
test('a retained map filter is visible and can be removed in pillar settings', async ({ page }) => {
  await page.goto('/#visual=pillar&year=1500&span=900&side=world&bounds=115,30,120,40')
  await settings(page)
  await page.getByRole('button', { name: '解除地点与视野限制', exact: true }).click()
  await closeSettings(page)
  await expect(page.locator('.pillar-card.world').first()).toBeVisible()
  await expect(page).not.toHaveURL(/bounds=/)
})
test('world-only reading uses the canvas range and header entry remains accessible', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await ready(page, 'year=1500&span=80&side=world')
  await expect(page.locator('.period-brief')).toHaveCount(0)
  await page.getByRole('button', { name: '当前画布', exact: true }).click()
  await expect(page.locator('.list-description')).toContainText('当前画布')
  await expect(page.locator('.event-card').filter({ hasText: '哥伦布' })).toBeVisible()
  await expect(page.locator('.event-card').filter({ hasText: '工业革命' })).toHaveCount(0)
  await page
    .getByRole('group', { name: '探索模式', exact: true })
    .getByRole('button', { name: '地图', exact: true })
    .click()
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  await page
    .getByRole('group', { name: '探索模式', exact: true })
    .getByRole('button', { name: '时空柱', exact: true })
    .click()
  await expect(page.locator('.time-pillar')).toHaveAttribute('data-side', 'world')
})
test('automatic browsing finishes at the final event without looping and preserves map playback preference', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await ready(page, 'year=1910&span=50&play=years')
  await settings(page)
  await page.getByRole('button', { name: '开始自动浏览', exact: true }).click()
  await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', '1912', {
    timeout: 20000,
  })
  await expect(page.locator('.pillar-stage')).toHaveAttribute('data-browsing', 'false', {
    timeout: 10000,
  })
  await expect(page).toHaveURL(/play=years/)
  await setSheet(page, 'reading')
  await page
    .getByRole('group', { name: '探索模式', exact: true })
    .getByRole('button', { name: '地图', exact: true })
    .click()
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'split')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  await page
    .getByRole('group', { name: '探索模式', exact: true })
    .getByRole('button', { name: '时空柱', exact: true })
    .click()
  await expect(page.locator('.time-pillar')).toBeVisible()
})

for (const [width, height] of [
  [360, 640],
  [568, 320],
]) {
  test(`compact controls remain reachable through focus and reading at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    await ready(page)
    await page.getByRole('button', { name: '更多操作', exact: true }).click()
    await page.getByRole('button', { name: '进入专注模式', exact: true }).click()
    await expect(page.locator('.atlas-app')).toHaveAttribute('data-focus-mode', 'true')
    await expect(page.locator('.visualization-switch')).toBeInViewport({ ratio: 1 })
    await settings(page)
    await page.getByLabel('时空柱浏览方式', { exact: true }).selectOption('world')
    await closeSettings(page)
    await expect(page.locator('.time-pillar')).toHaveAttribute('data-side', 'world')
    await geometry(page)
    await page.locator('.pillar-event').first().click()
    await setSheet(page, 'split')
    await expect(page.locator('.event-detail h2')).toBeVisible()
    await geometry(page)
    const rectangles = await page.evaluate(() =>
      [...document.querySelectorAll('.pillar-focus-navigation, .pillar-settings, .focus-mode-exit')]
        .filter((el) => el.getBoundingClientRect().width > 0)
        .map((el) => ({ name: el.className, ...el.getBoundingClientRect().toJSON() })),
    )
    for (const rect of rectangles) {
      expect(rect.left, rect.name).toBeGreaterThanOrEqual(0)
      expect(rect.right, rect.name).toBeLessThanOrEqual(width)
      for (const other of rectangles.filter((item) => item.name !== rect.name))
        expect(
          rect.left < other.right &&
            rect.right > other.left &&
            rect.top < other.bottom &&
            rect.bottom > other.top,
          `${rect.name} overlaps ${other.name}`,
        ).toBe(false)
    }
    await page.screenshot({ path: info.outputPath(`focus-reading-${width}.png`) })
    await page.getByRole('button', { name: '退出专注模式', exact: true }).click()
    await setSheet(page, 'map')
    await settings(page)
    const listLabel = await page.locator('.pillar-cluster').getAttribute('aria-label')
    await page.locator('.pillar-cluster').click()
    await expect(page.getByLabel('搜索聚合事件', { exact: true })).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(page.locator('.pillar-settings')).toBeFocused()
    await settings(page)
    await page.locator('.pillar-cluster').click()
    const buttons = page.locator('.pillar-cluster-list button')
    const total = await buttons.count()
    expect(listLabel).toBe(`查看这段时间的全部${total}个事件`)
    expect(total).toBeGreaterThan(await page.locator('.pillar-card').count())
    await page.getByLabel('搜索聚合事件', { exact: true }).fill('哥伦布')
    await expect(buttons).toHaveCount(1)
    await buttons.first().click()
    await expect(page.locator('.event-detail h2')).toContainText('哥伦布')
    await expect(page.locator('.pillar-card.selected')).toHaveCount(1)
    await setSheet(page, 'map')
    for (let i = 0; i < 2; i++) {
      await page
        .getByRole('group', { name: '探索模式', exact: true })
        .getByRole('button', { name: '地图', exact: true })
        .click()
      await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
      await page
        .getByRole('group', { name: '探索模式', exact: true })
        .getByRole('button', { name: '时空柱', exact: true })
        .click()
      await expect(page.locator('.pillar-card.selected')).toHaveCount(1)
    }
    await geometry(page)
    await setSheet(page, 'split')
    await page.locator('.pillar-stage').press('Home')
    await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', '-10000')
    for (const overview of [false, true]) {
      if (overview) {
        await settings(page)
        await page.getByRole('button', { name: '查看历史全貌', exact: true }).click()
        await expect(page.locator('.pillar-stage')).toHaveAttribute('data-motion', 'false')
      }
      const controls = await page.evaluate(() => {
        const canvas = document.querySelector('.time-pillar')!.getBoundingClientRect()
        return [...document.querySelectorAll('.pillar-controls button')]
          .map((el) => el.getBoundingClientRect())
          .filter((rect) => rect.width > 0)
          .map((rect) => ({
            left: rect.left - canvas.left,
            right: rect.right - canvas.right,
            width: rect.width,
            height: rect.height,
          }))
      })
      expect(controls.length).toBe(3)
      for (const control of controls) {
        expect(control.left).toBeGreaterThanOrEqual(0)
        expect(control.right).toBeLessThanOrEqual(0)
        expect(control.width).toBeGreaterThanOrEqual(44)
        expect(control.height).toBeGreaterThanOrEqual(44)
      }
      await geometry(page)
    }
    await page.screenshot({ path: info.outputPath(`overview-reading-${width}.png`) })
  })
}

test('compact labels are the default, summaries are optional, and years use Chinese notation', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await ready(page)
  const compactCount = await page.locator('.pillar-card').count()
  expect(compactCount).toBeGreaterThanOrEqual(24)
  await expect(page.locator('.pillar-event p')).toHaveCount(0)
  await expect(page.locator('.pillar-now')).toHaveText('1500年')
  for (const label of await page.locator('.pillar-tick').allTextContents()) {
    expect(label).toMatch(/^\d+年$/)
  }
  const rows = await page.locator('.pillar-event-line').evaluateAll((elements) =>
    elements.map((e) => {
      const date = e.querySelector('time')!,
        title = e.querySelector('strong')!
      const a = date.getBoundingClientRect(),
        b = title.getBoundingClientRect()
      return (
        date.getClientRects().length === 1 &&
        title.getClientRects().length === 1 &&
        a.right < b.left &&
        a.top < b.bottom &&
        a.bottom > b.top
      )
    }),
  )
  expect(rows.every(Boolean)).toBe(true)
  await settings(page)
  expect(
    (await page.getByLabel('时空柱浏览方式', { exact: true }).boundingBox())!.height,
  ).toBeGreaterThanOrEqual(44)
  await page.getByRole('checkbox', { name: /^显示事件简介/ }).check()
  await closeSettings(page)
  await expect(page.locator('.pillar-event p').first()).toBeVisible()
  expect(await page.locator('.pillar-card').count()).toBeLessThan(compactCount)
  await geometry(page)
  await page.screenshot({ path: info.outputPath('optional-summaries.png') })
  await page.setViewportSize({ width: 360, height: 640 })
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  )
  await geometry(page)
  await settings(page)
  await page.getByRole('checkbox', { name: /^显示事件简介/ }).uncheck()
  await closeSettings(page)
  await expect(page.locator('.pillar-event p')).toHaveCount(0)
  await page.goto('/#visual=pillar&year=-221&span=800')
  await expect(page.locator('.pillar-now')).toHaveText('公元前221年')
  expect(
    (await page.locator('.pillar-tick').allTextContents()).some((t) => t.startsWith('公元前')),
  ).toBe(true)
  expect((await page.locator('.pillar-tick').allTextContents()).some((t) => /BCE|CE/.test(t))).toBe(
    false,
  )
  await geometry(page)
  await page.screenshot({ path: info.outputPath('bce-chronology.png') })
})

for (const [width, height] of [
  [320, 640],
  [390, 844],
  [568, 320],
]) {
  test(`mobile dates leave a dedicated readable event name at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    for (const [id, year, core] of [
      ['liangzhu-city', -3300, '良渚古城'],
      ['shangshan-culture', -8000, '上山文化'],
    ] as const) {
      await ready(page, `year=${year}&span=3000&event=${id}`)
      await setSheet(page, 'map')
      const card = page.locator(`.pillar-card[data-event-id="${id}"]`)
      await expect(card).toBeVisible()
      await expect(card.locator('strong')).toContainText(core)
      const issues = await card.evaluate((element) => {
        const date = element.querySelector('time')!.getBoundingClientRect()
        const title = element.querySelector('strong')!
        const bounds = title.getBoundingClientRect()
        const text = title.firstChild!
        const range = document.createRange()
        range.setStart(text, 0)
        range.setEnd(text, 4)
        const core = range.getBoundingClientRect()
        return {
          separate: bounds.top >= date.bottom + 1,
          coreVisible: core.left >= bounds.left && core.right <= bounds.right,
          contained: bounds.bottom <= element.getBoundingClientRect().bottom - 3,
        }
      })
      expect(issues).toEqual({ separate: true, coreVisible: true, contained: true })
      await expect(card.locator('time')).not.toContainText(' · ')
      const settingsButton = page.getByRole('button', { name: '时空柱筛选与设置', exact: true })
      await expect(settingsButton).toHaveText('')
      await expect(settingsButton.locator('svg')).toBeVisible()
      await settingsButton.click({ trial: true })
      await geometry(page)
      await page.screenshot({ path: info.outputPath(`${id}-${width}.png`) })
      if (id === 'shangshan-culture') {
        await expect(card.locator('time')).toHaveText('距今约10000—8500年')
        await card.locator('button').click()
        await expect(page.locator('.event-detail')).toContainText('轴上约前8000—前6500年')
      }
    }
  })
}

for (const width of [1440, 1024, 820, 701]) {
  test(`pillar reader button toggles the existing reader at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 })
    await ready(page, 'year=-3800&span=926&scope=period')
    const button = page.locator('.pillar-reader')
    const reader = page.locator('.story-panel')
    const url = page.url()
    const stageWidth = (await page.locator('.pillar-stage').boundingBox())!.width
    await expect(reader).toBeVisible()
    await expect(button).toHaveCount(0)
    await reader.getByRole('button', { name: '收起历史资料', exact: true }).click()
    await expect(reader).toBeHidden()
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await expect(button).toHaveAccessibleName('展开历史资料')
    expect((await page.locator('.pillar-stage').boundingBox())!.width).toBeGreaterThan(stageWidth)
    await expect(page).toHaveURL(url)
    await page.screenshot({ path: info.outputPath(`reader-collapsed-${width}.png`) })
    await button.focus()
    await button.press('Enter')
    await expect(reader).toBeVisible()
    await expect(button).toHaveCount(0)
    await expect(reader.getByRole('button', { name: '收起历史资料', exact: true })).toBeFocused()
    await expect(page).toHaveURL(url)
    await expect(reader.getByRole('button', { name: '收起历史资料', exact: true })).toBeInViewport({
      ratio: 1,
    })
    await geometry(page)
    await page.screenshot({ path: info.outputPath(`reader-expanded-${width}.png`) })
    await reader.getByRole('button', { name: '收起历史资料', exact: true }).click()
    await expect(reader).toBeHidden()
    await button.focus()
    await button.press('Space')
    await expect(reader).toBeVisible()
    await expect(button).toHaveCount(0)
    if (width === 1440) {
      await page.locator('.pillar-event:not([tabindex="-1"])').first().click()
      const heading = page.locator('.event-detail h2')
      await expect(heading).toBeVisible()
      const title = await heading.textContent()
      const selectedURL = page.url()
      await reader.getByRole('button', { name: '收起历史资料', exact: true }).click()
      await expect(reader).toBeHidden()
      await button.click()
      await expect(heading).toHaveText(title!)
      await expect(page).toHaveURL(selectedURL)
    }
  })
}

for (const [width, height] of [
  [390, 844],
  [600, 900],
  [844, 390],
]) {
  test(`pillar uses sheet reading controls at ${width}x${height}`, async ({ page }, info) => {
    await page.setViewportSize({ width, height })
    await ready(page)
    await expect(page.locator('.pillar-reader')).toBeHidden()
    await setSheet(page, 'split')
    await expect(page.locator('.panel-scroll')).toBeVisible()
    await setSheet(page, 'map')
    await expect(page.locator('.panel-scroll')).toBeHidden()
    await page.screenshot({ path: info.outputPath(`sheet-reader-${width}.png`) })
    await geometry(page)
  })
}

for (const action of ['wheel', 'zoom', 'drag', 'stop', 'read'] as const) {
  test(`automatic browsing dwell and immediate ${action} cancellation`, async ({ page }, info) => {
    await page.setViewportSize({ width: action === 'drag' ? 390 : 1440, height: 900 })
    await ready(page, 'year=1500&span=900')
    await expect(page.locator('.pillar-play')).toHaveCount(0)
    const stage = page.locator('.pillar-stage')
    await stage.focus()
    await page.keyboard.press('Space')
    await expect(stage).toHaveAttribute('data-browsing', 'false')
    await page.clock.install()
    await settings(page)
    await page.getByRole('button', { name: '开始自动浏览', exact: true }).click()
    // Start the controlled clock only after React has scheduled the browse animation.
    await expect(stage).toHaveAttribute('data-browse-phase', 'moving')
    await page.clock.runFor(500)
    await expect(stage).toHaveAttribute('data-browse-phase', 'moving')
    const intermediate = Number(await stage.getAttribute('data-ordinal'))
    expect(intermediate).toBeGreaterThan(toOrdinal(1500))
    expect(intermediate).toBeLessThan(toOrdinal(1501))
    await page.clock.runFor(900)
    await expect(stage).toHaveAttribute('data-browse-phase', 'reading')
    const arrived = await stage.getAttribute('data-year')
    await page.clock.runFor(5000)
    await expect(stage).toHaveAttribute('data-year', arrived!)
    await page.screenshot({ path: info.outputPath('automatic-reading.png') })
    await page.clock.runFor(1000)
    await expect(stage).toHaveAttribute('data-browse-phase', 'moving')
    const rect = (await stage.boundingBox())!
    const x = rect.x + rect.width / 2,
      y = rect.y + rect.height / 2
    if (action === 'wheel') {
      await page.mouse.move(x, y)
      await page.mouse.wheel(0, 35)
    } else if (action === 'zoom')
      await page.getByRole('button', { name: '放大时间', exact: true }).click()
    else if (action === 'drag') {
      await page.mouse.move(x, y)
      await page.mouse.down()
      await page.mouse.move(x, y + 30, { steps: 5 })
      await page.mouse.up()
    } else if (action === 'read') {
      // Capture the painted position at the actual pointer event: browser
      // actionability checks can allow animation frames before pointerdown.
      await stage.evaluate((element) => {
        element.addEventListener(
          'pointerdown',
          () => element.setAttribute('data-read-start', element.getAttribute('data-ordinal')!),
          { capture: true, once: true },
        )
      })
      await page.locator('.pillar-event:not([tabindex="-1"])').first().click()
      await expect(page.locator('.event-detail h2')).toBeVisible()
      await expect(stage).toHaveAttribute(
        'data-ordinal',
        (await stage.getAttribute('data-read-start'))!,
      )
    } else await page.getByRole('button', { name: '停止自动浏览', exact: true }).click()
    await page.clock.runFor(1500)
    await expect(stage).toHaveAttribute('data-browsing', 'false')
    const stoppedYear = await stage.getAttribute('data-year'),
      stoppedSpan = await stage.getAttribute('data-span')
    await page.clock.runFor(20000)
    await expect(stage).toHaveAttribute('data-year', stoppedYear!)
    await expect(stage).toHaveAttribute('data-span', stoppedSpan!)
    await geometry(page)
    await page.screenshot({ path: info.outputPath('stopped-browsing.png') })
  })
}

test('automatic browsing reduced motion, empty range and keyboard stop', async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' })
  await page.setViewportSize({ width: 320, height: 700 })
  await ready(page, 'year=1500&span=900')
  await expect(page.locator('.pillar-controls button')).toHaveCount(3)
  await expect(page.locator('.pillar-controls .pillar-cluster')).toHaveCount(0)
  await page.clock.install()
  await settings(page)
  await page.getByRole('heading', { name: '自动浏览', exact: true }).scrollIntoViewIfNeeded()
  await page.screenshot({ path: info.outputPath('automatic-settings-night.png') })
  await page.getByRole('button', { name: '开始自动浏览', exact: true }).click()
  await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', '1501')
  await expect(page.locator('.pillar-stage')).toHaveAttribute('data-browse-phase', 'reading')
  await expect(page.locator('.pillar-event[aria-current="step"]')).toBeVisible()
  await geometry(page)
  await page.screenshot({ path: info.outputPath('automatic-phone-night.png') })
  await page.locator('.pillar-stage').focus()
  await page.keyboard.press('Escape')
  await expect(page.locator('.pillar-stage')).toHaveAttribute('data-browsing', 'false')
  await page.clock.runFor(20000)
  await settings(page)
  await page.getByLabel('时空柱浏览方式', { exact: true }).selectOption('world')
  await page.getByLabel('世界历史地区', { exact: true }).selectOption('oceania')
  await page.getByLabel('时空柱起始年份', { exact: true }).fill('1912')
  await page.getByLabel('时空柱结束年份', { exact: true }).fill('1912')
  await page.getByRole('button', { name: '应用时空柱时间范围', exact: true }).click()
  await settings(page)
  // No eligible current/future stop must leave a clear, disabled action.
  const start = page.getByRole('button', { name: '开始自动浏览', exact: true })
  await expect(start).toBeDisabled()
  await expect(page.getByText('当前年份之后没有符合条件的事件。', { exact: false })).toBeVisible()
})

test('switching out of active automatic browsing restores independent map playback', async ({
  page,
}) => {
  await ready(page, 'year=1200&span=900&play=years')
  await page.clock.install()
  await settings(page)
  await page.getByRole('button', { name: '开始自动浏览', exact: true }).click()
  await page.clock.runFor(500)
  await expect(page.locator('.pillar-stage')).toHaveAttribute('data-browsing', 'true')
  const modes = page.getByRole('group', { name: '探索模式', exact: true })
  await modes.getByRole('button', { name: '地图', exact: true }).click()
  await page.clock.resume()
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  await expect(page.getByRole('button', { name: '播放时间', exact: true })).toBeVisible()
  await page.getByLabel('播放速度', { exact: true }).selectOption('20')
  await page.getByRole('button', { name: '播放时间', exact: true }).click()
  await expect(page.getByRole('button', { name: '暂停时间播放', exact: true })).toBeVisible()
  await expect
    .poll(async () => new URLSearchParams(new URL(page.url()).hash.slice(1)).get('year'))
    .not.toBe('1200')
  await page.getByRole('button', { name: '暂停时间播放', exact: true }).click()
  await modes.getByRole('button', { name: '时空柱', exact: true }).click()
  await expect(page.locator('.pillar-stage')).toHaveAttribute('data-browsing', 'false')
  await expect(page.locator('.pillar-play')).toHaveCount(0)
})

test('pillar reading stays in place while explicit map reading uses the event date', async ({
  page,
}) => {
  await ready(page, 'year=1700&span=300&side=world')
  await page.locator('[data-event-id="world-newton"] .pillar-event').click()
  await expect(page.locator('.event-detail h2')).toContainText('牛顿')
  await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', '1700')
  await page.getByRole('button', { name: '在地图中查看', exact: true }).click()
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  await expect(page).toHaveURL(/year=1687/)
  await expect(page.locator('.event-detail h2')).toContainText('牛顿')
})

for (const width of [1440, 390]) {
  test(`canvas event list shares coverage without duplicate floating entries at ${width}px`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height: 900 })
    await ready(page, 'year=1500&span=900&scope=period')
    if (width === 390) await setSheet(page, 'split')
    await expect(page.locator('.pillar-controls button')).toHaveCount(3)
    await expect(
      page.locator('.pillar-controls .pillar-cluster, .pillar-controls .pillar-reader'),
    ).toHaveCount(0)
    const labels = ['当前画布', '前后5年', '仅当年']
    await expect(page.locator('.event-scope button')).toHaveText(labels)
    await expect(page.getByLabel('筛选事件时间范围', { exact: true }).locator('option')).toHaveText(
      labels,
    )
    for (const query of [
      'year=1500&span=900&scope=period',
      'year=1500&span=80&scope=period&side=world&category=交流',
    ]) {
      await ready(page, query)
      if (width === 390) await setSheet(page, 'split')
      const titles = (await page.locator('.event-card h3').allTextContents()).sort()
      expect(titles.length).toBeGreaterThan(0)
      await settings(page)
      await page.screenshot({ path: info.outputPath(`settings-${width}-${titles.length}.png`) })
      await page.locator('.pillar-cluster').click()
      await expect(page.getByLabel('搜索聚合事件', { exact: true })).toBeFocused()
      expect((await page.locator('.pillar-cluster-list strong').allTextContents()).sort()).toEqual(
        titles,
      )
      await closeSettings(page)
      await expect(page.locator('.pillar-settings')).toBeFocused()
    }
    await geometry(page)
    const background = await page.locator('.pillar-controls').evaluate((el) => {
      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = 1
      const context = canvas.getContext('2d')!
      context.fillStyle = getComputedStyle(el).backgroundColor
      context.fillRect(0, 0, 1, 1)
      return context.getImageData(0, 0, 1, 1).data[3] / 255
    })
    expect(background).toBeGreaterThan(0.5)
    expect(background).toBeLessThan(0.75)
    await page.screenshot({ path: info.outputPath(`simplified-tools-${width}.png`) })
  })
}
