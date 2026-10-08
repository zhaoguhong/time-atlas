import { expect, test } from '@playwright/test'
import { setSheet } from './mobile-sheet-helpers'

for (const [width, height] of [
  [1440, 900],
  [768, 1024],
  [390, 844],
  [360, 640],
  [844, 390],
]) {
  test(`person further reading preserves the atlas at ${width}x${height}`, async ({
    page,
    context,
  }, info) => {
    const errors: string[] = []
    const externalRequests: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })
    page.on('requestfailed', (request) => errors.push(`Request failed: ${request.url()}`))
    context.on('request', (request) => {
      if (/wikipedia\.org|wikisource\.org|wikidata\.org|fns\.pdsu\.edu\.cn/.test(request.url()))
        externalRequests.push(request.url())
    })
    // Exercise browser navigation without depending on a third-party site's availability.
    await context.route('https://zh.wikipedia.org/**', (route) =>
      route.fulfill({ contentType: 'text/html', body: '<title>Encyclopedia destination</title>' }),
    )
    await page.setViewportSize({ width, height })
    await page.goto('/#person=sushi&year=1082')
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    const mobile = width <= 700 || (width <= 1000 && height <= 540)
    if (mobile) await setSheet(page, 'reading')

    const section = page.getByRole('region', { name: '苏轼的延伸阅读', exact: true })
    await expect(section.getByRole('heading', { name: '延伸阅读' })).toBeVisible()
    await expect(section.locator('.further-reading-kind')).toHaveText([
      '百科介绍',
      '生平年谱',
      '原典阅读',
    ])
    const links = section.getByRole('link')
    await expect(links).toHaveCount(3)
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      await link.evaluate((element) => element.scrollIntoView({ block: 'center' }))
      await expect(link).toBeInViewport({ ratio: 1 })
      const rect = (await link.boundingBox())!
      expect(rect.height).toBeGreaterThanOrEqual(44)
      expect(rect.x).toBeGreaterThanOrEqual(0)
      expect(rect.x + rect.width).toBeLessThanOrEqual(width)
    }
    expect(externalRequests).toEqual([])
    await expect(page.locator('.reference-list').getByRole('link')).not.toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    )
    const encyclopedia = links.first()
    await encyclopedia.scrollIntoViewIfNeeded()
    await page.screenshot({ path: info.outputPath('further-reading.png') })
    const panel = page.locator('.panel-scroll')
    const scrollBefore = await panel.evaluate((element) => element.scrollTop)
    const destination = await encyclopedia.getAttribute('href')
    await encyclopedia.focus()
    const popupPromise = page.waitForEvent('popup')
    await page.keyboard.press('Enter')
    const popup = await popupPromise
    await expect(popup).toHaveURL(destination!)
    expect(await popup.evaluate(() => window.opener === null)).toBe(true)
    await popup.close()
    await expect(page).toHaveURL(/person=sushi/)
    await expect(page.locator('.year-title')).toContainText('1082')
    expect(await panel.evaluate((element) => element.scrollTop)).toBeCloseTo(scrollBefore, 0)
    if (mobile)
      await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', 'reading')
    expect(externalRequests).toHaveLength(1)

    await page.goto('/#person=q890613&year=925')
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    if (mobile) await setSheet(page, 'reading')
    const catalog = page.getByRole('region', { name: '董源的延伸阅读', exact: true })
    await expect(catalog.getByRole('link')).toHaveCount(1)
    await expect(catalog.getByRole('link')).toContainText('百科介绍')
    await expect(catalog.getByRole('link')).toContainText('维基百科 · 董源')
    await catalog.scrollIntoViewIfNeeded()
    await page.screenshot({ path: info.outputPath('catalog-reading.png') })
    expect(errors).toEqual([])
  })
}
