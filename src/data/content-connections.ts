import { continuityPersonConnections, continuityReadings } from './continuity-content'
import type { HistoryEvent } from '../types'
import { chinesePersonEventConnections } from './content-connections-china'
import { worldPersonEventConnections } from './content-connections-world'
import { expandedConnectedReadings } from './connected-reading-paths'

// Each relationship is supported by the cited event's existing prose and sources.
// These are editorial reading links, never inferred attendance or journey nodes.
export const personEventConnections: Record<string, Record<string, string>> = {
  'category-kumarajiva': { q335293: '鸠摩罗什为译经主持者；译场同时依靠其他僧人和姚兴的支持。' },
  'modern-luxun-diary': {
    'luxun-writer': '鲁迅为小说作者；刊物的出版网络不代替独立的个人活动记录。',
  },
  'depth-peony-pavilion': { q945333: '汤显祖为剧作作者；完稿地点和后世舞台演出分别考察。' },
  'depth-sun-simiao-qianjin': {
    q981193: '孙思邈为医书编撰者；约略成书纪年与现存版本的整理时间不同。',
  },
  'seven-states': {
    q1185798: '晁错主张削藩，起兵诸王以诛晁错为号召；他在战事中被景帝处死。',
    q7224: '汉景帝主持平乱期间的朝廷决策，并遣周亚夫等统军。',
  },
  'han-wudi-accession': {
    q837295: '窦氏在刘彻继位后为太皇太后，继续影响建元初年的用人与经学政策。',
  },
  'western-regions': { q7230: '汉宣帝时期设置西域都护；关联中央的制度安排，不表示皇帝到访乌垒。' },
  'han-founded': { q3274896: '彭越在战后封赏安排中被立为梁王，体现汉初对战争盟友的安置。' },
  gaixia: {
    q3274896: '彭越作为刘邦争取的盟军首领参与会师；关联会师与政治合作，不据此恢复个人路线。',
  },
  'qin-death': {
    q7196: '胡亥在始皇死后的继承安排中被立为二世。',
    q197436: '据《史记》的叙述，赵高参与控制消息和更改继承安排。',
  },
  dazexiang: { q706634: '吴广与陈胜共同发动起事，此后在反秦军内部冲突中被杀。' },
  'qin-zhao': { q706855: '王翦为进攻赵国、取得邯郸的秦军将领。' },
  'qin-chu': { q706855: '王翦承担攻楚的主要军事行动；通行灭楚年不涵盖全部后续抵抗。' },
  'qin-wei': { q10417152: '王贲率军攻魏并引水灌大梁；关联战争指挥。' },
  'qin-yan-dai': { q10417152: '王贲率军攻取辽东及代地，这两处行动按同年记录并读。' },
  julu: { q1336683: '章邯统率围赵秦军的一部并维持粮道；其后来投降与巨鹿战果分属接续阶段。' },
  changping: { q744827: '廉颇为赵军前期统帅，后来被赵括替换。' },
  guandu: { q1275315: '荀彧在后方劝曹操坚持相持；关联决策支持，不表示在官渡战场。' },
  chibi: { q559744: '鲁肃参与孙刘之间的接触与联盟协调，和周瑜等人的战场指挥分工有别。' },
  yizhou: {
    q197183: '张飞从荆州溯江入援，参与刘备取得益州的战争。',
    q197481: '赵云从荆州入援，参与刘备取得益州的战争。',
  },
  hanzhong: { q378547: '黄忠在定军山一带进击，夏侯渊战死；本条关联具体战事。' },
  'northern-expedition': { q197481: '赵云与邓芝在箕谷方向牵制魏军，并非在祁山主攻方向作战。' },
  'shu-falls': {
    q280866: '姜维率军在剑阁抵抗钟会，刘禅投降后停止抵抗。',
    q197813: '钟会率军进入汉中并与姜维相持，阴平奇袭由邓艾另路进行。',
  },
  'jin-unifies': {
    q702166: '杜预统率晋军一部参与多路攻吴。',
    q470030: '孙皓为吴国末代皇帝，在建业向晋军投降。',
  },
  'eastern-jin': { q3274914: '王导协助司马睿联络南渡士人与江南大族，为江南建政提供支持。' },
  'huanwen-shu': { q2496512: '桓温率军入蜀，接受李势投降。' },
  feishui: { q1285752: '谢玄参与组织晋军抵抗，与谢石等共同统军。' },
  'north-wei': { q1194963: '拓跋焘在439年攻灭北凉，完成北方主要地区的整合。' },
  'sui-unifies': {
    q718206: '陈后主陈叔宝在建康被俘，陈朝皇室统治结束。',
    q1062909: '杨素承担伐陈的一路进攻，与建康方向的渡江部队分工不同。',
  },
  chanyuan: { q7475: '宋真宗北上澶州并参与议和决策；具体谈判由使臣往返进行。' },
  qingli: { q7477: '宋仁宗任用范仲淹等并裁定改革建议；采纳程度与推行结果分别看待。' },
  yashan: { q2738615: '陆秀夫辅佐海上朝廷，崖山战败后负幼帝入海。' },
  'ming-founded': { q388248: '常遇春与徐达等参加同年北伐；关联军事背景，不表示参加南京称帝典礼。' },
  taiwan: { q701449: '施琅率水师在澎湖击败郑氏守军，郑克塽随后投降。' },
  nerchinsk: { q7561262: '索额图为清方谈判使臣；康熙在中央决策，二者活动地点不同。' },
  'gaitu-guiliu': { q839282: '鄂尔泰在西南推动改土归流，措施与冲突因地区而异。' },
  'taiwan-province': { q707594: '刘铭传参与推动台湾建省及后续防务、财政与交通建设。' },
  'wuxu-coup': { q1191225: '谭嗣同为政变后被杀的六人之一；具体事前密谋仍保留材料分歧。' },
}

