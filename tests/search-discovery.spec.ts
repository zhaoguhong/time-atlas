import { expect, test } from '@playwright/test'

for (const [width, height] of [
  [1440, 900],
  [390, 844],
]) {
  test(`discovers related events and summary terms with keyboard search at ${width}x${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height })
    await page.goto('/#visual=pillar&year=208&span=80')
    const search = page.getByRole('combobox', { name: '搜索历史事件、人物或地名' })
    const options = page.getByRole('listbox', { name: '历史搜索结果' }).getByRole('option')

    await search.fill('周瑜')
    await expect(options.first().locator('strong')).toHaveText('周瑜')
    const chibi = options.filter({ hasText: '赤壁之战' })
    await expect(chibi).toContainText('相关人物：周瑜')
    await expect(chibi).toBeInViewport()
    await search.press('ArrowDown')
    await expect(options.first()).toHaveAttribute('aria-selected', 'true')
    await search.press('Enter')
    await expect(page).toHaveURL(/person=zhouyu(?:&|$)/)
    await expect(page.locator('.person-hero h2')).toHaveText('周瑜字 公瑾')
    await expect(page.locator('.search-results')).toBeHidden()

    await search.fill('公瑾')
    await expect(options.first().locator('strong')).toHaveText('周瑜')
    await expect(chibi).toContainText('相关人物：周瑜')
    await chibi.click()
    await expect(page.locator('.event-detail h2')).toHaveText('赤壁之战')

    await search.fill('赋税')
    const tax = options.filter({ hasText: '鲁国初税亩' })
    await expect(tax).toContainText('介绍提及“赋税”')
    await tax.click()
    await expect(page.locator('.event-detail h2')).toHaveText('鲁国初税亩')
  })
}
