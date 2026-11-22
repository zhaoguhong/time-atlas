import { useEffect, useRef, type RefObject } from 'react'

export type TopicPosition = { block: string; offset: number }

export function topicPositionAt(article: HTMLElement, top: number): TopicPosition | null {
  for (const element of article.querySelectorAll<HTMLElement>('[data-article-block]')) {
    const box = element.getBoundingClientRect()
    const block = element.dataset.articleBlock
    if (block && box.height && box.bottom > top + 20)
      return { block, offset: (box.top - top) / box.height }
  }
  return null
}

/** Article position is independent of the explicitly marked event chapters. */
export function useTopicPosition(
  topicId: string,
  articleRef: RefObject<HTMLElement | null>,
  panelRef: RefObject<HTMLDivElement | null>,
  openingPosition?: TopicPosition | null,
) {
  const initialPosition = useRef(openingPosition)
  useEffect(() => {
    const panel = panelRef.current
    const article = articleRef.current
    if (!panel || !article) return
    // Paragraph indices belong to a specific edition of an essay.
    const key = `time-atlas:topic-article:v7:${topicId}`
    let restored = false
    const save = () => {
      if (!restored || !panel.clientHeight || !article.isConnected) return
      try {
        const position =
          panel.scrollTop > 8 ? topicPositionAt(article, panel.getBoundingClientRect().top) : null
        localStorage.setItem(key, JSON.stringify(position))
      } catch {
        // Reading remains available when browser storage is blocked or full.
      }
    }
    // Restore after the parent navigation effect and responsive layout reset.
    const frame = requestAnimationFrame(() => {
      try {
        const saved = initialPosition.current ?? JSON.parse(localStorage.getItem(key) ?? 'null')
        if (typeof saved?.block === 'string' && Number.isFinite(saved.offset)) {
          const block = [...article.querySelectorAll<HTMLElement>('[data-article-block]')].find(
            (element) => element.dataset.articleBlock === saved.block,
          )
          if (block) {
            const box = block.getBoundingClientRect()
            panel.scrollTop +=
              box.top - panel.getBoundingClientRect().top - saved.offset * box.height
          }
        }
      } catch {
        // Invalid positions simply open the article at its start.
      }
      initialPosition.current = null
      restored = true
    })
    panel.addEventListener('scroll', save, { passive: true })
    window.addEventListener('pagehide', save)
    return () => {
      save()
      cancelAnimationFrame(frame)
      panel.removeEventListener('scroll', save)
      window.removeEventListener('pagehide', save)
    }
  }, [topicId, articleRef, panelRef])
}
