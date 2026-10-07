import { describe, expect, it } from 'vitest'
import { journeys, journeyByPerson } from '../data/journeys'
import { people, personById } from '../data/content'
import {
  activeJourneyNode,
  journeySegments,
  matchesPerson,
  personFocusYear,
  visibleJourneyNodes,
} from './journeys'
import type { JourneyView } from '../types'

function view(id: string, year: number, point: string | null = null, future = false): JourneyView {
  const journey = journeyByPerson.get(id)!
  return {
    personId: id,
    name: personById.get(id)!.name,
    nodes: journey.nodes,
    activeId: activeJourneyNode(journey.nodes, year, point)?.id ?? null,
    showFuture: future,
  }
}
describe('evidence-based person journeys', () => {
  it('never uses Kangxi’s associated military or diplomatic event locations as his presence', () => {
    const kangxi = journeyByPerson.get('kangxi')!
    expect(kangxi.nodes.map((node) => node.location).join(' ')).not.toMatch(/台湾|尼布楚|昭莫多/)
    expect(kangxi.nodes.find((node) => node.id === 'kangxi-shaoxing')?.year).toBe(1689)
    expect(kangxi.nodes.find((node) => node.id === 'kangxi-duolun')?.year).toBe(1691)
    expect(new Set(kangxi.nodes.map((node) => node.coordinates.join(','))).size).toBeGreaterThan(6)
  })
  it('tracks Su Shi through Huangzhou, Huizhou and Danzhou at the documented years', () => {
    const su = journeyByPerson.get('sushi')!
    expect(activeJourneyNode(su.nodes, 1080)?.id).toBe('sushi-huangzhou')
    expect(activeJourneyNode(su.nodes, 1094)?.id).toBe('sushi-huizhou')
    expect(activeJourneyNode(su.nodes, 1097)?.id).toBe('sushi-danzhou')
    expect(
      su.nodes
        .filter((node) => node.year === 1094)
        .map((node) => node.location)
        .join(' '),
    ).not.toMatch(/汝州|英州/)
    // 英州 is a documented stop on the return in 1100, not the unfulfilled 1094 appointment.
  })
  it('keeps multiple records in the same year in source order, including return visits', () => {
    const nodes = journeyByPerson.get('sushi')!.nodes
    expect(nodes.filter((node) => node.year === 1079).map((node) => node.id)).toEqual([
      'sushi-huzhou',
      'sushi-prison',
    ])
    expect(activeJourneyNode(nodes, 1079, 'sushi-huzhou')?.location).toContain('湖州')
    expect(activeJourneyNode(nodes, 1079)?.location).toContain('开封')
    const selected = view('sushi', 1057, 'sushi-exam')
    expect(visibleJourneyNodes(selected).map((node) => node.id)).toEqual([
      'sushi-birth',
      'sushi-exam',
    ])
    const returned = journeySegments(view('sushi', 1057, 'sushi-mourning')).features.at(-1)!
    expect(returned.geometry.coordinates).toEqual([
      [114.31, 34.8],
      [103.85, 30.08],
    ])
  })
  it('orders every directed segment chronologically and omits zero-length city segments', () => {
    for (const journey of journeys) {
      const v = view(journey.personId, journey.nodes.at(-1)!.year)
      for (const segment of journeySegments(v).features) {
        const from = journey.nodes.find((node) => node.id === segment.properties!.fromId)!
        const to = journey.nodes.find((node) => node.id === segment.properties!.toId)!
        expect(segment.geometry.coordinates).toEqual([from.coordinates, to.coordinates])
        expect(from.year).toBeLessThanOrEqual(to.year)
        expect(from.coordinates).not.toEqual(to.coordinates)
      }
    }
  })
  it('does not disclose future journey records until explicitly enabled', () => {
    expect(journeySegments(view('kangxi', 1661)).features).toEqual([])
    expect(visibleJourneyNodes(view('sushi', 1080)).some((node) => node.year > 1080)).toBe(false)
    expect(
      journeySegments(view('sushi', 1080, null, true)).features.some(
        (f) => f.properties!.status === 'future',
      ),
    ).toBe(true)
  })
  it('requires source citations, chronological ordering and lifetime-compatible nodes', () => {
    for (const journey of journeys) {
      const person = personById.get(journey.personId)!
      expect(person).toBeDefined()
      expect(journey.nodes.map((node) => node.year)).toEqual(
        [...journey.nodes.map((node) => node.year)].sort((a, b) => a - b),
      )
      expect(new Set(journey.nodes.map((node) => node.id)).size).toBe(journey.nodes.length)
      for (const node of journey.nodes) {
        expect(node.sources.length).toBeGreaterThan(0)
        expect(node.locationNote.length).toBeGreaterThan(0)
        if (person.birth !== null) expect(node.year).toBeGreaterThanOrEqual(person.birth)
        if (person.death !== null) expect(node.year).toBeLessThanOrEqual(person.death)
      }
    }
  })
  it('finds major people and aliases without depending on event participation', () => {
    for (const query of [
      '苏轼',
      '苏东坡',
      '蘇軾',
      '李白',
      '李清照',
      '孔子',
      '王羲之',
      '辛弃疾',
      '曹雪芹',
      '徐霞客',
      '康熙',
      '玄烨',
    ])
      expect(
        people.some((person) => matchesPerson(person, query)),
        query,
      ).toBe(true)
    expect(people.length).toBeGreaterThan(500)
    expect(personFocusYear(personById.get('kangxi')!, 230, journeyByPerson.get('kangxi'))).toBe(
      1654,
    )
    expect(personFocusYear(personById.get('sushi')!, 1080, journeyByPerson.get('sushi'))).toBe(1080)
  })
})
