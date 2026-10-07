import { describe, expect, it } from 'vitest'
import { events } from '../data/content'
import { groupMapEvents, groupTimelineEvents, intersects } from './markers'

const point = (id: string, year: number, x: number, y = 0) => ({
  ...events[0],
  id,
  year,
  coordinates: [x, y] as [number, number],
})
const project = ([x, y]: [number, number]) => ({ x, y })

describe('event markers', () => {
  it('keeps coincident and connected nearby events accessible in a single chronological group', () => {
    const groups = groupMapEvents(
      [
        point('late', 30, 37),
        point('same-place', 20, 37),
        point('early', 10, 60),
        point('connected', 40, 85),
        point('distant', 50, 140),
      ],
      project,
    )
    expect(groups).toHaveLength(2)
    expect(groups[0].events.map((event) => event.id)).toEqual([
      'early',
      'same-place',
      'late',
      'connected',
    ])
    expect(groups.flatMap((group) => group.events)).toHaveLength(5)
  })
  it('splits nearby geographic points as the map is zoomed in without moving their coordinates', () => {
    const data = [point('a', 10, 1), point('b', 20, 2)]
    expect(groupMapEvents(data, ([x, y]) => ({ x: x * 10, y }))).toHaveLength(1)
    const zoomed = groupMapEvents(data, ([x, y]) => ({ x: x * 100, y }))
    expect(zoomed).toHaveLength(2)
    expect(zoomed.map((group) => group.coordinates)).toEqual([
      [1, 0],
      [2, 0],
    ])
  })
  it('groups crowded timeline nodes and leaves sparse endpoints separate', () => {
    const data = [
      point('end', 10, 1),
      point('same', 1, 1),
      point('start', 1, 1),
      point('out', 11, 1),
    ]
    const groups = groupTimelineEvents(data, 1, 10, 400)
    expect(groups).toHaveLength(2)
    expect(groups[0].events.map((event) => event.id)).toEqual(['same', 'start'])
    expect(groups.map((group) => group.position)).toEqual([0, 1])
  })
  it('uses one elapsed year between BCE and CE on the timeline', () => {
    const groups = groupTimelineEvents([point('bce', -1, 1), point('ce', 1, 1)], -1, 1, 400)
    expect(groups.map((group) => group.position)).toEqual([0, 1])
  })
  it('reserves spacing between labels and overlays', () => {
    const label = { left: 0, top: 0, right: 10, bottom: 10 }
    const nearby = { left: 12, top: 0, right: 22, bottom: 10 }
    expect(intersects(label, nearby, 0)).toBe(false)
    expect(intersects(label, nearby, 3)).toBe(true)
    expect(intersects(label, { left: 50, top: 50, right: 70, bottom: 70 })).toBe(false)
  })
})
