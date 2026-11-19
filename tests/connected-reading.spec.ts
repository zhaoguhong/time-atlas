import { expect, test } from '@playwright/test'
import { connectedTopicTours, expandedConnectedReadings } from '../src/data/connected-reading-paths'
import { eventById } from '../src/data/content'
import { canonicalArticleId } from '../src/data/article-groups'
import { setSheet } from './mobile-sheet-helpers'
import { articleGuides, recordPath, reloadExploration } from './reading-url-helpers'
const mainTopics = connectedTopicTours.map(({ id }) =>
  articleGuides.find((guide) => guide.id === canonicalArticleId.get(id))!,
)

for (const [width, height] of [
  [1440, 900],
  [390, 844],
  [844, 390],
]) {
  const compact = width <= 700 || height <= 540
  test(`person roles and editorial reading pairs connect in both directions at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    const algebra = eventById.get('category-algebra')!
    await page.goto(`/#visual=pillar&year=${algebra.year}&person=region-person-khwarizmi`)
    if (compact) await setSheet(page, 'reading')
    const authored = page.locator('.person-events a').filter({ hasText: algebra.title })
    await authored.scrollIntoViewIfNeeded()
    await expect(authored).toContainText('撰写代数学')
    await authored.click()
    if (compact) await setSheet(page, 'reading')
    await expect(page.locator('.event-detail h2')).toHaveText(algebra.title)
    await page.getByRole('button', { name: '返回人物', exact: true }).click()
    await expect(page).toHaveURL(recordPath('people', 'region-person-khwarizmi'))
    await expect(page.locator('.person-journey')).toHaveCount(0)

    const [firstId, secondId, forward, backward, note] = expandedConnectedReadings[0]
    const first = eventById.get(firstId)!
    const second = eventById.get(secondId)!
    await page.goto(`/#visual=pillar&year=${first.year}&event=${firstId}`)
    if (compact) await setSheet(page, 'reading')
    await expect(page.locator('.event-article')).toBeVisible()
    const link = page
      .locator('.event-relations a')
      .filter({ has: page.getByText(second.title, { exact: true }) })
    await link.scrollIntoViewIfNeeded()
    await expect(link).toContainText(forward)
    await expect(link).toContainText(note)
    await link.click()
    if (compact) await setSheet(page, 'reading')
    await expect(page.locator('.event-detail h2')).toHaveText(second.title)
    const reverse = page
      .locator('.event-relations a')
      .filter({ has: page.getByText(first.title, { exact: true }) })
    await reverse.scrollIntoViewIfNeeded()
    await expect(reverse).toContainText(backward)
    await expect(reverse).toContainText(note)
    await expect(reverse).toBeInViewport({ ratio: 1 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    )
    await page.screenshot({ path: info.outputPath(`reading-pair-${width}.png`) })
  })

  for (const topic of mainTopics) {
    test(`enters ${topic.id} at the current article and retains chapter progress at ${width}x${height}`, async ({
      page,
    }, info) => {
      const chapter = 1
      const event = eventById.get(topic.steps[chapter])!
      const visual = topic.id === 'writing-and-knowledge' ? 'map' : 'pillar'
      await page.setViewportSize({ width, height })
      await page.goto(`/#visual=${visual}&year=${event.year}&event=${event.id}`)
      if (compact) await setSheet(page, 'reading')
      await expect(page.locator('.event-article')).toBeVisible()
      if (visual === 'map')
        await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
      const entry = page.getByRole('button', { name: `从本章进入专题：${topic.name}`, exact: true })
      await entry.scrollIntoViewIfNeeded()
      await expect(entry).toBeInViewport({ ratio: 1 })
      await page.screenshot({ path: info.outputPath(`topic-entry-${topic.id}-${width}.png`) })
      await entry.click()
      if (compact) await setSheet(page, 'reading')
      await expect(page.locator('.event-detail h2')).toHaveText(event.title)
      await expect(page.locator('.topic-chapter-context')).toContainText(`第 ${chapter + 1} /`)
      await expect(page).toHaveURL(recordPath('events', event.id))
      await expect(
        page.getByRole('button', { name: `从本章进入专题：${topic.name}`, exact: true }),
      ).toHaveCount(0)
      await page.getByRole('button', { name: '标记本章已读', exact: true }).click()
      const activeMap =
        (await page.locator('.atlas-app').getAttribute('data-visualization')) === 'map'
      if (compact && activeMap) await setSheet(page, 'split')
      const next = activeMap ? '专题下一章' : '下一章'
      await page.getByRole('button', { name: next, exact: true }).click()
      await expect(page).toHaveURL(recordPath('events', topic.steps[chapter + 1]))
      await reloadExploration(page)
      if (compact) await setSheet(page, 'reading')
      await expect(page.locator('.topic-chapter-context')).toContainText(`第 ${chapter + 2} /`)
      await page.getByRole('button', { name: '专题导读与目录', exact: true }).click()
      if (compact) await setSheet(page, 'reading')
      await expect(page.locator('.topic-introduction h2')).toHaveText(topic.name)
      await expect
        .poll(() =>
          page.evaluate(
            (id) =>
              JSON.parse(localStorage.getItem('time-atlas:reading:v2') ?? '{}').topics?.[id]
                ?.readEventIds,
            topic.id,
          ),
        )
        .toContain(event.id)
      const index = page.locator('.topic-related-events details')
      if (['writing-and-knowledge', 'observing-sky-measuring-position'].includes(topic.id))
        await expect(index).toHaveCount(0)
      else {
        await index.locator('summary').click()
        await expect(index.locator(`[data-event-id="${event.id}"]`)).toContainText('已读')
        await expect(index.locator('.topic-chapter-list li')).toHaveCount(topic.steps.length)
      }
      const source = page.locator('.topic-introduction .reference-list a').first()
      await source.scrollIntoViewIfNeeded()
      await expect(source).toBeInViewport({ ratio: 1 })
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        width,
      )
      await page.screenshot({ path: info.outputPath(`topic-reading-${topic.id}-${width}.png`) })
    })
  }
}
