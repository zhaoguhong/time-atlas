import fs from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = async (name) =>
  JSON.parse(await fs.readFile(path.join(root, 'public/data', name), 'utf8'))
const readArchive = async (id) =>
  fs.readFile(path.join(root, '.cache/map-archives', `${id}.geojson`))
const manifest = await read('provenance.json')
const locked = JSON.parse(await fs.readFile(path.join(root, 'data/sources.lock.json'), 'utf8'))
assert.equal(manifest.source, locked.sources[0].url)
assert.equal(manifest.sha256, locked.sources[0].sha256)
assert.equal(manifest.license, 'CC-BY-4.0')
assert.match(manifest.sha256, /^[a-f0-9]{64}$/)
let checked = 0
for (const epoch of manifest.epochs) {
  const buffer = await readArchive(epoch.id)
  const map = JSON.parse(buffer)
  assert.equal(buffer.length, epoch.bytes)
  assert.equal(map.type, 'FeatureCollection')
  assert.equal(map.features.length, epoch.records)
  for (const chunk of epoch.chunks) {
    const bytes = await fs.readFile(path.join(root, 'public/data/maps', chunk.file))
    assert.equal(bytes.length, chunk.bytes)
    assert.equal(createHash('sha256').update(bytes).digest('hex'), chunk.sha256)
    const features = JSON.parse(bytes).features
    assert.deepEqual(
      features.map((f) => f.properties.id),
      map.features
        .filter((f) => f.properties.from <= chunk.to && f.properties.to >= chunk.from)
        .map((f) => f.properties.id),
    )
  }
  for (const feature of map.features) {
    const p = feature.properties
    assert.ok(p.from <= p.to, `${p.id} has reversed dates`)
    assert.ok(p.from <= epoch.to && p.to >= epoch.from, `${p.id} is outside period`)
    assert.equal(p.source, 'cliopatria')
    assert.ok(['Polygon', 'MultiPolygon'].includes(feature.geometry.type))
    assert.match(p.color, /^#[a-f0-9]{6}$/i)
    assert.ok(p.label[0] >= -180 && p.label[0] <= 180 && Math.abs(p.label[1]) <= 85)
    checked++
  }
}
for (const source of locked.sources) {
  const rawPath = path.join(root, 'data/raw', source.filename)
  try {
    const raw = await fs.readFile(rawPath)
    assert.equal(
      createHash('sha256').update(raw).digest('hex'),
      source.sha256,
      `${source.filename} source changed`,
    )
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
}
const three = JSON.parse(await readArchive('three'))
const active = three.features.filter((f) => f.properties.from <= 230 && f.properties.to >= 230)
for (const name of ['Cao Wei', 'Shu Han', 'Eastern Wu'])
  assert.ok(
    active.some((f) => f.properties.name === name),
    `${name} missing at 230`,
  )
for (const name of ['land', 'lakes', 'rivers_lake_centerlines']) {
  const layer = await read(`${name}.geojson`)
  assert.ok(layer.features.length > 0)
}
const peopleLock = JSON.parse(
  await fs.readFile(path.join(root, 'data/people.sources.json'), 'utf8'),
)
const peopleBytes = await fs.readFile(path.join(root, 'src/data/generated/people.json'))
assert.equal(createHash('sha256').update(peopleBytes).digest('hex'), peopleLock.outputSha256)
assert.deepEqual(await read('content-provenance.json'), peopleLock)
assert.equal(peopleLock.license, 'CC0')
const people = JSON.parse(peopleBytes)
assert.equal(people.length, peopleLock.count)
assert.equal(new Set(people.map((person) => person.wikidata)).size, people.length)
for (const person of people) {
  assert.ok(
    Number.isInteger(person.revision) && person.revision > 0,
    `${person.name} missing source revision`,
  )
  assert.ok(person.sources[0].url.includes(`oldid=${person.revision}`), person.name)
}
for (const seed of peopleLock.seedFiles) {
  const bytes = await fs.readFile(path.join(root, 'data', seed.file))
  assert.equal(createHash('sha256').update(bytes).digest('hex'), seed.sha256, seed.file)
}
let verifiedSnapshots = 0
for (const request of peopleLock.requests) {
  try {
    const bytes = await fs.readFile(path.join(root, 'data/raw/people', request.file))
    assert.equal(createHash('sha256').update(bytes).digest('hex'), request.sha256, request.file)
    verifiedSnapshots++
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
}
console.log(
  `Validated ${manifest.epochs.length} period files, ${checked} feature references, 3 geographic layers, ${people.length} revision-pinned people, and ${verifiedSnapshots} raw content snapshots.`,
)
