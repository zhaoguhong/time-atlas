import { expect, test } from '@playwright/test'
import { articleSlugs } from '../src/data/article-slugs'
import { setSheet } from './mobile-sheet-helpers'
const articleCount = Object.keys(articleSlugs).length

for (const [width, height] of [
  [1440, 900],
  [390, 844],
  [844, 390],
]) {
  test(`专题连续阅读、地图入口与分类 ${width}x${height}`, async ({ page }, info) => {
    await page.setViewportSize({ width, height })
    const compact = width <= 700 || height <= 540
    await page.goto('/#tour=grand-canal&step=-1')
    if (compact) await setSheet(page, 'reading')
    await page.getByRole('button', { name: '返回专题文章', exact: true }).click()
    const article = page.getByRole('region', { name: '专题讲解' })
    await expect(article).toContainText('元代大都为什么同时需要海运和内河')
    await expect(article).toContainText('明迁北京，南方供给成为北方都城的日常')
    const mapStop = article.locator('.topic-event-link[data-event-id="huitong-canal"]')
    await mapStop.scrollIntoViewIfNeeded()
    await expect(mapStop).toBeInViewport()
    await page.screenshot({ path: info.outputPath(`topic-article-${width}.png`) })
    await mapStop.click()
    if (compact) await setSheet(page, 'reading')
    await expect(page.locator('.event-detail h2')).toHaveText('元开凿会通河')
    await expect(page.locator('.topic-chapter-context')).toContainText('第 12 / 17 章')
    await page.getByRole('button', { name: '专题导读与目录', exact: true }).click()
    await expect(article).toContainText('元代大都为什么同时需要海运和内河')
    await page.goto('/topics/state-and-markets/')
    if (compact) await setSheet(page, 'reading')
    await expect(page.locator('.topic-introduction h2')).toHaveText(
      '青苗钱：北宋官府为什么要给农户放贷',
    )
    await expect(article).toContainText('谁想借，谁被催着借')
    await expect(page.locator('.topic-chapter-list li')).toHaveCount(0)
    await expect(page.getByRole('button', { name: '查看专题地点', exact: true })).toHaveCount(0)
    await expect(page.getByRole('button', { name: '开始地图学习', exact: true })).toHaveCount(0)
    await page.screenshot({ path: info.outputPath(`new-topic-${width}.png`) })
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    )
    // Explicitly leave the topic; directory classification does not alter event categories.
    await page.goto('/')
    const direct = page.locator('.main-nav').getByRole('button', { name: '历史专题', exact: true })
    if (await direct.isVisible()) await direct.click()
    else {
      await page.getByRole('button', { name: '更多操作', exact: true }).click()
      await page.getByRole('button', { name: '历史专题', exact: true }).last().click()
    }
    if (compact) await setSheet(page, 'reading')
    const filter = page.getByLabel('专题分类')
    await filter.selectOption('国家与社会')
    await expect(page.locator('.tour-card')).toHaveCount(3)
    await expect(page.locator('.tours-panel')).toContainText('青苗钱：北宋官府为什么要给农户放贷')
    await filter.selectOption('全部')
    await expect(page.locator('.tour-card')).toHaveCount(articleCount)
  })
}

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
  { width: 844, height: 390 },
]) {
  test(`文章目录切换、筛选保持与空结果 ${viewport.width}`, async ({ page }, info) => {
    await page.setViewportSize(viewport)
    await page.goto('/#view=tours')
    const library = page.locator('.topic-directory')
    await expect(library).toBeVisible()
    await expect(page.locator('.atlas-app')).toHaveAttribute('data-topic-reading', 'true')
    await expect(page.getByLabel('专题分类')).toBeVisible()
    if (viewport.width > 700)
      await expect(page.getByRole('group', { name: '按分类浏览专题' })).toBeVisible()
    const search = page.getByRole('searchbox', { name: '搜索历史专题' })
    await search.fill('纸币')
    await expect(page.locator('.tour-card')).toHaveCount(1)
    for (const [label, layout] of [
      ['紧凑列表', 'list'],
      ['分类目录', 'directory'],
      ['图文卡片', 'cards'],
    ]) {
      await page.getByRole('button', { name: label, exact: true }).click()
      await expect(library).toHaveAttribute('data-topic-layout', layout)
      await expect(search).toHaveValue('纸币')
      await expect(page.locator('.tour-card')).toHaveCount(1)
    }
    await page.getByRole('button', { name: '紧凑列表', exact: true }).click()
    await page.reload()
    await expect(library).toHaveAttribute('data-topic-layout', 'list')
    await expect(search).toHaveValue('纸币')
    await page.screenshot({
      path: info.outputPath(`article-library-${viewport.width}.png`),
      fullPage: true,
    })
    await page
      .getByRole('link', { name: '阅读专题：青苗钱：北宋官府为什么要给农户放贷', exact: true })
      .click()
    await expect(page.locator('.topic-introduction h2')).toContainText('青苗钱')
    await page.getByRole('button', { name: '全部专题', exact: true }).click()
    await expect(search).toHaveValue('纸币')
    await search.fill('这里没有匹配的专题名称')
    await expect(page.locator('.tour-card')).toHaveCount(0)
    await expect(library).toContainText('没有找到')
    await search.fill('')
    await expect(page.locator('.tour-card')).toHaveCount(articleCount)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      viewport.width,
    )
  })

  test(`文章段落恢复、地图返回与收藏 ${viewport.width}`, async ({ page }, info) => {
    await page.setViewportSize(viewport)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/topics/state-and-markets/')
    const panel = page.locator('#history-reading-content')
    const article = page.getByRole('region', { name: '专题讲解' })
    await expect(article).toContainText('谁想借，谁被催着借')
    const contents = page.getByRole('navigation', { name: '文章目录', exact: true })
    if (viewport.width <= 900)
      await contents.getByRole('button', { name: '文章目录', exact: true }).click()
    await contents.getByRole('button', { name: '谁想借，谁被催着借', exact: true }).click()
    await expect(article.getByRole('heading', { name: '谁想借，谁被催着借' })).toBeInViewport()
    if (viewport.width <= 900) {
      const heading = article.getByRole('heading', { name: '谁想借，谁被催着借' })
      await expect
        .poll(async () => {
          const titleBox = await heading.boundingBox()
          const menuBox = await contents.boundingBox()
          return titleBox!.y - (menuBox!.y + menuBox!.height)
        })
        .toBeGreaterThanOrEqual(0)
    }
    const before = await panel.evaluate((element) => element.scrollTop)
    expect(before).toBeGreaterThan(200)
    await expect
      .poll(() =>
        page.evaluate(
          () =>
            JSON.parse(
              localStorage.getItem('time-atlas:topic-article:v7:tax-money-markets') ?? 'null',
            )?.block,
        ),
      )
      .toBeTruthy()
    await page.reload()
    await expect
      .poll(() => panel.evaluate((element) => element.scrollTop))
      .toBeGreaterThan(before - 5)
    await page.getByRole('button', { name: '收藏专题', exact: true }).click()
    await expect(page.getByRole('button', { name: '取消收藏专题', exact: true })).toBeVisible()
    await page.reload()
    await expect(page.getByRole('button', { name: '取消收藏专题', exact: true })).toBeVisible()
    await page.goto('/#view=saved')
    if (viewport.width <= 700 || viewport.height <= 540) await setSheet(page, 'reading')
    await page
      .getByRole('button', { name: /青苗钱：北宋官府为什么要给农户放贷.*国家与社会/ })
      .click()
    await expect(page.locator('.topic-introduction h2')).toContainText('青苗钱')
    await page.goto('/topics/silk-road/#year=741')
    const mapStop = article.locator('.topic-event-link[data-event-id="hexi"]')
    await mapStop.scrollIntoViewIfNeeded()
    const mapPosition = await panel.evaluate((element) => element.scrollTop)
    await mapStop.click()
    await expect(page.locator('.event-detail h2')).toContainText('河西')
    await expect(page.locator('.map-canvas')).toHaveCount(0)
    await page.locator('.main-nav').getByRole('button', { name: '地图', exact: true }).click()
    await expect(page.locator('.atlas-app')).toHaveAttribute('data-topic-reading', 'false')
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-map-year', '-121')
    await page.getByRole('button', { name: '专题导读与目录', exact: true }).click()
    await expect(page.locator('.atlas-app')).toHaveAttribute('data-topic-reading', 'true')
    await expect
      .poll(() => panel.evaluate((element) => element.scrollTop))
      .toBeGreaterThan(mapPosition - 5)
    await expect(mapStop).toBeInViewport()
    await page.screenshot({
      path: info.outputPath(`article-reader-${viewport.width}.png`),
      fullPage: true,
    })
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      viewport.width,
    )
  })
}

