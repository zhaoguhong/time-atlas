import { bookSource, makeEvents, makePeople, webSource } from './expansion-kit'
import type { Category, HistoryEvent } from '../types'

const sites: Record<string, [string, [number, number]]> = {
  changan: ['长安一带', [108.94, 34.26]],
  luoyang: ['洛阳一带', [112.45, 34.62]],
  kaifeng: ['开封一带', [114.31, 34.8]],
  nanjing: ['建康、金陵一带', [118.78, 32.05]],
  chengdu: ['成都平原', [104.07, 30.67]],
  hangzhou: ['杭州一带', [120.15, 30.27]],
  beijing: ['燕京、大都一带', [116.4, 39.9]],
  qufu: ['鲁地、曲阜一带', [116.99, 35.59]],
  linzi: ['齐地临淄', [118.3, 36.81]],
  handan: ['邯郸一带', [114.49, 36.61]],
  ying: ['楚地江陵一带', [112.2, 30.33]],
  wuwei: ['河西武威一带', [102.64, 37.93]],
  dunhuang: ['敦煌一带', [94.66, 40.14]],
  yicheng: ['襄阳一带', [112.14, 32.04]],
  yangzhou: ['扬州一带', [119.42, 32.4]],
  suzhou: ['苏州一带', [120.59, 31.3]],
  guangzhou: ['广州一带', [113.26, 23.13]],
  quanzhou: ['泉州一带', [118.68, 24.87]],
  taiyuan: ['太原一带', [112.55, 37.87]],
  datong: ['平城一带', [113.3, 40.08]],
  ye: ['邺城一带', [114.6, 36.3]],
  shouxian: ['寿春一带', [116.79, 32.57]],
  gusu: ['吴地、苏州一带', [120.59, 31.3]],
  shangqiu: ['宋地商丘', [115.65, 34.45]],
  xianyang: ['咸阳一带', [108.7, 34.34]],
  jinan: ['济南一带', [117.12, 36.65]],
  huzhou: ['湖州一带', [120.09, 30.89]],
  xuancheng: ['宣城一带', [118.76, 30.95]],
  fuzhou: ['福州一带', [119.3, 26.08]],
  yuezhou: ['越州、绍兴一带', [120.58, 30.0]],
  jiangzhou: ['江州、九江一带', [115.99, 29.71]],
  jizhou: ['吉州一带', [114.99, 27.11]],
  zhengzhou: ['郑州一带', [113.63, 34.75]],
  xuzhou: ['徐州一带', [117.28, 34.2]],
  weihui: ['汲郡一带', [114.06, 35.4]],
  linfen: ['平阳一带', [111.52, 36.09]],
  xining: ['湟水流域', [101.78, 36.62]],
  dali: ['大理一带', [100.23, 25.6]],
  kuizhou: ['夔州、奉节一带', [109.46, 31.02]],
  yongzhou: ['永州一带', [111.61, 26.42]],
  nanchang: ['洪州、滕王阁一带', [115.89, 28.69]],
  chaozhou: ['潮州韩江', [116.65, 23.66]],
  suizhou: ['随州曾侯乙墓一带', [113.38, 31.72]],
}
type ER = [
  string,
  number,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string[]?,
  number?,
]
type PR = [string, string, number | null, number | null, string, string, string, string]
const category: Record<string, Category> = { P: '政治', S: '社会', C: '文化', W: '战争', X: '交流' }
const eventMetadata: Record<
  string,
  Pick<HistoryEvent, 'dateLabel' | 'dateNote' | 'peopleNotes'>
