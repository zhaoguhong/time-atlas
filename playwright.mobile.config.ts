import { defineConfig } from '@playwright/test'
import base from './playwright.config'

const externalURL = process.env.PLAYWRIGHT_BASE_URL
const port = Number(process.env.PLAYWRIGHT_PORT || 4178)

export default defineConfig({
  ...base,
  testMatch: [
    'mobile-reading.spec.ts',
    'mobile-sheet.spec.ts',
    'mobile-landscape.spec.ts',
    'display-mode.spec.ts',
    'smoke.spec.ts',
  ],
  timeout: 60000,
  expect: { timeout: 15000 },
  use: { ...base.use, baseURL: externalURL || `http://127.0.0.1:${port}` },
  projects: [
    { name: 'chrome', use: { browserName: 'chromium', channel: 'chrome' } },
    { name: 'webkit', use: { browserName: 'webkit', channel: undefined } },
  ],
  webServer: externalURL
    ? undefined
    : {
        command: `npm run preview -- --port ${port} --strictPort`,
        url: `http://127.0.0.1:${port}`,
        reuseExistingServer: false,
      },
})
