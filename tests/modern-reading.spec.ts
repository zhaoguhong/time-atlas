import { expect, test, type Page } from '@playwright/test'
import { setSheet } from './mobile-sheet-helpers'

test.use({ hasTouch: true })
async function settings(page: Page) {
  await page.getByRole('button', { name: '时空柱筛选与设置', exact: true }).click()
  await expect(page.locator('.pillar-dialog')).toBeVisible()
}
async function closeSettings(page: Page) {
  await page.getByRole('button', { name: '关闭时空柱面板', exact: true }).click()
}

for (const viewport of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'phone', width: 390, height: 844 },
]) {
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
    await expect(page).toHaveURL(/year=2000(?:&|$)/)
    await expect(page).toHaveURL(/person=modern-phil-sartre(?:&|$)/)
    await page.reload()
    await expect(stage).toHaveAttribute('data-year', '2000')
    await expect(page.locator('.person-detail h2')).toContainText('萨特')
    await expect(page).toHaveURL(/year=2000(?:&|$)/)
  })

  for (const entry of ['mode switch', 'event map link']) {
    test(`modern filter ranges stop at the map boundary through ${entry} on ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport)
      await page.goto(
        '/#visual=pillar&year=1911&span=80&scope=period&range=1911,2000&play=years&event=wuchang',
      )
      await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', '1911')
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
      await expect(page.locator('.map-canvas')).toHaveAttribute('data-map-year', '1911')
      await expect(page).not.toHaveURL(/range=/)
      await page.clock.install()
      await page.getByRole('button', { name: '播放时间', exact: true }).click()
      await expect(page.getByRole('button', { name: '暂停时间播放', exact: true })).toBeVisible()
      await page.clock.runFor(1000)
      await expect(page.getByRole('button', { name: '播放时间', exact: true })).toBeVisible()
      await expect(page).toHaveURL(/year=1912(?:&|$)/)
      await expect(page.locator('.map-canvas')).toHaveAttribute('data-map-year', '1912')
      await page.clock.runFor(9000)
      await expect(page).toHaveURL(/year=1912(?:&|$)/)
      await expect(page.getByRole('button', { name: '播放时间', exact: true })).toBeVisible()
      await page.reload()
      await expect(page.locator('.map-canvas')).toHaveAttribute('data-map-year', '1912')
      await expect(page).not.toHaveURL(/range=/)
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
    expect(await page.locator('.map-heading').innerText()).toContain('20世纪')
  })

  test(`Sartre modern reading keeps historical map dates honest on ${viewport.name}`, async ({
    page,
  }, info) => {
    await page.setViewportSize(viewport)
    const record = { id: 'modern-sartre-being-nothingness', title: '萨特《存在与虚无》出版' }
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
    await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', '1943')
    if (viewport.name === 'phone') await setSheet(page, 'reading')
    await expect(page.locator('.event-detail h2')).toHaveText(record.title)
    await expect(page.locator('.event-detail .reference-list a').first()).toBeVisible()
    await page.reload()
    await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', '1943')
    if (viewport.name === 'phone') await setSheet(page, 'reading')
    await expect(page.locator('.event-detail h2')).toHaveText(record.title)
    await page.getByRole('button', { name: '在地图中查看', exact: true }).click()
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-map-year', '1912')
    await expect(page.locator('.map-canvas')).toHaveAttribute('data-rendered', 'true')
    if (viewport.name === 'phone') await setSheet(page, 'reading')
    await expect(page.locator('.modern-map-note')).toContainText('本事件发生于1943年')
    await expect(page.locator('.modern-map-note')).toContainText('所示疆域不代表事件当年')
    await expect(page.locator('.event-detail h2')).toHaveText(record.title)
    await page.screenshot({ path: info.outputPath(`${viewport.name}-modern-map-disclosure.png`) })
    await page.getByRole('button', { name: '在时空柱中对照', exact: true }).click()
    await expect(page.locator('.pillar-stage')).toHaveAttribute('data-year', '1943')
    expect(mapRequests.some((url) => url.includes('/modern-reading/'))).toBe(false)
    expect(errors).toEqual([])
  })
}
