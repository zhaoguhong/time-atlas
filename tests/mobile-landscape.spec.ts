import { expect, test, type Page } from '@playwright/test'
import { setSheet } from './mobile-sheet-helpers'

test.use({ hasTouch: true })

async function landscapeAction(page: Page, name: string) {
  const button = page.locator('.mobile-landscape-controls').getByRole('button', {
    name,
    exact: true,
  })
  await expect(button).toBeInViewport({ ratio: 1 })
  const box = (await button.boundingBox())!
  expect(box.width).toBeGreaterThanOrEqual(44)
  expect(box.height).toBeGreaterThanOrEqual(44)
  await button.tap()
}

async function expectSideBySide(page: Page) {
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'split')
  await expect(page.locator('.map-shell')).toBeInViewport({ ratio: 1 })
  await expect(page.locator('.story-panel')).toBeInViewport({ ratio: 1 })
  const map = (await page.locator('.map-shell').boundingBox())!
  const reader = (await page.locator('.story-panel').boundingBox())!
  expect(reader.x).toBeGreaterThanOrEqual(map.x + map.width - 1)
  expect(reader.y).toBeCloseTo(map.y, 0)
  expect(reader.height).toBeCloseTo(map.height, 0)
  expect(map.width).toBeGreaterThanOrEqual(240)
  expect(map.height).toBeGreaterThanOrEqual(Math.min(180, page.viewportSize()!.height - 160))
  expect(reader.width).toBeGreaterThanOrEqual(280)
  expect(reader.width).toBeLessThanOrEqual(360)
  expect((await page.locator('.panel-scroll').boundingBox())!.height).toBeGreaterThanOrEqual(64)
}

async function expectTimelineControls(page: Page) {
  const controls = [
    page.locator('.timeline .year-title'),
    page.getByRole('combobox', { name: '播放速度', exact: true }),
    page.getByRole('combobox', { name: '切换历史时期', exact: true }),
    page.getByRole('button', { name: '时间轴选项', exact: true }),
    page.getByRole('button', { name: '上一个历史事件', exact: true }),
    page.getByRole('button', { name: '播放时间', exact: true }),
    page.getByRole('button', { name: '下一个历史事件', exact: true }),
  ]
  const boxes = []
  for (const control of controls) {
    await expect(control).toBeInViewport({ ratio: 1 })
    boxes.push((await control.boundingBox())!)
  }
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i],
        b = boxes[j]
      const overlapWidth = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x)
      const overlapHeight = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y)
      expect(
        Math.min(overlapWidth, overlapHeight),
        `timeline controls ${i} and ${j}`,
      ).toBeLessThanOrEqual(0)
    }
  }
  const options = page.getByRole('button', { name: '时间轴选项', exact: true })
  await options.tap()
  for (const option of [
    page.getByRole('combobox', { name: '播放方式', exact: true }),
    page.getByRole('button', { name: '缩小到全部历史', exact: true }),
    page.getByRole('button', { name: '查看时代背景', exact: true }),
    page.getByRole('button', { name: '年份对比', exact: true }),
  ]) {
    await expect(option).toBeInViewport({ ratio: 1 })
  }
  await options.tap()
  await expect(page.getByRole('combobox', { name: '播放方式', exact: true })).toBeHidden()
}

for (const [width, height] of [
  [568, 320],
  [667, 375],
  [844, 390],
  [932, 430],
  [960, 480],
  [1000, 540],
]) {
  test(`uses a side reader and keeps the map and clock usable at ${width}x${height}`, async ({
    page,
  }, info) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.setViewportSize({ width, height })
    await page.goto('/#year=1082&person=sushi')
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    await expectTimelineControls(page)
    await expect(page.locator('.mobile-sheet-handle')).toBeHidden()
    await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'map')
    await expect(page.locator('.panel-scroll')).toBeHidden()
    expect((await page.locator('.story-panel').boundingBox())!.width).toBeLessThanOrEqual(48)

    await landscapeAction(page, '打开资料面板')
    await expectSideBySide(page)
    await expect(page.locator('.person-biography')).toContainText('苏轼')
    await page.screenshot({ path: info.outputPath('landscape-split.png') })
    await landscapeAction(page, '展开阅读')
    await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'reading')
    await expect(page.locator('.map-shell')).toBeHidden()
    const expanded = (await page.locator('.story-panel').boundingBox())!
    expect(expanded.width).toBeGreaterThanOrEqual(width - 2)
    await expect(page.locator('.person-biography')).toContainText('苏轼')
    await landscapeAction(page, '返回地图与资料')
    await expectSideBySide(page)
    await landscapeAction(page, '收起资料面板')
    await expect(page.locator('.panel-scroll')).toBeHidden()
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    await landscapeAction(page, '打开资料面板')
    await landscapeAction(page, '展开阅读')
    await landscapeAction(page, '收起资料面板')
    await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'map')

    await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
    const timeline = (await page.locator('.timeline').boundingBox())!
    expect(timeline.width).toBeGreaterThanOrEqual(width - 2)
    expect(timeline.height).toBeLessThanOrEqual(115)
    expect(timeline.y + timeline.height).toBeCloseTo(height, 0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    )
    expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBeLessThanOrEqual(
      height,
    )
    expect(errors).toEqual([])
  })
}

