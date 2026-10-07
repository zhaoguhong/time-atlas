import { fileURLToPath } from 'node:url'
import { prepareMaps } from './map-packs.mjs'

const start = performance.now()
const result = await prepareMaps(fileURLToPath(new URL('../', import.meta.url)))
console.log(
  `Maps ready: ${result.verified} files checked, ${result.restored} restored in ${Math.round(performance.now() - start)} ms.`,
)
