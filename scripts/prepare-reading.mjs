import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile, rename } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { createServer } from 'vite'

const root = fileURLToPath(new URL('../', import.meta.url))
const server = await createServer({
  root,
  server: { middlewareMode: true, ws: false },
  optimizeDeps: { noDiscovery: true, include: [] },
  logLevel: 'error',
})
async function writeChanged(path, text) {
  if ((await readFile(path, 'utf8').catch(() => null)) === text) return
  await mkdir(resolve(path, '..'), { recursive: true })
  const temporary = `${path}.${process.pid}.tmp`
  await writeFile(temporary, text)
  await rename(temporary, path)
}
try {
  const { events, people } = await server.ssrLoadModule('/src/data/content.ts')
  const catalog = { events: [], people: [] }
  for (const [kind, records] of Object.entries({ events, people })) {
    for (const record of records) {
      const text = JSON.stringify(record)
      const hash = createHash('sha256').update(text).digest('hex').slice(0, 16)
      // Some source IDs contain Chinese names. Keep those IDs in the record,
      // while publishing filenames compatible with the deployment allowlist.
      const fileId = /^[a-zA-Z0-9_-]+$/.test(record.id)
        ? record.id
        : `record-${createHash('sha256').update(record.id).digest('hex')}`
      const readingPath = `data/reading/${kind}/${fileId}-${hash}.json`
      await writeChanged(resolve(root, 'public', readingPath), text)
      const index = { ...record, sources: [], readingPath }
      if (kind === 'events') {
        index.background = ''
        index.impact = ''
        delete index.details
      } else {
        index.biographyLength = record.biography.length
        index.biography = record.summary
      }
      catalog[kind].push(index)
    }
  }
  await writeChanged(
    resolve(root, 'src/data/generated/reading-catalog.json'),
    JSON.stringify(catalog),
  )
  console.log(
    `Reading ready: ${events.length} events and ${people.length} people; original records preserved.`,
  )
} finally {
  await server.close()
}
