import { writeFile } from 'node:fs/promises'
import { expect, test, type Page, type TestInfo } from '@playwright/test'
import { setSheet } from './mobile-sheet-helpers'

type CardSample = {
  id: string
  identity: number
  title: string
  y: number
  height: number
  opacity: number
  entering: boolean
}
type PanSample = {
  year: number
  span: number
  height: number
  top: number
  plotHeight: number
  dragging: boolean
  moving: boolean
  cards: CardSample[]
}
type PanWindow = Window & {
  __panSamples: PanSample[]
  __panSnapshot: () => PanSample
  __stopPanSamples: () => void
}

test.use({ hasTouch: true })

async function retainFrames(page: Page, info: TestInfo, name = 'pan-frames') {
  const frames = await page.evaluate(() => (window as PanWindow).__panSamples ?? []).catch(() => [])
  if (frames.length) {
    const path = info.outputPath(`${name}.json`)
    await writeFile(path, JSON.stringify(frames))
    await info.attach(name, { path, contentType: 'application/json' })
  }
}

test.afterEach(async ({ page }, info) => {
  await retainFrames(page, info)
})

function watchErrors(page: Page) {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  return errors
}

async function ready(page: Page, year = 1000, span = 900, extra = '') {
  await page.goto(`/#visual=pillar&year=${year}&span=${span}${extra}`)
  await expect(page.locator('.pillar-card').first()).toBeVisible()
  if (page.viewportSize()!.width <= 700) await setSheet(page, 'map')
  await expect(page.locator('.pillar-stage')).toHaveAttribute('data-motion', 'false')
  // Finish the deliberate initial entrance before observing direct manipulation.
  await expect
    .poll(() =>
      page
        .locator('.pillar-stage')
        .evaluate(
          (stage) =>
            stage
              .getAnimations({ subtree: true })
              .filter((animation) => animation.playState === 'running').length,
        ),
    )
    .toBe(0)
}

async function recordPan(page: Page) {
  return page.evaluate(() => {
    const state = window as PanWindow
    state.__stopPanSamples?.()
    state.__panSamples = []
    const identities = new WeakMap<Element, number>()
    let nextIdentity = 0
    let frame = 0
    let active = true
    state.__panSnapshot = () => {
      const stage = document.querySelector<HTMLElement>('.pillar-stage')!
      const pillar = stage.closest<HTMLElement>('.time-pillar')!
      const bounds = stage.getBoundingClientRect()
      const style = getComputedStyle(pillar)
      const top = parseFloat(style.getPropertyValue('--pillar-top'))
      const bottom = parseFloat(style.getPropertyValue('--pillar-bottom'))
      const appearance = new Map<Element, { opacity: number; entering: boolean }>()
      const visualState = (element: Element): { opacity: number; entering: boolean } => {
        const existing = appearance.get(element)
        if (existing) return existing
        const parent =
          element === stage || !element.parentElement
            ? { opacity: 1, entering: false }
            : visualState(element.parentElement)
        const value = {
          opacity: Number(getComputedStyle(element).opacity) * parent.opacity,
          entering:
            parent.entering ||
            element
              .getAnimations()
              .some(
                (animation) =>
                  animation instanceof CSSAnimation &&
                  animation.animationName === 'pillar-event-in' &&
                  animation.playState === 'running',
              ),
        }
        appearance.set(element, value)
        return value
      }
      return {
        year: Number(stage.dataset.year),
        span: Number(stage.dataset.span),
        height: bounds.height,
        top,
        plotHeight: bounds.height - top - bottom,
        dragging: pillar.dataset.dragging === 'true',
        moving: stage.dataset.motion === 'true',
        cards: [...stage.querySelectorAll<HTMLElement>('.pillar-card')].map((card) => {
          if (!identities.has(card)) identities.set(card, ++nextIdentity)
          const box = card.getBoundingClientRect()
          const visual = visualState(card)
          return {
            id: card.dataset.eventId!,
            identity: identities.get(card)!,
            title: card.querySelector('strong')!.textContent!,
            y: box.y - bounds.y,
            height: box.height,
            opacity: visual.opacity,
            entering: visual.entering,
          }
        }),
      }
    }
    function sample() {
      if (!active) return
      state.__panSamples.push(state.__panSnapshot())
      frame = requestAnimationFrame(sample)
    }
    state.__stopPanSamples = () => {
      active = false
      cancelAnimationFrame(frame)
    }
    frame = requestAnimationFrame(sample)
    return state.__panSnapshot()
  })
}

