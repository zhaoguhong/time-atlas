import type { HistoryEvent, Person, Source } from '../types'

const source = (title: string, url: string, note: string): Source => ({ title, url, note })
const plague = source(
  'Singapore Medical Journal · Dr Wu Lien-teh: modernising post-1911 China’s public health service',
  'https://pmc.ncbi.nlm.nih.gov/articles/PMC4291938/',
  '吴连德主持东北肺鼠疫防疫、隔离与1911年国际防疫会议的医学史研究。',
)
const thunderstorm = source(
  '国家大剧院 · 跨越世纪的经典——《雷雨》的前生今世',
  'https://www.chncpa.org/cgyl_278/yszl/wqzl/201508/t20150819_158895.shtml',
  '1934年7月《文学季刊》发表、1935年东京演出及1936年单行本分列。',
)
const artemisinin = source(
  '诺贝尔奖机构 · 屠呦呦自传',
  'https://www.nobelprize.org/prizes/medicine/2015/tu/biographical/',
  'Sample no. 191、首次临床试验及Artemisinin and dihydroartemisinin各节；为获奖者的研究回顾。',
)
const hybridRice = source(
  'IRRI · A hybrid history',
  'https://ricetoday.irri.org/a-hybrid-history/',
  '杂交水稻三系育种与推广历程，区分技术配套和随后商业化。',
)
const maoSociety = source(
  'Felix Wemheuer · A Social History of Maoist China · Introduction',
  'https://assets.cambridge.org/97811071/23700/excerpt/9781107123700_excerpt.pdf',
  '剑桥大学出版社试读，导论第2页及第5—7页；社会变化、城乡差别、政治分类和冲突。',
)

