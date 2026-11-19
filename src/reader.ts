/** Enhance generated HTML without loading React, the catalog or the map engine. */
export function setupReader(root: HTMLElement, startAtlas: () => Promise<unknown>) {
  const path = new URL(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')!.href)
    .pathname
  const key = root.dataset.recordKey
  const title = root.querySelector('h1')?.textContent ?? document.title
  const status = root.querySelector<HTMLElement>('[data-reader-status]')!
  const positionKey = `time-atlas:reader-position:${path}`
  const announce = (text: string) => {
    status.textContent = text
  }
  // Tracking parameters and index.html are not part of a reading address.
  // Preserve an explicit map context until the reader asks to open the atlas.
  if (!location.hash) history.replaceState(history.state, '', path)

  const lifecycle = new AbortController()
  let leaving = false
  if (key) {
    try {
      const progress = JSON.parse(localStorage.getItem('time-atlas:reading:v2') ?? '{}')
      const recent = Array.isArray(progress.recent) ? progress.recent : []
      progress.recent = [
        { key, title, hash: path },
        ...recent.filter((r: { key?: string }) => r?.key !== key),
      ].slice(0, 12)
      localStorage.setItem('time-atlas:reading:v2', JSON.stringify(progress))
      const saved = Number(localStorage.getItem(positionKey))
      if (Number.isFinite(saved) && saved > 0 && !location.hash)
        requestAnimationFrame(() => window.scrollTo({ top: saved, behavior: 'instant' }))
    } catch {
      /* Reading works without local storage. */
    }
    let timer: ReturnType<typeof setTimeout> | undefined
    const save = () => {
      clearTimeout(timer)
      if (leaving) return
      try {
        localStorage.setItem(positionKey, String(window.scrollY))
      } catch {
        /* optional */
      }
    }
    addEventListener(
      'scroll',
      () => {
        clearTimeout(timer)
        timer = setTimeout(save, 120)
      },
      { passive: true, signal: lifecycle.signal },
    )
    addEventListener('pagehide', save, { signal: lifecycle.signal })

    const bookmark = root.querySelector<HTMLButtonElement>('[data-reader-bookmark]')!
    function preferences() {
      try {
        return JSON.parse(localStorage.getItem('time-atlas:v1') ?? '{}') ?? {}
      } catch {
        return {}
      }
    }
    const updateBookmark = () => {
      const selected = preferences().bookmarks?.includes(key) ?? false
      bookmark.setAttribute('aria-pressed', String(selected))
      bookmark.textContent = selected ? '已收藏' : '收藏'
    }
    updateBookmark()
    bookmark.addEventListener('click', () => {
      try {
        const prefs = preferences()
        const bookmarks: string[] = Array.isArray(prefs.bookmarks) ? prefs.bookmarks : []
        prefs.bookmarks = bookmarks.includes(key!)
          ? bookmarks.filter((value) => value !== key)
          : [...bookmarks, key]
        localStorage.setItem('time-atlas:v1', JSON.stringify(prefs))
        updateBookmark()
      } catch {
        announce('此浏览器暂时无法保存收藏。')
      }
    })
    const mapButton = root.querySelector<HTMLButtonElement>('[data-reader-map]')!
    mapButton.addEventListener('click', async () => {
      save()
      leaving = true
      mapButton.disabled = true
      mapButton.textContent = '正在打开地图…'
      document.documentElement.dataset.atlasLaunch = 'map'
      try {
        await startAtlas()
        clearTimeout(timer)
        lifecycle.abort()
      } catch {
        leaving = false
        mapButton.disabled = false
        mapButton.textContent = '重新打开地图'
        announce('地图暂时未能加载，正文仍可阅读。请检查网络后重试。')
      }
    })
  }

  root.querySelector('[data-reader-theme]')?.addEventListener('click', () => {
    const mode = document.documentElement.dataset.colorMode === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.colorMode = mode
    document.documentElement.style.colorScheme = mode
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', mode === 'dark' ? '#142127' : '#fffefb')
    try {
      localStorage.setItem('time-atlas:color-mode:v1', mode)
    } catch {
      /* optional */
    }
  })
  root.querySelector('[data-reader-share]')?.addEventListener('click', async () => {
    const url = new URL(path, location.origin).href
    try {
      await navigator.clipboard.writeText(url)
      announce('阅读链接已复制。')
    } catch {
      announce(`分享地址：${url}`)
    }
  })

  const contents = root.querySelector<HTMLElement>('[data-reader-contents]')!
  const headings = [...root.querySelectorAll<HTMLElement>('article h2')]
  if (headings.length > 1) {
    const list = document.createElement('ol')
    headings.forEach((heading, index) => {
      heading.id ||= `section-${index + 1}`
      const item = document.createElement('li')
      const link = document.createElement('a')
      link.href = `#${heading.id}`
      link.textContent = heading.textContent
      item.append(link)
      list.append(item)
    })
    contents.append(list)
    contents.hidden = false
  }
  const filter = root.querySelector<HTMLFormElement>('[data-reader-filter]')
  if (filter) {
    filter.hidden = false
    const input = filter.querySelector('input')!
    const rows = [...root.querySelectorAll<HTMLElement>('.reader-body > ul > li')]
    const searchable = rows.map((row) => row.textContent?.toLocaleLowerCase() ?? '')
    filter.addEventListener('submit', (event) => event.preventDefault())
    input.addEventListener('input', () => {
      const query = input.value.trim().toLocaleLowerCase()
      let count = 0
      rows.forEach((row, index) => {
        row.hidden = !searchable[index].includes(query)
        if (!row.hidden) count++
      })
      announce(`找到 ${count} 条记录`)
    })
  }
}
