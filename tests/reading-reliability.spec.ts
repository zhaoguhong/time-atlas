import { expect, test, type Route } from '@playwright/test'
import { tours } from '../src/data/periods'
import { setSheet } from './mobile-sheet-helpers'

for (const width of [1440, 390]) {
  test(`a stalled article times out and retries without losing the selection at ${width}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.clock.install({ time: new Date('2026-11-03T00:00:00Z') })
    await page.clock.pauseAt(new Date('2026-11-03T00:00:01Z'))
    let held: Route | undefined
    await page.route('**/data/reading/events/**', (route) => {
      held = route
    })
    const requested = page.waitForRequest(/\/data\/reading\/events\//)
    await page.goto('/#visual=pillar&year=1687&event=world-newton')
    await requested
    if (width < 700) await setSheet(page, 'reading')
    await expect(page.locator('.reading-status')).toContainText('正在加载')
    const address = page.url()
    await page.clock.fastForward(20_001)
    await expect(page.locator('.reading-status')).toContainText('正文暂未加载')
    await expect(page.locator('.event-detail > .detail-lead')).toContainText('牛顿')
    await page.unroute('**/data/reading/events/**')
    await held?.abort().catch(() => {})
    await page.clock.resume()
    await page.getByRole('button', { name: '重新加载正文', exact: true }).click()
    await expect(page.locator('.event-article')).toContainText('哈雷')
    await expect(page.locator('.reading-status')).toHaveCount(0)
    await expect(page).toHaveURL(address)
  })

  test(`recent topic reading resumes its saved event rather than a stale chapter number at ${width}`, async ({
    page,
  }) => {
    const topic = tours.find((item) => item.id === 'disease-medicine-public-health')!
    const eventId = 'modern-smallpox-eradication'
    const chapter = topic.steps.indexOf(eventId)
    expect(chapter).toBeGreaterThan(0)
    await page.setViewportSize({ width, height: 900 })
    await page.addInitScript(
      ({ topicId, name, eventId }) => {
        localStorage.setItem(
          'time-atlas:reading:v2',
          JSON.stringify({
            topics: { [topicId]: { lastEventId: eventId, readEventIds: [eventId] } },
            recent: [{ key: `topic:${topicId}`, title: name, hash: `#tour=${topicId}&step=0` }],
          }),
        )
      },
      { topicId: topic.id, name: topic.name, eventId },
    )
    await page.goto('/#visual=pillar&year=750&view=tours')
    if (width < 700) await setSheet(page, 'reading')
    await page.locator('.tours-panel .resume-reading button').click()
    await expect(page).toHaveURL(new RegExp(`event=${eventId}`))
    await expect(page.locator('.topic-chapter-context')).toContainText(`第 ${chapter + 1} /`)
    await expect(
      page.getByRole('button', { name: '本章已读 · 取消标记', exact: true }),
    ).toHaveAttribute('aria-pressed', 'true')
    await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', '1980')
  })

  test(`topic links prefer the event ID over a stale chapter number after reload at ${width}`, async ({
    page,
  }) => {
    const topic = tours.find((item) => item.id === 'disease-medicine-public-health')!
    const eventId = 'modern-smallpox-eradication'
    const chapter = topic.steps.indexOf(eventId)
    await page.setViewportSize({ width, height: 900 })
    await page.goto(`/#visual=pillar&tour=${topic.id}&step=0&event=${eventId}`)
    if (width < 700) await setSheet(page, 'reading')
    await expect(page.locator('.topic-chapter-context')).toContainText(`第 ${chapter + 1} /`)
    await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', '1980')
    await page.getByRole('button', { name: '标记本章已读', exact: true }).click()
    await page.reload()
    if (width < 700) await setSheet(page, 'reading')
    await expect(page.locator('.topic-chapter-context')).toContainText(`第 ${chapter + 1} /`)
    await expect(
      page.getByRole('button', { name: '本章已读 · 取消标记', exact: true }),
    ).toHaveAttribute('aria-pressed', 'true')
  })
}

test('a stalled map slice exposes recovery and renders after retry', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-11-03T00:00:00Z') })
  let held: Route | undefined
  await page.route('**/data/maps/**', (route) => {
    held = route
  })
  const requested = page.waitForRequest(/\/data\/maps\//)
  await page.goto('/#year=230')
  await requested
  // Let React mount the lazy map first; pause only once its slice request has started.
  await page.clock.pauseAt(await page.evaluate(() => Date.now() + 1000))
  await page.clock.fastForward(30_001)
  await expect(page.locator('.map-error')).toBeVisible()
  await page.unroute('**/data/maps/**')
  await held?.abort().catch(() => {})
  await page.clock.resume()
  await page.locator('.map-error').getByRole('button', { name: '重新加载', exact: true }).click()
  await expect(page.locator('.map-error')).toHaveCount(0)
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
})
