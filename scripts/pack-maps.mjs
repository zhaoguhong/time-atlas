import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  decodePack,
  encodePack,
  outputPath,
  packGroups,
  sha256,
  writeAtomic,
} from './map-packs.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
const provenanceBytes = await fs.readFile(path.join(root, 'public/data/provenance.json'))
const provenance = JSON.parse(provenanceBytes)
const chunks = new Map(
  provenance.epochs.flatMap((epoch) => epoch.chunks.map((chunk) => [`maps/${chunk.file}`, chunk])),
)
const manifest = { version: 1, provenanceSha256: sha256(provenanceBytes), packs: [] }
for (const group of packGroups(provenance)) {
  const files = []
  for (const name of group.paths) {
    const bytes = await fs.readFile(outputPath(root, name))
    const chunk = chunks.get(name)
    if (chunk) {
      assert.equal(bytes.length, chunk.bytes, name)
      assert.equal(sha256(bytes), chunk.sha256, name)
    }
    const text = bytes.toString('utf8')
    assert.ok(Buffer.from(text).equals(bytes), `${name}: not losslessly representable as UTF-8`)
    files.push([name, text])
  }
  const { packed, metadata } = encodePack(files)
  assert.deepEqual(decodePack(packed, metadata), files, `${group.file}: round-trip mismatch`)
  await writeAtomic(path.join(root, 'data/map-packs', group.file), packed)
  manifest.packs.push({ file: group.file, ...metadata })
}
await writeAtomic(
  path.join(root, 'data/map-packs/manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n',
)
console.log(
  `Packed ${manifest.packs.length} lossless map archives (${manifest.packs.reduce((n, p) => n + p.bytes, 0)} bytes).`,
)
