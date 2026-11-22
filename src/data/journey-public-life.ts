import type { JourneyNode, PersonJourney } from '../types'
import { bookSource, webSource } from './expansion-kit'

const zhangHistory = (note: string) => bookSource('史記', '123', `《大宛列传》。${note}`)
const zhangGeography = webSource(
  '中国人民大学清史研究所 · 历史地理：张骞两次出使考',
  'https://iqh.ruc.edu.cn/old/zglsdlyj/lsdl_lzjj/xqzmddlyj/dded866f7c324445a702a1994a308e2b.htm',
  '见亲至诸国与传闻诸国的区分，以及第二次出使前119年起、前115年归汉的通行编年。',
)
const zhangDaxia = webSource(
  '西北大学丝绸之路研究院 · 《西域研究》2026年第1期相关研究',
  'https://imes.nwu.edu.cn/patiyadongfangzhanzheng.pdf',
  '以约前128年抵月氏王庭为中亚段时间参照。见康居、阿姆河北岸大月氏与南岸大夏的讨论。',
)
const firstMissionDate =
  '确切到访年未见于《史记》。采用前128年抵月氏王庭的一种考定作为中亚段时间参照，四条记录按传文顺序排列。'

export const douglassChronology = webSource(
  '美国国家公园管理局 · 弗雷德里克·道格拉斯生平纪事',
  'https://www.nps.gov/frdo/learn/kidsyouth/chronology.htm',
  '见逐年迁居、演说、办报等记录。',
)
export const northStarIssue = webSource(
  '美国国会图书馆 · 《北极星报》1847年12月3日创刊号',
  'https://www.loc.gov/item/sn84026365/1847-12-03/ed-1/',
  '见罗切斯特出版地、创刊日期和原报扫描。',
)
const douglassPapers = webSource(
  '美国国会图书馆 · Frederick Douglass Papers 档案目录与年表',
  'https://tile.loc.gov/storage-services/service/gdc/gdcfindingaidpdfs/ms000009/ms000009.pdf',
  'Biographical Note 按年核对迁居、反奴隶制大会、巡讲与办报。',
)

const nightingaleMuseum = webSource(
  '伦敦弗洛伦斯·南丁格尔博物馆 · 南丁格尔生平',
  'https://www.florence-nightingale.co.uk/about-florence-nightingale/',
  '核对德国受训、伦敦哈利街任职、战时赴奥斯曼帝国等阶段。',
)
const nightingaleScutari = webSource(
  '英国国家档案馆 · Florence Nightingale',
  'https://www.nationalarchives.gov.uk/education/resources/florence-nightingale/',
  '见1854年11月4日与护理队抵达斯库台及医院记录。',
)
const nightingaleCrimea = webSource(
  '惠康收藏 · 南丁格尔在克里米亚战争期间致比特森的书信',
  'https://content.www.wellcomecollection.org/works/tjqq6j65',
  '档案RAMC/902，见克里米亚期间的通信与护理人员的住宿安排。',
)
const nightingaleBiography = webSource(
  '惠康收藏 · Edward Cook《南丁格尔传》年表',
  'https://preview.wellcomecollection.org/works/gvb7d7cz/items?canvas=518&manifest=2&page=87&shouldScrollToCanvas=true',
  '见1855年及1856年赴克里米亚、从斯库台返英与后续行迹。',
)

type SourcedStop = Omit<JourneyNode, 'id'> & { key: string }

function sourcedJourney(
  personId: string,
  introduction: string,
  stops: SourcedStop[],
): PersonJourney {
  return {
    personId,
    introduction,
    nodes: stops.map(({ key, ...stop }) => ({ ...stop, id: `${personId}-${key}` })),
  }
}

