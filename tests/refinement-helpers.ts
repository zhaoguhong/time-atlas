import type { Page } from '@playwright/test'

export async function openHeaderMenu(page: Page) {
  const more = page.getByRole('button', { name: '更多操作', exact: true })
  if ((await more.isVisible()) && (await more.getAttribute('aria-expanded')) !== 'true')
    await more.click()
}
export async function expandPillarOptions(page: Page, name: '外观与简介' | '自动浏览与停留') {
  const summary = page.locator('.pillar-secondary-options > summary').filter({ hasText: name })
  if ((await summary.locator('..').getAttribute('open')) === null) await summary.click()
}
