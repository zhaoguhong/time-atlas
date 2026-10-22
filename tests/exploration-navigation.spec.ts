import { expect, test, type Locator, type Page } from '@playwright/test'
import { setSheet } from './mobile-sheet-helpers'

test.use({ hasTouch: true })

async function expectTouchControl(control: Locator) {
  await expect(control).toBeInViewport({ ratio: 1 })
  const bounds = (await control.boundingBox())!
  expect(bounds.width).toBeGreaterThanOrEqual(44)
  expect(bounds.height).toBeGreaterThanOrEqual(44)
}

async function mapReady(page: Page, hash: string) {
  await page.goto(`/#${hash}`)
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
}

async function expectLayerPopoverFit(page: Page) {
  await expect(page.locator('.layers-popover')).toBeInViewport({ ratio: 1 })
  await expect
    .poll(() =>
      page.evaluate(() => {
        const popup = document.querySelector('.layers-popover')!.getBoundingClientRect()
        const header = document.querySelector('.topbar')!.getBoundingClientRect()
        const tools = document.querySelector('.map-tools-row')!.getBoundingClientRect()
        const problems: string[] = []
        if (popup.top < header.bottom) problems.push('covers header')
        if (popup.height < 100) problems.push('not enough room to use layers')
        if (popup.left < 0 || popup.right > innerWidth || popup.bottom > innerHeight)
          problems.push('outside viewport')
        if (
          popup.left < tools.right &&
          popup.right > tools.left &&
          popup.top < tools.bottom &&
          popup.bottom > tools.top
        )
          problems.push('covers map tools')
        return problems
      }),
    )
    .toEqual([])
}

async function expectHeaderFit(page: Page) {
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  )
  const problems = await page.locator('.topbar').evaluate((header) => {
    const problems: string[] = []
    const frame = header.getBoundingClientRect()
    const items = [
      ...header.querySelectorAll(
        '.brand, .header-view-switch, [data-main-topics], .top-search, .header-more, .header-actions, .color-mode-toggle',
      ),
    ]
      .filter((element) => {
        const rect = element.getBoundingClientRect()
        return (
          rect.width > 0 && rect.height > 0 && getComputedStyle(element).visibility !== 'hidden'
        )
      })
      .map((element) => ({ name: element.className, rect: element.getBoundingClientRect() }))
    for (const { name, rect } of items) {
      if (rect.left < frame.left - 0.5 || rect.right > frame.right + 0.5)
        problems.push(`${name} outside header width`)
      if (rect.top < frame.top - 0.5 || rect.bottom > frame.bottom + 0.5)
        problems.push(`${name} outside header height`)
    }
    for (let i = 0; i < items.length; i++)
      for (let j = i + 1; j < items.length; j++) {
        const a = items[i].rect,
          b = items[j].rect
        if (a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top)
          problems.push(`${items[i].name} overlaps ${items[j].name}`)
      }
    if (document.documentElement.scrollWidth > innerWidth) problems.push('horizontal overflow')
    return problems
  })
  expect(problems).toEqual([])
}

function headerMode(page: Page, name: '地图' | '时空柱') {
  return page.getByRole('group', { name: '探索模式', exact: true }).getByRole('button', {
    name,
    exact: true,
  })
}