for (const startsLandscape of [false, true]) {
  test(`preserves reading through rotation from ${startsLandscape ? 'landscape' : 'portrait'}`, async ({
    page,
  }) => {
    const portrait = { width: 390, height: 844 }
    const landscape = { width: 844, height: 390 }
    const first = startsLandscape ? landscape : portrait
    const second = startsLandscape ? portrait : landscape
    await page.setViewportSize(first)
    await page.goto('/#year=1082&person=sushi')
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    if (startsLandscape) await landscapeAction(page, '打开资料面板')
    else await setSheet(page, 'split')
    const panel = page.locator('.panel-scroll')
    await panel.evaluate((element) => {
      element.scrollTop = 180
    })
    await expect.poll(() => panel.evaluate((element) => element.scrollTop)).toBeGreaterThan(100)

    for (const viewport of [second, first]) {
      await page.setViewportSize(viewport)
      await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'split')
      await expect(page.locator('.person-biography')).toContainText('苏轼')
      await expect(page.locator('.year-title')).toContainText('1082')
      await expect(page).toHaveURL(/person=sushi/)
      // Reflow can change the exact pixel offset; rotation must not reset progress to the top.
      await expect.poll(() => panel.evaluate((element) => element.scrollTop)).toBeGreaterThan(60)
      await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
      if (viewport.width > viewport.height) {
        await expectSideBySide(page)
        await expect(page.locator('.mobile-sheet-handle')).toBeHidden()
      } else {
        await expect(page.locator('.mobile-sheet-handle')).toBeInViewport({ ratio: 1 })
        await expect(page.locator('.mobile-landscape-controls')).toBeHidden()
        const map = (await page.locator('.map-shell').boundingBox())!
        const reader = (await page.locator('.story-panel').boundingBox())!
        expect(reader.y).toBeGreaterThanOrEqual(map.y + map.height - 1)
      }
    }
  })
}

test('retains the current paragraph when rotating a full-width biography', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#year=1082&person=sushi')
  await setSheet(page, 'reading')
  const paragraph = page.locator('.person-biography p').nth(2)
  await expect(paragraph).toContainText('年谱')
  const text = await paragraph.innerText()
  await paragraph.evaluate((element) => {
    const panel = element.closest('.panel-scroll')!
    panel.scrollTop += element.getBoundingClientRect().top - panel.getBoundingClientRect().top - 20
  })
  const offset = () =>
    paragraph.evaluate(
      (element) =>
        element.getBoundingClientRect().top -
        element.closest('.panel-scroll')!.getBoundingClientRect().top,
    )
  await expect.poll(offset).toBeGreaterThanOrEqual(16)
  await expect.poll(offset).toBeLessThanOrEqual(24)
  for (const viewport of [
    { width: 844, height: 390 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport)
    await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'reading')
    await expect(page.locator('.map-shell')).toBeHidden()
    await expect(page.locator('.year-title')).toContainText('1082')
    await expect(page).toHaveURL(/person=sushi/)
    await expect(paragraph).toHaveText(text)
    // Check the same paragraph near the reading edge, not a nonzero but unrelated scroll offset.
    await expect.poll(async () => Math.abs((await offset()) - 20)).toBeLessThanOrEqual(64)
    await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
  }
})

