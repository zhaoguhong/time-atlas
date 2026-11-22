import type { HistoryEvent } from '../types'
import { modernMapSources as ref } from './modern-map-sources'

export const modernMapEvents: HistoryEvent[] = [
  {
    id: 'modern-cairo-declaration',
    year: 1943,
    dateLabel: '1943年12月1日',
    title: '《开罗宣言》公布',
    aliases: ['开罗会议'],
    category: '政治',
    region: 'africa',
    location: '埃及开罗',
    coordinates: [31.24, 30.04],
    placeIds: ['cairo'],
    importance: 5,
    people: [],
    summary: '中国、美国和英国发表宣言，明确将日本窃取的中国东北、台湾和澎湖等领土归还中国。',
    background: '中、美、英三国领导人1943年11月在开罗会晤，商讨对日战争与战后安排。',
    impact: '1945年的《波茨坦公告》重申了宣言条件，为日本投降后的接收提供依据。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1943年11月22日至26日，中、美、英三国领导人在开罗会晤。当时对日战争仍在继续，三国一边协商作战，一边讨论日本战败后如何处理其侵占的领土。12月1日公布的宣言明确列出东北、台湾和澎湖等应归还中国的领土，并提出朝鲜在适当时期取得自由与独立。',
            '两年后，三国在《波茨坦公告》中要求落实开罗宣言的条件。此后还有日本签署投降书和中国接收台湾等具体步骤，战时商定的安排至此陆续实施。',
          ],
        },
      ],
    },
    relatedEvents: [
      {
        id: 'modern-potsdam-proclamation',
        label: '战后安排写入投降条件',
        note: '《波茨坦公告》第八条重申实施《开罗宣言》。',
      },
    ],
    sources: [ref.cairo, ref.potsdam],
  },
  {
    id: 'modern-potsdam-proclamation',
    year: 1945,
    dateLabel: '1945年7月26日',
    title: '《波茨坦公告》发布',
    category: '政治',
    region: 'europe',
    location: '德国波茨坦',
    coordinates: [13.06, 52.4],
    importance: 5,
    people: [],
    summary: '中、美、英公布对日投降条件，要求日本武装部队无条件投降，并重申《开罗宣言》。',
    background: '德国已经投降，盟军在亚洲及太平洋仍同日本作战。苏联后来加入公告。',
    impact: '日本在9月2日签署的投降书中承诺履行公告，随后在不同战区办理受降。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1945年7月26日，中国、美国和英国发布《波茨坦公告》。公告要求日本武装部队无条件投降，还列出解除武装、惩办战犯和盟军占领等安排。第八条重申实施《开罗宣言》，事关台湾、澎湖等日本侵占土地的战后处置。',
            '9月2日，日本在东京湾签署投降书，承诺履行公告。接下来的受降按地点和战区分批进行。中国战区台湾省受降典礼于10月25日在台北举行。',
          ],
        },
      ],
    },
    relatedEvents: [
      {
        id: 'modern-cairo-declaration',
        label: '阅读《开罗宣言》',
        note: '公告第八条重申了1943年的条款。',
      },
      {
        id: 'modern-japanese-surrender-instrument',
        label: '日本签署投降书',
        note: '1945年9月日本书面接受并承诺履行公告。',
      },
    ],
    sources: [ref.potsdam, ref.surrender, ref.taiwanSurrender],
  },
  {
    id: 'modern-japanese-surrender-instrument',
    year: 1945,
    dateLabel: '1945年9月2日',
    title: '日本签署投降书',
    aliases: ['东京湾受降', '密苏里号受降'],
    category: '政治',
    region: 'east-asia',
    location: '日本东京湾',
    coordinates: [139.78, 35.46],
    importance: 5,
    people: [],
    summary: '日本代表在东京湾签署投降书，承诺履行《波茨坦公告》。',
    background: '日本于8月宣布接受投降条件。盟国随后安排签字和各战区的受降。',
    impact: '盟国按战区办理解除日军武装和接收等事务，中国战区各地的仪式先后举行。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1945年9月2日，日本代表在东京湾的美国军舰“密苏里”号上签署投降书。日本接受《波茨坦公告》，承诺由政府和军队执行盟军为实施公告发布的命令。',
            '东京湾签字之后，各地办理受降与接收。中国战区台湾省的仪式在10月25日举行，澎湖守备队也列在台湾区受降档案所记的投降部队中。',
          ],
        },
      ],
    },
    relatedEvents: [
      {
        id: 'modern-potsdam-proclamation',
        label: '查看日本接受的条件',
        note: '投降书承诺履行《波茨坦公告》。',
      },
      {
        id: 'exp-em-taiwan-retrocession',
        label: '台湾区受降和接收',
        note: '中国战区台湾省受降仪式于10月25日在台北举行。',
      },
      {
        id: 'modern-nanjing-surrender-1945',
        label: '中国战区在南京受降',
        note: '中国战区总受降仪式于9月9日在南京举行。',
      },
    ],
    sources: [ref.surrender, ref.surrenderOriginal, ref.taiwanSurrender],
  },
  {
    id: 'exp-em-taiwan-retrocession',
    year: 1945,
    dateLabel: '1945年10月25日',
    title: '台湾光复',
    aliases: ['战后台湾政权接收', '台湾区受降'],
    category: '政治',
    region: 'china',
    location: '台北公会堂',
    coordinates: [121.51, 25.04],
    placeIds: ['taipei', 'penghu'],
    importance: 5,
    people: [],
    summary: '中国战区台湾省受降仪式在台北举行，中国恢复对台湾和澎湖行使主权。',
    background:
      '《开罗宣言》列明应归还中国的东北、台湾、澎湖等领土。《波茨坦公告》重申宣言条件，日本在投降书中承诺履行公告。',
    impact: '台湾结束日本殖民统治，台湾和澎湖进入战后接收和行政重建阶段。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1945年10月25日，中国战区台湾省受降典礼在台北公会堂举行。陈仪代表中国方面接受日本台湾总督兼第十方面军司令官安藤利吉投降。国家档案局公布的受降档案还列有澎湖守备队。',
            '当天中国政府宣告恢复对台湾行使主权。随后原有官署、学校和公共设施陆续移交，政府开始重建地方行政。财政、物价和文化差异等问题在接收过程中逐渐显现，也影响了战后台湾社会。',
          ],
        },
      ],
    },
    relatedEvents: [
      {
        id: 'modern-japanese-surrender-instrument',
        label: '查看日本投降书',
        note: '日本于9月2日在东京湾签署投降书，承诺履行《波茨坦公告》。',
      },
      {
        id: 'exp-em-february-twenty-eight',
        label: '战后台湾的社会矛盾',
        note: '接收后的经济及治理矛盾在1947年二二八事件中集中爆发。',
      },
    ],
    sources: [ref.taiwanSurrender, ref.taiwan, ref.cairo, ref.potsdam],
  },
  {
    id: 'modern-south-china-sea-reception',
    year: 1946,
    dateLabel: '1946年11—12月',
    dateNote: '记录西沙、南沙分批接收的阶段。12月12日为南沙太平岛接收节点。',
    title: '中国接收西沙、南沙群岛',
    category: '政治',
    region: 'china',
    location: '西沙永兴岛、南沙太平岛',
    coordinates: [114.36, 10.38],
    placeIds: ['yongxing', 'taiping-island'],
    locationNote: '标记落在太平岛附近，永兴岛在西沙群岛，两个接收地点相距较远。',
    importance: 4,
    people: [],
    summary: '战后中国政府派员赴永兴岛和太平岛，接收日军侵占的岛礁。',
    background: '抗战结束后，政府组织海军与相关人员，恢复对南海诸岛行使主权。',
    impact:
      '接收后开展驻守、测绘和地名核定，1947年重新命名部分岛礁，1948年在公开发行的官方地图上标绘南海断续线。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1946年末，中国政府派舰分赴西沙和南沙群岛。西沙接收人员登上今天的永兴岛。12月12日，太平舰和中业舰抵达南沙群岛，接收人员在太平岛举行仪式并立碑。',
            '接收之后，政府安排驻守与地理测量。1947年的地名公函记载了用接收军舰的名字更名岛屿的安排，永兴岛、太平岛由此得名。重新核定的地名和编绘的地图，为后续出版和标注提供了依据。',
          ],
        },
      ],
    },
    sources: [ref.southChinaSea, ref.taiping, ref.southChinaSeaCharts],
  },
  {
    id: 'modern-first-cppcc',
    year: 1949,
    dateLabel: '1949年9月21—30日',
    title: '中国人民政治协商会议第一届全体会议',
    aliases: ['政协第一届全体会议', '共同纲领'],
    category: '政治',
    region: 'china',
    location: '北平中南海',
    coordinates: [116.38, 39.91],
    placeIds: ['beijing'],
    importance: 5,
    people: [],
    summary: '会议通过《共同纲领》等文件，决定国都、纪年、国旗和代国歌，选出中央人民政府委员会。',
    background: '各党派、团体及各界人士经过筹备，在北平召开新政协会议。',
    impact: '会议为中华人民共和国的成立和中央人民政府履职确立制度安排。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1949年9月21日，政协第一届全体会议在北平开幕。会议讨论并通过了《共同纲领》和中国人民政治协商会议、中央人民政府的组织法。《共同纲领》规定了中央人民政府的施政原则，在宪法制定以前发挥临时宪法的作用。',
            '9月27日，会议决定定都北平，并改称北京。会议还确定采用公元纪年、使用五星红旗并以《义勇军进行曲》为代国歌。9月30日，中央人民政府委员会选出。次日，中华人民共和国在北京宣告成立。',
          ],
        },
      ],
    },
    relatedEvents: [
      {
        id: 'modern-prc-founded',
        label: '中华人民共和国成立',
        note: '中央人民政府委员会选举之后，10月1日在北京举行开国大典。',
      },
    ],
    sources: [ref.cppcc, ref.commonProgram, ref.founding],
  },
  {
    id: 'modern-xinjiang-1949',
    year: 1949,
    dateLabel: '1949年9月25—26日',
    title: '新疆和平解放',
    category: '政治',
    region: 'china',
    location: '新疆迪化（今乌鲁木齐）',
    coordinates: [87.62, 43.82],
    importance: 4,
    people: [],
    summary: '陶峙岳、包尔汉先后通电起义，同广州方面断绝关系，新疆实现和平解放。',
    background: '到1949年秋，国民党在新疆的军政机构与中共方面接触，寻求和平交接。',
    impact: '人民解放军随后进驻天山南北多地，与当地部队会师，为新机构接管创造条件。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1949年9月25日，国民党驻新疆军队负责人陶峙岳通电起义。次日，新疆省政府主席包尔汉也宣布起义。两份通电先后宣布同广州的国民党政府断绝关系，接受和平接管的安排。',
            '秋冬之间，人民解放军陆续进入迪化、喀什和伊犁等地，同先前在当地活动的部队会师。通电确立了和平转交的方向，新机构的建立和各地交接在此后推进。',
          ],
        },
      ],
    },
    sources: [ref.xinjiang],
  },
  {
    id: 'modern-federal-republic-germany',
    year: 1949,
    dateLabel: '1949年5月23日',
    title: '德意志联邦共和国成立',
    category: '政治',
    region: 'europe',
    location: '德国波恩',
    coordinates: [7.12, 50.72],
    importance: 5,
    people: [],
    summary: '波恩公布《基本法》，由美、英、法占领区的各州组成德意志联邦共和国。',
    background: '德国战败后分由盟国占领，美国、英国和法国推动其占领区建立联邦政体。',
    impact: '同年苏联占领区成立德意志民主共和国，两个德国长期并存。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1949年5月23日，议会委员会在波恩公布《基本法》，为德意志联邦共和国确立联邦制度和国家机关的组织原则。参与的州来自美、英、法占领区，各州在联邦之内继续拥有自己的政府和议会。',
            '同年10月，德意志民主共和国在苏联占领区成立。德国分由不同盟国占领的格局，逐渐演变成两个德国长期并存的局面。',
          ],
        },
      ],
    },
    relatedEvents: [
      {
        id: 'modern-german-democratic-republic',
        label: '苏联占领区的建国',
        note: '1949年10月，德意志民主共和国成立。',
      },
    ],
    sources: [ref.germany],
  },
  {
    id: 'modern-german-democratic-republic',
    year: 1949,
    dateLabel: '1949年10月7日',
    title: '德意志民主共和国成立',
    category: '政治',
    region: 'europe',
    location: '德国东柏林',
    coordinates: [13.4, 52.52],
    importance: 5,
    people: [],
    summary: '德国人民委员会改组为临时人民议院，德意志民主共和国在苏联占领区成立。',
    background: '二战之后，苏联占领区形成与西方占领区不同的政治制度。',
    impact: '两个德国分别建设国家机构，柏林的地位也成为冷战中的长期议题。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1949年10月7日，德国人民委员会转为临时人民议院，宣布成立德意志民主共和国。此前西方占领区的各州已通过《基本法》组建德意志联邦共和国。新的民主德国随后选举总统并组织政府。',
            '两个国家成立后，双方都曾提出德国统一的目标。柏林仍有盟国占领下的特殊地位，分区和两德关系继续影响当地的交通与日常生活。',
          ],
        },
      ],
    },
    relatedEvents: [
      {
        id: 'modern-federal-republic-germany',
        label: '阅读同年波恩公布《基本法》',
        note: '联邦德国成立于1949年5月。',
      },
    ],
    sources: [ref.germany],
  },
  {
    id: 'modern-sino-soviet-treaty',
    year: 1950,
    dateLabel: '1950年2月14日',
    title: '《中苏友好同盟互助条约》签署',
    category: '政治',
    region: 'europe',
    location: '苏联莫斯科',
    coordinates: [37.62, 55.75],
    importance: 5,
    people: [],
    summary: '中苏在莫斯科签署同盟条约，并就中国长春铁路、旅顺口和大连签订协定。',
    background:
      '中华人民共和国成立后，两国谈判重新安排外交与经济关系，并处理日本投降后遗留的协定。',
    impact: '条约确立同盟及经济合作原则，配套协定为中长铁路、旅顺口与大连的后续交接作出规定。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1950年2月14日，周恩来与苏联外长维辛斯基在莫斯科签署《中苏友好同盟互助条约》。同日签署的协定还涉及中国长春铁路、旅顺口和大连，双方外长以换文宣布1945年的旧条约及有关协定废止。',
            '铁路协定安排苏联将中长铁路的管理权以及相关财产移交中国，并约定过渡时期的共同经营。旅顺口另有撤军和设施交接条款。交接需要在后续几年具体实施。',
          ],
        },
      ],
    },
    sources: [ref.sinoSoviet, ref.daliansAgreement],
  },
  {
    id: 'modern-hainan-reunification',
    year: 1950,
    dateLabel: '1950年5月1日',
    title: '海南岛全境解放',
    aliases: ['解放海南岛战役'],
    category: '战争',
    region: 'china',
    location: '海南岛',
    coordinates: [110.33, 20.03],
    placeIds: ['haikou'],
    locationNote: '以海口定位，渡海和岛上作战涉及多个地点。',
    importance: 4,
    people: [],
    summary: '人民解放军在琼崖纵队协助下渡海作战，至5月1日解放海南全岛。',
    background: '1949年10月中华人民共和国成立后，海南岛的战事仍在继续。',
    impact: '海南结束岛上大规模作战，地方政权和机构进入接管与重建阶段。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1949年10月，海南的战事仍在继续。岛上的琼崖纵队与渡海部队联络并筹措粮食、船工和运输所需物资。1950年3月，先遣部队开始渡过琼州海峡，和岛上的部队会合。',
            '随后主力渡海登陆，部队向岛内推进，国民党军撤离海南。5月1日，海南全岛解放。中国成立新政权与海南岛完成接管分别发生在1949年和1950年。',
          ],
        },
      ],
    },
    sources: [ref.hainan, ref.hainanCrossing],
  },
  {
    id: 'modern-changdu-1950',
    year: 1950,
    dateLabel: '1950年10月',
    dateNote: '以10月6日至24日的战役阶段记年，10月19日为昌都解放日。',
    title: '昌都战役',
    category: '战争',
    region: 'china',
    location: '西藏昌都',
    coordinates: [97.18, 31.14],
    placeIds: ['changdu'],
    importance: 4,
    people: [],
    summary: '人民解放军在昌都地区与西藏地方军队交战，10月19日昌都解放。',
    background:
      '中央人民政府提出同西藏地方政府谈判，双方接触期间，西藏地方军队在昌都一带部署防线。',
    impact: '战役改变了谈判条件。1951年5月23日，中央人民政府和西藏地方政府签署和平解放西藏的协议。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1950年10月，人民解放军进入昌都地区，与西藏地方军队交战。昌都是川藏通道上的重镇。10月19日昌都解放后，中央人民政府仍要求西藏地方政府派代表到北京谈判。',
            '这场战役发生在西藏东部。1951年5月23日，双方代表在北京另行签署和平解放西藏的协议，对进驻、地方政治制度和宗教等事务作出安排。',
          ],
        },
      ],
    },
    sources: [ref.changdu, ref.tibet],
  },
]
