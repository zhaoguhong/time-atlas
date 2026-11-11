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
