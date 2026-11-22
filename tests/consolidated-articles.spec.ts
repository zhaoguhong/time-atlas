import { articleSlugs } from '../src/data/article-slugs'
import { expect, test } from '@playwright/test'

test('专题目录搜索与独立网址', async ({ page }) => {
  await page.goto('/#view=tours')
  await expect(page.locator('.tour-card')).toHaveCount(Object.keys(articleSlugs).length)
  const search = page.getByRole('searchbox', { name: '搜索历史专题' })
  await search.fill('赤壁之后，孙刘为什么还会交战')
  await expect(page.locator('.tour-card')).toHaveCount(1)
  await page.locator('.tour-card').click()
  await expect(page.locator('.topic-introduction h2')).toHaveText(
    '一件公文走了多久？里耶秦简里的郡县',
  )
  await expect(page).toHaveURL(/\/topics\/chinese-statecraft\//)
  for (const [oldId, id, title] of [
    ['hexi-and-oases', 'silk-road', '丝绸之路：陆海之间的贸易与文明交流'],
    ['paper-money-and-trust', 'tax-money-markets', '青苗钱：北宋官府为什么要给农户放贷'],
    ['ganjin-crossing', 'buddhist-texts-and-networks', '长安译场：一部佛经怎样译成汉语'],
    [
      'american-urban-traditions',
      'west-asian-urban-worlds',
      '古城靠谁供养：乌鲁克、摩亨佐达罗与卡拉尔',
    ],
    [
      'south-asian-societies',
      'west-asian-urban-worlds',
      '古城靠谁供养：乌鲁克、摩亨佐达罗与卡拉尔',
    ],
  ]) {
    await page.goto(`/#article=${oldId}`)
    await expect(page.locator('.topic-introduction h2')).toHaveText(title)
    await expect(page).toHaveURL(new RegExp(`/topics/${articleSlugs[id]}/`))
  }
})

test('旧专题导言和文章收藏打开主文，指定章次仍打开原事件', async ({ page }) => {
  for (const hash of [
    'tour=capital-moves-and-city-life&step=-1',
    'article=capital-moves-and-city-life',
  ]) {
    await page.goto('/#' + hash)
    await expect(page.locator('.topic-introduction h2')).toHaveText('江南的粮怎样运到北京')
    await expect(page).toHaveURL(/\/topics\/rivers-and-cities\/$/)
  }
  await page.goto('/#tour=capital-moves-and-city-life&step=1')
  await expect(page).toHaveURL(/\/events\/sui-east-capital\/$/)
})

test('旧收藏和子题事件已读合并到主文章', async ({ page }) => {
  await page.addInitScript(() => {
    if (localStorage.getItem('consolidation-fixture')) return
    localStorage.setItem('consolidation-fixture', 'set')
    const preferences = JSON.parse(localStorage.getItem('time-atlas:v1') ?? '{}')
    preferences.bookmarks = ['topic:paper-money-and-trust', 'topic:tax-money-markets']
    localStorage.setItem('time-atlas:v1', JSON.stringify(preferences))
    localStorage.setItem(
      'time-atlas:reading:v2',
      JSON.stringify({
        topics: {
          'chibi-and-alliance': { lastEventId: 'yiling', readEventIds: ['chibi', 'yiling'] },
          'three-kingdoms': { lastEventId: 'guandu', readEventIds: ['guandu'] },
          'song-learning': {
            lastEventId: 'shaosheng-policy-reversal',
            readEventIds: ['shaosheng-policy-reversal'],
          },
        },
        recent: [
          {
            key: 'topic:chibi-and-alliance',
            title: '旧子题',
            hash: '#tour=chibi-and-alliance&event=yiling&step=3',
          },
        ],
      }),
    )
  })
  await page.goto('/topics/chinese-statecraft/')
  await expect(page.locator('.topic-related-events')).toContainText('已读 3 /')
  await expect(page).toHaveURL(/\/topics\/chinese-statecraft\//)
  await expect
    .poll(() =>
      page.evaluate(() => {
        const saved = JSON.parse(localStorage.getItem('time-atlas:reading:v2') ?? '{}')
        return saved.topics?.['qin-unification']?.readEventIds
      }),
    )
    .toEqual(['guandu', 'chibi', 'yiling'])
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          JSON.parse(localStorage.getItem('time-atlas:reading:v2') ?? '{}').topics?.[
            'tax-money-markets'
          ]?.readEventIds,
      ),
    )
    .toEqual(['shaosheng-policy-reversal'])
  await expect
    .poll(() =>
      page.evaluate(() => JSON.parse(localStorage.getItem('time-atlas:v1') ?? '{}').bookmarks),
    )
    .toEqual(['topic:tax-money-markets'])
})

