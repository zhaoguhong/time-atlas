import { useMemo } from 'react'
import { topicRouteById } from '../data/topic-routes'
import RouteMap from './RouteMap'

export default function RouteOverviewMap({
  routeIds,
  onSelect,
}: {
  routeIds: string[]
  onSelect: (routeId: string, index: number) => void
}) {
  const routes = useMemo(
    () => routeIds.flatMap((id) => (topicRouteById.has(id) ? [topicRouteById.get(id)!] : [])),
    [routeIds],
  )
  return <RouteMap routes={routes} overview onSelect={onSelect} />
}
