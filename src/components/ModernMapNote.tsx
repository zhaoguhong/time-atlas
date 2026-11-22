import { modernMapNotes } from '../data/modern-map-places'

export default function ModernMapNote({
  year,
  inline = false,
}: {
  year: number
  inline?: boolean
}) {
  return (
    <details
      className={
        inline
          ? 'topic-inline-map-note modern-geography-note'
          : 'early-map-note modern-geography-note'
      }
    >
      <summary>
        {year >= 1949 ? '中华人民共和国' : '民国时期'} · {year}年末地点图
      </summary>
      <div>
        <p>1913—1950年疆界待补。台湾、澎湖和海南的着色使用现代海岸轮廓。</p>
        <ul>
          {modernMapNotes(year).map(({ label, text, sources }) => (
            <li key={label}>
              <strong>{label}</strong>
              <p>{text}</p>
              <p>
                {sources.map((source, index) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={source.title}
                  >
                    资料 {index + 1}
                  </a>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </details>
  )
}
