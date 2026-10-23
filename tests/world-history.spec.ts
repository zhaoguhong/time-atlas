import { expect, test, type Page } from '@playwright/test'
import { setSheet } from './mobile-sheet-helpers'

test.use({ hasTouch: true })

const errors = new WeakMap<Page, string[]>()
test.beforeEach(async ({ page }) => {
  const messages: string[] = []
  errors.set(page, messages)
  page.on('pageerror', (error) => messages.push(error.message))
})
test.afterEach(async ({ page }) => {
  expect(errors.get(page) ?? [], 'uncaught application errors').toEqual([])
})

async function mapReady(page: Page, year?: number) {
  const canvas = page.locator('.map-canvas')
  await expect(canvas).toBeVisible()
  if (year !== undefined) await expect(canvas).toHaveAttribute('data-map-year', String(year))
  await expect(canvas).toHaveAttribute('data-rendered', 'true')
}

async function regionReady(page: Page, region: 'africa' | 'europe' | 'oceania') {
  // Camera URLs commit at moveend. A previous idle frame can still be visible
  // immediately after a React scope selection, before its camera effect runs.
  const ranges = {
    africa: [-10, 45, -20, 25],
    europe: [-5, 40, 35, 70],
    oceania: [140, 180, -40, 30],
  }
  await expect
    .poll(() => {
      const params = new URLSearchParams(new URL(page.url()).hash.slice(1))
      if (!params.has('lng') || !params.has('lat')) return false
      const lng = Number(params.get('lng')),
        lat = Number(params.get('lat'))
      const [west, east, south, north] = ranges[region]
      return lng >= west && lng <= east && lat >= south && lat <= north
    })
    .toBe(true)
  await mapReady(page)
}

async function sheet(page: Page, view: 'map' | 'split' | 'reading') {
  if (page.viewportSize()!.width <= 1000) await setSheet(page, view)
}

async function switchMode(page: Page, mode: '地图' | '时空柱') {
  await page
    .getByRole('group', { name: '探索模式', exact: true })
    .getByRole('button', { name: mode, exact: true })
    .click()
  if (mode === '地图') await mapReady(page)
  else await expect(page.locator('.pillar-stage')).toBeVisible()
}

async function search(page: Page, title: string) {
  await page.getByRole('combobox', { name: '搜索历史事件、人物或地名', exact: true }).fill(title)
  await page
    .getByRole('option')
    .filter({ has: page.getByText(title, { exact: true }) })
    .first()
    .click()
}

async function noPageOverflow(page: Page) {
  const overflow = await page.evaluate(() => ({
    horizontal: document.documentElement.scrollWidth > innerWidth,
    vertical: document.documentElement.scrollHeight > innerHeight,
  }))
  expect(overflow).toEqual({ horizontal: false, vertical: false })
}

async function choosePeriod(page: Page, id: string, shortName: string) {
  const picker = page.getByLabel('切换历史时期', { exact: true })
  if (await picker.isVisible()) await picker.selectOption(id)
  else
    await page
      .getByRole('navigation', { name: '历史时期导航', exact: true })
      .getByRole('button', { name: shortName, exact: true })
      .click()
}

