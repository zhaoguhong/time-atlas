import { defineConfig } from '@playwright/test'
import base from './playwright.pillar.config'
export default defineConfig({
  ...base,
  testMatch: [
    'product-refinement.spec.ts',
    'topic-articles.spec.ts',
    'topic-routes.spec.ts',
    'journey-refresh.spec.ts',
    'event-reading.spec.ts',
    'content-completeness.spec.ts',
    'scale-expansion.spec.ts',
    'source-transparency.spec.ts',
    'search-discovery.spec.ts',
    'reading-reliability.spec.ts',
    'connected-reading.spec.ts',
  ],
})
