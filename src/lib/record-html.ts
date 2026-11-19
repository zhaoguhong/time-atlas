/** JSON is embedded once in generated HTML and reused by the interactive atlas. */
export function recordFromHtml<T>(html: string): T {
  const match = html.match(
    /<script id="reading-record" type="application\/json">([\s\S]*?)<\/script>/,
  )
  if (!match) throw new Error('Reading data is missing')
  return JSON.parse(match[1]) as T
}

export async function fetchRecordHtml<T>(url: string): Promise<T> {
  const controller = new AbortController()
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    return await Promise.race([
      (async () => {
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return recordFromHtml<T>(await response.text())
      })(),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => {
          controller.abort()
          reject(new Error('Request timed out'))
        }, 20_000)
      }),
    ])
  } finally {
    clearTimeout(timer)
  }
}
