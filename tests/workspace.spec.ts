import { expect, test } from '@playwright/test'

const periodSelect = '切换历史时期'
test('keeps a long traveler caption inside the small phone map while approaching a distant stop', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#person=sushi&journey=sushi&year=1094')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-trail-rendered', 'true')
  await page.getByRole('combobox', { name: '播放速度', exact: true }).selectOption('0.5')
  await page.getByRole('button', { name: '播放时间', exact: true }).click()
  await expect
    .poll(
      async () => Number(await page.locator('.journey-traveler').getAttribute('data-progress')),
      { timeout: 10000 },
    )
    .toBeGreaterThan(0.72)
  await page.getByRole('button', { name: '暂停时间播放', exact: true }).click()
  const placement = await page.evaluate(() => {
    const rect = (selector: string) => document.querySelector(selector)!.getBoundingClientRect()
    const map = rect('.map-canvas'),
      caption = rect('.traveler-name'),
      figure = rect('.traveler-figure')
    const overlaps = [...document.querySelectorAll('.layers-button,.map-controls')].some((e) => {
      const b = e.getBoundingClientRect()
      return [caption, figure].some(
        (a) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top,
      )
    })
    return {
      inside:
        caption.left >= map.left &&
        caption.right <= map.right &&
        caption.bottom <= map.bottom &&
        caption.top >= map.top,
      overlaps,
    }
  })
  expect(placement).toEqual({ inside: true, overlaps: false })
})

test('restores a shared world camera below the former regional zoom limit', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#year=230&lng=15&lat=20&zoom=0.8')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  await expect(page).toHaveURL(/zoom=0.8(?:&|$)/)
  await page.reload()
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  await expect(page).toHaveURL(/zoom=0.8(?:&|$)/)
  await expect(page).toHaveURL(/lng=15&lat=20&zoom=0.8(?:&|$)/)
})

test('merges period navigation into the clock and frees desktop map area', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#year=230')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  await expect(page.locator('.period-sidebar')).toHaveCount(0)
  await expect(page.locator('.dynasty-strip button')).toHaveCount(19)
  const sizes = await page.evaluate(() => {
    const map = document.querySelector('.map-canvas')!.getBoundingClientRect(),
      header = document.querySelector('.topbar')!.getBoundingClientRect(),
      timeline = document.querySelector('.timeline')!.getBoundingClientRect()
    return {
      map: { x: map.x, y: map.y, w: map.width, h: map.height, bottom: map.bottom },
      header: { h: header.height, bottom: header.bottom },
      timeline: { top: timeline.top, bottom: timeline.bottom },
    }
  })
  expect(sizes.map.x).toBe(0)
  expect(sizes.map.w).toBeGreaterThan(1000)
  expect(sizes.map.h).toBeGreaterThan(590)
  await expect(page.locator('.map-title')).toHaveCount(0)
  expect(sizes.map.y).toBe(sizes.header.bottom)
  expect(sizes.map.bottom).toBeLessThanOrEqual(sizes.timeline.top)
  expect(sizes.timeline.bottom).toBeLessThanOrEqual(900)
})

test('opens Xia through Spring and Autumn with sourced reading and honest approximate dates', async ({
  page,
}) => {
  await page.goto('/#year=230')
  for (const [period, heading, year] of [
    ['xia', '夏', '1800'],
    ['shang', '商', '1250'],
    ['western-zhou', '西周', '841'],
    ['spring', '东周', '651'],
  ]) {
    await page.getByRole('combobox', { name: periodSelect }).selectOption(period)
    await expect(page.locator('.dynasty-detail h2')).toHaveText(heading)
    await expect(page.locator('.year-title')).toContainText(year)
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    await expect(page.locator('.dynasty-reading-section')).toHaveCount(2)
    await expect(page.locator('.early-map-note')).toBeVisible()
  }
  await page.goto('/#year=-1800&event=erlitou-centre')
  await expect(page.locator('.event-detail')).toContainText('约公元前1800—前1500年')
  await expect(page.locator('.event-detail')).toContainText('非都邑精确建成年')
  await expect(page.locator('.rail-label').filter({ hasText: '二里头' })).toBeVisible()
})