async function snapshot(page: Page) {
  return page.evaluate(async () => {
    // Preview state is scheduled in rAF; observe a painted, committed frame.
    await new Promise(requestAnimationFrame)
    await new Promise(requestAnimationFrame)
    return (window as PanWindow).__panSnapshot()
  })
}

const ordinal = (year: number) => (year > 0 ? year - 1 : year)
const protectedCards = (sample: PanSample, margin = 100) =>
  sample.cards.filter(
    (card) => card.y > sample.top + margin && card.y + card.height < sample.height - margin,
  )

function expectRigidPan(initial: PanSample, current: PanSample, cards: CardSample[]) {
  const displacement =
    ((ordinal(current.year) - ordinal(initial.year)) / initial.span) * initial.plotHeight
  for (const original of cards) {
    const actual = current.cards.find((card) => card.id === original.id)
    expect(actual, `in-view event ${original.id} remains available during a pan`).toBeDefined()
    expect(actual!.identity, `${original.id} keeps the same DOM node`).toBe(original.identity)
    expect(actual!.title).toBe(original.title)
    expect(
      Math.abs(actual!.y - original.y - displacement),
      `${original.id} moves with the timeline instead of independently repacking`,
    ).toBeLessThan(2)
  }
}

async function expectNoFlash(page: Page) {
  const frames = await page.evaluate(() => (window as PanWindow).__panSamples)
  expect(frames.length).toBeGreaterThan(5)
  expect(frames.every((frame) => Number.isInteger(frame.year) && frame.year !== 0)).toBe(true)
  expect(frames.some((frame) => frame.cards.some((card) => card.entering))).toBe(false)
  expect(frames.some((frame) => frame.cards.some((card) => card.opacity < 0.99))).toBe(false)
  expect(frames.some((frame) => frame.moving)).toBe(false)
}

