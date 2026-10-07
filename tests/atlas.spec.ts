import { setSheet } from './mobile-sheet-helpers'
import { expect, test } from '@playwright/test'
import { tours } from '../src/data/periods'
import { readFileSync } from 'node:fs'
const peopleCount = JSON.parse(readFileSync('public/data/coverage.json', 'utf8')).people.total

for (const topic of tours) {
  test(`reads every chapter of ${topic.name} with the matching historical map`, async ({
    page,
  }) => {
    test.setTimeout(90000)
    await page.getByRole('button', { name: '历史专题', exact: true }).click()
    await expect(page.locator('.tour-card')).toHaveCount(tours.length)
    await page.locator('.tour-card').filter({ hasText: topic.name }).click()
    await expect(page.locator('.topic-introduction h2')).toHaveText(topic.name)
    await expect(page.locator('.topic-introduction h2')).toBeInViewport()
    await expect(page.locator('.topic-chapter-list li')).toHaveCount(topic.steps.length)
    const titles = await page.locator('.topic-chapter-list strong').allTextContents()
    const dates = (await page.locator('.topic-chapter-list small').allTextContents()).map((text) =>
      text.split('·')[0].trim(),
    )
    await expect(page.locator('.tour-number')).toHaveText('导读')
    await page.getByRole('button', { name: '开始地图学习', exact: false }).click()
    for (let index = 0; index < topic.steps.length; index++) {
      await expect(page.locator('.event-detail h2')).toHaveText(titles[index])
      await expect(page.locator('.event-detail h2')).toBeInViewport()
      await expect(page.locator('.year-title')).toHaveText(dates[index])
      await expect(page).toHaveURL(new RegExp(`event=${topic.steps[index]}(?:&|$)`))
      await expect(page.locator('.topic-chapter-context')).toContainText(
        `第 ${index + 1} / ${topic.steps.length} 章`,
      )
      await expect(page.locator('.topic-map-reading')).toContainText(
        topic.chapters![index].mapReading,
      )
      await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
      await expect(page.locator('.topic-marker.selected[data-visible="true"]')).toBeVisible()
      expect(await page.locator('.topic-marker').count()).toBeGreaterThan(0)
      if (index < topic.steps.length - 1) await page.locator('.tour-next').click()
    }
    await page.getByRole('button', { name: '完成旅程', exact: false }).click()
    await expect(page.locator('.topic-introduction h2')).toBeInViewport()
    await page.getByRole('button', { name: '退出导览' }).click()
    await expect(page.locator('.tour-card')).toHaveCount(tours.length)
  })
}

test('opens detailed dynasty reading, filters its chronology and returns from an event', async ({
  page,
}) => {
  await page.locator('.dynasty-strip button').filter({ hasText: '清' }).click()
  await expect(page.locator('.dynasty-detail h2')).toHaveText('清朝')
  await expect(page.locator('.dynasty-reading-section')).toHaveCount(2)
  expect(await page.locator('.dynasty-chronology li').count()).toBeGreaterThan(80)
  await page.getByRole('textbox', { name: '筛选朝代大事' }).fill('鸦片')
  await expect(page.locator('.dynasty-chronology li')).toHaveCount(3)
  const chapter = page
    .locator('.dynasty-chronology button')
    .filter({ hasText: '第二次鸦片战争开始' })
  await chapter.scrollIntoViewIfNeeded()
  const previousScroll = await page
    .locator('.panel-scroll')
    .evaluate((element) => element.scrollTop)
  await chapter.click()
  await expect(page.locator('.event-narrative p')).toHaveCount(2)
  await expect(page.locator('.event-detail')).toContainText('1858年')
  await page.getByRole('button', { name: '返回朝代', exact: true }).click()
  await expect(page.getByRole('textbox', { name: '筛选朝代大事' })).toHaveValue('鸦片')
  await expect
    .poll(() => page.locator('.panel-scroll').evaluate((element) => element.scrollTop))
    .toBeCloseTo(previousScroll, 0)
  await page.getByRole('textbox', { name: '筛选朝代大事' }).fill('洋务')
  await page.locator('.dynasty-chronology li button').click()
  await expect(page.locator('.event-narrative')).toContainText('1894')
  await page.locator('.related-people button').filter({ hasText: '李鸿章' }).click()
  await expect(page.locator('.person-biography p')).toHaveCount(2)
})

