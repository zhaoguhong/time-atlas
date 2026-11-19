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
  server: { middlewareMode: true, ws: false },
  appType: 'custom',
  optimizeDeps: { noDiscovery: true, include: [] },
})
try {
  const { events, people, personById } = await server.ssrLoadModule('/src/data/content.ts')
  const { eventRegion, historyRegions } = await server.ssrLoadModule('/src/lib/time-pillar.ts')
  const { MIN_YEAR, MAX_YEAR, PILLAR_MAX_YEAR, modernReadingPeriod } =
    await server.ssrLoadModule('/src/lib/history.ts')
  const { eventCategories, matchesEventCategory } = await server.ssrLoadModule(
    '/src/lib/event-categories.ts',
  )
  const { dynasties } = await server.ssrLoadModule('/src/data/dynasties.ts')
  const { worldPolities } = await server.ssrLoadModule('/src/data/world-polities.ts')
  const { journeys } = await server.ssrLoadModule('/src/data/journeys.ts')
  const { topicRoutes, topicRouteById } = await server.ssrLoadModule('/src/data/topic-routes.ts')
  const { periods } = await server.ssrLoadModule('/src/data/periods.ts')
  const { topicTours: tours } = await server.ssrLoadModule('/src/data/topics.ts')
  const { readingArticles, articleGuides } = await server.ssrLoadModule('/src/data/articles.ts')
  const { places, placeById, eventAtPlace } = await server.ssrLoadModule('/src/lib/exploration.ts')
  const { placeReading } = await server.ssrLoadModule('/src/data/place-reading.ts')
  const imageManifest = JSON.parse(await readFile('data/article-images.json', 'utf8'))
  for (const image of imageManifest.images) {
    assert(
      image.isPublicDomain === true && image.license === 'CC0 1.0',
      `Uncleared museum image: ${image.file}`,
    )
    assert.match(image.file, /^public\/images\/articles\/met-\d+\.jpg$/)
    await verifySnapshot(image.file, image.sha256)
    assert(
      readingArticles.some((article) =>
        article.article.media?.some(
          (media) => media.src === image.file.slice(7) && media.sourceUrl === image.sourceUrl,
        ),
      ),
      `Unused museum license record: ${image.file}`,
    )
  }
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
  assert.equal(placeById.size, places.length, 'Duplicate reading place ID')
  for (const place of places) {
    const reading = placeReading[place.id]
    assert(reading?.text?.trim(), `Missing place introduction: ${place.id}`)
    validateSources({ id: place.id, ...reading })
  }
  for (const id of Object.keys(placeReading))
    assert(placeById.has(id), `Orphan place introduction: ${id}`)
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
    if (event.placeIds !== undefined) {
      assert.equal(new Set(event.placeIds).size, event.placeIds.length, event.id)
      for (const id of event.placeIds)
        assert(placeById.has(id), `Unknown event place: ${event.id} → ${id}`)
    }
    if (event.region)
      assert(Object.hasOwn(historyRegions, event.region), `Invalid region: ${event.id}`)
    for (const relation of event.relatedEvents ?? []) {
      assert(
        relation.id !== event.id && events.some((target) => target.id === relation.id),
        `Invalid related event: ${event.id}`,
      )
      assert(relation.label && relation.note, `Unexplained relation: ${event.id}`)
    }
    assert(event.summary && event.background && event.impact && event.sources.length, event.id)
    validateSources(event)
    if (event.narrative) {
      assert(event.narrative.sections.length, `Empty narrative: ${event.id}`)
      for (const section of event.narrative.sections) {
        assert(section.title === undefined || section.title.trim(), event.id)
        assert(section.paragraphs.length, `Empty narrative section: ${event.id}`)
        assert(
          section.paragraphs.every((text) => text.trim()),
          event.id,
        )
      }
      assert(event.narrative.note === undefined || event.narrative.note.trim(), event.id)
    }
    assert(
      validYear(event.year) && event.year >= MIN_YEAR && event.year <= PILLAR_MAX_YEAR,
      event.id,
    )
    if (event.endYear !== undefined)
      assert(
        validYear(event.endYear) &&
          event.endYear >= event.year &&
          event.endYear <= PILLAR_MAX_YEAR &&
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
    assert(
      dynasty.sections?.length && dynasty.sections.every((section) => section.text.trim()),
      `Missing dynasty reading: ${dynasty.id}`,
    )
  }
  assert.equal(new Set(worldPolities.map((polity) => polity.id)).size, worldPolities.length)
  for (const polity of worldPolities) {
    assert(!dynasties.some((dynasty) => dynasty.id === polity.id), `Repeated archive: ${polity.id}`)
    assert(polity.summary && polity.context && polity.capital && polity.dateNote, polity.id)
    assert(validYear(polity.from) && validYear(polity.to) && polity.from <= polity.to, polity.id)
    assert(polity.region !== 'china' && Object.hasOwn(historyRegions, polity.region), polity.id)
    assert(polity.mapNames.length && polity.sections?.length >= 1, polity.id)
    validateSources(polity)
  }
  assert.equal(new Set(topicRoutes.map((route) => route.id)).size, topicRoutes.length)
  for (const route of topicRoutes) {
    validateSources(route)
    assert(route.name && route.period && route.note && route.stops.length > 1, route.id)
    assert.equal(new Set(route.stops.map((stop) => stop.id)).size, route.stops.length)
    for (const stop of route.stops) {
      validateSources(stop)
      assert(stop.name && stop.dateLabel && stop.text, stop.id)
      for (const point of [stop.coordinates, ...(stop.via ?? [])]) {
        assert(
          point.length === 2 &&
            point.every(Number.isFinite) &&
            Math.abs(point[0]) <= 180 &&
            Math.abs(point[1]) < 90,
          stop.id,
        )
      }
    }
  }
  for (const tour of tours) {
    for (const id of tour.routeIds ?? []) {
      const route = topicRouteById.get(id)
      assert(route, `Missing route: ${tour.id}/${id}`)
      for (const source of route.sources)
        assert(
          tour.sources.some((s) => s.url === source.url),
          `Unindexed route source: ${id}`,
        )
    }
    for (const [index, heading] of Object.entries(tour.article?.headings ?? {})) {
      assert(
        Number.isInteger(Number(index)) &&
          Number(index) >= 0 &&
          Number(index) < tour.article.paragraphs.length &&
          heading.trim(),
        `Invalid article heading: ${tour.id}`,
      )
    }
    validateSources(tour)
    assert(tour.subject?.trim(), `Missing topic subject: ${tour.id}`)
    assert(
      tour.article?.paragraphs.length && tour.article.paragraphs.every((text) => text.trim()),
      `Missing topic article: ${tour.id}`,
    )
    assert.deepEqual(
      tour.article.eventIds,
      tour.steps,
      `Invalid topic article evidence: ${tour.id}`,
    )
    for (const stop of tour.article.mapStops ?? []) {
      assert(
        Number.isInteger(stop.afterParagraph) &&
          stop.afterParagraph >= 0 &&
          stop.afterParagraph < tour.article.paragraphs.length &&
          tour.steps.includes(stop.eventId) &&
          stop.label.trim(),
        `Invalid topic map stop: ${tour.id}`,
      )
    }
    assert(
      tour.introduction?.length &&
        tour.introduction.every((text) => text.trim()) &&
        tour.conclusion &&
        tour.question,
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
  const eventById = new Map(events.map((event) => [event.id, event]))
  const guideById = new Map([...tours, ...articleGuides].map((guide) => [guide.id, guide]))
  const articleEventIds = (article) => [
    ...new Set([
      ...(article.relatedEventIds ?? []),
      ...(article.article.mapStops ?? []).map((stop) => stop.eventId),
      ...(article.article.maps ?? []).flatMap((map) => map.eventIds ?? []),
    ]),
  ]
  const validParagraph = (index, article) =>
    Number.isInteger(index) && index >= 0 && index < article.article.paragraphs.length
  assert.equal(new Set(readingArticles.map((article) => article.id)).size, readingArticles.length)
  for (const article of readingArticles) {
    assert(
      article.id?.trim() &&
        article.name?.trim() &&
        article.description?.trim() &&
        article.subject?.trim(),
      `Incomplete article metadata: ${article.id}`,
    )
    assert(
      article.article?.paragraphs.length &&
        article.article.paragraphs.every((text) => typeof text === 'string' && text.trim()),
      `Missing independent article body: ${article.id}`,
    )
    if (article.introduction !== undefined)
      assert(
        Array.isArray(article.introduction) &&
          article.introduction.every((text) => typeof text === 'string' && text.trim()),
        `Invalid article introduction: ${article.id}`,
      )
    for (const field of ['question', 'conclusion'])
      if (article[field] !== undefined)
        assert(
          typeof article[field] === 'string' && article[field].trim(),
          `Empty article ${field}: ${article.id}`,
        )
    validateSources(article)
    for (const [index, heading] of Object.entries(article.article.headings ?? {}))
      assert(
        validParagraph(Number(index), article) && typeof heading === 'string' && heading.trim(),
        `Invalid independent article heading: ${article.id}/${index}`,
      )
    if (article.guideId !== undefined)
      assert(
        guideById.has(article.guideId),
        `Missing article guide: ${article.id}/${article.guideId}`,
      )
    if (article.mapOverview !== undefined)
      assert.equal(
        typeof article.mapOverview,
        'boolean',
        `Invalid article map overview: ${article.id}`,
      )
    assert.equal(
      new Set(article.relatedEventIds ?? []).size,
      (article.relatedEventIds ?? []).length,
      `Duplicate related article event: ${article.id}`,
    )
    for (const id of articleEventIds(article))
      assert(eventById.has(id), `Unknown article event: ${article.id}/${id}`)
    for (const stop of article.article.mapStops ?? [])
      assert(
        validParagraph(stop.afterParagraph, article) && stop.label?.trim(),
        `Invalid article event link: ${article.id}/${stop.eventId}`,
      )
    assert.equal(
      new Set((article.article.media ?? []).map((media) => media.id)).size,
      (article.article.media ?? []).length,
      `Duplicate article media: ${article.id}`,
    )
    assert(
      article.cover?.src && article.article.media?.some((media) => media.src === article.cover.src),
      `Cover missing or without a captioned figure: ${article.id}`,
    )
    for (const media of article.article.media ?? []) {
      assert(
        media.id?.trim() && validParagraph(media.afterParagraph, article),
        `Invalid article media position: ${article.id}`,
      )
      assert(
        media.src?.trim() && media.alt?.trim() && media.caption?.trim(),
        `Incomplete article media: ${article.id}/${media.id}`,
      )
      assert(
        Number.isInteger(media.width) &&
          media.width > 0 &&
          Number.isInteger(media.height) &&
          media.height > 0,
        `Missing article image dimensions: ${article.id}/${media.id}`,
      )
      assert(
        media.credit?.trim() || media.sourceUrl,
        `Missing article image attribution: ${article.id}/${media.id}`,
      )
      if (media.sourceUrl !== undefined)
        assert.equal(
          new URL(media.sourceUrl).protocol,
          'https:',
          `Invalid article image source: ${article.id}/${media.id}`,
        )
      if (media.aiGenerated !== undefined)
        assert.equal(
          typeof media.aiGenerated,
          'boolean',
          `Invalid AI image flag: ${article.id}/${media.id}`,
        )
      if (media.src.startsWith('data:'))
        assert.match(
          media.src,
          /^data:image\/(?:svg\+xml|png|jpeg|webp|gif)(?:;charset=[^;,]+)?(?:;base64)?,.+/i,
          `Invalid embedded article image: ${article.id}/${media.id}`,
        )
      else if (/^[a-z][a-z\d+.-]*:/i.test(media.src))
        assert.equal(
          new URL(media.src).protocol,
          'https:',
          `Invalid article image URL: ${article.id}/${media.id}`,
        )
      else {
        assert(
          !media.src.split('/').includes('..') && !media.src.includes('\\'),
          `Invalid article image path: ${article.id}/${media.id}`,
        )
        await readFile(`public/${media.src.replace(/^\/+/, '')}`)
      }
    }
    assert.equal(
      new Set((article.article.maps ?? []).map((map) => map.id)).size,
      (article.article.maps ?? []).length,
      `Duplicate article map: ${article.id}`,
    )
    for (const map of article.article.maps ?? []) {
      assert(
        map.id?.trim() && map.title?.trim() && validParagraph(map.afterParagraph, article),
        `Invalid inline map metadata: ${article.id}`,
      )
      assert(
        validYear(map.year) && map.year >= MIN_YEAR && map.year <= PILLAR_MAX_YEAR,
        `Invalid inline map year: ${article.id}/${map.id}`,
      )
      assert(
        Array.isArray(map.center) &&
          map.center.length === 2 &&
          map.center.every(Number.isFinite) &&
          Math.abs(map.center[0]) <= 180 &&
          Math.abs(map.center[1]) <= 85.051129,
        `Invalid inline map center: ${article.id}/${map.id}`,
      )
      if (map.zoom !== undefined)
        assert(
          Number.isFinite(map.zoom) && map.zoom >= -1 && map.zoom <= 8,
          `Invalid inline map zoom: ${article.id}/${map.id}`,
        )
      assert.equal(
        new Set(map.eventIds ?? []).size,
        (map.eventIds ?? []).length,
        `Duplicate inline map event: ${article.id}/${map.id}`,
      )
      for (const id of map.routeIds ?? [])
        assert(topicRouteById.has(id), `Unknown inline route: ${article.id}/${id}`)
      for (const place of map.places ?? [])
        assert(
          place.name?.trim() &&
            place.coordinates.length === 2 &&
            place.coordinates.every(Number.isFinite) &&
            Math.abs(place.coordinates[0]) <= 180 &&
            Math.abs(place.coordinates[1]) < 90,
          `Invalid inline place: ${article.id}/${map.id}`,
        )
      if (map.bounds)
        assert(
          map.bounds.length === 2 &&
            map.bounds.every(
              (point) =>
                point.length === 2 &&
                point.every(Number.isFinite) &&
                Math.abs(point[0]) <= 180 &&
                Math.abs(point[1]) <= 85.051129,
            ) &&
            map.bounds[0][0] < map.bounds[1][0] &&
            map.bounds[0][1] < map.bounds[1][1],
          `Invalid inline bounds: ${article.id}/${map.id}`,
        )
      if (map.caption !== undefined)
        assert(map.caption.trim(), `Empty inline map caption: ${article.id}/${map.id}`)
      if (map.sources?.length)
        validateSources({ id: `${article.id}/${map.id}`, sources: map.sources })
    }
    for (const id of article.routeIds ?? []) {
      const route = topicRouteById.get(id)
      assert(route, `Missing article route: ${article.id}/${id}`)
      for (const source of route.sources)
        assert(
          article.sources.some((item) => item.url === source.url),
          `Unindexed article route source: ${article.id}/${id}`,
        )
    }
  }
  const articleRoutes = [
    ...new Set(readingArticles.flatMap((article) => article.routeIds ?? [])),
  ].map((id) => topicRouteById.get(id))
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
      (person.death !== null && person.death < MIN_YEAR) ||
      (person.birth !== null && person.birth > MAX_YEAR)
    const outsideReading =
      (person.death !== null && person.death < MIN_YEAR) ||
      (person.birth !== null && person.birth > PILLAR_MAX_YEAR)
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
      outsideMapRange: outsideMap,
      outsideReadingRange: outsideReading,
      coverage: outsideReading
        ? 'outside-reading-range'
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
            independentArticlesAndOptionalReferences: true,
            articleMediaAndMaps: true,
            placeIntroductionsAndAssociations: true,
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
            region: eventRegion(event),
            relatedEvents: event.relatedEvents,
            sourceCount: event.sources.length,
            dateNote: event.dateNote,
            locationNote: event.locationNote,
            placeIds: event.placeIds,
            peopleNotes: event.peopleNotes,
            readingCharacters: [
              event.summary,
              ...(event.narrative
                ? [
                    ...event.narrative.sections.flatMap((section) => [
                      section.title ?? '',
                      ...section.paragraphs,
                    ]),
                    event.narrative.note ?? '',
                  ]
                : [event.background, event.impact, ...(event.details ?? [])]),
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
          worldPolities: worldPolities.map((polity) => ({
            id: polity.id,
            name: polity.name,
            from: polity.from,
            to: polity.to,
            region: polity.region,
            mapNames: polity.mapNames,
            sourceCount: polity.sources.length,
            dateNote: polity.dateNote,
          })),
          topics: readingArticles.map((topic) => ({
            id: topic.id,
            name: topic.name,
            guideId: topic.guideId,
            relatedEventIds: topic.relatedEventIds ?? [],
            chapters: (topic.relatedEventIds ?? []).length,
            paragraphCount: topic.article.paragraphs.length,
            headingCount: Object.keys(topic.article.headings ?? {}).length,
            mediaCount: (topic.article.media ?? []).length,
            aiImageCount: (topic.article.media ?? []).filter((media) => media.aiGenerated).length,
            inlineMapCount: (topic.article.maps ?? []).length,
            mapOverview: !!topic.mapOverview,
            routeIds: topic.routeIds ?? [],
            introductionCharacters: (topic.introduction ?? []).join('').length,
            readingCharacters: [
              ...(topic.introduction ?? []),
              ...Object.values(topic.article.headings ?? {}),
              ...topic.article.paragraphs,
              topic.conclusion ?? '',
            ].join('').length,
            sourceCount: topic.sources.length,
            eventIds: articleEventIds(topic),
            worldEventIds: articleEventIds(topic).filter(
              (id) => eventRegion(eventById.get(id)) !== 'china',
            ),
          })),
          places: places.map((place) => ({
            id: place.id,
            name: place.name,
            labels: place.labels.map((label) => label.id),
            eventIds: events.filter((event) => eventAtPlace(event, place)).map((event) => event.id),
            sourceCount: placeReading[place.id].sources.length,
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
    mapRange: { from: MIN_YEAR, to: MAX_YEAR },
    readingRange: { from: MIN_YEAR, to: PILLAR_MAX_YEAR },
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
      outsideMapRange: personRecords.filter((person) => person.outsideMapRange).length,
      outsideReadingRange: personRecords.filter((person) => person.outsideReadingRange).length,
    },
    events: {
      total: events.length,
      world: events.filter((event) => eventRegion(event) !== 'china').length,
      byRegion: Object.fromEntries(
        Object.keys(historyRegions).map((region) => [
          region,
          events.filter((event) => eventRegion(event) === region).length,
        ]),
      ),
      byFilterCategory: Object.fromEntries(
        eventCategories
          .filter((category) => category !== '全部')
          .map((category) => {
            const matching = events.filter((event) => matchesEventCategory(event, category))
            return [
              category,
              {
                total: matching.length,
                china: matching.filter((event) => eventRegion(event) === 'china').length,
                world: matching.filter((event) => eventRegion(event) !== 'china').length,
                byRegion: Object.fromEntries(
                  Object.keys(historyRegions).map((region) => [
                    region,
                    matching.filter((event) => eventRegion(event) === region).length,
                  ]),
                ),
              },
            ]
          }),
      ),
      byCategory: Object.fromEntries(
        ['政治', '战争', '文化', '交流', '社会'].map((category) => [
          category,
          events.filter((e) => e.category === category).length,
        ]),
      ),
      withCuratedRelatedReading: events.filter((event) => event.relatedEvents?.length).length,
      withExplicitPlaces: events.filter((event) => event.placeIds?.length).length,
    },
    dynasties: { total: dynasties.length },
    worldPolities: { total: worldPolities.length },
    topics: {
      total: readingArticles.length,
      withRelatedEvents: readingArticles.filter((topic) => topic.relatedEventIds?.length).length,
      withRouteMaps: readingArticles.filter((topic) => topic.routeIds?.length).length,
      routeMaps: articleRoutes.length,
      routeStops: articleRoutes.reduce((sum, route) => sum + route.stops.length, 0),
      withCovers: readingArticles.filter((topic) => topic.cover).length,
      withMedia: readingArticles.filter((topic) => topic.article.media?.length).length,
      media: readingArticles.reduce((sum, topic) => sum + (topic.article.media ?? []).length, 0),
      aiIllustrations: readingArticles.reduce(
        (sum, topic) =>
          sum + (topic.article.media ?? []).filter((media) => media.aiGenerated).length,
        0,
      ),
      withInlineMaps: readingArticles.filter((topic) => topic.article.maps?.length).length,
      inlineMaps: readingArticles.reduce(
        (sum, topic) => sum + (topic.article.maps ?? []).length,
        0,
      ),
      withMapOverview: readingArticles.filter((topic) => topic.mapOverview).length,
      chapters: readingArticles.reduce(
        (count, topic) => count + (topic.relatedEventIds ?? []).length,
        0,
      ),
      withWorldEvents: readingArticles.filter((topic) =>
        articleEventIds(topic).some((id) => eventRegion(eventById.get(id)) !== 'china'),
      ).length,
      uniqueEvents: new Set(readingArticles.flatMap(articleEventIds)).size,
      uniqueWorldEvents: new Set(
        readingArticles
          .flatMap(articleEventIds)
          .filter((id) => eventRegion(eventById.get(id)) !== 'china'),
      ).size,
    },
    places: {
      total: places.length,
      labels: places.reduce((count, place) => count + place.labels.length, 0),
      withLinkedEvents: places.filter((place) => events.some((event) => eventAtPlace(event, place)))
        .length,
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
    periods: [...periods, modernReadingPeriod].map((period) => ({
      id: period.id,
      name: period.name,
      events: events.filter((e) => e.year >= period.from && e.year <= period.to).length,
      byRegion: Object.fromEntries(
        Object.keys(historyRegions).map((region) => [
          region,
          events.filter(
            (event) =>
              event.year >= period.from && event.year <= period.to && eventRegion(event) === region,
          ).length,
        ]),
      ),
      byFilterCategory: Object.fromEntries(
        eventCategories
          .filter((category) => category !== '全部')
          .map((category) => [
            category,
            events.filter(
              (event) =>
                event.year >= period.from &&
                event.year <= period.to &&
                matchesEventCategory(event, category),
            ).length,
          ]),
      ),
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
      '数量表示当前覆盖范围，不能据此声明中国或世界历史资料完整。',
      '人物介绍保留基础身份与出处，编辑短传不等于完整传记；详细年谱只对独立核对记录的人物提供。',
      '箭头表示记录的先后顺序，省略中间行程。相关事件地点不构成个人到访证明。',
      '时间轴延伸至约前10000年，史前遗址以考古区间表示，不据此虚构疆域。',
      '时空柱与事件阅读延伸至2000年；历史疆域止于1912年，现代事件不能用早期疆域表示当年。',
      '事件与朝代介绍为有出处的整理稿，仍需持续核对文献与争议。',
    ],
  }
  if (!checkOnly)
    await writeFile('public/data/coverage.json', JSON.stringify(report, null, 2) + '\n')
  console.log(
    `Audited ${people.length} people, ${events.length} events, ${dynasties.length} Chinese dynasty records, ${worldPolities.length} world-polity profiles, and ${report.journeys.nodes} journey nodes for ${journeys.length} people.`,
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
