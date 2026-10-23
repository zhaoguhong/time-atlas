import { historyRegions, type PillarSide } from '../lib/time-pillar'

export default function HistoryScopeControls({
  side,
  region,
  onSide,
  onRegion,
}: {
  side: PillarSide
  region: string
  onSide: (value: PillarSide) => void
  onRegion: (value: string) => void
}) {
  return (
    <div className="history-scope-controls">
      <label>
        浏览历史
        <select
          aria-label="地图历史范围"
          value={side}
          onChange={(event) => onSide(event.target.value as PillarSide)}
        >
          <option value="compare">中外历史</option>
          <option value="world">世界历史（中国之外）</option>
          <option value="china">中国历史</option>
        </select>
      </label>
      {side !== 'china' && (
        <label>
          世界地区
          <select
            aria-label="地图世界地区"
            value={region}
            onChange={(event) => onRegion(event.target.value)}
          >
            <option value="all">所有地区</option>
            {Object.entries(historyRegions)
              .filter(([id]) => id !== 'china')
              .map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
          </select>
        </label>
      )}
      <small>世界历史指中国之外的事件，疆域仍可对照全球。</small>
    </div>
  )
}
