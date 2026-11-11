import type { Source } from '../types'
import { expandedJourneys } from './journey-expansion'
import { voyageJourneys } from './journey-voyages'

export type RouteCoordinate = [number, number]
export interface TopicRouteStop {
  id: string
  name: string
  coordinates: RouteCoordinate
  dateLabel: string
  text: string
  sources: Source[]
  /** Geographic drawing guides, not attested stopping places. */
  via?: RouteCoordinate[]
}
export interface TopicRoute {
  id: string
  name: string
  period: string
  note: string
  stops: TopicRouteStop[]
  sources: Source[]
}
export const voyageSources = {
  atlantic: {
    title: 'OpenStax · World History, Volume 2, §5.2 Crossing the Atlantic',
    url: 'https://openstax.org/books/world-history-volume-2/pages/5-2-crossing-the-atlantic',
  },
  columbusJournal: {
    title: '哥伦布首次航行日记及书信 · 1492—1493',
    url: 'https://www.gutenberg.org/files/18571/18571-h/18571-h.htm',
    note: 'The Northmen, Columbus and Cabot, 985–1503（1906年编译本）中首次航行日记；原日记以拉斯·卡萨斯节录本传世，路线参照8月3日、10月12日及1493年2—3月条。',
  },
  pigafettaReturn: {
    title: '皮加费塔《首次环球航行记》· 返航部分',
    url: 'https://www.gutenberg.org/files/47927/47927-h/47927-h.htm',
    note: 'The Philippine Islands, vol. XXXIV，续记帝汶、印度洋、好望角与1522年返抵西班牙。',
  },
  tainoLegacy: {
    title: '美国国家公园管理局 · The Taíno Legacy Lives On',
    url: 'https://www.nps.gov/places/the-ta%C3%ADno-legacy-lives.htm',
  },
  columbus: {
    title: '美国国会图书馆 · 1492: Christopher Columbus',
    url: 'https://www.loc.gov/exhibits/1492/columbus.html',
  },
  taino: {
    title: '美国国会图书馆 · Columbus and the Taíno',
    url: 'https://wwws.loc.gov/exhibits/exploring-the-early-americas/columbus-and-the-taino.html',
  },
  gama: {
    title: '《达·伽马首次航行日记，1497—1499》',
    url: 'https://www.gutenberg.org/files/46440/46440-h/46440-h.htm',
    note: '随船者记录；E. G. Ravenstein 1898年英译本。路线据正文各港及日期，区别编者注与航海者记述。',
  },
  globe: {
    title: '西班牙国家地理研究所 · 首次环球航行图',
    url: 'https://www.ign.es/web/resources/expo/madrid2019/VueltaMundo_web.pdf',
    note: '1519—1522年主要航段与日期。地图上的虚线仅概括航向，不复制原图或声称精确复原。',
  },
  pigafetta: {
    title: '皮加费塔《首次环球航行记》· 1519—1521年航段',
    url: 'https://www.gutenberg.org/files/42884/42884-h/42884-h.htm',
    note: 'The Philippine Islands, vol. XXXIII，意大利文及1906年英译；文中的宗教奇迹、异域传闻与殖民者称谓不作独立事实使用。',
  },
  archive: {
    title: '西班牙文化部 · 麦哲伦—埃尔卡诺环球航行档案',
    url: 'https://www.cultura.gob.es/cultura/archivos/difusion/registro-memoria-unesco/2023/vuelta-mundo-magallanes-elcano.html',
  },
  zheng: { title: '《明史》卷304 · 郑和传', url: 'https://zh.wikisource.org/wiki/明史/卷304' },
  itinerary: {
    title: '祝允明《前闻记》· 下西洋、人数、里程',
    url: 'https://zh.wikisource.org/wiki/前聞記',
    note: '里程条记宣德五年闰十二月至八年七月的船队日程。使用原历年序，不将原历月份直接改写成公历月份；不视为每位使臣的个人行程。',
  },
  tablet: {
    title: '郑和等《天妃之神灵应记》',
    url: 'https://zh.wikisource.org/wiki/天妃之神靈應記',
    note: '宣德六年长乐碑，追述历次航行、政治使命及候风；神助记载作为信仰材料阅读。',
  },
  silk: { title: 'UNESCO · 丝绸之路长安—天山廊道', url: 'https://whc.unesco.org/en/list/1442/' },
  han: {
    title: '《汉书》卷96上 · 西域传',
    url: 'https://zh.wikisource.org/wiki/漢書/卷096上',
    note: '西域诸国与南北道关系；节点采用今地理区域参照，示意图不表示各时代同时存在的固定驿路。',
  },
} satisfies Record<string, Source>

