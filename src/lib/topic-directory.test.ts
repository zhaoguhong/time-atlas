import { afterEach, describe, expect, it, vi } from 'vitest'
import type { Tour } from '../types'
import {
  readTopicDirectoryPreferences,
  topicDirectoryStorageKey,
  topicMatchesQuery,
  topicReadingStats,
  writeTopicDirectoryPreferences,
} from './topic-directory'

const topic: Tour = {
  id: 'paper-money',
  name: '一张纸为什么能当钱用？',
  subject: '生产与经济',
  subtitle: '相关史事',
  description: '从交子读懂发行与信用。',
  introduction: ['纸币使交易更便捷。'],
  article: {
    headings: { 0: '兑现的承诺' },
    paragraphs: ['持有人需要相信，下一次付款仍有人愿意接受纸币。'],
    eventIds: ['jiaozi'],
  },
  conclusion: '信用需要持续维持。',
  chapters: [
    {
      eventId: 'jiaozi',
      explanation: '这段延伸事件的说明不计入文章阅读时长。'.repeat(100),
      mapReading: '查看发行地。',
    },
  ],
  steps: ['jiaozi'],
  color: '#71836b',
  icon: 'route',
}

afterEach(() => vi.unstubAllGlobals())

describe('topic article directory', () => {
  it('finds a topic using terms from its title, category and section headings together', () => {
    expect(topicMatchesQuery(topic, '  纸  经济  兑现  ')).toBe(true)
    expect(topicMatchesQuery(topic, '纸 航海')).toBe(false)
    expect(topicMatchesQuery(topic, '  ')).toBe(true)
    expect(
      topicMatchesQuery(
        { ...topic, name: '赋税与货币', searchTerms: ['一张纸为什么能当钱用？'] },
        '一张纸',
      ),
    ).toBe(true)
  })

  it('estimates the article itself without counting separately linked event chapters', () => {
    const reading = topicReadingStats(topic)
    expect(reading.characters).toBeGreaterThan(30)
    expect(reading.characters).toBeLessThan(60)
    expect(reading.minutes).toBe(1)
    expect(topicReadingStats({ ...topic, chapters: [] })).toEqual(reading)
    expect(
      topicReadingStats({
        ...topic,
        introduction: [],
        article: { paragraphs: ['字'.repeat(701)], eventIds: [] },
        conclusion: undefined,
      }),
    ).toEqual({ characters: 701, minutes: 3 })
  })

  it('restores all directory choices independently from saved reading records', () => {
    const values = new Map([['time-atlas:reading:v2', 'unchanged']])
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    })
    const chosen = { layout: 'directory' as const, subject: '生产与经济', query: '纸币' }
    writeTopicDirectoryPreferences(chosen)
    expect(readTopicDirectoryPreferences()).toEqual(chosen)
    expect(values.get('time-atlas:reading:v2')).toBe('unchanged')
    values.set(topicDirectoryStorageKey, '{"layout":"unknown","subject":8,"query":null}')
    expect(readTopicDirectoryPreferences()).toEqual({ layout: 'cards', subject: '全部', query: '' })
  })

  it('keeps the directory usable when browser storage is denied', () => {
    vi.stubGlobal('localStorage', {
      getItem() {
        throw new DOMException('Storage denied', 'SecurityError')
      },
      setItem() {
        throw new DOMException('Storage denied', 'SecurityError')
      },
    })
    expect(readTopicDirectoryPreferences()).toEqual({ layout: 'cards', subject: '全部', query: '' })
    expect(() =>
      writeTopicDirectoryPreferences({ layout: 'list', subject: '全部', query: '河西' }),
    ).not.toThrow()
  })
})
