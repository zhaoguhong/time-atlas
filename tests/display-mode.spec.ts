import { expect, test, type Locator, type Page } from '@playwright/test'
import { setSheet } from './mobile-sheet-helpers'

test.use({ hasTouch: true })

async function openDisplayMenu(page: Page) {
  const more = page.getByRole('button', { name: '更多操作', exact: true })
  if ((await more.isVisible()) && (await more.getAttribute('aria-expanded')) !== 'true')
    await more.click()
}

async function expectTouchTarget(control: Locator) {
  await control.scrollIntoViewIfNeeded()
  await expect(control).toBeInViewport({ ratio: 1 })
  const box = (await control.boundingBox())!
  expect(box.width).toBeGreaterThanOrEqual(44)
  expect(box.height).toBeGreaterThanOrEqual(44)
}

async function expectNoOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    viewportWidth: innerWidth,
    viewportHeight: innerHeight,
  }))
  expect(dimensions.width).toBeLessThanOrEqual(dimensions.viewportWidth)
  expect(dimensions.height).toBeLessThanOrEqual(dimensions.viewportHeight)
}

for (const [width, height] of [
  [568, 320],
  [844, 390],
]) {
  test(`focus mode recovers header space and remains reversible at ${width}x${height}`, async ({
    page,
  }, info) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.setViewportSize({ width, height })
    await page.goto('/#year=1082&person=sushi')
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    await setSheet(page, 'split')
    const originalMap = (await page.locator('.map-shell').boundingBox())!
    const originalClock = (await page.locator('.timeline').boundingBox())!
    await openDisplayMenu(page)
    const enter = page.getByRole('button', { name: '进入专注模式', exact: true })
    await expectTouchTarget(enter)
    await enter.focus()
    await page.keyboard.press('Enter')
    await expect(page.locator('.atlas-app')).toHaveAttribute('data-focus-mode', 'true')
    await expect(page.locator('.topbar')).toBeHidden()
    const exit = page.getByRole('button', { name: '退出专注模式', exact: true })
    await expectTouchTarget(exit)
    await expect(exit).toBeFocused()
    const focusedMap = (await page.locator('.map-shell').boundingBox())!
    expect(focusedMap.height - originalMap.height).toBeGreaterThanOrEqual(50)
    expect(focusedMap.y).toBeLessThanOrEqual(1)
    expect((await page.locator('.timeline').boundingBox())!.y).toBeCloseTo(originalClock.y, 0)
    await expect(page.locator('.year-title')).toContainText('1082')
    await expect(page.locator('.person-biography')).toContainText('苏轼')
    await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
    await expectNoOverflow(page)
    await page.screenshot({ path: info.outputPath(`focus-${width}x${height}.png`) })

    await page.keyboard.press('Enter')
    await expect(page.locator('.atlas-app')).not.toHaveAttribute('data-focus-mode', 'true')
    await expect(page.locator('.topbar')).toBeVisible()
    await expect(exit).toBeHidden()
    await expect(page.getByRole('button', { name: '更多操作', exact: true })).toBeFocused()
    expect((await page.locator('.map-shell').boundingBox())!.height).toBeCloseTo(
      originalMap.height,
      0,
    )
    await expect(page).toHaveURL(/person=sushi/)
    await expectNoOverflow(page)
    expect(errors).toEqual([])
  })
}

test('preserves a biography paragraph through focus mode and portrait-landscape rotation', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#year=1082&person=sushi')
  await setSheet(page, 'reading')
  const paragraph = page.locator('.person-biography p').nth(2)
  await expect(paragraph).toContainText('年谱')
  await paragraph.evaluate((element) => {
    const panel = element.closest('.panel-scroll')!
    panel.scrollTop += element.getBoundingClientRect().top - panel.getBoundingClientRect().top - 20
  })
  const paragraphOffset = () =>
    paragraph.evaluate(
      (element) =>
        element.getBoundingClientRect().top -
        element.closest('.panel-scroll')!.getBoundingClientRect().top,
    )
  await expect.poll(async () => Math.abs((await paragraphOffset()) - 20)).toBeLessThanOrEqual(4)
  const readingHeight = (await page.locator('.story-panel').boundingBox())!.height
  await openDisplayMenu(page)
  await page.getByRole('button', { name: '进入专注模式', exact: true }).click()
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-focus-mode', 'true')
  expect(
    (await page.locator('.story-panel').boundingBox())!.height - readingHeight,
  ).toBeGreaterThanOrEqual(58)
  for (const viewport of [
    { width: 844, height: 390 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport)
    await expect(page.locator('.atlas-app')).toHaveAttribute('data-focus-mode', 'true')
    await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'reading')
    await expect(page.locator('.map-shell')).toBeHidden()
    await expect(page.locator('.year-title')).toContainText('1082')
    await expect(page).toHaveURL(/person=sushi/)
    await expect.poll(async () => Math.abs((await paragraphOffset()) - 20)).toBeLessThanOrEqual(64)
    await expectTouchTarget(page.getByRole('button', { name: '退出专注模式', exact: true }))
    await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
    await expectNoOverflow(page)
  }
  await page.screenshot({ path: info.outputPath('focus-portrait-reading.png') })
  await page.getByRole('button', { name: '退出专注模式', exact: true }).click()
  await expect(page.locator('.topbar')).toBeVisible()
  await expect.poll(async () => Math.abs((await paragraphOffset()) - 20)).toBeLessThanOrEqual(64)
})

