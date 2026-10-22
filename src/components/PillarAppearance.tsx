import { useId } from 'react'
import { pillarThemes, type PillarTheme } from '../lib/pillar-theme'

type Props = {
  value: PillarTheme
  onChange: (theme: PillarTheme) => void
}

export function PillarAppearance({ value, onChange }: Props) {
  const id = useId()
  return (
    <fieldset className="pillar-appearance">
      <legend>时空柱主题</legend>
      <div className="pillar-theme-choices">
        {pillarThemes.map((theme) => (
          <label key={theme.id} className="pillar-theme-choice">
            <input
              type="radio"
              name={`${id}-theme`}
              value={theme.id}
              checked={value === theme.id}
              onChange={() => onChange(theme.id)}
              aria-label={theme.name}
              aria-describedby={`${id}-${theme.id}-description`}
            />
            <span className="pillar-theme-option">
              <span className="pillar-theme-preview" data-theme={theme.id} aria-hidden="true">
                <span className="pillar-preview-column" />
                <span className="pillar-preview-rows">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                <span className="pillar-preview-year" />
              </span>
              <span className="pillar-theme-name">
                {theme.name}
                <span className="pillar-theme-check" aria-hidden="true">
                  ✓
                </span>
              </span>
              <small id={`${id}-${theme.id}-description`}>{theme.description}</small>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function PillarScenery() {
  return (
    <div className="pillar-scenery" aria-hidden="true">
      <span className="pillar-column-ring" />
      <span className="pillar-column-ring" />
      <span className="pillar-column-ring" />
    </div>
  )
}
