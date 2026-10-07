import { expect, type Page } from '@playwright/test'

export async function setSheet(page: Page, view: 'map' | 'split' | 'reading') {
  const handle = page.getByRole('button', { name: '调整资料面板高度', exact: true })
  const current = await page.locator('.atlas-app').getAttribute('data-mobile-view')
  if (current !== view) {
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
  await expect(page.locator('.atlas-app')).toHaveAttribute('data-mobile-view', view)
}
