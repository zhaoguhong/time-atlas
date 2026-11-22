import type { AnchorHTMLAttributes } from 'react'

/** A real destination, with in-app navigation for an ordinary primary click. */
export default function ReadingLink({
  onNavigate,
  className = '',
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { onNavigate: () => void }) {
  return (
    <a
      {...props}
      className={`reading-link ${className}`}
      onClick={(event) => {
        if (event.button || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
        event.preventDefault()
        onNavigate()
      }}
    />
  )
}
