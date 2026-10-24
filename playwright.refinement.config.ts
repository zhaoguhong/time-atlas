import { defineConfig } from '@playwright/test'
import base from './playwright.pillar.config'
export default defineConfig({ ...base, testMatch: ['product-refinement.spec.ts'] })