for (const [width, height] of [
  [1440, 900],
  [390, 844],
  [844, 390],
]) {
  test(`world scope and selected event survive map/pillar navigation at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    await page.goto('/#year=1869')
    await mapReady(page, 1869)
    await sheet(page, 'map')
    await page.getByRole('button', { name: '地图图层', exact: true }).click()
    await page.getByLabel('地图历史范围', { exact: true }).selectOption('world')
    await page.getByLabel('地图世界地区', { exact: true }).selectOption('africa')
    await expect(page.getByLabel('地图历史范围', { exact: true })).toHaveValue('world')
    await expect(page.getByLabel('地图世界地区', { exact: true })).toHaveValue('africa')
    await regionReady(page, 'africa')
    await mapReady(page, 1869)
    for (const name of ['地图历史范围', '地图世界地区']) {
      const box = (await page.getByLabel(name, { exact: true }).boundingBox())!
      expect(box.height).toBeGreaterThanOrEqual(44)
    }
    const popover = (await page.locator('.layers-popover').boundingBox())!
    expect(popover.x).toBeGreaterThanOrEqual(-1)
    expect(popover.y).toBeGreaterThanOrEqual(-1)
    expect(popover.x + popover.width).toBeLessThanOrEqual(width + 1)
    expect(popover.y + popover.height).toBeLessThanOrEqual(height + 1)
    await page.screenshot({ path: info.outputPath(`world-map-controls-${width}.png`) })
    await page.getByRole('button', { name: '地图图层', exact: true }).click()
    await mapReady(page, 1869)
    await expect(page).toHaveURL(/side=world/)
    await expect(page).toHaveURL(/region=africa/)

    await search(page, '苏伊士运河通航')
    await mapReady(page, 1869)
    await sheet(page, 'reading')
    await expect(page.locator('.event-detail h2')).toHaveText('苏伊士运河通航')
    await expect(page.locator('.event-detail .detail-kicker')).toContainText('1869')
    await expect(page.locator('.event-detail .reference-list a').first()).toHaveAttribute(
      'href',
      /suezcanal\.gov\.eg/,
    )
    await sheet(page, 'split')
    await mapReady(page, 1869)
    await expect(page.locator('.event-marker[data-event-ids~="world-suez-canal"]')).toBeVisible()
    await page.screenshot({ path: info.outputPath(`world-event-map-${width}.png`) })

    await switchMode(page, '时空柱')
    await expect(page.locator('.time-pillar')).toHaveAttribute('data-side', 'world')
    await expect(page.locator('.pillar-card.china')).toHaveCount(0)
    await expect(page.locator('.pillar-card[data-event-id="world-suez-canal"]')).toBeVisible()
    await expect(page).toHaveURL(/region=africa/)
    await expect(page).toHaveURL(/event=world-suez-canal/)
    await page.screenshot({ path: info.outputPath(`world-event-pillar-${width}.png`) })
    await page.reload()
    await expect(page.locator('.time-pillar')).toHaveAttribute('data-side', 'world')
    await expect(page.locator('.event-detail h2')).toHaveText('苏伊士运河通航')
    await switchMode(page, '地图')
    await mapReady(page, 1869)
    await expect(page).toHaveURL(/side=world/)
    await expect(page).toHaveURL(/region=africa/)
    await expect(page).toHaveURL(/event=world-suez-canal/)
    await page.reload()
    await mapReady(page, 1869)
    await sheet(page, 'map')
    await page.getByRole('button', { name: '地图图层', exact: true }).click()
    await expect(page.getByLabel('地图历史范围', { exact: true })).toHaveValue('world')
    await expect(page.getByLabel('地图世界地区', { exact: true })).toHaveValue('africa')
    await page.getByRole('button', { name: '地图图层', exact: true }).click()
    await noPageOverflow(page)
  })

  test(`world periods navigate the map through the 1912 boundary at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    await page.goto('/#year=1869&side=world&region=europe')
    await mapReady(page, 1869)
    await sheet(page, 'map')
    await choosePeriod(page, 'world-classical', '古典')
    await mapReady(page, 200)
    await regionReady(page, 'europe')
    await expect(page).toHaveURL(/year=200/)
    await expect(page).toHaveURL(/side=world/)
    await expect(page).not.toHaveURL(/visual=pillar/)
    await page.screenshot({ path: info.outputPath(`classical-world-map-${width}.png`) })
    await choosePeriod(page, 'world-transformations', '帝国与变革')
    await mapReady(page, 1900)
    await page.locator('.year-title').click()
    const yearInput = page.getByRole('spinbutton', { name: '输入历史年份', exact: true })
    await yearInput.fill('1912')
    await yearInput.press('Enter')
    await mapReady(page, 1912)
    await expect(page.getByRole('button', { name: '下一个历史事件', exact: true })).toBeDisabled()
    const displayedYears = await page
      .locator('.event-marker[data-event-years]')
      .evaluateAll((markers) =>
        markers.flatMap((marker) =>
          marker.getAttribute('data-event-years')!.split(',').map(Number),
        ),
      )
    expect(displayedYears.every((year) => year <= 1912)).toBe(true)
    await noPageOverflow(page)
    await page.screenshot({ path: info.outputPath(`world-map-1912-${width}.png`) })
  })
}

