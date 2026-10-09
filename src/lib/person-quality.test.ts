import { describe, expect, it } from 'vitest'
import { eventById, events, personById } from '../data/content'
import { journeys } from '../data/journeys'

describe('source-supported person content', () => {
  it('connects existing events to the people whose roles their sources document', () => {
    for (const [personId, eventIds] of [
      ['q1131595', ['nine-classics-printing']],
      ['q1319646', ['gaoping-954', 'later-zhou-reforms', 'later-zhou-huainan', 'later-zhou-north']],
      ['depth-ronghong', ['jiangnan-arsenal', 'students-abroad']],
    ] as const) {
      expect(personById.get(personId)?.recordKind, personId).toBe('curated')
      expect(
        events.filter((event) => event.people.includes(personId)).map((event) => event.id),
        personId,
      ).toEqual(eventIds)
    }
  })

  it('uses the source volumes that establish the printing stages and the 956 campaign', () => {
    const printing = eventById.get('nine-classics-printing')!
    const urls = printing.sources.map((source) => source.url)
    expect(printing.year).toBe(932)
    expect(urls).toEqual(
      expect.arrayContaining([
        'https://zh.wikisource.org/wiki/舊五代史/卷43',
        'https://zh.wikisource.org/wiki/舊五代史/卷126',
        'https://zh.wikisource.org/wiki/五代會要/卷八',
      ]),
    )
    expect(urls).not.toContain('https://zh.wikisource.org/wiki/舊五代史/卷143')
    expect(printing.dateNote).toContain('953')
    expect(printing.peopleNotes?.q1131595).toContain('组织者')
    expect(eventById.get('later-zhou-huainan')?.sources.map((source) => source.url)).toContain(
      'https://zh.wikisource.org/wiki/舊五代史/卷116',
    )
  })

  it('explains procurement as preparation and keeps related events separate from journeys', () => {
    const arsenal = eventById.get('jiangnan-arsenal')!
    expect(arsenal.year).toBe(1865)
    expect(arsenal.peopleNotes?.['depth-ronghong']).toContain('1863')
    expect(arsenal.peopleNotes?.['depth-ronghong']).toContain('前期筹备')
    expect(arsenal.sources.map((source) => source.url)).toContain(
      'https://www.zs.gov.cn/zjzs/zsmr/content/post_220052.html',
    )
    for (const personId of ['q1131595', 'q1319646', 'depth-ronghong'])
      expect(
        journeys.some((journey) => journey.personId === personId),
        personId,
      ).toBe(false)
  })

  it('keeps undated philosophical and artistic narratives outside the dated event graph', () => {
    for (const [personId, sourceUrl] of [
      ['mozi', 'https://zh.wikisource.org/wiki/墨子/公輸'],
      ['q2665475', 'https://zh.wikisource.org/wiki/筆法記'],
    ]) {
      const person = personById.get(personId)!
      expect(person.birth, personId).toBeNull()
      expect(person.death, personId).toBeNull()
      expect(
        person.sources.map((source) => source.url),
        personId,
      ).toContain(sourceUrl)
      expect(
        events.some((event) => event.people.includes(personId)),
        personId,
      ).toBe(false)
      expect(
        journeys.some((journey) => journey.personId === personId),
        personId,
      ).toBe(false)
      expect(person.biography, personId).toContain('纪年')
    }
  })
})
