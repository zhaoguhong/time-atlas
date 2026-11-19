import { BookOpen, Compass, Layers3, Map as MapIcon } from 'lucide-react'

export default function AtlasNavigation({
  base,
  visualization,
  topicsActive,
  onHome,
  onVisualization,
  onTopics,
}: {
  base: string
  visualization?: 'map' | 'pillar'
  topicsActive: boolean
  onHome: () => void
  onVisualization: (value: 'map' | 'pillar') => void
  onTopics: () => void
}) {
  return (
    <>
      <a
        className="brand"
        href={base}
        aria-label="山河纪 · Time Atlas，返回自由探索"
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
          event.preventDefault()
          onHome()
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
        <div className="header-view-switch" role="group" aria-label="探索模式">
          {(['map', 'pillar'] as const).map((value) => (
            <button
              key={value}
              aria-pressed={visualization === value}
              onClick={() => onVisualization(value)}
            >
              {value === 'map' ? (
                <MapIcon size={15} aria-hidden="true" />
              ) : (
                <Layers3 size={15} aria-hidden="true" />
              )}
              <span>{value === 'map' ? '地图' : '时空柱'}</span>
            </button>
          ))}
        </div>
        <button
          data-main-topics
          aria-current={topicsActive ? 'true' : undefined}
          onClick={onTopics}
        >
          <BookOpen size={15} aria-hidden="true" />
          <span>历史专题</span>
        </button>
      </nav>
    </>
  )
}