test('keeps topic context when selecting a map or timeline node', async ({ page }) => {
  await page.getByRole('button', { name: '历史专题', exact: true }).click()
  await page.locator('.tour-card').filter({ hasText: '安史之乱与唐代转折' }).click()
  await page.getByRole('button', { name: '开始地图学习', exact: false }).click()
  const marker = page.locator('.topic-marker[data-visible="true"]').first()
  await marker.click()
  if (await page.locator('.map-event-popup').isVisible())
    await page.locator('.map-event-choice').last().click()
  await expect(page.locator('.topic-chapter-context')).toContainText('安史之乱与唐代转折')
  await expect(page.locator('.tour-banner')).toBeVisible()
  await page.getByRole('button', { name: '专题导读与目录', exact: true }).click()
  await page.locator('.topic-chapter-list li').last().getByRole('button').click()
  await expect(page.locator('.event-detail h2')).toHaveText('唐昭宗被迫迁洛阳')
  await page.getByRole('button', { name: '专题上一章', exact: true }).click()
  await expect(page.locator('.topic-chapter-context')).toContainText('第 7 / 8 章')
})

test('mobile reading, topic navigation and journey activity labels stay usable', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.reload()
  await page.getByRole('combobox', { name: '切换历史时期' }).selectOption('qing')
  await setSheet(page, 'reading')
  await expect(page.locator('.dynasty-detail h2')).toHaveText('清朝')
  await page.getByRole('textbox', { name: '筛选朝代大事' }).fill('甲午')
  expect(await page.locator('.dynasty-chronology li').count()).toBeGreaterThanOrEqual(3)
  await page.getByRole('button', { name: '历史专题', exact: true }).click()
  await page.locator('.tour-card').filter({ hasText: '甲午战争：从朝鲜到威海' }).click()
  await expect(page.locator('.topic-introduction h2')).toBeInViewport()
  await page.getByRole('button', { name: '开始地图学习', exact: false }).click()
  await page.getByRole('button', { name: '专题下一章', exact: true }).click()
  await expect(page.locator('.topic-chapter-context')).toContainText('第 2 / 7 章')
  await expect(page.locator('.event-detail h2')).toBeInViewport()
  await expect(page.locator('.event-detail > .detail-lead')).toBeInViewport({ ratio: 0.5 })
  await expect(page.locator('.topic-marker.selected[data-visible="true"]')).toBeVisible()
  await page.getByRole('combobox', { name: '搜索历史事件、人物或地名' }).fill('苏轼')
  await page
    .locator('.search-results button')
    .filter({ has: page.getByText('苏轼', { exact: true }) })
    .click()
  await expect(page.locator('.person-biography p')).toHaveCount(3)
  await expect(page.locator('.tour-banner')).toHaveCount(0)
  await page.getByRole('button', { name: '在地图上看人物经历', exact: false }).click()
  await expect(page.locator('.journey-marker .journey-node-label').first()).toContainText(
    /出生|任职|居住|出行|到访|逝世/,
  )
  await expect(page.locator('.journey-marker.selected[data-visible="true"]')).toBeVisible()
  await page.getByRole('combobox', { name: '播放速度' }).selectOption('20')
  await page.getByRole('button', { name: '播放时间', exact: true }).click()
  await expect(page.locator('.journey-traveler')).toHaveAttribute('data-playing', 'true')
  expect(
    await page
      .locator('.traveler-body')
      .evaluate((element) => getComputedStyle(element).animationName),
  ).not.toBe('none')
  await expect(page.locator('.journey-active-card h4')).not.toHaveText('出生于眉山')
  await page.getByRole('button', { name: '暂停时间播放' }).click()
  await page.locator('.journey-node-list button').filter({ hasText: '北归途中行至英州' }).click()
  await expect(page.locator('.journey-marker.selected[data-visible="true"]')).toContainText('出行')
  const widths = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }))
  expect(widths.scroll).toBeLessThanOrEqual(widths.viewport)
})

test('keeps the current topic location visible in a short window and returns from a linked person', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 720 })
  await page.getByRole('button', { name: '历史专题', exact: true }).click()
  await page.locator('.tour-card').filter({ hasText: '两次鸦片战争与条约体系' }).click()
  await page.getByRole('button', { name: '开始地图学习', exact: true }).click()
  await expect(page.locator('.topic-marker.selected[data-visible="true"]')).toContainText(
    '虎门销烟',
  )
  await page.getByRole('button', { name: '专题下一章', exact: true }).click()
  await expect(page.locator('.topic-marker.selected[data-visible="true"]')).toContainText(
    '第一次鸦片战争',
  )
  await expect(page.getByRole('button', { name: '历史专题', exact: true })).toHaveClass('active')
  await expect(page.locator('.time-readout .eyebrow')).toContainText('专题时间轴')
  const personLink = page.locator('.related-people button').filter({ hasText: '林则徐' })
  await personLink.scrollIntoViewIfNeeded()
  const previousScroll = await page
    .locator('.panel-scroll')
    .evaluate((element) => element.scrollTop)
  await personLink.click()
  await expect(page.locator('.person-hero h2')).toContainText('林则徐')
  await expect(page.locator('.year-title')).toContainText('1840')
  await page.getByRole('button', { name: '返回事件', exact: true }).click()
  await expect(page.locator('.topic-chapter-context')).toContainText('第 2 / 8 章')
  await expect
    .poll(() => page.locator('.panel-scroll').evaluate((element) => element.scrollTop))
    .toBeCloseTo(previousScroll, 0)
  await expect(
    page.locator('.related-people button').filter({ hasText: '林则徐' }),
  ).toBeInViewport()
})