test('新增文章具备独立正文、小节、相关史事与来源', async ({ page }) => {
  for (const [id, title] of [
    ['rivers-and-cities', '江南的粮怎样运到北京'],
    ['books-and-society', '868年的《金刚经》是怎样印成的'],
  ]) {
    await page.goto(`/topics/${id}/`)
    await expect(page.locator('.topic-introduction h2')).toHaveText(title)
    await expect(page.getByRole('region', { name: '专题讲解' })).toBeVisible()
    expect(await page.locator('.topic-article h3').count()).toBeGreaterThan(1)
    await expect(page.locator('.topic-chapter-list li')).toHaveCount(
      id === 'books-and-society' ? 0 : 17,
    )
    await expect(page.locator('#topic-sources a').first()).toHaveAttribute('href', /^https:/)
  }
})

test('手机长文旋转保留正文，切回地图后恢复画布', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/topics/books-and-society/')
  const panel = page.locator('#history-reading-content')
  const paragraph = page.locator('.topic-article p').nth(7)
  await paragraph.scrollIntoViewIfNeeded()
  // A sliver of the preceding paragraph can remain below the sticky menu.
  // Synchronize the actual scroll event before rotating the viewport.
  await paragraph.evaluate(async (element) => {
    const container = element.closest('.panel-scroll')!
    const delta = element.getBoundingClientRect().top - container.getBoundingClientRect().top - 72
    if (Math.abs(delta) < 1) return
    await new Promise<void>((resolve) => {
      container.addEventListener('scroll', () => resolve(), { once: true })
      container.scrollTop += delta
    })
  })
  await expect.poll(() => panel.evaluate((element) => element.scrollTop)).toBeGreaterThan(300)
  const before = await paragraph.boundingBox()
  await page.setViewportSize({ width: 844, height: 390 })
  await expect
    .poll(async () => {
      const contents = (await page.locator('.topic-contents').boundingBox())!
      return (await paragraph.boundingBox())!.y - contents.y - contents.height
    })
    .toBeGreaterThanOrEqual(0)
  await expect
    .poll(async () => Math.abs((await paragraph.boundingBox())!.y - before!.y))
    .toBeLessThan(30)
  await page.locator('.main-nav').getByRole('button', { name: '地图', exact: true }).click()
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-topic-reading', 'false')
  await expect(page.locator('.map-canvas')).toBeVisible()
  await expect(page.locator('.topic-reader-layout')).toHaveCount(0)
  await page.locator('.main-nav').getByRole('button', { name: '历史专题', exact: true }).click()
  await expect(page.locator('.topic-directory')).toBeVisible()
})

