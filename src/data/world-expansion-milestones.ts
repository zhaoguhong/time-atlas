import type { HistoryEvent } from '../types'

// Original reading notes. A marker locates a documented place or regional
// reference; it does not claim that every named person visited that point.
const milestone = (
  record: Omit<HistoryEvent, 'people' | 'locationNote'> & { locationNote?: string },
): HistoryEvent => ({
  people: [],
  locationNote: '坐标为所述城市、战场或区域的阅读参照，不表示事件仅发生于此，也不是人物行程记录。',
  ...record,
})
export const worldMilestoneEvents: HistoryEvent[] = [
  milestone({
    id: 'world-salamis',
    year: -480,
    title: '萨拉米斯海战',
    category: '战争',
    region: 'europe',
    themes: ['希波战争'],
    location: '萨拉米斯海峡',
    coordinates: [23.57, 37.95],
    importance: 5,
    summary:
      '薛西斯入侵希腊期间，希腊联军在萨拉米斯附近海峡击败波斯舰队。海上胜利改变了入侵的补给与战略条件。',
    background:
      '希腊城邦对是否抵抗波斯并不一致。温泉关失守、雅典遭到攻占后，海军仍是联军的重要力量。',
    details: [
      '希罗多德、埃斯库罗斯等留下不同性质的叙述，战术细节和兵力数字仍有争议。不能把海战塑造成全部希腊人一致行动或东西文明的简单对立。',
    ],
    impact:
      '波斯的军事威胁并未立即结束，次年的普拉提亚等战役同样重要；海战则成为理解希波战争转折的关键节点。',
    sources: [
      {
        title: 'Encyclopaedia Iranica · Salamis',
        url: 'https://www.iranicaonline.org/articles/salamis/',
        note: 'Christopher J. Tuplin，萨拉米斯条目；核对前480年海战、古代叙述及后续战争。',
      },
    ],
  }),
  milestone({
    id: 'world-tetrarchy',
    year: 293,
    title: '戴克里先建立四帝共治体制',
    category: '政治',
    region: 'west-asia',
    themes: ['罗马帝国', '制度'],
    location: '尼科米底亚及帝国其他共治中心',
    coordinates: [29.94, 40.77],
    importance: 4,
    summary:
      '戴克里先把既有两位奥古斯都的安排扩展为两位奥古斯都、两位凯撒共同执政，试图处理边防、继承与地方治理的难题。',
    background:
      '三世纪罗马经历内战、皇位更迭与边境压力。帝国幅员辽阔，单一皇帝难以同时应对各处危机。',
    details: [
      '四帝分别承担不同地区的军事行政任务，但仍宣称帝国统一。共治者之间的合作并未形成可以自动执行的稳定继承制度。',
    ],
    impact: '共治体制展示晚期罗马的行政重组，也为此后帝位竞争和君士坦丁重新统一帝国提供背景。',
    sources: [
      {
        title: 'The Metropolitan Museum of Art · Roman Art: A Resource for Educators',
        url: 'https://resources.metmuseum.org/resources/metpublications/pdf/Roman_Art_A_Resource_for_Educators.pdf',
        note: '历史背景中戴克里先与四帝共治段，明确纪年293年。',
      },
    ],
  }),
  milestone({
    id: 'world-yarmuk',
    year: 636,
    title: '雅尔穆克战役与叙利亚局势转变',
    category: '战争',
    region: 'west-asia',
    themes: ['伊斯兰世界'],
    location: '雅尔穆克河一带',
    coordinates: [35.9, 32.81],
    importance: 5,
    summary: '阿拉伯穆斯林军队在雅尔穆克河地区击败拜占庭军队，叙利亚的军事与统治格局出现重大转折。',
    background:
      '拜占庭和萨珊波斯之间的长期战争消耗了资源。阿拉伯半岛形成新的政治力量后，战争延伸至两大帝国边境。',
    details: [
      '战役结果与此后各城的投降、谈判和行政接续应分别理解。统治更替不意味着当地居民在同一年改变宗教。',
    ],
    impact: '拜占庭在叙利亚的统治受到决定性打击，早期哈里发政权获得进一步扩展的条件。',
    sources: [
      {
        title: 'OpenStax · World History 1 · 11.2 The Arab-Islamic Conquests',
        url: 'https://openstax.org/books/world-history-volume-1/pages/11-2-the-arab-islamic-conquests-and-the-first-islamic-states',
        note: '叙利亚征服与636年雅尔穆克战役段。',
      },
      {
        title: 'Fordham University · Al-Baladhuri: The Battle of the Yarmuk',
        url: 'https://sourcebooks.web.fordham.edu/source/yarmuk.asp',
        note: '巴拉祖里征服叙事英译；作为后出的历史叙事阅读，不照录其兵力数字。',
      },
    ],
  }),
  milestone({
    id: 'world-taika',
    year: 645,
    title: '日本大化改新的政治转折',
    category: '政治',
    region: 'east-asia',
    themes: ['制度', '交流'],
    location: '飞鸟地区',
    coordinates: [135.82, 34.47],
    importance: 4,
    summary:
      '645年的宫廷政变后，日本朝廷启动通常称为大化改新的制度调整，借鉴大陆制度，加强中央对土地、赋税和官僚组织的控制。',
    background:
      '氏族竞争与王权建设长期并存。朝鲜半岛和中国的政治文化为日本朝廷提供了多种制度资源。',
    details: [
      '改革诏书主要通过后出的史书保存，诏令中的制度目标与实际实施不宜混为一谈。645年是政治转折点，而非所有制度同时完成的一年。',
    ],
    impact: '改革构成日本律令国家形成过程的一部分，显示制度跨区域传播中持续的选择与改造。',
    dateNote: '政变与改元为645年；改革诏令及落实跨越后续年份，现存文本也有编纂问题。',
    sources: [
      {
        title: 'Columbia University · Excerpts from the Reform Edict of Taika',
        url: 'https://afe.easia.columbia.edu/ps/japan/taika.pdf',
        note: '导言及改革诏书节译；核对645年政变、646年诏令与改革内容。',
      },
    ],
  }),
  milestone({
    id: 'world-baghdad-founded',
    year: 762,
    title: '阿拔斯王朝营建巴格达',
    category: '政治',
    region: 'west-asia',
    themes: ['工程建筑', '经济贸易', '城市'],
    location: '巴格达',
    coordinates: [44.37, 33.32],
    importance: 4,
    summary:
      '哈里发曼苏尔在底格里斯河地区营建巴格达，使其成为阿拔斯统治的重要中心，城市随后发展为跨区域贸易和学术活动的枢纽。',
    background:
      '阿拔斯革命后，新王朝需要新的统治中心。两河地区的交通、农业与既有行政传统为城市建设提供条件。',
    details: [
      '城市规划、宫廷需求、市场与知识网络相互作用。后来的学术繁荣历经多代积累，不能归为建城当年的单次成就。',
    ],
    impact: '巴格达连接伊朗、两河与更广阔的伊斯兰世界，成为中世纪欧亚城市史的重要节点。',
    sources: [
      {
        title: 'Cambridge University Press · World Cities in History · Baghdad',
        url: 'https://www.cambridge.org/core/books/abs/world-cities-in-history/baghdad/436F7DC281A07230C18E78D741E172E7',
        note: '第8章摘要明确曼苏尔762年建城，并讨论贸易与学术网络。',
      },
    ],
  }),
  milestone({
    id: 'world-manzikert',
    year: 1071,
    title: '曼齐刻尔特战役',
    category: '战争',
    region: 'west-asia',
    themes: ['拜占庭', '塞尔柱'],
    location: '曼齐刻尔特（今马拉兹吉尔特）',
    coordinates: [42.54, 39.15],
    importance: 4,
    summary:
      '塞尔柱军队击败拜占庭皇帝罗曼努斯四世率领的军队，皇帝被俘。战败与后续内争共同改变安纳托利亚的权力分布。',
    background: '拜占庭与塞尔柱势力围绕东部边境竞争，军队指挥、贵族政治和地方资源都影响战局。',
    details: [
      '战役不是奥斯曼帝国发动的战争，也没有令整个安纳托利亚在一天内易手。其长远意义需要结合其后多年迁徙、内战与地方控制变化理解。',
    ],
    impact: '它成为拜占庭政治危机与安纳托利亚长期转型的标志性事件。',
    sources: [
      {
        title: 'Oxford Bibliographies · Battle of Manzikert',
        url: 'https://academic.oup.com/reference/62399/reference-article-abstract/561732157',
        note: '条目导论，1071年8月26日及交战双方；后续解释参见所列研究。',
      },
    ],
  }),
  milestone({
    id: 'world-ayn-jalut',
    year: 1260,
    title: '艾因贾鲁战役',
    category: '战争',
    region: 'west-asia',
    themes: ['蒙古', '马穆鲁克'],
    location: '艾因贾鲁一带',
    coordinates: [35.36, 32.55],
    importance: 4,
    summary:
      '埃及马穆鲁克军队在巴勒斯坦地区击败一支蒙古军队，阻止了蒙古力量在这一阶段继续向埃及推进。',
    background:
      '蒙古军队此前攻陷巴格达并进入叙利亚。旭烈兀率主力离开后，留下的军队面对马穆鲁克政权的反击。',
    details: [
      '这是具体区域与兵力条件下的胜负，不能解释为蒙古势力从此完全停止西向活动。拉施特的记述也需与其他材料互证。',
    ],
    impact: '战役巩固马穆鲁克在埃及和叙利亚的地位，成为蒙古西征与近东政治史的重要转折。',
    sources: [
      {
        title: 'Texas Tech University · Jami al-Tawarikh: The Battle of Ayn Jalut',
        url: 'https://www.myweb.ttu.edu/jhowe/syllabi/Ayn%20Jalut.html',
        note: '大学课程收录拉施特《史集》节译；核对1260年、主力撤离背景与战役叙事，日历换算不据此精确到日。',
      },
    ],
  }),
  milestone({
    id: 'world-tordesillas',
    year: 1494,
    title: '西葡签订《托尔德西里亚斯条约》',
    category: '交流',
    region: 'europe',
    themes: ['经济贸易', '殖民扩张'],
    location: '托尔德西里亚斯',
    coordinates: [-5.0, 41.5],
    importance: 4,
    summary:
      '卡斯蒂利亚与葡萄牙通过一条大西洋分界线分配各自主张的海外势力范围，试图缓和航海扩张引起的竞争。',
    background:
      '哥伦布航行后的新领土主张与葡萄牙既有航海权益发生冲突，教皇裁决和王室谈判共同塑造协议。',
    details: [
      '两国的划分没有取得当地原住民同意，也不等于它们已经实际统治分界线两侧的广大地区。经度测定和其他欧洲国家的竞争继续带来争议。',
    ],
    impact: '条约影响葡萄牙对巴西的主张和后续殖民格局，是研究欧洲海外扩张与原住民主权的切入点。',
    sources: [
      {
        title: 'OpenStax · World History 2 · 5.2 Crossing the Atlantic',
        url: 'https://openstax.org/books/world-history-volume-2/pages/5-2-crossing-the-atlantic',
        note: 'The Treaty of Tordesillas小节；明确1494年签约、1506年教皇认可及巴西关联。',
      },
    ],
  }),
  milestone({
    id: 'world-east-india-charter',
    year: 1600,
    title: '英国东印度公司获贸易特许状',
    category: '交流',
    region: 'europe',
    themes: ['经济贸易', '殖民扩张'],
    location: '伦敦',
    coordinates: [-0.13, 51.51],
    importance: 4,
    summary:
      '伦敦商人组织的东印度公司获得王室贸易特许，成为英国进入亚洲海上商业网络的重要组织形式。',
    background:
      '欧洲海上力量围绕亚洲商品竞争。公司需要与亚洲港口统治者协商贸易权，而非自成立时便控制印度。',
    details: [
      '早期贸易航次与后来公司的领土统治分属不同阶段。特许状、商站和公司行政档案可以追踪商业组织逐步获得政治与军事权力的过程。',
    ],
    impact: '公司连接欧洲与亚洲市场，其后向殖民统治转变，对南亚产生深刻影响。',
    sources: [
      {
        title: 'British Library · East India Company Charters, IOR/A/1',
        url: 'https://searcharchives.bl.uk/catalog/036-000178601',
        note: '馆藏IOR/A/1的1600年特许状与Administrative Context；本条仅采用一致的年份，不据目录导言确定月日。',
      },
    ],
  }),
  milestone({
    id: 'world-voc-founded',
    year: 1602,
    title: '荷兰东印度公司成立',
    category: '交流',
    region: 'europe',
    themes: ['经济贸易', '殖民扩张'],
    location: '阿姆斯特丹',
    coordinates: [4.9, 52.37],
    importance: 4,
    summary:
      '荷兰多家远洋贸易组织合并为荷兰东印度公司，凭借资本募集与国家特许参与亚洲贸易，并逐步建立带有武力的商业网络。',
    background:
      '荷兰商人试图突破伊比利亚势力在香料贸易中的优势。相互竞争的公司促成由国家支持的联合组织。',
    details: [
      '公司成立于荷兰，巴达维亚据点到1619年才建立；贸易组织、股份机制与此后的殖民统治需要分开观察。亚洲贸易伙伴、强制交易和殖民暴力同样属于公司历史。',
    ],
    impact:
      '股份发行与交易拓展了资本募集方式，公司也成为跨区域资本与殖民扩张的重要载体，其档案也保存亚洲多地的贸易和社会记录。',
    locationNote: '坐标为阿姆斯特丹经营与资本募集中心的参照，不表示亚洲各据点同时建立。',
    sources: [
      {
        title: 'Euronext · 415th anniversary',
        url: 'https://www.euronext.com/en/about/media/bell-ceremony-archive/415th-anniversary',
        note: '交易所机构史，1602年VOC发行股份与阿姆斯特丹证券交易传统；不把公司成立与后来的交易所建筑启用混同。',
      },
      {
        title: 'UNESCO · Archives of the Dutch East India Company',
        url: 'https://www.unesco.org/en/memory-world/archives-dutch-east-india-company',
        note: '世界记忆项目说明，核对1602年成立及亚洲贸易档案范围。',
      },
    ],
  }),
  milestone({
    id: 'world-pueblo-revolt',
    year: 1680,
    title: '普韦布洛起义',
    category: '战争',
    region: 'americas',
    themes: ['社会', '宗教', '殖民与抵抗'],
    location: '新墨西哥普韦布洛地区',
    coordinates: [-105.94, 35.69],
    importance: 4,
    summary:
      '普韦布洛多个共同体联合反抗西班牙殖民统治，迫使殖民者退出新墨西哥的主要据点，获得一段恢复自主的时期。',
    background:
      '强制劳动、贡赋与宗教压制积累长期矛盾。不同共同体通过联络协调起义，同时保留各自的利益与传统。',
    details: [
      '起义后的地方关系并非没有冲突；西班牙在1692年开始重新进入。原住民的政治行动与殖民者的军事反应都需要纳入这一过程。',
    ],
    impact: '事件显示美洲原住民对殖民秩序的主动抵抗，也改变了西班牙此后在当地的统治方式。',
    sources: [
      {
        title: 'U.S. National Park Service · The Spaniards, El Morro',
        url: 'https://home.nps.gov/elmo/learn/historyculture/the-spaniards.htm',
        note: 'The Pueblo Revolt小节，1680年起义与1692年西班牙重返。',
      },
    ],
  }),
  milestone({
    id: 'world-slave-trade-abolition',
    year: 1807,
    title: '英国通过废除奴隶贸易法',
    category: '社会',
    region: 'europe',
    themes: ['政治', '经济贸易', '奴隶制与废奴'],
    location: '伦敦议会',
    coordinates: [-0.12, 51.5],
    importance: 4,
    summary:
      '英国议会通过禁止英国参与奴隶贸易的法律。废奴运动者、被奴役者的反抗与公共请愿推动了这一变化。',
    background:
      '大西洋奴隶贸易与种植园经济长期相连。废除派通过证词、出版、抵制商品和议会活动挑战其合法性。',
    details: [
      '禁止贸易并没有立即解放殖民地已被奴役的人，非法贩运也继续存在。1807年的法律与1833年废除奴隶制度的法律应分别阅读。',
    ],
    impact: '法律限制英国合法奴隶贸易，却把更广泛的人身解放与殖民劳动制度问题留给后续斗争。',
    sources: [
      {
        title: 'UK Parliament · Parliament abolishes the slave trade',
        url: 'https://www.parliament.uk/about/living-heritage/transformingsociety/tradeindustry/slavetrade/overview/parliament-abolishes-the-slave-trade/',
        note: '1807年法案提出及通过过程；禁止贸易与废除奴隶制度有别。',
      },
    ],
  }),
  milestone({
    id: 'world-java-war',
    year: 1825,
    endYear: 1830,
    dateLabel: '1825—1830年',
    dateNote: '采用爪哇战争的起止年份；不能把五年的冲突视为单次战役。',
    title: '蒂博尼哥罗领导爪哇战争',
    category: '战争',
    region: 'southeast-asia',
    themes: ['社会', '殖民与抵抗'],
    location: '日惹及中爪哇',
    coordinates: [110.37, -7.8],
    importance: 4,
    summary: '蒂博尼哥罗及其支持者与荷兰殖民军在爪哇交战，战争广泛影响地方政治、人口与农业社会。',
    background:
      '殖民介入、宫廷竞争、土地与宗教问题共同积累矛盾。参与者来自不同社会群体，诉求并不完全一致。',
    details: [
      '蒂博尼哥罗流放期间写成的《蒂博尼哥罗纪事》保存其对战争与爪哇历史的叙述。自传性材料具有重要价值，也需辨析作者立场。',
    ],
    impact: '战争加深殖民统治的军事和财政压力；蒂博尼哥罗后来成为印度尼西亚反殖民记忆的重要人物。',
    sources: [
      {
        title: 'UNESCO · The Netherlands: Museums confront the country’s colonial past',
        url: 'https://www.unesco.org/en/articles/netherlands-museums-confront-countrys-colonial-past-0',
        note: 'An Indonesian hero’s dagger returned小节，明确1825—1830年战争及藏品背景。',
      },
      {
        title: 'UNESCO · Babad Diponegoro nomination',
        url: 'https://media.unesco.org/sites/default/files/webform/mow001/indonesia_netherlands_babad_diponegoro.pdf',
        note: '申报材料第6页，战争年代、流放与纪事成书时间。',
      },
    ],
  }),
  milestone({
    id: 'world-slavery-abolition-act',
    year: 1833,
    title: '英国《废除奴隶制法》通过',
    category: '社会',
    region: 'europe',
    themes: ['政治', '奴隶制与废奴'],
    location: '伦敦议会',
    coordinates: [-0.12, 51.5],
    importance: 4,
    summary:
      '英国议会通过废除大部分英国殖民地奴隶制度的法律，主要条款于1834年生效，但保留了强制学徒制与地域例外。',
    background:
      '1807年禁止贸易后，殖民地奴隶制度仍存在。被奴役者的反抗、长期宣传和政治改革使全面废奴诉求更为迫切。',
    details: [
      '赔偿支付给奴隶主，被解放者没有获得同等补偿。学徒制继续限制劳动自由，直到1838年才提前结束；法律解放不等于社会不平等消失。',
    ],
    impact: '这是殖民劳动制度的重要转折，也说明法律文本、实际人身自由与经济权利之间存在距离。',
    dateNote: '1833年为立法年份，1834年起主要条款生效；不把二者混写。',
    sources: [
      {
        title: 'UK Parliament · The Transatlantic Slave Trade',
        url: 'https://heritagecollections.parliament.uk/stories/the-transatlantic-slave-trade/',
        note: 'Slavery Abolition Act, 1833小节，生效年份、赔偿与学徒制；学徒制1838年结束另见议会研究报告。',
      },
      {
        title: 'House of Commons Library · The public finances: a historical overview',
        url: 'https://researchbriefings.files.parliament.uk/documents/CBP-8265/CBP-8265.pdf',
        note: '2.4 Abolition of slavery，1834年实施、1838年完全结束学徒制及赔偿对象。',
      },
    ],
  }),
  milestone({
    id: 'world-peoples-charter',
    year: 1838,
    title: '英国《人民宪章》与宪章运动',
    category: '社会',
    region: 'europe',
    themes: ['政治', '公民与权利'],
    location: '伦敦及英国各地',
    coordinates: [-0.13, 51.51],
    importance: 4,
    summary:
      '伦敦工人协会提出《人民宪章》，要求扩大男性选举权、秘密投票和改革议会制度，并推动全国性群众请愿。',
    background:
      '1832年议会改革仍把大量劳动者排除在投票权之外。工业城市发展与工人组织为群众运动提供条件。',
    details: [
      '六项主张并未在1838年得到实施，1839、1842和1848年的请愿也经历挫折。其男性普选诉求仍没有涵盖妇女的政治平等。',
    ],
    impact: '宪章运动推动了大众政治与劳动者的公共参与，若干诉求在此后制度改革中逐步实现。',
    sources: [
      {
        title: 'UK Parliament · The Chartist movement',
        url: 'https://www.parliament.uk/about/living-heritage/transformingsociety/electionsvoting/chartists/overview/chartistmovement/',
        note: '1838年宪章六项要求、1839年请愿及后续运动。',
      },
    ],
  }),
  milestone({
    id: 'world-tanzimat',
    year: 1839,
    title: '奥斯曼《玫瑰园敕令》与坦志麦特改革',
    category: '政治',
    region: 'west-asia',
    themes: ['社会', '制度改革'],
    location: '伊斯坦布尔',
    coordinates: [28.98, 41.01],
    importance: 4,
    summary:
      '奥斯曼苏丹阿卜杜勒迈吉德颁布《玫瑰园敕令》，承诺调整臣民权利、税收和征兵秩序，开启通常称为坦志麦特的改革时期。',
    background: '帝国面对军事失利、财政压力与欧洲列强干预，先前的军政改革已改变宫廷和行政运作。',
    details: [
      '敕令中的平等与安全承诺需要在不同地区落实，也受到权力关系和财政条件制约。改革是跨越数十年的过程，不宜视为一次完成的现代化。',
    ],
    impact: '坦志麦特重塑奥斯曼的法律行政与臣民身份，成为理解晚期帝国与近代西亚政治的关键。',
    sources: [
      {
        title: 'The Metropolitan Museum of Art · The Later Ottomans and the Impact of Europe',
        url: 'https://www.metmuseum.org/essays/the-later-ottomans-and-the-impact-of-europe',
        note: '阿卜杜勒迈吉德、Gülhane敕令与后续改革段；核对1839年改革起点。',
      },
    ],
  }),
  milestone({
    id: 'world-seneca-falls',
    year: 1848,
    title: '塞尼卡福尔斯妇女权利大会',
    category: '社会',
    region: 'americas',
    themes: ['政治', '公民与权利'],
    location: '塞尼卡福尔斯',
    coordinates: [-76.8, 42.91],
    importance: 4,
    summary:
      '改革者在纽约州塞尼卡福尔斯召开妇女权利大会，通过《感伤宣言》，讨论教育、财产、法律地位与政治参与的不平等。',
    background:
      '废奴运动、宗教改革与地方社群网络为组织者提供合作经验。参与公共运动的女性也直接经历了发言和代表资格的限制。',
    details: [
      '大会不是妇女争取权利的全部起源，参会者也不能代表所有群体。宣言借用独立宣言的语言，把平等原则用于批评现实制度。',
    ],
    impact:
      '大会成为美国妇女权利运动的标志性节点，后续组织继续围绕投票权及更广泛的社会权利开展行动。',
    sources: [
      {
        title: 'U.S. National Park Service · Nineteenth Century Activism',
        url: 'https://www.nps.gov/articles/featured_stories_wori.htm',
        note: '1848年7月19—20日大会、组织者及Declaration of Sentiments段。',
      },
    ],
  }),
  milestone({
    id: 'world-kingitanga',
    year: 1858,
    title: '毛利国王运动确立共同政治领导',
    category: '政治',
    region: 'oceania',
    themes: ['社会', '殖民与抵抗'],
    location: '恩加鲁阿瓦希亚',
    coordinates: [175.15, -37.67],
    importance: 4,
    summary:
      '波塔陶·特·费罗费罗被拥立为首位毛利国王。支持者希望通过共同权威保护土地，并在殖民扩张中加强毛利自主。',
    background:
      '土地交易、定居殖民压力与地方政治分散使若干部族寻求合作。运动经过多年讨论，并非得到所有毛利共同体一致支持。',
    details: [
      '毛利国王运动不能简单等同于欧洲王权的移植，也不能据其存在推断全部毛利地区具有统一疆界。它兼具土地保护、协商和政治自主目标。',
    ],
    impact: '运动形成持续的毛利政治制度，并与随后的怀卡托战争及土地问题紧密关联。',
    sources: [
      {
        title: 'New Zealand Ministry for Culture and Heritage · The search for a king',
        url: 'https://nzhistory.govt.nz/media/interactive/king-movement-map',
        note: '1858年6月恩加鲁阿瓦希亚拥立首位国王的地图与说明。',
      },
    ],
  }),
  milestone({
    id: 'world-geneva-convention',
    year: 1864,
    title: '首部《日内瓦公约》签订',
    category: '交流',
    region: 'europe',
    themes: ['社会', '科技医学', '战争法'],
    location: '日内瓦',
    coordinates: [6.14, 46.2],
    importance: 4,
    summary: '多国代表签订关于改善战地伤病军人处境的公约，规定对救护机构、医务人员和伤兵的保护。',
    background: '近代战争造成大量伤亡，志愿救护行动与国际协商试图把救治义务纳入政府之间的约定。',
    details: [
      '1864年公约只覆盖特定战地救护问题，不能套用后来1949年四部公约的完整保护范围。条约承诺与战争中的实际执行仍有距离。',
    ],
    impact: '公约成为现代国际人道法发展的重要起点，为此后扩大保护范围提供基础。',
    sources: [
      {
        title: 'International Committee of the Red Cross · Geneva Convention, 22 August 1864',
        url: 'https://ihl-databases.icrc.org/assets/treaties/120-IHL-GC1864-EN.pdf',
        note: '1864年公约正文，第1—6条及签署日期；不以其代替后续版本。',
      },
    ],
  }),
  milestone({
    id: 'world-paris-commune',
    year: 1871,
    title: '巴黎公社',
    category: '社会',
    region: 'europe',
    themes: ['政治', '劳动与社会'],
    location: '巴黎',
    coordinates: [2.35, 48.86],
    importance: 4,
    summary:
      '普法战争失败与围城危机后，巴黎出现与凡尔赛政府对立的公社政权，尝试地方自治及社会改革，随后遭到武力镇压。',
    background: '战争、经济困难、国民自卫军动员与共和国前途之争叠加，巴黎民众对政府的不信任加深。',
    details: [
      '公社内部包含不同政治立场，措施也有实施程度之别。3月18日起义、3月下旬选举和5月镇压属于同一短暂而复杂的过程。',
    ],
    impact: '公社成为社会主义、共和主义和劳动运动的重要历史记忆，其暴力结局也长期影响法国政治。',
    dateNote: '1871年3月至5月；不将公社议会选举与起义起点混为同一日期。',
    sources: [
      {
        title: 'Musée Carnavalet · Le parcours: La Commune de Paris',
        url: 'https://www.carnavalet.paris.fr/le-nouveau-parcours',
        note: '巴黎围城与公社展厅，1871年3月18日至5月28日及展品说明。',
      },
    ],
  }),
  milestone({
    id: 'world-kumasi-1874',
    year: 1874,
    title: '英军攻入库马西',
    category: '战争',
    region: 'africa',
    themes: ['殖民扩张'],
    location: '库马西',
    coordinates: [-1.62, 6.69],
    importance: 3,
    summary: '英国军队在第三次英阿散蒂战争中进入阿散蒂都城库马西，城内包括王宫在内的建筑遭到破坏。',
    background:
      '阿散蒂与英国围绕黄金海岸贸易、通道和政治影响长期竞争。战争牵涉多个非洲政治共同体，而非只有两支欧洲式国家军队。',
    details: [
      '攻城与战利品带走属于同一殖民战争背景。博物馆中的军事和宫廷物品需连同征集、掠夺与返还问题阅读。',
    ],
    impact: '战争削弱阿散蒂力量，但没有立即结束其政治自主与后续抵抗。',
    sources: [
      {
        title: 'National Army Museum · Gold Coast Regiment Company arriving in Kumasi',
        url: 'https://collection.nam.ac.uk/detail.php?acc=1978-07-8-35',
        note: '馆藏说明追述1874年英军毁坏库马西部分城区与王宫；馆藏照片本身摄于1909年，不冒充战时影像。',
      },
    ],
  }),
  milestone({
    id: 'world-berlin-congress',
    year: 1878,
    title: '柏林会议重订巴尔干安排',
    category: '交流',
    region: 'europe',
    themes: ['政治', '国际秩序'],
    location: '柏林',
    coordinates: [13.4, 52.52],
    importance: 4,
    summary:
      '列强在俄土战争后召开柏林会议，修订圣斯特法诺初步和约，重新安排巴尔干的国家地位、疆域和奥斯曼属地。',
    background:
      '俄国军事胜利与英国、奥匈等国的战略担忧引发外交协调。巴尔干民族诉求与列强利益并不相同。',
    details: [
      '条约涉及罗马尼亚、塞尔维亚、黑山的独立承认及保加利亚等地的安排。1878年会议不同于1884—1885年讨论非洲殖民规则的柏林会议。',
    ],
    impact:
      '会议暂时缓和列强冲突，也留下领土与民族政治问题；纸面条约不表示所有地方同时完成行政交接。',
    sources: [
      {
        title: 'U.S. Department of State · FRUS 1878 · The Treaty of Berlin',
        url: 'https://history.state.gov/historicaldocuments/frus1878/d523',
        note: '1878年7月13日条约正文及批准书交换记录；与非洲柏林会议严格区分。',
      },
    ],
  }),
  milestone({
    id: 'world-maji-maji',
    year: 1905,
    endYear: 1907,
    dateLabel: '1905—1907年',
    dateNote: '德国档案馆将主要军事镇压记为1905—1907年，饥荒和社会破坏并不随该区间立即结束。',
    title: '马及马及战争与德属东非殖民镇压',
    category: '战争',
    region: 'africa',
    themes: ['社会', '殖民与抵抗'],
    location: '今坦桑尼亚南部地区',
    coordinates: [38.76, -8.87],
    importance: 4,
    summary:
      '德属东非多个地区的共同体反抗殖民统治。德国殖民军的镇压以及食物生产遭到破坏，造成广泛的社会灾难。',
    background:
      '殖民税收、强制劳动与经济控制激化地方矛盾。不同群体的参与方式和起义目标并不完全一致。',
    details: [
      '殖民军事档案保存行动编制与战事时间，但其“平叛”语言体现统治者立场。本条不照录不一致的死亡估计，也不把德国军队的叙述作为唯一视角。',
    ],
    impact: '起义是东非反殖民史的重要节点，其后果涉及饥荒、人口流离与地方社会的长期重建。',
    sources: [
      {
        title: 'University of Potsdam · Maji Maji War',
        url: 'https://www.uni-potsdam.de/en/botanischer-garten/unser-garten/kolonialismus/maji-maji-krieg',
        note: '大学植物园殖民史展，棉田、强制劳动、焦土镇压与饥荒；核对1905—1907年。',
      },
      {
        title: 'Bundesarchiv · Preußische und deutsche Streitkräfte 1867 bis 1918',
        url: 'https://www.bundesarchiv.de/im-archiv-recherchieren/archivgut-recherchieren/nach-themen/preussische-und-deutsche-streitkraefte-1867-bis-1918/',
        note: 'Kaiserliche Schutztruppen—Einsätze中的Maji-Maji-Aufstand 1905–07，用于军事时段核对。',
      },
    ],
  }),
]
