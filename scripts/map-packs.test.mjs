import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import {
  decodePack,
  encodePack,
  outputPath,
  packGroups,
  prepareMaps,
  sha256,
} from './map-packs.mjs'

async function fixture(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'time-atlas-maps-'))
  t.after(() => fs.rm(root, { recursive: true, force: true }))
  await fs.mkdir(path.join(root, 'public/data'), { recursive: true })
  await fs.mkdir(path.join(root, 'data/map-packs'), { recursive: true })
  const provenance = { epochs: [{ id: 'three', chunks: [{ file: 'three/0.geojson' }] }] }
  const bytes = Buffer.from(JSON.stringify(provenance))
  await fs.writeFile(path.join(root, 'public/data/provenance.json'), bytes)
  const manifest = { version: 1, provenanceSha256: sha256(bytes), packs: [] }
  for (const group of packGroups(provenance)) {
    const { packed, metadata } = encodePack(
      group.paths.map((name) => [name, '{"value":1.000,"name":"山河","zero":-0.0}\n']),
    )
    await fs.writeFile(path.join(root, 'data/map-packs', group.file), packed)
    manifest.packs.push({ file: group.file, ...metadata })
  }
  const save = () =>
    fs.writeFile(path.join(root, 'data/map-packs/manifest.json'), JSON.stringify(manifest))
  await save()
  return { root, manifest, save }
}

test('round-trips exact bytes, including number spelling, whitespace and Unicode', () => {
  const files = [['maps/three.geojson', ' {"name":"山河","n":1.000,"zero":-0.0}\r\n']]
  const encoded = encodePack(files)
  assert.deepEqual(decodePack(encoded.packed, encoded.metadata), files)
  assert.deepEqual(encodePack(files), encoded)
})

test('cold restore, warm verification and repair preserve archive/public separation', async (t) => {
  const { root } = await fixture(t)
  assert.deepEqual(await prepareMaps(root), { verified: 5, restored: 5 })
  const archive = outputPath(root, 'maps/three.geojson')
  const before = await fs.stat(archive)
  assert.deepEqual(await prepareMaps(root), { verified: 5, restored: 0 })
  assert.equal((await fs.stat(archive)).mtimeMs, before.mtimeMs)
  await assert.rejects(fs.access(path.join(root, 'public/data/maps/three.geojson')))
  const slice = outputPath(root, 'maps/three/0.geojson')
  const original = await fs.readFile(slice)
  await fs.writeFile(slice, 'damaged')
  assert.deepEqual(await prepareMaps(root), { verified: 5, restored: 1 })
  assert.deepEqual(await fs.readFile(slice), original)
})

test('rejects a damaged pack even when restored files are already cached', async (t) => {
  const { root } = await fixture(t)
  await prepareMaps(root)
  const file = path.join(root, 'data/map-packs/three.br')
  const bytes = await fs.readFile(file)
  bytes[0] ^= 1
  await fs.writeFile(file, bytes)
  await assert.rejects(prepareMaps(root), /checksum mismatch/)
})

test('rejects wrong per-file hashes before writing any member of that pack', async (t) => {
  const { root, manifest, save } = await fixture(t)
  manifest.packs[0].files[1].sha256 = '0'.repeat(64)
  await save()
  await assert.rejects(prepareMaps(root))
  await assert.rejects(fs.access(outputPath(root, 'maps/three.geojson')))
})

test('rejects changed provenance and paths outside the manifest allowlist', async (t) => {
  const { root, manifest, save } = await fixture(t)
  assert.throws(() => outputPath(root, '../private.txt'))
  manifest.packs[0].files[0].path = '../private.txt'
  await save()
  await assert.rejects(prepareMaps(root))
  await fs.appendFile(path.join(root, 'public/data/provenance.json'), ' ')
  await assert.rejects(prepareMaps(root), /provenance changed/)
})

test('refuses to restore through a symlink', async (t) => {
  const { root } = await fixture(t)
  await fs.mkdir(path.join(root, 'elsewhere'))
  await fs.symlink(path.join(root, 'elsewhere'), path.join(root, '.cache'), 'junction')
  await assert.rejects(prepareMaps(root), /Symlink/)
  assert.deepEqual(await fs.readdir(path.join(root, 'elsewhere')), [])
})
