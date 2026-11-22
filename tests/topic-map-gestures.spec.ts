import { expect, test, type CDPSession, type Locator, type Page } from '@playwright/test'

type MapView = { map: Locator; markers: Locator }

// Marker transforms are projected pixels produced by MapLibre's real camera.
// Unlike bounding boxes they remain readable when a point crosses the clipped edge.
async function markerDistance(markers: Locator) {
  return markers.evaluateAll((elements) => {
    const points = elements.slice(0, 2).map((element) => {
      const transform = (element as HTMLElement).style.transform
      const match = transform.match(/translate\(([-.\d]+)px,\s*([-.\d]+)px\)/)
      if (!match) throw new Error(`Missing projected marker position: ${transform}`)
      return [Number(match[1]), Number(match[2])]
    })
    if (points.length !== 2) throw new Error('Gesture check needs two geographic markers')
    return Math.hypot(points[1][0] - points[0][0], points[1][1] - points[0][1])
  })
}

async function stableDistance(markers: Locator) {
  let previous = -1
  let stable = 0
  let distance = 0
  await expect
    .poll(
      async () => {
        distance = await markerDistance(markers)
        stable = Math.abs(distance - previous) < 0.1 ? stable + 1 : 0
        previous = distance
        return stable
      },
      { intervals: [50], message: 'Wait for the rendered map scale to settle' },
    )
    .toBeGreaterThanOrEqual(3)
  return distance
}

async function mapCentre(map: Locator) {
  const box = (await map.boundingBox())!
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 }
}

async function ctrlWheelZoom(session: CDPSession, view: MapView) {
  await view.map.scrollIntoViewIfNeeded()
  const centre = await mapCentre(view.map)
  const before = await stableDistance(view.markers)
  await session.send('Input.dispatchMouseEvent', {
    type: 'mouseWheel',
    ...centre,
    deltaX: 0,
    deltaY: -240,
    modifiers: 2,
  })
  await expect
    .poll(() => markerDistance(view.markers), {
      timeout: 3000,
      message: 'Native trackpad pinch must enlarge the rendered geographic spacing',
    })
    .toBeGreaterThan(before * 1.12)
  const enlarged = await stableDistance(view.markers)
  await session.send('Input.dispatchMouseEvent', {
    type: 'mouseWheel',
    ...centre,
    deltaX: 0,
    deltaY: 240,
    modifiers: 2,
  })
  await expect
    .poll(() => markerDistance(view.markers), {
      timeout: 3000,
      message: 'The reverse pinch must shrink the rendered geographic spacing',
    })
    .toBeLessThan(enlarged * 0.9)
  await stableDistance(view.markers)
}

async function nextRenderedFrame(page: Page) {
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())))
}

async function touchPinch(page: Page, session: CDPSession, map: Locator, outward: boolean) {
  const centre = await mapCentre(map)
  // Each finger must travel beyond MapLibre’s 30px two-finger tap tolerance.
  // Releasing a shorter pinch can otherwise trigger tap-to-zoom-out.
  const start = outward ? 42 : 90
  const end = outward ? 90 : 42
  const touches = (radius: number) => [
    { id: 0, x: centre.x - radius, y: centre.y, radiusX: 3, radiusY: 3, force: 1 },
    { id: 1, x: centre.x + radius, y: centre.y, radiusX: 3, radiusY: 3, force: 1 },
  ]
  await session.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: touches(start),
  })
  await nextRenderedFrame(page)
  for (let step = 1; step <= 8; step++) {
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: touches(start + ((end - start) * step) / 8),
    })
    await nextRenderedFrame(page)
  }
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
}

async function twoFingerZoom(page: Page, session: CDPSession, view: MapView) {
  await view.map.scrollIntoViewIfNeeded()
  const before = await stableDistance(view.markers)
  await touchPinch(page, session, view.map, true)
  await expect
    .poll(() => markerDistance(view.markers), {
      message: 'Two actual touch points must enlarge the rendered map',
    })
    .toBeGreaterThan(before * 1.3)
  const enlarged = await stableDistance(view.markers)
  await touchPinch(page, session, view.map, false)
  await expect
    .poll(() => markerDistance(view.markers), {
      message: 'Bringing the two touch points together must shrink the rendered map',
    })
    .toBeLessThan(enlarged * 0.8)
  await stableDistance(view.markers)
}

