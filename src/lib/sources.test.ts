import { describe, expect, it } from 'vitest'
import { canonicalSources } from '../data/sources'
import { events, people } from '../data/content'

describe('canonical source references', () => {
  it('merges repeated volumes after normalization without losing notes or mutating inputs', () => {
    const input = [
      { title: '卷54', url: 'https://zh.wikisource.org/wiki/三國志/卷054', note: '战争经过' },
      { title: '卷54', url: 'https://zh.wikisource.org/wiki/三國志/卷54', note: '人物活动' },
    ]
    expect(canonicalSources(input)).toEqual([
      {
        title: '卷54',
        url: 'https://zh.wikisource.org/wiki/三國志/卷54',
        note: '战争经过；人物活动',
      },
    ])
    expect(input[0].note).toBe('战争经过')
  })

  it('keeps separate chapters and removes duplicate citations across the content collection', () => {
    for (const record of [...events, ...people]) {
      expect(new Set(record.sources.map((source) => source.url)).size, record.id).toBe(
        record.sources.length,
      )
    }
    const chibi = events.find((event) => event.id === 'chibi')!
    expect(chibi.sources.map((source) => source.url)).toEqual(
      expect.arrayContaining([
        'https://zh.wikisource.org/wiki/三國志/卷01',
        'https://zh.wikisource.org/wiki/三國志/卷32',
        'https://zh.wikisource.org/wiki/三國志/卷54',
      ]),
    )
    expect(chibi.sources).toHaveLength(3)
  })
})