test('loads global time slices and reaches Rome, the Americas and Africa', async ({ page }) => {
  const mapRequests: string[] = []
  page.on('request', (r) => {
    if (r.url().includes('/data/maps/')) mapRequests.push(r.url())
  })
  await page.goto('/#year=230')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  await page.getByRole('button', { name: '查看全球疆域', exact: true }).click()
  await expect(
    page.locator('.polity-label[data-visible="true"]').filter({ hasText: '罗马帝国' }),
  ).toBeVisible()
  await expect(
    page.locator('.polity-label[data-visible="true"]').filter({ hasText: 'Mayan' }),
  ).toBeVisible()
  // Smaller polity names may be suppressed by collisions at the fitted world scale.
  await page.goto('/#year=230&lng=30&lat=20&zoom=3')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  await expect(
    page.locator('.polity-label[data-visible="true"]').filter({ hasText: 'Kush' }),
  ).toBeVisible()
  expect(mapRequests.length).toBeGreaterThan(0)
  expect(mapRequests.every((url) => /\/maps\/[a-z-]+\/\d+\.geojson$/.test(url))).toBe(true)
  await page.goto('/#year=1840&lng=-100&lat=38&zoom=2.5')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  await expect(
    page.locator('.polity-label[data-visible="true"]').filter({ hasText: '美国' }),
  ).toBeVisible()
  await page.locator('.polity-label[data-visible="true"]').filter({ hasText: '美国' }).click()
  await expect(page.locator('.polity-detail')).toContainText('United States')
})

for (const width of [390, 768, 1440]) {
  test(`timeline names avoid overlap and preserve date pins at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 })
    await page.goto('/#year=1840&event=opium-war&scope=period')
    await expect(page.locator('.rail-label.selected')).toContainText('鸦片战争')
    const boxes = await page.locator('.rail-label').evaluateAll((items) =>
      items.map((item) => {
        const r = item.getBoundingClientRect()
        return { left: r.left, right: r.right, top: r.top, bottom: r.bottom }
      }),
    )
    expect(boxes.length).toBeGreaterThanOrEqual(2)
    for (let i = 0; i < boxes.length; i++)
      for (let j = 0; j < i; j++)
        expect(boxes[i].left >= boxes[j].right || boxes[i].right <= boxes[j].left).toBe(true)
    const overlap = await page.evaluate(() => {
      const labels = [...document.querySelectorAll('.rail-label')].map((e) =>
          e.getBoundingClientRect(),
        ),
        pins = [...document.querySelectorAll('.rail-event')].map((e) => e.getBoundingClientRect())
      return labels.some((a) =>
        pins.some(
          (b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top,
        ),
      )
    })
    expect(overlap).toBe(false)
    await page.locator('.rail-label.selected').click()
    if (await page.locator('.timeline-event-menu').isVisible()) {
      await expect(page.locator('.timeline-event-menu')).toBeInViewport({ ratio: 1 })
      await page
        .locator('.timeline-event-choice')
        .filter({ hasText: '鸦片战争开始' })
        .first()
        .click()
    }
    await expect(page.locator('.event-detail h2')).toContainText('鸦片战争')
  })
}

test('uses simplified sources in event, dynasty and person reading', async ({ page }) => {
  for (const url of [
    '/#year=-2070&event=xia-tradition',
    '/#year=-1800&dynasty=xia-early',
    '/#year=-1800&person=early-yu',
  ]) {
    await page.goto(url)
    const sources = page.locator('.panel-scroll a[href*="zh.wikisource.org"]')
    await expect(sources.first()).toHaveAttribute('href', /\/zh-hans\//)
    expect(await sources.count()).toBeGreaterThan(0)
  }
})
