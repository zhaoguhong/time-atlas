import { expect, test, type Page } from '@playwright/test'
import { setSheet } from './mobile-sheet-helpers'
import { readingSourceUrl } from '../src/lib/source-links'
import { placeReading } from '../src/data/place-reading'

const sourceIndex = (url: URL) =>
  /\/reading-sources(?:-[^/]+)?\.json$/.test(url.pathname) &&
  !url.searchParams.has('url') &&
  !url.searchParams.has('import')
const pendingNote = '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。'
const tangSource = readingSourceUrl('https://zh.wikisource.org/wiki/舊唐書/卷1')
const xuanwuSource = readingSourceUrl('https://zh.wikipedia.org/wiki/玄武门之变')

async function readOnMobile(page: Page) {
  if (page.viewportSize()!.width <= 700) await setSheet(page, 'reading')
}

for (const [width, height] of [
  [1440, 900],
  [390, 844],
]) {
  test(`shows pending source notes beside event and person references at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    let indexRequests = 0
    page.on('request', (request) => {
      if (sourceIndex(new URL(request.url()))) indexRequests++
    })
    for (const fixture of [
      {
        hash: 'year=-7000&event=region-mehrgarh-farming',
        panel: '.event-detail',
        title: '大英百科全书 · 梅赫尔格尔的农耕与定居生活',
      },
      {
        hash: 'year=1324&person=region-person-musa',
        panel: '.person-detail',
        title: '大英百科全书 · 曼萨·穆萨',
      },
    ]) {
      await page.goto(`/#${fixture.hash}`)
      await readOnMobile(page)
      const references = page.locator(`${fixture.panel} .reference-list`)
      const note = references.getByText(pendingNote, { exact: true })
      await note.scrollIntoViewIfNeeded()
      await expect(note).toBeInViewport({ ratio: 1 })
      const link = references.getByRole('link', { name: fixture.title, exact: true })
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      const box = (await note.boundingBox())!
      expect(box.x).toBeGreaterThanOrEqual(0)
      expect(box.x + box.width).toBeLessThanOrEqual(width)
      await page.screenshot({
        path: info.outputPath(`source-note-${fixture.panel.slice(1)}-${width}.png`),
      })
    }
    expect(indexRequests, 'individual reading must not fetch the aggregate source index').toBe(0)
  })

  test(`restores period references from the deferred source index at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    let indexRequests = 0
    page.on('request', (request) => {
      if (sourceIndex(new URL(request.url()))) indexRequests++
    })
    await page.goto('/#year=750&view=overview')
    await readOnMobile(page)
    const overview = page.locator('.period-overview')
    await expect(overview).toContainText('代表年份：公元 750 年')
    const reference = overview.locator(`.reference-list a[href="${tangSource}"]`)
    await reference.scrollIntoViewIfNeeded()
    await expect(reference).toBeInViewport({ ratio: 1 })
    expect(indexRequests).toBe(1)
    const more = overview.getByRole('button', { name: /^显示其余 \d+ 条来源$/ })
    await more.click()
    await expect(overview.locator(`.reference-list a[href="${xuanwuSource}"]`)).toBeAttached()
    await expect(more).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    )
    await page.screenshot({ path: info.outputPath(`period-sources-${width}.png`) })
  })

  test(`retains place references and retries failed event sources at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    let attempts = 0
    await page.route(sourceIndex, async (route) => {
      attempts++
      if (attempts === 1) await route.fulfill({ status: 503, body: 'Unavailable' })
      else await route.continue()
    })
    await page.goto('/#year=626&place=changan&view=places')
    await readOnMobile(page)
    const archive = page.locator('.place-detail')
    await expect(archive.locator('h2')).toHaveText('长安 / 西安')
    const references = archive.locator('.reference-list')
    const ownSource = readingSourceUrl(placeReading.changan.sources[0].url)
    await expect(references.locator(`a[href="${ownSource}"]`)).toBeAttached()
    await expect(references.getByRole('alert')).toContainText('事件参考资料暂未加载')
    const retry = references.getByRole('button', { name: '重新加载参考资料', exact: true })
    await retry.click()
    await expect(references.getByRole('alert')).toHaveCount(0)
    await expect(references.getByRole('status')).toHaveCount(0)
    await references.getByRole('button', { name: /^显示其余 \d+ 条来源$/ }).click()
    const eventReference = references.locator(`a[href="${xuanwuSource}"]`)
    await eventReference.scrollIntoViewIfNeeded()
    await expect(eventReference).toBeInViewport({ ratio: 1 })
    await expect(references.locator(`a[href="${ownSource}"]`)).toHaveCount(1)
    expect(attempts).toBe(2)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    )
    await page.screenshot({ path: info.outputPath(`place-sources-retry-${width}.png`) })
  })
}
