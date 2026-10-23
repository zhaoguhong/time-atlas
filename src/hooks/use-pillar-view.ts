import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { fromOrdinal, toOrdinal } from '../lib/history'

export type PillarView = { year: number; span: number; ordinal?: number }
const center = (view: PillarView) => view.ordinal ?? toOrdinal(view.year)

/** Tween deliberate navigation; direct manipulation always follows the pointer. */
export function usePillarView(
  year: number,
  span: number,
  direct: boolean,
  ordinal = toOrdinal(year),
) {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [view, setView] = useState<PillarView>({ year, span, ordinal })
  const [moving, setMoving] = useState(false)
  const displayed = useRef(view)
  const animationFrame = useRef<number | null>(null)

  // A gesture may finish before its throttled preview gets a painted frame.
  // Anchor the final live view now so the following committed props do not
  // accidentally start another tween from an older displayed position.
  const settle = useCallback((next: PillarView) => {
    if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current)
    animationFrame.current = null
    displayed.current = next
    setView(next)
    setMoving(false)
  }, [])

  useLayoutEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const change = () => setReduced(query.matches)
    query.addEventListener('change', change)
    return () => query.removeEventListener('change', change)
  }, [])

  useLayoutEffect(() => {
    const target = { year, span, ordinal }
    const start = displayed.current
    if (direct || reduced || (center(start) === ordinal && start.span === span)) {
      displayed.current = target
      setView(target)
      setMoving(false)
      return
    }

    let began: number | undefined
    setMoving(true)
    const animate = (now: number) => {
      began ??= now
      const progress = Math.min(1, (now - began) / 320)
      const eased = 1 - (1 - progress) ** 3
      const next =
        progress === 1
          ? target
          : {
              year: fromOrdinal(Math.round(center(start) + (ordinal - center(start)) * eased)),
              ordinal: center(start) + (ordinal - center(start)) * eased,
              // Logarithmic scaling gives zoom-in and zoom-out the same perceived speed.
              span: Math.exp(Math.log(start.span) + Math.log(span / start.span) * eased),
            }
      displayed.current = next
      setView(next)
      if (progress < 1) animationFrame.current = requestAnimationFrame(animate)
      else {
        animationFrame.current = null
        setMoving(false)
      }
    }
    animationFrame.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current)
      animationFrame.current = null
    }
  }, [year, span, ordinal, direct, reduced])

  // Do not leave a frame of interpolation behind a live gesture or playback.
  return direct || reduced
    ? { year, span, ordinal, moving: false, settle }
    : { ...view, ordinal: center(view), moving, settle }
}
