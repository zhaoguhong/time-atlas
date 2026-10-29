import { expect, test, type Page } from '@playwright/test'
import { setSheet } from './mobile-sheet-helpers'
import { installPillarClock } from './pillar-clock-helpers'

async function zoomIn(page: Page) {
  const button = page.getByRole('button', { name: '放大时间', exact: true })
  if (await button.isVisible()) await button.click()
  else await page.locator('.pillar-stage').press('+')
}

type MotionSample = {
  year: number
  span: number
  moving: boolean
  animations: string[]
}
type MotionWindow = Window & {
  __pillarMotionSamples: MotionSample[]
  __stopPillarMotionSamples?: () => void
}

test.use({ hasTouch: true })

function watchErrors(page: Page) {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  return errors
}

// Observe the real canvas on painted frames, including CSS entrance animations.
// An immediately assigned final value cannot satisfy the intermediate-frame checks.
async function recordMotion(page: Page, onNavigation = false) {
  const record = () => {
    const state = window as MotionWindow
    state.__stopPillarMotionSamples?.()
    state.__pillarMotionSamples = []
    let active = true
    let frame = 0
    function sample() {
      if (!active) return
      const stage = document.querySelector('.pillar-stage')
      if (stage) {
        state.__pillarMotionSamples.push({
          year: Number(stage.getAttribute('data-year')),
          span: Number(stage.getAttribute('data-span')),
          moving: stage.getAttribute('data-motion') === 'true',
          animations: stage
            .getAnimations({ subtree: true })
            .filter(
              (animation) =>
                animation instanceof CSSAnimation &&
                animation.playState === 'running' &&
                Number(animation.effect?.getComputedTiming().duration) > 1,
            )
            .map((animation) => (animation as CSSAnimation).animationName),
        })
      }
      frame = requestAnimationFrame(sample)
    }
    state.__stopPillarMotionSamples = () => {
      active = false
      cancelAnimationFrame(frame)
    }
    frame = requestAnimationFrame(sample)
  }
  if (onNavigation) await page.addInitScript(record)
  else await page.evaluate(record)
}

async function samples(page: Page) {
  return page.evaluate(() => (window as MotionWindow).__pillarMotionSamples ?? [])
}

async function ready(page: Page, year = 1500) {
  await page.goto(`/#visual=pillar&year=${year}&span=900`)
  await expect(page.locator('.pillar-card').first()).toBeVisible()
  if (page.viewportSize()!.width <= 700) await setSheet(page, 'map')
  await expect(page.locator('.pillar-stage')).toHaveAttribute('data-motion', 'false')
}

