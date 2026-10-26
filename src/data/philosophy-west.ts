import type { HistoryEvent, Person, Source } from '../types'

const sep = (slug: string, title: string, note: string): Source => ({
  title: `Stanford Encyclopedia of Philosophy · ${title}`,
  url: `https://plato.stanford.edu/entries/${slug}/`,
  note,
})

type Philosopher = {
  id: string
  name: string
  aliases: string[]
  birth: number | null
  death: number | null
  era?: string
  slug: string
  sourceTitle: string
  summary: string
  biography: string
}
const philosophers: Philosopher[] = [
  {
    id: 'phil-thales',
    name: '泰勒斯',
    aliases: ['Thales', '米利都的泰勒斯'],
    birth: null,
    death: null,
    era: '公元前6世纪前期，生卒年不详',
    slug: 'presocratics',
    sourceTitle: 'Presocratic Philosophy',
    summary: '米利都早期自然哲学家，尝试从自然本身解释世界；其思想主要通过后世转述保存。',
    biography:
      '泰勒斯活动于公元前6世纪前期的米利都。亚里士多德把他列入探求自然原因的早期思想家，并将以水为根本原理的观点归于他；这类记载晚于本人，不能当作保存完整的本人著作。\n\n米利都思想家把天象、物质与变化放进共同的解释问题中，尚未按现代学科分开哲学与科学。日食预言等著名故事的可靠性受到质疑，本条不据此确定他的活动日期或生卒年。',
  },
  {
    id: 'phil-socrates',
    name: '苏格拉底',
    aliases: ['Socrates'],
    birth: -469,
    death: -399,
    slug: 'socrates',
    sourceTitle: 'Socrates',
    summary: '以对话追问德性、知识和善的雅典哲学家，没有留下本人著作。',
    biography:
      '苏格拉底通过追问和反驳检验他人对勇敢、正义与德性的理解，强调人应审视自己的生活。他没有留下著作，我们主要依赖柏拉图、色诺芬和喜剧作家等不同立场的记述。\n\n公元前399年，他在雅典受审并被处死。如何区别历史人物与作品中的“苏格拉底”，是持续讨论的苏格拉底问题；不能把柏拉图对话中的所有学说都直接归于本人。',
  },
  {
    id: 'phil-plato',
    name: '柏拉图',
    aliases: ['Plato'],
    birth: null,
    death: -347,
    era: '约公元前5世纪后期—前347年；生年有分歧',
    slug: 'plato',
    sourceTitle: 'Plato',
    summary: '以哲学对话讨论正义、知识、理念与灵魂的古希腊思想家。',
    biography:
      '柏拉图继承并重塑苏格拉底式的对话，在《理想国》等作品中把政治秩序、人的欲望与知识问题联系起来。他的对话由不同人物发言，人物的陈述并不都能简单等同于作者的最终立场。\n\n柏拉图的理念、灵魂与教育论深刻影响后来的哲学传统。现存作品的相对先后、某些篇章的真伪以及具体写作时间仍有争议；生年也有前429、前427等说法，因此不在身份字段填写单一确切生年。',
  },
  {
    id: 'phil-aristotle',
    name: '亚里士多德',
    aliases: ['Aristotle'],
    birth: -384,
    death: -322,
    slug: 'aristotle',
    sourceTitle: 'Aristotle',
    summary: '研究逻辑、自然、伦理和政治的古希腊哲学家，吕克昂学术共同体的重要组织者。',
    biography:
      '亚里士多德曾在柏拉图学园学习，后来建立自己的研究共同体。他的研究横跨逻辑、生物、形而上学、伦理与政治，强调概念辨析、解释原因以及从具体材料展开讨论。\n\n现存著作多具有讲授与研究材料的性质，不宜按现代定稿专著理解其全部结构。其作品经希腊、阿拉伯语和拉丁语传统不断解释与争辩，对中世纪及近代学术产生长期影响。',
  },
  {
    id: 'phil-epicurus',
    name: '伊壁鸠鲁',
    aliases: ['Epicurus'],
    birth: -341,
    death: -270,
    slug: 'epicurus',
    sourceTitle: 'Epicurus',
    summary: '主张通过理解自然、节制欲望和友谊减少身心痛苦的希腊化哲学家。',
    biography:
      '伊壁鸠鲁以原子论解释自然，并把幸福理解为身体免于痛苦、心灵免于扰动。他尤其反对对死亡和神罚的恐惧，认为哲学应帮助人辨别必要欲望与无止境的追逐。\n\n他在雅典组织被称为“花园”的学习共同体，友谊和共同生活是实践的一部分。其大量作品已经失传，今人主要依据书信、格言、残卷与后世作者重建思想，不能将后继者的每个观点都视作原说。',
  },
  {
    id: 'phil-zeno-citium',
    name: '基提翁的芝诺',
    aliases: ['Zeno of Citium', '斯多亚学派芝诺'],
    birth: null,
    death: null,
    era: '公元前4—3世纪；生卒年约略',
    slug: 'stoicism',
    sourceTitle: 'Stoicism',
    summary: '约公元前300年在雅典创立斯多亚学派，以德性与合乎理性的生活为核心。',
    biography:
      '基提翁的芝诺在雅典的彩绘柱廊讲学，斯多亚学派因柱廊得名。学派将逻辑、自然与伦理视为互相支持的整体，以德性而非财富、名望作为幸福生活的根本。\n\n芝诺本人的作品大多不存，学派后来经克里安西、克律西波及罗马时期思想家继续发展。早期斯多亚与后世通俗理解不能完全等同，也应与埃利亚的芝诺区别。',
  },
  {
    id: 'phil-plotinus',
    name: '普罗提诺',
    aliases: ['Plotinus'],
    birth: null,
    death: 270,
    era: '约204或205—270年',
    slug: 'plotinus',
    sourceTitle: 'Plotinus',
    summary: '晚古代柏拉图传统的重要思想家，以太一、理智与灵魂讨论现实的层次。',
    biography:
      '普罗提诺在亚历山大里亚学习，后来在罗马形成讲学圈。他以柏拉图传统为基础，讨论感性世界、灵魂、理智与太一之间的关系，并把哲学活动与人的精神转变联系起来。\n\n其作品后来由学生波菲利整理为《九章集》。所谓“新柏拉图主义”是近代学者的分类，并非他本人宣称建立的新学派；其生年有204、205年等推算，本条保留不确定性。',
  },
  {
    id: 'phil-augustine',
    name: '奥古斯丁',
    aliases: ['Augustine of Hippo', '希波的奥古斯丁'],
    birth: 354,
    death: 430,
    slug: 'augustine',
    sourceTitle: 'Augustine of Hippo',
    summary: '晚古代北非基督教思想家，持续讨论记忆、时间、自由意志与恩典。',
    biography:
      '奥古斯丁从修辞教育出发，经历摩尼教、怀疑论及柏拉图传统的影响，在386年转向基督教生活。他随后返回北非，成为希波主教，写作与教会争论相互交织。\n\n《忏悔录》把生命叙述与记忆、时间和意志的分析结合，《上帝之城》回应历史秩序与宗教共同体的问题。其思想在拉丁传统中影响深远，但对罪、恩典与自由的解释历来存在批评与分歧。',
  },
  {
    id: 'phil-avicenna',
    name: '伊本·西那',
    aliases: ['Ibn Sina', 'Avicenna', '阿维森纳', '伊本西那'],
    birth: null,
    death: 1037,
    era: '约10世纪后期—1037年；生年有争议',
    slug: 'ibn-sina',
    sourceTitle: 'Ibn Sina [Avicenna]',
    summary: '伊斯兰世界的哲学家与医师，把逻辑、自然科学和形而上学组织成系统。',
    biography:
      '伊本·西那成长于布哈拉地区，在不同宫廷担任医师、顾问并从事研究。他以阿拉伯语为主，也使用波斯语写作，将希腊晚古代传统与伊斯兰世界的知识讨论结合。\n\n《治疗论》是一部哲学与科学总论，并非仅讲医学；其存在论、灵魂论与知识论影响阿拉伯语及拉丁语学术。传统生年980年受到研究修正，SEP认为无法精确确定，故身份字段保留未知。',
  },
  {
    id: 'phil-averroes',
    name: '伊本·鲁世德',
    aliases: ['Ibn Rushd', 'Averroes', '阿威罗伊', '伊本鲁世德'],
    birth: 1126,
    death: 1198,
    slug: 'ibn-rushd',
    sourceTitle: 'Ibn Rushd [Averroes]',
    summary: '安达卢西亚哲学家、医师与法官，研究亚里士多德并讨论哲学与宗教法的关系。',
    biography:
      '伊本·鲁世德生活于安达卢西亚与北非的学术和政治环境中，为亚里士多德多部著作写作不同规模的注释，也处理医学、法学和宗教解释问题。\n\n《决定论》讨论哲学研究在宗教法中的地位，并区别不同论证和教导方式。他的作品经希伯来语、拉丁语传播后引发广泛争论；其思想不能简化成主张两套互不相干的真理。',
  },
  {
    id: 'phil-aquinas',
    name: '托马斯·阿奎那',
    aliases: ['Thomas Aquinas', '阿奎那'],
    birth: null,
    death: 1274,
    era: '约1225—1274年',
    slug: 'aquinas',
    sourceTitle: 'Thomas Aquinas',
    summary: '中世纪经院哲学家和神学家，以系统论证重释亚里士多德及基督教传统。',
    biography:
      '阿奎那出身意大利，加入多明我会，并在巴黎与意大利多处学术机构讲授。他以提出问题、列举异议和回应论证的方式，处理存在、知识、意志和自然法等问题。\n\n《神学大全》将人的行动、德性和法律纳入系统神学讨论，写作最终未完成。他对理性论证和启示的区分影响深远，但具体学说在生前身后均引发争议，不能视作中世纪学者的一致意见。',
  },
  {
    id: 'phil-francis-bacon',
    name: '弗朗西斯·培根',
    aliases: ['Francis Bacon', '培根'],
    birth: 1561,
    death: 1626,
    slug: 'francis-bacon',
    sourceTitle: 'Francis Bacon',
    summary: '主张改造知识组织与自然研究方法的英国思想家、法学家和政治人物。',
    biography:
      '培根把自然研究与改善人的生活联系起来，批评未经检验的权威及习惯性判断。他倡导有组织地积累材料、设计实验，并通过比较和排除建立解释。\n\n《新工具》属于未完成的知识革新计划《大复兴》的一部分。他强调合作与研究机构的重要性；其归纳法对近代科学文化很有影响，但不能把所有实验科学的发展都归于这一套方法。',
  },
  {
    id: 'phil-descartes',
    name: '勒内·笛卡尔',
    aliases: ['René Descartes', 'Descartes', '笛卡尔'],
    birth: 1596,
    death: 1650,
    slug: 'descartes',
    sourceTitle: 'René Descartes',
    summary: '以方法怀疑、思维主体与心身问题重塑近代哲学的法国思想家和数学家。',
    biography:
      '笛卡尔同时从事数学、自然研究和形而上学，尝试为知识找到能够经受怀疑的基础。《方法谈》与《第一哲学沉思集》分别以不同形式说明研究方法与论证。\n\n他区分思维与广延，并追问我们怎样从自身思想认识外部世界。其心身关系和知识基础论引发长期辩论；“我思”并不是让人停止质疑，而是他重建确定性的起点。',
  },
  {
    id: 'phil-hobbes',
    name: '托马斯·霍布斯',
    aliases: ['Thomas Hobbes', 'Hobbes', '霍布斯'],
    birth: 1588,
    death: 1679,
    slug: 'hobbes',
    sourceTitle: 'Thomas Hobbes',
    summary: '以人的感知、欲望、契约和主权解释政治秩序的英国哲学家。',
    biography:
      '霍布斯把人理解为自然世界中的存在者，尝试用物质运动、语言与推理解释认识和行动。英国内战和政治流亡的经验构成其政治哲学的重要背景。\n\n《利维坦》从相互不安全的处境出发说明建立公共权威的理由，并讨论宗教与国家。他对强大主权的辩护、对服从和自我保存的处理，均持续受到不同政治传统的审视。',
  },
  {
    id: 'phil-spinoza',
    name: '巴鲁赫·斯宾诺莎',
    aliases: ['Baruch Spinoza', 'Benedictus de Spinoza', '斯宾诺莎'],
    birth: 1632,
    death: 1677,
    slug: 'spinoza',
    sourceTitle: 'Baruch Spinoza',
    summary: '以神或自然、情感与自由为主题的荷兰哲学家。',
    biography:
      '斯宾诺莎生活于荷兰的宗教争论与知识网络中，发展了把人纳入自然因果秩序的哲学。《伦理学》采用定义、公理和命题的形式，讨论实体、心灵、情感与人的自由。\n\n他把自由与理解原因、减少被动情感联系起来，也在政治和宗教著作中捍卫思想讨论的空间。《伦理学》在其去世后才出版，作品的接受史不等于他亲历的公共活动。',
  },
  {
    id: 'phil-locke',
    name: '约翰·洛克',
    aliases: ['John Locke', 'Locke', '洛克'],
    birth: 1632,
    death: 1704,
    slug: 'locke',
    sourceTitle: 'John Locke',
    summary: '研究知识来源、政府正当性和宗教宽容的英国哲学家。',
    biography:
      '洛克在《人类理解论》中考察经验、观念与知识的界限，反对未经检验地接受先天原则。他也参与医学、经济和殖民行政事务，思想与政治实践之间有需要辨析的张力。\n\n《政府论》以自然权利、同意和政府责任解释政治正当性。他关于宽容和自由的论述影响很大，但其适用范围、财产观念与奴隶制及殖民背景的关系仍是重要争论问题。',
  },
  {
    id: 'phil-leibniz',
    name: '戈特弗里德·威廉·莱布尼茨',
    aliases: ['Gottfried Wilhelm Leibniz', 'Leibniz', '莱布尼茨'],
    birth: 1646,
    death: 1716,
    slug: 'leibniz',
    sourceTitle: 'Gottfried Wilhelm Leibniz',
    summary: '跨哲学、数学和历史研究的思想家，以单子与充足理由等概念讨论世界。',
    biography:
      '莱布尼茨长期为德意志诸侯宫廷工作，同时通过广泛通信开展数学、哲学与历史研究。他试图协调古代、经院和近代机械论思想，在多样观点中寻找可以共同成立的理由。\n\n其哲学讨论实体、可能性、因果与秩序，《单子论》是晚期的简短概括而非生前出版的总纲。许多思想散见于书信与短文，后来整理出版的文本不应一律按写作年份称为公开发行。',
  },
  {
    id: 'phil-hume',
    name: '大卫·休谟',
    aliases: ['David Hume', 'Hume', '休谟'],
    birth: 1711,
    death: 1776,
    slug: 'hume',
    sourceTitle: 'David Hume',
    summary: '苏格兰启蒙思想家，从经验、习惯与情感考察认识和道德生活。',
    biography:
      '休谟希望把观察人的心理与行为的方法引入哲学，研究信念、因果、情感、道德与政治。《人性论》是其早期的大型尝试，出版时的影响并不等于后来在哲学史中的地位。\n\n他追问经验怎样支持因果推断，并强调情感在行动和道德判断中的作用。称他为怀疑论者并不意味着他否认日常生活或科学实践，而应结合他对人的自然能力与局限的分析理解。',
  },
  {
    id: 'phil-rousseau',
    name: '让-雅克·卢梭',
    aliases: ['Jean-Jacques Rousseau', 'Rousseau', '卢梭'],
    birth: 1712,
    death: 1778,
    slug: 'rousseau',
    sourceTitle: 'Jean Jacques Rousseau',
    summary: '围绕自由、不平等、政治共同体与教育展开批判的日内瓦思想家。',
    biography:
      '卢梭关注人在相互依赖和社会评价中怎样失去自由，批评文明进步与道德改善可以简单等同的看法。他的政治论述与道德心理分析彼此联系。\n\n《社会契约论》讨论公民作为主权者共同立法的可能，《爱弥儿》讨论教育与自主生活。两书不能理解为现实社会已经实现的制度记录，其自由、平等和教育观念也包含持续受到批评的限制。',
  },
  {
    id: 'phil-kant',
    name: '伊曼努尔·康德',
    aliases: ['Immanuel Kant', 'Kant', '康德'],
    birth: 1724,
    death: 1804,
    slug: 'kant',
    sourceTitle: 'Immanuel Kant',
    summary: '批判哲学的重要思想家，系统讨论知识可能性、道德自律与判断力。',
    biography:
      '康德长期在哥尼斯堡学习与任教。《纯粹理性批判》追问经验知识如何可能，并分析感性和知性怎样共同参与认识，而非把知识简单归于外物或孤立的理性。\n\n《实践理性批判》讨论自由、义务和道德自律，《判断力批判》进一步处理审美和目的性问题。他对认识界限与人的自主性的研究，成为后来德意志哲学和众多现代争论的重要参照。',
  },
  {
    id: 'phil-wollstonecraft',
    name: '玛丽·沃斯通克拉夫特',
    aliases: ['Mary Wollstonecraft', '沃斯通克拉夫特'],
    birth: 1759,
    death: 1797,
    slug: 'wollstonecraft',
    sourceTitle: 'Mary Wollstonecraft',
    summary: '从教育、理性与平等批评女性处境的英国道德和政治哲学家。',
    biography:
      '沃斯通克拉夫特曾任教师、家庭女教师和职业作者，熟悉女性受到的教育与职业限制。她把女性处境放进社会习俗、财产关系和道德教育的问题中讨论。\n\n《女权辩护》反对把女性训练成依赖赞美与婚姻的附属者，主张理性和德性应对男女共同适用。她的论述推动了平等教育和女性权利的辩论，也需放在18世纪的具体社会边界中理解。',
  },
  {
    id: 'phil-hegel',
    name: '格奥尔格·威廉·弗里德里希·黑格尔',
    aliases: ['Georg Wilhelm Friedrich Hegel', 'Hegel', '黑格尔'],
    birth: 1770,
    death: 1831,
    slug: 'hegel',
    sourceTitle: 'Georg Wilhelm Friedrich Hegel',
    summary: '德意志唯心主义哲学家，研究意识、逻辑、历史与社会制度中的自由。',
    biography:
      '黑格尔在康德之后的德意志哲学讨论中发展系统思想。《精神现象学》让意识经历多种认识和实践立场，检验各自的确定性及其内在困难。\n\n他后来以逻辑、自然与精神的系统讨论自由及其社会形式，其著作和讲演对马克思等后继者产生巨大影响。不能用固定的“正反合”口号替代对具体论证的阅读，也不能将其历史观直接当作事实年表。',
  },
  {
    id: 'phil-schopenhauer',
    name: '阿图尔·叔本华',
    aliases: ['Arthur Schopenhauer', 'Schopenhauer', '叔本华'],
    birth: 1788,
    death: 1860,
    slug: 'schopenhauer',
    sourceTitle: 'Arthur Schopenhauer',
    summary: '以意志、痛苦与审美经验解释人生处境的19世纪哲学家。',
    biography:
      '叔本华借鉴康德、柏拉图及他所接触的印度思想，提出以表象和意志理解世界的体系。他把无止境的欲望视为冲突和痛苦的重要来源。\n\n《作为意志和表象的世界》不仅描绘人的受苦，也讨论审美体验、同情与克制欲望的可能。其著作对文学、音乐及后来的哲学产生影响，不能仅以“悲观”一词概括全部论述。',
  },
  {
    id: 'phil-kierkegaard',
    name: '索伦·克尔凯郭尔',
    aliases: ['Søren Kierkegaard', 'Kierkegaard', '克尔凯郭尔', '祁克果'],
    birth: 1813,
    death: 1855,
    slug: 'kierkegaard',
    sourceTitle: 'Søren Kierkegaard',
    summary: '以个人存在、抉择、信仰与焦虑为中心的丹麦思想家。',
    biography:
      '克尔凯郭尔以化名、论辩和宗教写作呈现不同生活立场，反对把存在者的处境完全消解在抽象体系中。他的作者与化名发言者之间的距离，是阅读作品时的重要问题。\n\n《非此即彼》《恐惧与战栗》等著作讨论审美、伦理和宗教生活的张力。他对有限个人、责任与信仰的关注影响后来的存在哲学，但“存在主义之父”的称号不能代替对其基督教背景的理解。',
  },
  {
    id: 'phil-mill',
    name: '约翰·斯图亚特·密尔',
    aliases: ['John Stuart Mill', 'J. S. Mill', '密尔', '穆勒'],
    birth: 1806,
    death: 1873,
    slug: 'mill',
    sourceTitle: 'John Stuart Mill',
    summary: '英国经验主义和功利主义思想家，关注自由、公共讨论与社会改革。',
    biography:
      '密尔承接边沁与父亲詹姆斯·密尔的功利主义教育，同时吸收浪漫主义和历史思想的挑战。他研究逻辑、知识、政治经济与伦理，并参与公共改革论争。\n\n《论自由》不仅讨论政府权力，也关注社会习俗和多数意见对个性的压制。他以伤害他人的风险区分干预理由，但其自由原则的范围与殖民论述之间的张力同样需要审视。',
  },
  {
    id: 'phil-marx',
    name: '卡尔·马克思',
    aliases: ['Karl Marx', 'Marx', '马克思'],
    birth: 1818,
    death: 1883,
    slug: 'marx',
    sourceTitle: 'Karl Marx',
    summary: '从劳动、生产关系和历史变化批判资本主义的思想家与政治活动者。',
    biography:
      '马克思受过哲学训练，并在与黑格尔传统及政治经济学的争论中形成自己的研究方向。他把人的生活条件、劳动和社会关系纳入对历史变化的解释。\n\n《资本论》研究商品、价值、剩余价值与资本积累，第一卷于1867年出版。他的理论与政治活动影响深远，其不同阶段的思想、未完成手稿与后世政治实践之间需要区分，不能简单互相替代。',
  },
  {
    id: 'phil-frege',
    name: '戈特洛布·弗雷格',
    aliases: ['Gottlob Frege', 'Frege', '弗雷格'],
    birth: 1848,
    death: 1925,
    slug: 'frege',
    sourceTitle: 'Gottlob Frege',
    summary: '现代逻辑与语言哲学的重要开拓者，试图为算术提供逻辑基础。',
    biography:
      '弗雷格在耶拿从事数学和哲学研究，用形式符号表达量化、概念与推理关系。《概念文字》提出的逻辑体系超出传统主谓句分析，对现代谓词逻辑意义重大。\n\n他后来区分语言表达的涵义与指称，并继续尝试从逻辑建立算术。其完整逻辑主义方案遇到悖论与不一致问题，但这些困难没有抹去他在逻辑和语言分析中的贡献。',
  },
  {
    id: 'phil-nietzsche',
    name: '弗里德里希·尼采',
    aliases: ['Friedrich Nietzsche', 'Nietzsche', '尼采'],
    birth: 1844,
    death: 1900,
    slug: 'nietzsche',
    sourceTitle: 'Friedrich Nietzsche',
    summary: '以价值批判、谱系考察和多样文体反思欧洲道德文化的哲学家。',
    biography:
      '尼采受古典语文学训练，曾在巴塞尔任教，后来以格言、论战和文学化形式展开哲学。他追问道德价值形成的心理与历史条件，批评某些否定生命的价值取向。\n\n《查拉图斯特拉如是说》等作品提出自我超越和价值创造的问题。作品中的人物声音与修辞不宜当作简单的教条；身后编辑的笔记也不能不加区别地视作本人完成的著作。',
  },
  {
    id: 'phil-husserl',
    name: '埃德蒙德·胡塞尔',
    aliases: ['Edmund Husserl', 'Husserl', '胡塞尔'],
    birth: 1859,
    death: 1938,
    slug: 'husserl',
    sourceTitle: 'Edmund Husserl',
    summary: '现象学的重要奠基者，研究意识的意向性、意义与知识基础。',
    biography:
      '胡塞尔从数学研究转向哲学，曾在哈雷和哥廷根等地任教。他反对把逻辑规律简单还原为心理事实，强调意义与判断的有效性需要独立分析。\n\n《逻辑研究》以意向性等问题开辟现象学道路，后来又发展出更广泛的时间、主体间性和生活世界讨论。《逻辑研究》节点呈现早期著作，不把后期思想倒置为其早年已经完成的体系。',
  },
  {
    id: 'phil-william-james',
    name: '威廉·詹姆斯',
    aliases: ['William James', '詹姆斯'],
    birth: 1842,
    death: 1910,
    slug: 'james',
    sourceTitle: 'William James',
    summary: '在心理学、宗教研究与哲学之间发展的美国实用主义思想家。',
    biography:
      '詹姆斯在哈佛接受科学和医学训练，研究心理过程、经验与信念。他的《心理学原理》把生理研究、心理观察和哲学问题放在一起，讨论思想之流等概念。\n\n《实用主义》以观念在经验中的后果说明哲学分歧，并研究真理、信念与行动的关系。实用主义不能简单等同于“有眼前利益就是真理”，其论证仍要求讨论经验、检验和生活中的实际差别。',
  },
]

