/** Editorial paragraphs keep long reading comfortable without collapsing the introduction. */
export default function ReadingText({ text, className }: { text: string; className?: string }) {
  return (
    <div className={className}>
      {text
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
    </div>
  )
}
