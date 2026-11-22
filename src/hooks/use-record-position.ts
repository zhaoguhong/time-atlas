import { useEffect, type RefObject } from 'react'

export function useRecordPosition(
  panelRef: RefObject<HTMLDivElement | null>,
  key: string | null,
  ready: boolean,
) {
  useEffect(() => {
    const panel = panelRef.current
    if (!panel || !key || !ready) return
    const storageKey = `time-atlas:record-position:${key}`
    let restored = false
    const save = () => {
      if (!restored || !panel.clientHeight) return
      try {
        localStorage.setItem(storageKey, String(panel.scrollTop))
      } catch {
        /* Optional storage. */
      }
    }
    const frame = requestAnimationFrame(() => {
      try {
        const top = Number(localStorage.getItem(storageKey))
        if (Number.isFinite(top) && top > 0) panel.scrollTop = top
      } catch {
        /* Optional storage. */
      }
      restored = true
    })
    panel.addEventListener('scroll', save, { passive: true })
    window.addEventListener('pagehide', save)
    return () => {
      cancelAnimationFrame(frame)
      panel.removeEventListener('scroll', save)
      window.removeEventListener('pagehide', save)
    }
  }, [panelRef, key, ready])
}
