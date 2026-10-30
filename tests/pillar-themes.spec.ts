import { expandPillarOptions, pillarSideButton } from './refinement-helpers'
import { expect, test, type Page } from '@playwright/test'
import { installPillarClock } from './pillar-clock-helpers'
import { setSheet } from './mobile-sheet-helpers'

const storageKey = 'time-atlas:pillar-theme:v1'
const themes = [
  ['column', '琉璃时柱'],
  ['line', '素笺编年'],
  ['scroll', '山河长卷'],
  ['ribbon', '经纬织带'],
  ['minimal', '留白'],
  ['editorial', '大事记'],
  ['observatory', '观测站'],
] as const
test.use({ hasTouch: true })

async function paint(page: Page) {
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  )
}
async function ready(page: Page, selected = false) {
  await page.goto(`/#visual=pillar&year=1500&span=900${selected ? '&event=world-printing' : ''}`)
  await expect(page.locator('.pillar-card').first()).toBeVisible()
  if (page.viewportSize()!.width <= 700) await setSheet(page, 'map')
  await paint(page)
}
async function openSettings(page: Page) {
  await page.getByRole('button', { name: '时空柱筛选与设置', exact: true }).click()
  await expect(page.locator('.pillar-dialog')).toBeVisible()
  await expandPillarOptions(page, '外观与简介')
}
async function closeSettings(page: Page) {
  await page.getByRole('button', { name: '关闭时空柱面板', exact: true }).click()
  await expect(page.locator('.pillar-dialog')).not.toBeVisible()
  await paint(page)
}
async function choose(page: Page, name: string) {
  const radio = page.getByRole('radio', { name, exact: true })
  await radio.locator('..').click()
  await expect(radio).toBeChecked()
}
async function readingState(page: Page) {
  return page.evaluate(() => {
    const stage = document.querySelector('.pillar-stage')!
    return {
      year: stage.getAttribute('data-year'),
      span: stage.getAttribute('data-span'),
      side: document.querySelector('.time-pillar')!.getAttribute('data-side'),
      selected: document.querySelector('.pillar-card.selected')?.getAttribute('data-event-id'),
      event: new URLSearchParams(location.hash.slice(1)).get('event'),
    }
  })
}
async function compactGeometry(page: Page) {
  const issues = await page.evaluate(() => {
    const issues: string[] = []
    const rect = (element: Element) => element.getBoundingClientRect()
    const overlaps = (a: DOMRect, b: DOMRect) =>
      a.left < b.right - 0.5 &&
      a.right > b.left + 0.5 &&
      a.top < b.bottom - 0.5 &&
      a.bottom > b.top + 0.5
    const stage = rect(document.querySelector('.pillar-stage')!)
    const viewport = document.querySelector('.pillar-events')!
    const clip = rect(viewport)
    if (!['hidden', 'clip'].includes(getComputedStyle(viewport).overflowY))
      issues.push('unclipped event viewport')
    if (clip.top < stage.top - 0.5 || clip.bottom > stage.bottom + 0.5)
      issues.push('event viewport outside canvas')
    const cards = [...document.querySelectorAll('.pillar-card')]
    const controls = [
      ...document.querySelectorAll('[aria-label="探索模式"], .pillar-focus-navigation'),
    ].filter((element) => rect(element).width && rect(element).height)
    if (document.documentElement.scrollWidth > innerWidth) issues.push('horizontal overflow')
    if (document.documentElement.scrollHeight > innerHeight) issues.push('vertical overflow')
    cards.forEach((card, index) => {
      const bounds = rect(card)
      const id = card.getAttribute('data-event-id')
      if (bounds.left < stage.left - 0.5 || bounds.right > stage.right + 0.5)
        issues.push(`${id}: card outside canvas width`)
      if (bounds.bottom <= clip.top || bounds.top >= clip.bottom)
        issues.push(`${id}: offscreen card rendered`)
      const eventButton = card.querySelector('button')!
      if (
        (bounds.top < clip.top - 0.5 || bounds.bottom > clip.bottom + 0.5) &&
        eventButton.tabIndex !== -1
      )
        issues.push(`${id}: partly clipped card remains in tab order`)
      const button = rect(eventButton)
      if (button.height < 44 || button.width < 44) issues.push(`${id}: small touch target`)
      const label = rect(card.querySelector('.pillar-event-line')!)
      if (label.top < bounds.top + 3 || label.bottom > bounds.bottom - 3)
        issues.push(`${id}: clipped label`)
      for (const control of controls)
        if (overlaps(bounds, rect(control))) issues.push(`${id}: covered by controls`)
      for (const next of cards.slice(index + 1))
        if (overlaps(bounds, rect(next))) issues.push(`${id}: overlapping events`)
    })
    return issues
  })
  expect(issues).toEqual([])
  await expect(page.locator('.pillar-event p')).toHaveCount(0)
  for (const event of await page.locator('.pillar-event').all()) {
    await expect(event.locator('time')).toBeVisible()
    await expect(event.locator('strong')).toBeVisible()
  }
}

