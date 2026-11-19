import { constants, cpSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function copyPublicAssets(): Plugin {
  let publicDir: string
  return {
    name: 'time-atlas-public-assets',
    apply: 'build',
    configResolved(config) {
      publicDir = config.publicDir
    },
    writeBundle({ dir }) {
      if (!dir || !publicDir || !existsSync(publicDir)) return
      // Production reads records from their generated HTML pages.
      const developmentRecords = resolve(publicDir, 'data/reading')
      cpSync(publicDir, dir, {
        recursive: true,
        // Share physical blocks where supported, while keeping separate files.
        mode: constants.COPYFILE_FICLONE,
        force: false,
        filter: (file) => file !== developmentRecords,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), copyPublicAssets()],
  worker: { format: 'es' },
  build: { target: 'es2022', chunkSizeWarningLimit: 900, copyPublicDir: false },
})
