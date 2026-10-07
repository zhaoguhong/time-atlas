import { defineConfig } from '@playwright/test'
import base from './playwright.config'

export default defineConfig({
  ...base,
  testMatch: ['mobile-reading.spec.ts', 'mobile-sheet.spec.ts', 'smoke.spec.ts'],
  timeout: 60000,
  expect: { timeout: 15000 },
  use: { ...base.use, baseURL: 'http://127.0.0.1:4176' },
  projects: [
    { name: 'chrome', use: { browserName: 'chromium', channel: 'chrome' } },
    { name: 'webkit', use: { browserName: 'webkit', channel: undefined } },
  ],
  webServer: {
    command: 'npm run preview -- --port 4176 --strictPort',
    url: 'http://127.0.0.1:4176',
    reuseExistingServer: !process.env.CI,
  },
})