test('enters and exits native fullscreen through the Chrome controls', async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== 'chromium',
    'Native Chromium fullscreen is checked separately from WebKit fallbacks.',
  )
  await page.setViewportSize({ width: 844, height: 390 })
  await page.goto('/#year=1082&person=sushi')
  await openDisplayMenu(page)
  const enter = page.getByRole('button', { name: '全屏浏览', exact: true })
  await expectTouchTarget(enter)
  await enter.click()
  await expect.poll(() => page.evaluate(() => document.fullscreenElement !== null)).toBe(true)
  await openDisplayMenu(page)
  const exit = page.getByRole('button', { name: '退出全屏', exact: true })
  await expectTouchTarget(exit)
  await exit.click()
  await expect.poll(() => page.evaluate(() => document.fullscreenElement === null)).toBe(true)
  await openDisplayMenu(page)
  await expect(page.getByRole('button', { name: '全屏浏览', exact: true })).toBeVisible()
  await expect(page.locator('.year-title')).toContainText('1082')
  await expect(page).toHaveURL(/person=sushi/)
})

for (const failure of ['unsupported', 'rejected'] as const) {
  test(`explains ${failure} fullscreen and offers a working focus alternative`, async ({
    page,
  }, info) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.addInitScript((failure) => {
      Object.defineProperty(document, 'fullscreenEnabled', {
        configurable: true,
        value: failure !== 'unsupported',
      })
      Object.defineProperty(document, 'webkitFullscreenEnabled', {
        configurable: true,
        value: false,
      })
      Object.defineProperty(HTMLElement.prototype, 'webkitRequestFullscreen', {
        configurable: true,
        value: undefined,
      })
      Object.defineProperty(HTMLElement.prototype, 'requestFullscreen', {
        configurable: true,
        value:
          failure === 'unsupported'
            ? undefined
            : async () => {
                throw new DOMException('Test fullscreen request denied', 'NotAllowedError')
              },
      })
    }, failure)
    await page.setViewportSize({ width: 568, height: 320 })
    await page.goto('/#year=1082&person=sushi')
    await openDisplayMenu(page)
    await page.getByRole('button', { name: '全屏浏览', exact: true }).click()
    const explanation = page.getByRole('dialog', { name: '全屏浏览', exact: true })
    await expect(explanation).toBeVisible()
    await expect(explanation).toContainText(
      failure === 'unsupported' ? '暂不能让整个网页进入全屏' : '浏览器未能切换全屏',
    )
    await expect(explanation).toBeInViewport({ ratio: 1 })
    await expect(explanation.getByRole('button', { name: '关闭显示说明' })).toBeFocused()
    expect(await page.evaluate(() => document.fullscreenElement ?? null)).toBeNull()
    await page.keyboard.press('Escape')
    await expect(explanation).toBeHidden()
    await expect(page.getByRole('button', { name: '更多操作', exact: true })).toBeFocused()
    await openDisplayMenu(page)
    await expect(page.getByRole('button', { name: '全屏浏览', exact: true })).toBeEnabled()
    await page.getByRole('button', { name: '全屏浏览', exact: true }).click()
    await expect(explanation).toBeVisible()
    const focus = explanation.getByRole('button', { name: '进入专注模式', exact: true })
    await expectTouchTarget(focus)
    await page.screenshot({ path: info.outputPath(`fullscreen-${failure}.png`) })
    await focus.click()
    await expect(explanation).toBeHidden()
    await expect(page.locator('.atlas-app')).toHaveAttribute('data-focus-mode', 'true')
    await expect(page.getByRole('button', { name: '退出专注模式', exact: true })).toBeFocused()
    await expect(page.locator('.year-title')).toContainText('1082')
    await expectNoOverflow(page)
    expect(errors).toEqual([])
  })
}

