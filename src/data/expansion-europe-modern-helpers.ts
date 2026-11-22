import { makeEvents, makePeople, webSource } from './expansion-kit'
import type { EventDraft, PersonDraft } from './expansion-kit'
import type { HistoryRegion } from '../types'

// The rows contain individually authored prose; helpers only unpack fields.
export const reference = (page: string) =>
  webSource(
    `${page.replaceAll('_', ' ')} · 基础条目与参考文献`,
    `https://en.wikipedia.org/wiki/${page}`,
    '基础出处；未声称本轮重新抓取核验。',
  )
export const chineseReference = (page: string) =>
  webSource(
    `${page} · 基础条目与参考文献`,
    `https://zh.wikipedia.org/wiki/${page}`,
    '基础出处；未声称本轮重新抓取核验。',
  )
export type EventRow = [
  id: string,
  year: number,
  title: string,
  theme: string,
  location: string,
  coordinates: [number, number],
  summary: string,
  text: string,
  impact: string,
  page: string,
  people?: string[],
  endYear?: number,
  dateNote?: string,
]
export function rows(region: HistoryRegion, data: EventRow[]) {
  return makeEvents(
    region,
    data.map(
      ([
        id,
        year,
        title,
        theme,
        location,
        coordinates,
        summary,
        text,
        impact,
        page,
        people,
        endYear,
        dateNote,
      ]): EventDraft => ({
        id: `exp-em-${id}`,
        year,
        title,
        category:
          theme === '政治'
            ? '政治'
            : theme === '战争'
              ? '战争'
              : theme === '经济贸易' || theme === '社会'
                ? '社会'
                : '文化',
        themes: [theme],
        place: [location, coordinates],
        summary,
        text,
        impact,
        sources: [region === 'china' ? chineseReference(page) : reference(page)],
        people: people ?? [],
        ...(endYear !== undefined
          ? {
              endYear,
              dateLabel: `${year}—${endYear}年`,
              dateNote: dateNote ?? '年份标示文中过程的观察区间，不表示各地活动同时开始或结束。',
            }
          : {}),
        ...(dateNote ? { dateNote } : {}),
        locationNote:
          '坐标为文中城市或区域的阅读参照；跨地区活动、制度实施与作品传播不限于此，也不据此推定个人到访。',
      }),
    ),
  )
}
export type PersonRow = [
  id: string,
  name: string,
  birth: number | null,
  death: number | null,
  role: string,
  summary: string,
  text: string,
  page: string,
  aliases?: string[],
]
export function persons(data: PersonRow[], chinese = false) {
  return makePeople(
    data.map(([id, name, birth, death, role, summary, text, page, aliases]): PersonDraft => ({
      id: `exp-em-${id}`,
      name,
      birth,
      death,
      role,
      summary,
      text,
      sources: [chinese ? chineseReference(page) : reference(page)],
      aliases,
    })),
  )
}
