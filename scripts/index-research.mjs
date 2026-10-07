import { createServer } from 'vite'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
const server = await createServer({
  configFile: false,
  logLevel: 'error',
  server: { middlewareMode: true },
  appType: 'custom',
})
try {
  const { people, events } = await server.ssrLoadModule('/src/data/content.ts')
  const { dynasties } = await server.ssrLoadModule('/src/data/dynasties.ts')
  const { journeys } = await server.ssrLoadModule('/src/data/journeys.ts')
  const { topicTours } = await server.ssrLoadModule('/src/data/topics.ts')
  const sources = new Map()
  for (const [kind, records] of [
    ['event', events],
    ['person', people],
    ['dynasty', dynasties],
    ['journey', journeys.flatMap((j) => j.nodes)],
    ['topic', topicTours],
  ]) {
    for (const record of records)
      for (const source of record.sources) {
        const entry = sources.get(source.url) ?? { ...source, references: [] }
        entry.references.push({ kind, id: record.id })
        sources.set(source.url, entry)
      }
  }
  await mkdir('data/research', { recursive: true })
  const generatedAt = new Date().toISOString()
  const entries = [...sources.values()].sort((a, b) => a.url.localeCompare(b.url))
  await writeFile(
    'data/research/source-inventory.json',
    JSON.stringify({ generatedAt, sources: entries }, null, 2) + '\n',
  )
  // Wikidata/Wikipedia identity requests already have revision-pinned snapshots
  // in the importer manifest. Collect original reference pages separately.
  const primary = entries.filter((s) => !/wikipedia\.org|wikidata\.org/.test(s.url))
  await writeFile(
    'data/research/references.json',
    JSON.stringify({ generatedAt, sources: primary }, null, 2) + '\n',
  )
  const downloaded = JSON.parse(await readFile('data/research/fetches.json', 'utf8'))
  const imported = JSON.parse(await readFile('data/people.sources.json', 'utf8'))
  const currentURLs = new Set(primary.map((s) => s.url))
  const retained = downloaded.sources.filter((s) => currentURLs.has(s.url))
  const publicIndex = {
    generatedAt,
    totalSourceLinks: entries.length,
    referenceDocuments: primary.length,
    successfulSnapshots: retained.filter((s) => s.sha256).length,
    unavailable: retained
      .filter((s) => s.error)
      .map((s) => ({ url: s.url, attemptedAt: s.attemptedAt, error: s.error })),
    sources: retained.map(
      ({ url, title, retrievedAt, lastCacheCheckAt, sha256, revisionId, error, attemptedAt }) => ({
        url,
        title,
        retrievedAt,
        lastCacheCheckAt,
        sha256,
        revisionId,
        error,
        attemptedAt,
      }),
    ),
    identitySnapshot: {
      manifest: 'content-provenance.json',
      count: imported.count,
      generatedAt: imported.generatedAt,
    },
    notes: [
      '抓取成功只说明已保存来源，不等于所有史实已经专家审定。',
      '原始网页/PDF与检索结果保留在本地 data/raw/、data/research/；网站仅提供整理稿与来源索引。',
    ],
  }
  await writeFile('public/data/research-index.json', JSON.stringify(publicIndex, null, 2) + '\n')
  console.log(
    `Indexed ${entries.length} unique source links; ${primary.length} reference documents.`,
  )
} finally {
  await server.close()
}
