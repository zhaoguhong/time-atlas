import type { JourneyNode, PersonJourney } from '../types'
import { bookSource, webSource } from './expansion-kit'

const simaPreface = (note: string) => bookSource('史記', '130', `《太史公自序》。${note}`)
const simaDating = webSource(
  '陕西师范大学档案馆 · 《风追司马 史记千秋》',
  'https://archives.snnu.edu.cn/info/2294/13939.htm',
  '见受访学者对前145年与前135年两种生年说及其史料依据的讨论。',
)
const shaanxiChronology = webSource(
  '《陕西省志》相关纪事 · 司马迁南游',
  'https://dfz.shaanxi.gov.cn/zslm/fzzlk/xbsxsz/szdylpdf/201404/P020240923619800839565.pdf',
  '见司马迁条，以元朔三年（前126）作为二十岁起游年份。',
)
const earlyTravelDate =
  '《太史公自序》记「二十而南游」，各站未逐年记载。地图用地方志所取前126年标示这段行迹，司马迁生年另有前135年等说。'

export const beagleDiary = webSource(
  '达尔文《小猎犬号日记》手稿转录',
  'https://darwin-online.org.uk/content/contentblock?basepage=1&itemID=EH88202366&viewtype=text',
  'Darwin Online，Kees Rookmaaker 与 John van Wyhe 校录。',
)
export const beagleItinerary = webSource(
  'Darwin Online · Kees Rookmaaker 整理的达尔文航行日程',
  'https://darwin-online.org.uk/converted/Ancillary/Rookmaaker_Beagle_Itinerary_A575.html',
  '逐日核对船只泊地、本人上岸及地名比定。',
)

const sima = (
  key: string,
  year: number,
  title: string,
  location: string,
  coordinates: JourneyNode['coordinates'],
  summary: string,
  evidence: string,
  locationNote: string,
  dateNote?: string,
): JourneyNode => ({
  id: `simaqian-${key}`,
  year,
  title,
  location,
  coordinates,
  kind: '到访',
  summary,
  sources: [simaPreface(evidence), ...(year === -126 ? [shaanxiChronology, simaDating] : [])],
  locationNote,
  dateNote,
})

const beagle = (
  key: string,
  year: number,
  date: string,
  location: string,
  coordinates: JourneyNode['coordinates'],
  title: string,
  summary: string,
  kind: JourneyNode['kind'] = '到访',
): JourneyNode => ({
  id: `darwin-beagle-${key}`,
  year,
  title,
  location,
  coordinates,
  kind,
  summary,
  sources: [{ ...beagleDiary, note: `${beagleDiary.note}见${date}日记。` }, beagleItinerary],
  dateNote: date,
  locationNote: '坐标为日记所述港湾或陆上观察区域的阅读参照，点间连线只表示入选记录的先后。',
})

