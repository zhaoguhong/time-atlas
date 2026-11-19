import { defineConfig } from '@playwright/test'
const port = Number(process.env.PLAYWRIGHT_PORT || 4197)
const baseURL = `http://127.0.0.1:${port}`

export default defineConfig({
  testDir: './tests',
  testMatch: [
    'seo.spec.ts',
    'record-pages.spec.ts',
    'archive-pages.spec.ts',
    'reading-performance.spec.ts',
  ],
  workers: 1,
  use: { baseURL, trace: 'retain-on-failure' },
  webServer: {
    command: `npm run preview -- --port ${port} --strictPort`,
    url: baseURL,
    reuseExistingServer: false,
  },
})
