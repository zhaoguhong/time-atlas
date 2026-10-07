import { defineConfig } from '@playwright/test'
import base from './playwright.config'

export default defineConfig(base, {
  testMatch: 'smoke.spec.ts',
  timeout: 60000,
  expect: { timeout: 45000 },
  use: { ...base.use, baseURL: 'http://127.0.0.1:4175' },
  webServer: {
    command: 'npm run preview -- --port 4175 --strictPort',
    url: 'http://127.0.0.1:4175',
    reuseExistingServer: !process.env.CI,
  },
})