type StopInput = [string, RouteCoordinate, string, string, RouteCoordinate[]?]
function route(
  id: string,
  name: string,
  period: string,
  note: string,
  sources: Source[],
  inputs: StopInput[],
): TopicRoute {
  return {
    id,
    name,
    period,
    note,
    sources,
    stops: inputs.map(([name, coordinates, dateLabel, text, via], i) => ({
      id: `${id}-${i}`,
      name,
      coordinates,
      dateLabel,
      text,
      sources,
      via,
    })),
  }
}
const schematic =
  '港口坐标是区域参照。虚线表示航段的大致方向，中间折点只为读图，不是额外停靠地，也不是逐日航迹。'
const routes: TopicRoute[] = [
  route(
    'columbus-first',
    '哥伦布第一次横渡大西洋',
    '1492—1493',
    `${schematic}巴哈马首次登陆岛屿的认定仍有争议，图上只定位群岛区域；此图选取主要节点，略去部分沿岸活动。`,
    [
      voyageSources.columbusJournal,
      voyageSources.columbus,
      voyageSources.taino,
      voyageSources.tainoLegacy,
      voyageSources.atlantic,
    ],
    [
      [
        '帕洛斯',
        [-6.89, 37.23],
        '1492年8月',
        '三艘船从伊比利亚半岛南部启航。计划是向西寻找亚洲，并非寻找一个已知存在的美洲大陆。',
      ],
      [
        '加那利群岛',
        [-17.11, 28.09],
        '1492年8—9月',
        '在群岛修整和补给后横渡大西洋。这里的位置便于利用东北信风向西航行。',
      ],
      [
        '巴哈马群岛 · 登陆区域',
        [-74.5, 24],
        '1492年10月',
        '船队抵达有人居住的岛屿。哥伦布称首次登陆岛为圣萨尔瓦多，其与今天哪座岛对应仍有争论。',
      ],
      [
        '古巴东北岸',
        [-75.8, 21.1],
        '1492年10—12月',
        '沿岸航行，寻找想象中的亚洲城市和贸易中心。当地居民有自己的聚落与交通，欧洲人的误认没有改变这些社会的既有生活。',
      ],
      [
        '伊斯帕尼奥拉岛北岸',
        [-72.2, 19.8],
        '1492年12月—1493年1月',
        '圣玛丽亚号搁浅后，部分人员留在岛上。后来的殖民据点建立与暴力征服，从这一接触继续发展。',
      ],
      [
        '亚速尔群岛',
        [-25.1, 36.97],
        '1493年2月',
        '返程先向北进入另一套风带，再横渡大西洋。去程与回程不会简单沿同一条直线往返。',
        [
          [-64, 29],
          [-45, 38],
        ],
      ],
      [
        '里斯本',
        [-9.14, 38.7],
        '1493年3月',
        '返航途中受风暴影响，在葡萄牙停留，随后继续返回西班牙。',
      ],
      [
        '帕洛斯 · 返回',
        [-6.89, 37.23],
        '1493年3月',
        '消息传回王廷，新的远征很快筹备。此次航行建立了持续跨洋往来的起点，却没有实现原先到达亚洲的目标。',
      ],
    ],
  ),
  route(
    'gama-outbound',
    '达·伽马首次赴印度：去程',
    '1497—1498',
    `${schematic}只展示第一次航行的去程，1498—1499年的返程及后续军事远征不混入此线。`,
    [voyageSources.gama],
    [
      [
        '里斯本',
        [-9.14, 38.7],
        '1497年7月',
        '船队受葡萄牙王室派遣出发。迪亚士此前绕过非洲南端，已证明大西洋与印度洋相通。',
      ],
      [
        '佛得角群岛',
        [-23.6, 14.9],
        '1497年7—8月',
        '在圣地亚哥岛补给，随后离开近岸水域。远离岸边的航段有助于避开不利的风与海流。',
      ],
      [
        '好望角外海',
        [18.2, -34.7],
        '1497年11月',
        '经过南大西洋的大幅绕行后抵达非洲南端。逆风曾阻挡绕角，航海日记记下反复出海再靠近陆地的尝试。',
        [
          [-30, -5],
          [-23, -28],
          [5, -35],
        ],
      ],
      [
        '莫桑比克岛',
        [40.74, -15.04],
        '1498年3月',
        '进入东非沿海已有的印度洋贸易社会。船队试图寻求补给与领航，接触也伴随猜疑和冲突。',
        [
          [23, -35],
          [34, -29],
          [39, -20],
        ],
      ],
      [
        '蒙巴萨',
        [39.67, -4.05],
        '1498年4月',
        '在港口寻求接待未能顺利展开，船队继续北航。到达陌生海域并不等于立即取得当地信任。',
      ],
      [
        '马林迪',
        [40.12, -3.22],
        '1498年4月',
        '获得当地支持及领航帮助，随后横渡阿拉伯海。日记没有为领航员提供足以确认身份的证据，不能径直认定为伊本·马吉德。',
      ],
      [
        '古里 · 今科泽科德',
        [75.78, 11.26],
        '1498年5月',
        '抵达印度西海岸贸易港。当地统治者、商人和货物交换早已存在，葡萄牙人必须在这个市场中谈判。',
        [
          [51, 2],
          [63, 8],
        ],
      ],
    ],
  ),
  route(
    'first-circumnavigation',
    '麦哲伦—埃尔卡诺：首次环球航行',
    '1519—1522',
    `${schematic}麦哲伦于1521年在麦克坦战死；之后的线随幸存船员，最后随埃尔卡诺指挥的维多利亚号，绝非麦哲伦个人全程。`,
    [
      voyageSources.pigafetta,
      voyageSources.pigafettaReturn,
      voyageSources.globe,
      voyageSources.archive,
    ],
    [
      [
        '圣卢卡尔',
        [-6.35, 36.78],
        '1519年9月',
        '五艘船离开瓜达尔基维尔河口，试图从西行方向抵达香料群岛。此前在塞维利亚完成组织和出航准备。',
      ],
      [
        '特内里费岛',
        [-16.24, 28.49],
        '1519年9—10月',
        '停靠加那利群岛补给，再沿大西洋向南、向西航行。',
      ],
      [
        '瓜纳巴拉湾 · 今里约热内卢',
        [-43.16, -22.9],
        '1519年12月',
        '在巴西海岸补充食物和水。接下来仍须沿南美东岸寻找通向西侧海洋的出口。',
        [
          [-25, 5],
          [-35, -9],
          [-40, -20],
        ],
      ],
      [
        '拉普拉塔河口',
        [-56, -35],
        '1520年初',
        '宽阔河口曾被探查，然而它没有通向另一片海洋，船队继续南下。',
      ],
      [
        '圣胡利安港',
        [-67.7, -49.3],
        '1520年3—8月',
        '在南半球冬季停留，船队发生叛乱。对指挥权的争夺、物资与恶劣天气共同威胁航行。',
        [
          [-60, -39],
          [-64, -43],
        ],
      ],
      [
        '麦哲伦海峡',
        [-70.8, -53.4],
        '1520年10—11月',
        '终于找到穿过南美南端的水道。已有船只沉没或折返，进入太平洋的只剩三艘。',
        [[-68, -52.5]],
      ],
      [
        '关岛',
        [144.7, 13.4],
        '1521年3月',
        '横渡太平洋远比船员预想漫长，食物匮乏与坏血病造成严重损失。抵达后与当地人发生暴力冲突。',
        [
          [-74, -53],
          [-80, -36],
          [-100, -15],
          [-140, -5],
          [-175, 8],
          [165, 13],
        ],
      ],
      [
        '宿务与麦克坦',
        [123.98, 10.3],
        '1521年4月',
        '麦哲伦卷入当地政治与战争，在麦克坦被杀。航行从此由其他船员继续，不能把后半程仍写成他的经历。',
        [[132, 12]],
      ],
      [
        '蒂多雷 · 马鲁古群岛',
        [127.4, 0.68],
        '1521年11—12月',
        '幸存者抵达丁香产地并装货。两艘船后来分开：特立尼达号尝试向东返航，维多利亚号继续向西。',
        [
          [121, 8],
          [118, 7],
          [116, 6],
          [119, 2],
          [125, 2],
        ],
      ],
      [
        '帝汶岛',
        [124, -9.4],
        '1522年1—2月',
        '维多利亚号补给后进入印度洋。余下路程由埃尔卡诺指挥，船员努力避开葡萄牙控制的港口。',
        [
          [129, -3],
          [128, -8],
        ],
      ],
      [
        '好望角外海',
        [18, -35],
        '1522年5月',
        '长距离横跨印度洋，再绕非洲南端进入大西洋。船上粮食、淡水与人员都已十分紧缺。',
        [
          [110, -15],
          [80, -28],
          [45, -37],
          [25, -36],
        ],
      ],
      [
        '佛得角群岛',
        [-23.6, 14.9],
        '1522年7月',
        '因补给困难冒险停靠葡萄牙控制的群岛，部分船员遭扣留，船只再次驶离。',
        [
          [6, -33],
          [-10, -12],
          [-22, 5],
        ],
      ],
      [
        '圣卢卡尔 · 返回',
        [-6.35, 36.78],
        '1522年9月',
        '维多利亚号回到出发河口，随后抵达塞维利亚。绕地球一周成为实际完成的航程，代价是大量人员死亡与船只损失。',
        [
          [-28, 30],
          [-12, 37],
        ],
      ],
    ],
  ),
  route(
    'zheng-seventh',
    '郑和船队第七次远航：主要行程',
    '1431—1433',
    `${schematic}据《前闻记》“里程”条选取船队主线；不是郑和个人年谱，不包含所有分遣船。年月保留原历说明；锡兰具体泊地不确定。`,
    [voyageSources.itinerary, voyageSources.tablet, voyageSources.zheng],
    [
      [
        '南京龙湾',
        [118.74, 32.09],
        '1431年 · 原历宣德五年闰十二月',
        '奉命出航与出海之间还有长时间的国内集结。原历这一个闰十二月已进入西历1431年。',
      ],
      [
        '刘家港',
        [121.26, 31.5],
        '1431年',
        '在太仓一带集结，碑记回顾历次航行。沿江、沿海的准备也是整个远征的重要部分。',
        [
          [119.5, 32],
          [120.5, 31.9],
        ],
      ],
      [
        '长乐太平港',
        [119.52, 25.96],
        '1431年',
        '船队驻泊候风，留下天妃碑记。冬季东北季风有利于从中国东南沿海向南航行。',
        [
          [122.4, 30],
          [121, 27],
        ],
      ],
      [
        '占城',
        [109.15, 13.9],
        '原历宣德六年十二月',
        '出五虎门后抵占城。坐标取占城沿岸区域参照，不将国家名称当作单一确定港址。',
        [
          [116, 21],
          [111, 16],
        ],
      ],
      [
        '爪哇 · 苏鲁马益',
        [112.74, -7.2],
        '原历宣德七年二月',
        '日程写明抵爪哇苏鲁马益，船队在这里停留数月。远航的时间大部分还包括候风、贸易与外交。',
        [
          [109, 6],
          [108, -2],
          [111, -6],
        ],
      ],
      [
        '旧港 · 今巨港',
        [104.76, -2.99],
        '原历宣德七年六月',
        '经爪哇海前往苏门答腊的旧港。图上只概括海上方向，不复原河口航道。',
        [
          [110, -5],
          [106.5, -3],
        ],
      ],
      [
        '满剌加 · 今马六甲',
        [102.25, 2.19],
        '原历宣德七年七月',
        '马六甲海峡连接南海与印度洋，港口提供会合、补给和交换货物的条件。',
        [
          [105.5, -1],
          [104.3, 1.1],
          [103.5, 1.1],
        ],
      ],
      [
        '苏门答剌 · 今苏门答腊北部',
        [97.2, 5.15],
        '原历宣德七年八月',
        '抵达岛北的苏门答剌国，此名称在这里指具体政权，不能与整座苏门答腊岛混为一谈。',
        [[100, 4]],
      ],
      [
        '锡兰山 · 今斯里兰卡',
        [80, 6],
        '原历宣德七年十一月',
        '跨越孟加拉湾。原文泊地“别罗里”的具体比定存在问题，地图仅取岛屿西南沿岸的区域参照。',
        [
          [88, 5],
          [81, 5.5],
        ],
      ],
      [
        '古里 · 今科泽科德',
        [75.78, 11.26],
        '原历宣德七年十一月',
        '到达印度西海岸贸易港，再向波斯湾口前进。古里也是返程会合的重要节点。',
        [[77, 7]],
      ],
      [
        '忽鲁谟斯',
        [56.47, 27.06],
        '原历宣德七年十二月',
        '抵达波斯湾口的贸易中心。其他船队分支不能因这一主线被省略，就认定没有活动；也不能全部安在郑和本人名下。',
        [
          [66, 18],
          [59, 24],
        ],
      ],
      [
        '古里 · 回程',
        [75.78, 11.26],
        '原历宣德八年三月',
        '日程明确记下回洋后再到古里，随后大队船只向东返回。',
        [
          [59, 24],
          [66, 18],
        ],
      ],
      [
        '苏门答剌 · 回程',
        [97.2, 5.15],
        '原历宣德八年四月',
        '返程再次利用印度洋既有的港口网络。此处省略未列出的中途细节，不推定返航全程沿去程原路。',
        [
          [78, 5],
          [88, 5],
        ],
      ],
      [
        '满剌加 · 回程',
        [102.25, 2.19],
        '原历宣德八年四月',
        '经过海峡继续东归，接下来的路线转向占城沿海。',
      ],
      [
        '占城 · 回程',
        [109.15, 13.9],
        '原历宣德八年五月',
        '由南海北上；《前闻记》还列举外罗山、南澳山等航路标志，此图选择主要区域。',
        [
          [103.5, 1.1],
          [105, 2],
          [109.5, 8],
        ],
      ],
      [
        '太仓',
        [121.26, 31.5],
        '原历宣德八年六月',
        '进入太仓；日程随后记七月到京。航行结束后仍有接待使节和呈报事务。',
        [
          [111, 16],
          [118, 23],
          [122.4, 30],
        ],
      ],
    ],
  ),
]

