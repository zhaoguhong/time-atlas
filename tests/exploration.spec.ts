import { setSheet } from './mobile-sheet-helpers'
import { test, expect, type Page } from '@playwright/test'

async function search(page: Page, text: string) {
  await page.getByRole('combobox', { name: '搜索历史事件、人物或地名' }).fill(text)
  await page.locator('.search-results [role="option"]').first().click()
}

test('returns to a person with scroll position and supports browser forward', async ({ page }) => {
  await page.goto('/#year=1082')
  await search(page, '苏轼')
  const event = page.locator('.person-events button').first()
  await event.scrollIntoViewIfNeeded()
  const top = await page.locator('.panel-scroll').evaluate((element) => element.scrollTop)
  await event.click()
  await expect(page.locator('.event-detail h2')).toBeVisible()
  await page.reload()
  await page.getByRole('button', { name: '返回人物', exact: true }).click()
  await expect(page.locator('.person-hero h2')).toHaveText(/苏轼/)
  await expect
    .poll(() => page.locator('.panel-scroll').evaluate((element) => element.scrollTop))
    .toBeCloseTo(top, 0)
  await page.goForward()
  await expect(page.locator('.event-detail h2')).toBeVisible()
})

test('restores list filters and reading position after opening an event', async ({ page }) => {
  await page.goto('/#year=1750&scope=period&category=政治')
  await page.locator('.event-card').nth(12).scrollIntoViewIfNeeded()
  const top = await page.locator('.panel-scroll').evaluate((element) => element.scrollTop)
  await page.locator('.event-card').nth(12).click()
  await page.getByRole('button', { name: '返回列表', exact: true }).click()
  await expect(page.locator('.category-filters button[aria-pressed="true"]')).toHaveText('政治')
  await expect
    .poll(() => page.locator('.panel-scroll').evaluate((element) => element.scrollTop))
    .toBeCloseTo(top, 0)
  await expect(page.locator('.year-title')).toHaveText(/1750/)
})

test('shares category, layers, fixed bounds and custom date range to a fresh context', async ({
  page,
  browser,
}) => {
  await page.goto(
    '/#year=1750&scope=period&category=战争&cities=0&events=1&routes=0&hide=Qing&range=1600,1900&bounds=90,20,130,50',
  )
  await expect(page.locator('.category-filters button[aria-pressed="true"]')).toHaveText('战争')
  const other = await browser.newContext()
  const recipient = await other.newPage()
  await recipient.goto(page.url())
  await recipient.locator('.exploration-filters summary').click()
  await expect(recipient.getByLabel('筛选起始年份')).toHaveValue('1600')
  await expect(recipient.getByLabel('筛选结束年份')).toHaveValue('1900')
  await expect(recipient.locator('.exploration-filters')).toContainText('已固定选取的地理范围')
  await expect(recipient.locator('.category-filters button[aria-pressed="true"]')).toHaveText(
    '战争',
  )
  await expect.poll(() => new URL(recipient.url()).hash).toContain('cities=0')
  await expect(recipient.locator('.city-marker')).toHaveCount(0)
  expect(new URLSearchParams(new URL(recipient.url()).hash.slice(1)).getAll('hide')).toEqual([
    'Qing',
  ])
  await other.close()
})

