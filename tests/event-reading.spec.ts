import { expect, test } from '@playwright/test'
import { setSheet } from './mobile-sheet-helpers'
import { eventNarratives } from '../src/data/event-narratives'

const articles = [
  {
    id: 'chibi',
    year: 208,
    title: '赤壁之战',
    headings: ['从各自应战到联合抗曹', '火攻怎样成为转折'],
    ending: '天下的归属仍要经过多年战争才能确定。',
    source: '《三国志》卷54 · 周瑜、鲁肃、吕蒙传',
  },
  {
    id: 'shangyang',
    year: -356,
    title: '商鞅变法',
    headings: ['让耕作和作战直接关系到个人处境', '改革怎样落到地方', '商鞅的结局与改革的后续'],
    ending: '也有国家权力进入日常生活的深度。',
    source: '《史记》卷5 · 秦本纪',
  },
  {
    id: 'lanting',
    year: 353,
    title: '兰亭雅集与兰亭集序',
    headings: [],
    ending: '看到的也包含后人保存与传递这次雅集的努力。',
    source: '故宫博物院 · 冯承素行书摹兰亭序卷（传统归属及摹本流传）',
  },
]

for (const [width, height] of [
  [1440, 900],
  [390, 844],
  [844, 390],
]) {
  test(`individual event articles stay readable through sources at ${width}x${height}`, async ({
    page,
  }, info) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.setViewportSize({ width, height })
    const mobile = width <= 700 || height <= 540
    for (const article of articles) {
      await page.goto(`/#event=${article.id}&year=${article.year}`)
      const detail = page.locator('.event-detail')
      if (mobile) await setSheet(page, 'reading')
      await expect(detail.getByRole('heading', { name: article.title, exact: true })).toBeVisible()
      const narrative = detail.locator('.event-article')
      await expect(narrative).toContainText(article.ending)
      if (article.headings.length)
        await expect(narrative.getByRole('heading')).toHaveText(article.headings)
      else await expect(narrative.getByRole('heading')).toHaveCount(0)
      await expect(detail.locator('.detail-section')).toHaveCount(0)
      await expect(detail.locator('.reading-status')).toHaveCount(0)
      await page.screenshot({ path: info.outputPath(`${article.id}-start.png`) })

      for (const paragraph of await narrative.locator('.event-article-section p').all()) {
        await paragraph.scrollIntoViewIfNeeded()
        const box = (await paragraph.boundingBox())!
        expect(box.x).toBeGreaterThanOrEqual(0)
        expect(box.x + box.width).toBeLessThanOrEqual(width)
      }
      if (article.id !== 'lanting')
        await expect(narrative.locator('.event-article-note')).toBeVisible()
      const source = detail.getByRole('link', { name: article.source, exact: true })
      await source.scrollIntoViewIfNeeded()
      await expect(source).toBeInViewport({ ratio: 1 })
      await expect(source).toHaveAttribute('target', '_blank')
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        width,
      )
      await page.screenshot({ path: info.outputPath(`${article.id}-sources.png`) })
    }
    // Reopen another independent article after navigating through the fixtures.
    await page.goto('/#event=chibi&year=208')
    if (mobile) await setSheet(page, 'reading')
    await expect(
      page.locator('.event-detail').getByRole('heading', { name: '赤壁之战', exact: true }),
    ).toBeVisible()
    await expect(page.locator('.event-detail .event-article')).toHaveCount(1)
    expect(errors).toEqual([])
  })
}

const expandedArticles: [string, number][] = [
  ['qin-unifies', -221],
  ['dujiangyan', -256],
  ['zhangqian', -138],
  ['paper', 105],
  ['guandu', 200],
  ['feishui', 383],
  ['an-lushan', 755],
  ['wanganshi', 1069],
  ['zhenghe', 1405],
  ['humen', 1839],
  ['world-hammurabi', -1750],
  ['world-magna-carta', 1215],
  ['world-printing', 1450],
  ['world-columbus', 1492],
  ['world-newton', 1687],
  ['world-industrial', 1760],
  ['world-french-revolution', 1789],
  ['world-american-independence', 1776],
  ['world-darwin', 1859],
  ['modern-apollo11', 1969],
]

for (const [width, height] of [
  [1440, 900],
  [390, 844],
]) {
  for (let start = 0; start < expandedArticles.length; start += 5) {
    test(`expanded articles ${start + 1}–${start + 5} load through their sources at ${width}x${height}`, async ({
      page,
    }, info) => {
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      await page.setViewportSize({ width, height })
      for (const [id, year] of expandedArticles.slice(start, start + 5)) {
        await page.goto(`/#visual=pillar&event=${id}&year=${year}`)
        if (width <= 700) await setSheet(page, 'reading')
        const detail = page.locator('.event-detail')
        const narrative = detail.locator('.event-article')
        const expected = eventNarratives[id]
        const paragraphs = expected.narrative.sections.flatMap((section) => section.paragraphs)
        await expect(narrative).toContainText(paragraphs[0])
        await expect(narrative).toContainText(paragraphs.at(-1)!)
        await expect(detail.locator('.detail-section')).toHaveCount(0)
        await expect(detail.locator('.reading-status')).toHaveCount(0)
        const lastParagraph = narrative.locator('.event-article-section p').last()
        await lastParagraph.scrollIntoViewIfNeeded()
        const box = (await lastParagraph.boundingBox())!
        expect(box.x).toBeGreaterThanOrEqual(0)
        expect(box.x + box.width).toBeLessThanOrEqual(width)
        await page.screenshot({ path: info.outputPath(`${id}-body.png`) })
        const source = detail.getByRole('link', { name: expected.sources[0].title, exact: true })
        await source.scrollIntoViewIfNeeded()
        await expect(source).toBeInViewport({ ratio: 1 })
        await expect(source).toHaveAttribute('target', '_blank')
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
          width,
        )
      }
      expect(errors).toEqual([])
    })
  }
}
