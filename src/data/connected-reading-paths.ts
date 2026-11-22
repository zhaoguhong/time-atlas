import type { Tour } from '../types'

// Explicit comparisons based on the existing records and their citations.
// Chronological order alone does not establish influence, causation or personal travel.
export const expandedConnectedReadings: [string, string, string, string, string][] = [
  [
    'early-plus-ban-gu-history',
    'chen-shou-history',
    '从断代史到三国纪传',
    '回看断代史的编排',
    '《汉书》以纪表志传整理西汉，《三国志》在晋代整理三个政权；比较材料来源与纪传安排怎样表达历史判断。',
  ],
  [
    'chen-shou-history',
    'early-plus-yanshigu-hanshu',
    '正文之后怎样作注',
    '另一部史书的正文与后注',
    '《三国志》后来有裴松之注，《汉书》有颜师古汇集旧注；比较补充异闻与解释字义制度的不同工作，不把两位注者混为一人。',
  ],
  [
    'early-plus-yanshigu-hanshu',
    'early-plus-tang-shitong',
    '从读懂词句到评议史法',
    '史学批评之前的注释工作',
    '颜师古处理字音、词义与旧注，刘知几讨论取材、体例和褒贬；两者分别说明读懂史书与评判史书需要什么依据。',
  ],
  [
    'early-plus-tang-shitong',
    'zizhi-tongjian',
    '编年体怎样组织材料',
    '回看体例与取材的讨论',
    '《史通》比较编年和纪传等写法，《资治通鉴》以时间顺序连接多国行动；并读体例选择和政治鉴戒，不据先后推断直接师承。',
  ],
  [
    'zizhi-tongjian',
    'region-ibn-khaldun-muqaddimah',
    '另一种政治史解释',
    '编年鉴戒中的历史判断',
    '《通鉴》考订并编排政治行动，赫勒敦讨论群体、城市与税收等社会条件；比较怎样解释王朝变化，而非认定两书之间有传播。',
  ],
  [
    'region-ibn-khaldun-muqaddimah',
    'region-popol-vuh',
    '谁在保存共同体的过去',
    '怎样辨析历史记载',
    '赫勒敦警惕无批判抄录传说，基切作者以文本保存起源、谱系与共同体记忆；比较不同写作目的，不能用一种体例代替另一种材料的语境。',
  ],
  [
    'region-popol-vuh',
    'modern-hushi-history-chinese-philosophy',
    '旧材料怎样进入新的叙述',
    '殖民环境中的记忆保存',
    '基切作者重写并保存早期传统，胡适以文献年代与哲学问题整理古代思想；比较作者选择材料的目的和概念，不构造彼此影响。',
  ],
  [
    'early-plus-old-five-history',
    'early-plus-new-five-history',
    '同一时代为何重写',
    '另一部五代史的材料命运',
    '两书都处理五代历史，但官修与私人写作、人物评价及文本流传各有差异；今本《旧五代史》还须注意清代辑复。',
  ],
  [
    'early-plus-five-histories',
    'new-tang-history',
    '后来的朝廷怎样重修前史',
    '唐初修史的组织条件',
    '唐初集中编修前代史书，宋廷又组织重修唐史；比较档案、旧稿与多人分工，新的版本并不自动使旧书失去价值。',
  ],
  [
    'modern-hushi-history-chinese-philosophy',
    'modern-feng-history-chinese-philosophy',
    '另一种中国哲学史编排',
    '此前的学科写作尝试',
    '胡适与冯友兰都用现代哲学史组织传统文献，问题选择、分期与覆盖范围各异；胡适上卷和冯友兰两卷本应分别理解。',
  ],
  [
    'early-plus-qin-courier',
    'early-plus-tang-courier-network',
    '文书怎样获得沿途供给',
    '通信依靠哪些基层工作',
    '秦的县廷文书需要吏员与传递制度，唐驿又显示马匹、粮秣和使用资格；比较政令传送所需的日常组织。',
  ],
  [
    'early-plus-tang-courier-network',
    'region-inca-roads',
    '安第斯道路的供给义务',
    '东亚驿站的地方负担',
    '唐代驿传与印加道路都依靠沿线劳动和储备，地形、组织与服务对象各异；这是不同地区的比较，不表示存在传承。',
  ],
  [
    'region-inca-roads',
    'exp-em-electric-telegraph',
    '从递送人员到导线信号',
    '实体道路怎样支持消息流动',
    '印加信使依靠道路、驿站和仓储，电报依靠导线、编码与操作人员；比较信息移动所需的设施，不把通信史写成单一路线。',
  ],
  [
    'exp-em-electric-telegraph',
    'exp-em-penny-post',
    '速度之外看通信费用',
    '电信号怎样改变传递',
    '电报提高传输速度，便士邮政调整书信资费和缴费办法；它们解决不同问题，也都受接入、人员与维护条件约束。',
  ],
  [
    'exp-em-penny-post',
    'exp-em-postal-union',
    '跨国寄信如何协调',
    '国内资费改革的例子',
    '英国邮政改革调整国内寄信条件，伯尔尼公约协调跨国费用与转运；比较通信标准的适用范围和执行机构。',
  ],
  [
    'exp-em-postal-union',
    'exp-em-shanghai-telegraph',
    '邮政规则之外的电信网络',
    '跨国邮路的制度协调',
    '跨国邮政需要转运和费用协定，津沪电报需要局站、编码与线路维护；不同网络都不能只靠设备或文本自行运转。',
  ],
  [
    'exp-em-electric-telegraph',
    'world-atlantic-telegraph',
    '电报怎样跨过海洋',
    '陆上电报的装置与需求',
    '陆上电报与跨洋电缆都要传送电信号，海底铺设又增加绝缘、张力和信号衰减问题；比较技术条件的变化。',
  ],
  [
    'qin-standardization',
    'early-plus-qin-courier',
    '共同标准怎样进入县廷',
    '文书衔接所需的规范',
    '统一文字和计量规范有助于跨地区交接，县廷吏员和邮传劳动把规范用于登记、案件与征发；颁令和实际执行是不同环节。',
  ],
  [
    'region-maragha-observatory',
    'shoushi-calendar',
    '另一种观测与历算组织',
    '西亚天文台的合作条件',
    '马拉盖集合学者、仪器和文献，授时历工程结合多地测量与官方历算；比较组织与用途，不据相近年代断言直接传播。',
  ],
  [
    'shoushi-calendar',
    'world-ulugh-beg-observatory',
    '固定仪器与星表工作',
    '多地观测怎样服务历法',
    '授时历工程重视不同地点的观测，撒马尔罕依靠大型固定装置和长期记录；比较测量怎样进入历书或星表。',
  ],
  [
    'world-ulugh-beg-observatory',
    'depth-kepler-new-astronomy',
    '观测误差怎样推动模型改变',
    '星表背后的长期测量',
    '撒马尔罕星表需要比较和修正记录，开普勒利用火星观测中的差异调整轨道；并读数据积累与模型检验，不主张资料直接传承。',
  ],
  [
    'depth-kepler-new-astronomy',
    'category-galileo',
    '新仪器带来哪些新证据',
    '旧观测怎样检验轨道模型',
    '开普勒重新计算已有火星观测，伽利略以望远镜获得新的天体图像；理论修正和仪器扩展观察是相连而不同的工作。',
  ],
  [
    'category-galileo',
    'exp-em-greenwich',
    '从观测报告到长期机构',
    '公开报告怎样呈现新证据',
    '《星际信使》把新观测带入出版与争论，格林尼治长期积累天体位置资料；比较证据怎样被公布、复核和持续生产。',
  ],
  [
    'exp-em-greenwich',
    'exp-em-longitude-act',
    '航海问题怎样组织评审',
    '定位所需的天体资料',
    '格林尼治为航海提供天体位置资料，经度法案以误差、海试与奖励组织多种方法；比较研究机构与评审制度的分工。',
  ],
  [
    'exp-em-longitude-act',
    'exp-em-harrison-h4',
    '奖励条件怎样接受海试',
    '海试背后的误差与评审要求',
    '经度奖励要求可检验的定位办法，H4在海上测试精密计时的可靠性；有效结果、复试和实际供应需要分别考察。',
  ],
  [
    'world-copernicus',
    'depth-kepler-new-astronomy',
    '从圆周安排到椭圆轨道',
    '日心模型的早期框架',
    '哥白尼重新安排地球与行星的位置关系，开普勒以后来的精密观测修正轨道；1543年的体系并不已包含1609年的定律。',
  ],
  [
    'depth-kepler-new-astronomy',
    'exp-em-neptune',
    '轨道偏差的另一种用途',
    '偏差怎样迫使模型修正',
    '开普勒用火星记录中的差异改写轨道形式，海王星搜索利用天王星轨道偏差作预测；两例都要把计算同观测检验相连。',
  ],
  [
    'category-galileo',
    'exp-em-foucault-pendulum',
    '怎样在地面演示地球运动',
    '望远镜观察怎样进入争论',
    '伽利略的天体图像与傅科摆的地面演示采用不同装置和解释；比较可重复的现象与理论判断，不把木星卫星单独当作地球运动的证明。',
  ],
  [
    'world-magna-carta',
    'world-glorious-revolution',
    '另一阶段的王权限制',
    '中世纪宪章约束了谁',
    '《大宪章》回应国王与贵族冲突，1689年安排突出议会地位；比较权力约束的机构和适用人群，不把中世纪自由人等同全民。',
  ],
  [
    'world-glorious-revolution',
    'world-us-constitution',
    '从王室议会到联邦分权',
    '王位与议会关系的调整',
    '英国王位安排处理王室和议会关系，美国制宪处理联邦、州与政府部门分权；两种制度都需另问哪些居民能够参与。',
  ],
  [
    'world-us-constitution',
    'exp-em-rights-man',
    '政府结构与权利原则',
    '权利讨论中的政府分工',
    '美国宪法安排政府权力，法国宣言提出自由、平等和主权原则；比较不同文本的任务以及普遍语言与排斥现实的距离。',
  ],
  [
    'exp-em-rights-man',
    'region-haiti-constitution',
    '被奴役者如何成为国家公民',
    '普遍权利语言的适用边界',
    '法国宣言的原则并未立即平等适用于殖民地被奴役者，海地独立后的宪法回应摆脱奴役的要求；同时保留各自制度中的矛盾。',
  ],
  [
    'region-haiti-constitution',
    'region-mexico-constitution-1917',
    '土地与劳动怎样进入宪法',
    '独立之后的身份和劳动矛盾',
    '海地废除法律奴隶身份后仍面临劳动控制与贫困，墨西哥制宪回应土地和劳动诉求；比较法律承诺与社会落实，二者背景并不相同。',
  ],
  [
    'region-mexico-constitution-1917',
    'region-japan-constitution',
    '不同转型中的宪法任务',
    '社会权利如何进入制度',
    '墨西哥宪法回应革命中的土地和劳动要求，日本战后宪法重整主权、议会与战争权力；比较文本要解决的问题及其执行条件。',
  ],
  [
    'region-japan-constitution',
    'region-india-constitution',
    '独立与分治中的制宪',
    '战败与占领中的制宪',
    '日本与印度分别在战败占领、独立分治的条件下制定制度安排；比较基本权利、政治代表和社会参与，不把相近年代写成相同过程。',
  ],
  [
    'region-ottoman-constitution',
    'world-young-turk-revolution',
    '被中止的宪政怎样恢复',
    '回看1876年的宪法尝试',
    '1908年的运动要求恢复1876年宪法，两条记录连接初次建立、运作中止与再次恢复；恢复议会也未立即实现平等参与。',
  ],
  [
    'world-persian-constitution',
    'constitutional-outline',
    '邻近年代的不同立宪安排',
    '议会和君权怎样被重新讨论',
    '波斯运动推动议会及基本法，清廷大纲强调皇权并规定筹备；比较改革力量、权力分配和文件效力，不预设二者互为原因。',
  ],
  [
    'world-us-constitution',
    'modern-civil-rights-act',
    '政治排斥如何继续受到挑战',
    '联邦制度原有的参与边界',
    '1787年宪法容纳奴隶制并限制许多人的参与，1964年立法回应长期民权斗争；中间经历多重制度变化，不能把二者直接连成一次改革。',
  ],
  [
    'region-india-constitution',
    'modern-south-africa-election',
    '扩大政治参与的另一条道路',
    '普选与平等的制度承诺',
    '印度宪法承诺普选与公民平等，南非1994年选举终结按种族排斥的全国选举秩序；比较法律框架、社会行动与持续存在的不平等。',
  ],
  [
    'exp-em-rights-man',
    'world-napoleonic-civil-code',
    '原则怎样进入具体民事规则',
    '回看平等权利的革命表述',
    '法国宣言提出平等与自由原则，民法典统一财产契约规则却强化家庭中的男性权力；统一法律和扩大所有人的权利并非同一结果。',
  ],
]

