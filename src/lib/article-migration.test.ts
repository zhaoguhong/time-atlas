import { expect, test, vi } from 'vitest'
import { articleTourCatalog } from '../data/articles'
import { readProgress } from './reading-progress'
import { articleGroups, canonicalArticleId } from '../data/article-groups'
import {
  consolidateArticleProgress,
  consolidateBookmarks,
  toggleArticleEventRead,
} from './article-migration'

test('each legacy article has one destination in the current directory', () => {
  const legacy = articleGroups.flatMap((group) => [...group])
  expect(articleGroups).toHaveLength(22)
  expect(legacy).toHaveLength(70)
  expect(new Set(legacy).size).toBe(70)
  expect(canonicalArticleId.get('paper-money-and-trust')).toBe('tax-money-markets')
  expect(canonicalArticleId.get('ganjin-crossing')).toBe('buddhist-texts-and-networks')
  expect(canonicalArticleId.get('three-kingdoms')).toBe('qin-unification')
  expect(canonicalArticleId.get('song-learning')).toBe('tax-money-markets')
})

test('consolidates bookmarks without duplicating a merged article or changing other records', () => {
  expect(
    consolidateBookmarks(
      [
        'topic:paper-money-and-trust',
        'event:official-jiaozi',
        'topic:tax-money-markets',
        'topic:unknown',
        'person:sushi',
      ],
      canonicalArticleId,
    ),
  ).toEqual(['topic:tax-money-markets', 'event:official-jiaozi', 'topic:unknown', 'person:sushi'])
})

test('retains event marks introduced by the preceding merged edition', () => {
  const entries = [
    ['song-learning', 'shaosheng-policy-reversal', 'tax-money-markets'],
    ['silk-road', 'jianzhen', 'buddhist-texts-and-networks'],
    ['reformation', 'xuanzang-return', 'buddhist-texts-and-networks'],
    ['maritime-connections', 'world-srivijaya', 'silk-road'],
    ['water-food-cities', 'world-tenochtitlan', 'grand-canal'],
  ]
  const saved = JSON.stringify({
    topics: Object.fromEntries(
      entries.map(([id, eventId]) => [id, { lastEventId: eventId, readEventIds: [eventId] }]),
    ),
    recent: [],
  })
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => (key === 'time-atlas:reading:v2' ? saved : null),
  })
  try {
    const result = consolidateArticleProgress(
      readProgress(articleTourCatalog),
      articleTourCatalog,
      canonicalArticleId,
    )
    for (const [, eventId, canonical] of entries) {
      const guide = articleTourCatalog.find((guide) => guide.id === canonical)!
      expect(result.topics[canonical].read.map((step) => guide.steps[step])).toContain(eventId)
    }
  } finally {
    vi.unstubAllGlobals()
  }
})

test('moves read marks by event ID and takes the last event from the most recent legacy guide', () => {
  const catalog = [
    { id: 'main', name: '合并文章', steps: ['early', 'shared', 'later'] },
    { id: 'child', name: '旧子题', steps: ['shared', 'later'] },
  ]
  const progress = {
    topics: {
      main: { lastStep: 0, read: [0, 1] },
      child: { lastStep: 1, read: [0, 1] },
    },
    recent: [
      { key: 'topic:child', title: '旧子题', hash: '#tour=child&event=later&step=1' },
      { key: 'event:early', title: '事件', hash: '#event=early' },
      { key: 'topic:main', title: '旧主文', hash: '#article=main' },
    ],
  }
  const result = consolidateArticleProgress(
    progress,
    catalog,
    new Map([
      ['main', 'main'],
      ['child', 'main'],
    ]),
  )
  expect(result.topics.main).toEqual({ lastStep: 2, read: [0, 1, 2] })
  expect(result.topics.child).toEqual(progress.topics.child)
  expect(result.recent).toEqual([
    { key: 'topic:main', title: '合并文章', hash: '#tour=child&event=later&step=1' },
    progress.recent[1],
  ])
  expect(progress.topics.main.read).toEqual([0, 1])
})

test('unmarking a merged event stays unmarked after another migration and supports old guides', () => {
  const catalog = [
    { id: 'main', name: '主文', steps: ['early', 'shared', 'later'] },
    { id: 'child', name: '旧子题', steps: ['shared', 'later'] },
    { id: 'other', name: '另一个专题', steps: ['shared'] },
  ]
  const aliases = new Map([
    ['main', 'main'],
    ['child', 'main'],
  ])
  const progress = {
    topics: {
      main: { lastStep: 1, read: [1] },
      child: { lastStep: 0, read: [0] },
      other: { lastStep: 0, read: [0] },
    },
    recent: [],
  }
  const unmarked = toggleArticleEventRead(progress, catalog, aliases, 'main', 1)
  expect(consolidateArticleProgress(unmarked, catalog, aliases).topics.main.read).toEqual([])
  expect(unmarked.topics.child.read).toEqual([])
  expect(unmarked.topics.other.read).toEqual([0])
  const marked = toggleArticleEventRead(unmarked, catalog, aliases, 'child', 0)
  expect(marked.topics.main.read).toEqual([1])
  expect(marked.topics.child.read).toEqual([0])
})
