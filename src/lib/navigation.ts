import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import type { Camera } from '../components/HistoryMap'
import type { Category, EventScope, ExplorationFilter, PanelMode, Selection } from '../types'
import { MIN_YEAR, MAX_YEAR } from './history'
import { createHistoryWriter } from './history-writer'

export interface ArchiveFilters {
  query: string
  period: string
  allChanges: boolean
}
export interface NavigationView {
  selection: Selection | null
  mode: PanelMode
  year: number
  scope: EventScope
  category: '全部' | Category
  exploration: ExplorationFilter
  explorationOpen: boolean
  camera: Camera | null
  compareYear: number | null
  tourState: { id: string; step: number } | null
  trailPerson: string | null
  trailPoint: string | null
  showFutureJourney: boolean
  showCities: boolean
  showEvents: boolean
  hiddenPolities: string[]
  mobileView: 'split' | 'map' | 'reading'
  peopleRange: 'period' | 'all'
  peopleQuery: string
  peopleDepth: 'all' | 'reading' | 'journey'
  peopleLimit: number
  dynastyRange: 'period' | 'all'
  query: string
  playbackMode: 'years' | 'events'
  archiveFilters: ArchiveFilters
  scrollTop?: number
}

const navigationCacheKey = 'time-atlas:session-navigation'
function readingAddress(url: string) {
  const address = new URL(url, window.location.href)
  const params = new URLSearchParams(address.hash.slice(1))
  for (const key of ['lng', 'lat', 'zoom']) params.delete(key)
  address.hash = params.toString()
  return address.href
}
function initialNavigationStack(): NavigationView[] {
  // WebKit can lose the just-replaced native state during an immediate reload.
  // Only recover this tab's matching reading entry on reload, never a new link
  // or browser back/forward navigation.
  if (
    (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type ===
    'reload'
  ) {
    try {
      const saved = JSON.parse(sessionStorage.getItem(navigationCacheKey) ?? 'null')
      if (
        saved?.version === 1 &&
        Array.isArray(saved.stack) &&
        readingAddress(saved.url) === readingAddress(window.location.href)
      )
        return saved.stack.slice(-32)
    } catch {
      // Session storage is optional (private browsing or quota restrictions).
    }
  }
  const state = window.history.state?.timeAtlas
  return state?.version === 1 && Array.isArray(state.stack) ? state.stack.slice(-32) : []
}

/** Deliberate visits create history entries; camera and playback updates replace them. */
export function useNavigationHistory(
  view: NavigationView,
  panel: RefObject<HTMLDivElement | null>,
  onRestore: (view: NavigationView) => void,
) {
  const viewRef = useRef(view)
  viewRef.current = view
  const restoreRef = useRef(onRestore)
  restoreRef.current = onRestore
  const [initialStack] = useState(initialNavigationStack)
  const stack = useRef<NavigationView[]>(initialStack)
  const [previous, setPrevious] = useState<NavigationView | null>(stack.current.at(-1) ?? null)
  const popHash = useRef<string | null>(null)
  const [writer] = useState(() => createHistoryWriter(window.history, () => window.location.href))
  const localBack = useRef<NavigationView[]>([])
  const cached = useRef<{ url: string; stack: NavigationView[] } | null>(null)
  const snapshot = useCallback(
    () => ({ ...viewRef.current, scrollTop: panel.current?.scrollTop ?? 0 }),
    [panel],
  )
  const cache = useCallback((url: string) => {
    const address = readingAddress(url)
    if (cached.current?.url === address && cached.current.stack === stack.current) return
    try {
      sessionStorage.setItem(
        navigationCacheKey,
        JSON.stringify({ version: 1, url: address, stack: stack.current }),
      )
      cached.current = { url: address, stack: stack.current }
    } catch {
      // Native history remains usable when storage is unavailable.
    }
  }, [])
  const save = useCallback(() => {
    writer.replace({ timeAtlas: { version: 1, view: snapshot(), stack: stack.current } })
    cache(writer.url())
  }, [snapshot, writer, cache])
  const setUrl = useCallback(
    (url: string, immediate = false) => {
      writer.setUrl(url, immediate)
      cache(writer.url())
    },
    [writer, cache],
  )
  const remember = useCallback(() => {
    save()
    const current = snapshot()
    const nextStack = [...stack.current, current].slice(-32)
    if (
      !localBack.current.length &&
      writer.push({ timeAtlas: { version: 1, view: current, stack: nextStack } })
    )
      stack.current = nextStack
    else localBack.current = [...localBack.current, current].slice(-32)
    setPrevious(current)
  }, [save, snapshot, writer])
  const clear = useCallback(() => {
    writer.discard()
    localBack.current = []
    stack.current = []
    setPrevious(null)
  }, [writer])
  useEffect(save, [view, save])
  useEffect(() => {
    const pop = (event: PopStateEvent) => {
      writer.discard()
      localBack.current = []
      const state = event.state?.timeAtlas
      if (state?.version !== 1 || !state.view) return
      stack.current = Array.isArray(state.stack) ? state.stack : []
      setPrevious(stack.current.at(-1) ?? null)
      popHash.current = window.location.hash
      restoreRef.current(state.view)
    }
    window.addEventListener('popstate', pop)
    // Semantic destinations are already saved synchronously. A late camera URL
    // rewrite during pagehide can invalidate WebKit's pending reload/history
    // state, so drop only the queued background update when leaving the page.
    const leave = () => writer.discard()
    window.addEventListener('pagehide', leave)
    return () => {
      window.removeEventListener('popstate', pop)
      window.removeEventListener('pagehide', leave)
      writer.discard()
    }
  }, [writer])
  return {
    remember,
    previous,
    save,
    clear,
    setUrl,
    url: writer.url,
    back: () => {
      const local = localBack.current.pop()
      if (local) {
        writer.discard()
        restoreRef.current(local)
        setPrevious(localBack.current.at(-1) ?? stack.current.at(-1) ?? null)
        return true
      }
      if (!stack.current.length) return false
      save()
      writer.flush()
      window.history.back()
      return true
    },
    consumeHashChange: () => {
      const handled = popHash.current === window.location.hash
      popHash.current = null
      return handled
    },
  }
}

const modes: PanelMode[] = [
  'events',
  'people',
  'dynasties',
  'places',
  'tours',
  'saved',
  'overview',
  'comparison',
]
export function parseViewParams(hash: string) {
  const params = new URLSearchParams(hash.replace(/^#/, ''))
  const category = params.get('category')
  const bool = (key: string) =>
    params.get(key) === '1' ? true : params.get(key) === '0' ? false : undefined
  const pair = params.get('range')?.split(',').map(Number)
  const validYear = (n: number) => Number.isInteger(n) && n !== 0 && n >= MIN_YEAR && n <= MAX_YEAR
  const range: [number, number] | null =
    pair?.length === 2 && pair.every(validYear) && pair[0] <= pair[1] ? [pair[0], pair[1]] : null
  const box = params.get('bounds')?.split(',').map(Number)
  const bounds: ExplorationFilter['bounds'] =
    box?.length === 4 &&
    box.every(Number.isFinite) &&
    box[1] >= -90 &&
    box[3] <= 90 &&
    box[1] < box[3] &&
    Math.abs(box[0]) <= 720 &&
    Math.abs(box[2]) <= 720
      ? [box[0], box[1], box[2], box[3]]
      : null
  return {
    category: (['战争', '政治', '文化', '交流', '社会'].includes(category ?? '')
      ? category
      : '全部') as Category | '全部',
    cities: bool('cities'),
    events: bool('events'),
    hidden: params
      .getAll('hide')
      .slice(0, 256)
      .filter((s) => s.length < 150),
    mode: modes.includes(params.get('view') as PanelMode)
      ? (params.get('view') as PanelMode)
      : undefined,
    place: params.get('place'),
    polity: params.get('polity'),
    exploration: { place: params.get('area') ?? '', range, bounds },
    playbackMode: params.get('play') === 'events' ? ('events' as const) : ('years' as const),
    archiveFilters: {
      query: (params.get('archiveQuery') ?? '').slice(0, 200),
      period: params.get('archivePeriod') ?? 'all',
      allChanges: bool('changes') ?? false,
    },
  }
}