test('consumes an installation prompt once, handles cancellation and hides the installed entry', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#year=1082&person=sushi')
  await openDisplayMenu(page)
  const install = page.getByRole('button', { name: '添加到主屏幕', exact: true })
  await expectTouchTarget(install)
  const retained = await page.evaluate(() => {
    const state = { calls: 0 }
    Object.assign(window, { testInstallPrompt: state })
    const event = new Event('beforeinstallprompt', { cancelable: true })
    Object.assign(event, {
      prompt: async () => {
        state.calls++
      },
      userChoice: Promise.resolve({ outcome: 'dismissed', platform: 'web' }),
    })
    window.dispatchEvent(event)
    return event.defaultPrevented
  })
  expect(retained).toBe(true)
  const promptCalls = () =>
    page.evaluate(
      () => (window as unknown as { testInstallPrompt: { calls: number } }).testInstallPrompt.calls,
    )
  await install.click()
  await expect.poll(promptCalls).toBe(1)
  await expect(page.getByRole('dialog')).toBeHidden()
  await expect(page.getByRole('button', { name: '更多操作', exact: true })).toBeFocused()

  await openDisplayMenu(page)
  await install.click()
  const explanation = page.getByRole('dialog', { name: '添加到主屏幕', exact: true })
  await expect(explanation).toBeVisible()
  await expect(explanation).toContainText('添加后仍需联网加载地图和内容')
  expect(await promptCalls()).toBe(1)
  await expect(explanation.getByRole('button', { name: '关闭显示说明' })).toBeFocused()
  await page.screenshot({ path: info.outputPath('install-instructions.png') })
  const confirm = explanation.getByRole('button', { name: '知道了', exact: true })
  await expectTouchTarget(confirm)
  await confirm.click()
  await expect(explanation).toBeHidden()
  await page.evaluate(() => window.dispatchEvent(new Event('appinstalled')))
  await openDisplayMenu(page)
  await expect(page.getByRole('button', { name: '添加到主屏幕', exact: true })).toHaveCount(0)
  await expect(page.locator('.year-title')).toContainText('1082')
  await expect(page).toHaveURL(/person=sushi/)
})

test('keeps display controls and reading usable on tablets and desktop', async ({ page }, info) => {
  for (const [name, width, height] of [
    ['tablet-portrait', 768, 1024],
    ['tablet-landscape', 1024, 768],
    ['desktop', 1440, 900],
  ] as const) {
    await page.setViewportSize({ width, height })
    await page.goto('/#year=1082&person=sushi')
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    await openDisplayMenu(page)
    for (const label of ['全屏浏览', '添加到主屏幕', '进入专注模式'])
      await expectTouchTarget(page.getByRole('button', { name: label, exact: true }))
    await expectNoOverflow(page)
    await page.screenshot({ path: info.outputPath(`${name}-display-controls.png`) })
    await page.getByRole('button', { name: '进入专注模式', exact: true }).click()
    await expect(page.locator('.topbar')).toBeHidden()
    await expect(page.locator('.person-biography')).toContainText('苏轼')
    await expect(page.locator('.map-shell')).toBeInViewport({ ratio: 1 })
    await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
    await expectTouchTarget(page.getByRole('button', { name: '退出专注模式', exact: true }))
    await expectNoOverflow(page)
    await page.screenshot({ path: info.outputPath(`${name}-focus.png`) })
    await page.getByRole('button', { name: '退出专注模式', exact: true }).click()
    await expect(page.locator('.topbar')).toBeVisible()
    const restoredFocus = page.getByRole('button', {
      name: '更多操作',
      exact: true,
    })
    await expect(restoredFocus).toBeFocused()
  }
})

