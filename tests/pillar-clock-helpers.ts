import type { Page } from '@playwright/test'

/** Install before navigation, then pause after the initial layout is ready. */
export async function installPillarClock(page: Page) {
  await page.clock.install({ time: new Date('2026-01-01T00:00:00Z') })
  // install() and runFor() alone leave real time running between commands.
  // Pause before starting an interaction so runner latency cannot consume its
  // animation/dwell budget. The future anchor lets initial loading run normally.
  return () => page.clock.pauseAt(new Date('2026-01-01T01:00:00Z'))
}
