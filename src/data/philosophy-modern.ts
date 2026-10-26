import type { HistoryEvent, HistoryRegion, Person, Source } from '../types'

const sep = (slug: string, name: string): Source => ({
  title: `Stanford Encyclopedia of Philosophy · ${name}`,
  url: `https://plato.stanford.edu/entries/${slug}/`,
  note: '参见生平、主要著作与书目；本站以独立中文说明论题，出版纪年不等于作者行程。',
})
const references: Record<string, Source> = {
  sartre: sep('sartre', 'Jean-Paul Sartre'),
  beauvoir: sep('beauvoir', 'Simone de Beauvoir'),
  heidegger: sep('heidegger', 'Martin Heidegger'),
  wittgenstein: sep('wittgenstein', 'Ludwig Wittgenstein'),
  russell: sep('russell', 'Bertrand Russell'),
  whitehead: sep('whitehead', 'Alfred North Whitehead'),
  husserl: sep('husserl', 'Edmund Husserl'),
  merleau: sep('merleau-ponty', 'Maurice Merleau-Ponty'),
  camus: sep('camus', 'Albert Camus'),
  popper: sep('popper', 'Karl Popper'),
  kuhn: sep('thomas-kuhn', 'Thomas Kuhn'),
  arendt: sep('arendt', 'Hannah Arendt'),
  rawls: sep('rawls', 'John Rawls'),
  nozick: sep('nozick-political', 'Robert Nozick’s Political Philosophy'),
  horkheimer: sep('horkheimer', 'Max Horkheimer'),
  adorno: sep('adorno', 'Theodor W. Adorno'),
  habermas: sep('habermas', 'Jürgen Habermas'),
  foucault: sep('foucault', 'Michel Foucault'),
  derrida: sep('derrida', 'Jacques Derrida'),
  dewey: sep('dewey', 'John Dewey'),
  peirce: sep('peirce', 'Charles Sanders Peirce'),
  quine: sep('quine', 'Willard Van Orman Quine'),
  austin: sep('austin-jl', 'John Langshaw Austin'),
  gadamer: sep('gadamer', 'Hans-Georg Gadamer'),
  levinas: sep('levinas', 'Emmanuel Levinas'),
  ryle: sep('ryle', 'Gilbert Ryle'),
  bergson: sep('bergson', 'Henri Bergson'),
  weil: sep('simone-weil', 'Simone Weil'),
  more: sep('thomas-more', 'Thomas More'),
  epictetus: sep('epictetus', 'Epictetus'),
  marcus: sep('marcus-aurelius', 'Marcus Aurelius'),
  sextus: sep('sextus-empiricus', 'Sextus Empiricus'),
  liang: sep('confucianism-modern', 'Modern Confucianism'),
  mou: sep('confucianism-modern', 'Modern Confucianism'),
  xiong: {
    title: '法鼓文理学院 · Database of Modern Chinese Buddhism · Xiong Shili',
    url: 'https://dmcb.dila.edu.tw/dmcb/Xiong_Shili_%E7%86%8A%E5%8D%81%E5%8A%9B',
    note: '生卒、北京大学讲授及1932年《新唯识论》文言本的出版。',
  },
  feng: {
    title: 'Internet Encyclopedia of Philosophy · Feng Youlan',
    url: 'https://iep.utm.edu/feng/',
    note: '生平、哲学史研究与新理学；1931、1934两卷纪年另见中国哲学史总览。',
  },
  suzuki: {
    title: '金泽市铃木大拙馆 · 大拙年谱',
    url: 'https://www.kanazawa-museum.jp/daisetz/about.html',
    note: '年谱列1870—1966年及1927年英文Essays in Zen Buddhism第一集，后两集为1933、1934年。',
  },
  nishida: sep('nishida-kitaro', 'Nishida Kitarō'),
  nishitani: sep('kyoto-school', 'The Kyoto School'),
  ambedkar: {
    title: 'Columbia University · Annihilation of Caste: About This MSE',
    url: 'https://ccnmtl.columbia.edu/projects/mmt/ambedkar/about.html',
    note: '安贝德卡生卒、1936年未获发表的演讲与孟买自印版本；全文据马哈拉施特拉邦政府文集。',
  },
  tagore: {
    title: 'Visva-Bharati University · Tagore bibliography: English works',
    url: 'https://www.visvabharati.ac.in/ENGLISH.html',
    note: 'Sadhana条目明确伦敦Macmillan出版社1913年10月及美国演讲背景；不是《吉檀迦利》。',
  },
  krishnamurti: {
    title: 'Krishnamurti Foundation Trust · Dissolution Speech',
    url: 'https://kfoundation.org/dissolution-speech/',
    note: '保存1929年8月3日奥门解散东方明星社演讲，并说明组织背景。',
  },
  kripke: {
    title: 'Princeton University · Saul Kripke: Naming and Necessity',
    url: 'https://collaborate.princeton.edu/en/publications/saul-kripke-naming-and-necessity/',
    note: 'John P. Burgess的研究章节摘要，明确1970年普林斯顿讲座、1972年论文版及1980年单行本。',
  },
  hushi: {
    title: '中央研究院胡适纪念馆 · 传略（著述年表）',
    url: 'https://hushih.mh.sinica.edu.tw/Hushih_Content?mid=116',
    note: '传略列1891—1962年；1917年北大中国哲学史教学及1919年2月《中国哲学史大纲》上卷出版。',
  },
  chenduxiu: {
    title: '北京大学图书馆 · 新文化运动与北京大学百年展',
    url: 'https://www.lib.pku.edu.cn/portal/cn/news/0000001085',
    note: '展览说明明确1915年9月15日《青年杂志》创刊，1916年9月第二卷起改名《新青年》。',
  },
  mao: {
    title: '中共中央党史和文献研究院 · 《辩证法唯物论（讲授提纲）》早期版本研究',
    url: 'https://www.dswxyjy.org.cn/BIG5/n1/2019/0621/c423733-31173718.html',
    note: '奚景鹏《党的文献》2007年第4期文章，列1937年讲授、早期油印本及1950—1952年修改发表的版本区别。',
  },
  jin: {
    title: '国家图书馆 · 台湾华文电子书库《论道》初版题录',
    url: 'https://taiwanebook.ncl.edu.tw/zh-tw/book/NCL-9910006682',
    note: '国家图书馆藏书题录：金岳霖著、商务、1940年、初版；生卒及理论内容另据商务印书馆。',
  },
  tang: sep('confucianism-modern', 'Modern Confucianism'),
}

