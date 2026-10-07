import { eventsAtYear } from './lib/current-events'
import { formatEventDate, eventDateRelation } from './lib/history'
import { readingSourceUrl } from './lib/source-links'
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  ChevronRight,
  Compass,
  ExternalLink,
  Flag,
  Info,
  Layers,
  MapPin,
  Search,
  Share2,
  Sparkles,
  Swords,
  Route,
  Users,
  X,
  BookOpen,
  Globe2,
  PanelRightClose,
  Pin,
  MoreHorizontal,
} from 'lucide-react'
import type { Camera } from './components/HistoryMap'
const HistoryMap = lazy(() => import('./components/HistoryMap'))
import Timeline from './components/Timeline'
import MobileSheetHandle from './components/MobileSheetHandle'
import JourneyPanel from './components/JourneyPanel'
import DynastyPanel, { DynastyIntroduction } from './components/DynastyPanel'
import ReadingText from './components/ReadingText'
import TopicPanel from './components/TopicPanel'
import PlacePanel from './components/PlacePanel'
import ComparisonPanel from './components/ComparisonPanel'
import ExplorationFilters from './components/ExplorationFilters'
import {
  places,
  placeById,
  namesPlace,
  filterExploration,
  emptyExploration,
} from './lib/exploration'
import { parseViewParams, useNavigationHistory, type NavigationView } from './lib/navigation'
import { readProgress, writeProgress, readingSelectionKey } from './lib/reading-progress'
import { events, eventById, people, personById } from './data/content'
import { periods, tours } from './data/periods'
import { profiles, periodCourses } from './data/learning'
import { journeyByPerson } from './data/journeys'
import { dynasties, dynastyById, dynastyForMap } from './data/dynasties'
import {
  TOPIC_CHAPTER_DURATION_MS,
  YEAR_DURATION_MS,
  EVENT_YEAR_DURATION_MS,
  eventPlaybackYears,
} from './lib/playback'
import {
  activeJourneyNode,
  journeyEvents,
  matchesPerson,
  personFocusYear,
  visibleJourneyNodes,
} from './lib/journeys'
import type {
  Category,
  EventScope,
  HistoryEvent,
  PanelMode,
  PolityProperties,
  Selection,
  Source,
  JourneyView,
  MapBounds,
  ExplorationFilter,
} from './types'
import {
  clampYear,
  compactYear,
  eventsInPeriod,
  formatYear,
  matchesEvent,
  fromOrdinal,
  lifeDates,
  MAX_YEAR,
  MIN_YEAR,
  eventsInScope,
  scopeDescription,
  parseHash,
  periodAt,
  readPreferences,
  toOrdinal,
  writePreferences,
} from './lib/history'

type MapFocus = Parameters<typeof HistoryMap>[0]['focus']
type TourState = { id: string; step: number } | null
const allTours = [...tours, ...periodCourses]
const categories: ('全部' | Category)[] = ['全部', '战争', '政治', '文化', '交流', '社会']
const categoryColors: Record<string, string> = {
  战争: '#a76f58',
  政治: '#4e796d',
  文化: '#7b809d',
  交流: '#9f8a55',
  社会: '#8b9a67',
}

function initialState() {
  const preferences = readPreferences(),
    hash = parseHash(window.location.hash)
  const view = parseViewParams(window.location.hash)
  let selection: Selection | null = null
  if (hash.event && eventById.has(hash.event)) selection = { type: 'event', id: hash.event }
  else if (hash.person && personById.has(hash.person))
    selection = { type: 'person', id: hash.person }
  else if (hash.dynasty && dynastyById.has(hash.dynasty))
    selection = { type: 'dynasty', id: hash.dynasty }
  else if (view.place && placeById.has(view.place)) selection = { type: 'place', id: view.place }
  else if (view.polity) selection = { type: 'polity', id: view.polity }
  let year =
    hash.year ??
    (selection?.type === 'event' ? eventById.get(selection.id)!.year : preferences.year)
  const journey =
    hash.person && hash.journey === hash.person ? journeyByPerson.get(hash.person) : undefined
  if (journey) year = Math.min(journey.nodes.at(-1)!.year, Math.max(journey.nodes[0].year, year))
  else if (selection?.type === 'person')
    year = personFocusYear(personById.get(selection.id)!, year, journeyByPerson.get(selection.id))
  const topic = allTours.find((item) => item.id === hash.tour)
  const step = topic
    ? Math.max(topic.chapters ? -1 : 0, Math.min(topic.steps.length - 1, hash.step ?? -1))
    : -1
  if (topic) {
    selection = step < 0 ? null : { type: 'event', id: topic.steps[step] }
    year = eventById.get(topic.steps[Math.max(0, step)])!.year
  }
  return {
    preferences,
    view,
    year,
    selection,
    scope: hash.scope ?? preferences.scope,
    compare: hash.compare ?? null,
    trail:
      !topic && hash.person && hash.journey === hash.person && journeyByPerson.has(hash.person)
        ? hash.person
        : null,
    point: hash.point ?? null,
    future: hash.future,
    tour: topic ? { id: topic.id, step } : null,
  }
}
function readCamera(): Camera | null {
  const params = new URLSearchParams(window.location.hash.slice(1))
  if (!['lng', 'lat', 'zoom'].every((key) => params.has(key))) return null
  const lng = Number(params.get('lng')),
    lat = Number(params.get('lat')),
    zoom = Number(params.get('zoom'))
  return Number.isFinite(lng) &&
    Number.isFinite(lat) &&
    Number.isFinite(zoom) &&
    Math.abs(lng) <= 180 &&
    Math.abs(lat) <= 80 &&
    zoom >= -1 &&
    zoom <= 8
    ? { lng, lat, zoom }
    : null
}

