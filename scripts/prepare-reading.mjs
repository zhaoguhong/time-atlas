import { buildReadingRoutes } from './reading-routes.mjs'
import { createHash } from 'node:crypto'
import { constants } from 'node:fs'
import {
  copyFile,
  lstat,
  mkdir,
  readFile,
  readdir,
  writeFile,
  rename,
  unlink,
} from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { createServer } from 'vite'

const root = fileURLToPath(new URL('../', import.meta.url))
const sha256 = (value) => createHash('sha256').update(value).digest('hex')
function readingId(id) {
  return /^[a-zA-Z0-9_-]+$/.test(id) ? id : `record-${sha256(id)}`
}

// Dense columns retain explicit nulls (including unknown life dates). Sparse columns
// distinguish absent properties from explicit nulls without repeating every field name.
export function compactColumns(records) {
  const fields = [...new Set(records.flatMap(Object.keys))]
  return Object.fromEntries(
    fields.map((field) => {
      const values = records.map((record) => record[field] ?? null)
      if (records.every((record) => record[field] !== undefined)) return [field, values]
      const nulls = records.flatMap((record, index) => (record[field] === null ? [index] : []))
      return [field, { values, ...(nulls.length ? { nulls } : {}) }]
    }),
  )
}

async function localDirectory(base, parts) {
  let directory = base
  for (const part of parts) {
    directory = resolve(directory, part)
    await mkdir(directory).catch((error) => {
      if (error.code !== 'EEXIST') throw error
    })
    const stat = await lstat(directory)
    if (!stat.isDirectory() || stat.isSymbolicLink()) {
      throw new Error(`Reading output must be a local directory: ${directory}`)
    }
  }
  return directory
}

export async function archiveUnusedReading(base, activePaths) {
  let archived = 0
  for (const kind of ['events', 'people']) {
    const directory = await localDirectory(base, ['public', 'data', 'reading', kind])
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const relative = `data/reading/${kind}/${entry.name}`
      if (
        !entry.isFile() ||
        !/^[a-zA-Z0-9_-]+-[a-f0-9]{16}\.json$/.test(entry.name) ||
        activePaths.has(relative)
      )
        continue
      const source = resolve(directory, entry.name)
      const bytes = await readFile(source)
      let record
      try {
        record = JSON.parse(bytes.toString('utf8'))
      } catch {
        continue
      }
      // Only move verifiably generated articles; leave unrelated or damaged files alone.
      if (
        typeof record?.id !== 'string' ||
        !Array.isArray(record.sources) ||
        entry.name !== `${readingId(record.id)}-${sha256(bytes).slice(0, 16)}.json`
      )
        continue
      const archive = await localDirectory(base, ['.cache', 'reading-archives', kind])
      const destination = resolve(archive, entry.name)
      try {
        await copyFile(source, destination, constants.COPYFILE_EXCL)
      } catch (error) {
        if (error.code !== 'EEXIST') throw error
        const stat = await lstat(destination)
        if (
          !stat.isFile() ||
          stat.isSymbolicLink() ||
          !(await readFile(destination)).equals(bytes)
        ) {
          throw new Error(`Refusing to replace an existing reading archive: ${destination}`)
        }
      }
      await unlink(source)
      archived += 1
    }
  }
  return archived
}
async function writeChanged(path, text) {
  if ((await readFile(path, 'utf8').catch(() => null)) === text) return
  await mkdir(resolve(path, '..'), { recursive: true })
  const temporary = `${path}.${process.pid}.tmp`
  await writeFile(temporary, text)
  await rename(temporary, path)
}
async function prepareReading({ catalogOnly }) {
  const server = await createServer({
    root,
    server: { middlewareMode: true, ws: false },
    optimizeDeps: { noDiscovery: true, include: [] },
    logLevel: 'error',
  })
  try {
    const { events, people } = await server.ssrLoadModule('/src/data/content.ts')
    const { dynasties } = await server.ssrLoadModule('/src/data/dynasties.ts')
    const { worldPolities } = await server.ssrLoadModule('/src/data/world-polities.ts')
    const { places } = await server.ssrLoadModule('/src/lib/exploration.ts')
    await writeChanged(
      resolve(root, 'src/data/generated/reading-routes.json'),
      JSON.stringify(buildReadingRoutes(events, people, dynasties, worldPolities, places)),
    )
    const catalog = { events: [], people: [] }
    const activePaths = new Set()
    for (const [kind, records] of Object.entries({ events, people })) {
      for (const record of records) {
        const text = JSON.stringify(record)
        const hash = sha256(text).slice(0, 16)
        // Preserve source IDs and shared URLs while publishing ASCII filenames.
        const fileId = readingId(record.id)
        const readingPath = `data/reading/${kind}/${fileId}-${hash}.json`
        if (!catalogOnly) {
          await writeChanged(resolve(root, 'public', readingPath), text)
          activePaths.add(readingPath)
        }
        const index = { ...record, readingHash: hash }
        delete index.sources
        if (fileId !== record.id) index.readingId = fileId
        if (kind === 'events') {
          delete index.background
          delete index.impact
          delete index.details
          delete index.narrative
        } else {
          index.biographyLength = record.biography.length
          delete index.biography
        }
        catalog[kind].push(index)
      }
    }
    await writeChanged(
      resolve(root, 'src/data/generated/reading-sources.json'),
      JSON.stringify(Object.fromEntries(events.map((event) => [event.id, event.sources]))),
    )
    await writeChanged(
      resolve(root, 'src/data/generated/reading-catalog.json'),
      JSON.stringify({
        events: compactColumns(catalog.events),
        people: compactColumns(catalog.people),
      }),
    )
    // Resolve authoring-time merges once. Browsers need current essays and navigation,
    // not every superseded draft and its construction functions.
    const { readingArticles, articleGuides, articleTourCatalog } =
      await server.ssrLoadModule('/src/data/articles.ts')
    const { topicTours } = await server.ssrLoadModule('/src/data/topics.ts')
    const guides = articleGuides.map(
      ({ article, introduction, conclusion, sources, ...guide }) => guide,
    )
    let articleJson = JSON.stringify({
      readingArticles,
      articleGuides: guides,
      legacyTours: articleTourCatalog
        .filter((t) => !guides.some((g) => g.id === t.id))
        .map(({ id, name, steps }) => ({ id, name, steps })),
      legacyTourSteps: topicTours.map(({ id, steps }) => ({ id, steps })),
    })
    for (const asset of new Set(
      [...articleJson.matchAll(/"(\/src\/assets\/[^"?]+\.svg)"/g)].map((m) => m[1]),
    )) {
      const svg = await readFile(resolve(root, asset.slice(1)), 'utf8')
      articleJson = articleJson.replaceAll(
        JSON.stringify(asset),
        JSON.stringify(`data:image/svg+xml,${encodeURIComponent(svg)}`),
      )
    }
    await writeChanged(resolve(root, 'src/data/generated/article-runtime.json'), articleJson)
    // Publish both indexes only after all active articles exist, then retain obsolete
    // versions outside public so incremental builds cannot distribute old prose.
    if (catalogOnly) {
      console.log(`Reading catalog ready: ${events.length} events and ${people.length} people.`)
      return
    }
    const archived = await archiveUnusedReading(root, activePaths)
    console.log(
      `Reading ready: ${events.length} events and ${people.length} people; ${archived} previous articles archived.`,
    )
  } finally {
    await server.close()
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await prepareReading({ catalogOnly: process.argv.includes('--catalog-only') })
}
