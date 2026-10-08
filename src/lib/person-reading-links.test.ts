import { describe, expect, it } from 'vitest'
import { people, personById } from '../data/content'
import wikipediaLinks from '../data/generated/person-reading-links.json'
import importedPeople from '../data/generated/people.json'
import { personReadingLinks } from './person-reading-links'
import { readingSourceUrl } from './source-links'

describe('person further reading', () => {
  it('uses identity-matched encyclopedia pages for historical namesakes', () => {
    for (const [name, title] of [
      ['王蒙', '王蒙 (画家)'],
      ['王小波', '王小波 (北宋)'],
      ['李靖', '李靖'],
    ]) {
      const person = people.find((person) => person.name === name)!
      const link = personReadingLinks(person)[0]
      expect(link.kind).toBe('百科介绍')
      expect(decodeURIComponent(new URL(link.url).pathname)).toBe(`/wiki/${title}`)
    }
  })

  it('keeps every exported sitelink attached to the imported identity revision', () => {
    for (const [qid, link] of Object.entries(wikipediaLinks)) {
      const person = importedPeople.find((person) => person.wikidata === qid)
      expect(person, qid).toBeDefined()
      expect(link.revision, qid).toBe(person!.revision)
      expect(link.title.trim(), qid).toBeTruthy()
    }
  })

  it('falls back to cited sources when there is no matching identity snapshot', () => {
    const person = personById.get('sushi')!
    for (const identity of [
      { wikidata: undefined, revision: undefined },
      { wikidata: person.wikidata, revision: -1 },
    ]) {
      const links = personReadingLinks({ ...person, ...identity })
      expect(links.some((link) => link.kind === '百科介绍')).toBe(false)
      expect(links[0].provider).toBe('平顶山学院')
    }
  })

  it('prioritizes chronologies and deduplicates original texts by their reading destination', () => {
    const person = personById.get('sushi')!
    const links = personReadingLinks({
      ...person,
      sources: [
        { title: '《宋史》卷338', url: 'https://zh.wikisource.org/wiki/宋史/卷338' },
        { title: '重复引用', url: 'https://zh.wikisource.org/zh-hans/宋史/卷338' },
        person.sources.find((source) => source.title.includes('年谱'))!,
      ],
    })
    expect(links.map((link) => link.kind)).toEqual(['百科介绍', '生平年谱', '原典阅读'])
    expect(new Set(links.map((link) => readingSourceUrl(link.url))).size).toBe(links.length)
  })

  it('offers bounded HTTPS links for every person without describing structured data as a biography', () => {
    for (const person of people) {
      const links = personReadingLinks(person)
      expect(links.length, person.name).toBeGreaterThan(0)
      expect(links.length, person.name).toBeLessThanOrEqual(3)
      for (const link of links) {
        expect(new URL(link.url).protocol, person.name).toBe('https:')
        if (link.provider === '维基数据') expect(link.kind).toBe('基础资料')
      }
    }
  })
})