for (const width of [1440, 390]) {
  test(`新增重大事件文章可以独立阅读 ${width}`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/#view=tours')
    await expect(page.locator('.tour-card')).toHaveCount(Object.keys(articleSlugs).length)
    await page.screenshot({ path: info.outputPath(`article-directory-${width}.png`) })
    for (const [id, title] of [
      ['xinhai-revolution', '四川保路'],
      ['mongol-conquests', '蒙古'],
      ['reformation', '欧洲宗教改革'],
      ['world-wars', '山东权益'],
    ]) {
      await page.goto(`/topics/${articleSlugs[id]}/`)
      await expect(page.locator('.topic-introduction h2')).toContainText(title)
      await expect(page.locator('.topic-article h3').first()).toBeVisible()
      await expect(page.locator('.topic-related-events li').first()).toBeAttached()
      await expect(page.locator('#topic-sources a').first()).toHaveAttribute('href', /^https:/)
      await expect(page.locator('.map-canvas')).toHaveCount(0)
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        width,
      )
    }
    await page.screenshot({ path: info.outputPath(`world-wars-${width}.png`) })
  })

  test(`长文配图正常加载并可放大 ${width}`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 })
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    for (const [id, figureId] of [
      ['grand-canal', 'grain-supply'],
      ['tax-money-markets', 'green-shoots-loan'],
      ['buddhist-texts-and-networks', 'translation-work'],
      ['writing-and-knowledge', 'diamond-scroll'],
      ['observing-sky-measuring-position', 'longitude-two-times'],
    ]) {
      await page.goto(`/topics/${articleSlugs[id]}/`)
      const figure = page.locator(`[data-article-block="media-${figureId}"]`)
      await figure.scrollIntoViewIfNeeded()
      const picture = figure.locator('.topic-image-preview img')
      await expect(picture).toBeVisible()
      await expect
        .poll(() => picture.evaluate((image: HTMLImageElement) => image.naturalWidth))
        .toBeGreaterThan(0)
      const pictureBox = (await picture.boundingBox())!
      const actionBox = (await figure.locator('.topic-image-preview > span').boundingBox())!
      expect(actionBox.y).toBeGreaterThanOrEqual(pictureBox.y + pictureBox.height)
      await figure.locator('.topic-image-preview').click()
      await expect(page.getByRole('dialog')).toBeVisible()
      await page.getByRole('button', { name: '关闭图片，返回文章', exact: true }).click()
      await expect(figure.locator('.topic-image-preview')).toBeFocused()
      await page.screenshot({ path: info.outputPath(`${figureId}-${width}.png`) })
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        width,
      )
    }
    expect(errors).toEqual([])
  })
}

test('重写正文不套用上一版段落下标', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      'time-atlas:topic-article:v6:tax-money-markets',
      JSON.stringify({ block: 'paragraph-15', offset: 0 }),
    )
  })
  await page.goto('/topics/state-and-markets/')
  await expect(page.locator('.topic-introduction h2')).toBeInViewport()
  await expect
    .poll(() => page.locator('#history-reading-content').evaluate((element) => element.scrollTop))
    .toBe(0)
})

for (const width of [1440, 390]) {
  test(`交流与器物专题保持完整阅读布局 ${width}`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 })
    for (const id of ['silk-road', 'age-of-exploration', 'porcelain-world', 'reformation']) {
      await page.goto(`/topics/${articleSlugs[id]}/`)
      await expect(page.locator('.topic-article h3').first()).toBeVisible()
      await expect(page.locator('#topic-sources a').first()).toHaveAttribute('href', /^https:/)
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        width,
      )
      await page.screenshot({ path: info.outputPath(`${id}-${width}.png`) })
      await page.locator('.topic-article h3').last().scrollIntoViewIfNeeded()
      await expect(page.locator('.topic-article h3').last()).toBeVisible()
      if (id === 'porcelain-world')
        await expect(page.locator('.topic-related-events')).toHaveCount(0)
    }
  })
}
