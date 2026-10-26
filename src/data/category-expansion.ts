import type { HistoryEvent } from '../types'

// Independently written reading records; the cited sources support the dates and scope.
export const categoryExpansionEvents: HistoryEvent[] = [
  {
    id: 'category-nicaea',
    year: 325,
    title: '尼西亚会议与基督教信经之争',
    category: '文化',
    region: 'west-asia',
    themes: ['宗教'],
    location: '尼西亚（今伊兹尼克）',
    coordinates: [29.72, 40.43],
    summary: '君士坦丁召集主教在尼西亚开会，讨论阿里乌争论、复活节日期及教会纪律，形成尼西亚信经。',
    background:
      '基督教取得合法地位后，地方教会之间的分歧成为跨帝国的制度问题；皇帝也希望借会议稳定共同信仰与政治秩序。',
    details: [
      '争论的核心是基督与父神的关系。325年的文本与后来扩充的尼西亚—君士坦丁堡信经应加以区分，会议也没有使分歧立即消失。',
    ],
    impact: '会议确立了跨地区议决信仰问题的重要形式，其教义与权威此后仍经历长期争论。',
    people: [],
    sources: [
      {
        title: '圣安德鲁斯大学 · The Theology of the Council of Nicaea',
        url: 'https://www.saet.ac.uk/Christianity/TheTheologyoftheCouncilofNicaea',
        note: '见关于325年会议、阿里乌争论及信经形成的段落。',
      },
    ],
    importance: 5,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },
  {
    id: 'category-mogao',
    year: 366,
    title: '敦煌莫高窟开凿的传统起点',
    category: '文化',
    region: 'china',
    themes: ['宗教', '文学艺术', '工程建筑'],
    location: '敦煌莫高窟',
    coordinates: [94.81, 40.04],
    summary:
      '后世碑记把莫高窟佛教洞窟营建的起点追溯至366年。此后历代开窟、绘画与造像逐渐构成大型宗教艺术群。',
    background:
      '敦煌位于河西走廊与中亚交通交会处，僧侣、商旅和地方施主共同参与宗教活动与洞窟供养。',
    details: [
      '366年属于后出碑记所保存的传统纪年，不等于所有现存洞窟或壁画都建于该年。不同洞窟须分别依据题记、风格与考古层位断代。',
    ],
    impact: '莫高窟成为观察佛教图像、地方供养和欧亚文化交流的长期材料，而不是单一王朝的一次工程。',
    people: [],
    sources: [
      {
        title: 'ICOMOS · 莫高窟世界遗产评估',
        url: 'https://whc.unesco.org/document/153484',
        note: '见第1页关于碑记记载366年开窟、敦煌交通地位的说明。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
    dateLabel: '传统纪年366年',
    dateNote: '开窟起点据后世碑记追记，不能据此精确断定最早洞窟的实际施工日。',
  },
  {
    id: 'category-kumarajiva',
    year: 401,
    title: '鸠摩罗什入长安与佛典翻译',
    category: '交流',
    region: 'china',
    themes: ['宗教', '教育学术'],
    location: '长安',
    coordinates: [108.94, 34.26],
    summary: '鸠摩罗什来到后秦都城长安，在姚兴支持下组织译经，把多部大乘佛教经典译为汉文。',
    background:
      '佛教经典此前已沿中亚路线进入汉地，但语言转换、术语选择和不同传本之间的差别持续影响理解。',
    details: [
      '译经依靠多人协作，包括讲解原文、讨论义理与整理汉文。常见401年纪年对应弘始三年，岁末日期换算也有落在公元402年的处理。',
    ],
    impact: '这些译本长期影响汉传佛教的经典阅读与学派讨论，也显示翻译本身是知识重组的过程。',
    people: [],
    sources: [
      {
        title: '香港中文大学《译丛》 · Kumarajiva',
        url: 'https://www.cuhk.edu.hk/renditions/authors/kuma.html',
        note: '人物介绍记401年入长安及译经；采用常用年序，并保留岁末换历限制。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
    dateLabel: '401年前后',
    dateNote: '以弘始三年的常用公元纪年401年定位；具体岁末日期转换可能计入402年。',
  },
  {
    id: 'category-ganden',
    year: 1409,
    title: '宗喀巴建立甘丹寺',
    category: '文化',
    region: 'china',
    themes: ['宗教', '教育学术'],
    location: '拉萨东北甘丹寺',
    coordinates: [91.48, 29.77],
    summary:
      '宗喀巴建立甘丹寺，为长期随行讲学的僧团提供较稳定的修学基地；它后来成为格鲁派的重要寺院。',
    background:
      '藏传佛教中经论学习、辩论、戒律和密教实践之间的关系，既是思想问题，也需要相应的僧团组织。',
    details: [
      '寺院的建立和后来的宗派制度并非同一瞬间完成。甘丹寺的营建由宗喀巴与弟子共同推进，不能把整个格鲁传统简化为单年创立。',
    ],
    impact: '固定寺院及教学组织帮助其学术与修行传统延续，并形成跨寺院的知识网络。',
    people: [],
    sources: [
      {
        title: '斯坦福哲学百科 · Tsongkhapa',
        url: 'https://plato.stanford.edu/entries/tsongkhapa/',
        note: '见第6节关于1409年建立甘丹寺及弟子参与营建的段落。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },
  {
    id: 'category-adi-granth',
    year: 1604,
    title: '阿尔瓊编成《阿迪·格兰特》',
    category: '文化',
    region: 'south-asia',
    themes: ['宗教', '文学艺术'],
    location: '阿姆利则',
    coordinates: [74.88, 31.62],
    summary:
      '锡克教第五代古鲁阿尔瓊汇编《阿迪·格兰特》，把古鲁与其他宗教诗人的赞歌整理为共同诵读的经典。',
    background:
      '锡克教在旁遮普发展时，口传诗歌、宗教共同体与书面经典彼此联系；保存和辨认赞歌成为重要工作。',
    details: [
      '1604年指初编本，不等于后来《古鲁·格兰特·萨希卜》的全部编定与宗教地位都已在这一年完成。',
    ],
    impact: '经典汇编让宗教教导与音乐诵唱获得共同文本，也保留了旁遮普及周边多种虔信传统的声音。',
    people: [],
    sources: [
      {
        title: 'Sikh Missionary Society · Guru Granth Sahib',
        url: 'https://www.sikhmissionarysociety.org/sms/smsarticles/advisorypanel/gurmukhsinghsewauk/gurugranthsahib/',
        note: '开篇说明第五代古鲁于1604年整理Aad Granth，并区分后续版本。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },
  {
    id: 'category-trent',
    year: 1545,
    title: '特伦托会议与天主教改革',
    category: '文化',
    region: 'europe',
    themes: ['宗教'],
    location: '特伦托',
    coordinates: [11.12, 46.07],
    summary: '天主教召开特伦托会议，分阶段讨论教义、圣礼与教会纪律，回应宗教改革带来的分裂。',
    background:
      '16世纪欧洲围绕救赎、教会权威与宗教实践出现重大冲突，教廷、帝国及地方统治者对会议也有不同期待。',
    details: [
      '会议历经中断，1545—1547、1551—1552、1562—1563三个阶段才完成主要工作；教义界定与内部纪律改革同时推进。',
    ],
    impact: '会议长期塑造天主教的教育、礼仪和教会组织，但没有恢复西欧基督教的统一。',
    people: [],
    sources: [
      {
        title: '圣安德鲁斯大学 · Council of Trent',
        url: 'https://www.saet.ac.uk/Christianity/CouncilofTrent',
        note: '见会议三阶段与教义、纪律改革各节。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
    endYear: 1563,
    dateLabel: '1545—1563年（间断召开）',
    dateNote: '持续过程，起止年分别指开幕和闭幕，并非连续开会。',
  },
  {
    id: 'category-kokinshu',
    year: 905,
    title: '《古今和歌集》奉敕编纂',
    category: '文化',
    region: 'east-asia',
    themes: ['文学艺术'],
    location: '平安京（京都）',
    coordinates: [135.77, 35.01],
    summary: '纪贯之等奉命编纂《古今和歌集》，整理和歌作品，并以序文讨论诗歌表达与语言。',
    background: '平安宫廷同时使用汉文与日语书写，诗歌往来、仪式和私人情感共同塑造文人社交。',
    details: [
      '905年常用于定位奉敕编纂；编定过程及传本还有912年等纪年讨论，不能把现代通行本视为当年一次完成。',
    ],
    impact: '和歌选本与序文成为日本诗学的重要参照，后来的敕撰集不断回应它所建立的分类与风格。',
    people: [],
    sources: [
      {
        title: '日本国文学研究资料馆 · 古今和歌集',
        url: 'https://literarymaps.nijl.ac.jp/en/resources/567554dddddddddddddddd01/',
        note: '作品目录列作者、体裁及905／912年两种时间标记。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
    dateLabel: '905年前后',
    dateNote: '采用常用奉敕编纂年；来源同时列905／912，不把编纂、奏呈与传本形成强行合并。',
  },
  {
    id: 'category-genji',
    year: 1008,
    title: '紫式部《源氏物语》的早期流传',
    category: '文化',
    region: 'east-asia',
    themes: ['文学艺术'],
    location: '平安京（京都）',
    coordinates: [135.77, 35.01],
    summary: '紫式部的《源氏物语》在11世纪初的宫廷环境中流传，借人物关系、记忆与情感展现贵族社会。',
    background:
      '宫廷女性的假名文学与诗歌传统，为长篇叙事提供了语言与读者；作品也与汉文知识和佛教观念交织。',
    details: [
      '1008年常作为作品已流传的时间参照，不能据此断言全部章节在该年统一完稿。后代绘卷、屏风与改写又不断重塑阅读。',
    ],
    impact:
      '作品成为日本文学与视觉艺术持续取材的经典，也让叙事中的社会等级、性别关系和无常意识得以被讨论。',
    people: [],
    sources: [
      {
        title: '密歇根大学美术馆 · Ushiwakamaru and Jôrurihime',
        url: 'https://umma.umich.edu/objects/ushiwakamaru-and-jorurihime-mitate-1948-1-170/',
        note: '馆藏说明关联紫式部《源氏物语》及1008年；此处仅作早期流传的约略定位。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
    dateLabel: '约11世纪初',
    dateNote: '以常用1008年作为时间轴参照，不宣称所有章节的精确成书年。',
  },
  {
    id: 'category-dante',
    year: 1321,
    title: '但丁晚年完成《神曲》',
    category: '文化',
    region: 'europe',
    themes: ['文学艺术', '宗教'],
    location: '拉文纳',
    coordinates: [12.2, 44.42],
    summary: '但丁在流亡岁月中写作《神曲》，在去世前完成这部以地狱、炼狱和天堂之旅组织的长诗。',
    background:
      '意大利城市政治冲突、基督教宇宙观与古典文学共同进入诗人的叙事；他也以意大利俗语面对更广的读者。',
    details: [
      '作品把历史人物、政治判断与诗人的个人经验编织在一起，虚构旅程不能作为实际地理行程。1321年是完成作品的晚年节点。',
    ],
    impact:
      '《神曲》成为意大利文学及欧洲图像艺术的重要参照，其道德秩序与政治立场也持续受到不同解读。',
    people: [],
    sources: [
      {
        title: '牛津大学博德利图书馆 · Illustrating Dante’s Divine Comedy',
        url: 'https://blogs.bodleian.ox.ac.uk/oxfordtrainees/wp-content/uploads/sites/133/2021/09/Exhibition-Handlist-Illustrating-Dantes-Divine-Comedy-October-2020.pdf',
        note: '展览手册开篇记作品在1321年9月去世前不久完成。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },
  {
    id: 'category-globe',
    year: 1599,
    title: '环球剧场启用与莎士比亚戏剧',
    category: '文化',
    region: 'europe',
    themes: ['文学艺术', '工程建筑'],
    location: '伦敦南岸',
    coordinates: [-0.094, 51.506],
    summary: '伦敦原环球剧场于1599年启用，莎士比亚所属剧团在这里向付费观众演出。',
    background:
      '商业剧场把编剧、演员、投资者与城市观众联系在一起，戏剧既依赖文学创作，也依赖共同演出与场地经营。',
    details: [
      '剧场认为《裘力斯·凯撒》可能是最早在环球上演的莎士比亚作品之一；这一判断仍带不确定性，不能当作有精确首演日的记录。',
    ],
    impact:
      '环球见证了公共戏剧的繁荣。现今重建剧场与1599年的原建筑应区分，历史演出也不能还原为作者独自完成。',
    people: [],
    sources: [
      {
        title: 'Shakespeare’s Globe · Globe Theatre',
        url: 'https://www.shakespearesglobe.com/discover/about-us/globe-theatre/',
        note: '场馆历史与问答记1599年原剧场及可能的首批剧目。',
      },
    ],
    importance: 4,
    locationNote: '坐标为原环球剧场一带的阅读参照；现代重建剧场位于附近，并非原址原建筑。',
  },
  {
    id: 'category-quixote',
    year: 1605,
    title: '塞万提斯《堂吉诃德》第一部出版',
    category: '文化',
    region: 'europe',
    themes: ['文学艺术'],
    location: '马德里',
    coordinates: [-3.7, 40.42],
    summary: '《堂吉诃德》第一部在马德里上市，以骑士小说的模仿、误读与日常冲突展开长篇叙事。',
    background:
      '印刷、书商和跨地区阅读使小说形成新的市场；塞万提斯既借用既有文类，也让人物不断遭遇现实对想象的反驳。',
    details: [
      '初版在1604年末印成，书名页署1605年并于次年1月开始销售。本条采用出版通行年，第二部则在1615年问世。',
    ],
    impact: '作品扩展了人物视角与自我反思的叙事方式，成为世界小说史中被反复翻译和改写的文本。',
    people: [],
    sources: [
      {
        title: '西班牙国家图书馆 · El ingenioso hidalgo don Quixote de la Mancha',
        url: 'https://www.bne.es/es/colecciones/cervantes/ingenioso-hidalgo-don-quixote-mancha',
        note: '馆藏初版说明区分1604年底印成与1605年1月上市。',
      },
    ],
    importance: 5,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },
  {
    id: 'category-beethoven-ninth',
    year: 1824,
    title: '贝多芬第九交响曲在维也纳首演',
    category: '文化',
    region: 'europe',
    themes: ['文学艺术'],
    location: '维也纳',
    coordinates: [16.37, 48.2],
    summary: '贝多芬第九交响曲于1824年5月7日在维也纳首演，末乐章引入独唱、合唱与席勒诗歌。',
    background:
      '欧洲音乐会文化扩大，作曲、出版、乐团与公众之间的联系不断变化；大型作品需要众多演奏者协作才能呈现。',
    details: [
      '把人声引入交响曲终章改变了全曲的形式与表达规模。首演还包括贝多芬其他作品，不能把当晚理解为单一作品的现代专场。',
    ],
    impact:
      '第九交响曲成为后代作曲家与公共文化的重要参照，不同历史时期也赋予它不同政治和伦理含义。',
    people: [],
    sources: [
      {
        title: '维也纳爱乐乐团 · 第九交响曲首演二百周年展',
        url: 'https://www.wienerphilharmoniker.at/en/orchestra/exhibitions/exhibition1',
        note: '展览开篇确认1824年5月7日及Kärntnertor Theater首演地点。',
      },
    ],
    importance: 5,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },
  {
    id: 'category-hokusai',
    year: 1830,
    title: '葛饰北斋《富岳三十六景》与大浪图',
    category: '文化',
    region: 'east-asia',
    themes: ['文学艺术'],
    location: '江户（东京）',
    coordinates: [139.77, 35.68],
    summary:
      '葛饰北斋与出版商推出《富岳三十六景》，其中《神奈川冲浪里》通过浪涛、船与远处富士山构成鲜明对照。',
    background:
      '江户商业出版与木版印刷有成熟分工，新近广泛使用的普鲁士蓝颜料也扩展了风景版画的色彩。',
    details: [
      '系列在1831年新年时已有广告，单幅印制通常断为约1830—1832年。多个存世印本有版次差异，不宜给所有印本同一个精确制作日。',
    ],
    impact: '浮世绘风景版画进入更广的消费市场，作品后来经收藏与传播成为跨文化的视觉参照。',
    people: [],
    sources: [
      {
        title: '大都会艺术博物馆 · The Great Wave: Anatomy of an Icon',
        url: 'https://www.metmuseum.org/essays/hokusai-great-wave',
        note: '开篇记1831年系列广告；图录断代约1830—1832年，并介绍普鲁士蓝和印刷。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
    endYear: 1832,
    dateLabel: '约1830—1832年',
    dateNote: '采用馆方对印本制作的约略区间；1831年广告不等于每幅作品同日完成。',
  },
  {
    id: 'category-euclid',
    year: -300,
    title: '欧几里得《几何原本》整理数学证明',
    category: '文化',
    region: 'africa',
    themes: ['科技医学', '教育学术'],
    location: '亚历山大',
    coordinates: [29.92, 31.2],
    summary:
      '在希腊化时代的亚历山大学术环境中，欧几里得整理几何、比例与数论，形成以定义、公设和证明组织的《几何原本》。',
    background:
      '希腊数学已有多代研究积累，作品的关键贡献也在于材料的组织，而非所有定理都由一个人最先发现。',
    details: [
      '欧几里得生平和作品形成细节所知有限。约前300年只是常用学术定位；13卷内容及后来编辑、翻译的传承不能压缩为一次出版。',
    ],
    impact: '证明式论述成为后世数学教学的重要范式，阿拉伯文、拉丁文等译本又扩大了它的读者。',
    people: [],
    sources: [
      {
        title: '圣安德鲁斯大学 MacTutor · Euclid',
        url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Euclid/',
        note: '见生平断代讨论及《原本》13卷内容介绍。',
      },
    ],
    importance: 5,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
    dateLabel: '约公元前300年',
    dateNote: '古代生平与成书史证据有限，采用通行约略年代。',
  },
  {
    id: 'category-neijing',
    year: -150,
    title: '《黄帝内经》医学思想逐步形成',
    category: '文化',
    region: 'china',
    themes: ['科技医学'],
    location: '汉代中国（区域参照）',
    coordinates: [112.5, 34.6],
    summary:
      '战国至汉代的医学知识逐渐汇入后来称为《黄帝内经》的文本传统，讨论人体、病因、诊断与治疗。',
    background:
      '不同医家积累的观察和理论，与阴阳、四时及脏腑观念相联系；传世医学经典经历汇编、整理和注释。',
    details: [
      '书名中的黄帝是托古叙事，不能据此当作远古君主亲自成书的证据。此处以约前2世纪为代表性定位，不设唯一作者或确切完成日。',
    ],
    impact: '文本成为后世中国医学理论的重要参照，也需区分其历史知识框架与现代医学的验证方法。',
    people: [],
    sources: [
      {
        title: '中国国家档案局 · Huangdi Neijing世界记忆申报材料',
        url: 'https://www.saac.gov.cn/mowcn/cn/c100513/202109/a20df84efbe9428187c1d3462973da28/files/c3101558946944cbac352f0aceef7b16.pdf',
        note: '见文本形成与历代整理传播的说明；申报资料以公元前2世纪定位早期成书。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
    dateLabel: '约公元前2世纪',
    dateNote: '约前150年仅供世纪级时间轴定位；文本包含多时代层次，成书史仍有讨论。',
  },
  {
    id: 'category-algebra',
    year: 825,
    title: '花剌子米编写代数学著作',
    category: '文化',
    region: 'west-asia',
    themes: ['科技医学', '教育学术'],
    location: '巴格达',
    coordinates: [44.37, 33.32],
    summary: '花剌子米在约825年前后编写代数学著作，系统讨论若干类型方程的化简与求解。',
    background:
      '阿拔斯时代的翻译、行政计算与天文研究相互促进，数学也服务于分配、交易和测量等问题。',
    details: [
      '他的方程分类以文字叙述和几何论证呈现，不能直接等同于现代符号代数。作品后来译成拉丁文，经历多次抄写和改编。',
    ],
    impact: '它帮助形成持续发展的代数传统，也说明知识在阿拉伯语与拉丁语学术网络之间发生转换。',
    people: [],
    sources: [
      {
        title: '美国数学协会 Convergence · Latin Manuscript of Al-Khwarizmi’s Algebra',
        url: 'https://old.maa.org/node/1409908',
        note: 'Frank J. Swetz文章开篇记约825年写成及后来的拉丁译本，并列六种方程。',
      },
    ],
    importance: 5,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
    dateLabel: '约825年',
    dateNote: '采用来源的约略成书年，不作精确出版年。',
  },
  {
    id: 'category-optics',
    year: 1011,
    title: '伊本·海赛姆撰写《光学》',
    category: '文化',
    region: 'africa',
    themes: ['科技医学'],
    location: '开罗',
    coordinates: [31.24, 30.04],
    summary: '伊本·海赛姆在11世纪初研究光、视觉、反射与折射，把实验观察和数学论证联系起来。',
    background: '古希腊视觉理论经阿拉伯语翻译后被重新讨论，眼睛如何看见物体也涉及医学与自然哲学。',
    details: [
      '《光学》通常置于1011—1021年间写作。它反对把视觉简单解释为眼睛向外发射射线，重视光从物体进入眼睛的过程。',
    ],
    impact:
      '作品在后来的拉丁语学术中持续受到讨论，是跨文化光学传统的重要环节；不能把科学方法的起源归给单独一个人。',
    people: [],
    sources: [
      {
        title: 'Annals of Saudi Medicine · Ibn Al-Haytham: Father of Modern Optics',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6074172/',
        note: '见关于《光学》写作时间1011—1021及实验和视觉理论的段落。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
    endYear: 1021,
    dateLabel: '约1011—1021年',
    dateNote: '采用常见写作区间；分卷写作与后世译本不是单次出版。',
  },
  {
    id: 'category-galileo',
    year: 1610,
    title: '伽利略出版《星际信使》',
    category: '文化',
    region: 'europe',
    themes: ['科技医学'],
    location: '威尼斯',
    coordinates: [12.34, 45.44],
    summary: '伽利略出版《星际信使》，报告通过望远镜观察月面、银河与木星附近四颗卫星所得的发现。',
    background:
      '望远镜起初也用于地面观测和实际事务。把它用于天文学，既需要改进仪器，也需要解释新图像的可靠性。',
    details: [
      '观测发生于1609年末至1610年初，书于1610年3月在威尼斯印行。木星卫星显示并非所有天体都直接绕地球运行，但不能单凭这一发现完成全部宇宙模型的证明。',
    ],
    impact: '新观测加深了关于天体性质与体系的争论，仪器逐渐成为天文学证据的重要来源。',
    people: [],
    sources: [
      {
        title: '伽利略博物馆 · Sidereus Nuncius (1610)',
        url: 'https://www2.museogalileo.it/en/library-and-research-institute/projects/meet-galileo/38-works/464-sidereus-nuncius-the-starry-messenger-1610.html',
        note: '作品介绍记1610年3月出版及1609—1610年望远镜观测。',
      },
    ],
    importance: 5,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },
  {
    id: 'category-harvey',
    year: 1628,
    title: '哈维发表血液循环论证',
    category: '文化',
    region: 'europe',
    themes: ['科技医学'],
    location: '法兰克福（出版地）',
    coordinates: [8.68, 50.11],
    summary: '威廉·哈维出版《心血运动论》，通过解剖、实验与数量推理说明心脏推动血液循环。',
    background:
      '欧洲医学长期依据古代权威理解血液的生成与运动；解剖教学与实验为重新检验这些解释创造了条件。',
    details: [
      '本条坐标指书籍出版地，并不证明哈维本人在法兰克福完成实验。论证提出循环体系，但当时尚不能直接看清连接动静脉的微细结构。',
    ],
    impact: '循环理论改变了生理学解释人体的方式，也展示了实验与推理怎样共同挑战传统模型。',
    people: [],
    sources: [
      {
        title: '英国皇家内科医师学会博物馆 · Timeline',
        url: 'https://history.rcp.ac.uk/timeline',
        note: '1628年条目及图注确认《心血运动论》在法兰克福出版和循环论证。',
      },
    ],
    importance: 5,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },
  {
    id: 'category-jenner',
    year: 1796,
    title: '詹纳开展牛痘接种试验',
    category: '社会',
    region: 'europe',
    themes: ['科技医学'],
    location: '英国伯克利',
    coordinates: [-2.46, 51.69],
    summary: '爱德华·詹纳从牛痘保护作用的地方经验出发，在1796年进行接种试验，随后整理和传播研究。',
    background:
      '此前亚洲、非洲及奥斯曼等地已有天花人痘接种实践；牛痘接种是在这些经验与地方观察基础上的另一条路径。',
    details: [
      '试验包含对儿童进行接种与后续人痘暴露检验；历史叙述应说明当时的做法，不将它视为现代研究伦理的示范。',
    ],
    impact:
      '牛痘接种逐步进入更广的预防实践，天花防治仍依赖后来的制造、组织、公共信任与跨地区推广。',
    people: [],
    sources: [
      {
        title: '世界卫生组织 · History of smallpox vaccination',
        url: 'https://www.who.int/news-room/spotlight/history-of-vaccination/history-of-smallpox-vaccination',
        note: '见人痘接种传统、1796年5月试验与7月后续检验的段落。',
      },
    ],
    importance: 5,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },
  {
    id: 'category-maxwell',
    year: 1865,
    title: '麦克斯韦发表电磁场动力学理论',
    category: '文化',
    region: 'europe',
    themes: ['科技医学'],
    location: '伦敦（论文发表）',
    coordinates: [-0.13, 51.51],
    summary: '麦克斯韦发表《电磁场的动力学理论》，用数学框架联系电、磁与光的传播。',
    background:
      '电磁实验已有长期积累，法拉第等人的场观念提出了新的解释方向；关键问题之一是如何把实验关系组织为统一理论。',
    details: [
      '论文在1864年宣读，1865年发表于《哲学汇刊》。现代常用方程的简洁形式经历了后续重写，不能直接投射为原论文的全部表达。',
    ],
    impact: '电磁场理论为理解光和无线传播提供基础，但理论建立与后来的工程应用有各自的历史过程。',
    people: [],
    sources: [
      {
        title: 'James Clerk Maxwell Foundation · Facts about Maxwell',
        url: 'https://www.clerkmaxwellfoundation.org/html/key_facts_about_maxwell.html',
        note: '年表1861/2、1864、1865条，区分电磁理论前期研究、宣读与正式发表。',
      },
      {
        title: '英国皇家学会档案 · A dynamical theory of the electromagnetic field',
        url: 'https://catalogues.royalsociety.org/CalmView/Record.aspx?id=PT%2F72%2F7&src=CalmView.Catalog',
        note: 'PT/72/7，1865年《哲学汇刊》论文手稿记录；论文发表年与1864年宣读区分。',
      },
    ],
    importance: 5,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },
  {
    id: 'category-pasteur',
    year: 1885,
    title: '巴斯德团队进行狂犬病暴露后接种',
    category: '社会',
    region: 'europe',
    themes: ['科技医学'],
    location: '巴黎',
    coordinates: [2.34, 48.84],
    summary:
      '巴斯德团队与医生在1885年为被犬咬伤的约瑟夫·迈斯特实施一系列接种，尝试在疾病发作前阻止感染进展。',
    background:
      '微生物研究、动物实验与疫苗制备逐渐联系起来，但从实验室走向人体也包含证据和伦理上的难题。',
    details: [
      '迈斯特于7月6日来到实验室，随后接受连续注射。实际接种依赖医生及研究团队，不应简化为巴斯德独自完成。',
    ],
    impact: '这一案例推动狂犬病防治与专门研究机构的发展，同时需要区分历史制剂与现代疫苗。',
    people: [],
    sources: [
      {
        title: '巴斯德研究所 · Notre histoire',
        url: 'https://www.pasteur.fr/fr/nous-connaitre/notre-adn/histoire',
        note: '见“Un matin du 6 juillet 1885”及研究所创设背景。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },
  {
    id: 'category-curie',
    year: 1898,
    title: '居里夫妇报告钋和镭的发现',
    category: '文化',
    region: 'europe',
    themes: ['科技医学'],
    location: '巴黎',
    coordinates: [2.34, 48.84],
    summary: '玛丽·居里与皮埃尔·居里研究沥青铀矿的放射性，在1898年先后报告钋和镭的存在。',
    background:
      '铀辐射的新发现使测量物质的放射性成为研究途径；矿物的活性高于纯铀，提示其中可能还有未知成分。',
    details: [
      '7月提出钋，12月报告镭的证据。提出新元素、获得足够样品并测定性质是不同阶段，不能把1898年的报告写成已完成所有纯化工作。',
    ],
    impact: '放射性研究改变了人们对物质内部结构的认识，也带来后来才逐渐认识的辐射防护问题。',
    people: [],
    sources: [
      {
        title: '诺贝尔奖机构 · Marie and Pierre Curie and the discovery of polonium and radium',
        url: 'https://www.nobelprize.org/prizes/lists/marie-and-pierre-curie-and-the-discovery-of-polonium-and-radium/',
        note: '见“Marie and Pierre — a fruitful collaboration”和“Arduous work”，区分1898年报告与后续分离。',
      },
    ],
    importance: 5,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },
  {
    id: 'category-nalanda',
    year: 450,
    title: '那烂陀发展为寺院与学术中心',
    category: '文化',
    region: 'south-asia',
    themes: ['教育学术', '宗教'],
    location: '那烂陀',
    coordinates: [85.44, 25.14],
    summary: '约5世纪起，那烂陀逐渐形成大型寺院与教学组织，成为印度及亚洲佛教知识交流的重要中心。',
    background: '寺院教育依靠供养、藏书与僧团制度，宗教学习也与语言、论辩及其他知识相联系。',
    details: [
      '遗址有更早的活动层次，但大型修学机构的兴起通常放在5世纪。不能把建筑遗存最早年代直接等同于现代大学式的建校年份。',
    ],
    impact:
      '那烂陀的教学与建筑组织影响后来的寺院学府，并吸引跨地区求学者；其历史不能只用一次毁坏来概括。',
    people: [],
    sources: [
      {
        title: 'UNESCO · Archaeological Site of Nalanda Mahavihara',
        url: 'https://whc.unesco.org/en/list/1502/',
        note: 'Outstanding Universal Value中区分早期遗存与5—13世纪寺院教育机构。',
      },
    ],
    importance: 5,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
    dateLabel: '约5世纪',
    dateNote: '450年仅作世纪级定位；没有以该年为精确建校日的证据。',
  },
  {
    id: 'category-azhar',
    year: 970,
    title: '爱资哈尔清真寺营建与学术传统',
    category: '文化',
    region: 'africa',
    themes: ['教育学术', '宗教', '工程建筑'],
    location: '开罗',
    coordinates: [31.26, 30.05],
    summary:
      '法蒂玛王朝在新都开罗营建爱资哈尔清真寺，972年开始举行主麻聚礼，后来逐渐发展为重要教学中心。',
    background:
      '新都的宗教建筑与王朝权威相联系，讲学、经典解释及学者网络则使清真寺承担持续的知识传授。',
    details: [
      '970—972年首先指建筑与启用过程，不能把它直接等同于今日大学所有制度的成立。其宗派归属和课程也经历后世变化。',
    ],
    impact: '爱资哈尔成为伊斯兰学术网络的重要节点，体现宗教场所与教学机构在历史中的交织。',
    people: [],
    sources: [
      {
        title: '爱资哈尔官方门户 · الجامع الأزهر الشريف',
        url: 'https://azhar.eg/alazharmosque/about_alazhar.htm',
        note: '首段记回历359—361年营建及公元972年首次主麻聚礼。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
    endYear: 972,
    dateLabel: '970—972年',
    dateNote: '以建筑营建至启用范围定位；后来的大学组织不与此区间完全重合。',
  },
  {
    id: 'category-yuelu',
    year: 976,
    title: '潭州创建岳麓书院',
    category: '文化',
    region: 'china',
    themes: ['教育学术'],
    location: '潭州岳麓山（长沙）',
    coordinates: [112.94, 28.18],
    summary: '北宋潭州创建岳麓书院，为地方讲学、读书与师生交流提供相对稳定的场所。',
    background:
      '地方官、士人和社会供养共同支持书院发展；书院与官学、科举及私人授学之间保持多重联系。',
    details: [
      '976年是常用创设年，但今存建筑和制度是多次兴废、重建及改组的结果，不能把“千年书院”理解为原建筑原状延续。',
    ],
    impact:
      '岳麓书院长期参与区域教育与学术讨论，近代又发生学制转变，展示传统教育机构的延续与调整。',
    people: [],
    sources: [
      {
        title: '湖南大学出版社 · 岳麓书院史',
        url: 'https://press.hnu.edu.cn/info/1133/4271.htm',
        note: '内容介绍明确记北宋开宝九年（976年）创设及1903年改学堂。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },
  {
    id: 'category-bologna',
    year: 1088,
    title: '博洛尼亚法学教学传统兴起',
    category: '文化',
    region: 'europe',
    themes: ['教育学术'],
    location: '博洛尼亚',
    coordinates: [11.34, 44.49],
    summary: '博洛尼亚的法学教学与师生组织逐步发展，1088年被后世约定为该大学的创始纪年。',
    background:
      '中世纪城市、法律实践与罗马法研究扩大了专业学习需求，师生社团也寻求在城市和教会之间获得权利保障。',
    details: [
      '1088年不是现存建校诏书所证明的一日成立；大学自身历史说明使用这一约定年，教学与组织是在长期过程中形成的。',
    ],
    impact: '博洛尼亚成为欧洲大学史的重要案例，专业训练、学生组织及学术自治的关系不断被重新讨论。',
    people: [],
    sources: [
      {
        title: '博洛尼亚大学 · Our history',
        url: 'https://www.unibo.it/en/university/who-we-are/our-history/our-history',
        note: '“Nine centuries of history”明确把1088年称为conventionally referred founding year。',
      },
    ],
    importance: 5,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
    dateLabel: '约11世纪末（传统纪年1088年）',
    dateNote: '1088年是后世采用的约定创始年，非可精确确认的单次创校事件。',
  },
  {
    id: 'category-kaiyuan-cash',
    year: 621,
    title: '唐朝铸行开元通宝',
    category: '社会',
    region: 'china',
    themes: ['经济贸易'],
    location: '长安',
    coordinates: [108.94, 34.26],
    summary: '唐初铸行开元通宝，钱文采用通宝名称，为此后东亚钱币形制提供重要参照。',
    background:
      '统一政权需要组织铸币、赋税与市场交换；钱币的名称、重量标准与实际流通并不总能完全一致。',
    details: [
      '开元通宝始于唐高祖武德年间，不能因为“开元”二字而误判为唐玄宗开元年号才出现。不同地区和时代仿铸也要分别辨认。',
    ],
    impact: '方孔圆钱与钱文传统通过东亚交往被不同政权采用，是观察货币制度和文化借鉴的具体材料。',
    people: [],
    sources: [
      {
        title: '台北故宫博物院 · 开元通宝',
        url: 'https://digitalarchive.npm.gov.tw/Antique/Content?Dept=U&uid=9499',
        note: '馆藏购钱000161N000000000，断代唐高祖武德四年（621年）以后。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },
  {
    id: 'category-champa-rice',
    year: 1012,
    title: '占城早稻在宋代江淮地区推广',
    category: '社会',
    region: 'china',
    themes: ['经济贸易', '交流'],
    location: '江淮地区（区域参照）',
    coordinates: [118.3, 32.3],
    summary:
      '北宋早期从占城引入的早熟稻种在江淮一带传播，为农民选择种植季节和适应土地提供了新条件。',
    background:
      '南方稻作扩展依靠农户劳动、灌溉与多种地方技术，人口增长和经济重心变化也不是单一稻种造成的。',
    details: [
      '来源指出到1012年早稻已传入长江下游与淮河地区。此年是传播过程的参照，不代表所有村落同时改种，也不等于所有复种制立刻形成。',
    ],
    impact: '早熟与较耐旱的品种扩大了种植选择，但实际产量和收益仍取决于水利、土地与劳动条件。',
    people: [],
    sources: [
      {
        title: '哥伦比亚大学 Asia for Educators · Rice Cultivation in Song China',
        url: 'https://afe.easia.columbia.edu/songdynasty-module/tech-rice.html',
        note: '“New Varieties of Rice”引述1012年前后江淮传播及早熟、耐旱特征。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
    dateLabel: '1012年前后',
    dateNote: '采用来源对传播状态的时间参照，不把长期引种过程写成单日事件。',
  },
  {
    id: 'category-ducat',
    year: 1284,
    title: '威尼斯创铸杜卡特金币',
    category: '社会',
    region: 'europe',
    themes: ['经济贸易'],
    location: '威尼斯',
    coordinates: [12.34, 45.44],
    summary: '威尼斯创铸杜卡特金币，使地中海商业网络获得一种后来被广泛采用的黄金货币。',
    background:
      '海上贸易、跨地区支付与城邦财政需要可信赖的货币；金币的重量、成色与市场信誉共同影响接受程度。',
    details: [
      '1284年指威尼斯金币的创设，并不意味着所有后来称为杜卡特的钱币都在威尼斯生产，或其价值在各地始终相同。',
    ],
    impact: '杜卡特的流通与仿铸展示商业网络中的信用和标准化，也揭示不同货币制度长期并存。',
    people: [],
    sources: [
      {
        title: '加泰罗尼亚国家艺术博物馆 · Ducat',
        url: 'https://www.museunacional.cat/en/ducat',
        note: '钱币术语条目明确记1284年在威尼斯创设黄金货币单位。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },

  {
    id: 'category-bank-england',
    year: 1694,
    title: '英格兰银行创设',
    category: '社会',
    region: 'europe',
    themes: ['经济贸易'],
    location: '伦敦',
    coordinates: [-0.13, 51.51],
    summary: '英格兰银行获皇家特许成立，以股份资金向政府放贷，并开展存款等银行业务。',
    background:
      '对法战争加剧财政需求，王室信用与既有金融安排面临压力，政府因此寻求新的长期筹资方式。',
    details: [
      '银行最初是私人股份机构，不能把现代中央银行的全部职能投射到1694年。7月27日获特许，8月开始营业。',
    ],
    impact: '公共债务、股份融资与银行业务在这里结合，其后数百年才逐步形成更广的公共货币职能。',
    people: [],
    sources: [
      {
        title: '英格兰银行 · History',
        url: 'https://www.bankofengland.co.uk/about/history',
        note: '1694年7月27日创设与8月1日营业条目，并注明最初私人银行性质。',
      },
    ],
    importance: 5,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },
  {
    id: 'category-bank-japan',
    year: 1882,
    title: '日本银行开业',
    category: '社会',
    region: 'east-asia',
    themes: ['经济贸易'],
    location: '东京日本桥',
    coordinates: [139.78, 35.68],
    summary: '日本银行在1882年10月10日开业，成为重整货币与银行制度的核心机构。',
    background:
      '明治时期政府与获准银行发行多种纸币，战争融资与通胀使财政整理和货币信用成为改革课题。',
    details: ['1882年指设立和开业，日本银行券则到1885年开始发行，不能把两件事写成同一年。'],
    impact:
      '新机构帮助集中纸币发行及金融安排，但制度整顿也伴随紧缩和社会成本，应放在更广的经济变化中理解。',
    people: [],
    sources: [
      {
        title: '日本银行 · History',
        url: 'https://www.boj.or.jp/en/about/outline/history/',
        note: '1882年6月法律、10月10日开业；另参发行史区分1885年首批银行券。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },
  {
    id: 'category-pantheon',
    year: 125,
    title: '哈德良时期重建罗马万神殿',
    category: '社会',
    region: 'europe',
    themes: ['工程建筑', '宗教'],
    location: '罗马',
    coordinates: [12.48, 41.9],
    summary: '万神殿在哈德良时期形成今日可见的主要形制，以门廊、圆厅和混凝土穹顶组织空间。',
    background: '罗马帝国工程结合材料供应、建筑技术与皇权表达；现存建筑也取代了同址的早期建筑。',
    details: [
      '官方馆方把现存形制置于118—125年。125年只是这一营建阶段的末端参照，穹顶、装饰与后来的用途仍各有历史。',
    ],
    impact: '建筑成为研究古罗马混凝土、穹顶与空间设计的重要实物，也经长期使用和维护延续。',
    people: [],
    sources: [
      {
        title: '意大利文化部罗马国家博物馆管理局 · Pantheon',
        url: 'https://direzionemuseiroma.cultura.gov.it/pantheon/',
        note: '历史介绍将现存形制定于哈德良初期118—125年。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
    dateLabel: '约118—125年',
    dateNote: '时间轴以125年定位重建阶段；施工与落成细节仍有学术讨论。',
  },
  {
    id: 'category-hagia-sophia',
    year: 537,
    title: '查士丁尼重建的圣索菲亚教堂启用',
    category: '社会',
    region: 'europe',
    themes: ['工程建筑', '宗教', '文学艺术'],
    location: '君士坦丁堡',
    coordinates: [28.98, 41.01],
    summary:
      '查士丁尼下令重建的圣索菲亚教堂于537年启用，以中央穹顶、半穹顶与拱券形成大型礼仪空间。',
    background: '532年尼卡暴动烧毁前一座教堂，重建工程也成为帝国恢复城市与展示宗教权威的计划。',
    details: [
      '安提米乌斯与伊西多鲁斯主持设计，最初穹顶在558年倒塌后重建。今日建筑不能等同于537年未经改变的原貌。',
    ],
    impact: '圣索菲亚成为拜占庭建筑的重要参照，后来的修复和宗教用途变迁使它呈现多层历史。',
    people: [],
    sources: [
      {
        title: '大都会艺术博物馆 · Hagia Sophia, 532–37',
        url: 'https://www.metmuseum.org/essays/hagia-sophia-532-37',
        note: '记537年12月27日启用，以及558年穹顶倒塌、562年重建。',
      },
    ],
    importance: 5,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },
  {
    id: 'category-zhaozhou',
    year: 605,
    title: '赵州桥建成的常用纪年',
    category: '社会',
    region: 'china',
    themes: ['工程建筑'],
    location: '赵州洨河',
    coordinates: [114.76, 37.72],
    summary: '隋代赵州桥以敞肩石拱跨越洨河，主拱两肩的小拱兼顾减重与过水。',
    background: '道路、水道与区域交通需要耐久桥梁，石工经验与结构安排共同决定桥体的稳定和使用。',
    details: [
      '605年是工程史常用的完成年，具体营建过程有不同考证。桥栏等构件历代修补，现存形态不能全部归于隋代。',
    ],
    impact:
      '桥体提供观察中国古代石拱设计的实物材料，工程意义来自结构与施工经验，而不只是“最早”称号。',
    people: [],
    sources: [
      {
        title: '美国土木工程师学会 · Zhaozhou Bridge',
        url: 'https://www.asce.org/about-civil-engineering/history-and-heritage/historic-landmarks/zhaozhou-bridge',
        note: 'Completion Date列605，正文说明敞肩拱、李春及历代栏杆更换。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
    dateLabel: '约605年',
    dateNote: '采用工程史常用完成年，保留营建年代的约略性。',
  },
  {
    id: 'category-yingxian',
    year: 1056,
    title: '应县佛宫寺释迦塔建成',
    category: '社会',
    region: 'china',
    themes: ['工程建筑', '宗教'],
    location: '应县佛宫寺',
    coordinates: [113.18, 39.57],
    summary: '辽代应县木塔建成，利用多层木构、斗栱与内部层次组织高大的佛塔空间。',
    background:
      '辽代佛教供养与北方木作技术相结合，寺院工程既关乎宗教象征，也依赖材料、匠作和长期维护。',
    details: ['1056年为常用建成年。外观层数与内部实际结构层次不同，不能仅凭外观计数理解承重体系。'],
    impact: '木塔为研究中国高层木构、抗侧向变形与历史修缮提供罕见实物；存续也有赖于后世维修。',
    people: [],
    sources: [
      {
        title: 'UNESCO预备清单 · Wooden Structures of Liao Dynasty',
        url: 'https://whc.unesco.org/en/tentativelists/5803/',
        note: 'Description及I. Wooden Pagoda of Yingxian列1056年与结构信息；为预备清单，不写作已列世界遗产。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },
  {
    id: 'category-florence-dome',
    year: 1436,
    title: '布鲁内莱斯基完成佛罗伦萨主穹顶',
    category: '社会',
    region: 'europe',
    themes: ['工程建筑', '文学艺术'],
    location: '佛罗伦萨',
    coordinates: [11.26, 43.77],
    summary:
      '佛罗伦萨圣母百花大教堂主穹顶在布鲁内莱斯基主持下完成主要施工，成为文艺复兴工程的重要节点。',
    background: '教堂此前留下巨大的待覆盖空间，如何组织砌筑、运输与施工中的稳定是长期难题。',
    details: [
      '主穹顶在1420—1436年营建，双壳、肋架与砖砌方式协同工作；顶部采光亭等部分在后来完成，1436年不是整个建筑所有工程的终点。',
    ],
    impact: '工程展示设计、机械设备与现场组织的结合，也改变了建筑师在艺术与技术之间的职业地位。',
    people: [],
    sources: [
      {
        title: '佛罗伦萨主教座堂工程处 · Dome',
        url: 'https://duomo.firenze.it/en/40/dome',
        note: '官方介绍记1420—1436年、双壳与肋架；不把后来采光亭并入主穹顶完成年。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },
  {
    id: 'category-brooklyn',
    year: 1883,
    title: '布鲁克林大桥通车',
    category: '社会',
    region: 'americas',
    themes: ['工程建筑', '交流'],
    location: '纽约东河',
    coordinates: [-73.997, 40.706],
    summary:
      '布鲁克林大桥于1883年5月24日通车，把当时的纽约与布鲁克林通过跨东河的固定通道连接起来。',
    background: '城市扩展使渡运面临更大压力，桥梁建设需要协调大型基础工程、悬索技术、融资与劳动。',
    details: [
      '大桥启用后改善往来，也发生拥挤踩踏等事故。纪念工程成就时，同样需要看到施工风险与公众使用中的管理问题。',
    ],
    impact: '桥梁重塑城市交通与联系，成为19世纪大型土木工程和都市扩展相互作用的案例。',
    people: [],
    sources: [
      {
        title: '美国国会图书馆 · Brooklyn Bridge, Fanfare and Fatalities',
        url: 'https://guides.loc.gov/chronicling-america-brooklyn-bridge',
        note: 'Introduction及Timeline列1883年5月24日开放，附同期报纸原始史料入口。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },
  {
    id: 'category-eiffel',
    year: 1889,
    title: '埃菲尔铁塔完成主体工程',
    category: '社会',
    region: 'europe',
    themes: ['工程建筑'],
    location: '巴黎',
    coordinates: [2.295, 48.858],
    summary: '为1889年巴黎世界博览会营建的铁塔完成主体结构，3月31日举行落成纪念仪式。',
    background:
      '工业制造、金属构件预制与大型展览结合，工程也面对城市景观、艺术评价和公众接受的争论。',
    details: [
      '结构在工厂预制后于现场铆接；3月31日时内部和电梯尚未全部完成，不能把主体落成与公众开放、所有设施启用混为一日。',
    ],
    impact: '铁塔展示工业时代材料与施工组织的能力，后来又因城市使用与通信需求获得新的意义。',
    people: [],
    sources: [
      {
        title: '埃菲尔铁塔官方 · 1889–2019: 130 years of amazement',
        url: 'https://www.toureiffel.paris/en/news/130-years/1889-2019-130-years-amazement',
        note: '“March 31, 1889”段区分主体完成、内部施工与电梯尚未安装。',
      },
    ],
    importance: 4,
    locationNote:
      '坐标为所述建筑、出版地或学术中心的阅读参照，不表示相关人物都曾到访，也不代表知识传播的全部范围。',
  },
]
