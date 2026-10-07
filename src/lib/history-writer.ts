type HistoryPort = Pick<History, 'state' | 'replaceState' | 'pushState'>

/** Coalesce scroll, camera and URL updates into one bounded browser write. */
export function createHistoryWriter(history: HistoryPort, getHref: () => string, interval = 400) {
  let pending: { state: unknown; url: string } | null = null
  let timer: ReturnType<typeof setTimeout> | undefined
  let lastWrite = -Infinity
  let lastValue = ''

  function cancelTimer() {
    if (timer !== undefined) clearTimeout(timer)
    timer = undefined
  }
  function schedule(delay = Math.max(0, interval - (Date.now() - lastWrite))) {
    if (timer === undefined) timer = setTimeout(flush, delay)
  }
  function flush(): boolean {
    cancelTimer()
    if (!pending) return true
    const next = pending
    try {
      const value = JSON.stringify(next)
      if (value !== lastValue || getHref() !== next.url) {
        history.replaceState(next.state, '', next.url)
        lastValue = value
        lastWrite = Date.now()
      }
      pending = null
      return true
    } catch {
      // WebKit can reject history writes after frequent interaction or while
      // the document is inactive. Keep reading usable and retry the latest state.
      schedule(1000)
      return false
    }
  }
  return {
    replace(state: unknown) {
      pending = { state, url: pending?.url ?? getHref() }
      schedule()
    },
    setUrl(url: string, immediate = false) {
      pending = {
        state: pending ? pending.state : history.state,
        url: new URL(url, getHref()).href,
      }
      if (immediate) flush()
      else schedule()
    },
    url: () => pending?.url ?? getHref(),
    flush,
    push(state: unknown) {
      if (!flush()) return false
      try {
        history.pushState(state, '', getHref())
        lastValue = ''
        lastWrite = Date.now()
        return true
      } catch {
        return false
      }
    },
    discard() {
      cancelTimer()
      pending = null
      lastValue = ''
    },
  }
}
