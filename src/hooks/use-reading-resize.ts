import { useLayoutEffect, type DependencyList, type RefObject } from 'react'

const readingBlock = 'p, h1, h2, h3, h4, li, button, a, summary, figure'

/** Keep the visible reading block in place when responsive layouts reflow its text. */
export function useReadingResize(
  panelRef: RefObject<HTMLDivElement | null>,
  contentIdentity: DependencyList,
) {
  useLayoutEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    let width = panel.clientWidth
    let hidden = !width || !panel.clientHeight
    let anchor: { element: HTMLElement; top: number; height: number } | null = null

    const capture = () => {
      // A resize can emit a clamped scroll before ResizeObserver. Keep the
      // previous block until the observer restores it against the new width.
      if (!panel.clientHeight || !panel.clientWidth || panel.clientWidth !== width) return
      if (panel.scrollTop <= 1) {
        anchor = null
        return
      }
      const box = panel.getBoundingClientRect()
      for (const offset of [4, 16, 32, 48]) {
        if (offset >= box.height) break
        const element = document
          .elementFromPoint(box.left + box.width / 2, box.top + offset)
          ?.closest<HTMLElement>(readingBlock)
        if (!element || !panel.contains(element)) continue
        const block = element.getBoundingClientRect()
        anchor = { element, top: block.top - box.top, height: block.height }
        return
      }
    }
    const observer = new ResizeObserver(() => {
      const nextWidth = panel.clientWidth
      if (!nextWidth || !panel.clientHeight) {
        hidden = true
        return
      }
      // No anchor means there is nothing to restore. In particular, an old
      // "at the top" sample must not erase a scroll that just preceded resizing.
      if ((hidden || nextWidth !== width) && anchor && panel.contains(anchor.element)) {
        const box = panel.getBoundingClientRect()
        const block = anchor.element.getBoundingClientRect()
        // Preserve progress within a partially visible paragraph even when
        // fewer lines make its old pixel offset larger than its new height.
        const top =
          anchor.top < 0 && anchor.height > 0
            ? (anchor.top / anchor.height) * block.height
            : anchor.top
        panel.scrollTop += block.top - box.top - top
      }
      width = nextWidth
      hidden = false
      capture()
    })
    capture()
    // Sample synchronously: rotation can happen before a queued animation frame.
    panel.addEventListener('scroll', capture, { passive: true })
    observer.observe(panel)
    return () => {
      observer.disconnect()
      panel.removeEventListener('scroll', capture)
    }
    // The caller lists the same content changes that reset/restore its reader.
    // A new reading context must discard the outgoing content's resize anchor.
  }, [panelRef, ...contentIdentity])
}
