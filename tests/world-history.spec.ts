import { openHeaderMenu } from './refinement-helpers'
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

async function pillarSettings(page: Page) {
  await page.getByRole('button', { name: '时空柱筛选与设置', exact: true }).click()
  await expect(page.locator('.pillar-dialog')).toBeVisible()
}

async function closePillarSettings(page: Page) {
  await page.getByRole('button', { name: '关闭时空柱面板', exact: true }).click()
  await expect(page.locator('.pillar-dialog')).not.toBeVisible()
}

async function rememberMapPeriod(page: Page) {
  // Map coverage is checked over a whole period; pillar scope no longer
  // changes the map's independent saved time scope.
  await page.addInitScript(() => {
    localStorage.setItem(
      'time-atlas:scope-by-mode:v1',
      JSON.stringify({ map: 'period', pillar: 'period' }),
    )
  })
}

async function globalMapEvents(page: Page) {
  // Markers outside the current camera remain in the map's event universe.
  // Check their records instead of requiring distant continents to fit together.
  await expect(page.locator('.event-marker[data-event-ids~="world-suez-canal"]')).toHaveCount(1)
  await expect(page.locator('.event-marker[data-event-ids~="taiping"]')).toHaveCount(1)
}

async function singleWorldLabels(page: Page) {
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-longitude-wrapped', 'false')
  await mapReady(page)
  await expect
    .poll(() =>
      page.evaluate(() => {
        const params = new URLSearchParams(location.hash.slice(1))
        if (!params.has('lng') || !params.has('zoom')) return ['camera not committed']
        const map = document.querySelector('.map-canvas')!.getBoundingClientRect()
        const world = 512 * 2 ** Number(params.get('zoom'))
        const left = map.width / 2 - ((Number(params.get('lng')) + 180) / 360) * world
        const right = left + world
        const labels = [
          ...document.querySelectorAll<HTMLElement>(
            '.polity-label[data-visible="true"],.polity-label[aria-label="查看美国疆域资料"]',
          ),
        ]
        const problems: string[] = []
        if (!labels.some((label) => label.getAttribute('aria-label') === '查看美国疆域资料'))
          problems.push('missing USA map label')
        for (const label of labels) {
          const box = label.getBoundingClientRect()
          // Labels may move by up to 90 px to avoid controls. Check their
          // geographic anchor, removing that deliberate CSS-only displacement.
          const offset = Number.parseFloat(getComputedStyle(label).translate) || 0
          const anchor = box.left + box.width / 2 - offset - map.left
          // The camera URL rounds zoom to 2 decimals, and fitBounds may use
          // asymmetric side padding. Neither can explain a full world-copy drift.
          if (anchor < left - 16 || anchor > right + 16)
            problems.push(`${label.textContent}: ${anchor} outside ${left}—${right}`)
        }
        return problems
      }),
    )
    .toEqual([])
}