test('provides a local standalone manifest and usable installation icons', async ({
  page,
  request,
}) => {
  await page.goto('/')
  const manifestLink = page.locator('link[rel="manifest"]')
  await expect(manifestLink).toHaveCount(1)
  const manifestURL = new URL((await manifestLink.getAttribute('href'))!, page.url())
  expect(manifestURL.origin).toBe(new URL(page.url()).origin)
  const response = await request.get(manifestURL.href)
  expect(response.ok()).toBe(true)
  expect(response.headers()['content-type']).toMatch(/^application\/(?:manifest\+json|json)/)
  const manifest = await response.json()
  expect(manifest.name).toContain('山河纪')
  expect(manifest.display).toBe('standalone')
  expect(new URL(manifest.start_url, manifestURL).origin).toBe(manifestURL.origin)
  const icons = manifest.icons as { src: string; sizes: string; type: string }[]
  for (const size of [192, 512]) {
    const icon = icons.find((entry) => entry.sizes.split(' ').includes(`${size}x${size}`))
    expect(icon, `${size}px install icon`).toBeDefined()
    const iconURL = new URL(icon!.src, manifestURL)
    expect(iconURL.origin).toBe(manifestURL.origin)
    const image = await request.get(iconURL.href)
    expect(image.ok()).toBe(true)
    const bytes = await image.body()
    expect(bytes.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a')
    expect(bytes.readUInt32BE(16)).toBe(size)
    expect(bytes.readUInt32BE(20)).toBe(size)
  }
  const appleIcon = page.locator('link[rel="apple-touch-icon"]')
  await expect(appleIcon).toHaveCount(1)
  const image = await request.get(new URL((await appleIcon.getAttribute('href'))!, page.url()).href)
  expect(image.ok()).toBe(true)
  const bytes = await image.body()
  expect(bytes.readUInt32BE(16)).toBe(180)
  expect(bytes.readUInt32BE(20)).toBe(180)
})

test('hides installation controls in an existing standalone session', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'standalone', { configurable: true, value: true })
    const nativeMatchMedia = window.matchMedia.bind(window)
    window.matchMedia = (query) => {
      const media = nativeMatchMedia(query)
      if (query.includes('display-mode: standalone'))
        Object.defineProperty(media, 'matches', { configurable: true, value: true })
      return media
    }
  })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#year=1082&person=sushi')
  await openDisplayMenu(page)
  await expect(page.getByRole('button', { name: '添加到主屏幕', exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: '进入专注模式', exact: true })).toBeVisible()
  await expect(page.locator('.year-title')).toContainText('1082')
})

test('shows matching manual installation instructions for iPhone, Android and WeChat', async ({
  browser,
  baseURL,
}, info) => {
  for (const [name, userAgent, instruction] of [
    [
      'iphone-safari',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
      '打开浏览器的分享菜单，选择「添加到主屏幕」',
    ],
    [
      'android-chrome',
      'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
      '打开浏览器右上角的菜单',
    ],
    [
      'wechat',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 MicroMessenger/8.0.50',
      '点击微信右上角的「…」，选择在浏览器中打开',
    ],
  ] as const) {
    const context = await browser.newContext({
      baseURL,
      viewport: { width: 390, height: 844 },
      hasTouch: true,
      userAgent,
    })
    try {
      // Exercise manual instructions regardless of this desktop browser's install eligibility.
      await context.addInitScript(() => {
        window.addEventListener(
          'beforeinstallprompt',
          (event) => {
            event.preventDefault()
            event.stopImmediatePropagation()
          },
          { capture: true },
        )
      })
      const page = await context.newPage()
      await page.goto('/#year=1082&person=sushi')
      await openDisplayMenu(page)
      await page.getByRole('button', { name: '添加到主屏幕', exact: true }).click()
      const explanation = page.getByRole('dialog', { name: '添加到主屏幕', exact: true })
      await expect(explanation).toBeInViewport({ ratio: 1 })
      await expect(explanation).toContainText(instruction)
      await expect(explanation).toContainText('添加后仍需联网加载地图和内容')
      const close = explanation.getByRole('button', { name: '关闭显示说明', exact: true })
      await expectTouchTarget(close)
      await expect(close).toBeFocused()
      await expectTouchTarget(explanation.getByRole('button', { name: '知道了', exact: true }))
      await expectNoOverflow(page)
      await page.screenshot({ path: info.outputPath(`${name}-manual-install.png`) })
      await page.keyboard.press('Escape')
      await expect(explanation).toBeHidden()
      await expect(page.getByRole('button', { name: '更多操作', exact: true })).toBeFocused()
      await expect(page.locator('.year-title')).toContainText('1082')
    } finally {
      await context.close()
    }
  }
})

