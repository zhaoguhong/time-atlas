import { afterEach, expect, test, vi } from 'vitest'
import { fetchJson } from './fetch-json'

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

test('returns parsed JSON and clears the deadline on success or HTTP failure', async () => {
  vi.useFakeTimers()
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{"id":"event"}')))
  await expect(fetchJson('/article.json')).resolves.toEqual({ id: 'event' })
  expect(vi.getTimerCount()).toBe(0)
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 503 })))
  await expect(fetchJson('/article.json')).rejects.toThrow('HTTP 503')
  expect(vi.getTimerCount()).toBe(0)
})

test.each(['headers', 'body'])(
  'a stalled %s transfer aborts and permits a fresh retry',
  async (stage) => {
    vi.useFakeTimers()
    let signal: AbortSignal | undefined
    const hang = new Promise(() => {})
    const fetch = vi.fn((_url: string, options: RequestInit) => {
      signal = options.signal as AbortSignal
      return stage === 'headers' ? hang : Promise.resolve({ ok: true, json: () => hang })
    })
    vi.stubGlobal('fetch', fetch)
    const pending = expect(fetchJson('/article.json', 1000)).rejects.toThrow('Request timed out')
    await vi.advanceTimersByTimeAsync(1000)
    await pending
    expect(signal?.aborted).toBe(true)
    expect(vi.getTimerCount()).toBe(0)
    fetch.mockImplementation(() => Promise.resolve(new Response('{"id":"retry"}')))
    await expect(fetchJson('/article.json')).resolves.toEqual({ id: 'retry' })
  },
)