test('keeps the map open through rotation and retains the selected event marker', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto('/#year=230')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  for (const viewport of [
    { width: 667, height: 375 },
    { width: 375, height: 667 },
  ]) {
    await page.setViewportSize(viewport)
    await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'map')
    await expect(page.locator('.panel-scroll')).toBeHidden()
    await expect(page.locator('.year-title')).toContainText('230')
    await expect(page.locator('.map-shell')).toBeInViewport({ ratio: 1 })
  }

  await page.getByRole('combobox', { name: '搜索历史事件、人物或地名' }).fill('赤壁赋')
  await page.getByRole('option').first().tap()
  await expect(page.locator('.event-detail h2')).toContainText('赤壁赋')
  await expect(page).toHaveURL(/event=sushi-red-cliff/)
  await setSheet(page, 'map')
  const marker = page.locator('.event-marker[data-active-event="sushi-red-cliff"]')
  for (const viewport of [
    { width: 667, height: 375 },
    { width: 375, height: 667 },
  ]) {
    await page.setViewportSize(viewport)
    await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'map')
    await expect(page.locator('.panel-scroll')).toBeHidden()
    await expect(page.locator('.year-title')).toContainText('1082')
    await expect(page).toHaveURL(/event=sushi-red-cliff/)
    await expect(marker).toHaveAttribute('data-visible', 'true')
    await expect(marker).toBeInViewport({ ratio: 1 })
    await expect
      .poll(async () => {
        const map = (await page.locator('.map-shell').boundingBox())!
        const pin = (await marker.boundingBox())!
        return (
          pin.x >= map.x - 1 &&
          pin.y >= map.y - 1 &&
          pin.x + pin.width <= map.x + map.width + 1 &&
          pin.y + pin.height <= map.y + map.height + 1
        )
      })
      .toBe(true)
  }
  await setSheet(page, 'split')
  await expect(page.locator('.event-detail h2')).toContainText('赤壁赋')
})

test('preserves portrait, tablet and desktop reading layouts', async ({ page }, info) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const [name, width, height] of [
    ['phone-portrait', 390, 844],
    ['tablet', 768, 1024],
    ['desktop', 1440, 900],
  ] as const) {
    await page.setViewportSize({ width, height })
    await page.goto('/#year=1082&person=sushi')
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    if (name === 'phone-portrait') await setSheet(page, 'split')
    await expect(page.locator('.mobile-landscape-controls')).toBeHidden()
    await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
    await expect(page.locator('.person-biography')).toContainText('苏轼')
    await expect(page.locator('.map-shell')).toBeInViewport({ ratio: 1 })
    const map = (await page.locator('.map-shell').boundingBox())!
    const reader = (await page.locator('.story-panel').boundingBox())!
    if (name === 'phone-portrait') {
      await expect(page.locator('.mobile-sheet-handle')).toBeInViewport({ ratio: 1 })
      expect(reader.y).toBeGreaterThanOrEqual(map.y + map.height - 1)
    } else {
      await expect(page.locator('.mobile-sheet-handle')).toBeHidden()
      expect(reader.x).toBeGreaterThanOrEqual(map.x + map.width - 1)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    )
    await page.screenshot({ path: info.outputPath(`${name}.png`) })
  }
  expect(errors).toEqual([])
})

test('keeps search, the More menu and time controls usable on a narrow landscape phone', async ({
  page,
}) => {
  await page.setViewportSize({ width: 667, height: 375 })
  await page.goto('/#year=230')
  const next = page.getByRole('button', { name: '下一个历史事件', exact: true })
  const speed = page.getByRole('combobox', { name: '播放速度', exact: true })
  await expect(next).toBeInViewport({ ratio: 1 })
  await expect(speed).toBeInViewport({ ratio: 1 })
  await speed.selectOption('0.5')
  const yearBefore = await page.locator('.year-title').innerText()
  await next.tap()
  await expect(page.locator('.year-title')).not.toHaveText(yearBefore)
  await expect(speed).toHaveValue('0.5')
  const play = page.getByRole('button', { name: '播放时间', exact: true })
  await expect(play).toBeInViewport({ ratio: 1 })
  await play.tap()
  await page.getByRole('button', { name: '暂停时间播放', exact: true }).tap()

  const search = page.getByRole('combobox', { name: '搜索历史事件、人物或地名' })
  await search.fill('苏轼')
  const result = page.getByRole('option').first()
  await expect(result).toBeInViewport({ ratio: 1 })
  await result.tap()
  await expectSideBySide(page)
  await expect(page.locator('.person-biography')).toContainText('苏轼')
  await expect(page.locator('.search-results')).toBeHidden()
  const more = page.getByRole('button', { name: '更多操作', exact: true })
  await more.tap()
  await expect(page.getByRole('button', { name: '分享此刻', exact: true })).toBeInViewport({
    ratio: 1,
  })
  await page.keyboard.press('Escape')
  await expect(more).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
})