for (const additions of [
  chinesePersonEventConnections,
  worldPersonEventConnections,
  continuityPersonConnections,
])
  for (const [eventId, people] of Object.entries(additions))
    personEventConnections[eventId] = { ...personEventConnections[eventId], ...people }

// Read the two records together for the specific reason given here. No automatic
// keyword linking and no requirement that a later development had a single cause.
type ReadingPair = [string, string, string, string, string]
export const connectedReadings: ReadingPair[] = [
  ...continuityReadings,
  [
    'zhangqian',
    'western-regions',
    '出使与制度经营',
    '回看出使',
    '从使节获取信息到后来设置都护，可以比较跨区域联系的不同经营方式。',
  ],
  [
    'category-kumarajiva',
    'xuanzang-return',
    '另一阶段的译经',
    '此前的长安译场',
    '比较四至五世纪与七世纪的译场、文本和组织条件，不把两位译者写成直接师承。',
  ],
  [
    'paper',
    'diamond-sutra',
    '纸上文本的复制',
    '印刷使用的材料',
    '将造纸与现存早期纪年印本并读，区分材料改进和复制技术，不把两者合为一次发明。',
  ],
  [
    'diamond-sutra',
    'movable-type',
    '从雕版到活字',
    '此前的雕版印本',
    '不同印刷办法需要不同的制版、排字和印制劳动，活字出现后雕版仍继续使用。',
  ],
  [
    'movable-type',
    'world-printing',
    '不同印刷传统的比较',
    '东亚活字的早期记载',
    '比较东亚与欧洲活字技术的材料、文字和市场条件；这两条记录本身不能证明一条直接传播路线。',
  ],
  [
    'quanzhou-office',
    'world-kilwa-trade',
    '同一海域的另一端',
    '海上贸易的东端',
    '泉州与基尔瓦分处印度洋贸易网络的不同位置，并读港口组织与商品流动，不假定二者有固定直航。',
  ],
  [
    'world-srivijaya',
    'world-malacca',
    '海峡港市的变化',
    '此前的海峡网络',
    '两者相隔多个世纪，可以比较海峡位置与港市经营，不能当作同一国家连续迁都。',
  ],
  [
    'world-baghdad-founded',
    'category-algebra',
    '城市中的知识活动',
    '知识集聚的城市条件',
    '建城之后，学者、赞助与书籍生产持续发展；花拉子米的代数学是观察这一知识环境的一个入口。',
  ],
  [
    'world-abbasid',
    'world-baghdad-founded',
    '新都的营建',
    '建城之前的王朝更替',
    '阿拔斯革命在750年取得政权，巴格达至762年才开始营建，应分开王朝更替与新都形成。',
  ],
  [
    'world-industrial',
    'world-public-health',
    '城市健康的制度回应',
    '工业城市的增长',
    '工业化带来人口与生产集聚，供水、排污和住房需要公共行动；卫生改革有自身的知识和政治过程。',
  ],
  [
    'world-public-health',
    'depth-koch-tuberculosis',
    '公共治理与病原研究',
    '病原研究之前的治理',
    '卫生立法与结核病原研究发生于不同阶段，便于比较城市工程与实验医学怎样分别处理疾病。',
  ],
  [
    'category-pasteur',
    'modern-penicillin',
    '预防与治疗的不同探索',
    '此前的微生物研究',
    '疫苗与抗生素针对不同问题；研究发现走向实际应用都需要后续试验、生产与医疗组织。',
  ],
  [
    'beijing-capital',
    'yuan-maritime-grain',
    '回看北方都城的供粮',
    '后来的都城供应安排',
    '元代海运与明代漕运体现不同的供粮安排，都与北方政治中心和南方粮赋之间的距离有关。',
  ],
  [
    'qijiguang',
    'qijiguang-jizhen',
    '从海防到北方防务',
    '此前的东南作战',
    '同一将领面对海岸与长城两种环境，练兵、补给与工事的安排也随之改变。',
  ],
  [
    'jiangnan-arsenal',
    'fuzhou-shipyard',
    '制造与教育的两种实践',
    '并读上海的制造事业',
    '两处机构都连接机器、人员训练与财政支持，产品和具体组织各有侧重。',
  ],
  [
    'fuzhou-shipyard',
    'mawei-battle',
    '船政后来遭遇的战争',
    '回看船政的建立',
    '马尾海战重创福建水师，军事结果与船政教育、人才的长期影响应分别评价。',
  ],
  [
    'hundred-days',
    'imperial-university',
    '改革中的教育建设',
    '大学堂设立的政治背景',
    '大学堂与戊戌改革有直接联系，政变中止多数新政后，这项教育建设仍得以延续。',
  ],
  [
    'modern-chenduxiu-youth-journal',
    'modern-luxun-diary',
    '新文学进入报刊',
    '作品的刊物环境',
    '《青年杂志》后来改名《新青年》，鲁迅在其上发表白话小说；刊物争论和文学创作有各自的表达方式。',
  ],
  [
    'modern-luxun-diary',
    'modern-may-fourth',
    '文学与公共行动的对读',
    '此前的新文学探索',
    '两条记录呈现新文化环境中的文学和社会动员，不能把小说发表写成次年学生运动的单一原因。',
  ],
  [
    'modern-gaokao-restored',
    'modern-china-reform',
    '教育与政策转折',
    '此前的招生恢复',
    '1977年招生恢复与1978年的政策转折相邻而各有决策过程，可以比较个人机会与制度变化。',
  ],
]