export const researcherJourneys: PersonJourney[] = [
  {
    personId: 'simaqian',
    introduction:
      '这组行迹取自司马迁自己的叙述，先读二十岁出游时的几个地区，再读奉使归来与父亲相见的记录。早年行旅只留下地名和大致次序，图上统一采用前126年这一编年方案，不能据坐标复原每一段路或断定他整年都在这些地方。',
    nodes: [
      sima(
        'kuaiji',
        -126,
        '到会稽考察禹的遗迹',
        '会稽山一带 · 今浙江绍兴',
        [120.64, 29.96],
        '经过江、淮之后，司马迁登会稽，访寻与禹相传有关的遗迹。他把访古与山川见闻写进了自己的行旅记述。',
        '见二十而南游一段的江淮、会稽与禹穴。',
        '取会稽山附近定位，传说所指禹穴不据此确定。',
        earlyTravelDate,
      ),
      sima(
        'jiuyi',
        -126,
        '到九疑山一带访古',
        '九疑山一带 · 今湖南宁远',
        [111.96, 25.36],
        '《太史公自序》在会稽之后提到九疑山。史书中的九疑又与舜的传说相连，这里呈现自叙确认的到访区域。',
        '见二十而南游一段的九疑山。',
        '取九疑山区为参照，原文未给出所登山峰与路径。',
        earlyTravelDate,
      ),
      sima(
        'yuan-xiang',
        -126,
        '泛舟沅、湘',
        '沅湘水系 · 今湖南洞庭湖区域',
        [112.56, 29.12],
        '离开九疑山的叙述之后，司马迁写自己浮行沅、湘。具体在哪里登舟、在两条水系停过哪些地方，自序没有逐一记下。',
        '见「浮於沅、湘」一语。',
        '坐标放在沅水、湘水共同汇向的洞庭湖区域，不将湖中点标作实际泊地。',
        earlyTravelDate,
      ),
      sima(
        'zou-lu',
        -126,
        '到齐鲁访学，在邹峄观习礼射',
        '邹、峄一带 · 今山东邹城',
        [116.99, 35.35],
        '他北渡汶、泗，在齐鲁访学，考察孔子遗风。自序还把邹、峄和乡射联系起来，留下这段行程比单列地名更具体的记载。',
        '见北涉汶、泗、齐鲁讲业和邹、峄乡射。',
        '以邹城一带标示，齐鲁访学范围大于这一点。',
        earlyTravelDate,
      ),
      sima(
        'pengcheng',
        -126,
        '经彭城等地返回',
        '彭城一带 · 今江苏徐州',
        [117.19, 34.26],
        '司马迁记自己在鄱、薛、彭城一带遇到困顿，后来经过梁、楚返回。记述没有说明遇困的原因，也没有给出逐城日期。',
        '见鄱、薛、彭城及过梁、楚而归段。',
        '坐标代表彭城，其他古地名及路线不据此比定。',
        earlyTravelDate,
      ),
      sima(
        'heluo',
        -110,
        '奉使归来，在河洛见父',
        '河洛之间 · 今河南洛阳及附近',
        [112.45, 34.62],
        '司马迁奉使西南回程，在河洛见到病中的父亲司马谈。自序把父亲未能参与泰山封禅与这次会面连在一起，并记下父亲托付修史的遗愿。',
        '见奉使西南、是岁初封及「見父於河洛之閒」段。',
        '自序只把会面地点定在河洛之间，洛阳坐标为区域参照。',
        '以汉武帝首次泰山封禅的元封元年（前110）系年。',
      ),
    ],
  },
  {
    personId: 'category-person-darwin',
    introduction:
      '从普利茅斯启程到加拉帕戈斯群岛，这组记录选取达尔文在小猎犬号航行前段亲历的停靠和考察。他在不同地方注意的对象各有不同，既观察岩层和海岸，也采集生物。本文只绘至1835年加拉帕戈斯考察，舰船后来还横渡太平洋，1836年回到英国。',
    nodes: [
      beagle(
        'plymouth',
        1831,
        '1831年12月27日',
        '普利茅斯港 · 英国',
        [-4.15, 50.35],
        '随小猎犬号离开普利茅斯',
        '在此前出航受天气阻碍后，达尔文登船随菲茨罗伊船长从普利茅斯启航。船队此行主要承担海岸测绘，达尔文另做博物考察。',
        '出行',
      ),
      beagle(
        'praia',
        1832,
        '1832年1月16—17日',
        '普拉亚 · 佛得角圣地亚哥岛',
        [-23.51, 14.91],
        '在圣地亚哥岛观察火山岩和海岸',
        '小猎犬号在普拉亚湾停泊。达尔文上岸考察火山岩，也注意到海岸附近的生物与不同岩层的关系。',
      ),
      beagle(
        'salvador',
        1832,
        '1832年2月29日',
        '巴伊亚港 · 今巴西萨尔瓦多',
        [-38.51, -12.97],
        '在巴伊亚上岸考察热带森林',
        '达尔文第一次在巴伊亚停留时进入热带林地，记下当地植被的密度、攀援植物和花木。他随后在巴西其他地点继续采集观察。',
      ),
      beagle(
        'falkland',
        1833,
        '1833年3月1日',
        '东福克兰岛（索莱达岛） · 伯克利海峡一带',
        [-58.18, -51.55],
        '随船到福克兰群岛考察',
        '小猎犬号进入伯克利海峡，达尔文记下海湾和岛上的地貌。停留期间，他在当地调查岩石和生物，日记随后记录了找到化石的经历。',
      ),
      beagle(
        'valdivia',
        1835,
        '1835年2月20日',
        '瓦尔迪维亚附近 · 智利',
        [-73.24, -39.82],
        '在瓦尔迪维亚一带经历地震',
        '达尔文在瓦尔迪维亚附近的树林里感到地面摇动。随后航至康塞普西翁一带时，他又调查倒塌和海岸变化，将所见同当地人的叙述比较。',
      ),
      beagle(
        'san-cristobal',
        1835,
        '1835年9月16—17日',
        '圣克里斯托瓦尔岛 · 厄瓜多尔加拉帕戈斯群岛',
        [-89.59, -0.89],
        '在加拉帕戈斯登上圣克里斯托瓦尔岛',
        '在当时英语称为查塔姆岛的圣克里斯托瓦尔岛，达尔文观察火山地形与植被，随后在群岛不同岛屿采集。由这些标本提出的演化问题还要经过返英后的比较研究。',
      ),
    ],
  },
]
