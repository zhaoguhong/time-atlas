import { useCallback, useEffect, useRef, useState } from 'react'
import { fromOrdinal, toOrdinal } from '../lib/history'
import type { BrowseStop } from '../lib/pillar-browse'
import type { PillarView } from './use-pillar-view'

/** An independent event/dwell clock, with synchronous cancellation on interaction. */
export function usePillarBrowse(options: {
  active: boolean
  stops: BrowseStop[]
  dwell: number
  view: PillarView
  onFrame: (view: PillarView) => void
  onArrive: (view: PillarView) => void
  onStop: () => void
}) {
  const latest = useRef(options)
  latest.current = options
  const work = useRef<{
    frame?: number
    timer?: ReturnType<typeof setTimeout>
    cancelled: boolean
  }>({ cancelled: true })
  const [stop, setStop] = useState<BrowseStop | null>(null)
  const [travelling, setTravelling] = useState(false)
  const cancel = useCallback(() => {
    work.current.cancelled = true
    if (work.current.frame !== undefined) cancelAnimationFrame(work.current.frame)
    if (work.current.timer !== undefined) clearTimeout(work.current.timer)
  }, [])
  useEffect(() => {
    if (!options.active) return
    const run = { cancelled: false } as typeof work.current
    work.current = run
    let view = latest.current.view
    const stops = options.stops.filter((candidate) => candidate.year >= view.year)
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const visit = (index: number) => {
      if (run.cancelled) return
      const destination = stops[index]
      if (!destination) {
        latest.current.onStop()
        return
      }
      const next = { year: destination.year, span: view.span, ordinal: toOrdinal(destination.year) }
      const arrive = () => {
        if (run.cancelled) return
        view = next
        latest.current.onArrive(next)
        setStop(destination)
        setTravelling(false)
        run.timer = setTimeout(() => visit(index + 1), options.dwell * 1000)
      }
      const start = view.ordinal ?? toOrdinal(view.year)
      if (motion.matches || start === next.ordinal) {
        arrive()
        return
      }
      setTravelling(true)
      let began: number | undefined
      const animate = (now: number) => {
        if (run.cancelled) return
        began ??= now
        const progress = motion.matches ? 1 : Math.min(1, (now - began) / 1200)
        const eased = progress * progress * (3 - 2 * progress)
        const ordinal = start + (next.ordinal - start) * eased
        if (progress === 1) arrive()
        else {
          latest.current.onFrame({
            year: fromOrdinal(Math.round(ordinal)),
            ordinal,
            span: view.span,
          })
          run.frame = requestAnimationFrame(animate)
        }
      }
      run.frame = requestAnimationFrame(animate)
    }
    visit(0)
    const hide = () => {
      if (document.hidden) latest.current.onStop()
    }
    document.addEventListener('visibilitychange', hide)
    return () => {
      cancel()
      document.removeEventListener('visibilitychange', hide)
    }
  }, [options.active, options.stops, options.dwell, cancel])
  return { cancel, stop, travelling: options.active && travelling }
}
