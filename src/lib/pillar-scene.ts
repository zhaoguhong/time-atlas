import type { HistoryEvent } from '../types'
import { layoutPillarWindow, type PillarCard, type PillarSide } from './time-pillar'

type SceneWindow = { bottom: number; top: number; span: number; year?: number }

export type PillarScene = {
  window: SceneWindow
  height: number
  cardHeight: number
  side: PillarSide
  selectedId?: string
  events: HistoryEvent[]
  tiles: Map<number, PillarCard[]>
}

const GAP = 4
const TILE_RADIUS = 2

/** The first tile keeps exactly the normal importance-first layout. */
export function createPillarScene(
  events: HistoryEvent[],
  window: SceneWindow,
  height: number,
  cardHeight: number,
  side: PillarSide,
  selectedId?: string,
): PillarScene {
  return {
    window: { ...window },
    height,
    cardHeight,
    side,
    selectedId,
    events,
    tiles: new Map([
      [
        0,
        layoutPillarWindow(events, window, height, cardHeight, side, selectedId, GAP, window.year),
      ],
    ]),
  }
}

function addTile(scene: PillarScene, index: number) {
  const { window, height, cardHeight, events, side, selectedId } = scene
  const existing = [...scene.tiles.values()].flat()
  const ids = new Set(existing.map((card) => card.event.id))
  const tileWindow = {
    top: window.top + index * window.span,
    bottom: window.bottom + index * window.span,
    span: window.span,
  }
  const cards = layoutPillarWindow(events, tileWindow, height, cardHeight, side, selectedId, GAP)
    .map((card) => ({
      ...card,
      y: card.y - index * height,
      anchorY: card.anchorY - index * height,
    }))
    .filter(
      (card) =>
        !ids.has(card.event.id) &&
        !existing.some(
          (old) => old.side === card.side && Math.abs(old.y - card.y) < cardHeight + GAP,
        ),
    )
  // Only the new, offscreen tile can lose a boundary card. Existing rows never
  // get displaced when the next stretch of chronology is loaded.
  scene.tiles.set(index, cards)
}

/**
 * Retain row identities and packed positions through plain panning, including
 * release. Both cards and date connectors receive the same returned offset.
 * The bounded cache covers the visible tiles plus offscreen neighbors; distant
 * travel evicts old tiles without accumulating the entire historical range.
 */
export function samplePillarScene(scene: PillarScene, window: SceneWindow) {
  if (Math.abs(window.span - scene.window.span) > Math.max(1, scene.window.span) * 1e-8)
    throw new RangeError('A pillar scene must be recreated when its time scale changes')

  const position = (window.top - scene.window.top) / scene.window.span
  const first = Math.floor(position)
  const wanted = Array.from({ length: TILE_RADIUS * 2 + 1 }, (_, i) => first + i - TILE_RADIUS)
  const keep = new Set(wanted)
  for (const index of scene.tiles.keys()) if (!keep.has(index)) scene.tiles.delete(index)

  // Fill the current window first after a distant jump. During ordinary panning
  // its tiles already exist, and only the far edge of the cache is generated.
  const missing = wanted
    .filter((index) => !scene.tiles.has(index))
    .sort((a, b) => Math.abs(a - position) - Math.abs(b - position) || a - b)
  for (const index of missing) addTile(scene, index)

  return {
    cards: [...scene.tiles.values()]
      .flat()
      .sort((a, b) => a.side.localeCompare(b.side) || a.y - b.y),
    offset: position * scene.height,
  }
}
