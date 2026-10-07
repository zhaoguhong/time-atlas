import { setSheet } from './mobile-sheet-helpers'
import { expect, test } from '@playwright/test'

for (const [name, width, height] of [
  ['desktop', 1440, 900],
  ['mobile', 390, 844],
] as const) {
  test(`production map and shared reading on ${name}`, async ({ page }, testInfo) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })
    page.on('requestfailed', (request) => errors.push(`Request failed: ${request.url()}`))
    page.on('response', (response) => {
      if (response.status() >= 400) errors.push(`HTTP ${response.status()}: ${response.url()}`)
    })
    await page.setViewportSize({ width, height })
    await page.goto('/#year=230')
    await expect(page).toHaveTitle('山河纪 · Time Atlas')
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    await expect(page.locator('.timeline')).toBeVisible()
    await expect(page.locator('.year-title')).toContainText('230')
    await page.screenshot({ path: testInfo.outputPath(`${name}.png`) })
    const readingMap = page.waitForResponse(/\/data\/maps\/song\/6\.geojson$/)
    await page.goto('/#person=sushi&year=1082')
    if (name === 'mobile') await setSheet(page, 'reading')
    await expect(page.locator('.person-biography')).toContainText('苏轼')
    // Reading can appear before its map bytes arrive. Let that transfer finish
    // before this smoke test deliberately reloads; immediate-reload recovery is
    // separately covered by the navigation tests.
    expect(await (await readingMap).finished()).toBeNull()
    const reloadedMap = page.waitForResponse(/\/data\/maps\/song\/6\.geojson$/)
    await page.reload()
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    if (name === 'mobile') await setSheet(page, 'reading')
    await expect(page.locator('.person-biography')).toContainText('苏轼')
    expect(await (await reloadedMap).finished()).toBeNull()
    expect(errors).toEqual([])
  })
}
