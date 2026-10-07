import { expect, test, type Page } from '@playwright/test'
import { setSheet } from './mobile-sheet-helpers'

test.use({ viewport: { width: 390, height: 844 }, hasTouch: true })

async function dragHandle(page: Page, distance: number, cancel = false) {
  const handle = page.locator('.mobile-sheet-handle')
  const box = (await handle.boundingBox())!
  const x = box.x + box.width / 2,
    y = box.y + 22
  await page.mouse.move(x, y)
  await page.mouse.down()
  await page.mouse.move(x, y + distance, { steps: 8 })
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-sheet-dragging', 'true')
  await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
  if (cancel) await handle.dispatchEvent('pointercancel')
  await page.mouse.up()
}

// Native touch listeners are also tested in WebKit. Chromium additionally gets trusted
// touch input below so browser scroll arbitration (rather than only handlers) is exercised.
async function contentTouch(page: Page, dy: number, dx = 0, cancel = false) {
  return page.locator('.panel-scroll').evaluate(
    (panel, { dy, dx, cancel }) => {
      const r = panel.getBoundingClientRect(),
        x = r.left + 90,
        y = r.top + 70
      // WebKit does not expose a constructible Touch. Dispatch an event with
      // the browser listener's touch-list shape; trusted input is covered below.
      const touch = (clientX: number, clientY: number) => ({
        identifier: 1,
        target: panel,
        clientX,
        clientY,
      })
      const event = (type: string, touches: ReturnType<typeof touch>[]) => {
        const result = new Event(type, { bubbles: true, cancelable: true })
        Object.defineProperty(result, 'touches', { value: touches })
        return result
      }
      panel.dispatchEvent(event('touchstart', [touch(x, y)]))
      const moved = event('touchmove', [touch(x + dx, y + dy)])
      panel.dispatchEvent(moved)
      panel.dispatchEvent(event(cancel ? 'touchcancel' : 'touchend', []))
      return moved.defaultPrevented
    },
    { dy, dx, cancel },
  )
}

test('drags through three stops, keeps the clock fixed, and cancels without losing the article', async ({
  page,
}) => {
  await page.goto('/#year=1082&person=sushi')
  const timeline = (await page.locator('.timeline').boundingBox())!
  await dragHandle(page, -130)
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'split')
  await dragHandle(page, -100)
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'reading')
  await expect(page.locator('.person-biography')).toContainText('苏轼')
  await dragHandle(page, 100, true)
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'reading')
  await dragHandle(page, 100)
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'split')
  await dragHandle(page, 140)
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'map')
  await expect(page.locator('.panel-scroll')).toBeHidden()
  expect((await page.locator('.timeline').boundingBox())!.y).toBe(timeline.y)
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
})

test('arbitrates article scrolling, horizontal swipes, and cancellation', async ({ page }) => {
  await page.goto('/#year=1082&person=sushi')
  await setSheet(page, 'split')
  expect(await contentTouch(page, -90)).toBe(true)
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'reading')
  expect(await contentTouch(page, -90)).toBe(false)
  await page.locator('.panel-scroll').evaluate((el) => {
    el.scrollTop = 180
  })
  expect(await contentTouch(page, 90)).toBe(false)
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'reading')
  await page.locator('.panel-scroll').evaluate((el) => {
    el.scrollTop = 0
  })
  expect(await contentTouch(page, 20, 100)).toBe(false)
  expect(await contentTouch(page, 90, 0, true)).toBe(true)
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'reading')
  expect(await contentTouch(page, 90)).toBe(true)
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'split')
  await page.locator('.panel-tabs').getByRole('button', { name: '人物', exact: true }).click()
  await expect(page.locator('.people-panel')).toBeVisible()
})

