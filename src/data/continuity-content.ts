import type { Tour } from '../types'
import { bookSource, makeEvents, makePeople, webSource } from './expansion-kit'

const liDuMeeting = webSource(
  '山东大学 · 赵睿才《“饮中八仙”的演化与李白为“翰林供奉”的时间问题》',
  'https://www.rxgdyjy.sdu.edu.cn/info/1053/4146.htm',
  '第二节记天宝三载（744）洛阳相会、梁宋同游及次年东鲁再会；本文不采用其有争议的开元间长安行止推断。',
)
const liBaiReturn = webSource(
  '香港教育局 · 《早发白帝城》教学资料',
  'https://www.edb.gov.hk/attachment/tc/curriculum-development/kla/chi-edu/recommended-passages/KS2_09.pdf',
  '第1页背景资料：流放途中在白帝城一带遇赦、东下江陵；诗句不作为里程和航行时间的测量记录。',
)
const liBaiReturnYear = webSource(
  '济宁市自然资源和规划局 · 轻舟已过万重山',
  'https://nrp.jining.gov.cn/art/2017/3/23/art_60575_2508723.html',
  '采用乾元二年（759）春遇赦、东下江陵的通行系年；《早发白帝城》的创作年代仍有不同意见。',
)
const zhezongEarly = bookSource('宋史', '17', '哲宗本纪上：即位、高太后听政与元祐年间的政策调整。')
const zhezongLater = bookSource(
  '宋史',
  '18',
  '绍圣元年改元、章惇任相、恢复免役法、苏轼贬惠州及元符末年去世。',
)
const simaHistory = bookSource(
  '史記',
  '130',
  '《太史公自序》：司马谈遗命、司马迁继任太史令、论次史料与李陵之祸后的著述。',
)
const simaLetter = bookSource(
  '漢書',
  '62',
  '司马迁传及《报任安书》：编纂体例、受刑后的著述选择与全书规模。',
)

export const continuityPeople = makePeople([
  {
    id: 'song-zhezong',
    name: '宋哲宗',
    aliases: ['赵煦', '趙煦'],
    birth: 1077,
    death: 1100,
    role: '北宋皇帝',
    era: 'song',
    summary: '幼年即位，亲政后转向恢复神宗时期的新法，元祐与绍圣的政策反复贯穿其统治。',
    text: '宋哲宗赵煦是宋神宗之子，1085年即位时年幼，由祖母高太后听政。司马光、吕公著等重返中枢，朝廷调整熙宁、元丰年间的政策，这一阶段通常称为元祐更化。\n\n高太后去世后，哲宗亲政，1094年改元绍圣，任用章惇等恢复新法，并贬逐元祐时期的官员。苏轼贬惠州、再贬儋州发生在这一政治转向中。赋役等制度的改变与皇帝对父亲政绩的维护交织，使政策分歧进一步牵动官员的身份和命运。1100年哲宗去世，弟弟赵佶继位，即宋徽宗。',
    sources: [
      zhezongEarly,
      zhezongLater,
      webSource(
        '教育部《重编国语辞典修订本》· 宋哲宗',
        'https://dict.revised.moe.edu.tw/dictView.jsp?ID=146341&q=1&word=%E5%AE%97',
        '生卒年1077—1100；《宋史》所记熙宁九年十二月出生，折合公元1077年，不将原历年号直接作为公历出生年。',
      ),
    ],
  },
])