test('桌面文章切回地图不把文章挤进侧栏', async ({ page }) => {
  await page.goto('/topics/silk-road/')
  await expect(page.locator('.topic-introduction h2')).toContainText('丝绸之路')
  await page.locator('.main-nav').getByRole('button', { name: '地图', exact: true }).click()
  await expect(page.locator('.map-canvas')).toBeVisible()
  await expect(page.locator('.topic-reader-layout')).toHaveCount(0)
  await page.locator('.main-nav').getByRole('button', { name: '历史专题', exact: true }).click()
  await expect(page.locator('.topic-directory')).toBeVisible()
})

test('从目录进入文章后返回原列表位置', async ({ page }) => {
  await page.goto('/#view=tours')
  const card = page.locator('.tour-card').last()
  await card.scrollIntoViewIfNeeded()
  const title = await card.getAttribute('aria-label')
  const panel = page.locator('#history-reading-content')
  const before = await panel.evaluate((element) => element.scrollTop)
  await card.click()
  await expect(page.locator('.topic-reader-layout')).toBeVisible()
  await page.getByRole('button', { name: '全部专题', exact: true }).click()
  await expect(page.locator('.topic-directory')).toBeVisible()
  await expect
    .poll(async () => Math.abs((await panel.evaluate((element) => element.scrollTop)) - before))
    .toBeLessThan(5)
  await expect(page.getByRole('link', { name: title!, exact: true })).toBeInViewport()
})
