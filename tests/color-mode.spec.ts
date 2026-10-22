import { expect, test, type Page } from '@playwright/test'
import { setSheet } from './mobile-sheet-helpers'
const key = 'time-atlas:color-mode:v1'
const shapeKey = 'time-atlas:pillar-theme:v1'
test.use({ hasTouch: true, colorScheme: 'light' })
const mode = (page: Page) => page.locator('html')
async function readingContrast(page: Page, selector: string) {
  const ratios = await page.locator(selector).evaluateAll((elements) => {
    const rgb = (color: string) => color.match(/[\d.]+/g)!.map(Number)
    const luminance = (color: number[]) => {
      const [r, g, b] = color.slice(0, 3).map((n) => {
        const v = n / 255
        return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
      })
      return r * 0.2126 + g * 0.7152 + b * 0.0722
    }
    return elements.map((element) => {
      let parent: Element | null = element
      let background: number[] = [17, 30, 36]
      while (parent) {
        const color = rgb(getComputedStyle(parent).backgroundColor)
        if (color.length < 4 || color[3] === 1) {
          background = color
          break
        }
        parent = parent.parentElement
      }
      const a = luminance(rgb(getComputedStyle(element).color)),
        b = luminance(background)
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
    })
  })
  expect(ratios.length).toBeGreaterThan(0)
  expect(ratios.every((ratio) => ratio >= 4.5)).toBe(true)
}
async function toggle(page: Page, target: 'dark' | 'light') {
  await page
    .getByRole('button', {
      name: target === 'dark' ? '切换到夜间模式' : '切换到白天模式',
      exact: true,
    })
    .click()
  await expect(mode(page)).toHaveAttribute('data-color-mode', target)
}
for (const [width, height] of [
  [390, 844],
  [1440, 900],
]) {
  test(`global appearance preserves the map and readable panels at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    await page.goto('/#year=1687&event=world-newton')
    const map = page.locator('.map-canvas')
    await expect(map).toHaveAttribute('data-rendered', 'true')
    await map.evaluate((e) => e.setAttribute('data-preserved-instance', 'yes'))
    const state = page.url()
    let requests = 0
    page.on('request', (r) => {
      if (/\/data\/(?:maps\/|land\.|lakes\.|rivers_)/.test(r.url())) requests++
    })
    await expect(page.locator('.visualization-action')).toHaveCount(0)
    await toggle(page, 'dark')
    await expect(map).toHaveAttribute('data-color-mode', 'dark')
    await expect(map).toHaveAttribute('data-rendered', 'true')
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#142127')
    await readingContrast(page, '.maplibregl-ctrl-attrib-inner a')
    await expect(map).toHaveAttribute('data-preserved-instance', 'yes')
    await expect(page).toHaveURL(state)
    await page.screenshot({ path: info.outputPath(`night-map-${width}.png`) })
    if (width < 700) await setSheet(page, 'reading')
    await expect(page.locator('.event-detail h2')).toContainText('牛顿')
    await page.screenshot({ path: info.outputPath(`night-reading-${width}.png`) })
    const readingBackground = await page
      .locator('.story-panel')
      .evaluate((e) => getComputedStyle(e).backgroundColor)
    expect(readingBackground).toBe('rgb(23, 39, 45)')
    if (!(await page.getByRole('button', { name: '数据与来源', exact: true }).isVisible()))
      await page.getByRole('button', { name: '更多操作', exact: true }).click()
    await page.getByRole('button', { name: '数据与来源', exact: true }).click()
    await expect(page.locator('.info-dialog')).toBeVisible()
    await page.screenshot({ path: info.outputPath(`night-sources-${width}.png`) })
    await page.getByRole('button', { name: '关闭对话框', exact: true }).click()
    await toggle(page, 'light')
    await expect(map).toHaveAttribute('data-color-mode', 'light')
    await expect(map).toHaveAttribute('data-rendered', 'true')
    await expect(map).toHaveAttribute('data-preserved-instance', 'yes')
    expect(requests).toBe(0)
    expect(errors).toEqual([])
  })
}
test('color and shape survive independently across navigation and reload', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#visual=pillar&year=1500&span=900')
  await expect(page.locator('.pillar-card').first()).toBeVisible()
  await toggle(page, 'dark')
  await page.getByRole('button', { name: '时空柱筛选与设置', exact: true }).click()
  await page.getByRole('radio', { name: '山河长卷', exact: true }).locator('..').click()
  await page.getByRole('button', { name: '关闭时空柱面板', exact: true }).click()
  await expect(page.locator('.time-pillar')).toHaveAttribute('data-theme', 'scroll')
  await toggle(page, 'light')
  await expect(page.locator('.time-pillar')).toHaveAttribute('data-theme', 'scroll')
  await page.reload()
  await expect(mode(page)).toHaveAttribute('data-color-mode', 'light')
  await expect(page.locator('.time-pillar')).toHaveAttribute('data-theme', 'scroll')
  await toggle(page, 'dark')
  await page.reload()
  await expect(mode(page)).toHaveAttribute('data-color-mode', 'dark')
  await expect(page.locator('.time-pillar')).toHaveAttribute('data-theme', 'scroll')
})
test('system preference, explicit choice and cross-tab changes are reconciled', async ({
  page,
  context,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/#visual=pillar&year=1500')
  await expect(mode(page)).toHaveAttribute('data-color-mode', 'dark')
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(mode(page)).toHaveAttribute('data-color-mode', 'light')
  await toggle(page, 'dark')
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(mode(page)).toHaveAttribute('data-color-mode', 'dark')
  const other = await context.newPage()
  try {
    await other.goto('/#visual=pillar&year=1500')
    await expect(mode(other)).toHaveAttribute('data-color-mode', 'dark')
    await toggle(other, 'light')
    await expect(mode(page)).toHaveAttribute('data-color-mode', 'light')
    await other.evaluate((key) => localStorage.removeItem(key), key)
    await page.emulateMedia({ colorScheme: 'dark' })
    await expect(mode(page)).toHaveAttribute('data-color-mode', 'dark')
  } finally {
    await other.close()
  }
})
test('night pillar preferences migrate to a global dark mode and the default cylinder', async ({
  page,
}) => {
  await page.addInitScript((key) => localStorage.setItem(key, 'night'), shapeKey)
  await page.goto('/#visual=pillar&year=1500')
  await expect(mode(page)).toHaveAttribute('data-color-mode', 'dark')
  await expect(page.locator('.time-pillar')).toHaveAttribute('data-theme', 'column')
  expect(await page.evaluate((key) => localStorage.getItem(key), key)).toBe('dark')
  await page.getByRole('button', { name: '时空柱筛选与设置', exact: true }).click()
  await readingContrast(page, '.pillar-dialog-head h2')
  await expect(page.getByRole('radio')).toHaveCount(4)
  await expect(page.getByRole('radio', { name: '星夜时柱', exact: true })).toHaveCount(0)
})
test('both modes remain usable without local storage', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.addInitScript(() =>
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('Denied', 'SecurityError')
      },
    }),
  )
  await page.goto('/#visual=pillar&year=1500')
  await expect(mode(page)).toHaveAttribute('data-color-mode', 'light')
  await toggle(page, 'dark')
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(mode(page)).toHaveAttribute('data-color-mode', 'dark')
  await toggle(page, 'light')
  expect(errors).toEqual([])
})

for (const [width, height] of [
  [390, 844],
  [1440, 900],
]) {
  test(`night reading, topics, search and menus stay usable at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    await page.addInitScript((key) => localStorage.setItem(key, 'dark'), key)
    for (const [name, hash, selector] of [
      ['person', 'person=sushi&year=1082', '.person-biography'],
      ['dynasty', 'dynasty=xia-early&year=-1800', '.dynasty-detail'],
      ['topic', 'tour=opium-wars&step=-1&year=1839', '.topic-introduction'],
    ]) {
      await page.goto(`/#${hash}`)
      if (width < 700) await setSheet(page, 'reading')
      await expect(page.locator(selector)).toBeVisible()
      if (await page.locator('.reference-list a').count())
        await readingContrast(page, '.reference-list a')
      if (name === 'dynasty')
        await readingContrast(page, '.dynasty-facts strong, .dynasty-facts span')
      await page.screenshot({ path: info.outputPath(`night-${name}-${width}.png`) })
    }
    const search = page.getByRole('combobox', { name: '搜索历史事件、人物或地名' })
    await page.locator('.top-search').click()
    await search.fill('苏轼')
    await expect(page.locator('.search-results')).toBeVisible()
    await page.screenshot({ path: info.outputPath(`night-search-${width}.png`) })
    await search.press('Escape')
    if (width < 700) {
      await page.getByRole('button', { name: '更多操作', exact: true }).click()
      await expect(page.locator('.header-actions.mobile-open')).toBeVisible()
      await expect(page.locator('.visualization-action')).toHaveCount(0)
      await page.screenshot({ path: info.outputPath(`night-more-${width}.png`) })
    }
    await page.getByRole('button', { name: '历史专题', exact: true }).click()
    await expect(page.locator('.tour-card').first()).toBeVisible()
    await page.screenshot({ path: info.outputPath(`night-topic-list-${width}.png`) })
    const options = page.getByRole('button', { name: '时间轴选项', exact: true })
    if (await options.isVisible()) {
      await options.click()
      await expect(page.locator('#timeline-options')).toBeVisible()
      await page.screenshot({ path: info.outputPath(`night-timeline-options-${width}.png`) })
    }
  })
}
