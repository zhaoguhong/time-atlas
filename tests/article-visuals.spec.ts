import { articleSlugs } from '../src/data/article-slugs'
import { expect, test, type Locator } from '@playwright/test'
import { articleGroups } from '../src/data/article-groups'

async function openChapterMap(map: Locator) {
  const open = map.getByRole('button', { name: /^展开地图：/ })
  await open.scrollIntoViewIfNeeded()
  await expect(open).toBeVisible()
  await expect(open).toHaveAttribute('aria-expanded', 'false')
  await expect(open).toHaveText(/公元.*年.*展开地图/)
  await expect(map.locator('canvas')).toHaveCount(0)
  await open.click()
  await expect(map.getByRole('button', { name: /^收起地图：/ })).toHaveAttribute(
    'aria-expanded',
    'true',
  )
  await expect(map.locator('.topic-inline-map')).toHaveAttribute('data-ready', 'true')
  await expect(map.locator('canvas')).toBeVisible()
}

const pilots = ['silk-road', 'age-of-exploration', 'buddhist-texts-and-networks', 'porcelain-world']
for (const width of [1440, 390]) {
  for (const id of pilots)
    test(`专题配图与按需展开的章节地图 ${id} ${width}`, async ({ page }, info) => {
      await page.setViewportSize({ width, height: 900 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      await page.goto(`/topics/${articleSlugs[id]}/#year=741&scope=nearby&category=战争`)
      await expect(page.locator('.topic-introduction h2')).toBeVisible()
      const address = page.url()
      const figures = page.locator('.topic-article-figure')
      expect(await figures.count()).toBeGreaterThan(0)
      for (const figure of await figures.all()) {
        await figure.scrollIntoViewIfNeeded()
        await expect
          .poll(() =>
            figure
              .locator('.topic-image-preview img')
              .evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0),
          )
          .toBe(true)
        await expect(figure.locator('figcaption')).not.toBeEmpty()
      }
      const maps = page.locator('.topic-map-figure')
      expect(await maps.count()).toBeGreaterThan(0)
      for (const map of await maps.all()) {
        await openChapterMap(map)
        expect(
          (await map.locator('.topic-inline-map-canvas').boundingBox())!.height,
        ).toBeGreaterThanOrEqual(300)
        await expect(map.locator('.maplibregl-ctrl-attrib')).toBeVisible()
      }
      await expect(page).toHaveURL(address)
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        width,
      )
      expect(errors).toEqual([])
      await maps.first().scrollIntoViewIfNeeded()
      await expect(maps.first().locator('.topic-inline-map')).toHaveAttribute('data-ready', 'true')
      await page.screenshot({ path: info.outputPath(`${id}-${width}-map.png`) })
      await figures.first().scrollIntoViewIfNeeded()
      await page.screenshot({ path: info.outputPath(`${id}-${width}-image.png`) })
    })
}

const canonicalTopics = articleGroups.map(([id]) => id)
for (const width of [1440, 320]) {
  test(`全部专题目录封面 ${width}`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 })
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto('/#view=tours')
    await expect(page.locator('.topic-cover-image')).toHaveCount(articleGroups.length)
    for (const cover of await page.locator('.topic-cover-image').all()) {
      await cover.scrollIntoViewIfNeeded()
      await expect
        .poll(() => cover.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0))
        .toBe(true)
    }
    await page.locator('.tour-card').first().scrollIntoViewIfNeeded()
    await page.screenshot({ path: info.outputPath(`directory-${width}.png`) })
    expect(errors).toEqual([])
  })
  for (const id of canonicalTopics) {
    test(`专题正文配图与地图放大返回 ${id} ${width}`, async ({ page }, info) => {
      await page.setViewportSize({ width, height: 900 })
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      await page.goto(`/topics/${articleSlugs[id]}/`)
      await expect(page.locator('.topic-introduction h2')).toBeVisible()
      const figures = page.locator('.topic-article-figure')
      expect(await figures.count(), id).toBeGreaterThan(0)
      for (const figure of await figures.all()) {
        await figure.scrollIntoViewIfNeeded()
        await expect
          .poll(() =>
            figure
              .locator('.topic-image-preview img')
              .evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0),
          )
          .toBe(true)
      }
      for (const map of await page.locator('.topic-map-figure').all()) {
        await openChapterMap(map)
        expect(
          (await map.locator('.topic-inline-map-canvas').boundingBox())!.height,
        ).toBeGreaterThanOrEqual(260)
        const enlarge = map.locator('.topic-map-enlarge')
        await enlarge.click()
        const dialog = page.getByRole('dialog')
        await expect(dialog).toBeVisible()
        await expect(dialog.locator('.topic-inline-map')).toHaveAttribute('data-ready', 'true')
        await expect(dialog.locator('canvas')).toBeVisible()
        await dialog.getByRole('button', { name: '关闭地图，返回文章', exact: true }).click()
        await expect(dialog).toHaveCount(0)
        await expect(enlarge).toBeFocused()
        await expect(map.locator('.topic-inline-map')).toHaveAttribute('data-ready', 'true')
        await map.getByRole('button', { name: /^收起地图：/ }).click()
        await expect(map.locator('canvas')).toHaveCount(0)
      }
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        id,
      ).toBeLessThanOrEqual(width)
      await figures.first().scrollIntoViewIfNeeded()
      await page.screenshot({ path: info.outputPath(`${id}-${width}-all.png`) })
      expect(errors).toEqual([])
    })
  }
}

test('夜间图文、地图与断图后的重试', async ({ page }, info) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.route('**/images/articles/met-202581.jpg', (route) => route.abort())
  await page.goto('/topics/porcelain-world/')
  const figure = page.locator('[data-article-block="media-met-202581"]')
  await figure.scrollIntoViewIfNeeded()
  await expect(figure.getByRole('status')).toBeVisible()
  await expect(page.getByRole('region', { name: '专题讲解' })).toContainText('葡萄牙王室纹章')
  await page.unroute('**/images/articles/met-202581.jpg')
  await figure.getByRole('button', { name: '重新加载图片' }).click()
  await expect
    .poll(() => figure.locator('img').evaluate((img: HTMLImageElement) => img.naturalWidth))
    .toBeGreaterThan(0)
  await page.evaluate(() => {
    document.documentElement.dataset.colorMode = 'dark'
  })
  const map = page.locator('.topic-map-figure')
  await openChapterMap(map)
  await page.screenshot({ path: info.outputPath('dark-mobile-map.png') })
  await figure.scrollIntoViewIfNeeded()
  await page.screenshot({ path: info.outputPath('dark-mobile-image.png') })
})
