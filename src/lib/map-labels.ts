export interface MapLabelPoint {
  /** Marker centre in pixels relative to the map. */
  x: number
  y: number
  width: number
  height: number
  priority?: number
}

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

/** Keep historical/modern explanations in the details, with a short name on the map. */
export function shortMapLabel(name: string): string {
  return name.split(/\s*[·・（(]\s*/)[0].trim() || name.trim()
}

const overlaps = (a: Rect, b: Rect) =>
  a.x < b.x + b.width + 4 &&
  a.x + a.width + 4 > b.x &&
  a.y < b.y + b.height + 4 &&
  a.y + a.height + 4 > b.y

/** Place labels around their markers; re-run after zoom, pan or resize. */
export function layoutMapLabels(
  points: MapLabelPoint[],
  viewport: { width: number; height: number },
  obstacles: Rect[] = [],
): ({ x: number; y: number } | null)[] {
  const result: ({ x: number; y: number } | null)[] = points.map(() => null)
  const occupied = [
    ...obstacles,
    ...points.map(({ x, y }) => ({ x: x - 14, y: y - 14, width: 28, height: 28 })),
  ]
  const ordered = points
    .map((point, index) => ({ ...point, index }))
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0) || a.index - b.index)
  for (const point of ordered) {
    const { x, y, width, height } = point
    if (
      x < 0 ||
      x > viewport.width ||
      y < 0 ||
      y > viewport.height ||
      width > viewport.width - 12 ||
      height > viewport.height - 12
    )
      continue
    const candidates = [
      { x: x + 20, y: y - height / 2 },
      { x: x - width - 20, y: y - height / 2 },
      { x: x - width / 2, y: y - height - 20 },
      { x: x - width / 2, y: y + 20 },
      { x: x + 18, y: y - height - 18 },
      { x: x - width - 18, y: y - height - 18 },
      { x: x + 18, y: y + 18 },
      { x: x - width - 18, y: y + 18 },
    ]
    const position = candidates.find(
      (candidate) =>
        candidate.x >= 6 &&
        candidate.y >= 6 &&
        candidate.x + width <= viewport.width - 6 &&
        candidate.y + height <= viewport.height - 6 &&
        !occupied.some((rect) => overlaps({ ...candidate, width, height }, rect)),
    )
    if (position) {
      result[point.index] = position
      occupied.push({ ...position, width, height })
    }
  }
  return result
}
