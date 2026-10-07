/** Prefer the site's simplified display variant without rewriting the cited original. */
export function readingSourceUrl(original: string): string {
  try {
    const url = new URL(original)
    if (!['zh.wikisource.org', 'zh.wikipedia.org'].includes(url.hostname)) return original
    if (url.pathname.startsWith('/wiki/'))
      url.pathname = url.pathname.replace('/wiki/', '/zh-hans/')
    else if (/^\/zh(?:-[a-z]+)?\//.test(url.pathname))
      url.pathname = url.pathname.replace(/^\/zh(?:-[a-z]+)?\//, '/zh-hans/')
    else url.searchParams.set('variant', 'zh-hans')
    return url.href
  } catch {
    return original
  }
}
