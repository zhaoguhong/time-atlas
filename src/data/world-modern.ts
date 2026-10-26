import type { HistoryEvent, Source } from '../types'

// Independently written reading notes. Modern event markers never supply
// historical territory geometry or assert the journeys of named people.
const ref = (title: string, url: string, note: string): Source => ({ title, url, note })
const item = (
  record: Omit<HistoryEvent, 'people' | 'locationNote'> & { locationNote?: string },
): HistoryEvent => ({
  people: [],
  locationNote:
    '坐标为所述地点、出版地或国际协商中心的阅读参照；跨地区过程不只发生在此，也不据此推断人物行程。',
  ...record,
})
const textbook = (chapter: string, slug: string, note: string) =>
  ref(
    `OpenStax · World History 2 · ${chapter}`,
    `https://openstax.org/books/world-history-volume-2/pages/${slug}`,
    note,
  )
const diplomat = (title: string, path: string, note: string) =>
  ref(`U.S. Office of the Historian · ${title}`, `https://history.state.gov/${path}`, note)

export const modernWorldEvents: HistoryEvent[] = [
  item({
    id: 'modern-panama-canal',
    year: 1914,
    title: '巴拿马运河正式通航',
    category: '交流',
    region: 'americas',
    themes: ['工程建筑', '经济贸易'],
    location: '巴拿马地峡',
    coordinates: [-79.58, 9.08],
    importance: 5,
    summary: '巴拿马运河以船闸与人工湖连接大西洋、太平洋航路，安孔号于1914年8月完成正式通航航次。',
    background:
      '法国先期工程失败后，美国接续建设。地峡政治、移民劳工、疾病防治与大型土木工程共同塑造这一项目。',
    details: [
      '通航并不等于运河主权争议终结。运河区长期由美国控制，运营与管理的移交直到20世纪末才完成。',
    ],
    impact: '运河显著改变跨洋航运组织，也成为研究工程、帝国权力与巴拿马主权的重要案例。',
    sources: [
      ref(
        'Autoridad del Canal de Panamá · Preguntas Frecuentes',
        'https://pancanal.com/preguntas-frecuentes/',
        '核对1914年8月15日安孔号正式通航、1904年美国接续工程及施工劳工背景。',
      ),
    ],
  }),
  item({
    id: 'modern-first-world-war',
    year: 1914,
    endYear: 1918,
    dateLabel: '1914—1918年',
    dateNote: '此范围表示主要战争阶段；1918年停战不等于各国和平条约同时签订。',
    title: '第一次世界大战',
    category: '战争',
    region: 'europe',
    themes: ['政治', '社会'],
    location: '欧洲及跨洲战场',
    coordinates: [4.7, 50.8],
    importance: 5,
    summary: '萨拉热窝危机在动员、联盟与外交决策中扩大为大战，冲突牵动欧洲、殖民地和世界贸易网络。',
    background:
      '民族主义、帝国竞争、军备建设与安全焦虑积累多年；战争并非一次刺杀之后不可避免的自动结果。',
    details: [
      '工业化火力、堑壕、海上封锁与社会动员改变了战争形态。士兵、殖民地劳工与平民的经历也不能用单一战线概括。',
    ],
    impact: '战争导致巨大伤亡、帝国解体与政治革命，战后安排继续影响边界、债务与国际秩序。',
    sources: [
      textbook(
        '11.2 The Coming of War',
        '11-2-the-collapse-of-the-ottomans-and-the-coming-of-war',
        '1914年危机、战争爆发及参战网络。',
      ),
      textbook(
        '11.5 The War Ends',
        '11-5-the-war-ends',
        '1918年战争结束、革命与停战；与1919年和约分开。',
      ),
    ],
  }),
  item({
    id: 'modern-general-relativity',
    year: 1915,
    title: '爱因斯坦完成广义相对论的引力场方程',
    category: '文化',
    region: 'europe',
    themes: ['科技医学', '教育学术'],
    location: '柏林',
    coordinates: [13.4, 52.52],
    importance: 5,
    summary: '爱因斯坦在1915年提出成熟的广义相对论引力方程，以时空几何描述引力及物质之间的关系。',
    background:
      '狭义相对论尚不能完整处理引力。等效原理、数学工具与长期反复计算共同推动新理论形成。',
    details: [
      '1915年的方程报告、1916年的综述论文与1919年的日食观测是不同节点。理论提出不表示当时已经完成全部检验。',
    ],
    impact: '广义相对论改变了宇宙、引力与时空研究的框架，成为此后天体物理与宇宙学的重要基础。',
    sources: [
      ref(
        'NASA · Einstein and General Relativity',
        'https://www.nasa.gov/image-article/einstein-general-relativity/',
        '核对1915年11月理论突破与1916年发表的区别。',
      ),
    ],
  }),
  item({
    id: 'modern-russian-revolutions',
    year: 1917,
    title: '俄国二月与十月革命',
    category: '政治',
    region: 'europe',
    themes: ['社会'],
    location: '彼得格勒及俄国各地',
    coordinates: [30.31, 59.94],
    importance: 5,
    summary:
      '战争、粮食与政治危机促使俄国帝制崩溃；临时政府与苏维埃并立之后，布尔什维克在秋季夺取中央政权。',
    background:
      '一战消耗军队和经济，城市抗议与士兵不满加剧。不同党派围绕土地、和平与政治代表权提出竞争方案。',
    details: [
      '“二月”“十月”沿用俄国旧历名称，按公历分别对应3月和11月。革命、随后内战与1922年苏联成立不能合并为同一天。',
    ],
    impact: '革命改变俄国国家与社会制度，并使社会主义运动、反革命战争与国际政治产生新的联结。',
    dateNote: '保留传统旧历名称；事件年份均为1917，不误作两次历法不同的革命。',
    sources: [
      textbook(
        '11.5 The War Ends',
        '11-5-the-war-ends',
        '俄国1917年革命、退位、临时政府及布尔什维克掌权段。',
      ),
    ],
  }),
  item({
    id: 'modern-luxun-diary',
    year: 1918,
    title: '鲁迅《狂人日记》发表',
    category: '文化',
    region: 'china',
    themes: ['文学艺术', '教育学术'],
    location: '北京与《新青年》的出版网络',
    coordinates: [116.4, 39.9],
    importance: 4,
    summary:
      '鲁迅以白话小说《狂人日记》参与新文学实验，通过不稳定的叙述视角检视礼教、社会关系与个体处境。',
    background:
      '报刊公共空间、白话文倡议与新文化争论相互推动，文学形式也成为讨论中国社会问题的方式。',
    details: [
      '小说中的“狂人”是文学人物，不能把故事当作作者的医疗记录或本人行迹。1918年是发表节点，而非现代文学突然诞生的唯一时刻。',
    ],
    impact: '作品成为中国现代小说的重要文本，其语言与批判方式引发持续阅读和争论。',
    sources: [
      ref(
        '香港中文大学图书馆 · 文学散步：鲁迅',
        'https://hklit.lib.cuhk.edu.hk/wp-content/uploads/2020/10/litwalkd.pdf',
        '鲁迅生平说明记1918年以鲁迅为笔名发表《狂人日记》；作品初刊见《新青年》4卷5号。',
      ),
    ],
  }),
  item({
    id: 'modern-versailles',
    year: 1919,
    title: '巴黎和会与《凡尔赛条约》',
    category: '交流',
    region: 'europe',
    themes: ['政治', '战争'],
    location: '巴黎与凡尔赛',
    coordinates: [2.12, 48.8],
    importance: 5,
    summary: '战胜国在巴黎召开和会，对德国的和约于凡尔赛签署，涉及领土、赔偿、军备限制和国际联盟。',
    background:
      '战争后的安全、民族自决、殖民权益和经济重建诉求相互冲突。不同参与者获得的谈判机会并不平等。',
    details: [
      '1918年停战、1919年签约与条约生效属于不同阶段。和会也不只有对德条约，殖民地与中国等地的诉求未得到一致回应。',
    ],
    impact:
      '和会建立战后秩序的一部分，同时留下民族、赔偿与主权争议，不能把后来所有冲突归结为单一条款。',
    sources: [
      diplomat(
        'The Paris Peace Conference and the Treaty of Versailles',
        'milestones/1914-1920/paris-peace',
        '核对1919年1月和会召开、6月28日对德条约签署及美国未批准。',
      ),
    ],
  }),
  item({
    id: 'modern-may-fourth',
    year: 1919,
    title: '五四运动与学生、工商业者的社会动员',
    category: '社会',
    region: 'china',
    themes: ['政治', '文化', '教育学术'],
    location: '北京及中国多地',
    coordinates: [116.4, 39.9],
    importance: 5,
    summary:
      '巴黎和会山东问题激起抗议，北京学生示威后，运动扩展到多地，商人、工人和其他社群相继参与。',
    background:
      '民族主权问题与新文化讨论交织，学校、报刊、社团和城市商业网络提供了组织与传播渠道。',
    details: [
      '5月4日是抗议的标志性起点，广义“五四”还指更长的新文化与思想转型过程，两种用法需要区别。',
    ],
    impact: '运动扩大公共政治参与，并推动文学、教育与社会思想的持续变化。',
    sources: [
      ref(
        '北京大学 · 五四百年专题',
        'https://news.pku.edu.cn/ztwz111/bnws/wsps/fd36130f9fd64d1e8e4ce4c5461f6487.htm',
        '核对1919年巴黎和会山东问题及5月4日北京学生抗议；使用可定位日期，不照录宣传性评价。',
      ),
    ],
  }),
  item({
    id: 'modern-bauhaus',
    year: 1919,
    endYear: 1933,
    dateLabel: '1919—1933年',
    dateNote: '用学校成立至关闭的存续期；魏玛、德绍、柏林阶段须分别理解。',
    title: '包豪斯：艺术、工艺与建筑教育实验',
    category: '文化',
    region: 'europe',
    themes: ['文学艺术', '教育学术', '工程建筑'],
    location: '魏玛、德绍与柏林',
    coordinates: [11.33, 50.98],
    importance: 4,
    summary: '包豪斯把工作坊、设计与建筑问题放入共同教育实践，探索艺术生产和现代工业之间的关系。',
    background:
      '一战后的社会重建、工艺教育改革与现代主义艺术共同塑造学校。其教师和学生并非遵循单一风格。',
    details: [
      '学校多次迁移并在政治压力下关闭；后世传播的“包豪斯风格”不能代替十四年间的课程、理念与内部争论。',
    ],
    impact: '它影响现代设计与建筑教育，流亡师生又把相关经验带入其他地区的学校和实践。',
    sources: [
      ref(
        'Bauhaus-Universität Weimar · History',
        'https://bauhaus100.uni-weimar.de/en/history/',
        '大学百年专题History、Ideas、Work，核对1919年成立、1925年迁德绍、工作坊教育、政治压力与1933年师生迁徙。',
      ),
    ],
  }),
  item({
    id: 'modern-ulysses',
    year: 1922,
    title: '乔伊斯《尤利西斯》单行本出版',
    category: '文化',
    region: 'europe',
    themes: ['文学艺术'],
    location: '巴黎',
    coordinates: [2.35, 48.85],
    importance: 4,
    summary: '《尤利西斯》由巴黎莎士比亚书店出版单行本，成为现代主义小说叙事与语言实验的重要文本。',
    background: '作品此前曾连载，出版与审查争议反映了新文学、跨国出版网络和道德规范之间的冲突。',
    details: [
      '小说主要写都柏林的一天，1922年则是巴黎单行本出版节点。作品故事地点、写作地点与出版地点不宜互相替代。',
    ],
    impact: '作品在意识、城市经验与小说形式方面推动了长期讨论，版本与审查史也构成阅读的一部分。',
    sources: [
      ref(
        'New York Public Library · Ulysses, first edition',
        'https://old-digitalcollections.nypl.org/items/12311e40-df89-013a-e962-0242ac110004',
        '馆藏书目Date Issued为1922、Place为Paris、Publisher为Shakespeare and Co.；1935年题赠不是出版年。',
      ),
    ],
  }),
  item({
    id: 'modern-quantum-mechanics',
    year: 1925,
    title: '海森堡等人建立量子力学的新表述',
    category: '文化',
    region: 'europe',
    themes: ['科技医学', '教育学术'],
    location: '哥廷根及欧洲物理学网络',
    coordinates: [9.94, 51.54],
    importance: 5,
    summary: '海森堡对原子物理的重新表述，经玻恩、约尔当等人发展为矩阵力学，量子理论进入新的阶段。',
    background:
      '旧量子论能够解释部分光谱，却缺乏一致的理论结构。数学形式和可观测量之间的关系成为核心问题。',
    details: [
      '1925年并不表示量子力学全部完成；波动力学、概率解释和不确定关系等在随后几年继续形成。',
    ],
    impact: '量子力学重塑物质结构研究，并为电子技术、化学与后来的计算研究提供理论基础。',
    sources: [
      ref(
        'CERN · A century of quantum mechanics',
        'https://home.cern/century-quantum-mechanics/',
        '核对1925年海森堡论文及玻恩、约尔当等共同发展的顺序。',
      ),
    ],
  }),
  item({
    id: 'modern-penicillin',
    year: 1928,
    title: '弗莱明观察到青霉素的抗菌作用',
    category: '文化',
    region: 'europe',
    themes: ['科技医学'],
    location: '伦敦',
    coordinates: [-0.17, 51.52],
    importance: 4,
    summary: '弗莱明观察到霉菌周围的细菌生长受到抑制，青霉素研究由此获得关键线索。',
    background:
      '细菌学和药物研究持续寻找能够控制感染的方法，实验室培养、观察与可重复验证是重要条件。',
    details: [
      '1928年的观察与后来提纯、临床应用及大规模生产不同。弗洛里、钱恩、希特利等人的后续工作同样不可缺少。',
    ],
    impact: '青霉素的发展推动抗生素治疗时代，也使药物生产、临床试验和耐药性成为持续问题。',
    sources: [
      ref(
        'Science History Institute · Alexander Fleming',
        'https://www.sciencehistory.org/education/scientific-biographies/alexander-fleming/',
        '核对1928年发现、后续牛津团队研发及1945年获奖，区别发现与药物应用。',
      ),
    ],
  }),
  item({
    id: 'modern-great-depression',
    year: 1929,
    dateLabel: '始于1929年的大萧条',
    dateNote: '本条标记危机起点；各国衰退和复苏时间不同，不指定一个共同结束年。',
    title: '大萧条与全球经济危机',
    category: '社会',
    region: 'americas',
    themes: ['经济贸易', '政治'],
    location: '美国与全球金融贸易网络',
    coordinates: [-74.01, 40.71],
    importance: 5,
    summary:
      '经济收缩、股市崩盘和银行危机相继发生，失业与贸易萎缩扩散到多个地区，政策回应也出现重大转变。',
    background:
      '金融脆弱性、债务、生产与需求失衡以及国际货币制度相互作用，不能只用一次股市下跌解释全部危机。',
    details: [
      '1929年危机和1930—1933年的银行恐慌应加以区别。各国在财政、金融、贸易和社会救济方面采取了不同政策。',
    ],
    impact: '危机重塑政府与市场的关系，推动经济学争论和社会保障改革，也加剧国际政治紧张。',
    sources: [
      ref(
        'Federal Reserve History · The Great Depression',
        'https://www.federalreservehistory.org/essays/great-depression',
        '核对1929年经济收缩、银行危机及1930年代持续衰退；保留各地复苏差异。',
      ),
    ],
  }),
  item({
    id: 'modern-hoover-dam',
    year: 1935,
    title: '胡佛坝蓄水与落成典礼',
    category: '社会',
    region: 'americas',
    themes: ['工程建筑', '经济贸易'],
    location: '科罗拉多河黑峡谷',
    coordinates: [-114.74, 36.02],
    importance: 4,
    summary: '胡佛坝在1935年开始蓄水并举行落成典礼，工程连接防洪、供水、发电和区域开发目标。',
    background:
      '美国西南部的农业、城市增长和水资源竞争推动跨州协调；施工也伴随危险劳动与社会分工。',
    details: [
      '落成典礼、工程竣工和各机组发电时间并不完全相同。大型水坝的收益也需与生态变化和用水分配一同考察。',
    ],
    impact: '大坝改变科罗拉多河的水与能源组织，是现代基础设施与区域治理的典型案例。',
    sources: [
      ref(
        'U.S. Bureau of Reclamation · Hoover Dam chronology',
        'https://www.usbr.gov/lc/hooverdam/history/articles/chrono.html',
        '1935年条记2月开始蓄水与9月30日典礼；后续发电和工程日期分列。',
      ),
    ],
  }),
  item({
    id: 'modern-guernica',
    year: 1937,
    title: '毕加索完成《格尔尼卡》',
    category: '文化',
    region: 'europe',
    themes: ['文学艺术', '战争'],
    location: '巴黎（作品绘制地）',
    coordinates: [2.35, 48.85],
    importance: 4,
    summary: '毕加索在西班牙内战背景下创作《格尔尼卡》，以破碎的人物、动物和空间表现战争中的痛苦。',
    background:
      '格尔尼卡遭到空袭，西班牙共和国参加巴黎博览会的文化项目为这幅大型壁画提供展示场域。',
    details: [
      '画作于巴黎绘制，不是空袭现场的摄影记录。作品的象征、展览、流亡与回归西班牙的经历都参与了其公共意义。',
    ],
    impact: '画作成为现代艺术回应战争暴力的重要案例，并持续进入艺术、记忆与政治讨论。',
    sources: [
      ref(
        'Museo Reina Sofía · Guernica',
        'https://www.museoreinasofia.es/colecciones/obra/guernica/',
        '馆藏DE00050，标1937年5月1日至6月4日于巴黎绘制，说明展览与保存经历。',
      ),
    ],
  }),
  item({
    id: 'modern-china-war',
    year: 1937,
    endYear: 1945,
    dateLabel: '1937—1945年（全面战争阶段）',
    dateNote: '本条标记1937年后全面战争阶段；日本侵华及中国抵抗在1931年及此前已有重要发展。',
    title: '全面抗日战争与中国战场',
    category: '战争',
    region: 'china',
    themes: ['政治', '社会'],
    location: '华北、华中与中国其他战区',
    coordinates: [116.22, 39.85],
    importance: 5,
    summary:
      '卢沟桥事变后战争全面扩大，中国军民长期抵抗日本侵略，城市、乡村和交通网络经历深刻破坏。',
    background:
      '1931年以来的侵略与局部抵抗并未消失。国共关系、地方军事力量和国际援助共同影响中国战场。',
    details: [
      '正面战场、敌后战争与平民的逃难、劳动和生存经验需要同时呈现。1945年的胜利也不意味着中国内部政治冲突结束。',
    ],
    impact: '中国战场是亚洲战争的重要组成部分，对日本军力部署、战后政治和社会记忆产生长期影响。',
    sources: [
      textbook(
        '13.2 Theaters of War',
        '13-2-theaters-of-war',
        '东亚战争、中国抵抗、日本1937—1942年扩张及战时平民段。',
      ),
    ],
  }),
  item({
    id: 'modern-nanjing-massacre',
    year: 1937,
    endYear: 1938,
    dateLabel: '1937年12月起',
    dateNote: '南京于1937年12月13日陷落；大规模杀戮和暴行延续到随后数周，跨越公历年份。',
    title: '南京大屠杀',
    category: '战争',
    region: 'china',
    themes: ['社会'],
    location: '南京及周边',
    coordinates: [118.78, 32.06],
    importance: 5,
    summary: '日军攻占南京后，大规模杀害平民及已解除武装的士兵，并实施性暴力、抢掠和其他严重暴行。',
    background:
      '上海战事后侵华日军向南京推进，城市防御、撤退和避难体系面临崩溃，大量居民与难民被困城中。',
    details: [
      '幸存者证言、慈善机构埋葬记录、战后调查与外籍目击者材料彼此补充。本条不把整个八年占领时期都当作屠杀的同一阶段。',
    ],
    impact:
      '暴行对幸存者、家庭和城市记忆造成长期创伤，战后审判与档案保存构成追究责任和纪念的重要部分。',
    sources: [
      ref(
        '南京市档案馆 · 侵华日军南京大屠杀档案',
        'https://dag.nanjing.gov.cn/daggk/gzjs/',
        '馆藏介绍中的专题档案，记1937年12月13日南京陷落后持续六周的暴行及调查材料。',
      ),
    ],
  }),
  item({
    id: 'modern-second-world-war',
    year: 1939,
    endYear: 1945,
    dateLabel: '1939—1945年（欧洲战争常用分期）',
    dateNote: '亚洲战争在1939年前已经展开；采用常用分期不表示全球冲突只有同一个起点。',
    title: '第二次世界大战的全球扩展',
    category: '战争',
    region: 'europe',
    themes: ['政治', '社会'],
    location: '欧洲、亚洲、非洲及太平洋战场',
    coordinates: [21.01, 52.23],
    importance: 5,
    summary:
      '德国侵略波兰后欧洲战争爆发，既有亚洲战争与此后太平洋战事相互连接，冲突扩展到多个大陆和海域。',
    background:
      '法西斯扩张、帝国竞争、经济危机及国际安全机制失效共同构成战争背景。各国参战决策也有具体时间与原因。',
    details: [
      '战争包括军事作战、占领统治、种族灭绝、强制劳动与平民轰炸。欧洲1945年5月停战与日本9月签署投降书不是同一节点。',
    ],
    impact: '战争造成广泛毁灭，推动国际组织重建、核武器时代、冷战和去殖民进程。',
    sources: [
      textbook(
        '13.2 Theaters of War',
        '13-2-theaters-of-war',
        '欧洲、亚洲、北非与太平洋战事；战争终局及种族灭绝段。',
      ),
    ],
  }),
  item({
    id: 'modern-pearl-harbor',
    year: 1941,
    title: '珍珠港袭击与太平洋战争扩大',
    category: '战争',
    region: 'oceania',
    themes: ['政治'],
    location: '夏威夷珍珠港',
    coordinates: [-157.95, 21.36],
    importance: 4,
    summary: '日本海空军袭击珍珠港，美国随后对日宣战；同期日本向东南亚及太平洋多处发动进攻。',
    background:
      '日本在中国的战争、欧美对日经济限制和资源扩张计划加剧对立，外交谈判未能消除军事冲突。',
    details: [
      '本条按夏威夷当地时间记1941年12月7日；亚洲同一时段已是12月8日，不能据日期差异误作两场袭击。',
    ],
    impact: '袭击使美国全面进入对日战争，并把欧洲与太平洋的战争资源和同盟关系更紧密连接。',
    sources: [
      ref(
        'U.S. National Park Service · Pearl Harbor',
        'https://www.nps.gov/articles/000/b-reactor-history-room-pearl-harbor.htm',
        '核对夏威夷当地12月7日袭击及美国12月8日宣战。',
      ),
    ],
  }),
  item({
    id: 'modern-stalingrad',
    year: 1942,
    endYear: 1943,
    dateLabel: '1942—1943年',
    dateNote: '围绕城市的战斗及苏军反攻跨越两年；1943年2月为被围德军投降阶段。',
    title: '斯大林格勒战役',
    category: '战争',
    region: 'europe',
    themes: ['社会'],
    location: '斯大林格勒（今伏尔加格勒）',
    coordinates: [44.5, 48.71],
    importance: 5,
    summary:
      '德国及盟军在伏尔加河城市作战后遭苏军反包围，1943年初被围部队投降，东线局势出现重大转折。',
    background: '德国向苏联南部和高加索推进，工业城市、交通与资源目标使这座城市成为关键战场。',
    details: [
      '苏军1942年11月反攻打击包围圈两翼，城市巷战、补给崩溃和严寒共同造成惨重损失；平民经历也不可忽略。',
    ],
    impact: '战役削弱德军进攻能力与轴心国威望，但东线战争仍持续两年多，不能把它当作战争立即结束。',
    sources: [
      ref(
        'Imperial War Museums · Second World War galleries',
        'https://www.iwm.org.uk/sites/default/files/files/2023-10/second_world_war_galleries_large_print.pdf',
        '展厅文字“The Battle of Stalingrad”，1942年11月反攻与1943年2月投降段。',
      ),
    ],
  }),
  item({
    id: 'modern-normandy-landings',
    year: 1944,
    title: '诺曼底登陆',
    category: '战争',
    region: 'europe',
    themes: ['工程建筑', '交流'],
    location: '法国诺曼底海岸',
    coordinates: [-0.87, 49.35],
    importance: 5,
    summary: '盟军于1944年6月6日在诺曼底实施大规模海空协同登陆，在西欧开辟新的进攻战线。',
    background:
      '登陆准备依赖运输、情报、工程、制空与盟国资源协调，目标是在法国建立能够持续补给的桥头堡。',
    details: [
      '登陆日只是诺曼底战役的起点，夺取港口和突破内陆仍需数周作战。不同海滩和空降地区的战况差别很大。',
    ],
    impact: '行动为法国解放和盟军向德国推进创造条件，也留下海岸工程、占领与平民伤亡的历史遗产。',
    sources: [
      ref(
        'Imperial War Museums · D-Day collection B 5165',
        'https://www.iwm.org.uk/collections/item/object/205193059',
        '馆藏日期1944年6月6日及Normandy Landings事件关联；不是后期纪念照片。',
      ),
    ],
  }),
  item({
    id: 'modern-bretton-woods',
    year: 1944,
    title: '布雷顿森林会议规划战后货币秩序',
    category: '交流',
    region: 'americas',
    themes: ['经济贸易', '政治'],
    location: '美国布雷顿森林',
    coordinates: [-71.45, 44.26],
    importance: 5,
    summary:
      '多国代表讨论国际货币合作与战后重建，形成国际货币基金组织和国际复兴开发银行的制度安排。',
    background: '大萧条、竞争性货币政策与战争破坏推动政府寻求更稳定的汇率和国际融资机制。',
    details: [
      '1944年会议、机构正式成立和开始业务是不同阶段。以美元为中心的汇率安排后来也经过危机和转变，并非永久不变。',
    ],
    impact: '会议奠定战后国际金融机构的重要基础，其代表权、条件与发展效果持续受到讨论。',
    sources: [
      ref(
        'International Monetary Fund · The IMF in History',
        'https://www.imf.org/external/about/timeline/index.htm',
        '1944年7月Bretton Woods Conference条，核对44国代表及汇率与机构设计；1947年开始运营另列。',
      ),
    ],
  }),
  item({
    id: 'modern-auschwitz-liberation',
    year: 1945,
    title: '奥斯维辛集中营被解放',
    category: '战争',
    region: 'europe',
    themes: ['社会'],
    location: '奥斯维辛集中营遗址',
    coordinates: [19.18, 50.03],
    importance: 5,
    summary:
      '苏军进入奥斯维辛集中营，发现幸存者与纳粹大规模杀戮的证据。解放前已有大量囚犯被迫撤离。',
    background:
      '纳粹德国对犹太人实施系统性种族灭绝，也迫害其他群体；集中营、灭绝营与强制劳动体系互相连接。',
    details: [
      '1945年1月27日是这处营地的解放日，不能当作大屠杀开始或所有营地同时获释的日期。幸存者仍面临疾病、流离与失去家人的后果。',
    ],
    impact:
      '遗址、档案与证言成为研究大屠杀和纪念受害者的重要基础，也提醒人们辨析国家组织暴力的机制。',
    sources: [
      ref(
        'Auschwitz-Birkenau Memorial · Day of liberation',
        'https://www.auschwitz.org/en/history/liberation/day-of-liberation/',
        '核对1945年1月27日苏军进入、营地疏散与幸存者处境。',
      ),
    ],
  }),
  item({
    id: 'modern-atomic-bombings',
    year: 1945,
    title: '广岛、长崎遭原子弹轰炸',
    category: '战争',
    region: 'east-asia',
    themes: ['科技医学', '社会'],
    location: '广岛与长崎',
    coordinates: [132.45, 34.39],
    importance: 5,
    summary: '美国在广岛、长崎投下原子弹，造成大规模平民死亡、城市毁坏与长期辐射健康后果。',
    background:
      '战争末期的核武器研发、对日作战计划与投降谈判相互交织。苏联对日参战也影响战争终局。',
    details: [
      '广岛为8月6日、长崎为8月9日；直接爆炸损失与随后死亡、疾病应区别统计。核轰炸必要性及其决策长期存在历史争论。',
    ],
    impact: '轰炸把核武器用于战争，深刻改变国际安全、伦理与幸存者记忆，不能仅以技术成就叙述。',
    sources: [
      ref(
        'The National WWII Museum · August–September 1945',
        'https://www.nationalww2museum.org/sites/default/files/2023-04/80001674_WWII_Brick%20Book%20Guts.pdf',
        '1945年8月部分列广岛6日、长崎9日及后续伤亡；本条不照录不同口径的死亡估计。',
      ),
    ],
  }),
  item({
    id: 'modern-united-nations',
    year: 1945,
    title: '《联合国宪章》签署并生效',
    category: '交流',
    region: 'americas',
    themes: ['政治', '社会'],
    location: '旧金山及国际协商网络',
    coordinates: [-122.42, 37.78],
    importance: 5,
    summary: '各国代表在旧金山签署《联合国宪章》，批准程序完成后联合国于同年正式成立。',
    background:
      '战争灾难与国际联盟的失败促使盟国设计新的国际合作机制，安全理事会的大国地位也体现当时的力量结构。',
    details: [
      '6月26日签署与10月24日生效应分开。机构目标、法律程序和实际政治能力之间始终存在距离。',
    ],
    impact: '联合国成为国际和平、安全、人权与发展议题的重要协商场域，其成员与任务随后不断变化。',
    sources: [
      ref(
        'United Nations · Charter research guide',
        'https://research.un.org/en/docs/uncharter/intro',
        '宪章签署、批准与1945年生效的历史说明，结合宪章第110条。',
      ),
    ],
  }),
  item({
    id: 'modern-unesco-constitution',
    year: 1945,
    title: '联合国教科文组织《组织法》通过',
    category: '交流',
    region: 'europe',
    themes: ['教育学术', '科技医学', '文学艺术'],
    location: '伦敦',
    coordinates: [-0.13, 51.51],
    importance: 4,
    summary: '代表们在伦敦通过教科文组织《组织法》，把教育、科学和文化合作纳入战后和平建设。',
    background:
      '战争中的宣传、种族主义与文化破坏，使各国认识到外交和经济协议之外还需要知识与公共教育合作。',
    details: [
      '1945年11月16日通过《组织法》，组织法于1946年11月4日生效。后续具体教育、文物和科学项目并非成立时已全部存在。',
    ],
    impact: '组织为跨国教育与文化合作提供制度平台，也持续面对代表性、资源分配和文化差异问题。',
    sources: [
      ref(
        'UNESCO · Constitution',
        'https://www.unesco.org/en/legal-affairs/constitution',
        '组织法标题注明1945年11月16日伦敦通过；序言与宗旨条说明教育、科学、文化和和平的联系。',
      ),
    ],
  }),
  item({
    id: 'modern-indonesia-independence',
    year: 1945,
    title: '印度尼西亚宣告独立',
    category: '政治',
    region: 'southeast-asia',
    themes: ['社会', '交流'],
    location: '雅加达',
    coordinates: [106.85, -6.2],
    importance: 5,
    summary:
      '日本战败前后，苏加诺与哈达在雅加达宣读独立宣言，印度尼西亚共和国的建国进程进入新阶段。',
    background:
      '荷兰殖民统治、日本占领和民族主义组织共同构成背景。战时政治动员带来机会，也留下冲突和创伤。',
    details: [
      '1945年8月17日宣言不等于荷兰立即承认独立。随后武装冲突与外交谈判持续，1949年主权移交属于另一阶段。',
    ],
    impact: '独立进程改变东南亚殖民格局，也带出群岛范围内政治整合与多元社会治理的问题。',
    sources: [
      ref(
        'Arsip Nasional Republik Indonesia · Presidenpedia',
        'https://pusdipres.anri.go.id/presidenpedia/',
        '总统档案机构说明1945年8月17日苏加诺、哈达宣告独立及其后任职。',
      ),
    ],
  }),
  item({
    id: 'modern-eniac',
    year: 1946,
    title: 'ENIAC公开展示与电子计算的发展',
    category: '文化',
    region: 'americas',
    themes: ['科技医学', '教育学术'],
    location: '费城',
    coordinates: [-75.19, 39.95],
    importance: 4,
    summary: 'ENIAC向公众展示，大规模电子计算在工程和战争需求推动下成为可运行的技术实践。',
    background:
      '弹道计算、数值分析和电子器件研究产生交汇，工程师与程序设计人员的协作使机器得以运作。',
    details: [
      '1946年为公开展示节点，并不是计算思想或所有电子计算机的唯一起点。早期ENIAC程序设置方式也不同于后来普及的存储程序结构。',
    ],
    impact: '它成为电子计算发展史的重要案例，显示硬件、软件、劳动组织与应用目标之间的相互依赖。',
    sources: [
      ref(
        'Computer History Museum · ENIAC dedication',
        'https://www.computerhistory.org/tdih/february/16/',
        '馆方历史条目记1946年公开落成展示；不据此作有争议的“唯一第一台”判断。',
      ),
    ],
  }),
  item({
    id: 'modern-india-partition',
    year: 1947,
    title: '英属印度独立与印巴分治',
    category: '政治',
    region: 'south-asia',
    themes: ['社会', '宗教', '交流'],
    location: '南亚次大陆，旁遮普与孟加拉等地',
    coordinates: [77.21, 28.61],
    importance: 5,
    summary:
      '英国退出南亚统治，印度与巴基斯坦成为独立国家；领土划分伴随大规模迁徙、暴力与家庭离散。',
    background:
      '反殖民运动、不同政治组织的代表权诉求和紧迫的撤离安排，使统一国家方案与分治方案激烈竞争。',
    details: [
      '1947年8月的国家建立不代表边界、难民安置和土邦归属问题同时解决。宗教身份也不能概括每个人的政治选择。',
    ],
    impact: '分治重塑南亚国家、社群与记忆，其后果延续到后来的战争、外交和日常生活。',
    sources: [
      ref(
        'The National Archives · Partition of British India',
        'https://www.nationalarchives.gov.uk/education/teaching-resources/partition-of-british-india/',
        'Background information及Regions affected by partition，1947年8月独立与旁遮普、孟加拉分治。',
      ),
    ],
  }),
  item({
    id: 'modern-gatt',
    year: 1947,
    title: '《关税与贸易总协定》签署',
    category: '交流',
    region: 'europe',
    themes: ['经济贸易'],
    location: '日内瓦',
    coordinates: [6.14, 46.2],
    importance: 4,
    summary: '多国达成关税减让和贸易规则安排，《关税与贸易总协定》随后以临时适用方式运行。',
    background: '各国希望避免战间期的保护主义和贸易收缩，但原拟建立的国际贸易组织未能按计划形成。',
    details: [
      '1947年协定签署与1948年开始临时适用不同。后来WTO下的GATT 1994也不是与旧协定完全相同的法律文件。',
    ],
    impact: '协定成为战后多边贸易谈判的重要框架，为后续关税谈判和WTO提供制度经验。',
    sources: [
      ref(
        'World Trade Organization · GATT 1947 and GATT 1994',
        'https://www.wto.org/english/docs_e/legal_e/legalexplgatt1947_e.htm',
        '核对1947年协定、1948年1月1日临时适用及后来的制度关系。',
      ),
    ],
  }),
  item({
    id: 'modern-human-rights-declaration',
    year: 1948,
    title: '联合国大会通过《世界人权宣言》',
    category: '社会',
    region: 'europe',
    themes: ['政治', '交流'],
    location: '巴黎',
    coordinates: [2.29, 48.86],
    importance: 5,
    summary: '联合国大会通过《世界人权宣言》，以共同标准陈述人的尊严、自由、平等和社会经济权利。',
    background:
      '战争、种族灭绝、殖民统治与长期社会运动共同推动国际人权讨论，起草过程包含多种法律与思想传统。',
    details: [
      '宣言是共同标准的声明，不等同于后来具有条约义务的各项公约。通过文本不表示各国从此完全落实相关权利。',
    ],
    impact: '宣言为国际法、社会运动和国家制度改革提供持续援引的语言与评价标准。',
    sources: [
      ref(
        'OHCHR · International Bill of Human Rights',
        'https://www.ohchr.org/sites/default/files/Documents/Publications/Compilation1.1en.pdf',
        '文件开头列1948年12月10日大会217 A(III)号决议及宣言全文。',
      ),
    ],
  }),
  item({
    id: 'modern-world-council-churches',
    year: 1948,
    title: '普世教会协会在阿姆斯特丹成立',
    category: '文化',
    region: 'europe',
    themes: ['宗教', '交流'],
    location: '阿姆斯特丹',
    coordinates: [4.9, 52.37],
    importance: 3,
    summary: '不同宗派与地区的教会在阿姆斯特丹共同成立普世教会协会，推动基督徒之间的合作与对话。',
    background:
      '传教、社会行动和教会合一运动早已展开；两次世界大战之后，和平与人类共同处境成为重要议题。',
    details: [
      '协会是参与教会之间的合作平台，不是取代所有教会的统一宗派，也不代表所有基督教传统均为成员。',
    ],
    impact: '它为宗教对话、社会伦理与国际公共问题提供跨教派组织形式。',
    sources: [
      ref(
        'World Council of Churches · First Assembly, Amsterdam 1948',
        'https://oikoumene.org/about-the-wcc/organizational-structure/assembly',
        '第一届大会小节，1948年8月23日正式成立、147个成员教会及讨论主题。',
      ),
    ],
  }),
  item({
    id: 'modern-prc-founded',
    year: 1949,
    title: '中华人民共和国成立',
    category: '政治',
    region: 'china',
    themes: ['社会'],
    location: '北京',
    coordinates: [116.4, 39.91],
    importance: 5,
    summary:
      '中华人民共和国于1949年10月1日在北京宣告成立，国共内战中的军事与政治格局发生重大变化。',
    background:
      '抗日战争结束后，国共谈判未能防止全面内战。军事动员、地方治理、土地问题和经济危机共同影响战争结果。',
    details: [
      '建国宣告与其后国家制度建设是不同过程，1949年也不表示所有地区同时完成治理交接。相关档案需结合各自立场阅读。',
    ],
    impact: '新政权重塑中国国家与社会制度，并对东亚和冷战国际关系产生深远影响。',
    sources: [
      diplomat(
        'The Chinese Revolution of 1949',
        'milestones/1945-1952/chinese-rev',
        '核对1949年10月1日宣告成立及此前国共内战；只采用可核对事实，不沿用来源的政治标签。',
      ),
    ],
  }),
  item({
    id: 'modern-nato',
    year: 1949,
    title: '北大西洋公约签署',
    category: '交流',
    region: 'americas',
    themes: ['政治', '战争'],
    location: '华盛顿',
    coordinates: [-77.04, 38.91],
    importance: 4,
    summary: '美国、加拿大和西欧多国签署北大西洋公约，以集体防御安排回应战后欧洲的安全与政治分裂。',
    background:
      '欧洲重建、德国问题、苏联与西方关系恶化以及柏林危机，使安全承诺成为跨大西洋协商的核心。',
    details: [
      '公约建立军事联盟，不等于成员国在所有外交议题上一致；集体防御条款仍涉及各国宪制程序和具体决策。',
    ],
    impact: '联盟成为冷战安全结构的重要组成部分，其任务、成员与争议在以后不断变化。',
    sources: [
      diplomat(
        'North Atlantic Treaty Organization, 1949',
        'milestones/1945-1952/nato',
        '公约签署及欧洲重建、柏林危机背景；与成员后续扩展区分。',
      ),
    ],
  }),
  item({
    id: 'modern-korean-war',
    year: 1950,
    endYear: 1953,
    dateLabel: '1950—1953年（主要作战阶段）',
    dateNote: '1953年签署的是停战协定，不是最终和平条约；不能据此认定所有政治争端结束。',
    title: '朝鲜战争与停战',
    category: '战争',
    region: 'east-asia',
    themes: ['政治', '社会'],
    location: '朝鲜半岛',
    coordinates: [127.0, 38.0],
    importance: 5,
    summary:
      '朝鲜半岛战争由大规模越界进攻扩大为国际冲突，中国军队、美国及联合国军等先后卷入，1953年达成停战。',
    background: '日本战败后的分区占领、两个政府建立和冷战对抗，使半岛政治冲突不断升级。',
    details: [
      '战线多次南北推进，平民遭受轰炸、流离和长期分离。停战后的军事分界线也不能简单当作战前边界的原样恢复。',
    ],
    impact: '战争巩固半岛分裂与东亚军事对抗，对参战国家的政治、社会与记忆产生长期影响。',
    sources: [
      ref(
        'Eisenhower Presidential Library · Korean War',
        'https://www.eisenhowerlibrary.gov/research/online-documents/korean-war',
        '导言明确1950年6月25日战争爆发及档案；停战文件见1953年7月27日记录。',
      ),
      textbook(
        '14.2 The Spread of Communism',
        '14-2-the-spread-of-communism',
        '半岛分割、1950年战争、中国参战及1953年停战段。',
      ),
    ],
  }),
  item({
    id: 'modern-refugee-convention',
    year: 1951,
    title: '《关于难民地位的公约》开放签署',
    category: '交流',
    region: 'europe',
    themes: ['社会', '政治'],
    location: '日内瓦',
    coordinates: [6.14, 46.2],
    importance: 4,
    summary: '各国就难民地位、保护义务和基本待遇达成公约，为跨国逃难者的保护建立重要法律框架。',
    background:
      '二战及其后的流离失所使国籍、居留和返乡问题十分迫切，先前零散的安排难以涵盖新的需求。',
    details: [
      '1951年文本具有最初的时间与地域背景限制，1967年议定书后来扩大适用；两份文件不能混为一次签署。',
    ],
    impact: '公约成为国际难民保护的核心依据之一，落实仍取决于国家实践、资源和法律程序。',
    sources: [
      ref(
        'UNHCR · Final Act of the Conference on Refugees',
        'https://www.unhcr.org/publications/final-act-united-nations-conference-plenipotentiaries-status-refugees-and-stateless',
        '会议最后文件记1951年7月25日通过，7月28日起开放签署；本条标题保留两者区别。',
      ),
    ],
  }),
  item({
    id: 'modern-dna-double-helix',
    year: 1953,
    title: 'DNA双螺旋结构模型发表',
    category: '文化',
    region: 'europe',
    themes: ['科技医学', '教育学术'],
    location: '剑桥与伦敦的分子生物学研究网络',
    coordinates: [0.12, 52.2],
    importance: 5,
    summary: 'DNA双螺旋模型把化学结构与遗传信息复制问题联系起来，成为分子生物学的重要节点。',
    background: '遗传学、化学与X射线衍射研究逐渐汇合。模型依赖多个研究者的实验材料和理论工作。',
    details: [
      '沃森、克里克的模型需与富兰克林、威尔金斯等人的衍射研究一同理解。论文发表、实验贡献和后来获奖并非同一件事。',
    ],
    impact:
      '结构模型为解释遗传信息储存与复制提供框架，也带来关于科学合作、署名与材料使用的持续讨论。',
    sources: [
      ref(
        'NHGRI · History and Timeline of Events',
        'https://www.genome.gov/about-nhgri/Brief-History-Timeline',
        '核对1953年DNA双螺旋结构及其与后续基因组研究的关系；不把后来的完整基因组等同于本次模型。',
      ),
    ],
  }),
  item({
    id: 'modern-dien-bien-phu',
    year: 1954,
    title: '奠边府战役与印度支那停战谈判',
    category: '战争',
    region: 'southeast-asia',
    themes: ['政治', '交流'],
    location: '奠边府',
    coordinates: [103.02, 21.39],
    importance: 4,
    summary:
      '越盟军队攻克奠边府法军据点，法国在印度支那的军事处境急剧恶化，日内瓦谈判随后达成停战安排。',
    background: '日本战败后法国试图恢复殖民统治，越南民族独立运动和冷战援助使冲突持续扩大。',
    details: [
      '战场胜负与外交文件分别发生；1954年安排没有带来越南的持久和平，其后南北政治竞争和国际干预仍在继续。',
    ],
    impact: '战役加速法国在印度支那殖民统治的终结，也构成后来越南战争的重要背景。',
    sources: [
      diplomat(
        'Dien Bien Phu and the Fall of French Indochina',
        'milestones/1953-1960/dien-bien-phu',
        '核对1954年5月7日法军据点失守、日内瓦谈判和后续分治安排；不沿用导言的围城时长简化。',
      ),
    ],
  }),
  item({
    id: 'modern-brown-education',
    year: 1954,
    title: '布朗案判决否定公立学校种族隔离',
    category: '社会',
    region: 'americas',
    themes: ['教育学术', '政治'],
    location: '华盛顿与托皮卡等地',
    coordinates: [-77.0, 38.89],
    importance: 4,
    summary: '美国最高法院在布朗诉教育委员会案中认定，依据种族分隔公立学校违反宪法平等保护原则。',
    background:
      '黑人家庭、民权组织与律师通过长期诉讼挑战隔离制度，教育机会成为制度不平等的重要战场。',
    details: [
      '1954年的判决与各地实际取消隔离之间存在漫长距离。抵制、后续诉讼和社会动员持续影响学校制度。',
    ],
    impact: '判决为反种族隔离运动提供法律支点，也显示司法文本与教育现实之间仍需持续行动。',
    sources: [
      ref(
        'U.S. National Archives · Brown v. Board of Education',
        'https://www.archives.gov/milestone-documents/brown-v-board-of-education',
        'RG267，1954年5月17日最高法院意见及公立学校种族隔离违宪说明。',
      ),
    ],
  }),
  item({
    id: 'modern-bandung',
    year: 1955,
    title: '万隆亚非会议',
    category: '交流',
    region: 'southeast-asia',
    themes: ['政治', '经济贸易'],
    location: '万隆',
    coordinates: [107.61, -6.92],
    importance: 5,
    summary:
      '亚洲和非洲多国代表在万隆讨论主权、反殖民、和平共处、经济与文化合作，试图形成冷战阵营之外的共同声音。',
    background:
      '大量国家刚获得独立，殖民统治仍在多地持续。代表们同时面对发展需要与美苏竞争的压力。',
    details: [
      '参加者的制度、利益和对外关系并不相同；万隆会议与后来正式形成的不结盟运动相关，但不是同一次会议。',
    ],
    impact: '会议扩大亚非国家在国际事务中的能见度，并为此后的南南合作与去殖民议题提供象征资源。',
    sources: [
      diplomat(
        'Bandung Conference, 1955',
        'milestones/1953-1960/bandung-conf',
        '核对1955年4月、29个政府、主权与文化经济合作公报；保留参加者立场差异。',
      ),
    ],
  }),
  item({
    id: 'modern-polio-vaccine',
    year: 1955,
    title: '索尔克脊灰疫苗试验结果公布并获许可',
    category: '社会',
    region: 'americas',
    themes: ['科技医学'],
    location: '美国疫苗研究与试验网络',
    coordinates: [-83.74, 42.28],
    importance: 4,
    summary: '大规模试验结果公布后，索尔克灭活脊灰疫苗获准使用，预防脊髓灰质炎进入新的阶段。',
    background:
      '脊灰流行造成瘫痪与恐惧，实验室研究、公众募款、志愿者和儿童家庭的参与共同支撑试验。',
    details: [
      '1955年不是全球消灭脊灰的年份。疫苗类型、生产质量、安全监督与公共卫生组织仍需不断改进。',
    ],
    impact: '疫苗显著改变脊灰防治，也说明科学试验、产业生产与公共信任需要共同建设。',
    sources: [
      ref(
        'World Health Organization · History of polio vaccination',
        'https://www.who.int/news-room/spotlight/history-of-vaccination/history-of-polio-vaccination',
        '核对1955年4月12日试验结果公布及同日许可，区别疫苗发展与全球根除。',
      ),
    ],
  }),
  item({
    id: 'modern-ghana-independence',
    year: 1957,
    title: '加纳独立',
    category: '政治',
    region: 'africa',
    themes: ['社会', '交流'],
    location: '阿克拉及原黄金海岸地区',
    coordinates: [-0.2, 5.56],
    importance: 4,
    summary:
      '黄金海岸结束英国殖民统治，以加纳之名独立，成为战后撒哈拉以南非洲去殖民进程的重要节点。',
    background:
      '政党组织、工人和城市社会动员与战后殖民改革相互作用，非洲自治诉求获得更广泛国际支持。',
    details: [
      '独立与国家内部政治、边界和发展问题的解决并非同时发生。加纳的道路也不能代替非洲各地差异很大的独立进程。',
    ],
    impact: '独立为泛非主义和其他地区反殖民运动提供推动力，阿克拉成为跨国政治联系的重要场所。',
    sources: [
      ref(
        'United Nations · Ghanaian peacekeepers mark Independence Day',
        'https://peacekeeping.un.org/en/node/109340',
        '核对加纳1957年3月6日结束英国统治；独立日期不同于加入联合国日期。',
      ),
    ],
  }),
  item({
    id: 'modern-treaties-rome',
    year: 1957,
    title: '《罗马条约》签署与欧洲共同市场',
    category: '交流',
    region: 'europe',
    themes: ['经济贸易', '政治'],
    location: '罗马',
    coordinates: [12.48, 41.89],
    importance: 4,
    summary: '六国签署设立欧洲经济共同体和欧洲原子能共同体的条约，推进共同市场与跨国制度合作。',
    background: '二战后的重建、安全与德法关系促使欧洲国家尝试把部分经济利益放入共同机构。',
    details: [
      '1957年签署与1958年生效有别；当时的共同体也不等同于后来成员更多、职能更广的欧洲联盟。',
    ],
    impact: '条约为欧洲经济一体化提供制度基础，并把关税、市场和政治协调放入持续协商。',
    sources: [
      ref(
        'European Parliament · Treaty of Rome',
        'https://www.europarl.europa.eu/about-parliament/en/in-the-past/the-parliament-and-the-treaties/treaty-of-rome',
        '核对1957年3月25日两项条约签署、六国与1958年生效。',
      ),
    ],
  }),
  item({
    id: 'modern-sputnik',
    year: 1957,
    title: '苏联发射斯普特尼克一号',
    category: '文化',
    region: 'central-asia',
    themes: ['科技医学', '教育学术'],
    location: '拜科努尔发射场',
    coordinates: [63.31, 45.92],
    importance: 5,
    summary: '斯普特尼克一号进入地球轨道，人造卫星时代由此展开，航天竞赛与科学教育得到新的推动。',
    background: '火箭技术、军事研发和地球物理研究相互连接。冷战国家把技术能力和国际声望紧密联系。',
    details: [
      '卫星发射、探测器远航与载人飞行属于不同技术阶段。坐标标记中亚发射中心，不是卫星在轨道上的位置。',
    ],
    impact: '发射改变全球传播、科学观察和安全想象，促使多国扩大航天与教育投入。',
    sources: [
      ref(
        'NASA · Chronology of Sputnik/Vanguard/Explorer Events',
        'https://www.nasa.gov/history/sputnik/chronology.html',
        '1957年10月4日Sputnik 1条，区别随后Sputnik 2与美国Explorer任务。',
      ),
    ],
  }),
  item({
    id: 'modern-kind-of-blue',
    year: 1959,
    title: '迈尔斯·戴维斯《Kind of Blue》录制与发行',
    category: '文化',
    region: 'americas',
    themes: ['文学艺术'],
    location: '纽约',
    coordinates: [-73.98, 40.76],
    importance: 3,
    summary:
      '迈尔斯·戴维斯与合作者录制的《Kind of Blue》成为现代爵士乐的重要唱片，体现即兴、集体演奏与录音媒介的结合。',
    background:
      '非裔美国音乐传统、城市表演网络和唱片产业推动爵士不断变化，乐手之间的合作构成创作本身。',
    details: [
      '唱片不能仅归结为领队一人的成就。保存与重新发行使录音跨越演出现场传播，后来的经典地位也有形成过程。',
    ],
    impact: '这张专辑扩大爵士乐的听众与影响，成为20世纪录音文化和音乐教育的重要参照。',
    sources: [
      ref(
        'Library of Congress · National Recording Registry',
        'https://www.loc.gov/programs/national-recording-preservation-board/recording-registry/complete-national-recording-registry-listing/',
        'Kind of Blue条记唱片年份1959、类型Jazz与2002年入选保存名录；不把入选年误作创作年。',
      ),
    ],
  }),
  item({
    id: 'modern-decolonization-declaration',
    year: 1960,
    title: '非洲独立浪潮与联合国去殖民宣言',
    category: '政治',
    region: 'africa',
    themes: ['社会', '交流'],
    location: '非洲多地与联合国大会',
    coordinates: [15.31, -4.32],
    importance: 5,
    summary:
      '多个非洲地区在1960年前后独立；联合国大会通过给予殖民地国家和人民独立的宣言，强调人民自决。',
    background:
      '战后民族运动、殖民统治危机与亚非国家在联合国的参与，改变了国际议程和政治代表结构。',
    details: [
      '各地独立有不同谈判与战争过程，不能把“非洲年”当作全非洲同日独立。政治独立也没有自动解决经济依赖与内部冲突。',
    ],
    impact: '新国家扩大联合国的成员与声音，主权、资源和发展成为此后国际争论的重要问题。',
    sources: [
      ref(
        'United Nations · From Independence to Long-term Stability',
        'https://www.un.org/en/chronicle/article/independence-long-term-stability-united-nations-efforts-africa',
        '核对1960年独立浪潮、大会去殖民宣言和同年刚果维和；不混用独立国家数与入会国家数。',
      ),
    ],
  }),
  item({
    id: 'modern-berlin-wall-built',
    year: 1961,
    title: '柏林墙开始修建',
    category: '政治',
    region: 'europe',
    themes: ['社会', '工程建筑'],
    location: '柏林',
    coordinates: [13.38, 52.52],
    importance: 4,
    summary: '东德当局封闭东西柏林之间的通道，铁丝网和路障逐步扩展为复杂的边境封锁设施。',
    background:
      '德国分裂、人口外流与美苏对抗使柏林持续处于危机之中，普通人的迁移和家庭生活直接受到影响。',
    details: [
      '1961年8月13日标记封锁开始，后来墙体、警戒区和监视设施经过多次改建。它不是一夜建成的单一砖墙。',
    ],
    impact: '柏林墙把冷战分裂具体化，也使逃亡、国家控制与家庭分离成为城市历史的重要部分。',
    sources: [
      ref(
        'Berlin · Gedenken an die Opfer der Berliner Mauer',
        'https://www.berlin.de/ba-mitte/ueber-den-bezirk/erinnerungskultur/gedenktage/artikel.110198.php',
        '核对1961年8月13日封锁及后续多阶段扩建，不把整个设施视为一天完成。',
      ),
    ],
  }),
  item({
    id: 'modern-vatican-ii',
    year: 1962,
    endYear: 1965,
    dateLabel: '1962—1965年',
    dateNote: '会议于1962年10月11日开幕，1965年12月8日闭幕，各文件讨论与通过时间不同。',
    title: '第二次梵蒂冈大公会议',
    category: '文化',
    region: 'europe',
    themes: ['宗教', '交流'],
    location: '梵蒂冈',
    coordinates: [12.45, 41.9],
    importance: 4,
    summary: '天主教主教与观察员围绕教会、礼仪、现代社会和宗教关系展开讨论，通过一系列重要文件。',
    background:
      '战争之后的社会变化、教会合一运动及不同地区信徒经验，促使教会重新思考自身与世界的关系。',
    details: [
      '会议文件与后来各地实际改革不同，参加者也存在分歧。不能把会议描述为一次就完成了所有教义或社会问题的解决。',
    ],
    impact: '会议影响天主教礼仪、教会观与对外关系，并成为此后解释、实践和争论的重要资源。',
    sources: [
      ref(
        'The Holy See · Fortieth anniversary of Vatican II',
        'https://www.vatican.va/content/benedict-xvi/en/homilies/2005/documents/hf_ben-xvi_hom_20051208_anniv-vat-council.html',
        '回顾明确1962年10月11日开幕、1965年12月8日闭幕，区别于后世纪念日期。',
      ),
    ],
  }),
  item({
    id: 'modern-algeria-independence',
    year: 1962,
    title: '埃维昂协议与阿尔及利亚独立',
    category: '政治',
    region: 'africa',
    themes: ['战争', '交流', '社会'],
    location: '阿尔及尔及埃维昂谈判网络',
    coordinates: [3.06, 36.75],
    importance: 4,
    summary: '法国政府与阿尔及利亚民族解放阵线达成停火安排，随后公投与主权移交推动阿尔及利亚独立。',
    background:
      '长期殖民不平等与独立战争造成严重暴力、迁徙和政治分裂，法国国内也围绕战争展开冲突。',
    details: [
      '3月协议和停火、7月独立承认与庆祝日期不同。停火没有令所有暴力立即终止，人员流离与记忆争议长期存在。',
    ],
    impact: '独立结束法国在阿尔及利亚的殖民统治，也深刻影响地中海移民、政治与反殖民运动。',
    sources: [
      ref(
        'United Nations Treaty Series · France and Algeria, No.7395',
        'https://treaties.un.org/doc/Publication/UNTS/Volume%20507/volume-507-I-7395-English.pdf',
        '埃维昂声明及1962年7月3日承认独立和主权移交的往返信件；不混同停火与独立日。',
      ),
    ],
  }),
  item({
    id: 'modern-cuban-missile-crisis',
    year: 1962,
    title: '古巴导弹危机',
    category: '交流',
    region: 'americas',
    themes: ['战争', '政治'],
    location: '古巴及美苏决策网络',
    coordinates: [-82.37, 23.11],
    importance: 5,
    summary: '苏联在古巴部署核导弹引发美苏对峙，美国海上封锁与秘密谈判交错，世界面临核战争风险。',
    background: '古巴革命、美国对古巴的军事行动以及美苏核力量竞争共同构成危机背景。',
    details: [
      '撤除古巴导弹、美国不入侵承诺和秘密撤除土耳其导弹的安排需要结合阅读。不能把危机化解只归因于公开强硬姿态。',
    ],
    impact: '危机推动美苏加强直接沟通与军控思考，也暴露核威慑、误判和盟友处境的危险。',
    sources: [
      diplomat(
        'The Cuban Missile Crisis, October 1962',
        'milestones/1961-1968/cuban-missile-crisis',
        '核对1962年10月侦察发现、海上封锁、公开与秘密谈判和危机解决条件。',
      ),
    ],
  }),
  item({
    id: 'modern-civil-rights-act',
    year: 1964,
    title: '美国《民权法》签署',
    category: '社会',
    region: 'americas',
    themes: ['政治', '教育学术'],
    location: '华盛顿及美国民权运动网络',
    coordinates: [-77.04, 38.9],
    importance: 5,
    summary:
      '美国通过禁止多种公共场所、就业和联邦资助项目歧视的法律，为长期民权运动提供重要制度成果。',
    background: '黑人社群和多方支持者通过组织、抵制、诉讼、游行及选民动员挑战种族隔离和政治排斥。',
    details: [
      '法律签署于1964年7月2日，不能据此认为种族不平等从此消失。投票权等议题还涉及后续专门立法与执行。',
    ],
    impact: '法律扩大平等保护的制度工具，也说明社会动员、司法和立法需要持续配合。',
    sources: [
      ref(
        'U.S. National Archives · Civil Rights Act',
        'https://www.archives.gov/milestone-documents/civil-rights-act',
        '1964年7月2日法律原件及公共设施、就业、学校与联邦项目条款说明。',
      ),
    ],
  }),
  item({
    id: 'modern-apollo11',
    year: 1969,
    title: '阿波罗11号完成载人登月',
    category: '文化',
    region: 'americas',
    themes: ['科技医学', '工程建筑'],
    location: '休斯敦任务控制中心及月球任务',
    coordinates: [-95.09, 29.56],
    importance: 5,
    summary: '阿波罗11号把宇航员送到月面并安全返回，载人航天的工程、科学和国际竞争达到新的节点。',
    background:
      '冷战航天竞赛、长期火箭研发、地面追踪与庞大团队协作共同支撑任务，早期试验也付出生命代价。',
    details: [
      '任务于7月16日发射，7月20日登月，7月24日返回。地球坐标用于任务组织中心参照，不能标作月球上的实际着陆点。',
    ],
    impact: '任务扩大人类对月球的直接研究，并使大科学组织、公共支出与探索意义成为全球讨论。',
    sources: [
      ref(
        'NASA · Apollo 11 Mission Overview',
        'https://www.nasa.gov/missions/apollo/apollo-11/apollo-11-mission-overview/',
        '核对1969年7月16—24日任务、静海着陆及返回日期。',
      ),
    ],
    locationNote: '坐标指向休斯敦任务控制中心，不是月球着陆坐标；地图只提供地球上的任务组织参照。',
  }),
  item({
    id: 'modern-oil-crisis',
    year: 1973,
    endYear: 1974,
    dateLabel: '1973—1974年',
    dateNote: '记录主要禁运阶段；能源价格、通胀与产业调整的影响延续更久。',
    title: '石油禁运与全球能源危机',
    category: '社会',
    region: 'west-asia',
    themes: ['经济贸易', '政治'],
    location: '西亚产油国与全球能源市场',
    coordinates: [46.72, 24.69],
    importance: 4,
    summary:
      '阿拉伯产油国在战争与外交背景下对部分国家实施石油禁运，减产、定价变化与既有货币动荡共同冲击经济。',
    background:
      '工业国家对进口能源的依赖上升，产油国与跨国石油公司之间的收益和控制权也在重新谈判。',
    details: [
      '禁运针对的国家、石油输出国组织与阿拉伯产油国组织不是完全相同的集合。价格上涨与经济危机也有禁运之外的因素。',
    ],
    impact: '危机推动能源安全、节能与产业调整，并改变产油国和进口国之间的财政与外交关系。',
    sources: [
      diplomat(
        'Oil Embargo, 1973–1974',
        'milestones/1969-1976/oil-embargo',
        '核对1973年禁运及1974年3月解除、产量价格与美元因素，避免单因解释。',
      ),
    ],
  }),
  item({
    id: 'modern-sydney-opera-house',
    year: 1973,
    title: '悉尼歌剧院启用',
    category: '文化',
    region: 'oceania',
    themes: ['工程建筑', '文学艺术'],
    location: '悉尼港贝尼朗角',
    coordinates: [151.21, -33.86],
    importance: 4,
    summary: '悉尼歌剧院开放，独特屋顶结构、表演空间与港湾场地共同形成现代建筑的重要作品。',
    background:
      '国际设计竞赛与公共文化设施规划开启项目，设计、工程、预算和政治决策在施工期间不断碰撞。',
    details: [
      '乌松的设计与后来完成内部空间的团队贡献应分别说明。建筑启用也不表示工程争议和后续维护改造从此结束。',
    ],
    impact: '歌剧院成为表演艺术与公共文化场所，也为大型公共项目的设计和治理提供持续讨论。',
    sources: [
      ref(
        'Sydney Opera House · Our story',
        'https://www.sydneyoperahouse.com/our-story',
        '馆方历史明确1973年开放，并说明乌松、后续建筑团队与工程挑战。',
      ),
    ],
  }),
  item({
    id: 'modern-gaokao-restored',
    year: 1977,
    title: '中国恢复高等学校统一招生考试',
    category: '社会',
    region: 'china',
    themes: ['教育学术', '政治'],
    location: '中国各地考场',
    coordinates: [116.4, 39.9],
    importance: 4,
    summary:
      '中国恢复以统一考试为主要环节的高校招生制度，大批经历不同教育和劳动背景的考生重新获得升学机会。',
    background:
      '“文化大革命”期间教育秩序和招生制度受到严重冲击，恢复人才培养与科学教育成为迫切议题。',
    details: [
      '恢复决定、各地考试与录取跨越具体时间安排；考试机会的恢复也不表示城乡和地区教育资源立即平等。',
    ],
    impact: '制度调整改变许多人的教育路径，并推动此后高等教育与人才培养体系的恢复和扩展。',
    sources: [
      ref(
        '北京大学新闻网 · 中华人民共和国大事记',
        'https://news.pku.edu.cn/info/1651/17081.htm',
        '新华社大事记一九七七年10月12日条，记恢复统一考试、当年11—12月考试与录取；不把招生年份与全部入学年份混同。',
      ),
    ],
  }),
  item({
    id: 'modern-china-reform',
    year: 1978,
    title: '中国改革开放的政策转折',
    category: '政治',
    region: 'china',
    themes: ['经济贸易', '社会', '交流'],
    location: '北京及中国改革实践网络',
    coordinates: [116.4, 39.9],
    importance: 5,
    summary:
      '1978年前后的政策调整与中共十一届三中全会，成为中国改革经济体制、扩大对外联系的重要转折。',
    background:
      '既有经济体制、人民生活与科技教育需求引发新的政策讨论，地方实践和中央决策相互影响。',
    details: [
      '改革涉及农村、企业、价格、贸易与社会制度，跨越多年逐步推进。不能把1978年当作所有制度同时完成的年份。',
    ],
    impact: '改革深刻改变生产、迁移与国际经济联系，也带来分配、环境和社会保障方面的新问题。',
    sources: [
      ref(
        'World Bank · China: Liberalization of Services',
        'https://documents1.worldbank.org/curated/en/162201468236960426/pdf/418560CHA0Liberalization0WP401PUBLIC1.pdf',
        'Introduction记1978年经济改革和12月三中全会转折；本条只说明起点，不采用后续年份作为当年成果。',
      ),
    ],
  }),
  item({
    id: 'modern-cedaw',
    year: 1979,
    title: '《消除对妇女一切形式歧视公约》通过',
    category: '社会',
    region: 'americas',
    themes: ['政治', '教育学术', '交流'],
    location: '纽约联合国大会',
    coordinates: [-73.97, 40.75],
    importance: 4,
    summary:
      '联合国大会通过消除对妇女歧视公约，把政治参与、教育、就业、健康和家庭关系等领域纳入国际承诺。',
    background: '妇女组织、国际妇女年与联合国讨论推动起草，希望将平等原则转化为更明确的国家义务。',
    details: ['1979年通过与1981年生效不同；加入公约、保留条款和实际执行也需要分别考察。'],
    impact: '公约为妇女权利改革和监督提供法律工具，社会现实中的平等仍需长期争取。',
    sources: [
      ref(
        'OHCHR · Convention on the Elimination of All Forms of Discrimination against Women',
        'https://searchlibrary.ohchr.org/record/7990/files/7990.pdf',
        '标题明确1979年12月18日大会34/180号决议及公约条款；通过与生效分开。',
      ),
    ],
  }),
  item({
    id: 'modern-iran-revolution',
    year: 1979,
    title: '伊朗革命与伊斯兰共和国建立',
    category: '政治',
    region: 'west-asia',
    themes: ['宗教', '社会'],
    location: '德黑兰及伊朗各地',
    coordinates: [51.39, 35.69],
    importance: 4,
    summary: '反对巴列维王朝的运动推翻君主统治，伊斯兰共和国在随后的政治竞争和制度建设中形成。',
    background: '威权统治、社会经济变化、宗教组织及不同反对派共同参与革命，彼此目标并不完全一致。',
    details: [
      '王朝倒台、共和国确立与后来的人质危机属于不同事件。宗教领导层的优势也不是所有革命参与者原有诉求的简单总和。',
    ],
    impact: '革命改变伊朗国家制度和社会关系，并重塑西亚政治、能源与国际安全关系。',
    sources: [
      diplomat(
        'The Iranian Hostage Crisis',
        'departmenthistory/short-history/iraniancrises',
        '核对1979年革命背景与同年11月人质事件的区别；来源有美国外交视角，不照录其价值标签。',
      ),
    ],
  }),
  item({
    id: 'modern-soviet-afghan-war',
    year: 1979,
    endYear: 1989,
    dateLabel: '1979—1989年（苏军直接参战阶段）',
    dateNote: '1979年12月为苏军大规模进入；1989年撤军不表示阿富汗战争和流离随即结束。',
    title: '苏联出兵阿富汗与长期战争',
    category: '战争',
    region: 'central-asia',
    themes: ['政治', '社会'],
    location: '阿富汗',
    coordinates: [69.17, 34.53],
    importance: 4,
    summary: '苏联军队进入阿富汗，既有国内冲突在外部军事介入和援助中长期化，造成广泛伤亡与流离。',
    background:
      '政权更迭、地方社会矛盾与冷战竞争相互交织，抵抗力量也存在组织、地区和意识形态差异。',
    details: [
      '苏军撤离只是冲突中的一个阶段。不能把所有阿富汗武装都当作同一组织，也不能用冷战阵营完全替代当地政治。',
    ],
    impact: '战争改变阿富汗社会和区域安全，并对苏联、巴基斯坦及国际武装网络产生长期影响。',
    sources: [
      ref(
        'United Nations · UNGOMAP background',
        'https://peacekeeping.un.org/sites/default/files/past/ungomap/background.html',
        'Monitoring of withdrawal及Second phase，核对1988—1989年分阶段撤军与1989年2月完成。',
      ),
      diplomat(
        'The Soviet Invasion of Afghanistan and the U.S. Response',
        'milestones/1977-1980/soviet-invasion-afghanistan',
        '核对1979年12月苏军进入及其长期战争背景；苏军1989年撤离与后续内战区别。',
      ),
    ],
  }),
  item({
    id: 'modern-smallpox-eradication',
    year: 1980,
    title: '世界卫生组织宣布天花被根除',
    category: '社会',
    region: 'europe',
    themes: ['科技医学', '交流'],
    location: '日内瓦与全球公共卫生网络',
    coordinates: [6.13, 46.23],
    importance: 5,
    summary: '世界卫生组织确认天花在自然传播中已被根除，长期接种、监测和疫情处置取得重大成果。',
    background:
      '天花长期造成死亡与毁容。疫苗、病例搜寻、地方卫生人员和跨国协调共同支撑最后阶段的行动。',
    details: [
      '根除确认发生于1980年，最后一例自然感染记录在1977年。成功不是单次疫苗发明或某一个国家独自完成的结果。',
    ],
    impact: '天花根除改变公共卫生对疾病控制的想象，也留下持续的实验室安全、保存与监测责任。',
    sources: [
      ref(
        'World Health Organization · Smallpox',
        'https://www.who.int/emergencies/situations/smallpox/',
        '核对1967年强化根除计划、1977年最后自然病例及1980年正式宣布。',
      ),
    ],
  }),
  item({
    id: 'modern-chernobyl',
    year: 1986,
    title: '切尔诺贝利核事故',
    category: '社会',
    region: 'europe',
    themes: ['科技医学', '工程建筑'],
    location: '切尔诺贝利核电站',
    coordinates: [30.1, 51.39],
    importance: 4,
    summary:
      '核电站四号机组在试验过程中发生严重事故，大量放射性物质释放，周边居民被疏散并产生跨境影响。',
    background:
      '反应堆设计、运行条件、操作决策与安全文化相互作用；事故不能只解释为某个人的一次失误。',
    details: [
      '事故发生于1986年4月26日。紧急救援、辐射暴露、长期健康研究和环境治理分别有不同证据与统计口径。',
    ],
    impact: '事故改变核安全监管、信息公开与国际通报机制，也对受影响社区造成长期社会与心理负担。',
    sources: [
      ref(
        'International Atomic Energy Agency · Chernobyl: Looking Back to Go Forward',
        'https://www-pub.iaea.org/MTCD/Publications/PDF/Pub1312_web.pdf',
        '会议文集事故经过与放射性释放章节；采用1986年4月26日，不照录单一死亡估计或单因结论。',
      ),
    ],
  }),
  item({
    id: 'modern-web-proposal',
    year: 1989,
    title: '伯纳斯-李提出万维网方案',
    category: '文化',
    region: 'europe',
    themes: ['科技医学', '教育学术', '交流'],
    location: '日内瓦CERN',
    coordinates: [6.05, 46.23],
    importance: 5,
    summary:
      '伯纳斯-李在CERN提出以超文本连接信息的方案，随后发展出万维网的服务器、浏览器与基本协议。',
    background: '跨机构科学合作需要共享分散的信息，而互联网网络本身此前已发展多年。',
    details: [
      '1989年为方案提出，1990年的实现和1991年的公开传播是后续节点。万维网与互联网不是同一个概念，也不是同年发明。',
    ],
    impact:
      '万维网降低信息连接和发布门槛，推动科研、商业和社会交流，也带来治理、隐私与信息质量问题。',
    sources: [
      ref(
        'CERN · The birth of the Web',
        'https://home.cern/science/computing/the-birth-of-the-web',
        '核对1989年提案、1990年实现与后续开放传播的时间顺序，区别Web与Internet。',
      ),
    ],
  }),
  item({
    id: 'modern-berlin-wall-opened',
    year: 1989,
    title: '柏林墙边境通道开放',
    category: '政治',
    region: 'europe',
    themes: ['社会', '交流'],
    location: '柏林',
    coordinates: [13.38, 52.52],
    importance: 5,
    summary: '东德改革与民众运动之中，旅行规定发布引起人群涌向边境，柏林墙的通行限制迅速瓦解。',
    background:
      '东欧多地政治改革、人口外流与苏联政策变化共同削弱既有政权，和平转型并不是预先注定的结果。',
    details: [
      '1989年11月9日开放通道、随后拆墙与1990年德国统一不同。不能把整个东欧的转型归于单一夜晚。',
    ],
    impact: '柏林墙开放成为冷战欧洲分裂结束的象征，同时开启新的国家、社会和经济整合问题。',
    sources: [
      diplomat(
        'Fall of Communism in Eastern Europe, 1989',
        'milestones/1989-1992/fall-of-communism',
        '核对1989年11月9日边境开放、东欧改革与1990年统一之间的区别。',
      ),
    ],
  }),
  item({
    id: 'modern-education-for-all',
    year: 1990,
    title: '宗滴恩世界全民教育大会',
    category: '交流',
    region: 'southeast-asia',
    themes: ['教育学术', '社会'],
    location: '泰国宗滴恩',
    coordinates: [100.88, 12.88],
    importance: 3,
    summary:
      '国际组织、政府和教育行动者在宗滴恩讨论基本学习需要，通过《世界全民教育宣言》，扩大对基础教育的关注。',
    background: '许多儿童和成人仍缺乏识字与基础学习机会，教育目标也逐渐超出单纯增加入学人数。',
    details: [
      '宣言提出共同目标，不表示1990年已实现全民教育。教育质量、性别、贫困和语言等障碍需要长期行动。',
    ],
    impact: '大会成为此后基础教育国际合作和监测的重要参照，也引发对目标设定与实际成果的检验。',
    sources: [
      ref(
        'UNESCO · Educational planning and management modules',
        'https://healtheducationresources.unesco.org/sites/default/files/resources/planning_modules_vol_1_en.pdf',
        '全民教育历史部分列1990年3月宗滴恩大会与World Declaration on Education for All。',
      ),
    ],
  }),
  item({
    id: 'modern-human-genome-project',
    year: 1990,
    title: '人类基因组计划正式启动',
    category: '文化',
    region: 'americas',
    themes: ['科技医学', '教育学术', '交流'],
    location: '美国及国际基因组研究网络',
    coordinates: [-77.1, 39.0],
    importance: 4,
    summary:
      '人类基因组计划启动，以绘制与测定人类遗传信息为共同目标，组织长期的技术、数据和国际协作。',
    background:
      'DNA结构、分子生物学和测序技术积累，使更大尺度的研究逐渐可行；项目同时需要讨论社会与伦理影响。',
    details: [
      '1990年是正式启动，不是完整基因组已经公布。初步草图与后来的完成声明有不同标准；遗传资料也不能独自决定人的全部特征。',
    ],
    impact: '项目推动测序与数据共享，并使隐私、歧视、知情同意和利益分配成为公共议题。',
    sources: [
      ref(
        'NHGRI · Human Genome Project Timeline',
        'https://www.genome.gov/human-genome-project/timeline',
        '1990年部分明确10月1日正式启动与五年计划；伦理法律社会影响项目另列。',
      ),
    ],
  }),
  item({
    id: 'modern-soviet-dissolution',
    year: 1991,
    title: '苏联解体与独立国家格局形成',
    category: '政治',
    region: 'europe',
    themes: ['社会', '交流'],
    location: '莫斯科及各加盟共和国',
    coordinates: [37.62, 55.75],
    importance: 5,
    summary: '各加盟共和国的独立诉求和中央危机相互推动，苏联在一系列协议、声明与权力移交中解体。',
    background:
      '经济困难、政治改革、民族问题与党国权威变化累积多年，1991年政变失败加速了分离过程。',
    details: [
      '12月的别洛韦日协议、独联体扩展、戈尔巴乔夫辞职和联盟机构终结分属不同节点，不宜全部压缩为单一宣布。',
    ],
    impact: '解体改变欧亚国家体系与冷战秩序，也引发公民身份、经济转型、边界和安全方面的长期问题。',
    sources: [
      diplomat(
        'Russia: Dissolution of the Soviet Union',
        'countries/russia',
        '1991年小节列12月8日协议、21日独联体及25日辞职与承认，作为一系列过程阅读。',
      ),
    ],
  }),
  item({
    id: 'modern-channel-tunnel',
    year: 1994,
    title: '英吉利海峡隧道揭幕通行',
    category: '交流',
    region: 'europe',
    themes: ['工程建筑', '经济贸易'],
    location: '英法之间的海峡隧道',
    coordinates: [1.4, 50.92],
    importance: 4,
    summary: '英吉利海峡隧道启用，铁路连接法国与英国，改变旅客与货物跨海运输的组织方式。',
    background: '长期的跨海连接设想，需要克服海底地质、施工安全、融资和双边制度协调等困难。',
    details: [
      '1994年5月6日为揭幕仪式，客货运服务按不同阶段投入。隧道存在不表示边境检查和两国制度差异消失。',
    ],
    impact: '工程形成欧洲交通网络的重要连接，也成为大型跨境基础设施融资和运营的案例。',
    sources: [
      ref(
        'Getlink · The Channel Tunnel, 30 years of history',
        'https://press.getlinkgroup.com/assets/press-release-6may-30th-anniversary-channel-tunnel-pdf-f9f2-0791e.html?dl=1',
        '运营机构周年材料明确1994年5月6日揭幕；区别仪式与具体服务启动阶段。',
      ),
    ],
  }),
  item({
    id: 'modern-south-africa-election',
    year: 1994,
    title: '南非首次不分种族的全国民主选举',
    category: '政治',
    region: 'africa',
    themes: ['社会'],
    location: '南非各地',
    coordinates: [28.05, -26.2],
    importance: 5,
    summary: '南非举行所有成年公民不分种族均可参与的全国选举，种族隔离制度向新的宪政秩序转型。',
    background:
      '长期反种族隔离运动、国内外压力及多方谈判共同推动制度变化，转型也伴随政治暴力与艰难妥协。',
    details: [
      '4月选举、5月曼德拉就任与后来的正式宪法不同。获得平等投票权并不表示历史积累的经济不平等已被消除。',
    ],
    impact: '选举成为南非民主转型的标志，并推动对和解、正义、土地与社会重建的持续讨论。',
    sources: [
      ref(
        'South African Government · Milestones of 20 Years of Freedom',
        'https://www.gov.za/issues/20years/milestones-20-years-freedom',
        '1994年条列4月27日选举与5月10日就职；1996年宪法另列。',
      ),
    ],
  }),
  item({
    id: 'modern-wto',
    year: 1995,
    title: '世界贸易组织成立',
    category: '交流',
    region: 'europe',
    themes: ['经济贸易', '政治'],
    location: '日内瓦',
    coordinates: [6.15, 46.22],
    importance: 4,
    summary:
      '世界贸易组织开始运行，把货物、服务和知识产权等规则纳入新的组织框架，并建立争端解决程序。',
    background:
      '关贸总协定下长期谈判与乌拉圭回合推动制度扩展，全球贸易也出现更多服务与跨国生产联系。',
    details: [
      '1994年马拉喀什协议签署与1995年1月1日组织成立不同。共同规则并没有消除成员之间的利益差异和发展争论。',
    ],
    impact: 'WTO成为多边贸易协商的重要平台，其开放、例外、执行与代表性持续受到检验。',
    sources: [
      ref(
        'World Trade Organization · History of the multilateral trading system',
        'https://www.wto.org/english/thewto_e/history_e/history_e.htm',
        'Birth of the WTO部分明确1995年1月1日成立及货物、服务、知识产权和争端解决范围。',
      ),
    ],
  }),
  item({
    id: 'modern-tagore-nobel',
    year: 1913,
    title: '泰戈尔获诺贝尔文学奖与孟加拉文学传播',
    category: '文化',
    region: 'south-asia',
    themes: ['文学艺术', '交流'],
    location: '孟加拉文学与国际出版网络',
    coordinates: [88.36, 22.57],
    importance: 4,
    summary:
      '泰戈尔获得1913年诺贝尔文学奖，孟加拉诗歌通过翻译、出版和跨国文学网络获得更广泛的关注。',
    background:
      '孟加拉文学、宗教文化和殖民时代教育形成丰富交汇，泰戈尔既以母语写作，也参与英文转述。',
    details: [
      '获奖地点与作品主要创作背景不同；坐标为孟加拉文学网络参照。西方读者看到的英文本不能完全替代原有作品与语境。',
    ],
    impact: '获奖推动非欧洲文学的国际传播，也带出翻译、世界文学与文化代表性的讨论。',
    sources: [
      ref(
        'Nobel Foundation · Literature Prize 1913',
        'https://www.nobelprize.org/prizes/literature/1913/summary/',
        '1913年文学奖官方记录与作品英文传播说明；本条不转载颁奖词。',
      ),
    ],
  }),
  item({
    id: 'modern-dolly-born',
    year: 1996,
    title: '克隆羊多莉诞生，研究于次年公开',
    category: '文化',
    region: 'europe',
    themes: ['科技医学', '教育学术'],
    location: '苏格兰罗斯林研究所',
    coordinates: [-3.2, 55.86],
    importance: 4,
    summary:
      '研究团队利用成年羊体细胞的细胞核培育出多莉，为理解细胞分化与发育的可逆性提供了重要实验。',
    background:
      '胚胎操作、家畜繁育和细胞核移植研究积累多年，实验依赖研究员、胚胎学家、兽医和农场人员共同工作。',
    details: [
      '多莉于1996年7月5日出生，1997年2月才向公众公布并发表相关研究。它的关键意义是成年体细胞来源，不能笼统称为所有方法下的第一只克隆动物。',
    ],
    impact: '研究推动发育生物学与生物技术讨论，也引出动物福利、实验风险及技术应用边界的伦理问题。',
    dateNote: '时间节点采用1996年出生；1997年公开和论文发表另行说明，不把报道年份误作出生年。',
    sources: [
      ref(
        'University of Edinburgh · The Life of Dolly',
        'https://vet.ed.ac.uk/roslin/about/history/dolly/facts/life-of-dolly',
        '罗斯林研究所说明1996年7月5日出生、1997年2月22日公开及成年乳腺细胞来源；区别实验发生与研究报道。',
      ),
    ],
  }),
  item({
    id: 'modern-hong-kong-handover',
    year: 1997,
    title: '香港政权交接与特别行政区成立',
    category: '政治',
    region: 'china',
    themes: ['交流', '社会'],
    location: '香港',
    coordinates: [114.17, 22.28],
    importance: 5,
    summary:
      '中国与英国举行香港政权交接仪式，中华人民共和国恢复对香港行使主权，香港特别行政区于1997年7月1日成立。',
    background:
      '殖民时期的历史与中英谈判共同构成交接背景；过渡安排涉及治理机构、法律、财政和居民生活的延续与调整。',
    details: [
      '交接仪式、特别行政区成立与其后持续的制度实践需要分别理解。本节点说明1997年的主权和治理转折，不据此提供同期疆域多边形。',
    ],
    impact: '交接改变香港的政治地位和中央与地方关系，并成为观察一国两制制度实践的重要起点。',
    sources: [
      ref(
        '香港政府新闻公报 · 1997年7月1日',
        'https://www.info.gov.hk/gia/general/dib/0701.htm',
        '当日档案第1—3项记主权恢复仪式、交接及特别行政区成立宣誓，不用后来的纪念活动代替原始日期。',
      ),
    ],
  }),
  item({
    id: 'modern-kyoto-protocol',
    year: 1997,
    title: '《京都议定书》通过',
    category: '交流',
    region: 'east-asia',
    themes: ['经济贸易', '科技医学', '政治'],
    location: '京都',
    coordinates: [135.77, 35.01],
    importance: 4,
    summary:
      '气候变化框架公约缔约方在京都通过议定书，为部分工业化国家和转型经济体规定量化的温室气体减排安排。',
    background:
      '气候科学、排放责任和经济发展问题推动国际谈判，各国在历史责任、能力和成本方面存在分歧。',
    details: [
      '议定书于1997年12月11日通过，2005年2月16日才生效；通过、批准和履行承诺不能视为同一阶段，也不是所有国家承担完全相同的义务。',
    ],
    impact:
      '议定书成为国际气候治理的重要制度实验，使排放核算、差异责任和市场机制进入更具体的协商。',
    dateNote: '本条记录1997年通过；2005年生效属于后来阶段，不将其倒填为1997年已实施。',
    sources: [
      ref(
        'UNFCCC · The Kyoto Protocol',
        'https://unfccc.int/process-and-meetings/the-kyoto-protocol',
        '官方说明明确1997年12月11日通过、2005年2月16日生效及附件国家的约束安排。',
      ),
    ],
  }),
  item({
    id: 'modern-euro-launch',
    year: 1999,
    title: '欧元以记账货币形式启动',
    category: '交流',
    region: 'europe',
    themes: ['经济贸易', '政治'],
    location: '法兰克福与欧元区金融网络',
    coordinates: [8.68, 50.11],
    importance: 4,
    summary: '欧元于1999年1月1日成为参与国家的共同货币，最初主要用于记账、金融市场和电子支付。',
    background:
      '欧洲经济一体化、汇率协调和货币联盟谈判持续多年，共同货币需要配套的央行和政策安排。',
    details: [
      '欧元纸币与硬币到2002年1月1日才进入流通。1999年启动不能写作所有居民当时就使用欧元现金，也不等于所有欧盟国家都参加。',
    ],
    impact:
      '共同货币改变跨境支付、价格比较和货币政策组织，同时使不同经济体的协调与调整成为长期问题。',
    dateNote: '采用1999年记账货币启动；2002年现金转换另行说明。',
    sources: [
      ref(
        'European Central Bank · Our money',
        'https://www.ecb.europa.eu/euro/intro/html/index.en.html',
        'ECB历史说明明确1999年1月1日启动、前三年记账用途与2002年现金发行；仅采用历史部分。',
      ),
    ],
  }),
  item({
    id: 'modern-macao-handover',
    year: 1999,
    title: '澳门政权交接与特别行政区成立',
    category: '政治',
    region: 'china',
    themes: ['交流', '社会'],
    location: '澳门',
    coordinates: [113.56, 22.19],
    importance: 4,
    summary:
      '中国与葡萄牙举行澳门政权交接，中华人民共和国于1999年12月20日恢复对澳门行使主权，澳门特别行政区成立。',
    background:
      '葡萄牙在澳门长期管治的历史与中葡谈判形成过渡背景，交接涉及行政、法律和社会机构的安排。',
    details: [
      '1999年的交接场地与2004年开放的回归贺礼陈列馆不同；后来的纪念建筑不能被当作当时已建成的历史现场。',
    ],
    impact: '交接改变澳门的政治地位，并使既有城市社会在特别行政区制度下进入新的发展阶段。',
    sources: [
      ref(
        '澳门文化局 · 回归贺礼陈列馆',
        'https://www.icm.gov.mo/handovermuseum/en',
        '馆方说明明确1999年12月20日交接场地与2003—2004年陈列馆建设，区分历史事件和纪念设施。',
      ),
    ],
  }),
  item({
    id: 'modern-human-genome-draft',
    year: 2000,
    title: '人类基因组工作草图宣布',
    category: '文化',
    region: 'americas',
    themes: ['科技医学', '教育学术', '交流'],
    location: '国际基因组研究网络与华盛顿公告',
    coordinates: [-77.04, 38.9],
    importance: 4,
    summary:
      '国际合作团队宣布取得人类基因组工作草图，长期测序、组装和数据共享工作获得一个重要阶段性结果。',
    background:
      '人类基因组计划于1990年正式启动，实验室自动化、计算分析与跨国合作持续扩大可处理的数据规模。',
    details: [
      '2000年6月的公告不是无缺口的完整基因组。草图仍有大量未知区域，2001年初步分析发表与2003年项目完成声明也有各自的时间和技术标准。',
    ],
    impact:
      '草图扩大生物医学研究的共同数据基础，并使开放共享、商业利益、隐私和公平获得更加受到关注。',
    dateNote: '采用2000年工作草图公告；不把2003年完成声明或2022年更完整序列倒写为当时成果。',
    sources: [
      ref(
        'NHGRI · Human Genome Project Fact Sheet',
        'https://www.genome.gov/about-genomics/educational-resources/fact-sheets/human-genome-project',
        '核对2000年6月草图公告、残留缺口与2003年项目结果，明确草图并非完整无缺口序列。',
      ),
    ],
  }),
  item({
    id: 'modern-millennium-declaration',
    year: 2000,
    title: '联合国大会通过《千年宣言》',
    category: '交流',
    region: 'americas',
    themes: ['政治', '社会', '教育学术', '经济贸易'],
    location: '纽约联合国总部',
    coordinates: [-73.97, 40.75],
    importance: 4,
    summary:
      '联合国千年首脑会议后，大会通过《千年宣言》，围绕和平、安全、发展、贫困、人权和环境提出共同承诺。',
    background:
      '冷战结束后的全球化、冲突和不平等促使各国重新讨论国际合作的优先次序，也需要检验此前发展承诺的实施。',
    details: [
      '宣言于2000年9月8日获通过，后来千年发展目标的制定与监测是在此基础上的进一步安排；发表承诺不等于目标已经实现。',
    ],
    impact:
      '宣言为21世纪初的国际发展合作提供框架，也使目标、指标、责任和实际成果成为持续评价的对象。',
    sources: [
      ref(
        'United Nations · Millennium Declaration, Resolution 55/2',
        'https://www.un.org/en/ga/president/55/pdf/priorities/millenniumsummit.pdf',
        '大会55/2号决议全文，首脑于2000年9月6—8日在纽约聚会，9月8日通过；区别宣言和后来的指标体系。',
      ),
    ],
  }),
]
