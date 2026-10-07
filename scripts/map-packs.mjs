import assert from 'node:assert/strict'
import { createHash, randomUUID } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { brotliCompressSync, brotliDecompressSync, constants } from 'node:zlib'

export const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex')

// Paths inside packs describe the original public files. Full-period archives
// are restored outside public/ because the browser only requests time slices.
export function outputPath(root, name) {
  assert.match(name, /^(?:maps\/[a-z-]+(?:\/\d+)?|land|lakes|rivers_lake_centerlines)\.geojson$/)
  return /^maps\/[^/]+\.geojson$/.test(name)
    ? path.join(root, '.cache/map-archives', path.basename(name))
    : path.join(root, 'public/data', name)
}

export function packGroups(provenance) {
  const ids = new Set()
  for (const epoch of provenance.epochs) {
    assert.match(epoch.id, /^[a-z-]+$/)
    assert.ok(!ids.has(epoch.id), 'Duplicate map epoch')
    ids.add(epoch.id)
    const files = new Set()
    for (const chunk of epoch.chunks) {
      assert.match(chunk.file, new RegExp(`^${epoch.id}/[0-9]+\\.geojson$`))
      assert.ok(!files.has(chunk.file), 'Duplicate map slice')
      files.add(chunk.file)
    }
  }
  return [
    ...provenance.epochs.map((epoch) => ({
      file: `${epoch.id}.br`,
      paths: [`maps/${epoch.id}.geojson`, ...epoch.chunks.map((chunk) => `maps/${chunk.file}`)],
    })),
    {
      file: 'geography.br',
      paths: ['land.geojson', 'lakes.geojson', 'rivers_lake_centerlines.geojson'],
    },
  ]
}

export function encodePack(files) {
  const bytes = Buffer.from(JSON.stringify({ version: 1, files }))
  const packed = brotliCompressSync(bytes, {
    params: {
      [constants.BROTLI_PARAM_QUALITY]: 9,
      [constants.BROTLI_PARAM_SIZE_HINT]: bytes.length,
    },
  })
  return {
    packed,
    metadata: {
      bytes: packed.length,
      sha256: sha256(packed),
      unpackedBytes: bytes.length,
      files: files.map(([name, text]) => ({
        path: name,
        bytes: Buffer.byteLength(text),
        sha256: sha256(Buffer.from(text)),
      })),
    },
  }
}

export function decodePack(packed, metadata) {
  assert.equal(packed.length, metadata.bytes, 'Map pack size mismatch')
  assert.equal(sha256(packed), metadata.sha256, 'Map pack checksum mismatch')
  const bytes = brotliDecompressSync(packed, { maxOutputLength: metadata.unpackedBytes })
  assert.equal(bytes.length, metadata.unpackedBytes, 'Decoded map pack size mismatch')
  const result = JSON.parse(bytes)
  assert.equal(result.version, 1, 'Unsupported map pack version')
  assert.deepEqual(
    result.files.map(([name]) => name),
    metadata.files.map((file) => file.path),
  )
  for (const [index, [name, text]] of result.files.entries()) {
    assert.equal(typeof text, 'string')
    assert.equal(Buffer.byteLength(text), metadata.files[index].bytes, name)
    assert.equal(sha256(Buffer.from(text)), metadata.files[index].sha256, name)
  }
  return result.files
}

async function assertSafeOutput(root, target) {
  const relative = path.relative(root, target)
  assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative))
  let current = root
  for (const part of relative.split(path.sep)) {
    current = path.join(current, part)
    try {
      assert.ok(!(await fs.lstat(current)).isSymbolicLink(), `Symlink in map output: ${relative}`)
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
    }
  }
}

export async function writeAtomic(target, bytes) {
  await fs.mkdir(path.dirname(target), { recursive: true })
  const temporary = `${target}.${randomUUID()}.tmp`
  try {
    await fs.writeFile(temporary, bytes, { flag: 'wx' })
    await fs.rename(temporary, target)
  } finally {
    await fs.rm(temporary, { force: true })
  }
}

export async function prepareMaps(root) {
  const provenanceBytes = await fs.readFile(path.join(root, 'public/data/provenance.json'))
  const groups = packGroups(JSON.parse(provenanceBytes))
  const directory = path.join(root, 'data/map-packs')
  const manifest = JSON.parse(await fs.readFile(path.join(directory, 'manifest.json')))
  assert.equal(manifest.version, 1, 'Unsupported map pack manifest')
  assert.equal(
    manifest.provenanceSha256,
    sha256(provenanceBytes),
    'Map provenance changed; repack maps',
  )
  assert.deepEqual(
    manifest.packs.map((pack) => pack.file),
    groups.map((group) => group.file),
  )
  let restored = 0
  let verified = 0
  for (const [index, metadata] of manifest.packs.entries()) {
    assert.deepEqual(
      metadata.files.map((file) => file.path),
      groups[index].paths,
    )
    const packed = await fs.readFile(path.join(directory, metadata.file))
    assert.equal(packed.length, metadata.bytes, metadata.file)
    assert.equal(sha256(packed), metadata.sha256, `${metadata.file}: checksum mismatch`)
    const missing = new Set()
    for (const file of metadata.files) {
      const target = outputPath(root, file.path)
      await assertSafeOutput(root, target)
      try {
        const bytes = await fs.readFile(target)
        if (bytes.length !== file.bytes || sha256(bytes) !== file.sha256) missing.add(file.path)
      } catch (error) {
        if (error.code !== 'ENOENT') throw error
        missing.add(file.path)
      }
      verified++
    }
    if (!missing.size) continue
    // Verify the entire pack before writing any member. Existing valid files
    // retain their mtimes, so normal startup doesn't trigger needless rebuilds.
    for (const [name, text] of decodePack(packed, metadata)) {
      if (!missing.has(name)) continue
      await writeAtomic(outputPath(root, name), text)
      restored++
    }
  }
  return { verified, restored }
}
