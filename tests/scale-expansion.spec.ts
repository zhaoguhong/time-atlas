import { expect, test } from '@playwright/test'
import { newExpandedEvents, newExpandedPeople } from '../src/data/expansion-content'
import { setSheet } from './mobile-sheet-helpers'

for (const [width, height] of [
  [1440, 900],
  [390, 844],
  [844, 390],
]) {
  test(`expanded regional articles and people remain reachable at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    const examples = [
      newExpandedEvents.find((e) => e.region === 'china' && e.year > 1912)!,
      newExpandedEvents.find((e) => e.region === 'europe' && e.year > 1500)!,
      newExpandedEvents.find((e) => e.region === 'africa')!,
    ]
    for (const record of examples) {
      await page.goto(`/#visual=pillar&year=${record.year}&event=${record.id}`)
      if (width <= 700 || height <= 540) await setSheet(page, 'reading')
      await expect(page.locator('.event-detail h2')).toHaveText(record.title)
      await expect(page.locator('.event-article p').first()).toHaveText(
        record.narrative!.sections[0].paragraphs[0],
      )
      await expect(page.locator('.event-detail .reference-list a').first()).toBeAttached()
      await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', String(record.year))
    }
    const person = newExpandedPeople.find((p) => p.birth !== null && p.birth > 1800)!
    await page.goto(`/#visual=pillar&year=${person.birth}&person=${person.id}`)
    if (width <= 700 || height <= 540) await setSheet(page, 'reading')
    await expect(page.locator('.person-hero h2')).toContainText(person.name)
    await expect(page.locator('.person-biography')).toContainText(person.biography.split('\n')[0])
    await expect(page.locator('.person-detail .reference-list a').first()).toBeAttached()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.screenshot({ path: info.outputPath(`expanded-person-${width}.png`) })
    expect(errors).toEqual([])
  })

  test(`new place and independently sourced journey navigate at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    await page.goto('/#visual=map&year=1872&place=shanghai&view=places')
    if (width <= 700 || height <= 540) await setSheet(page, 'reading')
    await expect(page.locator('.place-detail h2')).toHaveText('上海')
    const item = page.locator('.place-detail .archive-event-list button').first()
    await expect(item).toBeAttached()
    const title = await item.locator('strong').innerText()
    await item.click()
    await expect(page.locator('.event-detail h2')).toHaveText(title)
    await page.getByRole('button', { name: '返回地点', exact: true }).click()
    await expect(page.locator('.place-detail h2')).toHaveText('上海')
    await page.goto(
      '/#visual=map&year=659&person=xuanzang&journey=xuanzang&point=xuanzang-record-yuhua-final',
    )
    if (width <= 700 || height <= 540) await setSheet(page, 'reading')
    await expect(page.locator('.journey-node-list button')).toHaveCount(8)
    await expect(page.locator('.journey-active-card h4')).toHaveText('移住玉华寺主持翻译')
    await expect(page.locator('.journey-active-card .journey-citation').first()).toBeAttached()
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-map-year', '659')
    await page.locator('.journey-node-list button').filter({ hasText: '在玉华寺去世' }).click()
    await expect(page.locator('.journey-active-card h4')).toHaveText('在玉华寺去世')
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-map-year', '664')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.screenshot({ path: info.outputPath(`expanded-journey-${width}.png`) })
  })
}
