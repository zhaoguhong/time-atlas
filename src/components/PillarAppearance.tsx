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
                <span className="pillar-preview-landscape" />
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
    <>
      <div className="pillar-atmosphere" aria-hidden="true">
        <span className="pillar-atmosphere-light" />
        <svg className="pillar-horizon" viewBox="0 0 1000 400" preserveAspectRatio="none">
          <path d="M0 201 C130 140 217 279 370 252 S605 133 755 205 S912 209 1000 170 L1000 400 H0Z" />
          <path d="M0 281 C169 205 230 342 411 297 S645 217 765 268 S934 294 1000 245 L1000 400 H0Z" />
          <path d="M0 342 C146 283 280 377 456 338 S744 302 1000 352 L1000 400 H0Z" />
        </svg>
      </div>
      <div className="pillar-scenery" aria-hidden="true">
        <span className="pillar-column-light" />
        <span className="pillar-column-ring" />
        <span className="pillar-column-ring" />
        <span className="pillar-column-ring" />
      </div>
    </>
  )
}