for (const [width, height] of [
  [1440, 900],
  [390, 844],
  [844, 390],
]) {
  test(`pillar preferences stay independent from the global map at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    await rememberMapPeriod(page)
    await page.goto('/#visual=pillar&year=1869&span=150&scope=period')
    await expect(page.locator('.pillar-stage')).toBeVisible()
    await pillarSettings(page)
    await page.getByLabel('时空柱浏览方式', { exact: true }).selectOption('world')
    await page.getByLabel('世界历史地区', { exact: true }).selectOption('africa')
    await closePillarSettings(page)
    await expect(page.locator('.time-pillar')).toHaveAttribute('data-side', 'world')
    await expect(page.locator('.pillar-card.china')).toHaveCount(0)
    await expect(page.locator('.pillar-card.world').first()).toBeVisible()
    await switchMode(page, '地图')
    await sheet(page, 'map')
    if (width >= 844) await singleWorldLabels(page)
    await mapReady(page, 1869)
    await page.getByRole('button', { name: '地图图层', exact: true }).click()
    await expect(page.getByLabel('地图历史范围', { exact: true })).toHaveCount(0)
    await expect(page.getByLabel('地图世界地区', { exact: true })).toHaveCount(0)
    await expect(page.locator('.layers-popover select')).toHaveCount(0)
    const popover = (await page.locator('.layers-popover').boundingBox())!
    expect(popover.x).toBeGreaterThanOrEqual(-1)
    expect(popover.y).toBeGreaterThanOrEqual(-1)
    expect(popover.x + popover.width).toBeLessThanOrEqual(width + 1)
    expect(popover.y + popover.height).toBeLessThanOrEqual(height + 1)
    await page.screenshot({ path: info.outputPath(`global-map-controls-${width}.png`) })
    await page.getByRole('button', { name: '地图图层', exact: true }).click()
    await mapReady(page, 1869)
    await expect(page).toHaveURL(/side=world/)
    await expect(page).toHaveURL(/region=africa/)
    await globalMapEvents(page)

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
    await globalMapEvents(page)
    await switchMode(page, '时空柱')
    await pillarSettings(page)
    await expect(page.getByLabel('时空柱浏览方式', { exact: true })).toHaveValue('world')
    await expect(page.getByLabel('世界历史地区', { exact: true })).toHaveValue('africa')
    await closePillarSettings(page)
    await page.goBack()
    await mapReady(page, 1869)
    await globalMapEvents(page)
    await expect(page.locator('.event-detail h2')).toHaveText('苏伊士运河通航')
    await page.goForward()
    await expect(page.locator('.time-pillar')).toHaveAttribute('data-side', 'world')
    await pillarSettings(page)
    await expect(page.getByLabel('世界历史地区', { exact: true })).toHaveValue('africa')
    await closePillarSettings(page)
    await noPageOverflow(page)
  })

  test(`legacy pillar filters do not restrict map chronology through 1912 at ${width}x${height}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height })
    await page.goto('/#year=1869&side=world&region=europe&scope=period')
    await mapReady(page, 1869)
    await sheet(page, 'map')
    await globalMapEvents(page)
    await expect(page.locator('.timeline-period-select option[value^="world-"]')).toHaveCount(0)
    await choosePeriod(page, 'han', '汉')
    await mapReady(page, -100)
    await expect(page).toHaveURL(/year=-100/)
    await expect(page).toHaveURL(/side=world/)
    await expect(page).toHaveURL(/region=europe/)
    await expect(page).not.toHaveURL(/visual=pillar/)
    await page.screenshot({ path: info.outputPath(`global-map-han-${width}.png`) })
    await choosePeriod(page, 'qing', '清')
    await mapReady(page, 1750)
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

