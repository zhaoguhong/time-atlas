import { defineConfig } from '@playwright/test'
import base from './playwright.pillar.config'

export default defineConfig({ ...base, testMatch: 'pillar-pan.spec.ts' })