test('keeps portrait sheet dragging and full-height reading correct in focus mode', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#year=1082&person=sushi')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  await openDisplayMenu(page)
  await page.getByRole('button', { name: '进入专注模式', exact: true }).click()
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'map')
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-focus-mode', 'true')
  const handle = page.locator('.mobile-sheet-handle')
  const clock = (await page.locator('.timeline').boundingBox())!
  const drag = async (distance: number, target: 'map' | 'split' | 'reading') => {
    const box = (await handle.boundingBox())!
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    await page.mouse.move(x, y)
    await page.mouse.down()
    await page.mouse.move(x, y + distance, { steps: 10 })
    await expect(page.locator('.atlas-app')).toHaveAttribute('data-sheet-dragging', 'true')
    await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
    await page.mouse.up()
    await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', target)
    await expect(page.locator('.atlas-app')).not.toHaveAttribute('data-sheet-dragging')
    expect((await page.locator('.timeline').boundingBox())!.y).toBeCloseTo(clock.y, 0)
  }
  await drag(-140, 'split')
  await expect(page.locator('.person-biography')).toContainText('苏轼')
  await drag(-120, 'reading')
  const header = await page.locator('.topbar').evaluate((element) => {
    const box = element.getBoundingClientRect()
    return { y: box.y, height: box.height }
  })
  const reader = (await page.locator('.story-panel').boundingBox())!
  expect(header.height).toBeLessThanOrEqual(1)
  expect(reader.y).toBeCloseTo(header.y + header.height, 0)
  expect(reader.height).toBeCloseTo(clock.y - reader.y, 0)
  expect(reader.y + reader.height).toBeCloseTo(clock.y, 0)
  await expect(page.locator('.map-shell')).toBeHidden()
  await expectTouchTarget(handle)
  await expectTouchTarget(page.getByRole('button', { name: '退出专注模式', exact: true }))
  await expectNoOverflow(page)
  await page.screenshot({ path: info.outputPath('focus-portrait-expanded-sheet.png') })
  await drag(reader.height - 44, 'map')
  await expect(page.locator('.panel-scroll')).toBeHidden()
  expect((await page.locator('.story-panel').boundingBox())!.height).toBeCloseTo(44, 0)
  await expect(page.locator('.map-shell')).toBeInViewport({ ratio: 1 })
  await expectTouchTarget(page.getByRole('button', { name: '退出专注模式', exact: true }))
  await expect(page.locator('.year-title')).toContainText('1082')
  await page.getByRole('button', { name: '退出专注模式', exact: true }).click()
  await expect(page.locator('.topbar')).toBeVisible()
  await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
  await expectNoOverflow(page)
})

test('keeps focused map overlays clear of the restore button and map controls at 568x320', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 568, height: 320 })
  for (const [name, hash, selector] of [
    ['tour', '#year=-138&tour=silk-road&step=0&event=zhangqian', '.tour-banner'],
    ['comparison', '#year=755&compare=763&view=comparison', '.comparison-controls'],
    ['early-history', '#year=-3000', '.early-map-note'],
  ] as const) {
    await page.goto(`/${hash}`)
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    await setSheet(page, 'split')
    await openDisplayMenu(page)
    await page.getByRole('button', { name: '进入专注模式', exact: true }).click()
    const exit = page.getByRole('button', { name: '退出专注模式', exact: true })
    await expectTouchTarget(exit)
    const overlay = page.locator(selector)
    const mapControls = page.locator('.map-controls')
    await expect(overlay).toBeInViewport({ ratio: 1 })
    await expect(mapControls).toBeInViewport({ ratio: 1 })
    const reserved = [(await exit.boundingBox())!, (await mapControls.boundingBox())!]
    const overlayBox = (await overlay.boundingBox())!
    for (const box of reserved) {
      const overlapWidth =
        Math.min(overlayBox.x + overlayBox.width, box.x + box.width) - Math.max(overlayBox.x, box.x)
      const overlapHeight =
        Math.min(overlayBox.y + overlayBox.height, box.y + box.height) -
        Math.max(overlayBox.y, box.y)
      expect(
        Math.min(overlapWidth, overlapHeight),
        `${name} overlay collision`,
      ).toBeLessThanOrEqual(0)
    }
    for (const control of await overlay
      .locator('button:visible, input:visible, summary:visible')
      .all()) {
      await expect(control).toBeInViewport({ ratio: 1 })
      const unobscured = await control.evaluate((element) => {
        const box = element.getBoundingClientRect()
        const hit = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2)
        return hit !== null && element.contains(hit)
      })
      expect(unobscured, `${name} overlay control receives pointer input`).toBe(true)
    }
    await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
    await expectNoOverflow(page)
    await page.screenshot({ path: info.outputPath(`focus-${name}-overlays.png`) })
    await exit.click()
    await expect(page.locator('.topbar')).toBeVisible()
  }
})
