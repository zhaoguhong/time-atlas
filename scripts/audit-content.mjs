import { createServer } from 'vite'
import { writeFile, readFile, mkdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import assert from 'node:assert/strict'
const args = new Set(process.argv.slice(2))
for (const arg of args)
  assert(['--metadata-only', '--check'].includes(arg), `Unknown option: ${arg}`)
const metadataOnly = args.has('--metadata-only')
const checkOnly = args.has('--check')
let missingSnapshots = 0
const verifySnapshot = async (file, expectedHash) => {
  assert.equal(typeof file, 'string', 'Missing snapshot path')
  assert.match(expectedHash, /^[a-f0-9]{64}$/, `Invalid snapshot hash: ${file}`)
  let bytes
  try {
    bytes = await readFile(file)
  } catch (error) {
    if (!metadataOnly || error.code !== 'ENOENT') throw error
    missingSnapshots++
    return false
  }
  assert.equal(
    createHash('sha256').update(bytes).digest('hex'),
    expectedHash,
    `Changed source cache: ${file}`,
  )
  return true
}
const server = await createServer({
  configFile: false,
  logLevel: 'error',
  server: { middlewareMode: true },
  appType: 'custom',
})
try {
  const { events, people, personById } = await server.ssrLoadModule('/src/data/content.ts')
  const { dynasties } = await server.ssrLoadModule('/src/data/dynasties.ts')
  const { journeys } = await server.ssrLoadModule('/src/data/journeys.ts')
  const { periods, tours } = await server.ssrLoadModule('/src/data/periods.ts')
  const snapshot = JSON.parse(await readFile('data/people.sources.json', 'utf8'))
  const generatedAt = new Date().toISOString()
  const validYear = (year) => Number.isInteger(year) && year !== 0
  const validateSources = (record) => {
    assert(record.sources.length, `No sources: ${record.id}`)
    for (const source of record.sources) {
      assert(source.title.trim(), `Untitled source: ${record.id}`)
      assert.equal(new URL(source.url).protocol, 'https:', record.id)
    }
  }
  assert.equal(new Set(people.map((p) => p.id)).size, people.length)
  assert.equal(new Set(events.map((e) => e.id)).size, events.length)
  assert.equal(new Set(dynasties.map((d) => d.id)).size, dynasties.length)
  const posthumousRelations = []
  for (const person of people) {
    assert(person.name && person.role && person.summary && person.biography, person.id)
    validateSources(person)
    for (const date of [person.birth, person.death])
      assert(date === null || validYear(date), `Invalid person date: ${person.id}`)
    if (person.birth !== null && person.death !== null)
      assert(person.birth <= person.death, `Reversed lifespan: ${person.id}`)
  }
  for (const event of events) {
    assert(event.summary && event.background && event.impact && event.sources.length, event.id)
    validateSources(event)
    assert(validYear(event.year) && event.year >= -10000 && event.year <= 1912, event.id)
    if (event.endYear !== undefined)
      assert(
        validYear(event.endYear) &&
          event.endYear >= event.year &&
          event.dateLabel &&
          event.dateNote,
        event.id,
      )
    assert(event.location && event.coordinates.length === 2, event.id)
    assert(event.coordinates.every(Number.isFinite), event.id)
    assert(Math.abs(event.coordinates[0]) <= 180 && Math.abs(event.coordinates[1]) <= 90, event.id)
    assert.equal(new Set(event.people).size, event.people.length, `Duplicate people: ${event.id}`)
    for (const id of Object.keys(event.peopleNotes ?? {}))
      assert(event.people.includes(id), `Orphan relation note: ${event.id} → ${id}`)
    for (const id of event.people) {
      assert(personById.has(id), `${event.id} → ${id}`)
      const person = personById.get(id)
      if (person.birth !== null)
        assert(event.year >= person.birth, `Event before birth: ${event.id} → ${person.name}`)
      if (person.death !== null && event.year > person.death) {
        assert(event.peopleNotes?.[id], `Unexplained posthumous link: ${event.id} → ${person.name}`)
        posthumousRelations.push({
          person: person.name,
          personId: id,
          event: event.title,
          eventId: event.id,
          eventYear: event.year,
          deathYear: person.death,
          explanation: event.peopleNotes[id],
        })
      }
    }
  }
  for (const dynasty of dynasties) {
    assert(dynasty.summary && dynasty.context && dynasty.capital, dynasty.id)
    assert(
      validYear(dynasty.from) && validYear(dynasty.to) && dynasty.from <= dynasty.to,
      dynasty.id,
    )
    validateSources(dynasty)
    assert(dynasty.sections?.length >= 2, `Missing dynasty reading: ${dynasty.id}`)
  }
  for (const tour of tours) {
    validateSources(tour)
    assert(
      tour.introduction?.length >= 3 && tour.conclusion && tour.question,
      `Incomplete topic introduction: ${tour.id}`,
    )
    assert.equal(tour.chapters.length, tour.steps.length, tour.id)
    tour.chapters.forEach((chapter, index) => {
      const event = events.find((event) => event.id === chapter.eventId)
      assert(
        event && chapter.eventId === tour.steps[index] && chapter.explanation && chapter.mapReading,
        `Missing topic evidence or map instruction: ${tour.id}/${index}`,
      )
      if (index)
        assert(
          event.year >= events.find((event) => event.id === tour.steps[index - 1]).year,
          `Nonchronological topic: ${tour.id}`,
        )
    })
  }
  for (const journey of journeys) {
    assert(
      personById.has(journey.personId) && journey.introduction && journey.nodes.length,
      journey.personId,
    )
    assert.equal(
      new Set(journey.nodes.map((node) => node.id)).size,
      journey.nodes.length,
      journey.personId,
    )
    journey.nodes.forEach((node, index) => {
      assert(validYear(node.year) && node.location && node.summary && node.locationNote, node.id)
      assert(node.coordinates.every(Number.isFinite), node.id)
      assert(
        !index || node.year >= journey.nodes[index - 1].year,
        `Out-of-order journey: ${node.id}`,
      )
      validateSources(node)
    })
  }
  const expected = [
    '孔子',
    '孟子',
    '墨子',
    '屈原',
    '秦始皇',
    '刘邦',
    '汉武帝',
    '张骞',
    '司马迁',
    '曹操',
    '刘备',
    '孙权',
    '诸葛亮',
    '王羲之',
    '陶渊明',
    '祖冲之',
    '杨坚',
    '杨广',
    '李世民',
    '武则天',
    '玄奘',
    '李白',
    '杜甫',
    '韩愈',
    '赵匡胤',
    '包拯',
    '范仲淹',
    '苏轼',
    '王安石',
    '司马光',
    '李清照',
    '岳飞',
    '辛弃疾',
    '朱熹',
    '成吉思汗',
    '忽必烈',
    '朱元璋',
    '朱棣',
    '郑和',
    '王守仁',
    '戚继光',
    '李时珍',
    '徐霞客',
    '张居正',
    '郑成功',
    '康熙帝',
    '雍正帝',
    '乾隆帝',
    '曹雪芹',
    '林则徐',
    '洪秀全',
    '曾国藩',
    '李鸿章',
    '孙中山',
  ]
  for (const name of expected)
    assert(
      people.some((p) => p.name === name || p.aliases?.includes(name)),
      `Missing major person: ${name}`,
    )
  const personRecords = people.map((person) => {
    const related = events.filter((event) => event.people.includes(person.id))
    const outsideMap =
      (person.death !== null && person.death < -10000) ||
      (person.birth !== null && person.birth > 1912)
    return {
      id: person.id,
      name: person.name,
      recordKind: person.recordKind,
      birth: person.birth,
      death: person.death,
      sourceCount: person.sources.length,
      biographyCharacters: person.biography.length,
      eventCount: related.length,
      eventIds: related.map((event) => event.id),
      journeyNodes: journeys.find((journey) => journey.personId === person.id)?.nodes.length ?? 0,
      coverage: outsideMap
        ? 'outside-map-range'
        : !related.length
          ? 'no-linked-events'
          : related.length === 1
            ? 'one-linked-event'
            : 'multiple-linked-events',
    }
  })
  const fetches = JSON.parse(await readFile('data/research/fetches.json', 'utf8'))
  const references = JSON.parse(await readFile('data/research/references.json', 'utf8'))
  const sourceRecords = []
  for (const source of references.sources) {
    const retained = fetches.sources.find((entry) => entry.url === source.url)
    assert(retained, `Unrecorded reference request: ${source.url}`)
    let verified = true
    if (retained.sha256) {
      for (const [path, expectedHash] of [
        [retained.rawPath, retained.sha256],
        [retained.textPath, retained.textSha256],
      ]) {
        if (!(await verifySnapshot(path, expectedHash))) verified = false
      }
    } else
      assert(retained.error && retained.attemptedAt, `Undocumented source failure: ${source.url}`)
    if (retained.failureRawPath) {
      await verifySnapshot(retained.failureRawPath, retained.failureSha256)
    }
    sourceRecords.push({
      url: source.url,
      title: source.title,
      status: retained.sha256
        ? verified
          ? 'retained-and-hash-verified'
          : 'recorded-cache-unavailable'
        : 'request-failed',
      retrievedAt: retained.retrievedAt,
      attemptedAt: retained.attemptedAt,
      error: retained.error,
      sha256: retained.sha256,
      references: source.references,
    })
  }
  if (!checkOnly) {
    await mkdir('data/research', { recursive: true })
    await writeFile(
      'data/research/content-audit.json',
      JSON.stringify(
        {
          generatedAt,
          validation: {
            allIntroductionsAndSources: true,
            datesAndCoordinates: true,
            allPersonEventAssociations: true,
            posthumousExplanations: true,
            journeyChronology: true,
            retainedSourceHashes: missingSnapshots === 0,
            missingSnapshotFiles: missingSnapshots,
            topicChaptersAndChronology: true,
          },
          scope:
            'Structural and chronological validation of every record; editorial gaps are retained, not filled with guessed associations. This is not expert certification of all historical claims.',
          people: personRecords,
          posthumousRelations,
          events: events.map((event) => ({
            id: event.id,
            title: event.title,
            year: event.year,
            people: event.people,
            sourceCount: event.sources.length,
            dateNote: event.dateNote,
            locationNote: event.locationNote,
            peopleNotes: event.peopleNotes,
            readingCharacters: [
              event.summary,
              event.background,
              event.impact,
              ...(event.details ?? []),
            ].join('').length,
          })),
          dynasties: dynasties.map((dynasty) => ({
            id: dynasty.id,
            name: dynasty.name,
            from: dynasty.from,
            to: dynasty.to,
            sourceCount: dynasty.sources.length,
            dateNote: dynasty.dateNote,
            readingCharacters: [
              dynasty.summary,
              dynasty.context,
              ...(dynasty.sections ?? []).map((section) => section.text),
            ].join('').length,
          })),
          topics: tours.map((topic) => ({
            id: topic.id,
            name: topic.name,
            chapters: topic.steps.length,
            introductionCharacters: topic.introduction.join('').length,
            sourceCount: topic.sources.length,
          })),
          sources: sourceRecords,
          editorialGaps: personRecords.filter((person) =>
            ['no-linked-events', 'one-linked-event'].includes(person.coverage),
          ),
          checkedMajorPeople: expected.map((name) => {
            const person = people.find(
              (person) => person.name === name || person.aliases?.includes(name),
            )
            return personRecords.find((record) => record.id === person.id)
          }),
        },
        null,
        2,
      ) + '\n',
    )
  }
  const report = {
    generatedAt,
    mapRange: { from: -10000, to: 1912 },
    people: {
      total: people.length,
      importedSnapshot: snapshot.count,
      curatedIntroductions: people.filter((p) => p.recordKind === 'curated').length,
      basicRecords: people.filter((p) => p.recordKind === 'catalog').length,
      unknownBirth: people.filter((p) => p.birth === null).length,
      unknownDeath: people.filter((p) => p.death === null).length,
      noLinkedEvents: personRecords.filter((person) => person.coverage === 'no-linked-events')
        .length,
      oneLinkedEvent: personRecords.filter((person) => person.coverage === 'one-linked-event')
        .length,
      outsideMapRange: personRecords.filter((person) => person.coverage === 'outside-map-range')
        .length,
    },
    events: {
      total: events.length,
      byCategory: Object.fromEntries(
        ['政治', '战争', '文化', '交流', '社会'].map((category) => [
          category,
          events.filter((e) => e.category === category).length,
        ]),
      ),
    },
    dynasties: { total: dynasties.length },
    topics: {
      total: tours.length,
      chapters: tours.reduce((count, topic) => count + topic.steps.length, 0),
    },
    journeys: {
      people: journeys.length,
      nodes: journeys.reduce((sum, j) => sum + j.nodes.length, 0),
      records: journeys.map((j) => ({
        person: personById.get(j.personId).name,
        nodes: j.nodes.length,
        from: j.nodes[0].year,
        to: j.nodes.at(-1).year,
      })),
    },
    periods: periods.map((period) => ({
      id: period.id,
      name: period.name,
      events: events.filter((e) => e.year >= period.from && e.year <= period.to).length,
      people: people.filter(
        (p) =>
          p.era === period.id ||
          (p.birth !== null && p.death !== null && p.birth <= period.to && p.death >= period.from),
      ).length,
    })),
    checkedMajorPeople: expected,
    posthumousRelations,
    sourceRetention: {
      references: sourceRecords.length,
      retained: sourceRecords.filter((source) => source.status === 'retained-and-hash-verified')
        .length,
      unavailable: sourceRecords.filter((source) => source.status === 'recorded-cache-unavailable')
        .length,
      failed: sourceRecords.filter((source) => source.status === 'request-failed').length,
      detailedAudit: 'data/research/content-audit.json',
    },
    importUnresolved: snapshot.unresolved.map((name) => ({
      name,
      availableEditorialRecord: people.some((p) => p.name === name || p.aliases?.includes(name)),
    })),
    notes: [
      '数量表示当前覆盖范围，不能据此声明中国历史资料完整。',
      '基础人物档案有身份简介和出处；详细年谱只对已核对记录的三人提供。',
      '箭头表示记录的先后顺序，省略中间行程。相关事件地点不构成个人到访证明。',
      '时间轴延伸至约前10000年，史前遗址以考古区间表示，不据此虚构疆域。',
      '事件与朝代介绍为有出处的整理稿，仍需持续核对文献与争议。',
    ],
  }
  if (!checkOnly)
    await writeFile('public/data/coverage.json', JSON.stringify(report, null, 2) + '\n')
  console.log(
    `Audited ${people.length} people, ${events.length} events, ${dynasties.length} dynasty records, and ${report.journeys.nodes} journey nodes for ${journeys.length} people.`,
  )
  console.log(
    `Source snapshots: ${report.sourceRetention.retained} verified, ${report.sourceRetention.unavailable} unavailable locally, ${report.sourceRetention.failed} recorded request failures; ${missingSnapshots} snapshot files not checked.`,
  )
  console.log(
    'Major people with fewer than two linked events:',
    expected
      .filter((name) => {
        const person = people.find(
          (person) => person.name === name || person.aliases?.includes(name),
        )
        return personRecords.find((record) => record.id === person.id).eventCount < 2
      })
      .join(' · '),
  )
  console.log(
    'Per-period event coverage:',
    report.periods.map((p) => `${p.name} ${p.events}`).join(' · '),
  )
} finally {
  await server.close()
}
