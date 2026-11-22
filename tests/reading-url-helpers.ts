import { expect, type Page, type Request } from '@playwright/test'
import { readFileSync } from 'node:fs'
import type { Tour } from '../src/types'

type RecordKind = 'events' | 'people' | 'dynasties' | 'polities' | 'places'
const routes: Record<RecordKind, Record<string, string>> = JSON.parse(
  readFileSync(new URL('../src/data/generated/reading-routes.json', import.meta.url), 'utf8'),
)
export const { articleGuides }: { articleGuides: Tour[] } = JSON.parse(
  readFileSync(new URL('../src/data/generated/article-runtime.json', import.meta.url), 'utf8'),
)

export function recordPath(kind: RecordKind, id: string) {
  const slug = routes[kind][id]
  if (!slug) throw new Error(`Missing reading route for ${kind}/${id}`)
  return `/${kind}/${slug}/`
}

export function isReadingRequest(request: Request, kind: 'events' | 'people', id: string) {
  const pathname = new URL(request.url()).pathname
  return (
    request.resourceType() === 'fetch' &&
    (pathname === recordPath(kind, id) || pathname.startsWith(`/data/reading/${kind}/`))
  )
}

export function explorationParams(page: Page) {
  return page.evaluate(() => {
    const context = JSON.parse(sessionStorage.getItem('time-atlas:reading-context') ?? 'null')
    const hash = location.hash || (context?.path === location.pathname ? context.hash : '')
    return Object.fromEntries(new URLSearchParams(hash.slice(1)))
  })
}

export async function expectExploration(page: Page, expected: Record<string, string | null>) {
  await expect
    .poll(async () => {
      const params = await explorationParams(page)
      return Object.fromEntries(Object.keys(expected).map((key) => [key, params[key] ?? null]))
    })
    .toEqual(expected)
}

export async function reloadExploration(page: Page) {
  await page.reload()
  if (await page.locator('[data-static-reader]').count())
    await page.getByRole('button', { name: '在地图中查看', exact: true }).click()
}
