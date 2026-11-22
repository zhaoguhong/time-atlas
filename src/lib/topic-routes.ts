import type { TopicRoute, RouteCoordinate } from '../data/topic-routes'

/** Keep a continuous west/east voyage when crossing ±180°, including the return port. */
export function routeGeometry(route: TopicRoute) {
  const stops: RouteCoordinate[] = []
  const legs: RouteCoordinate[][] = []
  let previous: RouteCoordinate | undefined
  route.stops.forEach((stop, i) => {
    const leg: RouteCoordinate[] = previous ? [previous] : []
    for (const point of [...(i ? (stop.via ?? []) : []), stop.coordinates]) {
      let longitude = point[0]
      if (previous) {
        while (longitude - previous[0] > 180) longitude -= 360
        while (longitude - previous[0] < -180) longitude += 360
      }
      previous = [longitude, point[1]]
      leg.push(previous)
    }
    stops.push(previous!)
    if (i) legs.push(leg)
  })
  return { stops, legs, line: legs.flatMap((leg, i) => (i ? leg.slice(1) : leg)) }
}

/** Split a continuous journey at the antimeridian for a single-world article map. */
export function routeMapSegments(route: TopicRoute): RouteCoordinate[][] {
  const line = routeGeometry(route).line
  const normalize = (x: number) => ((((x + 180) % 360) + 360) % 360) - 180
  const result: RouteCoordinate[][] = []
  for (let i = 1; i < line.length; i++) {
    const a: RouteCoordinate = [normalize(line[i - 1][0]), line[i - 1][1]]
    const b: RouteCoordinate = [a[0] + line[i][0] - line[i - 1][0], line[i][1]]
    if (b[0] > 180 || b[0] < -180) {
      const edge = b[0] > 180 ? 180 : -180
      const latitude = a[1] + (b[1] - a[1]) * ((edge - a[0]) / (b[0] - a[0]))
      result.push(
        [a, [edge, latitude]],
        [
          [-edge, latitude],
          [normalize(b[0]), b[1]],
        ],
      )
    } else result.push([a, b])
  }
  return result
}