// These records fill specific reading gaps; ranges describe processes, not precise one-day events.
export const completenessEvents: HistoryEvent[] = [
  {
    id: 'completeness-jingzhang-railway',
    year: 1909,
    title: '京张铁路建成通车',
    category: '社会',
    region: 'china',
    themes: ['工程建筑', '科技医学', '经济贸易'],
    location: '北京南口、青龙桥至张家口',
    coordinates: [116.01, 40.35],
    summary: '詹天佑主持修建的京张铁路在1909年通车，铁路越过关沟山地，把北京与张家口连接起来。',
    background: '铁路建设既关系运输和贸易，也处在清末争取自主办路的政治环境中。',
    impact: '它积累了中国工程人员主持干线铁路的设计与施工经验，并改变沿线客货运输条件。',
    people: ['q1397430'],
    importance: 4,
    locationNote: '坐标取青龙桥一带作山地工程参照，不代表整条线路或当年所有车站的位置。',
    dateNote: '本条标记1909年建成通车；验收、分段运行与通车典礼有不同日期。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1909年，连接北京与张家口的京张铁路建成通车。詹天佑担任总工程师，带领工程人员把线路从北京平原引向关沟，再越过山地通往张家口。铁路建设的难点集中在陡坡、隧道与运输条件，也涉及测量、材料供应和施工组织。',
            '青龙桥附近采用折返的线路安排，列车通过改变行进方向来克服高差；隧道则缩短了穿越山体的路径。这些措施针对的是具体地形，并非一项设计就能解决全线困难。铁路通车后，沿线人员与货物往来有了新的条件，也为工程人员和铁路管理积累经验。',
          ],
        },
      ],
    },
    sources: [
      source(
        '北京市文物局 · 京张铁路南口段至八达岭段',
        'https://wwj.beijing.gov.cn/bjww/362771/362779/dqpqgzdwwbhdw/523544/index.html',
        '文物保护单位说明，记1905年开工、1909年建成及人字形铁路、青龙桥车站等遗存。',
      ),
    ],
  },
  {
    id: 'completeness-manchurian-plague',
    year: 1910,
    endYear: 1911,
    dateLabel: '1910—1911年',
    title: '东北肺鼠疫防治与公共卫生组织',
    category: '社会',
    region: 'china',
    themes: ['科技医学', '社会'],
    location: '哈尔滨及东北铁路沿线',
    coordinates: [126.64, 45.76],
    summary:
      '东北暴发严重肺鼠疫，吴连德等人组织检验、隔离和交通检疫，防疫工作随后推动常设公共卫生机构的发展。',
    background: '铁路、务工和人口往来使疫情跨地区传播，地方医疗、行政与跨国协作都面临压力。',
    impact: '防疫把医学检验与人口流动管理联系起来，1911年的国际会议又推动了专业交流。',
    people: ['completeness-wu-lien-teh'],
    importance: 4,
    locationNote: '哈尔滨为防疫的重要工作中心；疫情和检疫覆盖多个地点，不能缩为一处医院。',
    dateNote: '区间覆盖1910年冬疫情扩散至1911年防治及国际会议；后续常设机构建设另有时间过程。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1910年冬，东北的肺鼠疫沿人员流动与铁路交通扩散。病人很快死亡，医护人员也面临感染风险。吴连德到哈尔滨后进行调查和检验，判断这次疫情主要通过呼吸道传播，防治因而不能只围绕灭鼠展开。',
            '防疫人员隔离病人、检查往来旅客、使用防护口罩，并处理可能继续传播疾病的遗体。这些措施需要医护、地方官员、警察和居民共同配合，也引起出行、丧葬与生活上的困难。1911年疫情得到控制后，奉天召开国际鼠疫会议，检验和防疫经验获得讨论。东北防疫此后进一步走向常设机构，公共卫生逐渐成为持续的行政与医学工作。',
          ],
        },
      ],
    },
    sources: [plague],
  },
  {
    id: 'completeness-thunderstorm',
    year: 1934,
    title: '曹禺《雷雨》发表',
    category: '文化',
    region: 'china',
    themes: ['文学艺术'],
    location: '北平',
    coordinates: [116.4, 39.9],
    summary:
      '曹禺的四幕话剧《雷雨》发表于《文学季刊》，通过两个家庭的冲突，把家庭权力、阶级差别与个人选择带到现代话剧舞台。',
    background: '中国话剧在翻译、学校演剧和职业剧团的实践中发展，原创剧本也在探索新的舞台语言。',
    impact: '作品经出版与反复演出成为现代话剧的重要剧目，不同演出继续形成各自解释。',
    people: ['completeness-cao-yu'],
    importance: 3,
    dateNote: '1933年写成初稿、1934年发表、1935年演出和1936年单行本是不同节点。',
    locationNote: '标记《文学季刊》所在的北平作为发表参照，不据此定位虚构故事现场。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1934年7月，曹禺的《雷雨》经巴金推荐，刊登在《文学季刊》第一卷第三期。曹禺此前已有学校演剧和阅读中外剧作的经验，1933年完成的初稿，把多年前的家庭往事同眼前的矛盾交织在一起。',
            '戏剧围绕周、鲁两家展开。父权、雇佣关系和被隐藏的身世，使人物在一个家庭空间内不断冲突；过去的选择又在后来的生活中产生后果。作品的力量来自对话、人物关系与舞台节奏，读者也由此接触现代话剧怎样组织复杂故事。1935年的演出和1936年的单行本继续扩大传播，此后的剧团又在表演和删改中赋予作品新的面貌。',
          ],
        },
      ],
    },
    sources: [thunderstorm],
  },
  {
    id: 'completeness-southwest-university',
    year: 1938,
    endYear: 1946,
    dateLabel: '1938—1946年',
    title: '西南联合大学在战时云南办学',
    category: '文化',
    region: 'china',
    themes: ['教育学术', '社会'],
    location: '昆明、蒙自',
    coordinates: [102.7, 25.05],
    summary:
      '北京大学、清华大学、南开大学南迁后联合办学，在战时云南维持教学与研究，也经历轰炸、物资短缺和师生生活困难。',
    background: '日本侵华战争迫使华北多所大学迁移，保存教师队伍、图书仪器与教学组织成为紧迫任务。',
    impact: '联合办学延续了多学科教育和研究，学生与云南社会之间也形成新的联系。',
    people: [],
    importance: 4,
    dateNote: '1937年的长沙临时大学是前身；1938年改称西南联大并在云南开课，1946年结束联合办学。',
    locationNote:
      '坐标取昆明作为主要办学地；1938年文法学院曾在蒙自上课，并非所有师生同时集中于一处。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '华北战事扩大后，北京大学、清华大学与南开大学先在长沙组成临时大学，随后继续迁往云南。1938年4月，学校改称国立西南联合大学，5月在昆明、蒙自等地开课。师生的迁移既依靠车船，也有分组步行；教学地点则经历借用校舍和陆续集中。',
            '战争没有让课程与研究停下，却使办学条件长期紧张。学校需要在经费、设备和住房不足的情况下维持实验、授课与图书使用，师生还要应对空袭和物价上涨。地质调查、乡村研究与地方材料采集，又把大学知识同云南的地理和社会联系起来。1946年联合办学结束，三校陆续复员，留在云南的师范教育则继续发展。',
          ],
        },
      ],
    },
    sources: [
      source(
        '清华大学校史馆 · 父亲袁复礼的西南联大情结',
        'https://xsg.tsinghua.edu.cn/info/1004/3408.htm',
        '1937—1938年南迁、昆明开课、分散校址及地质教学调查的校史回顾。',
      ),
      source(
        '清华大学 · 辗转西南，离乱弦歌不辍',
        'https://www.tsinghua.edu.cn/info/1771/71988.htm',
        '联合办学、院系组织和1946年5月4日结业节点。',
      ),
    ],
  },
  {
    id: 'completeness-marriage-law',
    year: 1950,
    title: '新婚姻法确立婚姻自由与男女平等原则',
    category: '社会',
    region: 'china',
    themes: ['社会', '政治'],
    location: '北京及各地',
    coordinates: [116.4, 39.9],
    summary:
      '1950年《婚姻法》公布实施，以婚姻自由、一夫一妻和男女平等为原则，并规定登记、夫妻权利和离婚等事项。',
    background: '婚姻涉及家庭劳动、财产、代际权力和地方习惯，新政府试图以法律重新规定这些关系。',
    impact: '法律为处理婚姻纠纷提供新依据，其落实仍依赖法院、基层组织和当事人的行动。',
    people: [],
    importance: 4,
    dateNote: '本条指1950年公布施行的法律，不将1980年或后来的修订条文移入该版本。',
    locationNote: '北京为法律公布的政治中心参照，执行和家庭生活变化发生于各地。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1950年，新制定的《婚姻法》公布，自5月1日起施行。法律明确婚姻自由、一夫一妻、男女平等及保护妇女和子女利益，禁止包办强迫和买卖婚姻，并以登记和司法程序处理婚姻关系。',
            '这些条文直接关系个人能否选择配偶、家庭财产怎样处理，以及出现冲突时能否提出离婚。法律提供了新的权利依据，但家庭中的经济依赖、父母长辈的权力和地方习惯不会随公布而立即消失。理解这次变化，需要同时看法律文本与具体执行：人们如何提出诉求，基层人员如何调解，法院又怎样处理争议。',
          ],
        },
      ],
    },
    sources: [
      source(
        '中国国家博物馆 · 《中华人民共和国婚姻法》',
        'https://www.chnmuseum.cn/zp/zpml/gshww/202103/t20210331_249352.shtml',
        '馆藏1950年婚姻法及公布实施说明，区分法令颁布与5月1日实施。',
      ),
      source(
        '《中华人民共和国婚姻法》（1950年）',
        'https://zh.wikisource.org/wiki/中华人民共和国婚姻法_(1950年)',
        '1950年法律原文第一章至离婚章节；维基文库为文本入口，不混用后续修订版本。',
      ),
    ],
  },
  {
    id: 'completeness-first-five-year-plan',
    year: 1953,
    endYear: 1957,
    dateLabel: '1953—1957年',
    title: '第一个五年计划与工业建设',
    category: '社会',
    region: 'china',
    themes: ['经济贸易', '工程建筑', '社会'],
    location: '北京、东北及内地工业城市',
    coordinates: [123.43, 41.8],
    summary:
      '中国在第一个五年计划期间集中投资工业、能源和交通，重工业建设与新的计划配置方式共同改变城市生产和劳动生活。',
    background:
      '战后经济恢复之后，政府把工业化放在优先位置，建设依赖国内资源动员和苏联等方面的技术援助。',
    impact: '新的工厂和交通能源设施扩展工业基础，资源配置也形成明显的部门与城乡差别。',
    people: [],
    importance: 4,
    dateNote: '计划期为1953—1957年，正式审议通过计划文本在1955年；各项目开工、投产并不同步。',
    locationNote: '沈阳作为东北工业城市参照，计划覆盖多地，不表示所有工程集中在该市。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1953—1957年，中国实施第一个五年计划，把较多投资投向钢铁、机械、煤炭、电力和交通。这种安排希望先扩大制造机器与提供能源的能力，再支持其他生产部门。工厂建设需要设备、工程设计、技术训练与配套运输，苏联援助项目是其中的重要部分。',
            '工业化也改变了城市生活。新的企业吸纳劳动者，厂区与住宅、学校、医疗等设施逐步联系起来；与此同时，农业和消费品生产承担着支持工业积累的任务。计划文本提出的目标、具体项目的投产与居民实际生活有各自的过程，不能只以建成工厂的数量概括这一时期。',
          ],
        },
      ],
    },
    sources: [
      source(
        '国家发展改革委 · “一五”计划（1953—1957年）',
        'https://www.ndrc.gov.cn/fggz/fzzlgh/gjfzgh/202112/P020211214370085847910.pdf',
        '计划原文的基本任务、工业建设与投资比例各节。',
      ),
      maoSociety,
    ],
  },
  {
    id: 'completeness-wuhan-bridge',
    year: 1957,
    title: '武汉长江大桥通车',
    category: '社会',
    region: 'china',
    themes: ['工程建筑', '经济贸易'],
    location: '武汉龟山与蛇山之间',
    coordinates: [114.29, 30.55],
    summary:
      '武汉长江大桥在1957年通车，以公路、铁路双层桥面连接长江两岸，南北铁路运输由此减少对轮渡的依赖。',
    background: '长江水运连接东西，跨江铁路和公路却长期受到渡运能力的约束。',
    impact: '大桥衔接南北铁路并改善武汉三镇交通，成为交通网络和城市空间变化的重要节点。',
    people: [],
    importance: 3,
    locationNote: '坐标取桥梁附近；桥梁连接的是具体两岸通道，不能代表长江全部交通条件。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1957年10月，武汉长江大桥通车。铁路列车通过下层桥面跨过长江，上层公路则连接武昌与汉阳方向。此前铁路南北通行需要渡江衔接，渡运能力和江面条件会影响运输；大桥把跨江环节纳入连续的轨道交通。',
            '工程需要解决深水基础、江流和桥梁架设等问题，也离不开勘测、施工人员与技术协作。桥梁建成后，原来分隔的铁路得到接通，武汉三镇之间的出行和城市发展有了新的条件。它的作用来自与车站、道路、港口和后续交通设施共同运转，而不只是一座孤立的建筑。',
          ],
        },
      ],
    },
    sources: [
      source(
        '武汉市人民政府 · 武汉长江大桥',
        'https://www.wuhan.gov.cn/ztzl/25zt/qiao/whzjdq/index.shtml',
        '桥梁专题所列1957年10月通车、公铁两用结构与交通连接。',
      ),
    ],
  },
  {
    id: 'completeness-great-leap-famine',
    year: 1958,
    endYear: 1961,
    dateLabel: '1958—1961年',
    title: '大跃进、人民公社与严重饥荒',
    category: '社会',
    region: 'china',
    themes: ['社会', '政治', '经济贸易'],
    location: '中国各地，农村受灾尤其严重',
    coordinates: [113.63, 34.75],
    summary:
      '大跃进和人民公社运动以激进动员追求生产增长，随后发生严重饥荒，粮食征购、生产组织和信息失真等政策因素造成巨大损失。',
    background:
      '工业化目标和政治动员推动生产指标迅速提高，对地方真实生产与粮食供应的掌握受到破坏。',
    impact: '大量居民饥饿、患病和死亡，农业与经济政策随后调整；各地受灾程度和死亡估计存在差异。',
    people: ['modern-phil-mao'],
    importance: 5,
    dateNote: '1958年为运动展开节点，严重饥荒通常集中讨论1959—1961年；不同地区起止并不完全相同。',
    locationNote: '河南坐标仅作受灾农村地区的区域参照，不代表灾难只发生在此处。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1958年，大跃进与人民公社运动迅速展开。高产指标、集中劳动和公共食堂等安排改变农村的生产与生活；工业领域也发动大规模动员。对增长速度的追求与政治压力相互加强，真实的产量和基层困难难以及时进入决策。',
            '随后发生的严重饥荒使大量居民饥饿、患病和死亡，农村受到尤其沉重的打击。生产组织失调、过量征购、虚报产量与限制人口流动等政策和制度因素，是解释灾难的重要部分；各地自然条件与政策执行又有所不同。1961年前后开始的调整逐步改变部分安排。死亡规模因资料与计算方法不同仍有多种估计，本条保留这种差异，不把灾难归结为笼统的自然歉收。',
          ],
        },
      ],
    },
    sources: [maoSociety],
  },
  {
    id: 'completeness-insulin-synthesis',
    year: 1965,
    title: '人工全合成结晶牛胰岛素',
    category: '文化',
    region: 'china',
    themes: ['科技医学'],
    location: '上海、北京',
    coordinates: [121.45, 31.2],
    summary:
      '中国科学院和北京大学等单位的研究人员获得人工全合成、具有生物活性的结晶牛胰岛素，推进了蛋白质合成与结构研究。',
    background: '胰岛素的氨基酸序列已获测定，化学合成与正确折叠能否恢复生物活性成为研究问题。',
    impact: '成果说明人工合成的肽链可以组成有活性的蛋白质，也推动分析鉴定和多学科协作。',
    people: [],
    importance: 4,
    locationNote: '坐标为上海研究工作的城市参照；实验由上海和北京的多个单位协作完成。',
    dateNote: '1965年9月获得结晶，随后继续分析鉴定与发表；不等于当年即形成临床大规模生产。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1965年9月，中国科学院上海生物化学研究所、上海有机化学研究所与北京大学化学系等单位的合作研究，获得人工全合成的结晶牛胰岛素。研究者分别制备肽链，再让它们通过正确的连接和折叠形成具有生物活性的分子。',
            '困难不仅在合成出足够长的链，还在于纯化、判断连接是否正确，并用生物活性和结构分析检验最终产物。结晶之后，团队继续要求补充鉴定证据。这项工作使化学合成、蛋白质结构和生物学实验形成联系；其意义主要是基础研究上的突破，距离稳定制药和患者使用仍有后续步骤。',
          ],
        },
      ],
    },
    sources: [
      source(
        '中国科学院上海有机化学研究所 · 从合成结晶牛胰岛素到合成我们的未来',
        'https://sioc.cas.cn/news/zhxw/201509/t20150918_6769438.html',
        '研究人员回顾合作分工、1965年获得结晶及鉴定时要求补充证据的过程。',
      ),
    ],
  },
  {
    id: 'completeness-cultural-revolution',
    year: 1966,
    endYear: 1976,
    dateLabel: '1966—1976年',
    title: '文化大革命与社会秩序的剧烈破坏',
    category: '政治',
    region: 'china',
    themes: ['政治', '社会', '教育学术'],
    location: '北京及中国各地',
    coordinates: [116.4, 39.9],
    summary:
      '毛泽东发动文化大革命，政治批斗、派性冲突和迫害破坏行政、教育与社会生活，许多人遭受暴力、失学和家庭离散。',
    background: '对党内权力和发展道路的争论，被转化为大规模政治运动，阶级标签深刻影响个人处境。',
    impact: '运动造成严重人身伤害和制度破坏，1976年后经历政策调整、平反与教育恢复。',
    people: ['modern-phil-mao'],
    importance: 5,
    locationNote: '北京为政治动员的重要中心；各地运动阶段、暴力程度和个人经历有显著差异。',
    dateNote:
      '采用1966年发动至1976年结束的通行分期；各地运动与政策经历多次阶段变化，影响延续至此后。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1966年，毛泽东发动文化大革命，以批判所谓党内“走资本主义道路的当权派”等名义号召群众参与政治斗争。学校和机关受到冲击，红卫兵及其他群众组织迅速出现。对个人的政治标签常成为批斗、剥夺职务和暴力迫害的依据，文化遗产和私人生活也遭到破坏。',
            '不同组织之间逐渐发生派性冲突，有些地区出现严重武斗和杀戮，军队介入与地方权力重组又改变运动的走向。随后大批城市青年被送往农村，教育和职业道路受到长期影响。整个十年并非处处维持同一种局面，生产、科研与日常生活也在困难中延续。1976年毛泽东去世、四人帮被捕后，运动结束；此后的平反、恢复考试与政策转折，回应了这段经历留下的深刻创伤。',
          ],
        },
      ],
    },
    sources: [maoSociety],
  },
  {
    id: 'completeness-dongfanghong',
    year: 1970,
    title: '东方红一号卫星发射',
    category: '文化',
    region: 'china',
    themes: ['科技医学'],
    location: '酒泉卫星发射中心',
    coordinates: [100.29, 40.96],
    summary: '长征一号运载火箭把东方红一号送入轨道，中国完成首次人造地球卫星发射。',
    background: '卫星发射依靠火箭、测控、电子设备和地面组织等多方面长期研究。',
    impact: '发射验证了中国自主研制运载火箭与卫星系统的能力，为后续空间任务积累经验。',
    people: [],
    importance: 4,
    locationNote: '“酒泉”是发射中心名称；坐标取实际发射场所在区域，不以酒泉市区代替。',
    dateNote: '1970年4月24日为发射日；本条不把后续通信、遥感或载人航天能力追溯为当日已有。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1970年4月24日，长征一号火箭从酒泉卫星发射中心升空，把东方红一号送入预定轨道。这次任务需要运载火箭完成分级飞行，也需要卫星在轨道上工作，并由地面设备确认其位置和信号。',
            '卫星广播的乐曲成为广为人知的声音，背后则是火箭动力、结构、供电、无线电与测控等领域的配合。首次发射建立了继续开展空间试验的技术与组织基础；后来的通信、遥感等应用卫星，又有各自的研制和验证过程。',
          ],
        },
      ],
    },
    sources: [
      source(
        '国家航天局 · 1970年4月24日，长征一号运载火箭成功发射东方红一号',
        'https://www.cnsa.gov.cn/n6758968/n6758972/c6798659/content.html',
        '国家航天局历史记录，列首次火箭和卫星发射节点。',
      ),
    ],
  },
  {
    id: 'completeness-artemisinin',
    year: 1971,
    endYear: 1972,
    dateLabel: '1971—1972年',
    title: '青蒿抗疟研究取得突破',
    category: '文化',
    region: 'china',
    themes: ['科技医学'],
    location: '北京、海南等地',
    coordinates: [116.4, 39.9],
    summary:
      '屠呦呦及合作团队改进青蒿提取方法，取得有效抗疟提取物并开展初步临床研究，随后分离青蒿素。',
    background: '抗疟药耐药问题推动新的药物研究，523项目组织多个单位筛选药物与开展实验。',
    impact: '研究开启了青蒿素类药物的发展，成药仍经历结构分析、剂型改进和更广泛临床工作。',
    people: ['completeness-tu-youyou'],
    importance: 4,
    dateNote: '1971年有效提取物、1972年临床与分离研究、后来结构确定及推广是不同阶段。',
    locationNote: '北京为主要实验工作城市参照，首次临床研究还在海南等地开展。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '在523抗疟研究项目中，屠呦呦团队筛选草药，并从古代医籍有关青蒿处理的记载获得启发，调整提取温度和方法。1971年，改进后的青蒿提取物在动物实验中显示抗疟作用，接着需要确认安全性、有效成分与临床效果。',
            '1972年，研究者在海南和北京开展初步临床研究，同时从提取物中分离结晶。此后的结构分析由多个研究单位合作完成，剂型与制备方法也不断调整。有效提取物、青蒿素纯化与可推广的药物是连续却不同的步骤；这一过程既有传统药物知识的启发，也依靠现代化学、药理和临床实验。',
          ],
        },
      ],
    },
    sources: [artemisinin],
  },
  {
    id: 'completeness-hybrid-rice',
    year: 1973,
    title: '籼型杂交水稻三系配套取得进展',
    category: '社会',
    region: 'china',
    themes: ['科技医学', '经济贸易'],
    location: '湖南、海南及协作育种地区',
    coordinates: [112.98, 28.2],
    summary:
      '袁隆平及各地协作育种团队在1973年前后完成籼型杂交水稻三系配套，为随后制种和推广建立条件。',
    background: '水稻主要自花授粉，要利用杂种优势，必须解决稳定不育、保持不育与恢复育性的问题。',
    impact: '三系育种使杂交种子生产逐步可行，增产效果仍依赖品种适应性、制种技术和田间管理。',
    people: ['completeness-yuan-longping'],
    importance: 4,
    dateNote: '1973年是三系技术配套节点，规模推广在随后展开，不将育种突破写成当年全国普及。',
    locationNote: '长沙为协作研究中心之一；海南与多个省份的育种和试验共同构成研究过程。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1973年前后，中国多个育种团队完成籼型杂交水稻三系配套。不育系提供不能正常自花结实的母本，保持系帮助繁殖不育系，恢复系则使杂交后代恢复育性并结实。三类材料的结合，让水稻杂种优势逐步转为可生产的种子。',
            '袁隆平推动的研究依靠多地协作：寻找野生和栽培材料、反复杂交、鉴定育性，再到试种和制种技术，每一步都有具体困难。育种成功后还需要解决种子纯度、种植安排和地区适应性，随后才逐渐扩大推广。粮食生产的改善因此包含品种、农田条件与农民管理经验的共同作用。',
          ],
        },
      ],
    },
    sources: [
      hybridRice,
      source(
        'Plant Breeding · Research and development of hybrid rice in China',
        'https://onlinelibrary.wiley.com/doi/10.1111/pbr.13134',
        '第2.1.3节列恢复系筛选、1973年三系配套及随后商业化阶段。',
      ),
    ],
  },
  {
    id: 'completeness-shenzhen-sez',
    year: 1980,
    title: '深圳经济特区建立',
    category: '社会',
    region: 'china',
    themes: ['经济贸易', '社会'],
    location: '深圳',
    coordinates: [114.06, 22.55],
    summary:
      '广东省经济特区条例获批准，深圳在投资、企业经营与对外经济往来方面开展制度试验，吸引企业和劳动者进入。',
    background: '改革开放初期，沿海地区尝试以较灵活的经济管理方式连接境外资金、市场和技术。',
    impact: '特区建设推动工业、基础设施和人口快速增长，城市扩展也带来住房、劳动与公共服务需求。',
    people: [],
    importance: 4,
    dateNote: '1980年8月26日条例获批准为本条节点；深圳设市和特区后来扩展各有不同日期。',
    locationNote: '坐标为深圳城市参照，不把今日全市范围当作1980年的特区边界。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1980年8月26日，全国人大常委会批准《广东省经济特区条例》，深圳经济特区由此建立。当地利用靠近香港的区位，尝试吸引境外投资，发展加工制造和贸易，并在企业经营、用工及土地使用等方面逐步探索新的办法。',
            '厂房、道路和港口等设施的建设，与大批劳动者迁入共同改变了这座城市。企业获得新的市场和生产条件，居民也面对就业、住房、教育与生活保障的现实问题。特区的变化经历长期建设和政策调整，设立年份是制度起点，不能替代随后几十年的城市发展过程。',
          ],
        },
      ],
    },
    sources: [
      source(
        '深圳市档案馆 · 深圳的建制沿革：从边陲小镇到国际化大都市',
        'https://www.szdag.gov.cn/dawh/tqssn/content/post_98517.html',
        '特区条例批准、设市和后续行政经济权限变化的档案回顾。',
      ),
    ],
  },
  {
    id: 'completeness-compulsory-education',
    year: 1986,
    title: '义务教育法确立九年义务教育制度',
    category: '社会',
    region: 'china',
    themes: ['教育学术', '社会'],
    location: '北京及各地学校',
    coordinates: [116.4, 39.9],
    summary:
      '1986年《义务教育法》通过，以法律规定九年制义务教育及国家、社会、学校和家庭的保障责任。',
    background: '普及基础教育需要持续解决师资、校舍、地区差别与家庭负担，立法为实施提供共同框架。',
    impact: '儿童接受基础教育的权利和相关责任有了明确法律依据，具体普及仍按地区条件逐步推进。',
    people: [],
    importance: 4,
    dateNote: '1986年4月12日通过、7月1日施行；免学费与后来全面免除学杂费的进程应区别。',
    locationNote: '北京为立法地点参照，义务教育实施涉及全国城乡学校。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1986年4月，全国人大通过《义务教育法》，规定国家实行九年制义务教育，并要求国家、社会、学校和家庭保障适龄儿童少年的受教育权利。法律自当年7月1日起施行，各地依经济和文化条件确定推行步骤。',
            '法律确立的是需要落实的制度。让儿童进入学校并完成学业，还要建设校舍、培养教师、安排经费，并帮助困难家庭承担求学中的实际支出。1986年法律规定免收学费，但各地普及和后来经费保障的完善经历了较长过程，不能把通过法律的一年当作全国已经同时完成九年教育的一年。',
          ],
        },
      ],
    },
    sources: [
      source(
        '中国教育和科研计算机网 · 中华人民共和国义务教育法（1986年）',
        'https://www.edu.cn/jiao_yu_fa_lv_766/20060303/t20060303_165119.shtml',
        '1986年原版法律，第二、四、五及十条等；与2006年修订文本分开。',
      ),
    ],
  },
  {
    id: 'completeness-shanghai-stock-exchange',
    year: 1990,
    title: '上海证券交易所开业',
    category: '社会',
    region: 'china',
    themes: ['经济贸易'],
    location: '上海浦江饭店',
    coordinates: [121.49, 31.25],
    summary:
      '上海证券交易所于1990年12月开业，证券交易逐步集中到有组织的市场，企业融资、投资与监管制度继续发展。',
    background: '企业和金融改革中，股票、债券及其交易实践先已出现，需要相应交易设施与规则。',
    impact: '交易所为证券交易提供集中场所，信息披露、上市和监管制度则在后续逐步建立和调整。',
    people: [],
    importance: 3,
    dateNote:
      '1990年11月26日成立、12月19日开业；中国早期证券市场另有历史，不能称为中国首次出现证券交易。',
    locationNote: '坐标取开业时的浦江饭店附近；交易所后来迁址。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1990年12月19日，上海证券交易所在浦江饭店开业。企业改革和金融试验已带来股票、债券与交易需求，交易所把一部分买卖集中到共同场所，为报价、成交、登记和监督建立更有组织的安排。',
            '交易市场让企业融资与个人投资有了新的渠道，也需要处理信息不对称、价格波动和违规交易。交易所成立、集中登记、交易技术改进及监管规则形成并非同时完成；1990年是改革时期证券市场发展的节点，之后的制度建设仍持续影响市场如何运行。',
          ],
        },
      ],
    },
    sources: [
      source(
        '上海证券交易所 · Overview',
        'https://english.sse.com.cn/aboutsse/overview/',
        '成立、开业日期与最初浦江饭店地址；现代机构介绍不用于倒推1990年已有全部现行规则。',
      ),
    ],
  },
  {
    id: 'completeness-shahnameh',
    year: 1010,
    title: '菲尔多西完成《列王纪》的主要编写',
    category: '文化',
    region: 'west-asia',
    themes: ['文学艺术'],
    location: '图斯及波斯语文化地区',
    coordinates: [59.52, 36.49],
    summary:
      '菲尔多西以波斯语长诗整理传说、英雄故事与王朝历史，《列王纪》成为波斯语文学和历史记忆的重要作品。',
    background: '新波斯语文学逐渐兴盛，诗人利用更早的叙事、书面材料与前人的诗作重新组织过去。',
    impact: '作品经抄写、诵读、绘画与再创作跨越多个地区传播，影响多种文学传统。',
    people: [],
    importance: 3,
    dateNote: '1010年为通常采用的主要完稿节点，写作持续多年，后续修订和抄本年代另计。',
    locationNote: '图斯为作者生活与写作的地域参照，不认定长诗全部在单一建筑写成。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '约1010年，菲尔多西完成《列王纪》的主要编写。这部长诗把伊朗的神话、英雄故事和王朝历史连成叙事，其中既有更早传统，也吸收前人整理的材料与诗句。鲁斯塔姆等英雄的故事，同王权、忠诚、亲属冲突和命运交织，构成作品的中心内容。',
            '它所叙述的时代并不都能作为直接史实使用，却让波斯语读者以诗歌重新认识共同的过去。后来的抄本、插图和朗诵把故事传到更广地区，波斯语之外的突厥语、格鲁吉亚语等文学也受到影响。作品的长期生命来自持续阅读与改写，而非一本原稿完整不变地流传至今。',
          ],
        },
      ],
    },
    sources: [
      source(
        '美国国会图书馆 · The Epic of Shahnameh',
        'https://www.loc.gov/exhibits/thousand-years-of-the-persian-book/epic-of-shahnameh.html',
        '《波斯书籍千年》展览的史诗编写、1010年节点与传播说明。',
      ),
    ],
  },
  {
    id: 'completeness-kutadgu-bilig',
    year: 1069,
    endYear: 1070,
    dateLabel: '1069—1070年',
    title: '《福乐智慧》讨论治国与个人修养',
    category: '文化',
    region: 'central-asia',
    themes: ['文学艺术', '哲学', '教育学术'],
    location: '喀什噶尔（今喀什）',
    coordinates: [75.99, 39.47],
    summary:
      '优素甫以突厥语写成长篇劝诫诗《福乐智慧》，通过人物对话讨论公正、权力、知识和人生选择。',
    background: '喀喇汗王朝时期，突厥语书面表达与伊斯兰知识、宫廷政治文化相互联系。',
    impact: '作品留下了研究突厥语文学、伦理和政治思想的重要文本，后世通过不同抄本保存。',
    people: [],
    importance: 3,
    dateNote: '纪年常作1069年或1069—1070年，原作者手稿未存，现存抄本形成于后世。',
    locationNote: '以喀什为成书地域参照；中亚为阅读线索归属，不表示现代边界判断。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1069—1070年前后，优素甫完成《福乐智慧》。他使用突厥语长诗，把治国、知识和个人修养放进人物对话中：怎样使权力符合公正，官员应具备什么能力，人又怎样面对财富和生命的限度。',
            '这部作品产生于喀喇汗王朝的文化环境，宫廷劝诫传统与伊斯兰伦理在其中相遇。它让政治思想以本地书面语言和诗歌形式获得表达。作者原稿未能保存，今天的阅读依靠后世抄本和整理；成书年代与抄本年代应分开理解。',
          ],
        },
      ],
    },
    sources: [
      source(
        '土耳其联合国教科文组织全国委员会 · 《福乐智慧》成书950周年',
        'https://www.unesco.org.tr/Pages/2000/1393/Anma-ve-Kutlama-Y%C4%B1l-D%C3%B6n%C3%BCmleri',
        '2019年纪念事项列1069年成书。',
      ),
      source(
        'Amasya Üniversitesi Sosyal Bilimler Dergisi · Fergana Nüshasından Kutadgu Bilig’in Söz Varlığına Katkılar',
        'https://dergipark.org.tr/en/pub/asobid/article/937743',
        '摘要列回历462年／1069—1070年及原作者手稿不存，研究费尔干纳抄本。',
      ),
    ],
  },
  {
    id: 'completeness-turkic-dictionary',
    year: 1072,
    endYear: 1074,
    dateLabel: '约1072—1074年',
    title: '《突厥语大词典》整理语言与地理知识',
    category: '文化',
    region: 'central-asia',
    themes: ['教育学术', '文学艺术', '交流'],
    location: '巴格达；材料涉及中亚诸地',
    coordinates: [44.37, 33.32],
    summary:
      '马赫穆德·喀什噶里以阿拉伯语解释突厥语词汇，收录诗歌、谚语和地理材料，呈现十一世纪多样的语言与生活知识。',
    background: '突厥语群体在伊斯兰世界的政治与军事地位提高，不同语言使用者之间也需要解释和沟通。',
    impact: '词典保存了早期突厥语资料及一幅地理图，成为语言、文学和文化史研究的重要文本。',
    people: [],
    importance: 3,
    dateNote: '采用通常的十一世纪编写区间；现存传抄本与作者编写年代不同。',
    locationNote:
      '巴格达为编写和呈献的城市参照；所记语言材料跨越广阔地区，不能全部视为作者可复原的行程。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '约1072—1074年，马赫穆德·喀什噶里编写《突厥语大词典》，以阿拉伯语解释突厥语词汇。书中保存的不只是词义，还包括谚语、诗句、习俗和地名，让使用阿拉伯语的读者接触不同突厥语群体的表达方式。',
            '附图把作者认识中的诸地放进一个世界图景，语言说明与地理知识因而联系起来。词典记录的是编者选择、分类和解释的材料，既可用于语言研究，也需要结合写作目的理解。它今天保存的文本经历后世传抄，不能把书中每个地名都当成已经核实的个人到访点。',
          ],
        },
      ],
    },
    sources: [
      source(
        'UNESCO 世界记忆 · Diwan Lughat al-Turk',
        'https://www.unesco.org/en/memory-world/diwan-lughat-al-turk-compendium-turkic-dialects',
        '词典、民族志、诗文材料和世界地图的档案介绍；详细年代见所附申报材料。',
      ),
      source(
        'UNESCO 世界记忆 · Diwan Lughat al-Turk申报表',
        'https://media.unesco.org/sites/default/files/webform/mow001/turkey_compendium_eng.pdf',
        '区分十一世纪编写、作者与现存抄本的说明。',
      ),
    ],
  },
  {
    id: 'completeness-nagarakretagama',
    year: 1365,
    title: '爪哇宫廷诗《爪哇史颂》写成',
    category: '文化',
    region: 'southeast-asia',
    themes: ['文学艺术', '教育学术'],
    location: '东爪哇满者伯夷宫廷地区',
    coordinates: [112.38, -7.56],
    summary: '普拉班查以古爪哇语写作《爪哇史颂》，用诗歌描述满者伯夷的宫廷、仪式和政治地理。',
    background:
      '满者伯夷宫廷把宗教、文学与王权表达联系起来，地方书写文化保存了与外来旅行记不同的视角。',
    impact: '诗作成为研究十四世纪爪哇的重要材料，也在后世形成政治与文化记忆。',
    people: [],
    importance: 3,
    dateNote: '1365年为文本写作年代，传存贝叶抄本的制作和后世发现另有日期。',
    locationNote: '坐标以特罗乌兰一带为满者伯夷都城地域参照，不据诗中地名复原现代国界。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1365年，普拉班查写成通常译作《爪哇史颂》的古爪哇语宫廷诗。作品描述满者伯夷王室、仪式和地方关系，也把游历与地名纳入诗歌，使王国的形象通过本地语言得到系统表达。',
            '这是一部带有赞颂目的的文学作品。它保存的官职、宗教活动和地理材料很珍贵，但诗中对王权影响的叙述，需要同考古、铭文及其他文献比较。作品经贝叶抄写延续，后来又成为印度尼西亚历史记忆的一部分；文本里的政治空间不能直接换成一张边界清晰的现代地图。',
          ],
        },
      ],
    },
    sources: [
      source(
        'UNESCO 亚太世界记忆委员会 · Nāgarakrĕtāgama or Description of the Country',
        'https://www.mowcapunesco.org/register/nagara-kertagama-or-description-of-the-country-1365-ad/',
        '1365年古爪哇文本、贝叶载体与满者伯夷政府社会材料介绍。',
      ),
      source(
        '印度尼西亚教育文化部文献库 · Nagarakertagama dan Trowulan',
        'https://repositori.kemendikdasmen.go.id/9924/',
        '普拉班查、1365年成文及特罗乌兰遗址之间关系的研究入口。',
      ),
    ],
  },
  {
    id: 'completeness-sisatchanalai-ceramics',
    year: 1400,
    endYear: 1600,
    dateLabel: '十五至十六世纪',
    title: '西萨查那莱窑业与海上陶瓷贸易',
    category: '社会',
    region: 'southeast-asia',
    themes: ['科技医学', '文学艺术', '经济贸易'],
    location: '西萨查那莱',
    coordinates: [99.79, 17.43],
    summary:
      '今泰国中北部西萨查那莱的窑场生产釉陶和炻器，器物通过区域贸易和海运流通，体现当地工艺与跨地区市场的联系。',
    background:
      '东南亚消费市场与海上贸易支持多个窑业中心，工匠根据材料、烧造经验和需求制造日用与装饰器物。',
    impact: '窑址、馆藏和沉船器物共同帮助研究东南亚生产技术及商业网络。',
    people: [],
    importance: 3,
    dateNote: '这里选十五至十六世纪作工艺与贸易阶段，不表示窑业始于1400年或终于1600年。',
    locationNote: '坐标为古城及窑场所在区域的参照，不定位每件器物的具体烧造窑口。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '十五至十六世纪，西萨查那莱的窑场制造带釉炻器，其中包括青绿色釉器和釉下铁绘器。工匠控制胎土、釉料、纹样和烧成条件，把本地材料与长期积累的经验转为可日常使用、也可交易的器物。',
            '一些花卉纹样借鉴中国瓷器，又经过当地工匠的调整。器物通过陆路和海路进入东南亚其他地区，窑址与沉船材料使生产和消费得以相互对照。由此看到的并非单向接受外来影响，而是当地窑业在区域市场中选择、制造与传播的过程。',
          ],
        },
      ],
    },
    sources: [
      source(
        '大都会艺术博物馆 · Bowl with peony design（2021.180）',
        'https://www.metmuseum.org/art/collection/search/853977',
        '馆藏标十五至十六世纪、西萨查那莱Ko Noi产地、釉下铁绘与对中国花卉装饰的转化。',
      ),
      source(
        '泰国艺术厅 · Sangkhalok of Si Satchanalai: From Local Kilns of Thai Ceramic Products to Asia',
        'https://www.finearts.go.th/storage/contents/2020/08/file/hbWYuM9ViV8tlXQWA3tEcBWzWQrnfXS2ZzySVqLm.pdf',
        '窑场考古、器物类型和向亚洲市场流通的机构研究资料。',
      ),
    ],
  },
  {
    id: 'completeness-indian-textiles',
    year: 1500,
    endYear: 1750,
    dateLabel: '约1500—1750年',
    title: '印度棉织物连接印度洋与世界市场',
    category: '交流',
    region: 'south-asia',
    themes: ['经济贸易', '文学艺术', '社会'],
    location: '古吉拉特、科罗曼德尔海岸与孟加拉',
    coordinates: [80.27, 13.08],
    summary:
      '南亚纺织工匠生产多种棉布和印染织物，亚洲商人及后来进入的欧洲公司将它们运往东南亚、非洲和欧洲。',
    background: '印度洋早已有成熟的商贸网络，纺纱、织造、染色与港口交换把内地生产连接到海外消费。',
    impact: '印度棉布影响跨地区穿着、室内陈设和工业竞争，生产者也承受商人控制与殖民贸易压力。',
    people: [],
    importance: 4,
    dateNote: '这一范围用于观察近代早期贸易，印度织物流通早于1500年，地区繁荣和衰落也不同步。',
    locationNote: '坐标取科罗曼德尔海岸城市区域作参照，不能代表整个南亚的织造中心或当时港口边界。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '近代早期，印度棉织物从古吉拉特、科罗曼德尔海岸和孟加拉等产区进入广阔市场。商人把不同厚薄、颜色和纹样的布匹送往东南亚、西亚与非洲；欧洲公司加入时，面对的是已经运转的生产与交换网络。布匹既是衣料和陈设，也可用于换取香料等商品。',
            '纺织品的竞争力来自工匠对纺纱、织造、媒染和防染的掌握，以及按不同市场调整图案的能力。欧洲消费者后来也大量购买印度印花棉布，本地制造者则要求贸易限制。公司采购、价格压力和殖民权力逐渐影响织工的生活，世界市场的繁荣并不保证生产者公平分享收益。',
          ],
        },
      ],
    },
    sources: [
      source(
        'V&A · Indian textiles',
        'https://www.vam.ac.uk/articles/indian-textiles/',
        '印度织物的工艺、既有亚洲贸易、欧洲公司进入及生产者处境。',
      ),
      source(
        '大都会艺术博物馆 · Indian Textiles: Trade and Production',
        'https://www.metmuseum.org/ja/essays/indian-textiles-trade-and-production',
        '纺织工艺、亚洲贸易及欧洲公司以布匹交换香料的馆藏研究。',
      ),
    ],
  },
  {
    id: 'completeness-malay-annals',
    year: 1612,
    title: '《马来纪年》的一次重要重编',
    category: '文化',
    region: 'southeast-asia',
    themes: ['文学艺术', '教育学术'],
    location: '柔佛',
    coordinates: [103.9, 1.6],
    summary:
      '马来宫廷叙事在1612年前后经历重要重编，以族谱、传说和政治故事保存新加坡、马六甲及其继承者的历史记忆。',
    background: '马六甲失陷后，继承王统的宫廷仍通过文字和故事表达身份与政治合法性。',
    impact: '作品成为马来文学和地方史的重要文献，但不同版本及传说内容需要分别辨析。',
    people: [],
    importance: 3,
    dateNote: '1612年为通常采用的重要重编节点，不表示全部内容首次产生于当年；现存许多抄本属后世。',
    locationNote: '柔佛为文本重编的地域参照，不据此认定确切书房、旧都遗址或全部故事现场。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1612年前后，通常称为《马来纪年》的宫廷叙事经历一次重要重编。这部作品把王统、人物故事和地方传说连接起来，叙述新加坡、马六甲及后继宫廷的过去。它关心统治者怎样获得名望、臣属怎样行动，也保存宫廷对灾难、失国和秩序的解释。',
            '作品不是逐年核实的现代编年史。文学叙事和政治记忆与可考事件相互交织，同一文本又有不同传本。研究者因此把它与贸易记述、铭文和其他材料比较。1612年重编、所写故事的年代和今天馆藏抄本的制作时间，是三个需要分开的层次。',
          ],
        },
      ],
    },
    sources: [
      source(
        '澳大利亚国立大学 Malay Concordance Project · Sejarah Melayu bibliography',
        'https://mcp.anu.edu.au/N/SM_bib.html',
        '文本1612年重编与所用1808年抄本、版本差别的书目说明。',
      ),
      source(
        'UNESCO 世界记忆 · Sejarah Melayu申报资料',
        'https://media.unesco.org/sites/default/files/webform/mow001/malaysia_sejarah_melayu.pdf',
        '马来宫廷历史叙事、1612年文本节点与传存手稿。',
      ),
    ],
  },
  {
    id: 'completeness-bombay-thane',
    year: 1853,
    title: '孟买至塔那客运铁路通车',
    category: '社会',
    region: 'south-asia',
    themes: ['工程建筑', '经济贸易', '社会'],
    location: '孟买至塔那',
    coordinates: [72.84, 18.94],
    summary: '大印度半岛铁路开行孟买至塔那的客运列车，成为印度铁路客运发展的重要起点。',
    background:
      '殖民政府与铁路公司以资本和收益保证推进铁路，港口、内地市场及行政军事交通由此逐步连接。',
    impact: '铁路改变人员与商品移动的条件，同时处在殖民经济和分层服务的制度之中。',
    people: [],
    importance: 3,
    dateNote: '1853年4月16日为这条客运铁路开通节点；印度此前已有较短的试验和工程轨道。',
    locationNote: '坐标取孟买出发区域，不表示完整线路或现代车站的全部范围。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1853年4月16日，客运列车从孟买驶往塔那，约三十余公里的线路投入运营。大印度半岛铁路公司的建设，处在英国殖民政府推动铁路并提供财务保证的安排下；这条短线随后成为更大运输网络的一部分。',
            '铁路把港口与内地的往来改为可以依时刻、车站和票价组织的运输，商人、工人和其他旅客逐渐采用新的出行方式。线路延伸既便利交换，也服务于殖民统治的资源运输和控制需要。通车只是起点，各地铁路的扩展、劳动条件和乘客体验仍有不同过程。',
          ],
        },
      ],
    },
    sources: [
      source(
        '印度铁道部新闻局 · Milestones in Glorious History of Indian Railways',
        'https://www.pib.gov.in/newsite/erelcontent.aspx?lang=2&reg=3&relid=46428',
        '1836、1849及1853年条，区分早期轨道、收益保证和孟买至塔那客运开通。',
      ),
    ],
  },
  {
    id: 'completeness-eijkman-beriberi',
    year: 1890,
    endYear: 1897,
    dateLabel: '十九世纪九十年代',
    title: '爪哇脚气病研究转向食物与营养',
    category: '文化',
    region: 'southeast-asia',
    themes: ['科技医学', '社会'],
    location: '巴达维亚及爪哇',
    coordinates: [106.83, -6.18],
    summary:
      '艾克曼等人在爪哇研究脚气病，动物实验和饮食调查显示精白米与疾病之间的联系，为后来的维生素研究提供线索。',
    background: '研究起初围绕传染病假说展开，殖民地医院、实验室与监狱饮食调查成为观察条件。',
    impact: '研究推动从单一病菌解释转向营养缺乏问题，维生素的概念与分离工作在后来继续形成。',
    people: [],
    importance: 3,
    dateNote: '采用研究阶段而非单一发现日；观察精白米影响、提出营养解释和分离维生素并非同时发生。',
    locationNote:
      '巴达维亚为实验工作中心参照，调查涉及爪哇多处；当时殖民制度影响研究对象与材料来源。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '十九世纪九十年代，在荷属东印度的爪哇，艾克曼最初试图用病菌解释脚气病。实验中的鸡出现神经症状，饮食改变后又恢复，使研究者注意到精白米与保留外层成分的米之间的差别。随后对人群饮食的调查，把食物加工与疾病联系得更紧。',
            '观察到联系，并不等于立即知道原因。艾克曼早期仍用毒素等想法解释结果，后续研究者才进一步确认缺少某种营养成分的重要性。维生素概念及维生素B₁的提取都属于后来的工作。这个过程展示医学解释如何在实验和新证据下改变，也提醒人们注意殖民地医院和被调查人群在知识形成中的位置。',
          ],
        },
      ],
    },
    sources: [
      source(
        '诺贝尔奖机构 · The Nobel Prize and the discovery of vitamins',
        'https://www.nobelprize.org/prizes/themes/the-nobel-prize-and-the-discovery-of-vitamins/',
        'Christiaan Eijkman’s work in Java节，区分鸡实验、饮食调查与后来营养缺乏理论。',
      ),
    ],
  },
  {
    id: 'completeness-ibadan-college',
    year: 1948,
    title: '伊巴丹大学学院开课',
    category: '文化',
    region: 'africa',
    themes: ['教育学术', '社会'],
    location: '伊巴丹',
    coordinates: [3.9, 7.45],
    summary:
      '伊巴丹大学学院接收来自亚巴的设备和学生，在尼日利亚开课，回应当地对大学教育与专业训练的长期需求。',
    background:
      '非洲居民和专业人士长期争取本地大学教育，殖民时期的有限专科学校难以满足升学与职业要求。',
    impact: '学院扩大本地高等教育机会，并在1962年成为独立的伊巴丹大学，教学与研究继续发展。',
    people: [],
    importance: 3,
    dateNote: '1948年1月开课、3月正式开学及11月永久校址奠基是不同节点；1962年获得独立大学地位。',
    locationNote: '坐标取伊巴丹大学所在城市区域；早期借用院址与后来的永久校园不同。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1948年1月，伊巴丹大学学院开始上课，设备和一部分学生来自亚巴的高等教育机构。学院起初借用原军医院场地，文科、理科和医学等课程逐步发展，并与伦敦大学建立学位方面的特殊关系。',
            '学院的建立回应了当地居民争取大学教育的长期要求。此前许多学生需要出国求学，而殖民地的专科训练与职业限制难以满足他们的期待。本地大学教育增加专业人员培养与学术研究的机会，同时也需要争取制度自主。1962年，学校成为独立的伊巴丹大学；1948年开课因此是教育发展的阶段，而非非洲高等学习传统的开端。',
          ],
        },
      ],
    },
    sources: [
      source(
        '伊巴丹大学 · About Us',
        'https://ui.edu.ng/content/about-us',
        '校史所列本地教育诉求、1948年开课、原院址和永久校址奠基。',
      ),
      source(
        '伊巴丹大学 · University Calendar · History of the University',
        'https://ui.edu.ng/sites/default/files/2018%20University%20Calendar%2023%20May%2018.pdf',
        '大学校历中的机构历史，区分学院与独立大学阶段。',
      ),
    ],
  },
]

