import { expect, type Page } from '@playwright/test'

export async function setSheet(page: Page, view: 'map' | 'split' | 'reading') {
  const handle = page.getByRole('button', { name: '调整资料面板高度', exact: true })
  const current = await page.locator('.atlas-app').getAttribute('data-mobile-view')
  if (current !== view) {
    if (await page.locator('.mobile-landscape-controls').isVisible()) {
      if (view === 'map')
        await page.getByRole('button', { name: '收起资料面板', exact: true }).click()
      else {
        if (current === 'map')
          await page.getByRole('button', { name: '打开资料面板', exact: true }).click()
        if (view === 'reading')
          await page.getByRole('button', { name: '展开阅读', exact: true }).click()
        else if (current === 'reading')
          await page.getByRole('button', { name: '返回地图与资料', exact: true }).click()
      }
    } else {
      await handle.press(
        view === 'map'
          ? 'Home'
          : view === 'reading'
            ? 'End'
            : current === 'map'
              ? 'ArrowUp'
              : 'ArrowDown',
      )
    }
  }
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', view)
}