test('returns keyboard focus to the timeline options trigger after an action or Escape', async ({
  page,
  browserName,
}) => {
  await page.setViewportSize({ width: 844, height: 390 })
  await page.goto('/#year=1082&person=sushi')
  const trigger = page.getByRole('button', { name: '时间轴选项', exact: true })
  await trigger.focus()
  await page.keyboard.press('Enter')
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('combobox', { name: '播放方式', exact: true })).toBeFocused()
  const allHistory = page.getByRole('button', { name: '缩小到全部历史', exact: true })
  // WebKit on macOS uses Option-Tab to include buttons in keyboard navigation.
  await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab')
  await expect(allHistory).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await expect(trigger).toBeFocused()
  await expect(page.locator('#timeline-options')).toBeHidden()

  await page.keyboard.press('Enter')
  await expect(page.getByRole('button', { name: '放大到当前时期', exact: true })).toBeVisible()
  await page.keyboard.press('Tab')
  await page.keyboard.press('Escape')
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await expect(trigger).toBeFocused()
})

test('keeps a short portrait viewport in sheet layout while searching and restores reading', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#year=1082')
  const search = page.getByRole('combobox', { name: '搜索历史事件、人物或地名' })
  await search.focus()
  // Model the reduced height while a portrait phone's software keyboard is open.
  await page.setViewportSize({ width: 390, height: 350 })
  await expect(page.locator('.mobile-landscape-controls')).toBeHidden()
  await expect(page.locator('.mobile-sheet-handle')).toBeInViewport({ ratio: 1 })
  const map = (await page.locator('.map-shell').boundingBox())!
  const reader = (await page.locator('.story-panel').boundingBox())!
  expect(reader.y).toBeGreaterThanOrEqual(map.y + map.height - 1)
  expect(reader.width).toBeGreaterThanOrEqual(388)
  await search.fill('苏轼')
  const result = page.getByRole('option').first()
  await expect(result).toBeInViewport({ ratio: 1 })
  await result.tap()
  await expect(page).toHaveURL(/person=sushi/)
  await expect(page.locator('.search-results')).toBeHidden()
  await expect(page.locator('.mobile-landscape-controls')).toBeHidden()

  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'split')
  await setSheet(page, 'reading')
  await expect(page.locator('.person-biography')).toContainText('苏轼')
  await expect(page.locator('.year-title')).toContainText('1082')
  await expect(page.locator('.mobile-sheet-handle')).toBeInViewport({ ratio: 1 })
  await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
})

test('does not capture vertical article gestures as bottom-sheet resizing in landscape', async ({
  page,
}) => {
  await page.setViewportSize({ width: 844, height: 390 })
  await page.goto('/#year=1082&person=sushi')
  await landscapeAction(page, '打开资料面板')
  const panel = page.locator('.panel-scroll')
  for (const dy of [-80, 80]) {
    const prevented = await panel.evaluate((element, dy) => {
      element.scrollTop = 0
      const r = element.getBoundingClientRect()
      const touch = (y: number) => ({
        identifier: 1,
        target: element,
        clientX: r.left + 80,
        clientY: y,
      })
      const event = (type: string, touches: ReturnType<typeof touch>[]) => {
        const result = new Event(type, { bubbles: true, cancelable: true })
        Object.defineProperty(result, 'touches', { value: touches })
        return result
      }
      element.dispatchEvent(event('touchstart', [touch(r.top + 40)]))
      const move = event('touchmove', [touch(r.top + 40 + dy)])
      element.dispatchEvent(move)
      element.dispatchEvent(event('touchend', []))
      return move.defaultPrevented
    }, dy)
    expect(prevented).toBe(false)
    await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'split')
    await expect(page.locator('.atlas-app')).not.toHaveAttribute('data-sheet-dragging')
  }
  await panel.hover()
  await page.mouse.wheel(0, 160)
  await expect.poll(() => panel.evaluate((element) => element.scrollTop)).toBeGreaterThan(30)
  await expectSideBySide(page)
})
