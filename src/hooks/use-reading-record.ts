import { useEffect, useState } from 'react'
import type { HistoryEvent, Person } from '../types'

type Record = HistoryEvent | Person
const cache = new Map<string, Record>()
const pending = new Map<string, Promise<Record>>()

async function load(path: string, id: string) {
  const cached = cache.get(path)
  if (cached) return cached
  const existing = pending.get(path)
  if (existing) return existing
  const request = (async () => {
    const response = await fetch(`${import.meta.env.BASE_URL}${path}`)
    if (!response.ok) throw new Error('Reading unavailable')
    const record = (await response.json()) as Record
    if (record.id !== id || !Array.isArray(record.sources)) throw new Error('Invalid reading')
    cache.set(path, record)
    // Full articles are optional; bound memory while exploring a large collection.
    while (cache.size > 40) cache.delete(cache.keys().next().value!)
    return record
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
    void load(path, id).then(
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
