import { setSheet } from './mobile-sheet-helpers'
import { expect, test } from '@playwright/test'
import { civilizationEvents } from '../src/data/civilizations'

test('opens each added archaeological record from a shared URL with dates, evidence and sources', async ({
  page,
}) => {
  test.setTimeout(120000)
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const event of civilizationEvents.slice(10)) {
    await test.step(event.title, async () => {
      await page.goto(`/#year=${event.year}&event=${event.id}&scope=period`)
      const detail = page.locator('.event-detail')
      await expect(detail.locator('h2')).toHaveText(event.title)
      await expect(detail.locator('.detail-kicker')).toContainText(event.dateLabel!)
      await expect(detail.locator('.evidence-note')).toContainText(event.dateNote!)
      await expect(detail.locator('.evidence-note')).toContainText(event.locationNote!)
      await expect(detail.locator('.event-narrative')).toContainText(event.details![0])
      await expect(detail.locator('.reference-list a').first()).toHaveAttribute(
        'href',
        event.sources[0].url,
      )
      await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true', {
        timeout: 15000,
      })
      await expect(page.locator(`.event-marker[data-active-event="${event.id}"]`)).toHaveAttribute(
        'data-visible',
        'true',
      )
    })
  }
  expect(errors).toEqual([])
})

for (const [width, height] of [
  [1440, 900],
  [390, 844],
]) {
  test(`searches cross-regional civilizations and restores their reading at ${width}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height })
    await page.goto('/#year=-3000')
    for (const [query, id] of [
      ['卡拉尔', 'caral-city'],
      ['库克沼泽', 'kuk-early-farming'],
      ['熊家岭水坝', 'qujialing-water'],
    ]) {
      await page.getByRole('combobox', { name: '搜索历史事件、人物或地名' }).fill(query)
      await page.getByRole('option').first().click()
      const event = civilizationEvents.find((item) => item.id === id)!
      await expect(page.locator('.event-detail h2')).toHaveText(event.title)
      if (width < 600) await setSheet(page, 'split')
      await expect(page.locator(`.event-marker[data-active-event="${event.id}"]`)).toHaveAttribute(
        'data-visible',
        'true',
      )
      await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      )
    }
    await page.reload()
    await expect(page.locator('.event-detail h2')).toContainText('屈家岭')
    await expect(page.locator('.event-detail .evidence-note')).toContainText('早期坝及后续扩建')
  })

  test(`includes the new world regions in period overviews and opens their learning nodes at ${width}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height })
    await page.goto('/#year=230')
    await page.getByRole('combobox', { name: '切换历史时期' }).selectOption('prehistory')
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true', {
      timeout: 15000,
    })
    await expect(page.locator('.period-overview')).toContainText('新几内亚高地农业')
    if (width < 600) await setSheet(page, 'split')
    await expect(
      page.locator('.event-marker[data-active-event="kuk-early-farming"] .event-marker-dot'),
    ).toBeInViewport({ ratio: 1 })
    await page
      .locator('.overview-steps')
      .getByRole('button', { name: /库克：新几内亚高地的早期农业/ })
      .click()
    await expect(page.locator('.event-detail h2')).toContainText('库克')
    await expect(page.locator('.event-marker.selected')).toHaveAttribute('data-visible', 'true')
    await page.getByRole('combobox', { name: '切换历史时期' }).selectOption('early-civilizations')
    await expect(page.locator('.period-overview')).toContainText('安第斯苏佩河谷城市')
    for (const id of ['caral-city', 'sannai-maruyama', 'skara-brae']) {
      // Inspect the geographic marker anchor, before label collision translations.
      await expect
        .poll(() =>
          page.locator(`.event-marker[data-event-ids~="${id}"]`).evaluate((element) => {
            const anchor = element.style.transform.match(/translate\(([-\d.]+)px, ([-\d.]+)px\)/)
            const map = document.querySelector('.map-canvas')!.getBoundingClientRect()
            return (
              !!anchor &&
              Number(anchor[1]) >= 0 &&
              Number(anchor[1]) <= map.width &&
              Number(anchor[2]) >= 0 &&
              Number(anchor[2]) <= map.height
            )
          }),
        )
        .toBe(true)
    }
    // A saved camera is updated at moveend, not during the animated fit.
    await expect
      .poll(() =>
        Math.abs(Number(new URLSearchParams(new URL(page.url()).hash.slice(1)).get('lng'))),
      )
      .toBeLessThan(60)
    const overviewURL = page.url()
    await page.reload()
    await expect(page.locator('.period-overview')).toContainText('安第斯苏佩河谷城市')
    await expect(page).toHaveURL(overviewURL)
    await page
      .locator('.overview-steps')
      .getByRole('button', { name: /卡拉尔：安第斯地区的广场与台基/ })
      .click()
    await expect(page.locator('.event-detail h2')).toContainText('卡拉尔')
    await expect(page.locator('.event-marker.selected')).toHaveAttribute('data-visible', 'true')
  })
}
