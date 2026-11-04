import { Fragment, useState } from 'react'
import { BookOpen, ExternalLink } from 'lucide-react'
import { readingSourceUrl } from '../lib/source-links'
import type { Source } from '../types'
import '../sources.css'

export function SourceCitation({
  source,
  className,
  icons = false,
}: {
  source: Source
  className?: string
  icons?: boolean
}) {
  return (
    <>
      <a
        className={className}
        href={readingSourceUrl(source.url)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {icons && <BookOpen size={14} aria-hidden="true" />}
        <span>{source.title}</span>
        {icons && <ExternalLink size={12} aria-hidden="true" />}
      </a>
      {source.note && <p className="source-note">{source.note}</p>}
    </>
  )
}

export default function Sources({
  sources,
  title = '继续阅读 · 参考资料',
  initialLimit = sources.length,
  loading = false,
  failed = false,
  retry,
}: {
  sources: Source[]
  title?: string
  initialLimit?: number
  loading?: boolean
  failed?: boolean
  retry?: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  if (!sources.length && !loading && !failed) return null
  const visible = expanded ? sources : sources.slice(0, initialLimit)
  return (
    <div className="reference-list">
      <span className="eyebrow">{title}</span>
      {visible.map((source, index) => (
        <Fragment key={`${source.url}-${index}`}>
          <SourceCitation source={source} icons />
        </Fragment>
      ))}
      {visible.length < sources.length && (
        <button className="source-expand" onClick={() => setExpanded(true)}>
          显示其余 {sources.length - visible.length} 条来源
        </button>
      )}
      {loading && (
        <p className="source-status" role="status">
          正在加载事件参考资料…
        </p>
      )}
      {failed && (
        <div className="source-status" role="alert">
          <p>事件参考资料暂未加载，已有资料仍可阅读。</p>
          <button className="outline-action" onClick={retry}>
            重新加载参考资料
          </button>
        </div>
      )}
    </div>
  )
}
