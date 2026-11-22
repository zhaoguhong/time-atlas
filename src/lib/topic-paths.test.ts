import { expect, test } from 'vitest'
import { indexTopicPaths } from './topic-paths'
import type { Tour } from '../types'

test('indexes explicit chapter positions, including a shared event in different paths', () => {
  const topic = (id: string, steps: string[]): Tour => ({
    id,
    name: id,
    subtitle: '',
    description: '',
    color: '#71836b',
    icon: 'route',
    steps,
    chapters: steps.map((eventId) => ({
      eventId,
      explanation: '阅读理由',
      mapReading: '地点比较',
    })),
  })
  const first = topic('first', ['earlier', 'shared'])
  const second = topic('second', ['shared', 'later'])
  const index = indexTopicPaths([
    first,
    second,
    { ...topic('no-chapters', ['shared']), chapters: undefined },
  ])
  expect(index.get('shared')).toEqual([
    { topic: first, chapter: 1 },
    { topic: second, chapter: 0 },
  ])
  expect(index.get('earlier')).toEqual([{ topic: first, chapter: 0 }])
  expect(index.has('unlisted')).toBe(false)
})
