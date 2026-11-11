import { expect, test } from '@playwright/test'
import { setSheet } from './mobile-sheet-helpers'

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
    const article = page.getByRole('region', { name: '专题讲解' })
    await expect(article).toContainText('粮食从产地抵达都城')
    await expect(article).toContainText('大运河使相距遥远')
    const mapStop = article.getByRole('button', { name: '查看会通河的地理位置' })
    await mapStop.scrollIntoViewIfNeeded()
    await expect(mapStop).toBeInViewport()
    await page.screenshot({ path: info.outputPath(`topic-article-${width}.png`) })
    await mapStop.click()
    if (compact) await setSheet(page, 'reading')
    await expect(page.locator('.event-detail h2')).toHaveText('元开凿会通河')
    await expect(page.locator('.topic-chapter-context')).toContainText('第 4 / 6 章')
    await page.getByRole('button', { name: '专题导读与目录', exact: true }).click()
    await expect(article).toContainText('粮食从产地抵达都城')
    await page.goto('/#tour=paper-money-and-trust&step=-1')
    if (compact) await setSheet(page, 'reading')
    await expect(page.locator('.topic-introduction h2')).toHaveText('一张纸为什么能当钱用？')
    await expect(article).toContainText('交子提供了较便于转移的凭据')
    await expect(page.locator('.topic-chapter-list li')).toHaveCount(3)
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
    await filter.selectOption('生产与经济')
    await expect(page.locator('.tour-card')).toHaveCount(5)
    await expect(page.locator('.tours-panel')).toContainText('一张纸为什么能当钱用？')
    await filter.selectOption('全部')
    await expect(page.locator('.tour-card')).toHaveCount(59)
  })
}