export const completenessPeople: Person[] = [
  {
    id: 'completeness-wu-lien-teh',
    name: '吴连德',
    birth: 1879,
    death: 1960,
    role: '医者、公共卫生组织者',
    color: '#6b8c80',
    recordKind: 'curated',
    summary: '主持东北肺鼠疫防治，并推动近代公共卫生机构建设的医学工作者。',
    biography:
      '吴连德出生于槟榔屿，受过英国医学教育。1910年东北发生严重肺鼠疫后，他前往哈尔滨调查，以医学检验判断传播方式，组织隔离、检疫和防护措施。1911年的国际鼠疫会议促进不同国家医务人员交流，之后他继续参与防疫机构与公共卫生工作。他的经历显示，医学实践既需要实验与临床知识，也依赖行政协调、公众合作和持续组织。',
    sources: [plague],
  },
  {
    id: 'completeness-cao-yu',
    name: '曹禺',
    birth: 1910,
    death: 1996,
    role: '剧作家',
    color: '#a7866b',
    recordKind: 'curated',
    summary: '以《雷雨》《日出》等剧作探索家庭、社会冲突与人物命运的现代话剧作家。',
    biography:
      '曹禺本名万家宝，在学校学习和演剧中接触中外戏剧。1934年《雷雨》发表，以复杂的人物关系和紧密的舞台冲突引起关注；随后《日出》《原野》《北京人》等作品，从不同社会处境展开人物的选择与困境。他既写剧本，也长期参与剧院工作。其作品通过反复排演、改编和翻译流传，不同年代的观众与演员又形成新的理解。',
    sources: [
      thunderstorm,
      source(
        '潜江市人民政府 · 曹禺',
        'https://www.hbqj.gov.cn/zjqj/qjmr/201604/t20160406_2090889.html',
        '人物介绍所列学习、戏剧活动与主要作品；作品发表、首演与再版日期分别处理。',
      ),
    ],
  },
  {
    id: 'completeness-tu-youyou',
    name: '屠呦呦',
    birth: 1930,
    death: null,
    role: '药学研究者',
    color: '#6b8c80',
    recordKind: 'curated',
    summary: '从事青蒿素及相关抗疟药研究，把传统药物资料与现代实验相结合。',
    biography:
      '屠呦呦接受药学教育，后学习传统中医药知识，在抗疟研究中筛选药物并改进青蒿提取方法。1971—1972年，团队取得有效提取物、开展初步临床试验并分离青蒿素，后续结构分析和成药研究依靠多个单位协作完成。她的工作体现文献线索、化学分离、药理实验与临床验证之间的联系，2015年获诺贝尔生理学或医学奖。',
    sources: [artemisinin],
  },
  {
    id: 'completeness-yuan-longping',
    name: '袁隆平',
    birth: 1930,
    death: 2021,
    role: '作物育种研究者',
    color: '#7c9169',
    recordKind: 'curated',
    summary: '长期推动杂交水稻育种与推广，参与组织多地协作研究。',
    biography:
      '袁隆平从农业教学和田间研究中探索水稻杂种优势的利用。为使杂交种子能够稳定生产，他与各地育种人员共同寻找和筛选不育、保持与恢复材料，推动1973年前后的三系配套，随后继续改进制种和推广技术。他的研究依靠野生材料、品种资源、试验站和农民实践之间的协作；粮食增产也有农田条件和栽培管理等多方面基础。',
    sources: [
      hybridRice,
      source(
        'Nature Plants · Yuan Longping (1930–2021)',
        'https://www.nature.com/articles/s41477-021-00962-6.pdf',
        '研究同行撰写的人物回顾，列生卒年及杂交水稻研究历程。',
      ),
    ],
  },
]