export const continuityEvents = makeEvents('china', [
  {
    id: 'libai-dufu-meeting',
    year: 744,
    title: '李白与杜甫在洛阳相会',
    category: '文化',
    themes: ['文学艺术'],
    place: ['洛阳', [112.45, 34.62]],
    placeIds: ['luoyang'],
    people: ['libai', 'dufu'],
    summary: '李白离开长安后在洛阳与杜甫相识，两人随后同游梁宋，结下持续多年的诗歌交谊。',
    text: [
      '744年，李白结束长安的宫廷生活，在洛阳与杜甫相会。李白已有声名，也经历了求仕的失意；杜甫尚在游历和寻找出路。两人的相识发生在各自生涯的不同阶段，诗歌与共同游历使他们建立了交情。',
      '此后两人同游梁宋，次年又在东鲁相聚，随后分别。相见的时间有限，交谊却延续到后来的诗作中。杜甫多次写诗怀念李白，关切他的处境；李白也有赠杜甫的诗篇。把这些作品与两人后来各自的战争经历、迁居生活并读，可以看到友情怎样在分离中被继续书写。',
    ],
    impact: '李杜交游成为理解两人诗歌与人生处境的共同入口。',
    dateNote: '采用天宝三载（744）洛阳相识的通行系年；次年东鲁再会为后续经历，不并作同日活动。',
    locationNote:
      '洛阳为相识地点的城市参照；后续梁宋与东鲁游历不以此点代替，也不推定具体会面遗址。',
    sources: [liDuMeeting, bookSource('新唐書', '201', '杜甫传记与李白、高适交游。')],
  },
  {
    id: 'libai-pardoned',
    year: 759,
    title: '李白流放途中遇赦东归',
    category: '文化',
    themes: ['文学艺术', '政治'],
    place: ['三峡白帝城一带', [109.57, 31.04]],
    placeIds: [],
    people: ['libai'],
    summary: '李白因永王事件被判流放夜郎，途中遇赦，随后沿长江东下江陵。',
    text: [
      '永王李璘兵败后，曾进入其幕府的李白被追究，经历下狱，后来判流夜郎。759年春，他行至三峡一带遇赦，尚未抵达判定的流放目的地，便得以转向东归。永王幕府、下狱、判流与遇赦跨越数年，是战乱改变个人处境的接续过程。',
      '《早发白帝城》通常联系这次顺江东下江陵的经历来读：高山、猿声与轻舟构成归途的鲜明感受。作品的系年也有不同意见，诗中的时间和里数带有文学表达，不能据此还原每日航程。遇赦使李白摆脱了继续西行的判罚，此后他仍在江汉、江南一带辗转，晚年到当涂依靠李阳冰。',
    ],
    impact: '遇赦改变了李白晚年的行止，也为理解其归途诗歌提供生平背景。',
    dateNote: '遇赦采用乾元二年（759）春的通行纪年；《早发白帝城》写作时间保留异说。',
    locationNote:
      '坐标为三峡白帝城附近参照，不精确定位接诏处；夜郎是判流目的地，不据判罚认定李白已到访。',
    sources: [
      liBaiReturn,
      liBaiReturnYear,
      bookSource('舊唐書', '190下', '李白传：永王事件、流夜郎与遇赦。'),
    ],
  },
  {
    id: 'shaosheng-policy-reversal',
    year: 1094,
    title: '绍圣改元与恢复新法',
    category: '政治',
    themes: ['政治', '经济贸易'],
    place: ['开封', [114.31, 34.8]],
    placeIds: ['kaifeng'],
    people: ['song-zhezong', 'sushi'],
    peopleNotes: {
      sushi: '苏轼在这次政治转向中被贬惠州；关联朝廷处分及其遭遇，不表示他参与主持恢复新法。',
    },
    summary: '宋哲宗亲政后改元绍圣，任用章惇等恢复新法，并追究元祐时期官员。',
    text: [
      '1093年高太后去世后，宋哲宗开始亲政。次年改元绍圣，朝廷以继承神宗政事为方向，任用章惇为相，恢复免役法等制度。元祐初年对新法的调整由此再次逆转，皇帝对先朝政治的态度成为政策取舍的重要条件。',
      '改变同时涉及用人和历史评价。元祐时期的执政者遭到贬逐，已经去世的司马光等也被追夺赠谥；朝廷重修《神宗实录》，重新评议前朝政事。苏轼在1094年被贬惠州，后来又贬儋州，他晚年的岭南生活由此与朝廷的政治清算相连。',
      '恢复哪些措施、怎样执行，与如何处罚前任官员，是相互牵动而各有内容的问题。后来徽宗朝的元祐党籍把排斥进一步落实为名单和资格限制；不能把1094年的转向与1102年以后的党籍措施合成一次处分。',
    ],
    impact: '新法的反复与政治清算进一步交织，影响此后北宋朝廷的用人与政策讨论。',
    dateNote:
      '1094年为绍圣改元、章惇任相及恢复免役法的节点；哲宗亲政始于1093年高太后去世后，后续贬逐延续多年。',
    locationNote: '开封代表朝廷决策中心；苏轼的惠州、儋州贬居地点需另看个人年谱。',
    sources: [
      zhezongEarly,
      zhezongLater,
      bookSource('宋史', '338', '苏轼传：绍圣初年贬惠州、其后贬儋州。'),
    ],
  },
  {
    id: 'simaqian-shiji-writing',
    year: -104,
    dateLabel: '前104年起（著述阶段）',
    title: '司马迁承接父志，持续编纂《史记》',
    category: '文化',
    themes: ['教育学术', '文学艺术'],
    place: ['长安', [108.94, 34.26]],
    placeIds: ['changan'],
    people: ['simaqian', 'early-plus-person-sima-tan'],
    peopleNotes: {
      'early-plus-person-sima-tan':
        '司马谈在前110年去世；此处关联他留下的编史计划及家学，属于身后承接，不表示他参与前104年以后的写作。',
    },
    summary: '司马迁继承司马谈的编史计划，以多种体例组织历代史事，受刑后仍继续著述。',
    text: [
      '据《太史公自序》，司马谈临终把未竟的编史志愿托付给儿子。司马迁后来继任太史令，得以接触史官保存的文书，又把早年游历所得与旧有记载相互参照。前104年太初改历前后，是他系统论次史料的重要阶段，编史工作并非从受刑以后才开始。',
      '《史记》以本纪、表、书、世家和列传互相配合：帝王的行事、诸侯与家族、制度变化、不同人物的经历，可以在同一部书中对照。记述范围上起传说时代，下及汉代，商人、游侠等也进入叙述，材料的选择和篇章安排呈现着作者的判断。',
      '李陵事件使司马迁下狱受刑。他在《报任安书》中说明继续著述的选择，《自序》也把个人遭际与整理往事的志向联系起来。全书的形成经历多年，文本后来还有流传、补续与散佚；这里保留著述阶段，不给出一个无争议的准确完稿年。',
    ],
    impact:
      '贯通多时代的纪传体组织，为后世史书提供重要参照；《汉书》又以断代方式重新编排西汉历史。',
    dateNote:
      '前104年对应太初改历及《自序》所述论次史料阶段；承接父志在此前，受刑与继续写作在此后，不以该年标记全书完成。',
    locationNote:
      '长安代表任官、接触文献与编纂的主要环境；早年游历和书中各地史事不据此还原为个人足迹。',
    sources: [simaHistory, simaLetter],
  },
])