for (const width of [1440, 390]) {
  test(`a Chinese-only pillar does not hide world map events at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 })
    await rememberMapPeriod(page)
    await page.goto('/#visual=pillar&year=1869&span=150&side=china&scope=period')
    await expect(page.locator('.time-pillar')).toHaveAttribute('data-side', 'china')
    await expect(page.locator('.pillar-card.world')).toHaveCount(0)
    await switchMode(page, '地图')
    await globalMapEvents(page)
    await page.reload()
    await mapReady(page, 1869)
    await globalMapEvents(page)
    await switchMode(page, '时空柱')
    await expect(page.locator('.time-pillar')).toHaveAttribute('data-side', 'china')
    await expect(page.locator('.pillar-card.world')).toHaveCount(0)
  })
}

test('a Chinese map label opens the sourced Roman world-polity profile without mixing geometry dates', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#year=200&events=0&lng=13&lat=40&zoom=2.2')
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

test('map searches read both histories without changing remembered pillar filters', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#year=1869&side=world&region=africa')
  await mapReady(page, 1869)
  await search(page, '秦统一六国')
  await expect(page.locator('.event-detail h2')).toHaveText('秦统一六国')
  await mapReady(page, -221)
  await expect(page).toHaveURL(/side=world/)
  await expect(page).toHaveURL(/region=africa/)
  await expect(page).toHaveURL(/event=qin-unifies/)
  await expect(page.locator('.event-marker[data-event-ids~="qin-unifies"]')).toHaveCount(1)
  await search(page, '秦朝')
  await expect(page.locator('.dynasty-detail h2')).toHaveText('秦朝')
  await expect(page.locator('.dynasty-detail > .eyebrow')).toHaveText('朝代与政权档案')
  await expect(page).not.toHaveURL(/dynasty=world-/)
  await expect(page).toHaveURL(/side=world/)
  await expect(page).toHaveURL(/region=africa/)
  await search(page, '罗马帝国')
  await expect(page.locator('.dynasty-detail h2')).toHaveText('罗马帝国')
  await expect(page).toHaveURL(/side=world/)
  await expect(page).toHaveURL(/region=africa/)
  await switchMode(page, '时空柱')
  await expect(page.locator('.time-pillar')).toHaveAttribute('data-side', 'world')
  await pillarSettings(page)
  await expect(page.getByLabel('世界历史地区', { exact: true })).toHaveValue('africa')
  await closePillarSettings(page)
})

test('world archives persist in bookmarks and recent reading with their own start-date action', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#year=200&dynasty=world-roman-empire&lng=13&lat=40&zoom=2.2')
  await expect(page.locator('.dynasty-detail h2')).toHaveText('罗马帝国')
  // Exercise persistence from a loaded map. Reloading during WebKit's pending
  // module import reports the old document's cancelled dependency as a pageerror.
  await mapReady(page, 200)
  await page.getByRole('button', { name: '收藏', exact: true }).click()
  await page.reload()
  await expect(page.locator('.dynasty-detail h2')).toHaveText('罗马帝国')
  await openHeaderMenu(page)
  await page.getByRole('button', { name: '我的阅读', exact: true }).click()
  await expect(page.locator('.resume-reading')).toContainText('罗马帝国')
  await expect(page.locator('.saved-panel .dynasty-list-card')).toHaveCount(1)
  await page.screenshot({ path: info.outputPath('world-archive-bookmarks.png') })
  await page.locator('.saved-panel .dynasty-list-card').click()
  await page.getByRole('button', { name: '查看阅读起始年代的地图', exact: true }).click()
  await mapReady(page, -27)
  await expect(page).not.toHaveURL(/side=world|region=europe/)
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

test('an explicit Pacific camera shows Hawaii independently of pillar region preferences', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#year=1900&side=world&region=africa&scope=period&lng=15&lat=20&zoom=1')
  await mapReady(page, 1900)
  await sheet(page, 'map')
  await page.evaluate(() => {
    location.hash = 'year=1900&side=world&region=africa&scope=period&lng=165&lat=-10&zoom=1'
  })
  await mapReady(page, 1900)
  await expect(page).toHaveURL(/lng=165(?:&|$)/)
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-longitude-wrapped', 'true')
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
  const grouped = (await marker.getAttribute('data-event-ids'))!.split(' ').length > 1
  await marker.click()
  if (grouped) {
    // The global map can combine the 1810 and 1893 Hawaii records at this zoom.
    // Follow the ordinary cluster choice instead of assuming a single marker.
    await page
      .getByRole('dialog', { name: '此处的历史事件', exact: true })
      .getByRole('button')
      .filter({ has: page.getByText('夏威夷君主制被推翻', { exact: true }) })
      .click()
  }
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
  await page.setViewportSize({ width: 844, height: 390 })
  await sheet(page, 'map')
  await page.getByRole('button', { name: '查看全球疆域', exact: true }).click()
  await singleWorldLabels(page)
  await mapReady(page, 1893)
  await page.screenshot({ path: info.outputPath('pacific-to-single-world-overview.png') })
  await page.setViewportSize({ width: 390, height: 844 })
  await search(page, '夏威夷君主制被推翻')
  await mapReady(page, 1893)
  await sheet(page, 'split')
  await expect(page.locator('.map-canvas')).toHaveAttribute('data-longitude-wrapped', 'true')
  await expect(page.locator('.event-marker.selected')).toHaveAttribute('data-visible', 'true')
  await search(page, '秦统一六国')
  await mapReady(page, -221)
  await expect(page).toHaveURL(/side=world/)
  await expect(page).toHaveURL(/region=africa/)
  await expect(page.locator('.event-marker.selected')).toHaveAttribute('data-visible', 'true')
})

test('a same-zoom Pacific camera hash retains a single canonical overview', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 512, height: 390 })
  await page.goto('/#year=1900&scope=period&lng=0&lat=0&zoom=0')
  await mapReady(page, 1900)
  await sheet(page, 'map')
  await singleWorldLabels(page)
  await expect(page).toHaveURL(/zoom=0(?:&|$)/)
  await page.evaluate(async () => {
    // Preserve an exactly representable zoom. A longitude-only camera move
    // must restore overview wrapping even when no zoomend event is emitted.
    const changed = new Promise<void>((resolve) =>
      addEventListener('hashchange', () => resolve(), { once: true }),
    )
    location.hash = 'year=1900&scope=period&lng=165&lat=0&zoom=0'
    await changed
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  })
  await mapReady(page, 1900)
  await expect(page).toHaveURL(/zoom=0(?:&|$)/)
  await singleWorldLabels(page)
  await page.screenshot({ path: info.outputPath('same-zoom-pacific-overview.png') })
  await noPageOverflow(page)
})

test('map year comparison includes Chinese and world records despite remembered pillar filters', async ({
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
  await expect(reader.locator('.eyebrow')).toContainText('中外历史')
  await expect(reader.locator('.comparison-years')).toContainText('德意志帝国')
  await expect(reader.locator('.comparison-years')).toContainText('清朝')
  await expect(reader.locator('.archive-event-list')).toContainText('德意志帝国成立')
  await expect(reader.locator('.archive-event-list')).toContainText('洋务运动逐步展开')
  await page.screenshot({ path: info.outputPath('global-history-comparison.png') })
})
