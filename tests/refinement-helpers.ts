import type { Page } from '@playwright/test'

export async function openHeaderMenu(page: Page) {
  const more = page.getByRole('button', { name: '更多操作', exact: true })
  if ((await more.isVisible()) && (await more.getAttribute('aria-expanded')) !== 'true')
    await more.click()
}
export async function expandPillarOptions(
  page: Page,
  name: '年份与时期' | '外观与简介' | '自动浏览与停留' | '操作说明',
) {
  const summary = page.locator('.pillar-secondary-options > summary').filter({ hasText: name })
  if ((await summary.locator('..').getAttribute('open')) === null) await summary.click()
}

export function pillarSideButton(page: Page, side: 'compare' | 'china' | 'world') {
  const names = { compare: '中外对照', china: '中国', world: '世界' }
  return page
    .getByRole('group', { name: '时空柱浏览方式', exact: true })
    .getByRole('button', { name: names[side], exact: true })
}
