import { describe, expect, it } from 'vitest'
import { eventById, personById } from '../data/catalog'
import { matchesEvent } from './history'
import { eventSearchMatch } from './search'

describe('catalog search discovery', () => {
  it('finds existing events through their summaries and reading themes', () => {
    const tax = eventById.get('lu-land-tax')!
    expect(tax.title).not.toContain('赋税')
    expect(matchesEvent(tax, '赋税')).toBe(true)
    expect(eventSearchMatch(tax, '赋税')?.reason).toBe('介绍提及“赋税”')

    const silk = eventById.get('early-plus-han-silk-market')!
    expect(matchesEvent(silk, '经济贸易')).toBe(true)
    expect(eventSearchMatch(silk, '经济贸易')?.reason).toBe('主题：经济贸易')
  })

  it('resolves a linked person name, courtesy name and aliases without linking unrelated events', () => {
    const chibi = eventById.get('chibi')!
    for (const query of ['周瑜', '公瑾', ' ZHOU YU ']) {
      expect(matchesEvent(chibi, query, personById), query).toBe(true)
      expect(eventSearchMatch(chibi, query, personById)?.reason, query).toBe('相关人物：周瑜')
      expect(matchesEvent(eventById.get('lu-land-tax')!, query, personById), query).toBe(false)
    }
    expect(matchesEvent(chibi, '公瑾')).toBe(false)
  })

  it('prioritizes titles and aliases above linked people and summary mentions', () => {
    const chibi = eventById.get('chibi')!
    const title = { ...chibi, title: '周瑜', aliases: [] }
    const partialTitle = { ...chibi, title: '周瑜率军', aliases: [] }
    const alias = { ...chibi, aliases: ['周瑜'] }
    const summaryOnly = { ...chibi, people: [] }
    const ranked = [summaryOnly, chibi, partialTitle, title, alias].sort(
      (a, b) =>
        eventSearchMatch(a, '周瑜', personById)!.rank -
        eventSearchMatch(b, '周瑜', personById)!.rank,
    )
    expect(ranked).toEqual([title, alias, partialTitle, chibi, summaryOnly])
  })

  it('preserves title, alias, date and location searches and empty filters', () => {
    const opiumWar = eventById.get('opium-war')!
    for (const query of ['第一次 鸦片战争', '1840', opiumWar.location, '  '])
      expect(matchesEvent(opiumWar, query), query).toBe(true)
    expect(matchesEvent(eventById.get('sino-japanese')!, '甲午中日战争')).toBe(true)
    expect(matchesEvent(opiumWar, '不存在的检索词')).toBe(false)
  })
})