async function articleScrollRemainsAvailable(
  page: Page,
  session: CDPSession,
  view: MapView,
  touch: boolean,
) {
  await view.map.scrollIntoViewIfNeeded()
  const scale = await stableDistance(view.markers)
  const panel = page.locator('.panel-scroll')
  const before = await panel.evaluate((element) => element.scrollTop)
  const centre = await mapCentre(view.map)
  if (touch) {
    const point = (offset: number) => [{ id: 0, x: centre.x, y: centre.y + 60 - offset }]
    await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: point(0) })
    await nextRenderedFrame(page)
    for (let step = 1; step <= 8; step++) {
      await session.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: point(step * 16),
      })
      await nextRenderedFrame(page)
    }
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  } else {
    await session.send('Input.dispatchMouseEvent', {
      type: 'mouseWheel',
      ...centre,
      deltaX: 0,
      deltaY: 200,
      modifiers: 0,
    })
  }
  await expect
    .poll(() => panel.evaluate((element) => element.scrollTop), {
      message: 'An unmodified scroll over the embedded map must continue reading the article',
    })
    .toBeGreaterThan(before + 30)
  let lastScroll = -1
  let stationaryFrames = 0
  await expect
    .poll(
      async () => {
        const current = await panel.evaluate((element) => element.scrollTop)
        stationaryFrames = Math.abs(current - lastScroll) < 1 ? stationaryFrames + 1 : 0
        lastScroll = current
        return stationaryFrames
      },
      { intervals: [50], message: 'Wait for native reading-scroll inertia to finish' },
    )
    .toBeGreaterThanOrEqual(3)
  expect(await stableDistance(view.markers)).toBeCloseTo(scale, 0)
}

function overviewView(page: Page): MapView {
  const map = page.locator('.topic-route-overview .topic-route-map')
  return {
    map,
    markers: map.locator('.route-marker[data-route-id="silk-north"]'),
  }
}

for (const device of [
  { name: '桌面', width: 1440, height: 900, touch: false },
  { name: '手机', width: 390, height: 844, touch: true },
]) {
  test(`${device.name}路线总览支持原生${device.touch ? '触屏' : '触控板'}双指缩放`, async ({
    page,
    browserName,
  }, info) => {
    test.skip(browserName !== 'chromium', 'CDP sends native Chromium wheel and touch input')
    await page.setViewportSize({ width: device.width, height: device.height })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const session = await page.context().newCDPSession(page)
    if (device.touch)
      await session.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 2 })
    await page.goto('/topics/silk-road/')
    const view = overviewView(page)
    const overview = page.locator('.topic-route-overview')
    await overview.scrollIntoViewIfNeeded()
    await expect(view.map).toHaveCount(0)
    await overview.getByRole('button', { name: '展开路线总览', exact: true }).click()
    await expect(view.map).toHaveAttribute('data-ready', 'true')
    if (device.touch) await twoFingerZoom(page, session, view)
    else await ctrlWheelZoom(session, view)
    await articleScrollRemainsAvailable(page, session, view, device.touch)
    await page.locator('.topic-route-legend button[data-route-id="silk-north"]').click()
    const dialog = page.getByRole('dialog')
    const map = dialog.locator('.topic-route-map')
    await expect(map).toHaveAttribute('data-ready', 'true')
    const enlargedView = { map, markers: map.locator('.route-marker') }
    if (device.touch) await twoFingerZoom(page, session, enlargedView)
    else await ctrlWheelZoom(session, enlargedView)
    await page.screenshot({ path: info.outputPath(`route-gestures-${device.width}.png`) })
    await dialog.getByRole('button', { name: '关闭路线地图，返回文章', exact: true }).click()
    await expect(view.map).toHaveAttribute('data-ready', 'true')
    await session.detach()
  })

  test(`${device.name}章节地图原位与放大均支持双指缩放`, async ({ page, browserName }, info) => {
    test.skip(browserName !== 'chromium', 'CDP sends native Chromium wheel and touch input')
    await page.setViewportSize({ width: device.width, height: device.height })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const session = await page.context().newCDPSession(page)
    if (device.touch)
      await session.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 2 })
    await page.goto('/topics/porcelain-world/')
    const figure = page.locator('[data-article-block="map-porcelain-ports"]')
    await figure.scrollIntoViewIfNeeded()
    await expect(figure.locator('canvas')).toHaveCount(0)
    await figure.getByRole('button', { name: '展开地图：产地与出海口，并不在同一处' }).click()
    await expect(figure.locator('.topic-inline-map')).toHaveAttribute('data-ready', 'true')
    const map = figure.locator('.topic-inline-map-canvas')
    const view = { map, markers: map.locator('.topic-inline-reference-marker') }
    if (device.touch) await twoFingerZoom(page, session, view)
    else await ctrlWheelZoom(session, view)
    await articleScrollRemainsAvailable(page, session, view, device.touch)
    await figure.locator('.topic-map-enlarge').click()
    const dialog = page.getByRole('dialog', {
      name: '放大地图：产地与出海口，并不在同一处',
      exact: true,
    })
    const enlarged = dialog.locator('.topic-inline-map-canvas')
    const enlargedView = {
      map: enlarged,
      markers: enlarged.locator('.topic-inline-reference-marker'),
    }
    await expect(dialog.locator('.topic-inline-map')).toHaveAttribute('data-ready', 'true')
    if (device.touch) await twoFingerZoom(page, session, enlargedView)
    else await ctrlWheelZoom(session, enlargedView)
    await page.screenshot({ path: info.outputPath(`chapter-gestures-${device.width}.png`) })
    await dialog.getByRole('button', { name: '关闭地图，返回文章', exact: true }).click()
    await expect(figure.locator('.topic-map-enlarge')).toBeFocused()
    await expect(map).toBeVisible()
    await session.detach()
  })
}