export const westernPhilosophyPeople: Person[] = philosophers.map(
  ({ slug, sourceTitle, ...person }) => ({
    ...person,
    role: '哲学家与思想史人物',
    color: '#7b809d',
    recordKind: 'curated',
    sources: [
      sep(
        slug,
        sourceTitle,
        '参见条目导言、Life / Biography 与相关著作讨论；生卒争议在人物介绍中保留。中文阅读为本站独立编写。',
      ),
    ],
  }),
)
const personIndex = new Map(philosophers.map((person) => [person.id, person]))
type PhilosophicalEvent = Omit<
  HistoryEvent,
  'category' | 'people' | 'sources' | 'themes' | 'locationNote'
> & {
  person: string
  sourceNote: string
  topics?: string[]
  moreSources?: Source[]
}
const philosophyEvent = ({
  person,
  sourceNote,
  topics = [],
  moreSources = [],
  ...event
}: PhilosophicalEvent): HistoryEvent => {
  const record = personIndex.get(person)!
  return {
    ...event,
    category: '文化',
    people: [person],
    themes: ['哲学', ...topics],
    sources: [sep(record.slug, record.sourceTitle, sourceNote), ...moreSources],
    locationNote: `坐标为${event.location}的阅读参照，用于对照思想与知识传播的地理背景；不表示著作只在此形成，也不构成人物到访或年谱记录。`,
  }
}