export const continuityPersonConnections: Record<string, Record<string, string>> = {
  'depth-bai-juyi-pipa': {
    q313324: '白居易为《琵琶行》作者；816年的写作与815年贬江州是前后相接的两件事。',
  },
  wanganshi: {
    q7483: '宋神宗任用并支持王安石推动新法，关联中央决策。',
    simaguang: '司马光与王安石就新法及国家干预方式争论，关联反对意见，不表示参与主持变法。',
  },
  'early-plus-yuanyou-change': {
    'song-zhezong':
      '哲宗此时年幼，由高太后听政；政策调整由高太后支持的执政者推进，不等同其后来亲政立场。',
    sushi: '苏轼反对部分新法，也对骤然废改免役法等有不同意见；不能把元祐官员视作立场完全一致。',
  },
  'early-plus-party-stele': {
    sushi: '苏轼1101年已去世；被列入元祐党籍是身后政治评价与排斥，不是本人当年活动。',
    simaguang: '司马光1086年已去世，元祐党籍将其列为追究对象，属于身后关系。',
  },
}

export const continuityReadings: [string, string, string, string, string][] = [
  [
    'libai-changan',
    'libai-leaves-court',
    '宫廷生活怎样结束',
    '此前的奉召入京',
    '入京与离京分属742年和744年，合读文学声名与政治处境的变化。',
  ],
  [
    'libai-leaves-court',
    'libai-dufu-meeting',
    '离京后的李杜交游',
    '相识之前的长安经历',
    '离开朝廷后李白在洛阳结识杜甫，交游成为理解其继续游历和写作的入口。',
  ],
  [
    'libai-dufu-meeting',
    'libai-yongwang',
    '战乱中不同的人生选择',
    '战乱之前的交游',
    '两位诗人后来各有战争经历；李白入永王幕府不代表杜甫参与。',
  ],
  [
    'libai-yongwang',
    'libai-pardoned',
    '从幕府获罪到遇赦',
    '流放之前的永王事件',
    '入幕、被追究与流放遇赦跨越数年，按先后阅读个人处境怎样改变。',
  ],
  [
    'an-lushan',
    'early-plus-dufu-three-officers',
    '征发怎样进入诗歌',
    '作品中的战争背景',
    '安史之乱持续期间的征发和离散进入杜甫作品，诗篇仍有文学组织。',
  ],
  [
    'early-plus-dufu-three-officers',
    'dufu-chengdu',
    '战乱之后寻找居所',
    '入蜀前的战争见闻',
    '两件事都在759年，先读春季返华州途中的诗作，再读年底抵成都的生活转向。',
  ],
  [
    'dufu-chengdu',
    'early-plus-dufu-autumn',
    '沿江东下后的夔州写作',
    '此前在成都的生活',
    '成都与夔州是不同生活阶段，作品中的乡思和时局关切随迁居继续变化。',
  ],
  [
    'early-plus-new-yuefu',
    'bai-juyi-jiangzhou',
    '谏官生涯的转折',
    '贬谪之前的讽谕写作',
    '先看白居易以诗议政，再看815年朝廷冲突；不把新乐府直接认作贬谪的唯一原因。',
  ],
  [
    'bai-juyi-jiangzhou',
    'depth-bai-juyi-pipa',
    '次年的江州写作',
    '写作之前的贬谪',
    '815年的贬江州与816年的《琵琶行》相接，政治处分与文学叙事分别阅读。',
  ],
  [
    'wanganshi',
    'wanganshi-second-resignation',
    '改革主持者的进退',
    '此前的新法措施与争论',
    '王安石离相并未使全部新法停止，皇帝支持、政策执行与个人仕途需要分开考察。',
  ],
  [
    'wanganshi-second-resignation',
    'early-plus-yuanyou-change',
    '神宗去世后的调整',
    '王安石离相后的政策延续',
    '1076年离相与1085年后朝廷转向相隔多年，不能合为一次废法。',
  ],
  [
    'wanganshi',
    'wutai-poetry',
    '政策争论中的文字案件',
    '理解苏轼的政治处境',
    '乌台诗案把苏轼的诗文当作政治指控材料，不能将案件归为王安石个人直接主持。',
  ],
  [
    'wutai-poetry',
    'sushi-red-cliff',
    '贬居黄州后的写作',
    '黄州生活之前的诗案',
    '1079年的诗案改变苏轼处境，1082年的赤壁赋在贬居生活中写成。',
  ],
  [
    'early-plus-yuanyou-change',
    'shaosheng-policy-reversal',
    '哲宗亲政后的再次转向',
    '恢复新法之前的元祐调整',
    '高太后听政与哲宗亲政的权力条件不同，赋役政策和用人方向随之反复。',
  ],
  [
    'shaosheng-policy-reversal',
    'early-plus-party-stele',
    '徽宗朝的党籍限制',
    '党籍之前的绍圣清算',
    '绍圣转向发生在哲宗朝，1102年起的元祐党籍属于徽宗朝后续措施。',
  ],
  [
    'calendar',
    'simaqian-shiji-writing',
    '历法之外的史官著述',
    '同一阶段的改历工作',
    '司马迁同时参与史官知识工作和编史，两条记录共享前104年参照，不认定改历当天开始撰史。',
  ],
  [
    'simaqian-shiji-writing',
    'liling-affair',
    '著述中的个人灾难',
    '受刑之前已开始的编史',
    '《史记》的编写先于李陵事件，受刑后继续著述；不能把灾难写成全书的唯一起因。',
  ],
  [
    'simaqian-shiji-writing',
    'early-plus-han-merchant-networks',
    '一部书怎样记述经济生活',
    '把篇章放回全书体例',
    '《货殖列传》是《史记》中的一篇，单篇的约略系年不等于全书完成时间。',
  ],
  [
    'simaqian-shiji-writing',
    'early-plus-ban-gu-history',
    '从通史到西汉断代史',
    '《汉书》之前的纪传组织',
    '《汉书》沿用并改造纪传体，以一朝为主要范围；班昭等接续的工作也属于成书过程。',
  ],
]

