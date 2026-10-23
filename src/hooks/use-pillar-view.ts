import { useLayoutEffect, useRef, useState } from 'react'
import { fromOrdinal, toOrdinal } from '../lib/history'

type View = { year: number; span: number }

/** Tween deliberate navigation; direct manipulation always follows the pointer. */
export function usePillarView(year: number, span: number, direct: boolean) {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [view, setView] = useState<View>({ year, span })
  const [moving, setMoving] = useState(false)
  const displayed = useRef(view)

  useLayoutEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const change = () => setReduced(query.matches)
    query.addEventListener('change', change)
    return () => query.removeEventListener('change', change)
  }, [])

  useLayoutEffect(() => {
    const target = { year, span }
    const start = displayed.current
    if (direct || reduced || (start.year === year && start.span === span)) {
      displayed.current = target
      setView(target)
      setMoving(false)
      return
    }

    let frame = 0
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
              year: fromOrdinal(
                Math.round(
                  toOrdinal(start.year) + (toOrdinal(year) - toOrdinal(start.year)) * eased,
                ),
              ),
              // Logarithmic scaling gives zoom-in and zoom-out the same perceived speed.
              span: Math.exp(Math.log(start.span) + Math.log(span / start.span) * eased),
            }
      displayed.current = next
      setView(next)
      if (progress < 1) frame = requestAnimationFrame(animate)
      else setMoving(false)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [year, span, direct, reduced])

  // Do not leave a frame of interpolation behind a live gesture or playback.
  return direct || reduced ? { year, span, moving: false } : { ...view, moving }
}