for (const [width, height] of [
  [320, 640],
  [360, 640],
  [390, 844],
  [568, 320],
  [844, 390],
  [1024, 768],
  [1440, 900],
]) {
  test(`text view navigation shares one header and retains reading at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    await mapReady(page, 'year=1687&event=world-newton&span=200')
    const mobile = width <= 700 || (width <= 1000 && height <= 540)
    for (const name of ['地图', '时空柱'] as const) {
      await expectTouchControl(headerMode(page, name))
      await expect(headerMode(page, name)).toHaveText(name)
    }
    await expectTouchControl(page.getByRole('button', { name: '切换到夜间模式', exact: true }))
    await expect(page.locator('.visualization-action')).toHaveCount(0)
    await expect(headerMode(page, '地图')).toHaveAttribute('aria-pressed', 'true')
    await expectHeaderFit(page)
    await expect(page.locator('.map-mode-shortcut')).toHaveCount(0)
    if (mobile) {
      await setSheet(page, 'reading')
      await expect(page.locator('.map-shell')).toBeHidden()
      await expectTouchControl(headerMode(page, '地图'))
      await headerMode(page, '地图').click()
      await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'split')
    }
    const title = await page.locator('.event-detail h2').innerText()
    await headerMode(page, '时空柱').click()
    await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', '1687')
    await expect(page.locator('.pillar-card.selected')).toHaveAttribute(
      'data-event-id',
      'world-newton',
    )
    await expect(page.locator('.event-detail h2')).toHaveText(title)
    await expect(headerMode(page, '时空柱')).toHaveAttribute('aria-pressed', 'true')
    await expectHeaderFit(page)
    const topbar = (await page.locator('.topbar').boundingBox())!
    const canvas = (await page.locator('.pillar-stage').boundingBox())!
    expect(canvas.y).toBeCloseTo(topbar.y + topbar.height, 0)
    await page.screenshot({ path: info.outputPath(`header-pillar-${width}x${height}.png`) })
    await headerMode(page, '地图').click()
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    await expect(page.locator('.event-detail h2')).toHaveText(title)
    await expect(page).toHaveURL(/year=1687(?:&|$)/)
    await expect(page).toHaveURL(/event=world-newton(?:&|$)/)
  })
}

for (const [width, height] of [
  [390, 844],
  [568, 320],
]) {
  test(`header view switch stays usable with map overlays and layers at ${width}x${height}`, async ({
    page,
  }, info) => {
    test.setTimeout(90000)
    await page.setViewportSize({ width, height })
    for (const [name, hash, overlay] of [
      ['plain', 'year=1687', ''],
      ['comparison', 'year=755&compare=763', '.comparison-controls'],
      ['early', 'year=-8000', '.early-map-note'],
      ['topic', 'year=1839&tour=opium-wars&step=0', '.tour-banner'],
      ['journey', 'year=1057&person=sushi&journey=sushi&point=sushi-exam', '.journey-toolbar'],
    ]) {
      await mapReady(page, hash)
      if (width > height) await setSheet(page, 'split')
      if (overlay) await expect(page.locator(overlay)).toBeVisible()
      await expect(page.locator('.map-mode-shortcut')).toHaveCount(0)
      const shortcut = headerMode(page, '时空柱')
      await expectTouchControl(shortcut)
      await shortcut.click({ trial: true, timeout: 5000 })
      if (name === 'plain') {
        await page.getByRole('button', { name: '地图图层', exact: true }).click()
        await expectLayerPopoverFit(page)
        await page
          .locator('.layers-popover')
          .getByRole('switch', { name: '历史事件', exact: true })
          .click()
        await expect(
          page.locator('.layers-popover').getByRole('switch', { name: '历史事件', exact: true }),
        ).toHaveAttribute('aria-checked', 'false')
        if (width === 390) {
          await setSheet(page, 'split')
          await expectLayerPopoverFit(page)
          await page.setViewportSize({ width: 568, height: 320 })
          await expectLayerPopoverFit(page)
          await page
            .locator('.layers-popover')
            .getByRole('switch', { name: '历史事件', exact: true })
            .click()
          await expect(
            page.locator('.layers-popover').getByRole('switch', { name: '历史事件', exact: true }),
          ).toHaveAttribute('aria-checked', 'true')
          await page.screenshot({ path: info.outputPath('layers-rotated-split.png') })
          await page.setViewportSize({ width, height })
          await expectLayerPopoverFit(page)
          await setSheet(page, 'map')
          await expectLayerPopoverFit(page)
        }
        await expectTouchControl(shortcut)
        await shortcut.click({ trial: true, timeout: 5000 })
      }
      await page.screenshot({ path: info.outputPath(`map-${name}-${width}.png`) })
      await shortcut.click()
      await expect(page.locator('.pillar-stage')).toBeVisible()
      await expect(page.locator('.layers-popover')).toBeHidden()
      await expect(headerMode(page, '时空柱')).toHaveAttribute('aria-pressed', 'true')
    }
  })
}

for (const [width, height] of [
  [360, 640],
  [568, 320],
]) {
  test(`focus navigation preserves the selected event and restores header focus at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    await page.goto('/#visual=pillar&year=1687&span=200&event=world-newton')
    await expect(page.locator('.pillar-card.selected')).toBeVisible()
    await setSheet(page, 'split')
    const title = await page.locator('.event-detail h2').innerText()
    await page.getByRole('button', { name: '更多操作', exact: true }).click()
    await page.getByRole('button', { name: '进入专注模式', exact: true }).click()
    const exit = page.getByRole('button', { name: '退出专注模式', exact: true })
    await expect(exit).toBeFocused()
    await expect(page.locator('.topbar')).toBeHidden()
    const toMap = page
      .locator('.pillar-focus-navigation')
      .getByRole('button', { name: '地图', exact: true })
    await expectTouchControl(toMap)
    const a = (await exit.boundingBox())!,
      b = (await toMap.boundingBox())!
    expect(b.x).toBeGreaterThanOrEqual(a.x + a.width)
    await toMap.focus()
    await page.keyboard.press('Enter')
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    await expect(page.locator('.event-detail h2')).toHaveText(title)
    const toPillar = page
      .locator('.map-mode-shortcut')
      .getByRole('button', { name: '时空柱', exact: true })
    await expectTouchControl(toPillar)
    await toPillar.focus()
    await page.keyboard.press('Enter')
    await expect(page.locator('.pillar-card.selected')).toHaveAttribute(
      'data-event-id',
      'world-newton',
    )
    await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', '1687')
    await expect(page.locator('.event-detail h2')).toHaveText(title)
    await page.screenshot({ path: info.outputPath(`focus-navigation-${width}.png`) })
    await exit.focus()
    await page.keyboard.press('Enter')
    await expect(page.getByRole('button', { name: '更多操作', exact: true })).toBeFocused()
    await expectTouchControl(headerMode(page, '地图'))
    await expectTouchControl(headerMode(page, '时空柱'))
    await expectHeaderFit(page)
    await expect(page).toHaveURL(/year=1687(?:&|$)/)
  })
}

