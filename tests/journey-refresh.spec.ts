import { expect, test } from '@playwright/test'
import { journeys } from '../src/data/journeys'
import { readingSourceUrl } from '../src/lib/source-links'
import { setSheet } from './mobile-sheet-helpers'

for (const [width, height] of [
  [1440, 900],
  [390, 844],
  [844, 390],
]) {
  for (const journey of journeys) {
    test(`verified journey ${journey.personId} navigates at ${width}x${height}`, async ({
      page,
    }, info) => {
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      await page.setViewportSize({ width, height })
      const first = journey.nodes[0]
      const second = journey.nodes[1]
      const last = journey.nodes.at(-1)!
      await page.goto(
        `/#visual=map&year=${first.year}&person=${journey.personId}&journey=${journey.personId}&point=${first.id}`,
      )
      if (width <= 700 || height <= 540) await setSheet(page, 'reading')
      await expect(page.locator('.journey-active-card h4')).toHaveText(first.title)
      await expect(page.locator('.journey-node-list button')).toHaveCount(journey.nodes.length)
      await expect(page.locator('.person-journey > .journey-reading-note')).toContainText(
        '真实道路或航线',
      )
      await expect(page.locator('.journey-active-card .journey-citation').first()).toHaveAttribute(
        'href',
        readingSourceUrl(first.sources[0].url),
      )
      await page.locator('.journey-step-controls button').filter({ hasText: '下一条' }).click()
      await expect(page.locator('.journey-active-card h4')).toHaveText(second.title)
      await expect(page).toHaveURL(new RegExp(`point=${second.id}`))
      await expect(page.locator('.map-canvas')).toHaveAttribute(
        'data-map-year',
        String(second.year),
      )
      await page.locator('.journey-node-list button').last().click()
      await expect(page.locator('.journey-active-card h4')).toHaveText(last.title)
      await expect(page.locator('.map-canvas')).toHaveAttribute('data-map-year', String(last.year))
      if (width <= 700 || height <= 540) await setSheet(page, 'split')
      await page.getByRole('checkbox', { name: '显示后续记录' }).check()
      await page.getByRole('button', { name: '查看人物行迹全貌' }).click()
      await expect(page.locator('.map-canvas')).toHaveAttribute('data-trail-rendered', 'true')
      await expect(page.locator('.map-canvas')).toHaveAttribute(
        'data-trail-arrows-rendered',
        'true',
      )
      await expect(page.locator('.journey-marker.selected[data-visible="true"]')).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      )
      if (['xuanzang', 'zhenghe', 'confucius'].includes(journey.personId))
        await page.screenshot({ path: info.outputPath(`${journey.personId}-${width}.png`) })
      expect(errors).toEqual([])
    })
  }
  test(`removed Liu Zongyuan journey keeps the person readable at ${width}x${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height })
    await page.goto('/#visual=map&year=815&person=q337773&journey=q337773')
    if (width <= 700 || height <= 540) await setSheet(page, 'reading')
    await expect(page.locator('.person-hero h2')).toContainText('柳宗元')
    await expect(page.locator('.person-record-status')).toContainText('尚未整理可绘制的年谱')
    await expect(page.locator('.person-trail-action')).toHaveCount(0)
    await expect(page.locator('.journey-toolbar')).toHaveCount(0)
  })
}