for (const [width, height] of [
  [320, 568],
  [360, 640],
  [390, 844],
  [430, 932],
  [844, 390],
]) {
  test(`separates speed from stepping and keeps controls reachable at ${width}x${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height })
    await page.goto('/#year=230')
    const next = page.getByRole('button', { name: '下一个历史事件', exact: true })
    const previous = page.getByRole('button', { name: '上一个历史事件', exact: true })
    const speed = page.getByRole('combobox', { name: '播放速度', exact: true })
    await speed.selectOption('0.5')
    for (const button of [next, previous]) {
      const box = (await button.boundingBox())!,
        speedBox = (await speed.boundingBox())!
      expect(box.width).toBeGreaterThanOrEqual(44)
      expect(box.height).toBeGreaterThanOrEqual(44)
      expect(box.x - (speedBox.x + speedBox.width)).toBeGreaterThanOrEqual(64)
      await button.tap({ position: { x: box.width - 2, y: box.height / 2 } })
      await expect(speed).toHaveValue('0.5')
    }
    for (const view of ['map', 'split', 'reading'] as const) {
      await setSheet(page, view)
      await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
      await expect(speed).toBeInViewport({ ratio: 1 })
      if (height < 541 && view === 'reading')
        await expect(page.locator('.event-card h3').first()).toBeInViewport({ ratio: 1 })
      expect(
        await page
          .locator('.time-ticks > span')
          .evaluateAll((elements) =>
            elements.every((el) => el.getBoundingClientRect().bottom <= innerHeight),
          ),
      ).toBe(true)
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        width,
      )
    }
  })
}

test('native touch scrolls an expanded article and collapses only from its top', async ({
  page,
  browserName,
  context,
}) => {
  test.skip(
    browserName !== 'chromium',
    'Trusted touch injection uses Chromium CDP; WebKit covers native listeners above.',
  )
  await page.goto('/#year=1082&person=sushi')
  await setSheet(page, 'split')
  const cdp = await context.newCDPSession(page)
  const swipe = async (x: number, y: number, dy: number) => {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] })
    for (let i = 1; i <= 10; i++) {
      await cdp.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [{ x, y: y + (dy * i) / 10 }],
      })
      await page.waitForTimeout(20)
    }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
    await page.waitForTimeout(180)
  }
  const panel = (await page.locator('.panel-scroll').boundingBox())!
  await swipe(150, panel.y + 100, -80)
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'reading')
  await swipe(150, 480, -180)
  await expect
    .poll(() => page.locator('.panel-scroll').evaluate((el) => el.scrollTop))
    .toBeGreaterThan(20)
  await swipe(150, 300, 60)
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'reading')
  await page.locator('.panel-scroll').evaluate((el) => {
    el.scrollTop = 0
  })
  await swipe(150, 240, 110)
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'split')
})

test('opens a searched event halfway and keeps it selected after returning to the map', async ({
  page,
}) => {
  await page.goto('/#year=230')
  await page.getByRole('combobox', { name: '搜索历史事件、人物或地名' }).fill('库克沼泽')
  await page.getByRole('option').first().click()
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'split')
  await expect(page.locator('.event-detail h2')).toContainText('库克')
  await setSheet(page, 'reading')
  await setSheet(page, 'map')
  await expect(
    page.locator('.event-marker[data-active-event="kuk-early-farming"]'),
  ).toHaveAttribute('data-visible', 'true')
})

test('shows a clean Five Dynasties label while retaining the combined-source explanation', async ({
  page,
}) => {
  await page.goto('/#year=945')
  const label = page.getByRole('button', { name: '查看五代十国疆域资料', exact: true })
  await expect(label).toHaveText('五代十国')
  await label.click()
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'split')
  await setSheet(page, 'reading')
  await expect(page.locator('.polity-detail h2')).toHaveText('五代十国')
  await expect(page.locator('.polity-detail .evidence-note')).toContainText('不是一个统一政权')
  await expect(page.locator('.polity-english')).toHaveText('(Five Dynasties and Ten Kingdoms)')
})