export const connectedTopicTours: Tour[] = [
  {
    id: 'how-history-is-written',
    name: '史书怎样组织过去',
    question: '同样在写过去，史家怎样选择材料、安排次序并作出判断？',
    introduction: [
      '史书保存过去，也对过去作出选择。以人物为中心，还是按年排列；沿用旧说，还是比较异文；为朝廷提供鉴戒，还是保存共同体的记忆，都会改变读者看到的历史。',
      '先看《史记》《汉书》和《三国志》怎样组织材料，再把注释、史学批评与编年写作放在一起。北非的《绪论》、基切人的《波波尔·乌》和现代中国哲学史，提出另外几种问题。这些作品不属于一条共同的演进路线，比较的是各自的材料、写作处境和解释方法。',
    ],
    conclusion:
      '选两部书，分别指出它们保存了什么、用什么次序组织材料、希望回答什么问题。再想想，怎样的另一种史料能够补充它们？',
    color: '#7e7b92',
    chapters: [
      {
        eventId: 'simaqian-shiji-writing',
        explanation:
          '司马迁承接父亲的编史计划，以本纪、表、书、世家与列传贯通多时代的材料，受刑后仍继续著述。编史有持续的家学、文献与个人选择，不宜压成单年完稿。',
        mapReading:
          '以长安理解任官和文献环境，书中记述的地域与作者实际游历分别看待；前104年只是著述阶段的参照。',
      },
      {
        eventId: 'early-plus-ban-gu-history',
        explanation:
          '《汉书》以纪、表、志、传整理西汉历史，朝廷档案与班氏家学共同参与。班固去世后还有续补，书名下的作者并不涵盖全部协作。',
        mapReading:
          '从洛阳回看西汉政治中心长安，区分编史活动所在与书中叙述的地区；60—92年是著述阶段。',
      },
      {
        eventId: 'chen-shou-history',
        explanation:
          '陈寿在晋代书写魏、蜀、吴，三方材料的详略与纪传安排都有条件。后来的裴松之注又把其他记载与不同解释带入同一部书。',
        mapReading:
          '对照洛阳、成都与建业，观察多方政权的历史怎样在新朝被重新编排；280年只是著述阶段的参照。',
      },
      {
        eventId: 'early-plus-yanshigu-hanshu',
        explanation:
          '读懂旧书还需要解释已经变化的语言和制度。颜师古比较字音、词义与前人旧注，使《汉书》的传承同时成为一项判断和辨析的工作。',
        mapReading:
          '比较长安的注释活动与前两章洛阳的编史活动，留意书籍可以跨越王朝和政治中心继续流传。',
      },
      {
        eventId: 'early-plus-tang-shitong',
        explanation:
          '刘知几把取材、叙事、褒贬和史官处境作为批评对象。问题从“史书写了什么”进一步转为“怎样的写法和判断才有根据”。',
        mapReading:
          '把长安的史官与朝廷放在一起理解，思考政治中心能提供什么材料，又会带来什么牵制。',
      },
      {
        eventId: 'zizhi-tongjian',
        explanation:
          '《资治通鉴》以编年组织多国与多人行动，长期考订和多人分工服务于政治鉴戒。按时间连接事件有助于追踪变化，也仍然包含编者的选择。',
        mapReading:
          '对照洛阳的编纂活动与开封的朝廷，区分史书的工作地点、进呈地点和它所叙述的广阔空间。',
      },
      {
        eventId: 'region-ibn-khaldun-muqaddimah',
        explanation:
          '赫勒敦把游牧、城市、税收和群体凝聚纳入王朝兴衰的解释，并警惕无批判地抄录传说。可与《通鉴》比较政治史的提问方式，不预设二者之间的传播关系。',
        mapReading:
          '转向北非，比较城市与周边地区的关系；代表坐标不包含作者全部政治经历或后续修订地点。',
      },
      {
        eventId: 'region-popol-vuh',
        explanation:
          '基切作者在殖民环境中把更早的口传和书写传统转入拉丁字母文本，保存起源、谱系与共同体记忆。史料的形成也可以是被压迫者主动延续知识的行动。',
        mapReading:
          '定位危地马拉高地，区分原住民共同体的生活空间与殖民统治范围；约16世纪中叶不是可确定的单年完稿日。',
      },
      {
        eventId: 'modern-hushi-history-chinese-philosophy',
        explanation:
          '胡适用文献年代、学派和问题变化组织中国古代思想。哪些材料进入“哲学史”，取决于证据判断，也取决于现代学科的概念和分期；上卷并非完整通史。',
        mapReading:
          '北京标记教学研究语境，不是印刷地或作者行程。此章进入1919年，地图仅供地点对照，不提供当年疆域。',
      },
    ],
    steps: [
      'simaqian-shiji-writing',
      'early-plus-ban-gu-history',
      'chen-shou-history',
      'early-plus-yanshigu-hanshu',
      'early-plus-tang-shitong',
      'zizhi-tongjian',
      'region-ibn-khaldun-muqaddimah',
      'region-popol-vuh',
      'modern-hushi-history-chinese-philosophy',
    ],
    sources: [
      { title: '《史记》卷130 · 太史公自序', url: 'https://zh.wikisource.org/wiki/史記/卷130' },
      {
        title: '《汉书》卷62 · 司马迁传及报任安书',
        url: 'https://zh.wikisource.org/wiki/漢書/卷062',
      },
      {
        title: '《後漢書》卷40上',
        url: 'https://zh.wikisource.org/wiki/後漢書/卷40上',
        note: '据原典相关篇章编写；本批沿用出处，未逐条重新抓取校勘。',
      },
      {
        title: '《晋书》卷82 · 陈寿传（入晋、撰三国志与当时评价）',
        url: 'https://zh.wikisource.org/wiki/晉書/卷082',
        note: '古籍参考；事件简介、背景和影响为现代中文整理。',
      },
      {
        title: '《舊唐書》卷73',
        url: 'https://zh.wikisource.org/wiki/舊唐書/卷73',
        note: '据原典相关篇章编写；本批沿用出处，未逐条重新抓取校勘。',
      },
      {
        title: '《舊唐書》卷102',
        url: 'https://zh.wikisource.org/wiki/舊唐書/卷102',
        note: '据原典相关篇章编写；本批沿用出处，未逐条重新抓取校勘。',
      },
      {
        title: '《史通》',
        url: 'https://zh.wikisource.org/wiki/史通',
        note: '序；据原典相关篇章编写；本批沿用出处，未逐条重新抓取校勘。',
      },
      {
        title: '《宋史》卷336 · 司马光传（通鉴编修与进呈）',
        url: 'https://zh.wikisource.org/wiki/宋史/卷336',
        note: '古籍参考；事件简介、背景和影响为现代中文整理。',
      },
      {
        title: '大英百科全书 · 伊本·赫勒敦写作《绪论》',
        url: 'https://www.britannica.com/biography/Ibn-Khaldun',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
      {
        title: '大英百科全书 · 基切人的《波波尔·乌》以书写保存起源与历史',
        url: 'https://www.britannica.com/topic/Popol-Vuh',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
      {
        title: '中央研究院胡适纪念馆 · 传略（著述年表）',
        url: 'https://hushih.mh.sinica.edu.tw/Hushih_Content?mid=116',
        note: '胡适纪念馆“传略（著述年表）”1917、1919年条明确北大教学与1919年2月上卷出版；坐标指北京教学研究语境，不作印刷地判断。',
      },
      {
        title: '中央研究院胡适纪念馆 · 整理国故运动的旗手',
        url: 'https://hushih.mh.sinica.edu.tw/Hushih_Content?mid=94',
        note: '“中国哲学史”部分说明讲义、蔡元培序、1919年初出版与未完成中下卷。',
      },
    ],
    icon: 'route',
    subtitle: '9 章 · 问题与史事对读',
    description:
      '史书保存过去，也对过去作出选择。以人物为中心，还是按年排列；沿用旧说，还是比较异文；为朝廷提供鉴戒，还是保存共同体的记忆，都会改变读者看到的历史。',
  },
  {
    id: 'messages-distance-and-access',
    name: '消息怎样跨越距离',
    question: '从驿传到邮政与电报，速度之外还有哪些条件决定消息能否送达？',
    introduction: [
      '一份公文、一封家书或一条电报，都需要有人接收、转送和交付。道路与线路决定可以到哪里，马匹、分拣和操作人员支撑日常运转，资格与资费又决定谁能使用。',
      '秦唐的文书与驿传、安第斯的道路网络，可以比较国家通信背后的地方供给。十九世纪的电报和邮政随后提出不同问题：消息怎样更快，寄信怎样更便宜，跨国转运又怎样协调。它们长期并存，并非一种装置出现后就替代全部旧办法。',
    ],
    conclusion:
      '选择古代与近代的两种通信办法，分别追问：谁递送、谁负担维护、谁能够接入？尝试解释速度提高以后仍可能存在的差距。',
    color: '#667f85',
    chapters: [
      {
        eventId: 'early-plus-qin-courier',
        explanation:
          '统一政令要进入县廷日常工作，需要能够互相衔接的文书、吏员和传递制度。记录人口、案件与征发，也使办理事务的责任留下书面线索。',
        mapReading:
          '从咸阳向不同郡县比较距离，思考中央命令到达基层后还要经过哪些处理；坐标不代表全部邮传线路。',
      },
      {
        eventId: 'early-plus-tang-courier-network',
        explanation:
          '唐代使者与公文依靠驿站提供马匹、粮秣和住宿。通信制度一方面规定使用资格，另一方面把沿线供给与劳动纳入国家运行。',
        mapReading:
          '以长安为中心比较通往不同地区的道路条件，思考地形、天气和换马安排怎样影响递送；不可推定固定速度。',
      },
      {
        eventId: 'region-inca-roads',
        explanation:
          '印加道路穿越高山、河谷与海岸，桥梁、仓储和驿站支持跨地区动员。把它与唐代驿传并读，可以比较不同地形下的供给义务，不把两者当作技术传承。',
        mapReading:
          '从库斯科观察安第斯地形，比较高地与海岸的联系；节点与示意方向不能替代遗址道路测绘。',
      },
      {
        eventId: 'exp-em-electric-telegraph',
        explanation:
          '电报把信息变成可以沿导线传输的信号，但可靠通信仍依赖装置、编码、线路与训练。库克和惠斯通的方案与铁路经营相连，只是电报发展的多种技术路径之一。',
        mapReading:
          '以伦敦及铁路联系为参照，比较线路接入点与未接入地区；消息传输和人员、货物运输有不同的空间限制。',
      },
      {
        eventId: 'exp-em-penny-post',
        explanation:
          '便士邮政改变的是寄信的费用与缴费安排，分拣、运输和投递仍须逐项完成。降低邮资扩大了使用机会，识字能力和稳定地址仍影响实际受益者。',
        mapReading: '把伦敦与分散的收寄地址放在一起考虑，比较统一资费与不同距离的实际运输劳动。',
      },
      {
        eventId: 'exp-em-postal-union',
        explanation:
          '当通信跨越国界，单个国家降低邮资还不够。1874年的邮政公约协调转运与费用规则，依靠多国邮政和交通设施共同执行，接入程度仍有地区差异。',
        mapReading:
          '从伯尔尼这一协商地点看向不同国家的收寄两端，区分规则制定地点与邮件实际经过的路线。',
      },
      {
        eventId: 'exp-em-shanghai-telegraph',
        explanation:
          '津沪电报干线把沿海军政和商业消息更紧密地连接起来。导线之外，还需要局站、设备与操作人员；资费和线路范围使新速度并未平均惠及居民。',
        mapReading:
          '对照天津与上海及其间的沿海联系，再观察内陆距离；天津坐标只是跨城线路的代表点。',
      },
    ],
    steps: [
      'early-plus-qin-courier',
      'early-plus-tang-courier-network',
      'region-inca-roads',
      'exp-em-electric-telegraph',
      'exp-em-penny-post',
      'exp-em-postal-union',
      'exp-em-shanghai-telegraph',
    ],
    sources: [
      {
        title: '《史記》卷6',
        url: 'https://zh.wikisource.org/wiki/史記/卷006',
        note: '据原典相关篇章编写；本批沿用出处，未逐条重新抓取校勘。',
      },
      {
        title: '《漢書》卷23',
        url: 'https://zh.wikisource.org/wiki/漢書/卷023',
        note: '据原典相关篇章编写；本批沿用出处，未逐条重新抓取校勘。',
      },
      {
        title: '《唐六典》卷5',
        url: 'https://zh.wikisource.org/wiki/唐六典/卷5',
        note: '据原典相关篇章编写；本批沿用出处，未逐条重新抓取校勘。',
      },
      {
        title: '《通典》卷34',
        url: 'https://zh.wikisource.org/wiki/通典/卷34',
        note: '据原典相关篇章编写；本批沿用出处，未逐条重新抓取校勘。',
      },
      {
        title: '大英百科全书 · 印加道路与驿站连接多种安第斯地形',
        url: 'https://www.britannica.com/topic/Inca-road-system',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
      {
        title: 'Cooke and Wheatstone telegraph · 基础条目与参考文献',
        url: 'https://en.wikipedia.org/wiki/Cooke_and_Wheatstone_telegraph',
        note: '基础出处；未声称本轮重新抓取核验。',
      },
      {
        title: 'Uniform Penny Post · 基础条目与参考文献',
        url: 'https://en.wikipedia.org/wiki/Uniform_Penny_Post',
        note: '基础出处；未声称本轮重新抓取核验。',
      },
      {
        title: 'Universal Postal Union · 基础条目与参考文献',
        url: 'https://en.wikipedia.org/wiki/Universal_Postal_Union',
        note: '基础出处；未声称本轮重新抓取核验。',
      },
      {
        title: '中国电报史 · 基础条目与参考文献',
        url: 'https://zh.wikipedia.org/wiki/中国电报史',
        note: '基础出处；未声称本轮重新抓取核验。',
      },
    ],
    icon: 'route',
    subtitle: '7 章 · 问题与史事对读',
    description:
      '一份公文、一封家书或一条电报，都需要有人接收、转送和交付。道路与线路决定可以到哪里，马匹、分拣和操作人员支撑日常运转，资格与资费又决定谁能使用。',
  },
  {
    id: 'observing-sky-measuring-position',
    name: '测天与定位：证据怎样变得可靠',
    question: '观测记录、数学模型与仪器试验怎样互相校验？',
    introduction: [
      '测出天体位置，需要可靠的仪器，也需要时间记录、计算和长期比较。星表、历书和航海定位各有用途，允许的误差与检验办法也不完全相同。',
      '从西亚、中国与中亚的观测组织读到开普勒和伽利略，再看格林尼治与航海钟。章节之间比较不同的工作办法；跨地区年代先后本身不能证明直接传承，一次新发现也不能替代后来的验证。',
    ],
    conclusion:
      '分别为一种星表、一项行星模型和一件航海计时器找出检验办法：它们依靠什么资料，怎样发现误差，谁来判断结果是否可靠？',
    color: '#6b7998',
    chapters: [
      {
        eventId: 'region-maragha-observatory',
        explanation:
          '马拉盖天文台把学者、仪器和文献组织到长期观测中。宫廷赞助提供资源，也让研究同历法与占星需求相连，知识工作具有明确的制度条件。',
        mapReading:
          '定位伊朗西北的马拉盖，区分观测设施的地点与学者、文献的来源；不据一个节点复原传播路线。',
      },
      {
        eventId: 'shoushi-calendar',
        explanation:
          '《授时历》把多处观测、仪器改进和历算转为共同纪时标准。1281年是新历颁行的节点，不能把此前数年的合作工作压缩成一次发明。',
        mapReading:
          '以大都为参照，思考不同地点日影与天体位置的差异为何需要比较；一处坐标不代表全部观测点。',
      },
      {
        eventId: 'world-ulugh-beg-observatory',
        explanation:
          '撒马尔罕的大型固定仪器帮助测量天体位置，记录还须经过比较和修正才能进入星表。建筑后来衰落，手稿中的知识却可以继续流传。',
        mapReading:
          '观察撒马尔罕天文台的位置，将固定设施与跨地区手稿流通区分；营建年代保留为1420年代。',
      },
      {
        eventId: 'depth-kepler-new-astronomy',
        explanation:
          '开普勒利用第谷的火星记录修正轨道模型，无法消除的差异推动他重新考虑运动形式。1609年的椭圆与面积规律，不包括后来才提出的第三定律。',
        mapReading:
          '布拉格标记研究网络，不能当作全书出版地或作者全部活动范围；比较观测资料形成与理论整理的不同环节。',
      },
      {
        eventId: 'category-galileo',
        explanation:
          '望远镜扩大了可观察的对象，也提出仪器和图像是否可靠的问题。《星际信使》的出版、演示与复核，使新观测进入公开争论；单项发现并不独自证明日心说。',
        mapReading:
          '威尼斯在此是出版地参照。把书籍传播范围与望远镜实际使用地点分开，思考远方读者如何核对图像。',
      },
      {
        eventId: 'exp-em-greenwich',
        explanation:
          '格林尼治把长期天体观测与航海需求联系起来。恒星和月亮位置资料依靠仪器、计时与计算共同积累；它在1675年还不是全球一致采用的经线标准。',
        mapReading:
          '定位伦敦附近的观测台，再思考固定陆地设施怎样服务移动中的船只；不要把后来的国际经线地位提前。',
      },
      {
        eventId: 'exp-em-longitude-act',
        explanation:
          '经度奖励制度把海上定位转为有误差要求、评审和海试的公共任务。天文测量与精密计时等路线竞争，奖金需要和工艺、试验及评判规则一起理解。',
        mapReading: '区分伦敦的立法评审与远洋航行的测试环境，比较陆地校验和海上使用面对的条件。',
      },
      {
        eventId: 'exp-em-harrison-h4',
        explanation:
          'H4航海钟在跨洋航程中接受检验，精密计时必须经受温度与船体运动等干扰。一次有效海试之后，还有复试、奖励和批量供应的问题。',
        mapReading:
          '比较英国与牙买加两个方向上的时间参照；地图节点不复原具体航迹，跨洋测试也不等于仪器已普遍装备。',
      },
    ],
    steps: [
      'region-maragha-observatory',
      'shoushi-calendar',
      'world-ulugh-beg-observatory',
      'depth-kepler-new-astronomy',
      'category-galileo',
      'exp-em-greenwich',
      'exp-em-longitude-act',
      'exp-em-harrison-h4',
    ],
    sources: [
      {
        title: '大英百科全书 · 纳西尔丁·图西主持马拉盖天文台',
        url: 'https://www.britannica.com/biography/Nasir-al-Din-al-Tusi',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
      {
        title: '《元史》卷164 · 郭守敬传（测验、历算与授时历）',
        url: 'https://zh.wikisource.org/wiki/元史/卷164',
        note: '古籍参考；事件简介、背景和影响为现代中文整理。',
      },
      {
        title: 'ICOMOS–IAU · Astronomical Heritage：Ulugh Beg’s Observatory',
        url: 'https://whc.unesco.org/document/104639',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'University of Oklahoma Libraries · The New Astronomy',
        url: 'https://galileo.ou.edu/exhibits/new-astronomy.html',
        note: 'Astronomia nova展品，1609年及开普勒的轨道解释。',
      },
      {
        title: '伽利略博物馆 · Sidereus Nuncius (1610)',
        url: 'https://www2.museogalileo.it/en/library-and-research-institute/projects/meet-galileo/38-works/464-sidereus-nuncius-the-starry-messenger-1610.html',
        note: '作品介绍记1610年3月出版及1609—1610年望远镜观测。',
      },
      {
        title: 'Royal Observatory, Greenwich · 基础条目与参考文献',
        url: 'https://en.wikipedia.org/wiki/Royal_Observatory,_Greenwich',
        note: '基础出处；未声称本轮重新抓取核验。',
      },
      {
        title: 'Longitude Act 1714 · 基础条目与参考文献',
        url: 'https://en.wikipedia.org/wiki/Longitude_Act_1714',
        note: '基础出处；未声称本轮重新抓取核验。',
      },
      {
        title: 'John Harrison · 基础条目与参考文献',
        url: 'https://en.wikipedia.org/wiki/John_Harrison',
        note: '基础出处；未声称本轮重新抓取核验。',
      },
    ],
    icon: 'route',
    subtitle: '8 章 · 问题与史事对读',
    description:
      '测出天体位置，需要可靠的仪器，也需要时间记录、计算和长期比较。星表、历书和航海定位各有用途，允许的误差与检验办法也不完全相同。',
  },
  {
    id: 'constitutions-rights-and-participation',
    name: '权利写进法律之后',
    question: '成文规则怎样约束权力，哪些人又能真正参与其中？',
    introduction: [
      '写下权利并不等于所有人已经享有权利。宪章、宪法与宣言面对不同的政治问题：限制国王、分配政府权力、结束奴役，或回应土地与劳动要求。需要同时看文本规定了什么，以及哪些人仍被排除。',
      '从中世纪英格兰读到大西洋革命，再比较墨西哥、日本与印度的制度安排。各地的战争、革命和社会结构不同，不能把它们排成必然通往同一终点的道路。二十世纪章节的地图仅供地点对照，疆域仍超出地图年代范围。',
    ],
    conclusion:
      '选两份文件，把“权力怎样受到约束”“谁取得什么权利”“还要靠什么行动落实”分开回答。比较时保留它们各自的社会与政治条件。',
    color: '#897460',
    chapters: [
      {
        eventId: 'world-magna-carta',
        explanation:
          '1215年的宪章首先处理国王与反叛贵族的冲突，自由人也不包括所有居民。初次和解失败后还有多次重颁，其后世意义来自长期引用和重新解释。',
        mapReading:
          '定位兰尼米德与王权中心伦敦，区分达成协议的地点与条款涉及的领地；当地达成协议并不表示全国同时实现了新秩序。',
      },
      {
        eventId: 'world-glorious-revolution',
        explanation:
          '1688—1689年的王位更替与《权利法案》调整王室和议会的关系，仍保留宗教和身份排斥。比较《大宪章》时，要看限制王权的机构和适用对象怎样改变。',
        mapReading:
          '从伦敦看向苏格兰、爱尔兰与荷兰，理解王位安排背后的跨地区介入和战争，不能把“光荣”理解为处处无冲突。',
      },
      {
        eventId: 'world-us-constitution',
        explanation:
          '美国制宪把联邦与各州、不同政府部门的权力分配放在中心。文本仍容纳奴隶制并排除许多居民的完整参与，会议通过、各州批准与政府运作也是不同阶段。',
        mapReading:
          '以费城为制宪地点，比较各州地域与中央协调的需要；1787年文本节点不等于新政府已经开始运作。',
      },
      {
        eventId: 'exp-em-rights-man',
        explanation:
          '法国宣言以自由、平等与主权原则回应等级秩序。普遍语言与现实资格之间仍有距离，女性、被奴役者和殖民地居民需要继续争取权利。',
        mapReading:
          '从巴黎的制宪活动看向法国各地及殖民地问题，区分宣言公布地点与它所涉及的人群范围。',
      },
      {
        eventId: 'region-haiti-constitution',
        explanation:
          '海地独立后的宪法把摆脱奴役和殖民控制写入新国家安排。消除法律奴隶身份与解决劳动控制、贫困、统治权力的矛盾，是需要分别追问的问题。',
        mapReading:
          '定位加勒比地区的海地，将独立国家的法律安排与周边奴隶制和殖民环境并读，不将一个代表点当作完整实施范围。',
      },
      {
        eventId: 'region-mexico-constitution-1917',
        explanation:
          '墨西哥革命宪法回应土地、工时与社会保障诉求，使社会权利成为国家制度的一部分。条文如何落实，仍取决于后来的改革、工会与农民行动。',
        mapReading:
          '克雷塔罗是制宪地点，土地与劳动问题分布在更广阔的城乡；1917年的疆域不在地图覆盖内。',
      },
      {
        eventId: 'region-japan-constitution',
        explanation:
          '日本战后宪法重新安排主权、天皇地位、议会责任和战争权力。占领当局与本国政治力量共同影响制定，基本权利的作用仍须通过司法、选举与参与来观察。',
        mapReading:
          '以东京为制度制定与政治活动参照，区分首都的法律变化和各地居民的实践；地图不表示1947年疆域。',
      },
      {
        eventId: 'region-india-constitution',
        explanation:
          '印度制宪在独立与分治的背景下处理普选、基本权利、少数群体及中央地方关系。种姓和平等问题说明，法律承诺需要在社会生活中持续落实。',
        mapReading:
          '从德里向不同语言、宗教和社会群体所在地区比较代表与治理问题；地图只供地点对照，不提供1950年边界。',
      },
    ],
    steps: [
      'world-magna-carta',
      'world-glorious-revolution',
      'world-us-constitution',
      'exp-em-rights-man',
      'region-haiti-constitution',
      'region-mexico-constitution-1917',
      'region-japan-constitution',
      'region-india-constitution',
    ],
    sources: [
      {
        title: '英国议会 · Magna Carta（形成背景与适用对象）',
        url: 'https://www.parliament.uk/magnacarta/',
      },
      {
        title: '英国国家档案馆 · Magna Carta 1214–1225（文本与重颁年表）',
        url: 'https://www.nationalarchives.gov.uk/education/teaching-resources/magna-carta-1214-1225/',
      },
      {
        title: '英国国家档案馆 · Magna Carta',
        url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/medieval/magna-carta/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: '英国议会 · Overview of the Glorious Revolution',
        url: 'https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/revolution/overview/',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
      {
        title: '美国国家档案馆 · Constitution of the United States (1787)',
        url: 'https://www.archives.gov/milestone-documents/constitution',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
      {
        title: 'Declaration of the Rights of Man and of the Citizen · 基础条目与参考文献',
        url: 'https://en.wikipedia.org/wiki/Declaration_of_the_Rights_of_Man_and_of_the_Citizen',
        note: '基础出处；未声称本轮重新抓取核验。',
      },
      {
        title: '大英百科全书 · 海地宪法以独立国家回应奴隶制世界',
        url: 'https://www.britannica.com/topic/Haiti-Constitution-of-1805',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
      {
        title: '大英百科全书 · 墨西哥革命宪法纳入土地与劳动权利',
        url: 'https://www.britannica.com/topic/Constitution-of-1917',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
      {
        title: '大英百科全书 · 日本战后宪法生效',
        url: 'https://www.britannica.com/place/Japan/The-constitution-of-Japan',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
      {
        title: '大英百科全书 · 印度宪法生效并建立共和国',
        url: 'https://www.britannica.com/topic/Constitution-of-India',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
    ],
    icon: 'route',
    subtitle: '8 章 · 问题与史事对读',
    description:
      '写下权利并不等于所有人已经享有权利。宪章、宪法与宣言面对不同的政治问题：限制国王、分配政府权力、结束奴役，或回应土地与劳动要求。需要同时看文本规定了什么，以及哪些人仍被排除。',
  },
]
