import { expect, test, type Page } from '@playwright/test'
import { setSheet } from './mobile-sheet-helpers'
import { expandPillarOptions } from './refinement-helpers'
import { expectExploration, recordPath, reloadExploration } from './reading-url-helpers'

test.use({ hasTouch: true })
async function settings(page: Page) {
  await page.getByRole('button', { name: '时空柱筛选与设置', exact: true }).click()
  await expect(page.locator('.pillar-dialog')).toBeVisible()
  await expandPillarOptions(page, '年份与时期')
}
async function closeSettings(page: Page) {
  await page.getByRole('button', { name: '关闭时空柱面板', exact: true }).click()
}

test('Nanjing surrender opens the sourced event and representative profile', async ({ page }) => {
  await page.goto('/#year=1945&event=modern-nanjing-surrender-1945')
  const detail = page.locator('.event-detail')
  await expect(detail.getByRole('heading', { name: '中国战区南京受降' })).toBeVisible()
  await expect(detail).toContainText('1945年9月9日')
  await expect(detail.getByRole('link', { name: /中国受降档案/ })).toBeVisible()
  await detail.getByRole('link', { name: /何应钦/ }).click()
  await expect(page.locator('.person-detail h2')).toHaveText(/何应钦\s*字\s*敬之/)
  await expect(page.locator('.person-detail')).toContainText('中国战区受降')
})

test('Taiwan fill follows a direct year jump when the map reports ready', async ({ page }) => {
  // Keep the canvas centre on inland Taiwan, away from city and event markers.
  await page.goto('/#year=1944&lng=120.97&lat=23.75&zoom=7')
  const map = page.locator('.map-canvas')
  const canvas = map.locator('canvas.maplibregl-canvas')
  async function centerColor() {
    const box = (await canvas.boundingBox())!
    const clip = {
      x: Math.floor(box.x + box.width / 2),
      y: Math.floor(box.y + box.height / 2),
      width: 1,
      height: 1,
    }
    const pixel = await page.screenshot({ clip })
    return page.evaluate(async (base64) => {
      const image = new Image()
      image.src = `data:image/png;base64,${base64}`
      await image.decode()
      const context = document.createElement('canvas').getContext('2d')!
      context.drawImage(image, 0, 0)
      const [red, green] = context.getImageData(0, 0, 1, 1).data
      return green - red
    }, pixel.toString('base64'))
  }
  await expect(map).toHaveAttribute('data-rendered', 'true')
  expect(await centerColor()).toBeLessThan(0)
  await page.getByRole('button', { name: /跳转年份/ }).click()
  const input = page.getByRole('spinbutton', { name: '输入历史年份' })
  await input.fill('1950')
  await input.press('Enter')
  await expect(map).toHaveAttribute('data-map-year', '1950')
  await expect(map).toHaveAttribute('data-rendered', 'true')
  expect(await centerColor()).toBeGreaterThan(0)
})