function journeyRoute(
  id: string,
  name: string,
  period: string,
  personId: string,
  keys: string[],
  note: string,
  seaVia: Record<string, RouteCoordinate[]> = {},
): TopicRoute {
  const journey = [...expandedJourneys, ...voyageJourneys].find((j) => j.personId === personId)!
  const stops = keys.map((key) => {
    const n = journey.nodes.find((n) => n.id === `${personId}-record-${key}`)!
    if (!n) throw new Error(`Missing documented route stop: ${personId}/${key}`)
    return {
      id: n.id,
      name: n.location,
      coordinates: n.coordinates,
      dateLabel: n.dateNote ?? `${n.year}年`,
      text: n.summary,
      sources: n.sources,
      via: seaVia[key],
    }
  })
  return {
    id,
    name,
    period,
    note,
    stops,
    sources: [...new Map(stops.flatMap((s) => s.sources).map((s) => [s.url, s])).values()],
  }
}
routes.push(
  journeyRoute(
    'xuanzang-west',
    '玄奘西行与归国：有记录的主要地点',
    '约629—645',
    'xuanzang',
    [
      'changan-depart',
      'liangzhou',
      'guazhou',
      'yiwu',
      'gaochang',
      'kucha',
      'suyab',
      'samarkand',
      'balkh',
      'bamiyan',
      'kashmir',
      'bodhgaya',
      'nalanda',
      'kannauj-assembly',
      'prayaga',
      'kapisa-return',
      'kashgar-return',
      'khotan-return',
      'dunhuang-return',
      'changan-return',
    ],
    '地点来自已核对的活动记录，虚线仅表示记录先后，不复原穿越沙漠和山地的具体道路。出发年与印度段编年有不同说法，各站保留约略年代；《大唐西域记》中只据传闻记述的地方不自动列入。',
  ),
  journeyRoute(
    'ganjin-sixth',
    '鉴真第六次东渡与赴奈良',
    '753—754',
    'q714061',
    ['sixth-invitation', 'huangsipu', 'yakushima', 'akime', 'dazaifu', 'naniwa', 'todaiji'],
    `${schematic}仅展示第六次东渡及抵日后进京；此前漂流到海南属于另一次尝试。原历天平胜宝五年年末的抵日活动已进入西历754年。`,
    {
      yakushima: [
        [122, 31],
        [126, 30],
      ],
      dazaifu: [
        [129.8, 32],
        [129.4, 33.3],
        [130.3, 33.7],
      ],
      naniwa: [
        [130.5, 33.9],
        [131.2, 34],
        [132.5, 34],
        [133.5, 34.3],
        [134.5, 34.4],
      ],
    },
  ),
  route(
    'silk-north',
    '丝路地理：河西与塔里木盆地北缘',
    '汉唐时期的区域联系',
    '这是一组交通区域的地理示意，不是某个人的行程，也不代表各时代同时存在的固定路线。虚线不复原古道；绿洲及山口的选择会随政治和环境变化。',
    [voyageSources.han, voyageSources.silk],
    [
      [
        '长安',
        [108.94, 34.26],
        '关中出发区域',
        '汉唐都城之一，朝廷、市场与寺院在此集中。向西联系的形成早于和晚于任何一次著名出使。',
      ],
      [
        '武威 · 河西东部',
        [102.64, 37.93],
        '进入河西',
        '祁连山与北方干旱地带之间的绿洲走廊，是连接关中方向与西域的重要通道。',
      ],
      [
        '张掖',
        [100.45, 38.93],
        '河西中段',
        '河流灌溉支持聚落和农业，也为远行者提供补给。军队保护道路，同时需要沿途供粮。',
      ],
      [
        '敦煌',
        [94.66, 40.14],
        '河西西端',
        '从这里继续向西，有多种路线通向不同绿洲；道路会分叉，并不只有一条横贯沙漠的直线。',
      ],
      [
        '吐鲁番',
        [89.53, 42.85],
        '东部绿洲',
        '盆地中的农业与城镇承接跨地区往来。此图示意经吐鲁番的连接，不把它等同于汉代所有“北道”记载。',
      ],
      [
        '龟兹 · 今库车',
        [82.96, 41.72],
        '塔里木盆地北缘',
        '绿洲、寺院和地方政权共同参与商旅及文化交流。佛教传播依靠在此生活与翻译的人。',
      ],
      [
        '疏勒 · 今喀什一带',
        [75.99, 39.47],
        '盆地西部',
        '继续向西需要翻越山地，向北又能进入不同河谷。城市是多路交会处，图线并不意味着抵达这里就能直达地中海。',
      ],
    ],
  ),
  route(
    'silk-south',
    '丝路地理：塔里木盆地南缘',
    '汉代文献中的南道联系',
    '与北缘线路对照阅读。《汉书》按诸国及道路叙述地域关系，图上选取代表区域；不标成一条有完整旅行日志的商队路线。',
    [voyageSources.han],
    [
      ['敦煌', [94.66, 40.14], '东端接续河西', '离开河西后，要依照水源和季节选择下一段道路。'],
      [
        '鄯善 · 若羌一带',
        [88.17, 39.02],
        '东南缘绿洲',
        '楼兰、鄯善的城址与政治中心有变化；此点取若羌区域，不把整个政权固定在一个古城坐标上。',
      ],
      [
        '于阗 · 今和田一带',
        [79.92, 37.11],
        '南缘绿洲',
        '昆仑山水系支持农业和聚落。玉石、丝织品与宗教知识的流动，使这些绿洲和更远地方发生联系。',
        [
          [85, 38],
          [82.7, 37.1],
        ],
      ],
      [
        '莎车',
        [77.25, 38.42],
        '西南部交会区域',
        '《汉书》记南道沿南山向西至莎车。再向西越过葱岭，是另一组山地交通问题。',
      ],
    ],
  ),
)
export const topicRoutes: TopicRoute[] = routes
export const topicRouteById = new Map(topicRoutes.map((r) => [r.id, r]))
export function sourcesForRoutes(ids: string[]): Source[] {
  return [
    ...new Map(
      ids.flatMap((id) => topicRouteById.get(id)!.sources).map((s) => [s.url, s]),
    ).values(),
  ]
}
