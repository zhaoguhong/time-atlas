import { defineConfig } from '@playwright/test'
import base from './playwright.pillar.config'

export default defineConfig({
  ...base,
  testMatch: ['world-history.spec.ts'],
})