for (const viewport of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'phone', width: 390, height: 844 },
]) {
  test(`bottom timeline reaches the modern reading years on ${viewport.name}`, async ({
    page,
    request,
  }, info) => {
    const coverage = await (await request.get('/data/coverage.json')).json()
    const mapEnd: number = coverage.mapRange.to
    const readingEnd: number = coverage.readingRange.to
    const laterYear = viewport.name === 'phone' ? readingEnd : mapEnd < 1949 ? 1949 : 1969
    await page.setViewportSize(viewport)
    await page.goto(`/#year=${mapEnd}`)
    const timeline = page.getByRole('region', { name: '历史时间轴' })
    const trigger = timeline.getByRole('button', { name: /跳转年份/ })
    const map = page.locator('.map-canvas')
    const pillar = page.locator('.pillar-stage')
    const mapButton = page
      .getByRole('group', { name: '探索模式', exact: true })
      .getByRole('button', { name: '地图', exact: true })
    await expect(map).toHaveAttribute('data-rendered', 'true')
    const comparison = page.locator('.comparison-controls')
    await timeline.getByRole('button', { name: '年份对比', exact: true }).click()
    await expect(comparison).toBeVisible()
    await expect(trigger).toBeInViewport({ ratio: 1 })
    await trigger.click()
    const input = timeline.getByRole('spinbutton', { name: '输入历史年份', exact: true })
    await expect(input).toBeFocused()
    await expect(input).toHaveAttribute('max', String(readingEnd))
    for (const invalid of ['0', String(readingEnd + 1)]) {
      await input.fill(invalid)
      await input.press('Enter')
      await expect(timeline.getByRole('alert')).toContainText('没有公元0年')
      await expect(map).toHaveAttribute('data-map-year', String(mapEnd))
    }
    await input.press('Escape')
    await expect(input).toBeHidden()
    await expect(trigger).toBeFocused()
    await trigger.click()
    await input.fill(String(laterYear))
    const editor = timeline.locator('.year-jump-popover')
    await expect(editor).toBeInViewport({ ratio: 1 })
    expect(await editor.evaluate((form) => form.scrollWidth <= form.clientWidth)).toBe(true)
    await page.screenshot({ path: info.outputPath(`${viewport.name}-year-jump.png`) })
    await timeline.getByRole('button', { name: '前往', exact: true }).click()
    await expect(pillar).toHaveAttribute('data-year', String(laterYear))
    await expect(comparison).toBeHidden()

    await mapButton.click()
    await expect(map).toHaveAttribute('data-map-year', String(mapEnd))
    await expect(comparison).toBeVisible()
    const later = timeline.getByRole('button', {
      name: `在时空柱查看${mapEnd + 1}—${readingEnd}年`,
      exact: true,
    })
    await expect(later).toBeInViewport({ ratio: 1 })
    await later.click()
    const middle = Math.round((mapEnd + 1 + readingEnd) / 2)
    await expect(pillar).toHaveAttribute('data-year', String(middle))
    await expectExploration(page, { span: String(readingEnd - mapEnd - 1) })

    await mapButton.click()
    if (viewport.name === 'desktop') {
      const periods = timeline.getByRole('navigation', { name: '历史时期导航', exact: true })
      await expect(periods.getByRole('button', { name: '清', exact: true })).toBeAttached()
      await periods.getByText('近现代', { exact: true }).click()
      if (mapEnd < 1945) {
        await expect(pillar).toHaveAttribute('data-year', '1945')
        await mapButton.click()
      } else {
        await expect(map).toHaveAttribute('data-map-year', '1945')
      }
      await expect(periods.getByRole('button').last()).toHaveText('近现代')
    } else {
      const picker = timeline.getByRole('combobox', { name: '切换历史时期', exact: true })
      await expect(picker.locator('option').last()).toHaveAttribute('value', 'early-modern-china')
    }
    await expect(timeline.getByText('1951—2000', { exact: false })).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })

  test(`Qing timeline opens the 1913–1950 location map on ${viewport.name}`, async ({
    page,
  }, info) => {
    await page.setViewportSize(viewport)
    await page.goto('/#year=1912')
    const map = page.locator('.map-canvas')
    await expect(map).toHaveAttribute('data-rendered', 'true')
    const timeline = page.getByRole('region', { name: '历史时间轴' })
    await timeline.getByRole('button', { name: '在地图查看1913—1950年' }).click()
    await expect(map).toHaveAttribute('data-map-year', '1913')
    const slider = timeline.getByRole('slider', { name: '拖动历史时间轴' })
    await slider.press('End')
    await expect(map).toHaveAttribute('data-map-year', '1950')
    await expect(page.locator('.pillar-stage')).toHaveCount(0)
    await expect(map).toHaveAttribute('data-rendered', 'true')
    await page.screenshot({ path: info.outputPath('map-1950.png') })
    if (viewport.name === 'desktop') {
      await timeline.getByRole('navigation').getByText('近现代', { exact: true }).click()
    } else {
      await timeline.getByRole('combobox', { name: '切换历史时期' }).selectOption('qing')
      await timeline
        .getByRole('combobox', { name: '切换历史时期' })
        .selectOption('early-modern-china')
    }
    await expect(map).toHaveAttribute('data-map-year', '1945')
  })

  test(`year-end map covers the Taiwan and Penghu transition on ${viewport.name}`, async ({
    page,
  }, info) => {
    await page.setViewportSize(viewport)
    const errors: string[] = []
    const historicalRequests: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('request', (request) => {
      if (request.url().includes('/data/maps/')) historicalRequests.push(request.url())
    })
    await page.goto('/#year=1912&scope=year&lng=120.5&lat=24&zoom=5')
    if (viewport.name === 'phone') await setSheet(page, 'map')
    const map = page.locator('.map-canvas')
    await expect(map).toHaveAttribute('data-territory-coverage', 'historical')
    await expect(map).toHaveAttribute('data-rendered', 'true')
    const initialRequests = historicalRequests.length
    const note = page.locator('.modern-geography-note')
    let taipeiAnchor: { x: number; y: number } | undefined
    for (const year of [1937, 1945, 1949, 1950]) {
      await page.locator('.year-title').click()
      const input = page.getByRole('spinbutton', { name: '输入历史年份', exact: true })
      await input.fill(String(year))
      await input.press('Enter')
      await expect(map).toHaveAttribute('data-map-year', String(year))
      await expect(map).toHaveAttribute('data-territory-coverage', 'locations')
      await expect(map).toHaveAttribute('data-rendered', 'true')
      await expect(map.locator('.polity-label')).toHaveCount(0)
      await expect(note.locator('summary')).toContainText(
        year >= 1949 ? '中华人民共和国' : '民国时期',
      )
      const label = year >= 1945 ? '台北（中国）' : '台北'
      await expect(
        map.getByRole('button', { name: `查看${label}古今地名`, includeHidden: true }),
      ).toBeAttached()
      await note.locator('summary').click()
      await expect(
        note.getByText(year < 1945 ? /日本殖民统治/ : /1945年.*光复|1945年10月25日/).first(),
      ).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      )
      await note.locator('summary').click()
      const city = map.getByRole('button', { name: `查看${label}古今地名` })
      await expect(city).toBeVisible()
      const anchor = (await city.locator('.city-dot').boundingBox())!
      if (taipeiAnchor) {
        expect(anchor.x).toBeCloseTo(taipeiAnchor.x, 0)
        expect(anchor.y).toBeCloseTo(taipeiAnchor.y, 0)
      } else {
        taipeiAnchor = anchor
      }
      await page.screenshot({ path: info.outputPath(`year-end-${year}-${viewport.name}.png`) })
    }
    expect(historicalRequests).toHaveLength(initialRequests)
    if (viewport.name === 'desktop') {
      await page.getByRole('button', { name: '年份对比', exact: true }).click()
      const comparison = page.locator('.comparison-controls')
      await expect(comparison).toContainText('1940年疆界待补')
      await expect(map).toHaveAttribute('data-reference-rendered', 'false')
      await comparison.getByRole('button', { name: '解读这段变化' }).click()
      const reading = page.locator('.comparison-reading')
      await expect(reading).toContainText('参考年份提供地点与史事')
      const endpoints = reading.locator('.comparison-years section')
      await expect(endpoints.first()).toContainText('台湾、澎湖年末状态 · 仍处于日本殖民统治时期')
      await expect(endpoints.last()).toContainText('台湾、澎湖年末状态 · 中国')
      await comparison.getByRole('spinbutton', { name: '输入参考年份' }).fill('1912')
      await comparison.getByRole('button', { name: '对照', exact: true }).click()
      await expect(comparison).toContainText('1912 年的疆域记录')
      await expect(map).toHaveAttribute('data-reference-rendered', 'true')
      await expect(map).toHaveAttribute('data-map-year', '1950')
    }
    expect(errors).toEqual([])
  })

  test(`modern person reading preserves an explicit shared year after reload on ${viewport.name}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport)
    await page.goto('/#visual=pillar&year=1943&span=80&person=modern-phil-sartre')
    const stage = page.locator('.pillar-stage')
    await expect(stage).toHaveAttribute('data-year', '1943')
    await expect(page.locator('.person-detail h2')).toContainText('萨特')
    await stage.focus()
    await stage.press('End')
    await expect(stage).toHaveAttribute('data-year', '2000')
    await expect(page).toHaveURL(recordPath('people', 'modern-phil-sartre'))
    await expectExploration(page, { year: '2000' })
    await reloadExploration(page)
    await expect(stage).toHaveAttribute('data-year', '2000')
    await expect(page.locator('.person-detail h2')).toContainText('萨特')
    await expectExploration(page, { year: '2000' })
  })

  for (const entry of ['mode switch', 'event map link']) {
    test(`modern filter ranges stop at the map boundary through ${entry} on ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport)
      await page.goto(
        '/#visual=pillar&year=1949&span=80&scope=period&range=1949,2000&play=years&event=modern-prc-founded',
      )
      await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', '1949')
      if (entry === 'mode switch') {
        if (viewport.name === 'phone') await setSheet(page, 'reading')
        await page
          .getByRole('group', { name: '探索模式', exact: true })
          .getByRole('button', { name: '地图', exact: true })
          .click()
      } else {
        if (viewport.name === 'phone') await setSheet(page, 'reading')
        await page.getByRole('button', { name: '在地图中查看', exact: true }).click()
      }
      await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
      await expect(page.locator('.map-canvas')).toHaveAttribute('data-map-year', '1949')
      await expectExploration(page, { range: null })
      await page.clock.install()
      await page.getByRole('button', { name: '播放时间', exact: true }).click()
      await expect(page.getByRole('button', { name: '暂停时间播放', exact: true })).toBeVisible()
      await page.clock.runFor(1000)
      await expect(page.getByRole('button', { name: '播放时间', exact: true })).toBeVisible()
      await expectExploration(page, { year: '1950' })
      await expect(page.locator('.map-canvas')).toHaveAttribute('data-map-year', '1950')
      await page.clock.runFor(9000)
      await expectExploration(page, { year: '1950' })
      await expect(page.getByRole('button', { name: '播放时间', exact: true })).toBeVisible()
      await reloadExploration(page)
      await expect(page.locator('.map-canvas')).toHaveAttribute('data-map-year', '1950')
      await expectExploration(page, { range: null })
    })
  }

  test(`modern pillar dates and shared ranges reach 2000 on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/#visual=pillar&year=1943&span=80&scope=period&range=1939,1945')
    const stage = page.locator('.pillar-stage')
    await expect(stage).toHaveAttribute('data-year', '1943')
    await settings(page)
    await expect(page.getByLabel('时空柱起始年份', { exact: true })).toHaveValue('1939')
    await expect(page.getByLabel('时空柱结束年份', { exact: true })).toHaveValue('1945')
    await closeSettings(page)
    await page.reload()
    await expect(stage).toHaveAttribute('data-year', '1943')
    await stage.focus()
    await stage.press('End')
    await expect(stage).toHaveAttribute('data-year', '2000')
    await expect(page).toHaveURL(/year=2000/)
    await settings(page)
    await page.locator('#pillar-jump').fill('1943')
    await page.getByRole('button', { name: '前往', exact: true }).click()
    await expect(stage).toHaveAttribute('data-year', '1943')
    expect(await page.locator('.map-heading').innerText()).toContain('民国与新中国初年')
  })

  test(`post-1950 event reading keeps historical map dates honest on ${viewport.name}`, async ({
    page,
  }, info) => {
    await page.setViewportSize(viewport)
    const record = { id: 'modern-apollo11', title: '阿波罗11号完成载人登月' }
    const errors: string[] = []
    const mapRequests: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('request', (request) => {
      if (request.url().includes('/data/maps/')) mapRequests.push(request.url())
    })
    await page.goto('/#year=1912')
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    await page
      .getByRole('combobox', { name: '搜索历史事件、人物或地名', exact: true })
      .fill(record.title)
    await page
      .getByRole('option')
      .filter({ has: page.getByText(record.title, { exact: true }) })
      .click()
    await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', '1969')
    if (viewport.name === 'phone') await setSheet(page, 'reading')
    await expect(page.locator('.event-detail h2')).toHaveText(record.title)
    await expect(page.locator('.event-detail .reference-list a').first()).toBeVisible()
    await reloadExploration(page)
    await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', '1969')
    if (viewport.name === 'phone') await setSheet(page, 'reading')
    await expect(page.locator('.event-detail h2')).toHaveText(record.title)
    await page.getByRole('button', { name: '在地图中查看', exact: true }).click()
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-map-year', '1950')
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    if (viewport.name === 'phone') await setSheet(page, 'reading')
    await expect(page.locator('.modern-map-note')).toContainText('本事件发生于1969年')
    await expect(page.locator('.modern-map-note')).toContainText('当前地图为1950年的地点参照')
    await expect(page.locator('.event-detail h2')).toHaveText(record.title)
    await page.screenshot({ path: info.outputPath(`${viewport.name}-modern-map-disclosure.png`) })
    await page.getByRole('button', { name: '在时空柱中对照', exact: true }).click()
    await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', '1969')
    expect(mapRequests.some((url) => url.includes('/modern-reading/'))).toBe(false)
    expect(errors).toEqual([])
  })
}
