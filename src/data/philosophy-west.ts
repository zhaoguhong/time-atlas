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
      '泰勒斯活动于公元前6世纪前期的米利都。后来的希腊作者把他列为探求自然原因的早期思想家：亚里士多德将“水是万物的根本原理”的观点归于他，说明他试图在变化的现象背后寻找共同来源。这样的提问使天象、物质与生命成为可以共同讨论的问题，当时哲学与自然研究尚未分成现代意义上的学科。\n\n他的著作没有完整传世，思想主要靠后世转述保存。日食预言等著名故事的可靠性受到质疑，确切生卒也难以确定；认识泰勒斯，主要依靠这些片段展示的自然解释方向。',
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
      '苏格拉底在雅典以对话讨论人应怎样生活。他会从勇敢、正义或德性等熟悉词语问起，要求对方给出解释，再检验解释能否适用于不同情形。当答案出现冲突，谈话便迫使参与者重新审视自己原本确信的事情。哲学在这里既是追问知识，也是对自身生活的检验。\n\n公元前399年，他在雅典受审并被处死。他没有留下著作，我们主要依靠柏拉图、色诺芬和喜剧作家等人的记述了解他。各家作品带有不同立场，历史上的苏格拉底与柏拉图笔下的对话人物之间，仍有需要辨析的距离。',
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
      '柏拉图继承苏格拉底以对话追问的方式，并把问题扩展到知识、灵魂与政治秩序。《理想国》从什么是正义展开，讨论城邦如何分工、教育怎样塑造欲望，以及统治者应具备什么知识。关于理念的思考，则追问不断变化的事物为什么仍能成为稳定知识的对象。\n\n他的作品让不同人物提出和检验论点，读者也随对话经历困惑与修正。这种写法使哲学论证与教育实践紧密相连，长期影响后来的思想传统。各篇的先后、部分作品真伪和写作时间仍有争议；其生年也有前429、前427等说法，无法确定为单一年份。',
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
      '亚里士多德曾在柏拉图学园学习，后来组织自己的研究共同体。他收集和比较自然与政治材料，也研究论证怎样成立，把追问原因、辨析概念与观察具体事物结合起来。逻辑、生物、伦理和政治因而成为相互联系的研究领域。\n\n在伦理学中，他把德性与长期养成的习惯联系起来，讨论人怎样通过实践和判断过好共同生活；在自然研究中，他尝试解释事物的结构、变化与作用。现存著作多带有讲授和研究材料的性质。它们后来经过希腊语、阿拉伯语和拉丁语学术传统的翻译与注释，在不断争辩中延续影响。',
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
      '伊壁鸠鲁认为，哲学应帮助人减少痛苦和恐惧。他用原子论解释自然，试图消除人对神罚与死亡的忧惧，又区分必要的欲望与不断增长的追逐：身体免于痛苦、心灵免于扰动，比财富和名望更接近幸福。\n\n他在雅典组织被称为“花园”的学习共同体，把友谊、节制和共同生活作为哲学实践。理解自然与安排日常生活，在他的思想中彼此支持。其大量著作已经失传，今天主要依靠书信、格言、残卷及后世作者的记述认识他。',
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
      '基提翁的芝诺在雅典彩绘柱廊讲学，斯多亚学派由此得名。他把逻辑、自然研究与伦理联系起来：人既生活在自然秩序之中，就需要检验自己的判断，学习以理性安排选择。财富、名望和身体处境会发生变化，德性才是幸福生活的根本。\n\n这种主张把哲学变成持续的自我训练，也要求人思考与他人共同生活的责任。芝诺的著作大多不存，学派后来经过克里安西、克律西波及罗马时期思想家继续发展。他是基提翁的芝诺，与以运动悖论著称的埃利亚芝诺是不同人物。',
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
      '普罗提诺在亚历山大里亚学习，后来在罗马形成讲学圈。他沿着柏拉图传统追问多样世界如何成立，以太一、理智和灵魂讨论现实的不同层次。感性经验不断变化，而人的精神活动能够转向更统一的根据，哲学因而也关乎生活与认识方式的转变。\n\n他的学生波菲利后来把作品整理为《九章集》，使这些论说获得持续传播。近代学者用“新柏拉图主义”概括这条思想传统；普罗提诺本人则把工作视为对柏拉图的解释。其生年通常推算为204或205年，仍有不确定性。',
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
      '奥古斯丁接受修辞教育，先后接触摩尼教、怀疑论与柏拉图传统，在386年转向基督教生活。返回北非并成为希波主教以后，他不断回应教会内部的争论，个人信仰、公共职责与哲学写作由此交织。\n\n《忏悔录》回顾人生转变，也追问记忆如何容纳过去、时间如何被人经验，以及意志为何会分裂。《上帝之城》把宗教共同体与世俗政治放进更广阔的历史解释中。他对罪、恩典和自由意志的分析影响了拉丁基督教思想，也留下长期争论。',
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
      '伊本·西那成长于布哈拉地区，在不同宫廷担任医师、顾问，同时持续写作。他以阿拉伯语为主，也使用波斯语，把古希腊以来的知识与伊斯兰世界的学术讨论结合，研究范围包括逻辑、自然、医学和形而上学。\n\n《治疗论》把多种哲学与科学问题组织为一个整体。他区分事物是什么与事物是否存在，并以此研究存在的根据；关于灵魂与知识的论证也引起广泛讨论。作品经翻译影响阿拉伯语及拉丁语学术传统。其传统生年980年受到研究修正，确切生年仍难确定。',
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
      '伊本·鲁世德在安达卢西亚与北非从事哲学、医学和法学工作。他为亚里士多德多部著作撰写不同规模的注释，既解释具体论证，也尝试恢复完整的研究方法，因而成为亚里士多德思想跨语言传播的重要人物。\n\n在《决定论》中，他讨论哲学研究与宗教法的关系，认为应按照论证能力和文本性质理解不同表达。哲学证明与宗教解释怎样相容，是他持续处理的问题。作品后来通过希伯来语和拉丁语传播，在不同宗教与大学环境中引发新的争论。',
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
      '阿奎那出身意大利，加入多明我会，在巴黎与意大利多处讲授。他面对重新进入拉丁学术世界的亚里士多德著作，尝试说明理性能够认识什么，以及这些认识与基督教启示如何联系。其写作常先列出异议，再作论证并逐一回应，让争论进入思想展开的过程。\n\n《神学大全》把人的行动、德性、法律与幸福纳入系统讨论，但未能完成。自然法思想则把人的理性与共同生活的规范联系起来。他的学说在生前和身后都经历争议，后来成为经院哲学与天主教神学的重要资源。',
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
      '培根希望改变知识生产的方式，使自然研究能够改善人的生活。他批评人们未经检验便接受权威，也分析习惯、语言和先入判断怎样使认识偏离对象。研究者应有组织地收集材料、设计实验，通过比较和排除逐步建立解释。\n\n《新工具》是其未完成的知识革新计划《大复兴》的一部分。他把研究视为需要合作、资源与机构支持的长期事业，将方法改革与社会组织联系起来。这一方向影响近代科学文化，其具体归纳方案也持续受到修订与批评。',
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
      '笛卡尔同时研究数学、自然与形而上学，希望找到能够承受怀疑的知识基础。《方法谈》介绍研究道路，《第一哲学沉思集》则逐步检验感官、梦境与推理中的不确定性，由思考自身的活动寻找确定性的起点。\n\n他以思维和广延分别讨论心灵与物体，进一步追问人怎样认识外部世界，以及心与身体如何发生联系。这些问题使他的自然解释与知识论相互牵连，也引出长期的心身关系争论。他所追求的方法，既依赖严格论证，也试图为自然研究建立新的秩序。',
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
      '霍布斯在英国内战与流亡的背景下思考政治秩序。他从人的欲望、恐惧和自我保存出发，说明当缺乏共同权威时，即使人希望安全，也可能因为相互猜疑而陷入冲突。\n\n《利维坦》以此论证建立公共权力的理由，讨论人们如何通过约定形成国家，以及法律与宗教权威应如何安排。他对强大主权的辩护，始终与避免暴力和维持和平的目标相连。其哲学还试图用物质运动、语言和推理解释认识与行动，让政治理论成为更广泛的人性研究的一部分。',
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
      '斯宾诺莎生活于荷兰的宗教争论与学术网络中，试图把人放回自然的因果秩序。《伦理学》采用定义、公理和命题展开论证，将实体、心灵、身体与情感连接起来：人的欲望和情绪同样有可以理解的原因。\n\n在他看来，自由与认识这些原因有关。人越能理解自身和外界的关系，就越可能减少被动情感的支配，并与他人共同生活。他也在政治和宗教著作中维护思想讨论的空间。《伦理学》在其去世后出版，成为后来有关自然、宗教与自由争论的重要文本。',
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
      '洛克在《人类理解论》中从经验入手研究观念，追问知识来自何处、能够达到什么范围。他反对仅凭权威接受先天原则，希望通过辨析认识能力，为信念和争论确定合适的尺度。\n\n《政府论》把政治权力建立在自然权利、同意与政府责任之上，讨论财产和反抗权。他还参与医学、经济及殖民行政事务，这使其思想具有复杂的实践背景。其自由和宽容论述影响广泛，但这些原则的适用边界，以及它们与殖民和奴隶制的关系，仍是评价其思想的重要问题。',
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
      '莱布尼茨长期为德意志诸侯宫廷工作，又依靠广泛通信研究数学、哲学与历史。他试图在古代、经院和近代机械论之间寻找可以相容的解释，使严格推理与多种知识传统互相支持。\n\n他的哲学追问世界为什么如此存在、事物怎样保持统一，以及可能性与现实有什么关系。《单子论》以简短篇幅概括晚期思想，许多重要论点则散见于书信和短文。作品在写成、通信流传与后世编刊之间经历不同阶段，呈现出一个不断讨论和调整的研究过程。',
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
      '休谟希望通过观察人的心理和行为解释知识与道德。《人性论》研究信念、因果、情感和社会生活，后来他又以较短著作重新组织相关论证。他追问：人观察到事情多次相继发生，为什么会相信将来也会如此？由经验走向因果信念，涉及习惯等人的自然能力。\n\n在伦理学中，他强调情感对行动与道德判断的作用，也考察同情怎样连接个人与社会。怀疑与日常信念在其哲学中并存，这使他既检验理性论证的界限，也研究人实际如何生活和判断。',
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
      '卢梭关注社会怎样塑造人的欲望和自我评价。当人越来越依赖财富、地位和他人的目光，文明的发展便可能伴随新的支配与不平等。他由此把个人心理、社会关系与政治自由联系起来。\n\n《社会契约论》追问公民怎样共同制定法律，使服从公共规则能够与自由相容；《爱弥儿》则从教育讨论一个人怎样形成判断和自主生活的能力。这些方案引起持续争论，也暴露出其平等理想在性别和社会边界上的限制。',
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
      '康德长期在哥尼斯堡学习与任教。《纯粹理性批判》追问经验知识何以可能：感性提供材料，知性以概念组织经验，两者共同构成认识。他同时检验理性越出经验范围时产生的困难，为知识划定界限。\n\n《实践理性批判》把自由与道德自律联系起来，讨论人怎样依据能够普遍成立的原则行动；《判断力批判》进一步研究审美和目的性。三部批判围绕人的认识、行动与判断逐步展开，使康德成为后来德意志哲学和现代伦理学的重要参照。',
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
      '沃斯通克拉夫特做过教师、家庭女教师，后来以写作为业，切身接触女性在教育和职业上的限制。她把这些限制与财产、婚姻和社会习俗联系起来，认为被训练成依赖他人的人，难以发展独立判断和道德责任。\n\n《女权辩护》要求给予女性发展理性与德性的教育，批评只教导她们取悦他人、等待婚姻的安排。她将女性平等放入更广泛的公民与道德问题，推动了此后的权利辩论，其论述也保留了18世纪社会条件带来的边界。',
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
      '黑格尔在康德之后发展系统哲学，关注自由如何在思想和社会生活中逐步获得具体形式。《精神现象学》让意识经历不同立场，每种立场都在自身的实践中显出困难，推动新的理解出现。\n\n他后来以逻辑、自然与精神组织哲学体系，讨论家庭、市民社会和国家等共同生活形式。思想的发展与制度变化因而彼此联系。其著作与讲演深刻影响马克思等后继者，也因历史、政治和自由之间的解释关系引发长期争论。',
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
      '叔本华借鉴康德、柏拉图以及印度思想，以“表象”和“意志”解释世界。人所经验的世界有其认识条件，而不断要求满足的意志又使生命陷入追逐、匮乏与冲突。欲望得到满足后很快出现新的欲望，成为他分析痛苦的起点。\n\n《作为意志和表象的世界》也寻找暂时或持续减轻这种支配的可能：审美经验使人暂离个人欲求，同情则使他人的痛苦进入道德关切。他关于艺术、欲望与人生的讨论，后来影响哲学、文学和音乐。',
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
      '克尔凯郭尔使用化名、对话和宗教写作，让不同生活立场在作品中相遇。《非此即彼》讨论以感受和机会安排生活，与承担持续责任之间的差别；《恐惧与战栗》则把信仰与伦理要求的张力推到读者面前。\n\n他关心的，是具体个人怎样作出选择并承担后果。抽象体系能够说明许多关系，却无法替个人完成存在中的决定。化名作者的立场也构成阅读的一部分，使作品常以间接方式引导反思。其基督教背景与对个人责任的关注，共同影响了后来的存在哲学。',
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
      '密尔从父亲詹姆斯·密尔与边沁的功利主义教育中成长，后来吸收浪漫主义和历史思想的挑战，重新思考幸福、个性与社会进步。他研究逻辑、政治经济和伦理，也参与公共改革争论。\n\n《论自由》既关切政府干预，也分析社会习俗和多数意见对个性的压制。他以是否伤害他人讨论限制自由的理由，强调不同生活方式有助于人的发展。其自由与平等论述影响广泛，而殖民背景下对原则适用范围的限定，也留下需要批判的问题。',
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
      '马克思受过哲学训练，在报刊写作、流亡与政治活动中逐步转向政治经济学研究。他把劳动、生产条件和社会关系放进历史解释，追问人们怎样生产生活资料，又怎样在这些关系中形成冲突与改变制度的力量。\n\n《资本论》从商品分析展开，研究价值、剩余价值和资本积累，第一卷于1867年出版。他的研究与工人运动相互联系，但大量计划和手稿未能完成。不同阶段的著作、后世整理及后来的政治实践，使其思想的传播形成多条解释传统。',
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
      '弗雷格在耶拿研究数学与哲学，希望为算术建立严格的逻辑基础。《概念文字》用形式符号表达量化、概念和推理关系，使复杂论证可以超越传统主谓句结构来分析，成为现代谓词逻辑的重要起点。\n\n他后来区分表达的涵义与指称，说明同样指向一个对象的说法，仍可能以不同方式呈现对象。这把逻辑研究推进到语言和思想的关系。其完整逻辑主义方案遭遇悖论与不一致问题，但所提出的方法和问题持续推动数学基础与语言哲学。',
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
      '尼采接受古典语文学训练，曾在巴塞尔任教，后来以格言、论战和文学形式展开哲学。他研究道德价值怎样形成，追问某些被视为普遍正当的要求，是否也包含恐惧、怨恨或特定历史处境。\n\n《查拉图斯特拉如是说》等作品以不同声音讨论自我超越与价值创造。修辞和人物形象参与了论证，也使作品保持张力。其思想通过出版著作和身后笔记广泛传播；后人整理的遗稿与本人完成的作品之间，存在重要的编辑差别。',
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
      '胡塞尔从数学研究转向哲学，在哈雷、哥廷根等地任教。他反对用人的心理活动直接解释逻辑规律，转而追问判断为何有效、意义怎样被理解，以及意识总是指向某个对象这一结构。\n\n《逻辑研究》由这些问题开辟现象学道路。此后，他继续研究时间经验、不同主体如何共享世界，以及科学抽象与日常生活世界的联系。现象学在这一过程中持续发展，也影响了后来关于身体、存在和社会经验的研究。',
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
      '詹姆斯在哈佛接受科学与医学训练，由心理过程研究逐步进入哲学。《心理学原理》把生理材料、个人观察与概念分析结合，以“思想之流”说明意识持续变化的特点，关注习惯、注意和经验之间的联系。\n\n《实用主义》从观念在经验和行动中产生的差别解释哲学争论，研究信念如何接受检验、真理如何进入生活。他同时关切宗教经验与个人选择，尝试在科学研究和多样的人生经验之间保留对话空间。',
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