test.beforeEach(async ({ page }) => {
  await page.goto('/#year=230')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('三国')
  await expect(page.locator('.polity-label').filter({ hasText: '曹魏' })).toBeVisible({
    timeout: 20000,
  })
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true', {
    timeout: 20000,
  })
})

test('loads real map data and preserves chronology when changing periods', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await expect(page.locator('.map-canvas canvas')).toBeVisible()
  await page.getByRole('combobox', { name: '切换历史时期' }).selectOption('han')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('两汉')
  await expect(page.locator('.year-title')).toHaveText(/公元前 100 年/)
  await expect(page.locator('.polity-label').filter({ hasText: '汉朝' }).first()).toBeVisible()
  await page.locator('.dynasty-strip button').filter({ hasText: '唐' }).click()
  await expect(page.locator('.year-title')).toHaveText(/公元 750 年/)
  await expect(page.locator('.polity-label').filter({ hasText: '唐朝' }).first()).toBeVisible()
  expect(errors).toEqual([])
})

test('searches an event, opens a person and returns to the event', async ({ page }) => {
  await page.getByRole('combobox', { name: '搜索历史事件、人物或地名' }).fill('赤壁')
  await page.locator('.search-results button').filter({ hasText: '赤壁之战' }).click()
  await expect(page.locator('.event-detail h2')).toHaveText('赤壁之战')
  await expect(page.locator('.year-title')).toHaveText(/208/)
  await page.locator('.related-people button').filter({ hasText: '周瑜' }).click()
  await expect(page.locator('.person-hero h2')).toContainText('周瑜')
  await page.getByRole('button', { name: '返回事件' }).click()
  await expect(page.locator('.event-detail h2')).toHaveText('赤壁之战')
})

test('persists bookmarks and shows a clear empty year', async ({ page }) => {
  await page.getByRole('combobox', { name: '搜索历史事件、人物或地名' }).fill('诸葛亮')
  await page.locator('.search-results button').filter({ hasText: '诸葛亮' }).first().click()
  await expect(page.locator('.person-hero h2')).toContainText('诸葛亮')
  await page.getByRole('button', { name: '收藏', exact: true }).click()
  await page.reload()
  await page.getByRole('button', { name: '我的收藏' }).click()
  await expect(page.locator('.saved-panel')).toContainText('诸葛亮')
  await page.getByRole('button', { name: '自由探索' }).click()
  await page.getByRole('button', { name: '仅当年' }).click()
  await expect(page.locator('.empty-state')).toContainText('暂未收录事件')
  await page.getByRole('button', { name: '查看这一时期', exact: true }).click()
  await expect(page.locator('.event-card').first()).toBeVisible()
})

test('shows Silk Road nodes only while exploring its guided story', async ({ page }) => {
  await page.getByRole('button', { name: /历史专题/ }).click()
  await page.locator('.tour-card').filter({ hasText: '丝绸之路' }).click()
  await expect(page.locator('.topic-introduction h2')).toContainText('丝绸之路')
  await page.getByRole('button', { name: '开始地图学习', exact: false }).click()
  await expect(page.locator('.event-detail h2')).toHaveText('张骞第一次出使西域')
  await expect(page.locator('.route-note')).toContainText('丝路节点连接示意')
  await page.getByRole('button', { name: '下一站', exact: false }).click()
  await expect(page.locator('.event-detail h2')).toHaveText('河西之战')
  await page.getByRole('button', { name: '退出导览' }).click()
  await expect(page.locator('.tour-banner')).toHaveCount(0)
  await page.getByRole('button', { name: '地图图层', exact: false }).click()
  await expect(page.getByRole('switch', { name: '丝路节点示意' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: '切换丝绸之路图层' })).toHaveCount(0)
  await expect(page.locator('.route-note')).toHaveCount(0)
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-route-rendered', 'false')
})

test('playback advances, pause stops it, and the sources dialog is keyboard accessible', async ({
  page,
}) => {
  await page.getByRole('button', { name: '播放时间', exact: true }).click()
  await expect(page.locator('.year-title')).toContainText('231', { timeout: 5000 })
  await page.getByRole('button', { name: '暂停时间播放' }).click()
  const year = await page.locator('.year-title').textContent()
  await page.waitForTimeout(1100)
  expect(await page.locator('.year-title').textContent()).toBe(year)
  await page.getByRole('button', { name: '数据与来源' }).click()
  await expect(page.locator('dialog')).toBeVisible()
  await expect(page.locator('dialog')).toContainText('CC BY 4.0')
  await page.keyboard.press('Escape')
  await expect(page.locator('dialog')).not.toBeVisible()
})

