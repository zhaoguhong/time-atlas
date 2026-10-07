import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createHistoryWriter } from './history-writer'

function setup() {
  let href = 'https://example.test/#year=230'
  const port = {
    state: null as unknown,
    replaceState: vi.fn((state: unknown, _title: string, url?: string | URL | null) => {
      port.state = state
      if (url) href = String(url)
    }),
    pushState: vi.fn((state: unknown) => {
      port.state = state
    }),
  }
  return { port, writer: createHistoryWriter(port, () => href) }
}

describe('bounded browser history writes', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(0)
  })
  afterEach(() => vi.useRealTimers())

  it('combines URL and snapshot updates, exposes the latest share URL immediately, and skips duplicates', () => {
    const { port, writer } = setup()
    writer.replace({ scrollTop: 40 })
    writer.setUrl('#year=750')
    expect(writer.url()).toBe('https://example.test/#year=750')
    expect(port.replaceState).not.toHaveBeenCalled()
    vi.advanceTimersByTime(0)
    expect(port.replaceState).toHaveBeenLastCalledWith({ scrollTop: 40 }, '', writer.url())
    writer.replace({ scrollTop: 40 })
    writer.setUrl('#year=750')
    vi.advanceTimersByTime(400)
    expect(port.replaceState).toHaveBeenCalledTimes(1)
  })

  it('bounds continuous camera/scroll writes and eventually saves the final value', () => {
    const { port, writer } = setup()
    for (let i = 0; i < 200; i++) {
      writer.replace({ scrollTop: i })
      writer.setUrl(`#year=${i + 1}`)
      vi.advanceTimersByTime(10)
    }
    vi.advanceTimersByTime(400)
    expect(port.replaceState.mock.calls.length).toBeLessThanOrEqual(7)
    expect(port.state).toEqual({ scrollTop: 199 })
    expect(writer.url()).toContain('year=200')
  })

  it('immediately saves an explicit reading destination before a reload', () => {
    const { port, writer } = setup()
    writer.replace({ selection: 'origin' })
    vi.advanceTimersByTime(0)
    writer.replace({ selection: 'qing' })
    writer.setUrl('#year=1750&dynasty=qing', true)
    expect(port.state).toEqual({ selection: 'qing' })
    expect(port.replaceState).toHaveBeenLastCalledWith(
      { selection: 'qing' },
      '',
      'https://example.test/#year=1750&dynasty=qing',
    )
  })

  it('survives rejected writes and retries the latest state instead of stale scroll/camera data', () => {
    const { port, writer } = setup()
    port.replaceState.mockImplementationOnce(() => {
      throw new DOMException('rate limited', 'SecurityError')
    })
    writer.replace({ scrollTop: 12 })
    expect(() => vi.advanceTimersByTime(0)).not.toThrow()
    writer.replace({ scrollTop: 80 })
    writer.setUrl('#year=1082')
    vi.advanceTimersByTime(1000)
    expect(port.state).toEqual({ scrollTop: 80 })
    expect(writer.url()).toContain('1082')
  })

  it('discards pending writes when navigating back or entering an external hash', () => {
    const { port, writer } = setup()
    writer.replace({ selection: 'new' })
    writer.setUrl('#year=1894')
    writer.discard()
    vi.runAllTimers()
    expect(port.replaceState).not.toHaveBeenCalled()
    expect(writer.url()).toContain('year=230')
  })

  it('flushes an origin before pushing and returns failure without throwing when push is blocked', () => {
    const { port, writer } = setup()
    writer.replace({ selection: 'origin' })
    writer.setUrl('#person=sushi')
    expect(writer.push({ selection: 'next' })).toBe(true)
    expect(port.replaceState).toHaveBeenCalledWith(
      { selection: 'origin' },
      '',
      'https://example.test/#person=sushi',
    )
    expect(port.state).toEqual({ selection: 'next' })
    port.pushState.mockImplementationOnce(() => {
      throw new DOMException('rate limited', 'SecurityError')
    })
    expect(writer.push({ selection: 'later' })).toBe(false)
  })
})