type PersonSeed = {
  key: string
  name: string
  aliases: string[]
  birth: number | null
  death: number | null
  summary: string
  biography: string
  moreSources?: Source[]
}
const seeds: PersonSeed[] = [
  {
    key: 'sartre',
    name: '让-保罗·萨特',
    aliases: ['萨特', 'Jean-Paul Sartre', 'Sartre'],
    birth: 1905,
    death: 1980,
    summary: '法国存在主义哲学家、作家，围绕自由、处境、他人与历史实践展开论说。',
    biography:
      '萨特把现象学对意识的分析与文学表达结合起来，以《恶心》《存在与虚无》等作品讨论偶然性、自由和自欺。人的选择总在具体处境中发生，不能把其自由论简化为人能不受条件限制地做到任何事。\n\n战后，他通过演讲、杂志与政治写作参与公共争论，并在《辩证理性批判》中研究个体实践和集体历史的关系。其早期本体论与后期社会理论之间既有延续，也存在受到持续讨论的变化。',
  },
  {
    key: 'beauvoir',
    name: '西蒙娜·德·波伏瓦',
    aliases: ['波伏瓦', 'Simone de Beauvoir'],
    birth: 1908,
    death: 1986,
    summary: '法国哲学家与作家，研究处境中的自由、伦理责任和女性作为他者的社会形成。',
    biography:
      '波伏瓦以小说、哲学论述和自传讨论人与他人的依存关系。她关注自由如何受到身体、制度和历史条件塑造，反对把伦理困境交给抽象而绝对的答案。\n\n《第二性》通过历史、神话与生活经验分析女性如何被塑造为他者，对女性主义产生长远影响。她与萨特保持密切思想交流，但其伦理学和性别分析具有独立的问题与论证，不能只作为他人的附属阅读。',
  },
  {
    key: 'heidegger',
    name: '马丁·海德格尔',
    aliases: ['海德格尔', 'Martin Heidegger'],
    birth: 1889,
    death: 1976,
    summary: '德国哲学家，以此在、在世存在和时间性重新提出存在问题。',
    biography:
      '海德格尔在现象学背景下追问人如何理解存在。《存在与时间》把日常实践、他人、焦虑与死亡放在分析中心，试图避免把人首先理解为与世界隔离的认识主体。\n\n其后期思考转向存在史、语言与技术等问题。其纳粹时期的政治参与及相关文本也是理解和批判其思想不可回避的历史问题，不能以哲学影响力取消对这些关联的审视。',
  },
  {
    key: 'wittgenstein',
    name: '路德维希·维特根斯坦',
    aliases: ['维特根斯坦', 'Ludwig Wittgenstein'],
    birth: 1889,
    death: 1951,
    summary: '研究逻辑、语言和生活形式的哲学家，早晚期作品之间有重要的自我修正。',
    biography:
      '维特根斯坦早期在《逻辑哲学论》中研究语言如何描绘世界，以及有意义表达的边界。他在书中所处理的逻辑、伦理与不可说问题，并不等于一种简单的科学主义。\n\n晚期《哲学研究》转向语言在多样活动中的实际使用，讨论规则、理解和私人语言。许多著作由遗稿整理后出版，作品问世年份不能反过来当作本人当年的活动或讲授。',
  },
  {
    key: 'russell',
    name: '伯特兰·罗素',
    aliases: ['罗素', 'Bertrand Russell'],
    birth: 1872,
    death: 1970,
    summary: '英国哲学家与逻辑学家，参与逻辑主义、摹状词理论和分析哲学的发展。',
    biography:
      '罗素试图运用逻辑分析澄清数学、语言和知识的基础，与怀特海合写《数学原理》。集合悖论、类型理论和关于指称的研究，成为二十世纪逻辑与语言哲学的重要材料。\n\n他也广泛参与教育、宗教和政治的公共讨论。其各阶段的哲学立场多次变化，逻辑方面的贡献与公共政治主张需要分别考察，不能用单一标签概括其漫长的思想生涯。',
  },
  {
    key: 'whitehead',
    name: '阿尔弗雷德·诺思·怀特海',
    aliases: ['怀特海', 'Alfred North Whitehead'],
    birth: 1861,
    death: 1947,
    summary: '英国数学家与哲学家，参与《数学原理》写作，后来发展过程哲学。',
    biography:
      '怀特海早期研究数学和逻辑，与罗素合作建立形式化的数学基础。他随后转向物理学、自然概念及教育问题，试图理解科学的抽象方式与具体经验之间的关系。\n\n在美国时期，他把生成、关系和事件置于形而上学中心，形成过程哲学。早年的逻辑研究与后期宇宙论存在延续，但不能把《数学原理》直接当作过程哲学的成熟表达。',
  },
  {
    key: 'merleau',
    name: '莫里斯·梅洛-庞蒂',
    aliases: ['梅洛-庞蒂', '梅洛庞蒂', 'Maurice Merleau-Ponty'],
    birth: 1908,
    death: 1961,
    summary: '法国现象学家，强调身体、知觉与人与世界的交织。',
    biography:
      '梅洛-庞蒂把现象学与心理学、神经病理材料相互参照，讨论身体如何使人进入一个有意义的世界。身体并非单纯受心灵指挥的物体，而是知觉和行动的条件。\n\n他也研究语言、艺术、历史与政治，晚期转向更广泛的存在论。其论述既批评机械解释，也避免把经验完全归为自由意识的创造；这些张力使其思想持续进入认知和社会理论讨论。',
  },
  {
    key: 'camus',
    name: '阿尔贝·加缪',
    aliases: ['加缪', 'Albert Camus'],
    birth: 1913,
    death: 1960,
    summary: '法国阿尔及利亚出身的作家与思想家，研究荒诞、反抗和暴力的限度。',
    biography:
      '加缪通过随笔、小说与戏剧探讨人在缺乏终极意义保证时如何生活。《西西弗神话》把荒诞理解为人的意义要求与世界沉默之间的张力，而不是一种鼓励绝望的生活结论。\n\n《反抗者》追问反抗何时变为压迫，并批判以未来理想正当化当下杀戮。他与存在主义者关系复杂，也拒绝简单接受存在主义标签，其思想应连同殖民阿尔及利亚的处境和争论阅读。',
  },
  {
    key: 'popper',
    name: '卡尔·波普尔',
    aliases: ['波普尔', 'Karl Popper'],
    birth: 1902,
    death: 1994,
    summary: '科学哲学家与社会思想家，以可证伪性、批判理性和开放社会著称。',
    biography:
      '波普尔反对用不断累积的有利事例来证明普遍理论，强调理论应接受可能失败的严厉检验。其科学观并非认为一次观察就能机械地决定任何理论的存废。\n\n在政治思想中，他批评宣称掌握历史必然规律的理论，提倡可批评、可修正的制度。科学方法论与社会哲学共享反教条取向，但二者的适用条件和论证仍需分别说明。',
  },
  {
    key: 'kuhn',
    name: '托马斯·库恩',
    aliases: ['库恩', 'Thomas Kuhn'],
    birth: 1922,
    death: 1996,
    summary: '美国科学史家与哲学家，研究范式、常规科学与科学革命。',
    biography:
      '库恩从具体科学史研究出发，关注科学共同体如何学习范例、解决问题以及维持研究标准。《科学革命的结构》挑战科学只靠事实逐项累积的线性图景。\n\n他的范式和不可通约概念引发长期争论，也在后续著作中获得修订。不可通约并非声称不同理论绝对无法比较，更不意味着科学变化只由任意的群体偏好决定。',
  },
  {
    key: 'arendt',
    name: '汉娜·阿伦特',
    aliases: ['阿伦特', 'Hannah Arendt'],
    birth: 1906,
    death: 1975,
    summary: '政治思想家，研究极权主义、公共行动、判断和人的多元性。',
    biography:
      '阿伦特在流亡和战后经验中研究现代政治的破坏力。《极权主义的起源》把反犹主义、帝国主义和极权制度联系起来，作品的解释范围与概念使用也持续受到讨论。\n\n《人的境况》区分劳动、工作与行动，强调人们在公共世界中彼此显现和共同开始新事物的能力。她的政治理论不等于国家管理技术，而是追问多元的人如何共享世界。',
  },
  {
    key: 'rawls',
    name: '约翰·罗尔斯',
    aliases: ['罗尔斯', 'John Rawls'],
    birth: 1921,
    death: 2002,
    summary: '美国政治哲学家，以作为公平的正义重新讨论自由、平等与社会合作。',
    biography:
      '罗尔斯通过原初状态和无知之幕构造一种选择正义原则的思想实验，要求避免以个人既得优势支配公共规则。他重视基本自由及社会经济不平等的制度条件。\n\n后期政治自由主义进一步处理多元世界观中的正当政治权力与公共理由。理想化的理论装置旨在澄清论证标准，不能被误当作社会中真实发生过的契约会议。',
  },
  {
    key: 'nozick',
    name: '罗伯特·诺齐克',
    aliases: ['诺齐克', 'Robert Nozick'],
    birth: 1938,
    death: 2002,
    summary: '美国哲学家，以个人权利、持有正义及最小国家理论参与政治哲学争论。',
    biography:
      '诺齐克在《无政府、国家与乌托邦》中以个人权利作为国家行动的约束，讨论一个最小国家如何可能获得正当性。他的持有正义强调取得、转让与矫正的历史过程。\n\n这些论证与罗尔斯的分配正义形成鲜明对话，但不能概括为对一切现实财产分布的无条件认可。他在认识论和价值论等领域也有广泛研究，政治著作只是其思想的一部分。',
  },
  {
    key: 'horkheimer',
    name: '马克斯·霍克海默',
    aliases: ['霍克海默', 'Max Horkheimer'],
    birth: 1895,
    death: 1973,
    summary: '法兰克福学派思想家，发展批判理论并研究理性、社会与支配。',
    biography:
      '霍克海默把哲学与社会科学研究结合，追问理论工作本身所处的社会关系。他区分传统理论与批判理论，强调社会认识不能把既存制度当作不需解释的自然事实。\n\n流亡时期，他与阿多诺反思启蒙、工具理性和大众文化中的支配机制。批判理论并非拒绝所有理性，而是检验理性如何在具体制度中既带来解放可能又服务于控制。',
  },
  {
    key: 'adorno',
    name: '西奥多·阿多诺',
    aliases: ['阿多诺', 'Theodor W. Adorno'],
    birth: 1903,
    death: 1969,
    summary: '德国哲学家、社会理论家与音乐批评家，研究文化工业、非同一性和现代社会。',
    biography:
      '阿多诺把哲学、音乐分析和社会批判相互联结，与霍克海默共同研究启蒙理性和支配关系。他关注文化商品化如何组织经验，批评把人的差异压入统一概念与管理模式。\n\n其否定辩证法试图保存对象不能被概念穷尽的部分。这不是把一切论证化约为否定，而是要求思想检验自身的概括和现实中的痛苦之间的距离。',
  },
  {
    key: 'habermas',
    name: '尤尔根·哈贝马斯',
    aliases: ['哈贝马斯', 'Jürgen Habermas', 'Jurgen Habermas'],
    birth: 1929,
    death: 2026,
    summary: '德国哲学家与社会理论家，研究公共领域、交往理性及民主正当性。',
    biography:
      '哈贝马斯从批判理论传统出发，研究现代社会中公共讨论的历史条件。他强调人们能够通过提出理由、回应异议和检验有效性要求来协调行动。\n\n交往行为理论区分生活世界与系统，讨论金钱和行政权力如何改变社会整合。其民主理论并不假设现实讨论已完全平等，而是用可质疑的程序条件衡量权力与正当性的关系。',
    moreSources: [
      {
        title: 'Goethe University Frankfurt · Mourning Jürgen Habermas',
        url: 'https://www.uni-frankfurt.de/en/newsroom/meldungen/pressemitteilungen/2026/die-goethe-universitaet-trauert-um-juergen-habermas',
        note: '大学正式悼念，核对2026年去世；与SEP当前条目1929—2026一致。',
      },
    ],
  },
  {
    key: 'foucault',
    name: '米歇尔·福柯',
    aliases: ['福柯', 'Michel Foucault'],
    birth: 1926,
    death: 1984,
    summary: '法国哲学家与历史研究者，考察知识、权力、规训和主体的形成。',
    biography:
      '福柯研究疯癫、医学、人文科学与监狱的历史，关注某些分类和真理标准如何在具体制度中出现。他把被视为理所当然的对象重新放回档案、实践和历史变化之中。\n\n其后期研究转向性、治理与自我实践。知识与权力相互关联并不等于所有知识都是虚假，也不意味着权力只有一个中心；其分析要求追踪关系和机制。',
  },
  {
    key: 'derrida',
    name: '雅克·德里达',
    aliases: ['德里达', 'Jacques Derrida'],
    birth: 1930,
    death: 2004,
    summary: '法国哲学家，以解构研究书写、差异和概念体系内部的张力。',
    biography:
      '德里达通过细读哲学和文学文本，追问意义为何不能完全由一个自足的中心保证。他对书写、声音和差异的分析，揭示文本赖以运作却常被排除的条件。\n\n解构不是任意拆毁或宣称任何解释都成立，而是要求对概念中的依赖和不稳定保持耐心。他后来也研究法律、友谊、好客和政治责任，思想影响跨越多个学科。',
  },
  {
    key: 'dewey',
    name: '约翰·杜威',
    aliases: ['杜威', 'John Dewey'],
    birth: 1859,
    death: 1952,
    summary: '美国实用主义哲学家与教育思想家，强调经验、探究和民主共同生活。',
    biography:
      '杜威把经验理解为有机体与环境的持续互动，反对把认识分成封闭心灵与外部世界。他以探究如何解决不确定情境为线索，讨论逻辑、伦理和社会制度。\n\n在教育理论中，学习与共同活动和反思相连，民主也不仅是选举形式，而是共享经验的生活方式。其实验性立场并不等于只重眼前功用或否认知识的严谨性。',
  },
  {
    key: 'peirce',
    name: '查尔斯·桑德斯·皮尔士',
    aliases: ['皮尔士', 'Charles Sanders Peirce', 'Peirce'],
    birth: 1839,
    death: 1914,
    summary: '美国逻辑学家与实用主义奠基者，研究符号、探究和概念的可检验后果。',
    biography:
      '皮尔士把逻辑研究与科学实践结合，关注信念、怀疑和共同探究如何运作。他以概念可能产生的实际可经验后果澄清其意义，为实用主义提供早期表述。\n\n其思想还涉及符号分类、概率推理和形而上学，不能缩减为追求短期利益。他后来使用实效主义一词区分自身立场与其他实用主义版本，显示这一传统内部并非没有分歧。',
  },
  {
    key: 'quine',
    name: '威拉德·范·奥曼·奎因',
    aliases: ['奎因', 'Willard Van Orman Quine', 'W. V. O. Quine'],
    birth: 1908,
    death: 2000,
    summary: '美国逻辑学家与哲学家，批评分析与综合的锐利区分，强调知识的整体联系。',
    biography:
      '奎因的工作横跨逻辑、语言、认识论与本体论。《经验论的两个教条》质疑某些意义论假设，并把理论陈述放入整体经验检验的网络中。\n\n其自然主义不在哲学和科学之间设置绝对边界，翻译与指称研究也挑战语言意义的简单图景。这些论证不等于所有判断同样可靠，而是要求解释理论如何与经验相连。',
  },
  {
    key: 'austin',
    name: '约翰·朗肖·奥斯汀',
    aliases: ['奥斯汀', 'J. L. Austin', 'John Langshaw Austin'],
    birth: 1911,
    death: 1960,
    summary: '英国哲学家，分析日常语言如何在具体语境中完成承诺、命名等行动。',
    biography:
      '奥斯汀以细致的语言辨析研究知识、行动和责任，反对把日常表达过早套进单一理论。他指出，人们说话时不仅描述事实，也可能实施制度与社会行动。\n\n《如何以言行事》源于讲座并在其去世后整理出版，施事、言内与言后效果等区分深刻影响语言哲学。其观点仍要求考察话语成立的情境，而非认为任何说法都能自动改变现实。',
  },
  {
    key: 'kripke',
    name: '索尔·克里普克',
    aliases: ['克里普克', 'Saul Kripke'],
    birth: 1940,
    death: 2022,
    summary: '美国逻辑学家与哲学家，研究模态逻辑、命名、必然性和规则。',
    biography:
      '克里普克早年即在模态逻辑中作出重要贡献，后来把形式研究与语言、知识和形而上学的争论联系起来。他的命名理论区分名称如何固定指称与名称的意义。\n\n《命名与必然性》讨论刚性指示词、后验必然与先验偶然，挑战把必然性等同于先验可知的传统看法。其论说先作为讲座和论文出现，单行本问世时间应与这些阶段分开。',
    moreSources: [
      {
        title: 'CUNY Graduate Center · About the Saul Kripke Center',
        url: 'https://www.gc.cuny.edu/saul-kripke-center/about-saul-kripke-center',
        note: '人物生卒1940—2022及逻辑、指称研究背景。',
      },
    ],
  },
  {
    key: 'gadamer',
    name: '汉斯-格奥尔格·伽达默尔',
    aliases: ['伽达默尔', 'Hans-Georg Gadamer'],
    birth: 1900,
    death: 2002,
    summary: '德国哲学家，以哲学诠释学讨论理解、传统、语言与对话。',
    biography:
      '伽达默尔在古典学和海德格尔思想的背景下研究理解如何发生。他强调解释者总带着历史形成的问题和预期进入文本，理解因而并非从完全无前提的立场开始。\n\n《真理与方法》讨论艺术经验、历史意识和语言，提出视域融合等概念。这不意味着任何偏见都应被保留，而是要求在与对象和他人的对话中持续检验自身预设。',
  },
  {
    key: 'levinas',
    name: '伊曼纽尔·列维纳斯',
    aliases: ['列维纳斯', 'Emmanuel Levinas'],
    birth: 1905,
    death: 1995,
    summary: '以他者、面容与责任为中心的哲学家，主张伦理具有第一哲学的地位。',
    biography:
      '列维纳斯从现象学出发，把与他人的相遇放在哲学中心。他关切他者为何不能被完全归入自我的知识和占有，责任也不能只由互利契约解释。\n\n《总体与无限》等著作通过面容、言说和主体间关系反思西方本体论。其伦理论述不同于一套简单的行为规则，而是追问规则和判断出现以前，人与他人已经处于何种关系。',
  },
  {
    key: 'ryle',
    name: '吉尔伯特·赖尔',
    aliases: ['赖尔', 'Gilbert Ryle'],
    birth: 1900,
    death: 1976,
    summary: '英国分析哲学家，批评心灵二元论中的范畴错误。',
    biography:
      '赖尔以概念分析研究心灵、知识和行动，批评把心理生活想成身体内部另一个隐秘实体。《心的概念》通过能力、倾向和实践中的表现重新讨论心理词汇。\n\n其论证不宜直接等同于否认主观经验，或把所有心理状态都压缩为单次可见动作。他的范畴错误方法旨在说明，一些哲学难题可能来自把概念放进不适当的逻辑位置。',
  },
  {
    key: 'bergson',
    name: '亨利·柏格森',
    aliases: ['柏格森', 'Henri Bergson'],
    birth: 1859,
    death: 1941,
    summary: '法国哲学家，研究绵延、记忆、直觉和生命的创造性。',
    biography:
      '柏格森反对把意识中的时间完全等同于钟表刻度，强调经验中的绵延包含质的变化与互相渗透。他也研究记忆、感知和身心关系。\n\n《创造进化》把变化和新颖性放入生命研究的哲学讨论中，对欧洲及东亚思想产生影响。其生命冲力概念不能直接作为现代生物学已经证明的机制，而应连同当时的科学与哲学争论阅读。',
  },
  {
    key: 'weil',
    name: '西蒙娜·薇依',
    aliases: ['薇依', 'Simone Weil'],
    birth: 1909,
    death: 1943,
    summary: '法国哲学家，研究劳动、压迫、注意力和对他人苦难的责任。',
    biography:
      '薇依把哲学思考与工厂劳动、政治实践和宗教经验相互联系，关注支配如何进入日常劳动和人的精神生活。其文字常在不同立场之间保留紧张关系。\n\n她的大量著作在去世后由手稿、笔记和书信整理出版。《压迫与自由》中的论述涉及工人处境及政治组织，不能把合集的出版年份当作她本人仍在参与的政治事件。',
  },
  {
    key: 'liang',
    name: '梁漱溟',
    aliases: ['Liang Shuming', '梁漱溟'],
    birth: 1893,
    death: 1988,
    summary: '中国思想家，比较中西印文化，研究儒学、人生与乡村社会。',
    biography:
      '梁漱溟在佛学与儒学之间展开思想探索，借比较文化讨论中国如何面对现代转型。《东西文化及其哲学》把不同文化理解为不同生活态度，相关概括本身也需要接受历史检验。\n\n他后来参与乡村建设，把伦理关系、社会组织和教育问题联系起来。其文化论不等于主张简单拒绝外来知识，实践中的方案和对现代制度的判断也经历变化。',
    moreSources: [
      {
        title: 'Princeton University · Rethinking the Twentieth Century Denigration',
        url: 'https://www.princeton.edu/~elman/documents/Rethinking_the_Twentieth_Century_Denigration.pdf',
        note: '记梁漱溟1893—1988、1921年讲演与出版背景。',
      },
    ],
  },
  {
    key: 'xiong',
    name: '熊十力',
    aliases: ['Xiong Shili'],
    birth: 1885,
    death: 1968,
    summary: '中国现代哲学家，以《新唯识论》重新解释心、体用与认识。',
    biography:
      '熊十力在佛教唯识学研究中发展出自己的批评，试图贯通儒家修养与关于现实根本的说明。《新唯识论》区分日常分辨知识与对本心的体认。\n\n其哲学强调体用不二及心与世界的联系，不能仅作为传统佛学的重复。后来现代新儒学作者接受、改写或批评了他的论点，形成并不完全一致的思想方向。',
  },
  {
    key: 'feng',
    name: '冯友兰',
    aliases: ['Feng Youlan', 'Fung Yu-lan', '馮友蘭'],
    birth: 1895,
    death: 1990,
    summary: '中国哲学史家与哲学家，以现代学科方法整理思想史并建立新理学。',
    biography:
      '冯友兰接受中国经典与现代西方哲学训练，通过概念分析和史料整理重写中国哲学史。他的两卷《中国哲学史》为现代学术研究建立了有影响的叙述框架。\n\n他同时试图把宋明理学与现代哲学方法重新结合，形成新理学。其学术生涯跨越长期政治与制度变化，不同阶段的著述与自我解释应分别辨析，不能把所有修订当成同一版本。',
  },
  {
    key: 'mou',
    name: '牟宗三',
    aliases: ['Mou Zongsan'],
    birth: 1909,
    death: 1995,
    summary: '现代新儒家哲学家，重释心性论，并与康德哲学展开系统对话。',
    biography:
      '牟宗三在逻辑与西方哲学研究之后，着力重建儒家道德主体的理论基础。他研读宋明儒学，把心性、本体和道德实践的问题联系起来。\n\n《心体与性体》等著作以不同思想系统的区分重新编排儒学传统，后期又深入讨论智的直觉与康德。这些分类与论证影响广泛，也持续受到思想史和哲学层面的批评。',
  },
  {
    key: 'suzuki',
    name: '铃木大拙',
    aliases: ['鈴木大拙', 'D. T. Suzuki', 'Daisetz Teitaro Suzuki'],
    birth: 1870,
    death: 1966,
    summary: '日本佛教思想家与译介者，以英语著述向国际读者解释禅学。',
    biography:
      '铃木大拙通过英文出版、讲授与佛教文本翻译参与东西方宗教思想交流。他把禅的实践、经验与经典材料组织为适合国际讨论的表达。\n\n这些写作对现代禅的理解影响深远，也因其对经验、传统与日本文化关系的概括受到批评。读者须区分历史上的多样禅宗实践与他为特定时代读者提出的解释。',
  },
  {
    key: 'nishitani',
    name: '西谷启治',
    aliases: ['西谷啓治', 'Nishitani Keiji', 'Keiji Nishitani'],
    birth: 1900,
    death: 1990,
    summary: '日本京都学派哲学家，以空、虚无主义和宗教经验讨论现代人的存在。',
    biography:
      '西谷启治继承并批评西田等人的思想，也与欧洲哲学和现代虚无主义问题对话。他追问，当传统意义根据失效时，人如何理解自身和世界。\n\n《宗教是什么》等论述借佛教空的视角重新考察主体、存在与宗教。其政治时期的表达及京都学派的历史责任也存在争论，哲学比较不能把这些历史背景抹去。',
  },
  {
    key: 'ambedkar',
    name: '比姆拉奥·拉姆吉·安贝德卡',
    aliases: ['安贝德卡', 'B. R. Ambedkar', 'Bhimrao Ramji Ambedkar'],
    birth: 1891,
    death: 1956,
    summary: '印度思想家与法学家，批评种姓制度并研究平等、民主和社会尊严。',
    biography:
      '安贝德卡把种姓视为社会不平等与制度性排斥的问题，反对仅靠改善个别人的态度来解决。他的论说连接宗教权威、社会组织和人的尊严。\n\n《种姓的消灭》源于一篇未能在原会议上发表的演讲，后由作者自印传播。他也参与印度宪法制定；哲学批判、政治组织与立法工作互相联系，但不能混为同一事件。',
  },
  {
    key: 'tagore',
    name: '罗宾德拉纳特·泰戈尔',
    aliases: ['泰戈尔', 'Rabindranath Tagore'],
    birth: 1861,
    death: 1941,
    summary: '孟加拉作家与思想家，讨论人的精神、自然、教育和跨文化共同生活。',
    biography:
      '泰戈尔的诗歌、随笔和讲演不断讨论人与自然、个人与共同体的关系。他借印度思想资源回应现代社会中的疏离和民族国家问题，而不是只以文学形式记录个人情绪。\n\n《人生的实现》等英语讲演集把精神修养与世界联系起来，其教育实践也强调自由学习与文化交往。不同语言版本和改写之间存在差别，文学获奖、哲学论说与办学应分别阅读。',
    moreSources: [
      {
        title: 'Nobel Prize · Rabindranath Tagore: Facts',
        url: 'https://www.nobelprize.org/prizes/literature/1913/tagore/facts/',
        note: '生卒1861—1941及作家、教育活动基本背景。',
      },
    ],
  },
  {
    key: 'krishnamurti',
    name: '吉杜·克里希那穆提',
    aliases: ['克里希那穆提', 'Jiddu Krishnamurti'],
    birth: 1895,
    death: 1986,
    summary: '印度出身的思想与教育演讲者，强调自由探索并反对精神权威。',
    biography:
      '克里希那穆提少年时期被神智学组织赋予世界导师角色，后来公开拒绝这一安排。他在谈话和学校实践中关注恐惧、注意、关系与人是否能摆脱既有心理模式。\n\n1929年解散东方明星社的演讲是这一转折的明确节点。其反权威主张也要求读者避免把本人重新塑造成不可质疑的导师；演讲中的论点与此后的机构传播需要分开理解。',
    moreSources: [
      {
        title: 'Krishnamurti Foundation Trust · About Us',
        url: 'https://store.kfoundation.org/about-us/',
        note: '基金会记生于1895年、卒于1986年。',
      },
    ],
  },
  {
    key: 'epictetus',
    name: '爱比克泰德',
    aliases: ['Epictetus'],
    birth: null,
    death: null,
    summary: '约活跃于公元1—2世纪的斯多亚哲学家，讨论判断、欲望与内在自由。',
    biography:
      '爱比克泰德的生卒不宜压成完全确定的纪年。他曾处于奴隶身份，后来讲授斯多亚哲学，现存讨论主要由阿里安记录和编排。\n\n其伦理学强调辨别哪些事情取决于人的判断与选择，哪些不由个人控制。这不是对社会处境毫无关切，而是要求人审视价值判断、角色义务与自我训练之间的关系。',
  },
  {
    key: 'marcus',
    name: '马可·奥勒留',
    aliases: ['Marcus Aurelius', '马尔库斯·奥勒留'],
    birth: 121,
    death: 180,
    summary: '罗马皇帝与斯多亚思想实践者，留下关于责任、判断和宇宙共同体的笔记。',
    biography:
      '马可·奥勒留在帝国统治、战争和疫病的处境中进行哲学修养，现称《沉思录》的文本原为自我提醒性质的记录，并非面向现代公众写成的系统教程。\n\n这些笔记讨论如何检验印象、面对变化并履行与他人共同生活的责任。作为皇帝的政治行为和作为修养者的理想之间存在值得追问的距离，不能因为文本强调德性就免除历史评价。',
  },
  {
    key: 'sextus',
    name: '塞克斯都·恩披里柯',
    aliases: ['Sextus Empiricus', '塞克斯图斯'],
    birth: null,
    death: null,
    summary: '约活跃于公元2—3世纪的皮浪派怀疑论者，系统记录悬置判断的方法。',
    biography:
      '塞克斯都的确切生平、活动地点和年代缺乏共识。他的著作保存了古代怀疑论的重要材料，使后世能够研究支持与反对某一论点的理由如何达到势均力敌。\n\n皮浪派的悬置判断不同于断言一切知识绝不可能，也不必然排斥日常行动。《皮浪主义纲要》的解释和与医学传统的关系，仍是持续讨论的问题。',
  },
  {
    key: 'more',
    name: '托马斯·莫尔',
    aliases: ['Thomas More', '托马斯·摩尔'],
    birth: 1478,
    death: 1535,
    summary: '英国人文主义者，以《乌托邦》通过虚构旅行对财产、劳动与政治展开反思。',
    biography:
      '莫尔受古典与基督教人文主义训练，在法律、外交和政治职务之外持续写作。《乌托邦》让不同人物讨论现实社会与虚构岛屿的制度，文本立场具有刻意保留的张力。\n\n其晚年参与压制宗教异端，后来因拒绝接受王室宗教安排被处死。人文主义作者、掌权官员与宗教争论者的不同面向都应进入评价，不能仅把虚构社会视为其完整施政纲领。',
  },
  {
    key: 'hushi',
    name: '胡适',
    aliases: ['胡適', '胡适之', 'Hu Shih', 'Hu Shi'],
    birth: 1891,
    death: 1962,
    summary: '中国现代学者与思想家，将实用主义方法、文献考证和中国思想史研究相结合。',
    biography:
      '胡适留学美国，在哥伦比亚大学接触杜威的哲学，回国后任教北京大学。他参与白话文学和新文化运动，又以中国哲学史、禅宗史与古典文献为长期研究对象，重视问题、证据和可检验的解释。\n\n《中国哲学史大纲》上卷来自其教学与研究，尝试按思想问题和历史发展重新组织先秦材料；原订续卷未在其生前完成。他后来还从事教育、外交和学术机构工作，这些公共身份与其具体研究论证需要分别考察。',
    moreSources: [
      {
        title: '中央研究院胡适纪念馆 · 整理国故运动的旗手',
        url: 'https://hushih.mh.sinica.edu.tw/Hushih_Content?mid=94',
        note: '中国哲学史、禅宗史等研究概述，说明北大讲义、1919年初出版及未完成续卷的关系。',
      },
    ],
  },
  {
    key: 'chenduxiu',
    name: '陈独秀',
    aliases: ['陳獨秀', '陈仲甫', 'Chen Duxiu', 'Chen Tu-hsiu'],
    birth: 1879,
    death: 1942,
    summary: '中国现代思想家与政治活动者，通过《新青年》等刊物讨论个人自主、科学和社会变革。',
    biography:
      '陈独秀在报刊写作与办学实践中形成公共思想活动。1915年在上海创办《青年杂志》，以《敬告青年》等文章讨论独立人格、科学和面向世界的态度；刊物后来改名《新青年》，他又出任北京大学文科学长。\n\n他随后参与中国共产党的创建并担任早期领导人，其思想与政治立场也经历变化。阅读其启蒙论说，需要区分1915年的青年伦理、后来刊物内部的不同声音，以及此后转向马克思主义的过程。',
    moreSources: [
      {
        title: '北京大学校史馆 · 陈独秀',
        url: 'https://www.xsg.pku.edu.cn/heros/revolutionist/detail/514.html',
        note: '人物简介明确1879—1942年、1917年北大任职以及中共早期领导经历。',
      },
      {
        title: '中国社会科学院大学 · 建党之前：陈独秀在上海',
        url: 'https://ztjy.ucass.edu.cn/info/1006/1949.htm',
        note: '“创办《新青年》声名鹊起”部分讨论《敬告青年》的个人自主与科学论说，以及杂志早期办刊取向。',
      },
    ],
  },
  {
    key: 'mao',
    name: '毛泽东',
    aliases: ['毛澤東', '毛润之', 'Mao Zedong', 'Mao Tse-tung'],
    birth: 1893,
    death: 1976,
    summary: '中国政治领导人与理论作者，其哲学论说围绕实践、认识、矛盾与具体历史条件展开。',
    biography:
      '毛泽东早年参与新民学会和《湘江评论》等活动，随后参与中国共产党的创建。其理论写作与政治、军事组织实践相互联系，后来成为中华人民共和国的主要领导人之一。\n\n《实践论》《矛盾论》源自1937年延安时期的哲学讲授与提纲，今通行文本又经过1950年代初的修订。研究这些作品，既要分析认识如何受实践检验、矛盾如何在具体条件中展开，也要区分早期底本、后期表述与不同历史时期的政治运用。',
    moreSources: [
      {
        title: '中国政协网 · 毛泽东（1893—1976）',
        url: 'https://www.cppcc.gov.cn/2011/06/27/ARTI1309159125046101.shtml',
        note: '官方人物年表列1893—1976年、新民学会、《湘江评论》、建党及中华人民共和国时期的主要职务。',
      },
    ],
  },
  {
    key: 'jin',
    name: '金岳霖',
    aliases: ['Jin Yuelin', 'Chin Yueh-lin'],
    birth: 1895,
    death: 1984,
    summary: '中国哲学家与逻辑学家，以逻辑分析讨论形而上学、知识及中国哲学的研究方式。',
    biography:
      '金岳霖在清华和海外求学后从事哲学教学，参与创建清华哲学系，并在西南联大时期持续著述。他把现代逻辑的方法带入中文哲学研究，重视概念的明确与论证之间的联系。\n\n《论道》以道、式、能等概念构造形而上学，《知识论》则研究知识与认识对象。他对“中国哲学的史”和“在中国的哲学史”的区分，也促使研究者反思地域传统、学科标准与哲学问题之间的关系。',
    moreSources: [
      {
        title: '商务印书馆 · 《论道》作者与内容简介',
        url: 'https://www.cp.com.cn/book/3bf46e31-0.html',
        note: '作者简介列1895—1984年；内容介绍列道、式、能的基本范畴。页面2015年是该重印本日期，不作初版年。',
      },
      {
        title: '清华大学哲学系 · 王路《论加字哲学》',
        url: 'https://www.phil.tsinghua.edu.cn/info/1037/1306.htm',
        note: '§1讨论金岳霖1936年关于中国哲学史写作的区分，并交代其哲学与逻辑研究。',
      },
    ],
  },
  {
    key: 'tang',
    name: '唐君毅',
    aliases: ['Tang Junyi', 'Tang Chun-I', 'T’ang Chün-i'],
    birth: 1909,
    death: 1978,
    summary: '现代新儒家哲学家，研究文化价值、道德自我与心灵境界，并参与香港新亚书院建设。',
    biography:
      '唐君毅在中国多所大学学习和任教，1949年前往香港，与钱穆等人创办新亚书院，后来担任香港中文大学哲学系的创系系主任。他把教育活动与哲学写作联系起来，研究中国思想如何回应现代世界。\n\n其著作讨论道德主体、文化活动和心灵与世界的关系，并与西方哲学进行比较。《中国文化之精神价值》《文化意识与道德理性》和《生命存在与心灵境界》属于不同阶段的作品，不宜以同一出版年份或单一文化口号代替其论证。',
    moreSources: [
      {
        title: '香港中文大学校史馆 · 唐君毅先生',
        url: 'https://www.cuhk.edu.hk/ugallery/sc/story/tang_chun_i.html',
        note: '生平与书院建设说明，明确1909年出生、1949年来港、1963年任哲学系主任和1978年去世。',
      },
    ],
  },
]