test('restores event and camera from a shared link', async ({ page }) => {
  await page.goto('/#year=-138&event=zhangqian&lng=96&lat=37&zoom=3.6')
  await expect(page.locator('.event-detail h2')).toHaveText('张骞第一次出使西域')
  await expect(page.locator('.year-title')).toContainText('公元前 138 年')
  await page.reload()
  await expect(page.locator('.event-detail h2')).toHaveText('张骞第一次出使西域')
  await expect(page).toHaveURL(/lng=96/)
})

test('mobile layout stays within the viewport and supports the same detail flow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.reload()
  await expect(page.locator('.year-title')).toBeVisible()
  const width = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }))
  expect(width.scroll).toBeLessThanOrEqual(width.viewport)
  await setSheet(page, 'split')
  await page.locator('.event-card').first().click()
  await expect(page.locator('.event-detail h2')).toBeVisible()
  await page.getByRole('button', { name: '关闭详情' }).click()
  await expect(page.locator('.event-card').first()).toBeVisible()
})

test('drags the timeline and steps between BCE and CE without a year zero', async ({ page }) => {
  const slider = page.getByRole('slider', { name: '拖动历史时间轴' })
  const box = (await slider.boundingBox())!
  await page.mouse.move(box.x + 8 + (box.width - 16) / 6, box.y + 10)
  await page.mouse.down()
  await page.mouse.move(box.x + 8 + (box.width - 16) * 0.75, box.y + 10, { steps: 12 })
  await page.mouse.up()
  const dragged = Number(await slider.inputValue()) + 1
  expect(dragged).toBeGreaterThan(255)
  expect(dragged).toBeLessThan(275)
  await page.locator('.year-title').click()
  await page.getByRole('spinbutton', { name: '输入历史年份' }).fill('-1')
  await page.getByRole('spinbutton', { name: '输入历史年份' }).press('Enter')
  await expect(page.locator('.year-title')).toHaveText(/公元前 1 年/)
  await slider.focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.locator('.year-title')).toHaveText(/公元 1 年/)
  await page.keyboard.press('ArrowLeft')
  await expect(page.locator('.year-title')).toHaveText(/公元前 1 年/)
})

