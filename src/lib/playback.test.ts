import { describe, expect, it } from 'vitest'
import { journeyByPerson } from '../data/journeys'
import { interpolateJourneyCoordinates, nextJourneyNode } from './playback'

describe('chronological journey playback', () => {
  it('advances same-year records individually and stops after the last record', () => {
    const nodes = journeyByPerson.get('sushi')!.nodes
    expect(nodes[1].year).toBe(nodes[2].year)
    expect(nextJourneyNode(nodes, nodes[1].id)?.id).toBe(nodes[2].id)
    expect(nextJourneyNode(nodes, nodes.at(-1)!.id)).toBeNull()
    expect(nextJourneyNode(nodes, null)?.id).toBe(nodes[0].id)
  })
  it('follows the projected line with exact endpoints and safe progress bounds', () => {
    const from: [number, number] = [105, 20],
      to: [number, number] = [120, 50]
    expect(interpolateJourneyCoordinates(from, to, -0.1)[0]).toBe(105)
    expect(interpolateJourneyCoordinates(from, to, 2)[0]).toBe(120)
    expect(interpolateJourneyCoordinates(from, to, 0)[1]).toBeCloseTo(20)
    expect(interpolateJourneyCoordinates(from, to, 1)[1]).toBeCloseTo(50)
    const halfway = interpolateJourneyCoordinates(from, to, 0.5)
    expect(halfway[0]).toBe(112.5)
    const mercator = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))
    expect(mercator(halfway[1])).toBeCloseTo((mercator(20) + mercator(50)) / 2)
  })
})
