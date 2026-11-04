import { defineConfig } from '@playwright/test'
import base from './playwright.pillar.config'
export default defineConfig({
  ...base,
  testMatch: [
    'product-refinement.spec.ts',
    'event-reading.spec.ts',
    'content-completeness.spec.ts',
    'scale-expansion.spec.ts',
    'source-transparency.spec.ts',
    'search-discovery.spec.ts',
    'reading-reliability.spec.ts',
    'connected-reading.spec.ts',
  ],
})