test('a Chinese map label opens the sourced Roman world-polity profile without mixing geometry dates', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#year=200&side=world&region=europe&events=0')
  await mapReady(page, 200)
  await page.getByRole('button', { name: '查看罗马帝国疆域资料', exact: true }).click()
  await expect(page.locator('.polity-detail h2')).toHaveText('罗马帝国')
  await expect(page.locator('.polity-detail .dynasty-introduction')).toContainText('奥古斯都')
  await expect(page.locator('.polity-detail .dynasty-facts')).toContainText('前27')
  await expect(page.locator('.polity-detail .polity-facts')).toContainText('来源中的适用区间')
  await expect(page.locator('.polity-detail .evidence-note')).toContainText(
    '不等于政权实际存续时间',
  )
  const sources = page.locator('.polity-detail .reference-list a')
  expect(await sources.count()).toBeGreaterThanOrEqual(2)
  await expect(sources.filter({ hasText: 'Cliopatria' })).toHaveCount(1)
  await expect(sources.filter({ hasText: 'OpenStax' }).first()).toHaveAttribute(
    'href',
    /openstax\.org/,
  )
  await page.screenshot({ path: info.outputPath('roman-map-reading.png') })
  await search(page, '罗马帝国')
  await expect(page.locator('.dynasty-detail h2')).toHaveText('罗马帝国')
  await expect(page.locator('.dynasty-detail > .eyebrow')).toHaveText('世界政权档案')
  await expect(page.locator('.dynasty-detail .reference-list a').first()).toHaveAttribute(
    'href',
    /openstax\.org/,
  )
  await expect(page).toHaveURL(/dynasty=world-roman-empire/)
  await page.reload()
  await expect(page.locator('.dynasty-detail h2')).toHaveText('罗马帝国')
})

test('an approximate Central Asian event retains date, location caveats and references across both modes', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(
    '/#year=101&side=world&region=central-asia&visual=pillar&span=350&event=world-kushan-networks',
  )
  await expect(page.locator('.pillar-stage')).toBeVisible()
  await sheet(page, 'reading')
  const detail = page.locator('.event-detail')
  await expect(detail.locator('h2')).toHaveText('贵霜连接中亚与北印度')
  await expect(detail.locator('.detail-kicker')).toContainText('约2世纪')
  await expect(detail.locator('.detail-location')).toContainText('巴克特里亚与犍陀罗')
  await expect(detail.locator('.evidence-note')).toContainText('具体纪年仍有争论')
  await expect(detail.locator('.evidence-note')).toContainText('非某次统一仪式地点或帝国边界')
  await expect(detail.locator('.reference-list a').first()).toHaveAttribute('href', /openstax\.org/)
  await page.screenshot({ path: info.outputPath('approximate-world-pillar-reading.png') })
  await detail.getByRole('button', { name: '在地图中查看', exact: true }).click()
  await mapReady(page, 101)
  await sheet(page, 'reading')
  await expect(detail.locator('.detail-kicker')).toContainText('约2世纪')
  await expect(detail.locator('.evidence-note')).toContainText('具体纪年仍有争论')
  await expect(page).toHaveURL(/side=world/)
  await expect(page).toHaveURL(/region=central-asia/)
  await page.screenshot({ path: info.outputPath('approximate-world-map-reading.png') })
})

test('an independent Chinese event search exits incompatible world filters and retains the Chinese archive', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#year=1869&side=world&region=africa')
  await mapReady(page, 1869)
  await search(page, '秦统一六国')
  await expect(page.locator('.event-detail h2')).toHaveText('秦统一六国')
  await mapReady(page, -221)
  await expect(page).not.toHaveURL(/side=world|region=africa/)
  await expect(page).toHaveURL(/event=qin-unifies/)
  await switchMode(page, '时空柱')
  await expect(page.locator('.time-pillar')).toHaveAttribute('data-side', 'compare')
  await expect(page.locator('.pillar-card[data-event-id="qin-unifies"]')).toBeVisible()
  await search(page, '秦朝')
  await expect(page.locator('.dynasty-detail h2')).toHaveText('秦朝')
  await expect(page.locator('.dynasty-detail > .eyebrow')).toHaveText('朝代与政权档案')
  await expect(page).not.toHaveURL(/dynasty=world-/)
})