async function nightTextContrast(page: Page) {
  const results = await page.evaluate(async () => {
    // Read the settled palette, not an intermediate color in the shared button transition.
    await Promise.all(
      document
        .querySelector('.time-pillar')!
        .getAnimations({ subtree: true })
        .filter((animation) => animation.effect?.getComputedTiming().iterations !== Infinity)
        .map((animation) => animation.finished.catch(() => {})),
    )
    type Color = [number, number, number, number]
    const parse = (value: string): Color => {
      const parts = value.match(/[\d.]+/g)!.map(Number)
      // color-mix() serializes to color(srgb …), whose channels are 0–1, not 0–255.
      if (value.startsWith('color(srgb '))
        return [parts[0] * 255, parts[1] * 255, parts[2] * 255, parts[3] ?? 1]
      return [parts[0], parts[1], parts[2], parts[3] ?? 1]
    }
    const over = (front: Color, back: Color): Color => [
      front[0] * front[3] + back[0] * (1 - front[3]),
      front[1] * front[3] + back[1] * (1 - front[3]),
      front[2] * front[3] + back[2] * (1 - front[3]),
      1,
    ]
    const luminance = (color: Color) => {
      const [r, g, b] = color.slice(0, 3).map((value) => {
        const srgb = value / 255
        return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4
      })
      return r * 0.2126 + g * 0.7152 + b * 0.0722
    }
    const contrast = (first: Color, second: Color) => {
      const a = luminance(first),
        b = luminance(second)
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
    }
    const stage = getComputedStyle(document.querySelector('.pillar-stage')!)
    const colors = (stage.backgroundImage.match(/rgba?\([^)]+\)/g) ?? []).map(parse)
    const backgrounds = colors.filter((color) => color[3] === 1)
    const translucent = colors.filter((color) => color[3] < 1)
    if (!backgrounds.length)
      backgrounds.push(
        parse(getComputedStyle(document.querySelector('.time-pillar')!).backgroundColor),
      )
    // Test the actual CSS text colors against all gradient endpoint combinations,
    // including the translucent glow and event-row surface, rather than a mock color palette.
    const surfaces = backgrounds.flatMap((background) => [
      background,
      ...translucent.map((color) => over(color, background)),
    ])
    return [
      ...document.querySelectorAll(
        '.pillar-card time, .pillar-card strong, .pillar-controls button, .pillar-now',
      ),
    ]
      .filter((text) => text.getBoundingClientRect().width > 0)
      .map((text) => {
        const card = text.closest('.pillar-card') ?? text
        const foreground = parse(getComputedStyle(text).color)
        const surface = parse(getComputedStyle(card).backgroundColor)
        return {
          event: card.getAttribute('data-event-id'),
          kind: text.tagName,
          contrast: Math.min(
            ...surfaces.map((background) => contrast(foreground, over(surface, background))),
          ),
        }
      })
  })
  expect(results.length).toBeGreaterThan(0)
  expect(results.filter((result) => result.contrast < 4.5)).toEqual([])
}