test('mobile topic and free-exploration actions stay discoverable in More', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 640 })
  await mapReady(page, 'year=750')
  await page.getByRole('button', { name: '更多操作', exact: true }).click()
  const topics = page
    .locator('.header-actions')
    .getByRole('button', { name: '历史专题', exact: true })
  await expectTouchControl(topics)
  await topics.click()
  await expect(page.getByRole('button', { name: '更多操作', exact: true })).toHaveAttribute(
    'aria-expanded',
    'false',
  )
  await page.locator('.tour-card').filter({ hasText: '两次鸦片战争与条约体系' }).click()
  await expect(page.locator('.topic-introduction h2')).toHaveText('两次鸦片战争与条约体系')
  await page.getByRole('button', { name: '更多操作', exact: true }).click()
  const free = page.getByRole('button', { name: '返回自由探索', exact: true })
  await expectTouchControl(free)
  await free.click()
  await expect(page.locator('.tour-banner')).toBeHidden()
  await expect(page.locator('.topic-introduction')).toBeHidden()
  await expect(page).not.toHaveURL(/tour=/)
  await expect(page.locator('.event-card').first()).toBeVisible()
})

test('narrow comparison remains actionable with errors and focus mode', async ({ page }, info) => {
  await page.setViewportSize({ width: 568, height: 320 })
  await mapReady(page, 'year=755&compare=763')
  await setSheet(page, 'split')
  for (const focused of [false, true]) {
    if (focused) {
      await page.getByRole('button', { name: '更多操作', exact: true }).click()
      await page.getByRole('button', { name: '进入专注模式', exact: true }).click()
    }
    const input = page.getByRole('spinbutton', { name: '输入参考年份' })
    await input.fill('0')
    await page.locator('.comparison-controls button[type="submit"]').click()
    await expect(page.locator('.compare-error')).toBeVisible()
    await expect(page.locator('.compare-error')).toBeInViewport({ ratio: 1 })
    await expect(input).toHaveAttribute('aria-invalid', 'true')
    const shortcut = focused
      ? page.locator('.map-mode-shortcut button')
      : headerMode(page, '时空柱')
    await shortcut.click({ trial: true, timeout: 5000 })
    await expectTouchControl(shortcut)
    const comparison = (await page.locator('.comparison-controls').boundingBox())!
    const tools = (await page.locator('.map-tools-row').boundingBox())!
    expect(comparison.y + comparison.height).toBeLessThanOrEqual(tools.y)
    await input.fill('763')
    await page.locator('.comparison-controls button[type="submit"]').click()
    await expect(page.locator('.compare-error')).toBeHidden()
    await expect(input).toHaveAttribute('aria-invalid', 'false')
    await page.locator('.maplibregl-ctrl-attrib-button').click({ trial: true, timeout: 5000 })
    await page.screenshot({ path: info.outputPath(`narrow-comparison-focus-${focused}.png`) })
  }
})
