import { setSheet } from './mobile-sheet-helpers'
import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
})

test('starts with a compact sheet and no top mode switch', async ({ page }) => {
  await page.goto('/#year=230')
  await expect(page.getByRole('navigation', { name: '手机显示方式' })).toHaveCount(0)
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'map')
  await expect(page.locator('.panel-scroll')).toBeHidden()
  await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
  await page.getByRole('button', { name: '调整资料面板高度' }).click()
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'split')
  await expect(page.locator('.event-card p').first()).toBeInViewport({ ratio: 1 })
  await page.reload()
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'map')
})

for (const [width, height] of [
  [360, 640],
  [375, 667],
  [390, 844],
  [430, 932],
]) {
  test(`shows the first event and summary without scrolling at ${width}x${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height })
    await page.goto('/#year=230')
    await setSheet(page, 'split')
    await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'split')
    await expect(page.locator('.event-card h3').first()).toBeInViewport({ ratio: 1 })
    await expect(page.locator('.event-card p').first()).toBeInViewport({ ratio: 1 })
    await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
    expect((await page.locator('.timeline').boundingBox())!.height).toBeLessThanOrEqual(149)
    expect((await page.locator('.map-shell').boundingBox())!.height).toBeGreaterThanOrEqual(160)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    )
  })
}

test('keeps reading alive through rapid mode changes without flooding browser history', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.addInitScript(() => {
    const native = history.replaceState.bind(history)
    const writes: number[] = []
    Object.assign(window, { historyWriteTimes: writes })
    history.replaceState = (...args) => {
      writes.push(performance.now())
      return native(...args)
    }
  })
  await page.goto('/#year=230')
  await setSheet(page, 'split')
  await expect(page.locator('.event-card').first()).toBeVisible()
  for (let i = 0; i < 80; i++) {
    await setSheet(page, i % 2 ? 'split' : 'reading')
    await page.waitForTimeout(40)
    await expect(page.locator('.atlas-app')).toBeVisible()
  }
  await setSheet(page, 'reading')
  await expect(page.locator('.event-card p').first()).toBeInViewport({ ratio: 1 })
  const peak = await page.evaluate(() => {
    const times = (window as unknown as { historyWriteTimes: number[] }).historyWriteTimes
    return Math.max(
      ...times.map((time) => times.filter((other) => other >= time && other < time + 10000).length),
    )
  })
  expect(peak).toBeLessThan(40)
  expect(errors).toEqual([])
})

test('reads before the map module arrives and restores the map afterwards', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  let release!: () => void
  const blocked = new Promise<void>((resolve) => {
    release = resolve
  })
  await page.route(
    /\/(?:src\/components\/HistoryMap\.tsx|assets\/HistoryMap-[^/]+\.js)(?:\?.*)?$/,
    async (route) => {
      await blocked
      await route.continue()
    },
  )
  await page.goto('/#year=1082&person=sushi', { waitUntil: 'domcontentloaded' })
  await setSheet(page, 'reading')
  await expect(page.locator('.person-biography')).toContainText('苏轼')
  release()
  await setSheet(page, 'map')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  await setSheet(page, 'reading')
  await expect(page.locator('.person-biography')).toContainText('苏轼')
  expect(errors).toEqual([])
})

test('shares a newly selected location while the map stays hidden for reading', async ({
  page,
  context,
}) => {
  await page.goto('/#year=230')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  await setSheet(page, 'reading')
  await page.getByRole('combobox', { name: '搜索历史事件、人物或地名' }).fill('库克沼泽')
  await page.getByRole('option').first().click()
  await expect(page.locator('.event-detail h2')).toContainText('库克')
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'reading')
  await expect(page).toHaveURL(/lng=144\./)
  const recipient = await context.newPage()
  await recipient.setViewportSize({ width: 390, height: 844 })
  await recipient.goto(page.url())
  await expect(
    recipient.locator('.event-marker[data-active-event="kuk-early-farming"]'),
  ).toHaveAttribute('data-visible', 'true')
  await recipient.close()
})

test('keeps navigation usable when the browser rejects history writes and recovers afterwards', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/#year=1750&scope=period')
  // This case isolates History API recovery; let the initial lazy import finish
  // before its later reload can cancel an in-flight module request in WebKit.
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  await setSheet(page, 'reading')
  await expect(page.locator('.event-card').first()).toBeVisible()
  await page.evaluate(() => {
    const replace = history.replaceState.bind(history)
    const push = history.pushState.bind(history)
    Object.assign(window, {
      restoreHistory: () => {
        history.replaceState = replace
        history.pushState = push
      },
    })
    history.replaceState = history.pushState = () => {
      throw new DOMException('temporarily blocked', 'SecurityError')
    }
  })
  await page.locator('.event-card').first().click()
  await expect(page.locator('.event-detail h2')).toBeVisible()
  await page.getByRole('button', { name: '返回列表', exact: true }).click()
  await expect(page.locator('.event-card').first()).toBeVisible()
  await page.evaluate(() => (window as unknown as { restoreHistory: () => void }).restoreHistory())
  await expect(page).toHaveURL(/year=1750/)
  await page.locator('.event-card').first().click()
  await expect(page).toHaveURL(/event=/)
  await page.reload()
  await setSheet(page, 'reading')
  await expect(page.locator('.event-detail h2')).toBeVisible()
  await page.getByRole('button', { name: '返回列表', exact: true }).click()
  await expect(page.locator('.year-title')).toContainText('1750')
  expect(errors).toEqual([])
})

test('restores the return origin when a reload drops native history state', async ({ page }) => {
  await page.goto('/#year=1750&scope=period')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  await setSheet(page, 'reading')
  await page.locator('.event-card').first().click()
  await expect(page).toHaveURL(/event=/)
  await page.addInitScript(() => history.replaceState(null, '', location.href))
  await page.reload()
  await setSheet(page, 'reading')
  await page.getByRole('button', { name: '返回列表', exact: true }).click()
  await expect(page.locator('.year-title')).toContainText('1750')
})