for (const [width, height] of [
  [1440, 900],
  [390, 844],
  [568, 320],
]) {
  test(`seven themes preserve dense reading and state at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    await ready(page, true)
    await expect(page.locator('.time-pillar')).toHaveAttribute('data-theme', 'column')
    const state = await readingState(page)
    expect(state.selected).toBe('world-printing')
    const cardIds = await page
      .locator('.pillar-card')
      .evaluateAll((cards) => cards.map((card) => card.getAttribute('data-event-id')))
    for (const [id, name] of themes) {
      await openSettings(page)
      await choose(page, name)
      await expect(page.locator('.time-pillar')).toHaveAttribute('data-theme', id)
      if (id === 'column')
        await page.screenshot({ path: info.outputPath(`themes-settings-${width}x${height}.png`) })
      await closeSettings(page)
      expect(await readingState(page)).toEqual(state)
      expect(
        await page
          .locator('.pillar-card')
          .evaluateAll((cards) => cards.map((card) => card.getAttribute('data-event-id'))),
      ).toEqual(cardIds)
      await compactGeometry(page)
      await expect(page.locator('.pillar-connector')).toHaveCount(1)
      await expect(page.locator('.pillar-connector')).toHaveAttribute(
        'data-event-id',
        state.selected!,
      )
      if (['minimal', 'editorial', 'observatory'].includes(id)) await nightTextContrast(page)
      if (id === 'column') {
        const scene = (await page.locator('.pillar-scenery').boundingBox())!
        const chronology = (await page.locator('.pillar-events').boundingBox())!
        expect(scene.y + scene.height).toBeCloseTo(chronology.y + chronology.height, 0)
        const stage = (await page.locator('.pillar-stage').boundingBox())!
        expect(chronology.y + chronology.height).toBeCloseTo(stage.y + stage.height, 0)
        const settings = (await page.locator('.pillar-settings').boundingBox())!
        if (await page.locator('.pillar-zoom').isVisible()) {
          const zoom = (await page.locator('.pillar-zoom').boundingBox())!
          expect(settings.y).toBeGreaterThanOrEqual(zoom.y + zoom.height - 0.5)
        }
      }
      if (['line', 'minimal', 'editorial', 'observatory'].includes(id))
        await expect(page.locator('.pillar-scenery')).not.toBeVisible()
      else await expect(page.locator('.pillar-scenery')).toBeVisible()

      await page.screenshot({ path: info.outputPath(`${id}-light-${width}x${height}.png`) })
      await page.getByRole('button', { name: '切换到夜间模式', exact: true }).click()
      await expect(page.locator('html')).toHaveAttribute('data-color-mode', 'dark')
      await compactGeometry(page)
      await nightTextContrast(page)
      if (id === 'column') {
        await openSettings(page)
        await page.screenshot({ path: info.outputPath(`settings-dark-${width}x${height}.png`) })
        await closeSettings(page)
      }
      expect(await readingState(page)).toEqual(state)
      await page.screenshot({ path: info.outputPath(`${id}-dark-${width}x${height}.png`) })
      await page.getByRole('button', { name: '切换到白天模式', exact: true }).click()
      await expect(page.locator('html')).toHaveAttribute('data-color-mode', 'light')
    }
  })
}

test('appearance survives map navigation and reload, and radios support keyboard selection', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await ready(page, true)
  const state = await readingState(page)
  await openSettings(page)
  await choose(page, '观测站')
  await closeSettings(page)
  await page
    .getByRole('group', { name: '探索模式', exact: true })
    .getByRole('button', { name: '地图', exact: true })
    .click()
  await expect(page.locator('.map-canvas')).toBeVisible()
  await page
    .getByRole('group', { name: '探索模式', exact: true })
    .getByRole('button', { name: '时空柱', exact: true })
    .click()
  await expect(page.locator('.time-pillar')).toHaveAttribute('data-theme', 'observatory')
  await expect(page.locator('.pillar-card.selected')).toBeVisible()
  expect(await readingState(page)).toEqual(state)
  await page.reload()
  await expect(page.locator('.time-pillar')).toHaveAttribute('data-theme', 'observatory')
  await expect(page.locator('.pillar-card.selected')).toBeVisible()
  expect(await readingState(page)).toEqual(state)
  await openSettings(page)
  await choose(page, '经纬织带')
  await page.getByRole('radio', { name: '经纬织带', exact: true }).focus()
  await page.keyboard.press('ArrowLeft')
  await expect(page.getByRole('radio', { name: '山河长卷', exact: true })).toBeChecked()
  await page.keyboard.press('ArrowLeft')
  await expect(page.getByRole('radio', { name: '素笺编年', exact: true })).toBeChecked()
  await expect(page.locator('.time-pillar')).toHaveAttribute('data-theme', 'line')
  await page.keyboard.press('ArrowLeft')
  await expect(page.getByRole('radio', { name: '琉璃时柱', exact: true })).toBeChecked()
  await expect(page.locator('.time-pillar')).toHaveAttribute('data-theme', 'column')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: '时空柱筛选与设置', exact: true })).toBeFocused()
})

test('single-side browsing keeps every selected theme in both color modes', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await ready(page)
  for (const [id, name] of themes) {
    await openSettings(page)
    await choose(page, name)
    await closeSettings(page)
    for (const side of ['world', 'china'] as const) {
      await openSettings(page)
      await pillarSideButton(page, side).click()
      await closeSettings(page)
      for (const mode of ['light', 'dark']) {
        if (mode === 'dark')
          await page.getByRole('button', { name: '切换到夜间模式', exact: true }).click()
        const surfaces = await page.evaluate(() => {
          const canvas = document.querySelector('.time-pillar')!
          const probe = document.createElement('span')
          probe.style.backgroundImage =
            getComputedStyle(canvas).getPropertyValue('--pillar-stage-bg')
          canvas.append(probe)
          const expected = getComputedStyle(probe).backgroundImage
          probe.remove()
          return {
            actual: getComputedStyle(document.querySelector('.pillar-stage')!).backgroundImage,
            expected,
          }
        })
        expect(surfaces.actual).toBe(surfaces.expected)
        await compactGeometry(page)
        if (mode === 'dark') {
          await nightTextContrast(page)
          await page.screenshot({ path: info.outputPath(`${id}-${side}-dark.png`) })
          await page.getByRole('button', { name: '切换到白天模式', exact: true }).click()
        }
      }
    }
  }
})

test('invalid saved themes recover and can be replaced with a valid selection', async ({
  page,
}) => {
  await page.addInitScript((key) => localStorage.setItem(key, '{"theme":"obsolete"}'), storageKey)
  await ready(page)
  await expect(page.locator('.time-pillar')).toHaveAttribute('data-theme', 'column')
  await openSettings(page)
  await choose(page, '素笺编年')
  await closeSettings(page)
  await expect(page.locator('.time-pillar')).toHaveAttribute('data-theme', 'line')
  expect(await page.evaluate((key) => localStorage.getItem(key), storageKey)).toBe('line')
})

test('unavailable browser storage does not block the default or appearance controls', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() {
        throw new DOMException('Storage denied for this document', 'SecurityError')
      },
    })
  })
  await ready(page)
  await expect(page.locator('.time-pillar')).toHaveAttribute('data-theme', 'column')
  await openSettings(page)
  await choose(page, '经纬织带')
  await closeSettings(page)
  await expect(page.locator('.time-pillar')).toHaveAttribute('data-theme', 'ribbon')
  await compactGeometry(page)
  await page.getByRole('button', { name: '放大时间', exact: true }).click()
  await expect(page.locator('.pillar-stage')).toHaveAttribute('data-span', '540')
  expect(errors).toEqual([])
})

test('theme preferences follow changes from another open tab without changing chronology', async ({
  page,
  context,
}) => {
  await ready(page)
  const state = await readingState(page)
  const another = await context.newPage()
  try {
    await ready(another)
    await openSettings(another)
    await choose(another, '经纬织带')
    await expect(page.locator('.time-pillar')).toHaveAttribute('data-theme', 'ribbon')
    expect(await readingState(page)).toEqual(state)
    await another.evaluate((key) => localStorage.removeItem(key), storageKey)
    await expect(page.locator('.time-pillar')).toHaveAttribute('data-theme', 'column')
    expect(await readingState(page)).toEqual(state)
  } finally {
    await another.close()
  }
})

test('connectors stay hidden until selection and only follow the active reading event', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await ready(page)
  const connectors = page.locator('.pillar-connector')
  await expect(connectors).toHaveCount(0)
  const first = page
    .locator('.pillar-card')
    .filter({ has: page.locator('button:not([tabindex="-1"])') })
    .first()
  await first.hover()
  await expect(connectors).toHaveCount(0)
  await first.locator('button').focus()
  await expect(connectors).toHaveCount(0)
  await first.locator('button').click()
  await expect(connectors).toHaveCount(1)
  await expect(connectors).toHaveAttribute(
    'data-event-id',
    (await first.getAttribute('data-event-id'))!,
  )
  await expect(connectors.locator('circle')).toHaveCount(1)
  const next = page
    .locator('.pillar-card:not(.selected)')
    .filter({ has: page.locator('button:not([tabindex="-1"])') })
    .first()
  const id = (await next.getAttribute('data-event-id'))!
  await next.locator('button').click()
  await expect(connectors).toHaveCount(1)
  await expect(connectors).toHaveAttribute('data-event-id', id)
})

test('automatic dwell owns the only connector and hides it throughout travel', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  const pauseClock = await installPillarClock(page)
  await ready(page, true)
  await expect(page.locator('.pillar-connector')).toHaveAttribute('data-event-id', 'world-printing')
  await pauseClock()
  await openSettings(page)
  await expandPillarOptions(page, '自动浏览与停留')
  await page.getByRole('button', { name: '开始自动浏览', exact: true }).click()
  const stage = page.locator('.pillar-stage')
  const connectors = page.locator('.pillar-connector')
  async function expectDwell() {
    await expect(stage).toHaveAttribute('data-browse-phase', 'reading')
    const current = page
      .locator('.pillar-card')
      .filter({ has: page.locator('[aria-current="step"]') })
    await expect(current).toBeVisible()
    await expect(connectors).toHaveCount(1)
    await expect(connectors).toHaveAttribute(
      'data-event-id',
      (await current.getAttribute('data-event-id'))!,
    )
    await expect(page.locator('.pillar-card.selected')).toHaveCount(1)
  }
  await expectDwell()
  await expect(connectors).not.toHaveAttribute('data-event-id', 'world-printing')
  await page.clock.runFor(6000)
  await expect(stage).toHaveAttribute('data-browse-phase', 'moving')
  await expect(connectors).toHaveCount(0)
  await page.clock.runFor(500)
  await expect(stage).toHaveAttribute('data-browse-phase', 'moving')
  await expect(connectors).toHaveCount(0)
  await page.clock.runFor(900)
  await expectDwell()
  const active = page.locator('.pillar-event[aria-current="step"]')
  await active.click()
  await expect(stage).toHaveAttribute('data-browse-phase', 'stopped')
  await expect(connectors).toHaveCount(1)
  await expect(connectors).toHaveAttribute(
    'data-event-id',
    (await page.locator('.pillar-card.selected').getAttribute('data-event-id'))!,
  )
})