test('uses explicit time scopes and marks future events', async ({ page }) => {
  await expect(page.getByRole('button', { name: '前后5年', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await expect(page.locator('.event-card')).toHaveCount(5)
  await expect(page.locator('.event-card').filter({ hasText: '诸葛亮卒于五丈原' })).toContainText(
    '晚 4 年',
  )
  await page.getByRole('button', { name: '整个时期', exact: true }).click()
  await expect(page.locator('.event-card').first()).toContainText('曹丕建立魏')
  await expect(page).toHaveURL(/scope=period/)
  await page.reload()
  await expect(page.getByRole('button', { name: '整个时期', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
})

test('explains dynasty entry years and starts the chronological learning route separately', async ({
  page,
}) => {
  await page.locator('.dynasty-strip button').filter({ hasText: '唐' }).click()
  await expect(page.locator('.year-title')).toContainText('750')
  await page.getByRole('button', { name: '查看时代背景', exact: true }).click()
  await expect(page.locator('.period-overview')).toContainText('安史之乱')
  await expect(page.locator('.period-overview')).toContainText('代表年份：公元 750 年')
  await expect(page.locator('.overview-steps button').first()).toContainText('618')
  await page
    .locator('.period-overview')
    .getByRole('button', { name: '从开篇学习', exact: true })
    .click()
  await expect(page.locator('.year-title')).toContainText('618')
  await expect(page.locator('.tour-banner')).toContainText('唐 · 从开篇读起')
  await page.getByRole('button', { name: '下一站', exact: false }).click()
  await expect(page.locator('.year-title')).toContainText('626')
})

test('expands crowded timeline nodes and opens their exact event', async ({ page }) => {
  await page.locator('.rail-event.grouped').first().click()
  await expect(page.getByRole('dialog', { name: '时间轴事件列表' })).toBeVisible()
  await page.locator('.timeline-event-choice').filter({ hasText: '刘备在成都称帝' }).click()
  await expect(page.locator('.event-detail h2')).toContainText('刘备在成都称帝')
  await expect(page.locator('.year-title')).toContainText('221')
})

test('renders a reference year and restores comparison from a shared URL', async ({ page }) => {
  await page.getByRole('button', { name: '年份对比', exact: true }).click()
  await page.getByRole('spinbutton', { name: '输入参考年份' }).fill('208')
  await page.getByRole('button', { name: '对照', exact: true }).click()
  await expect(page.locator('.comparison-controls')).toContainText('公元 208 年')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-reference-rendered', 'true')
  await expect(page).toHaveURL(/compare=208/)
  await page.reload()
  await expect(page.getByRole('spinbutton', { name: '输入参考年份' })).toHaveValue('208')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-reference-rendered', 'true')
  await page.getByRole('spinbutton', { name: '输入参考年份' }).fill('0')
  await page.getByRole('button', { name: '对照', exact: true }).click()
  await expect(page.locator('.comparison-controls [role="alert"]')).toContainText('没有0年')
  await page.getByRole('button', { name: '关闭年份对比' }).click()
  await expect(page.locator('.comparison-controls')).toHaveCount(0)
  await expect(page).not.toHaveURL(/compare=/)
})

test('renders sourced person journeys and distinguishes related events from presence', async ({
  page,
}) => {
  await page.getByRole('combobox', { name: '搜索历史事件、人物或地名' }).fill('诸葛亮')
  await page.locator('.search-results button').filter({ hasText: '诸葛亮' }).first().click()
  await page.getByRole('button', { name: '在地图上看人物经历' }).click()
  await expect(page.locator('.journey-toolbar')).toContainText('记录先后')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-trail-rendered', 'true')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-trail-arrows-rendered', 'true')
  await page.locator('.journey-node-list button').filter({ hasText: '驻五丈原' }).click()
  await expect(page.locator('.journey-active-card h4')).toHaveText('驻五丈原、病逝军中')
  await expect(page).toHaveURL(/journey=zhugeliang/)
  await page.locator('.person-events button').filter({ hasText: '诸葛亮第一次北伐' }).click()
  await expect(page.locator('.event-detail h2')).toHaveText('诸葛亮第一次北伐')
  await expect(page.locator('.journey-toolbar')).toHaveCount(0)
})

test('finds Su Shi by alias and preserves yearly journeys, same-year order and shared state', async ({
  page,
}) => {
  await page.getByRole('combobox', { name: '搜索历史事件、人物或地名' }).fill('苏东坡')
  await page.locator('.search-results button').filter({ hasText: '苏轼' }).click()
  await expect(page.locator('.person-detail')).toContainText('眉山')
  await expect(page.locator('.year-title')).toContainText('1037')
  await page.getByRole('button', { name: '在地图上看人物经历' }).click()
  await page.locator('.journey-node-list button').filter({ hasText: '到任湖州' }).click()
  await expect(page.locator('.journey-active-card h4')).toHaveText('到任湖州知州')
  await page.getByRole('button', { name: '下一条人物行迹' }).click()
  await expect(page.locator('.journey-active-card h4')).toHaveText('乌台诗案中入狱')
  await expect(page.locator('.year-title')).toContainText('1079')
  await page.getByRole('slider', { name: '拖动历史时间轴' }).fill('1079')
  await expect(page.locator('.journey-active-card h4')).toHaveText('抵达黄州贬所')
  await expect(page).toHaveURL(/journey=sushi/)
  await page.getByRole('slider', { name: '拖动历史时间轴' }).fill('1082')
  await expect(page.locator('.journey-active-card')).toContainText('不能据此认定苏轼仍在该地')
  await page.locator('.journey-node-list button').filter({ hasText: '抵达惠州' }).click()
  await expect(page.locator('.year-title')).toContainText('1094')
  await expect(page.locator('.journey-active-card')).toContainText('未到任英州')
  await page.locator('.journey-node-list button').filter({ hasText: '渡海抵达儋州' }).click()
  await expect(page.locator('.journey-active-card')).toContainText('1097')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-trail-arrows-rendered', 'true')
  await page.getByRole('button', { name: '查看人物行迹全貌' }).click()
  await expect(page.locator('.journey-marker.selected[data-visible="true"]')).toBeVisible()
  await page.locator('.journey-node-list button').filter({ hasText: '渡海抵达儋州' }).click()
  await expect.poll(async () => new URL(page.url()).hash).toContain('lat=19.75')
  await page.getByLabel('显示后续记录').check()
  await page.reload()
  await expect(page.getByLabel('显示后续记录')).toBeChecked()
  await expect(page.locator('.journey-active-card h4')).toHaveText('渡海抵达儋州')
  await page.getByRole('button', { name: '结束人物轨迹' }).click()
  await expect(page).not.toHaveURL(/journey=/)
})

test('fixes Kangxi’s map period and excludes others’ battlefield and treaty locations', async ({
  page,
}) => {
  await page.getByRole('combobox', { name: '搜索历史事件、人物或地名' }).fill('玄烨')
  await page.locator('.search-results button').filter({ hasText: '康熙帝' }).click()
  await expect(page.locator('.year-title')).toContainText('1654')
  await page.getByRole('button', { name: '在地图上看人物经历' }).click()
  await page.locator('.journey-node-list button').filter({ hasText: '亲赴多伦' }).click()
  await expect(page.locator('.journey-active-card h4')).toHaveText('亲赴多伦会盟')
  const places = await page.locator('.journey-node-list button').allTextContents()
  expect(places.join(' ')).not.toMatch(/台湾|尼布楚|昭莫多/)
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-trail-arrows-rendered', 'true')
  await page.locator('.person-events button').filter({ hasText: '尼布楚' }).click()
  await expect(page.locator('.event-detail h2')).toContainText('尼布楚')
  await expect(page.locator('.journey-toolbar')).toHaveCount(0)
})

test('browses all people, finds literary figures by alias and does not fabricate an unreviewed route', async ({
  page,
}) => {
  await page.getByRole('button', { name: '人物', exact: true }).click()
  await page.getByRole('combobox', { name: '人物库范围' }).selectOption('all')
  await expect(page.locator('.catalog-count')).toContainText(`${peopleCount} 人`)
  await page.getByRole('textbox', { name: '筛选人物' }).fill('苏东坡')
  await expect(page.locator('.person-list-card')).toHaveCount(1)
  await page.locator('.person-list-card').click()
  await expect(page.locator('.person-hero h2')).toContainText('苏轼')
  await page.getByRole('combobox', { name: '搜索历史事件、人物或地名' }).fill('李清照')
  await page.locator('.search-results button').filter({ hasText: '李清照' }).first().click()
  await expect(page.locator('.person-detail .detail-lead')).toContainText('词')
  await expect(page.locator('.person-record-status')).toContainText('尚未整理可绘制的年谱')
  await expect(page.getByRole('button', { name: '在地图上看人物经历' })).toHaveCount(0)
  await expect(page.locator('.reference-list a').first()).toHaveAttribute('href', /^https:/)
})

test('keeps mobile dynasty navigation in the timeline and leaves the map unobstructed', async ({
  page,
}) => {
  await page.setViewportSize({ width: 469, height: 777 })
  await page.reload()
  await setSheet(page, 'split')
  await expect(page.locator('.period-sidebar')).not.toBeVisible()
  const select = page.getByRole('combobox', { name: '切换历史时期' })
  await expect(select).toBeVisible()
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  const bounds = await page.evaluate(() => {
    const canvas = document.querySelector('.map-canvas')!.getBoundingClientRect()
    const selector = document.querySelector('.timeline-period-select')!.getBoundingClientRect()
    const title = document.querySelector('.topbar')!.getBoundingClientRect()
    return {
      height: canvas.height,
      readingHeight: document.querySelector('.panel-scroll')!.getBoundingClientRect().height,
      selectorTop: selector.top,
      canvasBottom: canvas.bottom,
      titleBottom: title.bottom,
      canvasTop: canvas.top,
      scroll: document.documentElement.scrollWidth,
      width: window.innerWidth,
    }
  })
  // Split view reserves useful space for both the map and its reading list.
  expect(bounds.height).toBeGreaterThanOrEqual(160)
  // The sheet handle uses some of the old reader height; verify useful content too.
  expect(bounds.readingHeight).toBeGreaterThan(260)
  await expect(page.locator('.event-card h3').first()).toBeInViewport({ ratio: 1 })
  await expect(page.locator('.event-card p').first()).toBeInViewport({ ratio: 1 })
  expect(bounds.selectorTop).toBeGreaterThan(bounds.canvasBottom)
  expect(bounds.titleBottom).toBeLessThanOrEqual(bounds.canvasTop)
  expect(bounds.scroll).toBeLessThanOrEqual(bounds.width)
  await select.selectOption('tang')
  await expect(page.locator('.year-title')).toContainText('750')
  await expect(page.locator('.map-heading')).toContainText('唐')
})

test('fractional playback retains integer dates and skips year zero', async ({ page }) => {
  await page.goto('/#year=-1')
  await page.getByRole('combobox', { name: '播放速度' }).selectOption('0.25')
  await page.getByRole('button', { name: '播放时间', exact: true }).click()
  await page.waitForTimeout(1100)
  await expect(page.locator('.year-title')).toContainText('公元前 1 年')
  await page.getByRole('combobox', { name: '播放速度' }).selectOption('2')
  await expect(page.locator('.year-title')).toContainText('公元 1 年')
  await page.getByRole('button', { name: '暂停时间播放' }).click()
  await expect(page.locator('.year-title')).not.toContainText('0 年')
})

test('animates every same-year journey record, pauses in place and resumes at another speed', async ({
  page,
}) => {
  await page.goto('/#year=1057&person=sushi&journey=sushi&point=sushi-exam')
  await expect(page.locator('.journey-active-card h4')).toContainText('同科及第')
  const traveler = page.locator('.journey-traveler')
  await expect(traveler).toBeVisible()
  await page.getByRole('button', { name: '播放时间', exact: true }).click()
  await expect(traveler).toHaveAttribute('data-playing', 'true')
  await expect
    .poll(async () => Number(await traveler.getAttribute('data-progress')))
    .toBeGreaterThan(0.1)
  await page.getByRole('button', { name: '暂停时间播放' }).click()
  const progress = Number(await traveler.getAttribute('data-progress'))
  const transform = await traveler.getAttribute('style')
  await page.waitForTimeout(650)
  expect(Number(await traveler.getAttribute('data-progress'))).toBeCloseTo(progress, 3)
  expect(await traveler.getAttribute('style')).toBe(transform)
  await page.getByRole('combobox', { name: '播放速度' }).selectOption('3')
  await page.getByRole('button', { name: '播放时间', exact: true }).click()
  await expect(page.locator('.journey-active-card h4')).toHaveText('返乡为母守丧')
  await page.getByRole('button', { name: '暂停时间播放' }).click()
  await expect(page.locator('.year-title')).toContainText('1057')
  await expect(page).toHaveURL(/point=sushi-mourning/)
})

test('honors reduced motion while preserving journey progress and same-year record order', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#year=1057&person=sushi&journey=sushi&point=sushi-exam')
  const traveler = page.locator('.journey-traveler')
  await expect(traveler).toBeVisible()
  await page.getByRole('button', { name: '播放时间', exact: true }).click()
  await expect
    .poll(async () => Number(await traveler.getAttribute('data-progress')))
    .toBeGreaterThan(0.1)
  const position = await traveler.getAttribute('style')
  await page.waitForTimeout(350)
  expect(await traveler.getAttribute('style')).toBe(position)
  await page.getByRole('button', { name: '暂停时间播放' }).click()
  expect(await traveler.getAttribute('style')).toBe(position)
  const progress = await traveler.getAttribute('data-progress')
  await page.waitForTimeout(250)
  expect(await traveler.getAttribute('data-progress')).toBe(progress)
  expect(
    await page
      .locator('.traveler-body')
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe('none')
  await page.getByRole('combobox', { name: '播放速度' }).selectOption('3')
  await page.getByRole('button', { name: '播放时间', exact: true }).click()
  await expect(page.locator('.journey-active-card h4')).toHaveText('返乡为母守丧')
  await page.getByRole('button', { name: '暂停时间播放' }).click()
  await expect(page.locator('.year-title')).toContainText('1057')
})

test('replays from the last journey record and exposes expanded founder events with explanations', async ({
  page,
}) => {
  await page.goto('/#year=1101&person=sushi&journey=sushi&point=sushi-death')
  await expect(page.locator('.journey-active-card h4')).toContainText('病逝常州')
  await page.getByRole('button', { name: '播放时间', exact: true }).click()
  await expect(page.locator('.journey-active-card h4')).toContainText('出生于眉山')
  await page.getByRole('button', { name: '暂停时间播放' }).click()
  await page.goto('/#year=960&person=zhaokuangyin')
  expect(await page.locator('.person-events button').count()).toBeGreaterThanOrEqual(10)
  await expect(page.locator('.person-events')).toContainText('宋刑统')
  await expect(page.locator('.person-events')).toContainText('曹彬等执行')
  await page.locator('.person-events button').filter({ hasText: '宋灭南唐' }).click()
  await expect(page.locator('.event-detail .detail-lead')).toContainText('李煜')
  await expect(page.locator('.related-people')).toContainText('部署伐南唐')
})

test('reads and saves dynasty introductions with actual dates and handles approximate early archives', async ({
  page,
}) => {
  await page.getByRole('button', { name: '朝代', exact: true }).click()
  await page.getByRole('combobox', { name: '朝代档案范围' }).selectOption('all')
  await expect(page.locator('.dynasty-list-card')).toHaveCount(53)
  await page.locator('.dynasty-list-card').filter({ hasText: '皇太极改国号为清' }).click()
  await expect(page.locator('.dynasty-detail h2')).toHaveText('清朝')
  await expect(page.locator('.dynasty-facts')).toContainText('1636—1912')
  await expect(page.locator('.year-title')).toContainText('1750')
  await page.getByRole('button', { name: '收藏', exact: true }).click()
  await page.reload()
  await expect(page.locator('.dynasty-detail h2')).toHaveText('清朝')
  await page.getByRole('button', { name: '我的收藏', exact: true }).click()
  await page.locator('.saved-panel .dynasty-list-card').click()
  await page.getByRole('button', { name: '查看建立年份的地图', exact: true }).click()
  await expect(page.locator('.year-title')).toContainText('1636')
  await page.getByRole('combobox', { name: '搜索历史事件、人物或地名' }).fill('殷商')
  await page.locator('.search-results button').filter({ hasText: '晚期以殷' }).click()
  await expect(page.locator('.dynasty-detail h2')).toHaveText('商')
  await expect(page.locator('.dynasty-detail')).toContainText('年代')
  await page.getByRole('button', { name: '查看约定起始年代', exact: true }).click()
  await expect(page.locator('.year-title')).toContainText('1600')
  await expect(page.locator('.early-map-note')).toBeVisible()
})

test('keeps the current journey location and record title visible on mobile while dragging years', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('combobox', { name: '搜索历史事件、人物或地名' }).fill('苏轼')
  await page.locator('.search-results button').filter({ hasText: '北宋文学家、书画家' }).click()
  await page.getByRole('button', { name: '在地图上看人物经历' }).click()
  const slider = page.getByRole('slider', { name: '拖动历史时间轴' })
  await expect(page.locator('.journey-marker.selected[data-visible="true"]')).toBeVisible()
  await slider.fill('1096') // Range values are ordinal years: 1096 selects 1097 CE.
  await expect(page.locator('.journey-active-card h4')).toHaveText('渡海抵达儋州')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-trail-arrows-rendered', 'true')
  await expect.poll(async () => new URL(page.url()).hash).toContain('lat=19.75')
  await expect(page.locator('.journey-marker.selected[data-visible="true"]')).toBeVisible()
  const geometry = await page.evaluate(() => {
    const map = document.querySelector('.map-canvas')!.getBoundingClientRect()
    const toolbar = document.querySelector('.journey-toolbar')!.getBoundingClientRect()
    const title = document.querySelector('.journey-active-card h4')!.getBoundingClientRect()
    const panel = document.querySelector('.panel-scroll')!.getBoundingClientRect()
    const marker = document
      .querySelector('.journey-marker.selected[data-visible="true"]')!
      .getBoundingClientRect()
    return {
      titleBottom: title.bottom,
      panelBottom: panel.bottom,
      toolbarBottom: toolbar.bottom,
      mapTop: map.top,
      markerTop: marker.top,
      markerBottom: marker.bottom,
      mapBottom: map.bottom,
      scrollWidth: document.documentElement.scrollWidth,
      width: window.innerWidth,
    }
  })
  expect(geometry.titleBottom).toBeLessThan(geometry.panelBottom)
  expect(geometry.toolbarBottom).toBeLessThanOrEqual(geometry.mapTop)
  expect(geometry.markerTop).toBeGreaterThanOrEqual(geometry.mapTop)
  expect(geometry.markerBottom).toBeLessThanOrEqual(geometry.mapBottom)
  expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.width)
})

test('keeps mobile labels separate, expands nearby map events, and shows the first title', async ({
  page,
}) => {
  await page.setViewportSize({ width: 469, height: 777 })
  await page.goto('/#year=230&scope=nearby&lng=109.5&lat=34.5&zoom=2.65')
  await setSheet(page, 'split')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
  await expect(page.locator('.event-marker[data-visible="true"]')).toHaveCount(2)
  const readGeometry = () =>
    page.evaluate(() => {
      const header = document.querySelector('.topbar')!.getBoundingClientRect()
      const canvas = document.querySelector('.map-canvas')!.getBoundingClientRect()
      const title = document.querySelector('.event-card h3')!.getBoundingClientRect()
      const panel = document.querySelector('.panel-scroll')!.getBoundingClientRect()
      const rects = [...document.querySelectorAll('.maplibregl-marker[data-visible="true"]')].map(
        (el) => el.getBoundingClientRect(),
      )
      const overlaps: number[] = []
      for (let i = 0; i < rects.length; i++)
        for (let j = 0; j < i; j++) {
          const a = rects[i],
            b = rects[j]
          if (a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top)
            overlaps.push(i)
        }
      return {
        headerBottom: header.bottom,
        canvasTop: canvas.top,
        titleBottom: title.bottom,
        panelBottom: panel.bottom,
        overlaps,
      }
    })
  const geometry = await readGeometry()
  expect(geometry.headerBottom).toBeLessThanOrEqual(geometry.canvasTop)
  expect(geometry.titleBottom).toBeLessThan(geometry.panelBottom)
  // Caption collision layout follows MapLibre rendering on an animation frame.
  await expect.poll(async () => (await readGeometry()).overlaps).toEqual([])
  await page.getByRole('button', { name: '展开 3 个地点事件', exact: true }).click()
  await expect(page.getByRole('dialog', { name: '此处的历史事件' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog', { name: '此处的历史事件' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: '展开 3 个地点事件', exact: true })).toBeFocused()
  await page.getByRole('button', { name: '展开 3 个地点事件', exact: true }).press('Enter')
  await expect(page.getByRole('dialog', { name: '此处的历史事件' })).toBeVisible()
  await page.locator('.map-event-choice').filter({ hasText: '诸葛亮卒于五丈原' }).click()
  await expect(page.locator('.event-detail h2')).toHaveText('诸葛亮卒于五丈原')
  await expect(page.locator('.year-title')).toContainText('234')
  await page.screenshot({ path: 'test-results/mobile-optimized.png', fullPage: true })
})