const existingIds: Record<string, string> = {
  husserl: 'phil-husserl',
  nishida: 'philosophy-nishida-kitaro',
}
const idFor = (key: string) => existingIds[key] ?? `modern-phil-${key}`
export const modernPhilosophyPeople: Person[] = seeds.map(
  ({ key, moreSources = [], ...person }) => ({
    ...person,
    id: idFor(key),
    role: '哲学家与思想史人物',
    color: '#7b809d',
    recordKind: 'curated',
    sources: [references[key], ...moreSources],
  }),
)
const names = new Map(seeds.map((person) => [person.key, person]))
const places: Record<
  string,
  { location: string; coordinates: [number, number]; region: HistoryRegion }
> = {
  paris: { location: '巴黎出版与思想网络', coordinates: [2.35, 48.86], region: 'europe' },
  london: { location: '伦敦出版网络', coordinates: [-0.13, 51.51], region: 'europe' },
  cambridge: { location: '英国剑桥', coordinates: [0.12, 52.2], region: 'europe' },
  oxford: { location: '英国牛津', coordinates: [-1.26, 51.75], region: 'europe' },
  vienna: { location: '维也纳', coordinates: [16.37, 48.21], region: 'europe' },
  tubingen: { location: '图宾根及德语学术出版网络', coordinates: [9.06, 48.52], region: 'europe' },
  halle: { location: '哈雷及德语现象学网络', coordinates: [11.97, 51.48], region: 'europe' },
  leipzig: { location: '莱比锡德语出版网络', coordinates: [12.37, 51.34], region: 'europe' },
  frankfurt: { location: '法兰克福及德语学术网络', coordinates: [8.68, 50.11], region: 'europe' },
  hague: { location: '海牙出版网络', coordinates: [4.3, 52.08], region: 'europe' },
  neuwied: { location: '诺伊维德出版网络', coordinates: [7.47, 50.43], region: 'europe' },
  amsterdam: { location: '阿姆斯特丹出版网络', coordinates: [4.9, 52.37], region: 'europe' },
  chicago: { location: '芝加哥出版与学术网络', coordinates: [-87.63, 41.88], region: 'americas' },
  newyork: { location: '纽约出版网络', coordinates: [-74.0, 40.71], region: 'americas' },
  newyorkExile: { location: '纽约流亡学术网络', coordinates: [-74.0, 40.71], region: 'americas' },
  harvard: { location: '美国剑桥出版与学术网络', coordinates: [-71.11, 42.37], region: 'americas' },
  princeton: { location: '普林斯顿', coordinates: [-74.66, 40.35], region: 'americas' },
  beijing: { location: '北京及中国现代学术网络', coordinates: [116.4, 39.9], region: 'china' },
  shanghai: { location: '上海出版网络', coordinates: [121.47, 31.23], region: 'china' },
  hangzhou: { location: '杭州', coordinates: [120.16, 30.25], region: 'china' },
  hongkong: { location: '香港与台北出版网络', coordinates: [114.17, 22.3], region: 'china' },
  taipei: { location: '台北出版网络', coordinates: [121.56, 25.04], region: 'china' },
  kunming: { location: '昆明及西南联大学术网络', coordinates: [102.71, 25.04], region: 'china' },
  yanan: { location: '延安抗大学术讲授语境', coordinates: [109.49, 36.59], region: 'china' },
  kyoto: { location: '京都及日本思想网络', coordinates: [135.76, 35.01], region: 'east-asia' },
  mumbai: { location: '孟买', coordinates: [72.88, 19.08], region: 'south-asia' },
  bengal: { location: '孟加拉与国际讲演网络', coordinates: [87.69, 23.68], region: 'south-asia' },
  ommen: { location: '奥门（荷兰）', coordinates: [6.42, 52.52], region: 'europe' },
  nicopolis: { location: '尼科波利斯', coordinates: [20.73, 39.03], region: 'europe' },
  rome: { location: '罗马帝国的斯多亚修养传统', coordinates: [12.5, 41.9], region: 'europe' },
  greek: { location: '希腊语地中海思想网络', coordinates: [23.73, 37.98], region: 'europe' },
  leuven: { location: '鲁汶出版网络', coordinates: [4.7, 50.88], region: 'europe' },
}
type Work = {
  id: string
  year: number
  title: string
  authors: string[]
  place: keyof typeof places
  summary: string
  background: string
  detail: string
  impact: string
  sourceNote: string
  importance?: number
  topics?: string[]
  endYear?: number
  dateLabel?: string
  dateNote?: string
  peopleNotes?: Record<string, string>
  moreSources?: Source[]
}
function work({
  authors,
  place,
  detail,
  sourceNote,
  topics = [],
  moreSources = [],
  ...record
}: Work): HistoryEvent {
  return {
    category: '文化',
    importance: 4,
    ...record,
    ...places[place],
    themes: ['哲学', ...topics],
    people: authors.map(idFor),
    aliases: authors.flatMap(
      (key) =>
        names.get(key)?.aliases ??
        (key === 'husserl' ? ['Husserl', '胡塞尔'] : ['Nishida Kitaro', '西田几多郎']),
    ),
    details: [detail],
    sources: [...authors.map((key) => ({ ...references[key], note: sourceNote })), ...moreSources],
    locationNote:
      '坐标为书籍出版、学术讨论或思想传播的地域参照；不据此推断作者在该年到访，也不构成人物年谱。',
  }
}