for (const [width, height] of [
  [1440, 900],
  [390, 844],
]) {
  test(`entrance, animated zoom and compact tools at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    const errors = watchErrors(page)
    await recordMotion(page, true)
    await ready(page)
    await expect
      .poll(async () => (await samples(page)).some((sample) => sample.animations.length > 0))
      .toBe(true)
    await page.screenshot({ path: info.outputPath(`entrance-${width}.png`), animations: 'allow' })

    const settings = page.getByRole('button', { name: '时空柱筛选与设置', exact: true })
    await expect(settings).toHaveText('')
    await expect(settings.locator('svg')).toBeVisible()
    const settingsBox = (await settings.boundingBox())!
    const stageBox = (await page.locator('.pillar-stage').boundingBox())!
    expect(settingsBox.width).toBeGreaterThanOrEqual(44)
    expect(settingsBox.height).toBeGreaterThanOrEqual(44)
    expect(settingsBox.x).toBeGreaterThan(stageBox.x + stageBox.width / 2)
    expect(settingsBox.y).toBeGreaterThan(stageBox.y + stageBox.height - 80)
    await expect(page.getByRole('button', { name: '查看历史全貌', exact: true })).toHaveCount(0)
    const zoom = page.locator('.pillar-zoom')
    if (width > 700) await expect(page.locator('.pillar-controls .pillar-zoom')).toBeVisible()
    else await expect(page.locator('.pillar-controls .pillar-zoom')).toBeHidden()
    await expect(page.locator('.pillar-footer, .pillar-zoom-dock')).toHaveCount(0)
    const dock = (await page.locator('.pillar-controls').boundingBox())!
    if (await zoom.isVisible()) {
      const zoomBox = (await zoom.boundingBox())!
      expect(zoomBox.x).toBeGreaterThanOrEqual(dock.x)
      expect(zoomBox.y).toBeGreaterThanOrEqual(dock.y)
      expect(zoomBox.y + zoomBox.height).toBeLessThanOrEqual(dock.y + dock.height)
    }
    const pillarBox = (await page.locator('.time-pillar').boundingBox())!
    expect(Math.abs(stageBox.y + stageBox.height - pillarBox.y - pillarBox.height)).toBeLessThan(
      0.5,
    )
    for (const name of width > 700 ? ['放大时间', '缩小时间'] : []) {
      const control = page.getByRole('button', { name, exact: true })
      await expect(control).toBeInViewport({ ratio: 1 })
      const bounds = (await control.boundingBox())!
      expect(bounds.width).toBeGreaterThanOrEqual(44)
      expect(bounds.height).toBeGreaterThanOrEqual(44)
    }

    await recordMotion(page)
    await zoomIn(page)
    await expect(page.locator('.pillar-stage')).toHaveAttribute('data-motion', 'true')
    await page.screenshot({
      path: info.outputPath(`zoom-in-progress-${width}.png`),
      animations: 'allow',
    })
    await expect(page.locator('.pillar-stage')).toHaveAttribute('data-span', '540')
    await expect(page.locator('.pillar-stage')).toHaveAttribute('data-motion', 'false')
    const frames = await samples(page)
    const intermediate = frames.filter((sample) => sample.span > 540 && sample.span < 900)
    expect(new Set(intermediate.map((sample) => sample.span)).size).toBeGreaterThanOrEqual(3)
    expect(intermediate.some((sample) => sample.moving)).toBe(true)
    expect(frames.every((sample) => Number.isInteger(sample.year) && sample.year !== 0)).toBe(true)
    await expect(page).toHaveURL(/span=540(?:&|$)/)
    await page.reload()
    await expect(page.locator('.pillar-stage')).toHaveAttribute('data-span', '540')
    await expect(page.locator('.pillar-stage')).toHaveAttribute('data-motion', 'false')
    await page.screenshot({ path: info.outputPath(`settled-${width}.png`) })

    await settings.click()
    const overview = page.getByRole('button', { name: '查看历史全貌', exact: true })
    await expect(overview).toBeVisible()
    await expect(overview).not.toHaveText('')
    await page.screenshot({ path: info.outputPath(`settings-overview-${width}.png`) })
    await overview.click()
    // The reading chronology reaches 2000; 1912 is only the map's boundary.
    await expect(page.locator('.pillar-stage')).toHaveAttribute('data-span', '11999')
    await expect(page.locator('.pillar-stage')).toHaveAttribute('data-motion', 'false')
    expect(errors).toEqual([])
  })
}

test('rapid zoom requests preserve every requested scale and cancel superseded motion', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const errors = watchErrors(page)
  await ready(page)
  await recordMotion(page)
  for (let i = 0; i < 3; i++) await zoomIn(page)
  const stage = page.locator('.pillar-stage')
  await expect(stage).toHaveAttribute('data-span', '194')
  await expect(stage).toHaveAttribute('data-motion', 'false')
  await expect(page).toHaveURL(/span=194\.4(?:&|$)/)
  const frames = await samples(page)
  expect(frames.some((sample) => sample.moving)).toBe(true)
  expect(frames.every((sample) => sample.span >= 194 && sample.span <= 900)).toBe(true)
  await page.reload()
  await expect(stage).toHaveAttribute('data-span', '194')
  await expect(stage).toHaveAttribute('data-motion', 'false')
  expect(errors).toEqual([])
})

test('drag interrupts zoom and commits the visible view without a delayed snap or year zero', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const errors = watchErrors(page)
  const pauseClock = await installPillarClock(page)
  await ready(page, -1)
  await pauseClock()
  await recordMotion(page)
  const stage = page.locator('.pillar-stage')
  await stage.press('+')
  await expect(stage).toHaveAttribute('data-motion', 'true')
  // Hold an actual intermediate view through runner/protocol delays and pointer
  // actionability checks, rather than racing the 320 ms real-time tween.
  await page.clock.runFor(128)
  const interruptedSpan = Number(await stage.getAttribute('data-span'))
  expect(interruptedSpan).toBeGreaterThan(540)
  expect(interruptedSpan).toBeLessThan(900)
  const bounds = (await stage.boundingBox())!
  const x = bounds.x + bounds.width / 2
  const y = bounds.y + bounds.height * 0.45
  await page.mouse.move(x, y)
  await page.mouse.down()
  await page.mouse.move(x, y + 70, { steps: 6 })
  await expect(stage).toHaveAttribute('data-motion', 'false')
  await page.mouse.up()
  await expect(page.locator('.time-pillar')).toHaveAttribute('data-dragging', 'false')
  const year = Number(await stage.getAttribute('data-year'))
  const span = Number(await stage.getAttribute('data-span'))
  expect(Number.isInteger(year)).toBe(true)
  expect(year).not.toBe(0)
  expect(year).toBeGreaterThan(-1)
  expect(span).toBeGreaterThanOrEqual(540)
  expect(span).toBeLessThanOrEqual(900)
  expect(span).toBe(interruptedSpan)
  await expect
    .poll(() =>
      page.evaluate(() => Number(new URLSearchParams(location.hash.slice(1)).get('year'))),
    )
    .toBe(year)
  // Watch more than the complete tween duration: a cancelled animation must never snap back.
  await page.clock.runFor(420)
  await expect(stage).toHaveAttribute('data-year', String(year))
  await expect(stage).toHaveAttribute('data-span', String(span))
  expect(
    (await samples(page)).every((sample) => Number.isInteger(sample.year) && sample.year !== 0),
  ).toBe(true)
  await page.screenshot({ path: info.outputPath('drag-interrupts-zoom.png') })
  await page.clock.resume()
  await page.reload()
  await expect(stage).toHaveAttribute('data-year', String(year))
  await expect(stage).toHaveAttribute('data-span', String(Math.round(span)))
  expect(errors).toEqual([])
})

test('pointer movement released before its preview frame commits without a second animation', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const errors = watchErrors(page)
  const pauseClock = await installPillarClock(page)
  await ready(page, -1)
  await pauseClock()
  const stage = page.locator('.pillar-stage')
  await zoomIn(page)
  await expect(stage).toHaveAttribute('data-motion', 'true')
  await page.clock.runFor(128)
  const interruptedSpan = Number(await stage.getAttribute('data-span'))
  expect(interruptedSpan).toBeGreaterThan(540)
  expect(interruptedSpan).toBeLessThan(900)
  const bounds = (await stage.boundingBox())!
  const x = bounds.x + bounds.width / 2,
    y = bounds.y + bounds.height * 0.45
  await stage.evaluate((element) => {
    element.addEventListener(
      'pointerdown',
      (event) =>
        element.setAttribute('data-test-pointer', String((event as PointerEvent).pointerId)),
      { once: true },
    )
  })
  await page.mouse.move(x, y)
  await page.mouse.down()
  await recordMotion(page)
  // Keep an actual active pointer so setPointerCapture is exercised. Deliver its
  // final movement and release in one browser task, before a preview rAF can run.
  await stage.evaluate(
    (element, { x, y }) => {
      ;(window as MotionWindow).__pillarMotionSamples = []
      const pointerId = Number(element.getAttribute('data-test-pointer'))
      for (let step = 1; step <= 6; step++)
        element.dispatchEvent(
          new PointerEvent('pointermove', {
            bubbles: true,
            pointerId,
            pointerType: 'mouse',
            button: 0,
            buttons: 1,
            clientX: x,
            clientY: y + (70 * step) / 6,
          }),
        )
      element.dispatchEvent(
        new PointerEvent('pointerup', {
          bubbles: true,
          pointerId,
          pointerType: 'mouse',
          button: 0,
          clientX: x,
          clientY: y + 70,
        }),
      )
    },
    { x, y },
  )
  await page.mouse.up()
  await expect(page.locator('.time-pillar')).toHaveAttribute('data-dragging', 'false')
  await expect.poll(async () => Number(await stage.getAttribute('data-year'))).toBeGreaterThan(0)
  await expect(stage).toHaveAttribute('data-motion', 'false')
  const year = await stage.getAttribute('data-year'),
    span = await stage.getAttribute('data-span')
  expect(Number(span)).toBe(interruptedSpan)
  await page.clock.runFor(420)
  expect((await samples(page)).some((sample) => sample.moving)).toBe(false)
  await expect(stage).toHaveAttribute('data-year', year!)
  await expect(stage).toHaveAttribute('data-span', span!)
  expect(errors).toEqual([])
})

test('reduced motion keeps navigation immediate and disables entrance animation', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const errors = watchErrors(page)
  await recordMotion(page, true)
  await ready(page)
  const initial = await samples(page)
  expect(initial.flatMap((sample) => sample.animations)).toEqual([])
  await recordMotion(page)
  await zoomIn(page)
  const stage = page.locator('.pillar-stage')
  await expect(stage).toHaveAttribute('data-span', '540')
  await expect(stage).toHaveAttribute('data-motion', 'false')
  await stage.focus()
  await page.keyboard.press('Home')
  await expect(stage).toHaveAttribute('data-year', '-10000')
  await expect(stage).toHaveAttribute('data-motion', 'false')
  const frames = await samples(page)
  expect(frames.some((sample) => sample.moving)).toBe(false)
  expect(frames.some((sample) => sample.span > 540 && sample.span < 900)).toBe(false)
  expect(frames.flatMap((sample) => sample.animations)).toEqual([])
  await page.screenshot({ path: info.outputPath('reduced-motion.png') })
  expect(errors).toEqual([])
})

test('wheel previews follow the gesture directly without a second tween after release', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const errors = watchErrors(page)
  await ready(page)
  await recordMotion(page)
  const stage = page.locator('.pillar-stage')
  const bounds = (await stage.boundingBox())!
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height * 0.4)
  await page.mouse.wheel(0, 80)
  await expect.poll(async () => Number(await stage.getAttribute('data-year'))).not.toBe(1500)
  await expect(stage).toHaveAttribute('data-motion', 'false')
  const year = Number(await stage.getAttribute('data-year'))
  await expect
    .poll(() =>
      page.evaluate(() => Number(new URLSearchParams(location.hash.slice(1)).get('year'))),
    )
    .toBe(year)
  await page.waitForTimeout(420)
  await expect(stage).toHaveAttribute('data-year', String(year))
  expect((await samples(page)).some((sample) => sample.moving)).toBe(false)
  expect(errors).toEqual([])
})

test('keyboard year navigation animates across BCE and CE without introducing year zero', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const errors = watchErrors(page)
  await ready(page, -1)
  await recordMotion(page)
  const stage = page.locator('.pillar-stage')
  await stage.focus()
  await page.keyboard.press('ArrowUp')
  await expect(stage).toHaveAttribute('data-motion', 'true')
  await page.screenshot({ path: info.outputPath('cross-era-motion.png'), animations: 'allow' })
  await expect(stage).toHaveAttribute('data-year', '135')
  await expect(stage).toHaveAttribute('data-motion', 'false')
  const frames = await samples(page)
  expect(frames.some((sample) => sample.year > 0 && sample.year < 135 && sample.moving)).toBe(true)
  expect(frames.every((sample) => sample.year !== 0 && Number.isInteger(sample.year))).toBe(true)
  await expect(page).toHaveURL(/year=135(?:&|$)/)
  await page.reload()
  await expect(stage).toHaveAttribute('data-year', '135')
  await stage.focus()
  await page.keyboard.press('ArrowUp')
  await page.keyboard.press('ArrowUp')
  await page.keyboard.press('ArrowUp')
  await expect(stage).toHaveAttribute('data-year', '540')
  await expect(stage).toHaveAttribute('data-motion', 'false')
  await expect(page).toHaveURL(/year=540(?:&|$)/)
  expect(errors).toEqual([])
})
