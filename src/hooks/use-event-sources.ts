import { useEffect, useState } from 'react'
import sourceIndexUrl from '../data/generated/reading-sources.json?url'
import { fetchJson } from '../lib/fetch-json'
import type { Source } from '../types'

type SourceIndex = Record<string, Source[]>
let cached: SourceIndex | undefined
let pending: Promise<SourceIndex> | undefined

async function loadSources() {
  if (cached) return cached
  if (!pending) {
    pending = fetchJson<SourceIndex>(sourceIndexUrl)
      .then((index) => {
        if (!index || typeof index !== 'object' || Array.isArray(index))
          throw new Error('Invalid source index')
        cached = index
        return index
      })
      .finally(() => {
        pending = undefined
      })
  }
  return pending
}

export function useEventSources(eventIds: string[]) {
  const [index, setIndex] = useState(cached)
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const needed = eventIds.length > 0
  useEffect(() => {
    if (!needed) return
    let current = true
    void loadSources().then(
      (value) => {
        if (current) setIndex(value)
      },
      () => {
        if (current) setFailed(true)
      },
    )
    return () => {
      current = false
    }
  }, [needed, attempt])
  return {
    sources: eventIds.flatMap((id) => index?.[id] ?? []),
    loading: needed && !index && !failed,
    failed: needed && !index && failed,
    retry: () => {
      setFailed(false)
      setAttempt((value) => value + 1)
    },
  }
}