export const publicLifeJourneys: PersonJourney[] = [
  sourcedJourney(
    'zhangqian',
    '两次出使的记录依据《史记·大宛列传》。首次西行取传文明确说张骞亲至的地区，第二次只绘他本人到乌孙及归汉的记录。许多地点只能定位到古国或河谷的范围，图上连线用于阅读先后。',
    [
      {
        key: 'first-departure',
        year: -138,
        kind: '出行',
        title: '奉汉廷命令出使月氏',
        location: '长安一带 · 今陕西西安',
        coordinates: [108.94, 34.26],
        summary:
          '汉廷希望与西迁月氏建立联系，张骞应募出使。使团经陇西出境后遭匈奴扣留，前半程原路线难以复原。',
        dateNote: '沿用本站事件的前138年约略编年。《史记》仅记建元年间，另有前139年说。',
        locationNote: '地图取汉廷所在的长安为出使起点，具体出塞路线另考。',
        sources: [zhangHistory('篇首建元中招募使者、从陇西出发及被扣留段。'), zhangGeography],
      },
      {
        key: 'dayuan',
        year: -128,
        kind: '到访',
        title: '抵达大宛，得到继续西行的协助',
        location: '大宛 · 今费尔干纳盆地一带',
        coordinates: [71.78, 40.43],
        summary: '张骞摆脱扣留后西行到大宛。大宛一方希望同汉交往，安排向导把他转送康居。',
        dateNote: firstMissionDate,
        locationNote: '以费尔干纳盆地作古大宛的区域参照，无法确定会见城址。',
        sources: [zhangHistory('西走至大宛、大宛派人导送康居段。'), zhangGeography, zhangDaxia],
      },
      {
        key: 'kangju',
        year: -128,
        kind: '到访',
        title: '经康居转往大月氏',
        location: '康居 · 锡尔河流域一带',
        coordinates: [68.1, 41.61],
        summary: '《史记》明确记张骞到康居，由康居再转送大月氏。传文没有记下在康居停留的城邑。',
        dateNote: firstMissionDate,
        locationNote: '取锡尔河流域内的一处区域参照，不据此认定康居王庭的位置。',
        sources: [
          zhangHistory('「抵康居，康居传致大月氏」及其后地理条。'),
          zhangGeography,
          zhangDaxia,
        ],
      },
      {
        key: 'yuezhi',
        year: -128,
        kind: '到访',
        title: '抵达大月氏，交涉合作未成',
        location: '大月氏 · 阿姆河北岸一带',
        coordinates: [67.48, 37.45],
        summary:
          '张骞见到大月氏一方。传文解释，他们已在新的地方安顿，无意按汉廷原设想再与匈奴开战。',
        dateNote: firstMissionDate,
        locationNote: '以阿姆河北岸代表接触区域，具体会面地点和王庭范围未据此确定。',
        sources: [zhangHistory('大月氏新王与居媯水北、无报匈奴意的记述。'), zhangDaxia],
      },
      {
        key: 'daxia',
        year: -128,
        kind: '到访',
        title: '从大月氏到大夏，见到从远方贩来的蜀物',
        location: '大夏 · 阿姆河南岸巴克特里亚一带',
        coordinates: [66.92, 36.8],
        summary:
          '张骞在大夏见到蜀布和邛竹杖，向当地人询问来源。据报告他从商旅口中获知这些物品经身毒一带运来。',
        dateNote: firstMissionDate,
        locationNote: '以阿姆河南岸古巴克特里亚的区域作参照，传文未定具体市场的位置。',
        sources: [zhangHistory('「骞从月氏至大夏」及臣在大夏时见蜀布等报告。'), zhangDaxia],
      },
      {
        key: 'first-return',
        year: -126,
        kind: '到访',
        title: '回到长安，报告所见与所闻',
        location: '长安一带 · 今陕西西安',
        coordinates: [108.94, 34.26],
        summary:
          '回程再遇匈奴扣留。张骞脱身归汉后报告沿途亲历，并转述向当地人打听到的邻近诸国情况。',
        dateNote: '沿用元朔三年（前126年）归汉的编年。',
        locationNote: '用汉廷所在的长安为归报地点参照。',
        sources: [
          zhangHistory('首次还汉及大宛、大月氏、大夏、康居等报告段。'),
          webSource(
            '陕西师范大学 · 张骞生平',
            'https://lishiwenhua.snnu.edu.cn/info/1901/19231.htm',
            '见元朔三年归汉纪年。',
          ),
        ],
      },
      {
        key: 'wusun',
        year: -119,
        kind: '到访',
        title: '第二次出使，在乌孙会见昆莫',
        location: '乌孙 · 伊犁河与天山北麓一带',
        coordinates: [79.4, 43.79],
        summary:
          '张骞向乌孙王转达汉廷的提议。乌孙权力分置，交涉未立即达成原定安排。前往其他诸国的人另有持节副使。',
        dateNote: '以第二次出使通常所取的元狩四年（前119年）作为该段时间锚点，乌孙会面确年未明。',
        locationNote: '地图标示乌孙活动范围的一处参照，王廷位置和沿途线路仍有考订。',
        sources: [zhangHistory('「骞既至乌孙」、与昆莫交涉和分遣副使段。'), zhangGeography],
      },
      {
        key: 'second-return',
        year: -115,
        kind: '到访',
        title: '自乌孙归汉，与随行乌孙使者同行',
        location: '长安一带 · 今陕西西安',
        coordinates: [108.94, 34.26],
        summary: '乌孙派人送张骞回汉，也派出本国使者和马匹。使者考察汉朝后返国，双方往来继续。',
        dateNote: '采用元鼎二年（前115年）归汉的通行考定。',
        locationNote: '以汉廷所在地表示回程终点。',
        sources: [zhangHistory('乌孙发导译送还、使者见汉人众富厚段。'), zhangGeography],
      },
    ],
  ),
  sourcedJourney(
    'region-person-douglass',
    '从脱离奴役、迁居新贝德福德，到巡回演讲和办报，这组记录选取道格拉斯本人有文献支持的活动。抵达、著作出版与正式任职均按各自记录定位。',
    [
      {
        key: 'new-york',
        year: 1838,
        kind: '到访',
        title: '脱离奴役后抵达纽约，与安娜结婚',
        location: '纽约市 · 美国',
        coordinates: [-74.0, 40.72],
        summary: '道格拉斯从马里兰州向北脱离奴役。安娜·默里与他在纽约会合，两人在9月15日结婚。',
        dateNote: '1838年9月抵达，9月15日结婚。',
        locationNote: '以纽约市一带标示，不认定逃亡经过的具体路线。',
        sources: [douglassChronology, douglassPapers],
      },
      {
        key: 'new-bedford',
        year: 1838,
        kind: '居住',
        title: '迁居新贝德福德，做港口工人',
        location: '新贝德福德 · 美国马萨诸塞州',
        coordinates: [-70.93, 41.64],
        summary:
          '两人到新贝德福德定居。他在当地谋生并采用道格拉斯这个姓氏，后来参加当地反奴隶制活动。',
        dateNote: '据美国国家公园管理局生平纪事，9月18日抵达。',
        locationNote: '以新贝德福德港口城市为参照，居住与工作地点并非一处。',
        sources: [douglassChronology, douglassPapers],
      },
      {
        key: 'nantucket',
        year: 1841,
        kind: '到访',
        title: '在楠塔基特的反奴隶制大会上发言',
        location: '楠塔基特岛 · 美国马萨诸塞州',
        coordinates: [-70.1, 41.28],
        summary:
          '道格拉斯在会上谈自己的经历。与会反奴隶制人士随后邀请他受聘演讲，他得以到更多地方向听众讲述奴役生活。',
        dateNote: '取1841年8月，回忆录与后编年表对具体日子表述不同。',
        locationNote: '标示楠塔基特镇一带，未定位会场门牌。',
        sources: [
          douglassChronology,
          webSource(
            '弗雷德里克·道格拉斯 · 1845年《自传》初版扫描',
            'https://web.english.upenn.edu/~cavitch/pdf-library/Douglass_Narrative_1845_edition.pdf',
            '见正文末自述出席楠塔基特反奴隶制大会。',
          ),
        ],
      },
      {
        key: 'dublin',
        year: 1845,
        kind: '到访',
        title: '到都柏林演说并安排自传重印',
        location: '都柏林 · 爱尔兰',
        coordinates: [-6.26, 53.35],
        summary:
          '道格拉斯赴不列颠群岛巡回演说。9月从都柏林写信给加里森，谈到自传在当地出版。他随后也在爱尔兰其他城市演讲。',
        dateNote: '1845年8月底到爱尔兰，9月16日书信署地都柏林。',
        locationNote: '取都柏林市为参照，书信没有给出其余活动的全部地点。',
        sources: [
          douglassChronology,
          webSource(
            '美国国会图书馆 · 道格拉斯通信，1845年9月16日',
            'https://www.loc.gov/resource/mss11879.03001/?sp=2&st=list',
            '目录第31幅，手稿署地 Dublin，写到《自传》在当地出版。',
          ),
        ],
      },
      {
        key: 'rochester',
        year: 1847,
        kind: '居住',
        title: '在罗切斯特创办《北极星报》',
        location: '罗切斯特 · 美国纽约州',
        coordinates: [-77.61, 43.16],
        summary:
          '返美后，道格拉斯迁居罗切斯特并创办《北极星报》。创刊号在12月3日出版，报纸成为他长期参与反奴隶制政治的媒介。',
        dateNote: '1847年12月3日为报纸首期日期。',
        locationNote: '用罗切斯特市代表编辑、印刷和居住所在区域。',
        sources: [douglassChronology, northStarIssue],
      },
      {
        key: 'washington',
        year: 1872,
        kind: '居住',
        title: '举家迁居华盛顿',
        location: '华盛顿哥伦比亚特区 · 美国',
        coordinates: [-77.01, 38.89],
        summary:
          '罗切斯特的家失火后，道格拉斯举家迁到华盛顿。几年后他又搬入同城安纳科斯蒂亚的雪松山住宅。',
        dateNote: '1872年7月迁居，雪松山购置另据1878年记录。',
        locationNote: '标示迁入的华盛顿市区，未将两处住宅合为同址。',
        sources: [douglassChronology, douglassPapers],
      },
    ],
  ),
  sourcedJourney(
    'exp-em-nightingale',
    '这一段以护理学习、医院任职和克里米亚战争中的亲历为线索。节点依据博物馆生平、医院来源及早期传记，日期采用材料明确的范围。',
    [
      {
        key: 'kaiserswerth',
        year: 1851,
        kind: '到访',
        title: '在凯泽斯韦特接受护理训练',
        location: '凯泽斯韦特 · 今德国杜塞尔多夫',
        coordinates: [6.74, 51.3],
        summary:
          '南丁格尔到莱茵河畔的凯泽斯韦特学习病人护理，接触医院内分配工作和训练护理人员的办法。',
        locationNote: '标示凯泽斯韦特城镇，学习与居住的房舍不逐一标记。',
        sources: [nightingaleMuseum],
      },
      {
        key: 'harley-street',
        year: 1853,
        kind: '任职',
        title: '到伦敦哈利街医院主持院务',
        location: '哈利街 · 英国伦敦',
        coordinates: [-0.15, 51.52],
        summary: '南丁格尔开始在哈利街一所为患病妇女提供照料的医院负责管理，处理病房运行和护理。',
        locationNote: '坐标定位哈利街一带。',
        sources: [nightingaleMuseum],
      },
      {
        key: 'scutari',
        year: 1854,
        kind: '到访',
        title: '带护理队抵达斯库台医院',
        location: '斯库台 · 今土耳其伊斯坦布尔于斯屈达尔',
        coordinates: [29.02, 41.0],
        summary: '她与护理人员抵达奥斯曼帝国，安排战时军事医院中的护理以及衣物、饮食等供给。',
        dateNote: '英国国家档案馆以1854年11月4日记抵达。',
        locationNote: '标示斯库台军营医院附近区域，战事在海峡以北等地展开。',
        sources: [nightingaleScutari, nightingaleMuseum],
      },
      {
        key: 'balaclava',
        year: 1855,
        kind: '到访',
        title: '到巴拉克拉瓦了解前线医院',
        location: '巴拉克拉瓦港一带 · 克里米亚半岛',
        coordinates: [33.6, 44.5],
        summary:
          '南丁格尔从斯库台前往克里米亚，查看军事医院的护理安排。存世书信显示，人员如何安置和各机构的职责都是实际问题。',
        dateNote: '取1855年5月首次赴克里米亚，后来另有到访。',
        locationNote: '以巴拉克拉瓦港为区域参照，日程所及医院并非集中于同一坐标。',
        sources: [nightingaleBiography, nightingaleCrimea],
      },
      {
        key: 'lea-hurst',
        year: 1856,
        kind: '居住',
        title: '战后回到德比郡的家',
        location: '利赫斯特 · 英国德比郡',
        coordinates: [-1.49, 53.09],
        summary:
          '克里米亚战争结束后，南丁格尔从斯库台返英，回到德比郡旧居。医院运行和卫生的许多问题，此后转入报告、统计和改革讨论。',
        dateNote: '取1856年8月返抵利赫斯特。',
        locationNote: '地图采用德比郡利赫斯特宅邸一带。',
        sources: [
          nightingaleBiography,
          webSource(
            '惠康收藏 · Marion Holmes《南丁格尔小传》',
            'https://wellcomecollection.org/works/uv8bkctt/items?canvas=19&page=4&shouldScrollToCanvas=true',
            '见1856年8月8日到利赫斯特的记述。',
          ),
        ],
      },
    ],
  ),
]