test('finds topics and stores explicit reading progress across reloads', async ({ page }) => {
  await page.goto('/#year=750')
  await search(page, '安史之乱与唐代转折')
  await expect(page.locator('.topic-introduction h2')).toHaveText('安史之乱与唐代转折')
  await page.getByRole('button', { name: '开始地图学习', exact: true }).click()
  await page.getByRole('button', { name: '专题下一章', exact: true }).click()
  await page.getByRole('button', { name: '标记本章已读', exact: true }).click()
  await page.reload()
  await expect(
    page.getByRole('button', { name: '本章已读 · 取消标记', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: '专题导读与目录', exact: true }).click()
  await expect(page.locator('.topic-introduction')).toContainText('已读 1 /')
  await page.getByRole('button', { name: /继续第 2 章/ }).click()
  await expect(page.locator('.topic-chapter-context')).toContainText('第 2 /')
})

test('opens a place archive, separates verified visits and returns from an event', async ({
  page,
}) => {
  await page.goto('/#year=1069')
  await search(page, '杭州')
  await expect(page.locator('.place-detail h2')).toContainText('杭州')
  await expect(page.locator('.place-visits')).toContainText('苏轼')
  await page.getByLabel('地点档案时期').selectOption('song')
  await page.locator('.place-detail .archive-event-list button').first().click()
  await expect(page.locator('.event-detail h2')).toBeVisible()
  await page.getByRole('button', { name: '返回地点', exact: true }).click()
  await expect(page.getByLabel('地点档案时期')).toHaveValue('song')
  await expect(page.locator('.place-detail h2')).toContainText('杭州')
})

test('reads changes between years and returns to the comparison', async ({ page }) => {
  await page.goto('/#year=755&compare=763&view=comparison')
  await expect(page.locator('.comparison-reading h2')).toHaveText('755—763年')
  await expect(page.locator('.polity-timebands')).toContainText('唐')
  await page.locator('.comparison-reading .archive-event-list button').first().click()
  await page.getByRole('button', { name: '返回对比', exact: true }).click()
  await expect(page.locator('.comparison-reading h2')).toHaveText('755—763年')
})

test('combines place, date and category filters and restores the expanded form', async ({
  page,
}) => {
  await page.goto('/#year=755')
  await page.locator('.category-filters').getByRole('button', { name: '战争', exact: true }).click()
  await page.locator('.exploration-filters summary').click()
  await page.getByLabel('筛选起始年份').fill('755')
  await page.getByLabel('筛选结束年份').fill('763')
  await page.getByRole('button', { name: '应用时间段', exact: true }).click()
  await expect(page.locator('.event-card')).toHaveCount(2)
  await page.getByLabel('筛选事件地点').selectOption('luoyang')
  await expect(page.locator('.event-card')).toHaveCount(1)
  await expect(page.locator('.event-card h3')).toHaveText('安史之乱结束')
  await page.locator('.event-card').click()
  await page.getByRole('button', { name: '返回列表', exact: true }).click()
  await expect(page.locator('.exploration-filters')).toHaveAttribute('open', '')
  await expect(page.getByLabel('筛选事件地点')).toHaveValue('luoyang')
  await expect(page.getByLabel('筛选结束年份')).toHaveValue('763')
  await page.getByRole('button', { name: '仅当年', exact: true }).click()
  await expect(page.getByLabel('筛选起始年份')).toHaveValue('')
})

test('locates a shared place and keeps its label visible after switching phone views', async ({
  page,
}) => {
  await page.goto('/#year=1082&place=hangzhou&view=places')
  await expect(page.locator('.place-focus-label[data-visible="true"]')).toContainText('杭州一带')
  await expect
    .poll(() => Number(new URLSearchParams(new URL(page.url()).hash.slice(1)).get('lng')))
    .toBeCloseTo(120.16, 1)
  await page.setViewportSize({ width: 390, height: 844 })
  await setSheet(page, 'reading')
  await page.getByRole('button', { name: '在地图上查看此地', exact: true }).click()
  await expect(page.locator('.place-focus-label[data-visible="true"]')).toBeInViewport({ ratio: 1 })
})

test('shows one dated pin without invalid positions for a one-year interval', async ({ page }) => {
  await page.goto('/#year=755&range=755,755')
  await expect(page.locator('.time-ticks span')).toHaveCount(1)
  await expect(page.locator('.rail-event')).toHaveCount(1)
  await expect(page.locator('.rail-event')).toBeInViewport({ ratio: 1 })
  await expect(page.locator('.rail-event')).not.toHaveAttribute('style', /NaN|Infinity/)
})

test('plays only filtered event years, stops, and replays from the first', async ({ page }) => {
  await page.goto('/#year=752&range=755,763&category=战争&play=events')
  await page.getByLabel('播放速度', { exact: true }).selectOption('5')
  await page.getByRole('button', { name: '播放时间', exact: true }).click()
  await expect(page.locator('.year-title')).toContainText('755')
  await expect(page.locator('.year-title')).toContainText('763')
  await expect(page.getByRole('button', { name: '播放时间', exact: true })).toBeVisible()
  await page.getByRole('button', { name: '播放时间', exact: true }).click()
  await expect(page.locator('.year-title')).toContainText('755')
  await page.getByRole('button', { name: '暂停时间播放', exact: true }).click()
})

for (const [width, height] of [
  [360, 640],
  [390, 844],
]) {
  test(`makes the first topic immediately readable on ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    await page.goto('/#year=750')
    await page.getByRole('button', { name: '历史专题', exact: true }).click()
    await expect(page.locator('.tour-card h3').first()).toBeInViewport({ ratio: 1 })
    await expect(page.locator('.timeline')).toBeInViewport({ ratio: 1 })
    await page.getByRole('button', { name: '更多操作', exact: true }).click()
    await expect(page.getByRole('button', { name: '分享此刻', exact: true })).toBeInViewport({
      ratio: 1,
    })
    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: '更多操作', exact: true })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    )
  })
}
