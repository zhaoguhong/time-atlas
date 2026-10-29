import assert from 'node:assert/strict'
import { readFile, writeFile } from 'node:fs/promises'
import { format } from 'prettier'

const args = process.argv.slice(2)
assert(
  args.every((arg) => arg === '--write'),
  'Only --write is supported',
)
const coverage = JSON.parse(await readFile('public/data/coverage.json', 'utf8'))
const path = 'README.md'
const readme = await readFile(path, 'utf8')
const block = /<!-- coverage:start -->[\s\S]*?<!-- coverage:end -->/
assert(block.test(readme), 'README coverage markers are missing')
const section = `<!-- coverage:start -->

| 内容 | 当前收录 |
| --- | --- |
| 历史事件 | ${coverage.events.total} 个，其中中国之外的事件 ${coverage.events.world} 个 |
| 人物 | ${coverage.people.total} 位，其中 ${coverage.people.curatedIntroductions} 份有编辑介绍、${coverage.people.basicRecords} 份为基础身份记录 |
| 朝代与政权档案 | 中国 ${coverage.dynasties.total} 个、世界 ${coverage.worldPolities.total} 个 |
| 历史专题 | ${coverage.topics.total} 个，共 ${coverage.topics.chapters} 章 |
| 已核对活动年谱 | ${coverage.journeys.people} 位人物，共 ${coverage.journeys.nodes} 条活动记录 |

统计依据为 ${coverage.generatedAt.slice(0, 10)} 生成的[覆盖清单](public/data/coverage.json)。基础身份记录不等同于完整传记，活动年谱动画只表达记录先后，不推断真实道路。内容仍在持续补充，并非完整的世界通史。

<!-- coverage:end -->`
const formatted = (await format(section, { parser: 'markdown' })).trim()
const next = readme.replace(block, formatted)
if (args.includes('--write')) {
  if (next !== readme) await writeFile(path, next)
  console.log('README coverage synchronized.')
} else {
  assert.equal(
    next,
    readme,
    'README coverage is stale. Run npm run data:docs after updating coverage.',
  )
  console.log('README coverage matches coverage.json.')
}
