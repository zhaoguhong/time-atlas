import { expect, test, type Page } from '@playwright/test'
import { setSheet } from './mobile-sheet-helpers'

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
    const cards = [...document.querySelectorAll('.pillar-card')]
    for (const card of cards) {
      const r = card.getBoundingClientRect()
      if (
        r.left < stage.left - 0.5 ||
        r.right > stage.right + 0.5 ||
        r.top < stage.top - 0.5 ||
        r.bottom > stage.bottom + 0.5
      )
        problems.push('clipped card ' + card.getAttribute('data-event-id'))
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
    const zoom = document.querySelector('.pillar-zoom')!.getBoundingClientRect()
    for (const card of cards) {
      const r = card.getBoundingClientRect()
      if (r.left < zoom.right && r.right > zoom.left && r.top < zoom.bottom && r.bottom > zoom.top)
        problems.push('zoom covers card')
    }
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
      const toolbar = (await page.locator('.pillar-header').boundingBox())!
      expect(toolbar.height).toBeLessThanOrEqual(56)
      expect(await page.locator('.pillar-card').count()).toBeGreaterThanOrEqual(
        width === 390 ? 20 : 12,
      )
      await expect(page.getByLabel('切换历史范围', { exact: true })).toBeVisible()
    }
    await page.screenshot({ path: info.outputPath(`compare-${width}x${height}.png`) })
    expect(await page.locator('.pillar-card').count()).toBeLessThanOrEqual(
      2 * Math.floor((await page.locator('.pillar-stage').boundingBox())!.height / 44),
    )
    for (const control of ['放大时间', '缩小时间', '播放时空柱', '时空柱筛选与设置']) {
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
  await page.locator('.pillar-cluster').first().click()
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
test('region and category filtering, bounded playback, pause-on-read and settings', async ({
  page,
}) => {
  await ready(page, 'year=1776&span=150&side=world')
  await settings(page)
  await page.getByLabel('世界历史地区', { exact: true }).selectOption('americas')
  await page.getByLabel('时空柱事件类别', { exact: true }).selectOption('政治')
  await page.getByLabel('时空柱播放速度', { exact: true }).selectOption('20')
  await page.getByLabel('时空柱起始年份', { exact: true }).fill('1776')
  await page.getByLabel('时空柱结束年份', { exact: true }).fill('1804')
  await page.getByRole('button', { name: '应用时空柱时间范围', exact: true }).click()
  await page.getByRole('button', { name: '播放时空柱', exact: true }).click()
  await expect
    .poll(async () => Number(await page.locator('.pillar-stage').getAttribute('data-year')))
    .toBeGreaterThanOrEqual(1791)
  await expect(page.getByRole('button', { name: '播放时空柱', exact: true })).toBeVisible({
    timeout: 10000,
  })
  expect(Number(await page.locator('.pillar-stage').getAttribute('data-year'))).toBeLessThanOrEqual(
    1804,
  )
  await page.getByRole('button', { name: '播放时空柱', exact: true }).click()
  await settings(page)
  await expect(page.getByRole('button', { name: '播放时空柱', exact: true })).toBeVisible()
  await closeSettings(page)
  await page.locator('.pillar-event').first().click()
  await expect(page.getByRole('button', { name: '播放时空柱', exact: true })).toBeVisible()
  await expect(page.locator('.event-detail h2')).toBeVisible()
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
    for (const name of ['播放时空柱', '放大时间', '时空柱筛选与设置'])
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
  await page.getByRole('button', { name: '切换到地图', exact: true }).click()
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  await page.getByRole('button', { name: '切换到时空柱', exact: true }).click()
  await expect(page.locator('.time-pillar')).toHaveAttribute('data-side', 'world')
})
test('continuous playback stops at 1912 and the mobile menu reveals a switched mode', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await ready(page, 'year=1910&span=50&play=years')
  await settings(page)
  await page.getByLabel('时空柱播放方式', { exact: true }).selectOption('years')
  await page.getByLabel('时空柱播放速度', { exact: true }).selectOption('20')
  await closeSettings(page)
  await page.getByRole('button', { name: '播放时空柱', exact: true }).click()
  await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', '1912')
  await expect(page.getByRole('button', { name: '播放时空柱', exact: true })).toBeVisible()
  await setSheet(page, 'reading')
  await page.getByRole('button', { name: '更多操作', exact: true }).click()
  await page.getByRole('button', { name: '切换到地图', exact: true }).click()
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'split')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  await page.getByRole('button', { name: '更多操作', exact: true }).click()
  await page.getByRole('button', { name: '切换到时空柱', exact: true }).click()
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
    const side = page.getByLabel('切换历史范围', { exact: true })
    if (await side.isVisible()) {
      await side.selectOption('world')
    } else {
      await page.getByRole('button', { name: '世界历史', exact: true }).click()
    }
    await expect(page.locator('.time-pillar')).toHaveAttribute('data-side', 'world')
    await geometry(page)
    await page.locator('.pillar-event').first().click()
    await setSheet(page, 'split')
    await expect(page.locator('.event-detail h2')).toBeVisible()
    await geometry(page)
    const rectangles = await page.evaluate(() =>
      [
        ...document.querySelectorAll(
          '.visualization-switch, .pillar-side-select, .pillar-tabs, .pillar-settings, .focus-mode-exit',
        ),
      ]
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
    await page.locator('.pillar-cluster').click()
    await page.keyboard.press('Escape')
    await expect(page.locator('.pillar-cluster')).toBeFocused()
    await page.locator('.pillar-cluster').click()
    const buttons = page.locator('.pillar-cluster-list button')
    const total = await buttons.count()
    await expect(page.locator('.pillar-cluster')).toHaveAccessibleName(
      `查看这段时间的全部${total}个事件`,
    )
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
      if (overview) await page.getByRole('button', { name: '查看历史全貌', exact: true }).click()
      const footer = await page.evaluate(() => {
        const canvas = document.querySelector('.time-pillar')!.getBoundingClientRect()
        return [...document.querySelectorAll('.pillar-footer button')]
          .map((el) => el.getBoundingClientRect())
          .filter((rect) => rect.width > 0)
          .map((rect) => ({
            left: rect.left - canvas.left,
            right: rect.right - canvas.right,
            width: rect.width,
            height: rect.height,
          }))
      })
      for (const control of footer) {
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