function Sources({ sources }: { sources: Source[] }) {
  return (
    <div className="reference-list">
      <span className="eyebrow">继续阅读 · 参考资料</span>
      {sources.map((source, i) => (
        <a
          key={`${source.url}-${i}`}
          href={readingSourceUrl(source.url)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BookOpen size={14} />
          <span>{source.title}</span>
          <ExternalLink size={12} />
        </a>
      ))}
    </div>
  )
}
function Avatar({ id, size = 'normal' }: { id: string; size?: 'normal' | 'large' }) {
  const person = personById.get(id)
  if (!person) return null
  return (
    <span
      className={`avatar ${size}`}
      style={{ '--avatar-color': person.color } as React.CSSProperties}
    >
      {person.name.slice(0, 1)}
      <span className="avatar-stroke" />
    </span>
  )
}

export default function App() {
  const [initial] = useState(initialState)
  const [year, setYear] = useState(initial.year)
  const [selection, setSelection] = useState<Selection | null>(initial.selection)
  const [mode, setMode] = useState<PanelMode>(
    initial.view.mode ?? (initial.tour ? 'tours' : 'events'),
  )
  const [mobileView, setMobileView] = useState<'split' | 'map' | 'reading'>('map')
  const [category, setCategory] = useState<'全部' | Category>(initial.view.category)
  const [scope, setScope] = useState<EventScope>(initial.scope)
  const [exploration, setExploration] = useState<ExplorationFilter>(initial.view.exploration)
  const [explorationOpen, setExplorationOpen] = useState(false)
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null)
  const [playbackMode, setPlaybackMode] = useState<'years' | 'events'>(initial.view.playbackMode)
  const [archiveFilters, setArchiveFilters] = useState(initial.view.archiveFilters)
  const [progress, setProgress] = useState(readProgress)
  const [moreOpen, setMoreOpen] = useState(false)
  const [compareYear, setCompareYear] = useState<number | null>(initial.compare)
  const [compareDraft, setCompareDraft] = useState(String(initial.compare ?? 220))
  const [compareError, setCompareError] = useState('')
  const [trailPerson, setTrailPerson] = useState<string | null>(initial.trail)
  const [trailPoint, setTrailPoint] = useState<string | null>(initial.point)
  const [showFutureJourney, setShowFutureJourney] = useState(initial.future)
  const [journeyResetToken, setJourneyResetToken] = useState(0)
  const [peopleRange, setPeopleRange] = useState<'period' | 'all'>('period')
  const [peopleQuery, setPeopleQuery] = useState('')
  const [peopleDepth, setPeopleDepth] = useState<'all' | 'reading' | 'journey'>('all')
  const [peopleLimit, setPeopleLimit] = useState(80)
  const [dynastyRange, setDynastyRange] = useState<'period' | 'all'>('period')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchLimit, setSearchLimit] = useState(12)
  const [searchIndex, setSearchIndex] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [readerCollapsed, setReaderCollapsed] = useState(false)
  const [followYear, setFollowYear] = useState(true)
  const [playbackReading, setPlaybackReading] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [showCities, setShowCities] = useState(initial.view.cities ?? initial.preferences.cities)
  const [showEvents, setShowEvents] = useState(
    initial.view.events ?? (initial.tour ? true : initial.preferences.events),
  )
  const [bookmarks, setBookmarks] = useState(initial.preferences.bookmarks)
  const [polities, setPolities] = useState<PolityProperties[]>([])
  const [hiddenPolities, setHiddenPolities] = useState<string[]>(initial.view.hidden)
  const [focus, setFocus] = useState<MapFocus>(() =>
    initial.selection?.type === 'event' && !readCamera()
      ? { coordinates: eventById.get(initial.selection.id)!.coordinates, token: Date.now() }
      : initial.selection?.type === 'place' && !readCamera()
        ? {
            coordinates: placeById.get(initial.selection.id)!.coordinates,
            zoom: 5,
            token: Date.now(),
          }
        : null,
  )
  const [camera, setCamera] = useState<Camera | null>(readCamera)
  const [initialCamera] = useState(readCamera)
  const previousJourneyNode = useRef<string | null>(
    initial.trail && initialCamera
      ? `${initial.trail}:${activeJourneyNode(journeyByPerson.get(initial.trail)!.nodes, initial.year, initial.point)?.id}`
      : null,
  )
  const [layersOpen, setLayersOpen] = useState(false)
  const [tourState, setTourState] = useState<TourState>(initial.tour)
  const showRoutes = tourState?.id === 'silk-road'
  const [toast, setToast] = useState('')
  const [dialog, setDialog] = useState<'sources' | 'share' | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const pendingScroll = useRef<number | null>(null)
  const changeMobileView = useCallback((view: 'map' | 'split' | 'reading') => {
    setMobileView(view)
    if (view === 'reading') setPlaying(false)
  }, [])
  const view: NavigationView = {
    selection,
    mode,
    year,
    scope,
    category,
    exploration,
    explorationOpen,
    camera,
    compareYear,
    tourState,
    trailPerson,
    trailPoint,
    showFutureJourney,
    showCities,
    showEvents,
    hiddenPolities,
    mobileView,
    peopleRange,
    peopleQuery,
    peopleDepth,
    peopleLimit,
    dynastyRange,
    query,
    playbackMode,
    archiveFilters,
  }
  const navigation = useNavigationHistory(view, panelRef, (previous) => {
    pendingScroll.current = previous.scrollTop ?? 0
    setSelection(previous.selection)
    setMode(previous.mode)
    setYear(previous.year)
    setScope(previous.scope)
    setCategory(previous.category)
    setExploration(previous.exploration)
    setExplorationOpen(previous.explorationOpen ?? false)
    setCamera(previous.camera)
    setCompareYear(previous.compareYear)
    setCompareDraft(String(previous.compareYear ?? 220))
    setTourState(previous.tourState)
    setTrailPerson(previous.trailPerson)
    setTrailPoint(previous.trailPoint)
    setShowFutureJourney(previous.showFutureJourney)
    setShowCities(previous.showCities)
    setShowEvents(previous.showEvents)
    setHiddenPolities(previous.hiddenPolities)
    setMobileView(previous.mobileView)
    setPeopleRange(previous.peopleRange)
    setPeopleQuery(previous.peopleQuery)
    setPeopleDepth(previous.peopleDepth)
    setPeopleLimit(previous.peopleLimit)
    setDynastyRange(previous.dynastyRange)
    setQuery(previous.query)
    setPlaybackMode(previous.playbackMode)
    setArchiveFilters(previous.archiveFilters ?? { query: '', period: 'all', allChanges: false })
    setPlaying(false)
    setPlaybackReading(false)
    setReaderCollapsed(false)
    setSearchOpen(false)
    if (previous.camera) setFocus({ camera: previous.camera, token: Date.now() })
  })
  const rememberView = navigation.remember
  const yearRef = useRef(year)
  yearRef.current = year
  const tour = allTours.find((item) => item.id === tourState?.id)
  const period = periodAt(year)
  const profile = profiles[period.id]
  const periodEvents = useMemo(() => eventsInPeriod(events, year), [year])
  const explorationEvents = useMemo(
    () =>
      filterExploration(events, exploration).filter(
        (event) => category === '全部' || event.category === category,
      ),
    [exploration, category],
  )
  const filteredEvents = useMemo(
    () => (exploration.range ? explorationEvents : eventsInScope(explorationEvents, year, scope)),
    [year, exploration, explorationEvents, scope],
  )
  const currentYearEvents = useMemo(
    () => eventsAtYear(explorationEvents, year),
    [year, explorationEvents],
  )
  const personJourney = trailPerson ? journeyByPerson.get(trailPerson) : undefined
  const trail = useMemo<JourneyView | null>(() => {
    if (!personJourney || !trailPerson) return null
    return {
      personId: trailPerson,
      name: personById.get(trailPerson)!.name,
      nodes: personJourney.nodes,
      activeId: activeJourneyNode(personJourney.nodes, year, trailPoint)?.id ?? null,
      showFuture: showFutureJourney,
    }
  }, [personJourney, trailPerson, year, trailPoint, showFutureJourney])
  const trailTimelineEvents = useMemo(
    () => (trail ? journeyEvents(trail.nodes, trail.personId) : []),
    [trail],
  )
  const eventYears = useMemo(
    () => eventPlaybackYears(explorationEvents, exploration.range),
    [explorationEvents, exploration.range],
  )
  const ordinaryElapsed = useRef({ key: '', elapsed: 0 })
  const liveReading = playbackReading && followYear && !trail && !tour
  const mapEvents = useMemo(() => {
    if (trail) return journeyEvents(visibleJourneyNodes(trail), trail.personId)
    if (tour?.chapters) return tour.steps.map((id) => eventById.get(id)!).filter(Boolean)
    const matches =
      playing || playbackReading ? eventsInScope(explorationEvents, year, 'nearby') : filteredEvents
    const selected =
      !playing && !playbackReading && selection?.type === 'event'
        ? eventById.get(selection.id)
        : undefined
    return selected && !matches.some((event) => event.id === selected.id)
      ? [...matches, selected]
      : matches
  }, [filteredEvents, selection, trail, tour, playing, playbackReading, year, explorationEvents])
  const periodPeople = useMemo(() => {
    const ids = new Set(periodEvents.flatMap((event) => event.people))
    return people.filter(
      (person) =>
        (peopleRange === 'all' ||
          ids.has(person.id) ||
          person.era === period.id ||
          (person.birth !== null &&
            person.death !== null &&
            person.birth <= period.to &&
            person.death >= period.from)) &&
        matchesPerson(person, peopleQuery) &&
        (peopleDepth === 'all' ||
          (peopleDepth === 'journey'
            ? journeyByPerson.has(person.id)
            : person.biography.length >= 160)),
    )
  }, [periodEvents, period.id, period.from, period.to, peopleRange, peopleQuery, peopleDepth])
  const selectedEvent = selection?.type === 'event' ? eventById.get(selection.id) : undefined
  const selectedPerson = selection?.type === 'person' ? personById.get(selection.id) : undefined
  const selectedPolity =
    selection?.type === 'polity' ? polities.find((item) => item.name === selection.id) : undefined
  const selectedDynasty = selection?.type === 'dynasty' ? dynastyById.get(selection.id) : undefined
  const selectedPlace = selection?.type === 'place' ? placeById.get(selection.id) : undefined
  const displayedPanel =
    selection?.type === 'place'
      ? 'places'
      : selection?.type === 'person'
        ? 'people'
        : selection?.type === 'dynasty' || selection?.type === 'polity'
          ? 'dynasties'
          : selection?.type === 'event'
            ? 'events'
            : mode
  const polityDynasty = selectedPolity ? dynastyForMap(selectedPolity.name, year) : undefined
  const searchResults = useMemo(() => {
    const text = query.toLowerCase().replace(/\s+/g, '')
    const exact = (names: string[]) =>
      names.some((name) => name.toLowerCase().replace(/\s+/g, '') === text)
    if (!text) return []
    return [
      ...events
        .filter((event) => matchesEvent(event, text))
        .map((event) => ({
          type: 'event' as const,
          id: event.id,
          title: event.title,
          sub: `${formatEventDate(event)} · ${event.location}`,
          exact: exact([event.title, ...(event.aliases ?? [])]),
        })),
      ...people
        .filter((person) => matchesPerson(person, text))
        .map((person) => ({
          type: 'person' as const,
          id: person.id,
          title: person.name,
          sub: person.role,
          exact: exact([person.name, person.courtesy ?? '', ...(person.aliases ?? [])]),
        })),
      ...dynasties
        .filter((dynasty) =>
          [dynasty.name, ...dynasty.aliases].some((value) => value.includes(text)),
        )
        .map((dynasty) => ({
          type: 'dynasty' as const,
          id: dynasty.id,
          title: dynasty.name,
          sub: `${compactYear(dynasty.from)}—${compactYear(dynasty.to)} · ${dynasty.capital}`,
          exact: exact([dynasty.name, ...dynasty.aliases]),
        })),
      ...places
        .filter((place) =>
          `${place.name}${place.modern}${place.names.join('')}`.toLowerCase().includes(text),
        )
        .map((place) => ({
          type: 'place' as const,
          id: place.id,
          title: place.name,
          sub: place.modern,
          exact: exact([place.name, ...place.names]),
        })),
      ...tours
        .filter((topic) => `${topic.name}${topic.description}`.includes(text))
        .map((topic) => ({
          type: 'topic' as const,
          id: topic.id,
          title: topic.name,
          sub: `${topic.steps.length} 章`,
          exact: exact([topic.name]),
        })),
      ...(/^-?\d+$/.test(text) &&
      Number(text) !== 0 &&
      Number(text) >= MIN_YEAR &&
      Number(text) <= MAX_YEAR
        ? [
            {
              type: 'year' as const,
              id: text,
              title: `前往${formatYear(Number(text))}`,
              sub: '切换观察年份',
              exact: true,
            },
          ]
        : []),
    ].sort((a, b) => Number(b.exact) - Number(a.exact))
  }, [query])

  function chooseSearchResult(result: (typeof searchResults)[number]) {
    if (result.type === 'event') openEvent(result.id)
    else if (result.type === 'person') openPerson(result.id)
    else if (result.type === 'dynasty') openDynasty(result.id)
    else if (result.type === 'place') openPlace(result.id)
    else if (result.type === 'topic') startTour(result.id)
    else {
      rememberView()
      changeYear(Number(result.id))
      setMode('events')
    }

    setSearchOpen(false)
    searchRef.current?.querySelector('input')?.blur()
    setMobileView((view) => (view === 'map' ? 'split' : view))
  }

  const onPolities = useCallback(
    (items: PolityProperties[]) =>
      setPolities((previous) =>
        previous.length === items.length &&
        previous.every((p, i) => p.id === items[i].id && p.nameZh === items[i].nameZh)
          ? previous
          : items,
      ),
    [],
  )
  const onCamera = useCallback(
    (value: Camera) =>
      setCamera((previous) =>
        previous?.lng === value.lng && previous.lat === value.lat && previous.zoom === value.zoom
          ? previous
          : value,
      ),
    [],
  )
  const changeYear = useCallback((value: number) => {
    setYear(clampYear(value))
    setExploration((previous) =>
      previous.range && (value < previous.range[0] || value > previous.range[1])
        ? { ...previous, range: null }
        : previous,
    )
    setSelection(null)
    setPlaying(false)
    setTourState(null)
    setTrailPerson(null)
  }, [])
  const navigateYear = useCallback(
    (value: number) => {
      if (!personJourney) {
        changeYear(value)
        return
      }
      setYear(
        Math.min(
          personJourney.nodes.at(-1)!.year,
          Math.max(personJourney.nodes[0].year, Math.round(value)),
        ),
      )
      setTrailPoint(null)
      setJourneyResetToken((value) => value + 1)
      setPlaying(false)
    },
    [personJourney, changeYear],
  )
  const openEvent = useCallback(
    (id: string, keepTour = false, keepTrail = false) => {
      const event = eventById.get(id)
      if (!event) return
      if (!keepTour && !keepTrail) rememberView()
      setPlaybackReading(false)
      setReaderCollapsed(false)
      setYear(event.year)
      setMobileView((view) => (view === 'map' ? 'split' : view))
      setSelection({ type: 'event', id })
      setMode('events')
      setPlaying(false)
      if (!keepTour) setTourState(null)
      if (!keepTrail) setTrailPerson(null)
      setFocus({ coordinates: event.coordinates, zoom: 4.6, token: Date.now() })
      setSearchOpen(false)
    },
    [rememberView],
  )
  function openPerson(id: string, backTo?: Selection) {
    setPlaybackReading(false)
    setReaderCollapsed(false)
    const person = personById.get(id)
    if (!person) return
    rememberView()
    if (!backTo) {
      setYear(personFocusYear(person, year, journeyByPerson.get(id)))
      setTourState(null)
      setMode('people')
      setFocus({ region: 'china', token: Date.now() })
    }
    if (!backTo || trailPerson !== id) {
      setTrailPerson(null)
      setTrailPoint(null)
    }
    setSelection({ type: 'person', id })
    setMobileView((view) => (view === 'map' ? 'split' : view))
    setPlaying(false)
    setSearchOpen(false)
  }
  function openDynasty(id: string) {
    setPlaybackReading(false)
    setReaderCollapsed(false)
    const dynasty = dynastyById.get(id)
    if (!dynasty) return
    rememberView()
    const preferred: Record<string, number> = {
      qin: -210,
      'western-han': -100,
      'eastern-han': 100,
      wei: 230,
      shu: 230,
      wu: 230,
      'eastern-jin': 383,
      sui: 605,
      tang: 750,
      'northern-song': 1069,
      'southern-song': 1140,
      yuan: 1294,
      ming: 1421,
      qing: 1750,
    }
    if (year < dynasty.from || year > dynasty.to)
      setYear(clampYear(preferred[id] ?? Math.round((dynasty.from + dynasty.to) / 2)))
    setArchiveFilters((old) => ({ ...old, query: '' }))
    setSelection({ type: 'dynasty', id })
    setMobileView((view) => (view === 'map' ? 'split' : view))
    setSearchOpen(false)
    setTrailPerson(null)
    setTourState(null)
    setPlaying(false)
    setFocus({ region: 'china', token: Date.now() })
  }
  function openPlace(id: string) {
    const place = placeById.get(id)
    if (!place) return
    rememberView()
    setArchiveFilters((old) => ({ ...old, period: 'all' }))
    setSelection({ type: 'place', id })
    setMode('places')
    setPlaying(false)
    setPlaybackReading(false)
    setTrailPerson(null)
    setTourState(null)
    setReaderCollapsed(false)
    setMobileView((view) => (view === 'map' ? 'split' : view))
    setSearchOpen(false)
    setFocus({ coordinates: place.coordinates, zoom: 5, token: Date.now() })
  }
  function selectMap(value: Selection) {
    setPlaybackReading(false)
    setReaderCollapsed(false)
    if (value.type === 'event') {
      const chapter = tour?.chapters ? tour.steps.indexOf(value.id) : -1
      if (chapter >= 0) openTourChapter(chapter)
      else openEvent(value.id)
    } else if (value.type === 'place') openPlace(value.id)
    else {
      rememberView()
      setSelection(value)
      setMobileView((view) => (view === 'map' ? 'split' : view))
      setPlaying(false)
      setTrailPerson(null)
    }
  }
  function toggleBookmark(value: Selection) {
    const key = `${value.type}:${value.id}`
    const exists = bookmarks.includes(key)
    setBookmarks(exists ? bookmarks.filter((item) => item !== key) : [...bookmarks, key])
    setToast(exists ? '已从收藏中移除' : '已收藏，下次回来继续探索')
  }
  function navigateMode(value: PanelMode) {
    rememberView()
    setMoreOpen(false)
    setPlaybackReading(false)
    setReaderCollapsed(false)
    setMode(value)
    setMobileView('reading')
    setSelection(null)
    setPlaying(false)
    setTourState(null)
    setTrailPerson(null)
  }
  function jumpPeriod(id: string) {
    rememberView()
    setExploration(emptyExploration)
    setPlaybackReading(false)
    setReaderCollapsed(false)
    const value = periods.find((item) => item.id === id)!
    const earlySites = value.from < -2070 ? eventsInPeriod(events, value.focus) : []
    changeYear(value.focus)
    setFocus(
      value.from < -2070
        ? {
            bounds: [
              [
                Math.min(...earlySites.map((event) => event.coordinates[0])) - 3,
                Math.min(...earlySites.map((event) => event.coordinates[1])) - 2,
              ],
              [
                Math.max(...earlySites.map((event) => event.coordinates[0])) + 3,
                Math.max(...earlySites.map((event) => event.coordinates[1])) + 2,
              ],
            ],
            token: Date.now(),
          }
        : { region: 'china', token: Date.now() },
    )
    setHiddenPolities([])
    setScope('period')
    setCategory('全部')
    const archive = (
      {
        xia: 'xia-early',
        shang: 'shang-early',
        'western-zhou': 'western-zhou',
        spring: 'eastern-zhou',
      } as Record<string, string>
    )[id]
    if (archive || ['qin', 'sui', 'tang', 'yuan', 'ming', 'qing'].includes(id)) {
      setSelection({ type: 'dynasty', id: archive ?? id })
    } else setMode('overview')
  }
  function startTour(id: string) {
    rememberView()
    setExploration(emptyExploration)
    setMobileView('reading')
    setPlaybackReading(false)
    setReaderCollapsed(false)
    const item = allTours.find((value) => value.id === id)!
    if (item.chapters) {
      setSelection(null)
      setTrailPerson(null)
      setPlaying(false)
      setMode('tours')
      setTourState({ id, step: -1 })
      setYear(eventById.get(item.steps[0])!.year)
      setShowEvents(true)
      setCompareYear(null)
      setCategory('全部')
      setFocus({ region: id === 'silk-road' ? 'silk' : 'china', token: Date.now() })
      return
    }
    setTourState({ id, step: 0 })
    openEvent(item.steps[0], true)
    if (id.startsWith('period-')) {
      setScope('period')
      setCategory('全部')
    }
    if (id === 'silk-road') {
      setFocus({ region: 'silk', token: Date.now() })
    }
  }
  function resumeTopic(id: string, requestedStep?: number) {
    const item = allTours.find((topic) => topic.id === id)
    if (!item) return
    const step = Math.max(
      0,
      Math.min(item.steps.length - 1, requestedStep ?? progress.topics[id]?.lastStep ?? 0),
    )
    startTour(id)
    setTourState({ id, step })
    setSelection({ type: 'event', id: item.steps[step] })
    setYear(eventById.get(item.steps[step])!.year)
    setMobileView('split')
    setFocus({
      coordinates: eventById.get(item.steps[step])!.coordinates,
      zoom: 4.6,
      token: Date.now(),
    })
  }
  function continueReading(hash: string) {
    const state = parseHash(hash),
      shared = parseViewParams(hash)
    if (state.tour)
      resumeTopic(state.tour, state.step !== undefined && state.step >= 0 ? state.step : undefined)
    else if (state.event) openEvent(state.event)
    else if (state.person) openPerson(state.person)
    else if (state.dynasty) openDynasty(state.dynasty)
    else if (shared.place) openPlace(shared.place)
  }
  function markChapterRead() {
    if (!tourState || tourState.step < 0) return
    const { id, step } = tourState
    setProgress((old) => {
      const prior = old.topics[id] ?? { lastStep: step, read: [] }
      return {
        ...old,
        topics: {
          ...old.topics,
          [id]: {
            lastStep: step,
            read: prior.read.includes(step)
              ? prior.read.filter((n) => n !== step)
              : [...prior.read, step],
          },
        },
      }
    })
  }
  function openTourChapter(step: number, remember = true) {
    if (!tour || !tourState) return
    if (remember) rememberView()
    setMobileView('split')
    if (step < 0) {
      setPlaying(false)
      setTourState({ ...tourState, step: -1 })
      setSelection(null)
      return
    }
    setTourState({ ...tourState, step })
    openEvent(tour.steps[step], true)
    fitTopicMap(step)
  }
  function fitTopicMap(step = tourState?.step ?? 0) {
    if (!tour) return
    if (tour.id === 'silk-road') {
      setFocus({ region: 'silk', token: Date.now() })
      return
    }
    const coordinates = tour.steps
      .slice(Math.max(0, step - 1), step + 2)
      .map((id) => eventById.get(id)!.coordinates)
    setFocus({
      bounds: [
        [
          Math.min(...coordinates.map((c) => c[0])) - 1.6,
          Math.min(...coordinates.map((c) => c[1])) - 1.2,
        ],
        [
          Math.max(...coordinates.map((c) => c[0])) + 1.6,
          Math.max(...coordinates.map((c) => c[1])) + 1.2,
        ],
      ],
      token: Date.now(),
    })
  }
  function tourStep(offset: number) {
    if (!tourState || !tour) return
    const step = tourState.step + offset
    if (step >= tour.steps.length) {
      if (tour.chapters) {
        setTourState({ ...tourState, step: -1 })
        setSelection(null)
        setToast('专题已读完，可以回顾导读与各章，也可以选择新的专题')
        return
      }
      setTourState(null)
      setToast('这段旅程已完成，继续探索新的历史吧')
      return
    }
    if (tour.chapters) {
      openTourChapter(step)
      return
    }
    if (step < 0) return
    setTourState({ ...tourState, step })
    openEvent(tour.steps[step], true)
    if (tour.id === 'silk-road') setFocus({ region: 'silk', token: Date.now() })
  }
  function updateExploration(value: ExplorationFilter) {
    setExploration(value)
    setPlaying(false)
    if (value.range && (year < value.range[0] || year > value.range[1])) setYear(value.range[0])
  }
  function updateScope(value: EventScope) {
    setScope(value)
    setExploration((previous) => ({ ...previous, range: null }))
  }
  function toggleComparison() {
    if (compareYear !== null) {
      setCompareYear(null)
      if (mode === 'comparison') setMode('events')
      setCompareError('')
      return
    }
    const reference = clampYear(fromOrdinal(toOrdinal(year) - 10))
    setCompareYear(reference)
    setCompareDraft(String(reference))
    setCompareError('')
  }
  function submitComparison() {
    const value = Number(compareDraft)
    if (
      !/^-?\d+$/.test(compareDraft) ||
      !Number.isFinite(value) ||
      value === 0 ||
      value < MIN_YEAR ||
      value > MAX_YEAR
    ) {
      setCompareError('请输入前10000年至1912年之间的年份，公元前用负数，没有0年。')
      return
    }
    setCompareYear(value)
    setCompareError('')
  }
  function startTrail(id: string) {
    rememberView()
    setMobileView('split')
    const journey = journeyByPerson.get(id)
    if (!journey) return
    setTrailPerson(id)
    setSelection({ type: 'person', id })
    setYear(Math.min(journey.nodes.at(-1)!.year, Math.max(journey.nodes[0].year, year)))
    setTrailPoint(null)
    setShowFutureJourney(false)
    setCompareYear(null)
    setLayersOpen(false)
    setShowEvents(true)
    setPlaying(false)
    setTourState(null)
  }
  function selectJourneyNode(id: string) {
    const node = personJourney?.nodes.find((node) => node.id === id)
    if (!node || !trailPerson) return
    setYear(node.year)
    setTrailPoint(id)
    setJourneyResetToken((value) => value + 1)
    setPlaying(false)
    setSelection({ type: 'person', id: trailPerson })
    setFocus({ coordinates: node.coordinates, zoom: 4.1, token: Date.now() })
  }
  function stepJourney(offset: number) {
    if (!trail) return
    const index = trail.nodes.findIndex((node) => node.id === trail.activeId)
    const node = trail.nodes[index + offset]
    if (node) selectJourneyNode(node.id)
  }
  function fitJourney() {
    if (!trail) return
    const nodes = visibleJourneyNodes(trail)
    if (!nodes.length) return
    if (nodes.length === 1) {
      setFocus({ coordinates: nodes[0].coordinates, zoom: 4.1, token: Date.now() })
      return
    }
    const lngs = nodes.map((node) => node.coordinates[0])
    const lats = nodes.map((node) => node.coordinates[1])
    setFocus({
      bounds: [
        [Math.min(...lngs), Math.min(...lats)],
        [Math.max(...lngs), Math.max(...lats)],
      ],
      token: Date.now(),
    })
  }
  function back() {
    if (navigation.back()) return
    setPlaybackReading(false)
    setPlaying(false)
    setTrailPerson(null)
    if (tour?.chapters) openTourChapter(-1, false)
    else {
      setSelection(null)
      setMode(
        selection?.type === 'person' ? 'people' : selection?.type === 'place' ? 'places' : 'events',
      )
    }
  }
  function stopTour() {
    setPlaying(false)
    setTourState(null)
    setSelection(null)
    setMode('tours')
  }
  const togglePlayback = useCallback(() => {
    if (tour?.chapters && tourState) {
      if (!playing && (tourState.step < 0 || tourState.step >= tour.steps.length - 1))
        openTourChapter(0)
      setPlaying((value) => !value)
      return
    }
    if (!playing && trail && trail.activeId === trail.nodes.at(-1)!.id) {
      setYear(trail.nodes[0].year)
      setTrailPoint(trail.nodes[0].id)
      setJourneyResetToken((value) => value + 1)
    }
    if (!playing && !trail && playbackMode === 'events') {
      if (!eventYears.length) {
        setToast('当前筛选没有可播放的事件年份，请调整地点、时间段或类别')
        return
      }
      if (yearRef.current >= eventYears.at(-1)!) setYear(eventYears[0])
      else if (!eventYears.includes(yearRef.current))
        setYear(eventYears.find((value) => value > yearRef.current) ?? eventYears[0])
    } else if (!playing && !trail && yearRef.current >= (exploration.range?.[1] ?? MAX_YEAR))
      setYear(exploration.range?.[0] ?? MIN_YEAR)
    setPlaying((value) => !value)
    setTourState(null)
    if (!trail) {
      setPlaybackReading(true)
      setMode('events')
      if (!playbackReading || followYear) {
        setSelection(null)
      }
    }
  }, [
    playing,
    trail,
    tour,
    tourState,
    playbackReading,
    followYear,
    playbackMode,
    eventYears,
    exploration.range,
  ])

  useEffect(() => {
    writePreferences({
      scope,
      year,
      cities: showCities,
      events: showEvents,
      bookmarks,
    })
  }, [year, showCities, showEvents, bookmarks, scope])
  useEffect(() => {
    const params = new URLSearchParams({ year: String(year), scope })
    if (compareYear !== null) params.set('compare', String(compareYear))
    if (tourState) {
      params.set('tour', tourState.id)
      params.set('step', String(tourState.step))
    }
    if (selection?.type === 'event') params.set('event', selection.id)
    if (selection?.type === 'person') params.set('person', selection.id)
    if (selection?.type === 'dynasty') params.set('dynasty', selection.id)
    if (selection?.type === 'place') params.set('place', selection.id)
    if (selection?.type === 'polity') params.set('polity', selection.id)
    params.set('view', mode)
    params.set('category', category)
    params.set('cities', showCities ? '1' : '0')
    params.set('events', showEvents ? '1' : '0')
    hiddenPolities.forEach((name) => params.append('hide', name))
    if (exploration.place) params.set('area', exploration.place)
    if (exploration.range) params.set('range', exploration.range.join(','))
    if (exploration.bounds)
      params.set('bounds', exploration.bounds.map((n) => Number(n.toFixed(4))).join(','))
    if (playbackMode === 'events') params.set('play', 'events')
    if (archiveFilters.query) params.set('archiveQuery', archiveFilters.query)
    if (archiveFilters.period !== 'all') params.set('archivePeriod', archiveFilters.period)
    if (archiveFilters.allChanges) params.set('changes', '1')
    if (trail) {
      params.set('journey', trail.personId)
      if (trail.activeId) params.set('point', trail.activeId)
      if (showFutureJourney) params.set('future', '1')
    }
    // Explicit reading/filter changes must survive an immediate reload. Camera
    // movement and playback can use the bounded writer without flooding WebKit.
    const previousParams = new URLSearchParams(window.location.hash.slice(1))
    for (const key of ['lng', 'lat', 'zoom']) previousParams.delete(key)
    const immediate = !playing && params.toString() !== previousParams.toString()
    if (camera) {
      params.set('lng', String(camera.lng))
      params.set('lat', String(camera.lat))
      params.set('zoom', String(camera.zoom))
    }
    navigation.setUrl(`#${params}`, immediate)
  }, [
    year,
    selection,
    camera,
    scope,
    compareYear,
    trail,
    showFutureJourney,
    tourState,
    mode,
    category,
    showCities,
    showEvents,
    hiddenPolities,
    exploration,
    playbackMode,
    archiveFilters,
    playing,
  ])
  useEffect(() => {
    const topic = allTours.find((item) => item.id === tourState?.id)
    const key = tourState ? `topic:${tourState.id}` : readingSelectionKey(selection)
    const title =
      topic?.name ??
      (selection?.type === 'event'
        ? eventById.get(selection.id)?.title
        : selection?.type === 'person'
          ? personById.get(selection.id)?.name
          : selection?.type === 'dynasty'
            ? dynastyById.get(selection.id)?.name
            : selection?.type === 'place'
              ? placeById.get(selection.id)?.name
              : undefined)
    if (!key || !title) return
    const hash = new URL(navigation.url()).hash
    setProgress((old) => ({
      topics:
        topic && tourState && tourState.step >= 0
          ? {
              ...old.topics,
              [topic.id]: { lastStep: tourState.step, read: old.topics[topic.id]?.read ?? [] },
            }
          : old.topics,
      recent: [{ key, title, hash }, ...old.recent.filter((item) => item.key !== key)].slice(0, 12),
    }))
  }, [selection, tourState])
  useEffect(() => writeProgress(progress), [progress])
  useEffect(() => {
    function hashChanged() {
      if (navigation.consumeHashChange()) return
      navigation.clear()
      setPlaybackReading(false)
      setReaderCollapsed(false)
      const next = initialState()
      const sharedCamera = readCamera()
      setPlaying(false)
      setYear(next.year)
      setScope(next.scope)
      setCompareYear(next.compare)
      setCompareDraft(String(next.compare ?? 220))
      setSelection(next.selection)
      setTourState(next.tour)
      setTrailPerson(next.tour ? null : next.trail)
      setTrailPoint(next.point)
      setShowFutureJourney(next.future)
      setMode(
        next.view.mode ??
          (next.tour ? 'tours' : next.selection?.type === 'person' ? 'people' : 'events'),
      )
      setCategory(next.view.category)
      setExploration(next.view.exploration)
      setExplorationOpen(false)
      setHiddenPolities(next.view.hidden)
      setShowCities(next.view.cities ?? next.preferences.cities)
      setShowEvents(next.view.events ?? (next.tour ? true : next.preferences.events))
      setPlaybackMode(next.view.playbackMode)
      setArchiveFilters(next.view.archiveFilters)
      if (sharedCamera) {
        setCamera(sharedCamera)
        setFocus({ camera: sharedCamera, token: Date.now() })
      } else if (next.selection?.type === 'event') {
        setFocus({ coordinates: eventById.get(next.selection.id)!.coordinates, token: Date.now() })
      } else if (next.selection?.type === 'place') {
        setFocus({
          coordinates: placeById.get(next.selection.id)!.coordinates,
          zoom: 5,
          token: Date.now(),
        })
      }
    }
    window.addEventListener('hashchange', hashChanged)
    return () => window.removeEventListener('hashchange', hashChanged)
  }, [changeYear])
  useEffect(() => {
    if (!playing || personJourney || tour?.chapters) return
    let last = performance.now()
    const interval = window.setInterval(() => {
      const now = performance.now()
      const key = `${yearRef.current}:${playbackMode}`
      if (ordinaryElapsed.current.key !== key) ordinaryElapsed.current = { key, elapsed: 0 }
      ordinaryElapsed.current.elapsed += (now - last) * speed
      last = now
      const duration = playbackMode === 'events' ? EVENT_YEAR_DURATION_MS : YEAR_DURATION_MS
      if (ordinaryElapsed.current.elapsed < duration) return
      ordinaryElapsed.current.elapsed = 0
      if (playbackMode === 'events') {
        const next = eventYears.find((value) => value > yearRef.current)
        if (next === undefined) setPlaying(false)
        else setYear(next)
      } else {
        const next = fromOrdinal(toOrdinal(yearRef.current) + 1)
        const end = exploration.range?.[1] ?? MAX_YEAR
        if (next >= end) {
          setYear(end)
          setPlaying(false)
        } else setYear(next)
      }
    }, 40)
    return () => window.clearInterval(interval)
  }, [playing, speed, personJourney, tour, playbackMode, eventYears, exploration.range])
  useEffect(() => {
    if (!playing || !tour?.chapters || !tourState) return
    const timeout = window.setTimeout(() => {
      if (tourState.step >= tour.steps.length - 1) setPlaying(false)
      else {
        openTourChapter(tourState.step + 1, false)
        setPlaying(true)
      }
    }, TOPIC_CHAPTER_DURATION_MS / speed)
    return () => window.clearTimeout(timeout)
  }, [playing, speed, tourState])
  useEffect(() => {
    function keydown(event: KeyboardEvent) {
      const target = event.target as HTMLElement
      if (target.closest('input,textarea,select,button,a,dialog') || dialog) return
      if (event.code === 'Space') {
        event.preventDefault()
        togglePlayback()
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault()
        navigateYear(
          fromOrdinal(toOrdinal(yearRef.current) + (event.key === 'ArrowRight' ? 1 : -1)),
        )
      }
    }
    window.addEventListener('keydown', keydown)
    return () => window.removeEventListener('keydown', keydown)
  }, [navigateYear, dialog, togglePlayback])
  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(''), 3000)
    return () => window.clearTimeout(timeout)
  }, [toast])
  useEffect(() => {
    const element = dialogRef.current
    if (dialog && !element?.open) element?.showModal()
    else if (!dialog && element?.open) element.close()
  }, [dialog])
  useLayoutEffect(() => {
    panelRef.current?.scrollTo({ top: pendingScroll.current ?? 0 })
    pendingScroll.current = null
  }, [selection, mode, tourState?.id, tourState?.step])
  useEffect(() => {
    if (liveReading) panelRef.current?.scrollTo({ top: 0 })
  }, [liveReading, currentYearEvents[0]?.id])
  useEffect(() => {
    const key = trail ? `${trail.personId}:${trail.activeId}` : null
    if (key === previousJourneyNode.current) return
    previousJourneyNode.current = key
    const node = trail?.nodes.find((item) => item.id === trail.activeId)
    if (node) {
      if (!playing) setFocus({ coordinates: node.coordinates, zoom: 4.1, token: Date.now() })
      panelRef.current?.scrollTo({ top: 0 })
    }
  }, [trail?.personId, trail?.activeId])
  useEffect(() => {
    const handler = (event: PointerEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node))
        setSearchOpen(false)
    }
    document.addEventListener('pointerdown', handler)
    return () => document.removeEventListener('pointerdown', handler)
  }, [])

  useEffect(() => {
    const item = document.getElementById(`history-search-${searchIndex}`)
    const container = item?.closest<HTMLElement>('.search-results')
    if (!item || !container) return
    if (item.offsetTop < container.scrollTop) container.scrollTop = item.offsetTop
    else if (item.offsetTop + item.offsetHeight > container.scrollTop + container.clientHeight)
      container.scrollTop = item.offsetTop + item.offsetHeight - container.clientHeight
  }, [searchIndex])
  useEffect(() => {
    if (!layersOpen) return
    function closeLayers(event: PointerEvent | KeyboardEvent) {
      if (
        event instanceof KeyboardEvent
          ? event.key === 'Escape'
          : !(event.target as Element).closest('.layer-button-wrap')
      )
        setLayersOpen(false)
    }
    document.addEventListener('pointerdown', closeLayers)
    document.addEventListener('keydown', closeLayers)
    return () => {
      document.removeEventListener('pointerdown', closeLayers)
      document.removeEventListener('keydown', closeLayers)
    }
  }, [layersOpen])

  useEffect(() => {
    if (!moreOpen) return
    function close(event: PointerEvent | KeyboardEvent) {
      if (
        event instanceof KeyboardEvent
          ? event.key === 'Escape'
          : !(event.target as Element).closest('.header-actions,.header-more')
      )
        setMoreOpen(false)
    }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', close)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', close)
    }
  }, [moreOpen])

  async function share() {
    try {
      await navigator.clipboard.writeText(navigation.url())
      setToast('山河纪链接已复制，分享这一刻的历史')
    } catch {
      setDialog('share')
    }
  }
  const saveButton = (value: Selection) => (
    <button
      className={`icon-button ${bookmarks.includes(`${value.type}:${value.id}`) ? 'is-saved' : ''}`}
      aria-label={bookmarks.includes(`${value.type}:${value.id}`) ? '取消收藏' : '收藏'}
      onClick={() => toggleBookmark(value)}
    >
      <Bookmark
        size={17}
        fill={bookmarks.includes(`${value.type}:${value.id}`) ? 'currentColor' : 'none'}
      />
    </button>
  )

  function eventCard(event: HistoryEvent) {
    return (
      <button className="event-card" key={event.id} onClick={() => openEvent(event.id)}>
        <div className="event-card-meta">
          <span className="category-badge" style={{ color: categoryColors[event.category] }}>
            <span style={{ background: categoryColors[event.category] }} />
            {event.category}
          </span>
          <span>{formatEventDate(event)}</span>
          <span className={`event-relation ${event.year > year ? 'future' : ''}`}>
            {eventDateRelation(event, year)}
          </span>
        </div>
        <h3>
          {event.title}
          <ArrowRight size={15} />
        </h3>
        <p>{event.summary}</p>
        <div className="event-card-bottom">
          <span>
            <MapPin size={12} />
            {event.location}
          </span>
          <span className="avatar-group">
            {event.people.slice(0, 3).map((id) => (
              <Avatar key={id} id={id} />
            ))}
          </span>
        </div>
      </button>
    )
  }

  return (
    <div
      className="atlas-app"
      data-mobile-view={mobileView}
      data-reader-collapsed={readerCollapsed}
    >
      <header className="topbar">
        <a
          className="brand"
          href="#"
          aria-label="山河纪 · Time Atlas，返回自由探索"
          onClick={(event) => {
            event.preventDefault()
            navigateMode('events')
            setFocus({ region: 'china', token: Date.now() })
          }}
        >
          <span className="brand-mark">
            <Compass size={23} strokeWidth={1.4} />
          </span>
          <span>
            山河纪<small>TIME ATLAS</small>
          </span>
        </a>
        <nav className="main-nav" aria-label="主导航">
          <button
            className={
              !tour?.chapters && (mode === 'events' || mode === 'people' || mode === 'overview')
                ? 'active'
                : ''
            }
            onClick={() => navigateMode('events')}
          >
            自由探索
          </button>
          <button
            className={mode === 'tours' || tour?.chapters ? 'active' : ''}
            onClick={() => navigateMode('tours')}
          >
            历史专题
            <span className="nav-dot" />
          </button>
        </nav>
        <div className="top-search" ref={searchRef} data-search-open={searchOpen && !!query.trim()}>
          <Search size={16} />
          <input
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={searchOpen && !!query.trim()}
            aria-controls="history-search-options"
            aria-activedescendant={
              searchOpen && searchIndex >= 0 ? `history-search-${searchIndex}` : undefined
            }
            placeholder="寻找事件、人物、地名…"
            aria-label="搜索历史事件、人物或地名"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setSearchOpen(true)
              setSearchLimit(12)
              setSearchIndex(-1)
            }}
            onFocus={() => setSearchOpen(true)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setSearchOpen(false)
                event.currentTarget.blur()
              }
              if (event.nativeEvent.isComposing) return
              if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault()
                setSearchOpen(true)
                setSearchIndex((index) =>
                  Math.max(
                    0,
                    Math.min(
                      Math.min(searchLimit, searchResults.length) - 1,
                      index + (event.key === 'ArrowDown' ? 1 : -1),
                    ),
                  ),
                )
              }
              if (event.key === 'Enter' && searchResults.length) {
                event.preventDefault()
                chooseSearchResult(searchResults[Math.max(0, searchIndex)])
              }
            }}
          />
          {query ? (
            <button
              className="search-clear"
              aria-label="清空搜索"
              onClick={() => {
                setQuery('')
                setSearchIndex(-1)
                searchRef.current?.querySelector('input')?.focus()
              }}
            >
              <X size={15} />
            </button>
          ) : (
            <kbd>探索</kbd>
          )}
          {searchOpen && query.trim() && (
            <div className="search-results" id="history-search-results">
              <span className="eyebrow">找到 {searchResults.length} 项结果</span>
              {searchResults.length === 0 ? (
                <p className="search-empty">
                  没有找到匹配的事件、人物、地点或专题，试试“赤壁”“苏轼”或“长安”。
                </p>
              ) : (
                <div role="listbox" id="history-search-options" aria-label="历史搜索结果">
                  {searchResults.slice(0, searchLimit).map((result, index) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      id={`history-search-${index}`}
                      role="option"
                      aria-selected={index === searchIndex}
                      className={index === searchIndex ? 'search-active' : ''}
                      onClick={() => chooseSearchResult(result)}
                    >
                      <span className="search-result-icon">
                        {result.type === 'event' ? (
                          <Flag size={16} />
                        ) : result.type === 'person' ? (
                          <Users size={16} />
                        ) : (
                          <MapPin size={16} />
                        )}
                      </span>
                      <span>
                        <strong>{result.title}</strong>
                        <small>
                          {
                            {
                              event: '事件',
                              person: '人物',
                              dynasty: '朝代',
                              place: '地点',
                              topic: '专题',
                              year: '年份',
                            }[result.type]
                          }{' '}
                          · {result.sub}
                        </small>
                      </span>
                      <ChevronRight size={14} />
                    </button>
                  ))}
                </div>
              )}
              {searchResults.length > searchLimit && (
                <button
                  className="search-more"
                  onClick={() => setSearchLimit((count) => count + 24)}
                >
                  继续显示（余 {searchResults.length - searchLimit} 项）
                </button>
              )}
            </div>
          )}
        </div>
        <button
          className="header-more"
          aria-label="更多操作"
          aria-expanded={moreOpen}
          onClick={() => setMoreOpen((value) => !value)}
        >
          <MoreHorizontal size={21} />
        </button>
        <div className={`header-actions ${moreOpen ? 'mobile-open' : ''}`}>
          <button
            className={`icon-button ${mode === 'saved' ? 'active' : ''}`}
            title="我的收藏"
            aria-label="我的收藏"
            onClick={() => navigateMode('saved')}
          >
            <Bookmark size={18} />
            {bookmarks.length > 0 && <span className="bookmark-dot" />}
          </button>
          <button
            className="icon-button"
            title="数据与来源"
            aria-label="数据与来源"
            onClick={() => {
              setMoreOpen(false)
              setDialog('sources')
            }}
          >
            <Info size={18} />
          </button>
          <span className="header-separator" />
          <button
            className="share-button"
            aria-label="分享此刻"
            onClick={() => {
              setMoreOpen(false)
              share()
            }}
          >
            <Share2 size={15} />
            <span>分享此刻</span>
          </button>
        </div>
      </header>

      <main className="map-shell">
        <h1 className="map-heading">
          {tour?.name ?? trail?.name ?? selectedPlace?.name ?? period.name} · {formatYear(year)}
        </h1>
        {trail && (
          <div className="journey-toolbar">
            <span>方向箭头 · 记录先后，省略中间行程</span>
            <button aria-label="查看人物行迹全貌" onClick={fitJourney}>
              <Route size={14} />
              行迹全貌
            </button>
            <label>
              <input
                type="checkbox"
                checked={showFutureJourney}
                onChange={(event) => setShowFutureJourney(event.target.checked)}
              />
              显示后续记录
            </label>
            <button
              aria-label="结束人物轨迹"
              onClick={() => {
                setTrailPerson(null)
                setTrailPoint(null)
                setPlaying(false)
              }}
            >
              <X size={14} />
              <span>结束行迹</span>
            </button>
          </div>
        )}
        <div className="map-stage">
          <Suspense
            fallback={
              <div className="map-loading" role="status">
                正在载入历史地图…
              </div>
            }
          >
            <HistoryMap
              year={year}
              events={mapEvents}
              showCities={showCities}
              showEvents={showEvents}
              showRoutes={showRoutes}
              hiddenPolities={hiddenPolities}
              selection={selection}
              focus={focus}
              initialCamera={initialCamera}
              onSelect={selectMap}
              onPolities={onPolities}
              onBounds={setMapBounds}
              onCamera={onCamera}
              compareYear={compareYear}
              trail={trail}
              topicSteps={tour?.chapters ? tour.steps : undefined}
              journeyResetToken={journeyResetToken}
              playing={playing}
              speed={speed}
              spotlightId={
                !trail && !tour
                  ? selection?.type === 'event' && !playing && !playbackReading
                    ? selection.id
                    : currentYearEvents[0]?.id
                  : undefined
              }
              onJourneyArrival={(id) => {
                const node = personJourney?.nodes.find((item) => item.id === id)
                if (!node) return
                setYear(node.year)
                setTrailPoint(node.id)
                if (node.id === personJourney?.nodes.at(-1)?.id) setPlaying(false)
              }}
              onJourneyNode={selectJourneyNode}
            />
          </Suspense>
          {compareYear !== null && (
            <div className="comparison-controls">
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  submitComparison()
                }}
              >
                <span>
                  <i className="current-key" />
                  当前 {compactYear(year)}年
                </span>
                <label>
                  <i className="reference-key" />
                  参考{' '}
                  <input
                    type="number"
                    aria-label="输入参考年份"
                    min={MIN_YEAR}
                    max={MAX_YEAR}
                    value={compareDraft}
                    onChange={(event) => setCompareDraft(event.target.value)}
                  />
                </label>
                <button type="submit">对照</button>
                <button type="button" aria-label="关闭年份对比" onClick={toggleComparison}>
                  <X size={15} />
                </button>
              </form>
              <p>
                蓝色虚线：{formatYear(compareYear)}的疆域记录 · {periodAt(compareYear).name}
              </p>
              <button className="comparison-read-button" onClick={() => navigateMode('comparison')}>
                解读这段变化 <ArrowRight size={13} />
              </button>
              {compareError && (
                <p role="alert" className="compare-error">
                  {compareError}
                </p>
              )}
            </div>
          )}
          {tourState && tour && (
            <div className="tour-banner">
              <span className="tour-number">
                {tourState.step < 0 ? '导读' : String(tourState.step + 1).padStart(2, '0')}
                {tourState.step >= 0 && (
                  <small>/{String(tour.steps.length).padStart(2, '0')}</small>
                )}
              </span>
              <div>
                <span className="eyebrow">正在探索</span>
                <strong>{tour.name}</strong>
              </div>
              <div className="tour-navigation">
                <button
                  disabled={tourState.step <= (tour.chapters ? -1 : 0)}
                  aria-label="导览上一步"
                  onClick={() => tourStep(-1)}
                >
                  <ArrowLeft size={16} />
                </button>
                <button className="tour-next" onClick={() => tourStep(1)}>
                  {tourState.step < 0
                    ? '开始学习'
                    : tourState.step === tour.steps.length - 1
                      ? '完成旅程'
                      : '下一站'}
                  <ArrowRight size={14} />
                </button>
                <button aria-label="退出导览" onClick={stopTour}>
                  <X size={16} />
                </button>
              </div>
              <div
                className="tour-progress"
                style={{ width: `${((tourState.step + 1) / tour.steps.length) * 100}%` }}
              />
            </div>
          )}
          <div className="map-bottom-left">
            <div className="layer-button-wrap">
              <button
                className={`layers-button ${layersOpen ? 'active' : ''}`}
                onClick={() => setLayersOpen((v) => !v)}
                aria-expanded={layersOpen}
              >
                <Layers size={16} />
                地图图层
                <ChevronRight size={12} />
              </button>
              {layersOpen && (
                <div className="layers-popover">
                  <span className="eyebrow">地图图层</span>
                  {[
                    ['历史事件', showEvents, () => setShowEvents((v) => !v)],
                    ['城市与都城', showCities, () => setShowCities((v) => !v)],
                  ].map(([label, active, toggle]) => (
                    <button
                      key={String(label)}
                      role="switch"
                      aria-checked={Boolean(active)}
                      onClick={toggle as () => void}
                    >
                      <span>{label as string}</span>
                      <span className={`switch ${active ? 'on' : ''}`}>
                        <i />
                      </span>
                    </button>
                  ))}
                  <small>✦ 表示本版收录的都城</small>
                  <div className="layer-polities" aria-label="全部政权图层">
                    {polities.map((item) => (
                      <button
                        key={item.name}
                        aria-pressed={!hiddenPolities.includes(item.name)}
                        onClick={() =>
                          setHiddenPolities((items) =>
                            items.includes(item.name)
                              ? items.filter((name) => name !== item.name)
                              : [...items, item.name],
                          )
                        }
                      >
                        <span>
                          <i style={{ background: item.color }} />
                          {item.nameZh}
                        </span>
                        {!hiddenPolities.includes(item.name) && <Check size={13} />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="map-legend" aria-label="政权图例">
              {polities
                .filter((item) => item.nameZh !== item.name || item.area > 90)
                .slice(0, 7)
                .map((item) => (
                  <button
                    key={item.name}
                    className={hiddenPolities.includes(item.name) ? 'hidden-polity' : ''}
                    aria-pressed={!hiddenPolities.includes(item.name)}
                    title={`显示或隐藏 ${item.nameZh}`}
                    onClick={() =>
                      setHiddenPolities((items) =>
                        items.includes(item.name)
                          ? items.filter((name) => name !== item.name)
                          : [...items, item.name],
                      )
                    }
                  >
                    <span style={{ background: item.color }} />
                    {item.nameZh}
                  </button>
                ))}
              {polities.length === 0 && <span className="legend-empty">正在读取疆域资料</span>}
            </div>
          </div>
        </div>
      </main>

      <aside className="story-panel" aria-label="历史内容">
        <MobileSheetHandle
          view={mobileView}
          title={
            selectedEvent?.title ??
            selectedPerson?.name ??
            selectedPlace?.name ??
            selectedDynasty?.name ??
            selectedPolity?.nameZh ??
            tour?.name ??
            '历史资料'
          }
          panelRef={panelRef}
          onView={changeMobileView}
        />
        <div className="panel-toolbar">
          <div className="panel-tabs">
            <button
              className={displayedPanel === 'events' ? 'active' : ''}
              onClick={() => navigateMode('events')}
            >
              <Flag size={14} />
              事件
            </button>
            <button
              className={displayedPanel === 'people' ? 'active' : ''}
              onClick={() => navigateMode('people')}
            >
              <Users size={14} />
              人物
            </button>
            <button
              className={displayedPanel === 'dynasties' ? 'active' : ''}
              onClick={() => navigateMode('dynasties')}
            >
              <BookOpen size={14} />
              朝代
            </button>
            <button
              className={displayedPanel === 'places' ? 'active' : ''}
              onClick={() => navigateMode('places')}
            >
              <MapPin size={14} />
              地点
            </button>
          </div>
          <button
            className="reader-toggle"
            aria-label="收起历史资料"
            title="收起历史资料，展开地图"
            aria-expanded="true"
            onClick={() => setReaderCollapsed(true)}
          >
            <PanelRightClose size={17} />
          </button>
        </div>
        {playbackReading && !trail && !tour && (
          <div className="playback-reading-toggle">
            <span>{followYear ? '随年份阅读' : '已固定阅读'}</span>
            <button
              aria-pressed={!followYear}
              disabled={followYear && !currentYearEvents.length}
              onClick={() => {
                if (followYear && currentYearEvents[0])
                  setSelection({ type: 'event', id: currentYearEvents[0].id })
                setFollowYear((v) => !v)
              }}
            >
              <Pin size={12} />
              {followYear ? '固定阅读' : '跟随年份'}
            </button>
          </div>
        )}
        <div
          id="history-reading-content"
          className="panel-scroll"
          ref={panelRef}
          onScroll={navigation.save}
        >
          {liveReading ? (
            <section className="live-reading" aria-label="当前年份的历史事件">
              <span className="eyebrow">
                {playing ? '正在播放' : '已暂停'} · {formatYear(year)}
              </span>
              <h2>{currentYearEvents[0]?.title ?? '这一年，暂未收录新事件'}</h2>
              {currentYearEvents[0] ? (
                <>
                  <p className="live-date">
                    {formatEventDate(currentYearEvents[0])} · {currentYearEvents[0].location}
                  </p>
                  <p>{currentYearEvents[0].summary}</p>
                  <p>{currentYearEvents[0].details?.[0]}</p>
                  <button
                    className="live-read-more"
                    onClick={() => openEvent(currentYearEvents[0].id)}
                  >
                    暂停并阅读全文 <ChevronRight size={14} />
                  </button>
                  <Sources sources={currentYearEvents[0].sources} />
                  {currentYearEvents.length > 1 && (
                    <>
                      <h3>同时期的其他记录 · {currentYearEvents.length - 1}</h3>
                      {currentYearEvents.slice(1).map(eventCard)}
                    </>
                  )}
                </>
              ) : (
                <p>
                  新的已收录事件出现时，这里会随年份更新；你也可以使用时间轴的“下一个历史事件”跳到下一处节点。
                </p>
              )}
            </section>
          ) : (
            <>
              {selection && (
                <div className="detail-navigation">
                  <button onClick={back}>
                    <ArrowLeft size={14} />
                    {navigation.previous?.selection?.type === 'dynasty'
                      ? '返回朝代'
                      : navigation.previous?.selection?.type === 'person'
                        ? '返回人物'
                        : navigation.previous?.selection?.type === 'event'
                          ? '返回事件'
                          : navigation.previous?.selection?.type === 'place'
                            ? '返回地点'
                            : navigation.previous?.mode === 'saved'
                              ? '返回收藏'
                              : navigation.previous?.mode === 'comparison'
                                ? '返回对比'
                                : tour?.chapters
                                  ? '返回专题'
                                  : '返回列表'}
                  </button>
                  <div>
                    {selection.type !== 'polity' && saveButton(selection)}
                    <button className="icon-button" aria-label="关闭详情" onClick={back}>
                      <X size={17} />
                    </button>
                  </div>
                </div>
              )}
              {tour?.chapters && tourState?.step === -1 ? (
                <TopicPanel
                  topic={tour}
                  eventById={eventById}
                  onChapter={openTourChapter}
                  progress={progress.topics[tour.id]}
                  onResume={() => resumeTopic(tour.id)}
                />
              ) : selectedPlace ? (
                <PlacePanel
                  key={selectedPlace.id}
                  place={selectedPlace}
                  period={archiveFilters.period}
                  onPeriod={(period) => setArchiveFilters((old) => ({ ...old, period }))}
                  events={events}
                  people={personById}
                  journeys={[...journeyByPerson.values()]}
                  onEvent={openEvent}
                  onPerson={(id) => openPerson(id, { type: 'place', id: selectedPlace.id })}
                  onLocate={() => {
                    setMobileView('split')
                    setFocus({ coordinates: selectedPlace.coordinates, zoom: 5, token: Date.now() })
                  }}
                />
              ) : selectedEvent ? (
                <article className="event-detail">
                  <div className="detail-kicker">
                    <span
                      className="category-badge"
                      style={{ color: categoryColors[selectedEvent.category] }}
                    >
                      <span style={{ background: categoryColors[selectedEvent.category] }} />
                      {selectedEvent.category}
                    </span>
                    <span>{formatEventDate(selectedEvent)}</span>
                  </div>
                  <h2>{selectedEvent.title}</h2>
                  <p className="detail-location">
                    <MapPin size={14} />
                    {selectedEvent.location}
                  </p>
                  <div className="detail-rule" />
                  <p className="detail-lead">{selectedEvent.summary}</p>
                  {(selectedEvent.dateNote || selectedEvent.locationNote) && (
                    <div className="evidence-note">
                      <Info size={14} />
                      <div>
                        {selectedEvent.dateNote && <p>{selectedEvent.dateNote}</p>}
                        {selectedEvent.locationNote && <p>{selectedEvent.locationNote}</p>}
                      </div>
                    </div>
                  )}
                  {tour?.chapters && tourState && tourState.step >= 0 && (
                    <section className="topic-chapter-context">
                      <span className="eyebrow">
                        {tour.name} · 第 {tourState.step + 1} / {tour.steps.length} 章
                      </span>
                      <h3>这一章为什么重要？</h3>
                      <p>{tour.chapters[tourState.step].explanation}</p>
                      <div className="topic-map-reading">
                        <strong>地图上看什么</strong>
                        <p>{tour.chapters[tourState.step].mapReading}</p>
                      </div>
                      <div className="topic-chapter-links">
                        <button onClick={() => fitTopicMap()}>重新定位专题地点</button>
                        <button onClick={() => openTourChapter(-1)}>专题导读与目录</button>
                        <button
                          className="chapter-read"
                          aria-pressed={!!progress.topics[tour.id]?.read.includes(tourState.step)}
                          onClick={markChapterRead}
                        >
                          {progress.topics[tour.id]?.read.includes(tourState.step)
                            ? '本章已读 · 取消标记'
                            : '标记本章已读'}
                        </button>
                      </div>
                    </section>
                  )}
                  {selectedEvent.details && (
                    <section className="detail-section event-narrative">
                      <span className="section-number">01</span>
                      <h3>事情是怎样发生的？</h3>
                      {selectedEvent.details.map((text, index) => (
                        <p key={index}>{text}</p>
                      ))}
                    </section>
                  )}
                  <div className="detail-section">
                    <span className="section-number">{selectedEvent.details ? '02' : '01'}</span>
                    <h3>当时是什么局势？</h3>
                    <p>{selectedEvent.background}</p>
                  </div>
                  <div className="detail-section">
                    <span className="section-number">{selectedEvent.details ? '03' : '02'}</span>
                    <h3>它改变了什么？</h3>
                    <p>{selectedEvent.impact}</p>
                  </div>
                  {selectedEvent.people.length > 0 && (
                    <div className="related-people">
                      <h3>
                        故事中的人物<span>{selectedEvent.people.length}</span>
                      </h3>
                      {selectedEvent.people.map((id) => {
                        const person = personById.get(id)!
                        return (
                          <button
                            key={id}
                            onClick={() => openPerson(id, { type: 'event', id: selectedEvent.id })}
                          >
                            <Avatar id={id} />
                            <span>
                              <strong>{person.name}</strong>
                              <small>{selectedEvent.peopleNotes?.[id] ?? person.role}</small>
                            </span>
                            <ChevronRight size={14} />
                          </button>
                        )
                      })}
                    </div>
                  )}
                  {places.some((place) => namesPlace(selectedEvent.location, place)) && (
                    <section className="related-places">
                      <h3>继续探索这个地方</h3>
                      {places
                        .filter((place) => namesPlace(selectedEvent.location, place))
                        .map((place) => (
                          <button
                            className="outline-action"
                            key={place.id}
                            onClick={() => openPlace(place.id)}
                          >
                            <MapPin size={15} />
                            {place.name} · 历代记录
                            <ArrowRight size={14} />
                          </button>
                        ))}
                    </section>
                  )}
                  <Sources sources={selectedEvent.sources} />
                  <button
                    className="outline-action"
                    onClick={() => {
                      changeYear(selectedEvent.year)
                      setFocus({ region: 'china', token: Date.now() })
                    }}
                  >
                    <Compass size={16} />
                    回到这一年的地图
                    <ArrowRight size={14} />
                  </button>
                </article>
              ) : selectedPerson ? (
                <article
                  className={`person-detail ${trail?.personId === selectedPerson.id ? 'journey-open' : ''}`}
                >
                  <div className="person-hero">
                    <Avatar id={selectedPerson.id} size="large" />
                    <span className="eyebrow">人物档案</span>
                    <h2>
                      {selectedPerson.name}
                      {selectedPerson.courtesy && <small>字 {selectedPerson.courtesy}</small>}
                    </h2>
                    <p>
                      {lifeDates(selectedPerson)} <span>·</span> {selectedPerson.role}
                    </p>
                  </div>
                  {trail?.personId !== selectedPerson.id && (
                    <ReadingText
                      className="detail-lead person-biography"
                      text={selectedPerson.biography}
                    />
                  )}
                  {journeyByPerson.has(selectedPerson.id) &&
                  !(trail?.personId === selectedPerson.id) ? (
                    <>
                      <p className="person-record-status">
                        已核对 {journeyByPerson.get(selectedPerson.id)!.nodes.length} 条行迹记录 ·
                        可按年查看
                      </p>
                      <button
                        className="outline-action person-trail-action"
                        onClick={() => startTrail(selectedPerson.id)}
                      >
                        <Route size={16} />
                        在地图上看人物经历
                        <ArrowRight size={14} />
                      </button>
                    </>
                  ) : !journeyByPerson.has(selectedPerson.id) ? (
                    <p className="person-record-status">
                      {selectedPerson.recordKind === 'catalog' ? '基础人物档案' : '人物简介'} ·
                      本版尚未整理可绘制的年谱。相关事件地点不作为个人路线。
                    </p>
                  ) : null}
                  {trail && personJourney && trail.personId === selectedPerson.id && (
                    <JourneyPanel
                      journey={personJourney}
                      biography={selectedPerson.biography}
                      view={trail}
                      year={year}
                      onNode={selectJourneyNode}
                      onStep={stepJourney}
                    />
                  )}
                  <div className="person-events">
                    <h3>
                      相关历史事件{' '}
                      <small>
                        {events.filter((event) => event.people.includes(selectedPerson.id)).length}{' '}
                        条
                      </small>
                    </h3>
                    <p className="person-relation-note">
                      按时间排列；包括参与、决策与其他关联，地点不代表本人在场。
                    </p>
                    {!events.some((event) => event.people.includes(selectedPerson.id)) && (
                      <p className="person-coverage">
                        本版尚未整理可定位的关联事件，可先阅读人物简介与参考资料。未确定年代的事迹不会强行标到地图上。
                      </p>
                    )}
                    {events
                      .filter((event) => event.people.includes(selectedPerson.id))
                      .map((event) => (
                        <button key={event.id} onClick={() => openEvent(event.id)}>
                          <span className="person-event-year">
                            {event.dateLabel ?? compactYear(event.year)}
                          </span>
                          <span>
                            <strong>{event.title}</strong>
                            <small>{event.location}</small>
                            <span className="person-event-summary">
                              {event.peopleNotes?.[selectedPerson.id] ?? event.summary}
                            </span>
                          </span>
                          <ArrowRight size={14} />
                        </button>
                      ))}
                  </div>
                  {(selectedPerson.birth === null || selectedPerson.death === null) && (
                    <p className="uncertain-date">? 表示本版未采用确定的生卒年份。</p>
                  )}
                  <Sources sources={selectedPerson.sources} />
                </article>
              ) : selectedDynasty ? (
                <DynastyPanel
                  key={selectedDynasty.id}
                  dynasty={selectedDynasty}
                  query={archiveFilters.query}
                  onQuery={(query) => setArchiveFilters((old) => ({ ...old, query }))}
                  onYear={changeYear}
                  events={events}
                  onEvent={(id) => {
                    openEvent(id)
                  }}
                />
              ) : selection?.type === 'polity' ? (
                <article className="polity-detail">
                  <span className="eyebrow">疆域档案</span>
                  <span
                    className="polity-swatch"
                    style={{ background: selectedPolity?.color ?? '#aab8ac' }}
                  />
                  <h2>{selectedPolity?.nameZh ?? selection.id}</h2>
                  <p className="polity-english">{selectedPolity?.name}</p>
                  {polityDynasty && <DynastyIntroduction dynasty={polityDynasty} />}
                  {selectedPolity ? (
                    <>
                      <div className="polity-facts">
                        <span>
                          当前浏览年份<strong>{formatYear(year)}</strong>
                        </span>
                        <span>
                          来源中的适用区间
                          <strong>
                            {compactYear(selectedPolity.from)} — {compactYear(selectedPolity.to)}
                          </strong>
                        </span>
                      </div>
                      <p className="detail-lead">
                        这一图层来自 Cliopatria / Seshat
                        的历史疆域重建。边界以虚线显示，代表资料中的近似范围。
                      </p>
                      <div className="evidence-note">
                        <Info size={14} />
                        <div>
                          {selectedPolity.displayNote && <p>{selectedPolity.displayNote}</p>}
                          <p>
                            数据源的政权分组与起止年份可能不同于常见的建国、灭亡纪年。这里保留来源区间；它不等于政权实际存续时间。
                          </p>
                          <p>全球轮廓经过几何简化，中国及周边保留较高精度，适合观察大势。</p>
                        </div>
                      </div>
                      <Sources
                        sources={[
                          ...(polityDynasty?.sources ?? []),
                          {
                            title: 'Cliopatria · 数据与方法',
                            url: 'https://github.com/Seshat-Global-History-Databank/cliopatria',
                          },
                          ...(selectedPolity.wikidata
                            ? [
                                {
                                  title: 'Wikidata · 政权关联记录',
                                  url: `https://www.wikidata.org/wiki/${selectedPolity.wikidata}`,
                                },
                              ]
                            : []),
                        ]}
                      />
                    </>
                  ) : (
                    <p className="empty-description">
                      当前年份没有这一政权的地图记录。选择其他年份，继续探索。
                    </p>
                  )}
                </article>
              ) : mode === 'comparison' && compareYear !== null ? (
                <ComparisonPanel
                  year={year}
                  reference={compareYear}
                  all={archiveFilters.allChanges}
                  onAll={(allChanges) => setArchiveFilters((old) => ({ ...old, allChanges }))}
                  events={events}
                  dynasties={dynasties}
                  onEvent={openEvent}
                  onDynasty={openDynasty}
                />
              ) : mode === 'places' ? (
                <section className="places-panel">
                  <span className="eyebrow">从熟悉的地方开始</span>
                  <h2>沿着地点读历史</h2>
                  <p>按现有记录中的地名汇集事件与已核对行迹。古今同一地区不等于古城范围相同。</p>
                  <div className="place-directory">
                    {places.map((place) => (
                      <button key={place.id} onClick={() => openPlace(place.id)}>
                        <strong>{place.name}</strong>
                        <small>{place.modern}</small>
                        <span>
                          {events.filter((event) => namesPlace(event.location, place)).length}{' '}
                          件相关事件
                        </span>
                        <ArrowRight size={15} />
                      </button>
                    ))}
                  </div>
                </section>
              ) : mode === 'overview' ? (
                <article className="period-overview">
                  <button className="overview-back" onClick={() => navigateMode('events')}>
                    <ArrowLeft size={14} />
                    返回事件
                  </button>
                  <span className="eyebrow">{period.name} · 学习概览</span>
                  <h2>{profile.question}</h2>
                  <p className="detail-lead">{profile.context}</p>
                  <div className="focus-info">
                    <strong>代表年份：{formatYear(period.focus)}</strong>
                    <p>{profile.focusReason}</p>
                    <button className="outline-action" onClick={() => jumpPeriod(period.id)}>
                      在地图上观察这一年
                      <Compass size={14} />
                    </button>
                  </div>
                  <div className="evidence-note">
                    <Info size={14} />
                    <p>{profile.chronologyNote}</p>
                  </div>
                  <h3>{period.from < -2070 ? '文化与文明区域' : '这一时期的主要政权'}</h3>
                  <div className="overview-polities">
                    {profile.polities.map((name) => (
                      <span key={name}>{name}</span>
                    ))}
                  </div>
                  <div className="overview-heading">
                    <h3>沿着关键节点学习</h3>
                    <button onClick={() => startTour(`period-${period.id}`)}>
                      从开篇学习
                      <ArrowRight size={13} />
                    </button>
                  </div>
                  <div className="overview-steps">
                    {profile.steps.map((id, index) => {
                      const event = eventById.get(id)!
                      return (
                        <button key={id} onClick={() => openEvent(id)}>
                          <span>{String(index + 1).padStart(2, '0')}</span>
                          <div>
                            <small>{formatEventDate(event)}</small>
                            <strong>{event.title}</strong>
                          </div>
                          <ArrowRight size={14} />
                        </button>
                      )
                    })}
                  </div>
                  {profile.people.length > 0 && <h3>相关人物</h3>}
                  <div className="overview-people">
                    {profile.people.map((id) => (
                      <button key={id} onClick={() => openPerson(id)}>
                        <Avatar id={id} />
                        {personById.get(id)!.name}
                      </button>
                    ))}
                  </div>
                  <Sources
                    sources={[
                      ...new Map(
                        profile.steps
                          .flatMap((id) => eventById.get(id)!.sources)
                          .map((source) => [source.url, source]),
                      ).values(),
                    ].slice(0, 6)}
                  />
                </article>
              ) : mode === 'tours' ? (
                <div className="tours-panel">
                  <span className="eyebrow">跟随历史的线索</span>
                  <h2>走一段历史旅程</h2>
                  <p className="panel-intro">从一个问题出发，把时间、地点和人物连接起来。</p>
                  {progress.recent.some((item) => item.key.startsWith('topic:')) && (
                    <section className="resume-reading">
                      <h3>继续上次的专题</h3>
                      {progress.recent
                        .filter((item) => item.key.startsWith('topic:'))
                        .slice(0, 1)
                        .map((item) => (
                          <button key={item.key} onClick={() => continueReading(item.hash)}>
                            {item.title}
                            <ArrowRight size={15} />
                          </button>
                        ))}
                    </section>
                  )}
                  {tours.map((item) => (
                    <button
                      key={item.id}
                      className="tour-card"
                      style={{ '--tour-color': item.color } as React.CSSProperties}
                      onClick={() => startTour(item.id)}
                    >
                      <div className="tour-card-art">
                        {item.icon === 'swords' ? (
                          <Swords size={46} strokeWidth={1} />
                        ) : (
                          <Route size={46} strokeWidth={1} />
                        )}
                        <span className="tour-art-circle" />
                        <span className="tour-art-small-circle" />
                        <span className="tour-card-number">
                          {String(tours.indexOf(item) + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="tour-card-body">
                        <span className="eyebrow">{item.subtitle}</span>
                        <h3>{item.name}</h3>
                        {progress.topics[item.id] && (
                          <small className="topic-reading-progress">
                            已读{' '}
                            {
                              progress.topics[item.id].read.filter(
                                (step) => step < item.steps.length,
                              ).length
                            }{' '}
                            / {item.steps.length} 章 · 上次停在第{' '}
                            {Math.min(item.steps.length, progress.topics[item.id].lastStep + 1)} 章
                          </small>
                        )}
                        <p>{item.description}</p>
                        <span className="tour-card-action">
                          阅读导读与地图章节
                          <ArrowRight size={15} />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : mode === 'saved' ? (
                <div className="saved-panel">
                  <section className="resume-reading">
                    <h3>最近浏览</h3>
                    <p>记录保存在当前浏览器，继续阅读可回到专题的上次章节。</p>
                    {progress.recent.length ? (
                      progress.recent.map((item) => (
                        <button key={item.key} onClick={() => continueReading(item.hash)}>
                          {item.title}
                          <ArrowRight size={14} />
                        </button>
                      ))
                    ) : (
                      <p>打开一个事件、人物、地点或专题后，会在这里留下入口。</p>
                    )}
                  </section>
                  <span className="eyebrow">留住感兴趣的线索</span>
                  <h2>
                    我的收藏<span className="heading-count">{bookmarks.length}</span>
                  </h2>
                  {bookmarks.length === 0 ? (
                    <div className="empty-state">
                      <Bookmark size={36} strokeWidth={1} />
                      <h3>把历史，留到下次</h3>
                      <p>
                        打开事件或人物详情，点击收藏。
                        <br />
                        记录保存在当前浏览器。
                      </p>
                      <button className="outline-action" onClick={() => navigateMode('tours')}>
                        从一个专题开始
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  ) : (
                    bookmarks.map((key) => {
                      const [type, ...rest] = key.split(':')
                      const id = rest.join(':')
                      const event = eventById.get(id),
                        person = personById.get(id)
                      if (type === 'event' && event) return eventCard(event)
                      if (type === 'person' && person)
                        return (
                          <button
                            key={key}
                            className="person-list-card"
                            onClick={() => openPerson(id)}
                          >
                            <Avatar id={id} />
                            <span>
                              <strong>{person.name}</strong>
                              <small>{person.role}</small>
                            </span>
                            <ArrowRight size={15} />
                          </button>
                        )
                      const place = placeById.get(id)
                      if (type === 'place' && place)
                        return (
                          <button
                            key={key}
                            className="person-list-card"
                            onClick={() => openPlace(id)}
                          >
                            <MapPin size={18} />
                            <span>
                              <strong>{place.name}</strong>
                              <small>{place.modern}</small>
                            </span>
                          </button>
                        )
                      const dynasty = dynastyById.get(id)
                      if (type === 'dynasty' && dynasty)
                        return (
                          <button
                            key={key}
                            className="dynasty-list-card"
                            onClick={() => openDynasty(id)}
                          >
                            <strong>{dynasty.name}</strong>
                            <small>
                              {compactYear(dynasty.from)}—{compactYear(dynasty.to)}
                            </small>
                            <p>{dynasty.summary}</p>
                          </button>
                        )
                      return null
                    })
                  )}
                </div>
              ) : mode === 'dynasties' ? (
                <div className="dynasties-panel">
                  <span className="eyebrow">朝代与政权 · 各有自己的历史</span>
                  <h2>读懂山河背后的时代</h2>
                  <p className="panel-intro">
                    建国、都城、时代背景和参考资料分别说明；政权存续年与地图来源区间分开阅读。
                  </p>
                  <select
                    aria-label="朝代档案范围"
                    value={dynastyRange}
                    onChange={(event) => setDynastyRange(event.target.value as 'period' | 'all')}
                  >
                    <option value="period">当前时期政权</option>
                    <option value="all">全部档案（{dynasties.length}）</option>
                  </select>
                  {dynasties
                    .filter(
                      (dynasty) =>
                        dynastyRange === 'all' ||
                        (dynasty.from <= period.to && dynasty.to >= period.from),
                    )
                    .map((dynasty) => (
                      <button
                        key={dynasty.id}
                        className="dynasty-list-card"
                        onClick={() => openDynasty(dynasty.id)}
                      >
                        <strong>{dynasty.name}</strong>
                        <small>
                          {compactYear(dynasty.from)}—{compactYear(dynasty.to)}
                        </small>
                        <p>{dynasty.summary}</p>
                        <span>
                          阅读档案 <ArrowRight size={12} />
                        </span>
                      </button>
                    ))}
                </div>
              ) : mode === 'people' ? (
                <div className="people-panel">
                  <span className="eyebrow">{period.name} · 相关人物</span>
                  <h2>谁在这段历史里？</h2>
                  <p className="panel-intro">通过人物的经历，走进事件背后的选择。</p>
                  <p className="people-time-note">
                    按生卒年、整理分期和事件关系查找；不表示每个人都在当前年活动。
                  </p>
                  <div className="people-catalog-controls">
                    <select
                      aria-label="人物库范围"
                      value={peopleRange}
                      onChange={(event) => {
                        setPeopleRange(event.target.value as 'period' | 'all')
                        setPeopleLimit(80)
                      }}
                    >
                      <option value="period">当前时期人物</option>
                      <option value="all">全部人物（{people.length}）</option>
                    </select>
                    <input
                      aria-label="筛选人物"
                      placeholder="姓名、别名或身份"
                      value={peopleQuery}
                      onChange={(event) => {
                        setPeopleQuery(event.target.value)
                        setPeopleLimit(80)
                      }}
                    />
                  </div>
                  <div className="people-depth-filter" role="group" aria-label="人物资料深度">
                    {(
                      [
                        { id: 'all', label: '全部档案' },
                        { id: 'reading', label: '较完整介绍' },
                        { id: 'journey', label: '可播放行迹' },
                      ] as const
                    ).map(({ id, label }) => (
                      <button
                        key={id}
                        aria-pressed={peopleDepth === id}
                        onClick={() => {
                          setPeopleDepth(id)
                          setPeopleLimit(80)
                          if (id === 'journey') setPeopleRange('all')
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <p className="catalog-count">
                    找到 {periodPeople.length} 人 · 详细年谱{' '}
                    {periodPeople.filter((person) => journeyByPerson.has(person.id)).length} 份
                  </p>
                  {periodPeople.length ? (
                    periodPeople.slice(0, peopleLimit).map((person) => (
                      <button
                        key={person.id}
                        className="person-list-card"
                        onClick={() => openPerson(person.id)}
                      >
                        <Avatar id={person.id} />
                        <span>
                          <strong>
                            {person.name}
                            <small>{person.courtesy ? `字 ${person.courtesy}` : ''}</small>
                          </strong>
                          <small>{person.role}</small>
                          <span className="person-depth">
                            {journeyByPerson.has(person.id)
                              ? '可播放行迹'
                              : person.biography.length >= 160
                                ? '较完整介绍'
                                : '简要档案'}
                          </span>
                        </span>
                        <ChevronRight size={15} />
                      </button>
                    ))
                  ) : (
                    <div className="empty-state">
                      <Users size={30} />
                      <p>
                        当前筛选下没有匹配的人物。
                        <br />
                        试试其他姓名、全部档案或扩大到全部时期。
                      </p>
                      <button
                        className="outline-action"
                        onClick={() => {
                          setPeopleDepth('all')
                          setPeopleRange('all')
                          setPeopleQuery('')
                        }}
                      >
                        查看全部人物
                      </button>
                    </div>
                  )}
                  {periodPeople.length > peopleLimit && (
                    <button
                      className="outline-action"
                      onClick={() => setPeopleLimit((value) => value + 80)}
                    >
                      再显示 80 人（余 {periodPeople.length - peopleLimit} 人）
                    </button>
                  )}
                </div>
              ) : (
                <div className="events-panel">
                  <div className="period-brief">
                    <button onClick={() => navigateMode('overview')}>
                      <BookOpen size={15} />
                      <span>{period.name}概览</span>
                      <ChevronRight size={13} />
                    </button>
                    <button
                      className="begin-learning"
                      onClick={() => startTour(`period-${period.id}`)}
                    >
                      从开篇学习
                      <ArrowRight size={13} />
                    </button>
                  </div>
                  <div className="event-list-controls">
                    <div className="event-list-heading">
                      <h3>
                        {exploration.range
                          ? '自定时间段'
                          : scope === 'year'
                            ? '当年事件'
                            : scope === 'nearby'
                              ? '附近事件'
                              : '这一时期'}
                        <span>{filteredEvents.length} 件</span>
                      </h3>
                    </div>
                    <div className="mobile-event-filters">
                      <select
                        aria-label="筛选事件时间范围"
                        value={exploration.range ? 'custom' : scope}
                        onChange={(event) => updateScope(event.target.value as EventScope)}
                      >
                        {exploration.range && (
                          <option value="custom" disabled>
                            自定时间段
                          </option>
                        )}
                        <option value="year">仅当年</option>
                        <option value="nearby">前后5年</option>
                        <option value="period">整个时期</option>
                      </select>
                      <select
                        aria-label="筛选事件类别"
                        value={category}
                        onChange={(event) => setCategory(event.target.value as '全部' | Category)}
                      >
                        {categories.map((item) => (
                          <option key={item} value={item}>
                            {item === '全部' ? '全部类别' : item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="event-scope" aria-label="事件时间范围">
                      {(
                        [
                          ['year', '仅当年'],
                          ['nearby', '前后5年'],
                          ['period', '整个时期'],
                        ] as const
                      ).map(([value, label]) => (
                        <button
                          key={value}
                          aria-pressed={!exploration.range && scope === value}
                          className={!exploration.range && scope === value ? 'active' : ''}
                          onClick={() => updateScope(value)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="category-filters" aria-label="事件类别">
                    {categories.map((item) => (
                      <button
                        key={item}
                        className={category === item ? 'active' : ''}
                        aria-pressed={category === item}
                        onClick={() => setCategory(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <p className="list-description">
                    {exploration.range
                      ? `${compactYear(exploration.range[0])}—${compactYear(exploration.range[1])}年`
                      : scopeDescription(year, scope)}{' '}
                    ·{' '}
                    {exploration.range || scope === 'period' ? '按时间顺序' : '距当前年份由近及远'}
                    <ArrowDown size={11} />
                  </p>
                  <ExplorationFilters
                    value={exploration}
                    open={explorationOpen}
                    onOpen={setExplorationOpen}
                    onChange={updateExploration}
                    bounds={mapBounds}
                  />
                  {filteredEvents.length ? (
                    filteredEvents.map(eventCard)
                  ) : (
                    <div className="empty-state">
                      <Flag size={30} strokeWidth={1} />
                      <h3>
                        {category !== '全部'
                          ? `这个范围暂无${category}事件`
                          : scope === 'year'
                            ? '这一年，暂未收录事件'
                            : scope === 'nearby'
                              ? '附近几年，暂未收录事件'
                              : '这一时期，暂未收录事件'}
                      </h3>
                      <p>
                        资料的空白不代表历史的空白。
                        <br />
                        查看整个时期，继续寻找线索。
                      </p>
                      <button
                        className="outline-action"
                        onClick={() => {
                          setScope('period')
                          setCategory('全部')
                          setExploration(emptyExploration)
                        }}
                      >
                        查看这一时期
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                  <div className="end-note">
                    <Sparkles size={13} />
                    历史的细节，还在不断补充
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="panel-footer">
          <span />
          <span>史料有边界，探索无止境</span>
          <button aria-label="查看资料说明" onClick={() => setDialog('sources')}>
            <Info size={13} />
          </button>
        </div>
      </aside>

      <Timeline
        selectedId={trail?.activeId ?? (selection?.type === 'event' ? selection.id : undefined)}
        year={year}
        playing={playing}
        events={trail ? trailTimelineEvents : tour?.chapters ? mapEvents : explorationEvents}
        range={exploration.range}
        playbackMode={playbackMode}
        onPlaybackMode={(value) => {
          setPlaybackMode(value)
          setPlaying(false)
        }}
        onYear={navigateYear}
        onPlay={togglePlayback}
        onEvent={trail ? selectJourneyNode : (id) => selectMap({ type: 'event', id })}
        onSpeed={setSpeed}
        speed={speed}
        onPeriod={jumpPeriod}
        onOverview={() => navigateMode('overview')}
        readerCollapsed={readerCollapsed}
        onExpandReader={() => setReaderCollapsed(false)}
        comparing={compareYear !== null}
        onCompare={() => {
          if (compareYear === null && mobileView === 'reading') setMobileView('split')
          toggleComparison()
        }}
        topic={
          tour?.chapters && tourState
            ? {
                name: tour.name,
                from: eventById.get(tour.steps[0])!.year,
                to: eventById.get(tour.steps.at(-1)!)!.year,
                canPrevious: tourState.step >= 0,
                canNext: tourState.step < tour.steps.length - 1,
                onPrevious: () => tourStep(-1),
                onNext: () => tourStep(1),
              }
            : undefined
        }
        journey={
          trail
            ? {
                name: trail.name,
                from: trail.nodes[0].year,
                to: trail.nodes.at(-1)!.year,
                canPrevious: trail.nodes.findIndex((node) => node.id === trail.activeId) > 0,
                canNext:
                  trail.nodes.findIndex((node) => node.id === trail.activeId) <
                  trail.nodes.length - 1,
                onPrevious: () => stepJourney(-1),
                onNext: () => stepJourney(1),
              }
            : undefined
        }
      />
      {toast && (
        <div className="toast" role="status">
          <Check size={15} />
          {toast}
        </div>
      )}
      <dialog
        ref={dialogRef}
        className="info-dialog"
        onCancel={() => setDialog(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setDialog(null)
        }}
      >
        <button
          className="dialog-close icon-button"
          aria-label="关闭对话框"
          onClick={() => setDialog(null)}
        >
          <X size={20} />
        </button>
        {dialog === 'share' ? (
          <>
            <span className="eyebrow">山河纪 · 分享此刻</span>
            <h2>让朋友看到这段历史</h2>
            <p>复制下面的链接，包含年份、当前档案、筛选条件、地图图层与视野。</p>
            <input
              readOnly
              value={navigation.url()}
              aria-label="分享链接"
              onFocus={(event) => event.target.select()}
            />
          </>
        ) : (
          <>
            <span className="eyebrow">山河纪 · TIME ATLAS</span>
            <h2>每一次探索，都有出处</h2>
            <p className="dialog-intro">
              在地图上读历史，在时间中看山河。这是一份以中国历史为主、持续整理的交互历史地图。地图来源与内容参考分开标注，帮助你理解资料所能支持的范围。
            </p>
            <div className="source-grid">
              <a
                href="https://github.com/Seshat-Global-History-Databank/cliopatria"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Compass size={20} />
                <strong>Cliopatria / Seshat</strong>
                <small>历史疆域 · CC BY 4.0</small>
                <p>保留原始适用区间；全球地图按20年分片加载，边界为近似重建。</p>
                <ExternalLink size={14} />
              </a>
              <a
                href="https://www.naturalearthdata.com/about/terms-of-use/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe2 size={20} />
                <strong>Natural Earth</strong>
                <small>自然地理背景 · 公有领域</small>
                <p>海岸线、河流与湖泊为现代地理参照，不是古代自然地理复原。</p>
                <ExternalLink size={14} />
              </a>
              <a href="https://zh.wikisource.org/" target="_blank" rel="noopener noreferrer">
                <BookOpen size={20} />
                <strong>原典与参考文献</strong>
                <small>事件与人物 · 原创中文介绍</small>
                <p>资料整理稿，参考《史记》《三国志》等原典及百科文献，尚未经逐条专家审定。</p>
                <ExternalLink size={14} />
              </a>
              <a
                href="https://www.wikidata.org/wiki/Wikidata:Licensing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Users size={20} />
                <strong>Wikidata 人物资料</strong>
                <small>结构化身份与生卒年 · CC0</small>
                <p>保存实体版本与来源快照，区分基础人物档案和已核对年谱；不补猜未知年份。</p>
                <ExternalLink size={14} />
              </a>
              <a
                href="https://www.dpm.org.cn/court/lineage/226256.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Route size={20} />
                <strong>人物年谱与本人行迹</strong>
                <small>故宫、苏轼年谱、三国志</small>
                <p>箭头表示所选记录的先后，省略中间行程。相关战场或谈判地点不证明本人到访。</p>
                <ExternalLink size={14} />
              </a>
              <a
                href="https://whc.unesco.org/en/list/1442/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Route size={20} />
                <strong>UNESCO 丝绸之路</strong>
                <small>专题历史联系与节点参考</small>
                <p>路线连接已知节点，表示交流网络，不代表具体人物精确行程。</p>
                <ExternalLink size={14} />
              </a>
            </div>
            <p className="coverage-note">
              当前收录 {dynasties.length} 个朝代与政权档案、{journeyByPerson.size} 份详细行迹。其中{' '}
              {people.filter((person) => person.recordKind === 'catalog').length}{' '}
              份人物档案仅有基本身份，
              {people.filter((person) => person.biography.length >= 160).length}{' '}
              份有较完整介绍。数量不等于历史资料完整，年谱仍按史料逐人核对。
            </p>
            <p className="source-attribution">
              疆域资料：Cliopatria / Seshat，数据编辑 Ed Chalstrey、James Bennett、Erin Mutch
              及项目贡献者。改编说明见处理记录；采用{' '}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC BY 4.0
              </a>
              。
            </p>
            <div className="dialog-note">
              <Info size={17} />
              <div>
                <strong>如何阅读这张地图</strong>
                <p>
                  时间轴分期用于导航，不等于每个政权的确切存续期。部分地区尚无合适资料，缺少图层不表示无人居住或没有历史。生卒年、日期与地点的争议在相关档案中注明。
                </p>
              </div>
            </div>
            <div className="dialog-stats">
              <span>
                <strong>{events.length}</strong>历史事件
              </span>
              <span>
                <strong>{people.length}</strong>人物档案
              </span>
              <span>
                <strong>{tours.length}</strong>主题旅程
              </span>
              <span>
                <strong>{periods.length}</strong>历史时期
              </span>
            </div>
            <a
              className="provenance-link"
              href={`${import.meta.env.BASE_URL}data/provenance.json`}
              target="_blank"
              rel="noopener noreferrer"
            >
              查看数据版本与处理记录
              <ExternalLink size={13} />
            </a>
            <a
              className="provenance-link"
              href={`${import.meta.env.BASE_URL}data/content-provenance.json`}
              target="_blank"
              rel="noopener noreferrer"
            >
              人物来源快照与版本 <ExternalLink size={13} />
            </a>
            <a
              className="provenance-link"
              href={`${import.meta.env.BASE_URL}data/coverage.json`}
              target="_blank"
              rel="noopener noreferrer"
            >
              查看资料覆盖核对 <ExternalLink size={13} />
            </a>
            <a
              className="provenance-link"
              href={`${import.meta.env.BASE_URL}data/research-index.json`}
              target="_blank"
              rel="noopener noreferrer"
            >
              参考资料抓取时间与来源索引 <ExternalLink size={13} />
            </a>
          </>
        )}
      </dialog>
    </div>
  )
}