function readingTour(
  id: string,
  name: string,
  question: string,
  introduction: string[],
  conclusion: string,
  chapters: [string, string, string][],
  sources: NonNullable<Tour['sources']>,
): Tour {
  return {
    id,
    name,
    question,
    introduction,
    conclusion,
    sources,
    color: '#8b8197',
    icon: 'route',
    description: introduction[0],
    subtitle: `${chapters.length} 章 · 人物与经历对读`,
    steps: chapters.map(([eventId]) => eventId),
    chapters: chapters.map(([eventId, explanation, mapReading]) => ({
      eventId,
      explanation,
      mapReading,
    })),
  }
}

export const continuityTopicTours: Tour[] = [
  readingTour(
    'tang-poets-lives',
    '唐代诗人：交游、战乱与写作',
    '诗歌中的人生转折，怎样与交游、仕途和战乱相连？',
    [
      '从李白离京后的交游，到李杜各自经历战乱，再到白居易贬江州后的写作，诗歌既保留生活经验，也经过作者的选择和组织。',
      '这条路径比较三个人在不同时期的处境。事件地点可以帮助理解迁徙与生活环境，有据的个人行止则另见各自年谱。',
    ],
    '选一首作品，说明它与作者哪段经历有关，再指出哪些内容属于文学表达，不能直接用作行程或政事的实录。',
    [
      [
        'libai-leaves-court',
        '供奉翰林的经历结束后，李白重新开始游历与求索，文学声名没有给他带来稳定的政治位置。',
        '先看长安的朝廷生活，再转向下一章的洛阳。',
      ],
      [
        'libai-dufu-meeting',
        '李白与杜甫相识、同游，后来分别仍以诗歌维系交谊。',
        '洛阳是相识地，梁宋与东鲁交游需分别理解。',
      ],
      [
        'libai-yongwang',
        '战乱中李白进入永王幕府，宗室权力冲突使他的政治参与转为获罪经历。',
        '浔阳为区域参照，幕府相关战事不自动成为李白的个人路线。',
      ],
      [
        'libai-pardoned',
        '流放途中遇赦，使李白得以东归，《早发白帝城》通常联系这段经历阅读。',
        '看三峡到江陵的上下游关系，不按诗句计算行舟速度。',
      ],
      [
        'early-plus-dufu-three-officers',
        '杜甫在战争与征发中观察普通人的处境，作品把离散写成具体人物的经历。',
        '关注洛阳至华州沿途的区域背景，代表点不涵盖每首诗的精确现场。',
      ],
      [
        'dufu-chengdu',
        '759年底抵成都后，杜甫逐步获得一处生活据点，诗歌也继续写入生计与交往。',
        '比较关陇与成都盆地，抵达和次年营建草堂分属不同节点。',
      ],
      [
        'early-plus-dufu-autumn',
        '离开成都后，夔州生活又让时局、乡思与沿江景物进入《秋兴八首》。',
        '对照成都与夔州的位置，两地不能合成同一段定居生活。',
      ],
      [
        'early-plus-new-yuefu',
        '白居易与元稹以新乐府讨论现实，诗歌是其公共议论的一部分。',
        '转向长安，区分写作环境与诗中反映的各地生活。',
      ],
      [
        'bai-juyi-jiangzhou',
        '白居易在朝廷冲突中被贬，官职和生活环境发生变化。',
        '比较长安与江州的位置，处分发出地和贬居地各有作用。',
      ],
      [
        'depth-bai-juyi-pipa',
        '次年的《琵琶行》把艺人身世与诗人迁谪处境交织起来。',
        '以浔阳江边为阅读参照，作品叙事不作为所有细节的现场实录。',
      ],
    ],
    [
      liDuMeeting,
      liBaiReturn,
      liBaiReturnYear,
      bookSource('舊唐書', '190下'),
      bookSource('舊唐書', '166'),
      webSource('白居易 · 琵琶行并序', 'https://zh.wikisource.org/wiki/琵琶行'),
    ],
  ),
  readingTour(
    'northern-song-reform-reversals',
    '北宋新法：争论、进退与反复',
    '一项改革为什么会随执政与皇权变化而多次调整？',
    [
      '从熙宁变法到元祐调整、绍圣恢复新法，再到徽宗朝的党籍限制，政策争论逐步与用人、历史评价和个人命运交织。',
      '王安石、司马光与苏轼的立场各有变化和差异。沿事件逐步辨认谁在作决定、争论什么、处分怎样发生，才能理解制度调整和政治排斥之间的关系。',
    ],
    '比较元祐与绍圣两次转向：是谁掌握决策权，哪些政策改变，哪些处分超出了政策本身？',
    [
      [
        'wanganshi',
        '神宗支持王安石推行新法，司马光等提出反对意见，地方执行也带来新的问题。',
        '开封是中枢，青苗与赋役的实际实施分布在各地。',
      ],
      [
        'wanganshi-second-resignation',
        '王安石第二次离相后，神宗继续推行部分政策，个人进退与制度存续并不重合。',
        '区分开封的决策与王安石退居江宁的生活。',
      ],
      [
        'wutai-poetry',
        '苏轼的诗文被用作政治指控材料，文字案件使政策分歧进入个人刑狱。',
        '关注被逮与审讯的不同地点，代表点不恢复押解路线。',
      ],
      [
        'sushi-red-cliff',
        '黄州贬居中的写作，把个人遭遇、自然与历史想象放在一起。',
        '黄州赤壁与三国赤壁战场需要区分。',
      ],
      [
        'early-plus-yuanyou-change',
        '高太后听政，司马光等调整新法，苏轼对部分废改也持异议。',
        '回到开封，比较此前与此时的决策者。',
      ],
      [
        'shaosheng-policy-reversal',
        '哲宗亲政后恢复新法，同时贬逐元祐官员，苏轼也被贬往岭南。',
        '朝廷决策在开封，惠州、儋州的本人活动另见苏轼年谱。',
      ],
      [
        'early-plus-party-stele',
        '徽宗朝以党籍和资格限制延续排斥，牵连范围超出一次政策争辩。',
        '名单与刻石代表政治评价，不表示被列者当年都在京城。',
      ],
    ],
    [
      bookSource('宋史', '327'),
      bookSource('宋史', '336'),
      bookSource('宋史', '338'),
      zhezongEarly,
      zhezongLater,
      bookSource('宋史', '472'),
      webSource('王安石 · 答司马谏议书', 'https://zh.wikisource.org/wiki/答司馬諫議書'),
    ],
  ),
]