connectedReadings.push(...expandedConnectedReadings)

// Stable place IDs avoid treating an empire name or a book's subject as a city.
// Several records span more than one city; [] intentionally leaves regional
// processes out of city dossiers despite their representative map coordinate.
const placeEvents: Record<string, string[]> = {
  rome: [
    'world-roman-republic',
    'world-caesar',
    'world-augustus',
    'category-pantheon',
    'phil-plotinus-rome',
    'world-charlemagne',
    'phil-aquinas-summa',
    'depth-sistine-ceiling',
    'modern-treaties-rome',
  ],
  athens: [
    'world-athens',
    'world-peloponnesian',
    'phil-socrates-trial',
    'phil-plato-republic',
    'phil-aristotle-lyceum',
    'phil-epicurus-garden',
    'phil-stoic-school',
  ],
  baghdad: ['world-baghdad-founded', 'category-algebra', 'world-baghdad'],
  cairo: ['category-azhar', 'category-optics', 'world-mansa-musa'],
  delhi: ['world-delhi', 'world-mughal'],
  london: [
    'category-globe',
    'world-east-india-charter',
    'depth-hamlet',
    'phil-bacon-novum-organum',
    'world-british-civil-wars',
    'phil-hobbes-leviathan',
    'depth-boyle-chymist',
    'depth-paradise-lost',
    'world-newton',
    'world-glorious-revolution',
    'phil-locke-essay',
    'category-bank-england',
    'phil-hume-treatise',
    'world-wealth-nations',
    'world-slave-trade-abolition',
    'depth-british-gold-resumption',
    'depth-faraday-induction',
    'world-slavery-abolition-act',
    'world-peoples-charter',
    'world-manifesto',
    'world-public-health',
    'world-darwin',
    'phil-mill-liberty',
    'category-maxwell',
    'modern-penicillin',
    'modern-popper-open-society',
    'modern-unesco-constitution',
    'modern-ryle-concept-mind',
    'modern-dna-double-helix',
  ],
  paris: [
    'depth-notre-dame-begins',
    'phil-aquinas-summa',
    'phil-descartes-meditations',
    'world-enlightenment',
    'world-french-revolution',
    'depth-lavoisier-chemistry',
    'depth-bank-france',
    'world-napoleon-empire',
    'world-napoleonic-civil-code',
    'depth-daguerre-photography',
    'depth-les-miserables',
    'world-paris-commune',
    'depth-impressionist-exhibition',
    'category-pasteur',
    'category-eiffel',
    'category-curie',
    'modern-bergson-creative-evolution',
    'modern-versailles',
    'modern-ulysses',
    'modern-guernica',
    'modern-sartre-nausea',
    'modern-camus-sisyphus',
    'modern-sartre-being-nothingness',
    'modern-beauvoir-pyrrhus',
    'modern-merleau-perception',
    'modern-sartre-existentialism-humanism',
    'modern-beauvoir-ambiguity',
    'modern-human-rights-declaration',
    'modern-beauvoir-second-sex',
    'modern-camus-rebel',
    'modern-weil-oppression-liberty',
    'modern-sartre-dialectical-reason',
    'modern-foucault-madness',
    'modern-foucault-order-things',
    'modern-derrida-grammatology',
    'modern-foucault-discipline',
  ],
  constantinople: [
    'world-constantinople',
    'world-justinian',
    'category-hagia-sophia',
    'world-schism',
    'world-constantinople-sack',
    'world-ottoman-constantinople',
    'world-tanzimat',
    'world-young-turk-revolution',
  ],
}
export const explicitEventPlaces: Record<string, string[]> = {
  'world-milan': [],
  'world-abbasid': [],
  'world-black-death': [],
  'modern-marcus-meditations': [],
}
for (const [placeId, ids] of Object.entries(placeEvents))
  for (const id of ids) (explicitEventPlaces[id] ??= []).push(placeId)

export function connectEventReading(event: HistoryEvent): HistoryEvent {
  const connections = personEventConnections[event.id] ?? {}
  const related = [...(event.relatedEvents ?? [])]
  for (const [first, second, forward, backward, note] of connectedReadings) {
    const id = event.id === first ? second : event.id === second ? first : null
    if (id && !related.some((relation) => relation.id === id))
      related.push({ id, label: event.id === first ? forward : backward, note })
  }
  return {
    ...event,
    people: [...new Set([...event.people, ...Object.keys(connections)])],
    ...(Object.keys(connections).length
      ? { peopleNotes: { ...event.peopleNotes, ...connections } }
      : {}),
    ...(related.length ? { relatedEvents: related } : {}),
    ...(Object.hasOwn(explicitEventPlaces, event.id)
      ? { placeIds: explicitEventPlaces[event.id] }
      : {}),
  }
}
