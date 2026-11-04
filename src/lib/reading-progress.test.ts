import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { readProgress, writeProgress, readingKey, topicStepFromHash } from './reading-progress'

const original = [{ id: 'topic', steps: ['first', 'second', 'third'] }]
const recent = [{ key: 'topic:topic', title: '专题', hash: '#tour=topic&step=1' }]
let storage: Map<string, string>
beforeEach(() => {
  storage = new Map()
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
  })
})
afterEach(() => vi.unstubAllGlobals())

test('read and resume positions follow the same event after insertion and reordering', () => {
  writeProgress({ topics: { topic: { lastStep: 1, read: [0, 1] } }, recent }, original)
  expect(JSON.parse(storage.get(readingKey)!).topics.topic).toEqual({
    lastEventId: 'second',
    readEventIds: ['first', 'second'],
  })
  const updated = [{ id: 'topic', steps: ['new', 'third', 'second', 'first'] }]
  expect(readProgress(updated)).toEqual({
    topics: { topic: { lastStep: 2, read: [3, 2] } },
    recent,
  })
})

test('legacy positional progress migrates without losing recent reading', () => {
  storage.set(
    'time-atlas:reading:v1',
    JSON.stringify({ topics: { topic: { lastStep: 1, read: [0, 1, 1, -1, 9] } }, recent }),
  )
  const migrated = readProgress(original)
  expect(migrated.topics.topic).toEqual({ lastStep: 1, read: [0, 1] })
  writeProgress(migrated, original)
  expect(readProgress([{ id: 'topic', steps: ['second', 'first'] }])).toEqual({
    topics: { topic: { lastStep: 0, read: [1, 0] } },
    recent,
  })
})

test('removed chapters and unknown topics cannot mark unrelated chapters as read', () => {
  writeProgress({ topics: { topic: { lastStep: 1, read: [1] } }, recent: [] }, original)
  expect(readProgress([{ id: 'topic', steps: ['new', 'first'] }]).topics.topic).toEqual({
    lastStep: 0,
    read: [],
  })
  expect(readProgress([]).topics).toEqual({})
})

test('legacy recent event IDs recover the last chapter even if an old index has already moved', () => {
  storage.set(
    'time-atlas:reading:v1',
    JSON.stringify({
      topics: { topic: { lastStep: 1, read: [0, 1] } },
      recent: [{ ...recent[0], hash: '#tour=topic&step=1&event=second' }],
    }),
  )
  const reordered = [{ id: 'topic', steps: ['new', 'first', 'second', 'third'] }]
  expect(readProgress(reordered).topics.topic).toEqual({ lastStep: 2, read: [2] })
  expect(topicStepFromHash(original[0], '#step=99')).toBeUndefined()
  expect(topicStepFromHash(original[0], '#step=1')).toBe(1)
})

test('malformed progress and unavailable storage do not prevent reading', () => {
  storage.set(readingKey, '{broken')
  expect(readProgress(original)).toEqual({ topics: {}, recent: [] })
  vi.stubGlobal('localStorage', {
    getItem() {
      throw new Error('Denied')
    },
    setItem() {
      throw new Error('Denied')
    },
  })
  expect(readProgress(original)).toEqual({ topics: {}, recent: [] })
  expect(() => writeProgress({ topics: {}, recent: [] }, original)).not.toThrow()
})