> = {
  qimin: {
    dateLabel: '约530—550年',
    dateNote:
      '此区间用于表示《齐民要术》通常讨论的六世纪上半叶编撰阶段，确切成书年尚不确定；不是贾思勰的生卒区间或逐年活动记录。',
    peopleNotes: {
      q6697537:
        '贾思勰以《齐民要术》编撰者身份关联。作品形成阶段不能据以推定其生卒、每年活动或到访此处，也不构成人物年谱。',
    },
  },
  'jinghao-landscape': {
    dateLabel: '约900—930年',
    dateNote:
      '此区间是荆浩相关山水绘画与画论传统的约略形成阶段，不是已确定的《笔法记》写作起止年；文本归属、具体成书年及作者生平仍有不确定性。',
    peopleNotes: {
      q2665475:
        '荆浩以山水画家及传为其所作画论的论述者身份关联。约略作品阶段不能据以推定其生卒、逐年活动或到访此处，也不构成人物年谱。',
    },
  },
}
const external = {
  '@zeng-bells': webSource(
    '湖北省博物馆 · 曾侯乙编钟',
    'https://hbww.org.cn/zgzb/p/4695.html',
    '馆藏编钟、钟架及楚惠王赠钟说明；前433年作为墓葬时代参照，不认定整套编钟均在同年铸成。',
  ),
  '@qianli': webSource(
    '故宫博物院 · 王希孟千里江山图卷',
    'https://www.dpm.org.cn/collection/paint/228354.html',
    '画卷及蔡京题跋、作者资料；不采用无据的早逝传闻。',
  ),
  '@qingming': webSource(
    '故宫博物院 · 张择端清明上河图卷',
    'https://www.dpm.org.cn/collection/paint/228226.html',
    '馆藏图像、作者与城市空间说明，具体作年取北宋末阶段。',
  ),
  '@ruihe': webSource(
    '上海博物馆 · 瑞鹤图卷赵佶',
    'https://www.shanghaimuseum.net/mu/frontend/pg/article/id/P00002782',
    '借展辽宁省博物馆藏卷的说明，列1112年与题记。',
  ),
  '@litang': webSource(
    '台北故宫博物院 · 宋李唐万壑松风图轴',
    'https://digitalarchive.npm.gov.tw/Collection/Detail/33?dep=P',
    '馆藏款署列宣和甲辰春，即1124年。',
  ),
}
const directoryVolumes = new Set([
  '文選',
  '高僧傳',
  '洛陽伽藍記',
  '齊民要術',
  '出三藏記集',
  '博物志',
])
function sources(reference: string) {
  return reference.split('|').map((item) => {
    if (item in external) return external[item as keyof typeof external]
    const [name, volume = '', note] = item.split(':')
    const description = note ?? '据原典相关篇章编写；本批沿用出处，未逐条重新抓取校勘。'
    if (directoryVolumes.has(name) && volume)
      return bookSource(
        name,
        '',
        `原典${/^\d/.test(volume) ? '卷' : '篇目'}${volume}，从所链接的全书目录定位；${description}`,
      )
    if (name === '漢書' && ['19上', '21上'].includes(volume))
      return bookSource(
        name,
        '',
        `卷${volume}·${volume === '19上' ? '百官公卿表上（刺史设置）' : '律历志上（新朝度量衡）'}，从全书目录定位；${description}`,
      )
    return /^\d/.test(volume) || !volume
      ? bookSource(name, volume, description)
      : bookSource(name, '', `${volume}；${description}`)
  })
}
export function earlyEvents(rows: ER[]) {
  return makeEvents(
    'china',
    rows.map(([id, year, title, tags, site, reference, summary, text, impact, people, endYear]) => {
      const [kind, ...themes] = tags.split('/')
      return {
        id: `early-plus-${id}`,
        year,
        title,
        category: category[kind],
        themes,
        place: sites[site],
        summary,
        text,
        impact,
        sources: sources(reference),
        people,
        ...(endYear === undefined
          ? {}
          : {
              endYear,
              dateLabel: `${year < 0 ? '前' + -year : year}—${endYear < 0 ? '前' + -endYear : endYear}年`,
              dateNote: '此为文献活动或作品形成的大致阶段，起止年不代表同一天发生的单次事件。',
            }),
        locationNote:
          '坐标为所述政治、生产或知识活动的地域参照；涉及多地时不据此限定全部活动范围。',
        ...eventMetadata[id],
      }
    }),
  )
}
export function earlyPeople(rows: PR[]) {
  return makePeople(
    rows.map(([id, name, birth, death, role, reference, summary, text]) => ({
      id: `early-plus-person-${id}`,
      name,
      birth,
      death,
      role,
      summary,
      text,
      sources: sources(reference),
      era: '中国古代',
    })),
  )
}
