import { describe, expect, it } from 'vitest'
import { routeGeometry } from './topic-routes'
import { topicRoutes, topicRouteById } from '../data/topic-routes'
import { topicTours } from '../data/topics'

describe('documented topic routes', () => {
  it('keeps a circumnavigation continuous across the Pacific and ends one world west', () => {
    const route = topicRouteById.get('first-circumnavigation')!
    const geometry = routeGeometry(route)
    const guam = geometry.stops[route.stops.findIndex((s) => s.name === '关岛')]
    expect(guam[0]).toBeLessThan(-180)
    expect(geometry.stops.at(-1)![0]).toBeCloseTo(geometry.stops[0][0] - 360)
    for (let i = 1; i < geometry.line.length; i++) {
      expect(Math.abs(geometry.line[i][0] - geometry.line[i - 1][0])).toBeLessThanOrEqual(180)
    }
  })
  it('retains journey evidence and disputed dates instead of deriving visits from events', () => {
    const xuan = topicRouteById.get('xuanzang-west')!
    expect(xuan.stops[0].dateLabel).toContain('627')
    expect(xuan.stops.find((s) => s.id.endsWith('nalanda'))?.dateLabel).toContain('不同编年')
    const ganjin = topicRouteById.get('ganjin-sixth')!
    expect(ganjin.stops.some((s) => s.name.includes('海南'))).toBe(false)
    expect(ganjin.stops.find((s) => s.id.endsWith('yakushima'))?.dateLabel).toContain('754')
  })
  it('connects every optional route to a topic with indexed source evidence', () => {
    const used = new Set(topicTours.flatMap((t) => t.routeIds ?? []))
    expect([...used].sort()).toEqual(topicRoutes.map((r) => r.id).sort())
    for (const topic of topicTours)
      for (const id of topic.routeIds ?? []) {
        const route = topicRouteById.get(id)!
        expect(route).toBeDefined()
        for (const source of route.sources)
          expect(topic.sources?.some((s) => s.url === source.url)).toBe(true)
        for (const stop of route.stops) {
          expect(stop.sources.length).toBeGreaterThan(0)
          for (const point of [stop.coordinates, ...(stop.via ?? [])]) {
            expect(Math.abs(point[0])).toBeLessThanOrEqual(180)
            expect(Math.abs(point[1])).toBeLessThan(90)
          }
        }
      }
  })
})
