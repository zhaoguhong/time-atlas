import { constants, cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function copyPublicAssets(territoryOnly: boolean): Plugin {
  let publicDir: string
  let root: string
  return {
    name: 'time-atlas-public-assets',
    apply: 'build',
    configResolved(config) {
      publicDir = config.publicDir
      root = config.root
    },
    writeBundle({ dir }) {
      if (!dir || !publicDir || !existsSync(publicDir)) return
      // Production reads records from their generated HTML pages.
      const developmentRecords = resolve(publicDir, 'data/reading')
      const previewLand = resolve(publicDir, 'data/modern-island-land.geojson')
      cpSync(publicDir, dir, {
        recursive: true,
        // Share physical blocks where supported, while keeping separate files.
        mode: constants.COPYFILE_FICLONE,
        force: false,
        filter: (file) => file !== developmentRecords && (!territoryOnly || file !== previewLand),
      })
      if (territoryOnly) {
        const provenancePath = resolve(dir, 'data/provenance.json')
        const provenance = JSON.parse(readFileSync(provenancePath, 'utf8'))
        delete provenance.modernIslandLand
        writeFileSync(provenancePath, JSON.stringify(provenance, null, 2) + '\n')

        const coveragePath = resolve(dir, 'data/coverage.json')
        const coverage = JSON.parse(readFileSync(coveragePath, 'utf8'))
        const catalogPath = resolve(root, 'src/data/generated/reading-catalog.json')
        const { people } = JSON.parse(readFileSync(catalogPath, 'utf8'))
        const { from, to } = coverage.territoryRange
        coverage.mapRange = coverage.territoryRange
        coverage.people.outsideMapRange = people.birth.filter(
          (birth: number | null, index: number) =>
            (people.death[index] !== null && people.death[index] < from) ||
            (birth !== null && birth > to),
        ).length
        writeFileSync(coveragePath, JSON.stringify(coverage, null, 2) + '\n')
      }
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), copyPublicAssets(mode === 'public')],
  worker: { format: 'es' },
  build: { target: 'es2022', chunkSizeWarningLimit: 900, copyPublicDir: false },
}))
