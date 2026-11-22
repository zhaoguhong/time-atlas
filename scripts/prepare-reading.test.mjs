import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { archiveUnusedReading, compactColumns } from './prepare-reading.mjs'

async function fixture(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'time-atlas-reading-'))
  t.after(() => fs.rm(root, { recursive: true, force: true }))
  await fs.mkdir(path.join(root, 'public/data/reading/events'), { recursive: true })
  await fs.mkdir(path.join(root, 'public/data/reading/people'), { recursive: true })
  const article = async (id, summary) => {
    const text = JSON.stringify({
      id,
      summary,
      sources: [{ title: 'Source', url: 'https://example.org' }],
    })
    const hash = createHash('sha256').update(text).digest('hex').slice(0, 16)
    const relative = `data/reading/events/${id}-${hash}.json`
    const file = path.join(root, 'public', relative)
    await fs.writeFile(file, text)
    return { relative, file, text, name: path.basename(file) }
  }
  return { root, article }
}

test('compact columns distinguish absent values, explicit nulls, empty lists and unknown dates', () => {
  const rows = [
    { id: 'a', birth: null, aliases: [], revision: null },
    { id: 'b', birth: 100, aliases: ['B'] },
    { id: 'c', birth: null, revision: 2 },
  ]
  const columns = JSON.parse(JSON.stringify(compactColumns(rows)))
  assert.deepEqual(columns.birth, [null, 100, null])
  assert.deepEqual(columns.aliases, { values: [[], ['B'], null] })
  assert.deepEqual(columns.revision, { values: [null, null, 2], nulls: [0] })
})

test('archives only unused verified generated articles and preserves their exact bytes', async (t) => {
  const { root, article } = await fixture(t)
  const old = await article('event', 'Previous version')
  const current = await article('event', 'Current version')
  const directory = path.dirname(old.file)
  const unrelated = path.join(directory, 'notes.json')
  const damaged = path.join(directory, 'damaged-0123456789abcdef.json')
  const outside = path.join(root, 'private.json')
  await fs.writeFile(unrelated, 'Keep this local file')
  await fs.writeFile(damaged, '{"id":"damaged","sources":[]}')
  await fs.writeFile(outside, old.text)
  await fs.symlink(outside, path.join(directory, 'link-0123456789abcdef.json'))
  const active = new Set([current.relative])
  assert.equal(await archiveUnusedReading(root, active), 1)
  assert.equal(await fs.readFile(current.file, 'utf8'), current.text)
  assert.equal(
    await fs.readFile(path.join(root, '.cache/reading-archives/events', old.name), 'utf8'),
    old.text,
  )
  await assert.rejects(fs.access(old.file))
  assert.equal(await fs.readFile(unrelated, 'utf8'), 'Keep this local file')
  assert.equal(await fs.readFile(damaged, 'utf8'), '{"id":"damaged","sources":[]}')
  assert.equal(await fs.readFile(outside, 'utf8'), old.text)
  assert.equal(await archiveUnusedReading(root, active), 0)
})

test('does not follow an archive directory symlink or move the original article', async (t) => {
  const { root, article } = await fixture(t)
  const old = await article('event', 'Previous version')
  const outside = path.join(root, 'elsewhere')
  await fs.mkdir(outside)
  await fs.symlink(outside, path.join(root, '.cache'), 'junction')
  await assert.rejects(archiveUnusedReading(root, new Set()), /local directory/)
  assert.equal(await fs.readFile(old.file, 'utf8'), old.text)
  assert.deepEqual(await fs.readdir(outside), [])
})

test('refuses to replace conflicting archives and preserves the public file', async (t) => {
  const { root, article } = await fixture(t)
  const old = await article('event', 'Previous version')
  const archive = path.join(root, '.cache/reading-archives/events')
  await fs.mkdir(archive, { recursive: true })
  const destination = path.join(archive, old.name)
  await fs.writeFile(destination, 'Existing evidence')
  await assert.rejects(archiveUnusedReading(root, new Set()), /Refusing to replace/)
  assert.equal(await fs.readFile(old.file, 'utf8'), old.text)
  assert.equal(await fs.readFile(destination, 'utf8'), 'Existing evidence')
})
