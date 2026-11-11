import { defineConfig } from '@playwright/test'
import base from './playwright.pillar.config'

export default defineConfig({
  ...base,
  testMatch: [
    'journey-refresh.spec.ts',
    'atlas.spec.ts',
    'usability.spec.ts',
    'content-completeness.spec.ts',
    'scale-expansion.spec.ts',
    'smoke.spec.ts',
  ],
})