export const modernPhilosophyEvents: HistoryEvent[] = [
  work({
    id: 'modern-sartre-nausea',
    year: 1938,
    title: '萨特《恶心》出版',
    authors: ['sartre'],
    place: 'paris',
    importance: 5,
    topics: ['文学艺术'],
    summary:
      '萨特借小说人物对日常世界的陌生感，呈现存在的偶然性，以及人为何不能依靠预设本质获得意义。',
    background:
      '萨特已接触现象学，试图让意识、世界与经验的哲学问题进入文学叙述，而不是只写成抽象论证。',
    detail:
      '主人公的体验是一种文学化的哲学探索，不能当作萨特本人在特定地点发生过的医学或心理记录。偶然性也不等于任何行动都没有责任。',
    impact: '小说成为法国存在主义的重要阅读入口，把后来本体论的部分问题转化为可感知的情境。',
    sourceNote: 'SEP Sartre导言、关于Nausea的讨论及原始著作书目，明确1938年巴黎Gallimard出版。',
  }),
  work({
    id: 'modern-sartre-being-nothingness',
    year: 1943,
    title: '萨特《存在与虚无》出版',
    authors: ['sartre'],
    place: 'paris',
    importance: 5,
    summary: '萨特以现象学本体论分析意识、自由、自欺与他人的目光，区分自在存在与自为存在。',
    background:
      '战争与占领构成著作问世的历史背景，现象学与海德格尔的研究为其提供了可批评和改写的哲学资源。',
    detail:
      '自由总在处境中被实行，不能简单解释为愿望必定实现。自欺则涉及人在承认自身条件与承认选择责任之间的逃避。',
    impact: '著作建立萨特早期哲学的系统框架，并推动关于主体、身体和主体间关系的长期争论。',
    sourceNote: 'SEP Sartre导言与§4、书目1943 L’être et le néant条目；不是1956或后来的英译年份。',
  }),
  work({
    id: 'modern-sartre-existentialism-humanism',
    year: 1946,
    title: '萨特《存在主义是一种人道主义》刊行',
    authors: ['sartre'],
    place: 'paris',
    importance: 5,
    summary:
      '萨特将存在主义的自由与责任观面向公众阐述，回应把存在主义理解为绝望、虚无或任性选择的批评。',
    background:
      '1945年战后巴黎的公开讲座引发广泛关注，基督教与马克思主义批评者也在争论存在主义的政治和伦理含义。',
    detail:
      '这里记录1946年出版，1945年是演讲年份。简明讲稿与《存在与虚无》的复杂论证并不完全相同，也不能代表萨特此后所有立场。',
    impact: '这部小书使存在主义进入大众公共讨论，成为理解二十世纪法国思想的一条常见入口。',
    dateNote: '公开讲座于1945年举行，文本1946年出版；本条不把两个阶段合并为同一年。',
    sourceNote: 'SEP Sartre导言、关于1945年公开讲座及1946年Existentialism is a Humanism的说明。',
  }),
  work({
    id: 'modern-sartre-dialectical-reason',
    year: 1960,
    title: '萨特《辩证理性批判》第一卷出版',
    authors: ['sartre'],
    place: 'paris',
    importance: 4,
    topics: ['社会'],
    summary:
      '萨特研究个体实践、物质条件和群体行动之间的关系，尝试使存在主义与历史唯物主义形成可讨论的联系。',
    background: '战后马克思主义争论与政治经验促使萨特重新检视仅从个体意识出发的解释方式。',
    detail:
      '匮乏、系列性与群体形成使自由问题获得社会维度。第一卷于1960年问世，第二卷到1985年才身后出版，本条不将两卷说成同期完成。',
    impact:
      '著作展示萨特从早期本体论转向历史和社会理论的路径，也留下个人自由与结构条件之间的难题。',
    sourceNote:
      'SEP Sartre §6 Existentialist Marxism: Critique of Dialectical Reason，明确第一卷1960年、第二卷1985年。',
  }),
  work({
    id: 'modern-beauvoir-pyrrhus',
    year: 1944,
    title: '波伏瓦《皮洛士与西内阿斯》出版',
    authors: ['beauvoir'],
    place: 'paris',
    topics: ['社会'],
    summary: '波伏瓦追问行动目标如何获得正当性，以及个人自由为何不能脱离他人的自由来理解。',
    background:
      '她从具体存在者的处境出发，研究伦理行动与政治计划的标准，回应自由是否意味着彼此无关的问题。',
    detail:
      '书中借古代对话开题，但关注的是现代人的计划、依存与责任。它不是宣称能够替他人预先规定一个唯一的幸福目标。',
    impact: '这篇论说为其后来的伦理学和关于社会压迫的分析提供了早期框架。',
    sourceNote: 'SEP Beauvoir §4 Pyrrhus and Cinéas，明确1944年及自由、他人和伦理行动等论题。',
  }),
  work({
    id: 'modern-beauvoir-ambiguity',
    year: 1947,
    title: '波伏瓦《模糊性的道德》出版',
    authors: ['beauvoir'],
    place: 'paris',
    importance: 4,
    summary: '波伏瓦以人的有限性和开放未来讨论伦理，要求人在承认条件与不确定性时仍承担行动责任。',
    background: '战争后的暴力、政治承诺与未来理想问题，使如何评价手段与目的成为紧迫的伦理争论。',
    detail:
      '模糊性不是认为一切行为同样正当，而是拒绝以绝对目标取消现实中他人的尊严和自由。伦理选择不能由一个万能公式代替。',
    impact: '著作发展存在主义伦理学，也为《第二性》后来把自由放进具体社会处境的分析奠定基础。',
    sourceNote: 'SEP Beauvoir关于The Ethics of Ambiguity的专节与原始书目，明确1947年。',
  }),
  work({
    id: 'modern-beauvoir-second-sex',
    year: 1949,
    title: '波伏瓦《第二性》两卷出版',
    authors: ['beauvoir'],
    place: 'paris',
    importance: 5,
    topics: ['社会'],
    summary: '波伏瓦从历史、神话和生活经验分析女性被塑造成他者的过程，将性别处境与自由问题结合。',
    background:
      '法律形式上的权利并未消除家庭、劳动、教育与文化中的不平等，抽象自由观也需要面对具体身体和制度。',
    detail:
      '其“成为女人”的论述批评把既存社会角色当作自然命运。作品的经验范围与部分分析仍受到后来的女性主义批评。',
    impact: '作品成为现代女性主义的重要理论资源，把哲学问题与日常生活中的制度性差别联系起来。',
    sourceNote:
      'SEP Beauvoir §7 The Second Sex: Woman As Other及书目，1949年法文两卷；不采用英译刊行年份。',
  }),
  work({
    id: 'modern-heidegger-being-time',
    year: 1927,
    title: '海德格尔《存在与时间》出版',
    authors: ['heidegger'],
    place: 'halle',
    importance: 5,
    summary: '海德格尔从此在的在世存在、与他人共在和时间性出发，重新追问存在的意义。',
    background: '现象学研究和对传统本体论的批评，使如何解释人的日常存在成为新的哲学起点。',
    detail:
      '书中的向死存在和焦虑并不是日常励志术语，而与有限性、可能性和时间结构相连。原计划未全部完成，后期思想也不只是其简单延伸。',
    impact: '著作深刻影响存在主义、诠释学和现象学，同时引发关于其概念与政治历史的持续批判。',
    sourceNote:
      'SEP Heidegger关于Being and Time的分析及出版史，明确1927年；其书目中的图宾根1953年为第7版，1927年哈雷初版另据馆藏题录。',
    moreSources: [
      {
        title: 'CiNii Books · Sein und Zeit, 1. Hälfte (1927)',
        url: 'https://ci.nii.ac.jp/ncid/BA0822464X',
        note: '书目BA0822464X：von Martin Heidegger，M. Niemeyer，1927，出版地Halle a.d.S.；不把后版出版地回填初版。',
      },
    ],
  }),
  work({
    id: 'modern-wittgenstein-tractatus',
    year: 1921,
    title: '维特根斯坦《逻辑哲学论》德文初刊',
    authors: ['wittgenstein'],
    place: 'leipzig',
    importance: 5,
    summary: '维特根斯坦以逻辑形式和图像论研究命题如何表达世界，并讨论可说与不可说的边界。',
    background: '弗雷格、罗素与现代逻辑研究构成其早期工作的背景，战争期间形成的笔记也进入作品。',
    detail:
      '1921年德文题为《逻辑哲学论文》，1922年出现德英对照书版和拉丁文书名。不同版本不应重复计为两次思想创立。',
    impact: '著作影响逻辑经验主义和语言哲学，但伦理与不可说问题使它不能简单归入反形而上学口号。',
    dateNote: '1921年为德文期刊初刊；1922年为德英对照书版，不将翻译年份冒充初刊。',
    sourceNote: 'SEP Wittgenstein §2.1及书目，明确1921年Annalen初刊、1922年书版。',
    moreSources: [
      {
        title: 'Wittgenstein Archives at Bergen · Working Papers No. 7 (1993)',
        url: 'https://uhra.herts.ac.uk/id/eprint/12250/1/904279.pdf',
        note: 'Biggs与Pichler编书目，PDF第53页Part II的TLP1921*列Leipzig 1921，TLP1922列London德英对照版；用于区分初刊出版地与后版。',
      },
    ],
  }),
  work({
    id: 'modern-wittgenstein-investigations',
    year: 1953,
    title: '维特根斯坦《哲学研究》身后出版',
    authors: ['wittgenstein'],
    place: 'oxford',
    importance: 5,
    summary: '作品从语言游戏和生活形式出发，考察意义、规则、理解及所谓私人语言的哲学困难。',
    background: '维特根斯坦在长期教学与改写中重新检视早期理论，转向日常语境中多样的语言使用。',
    detail:
      '语言没有一种涵盖全部用途的单一模型。书由编辑者在作者去世后出版，篇章编排与后续版本须分别辨析。',
    impact: '它改变语言哲学、心灵哲学和哲学方法论的讨论，也使其早晚期关系成为重要研究问题。',
    peopleNotes: {
      'modern-phil-wittgenstein':
        '维特根斯坦1951年去世；此处关联其遗稿1953年的身后出版，不是本人当年活动。',
    },
    sourceNote:
      'SEP Wittgenstein晚期哲学分析及Primary Sources书目，Philosophical Investigations为1953年。',
  }),
  work({
    id: 'modern-wittgenstein-certainty',
    year: 1969,
    title: '维特根斯坦《论确定性》遗稿刊行',
    authors: ['wittgenstein'],
    place: 'oxford',
    importance: 4,
    summary: '晚年笔记追问怀疑、知识与实践背景之间的关系，研究某些确定性如何使提问和论证成为可能。',
    background: '作品承接对摩尔常识论证的回应，也延续语言使用和生活形式的讨论。',
    detail:
      '这里的确定性不只是个人感到十分确信，而涉及判断能够成立的背景。遗稿在1969年整理出版，思想形成主要在作者生命最后阶段。',
    impact: '它为认识论中的怀疑论、枢纽命题和实践基础问题提供新的研究资源。',
    peopleNotes: {
      'modern-phil-wittgenstein':
        '关联1949—1951年前后的晚年笔记与1969年身后出版；作者1951年已去世。',
    },
    sourceNote: 'SEP Wittgenstein Primary Sources：On Certainty, 1969，Anscombe与von Wright编。',
  }),
  work({
    id: 'modern-russell-principles',
    year: 1903,
    title: '罗素《数学的原则》出版',
    authors: ['russell'],
    place: 'cambridge',
    importance: 4,
    topics: ['科技医学', '教育学术'],
    summary: '罗素系统阐述把数学基础与逻辑联系起来的计划，并面对集合悖论对基础概念的挑战。',
    background: '十九世纪的数学基础研究不断追问数、集合和证明的性质，形式逻辑提供了新的分析工具。',
    detail:
      '本书与1910年起和怀特海合写的《数学原理》不同。逻辑主义是一个有争论的研究方案，并非数学已被无条件化约为逻辑的定论。',
    impact: '著作推动类型理论和数学哲学的研究，也是现代分析哲学形成的重要节点。',
    sourceNote:
      'SEP Russell关于悖论、类型理论与逻辑主义的专节及1903年Principles of Mathematics书目。',
  }),
  work({
    id: 'modern-principia-mathematica',
    year: 1910,
    endYear: 1913,
    dateLabel: '1910—1913年',
    dateNote: '三卷分别于1910、1912、1913年刊行，保留分卷出版过程。',
    title: '罗素与怀特海《数学原理》三卷刊行',
    authors: ['russell', 'whitehead'],
    place: 'cambridge',
    importance: 5,
    topics: ['科技医学', '教育学术'],
    summary: '罗素和怀特海用形式逻辑组织数学推导，试图在处理悖论的条件下说明数学基础。',
    background: '集合论悖论和逻辑主义计划的困难，促使两人研究类型、命题和证明结构。',
    detail:
      '形式化不仅是换一套符号，还涉及公理选择与推理许可。作品的基础方案及可约公理受到批评，后来的逻辑发展也重塑其目标。',
    impact: '它为二十世纪数理逻辑提供重要参照，也使形式系统的能力和限制成为持续问题。',
    sourceNote: 'SEP Whitehead导言与SEP Russell逻辑主义讨论，明确三卷1910、1912、1913年。',
  }),
  work({
    id: 'modern-husserl-ideas',
    year: 1913,
    title: '胡塞尔《纯粹现象学通论》第一卷出版',
    authors: ['husserl'],
    place: 'halle',
    importance: 5,
    summary: '胡塞尔通过悬置和现象学还原，研究意识如何给予对象意义，推进其先验现象学方向。',
    background:
      '《逻辑研究》之后，胡塞尔继续思考经验、有效性与意识结构之间的关系，并与心理主义保持距离。',
    detail:
      '悬置不是否认世界存在，而是改变研究立场，暂缓未经检查的存在设定。第一卷与后来编辑出版的其他卷须分别处理。',
    impact: '作品塑造现象学的方法争论，也引发追随者对于先验转向的接受、修正或反对。',
    sourceNote: 'SEP Husserl §3 The transcendental turn及作品书目，Ideen I初刊1913年。',
  }),
  work({
    id: 'modern-merleau-perception',
    year: 1945,
    title: '梅洛-庞蒂《知觉现象学》出版',
    authors: ['merleau'],
    place: 'paris',
    importance: 5,
    summary:
      '梅洛-庞蒂把身体作为知觉与行动的主体，研究人如何在尚未反思之前已经进入一个有意义的世界。',
    background: '现象学与格式塔心理学、神经病理研究相遇，为机械论与纯粹意识论之外的解释提供材料。',
    detail:
      '身体图式和运动能力显示，知觉不只是把零散感觉拼在一起。身体经验既有生理条件，也在习惯和社会活动中形成。',
    impact: '著作影响身体哲学、认知研究和社会理论，重新安排了主体与世界之间的关系。',
    sourceNote: 'SEP Merleau-Ponty生平、embodiment与Phénoménologie de la perception书目，1945年。',
  }),
  work({
    id: 'modern-camus-sisyphus',
    year: 1942,
    title: '加缪《西西弗神话》出版',
    authors: ['camus'],
    place: 'paris',
    importance: 5,
    topics: ['文学艺术'],
    summary: '加缪讨论人的意义要求与世界之间的荒诞关系，并尝试在没有终极保证的情况下肯定生活。',
    background: '战争年代的欧洲经验与哲学怀疑，使如何面对死亡、价值和行动成为紧迫问题。',
    detail:
      '西西弗形象是一种哲学文学表达。荒诞不等于鼓励绝望，加缪强调清醒和持续行动，而非以一个超越答案消除张力。',
    impact: '作品使荒诞思想成为现代文学与哲学共同讨论的重要主题，也与加缪后续反抗论相连。',
    sourceNote: 'SEP Camus关于The Myth of Sisyphus的专节及原始著作书目，1942年。',
  }),
  work({
    id: 'modern-camus-rebel',
    year: 1951,
    title: '加缪《反抗者》出版',
    authors: ['camus'],
    place: 'paris',
    importance: 4,
    topics: ['社会'],
    summary: '加缪研究反抗如何由拒绝不公出发，却又可能在绝对理想名义下转化为压迫和杀戮。',
    background: '革命、战争和极权政治经验，使目的是否能够正当化任何手段成为战后思想界的重要争论。',
    detail:
      '他试图从共同的人之限度和团结寻找反抗的尺度，而不是把一切政治行动都判为同等错误。书中历史概括本身也引起争议。',
    impact: '作品加剧加缪与萨特等人的分歧，并持续参与关于政治暴力和道德责任的讨论。',
    sourceNote: 'SEP Camus关于The Rebel的分析与书目，法文L’Homme révolté出版于1951年。',
  }),
  work({
    id: 'modern-popper-discovery',
    year: 1935,
    title: '波普尔《研究的逻辑》问世',
    dateLabel: '1934年末发行／初版题年1935年',
    authors: ['popper'],
    place: 'vienna',
    importance: 5,
    topics: ['科技医学'],
    summary: '波普尔以可证伪性讨论科学与非科学的划界，强调理论需要承受可能失败的经验检验。',
    background: '逻辑经验主义与当时物理学发展，促使科学哲学重新讨论归纳、观察和理论评价。',
    detail:
      '严厉检验不等于一次异常观察就自动废除理论，辅助假设和观察条件同样需要检查。1959年英语版也不是德文原作的初次问世。',
    impact: '作品使批判理性主义成为科学方法论的重要方向，并引发与库恩、拉卡托斯等人的后续争论。',
    dateNote: '本条采用初版题年1935；实际发行常记1934年末，1959年为作者英译版。',
    sourceNote:
      'SEP Popper原始书目列1935 Logik der Forschung与1959 The Logic of Scientific Discovery，生平段讨论早期出版。',
  }),
  work({
    id: 'modern-popper-open-society',
    year: 1945,
    title: '波普尔《开放社会及其敌人》出版',
    authors: ['popper'],
    place: 'london',
    importance: 4,
    topics: ['政治', '社会'],
    summary: '波普尔批评以历史必然规律为政治权力辩护的理论，主张制度应容许批评、修正与和平更替。',
    background: '欧洲极权主义和战争经验促使他把反教条的认识论取向用于政治思想。',
    detail:
      '其对柏拉图、黑格尔和马克思的解释引发大量批评。开放社会并非没有共同规则，而是要求规则和掌权者可以受到质疑。',
    impact: '作品成为战后自由主义与历史主义争论的重要文献，连接知识限度和制度设计。',
    sourceNote: 'SEP Popper政治思想专节及书目：The Open Society and Its Enemies，1945年两卷。',
  }),
  work({
    id: 'modern-kuhn-revolutions',
    year: 1962,
    title: '库恩《科学革命的结构》出版',
    authors: ['kuhn'],
    place: 'chicago',
    importance: 5,
    topics: ['科技医学', '教育学术'],
    summary: '库恩通过范式、常规科学与革命的区分，研究科学共同体如何维持和改变研究问题及评价标准。',
    background:
      '具体科学史显示，理论变化不总是把更多事实加到不变框架上，也涉及概念和研究实践的重组。',
    detail:
      '不可通约概念指向比较中的困难，不等于不同理论绝对无法交流或科学只靠任意信仰。库恩后来也修订了部分表述。',
    impact: '作品推动科学哲学转向科学史与共同体实践，范式概念的跨学科传播也产生了新的误用与争议。',
    sourceNote: 'SEP Thomas Kuhn导言及§2—4，明确1962年The Structure of Scientific Revolutions。',
  }),
  work({
    id: 'modern-arendt-totalitarianism',
    year: 1951,
    title: '阿伦特《极权主义的起源》出版',
    authors: ['arendt'],
    place: 'newyork',
    importance: 5,
    topics: ['政治', '社会'],
    summary:
      '阿伦特追踪反犹主义、帝国主义与极权制度的历史联系，研究现代政治如何破坏共同世界与个人身份。',
    background: '流亡、纳粹暴行和战后政治经验，使传统国家与暴政概念的解释能力受到追问。',
    detail:
      '作品比较纳粹与斯大林主义，但并不意味着其所有历史背景和机制相同。其概括及材料使用一直受到历史学与政治理论的检验。',
    impact: '它使极权主义成为重要研究议题，也开启关于意识形态、恐怖与无权利处境的持续讨论。',
    sourceNote: 'SEP Arendt导言与The Origins of Totalitarianism讨论，明确1951年。',
  }),
  work({
    id: 'modern-arendt-human-condition',
    year: 1958,
    title: '阿伦特《人的境况》出版',
    authors: ['arendt'],
    place: 'chicago',
    importance: 4,
    topics: ['政治', '社会'],
    summary: '阿伦特区分劳动、工作与行动，研究公共空间中多元的人如何共同生活和开始新的事物。',
    background: '现代社会的劳动组织、技术能力与大众政治，使公共活动和私人生活的边界发生变化。',
    detail:
      '三种活动不是职业高低的简单排序，而是分析人类活动的不同条件。行动强调与他人相遇，也包含无法预先控制全部结果的风险。',
    impact: '作品为政治行动、公共领域与现代生活的讨论提供了独特概念框架。',
    sourceNote: 'SEP Arendt导言与行动理论部分，The Human Condition出版于1958年。',
  }),
  work({
    id: 'modern-rawls-justice',
    year: 1971,
    title: '罗尔斯《正义论》出版',
    authors: ['rawls'],
    place: 'harvard',
    importance: 5,
    topics: ['政治', '社会'],
    summary:
      '罗尔斯通过原初状态与无知之幕，论证一个公平合作社会应如何处理基本自由与社会经济不平等。',
    background:
      '战后政治哲学需要重新讨论自由、平等和功利主义之间的张力，公共制度的正当性成为核心。',
    detail:
      '无知之幕是一种检验公共原则的思想装置，不是实际历史会议。差别原则也不是主张任何不平等都自动合理。',
    impact: '作品重塑英语政治哲学，并引发自由至上主义、社群主义、女性主义等方向的回应。',
    sourceNote: 'SEP Rawls生平、作为公平的正义各节及原始书目，A Theory of Justice为1971年初版。',
  }),
  work({
    id: 'modern-nozick-utopia',
    year: 1974,
    title: '诺齐克《无政府、国家与乌托邦》出版',
    authors: ['nozick'],
    place: 'newyork',
    importance: 4,
    topics: ['政治', '社会'],
    summary: '诺齐克以个人权利限制国家行动，讨论最小国家和基于取得、转让与矫正的持有正义。',
    background: '罗尔斯等人的正义理论使分配制度成为争论焦点，诺齐克从不同的权利观出发回应。',
    detail:
      '历史性的持有理论要求追问财产如何获得，并不能直接为任何既存分配辩护。其国家起源论证也是规范性思想实验。',
    impact: '著作成为自由至上主义的重要文本，推动国家权限、税收与再分配的哲学争论。',
    sourceNote:
      'SEP Robert Nozick’s Political Philosophy导言与§2—3，明确1974年Anarchy, State, and Utopia。',
  }),
  work({
    id: 'modern-horkheimer-critical-theory',
    year: 1937,
    title: '霍克海默发表《传统理论与批判理论》',
    authors: ['horkheimer'],
    place: 'newyorkExile',
    importance: 4,
    topics: ['社会'],
    summary: '霍克海默讨论理论与社会处境的关系，要求社会研究反思自身参与的劳动、权力和制度条件。',
    background:
      '法兰克福社会研究所在流亡与法西斯主义扩张背景下，尝试联结哲学、经济与经验社会研究。',
    detail:
      '批判理论不是以立场取代证据，而是反对把知识生产和既有社会秩序视为相互无关。其解放目标也必须接受反思。',
    impact: '文章成为批判理论的纲领性文本，影响此后的社会哲学与跨学科研究。',
    sourceNote:
      'SEP Horkheimer §1明确1933年法兰克福研究所被关闭、1934—1941年霍克海默主要在纽约工作；本条坐标指流亡学术网络，不判断期刊印刷地。§3及原始书目列Traditional and Critical Theory发表于1937年。',
  }),
  work({
    id: 'modern-dialectic-enlightenment',
    year: 1947,
    title: '霍克海默与阿多诺《启蒙辩证法》正式出版',
    authors: ['horkheimer', 'adorno'],
    place: 'amsterdam',
    importance: 5,
    topics: ['社会', '文学艺术'],
    summary: '两位作者追问启蒙为何可能反转为支配，研究工具理性、反犹主义与文化工业。',
    background: '流亡经验、法西斯主义和现代大众文化促使他们检验进步叙事中的矛盾。',
    detail:
      '作品批评理性的特定社会运用，并非主张完全抛弃理性。1944年已有内部流通的文本，1947年是阿姆斯特丹正式版。',
    impact: '它成为法兰克福学派的代表作品，持续影响社会批判和文化研究，也引发对其悲观图景的反驳。',
    dateNote: '初稿以Philosophical Fragments于1944年流通；这里记录1947年正式刊本。',
    sourceNote:
      'SEP Adorno §2与Horkheimer相关讨论，区分1944文本及1947 Dialectic of Enlightenment正式版。',
  }),
  work({
    id: 'modern-habermas-public-sphere',
    year: 1962,
    title: '哈贝马斯《公共领域的结构转型》出版',
    authors: ['habermas'],
    place: 'neuwied',
    importance: 4,
    topics: ['政治', '社会'],
    summary:
      '哈贝马斯考察报刊、社团和讨论空间如何形成公共意见，以及公共讨论如何受到市场和国家权力改变。',
    background: '战后民主重建与大众传播发展，使私人利益、社会参与和政治正当性的关系成为核心问题。',
    detail:
      '书中的资产阶级公共领域并不是从来人人平等的现实。妇女、劳动者及其他被排除群体的经验促成后来的重要批评。',
    impact: '公共领域成为跨学科研究的关键概念，也推动对公共性、媒介与排除机制的修订讨论。',
    sourceNote:
      'SEP Habermas早期公共领域专节与书目，The Structural Transformation of the Public Sphere为1962年。',
  }),
  work({
    id: 'modern-habermas-communicative-action',
    year: 1981,
    title: '哈贝马斯《交往行为理论》两卷出版',
    authors: ['habermas'],
    place: 'frankfurt',
    importance: 5,
    topics: ['政治', '社会'],
    summary: '哈贝马斯区分面向理解的交往与面向成功的行动，联结生活世界、社会系统和现代性的批判。',
    background: '批判理论需要说明自身的规范依据，也需要理解现代市场与行政组织日益复杂的协调机制。',
    detail:
      '交往理性并非假定现实交流没有权力，而是追问可提出和检验理由的条件。系统殖民生活世界是对特定现代病理的诊断。',
    impact: '理论为社会整合、民主程序与公共理性提供体系性的讨论框架。',
    sourceNote: 'SEP Habermas §2有关The Theory of Communicative Action的系统分析，原作1981年两卷。',
  }),
  work({
    id: 'modern-foucault-madness',
    year: 1961,
    title: '福柯《疯癫与非理性》出版',
    authors: ['foucault'],
    place: 'paris',
    importance: 4,
    topics: ['社会'],
    summary: '福柯研究欧洲社会如何划分理性与疯癫，并把这些分类放回收容、知识和制度的历史中。',
    background: '精神病学与现代人文科学常以自身分类为自然事实，福柯转而检验其形成条件。',
    detail:
      '书的历史论证和材料范围持续受到研究者批评。法文原作、1964年缩编版及各语译本范围不同，不能视为完全相同的文本。',
    impact: '作品开启福柯的知识考古路径，也推动对正常性、排除和医疗制度的历史反思。',
    sourceNote:
      'SEP Foucault §3.1 Histories of Madness and Medicine及原始书目，Folie et déraison为1961年。',
  }),
  work({
    id: 'modern-foucault-order-things',
    year: 1966,
    title: '福柯《词与物》出版',
    authors: ['foucault'],
    place: 'paris',
    importance: 5,
    topics: ['教育学术'],
    summary: '福柯比较不同时期知识的组织方式，追问生命、劳动、语言以及现代“人”如何成为知识对象。',
    background: '对单线进步史和普遍主体观的反思，促使其研究知识成立所依赖的历史规则。',
    detail:
      '认识型并不是每个时代所有人都相信的同一套观念，而是分析某类知识组织方式的概念。作品自身的断代也需要历史检验。',
    impact: '著作把人文科学的对象与方法历史化，在结构主义及其后续争论中产生广泛影响。',
    sourceNote:
      'SEP Foucault §3.2 The Order of Things与Primary Sources，Les mots et les choses初版1966年。',
  }),
  work({
    id: 'modern-foucault-discipline',
    year: 1975,
    title: '福柯《规训与惩罚》出版',
    authors: ['foucault'],
    place: 'paris',
    importance: 5,
    topics: ['社会', '政治'],
    summary: '福柯以监狱史追踪规训权力，分析观察、考核和训练如何塑造身体与主体。',
    background: '现代刑罚表面上减少公开酷刑，却同时发展出更细密的管理与正常化机制。',
    detail:
      '全景敞视是一种分析权力关系的模型，不表示所有机构都真正采用同一建筑。现代惩罚变迁也不能只由单一原因解释。',
    impact: '作品影响犯罪学、教育和社会理论，使权力如何在日常实践中运行成为重要问题。',
    sourceNote: 'SEP Foucault §3.4 History of the Prison及书目，Surveiller et punir出版于1975年。',
  }),
  work({
    id: 'modern-derrida-grammatology',
    year: 1967,
    title: '德里达《论文字学》出版',
    authors: ['derrida'],
    place: 'paris',
    importance: 5,
    topics: ['文学艺术'],
    summary: '德里达通过书写、符号与差异的研究，检视西方哲学将声音和在场置于优先地位的倾向。',
    background: '现象学、结构语言学和文本解释的争论，为其批评传统概念次序提供材料。',
    detail:
      '解构不能简化为随意拆解文本或宣称任何解释都正确。它关注一个概念体系如何依赖自己试图排除的条件。',
    impact: '作品与同年的其他著作一起，使解构进入哲学、文学和文化理论的国际讨论。',
    sourceNote:
      'SEP Derrida生平及Of Grammatology讨论，明确1967年三部主要著作同时问世；本条只记录其中一部。',
  }),
  work({
    id: 'modern-dewey-democracy-education',
    year: 1916,
    title: '杜威《民主主义与教育》出版',
    authors: ['dewey'],
    place: 'newyork',
    importance: 5,
    topics: ['教育学术', '社会'],
    summary: '杜威把教育理解为经验的重组，强调学习、共同活动与民主生活之间的联系。',
    background: '工业社会、公共教育和社会分工的变化，要求重新思考学校与社会生活的关系。',
    detail:
      '从做中学不等于只有活动而不需知识，也不是让每个儿童任意选择。经验需要通过问题、合作和反思获得教育意义。',
    impact: '作品成为现代教育哲学的重要文本，其国际传播也引发不同社会对民主教育的选择和改造。',
    sourceNote: 'SEP Dewey生平年表及教育哲学部分，Democracy and Education为1916年。',
  }),
  work({
    id: 'modern-dewey-experience-nature',
    year: 1925,
    title: '杜威《经验与自然》出版',
    authors: ['dewey'],
    place: 'chicago',
    importance: 4,
    summary: '杜威以自然主义重新讨论经验、意义和价值，反对将心灵与世界划成彼此隔绝的领域。',
    background: '其对达尔文、心理学和社会实践的研究，推动经验概念从认识工具转向对存在方式的说明。',
    detail:
      '经验包括行动、受影响与交流，并不只是脑内的感觉片段。书由1923年卡鲁斯讲座发展而来，1925年出版，1929年有修订。',
    impact: '著作呈现杜威较完整的哲学框架，为经验论、价值论与文化自然主义提供资源。',
    sourceNote:
      'SEP Dewey关于1923年Carus Lectures和Experience and Nature（1925，1929修订）的段落。',
  }),
  work({
    id: 'modern-peirce-clear-ideas',
    year: 1878,
    title: '皮尔士发表《如何使我们的观念清楚》',
    authors: ['peirce'],
    place: 'newyork',
    importance: 4,
    topics: ['科技医学'],
    summary: '皮尔士提出以概念可能带来的可经验后果澄清意义，把信念与探究的实际过程联系起来。',
    background: '科学研究和逻辑分析需要区分真正影响判断的差别与仅由词语造成的分歧。',
    detail:
      '实用准则不是把一时获利作为真理标准，而是要求说明若概念成立，会对可考察经验产生什么差别。',
    impact: '文章成为美国实用主义的奠基文献，后来的詹姆斯、杜威等人又形成不同发展。',
    sourceNote:
      'SEP Peirce关于1877—1878年Illustrations of the Logic of Science系列和实用准则的讨论。',
  }),
  work({
    id: 'modern-quine-two-dogmas',
    year: 1951,
    title: '奎因发表《经验论的两个教条》',
    authors: ['quine'],
    place: 'harvard',
    importance: 4,
    summary: '奎因批评分析与综合的严格区分及逐句还原论，强调陈述通过理论网络共同面对经验。',
    background: '逻辑经验主义试图以意义与经验检验组织知识，分析真理的地位因而十分关键。',
    detail:
      '整体论不表示任何观点都同样合理，而是指出经验检验通常依赖多项背景假设。语言、逻辑与科学理论的关系需要共同说明。',
    impact: '文章重塑英语认识论与语言哲学，并促进自然主义及对意义概念的进一步争论。',
    sourceNote:
      'SEP Quine关于分析—综合区分的讨论与Primary Sources：1951，Philosophical Review 60:20—43。',
  }),
  work({
    id: 'modern-austin-words',
    year: 1962,
    title: '奥斯汀《如何以言行事》身后出版',
    authors: ['austin'],
    place: 'oxford',
    importance: 4,
    summary:
      '奥斯汀研究承诺、命名和宣告等语言行动，说明说话不仅报告事实，也可能在适当条件下完成行动。',
    background: '日常语言哲学对实际用法的细查，促使研究者重新考虑只用真假描述全部语句的做法。',
    detail:
      '言语行为需要合适的情境与规则，不是任何话语都自动奏效。作品源于1955年哈佛讲座，1962年由编辑者整理出版。',
    impact: '著作奠定言语行为理论的重要区分，影响语言学、法学及交往研究。',
    peopleNotes: {
      'modern-phil-austin':
        '奥斯汀1960年去世；此处关联1955年讲稿在1962年的身后出版，不是本人当年活动。',
    },
    sourceNote: 'SEP Austin §1与书目1962b，明确1955 William James Lectures及身后出版版本。',
  }),
  work({
    id: 'modern-kripke-naming',
    year: 1972,
    title: '克里普克《命名与必然性》论文版刊行',
    authors: ['kripke'],
    place: 'princeton',
    importance: 4,
    summary: '克里普克以名称和必然性讨论挑战描述论，并区分必然真理与先验可知之间的关系。',
    background: '模态逻辑的发展使可能性、同一性和指称问题能够在更精确的框架中被重新检视。',
    detail:
      '作品来自1970年普林斯顿讲座，1972年以论文形式刊行，1980年另出带新前言的单行本。刚性指示词是跨可能情境的指称概念。',
    impact: '这些论证使语言哲学与形而上学重新紧密关联，影响关于自然种类、同一性和知识的研究。',
    dateNote: '区分1970年讲座、1972年论文版和1980年单行本；本条记录论文版。',
    sourceNote:
      'Princeton University收录John P. Burgess研究章节摘要，明确1970、1972、1980三个阶段。',
  }),
  work({
    id: 'modern-gadamer-truth-method',
    year: 1960,
    title: '伽达默尔《真理与方法》出版',
    authors: ['gadamer'],
    place: 'tubingen',
    importance: 4,
    topics: ['教育学术'],
    summary: '伽达默尔从艺术、历史和语言经验出发，说明理解总发生在传统与当下问题的对话之中。',
    background: '现代人文科学重视方法的可控性，他则追问某些真理经验为何不能完全化约为方法程序。',
    detail:
      '视域融合不是把不同观点无条件混为一致。理解者的预设需要在与文本和他人的交往中受到检验。',
    impact: '著作使哲学诠释学成为二十世纪的重要方向，影响历史学、法学和人文研究。',
    sourceNote: 'SEP Gadamer生平及诠释学讨论，明确Truth and Method于1960年出版。',
  }),
  work({
    id: 'modern-levinas-totality-infinity',
    year: 1961,
    title: '列维纳斯《总体与无限》出版',
    authors: ['levinas'],
    place: 'hague',
    importance: 4,
    summary: '列维纳斯把对他者的责任放在哲学中心，批评将他人完全纳入自我知识和总体秩序的倾向。',
    background: '现象学、战争和欧洲思想传统的危机，构成其重思伦理与本体论关系的背景。',
    detail:
      '面容不是某种外貌特征，而是与他人相遇时无法被完全占有和穷尽的关系。责任的非对称性也引发政治和正义层面的追问。',
    impact: '作品使伦理作为第一哲学的主张进入广泛讨论，影响主体间性、宗教与政治思想。',
    sourceNote: 'SEP Levinas §2.3 The “Treatise on Hospitality”: Totality and Infinity (1961)。',
  }),
  work({
    id: 'modern-ryle-concept-mind',
    year: 1949,
    title: '赖尔《心的概念》出版',
    authors: ['ryle'],
    place: 'london',
    importance: 4,
    summary: '赖尔批评把心灵视为身体内部另一个隐秘实体的图景，通过能力和实践重新分析心理概念。',
    background: '笛卡尔式二元论及心理学解释的难题，使心灵、行为和知识的关系需要重新澄清。',
    detail:
      '范畴错误的分析不是宣称心理生活不存在，也不能直接等同于实验心理学的行为主义。其方法检验概念在说明中的位置。',
    impact: '著作成为心灵哲学与日常语言分析的重要文本，引起关于行为、意向和主观经验的争论。',
    sourceNote: 'SEP Ryle导言及The Concept of Mind各节、原始书目，初版1949年。',
  }),
  work({
    id: 'modern-bergson-creative-evolution',
    year: 1907,
    title: '柏格森《创造进化论》出版',
    authors: ['bergson'],
    place: 'paris',
    importance: 4,
    topics: ['科技医学'],
    summary: '柏格森把绵延和新颖性带入生命哲学，批评用静止的机械模型穷尽生命变化。',
    background: '进化论和生命科学的发展，使哲学重新讨论时间、创造与自然解释的方式。',
    detail:
      '生命冲力是有争议的哲学概念，不应当作现代生物学已经验证的机制。其对直觉的说明也不是任意感觉可以取代研究。',
    impact: '著作推动柏格森思想的国际传播，影响文学、现象学及东亚的现代思想讨论。',
    sourceNote: 'SEP Bergson生平与Creative Evolution专节，明确1907年问世。',
  }),
  work({
    id: 'modern-weil-oppression-liberty',
    year: 1955,
    title: '薇依《压迫与自由》文集身后出版',
    authors: ['weil'],
    place: 'paris',
    importance: 4,
    topics: ['社会'],
    summary: '薇依的政治与劳动论述被整理为文集，讨论压迫、组织力量以及个人理解和行动的条件。',
    background: '她生前的工厂经验、政治实践与欧洲危机，促成对劳动和社会权力的持续反思。',
    detail:
      '这不是1955年新写成的一部著作，合集包含不同时期文本。读者应区分作者原先的写作处境与编辑出版的时间。',
    impact: '文集使其关于自由、劳动和社会支配的哲学思考进入更广泛的战后讨论。',
    peopleNotes: { 'modern-phil-weil': '薇依1943年去世；1955年为遗稿文集出版，非本人当年活动。' },
    sourceNote: 'SEP Simone Weil原始书目：[OL] Oppression et liberté，Paris: Gallimard，1955。',
  }),
  work({
    id: 'modern-liang-east-west',
    year: 1921,
    title: '梁漱溟《东西文化及其哲学》出版',
    authors: ['liang'],
    place: 'shanghai',
    importance: 5,
    topics: ['教育学术'],
    summary: '梁漱溟比较西方、中国与印度的生活态度，追问中国文化在现代转型中的可能方向。',
    background:
      '新文化运动和西方知识的传播，促使思想界争论传统是否应被全部舍弃，以及现代化究竟包含什么。',
    detail:
      '三种文化的宏观划分是一项有争议的哲学解释，不能代替各地复杂历史。作品不是简单拒绝西方知识，而试图寻找不同的价值取向。',
    impact: '著作成为现代新儒学与中西文化论争的重要节点，也联系到梁漱溟后来的社会实践。',
    sourceNote:
      'SEP Modern Confucianism §1及书目列1921年上海商务印书馆；普林斯顿研究亦记1921年末出版。',
    moreSources: [
      {
        title: 'Princeton University · Rethinking the Twentieth Century Denigration',
        url: 'https://www.princeton.edu/~elman/documents/Rethinking_the_Twentieth_Century_Denigration.pdf',
        note: '梁漱溟1920—1921年讲演及1921年末出书段；与某些条目采用1922年再版纪年区别。',
      },
    ],
  }),
  work({
    id: 'modern-xiong-new-consciousness',
    year: 1932,
    title: '熊十力《新唯识论》文言本出版',
    authors: ['xiong'],
    place: 'hangzhou',
    importance: 5,
    topics: ['宗教'],
    summary:
      '熊十力在批评传统唯识学的同时，论述心与世界、体与用的关系，尝试重建道德生命的哲学基础。',
    background: '佛学复兴与儒学现代转型相遇，思想家既面对西方学科，也重新解释本土修养传统。',
    detail:
      '1932年出版的是文言本，后来语体本及其他修订应分别阅读。其儒佛会通也引起佛教研究者的批评，不能说成各传统已达成共识。',
    impact: '著作成为现代新儒学的重要思想资源，影响牟宗三等人的心性与道德形而上学。',
    sourceNote:
      'DILA现代佛教数据库Xiong Shili，明确1932年文言本；SEP Modern Confucianism §1与§3说明思想内容。',
    moreSources: [references.mou],
  }),
  work({
    id: 'modern-feng-history-chinese-philosophy',
    year: 1931,
    endYear: 1934,
    dateLabel: '1931—1934年',
    dateNote: '第一卷1931年、第二卷1934年问世，保留分卷出版过程。',
    title: '冯友兰《中国哲学史》两卷刊行',
    authors: ['feng'],
    place: 'shanghai',
    importance: 5,
    topics: ['教育学术'],
    summary: '冯友兰以现代哲学学科的问题与方法，重新组织中国思想传统的历史叙述。',
    background:
      '如何把经典研究转化为现代哲学史，以及如何比较中西思想，成为二十世纪中国学术建设的重要问题。',
    detail:
      '哲学史并非把古书内容简单排成年表，而涉及何为哲学、如何划分时期和如何理解概念。书中框架此后也不断受到讨论与修订。',
    impact: '两卷本成为影响广泛的中国哲学史著作，使传统思想进入新的教学、翻译与比较哲学网络。',
    sourceNote:
      'IEP Chinese Philosophy: Overview of History明确第一卷1931、第二卷1934；Feng条目介绍其方法与新理学背景。',
    moreSources: [
      {
        title: 'Internet Encyclopedia of Philosophy · Chinese Philosophy: Overview of History',
        url: 'https://iep.utm.edu/chinese-philosophy-overview-of-history/',
        note: 'Feng Youlan两卷本1931、1934年及现代哲学史学科形成的段落。',
      },
    ],
  }),
  work({
    id: 'modern-mou-mind-nature',
    year: 1968,
    endYear: 1969,
    dateLabel: '1968—1969年',
    dateNote: '《心体与性体》三卷的出版跨越1968—1969年，不将三卷压成同一年。',
    title: '牟宗三《心体与性体》三卷刊行',
    authors: ['mou'],
    place: 'hongkong',
    importance: 5,
    topics: ['教育学术'],
    summary: '牟宗三以心、性与道德实践的关系重释宋明儒学，辨析不同思想系统对道德主体的说明。',
    background:
      '现代新儒学一方面回应中国社会的转变，另一方面与康德及西方哲学的主体和道德问题对话。',
    detail:
      '其思想系统划分是一种哲学解释，不能直接当作没有争议的历史分类。之后的智的直觉与康德研究也不应全部倒置为此书已完成的结论。',
    impact: '著作推动现代儒学的系统化讨论，也成为评价牟宗三对传统重构的重要对象。',
    sourceNote:
      'SEP Modern Confucianism §1及Mou书目，Heart-Mind and Human Nature as Reality，1968—69，三卷。',
  }),
  work({
    id: 'modern-suzuki-zen-essays',
    year: 1927,
    title: '铃木大拙英文《禅论集》第一集出版',
    authors: ['suzuki'],
    place: 'kyoto',
    importance: 4,
    topics: ['宗教', '交流'],
    summary: '铃木大拙以英文讲述禅的经验、经典和历史，为国际读者提供一种现代禅学解释。',
    background: '近代日本佛教、英语出版与跨文化交流共同改变了禅在日本之外的呈现方式。',
    detail:
      '第一集出版于1927年，第二、三集分别为1933、1934年。这种现代诠释不能代表所有时期和地区的禅宗实践，也须接受历史批评。',
    impact: '著作扩大了禅在国际思想和文学界的影响，并塑造现代宗教比较的一部分讨论方式。',
    sourceNote:
      '金泽市铃木大拙馆年谱1927、1933、1934条；坐标为京都思想网络，不宣称英文书在京都首印。',
  }),
  work({
    id: 'modern-nishida-place',
    year: 1926,
    title: '西田几多郎发表《场所》',
    authors: ['nishida'],
    place: 'kyoto',
    importance: 5,
    summary: '西田几多郎通过场所的逻辑，追问主客区分和判断活动得以成立的更根本条件。',
    background:
      '《善的研究》之后，西田持续回应对纯粹经验和自觉理论的批评，并与新康德主义等思想对话。',
    detail:
      '场所不是普通地理空间，而是试图说明存在、认识与否定关系的哲学概念。它也没有使西田此后的全部理论在1926年一次完成。',
    impact: '文章构成其成熟思想的重要转折，影响京都学派关于绝对无和主体世界关系的讨论。',
    sourceNote:
      'SEP Nishida Kitarō场所逻辑讨论及书目，Basho为1926年，1926 & 1936文集注明两篇不同年代。',
  }),
  work({
    id: 'modern-nishitani-religion',
    year: 1961,
    title: '西谷启治《宗教是什么》出版',
    authors: ['nishitani'],
    place: 'kyoto',
    importance: 4,
    topics: ['宗教'],
    summary: '西谷启治从虚无主义的经验出发，以佛教空的视角重新讨论自我、存在与宗教。',
    background: '传统价值根据的动摇与欧洲虚无主义问题，促使京都学派研究宗教何以具有现代意义。',
    detail:
      '日文原著1961年问世，1982年英译题为《宗教与虚无》。空不是把一切说成不存在，而涉及对自我中心和实体化理解的批评。',
    impact: '作品成为现代日本宗教哲学的重要文本，促进佛教与欧洲哲学之间的比较和批判。',
    sourceNote:
      'SEP Kyoto School相关思想讨论；日文初版日期以日本国立国会图书馆1961年书目核对，英译为1982年。',
    moreSources: [
      {
        title: '日本国立国会图书馆 · 宗教論集 第1（宗教とは何か）',
        url: 'https://ndlsearch.ndl.go.jp/books/R100000039-I2975553',
        note: '西谷啓治著、创文社、1961年书目记录。',
      },
      {
        title: 'University of California Press · Religion and Nothingness',
        url: 'https://www.ucpress.edu/books/religion-and-nothingness/paper',
        note: '英译出版及作品问题说明，不把英译年份当作日文初版。',
      },
    ],
  }),
  work({
    id: 'modern-ambedkar-annihilation-caste',
    year: 1936,
    title: '安贝德卡自印《种姓的消灭》',
    authors: ['ambedkar'],
    place: 'mumbai',
    importance: 5,
    topics: ['社会', '宗教'],
    summary: '安贝德卡从人的平等与社会尊严出发，批评种姓制度及其宗教和社会权威基础。',
    background: '原定会议组织者撤销演讲邀请，显示温和改革诉求与对种姓制度的根本批判之间存在分歧。',
    detail:
      '演讲没有在原会议上发表，而由作者在1936年自行出版。后来的版本加入与甘地等人的争论，不能把所有附录都当作最初演讲内容。',
    impact: '文本成为印度反种姓思想的重要资源，把民主原则与日常社会结构的改变联系起来。',
    sourceNote: 'Columbia University MSE About、原作导言与时间线，明确1936年孟买自印及邀请撤销。',
  }),
  work({
    id: 'modern-tagore-sadhana',
    year: 1913,
    title: '泰戈尔《人生的实现》英文讲演集出版',
    authors: ['tagore'],
    place: 'bengal',
    importance: 4,
    topics: ['宗教', '交流'],
    summary: '泰戈尔借印度精神传统讨论人与自然、自我与世界的联系，尝试回应现代生活中的疏离问题。',
    background: '跨国旅行和美国讲演，使他需要向不同文化背景的读者说明印度思想与自身的人生理解。',
    detail:
      'Sadhana由讲演和随笔组织而成，1913年在伦敦出版。本条记录哲学论说，区别于《吉檀迦利》的诗歌结集和文学获奖。',
    impact: '作品扩展其作为思想家的国际阅读，使精神修养、普遍人性与跨文化理解进入共同讨论。',
    sourceNote:
      'Visva-Bharati大学英文书目：Sadhana，London: Macmillan，1913年10月，说明美国演讲背景。',
  }),
  work({
    id: 'modern-krishnamurti-dissolution',
    year: 1929,
    title: '克里希那穆提解散东方明星社',
    authors: ['krishnamurti'],
    place: 'ommen',
    importance: 4,
    topics: ['宗教', '教育学术'],
    summary:
      '克里希那穆提在公开演讲中拒绝世界导师角色，解散由其领导的组织，并质疑依靠外部精神权威寻求真理。',
    background: '神智学组织多年将他塑造为特殊导师，形成支持者、财产和国际活动网络。',
    detail:
      '演讲对组织、信条和追随关系的批评，不能被重新变成要求所有人服从他个人的新权威。解散组织也不同于否认任何合作与教育活动。',
    impact: '这次决定成为其独立教学的明确转折，并影响后来的教育与心理探索。',
    sourceNote:
      'Krishnamurti Foundation Trust保存的Dissolution Speech，日期1929年8月3日，地点Ommen。',
  }),
  work({
    id: 'modern-epictetus-discourses',
    year: 101,
    endYear: 130,
    dateLabel: '约公元2世纪前期',
    dateNote:
      '以爱比克泰德在尼科波利斯讲授的约略时期作阅读分段；《论说》由阿里安记述，不据此推算逐篇写作或初版年份。',
    title: '爱比克泰德讲授斯多亚伦理与《论说》传统',
    authors: ['epictetus'],
    place: 'nicopolis',
    importance: 4,
    summary: '爱比克泰德以判断、选择和适当关切他人为核心，训练学生区分个人可负责之事与外部遭遇。',
    background: '希腊化斯多亚思想在罗马帝国中持续传播，哲学学校把论证与日常生活训练结合起来。',
    detail:
      '现存《论说》主要经学生阿里安记述，不能逐句视作录音般的原话。所谓不受控制之物也不意味着对他人和社会义务毫无关心。',
    impact: '其教学成为研究斯多亚伦理实践的重要材料，并对后世修养和自由观产生长期影响。',
    sourceNote:
      'SEP Epictetus §1 Life and Works、§4与教学方法部分；生卒与讲授年代保持约略，不造精确刊行年。',
  }),
  work({
    id: 'modern-marcus-meditations',
    year: 161,
    endYear: 180,
    dateLabel: '约公元2世纪后期',
    dateNote:
      '161—180为皇帝在位期的阅读边界，部分笔记写于晚年军事活动中；不是所有篇章的精确成书区间。',
    title: '马可·奥勒留的《沉思录》修养笔记',
    authors: ['marcus'],
    place: 'rome',
    importance: 4,
    summary:
      '马可·奥勒留以自我提醒的笔记检视欲望、判断与责任，尝试在统治和战争处境中实践斯多亚伦理。',
    background: '罗马帝国面临边境战争、内部冲突与疫病，哲学修养不能脱离其复杂的统治现实。',
    detail:
      '文本原本并非面向公众编写的完整教程，也不能据笔记中的道德理想直接推断其政治行为已经符合这些理想。',
    impact:
      '这些记录保存了古代伦理学如何进入日常自我训练的具体形态，成为斯多亚传统的重要阅读作品。',
    sourceNote:
      'SEP Marcus Aurelius §1 Life and Works，记121—180生卒、161年继位及晚年军事期间的笔记。',
  }),
  work({
    id: 'modern-sextus-skepticism',
    year: 101,
    endYear: 300,
    dateLabel: '约公元2—3世纪',
    dateNote:
      '101和300仅为两个世纪的阅读分期边界；塞克斯都的准确生平、活动地点及作品成书年仍不确定。',
    title: '塞克斯都《皮浪主义纲要》与悬置判断',
    authors: ['sextus'],
    place: 'greek',
    importance: 4,
    summary:
      '塞克斯都整理怀疑论的论证方法，以相互抗衡的理由促成悬置判断，而非宣布自己已经证明一切不可知。',
    background: '古代哲学诸学派争论知识、感官和理性的标准，怀疑论者持续检验这些标准的论证根据。',
    detail:
      '悬置判断并不自动排除日常行动。作品的准确年代与作者同医学学派的关系仍有争议，本条用宽范围保存限制。',
    impact: '著作保存皮浪派的重要材料，在文艺复兴和近代重新传播后推动知识与怀疑问题的讨论。',
    sourceNote: 'SEP Sextus Empiricus导言及§1—3，人物可能活于公元2或3世纪；不虚构精确出版年份。',
  }),
  work({
    id: 'modern-more-utopia',
    year: 1516,
    title: '托马斯·莫尔《乌托邦》出版',
    authors: ['more'],
    place: 'leuven',
    importance: 4,
    topics: ['文学艺术', '政治', '社会'],
    summary: '莫尔借虚构旅行与对话，检视财产、劳动、刑罚和公共生活的制度安排。',
    background: '文艺复兴人文主义借古典材料重新讨论政治和伦理，也面对欧洲社会中的贫困与权力问题。',
    detail:
      '对话中的不同发言不能不加区分地当作作者最终主张。虚构岛屿既提供比较镜子，也保留读者必须判断的矛盾。',
    impact: '作品使乌托邦成为政治想象的重要形式，并持续参与关于理想制度与现实改革的争论。',
    sourceNote: 'SEP Thomas More关于Utopia的专节及1516年初版书目，区别1518年附入诗集的后续版本。',
  }),
  work({
    id: 'modern-hushi-history-chinese-philosophy',
    year: 1919,
    title: '胡适《中国哲学史大纲》上卷出版',
    authors: ['hushi'],
    place: 'beijing',
    importance: 5,
    topics: ['教育学术'],
    summary: '胡适将中国古代思想置于历史问题与文献证据中讨论，推动现代中国哲学史的学科写作。',
    background: '新式大学课程和新文化运动，使传统典籍如何成为现代学术研究对象成为公共问题。',
    detail:
      '上卷从北大的中国哲学史讲义发展而来，重视材料辨析及思想之间的历史关联。它不是一部已经完成全部时代的通史，原订续卷未在作者生前完成。',
    impact: '著作使哲学史的材料选择、历史分期与研究方法进入持续争论，也为后来的学术写作提供参照。',
    sourceNote:
      '胡适纪念馆“传略（著述年表）”1917、1919年条明确北大教学与1919年2月上卷出版；坐标指北京教学研究语境，不作印刷地判断。',
    moreSources: [
      {
        title: '中央研究院胡适纪念馆 · 整理国故运动的旗手',
        url: 'https://hushih.mh.sinica.edu.tw/Hushih_Content?mid=94',
        note: '“中国哲学史”部分说明讲义、蔡元培序、1919年初出版与未完成中下卷。',
      },
    ],
  }),
  work({
    id: 'modern-chenduxiu-youth-journal',
    year: 1915,
    title: '陈独秀创办《青年杂志》并发表《敬告青年》',
    authors: ['chenduxiu'],
    place: 'shanghai',
    importance: 5,
    topics: ['社会', '教育学术'],
    summary: '刊物通过青年伦理与思想论说，讨论个人自主、科学态度和面向世界的文化选择。',
    background: '辛亥革命后政治与社会秩序持续变化，知识界重新检讨人格、家庭、教育及传统权威。',
    detail:
      '1915年创刊号的《敬告青年》把独立判断放在青年自我形成的中心。刊物到1916年9月第二卷才改名《新青年》，后续作者群和议题也不断变化，不能把后来全部政治主张倒置为创刊时的统一纲领。',
    impact:
      '期刊成为新文化运动的重要讨论空间，使伦理、文学和社会思想经由现代报刊进入更广的公共生活。',
    sourceNote:
      '北大图书馆2015年百年展说明：1915年9月15日《青年杂志》创刊，1916年9月第二卷起改名《新青年》。',
    moreSources: [
      {
        title: '中国社会科学院大学 · 建党之前：陈独秀在上海',
        url: 'https://ztjy.ucass.edu.cn/info/1006/1949.htm',
        note: '“创办《新青年》声名鹊起”部分引1915年创刊号《敬告青年》，讨论六项青年伦理、办刊取向与上海语境。',
      },
    ],
  }),
  work({
    id: 'modern-mao-practice-contradiction-lectures',
    year: 1937,
    dateLabel: '1937年讲授与写作；今本后经修订',
    dateNote:
      '本条记录延安抗大的哲学讲授及《辩证法唯物论（讲授提纲）》的早期文本，不把今本当作1937年原样公开出版。《实践论》1950年修订，1950年12月29日见《人民日报》，1951年收入选集；《矛盾论》另经修改后于1952年刊行。',
    title: '毛泽东哲学讲授形成《实践论》《矛盾论》的早期文本',
    authors: ['mao'],
    place: 'yanan',
    importance: 5,
    topics: ['政治', '教育学术'],
    summary:
      '延安时期的哲学讲授把实践与认识、矛盾的普遍性和特殊性，同具体社会条件及行动问题相联系。',
    background:
      '抗大组织哲学教学，马克思主义概念通过中文论说、苏联哲学材料与中国革命经验相互接触。',
    detail:
      '认识论部分讨论经验、概念和实践检验的关系；辩证法部分分析矛盾、主次关系与条件变化。今天常读的两篇不是原始讲授提纲的简单复印，修订中有删节、补充和论述调整。',
    impact:
      '这些论说在中国马克思主义哲学教育及国际政治思想讨论中广泛传播，理解其影响需同时考察版本与使用语境。',
    sourceNote:
      '奚景鹏《党的文献》2007年第4期文章：开头列1937年5—8月讲授，早期版本清单列1937年9月油印本；末段明确1950年《实践论》修改、1950年12月29日报刊发表与1952年《矛盾论》修改发表。',
  }),
  work({
    id: 'modern-jin-on-dao',
    year: 1940,
    title: '金岳霖《论道》初版',
    authors: ['jin'],
    place: 'kunming',
    importance: 4,
    topics: ['教育学术'],
    summary: '金岳霖以道、式、能等基本范畴，通过概念分析与逻辑推演尝试建立形而上学体系。',
    background:
      '现代中国哲学家在大学迁徙与战争处境中，持续尝试使中国思想资源与现代逻辑方法相互对话。',
    detail:
      '作品把研究世界的根本结构同理智理解和人生感受联系起来。这里的道属于经过专门界定的理论概念，不能直接等同于古代不同学派的所有用法，也不能仅靠题名将它归入道教经典。',
    impact:
      '著作提供了以中文进行系统形而上学论证的现代案例，成为研究中国哲学与逻辑分析关系的重要材料。',
    sourceNote:
      '国家图书馆初版题录明确1940年；不是该书2015年重印时间。坐标指西南联大昆明研究语境，出版地题录另见上海或长沙记录，不据此推断1940年行程。',
    moreSources: [
      {
        title: 'CiNii Books · 东京大学藏《论道》题录',
        url: 'https://ci.nii.ac.jp/ncid/BA56097962?l=en',
        note: 'NCID BA56097962，金岳霖著，商务印书馆1940年9月；此馆藏题录出版地为长沙。',
      },
      {
        title: '商务印书馆 · 《论道》内容简介',
        url: 'https://www.cp.com.cn/book/3bf46e31-0.html',
        note: '介绍道、式、能范畴及逻辑推演的方法；该页面的2015年为重印本日期。',
      },
      {
        title: '清华大学校史馆 · 金岳霖的西南联大时期',
        url: 'https://xsg.tsinghua.edu.cn/info/1004/1945.htm',
        note: '胡军文章“潜心治学”部分列西南联大学术语境及《论道》1940年出版。',
      },
    ],
  }),
  work({
    id: 'modern-tang-spiritual-value-chinese-culture',
    year: 1953,
    title: '唐君毅《中国文化之精神价值》出版',
    authors: ['tang'],
    place: 'taipei',
    importance: 4,
    topics: ['社会', '教育学术'],
    summary: '唐君毅从人格、道德与文化创造的关系出发，讨论中国思想资源在现代社会中的意义。',
    background:
      '战争与社会变迁之后，现代新儒家在香港、台湾等地重新思考传统文化、科学和现代制度的关系。',
    detail:
      '书名中的精神价值涉及人为何具有不能归为欲望满足或工具效用的尊严。其对中西文化的比较是作者提出的哲学解释，应连同概括范围和论证限制一同检视。此书不同于1958年的《文化意识与道德理性》。',
    impact: '作品成为现代新儒家文化哲学的阅读节点，连接道德主体、教育实践与传统文化的现代解释。',
    sourceNote:
      'SEP Modern Confucianism §1、§2及原始书目：1953年The Spiritual Value of Chinese Culture，台北正中书局；《文化意识与道德理性》书目另列1958年香港友联。出版地不代表作者1953年居于台北。',
  }),
]
