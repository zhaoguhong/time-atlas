import { setSheet } from './mobile-sheet-helpers'
import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
const peopleCount = JSON.parse(readFileSync('public/data/coverage.json', 'utf8')).people.total

const searchName = '搜索历史事件、人物或地名'
test.beforeEach(async ({ page }) => {
  await page.goto('/#year=230')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
})

for (const [width, height] of [
  [360, 640],
  [375, 667],
  [390, 844],
  [844, 390],
  [768, 1024],
  [1280, 720],
  [1440, 900],
]) {
  test(`keeps the clock and controls within ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
    await expect(page.getByRole('button', { name: '播放时间', exact: true })).toBeInViewport({
      ratio: 1,
    })
    await expect(page.getByRole('combobox', { name: '切换历史时期' })).toBeInViewport({ ratio: 1 })
    const dimensions = await page.evaluate(() => ({
      w: document.documentElement.scrollWidth,
      h: document.documentElement.scrollHeight,
      vw: innerWidth,
      vh: innerHeight,
    }))
    expect(dimensions.w).toBeLessThanOrEqual(dimensions.vw)
    expect(dimensions.h).toBeLessThanOrEqual(dimensions.vh)
    if (width <= 700 || height <= 540) {
      await setSheet(page, 'reading')
      await expect(page.locator('.map-shell')).toBeHidden()
      await expect(page.locator('.story-panel')).toBeInViewport({ ratio: 1 })
      await setSheet(page, 'map')
      await expect(page.locator('.panel-scroll')).toBeHidden()
      await expect(page.locator('.map-shell')).toBeInViewport({ ratio: 1 })
      await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
      await setSheet(page, 'split')
      await expect(page.locator('.story-panel')).toBeVisible()
    }
  })
}

test('searches all results, prioritizes an exact alias, and supports keyboard selection', async ({
  page,
}) => {
  const search = page.getByRole('combobox', { name: searchName })
  await search.fill('康熙')
  await expect(page.locator('.search-results').getByRole('option').first()).toContainText('康熙帝')
  await search.press('ArrowDown')
  await expect(page.locator('.search-results').getByRole('option').first()).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await search.press('Enter')
  await expect(page.locator('.person-hero h2')).toContainText('康熙帝')
  await expect(page.locator('.search-results')).toBeHidden()
  await search.fill('李')
  const total = Number(
    (await page.locator('.search-results > .eyebrow').innerText()).match(/\d+/)![0],
  )
  expect(total).toBeGreaterThan(12)
  await expect(page.locator('.search-results').getByRole('option')).toHaveCount(12)
  await page.getByRole('button', { name: /继续显示/ }).click()
  await expect(page.locator('.search-results').getByRole('option')).toHaveCount(Math.min(36, total))
  await page.getByRole('button', { name: '清空搜索', exact: true }).click()
  await expect(search).toHaveValue('')
  await expect(page.locator('.search-results')).toBeHidden()
})

test('restores shared topic chapters and clears them on a new hash', async ({ page }) => {
  await page.getByRole('button', { name: '历史专题', exact: true }).click()
  await page.locator('.tour-card').filter({ hasText: '两次鸦片战争与条约体系' }).click()
  await page.getByRole('button', { name: '开始地图学习', exact: true }).click()
  await page.getByRole('button', { name: '专题下一章', exact: true }).click()
  await expect(page).toHaveURL(/tour=opium-wars&step=1/)
  await page.reload()
  await expect(page.locator('.topic-chapter-context')).toContainText('第 2 / 8 章')
  await expect(page.locator('.event-detail h2')).toHaveText('第一次鸦片战争开始')
  await expect(page.locator('.topic-marker.selected[data-visible="true"]')).toBeVisible()
  await page.getByRole('button', { name: '专题导读与目录', exact: true }).click()
  await page.reload()
  await expect(page.locator('.topic-introduction h2')).toHaveText('两次鸦片战争与条约体系')
  await page.evaluate(() => {
    location.hash = 'year=750'
  })
  await expect(page.locator('.tour-banner')).toBeHidden()
  await expect(page.locator('.topic-introduction')).toBeHidden()
  await expect(page.locator('.year-title')).toContainText('750')
})

test('makes verified journeys discoverable and describes an empty filter honestly', async ({
  page,
}) => {
  await page.locator('.panel-tabs').getByRole('button', { name: '人物', exact: true }).click()
  await page.getByRole('button', { name: '可播放行迹', exact: true }).click()
  await expect(page.locator('.person-list-card')).toHaveCount(3)
  await expect(page.locator('.person-list-card')).toContainText(['诸葛亮', '康熙帝', '苏轼'])
  await page.getByRole('textbox', { name: '筛选人物', exact: true }).fill('未收录测试')
  await expect(page.locator('.empty-state')).toContainText('当前筛选下没有匹配的人物')
  await page.getByRole('button', { name: '查看全部人物', exact: true }).click()
  await expect(page.locator('.catalog-count')).toContainText(String(peopleCount))
})

test('mobile layers reveal all polities, close on Escape, and restore map after reading', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.getByRole('combobox', { name: '切换历史时期' }).selectOption('qing')
  await page.getByRole('button', { name: '地图图层', exact: true }).click()
  await expect(page.locator('.layers-popover')).toBeInViewport({ ratio: 1 })
  expect(await page.locator('.layer-polities button').count()).toBeGreaterThan(4)
  await page.keyboard.press('Escape')
  await expect(page.locator('.layers-popover')).toBeHidden()
  await setSheet(page, 'reading')
  await expect(page.locator('.dynasty-detail h2')).toBeInViewport()
  await setSheet(page, 'map')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
})

test('small phone journey labels and clock remain visible during playback', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  const search = page.getByRole('combobox', { name: searchName })
  await search.fill('苏轼')
  await search.press('Enter')
  await page.getByRole('button', { name: /在地图上看人物经历/ }).click()
  await expect(page.locator('.journey-marker.selected[data-visible="true"]')).toBeVisible()
  await setSheet(page, 'map')
  await page.getByRole('combobox', { name: '播放速度' }).selectOption('3')
  await page.getByRole('button', { name: '播放时间', exact: true }).click()
  await expect(page.locator('.journey-traveler')).toHaveAttribute('data-playing', 'true')
  await expect(page.locator('.year-title')).not.toContainText('1037')
  await page.getByRole('button', { name: '暂停时间播放', exact: true }).click()
  await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
  await search.fill('苏轼')
  await search.press('Enter')
  await expect(page.locator('.person-biography p')).toHaveCount(3)
  await expect(page.locator('.journey-toolbar')).toBeHidden()
})

test('plays topic chapters without losing the topic and stops at its final chapter', async ({
  page,
}) => {
  await page.getByRole('button', { name: '历史专题', exact: true }).click()
  await page.locator('.tour-card').filter({ hasText: '两次鸦片战争与条约体系' }).click()
  await page.getByRole('combobox', { name: '播放速度', exact: true }).selectOption('20')
  await page.getByRole('button', { name: '播放专题', exact: true }).click()
  await expect(page.locator('.topic-chapter-context')).toContainText('第 2 / 8 章')
  await page.getByRole('button', { name: '暂停专题播放', exact: true }).click()
  await expect(page.locator('.tour-banner')).toBeVisible()
  const paused = await page.locator('.tour-number').innerText()
  await page.waitForTimeout(750)
  await expect(page.locator('.tour-number')).toHaveText(paused)
  await page.getByRole('button', { name: '播放专题', exact: true }).click()
  await expect(page.locator('.topic-chapter-context')).toContainText('第 8 / 8 章', {
    timeout: 10000,
  })
  await expect(page.getByRole('button', { name: '播放专题', exact: true })).toBeVisible()
  await expect(page.locator('.year-title')).toContainText('1860')
  await expect(page).toHaveURL(/tour=opium-wars&step=7/)
})

test('retains the current topic label after resizing to a small phone', async ({ page }) => {
  await page.getByRole('button', { name: '历史专题', exact: true }).click()
  await page.locator('.tour-card').filter({ hasText: '两次鸦片战争与条约体系' }).click()
  await page.locator('.topic-chapter-list li').nth(6).getByRole('button').click()
  await expect(page.locator('.topic-marker.selected[data-visible="true"]')).toBeVisible()
  await page.setViewportSize({ width: 375, height: 667 })
  await expect(page.locator('.topic-marker.selected[data-visible="true"]')).toBeVisible()
  // ResizeObserver and MapLibre arrange captions on the next animation frame.
  await expect
    .poll(() =>
      page.evaluate(() => {
        const a = document.querySelector('.topic-marker.selected')!.getBoundingClientRect()
        const b = document.querySelector('.tour-banner')!.getBoundingClientRect()
        return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
      }),
    )
    .toBe(false)
})

test('mobile event filters change the map data and keep an event title in the first screen', async ({
  page,
}) => {
  await page.setViewportSize({ width: 469, height: 777 })
  await setSheet(page, 'split')
  await page.getByRole('combobox', { name: '筛选事件时间范围' }).selectOption('period')
  await page.getByRole('combobox', { name: '筛选事件类别' }).selectOption('战争')
  await expect(page.locator('.event-card .category-badge').first()).toHaveText('战争')
  await expect(page.locator('.event-card h3').first()).toBeInViewport({ ratio: 1 })
})
