import { defineConfig } from '@playwright/test'
import base from './playwright.mobile.config'
const externalURL = process.env.PLAYWRIGHT_BASE_URL
const port = Number(process.env.PLAYWRIGHT_PORT || 4184)
export default defineConfig({
  ...base,
  projects: [
    {
      name: 'chrome',
      use: { browserName: 'chromium', channel: process.env.CI ? undefined : 'chrome' },
    },
    { name: 'webkit', use: { browserName: 'webkit', channel: undefined } },
  ],
  testMatch: [
    'time-pillar.spec.ts',
    'modern-reading.spec.ts',
    'pillar-themes.spec.ts',
    'pillar-motion.spec.ts',
    'pillar-pan.spec.ts',
    'exploration-navigation.spec.ts',
    'color-mode.spec.ts',
    'smoke.spec.ts',
  ],
  use: { ...base.use, baseURL: externalURL || `http://127.0.0.1:${port}` },
  webServer: externalURL
    ? undefined
    : {
        command: `npm run preview -- --port ${port} --strictPort`,
        url: `http://127.0.0.1:${port}`,
        reuseExistingServer: false,
      },
})
