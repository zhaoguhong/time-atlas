import { describe, expect, it } from 'vitest'
import { eventById, personById } from '../data/content'
import {
  connectedReadings,
  explicitEventPlaces,
  personEventConnections,
} from '../data/content-connections'
import { matchesEventCategory } from './event-categories'
import { eventAtPlace, filterExploration, placeById } from './exploration'
import { relatedReading } from './time-pillar'

describe('curated reading connections', () => {
  it('links authors and translators to their works without confusing the two Lu Xuns', () => {
    for (const [eventId, personId] of [
      ['category-kumarajiva', 'q335293'],
      ['modern-luxun-diary', 'luxun-writer'],
      ['depth-peony-pavilion', 'q945333'],
      ['depth-sun-simiao-qianjin', 'q981193'],
    ]) {
      expect(eventById.get(eventId)?.people).toContain(personId)
      expect(eventById.get(eventId)?.peopleNotes?.[personId]).toBeTruthy()
    }
    expect(eventById.get('modern-luxun-diary')?.people).not.toContain('luxun')
    expect(eventById.get('chibi')?.peopleNotes?.q559744).toContain('联盟')
    expect(eventById.get('guandu')?.peopleNotes?.q1275315).toContain('后方')
  })

  it('rejects stale editorial IDs and preserves separately curated relationships', () => {
    for (const [eventId, relations] of Object.entries(personEventConnections)) {
      expect(eventById.has(eventId), eventId).toBe(true)
      for (const id of Object.keys(relations)) {
        expect(personById.has(id), id).toBe(true)
        expect(eventById.get(eventId)?.people).toContain(id)
      }
    }
    for (const [first, second] of connectedReadings) {
      expect(eventById.has(first), first).toBe(true)
      expect(eventById.has(second), second).toBe(true)
      expect(eventById.get(first)?.relatedEvents?.some((relation) => relation.id === second)).toBe(
        true,
      )
      expect(eventById.get(second)?.relatedEvents?.some((relation) => relation.id === first)).toBe(
        true,
      )
    }
    expect(
      eventById
        .get('world-abbasid')
        ?.relatedEvents?.some((relation) => relation.id === 'world-baghdad'),
    ).toBe(true)
    const record = eventById.get('category-kumarajiva')!
    const next = relatedReading(record, [...eventById.values()]).find(
      (relation) => relation.event.id === 'xuanzang-return',
    )
    expect(next?.note).toContain('不把两位译者写成直接师承')
  })

  it('uses explicit multi-city links and intentional exclusions ahead of location text', () => {
    for (const [eventId, ids] of Object.entries(explicitEventPlaces)) {
      expect(eventById.has(eventId), eventId).toBe(true)
      for (const id of ids) expect(placeById.has(id), id).toBe(true)
    }
    const rome = placeById.get('rome')!
    const paris = placeById.get('paris')!
    const aquinas = eventById.get('phil-aquinas-summa')!
    expect(eventAtPlace(aquinas, rome)).toBe(true)
    expect(eventAtPlace(aquinas, paris)).toBe(true)
    expect(eventAtPlace(eventById.get('modern-marcus-meditations')!, rome)).toBe(false)
    expect(eventAtPlace(eventById.get('world-milan')!, rome)).toBe(false)
    expect(eventAtPlace(eventById.get('world-abbasid')!, placeById.get('baghdad')!)).toBe(false)
    expect(filterExploration([aquinas], { place: 'paris', range: null, bounds: null })).toEqual([
      aquinas,
    ])
    const explicit = { ...aquinas, location: '巴黎', placeIds: [] }
    expect(eventAtPlace(explicit, paris)).toBe(false)
    const legacy = { ...aquinas, location: '巴黎', placeIds: undefined }
    expect(eventAtPlace(legacy, paris)).toBe(true)
  })

  it('makes existing Ming and Qing construction readable under engineering', () => {
    for (const id of ['beijing-capital', 'qijiguang-jizhen', 'fuzhou-shipyard'])
      expect(matchesEventCategory(eventById.get(id)!, '工程建筑'), id).toBe(true)
  })
})
