import { eventUrl, personUrl } from '../lib/record-url'
import { fetchRecordHtml } from '../lib/record-html'
import { useEffect, useState } from 'react'
import type { HistoryEvent, Person } from '../types'
import { fetchJson } from '../lib/fetch-json'

type Record = HistoryEvent | Person
const cache = new Map<string, Record>()
const pending = new Map<string, Promise<Record>>()

async function load(path: string, id: string, index: Record) {
  const cached = cache.get(path)
  if (cached) {
    cache.delete(path)
    cache.set(path, cached)
    return cached
  }
  // The reader's HTML already contains this record. Reuse it when opening the map.
  const embedded = document.getElementById('reading-record')
  if (embedded) {
    try {
      const record = JSON.parse(embedded.textContent ?? '') as Record
      if (record.id === id && Array.isArray(record.sources)) {
        cache.set(path, { ...index, ...record })
        embedded.remove()
        return cache.get(path)!
      }
    } catch {
      /* Fall back to a retryable request. */
    }
  }
  const existing = pending.get(path)
  if (existing) return existing
  const request = (async () => {
    const record = import.meta.env.DEV
      ? await fetchJson<Record>(`${import.meta.env.BASE_URL}${path}`)
      : await fetchRecordHtml<Record>(path.includes('/events/') ? eventUrl(id) : personUrl(id))
    if (record.id !== id || !Array.isArray(record.sources)) throw new Error('Invalid reading')
    cache.set(path, { ...index, ...record })
    // Full articles are optional; bound memory while exploring a large collection.
    while (cache.size > 20) cache.delete(cache.keys().next().value!)
    return cache.get(path)!
  })()
  pending.set(path, request)
  try {
    return await request
  } finally {
    pending.delete(path)
  }
}

export function useReadingRecord<T extends Record>(
  index: (T & { readingPath: string }) | undefined,
) {
  const [result, setResult] = useState<{ path: string; record?: Record; failed?: boolean } | null>(
    null,
  )
  const [attempt, setAttempt] = useState(0)
  const path = index?.readingPath
  const id = index?.id
  useEffect(() => {
    if (!path || !id) return
    let current = true
    void load(path, id, index).then(
      (record) => current && setResult({ path, record }),
      () => current && setResult({ path, failed: true }),
    )
    return () => {
      current = false
    }
  }, [path, id, attempt])
  const record = path
    ? (cache.get(path) ?? (result?.path === path ? result.record : undefined))
    : undefined
  return {
    record: record as T | undefined,
    loading: !!path && !record && !(result?.path === path && result.failed),
    failed: !!path && !record && result?.path === path && !!result.failed,
    retry: () => {
      setResult(null)
      setAttempt((value) => value + 1)
    },
  }
}