for (const [width, height] of [
  [1440, 900],
  [390, 844],
]) {
  test(`pan keeps event identities and spacing through release at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    const errors = watchErrors(page)
    await ready(page)
    const initial = await recordPan(page)
    const probes = protectedCards(initial)
    expect(probes.length).toBeGreaterThanOrEqual(4)
    const bounds = (await page.locator('.pillar-stage').boundingBox())!
    const x = bounds.x + bounds.width / 2,
      y = bounds.y + bounds.height * 0.35
    await page.mouse.move(x, y)
    await page.mouse.down()
    for (let step = 1; step <= 8; step++) {
      await page.mouse.move(x, y + step * 8)
      expectRigidPan(initial, await snapshot(page), probes)
    }
    const last = await snapshot(page)
    expect(last.year).toBeGreaterThan(initial.year)
    const releaseProbes = protectedCards(last, 30)
    await page.screenshot({ path: info.outputPath(`pan-dragging-${width}.png`) })
    await page.mouse.up()
    await expect(page.locator('.time-pillar')).toHaveAttribute('data-dragging', 'false')
    await page.waitForTimeout(420)
    const settled = await snapshot(page)
    expect(settled.year).toBe(last.year)
    expectRigidPan(last, settled, releaseProbes)
    await expectNoFlash(page)
    await page.screenshot({ path: info.outputPath(`pan-released-${width}.png`) })
    await retainFrames(page, info, 'pan-frames-before-reload')
    await expect(page).toHaveURL(new RegExp(`year=${last.year}(?:&|$)`))
    await page.reload()
    await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', String(last.year))
    expect(errors).toEqual([])
  })
}

test('wheel bursts translate the same event rows without entrance flashes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const errors = watchErrors(page)
  await ready(page)
  const initial = await recordPan(page)
  const probes = protectedCards(initial)
  const bounds = (await page.locator('.pillar-stage').boundingBox())!
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height * 0.4)
  for (let burst = 0; burst < 2; burst++) {
    for (let step = 0; step < 8; step++) {
      await page.mouse.wheel(0, 6)
      expectRigidPan(initial, await snapshot(page), probes)
    }
    // Cross the debounce boundary, then continue from the retained scene.
    await page.waitForTimeout(180)
    expectRigidPan(initial, await snapshot(page), probes)
  }
  await page.waitForTimeout(420)
  const final = await snapshot(page)
  expect(final.year).toBeLessThan(initial.year)
  expectRigidPan(initial, final, probes)
  await expectNoFlash(page)
  expect(errors).toEqual([])
})

test('minimum-span drags follow subyear pointer movement and retain it on release', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const errors = watchErrors(page)
  await ready(page, -221, 4)
  const initial = await recordPan(page)
  const original = initial.cards.find((card) => card.id === 'qin-unifies')!
  expect(original).toBeDefined()
  const bounds = (await page.locator('.pillar-stage').boundingBox())!
  const x = bounds.x + bounds.width / 2,
    y = bounds.y + bounds.height * 0.35
  await page.mouse.move(x, y)
  await page.mouse.down()
  for (let step = 1; step <= 6; step++) {
    await page.mouse.move(x, y + step * 9)
    const current = await snapshot(page)
    const actual = current.cards.find((card) => card.id === original.id)!
    expect(actual.identity).toBe(original.identity)
    expect(actual.title).toBe(original.title)
    expect(Math.abs(actual.y - original.y - step * 9)).toBeLessThan(1)
    expect(current.year).toBe(-221)
  }
  const final = await snapshot(page)
  await page.mouse.up()
  await page.waitForTimeout(420)
  const settled = await snapshot(page)
  expect(
    Math.abs(
      settled.cards.find((card) => card.id === original.id)!.y -
        final.cards.find((card) => card.id === original.id)!.y,
    ),
  ).toBeLessThan(1)
  await expect(page.locator('.pillar-tick').filter({ hasText: /^公元前221年$/ })).toHaveCount(0)
  await expectNoFlash(page)
  await page.screenshot({ path: info.outputPath('subyear-pan-retained.png') })
  expect(errors).toEqual([])
})

test('explicit navigation to the rounded year clears a retained subyear pan', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const errors = watchErrors(page)
  await ready(page, -221, 4)
  const initial = await recordPan(page)
  const original = initial.cards.find((card) => card.id === 'qin-unifies')!
  expect(original).toBeDefined()
  const stage = page.locator('.pillar-stage')
  const bounds = (await stage.boundingBox())!
  const x = bounds.x + bounds.width / 2,
    y = bounds.y + bounds.height * 0.35
  await page.mouse.move(x, y)
  await page.mouse.down()
  await page.mouse.move(x, y + 54, { steps: 6 })
  await page.mouse.up()
  await expect(page.locator('.time-pillar')).toHaveAttribute('data-dragging', 'false')
  const panned = await snapshot(page)
  expect(panned.year).toBe(-221)
  expect(
    Math.abs(panned.cards.find((card) => card.id === original.id)!.y - original.y - 54),
  ).toBeLessThan(1)

  await page.getByRole('button', { name: '时空柱筛选与设置', exact: true }).click()
  await page.getByLabel('直接前往年份', { exact: true }).fill('-221')
  await page.getByRole('button', { name: '前往', exact: true }).click()
  await expect(page.locator('.pillar-dialog')).not.toBeVisible()
  const card = page.locator('.pillar-card[data-event-id="qin-unifies"]')
  await expect
    .poll(async () => Math.abs((await card.boundingBox())!.y - bounds.y - original.y))
    .toBeLessThan(1)
  await expect(stage).toHaveAttribute('data-year', '-221')
  await expect(stage).toHaveAttribute('data-motion', 'false')
  await page.waitForTimeout(420)
  expect(Math.abs((await card.boundingBox())!.y - bounds.y - original.y)).toBeLessThan(1)
  await expect(page).toHaveURL(/year=-221(?:&|$)/)
  await page.screenshot({ path: info.outputPath('explicit-year-clears-subyear-pan.png') })
  expect(errors).toEqual([])
})

test('continuing events stay available after their start card leaves the viewport', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const errors = watchErrors(page)
  await ready(page, -1980, 4, '&side=world&region=europe')
  await expect(page.locator('.pillar-card[data-event-id="world-minoan"]')).toHaveCount(1)
  const stage = page.locator('.pillar-stage')
  const bounds = (await stage.boundingBox())!
  const x = bounds.x + bounds.width / 2,
    y = bounds.y + bounds.height * 0.35
  await recordPan(page)
  await page.mouse.move(x, y)
  await page.mouse.down()
  await page.mouse.move(x, y + 64, { steps: 8 })
  await page.mouse.up()
  await expect(page.locator('.time-pillar')).toHaveAttribute('data-dragging', 'false')
  await expect(page.locator('.pillar-card')).toHaveCount(0)
  const continuing = page.locator('.pillar-continuing')
  await expect(continuing).toBeVisible()
  await expect(page.getByText('当前范围与筛选下没有已收录的事件。', { exact: true })).toHaveCount(0)
  const allEvents = page.locator('.pillar-cluster')
  const count = Number((await allEvents.getAttribute('aria-label'))!.match(/全部(\d+)个事件/)![1])
  expect(count).toBeGreaterThan(0)
  await expect(continuing.getByRole('button')).toHaveText(`查看这段时间的 ${count} 个事件`)
  await page.screenshot({ path: info.outputPath('continuing-events-outside-start.png') })
  await continuing.getByRole('button').click()
  await expect(
    page.getByRole('heading', { name: `这段历史 · ${count} 件事件`, exact: true }),
  ).toBeVisible()
  await expect(page.locator('.pillar-cluster-list > button')).toHaveCount(count)
  await expect(page.locator('.pillar-cluster-list strong')).toContainText(['克里特宫殿文明'])
  await page.getByRole('button', { name: '关闭时空柱面板', exact: true }).click()
  await allEvents.click()
  await expect(page.locator('.pillar-cluster-list > button')).toHaveCount(count)
  expect(errors).toEqual([])
})

test('cross-era panning preserves visible cards and never paints year zero', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const errors = watchErrors(page)
  await ready(page, -1)
  const initial = await recordPan(page)
  const probes = protectedCards(initial)
  expect(probes.length).toBeGreaterThan(2)
  const bounds = (await page.locator('.pillar-stage').boundingBox())!
  const x = bounds.x + bounds.width / 2,
    y = bounds.y + bounds.height * 0.35
  await page.mouse.move(x, y)
  await page.mouse.down()
  for (let step = 1; step <= 8; step++) {
    await page.mouse.move(x, y + step * 6)
    expectRigidPan(initial, await snapshot(page), probes)
  }
  await page.mouse.up()
  await page.waitForTimeout(420)
  expect((await snapshot(page)).year).toBeGreaterThan(1)
  await expectNoFlash(page)
  expect(errors).toEqual([])
})

test('long pans replenish the exposed edge without moving retained in-view events', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const errors = watchErrors(page)
  await ready(page, 600, 600)
  const initial = await recordPan(page)
  let previous = initial
  const bounds = (await page.locator('.pillar-stage').boundingBox())!
  const x = bounds.x + bounds.width / 2,
    y = bounds.y + bounds.height * 0.13
  await page.mouse.move(x, y)
  await page.mouse.down()
  for (let step = 1; step <= 26; step++) {
    await page.mouse.move(x, y + step * 17)
    const current = await snapshot(page)
    const probes = protectedCards(previous, 30)
    if (probes.length) expectRigidPan(previous, current, probes)
    const visible = current.cards.filter(
      (card) => card.y + card.height > current.top && card.y < current.height - 12,
    )
    expect(visible.length).toBeGreaterThanOrEqual(8)
    previous = current
  }
  await page.mouse.up()
  await page.waitForTimeout(420)
  const final = await snapshot(page)
  expect(final.year).toBeGreaterThan(initial.year + 300)
  expect(final.cards.some((card) => !initial.cards.some((first) => first.id === card.id))).toBe(
    true,
  )
  expectRigidPan(previous, final, protectedCards(previous, 30))
  await expectNoFlash(page)
  await page.screenshot({ path: info.outputPath('long-pan-replenished.png') })
  expect(errors).toEqual([])
})