test('world archives persist in bookmarks and recent reading with their own start-date action', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#year=200&side=world&region=europe&dynasty=world-roman-empire')
  await expect(page.locator('.dynasty-detail h2')).toHaveText('罗马帝国')
  // Exercise persistence from a loaded map. Reloading during WebKit's pending
  // module import reports the old document's cancelled dependency as a pageerror.
  await mapReady(page, 200)
  await page.getByRole('button', { name: '收藏', exact: true }).click()
  await page.reload()
  await expect(page.locator('.dynasty-detail h2')).toHaveText('罗马帝国')
  await page.getByRole('button', { name: '我的收藏', exact: true }).click()
  await expect(page.locator('.resume-reading')).toContainText('罗马帝国')
  await expect(page.locator('.saved-panel .dynasty-list-card')).toHaveCount(1)
  await page.screenshot({ path: info.outputPath('world-archive-bookmarks.png') })
  await page.locator('.saved-panel .dynasty-list-card').click()
  await page.getByRole('button', { name: '查看阅读起始年代的地图', exact: true }).click()
  await mapReady(page, -27)
  await expect(page).toHaveURL(/side=world/)
  await expect(page).toHaveURL(/year=-27/)
  await page
    .getByRole('combobox', { name: '搜索历史事件、人物或地名', exact: true })
    .fill('Roman Empire')
  await page
    .getByRole('option')
    .filter({ has: page.getByText('罗马帝国', { exact: true }) })
    .first()
    .click()
  await expect(page.locator('.dynasty-detail h2')).toHaveText('罗马帝国')
})

test('an external world-region hash frames Pacific events including Hawaii', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#year=1900&side=world&region=africa&scope=period')
  await mapReady(page, 1900)
  await sheet(page, 'map')
  await page.evaluate(() => {
    location.hash = 'year=1900&side=world&region=oceania&scope=period'
  })
  await mapReady(page, 1900)
  await regionReady(page, 'oceania')
  const marker = page.locator('.event-marker[data-event-ids~="world-hawaiian-overthrow"]')
  await expect(marker).toHaveCount(1)
  await expect
    .poll(() =>
      marker.evaluate((element) => {
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
  await page.screenshot({ path: info.outputPath('pacific-world-region.png') })
  await marker.click()
  await sheet(page, 'reading')
  await expect(page.locator('.event-detail h2')).toHaveText('夏威夷君主制被推翻')
  await expect(page.locator('.event-detail')).toContainText('1898年的美国并吞')
  await sheet(page, 'split')
  for (const [width, height] of [
    [844, 390],
    [390, 844],
  ]) {
    await page.setViewportSize({ width, height })
    await mapReady(page, 1893)
    await expect(page.locator('.event-marker.selected')).toHaveAttribute('data-visible', 'true')
  }
  await page.reload()
  await mapReady(page, 1893)
  await sheet(page, 'split')
  await expect(page.locator('.event-marker.selected')).toHaveAttribute('data-visible', 'true')
  await search(page, '秦统一六国')
  await mapReady(page, -221)
  await expect(page).not.toHaveURL(/region=oceania|side=world/)
  await expect(page.locator('.event-marker.selected')).toHaveAttribute('data-visible', 'true')
})

test('world year comparison respects the selected region for events and polity archives', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#year=1900&side=world&region=europe')
  await mapReady(page, 1900)
  await page.getByRole('button', { name: '年份对比', exact: true }).click()
  await page.getByRole('spinbutton', { name: '输入参考年份', exact: true }).fill('1860')
  await page.getByRole('button', { name: '对照', exact: true }).click()
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-reference-rendered', 'true')
  await page.locator('.comparison-read-button').click()
  const reader = page.locator('.comparison-reading')
  await expect(reader.locator('.eyebrow')).toContainText('世界历史')
  await expect(reader.locator('.comparison-years')).toContainText('德意志帝国')
  await expect(reader.locator('.comparison-years')).not.toContainText('清朝')
  await expect(reader.locator('.archive-event-list')).toContainText('德意志帝国成立')
  await expect(reader.locator('.archive-event-list')).not.toContainText('太平天国')
  await page.screenshot({ path: info.outputPath('europe-world-comparison.png') })
})
