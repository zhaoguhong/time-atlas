import type { Page } from '@playwright/test'

export async function choosePeriod(page: Page, id: string, shortName: string) {
  const picker = page.getByLabel('切换历史时期', { exact: true })
  const strip = page.getByRole('navigation', { name: '历史时期导航', exact: true })
  await picker.or(strip).filter({ visible: true }).first().waitFor()
  if (await picker.isVisible()) await picker.selectOption(id)
  else await strip.getByRole('button', { name: shortName, exact: true }).click()
}