export const westernPhilosophyEvents: HistoryEvent[] = [
  philosophyEvent({
    id: 'phil-milesian-inquiry',
    person: 'phil-thales',
    year: -600,
    title: '泰勒斯与米利都的自然哲学探索',
    region: 'west-asia',
    location: '米利都',
    coordinates: [27.28, 37.53],
    summary: '米利都思想家尝试以自然原理说明世界的构成与变化，泰勒斯是后世记述中的重要代表。',
    background:
      '爱奥尼亚的城邦知识环境中，天象、地理和物质变化成为共同的研究问题；现代的哲学与科学分科尚未形成。',
    details: [
      '亚里士多德将以水为根本原理的主张归于泰勒斯。现存材料多为后世转述，不能把它还原为完整的本人理论或准确演讲记录。',
    ],
    impact:
      '以自然内部的原因解释自然，成为希腊哲学的重要起点之一；这不意味着其他文明此前没有系统的世界解释。',
    dateLabel: '约公元前600年',
    dateNote:
      '来源将泰勒斯活动置于公元前6世纪前期；此处为思想史观察节点，不是可精确纪年的单次事件。',
    importance: 4,
    topics: ['科技医学'],
    sourceNote:
      '第1节史料限制、第2节 The Milesians；讨论泰勒斯的活动年代、自然原理与日食故事的不可靠性。',
  }),
  philosophyEvent({
    id: 'phil-socrates-trial',
    person: 'phil-socrates',
    year: -399,
    title: '苏格拉底在雅典受审与被处死',
    region: 'europe',
    location: '雅典',
    coordinates: [23.73, 37.98],
    summary: '雅典法庭判处苏格拉底死刑，关于哲学生活、公民责任与城邦权威的争论由此留下深远影响。',
    background: '雅典经历战争失败和政体变动，公民共同体对教育、宗教和政治忠诚的焦虑交织。',
    details: [
      '苏格拉底没有留下本人著作。柏拉图、色诺芬等材料的立场和写作目的不同，历史人物不能与所有文学化对话角色完全等同。',
    ],
    impact:
      '审判成为后世反思哲学追问与公共权力关系的重要案例，也促使读者辨析思想史叙事中的不同证言。',
    importance: 5,
    sourceNote:
      '条目导言及第3节 Chronology，前399年的审判与死亡；第2节说明苏格拉底问题及三类主要史料。',
  }),
  philosophyEvent({
    id: 'phil-plato-republic',
    person: 'phil-plato',
    year: -380,
    endYear: -360,
    title: '柏拉图《理想国》与中期对话的写作',
    region: 'europe',
    location: '雅典',
    coordinates: [23.73, 37.98],
    summary: '柏拉图在中期对话中把正义、教育、灵魂与理念论联系起来，《理想国》成为其重要代表。',
    background: '苏格拉底之死与雅典政治经验，使哲学家持续追问知识、德性和城邦统治之间应有的关系。',
    details: [
      '《理想国》中的理想城邦与灵魂分析互相映照。对话中的论证并非一份已经实行的政治制度，也不能将角色的每句话都当作作者定论。',
    ],
    impact:
      '作品为政治哲学、知识论和教育思想提供长期争辩的文本，形成与儒家等其他传统可作问题比较的阅读线索。',
    dateLabel: '约公元前380—前360年',
    dateNote: '采用 IEP 对中期对话的约略分期；《理想国》各卷的具体写作时间及作品排序仍有争议。',
    importance: 5,
    topics: ['教育学术'],
    sourceNote: '第1、3及11节，理念、对话形式与早中晚期分期的解释限制。',
    moreSources: [
      {
        title: 'Internet Encyclopedia of Philosophy · Plato',
        url: 'https://iep.utm.edu/plato/',
        note: '第2节作品分期：中期对话约前380—前360年，包括《理想国》第二至十卷；第一卷通常另作早期讨论。',
      },
    ],
  }),
  philosophyEvent({
    id: 'phil-aristotle-lyceum',
    person: 'phil-aristotle',
    year: -335,
    title: '亚里士多德在雅典组织吕克昂学术共同体',
    region: 'europe',
    location: '雅典',
    coordinates: [23.73, 37.98],
    summary: '亚里士多德返回雅典，在吕克昂开展讲授与研究，涉及逻辑、自然、伦理和政治等广泛领域。',
    background: '柏拉图学园已形成持续的学术传统，希腊世界也处于马其顿势力扩张后的新格局中。',
    details: [
      '共同体搜集文本和自然、政治材料。现存亚里士多德作品并非全部在该年完成，也不能由研究题目推定本人到访所有相关地区。',
    ],
    impact:
      '研究与讲学组织让哲学问题和经验材料得以互相检验，相关著作成为后世多个语言传统的重要学术资源。',
    importance: 5,
    topics: ['教育学术', '科技医学'],
    sourceNote: '第1节 Aristotle’s Life：前335年返雅典并在 Lyceum 建学；第2节说明现存著作的性质。',
  }),
  philosophyEvent({
    id: 'phil-epicurus-garden',
    person: 'phil-epicurus',
    year: -307,
    endYear: -306,
    title: '伊壁鸠鲁在雅典建立“花园”学派',
    region: 'europe',
    location: '雅典',
    coordinates: [23.73, 37.98],
    summary: '伊壁鸠鲁返回雅典并建立共同学习生活的“花园”，把自然研究与减少恐惧、追求安宁联系起来。',
    background:
      '希腊化时代的政治变化扩大了人们对个人生活、欲望和安全的关注，不同哲学共同体提出各自的幸福观。',
    details: [
      '快乐并非无节制消费，而与免于身体痛苦和心灵扰动相联系；友谊是学派生活的重要组成部分。',
    ],
    impact:
      '伊壁鸠鲁主义为伦理、自然观及死亡问题提供互相关联的解释，后来经希腊和拉丁作者持续传播。',
    dateLabel: '公元前307／306年',
    dateNote: 'SEP 使用307/06年的雅典纪年对应，此处保留跨公元纪年的范围。',
    importance: 4,
    sourceNote: '第2节 Life：前307/06年回雅典购置花园；第4、6节讨论伦理与学派生活。',
  }),
  philosophyEvent({
    id: 'phil-stoic-school',
    person: 'phil-zeno-citium',
    year: -300,
    title: '芝诺在雅典创立斯多亚学派',
    region: 'europe',
    location: '雅典彩绘柱廊',
    coordinates: [23.73, 37.98],
    summary: '芝诺在雅典柱廊讲学，逐步形成将逻辑、自然学与伦理学结合的斯多亚传统。',
    background:
      '希腊化时代，苏格拉底传统、犬儒学派和柏拉图学园的讨论相互影响，也与伊壁鸠鲁学派竞争。',
    details: [
      '斯多亚把德性视为幸福的核心，并思考情感、判断与自然秩序。学派后来的变化不能全部归于创始人。',
    ],
    impact: '学派在罗马时期仍具有影响，为公民责任、情绪和世界共同体等问题留下持续讨论的资源。',
    dateLabel: '约公元前300年',
    dateNote: '来源使用 around 300 BCE；此处为学派形成的约略节点。',
    importance: 4,
    sourceNote: '第1.1节 The School and its History：约前300年建学及柱廊名称来源；第4节伦理。',
  }),
  philosophyEvent({
    id: 'phil-plotinus-rome',
    person: 'phil-plotinus',
    year: 244,
    title: '普罗提诺在罗马展开长期讲学',
    region: 'europe',
    location: '罗马',
    coordinates: [12.5, 41.9],
    summary: '普罗提诺在罗马形成讲学圈，以柏拉图传统讨论太一、理智、灵魂与感性世界的关系。',
    background: '晚古代不同哲学与宗教传统密切互动，讲学、注释和精神修养构成知识生活的重要方式。',
    details: [
      '其后写成的论述与课堂问题相互联系，身后由波菲利编成《九章集》。该编本的结构不是244年已经完成的出版物。',
    ],
    impact: '这套思想对后来的基督教、伊斯兰与犹太哲学产生影响，体现古代哲学跨宗教传统的持续重释。',
    importance: 4,
    sourceNote:
      '第1节 Life and Writings：244年末定居罗马并持续讲学，说明文本与课堂及波菲利编纂的关系。',
  }),
  philosophyEvent({
    id: 'phil-augustine-conversion',
    person: 'phil-augustine',
    year: 386,
    title: '奥古斯丁在米兰转向基督教生活',
    region: 'europe',
    location: '米兰',
    coordinates: [9.19, 45.46],
    summary: '奥古斯丁在经历怀疑和柏拉图传统的影响后作出宗教与生活抉择，放弃原来的修辞职业计划。',
    background: '基督教已经进入罗马帝国公共生活，不同宗教、哲学与诠释传统仍处于激烈交流之中。',
    details: [
      '386年的转向与387年的受洗应加以区分；相关经历后来在《忏悔录》中被重新叙述，不是未经加工的即时记录。',
    ],
    impact: '其后对记忆、时间、自由和恩典的思考，将古代哲学的问题带入拉丁基督教思想的长期争论。',
    importance: 4,
    topics: ['宗教'],
    sourceNote: '第1节 Life：386年夏转向、387年复活节受洗；导言与相关章节解释哲学及神学影响。',
  }),
  philosophyEvent({
    id: 'phil-avicenna-cure',
    person: 'phil-avicenna',
    year: 1024,
    endYear: 1037,
    title: '伊本·西那在伊斯法罕时期完成《治疗论》等著作',
    region: 'west-asia',
    location: '伊斯法罕',
    coordinates: [51.68, 32.65],
    summary:
      '伊本·西那在伊斯法罕的宫廷支持下继续研究，完成大型哲学总论《治疗论》，讨论逻辑、自然、数学与形而上学。',
    background:
      '布哈拉及伊朗诸城市的宫廷与学术网络承接希腊—阿拉伯语翻译运动，医师、哲学家和政治顾问的角色经常交织。',
    details: [
      '《治疗论》的书名不表示它是医学专著。关于存在、灵魂和知识的论证后来通过不同语言继续影响学术讨论。',
    ],
    impact:
      '作品组织出系统性的哲学课程和论证框架，显示伊斯兰世界并非只转运古希腊文本，也形成新的研究成果。',
    dateLabel: '约1024—1037年',
    dateNote:
      '来源将伊斯法罕时期置于1024?—1037年，并记该时期完成《治疗论》；不能据此精确指定全书某一完稿年。',
    importance: 5,
    topics: ['教育学术'],
    sourceNote: '第1.1节 Life：伊斯法罕约1024—1037年及完成《治疗论》；第1.2节与第4节解释著作范围。',
  }),
  philosophyEvent({
    id: 'phil-averroes-decisive',
    person: 'phil-averroes',
    year: 1178,
    endYear: 1179,
    title: '伊本·鲁世德撰写《决定论》，讨论哲学与宗教法',
    region: 'europe',
    location: '安达卢西亚',
    coordinates: [-4.78, 37.89],
    summary: '《决定论》讨论哲学探究与宗教法的关系，主张在适当条件下运用论证研究信仰问题。',
    background:
      '安达卢西亚的哲学、医学、法学与宗教解释相互联系，亚里士多德的逻辑和自然学是重要的争论资源。',
    details: ['作品区别不同受众和论证方式，不能简化成哲学与宗教各有一套互不相干真理的口号。'],
    impact:
      '其哲学和注释经希伯来语与拉丁语传播，成为地中海不同学术传统争论理性与启示关系的重要来源。',
    dateLabel: '1178／1179年',
    dateNote: 'SEP著作目录以1178/9年标记《决定论》，此处保留纪年范围。',
    importance: 4,
    topics: ['宗教'],
    sourceNote: '第6节 Religion 与著作目录 Decisive Treatise（1178/9）；另见第9节接受史。',
  }),
  philosophyEvent({
    id: 'phil-aquinas-summa',
    person: 'phil-aquinas',
    year: 1267,
    endYear: 1273,
    title: '阿奎那撰写《神学大全》',
    region: 'europe',
    location: '罗马及巴黎学术网络',
    coordinates: [12.5, 41.9],
    summary: '阿奎那以问题、异议与答辩组织《神学大全》，系统讨论神、人的认识、行动、法律与德性。',
    background:
      '新兴大学和托钵修会的学术制度推动经院辩论；亚里士多德及阿拉伯语思想成果在拉丁世界引发新的问题。',
    details: [
      '该书是神学著作，也包含广泛的哲学论证。写作跨越多地与多年，1273年停止后未完成，后人的补编不能当作其亲笔定稿。',
    ],
    impact:
      '作品成为讨论理性与启示、自然法、德性和人的行动的长期资源，其具体主张在当时也并非没有争议。',
    dateLabel: '约1267—1273年',
    dateNote:
      '采用SEP著作目录的1267—1273年分期；其他研究对起稿时间有不同取法，此处不称1267年全书完成。',
    importance: 5,
    topics: ['宗教', '教育学术'],
    sourceNote:
      '第1节 Life and Works 及参考书目 A1：Summa theologiae（1267—73，未完成）；第8节伦理。',
  }),
  philosophyEvent({
    id: 'phil-bacon-novum-organum',
    person: 'phil-francis-bacon',
    year: 1620,
    title: '培根《新工具》出版，提出知识革新计划',
    region: 'europe',
    location: '伦敦',
    coordinates: [-0.13, 51.51],
    summary:
      '《新工具》随《大复兴》计划的一部分出版，强调系统收集材料、比较与实验，反思妨碍判断的习惯。',
    background:
      '欧洲学者不断重新评价古代权威、经验材料与新技术，知识研究逐渐与制度组织和公共用途联系。',
    details: [
      '培根提倡的归纳不是简单堆积例子，而包括排除竞争解释。他的宏大研究计划未全部实现，也不是所有科学发现的统一操作规程。',
    ],
    impact: '作品强化了协作研究、自然史和实验方法的文化地位，为哲学与科学关系提供新的议题。',
    importance: 4,
    topics: ['科技医学'],
    sourceNote: '第1节明确1620年10月《大复兴》卷出版并含《新工具》两卷；第4.2节讨论新方法。',
  }),
  philosophyEvent({
    id: 'phil-descartes-discourse',
    person: 'phil-descartes',
    year: 1637,
    title: '笛卡尔《方法谈》及科学附论出版',
    region: 'europe',
    location: '荷兰知识与出版网络',
    coordinates: [4.9, 52.37],
    summary: '笛卡尔以法语发表《方法谈》，连同光学、气象学和几何学论文，说明其求知方法与实际研究。',
    background:
      '新的数学和自然解释不断挑战既有学术体系，思想家需要说明判断何以可靠、研究应怎样推进。',
    details: [
      '方法怀疑和思维主体的确定性成为重要线索；同卷科学附论说明其哲学与数学、自然研究并非彼此隔离。',
    ],
    impact: '作品使方法与知识基础的问题进入广泛讨论，并为后来《沉思集》的更严格论证开路。',
    importance: 5,
    topics: ['科技医学'],
    sourceNote: '条目导言列1637年《方法谈》及三篇附论；第1.3节讨论其形成与发表。',
  }),
  philosophyEvent({
    id: 'phil-descartes-meditations',
    person: 'phil-descartes',
    year: 1641,
    title: '笛卡尔《第一哲学沉思集》出版',
    region: 'europe',
    location: '巴黎出版与论辩网络',
    coordinates: [2.35, 48.86],
    summary: '《沉思集》以系统怀疑考察自我、神与外部世界的认识，并连同学者的异议和作者答辩发表。',
    background: '笛卡尔希望为科学与哲学确立可靠基础，也需要回应不同神学与哲学立场的质疑。',
    details: [
      '作品将沉思式论证和公开异议放在一起，心灵与身体的关系因此成为长期争论的问题；不能将方法怀疑理解为否认一切日常知识。',
    ],
    impact: '这部著作成为近代知识论和心灵哲学的重要文本，后继者既继承其问题，也批评其论证。',
    importance: 5,
    sourceNote: '导言明确1641年初版、1642年第二版；第1.4及第3节讨论形而上学与异议答辩。',
  }),
  philosophyEvent({
    id: 'phil-hobbes-leviathan',
    person: 'phil-hobbes',
    year: 1651,
    title: '霍布斯《利维坦》出版',
    region: 'europe',
    location: '伦敦出版网络',
    coordinates: [-0.13, 51.51],
    summary: '霍布斯从人的欲望、恐惧与相互不安全出发，论证通过契约建立公共主权的必要性。',
    background:
      '英国内战及宗教、政治权威的冲突使秩序的基础成为迫切问题；作者在法国流亡期间完成相关思考。',
    details: [
      '《利维坦》也讨论语言、认识和宗教解释，不能只用“人性恶”概括其全部前提；强大主权的理由与个人自保的限度需要同时阅读。',
    ],
    impact: '作品成为社会契约与国家权威讨论的重要参照，引发自由、服从及政治正当性方面的持续批评。',
    importance: 5,
    sourceNote:
      '第1节 Life and Works：法国流亡及1651年《利维坦》出版；其结构包括认识、政治和经文解释。',
  }),
  philosophyEvent({
    id: 'phil-spinoza-ethics',
    person: 'phil-spinoza',
    year: 1677,
    title: '斯宾诺莎《伦理学》于作者身后出版',
    region: 'europe',
    location: '荷兰思想与出版网络',
    coordinates: [4.9, 52.37],
    summary: '《伦理学》以几何式论证把神或自然、心灵、情感与人的自由放进同一个哲学体系。',
    background:
      '宗教争论和政治压力限制思想发表；斯宾诺莎的主要著作部分在生前匿名发表，部分留待身后出版。',
    details: [
      '这里的自由不是脱离所有原因，而与理解自然和自身情感的因果条件相联系。作品的身后出版由友人处理，不是作者当年的亲自公开讲授。',
    ],
    impact: '其自然主义、情感论与宗教政治批评影响后来的启蒙和德意志哲学，也长期遭到反对。',
    importance: 4,
    sourceNote: '第1节 Biography 记1677年去世后友人出版未刊作品；第2节详细解释《伦理学》的体系。',
    moreSources: [
      {
        title: 'Cambridge University Press · The Textual History of Spinoza’s Ethics',
        url: 'https://www.cambridge.org/core/books/abs/cambridge-companion-to-spinozas-ethics/textual-history-of-spinozas-ethics/DB85086DF14DD34231AC1D56270DBD3F',
        note: 'Piet Steenbakkers，The Cambridge Companion to Spinoza’s Ethics，第1章，第26—41页；摘要明确1677年阿姆斯特丹《遗著集》刊行《伦理学》，并说明生前印前准备。',
      },
    ],
    peopleNotes: {
      'phil-spinoza': '作者于1677年去世，本条记录友人在其身后刊行著作，不代表本人参与发行。',
    },
  }),
  philosophyEvent({
    id: 'phil-locke-essay',
    person: 'phil-locke',
    year: 1689,
    title: '洛克《人类理解论》与《政府论》问世',
    region: 'europe',
    location: '伦敦知识与出版网络',
    coordinates: [-0.13, 51.51],
    summary: '洛克在流亡归国后发表重要认识论与政治著作，分别考察知识的来源、界限以及政府正当性。',
    background: '光荣革命前后的政治变化与长期宗教争议，使自然权利、宽容和个人判断成为公共议题。',
    details: [
      '《人类理解论》强调对经验和认知能力的考察，《政府论》讨论同意、财产和政府责任。二者不能简化成一条单独的政治口号。',
    ],
    impact: '这些著作影响后来关于经验主义、宪政和权利的争论；其宽容的边界及殖民背景同样需要审视。',
    dateNote: '采用实际问世的1689年；相关首版题名页常标1690年，应区别题年、出版与长期写作过程。',
    importance: 5,
    sourceNote:
      '导言以1689年标《人类理解论》；第1.3节说明返英后出版《人类理解论》《政府论》及宽容书信。',
  }),
  philosophyEvent({
    id: 'phil-leibniz-monadology',
    person: 'phil-leibniz',
    year: 1714,
    title: '莱布尼茨写成《单子论》',
    region: 'europe',
    location: '中欧学术通信网络',
    coordinates: [9.74, 52.37],
    summary: '莱布尼茨以简短命题概述单子、知觉和世界秩序等观点，形成后来被称为《单子论》的文本。',
    background: '他长期在宫廷工作并与欧洲学者通信，试图协调机械论自然解释、实体哲学和宗教问题。',
    details: [
      '单子不是可用显微镜发现的物质颗粒，而是其形而上学中的基本单位。1714年是写作节点，不等于该书已在当年公开印行。',
    ],
    impact:
      '文本成为理解莱布尼茨晚期哲学的重要入口，充足理由、知觉与实体等问题继续影响后来的争论。',
    importance: 4,
    sourceNote: '第1.1节 Chronology of Major Writings 列1714年 Monadology；第2—4节说明体系与实体。',
  }),
  philosophyEvent({
    id: 'phil-hume-treatise',
    person: 'phil-hume',
    year: 1739,
    endYear: 1740,
    title: '休谟《人性论》分卷出版',
    region: 'europe',
    location: '伦敦出版网络',
    coordinates: [-0.13, 51.51],
    summary: '休谟试图以研究人的经验、情感和行为的方法重建哲学，分卷发表《人性论》。',
    background:
      '苏格兰启蒙时期的知识讨论把自然研究方法、社会生活与道德问题联系起来，知识确定性的基础也受到追问。',
    details: [
      '作品考察因果信念、激情与道德判断，强调习惯和情感的作用。对理性的限度提出问题，并不等于主张人应放弃证据和讨论。',
    ],
    impact:
      '它成为后来知识论、伦理学与心灵研究的重要文本，但出版初期并未获得与其后世地位相称的关注。',
    dateLabel: '1739—1740年',
    dateNote: '前两卷于1739年匿名出版，第三卷及摘要于1740年出版；此处保留分卷过程。',
    importance: 4,
    sourceNote:
      '第1节 Life and Works 明确1739年第一、二卷及1740年第三卷；第2—4节讨论认识、激情和伦理。',
  }),
  philosophyEvent({
    id: 'phil-rousseau-contract-emile',
    person: 'phil-rousseau',
    year: 1762,
    title: '卢梭《社会契约论》与《爱弥儿》出版',
    region: 'europe',
    location: '法语思想与出版网络',
    coordinates: [6.14, 46.2],
    summary: '卢梭分别从政治共同体与教育出发，讨论人在社会中怎样保持自由并发展自主判断。',
    background:
      '欧洲启蒙讨论关注理性、进步与制度，卢梭则进一步追问社会依赖、不平等和公共评价怎样影响个人。',
    details: [
      '公意与个别欲望的关系、儿童教育与社会习俗的冲突，是两部著作中的关键问题；教育理想中的性别限制也受到后来的批评。',
    ],
    impact:
      '两书为政治主权、平等公民和教育思想提供广泛争论的资源，其影响不能直接等同于某场革命的单一原因。',
    importance: 5,
    topics: ['教育学术'],
    sourceNote: '第1节 Life 及主要著作目录明确两书均发表于1762年；第3节政治哲学、第5节教育。',
  }),
  philosophyEvent({
    id: 'phil-kant-pure-reason',
    person: 'phil-kant',
    year: 1781,
    title: '康德《纯粹理性批判》第一版出版',
    region: 'europe',
    location: '哥尼斯堡学术活动参照',
    coordinates: [20.51, 54.71],
    summary: '康德追问经验知识何以可能，分析感性与知性的共同作用，并说明理性越出经验时面临的困难。',
    background:
      '近代科学的发展与经验主义、理性主义的争论，使知识的可靠性和形而上学的范围成为焦点。',
    details: [
      '批判指对认识能力及其条件的检验，不是对知识的全面否定。1787年的第二版有重要修订，不能与1781年第一版混为同一文本。',
    ],
    impact:
      '作品重塑近代知识论与形而上学的问题，也为后来的德意志唯心主义及不同现代哲学传统提供出发点。',
    importance: 5,
    sourceNote:
      '导言和第1节明确第一版1781年、第二版1787年；第2—4节讨论知识条件、先验唯心论及演绎。',
  }),
  philosophyEvent({
    id: 'phil-kant-practical-reason',
    person: 'phil-kant',
    year: 1788,
    title: '康德《实践理性批判》出版',
    region: 'europe',
    location: '哥尼斯堡学术活动参照',
    coordinates: [20.51, 54.71],
    summary: '康德系统讨论道德法则、自由与人的自律，将行动的正当性与单纯追逐结果或欲望区别开来。',
    background:
      '批判哲学既要说明科学知识的条件，也要处理人在自然因果解释之外怎样理解责任与义务的问题。',
    details: [
      '康德把道德自律理解为理性为自身立法，并非个人可以随意为自己开例外。自由与道德法则的关系构成作品的重要论证。',
    ],
    impact:
      '作品成为义务论伦理和自由问题的经典资源，与以幸福或功用为中心的伦理学形成可比较的讨论。',
    importance: 5,
    sourceNote:
      '条目导言列1788年《实践理性批判》；第5节 Morality and freedom 讨论自律、自由和定言命令。',
  }),
  philosophyEvent({
    id: 'phil-wollstonecraft-rights',
    person: 'phil-wollstonecraft',
    year: 1792,
    title: '沃斯通克拉夫特《女权辩护》出版',
    region: 'europe',
    location: '伦敦',
    coordinates: [-0.13, 51.51],
    summary: '作者从理性、德性与教育出发，批评将女性塑造成依赖男性的社会安排。',
    background:
      '启蒙与革命时期，普遍权利的语言不断传播，但女性获得教育、职业和公民地位的机会仍受到结构性限制。',
    details: [
      '作品把女性处境同教育和道德要求联系起来，不只是要求礼貌待遇，也追问为什么男女适用不同的理性与德性标准。',
    ],
    impact: '它为女性平等、教育与权利讨论提供早期重要文本，也促使读者检验普遍自由论述的实际边界。',
    importance: 4,
    topics: ['教育学术'],
    sourceNote:
      '导言及第3节 Moral and Political Writings 明确《女权辩护》1792年出版，并讨论理性、德性和教育。',
  }),
  philosophyEvent({
    id: 'phil-hegel-phenomenology',
    person: 'phil-hegel',
    year: 1807,
    title: '黑格尔《精神现象学》出版',
    region: 'europe',
    location: '耶拿学术活动参照',
    coordinates: [11.59, 50.93],
    summary: '黑格尔让意识经历不同的认识和实践形态，检验各自的确定性，并讨论自我意识与承认。',
    background:
      '康德之后的德意志哲学尝试解释主体、客观世界与自由的关系，革命和拿破仑战争也改变知识生活的环境。',
    details: ['作品不能用固定的“正反合”公式代替阅读。1807年是出版年，重要写作已在1806年完成。'],
    impact: '它成为德意志唯心主义的重要文本，对历史、社会关系和主体形成的后继研究产生持续影响。',
    importance: 5,
    sourceNote: '第1节明确1806年底完成、1807年出版；第3.1.1节分析《精神现象学》。',
  }),
  philosophyEvent({
    id: 'phil-schopenhauer-world',
    person: 'phil-schopenhauer',
    year: 1818,
    title: '叔本华《作为意志和表象的世界》出版',
    region: 'europe',
    location: '德累斯顿写作活动参照',
    coordinates: [13.74, 51.05],
    summary: '叔本华以意志与表象组织世界解释，把欲望、痛苦、审美和道德放在相互关联的体系中。',
    background:
      '康德之后的哲学仍在争论认识与实在的关系，叔本华同时吸收柏拉图及所接触的印度思想资源。',
    details: [
      '他不仅描绘无止境欲望导致的冲突，也讨论艺术体验、同情与克制的可能。著作的早期接受较有限，影响扩大经历了较长过程。',
    ],
    impact:
      '作品对后来哲学、文学和音乐思考产生影响，为人们比较理性主义、生命体验与苦的问题提供另一条路径。',
    dateLabel: '1818年末（题年1819）',
    dateNote:
      'SEP说明1818年3月完成、12月出版，而题名页标1819年；此处按实际刊行年定位并保留题年差异。',
    importance: 4,
    sourceNote: '第1节 Life 明确1818年12月刊行及题年1819；第4—5节讨论意志与超越冲突的方式。',
  }),
  philosophyEvent({
    id: 'phil-kierkegaard-either-or',
    person: 'phil-kierkegaard',
    year: 1843,
    title: '克尔凯郭尔《非此即彼》等著作出版',
    region: 'europe',
    location: '哥本哈根',
    coordinates: [12.57, 55.68],
    summary: '克尔凯郭尔以不同化名与文体呈现生活选择，在审美、伦理和宗教之间考察个人存在。',
    background:
      '体系哲学与公共文化的影响不断扩大，他则追问具体个人怎样承担抉择、焦虑与信仰，而非只在抽象分类中理解人生。',
    details: [
      '同年还有《恐惧与战栗》等作品。化名作者表达不同立场，不能把所有陈述直接拼成一套作者本人的教条。',
    ],
    impact:
      '这些写作为后来存在哲学与宗教思考提供重要文本，但其基督教背景应与后来的无神论存在主义加以区别。',
    importance: 4,
    topics: ['宗教'],
    sourceNote:
      '第1节及 Chronology of Kierkegaard’s Works 列1843年《非此即彼》《恐惧与战栗》等；第3节讨论不同存在领域。',
  }),
  philosophyEvent({
    id: 'phil-mill-liberty',
    person: 'phil-mill',
    year: 1859,
    title: '密尔《论自由》出版',
    region: 'europe',
    location: '伦敦',
    coordinates: [-0.13, 51.51],
    summary: '密尔讨论国家与社会意见何时可以限制个人，强调公共讨论、生活试验和个性发展的价值。',
    background:
      '代议制度与公共舆论的发展提出新的问题：自由不只受到政府强制威胁，也可能受多数人的习俗与压力限制。',
    details: [
      '伤害原则试图区分干预他人行动的正当理由，不等于每种行动都免于批评；原则的适用范围与作者的殖民观点也存在值得审视的张力。',
    ],
    impact:
      '作品成为政治自由与表达自由讨论的重要参照，为不同社会中的个人权利争论提供可比较的论证。',
    importance: 4,
    sourceNote: '条目导言列《论自由》1859年；有关政治、个性与自由的章节讨论伤害原则和社会压制。',
  }),
  philosophyEvent({
    id: 'phil-marx-capital',
    person: 'phil-marx',
    year: 1867,
    title: '马克思《资本论》第一卷在汉堡出版',
    region: 'europe',
    location: '汉堡出版地',
    coordinates: [9.99, 53.55],
    summary:
      '马克思在《资本论》第一卷中分析商品、价值、劳动过程和资本积累，系统批判资本主义生产关系。',
    background:
      '工业化改变劳动、城市与财富分配，政治经济学和工人运动都在争论生产与社会冲突的机制。',
    details: [
      '第一卷讨论资本的生产过程；后续卷本由恩格斯在作者身后整理出版，不能当作1867年三卷同时完成。',
    ],
    impact:
      '作品对政治经济学、社会理论与各地社会主义运动产生长期影响，其分析与后世不同政治实践之间需要具体辨析。',
    importance: 5,
    topics: ['经济贸易'],
    sourceNote: '第3节 Economics、尤其3.1 Reading Capital，说明政治经济学分析与作品范围。',
    moreSources: [
      {
        title: 'UNESCO Memory of the World · Marx’s annotated Das Kapital',
        url: 'https://www.unesco.org/en/memory-world/manifest-der-kommunistischen-partei-draft-manuscript-page-and-das-kapital-erster-band-karl-marxs',
        note: '馆藏图版说明第一卷首版为 Hamburg 1867；登记对象含作者批注本。',
      },
    ],
    relatedEvents: [
      {
        id: 'world-manifesto',
        label: '从宣言到政治经济学批判',
        note: '两者是同一思想家不同阶段与体裁的著作，不把后期论证全部倒置为1848年已经完成。',
      },
    ],
  }),
  philosophyEvent({
    id: 'phil-frege-concept-script',
    person: 'phil-frege',
    year: 1879,
    title: '弗雷格《概念文字》出版',
    region: 'europe',
    location: '耶拿学术活动参照',
    coordinates: [11.59, 50.93],
    summary: '弗雷格提出新的形式逻辑符号体系，用量化和函数式分析处理复杂的推理关系。',
    background: '数学研究提出对严格证明和基础概念的需求，传统主谓式逻辑难以充分表达许多数学命题。',
    details: [
      '这套符号当时并未普遍被理解，但其量化与推理分析推动了现代逻辑。后来完整算术基础方案遭遇的悖论，不等于早期全部贡献失效。',
    ],
    impact: '作品成为现代逻辑和分析哲学的重要节点，为语言、意义和数学知识的研究提供新工具。',
    importance: 4,
    topics: ['科技医学', '教育学术'],
    sourceNote: '第1节 Life and Influences 明确1879年《概念文字》出版；第2节讨论谓词逻辑与证明。',
  }),
  philosophyEvent({
    id: 'phil-nietzsche-zarathustra',
    person: 'phil-nietzsche',
    year: 1883,
    endYear: 1885,
    title: '尼采写作并分部刊行《查拉图斯特拉如是说》',
    region: 'europe',
    location: '中欧哲学与出版网络',
    coordinates: [8.54, 47.38],
    summary:
      '尼采用文学化的讲述讨论价值创造、自我超越与对生命的肯定，形成不同于体系专著的哲学文本。',
    background:
      '19世纪欧洲的宗教、道德和进步观念受到科学及历史批评的挑战，尼采追问既有价值怎样形成、又能如何重估。',
    details: [
      '1883—1885年各部的刊行范围不同，第四部最初为私人印行。人物的修辞声音也不能直接当作作者给出的简单政治方案。',
    ],
    impact: '作品对文学和后来的价值、主体与文化批评有广泛影响，同时存在多种彼此竞争的解释。',
    dateLabel: '1883—1885年',
    dateNote: 'SEP以1883—1885年标记本书；此处保留分部形成过程，不称1883年即有完整公开发行本。',
    importance: 4,
    topics: ['文学艺术'],
    sourceNote:
      '第1节 Life and Works 及主要著作目录列1883—1885年；第3、5节讨论价值创造与文体解释。',
    moreSources: [
      {
        title: 'Kalliope · Goethe- und Schiller-Archiv · Zarathustra IV',
        url: 'https://kalliope.staatsbibliothek-berlin.de/ead?ead.id=DE-2060-BE-71-471226',
        note: '馆藏号 GSA 71/25a：第四部，C. G. Naumann，Leipzig 1885，Privatdruck；用于核对第四部私人印行的性质。',
      },
    ],
  }),
  philosophyEvent({
    id: 'phil-husserl-logical-investigations',
    person: 'phil-husserl',
    year: 1900,
    endYear: 1901,
    title: '胡塞尔《逻辑研究》分卷出版',
    region: 'europe',
    location: '哈雷学术活动参照',
    coordinates: [11.97, 51.48],
    summary:
      '胡塞尔批评把逻辑有效性归结为心理事实的做法，并以意义、判断和意向性分析开辟现象学路径。',
    background: '数学基础与实验心理学的兴起，使逻辑、认识论和心理学之间的边界成为重要争论。',
    details: [
      '心理活动如何发生，与一个论证是否有效，并不是同一个问题。作品后来促成新的研究共同体，其后期现象学体系不能全部倒置到初版。',
    ],
    impact:
      '《逻辑研究》成为20世纪现象学的重要起点，与同时发展的逻辑和语言分析形成不同但可对照的哲学路径。',
    dateLabel: '1900—1901年',
    dateNote: '作品分卷发表于1900—1901年；这是早期现象学节点，后续思想发展超出本条范围。',
    importance: 4,
    topics: ['教育学术'],
    sourceNote: '第1节 Life and work 明确1900—1901年出版；第2节讨论逻辑的理想性与意向性。',
  }),
  philosophyEvent({
    id: 'phil-james-pragmatism',
    person: 'phil-william-james',
    year: 1907,
    title: '威廉·詹姆斯《实用主义》出版',
    region: 'americas',
    location: '美国东北部学术网络',
    coordinates: [-71.11, 42.37],
    summary: '詹姆斯以经验中的实际差别解释哲学分歧，并讨论观念、真理、信念与行动之间的关系。',
    background:
      '美国的心理学、科学和宗教研究形成相互交织的知识环境，实用主义在不同作者之间也有不同版本。',
    details: [
      '实用主义不是把短期利益当作唯一真理标准，而是要求追问一个观念在经验、检验与行动中究竟产生什么差别。',
    ],
    impact: '该书使美国哲学的重要路径获得更广泛传播，为真理、经验与公共争论的关系提供新的问题。',
    importance: 4,
    sourceNote: '条目导言及第6.1节 Pragmatism (1907)，说明出版年份、实用主义方法及真理讨论。',
  }),
]
