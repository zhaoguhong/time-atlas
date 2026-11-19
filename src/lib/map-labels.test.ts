import { describe, expect, it } from 'vitest'
import { layoutMapLabels, shortMapLabel } from './map-labels'

describe('map place labels', () => {
  it('keeps short historical names without changing the detailed name', () => {
    expect(shortMapLabel('龟兹 · 今库车')).toBe('龟兹')
    expect(shortMapLabel('长安（今陕西西安）')).toBe('长安')
    expect(shortMapLabel('长安 (今陕西西安)')).toBe('长安')
    expect(shortMapLabel('长安')).toBe('长安')
  })

  it('places nearby names in different positions without collisions', () => {
    const points = [
      { x: 120, y: 120, width: 52, height: 24 },
      { x: 152, y: 110, width: 52, height: 24 },
      { x: 188, y: 125, width: 52, height: 24 },
    ]
    const labels = layoutMapLabels(points, { width: 320, height: 240 })
    expect(labels.every(Boolean)).toBe(true)
    for (const [i, a] of labels.entries()) {
      expect(a!.x).toBeGreaterThanOrEqual(6)
      expect(a!.x + points[i].width).toBeLessThanOrEqual(314)
      for (let j = i + 1; j < labels.length; j++) {
        const b = labels[j]!
        expect(
          a!.x + points[i].width + 4 <= b.x ||
            b.x + points[j].width + 4 <= a!.x ||
            a!.y + points[i].height + 4 <= b.y ||
            b.y + points[j].height + 4 <= a!.y,
        ).toBe(true)
      }
    }
  })

  it('gives a selected name the available space before lower priority names', () => {
    const points = [
      { x: 90, y: 32, width: 100, height: 24 },
      { x: 90, y: 32, width: 100, height: 24, priority: 10 },
    ]
    const labels = layoutMapLabels(points, { width: 220, height: 65 })
    expect(labels[1]).not.toBeNull()
    expect(labels[0]).toBeNull()
  })

  it('avoids map controls and hides off-screen names', () => {
    const labels = layoutMapLabels(
      [
        { x: 160, y: 50, width: 55, height: 24 },
        { x: -10, y: 80, width: 55, height: 24 },
      ],
      { width: 240, height: 160 },
      [{ x: 180, y: 0, width: 60, height: 100 }],
    )
    expect(labels[0]!.x + 55).toBeLessThanOrEqual(176)
    expect(labels[1]).toBeNull()
  })
})
