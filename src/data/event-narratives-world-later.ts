import type { HistoryEvent, Source } from '../types'

export const laterWorldNarratives: Record<
  string,
  { narrative: NonNullable<HistoryEvent['narrative']>; sources: Source[] }
> = {
  'world-justinian': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '529年，查士丁尼主持整理罗马法律，第一部法典颁行。帝国留下的敕令、法学家意见与旧有规则数量庞大，内容也有重叠，编纂者希望把它们整理成能够实际援用的秩序。',
            '工作随后继续推进，形成法学家论述的汇编、教学用的《法学阶梯》和修订法典。它们处理的不只是刑罚，也包括财产、契约、婚姻与继承，把皇帝立法和既有法律知识重新结合。',
            '这些文献在东部帝国继续使用，后来又经西欧法学教育重新传播。所谓《民法大全》包含数年间形成的不同部分，529年标记的是其中一个起点，并非全部文献同时完成。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 1 · 10-2-the-byzantine-empire-and-persia',
        url: 'https://openstax.org/books/world-history-volume-1/pages/10-2-the-byzantine-empire-and-persia',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'category-hagia-sophia': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '532年尼卡暴动毁坏旧教堂后，查士丁尼命人在君士坦丁堡重建圣索菲亚教堂，537年举行启用仪式。工程把皇帝恢复首都秩序的行动，与宏大的宗教建筑联系起来。',
            '巨大的穹顶、半穹顶与支承结构共同组织内部空间，石材、马赛克和光线强化了礼仪体验。它需要数学与施工经验配合，也依靠帝国从不同地区调集材料和工匠。',
            '早期穹顶后来受损并被重建，建筑还经历修缮与用途转换。今天所见的圣索菲亚因而保存了多个时代的痕迹，不能把全部装饰和形制都归给537年的第一次启用。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '大都会艺术博物馆 · Hagia Sophia, 532–37',
        url: 'https://www.metmuseum.org/essays/hagia-sophia-532-37',
        note: '记537年12月27日启用，以及558年穹顶倒塌、562年重建。',
      },
    ],
  },
  'world-turkic-khaganate': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '552年，阿史那部首领土门击败柔然，建立突厥汗国。草原上原有的臣属关系被重新排列，新的可汗权力依靠部落联盟、军事动员与对交通资源的控制扩大。',
            '汗国很快向东西两方扩展，与中原王朝、粟特商人及更西方政权发生交往。统治既需要战胜对手，也需要在不同首领之间分配地位、战利品和辖区。',
            '此后突厥政治出现分裂与重组，不同汗国各有自己的历史。552年是王权兴起的节点，后来的碑铭、疆域和外交网络应按各自年代理解。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '大都会艺术博物馆 · Central and North Asia, 500–1000',
        url: 'https://www.metmuseum.org/toah/ht/06/nc',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'UNESCO · 鄂尔浑河谷文化景观',
        url: 'https://whc.unesco.org/en/list/1081/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-hijra': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '622年，穆罕默德及其追随者从麦加迁往雅斯里布，后者逐渐被称为麦地那。这次迁徙改变了早期穆斯林共同体的处境：他们需要在新的城市中建立生活基础，并协调当地不同群体的关系。',
            '穆罕默德在麦地那不仅传授信仰，也参与仲裁、联盟和公共事务。移民与当地支持者之间形成新的联系，共同体逐渐具有能够处理防御、财产和纪律的组织。',
            '迁徙后来被选作伊斯兰历的纪元起点。其重要性不只在于离开一座城市，还在于宗教共同体开始获得较稳定的政治与社会空间；与麦加的冲突则继续多年。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 1 · 11-1-the-rise-and-message-of-islam',
        url: 'https://openstax.org/books/world-history-volume-1/pages/11-1-the-rise-and-message-of-islam',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'depth-brahmagupta': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '628年，婆罗摩笈多写成《梵明悉檀多》，讨论天文计算，也处理算术、几何和方程等问题。计算在这里直接关系到怎样推算天体位置、时间与历法。',
            '书中有关零、正负数和运算规则的讨论，是印度数学史的重要材料。不同问题通过规则与例题连接起来，使抽象数的操作服务于实际计算，同时也暴露了除零等问题仍需进一步澄清。',
            '这部著作并非从零开始创造全部知识，而是在既有传统中整理、批评和推进方法。后来印度数学与天文学经翻译进入其他语言世界，相关办法又在新的讨论中继续变化。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'British Library · Brahmasphutasiddhanta, IO SAN 2529d',
        url: 'https://searcharchives.bl.uk/catalog/032-003720262',
        note: '馆藏说明记628年成书；文本为天文计算传统中的著作。',
      },
      {
        title: 'University of Göttingen · GRETIL Brahmagupta',
        url: 'https://gretil.sub.uni-goettingen.de/gretil/corpustei/transformations/html/sa_brahmagupta-brAhmasphuTasiddhAnta.htm',
        note: '原典电子文本及628年书目信息，数学内容见相关章节。',
      },
    ],
  },
  'world-mecca': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '630年，穆罕默德率追随者进入麦加，取得对这座宗教与贸易中心的控制。此前穆斯林共同体与麦加势力曾交战和订约，双方力量与联盟在多年间发生变化。',
            '进入麦加后，克尔白被重新确立为伊斯兰信仰的中心，旧有崇拜物被清除。部分昔日对手获得接纳，使共同体的扩大不仅依靠军事优势，也依靠对人员和关系的重新安排。',
            '麦加地位的改变增强了穆罕默德在阿拉伯半岛的影响，其他部落此后继续作出不同选择。半岛上的宗教与政治整合仍是持续过程，不能只用一次入城概括。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 1 · 11-1-the-rise-and-message-of-islam',
        url: 'https://openstax.org/books/world-history-volume-1/pages/11-1-the-rise-and-message-of-islam',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-yarmuk': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '636年，阿拉伯穆斯林军队在雅尔穆克一带击败东罗马军，叙利亚的力量对比随之改变。当地连接阿拉伯半岛、巴勒斯坦与两河，帝国之间的长期战争此前已经消耗了军力和财政。',
            '战斗涉及双方不同部队的协同、机动与对地形的利用，古代记述对兵力和细节差异很大。较明确的结果是，东罗马此后难以恢复对叙利亚大部的有效控制。',
            '征服后的城镇、居民和行政并未立即变成同一种社会。新统治需要与地方精英、教会和纳税群体形成关系，宗教及语言变化也在更长时间中展开。',
          ],
        },
      ],
      note: '不采用古代叙事中难以核实的精确兵力，把战役胜负与随后逐步接收地区分开。',
    },
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
  },
  'world-taika': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '645年，日本宫廷发生乙巳之变，苏我氏主要掌权者被杀，孝德天皇即位并使用“大化”年号。中大兄皇子、中臣镰足等参与重组朝廷权力，改革因此首先是一场政治转折。',
            '随后公布的措施涉及人口土地、地方官职与赋役组织，希望让朝廷更直接掌握资源。这些办法吸收大陆制度经验，也需要同日本列岛既有的氏族和地方关系协调。',
            '后来称为“大化改新”的一系列变化经历长期落实，现存记载又经过较晚史书整理。645年的政变、646年前后的诏令与后来律令国家的形成，应当连起来看，但不能合成一次全部完成的改革。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Columbia University · Excerpts from the Reform Edict of Taika',
        url: 'https://afe.easia.columbia.edu/ps/japan/taika.pdf',
        note: '导言及改革诏书节译；核对645年政变、646年诏令与改革内容。',
      },
    ],
  },
  'world-srivijaya': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '7世纪，室利佛逝在苏门答腊及周边海域兴起，依靠港口、河流与海峡交通形成影响力。它连接印度洋和南海航线，过往商船需要停泊、补给，也带来人员、货物与消息。',
            '这种权力不必以连续占领大片内陆土地来维持。与港口和地方首领的关系、对航道的保障或控制，以及贡使和贸易安排，都能成为组织海上网络的办法。',
            '佛教僧侣的往来也使这里成为学习和转赴南亚的中间地点。室利佛逝因而呈现了一种以海洋联系为基础的政治中心，其影响范围和内部结构随时代变化。',
          ],
        },
      ],
      note: '650年为兴起阶段的约略定位，不能据此画出固定不变的海上疆域。',
    },
    sources: [
      {
        title: 'OpenStax · World History 1 · 5-3-korea-japan-and-southeast-asia',
        url: 'https://openstax.org/books/world-history-volume-1/pages/5-3-korea-japan-and-southeast-asia',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-umayyad': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '661年，穆阿维叶确立哈里发地位，倭马亚王朝以大马士革为中心展开统治。此前的继承争议与内战，使新政权必须同时处理宗教共同体的合法性和广大征服地区的治理。',
            '王朝继续扩张，也沿用和调整各地官员、税制与行政经验。随着统治延伸，阿拉伯军人、地方居民和不同信仰群体之间的地位差别，成为财政与政治安排中的长期问题。',
            '哈里发权力逐步具有王朝继承性质，反对力量仍在不同地区积聚。倭马亚的兴起因此不只是迁都或换一位领袖，也涉及早期共同体如何成为跨地区帝国。',
          ],
        },
      ],
    },
    sources: [
      {
        title:
          'OpenStax · World History 1 · 11-2-the-arab-islamic-conquests-and-the-first-islamic-states',
        url: 'https://openstax.org/books/world-history-volume-1/pages/11-2-the-arab-islamic-conquests-and-the-first-islamic-states',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-silla': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '7世纪后半叶，新罗在与唐联合击败百济、高句丽后，又与唐争夺半岛控制。到676年前后，新罗巩固了对朝鲜半岛大部的统治，结束了旧三国并立的主要格局。',
            '联盟的共同敌人消失后，双方对驻军、地方管理和政治主导权的目标并不一致。新罗需要把战时胜利转化为对城邑、人口与原有精英的持续治理。',
            '半岛北方及东北地区仍有其他政治力量发展，“统一新罗”并不表示原高句丽全部土地都归新罗。新的王朝秩序、佛教文化与地方社会关系，也在此后的经营中逐步形成。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 1 · 12-3-border-states-sogdiana-korea-and-japan',
        url: 'https://openstax.org/books/world-history-volume-1/pages/12-3-border-states-sogdiana-korea-and-japan',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'east-shankara-nonduality': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '约公元8世纪，商羯罗通过解释《奥义书》《梵经》等经典，阐明后来被称为不二吠檀多的重要立场：个体自我与梵的根本关系，不能按日常经验中的相互分离来理解。',
            '他的论证关注无明怎样使人误认自身，以及知识为何能够解除这种束缚。注释不是简单复述经典，而是在与其他哲学、宗教解释争论中，说明哪些文字应被怎样理解。',
            '围绕商羯罗的传记、作品归属与修道院传统积累了许多后世记忆。思想的影响可以从注释与传承中追踪，具体生平却不宜全部照传说复原。',
          ],
        },
      ],
      note: '活动年代存在争议，页面年份只是宽泛定位，不把某一注释定为700年写成。',
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Śaṅkara',
        url: 'https://plato.stanford.edu/entries/shankara/',
        note: '§1 Life and Works、§2 Metaphysics、§4 Contemplative Philosophical Methods：8世纪活动与多种生卒推算，不采用未经确定的788—820精确生卒。',
      },
    ],
  },
  'world-nara': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '710年，日本朝廷迁入平城京，通常所说的奈良时代由此开始。规划整齐的都城为宫廷、官署、寺院和居民提供集中空间，也使律令制度获得较稳定的政治中心。',
            '朝廷以户籍、赋役和地方官组织资源，都城的营建与运作又需要从各地输送粮食、物资和劳力。宫廷内部的贵族竞争与佛教寺院的地位，持续影响政策和人事。',
            '平城京吸收了大陆都城制度与文化经验，也在本地条件中调整。迁都标志着国家组织的一次集中，但地方执行、人口流动和后来再次迁都，显示这一秩序始终在变化。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 1 · 12-3-border-states-sogdiana-korea-and-japan',
        url: 'https://openstax.org/books/world-history-volume-1/pages/12-3-border-states-sogdiana-korea-and-japan',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-abbasid': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '750年，阿拔斯运动击败倭马亚王朝，新的哈里发政权建立。来自呼罗珊的军事和政治支持，以及对旧王朝的不满，共同推动了权力更替。',
            '新王朝逐渐把统治重心转向伊拉克，与当地官僚、城市和区域网络形成更紧密联系。阿拉伯与非阿拉伯穆斯林、军队与宫廷之间的关系，也在王朝发展中重新安排。',
            '阿拔斯统治后来与巴格达的城市和学术繁荣相联系，但新都营建、翻译赞助与地方分权发生在不同阶段。750年首先是一场革命性的王朝更替，后来的文化成就仍依赖持续经营。',
          ],
        },
      ],
    },
    sources: [
      {
        title:
          'OpenStax · World History 1 · 11-2-the-arab-islamic-conquests-and-the-first-islamic-states',
        url: 'https://openstax.org/books/world-history-volume-1/pages/11-2-the-arab-islamic-conquests-and-the-first-islamic-states',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-baghdad-founded': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '762年，阿拔斯哈里发曼苏尔开始营建巴格达。新城位于底格里斯河畔，便于联系伊拉克农业腹地、河运和更广阔的陆路网络。',
            '最初的圆城把宫廷与清真寺置于政治布局中心，军队、官署、市场及居民又在周围不断扩展。真正的巴格达并未被最初规划完全限定，而是在人口与贸易增长中形成更复杂的城市。',
            '这里后来吸引学者、译者、工匠和商人，宫廷赞助与民间需求共同支持知识活动。建城提供的是集聚机会，所谓学术黄金时期则是数代人参与的结果。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Cambridge University Press · World Cities in History · Baghdad',
        url: 'https://www.cambridge.org/core/books/abs/world-cities-in-history/baghdad/436F7DC281A07230C18E78D741E172E7',
        note: '第8章摘要明确曼苏尔762年建城，并讨论贸易与学术网络。',
      },
    ],
  },
  'depth-cordoba-mosque': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '8世纪后期，安达卢斯倭马亚统治者阿卜杜勒·拉赫曼一世在科尔多瓦营建大清真寺。新建筑既服务于集体礼拜，也表达一个与东方阿拔斯不同的政治中心正在建立。',
            '柱列、层叠拱券与反复展开的空间成为建筑的鲜明特征。后继统治者不断扩建，祈祷方向、装饰和宫廷仪式也与王权变化联系起来。',
            '基督教征服后，建筑被改作主教座堂，并加入新的结构。今天所见是不同宗教与政权长期使用、改建的结果，不能把全部形制归于8世纪的一次工程。',
          ],
        },
      ],
      note: '早期营建通常定位于785年前后，页面起始年用于概括该阶段。',
    },
    sources: [
      {
        title: 'UNESCO World Heritage Centre · Historic Centre of Cordoba',
        url: 'https://whc.unesco.org/en/list/313/',
        note: 'Integrity段列八世纪兴建、长期扩建与1236年改作座堂。',
      },
    ],
  },
  'world-heian-capital': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '794年，桓武天皇迁都平安京。新城位于今京都一带，成为日本朝廷长期经营的政治与文化中心，平安时代也通常从这一年起算。',
            '迁都需要安排宫城、道路、官署与物资供应，也与朝廷试图重整权力和资源有关。城市规划借鉴大陆经验，实际居住和商业发展却并不始终按原计划均衡展开。',
            '此后贵族家族、天皇和寺社之间的关系不断变化，假名文学、和歌和宫廷艺术也在长期生活中成长。它们与新都联系密切，但不能把整个平安文化当成迁都当年立即出现的结果。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '大都会艺术博物馆 · Heian Period (794–1185)',
        url: 'https://www.metmuseum.org/essays/heian-period-794-1185',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-charlemagne': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '800年圣诞节，教皇利奥三世在罗马为查理曼加冕为皇帝。法兰克统治者此前已控制西欧大片地区，加冕使军事和王朝优势获得新的宗教与罗马帝国象征。',
            '教皇希望获得强大保护者，查理曼则需要为跨地区统治安排合法性。双方的合作并不表示对皇权和教权的理解完全一致，东部罗马皇帝也有自己的帝国地位。',
            '查理曼的治理仍依靠伯爵、教会、巡察和地方关系，加冕没有自动把各地变成统一运作的国家。后来帝国分割，又显示王朝继承与地方力量如何继续塑造西欧政治。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 1 · 13-1-the-post-roman-west-in-the-early-middle-ages',
        url: 'https://openstax.org/books/world-history-volume-1/pages/13-1-the-post-roman-west-in-the-early-middle-ages',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-borobudur': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '约8—9世纪，爪哇的统治者和工匠营建婆罗浮屠，以层层台地、回廊、佛塔与浮雕组织佛教礼拜空间。建筑依托山丘展开，把行走、观看与修行观念结合起来。',
            '沿回廊的图像叙事引导礼拜者理解佛教故事，逐级向上的路径又使整个建筑成为可以亲身经历的象征秩序。工程依靠大量石材、雕刻技术与资源动员，也反映爪哇与更广佛教世界的联系。',
            '后来的停用、重新发现和修复改变了遗址状态。婆罗浮屠既是古代宗教与王权赞助的作品，也是经历环境和历史变化而保存至今的建筑。',
          ],
        },
      ],
      note: '约800年为营建阶段定位，具体工期和赞助者仍有讨论。',
    },
    sources: [
      {
        title: 'OpenStax · World History 1 · 5-3-korea-japan-and-southeast-asia',
        url: 'https://openstax.org/books/world-history-volume-1/pages/5-3-korea-japan-and-southeast-asia',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-angkor-centres': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '9世纪起，高棉王权在吴哥地区逐步形成多个都城中心。宫廷、神庙、水库与农业聚落相互连接，使政治权威能够依托土地、劳力和仪式持续扩张。',
            '王室营建把神圣秩序与统治者形象结合，水利设施则参与供水、生产和城市组织。不同君主迁移或重建中心，吴哥因此不是一座在某年建成后便固定不变的城市。',
            '寺院、堤道和村落的广泛分布，显示都城与乡村之间的密切关系。理解其兴盛，需要同时看到宏大建筑与支撑建筑的人口、稻作和资源调配。',
          ],
        },
      ],
      note: '801年代表9世纪阶段起点，不把传统中的王朝纪年当作全部吴哥遗迹的建造日期。',
    },
    sources: [
      {
        title: 'UNESCO · 吴哥',
        url: 'https://whc.unesco.org/en/list/668/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-ghana-trade': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '约8—11世纪，古加纳在西非萨赫勒地带发展为重要王国。它位于撒哈拉商路与南方黄金产区之间，通过市场、贡赋和对交通节点的影响积累力量。',
            '盐、金、牲畜与多种商品在商人和地方社会之间流转，城市同时容纳王室、居民和远来商人。伊斯兰教随贸易扩大影响，与地方信仰及王权仪式长期并存。',
            '古加纳的范围和中心仍有研究问题，它与现代加纳共和国也不是同一个国家。将其放回萨赫勒的河谷、草原和沙漠边缘，才能理解贸易与政治如何共同发展。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · Medieval Sub-Saharan Africa',
        url: 'https://openstax.org/books/world-history-volume-1/pages/15-2-medieval-sub-saharan-africa',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'category-algebra': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '约9世纪前期，花剌子米在阿拔斯时代写作关于还原与对消的计算著作，系统说明若干方程的处理办法。“代数”这一名称后来与书名中的al-jabr联系起来。',
            '书中的计算服务于分配、交易和测量等问题，又通过规则与几何论证说明步骤为何有效。它使用的是文字表述，与今天简洁的符号方程不同。',
            '著作后来经过翻译进入拉丁语学术世界，相关方法在教学中继续扩展。它的重要性在于组织可重复使用的解题程序，而不必被讲成一位作者独自发明了所有代数知识。',
          ],
        },
      ],
      note: '825年为常见的约略写作定位。',
    },
    sources: [
      {
        title: '美国数学协会 Convergence · Latin Manuscript of Al-Khwarizmi’s Algebra',
        url: 'https://old.maa.org/node/1409908',
        note: 'Frank J. Swetz文章开篇记约825年写成及后来的拉丁译本，并列六种方程。',
      },
    ],
  },
  'world-verdun': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '843年，查理曼的三个孙辈在内战后签订凡尔登条约，分割加洛林帝国。洛泰尔保有皇帝称号及中部地带，路易和查理分别取得东、西部王国。',
            '分割首先回应王朝继承、贵族联盟和战争造成的现实，并不是按现代民族国家边界进行规划。中部地区南北狭长，后来的继承与争夺又继续改变版图。',
            '这次安排为西欧后续政治发展留下重要框架，但法国、德国等国家并非在843年已经完整诞生。王国、地方贵族和教会之间的关系，还要经过长期重组。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 1 · 13-1-the-post-roman-west-in-the-early-middle-ages',
        url: 'https://openstax.org/books/world-history-volume-1/pages/13-1-the-post-roman-west-in-the-early-middle-ages',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-samanid-culture': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '9—10世纪，萨曼尼王朝以布哈拉等城市为中心经营中亚，城市贸易、宫廷与学术活动相互促进。它名义上与阿拔斯哈里发保持联系，实际又拥有广泛的地方统治空间。',
            '布哈拉的市场、宗教机构和宫廷吸引诗人、学者与商人，波斯语文学在这一环境中获得重要发展。艺术与建筑也把伊斯兰文化和当地技术传统重新结合。',
            '这种繁荣依赖农业腹地、交通和政治赞助，不能只由一座纪念建筑代表全部社会。萨曼尼衰落后，人员、语言与知识传统继续在新的政权中流传。',
          ],
        },
      ],
      note: '850年用于标示王朝文化发展的早期阶段，现存建筑与著名人物活动多属其后年代。',
    },
    sources: [
      {
        title: '大都会艺术博物馆 · Central and North Asia, 500–1000',
        url: 'https://www.metmuseum.org/toah/ht/06/nc',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'UNESCO · 布哈拉历史中心',
        url: 'https://whc.unesco.org/en/list/602/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'category-kokinshu': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '905年，醍醐天皇命人编纂《古今和歌集》，纪贯之等参与整理，和歌由此进入更明确的奉敕编集传统。编者从旧作和当时作品中选择、分类，塑造何种诗歌值得共同保存。',
            '季节、恋情、离别与杂感被安排成有次序的阅读，序文又讨论和歌的来历与作用。诗集既留下个人声音，也通过编辑建立宫廷文学的尺度。',
            '此后奉敕和歌集不断续编，《古今集》成为创作与评判的重要参照。其权威来自朝廷委托、作品选择和长期诵读共同形成，并不意味着当时所有日本人的诗歌经验都被收录。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '日本国文学研究资料馆 · 古今和歌集',
        url: 'https://literarymaps.nijl.ac.jp/en/resources/567554dddddddddddddddd01/',
        note: '作品目录列作者、体裁及905／912年两种时间标记。',
      },
    ],
  },
  'world-goryeo-foundation': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '918年，王建取代弓裔，建立高丽政权，以松岳一带为中心发展力量。当时新罗统治衰弱，半岛处于后后三国竞争，高丽最初只是参与角逐的一方。',
            '王建通过战争、地方联盟与婚姻关系扩大支持，逐渐吸收不同地区的首领和人口。直到936年前后击败后百济，半岛主要政治力量才重新整合。',
            '高丽的建立因此需要区分称王与完成整合两个节点。此后王朝继续处理地方豪族、佛教机构与中央官制的关系，新的统治秩序在长期经营中形成。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'UNESCO · 开城历史建筑与遗址',
        url: 'https://whc.unesco.org/en/list/1278/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'category-azhar': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '10世纪后期，法蒂玛王朝在新建的开罗营建爱资哈尔清真寺。它既服务于礼拜，也与王朝展示宗教权威、组织教导的需要相联系。',
            '围绕清真寺发展的讲学吸引学者与学生，经典解释、法律和语言学习逐渐形成持续传统。供养、职位与教学关系，使一座宗教建筑成为能够维持知识活动的共同体。',
            '爱资哈尔后来经历不同政权和教派环境，课程、组织和地位不断调整。今天的大学制度是长期演变的结果，不能完整投射到10世纪的初建时期。',
          ],
        },
      ],
      note: '970年前后对应早期营建，清真寺落成与学术传统发展不是同一瞬间。',
    },
    sources: [
      {
        title: '爱资哈尔官方门户 · الجامع الأزهر الشريف',
        url: 'https://azhar.eg/alazharmosque/about_alazhar.htm',
        note: '首段记回历359—361年营建及公元972年首次主麻聚礼。',
      },
    ],
  },
  'world-norse-newfoundland': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '约公元1000年前后，北欧航海者在纽芬兰北端的兰塞奥兹牧草地建立短期营地。草皮房屋、铁器加工等遗迹，使跨越北大西洋的航行获得了可见的实物证据。',
            '营地与格陵兰、冰岛方向的航海联系有关，可供船员停留、维修和探索。它没有发展成长期大规模殖民地，具体航次与萨迦故事之间的对应也仍需分辨。',
            '这里早已有原住民生活，北欧人到达不能被写成美洲历史的开始。遗址说明的是一次有限而重要的跨洋接触，其后数百年的欧洲殖民属于另一段历史。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '加拿大国家公园管理局 · Culture and history: L’Anse aux Meadows',
        url: 'https://parks.canada.ca/lhn-nhs/nl/meadows/culture',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-seljuk-merv': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '11—12世纪，梅尔夫在塞尔柱统治下成为重要政治与城市中心，尤其与苏丹桑贾尔的统治相联系。绿洲农业与穿行中亚、伊朗的道路，为人口和商业提供支撑。',
            '王朝依靠军队、官僚和地方精英经营大片地区，城市中的宗教、学术及手工业活动又获得宫廷和社会供养。城墙、水利与公共建筑体现了维系大型绿洲城市所需的长期组织。',
            '梅尔夫的历史远早于塞尔柱，后来又遭战争毁坏和重建。把各阶段分开，才能理解它如何在不同政治网络中反复成为中心。',
          ],
        },
      ],
      note: '1001年标示11世纪范围起点，并非塞尔柱王朝于该年已经定都梅尔夫。',
    },
    sources: [
      {
        title: 'UNESCO · 古代梅尔夫历史文化公园',
        url: 'https://whc.unesco.org/en/list/886/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-bagan-kingdom': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '11—13世纪，蒲甘在伊洛瓦底江流域发展为重要王国与佛教建筑中心。王室、贵族和其他施主不断营建佛塔、寺院，把政治声望、功德与土地资源联系起来。',
            '大量建筑分布在农业和居民活动的景观中，寺院需要田产、劳力和供养才能延续。壁画、铭文与建筑形式，也显示不同地区的宗教和工艺经验来到这里。',
            '蒲甘并不是由一位君主一次建成的“万塔之城”。遗迹积累于数百年，王权变化后，宗教场所仍被使用和修缮，留下多层历史。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'UNESCO · 蒲甘',
        url: 'https://whc.unesco.org/en/list/1588/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-chola-temple': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '11世纪初，朱罗王罗阇罗阇一世在坦贾武尔营建布里哈迪斯瓦拉神庙，约1010年完成奉献。高耸主塔与石构群把湿婆崇拜和王室权威展示在都城景观中。',
            '神庙不只是一座供观赏的建筑。土地捐赠、祭司、舞者、工匠和日常供奉需要组织，铭文记录的人员与财产安排，使宗教生活和地方经济发生密切联系。',
            '朱罗统治者此后继续营建其他大型寺院，形成各有特点的建筑群。坦贾武尔工程是这一传统的重要节点，今天的持续礼拜又使古代建筑保持活的用途。',
          ],
        },
      ],
      note: '1003年前后是本条营建阶段起点，不能与约1010年的奉献日期混同。',
    },
    sources: [
      {
        title: 'ICOMOS · Great Living Chola Temples 评估',
        url: 'https://whc.unesco.org/archive/advisory_body_evaluation/250bis.pdf',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'UNESCO · 朱罗王朝现存的伟大神庙',
        url: 'https://whc.unesco.org/en/list/250/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'category-genji': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '11世纪初，紫式部的《源氏物语》已经在日本宫廷圈内流传。作品以光源氏及其后人的生活展开，借相遇、婚姻、离别与记忆描写贵族社会复杂的人际关系。',
            '人物行动受到身份、家族安排和宫廷礼仪影响，叙述又不断进入他们对得失和时间的感受。长篇故事由此把私人情感与社会结构连接起来，留下比单纯宫廷编年更细腻的生活经验。',
            '作品通过抄写、阅读、评注和图像再现长期传播，今天所见文本也经历传承。1008年前后的材料能说明早期流传，不能据此断言全书在某一天一次完稿。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Wikipedia · The Tale of Genji（早期流传、紫式部与作品传承）',
        url: 'https://en.wikipedia.org/wiki/The_Tale_of_Genji',
      },
    ],
  },
  'category-optics': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '11世纪，伊本·海赛姆在《光学》中系统研究光、视觉与成像。他把观察、几何推理和实验安排结合，讨论光怎样进入眼睛，以及为何会出现反射、折射和视觉误判。',
            '这样的研究需要把“看见”拆成可以分析的问题：光线经过怎样的路径，孔口与遮挡改变什么，观察者又如何判断距离和形状。视觉因此不再只是眼睛向外发出作用的简单过程。',
            '著作后来译为拉丁文，进入欧洲的光学和视觉讨论。它的影响通过翻译和后继研究逐步展开，不必把现代全部光学方法都归给一次写作。',
          ],
        },
      ],
      note: '1011年为常用写作阶段定位，整部著作的具体形成过程无法按单年完全确定。',
    },
    sources: [
      {
        title: 'Annals of Saudi Medicine · Ibn Al-Haytham: Father of Modern Optics',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6074172/',
        note: '见关于《光学》写作时间1011—1021及实验和视觉理论的段落。',
      },
    ],
  },
  'phil-avicenna-cure': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '11世纪前期，伊本·西那在迁徙、任职与讲学中陆续写作《治疗论》等哲学著作。书名所说的“治疗”主要指向心灵求知，并不是另一部医学手册。',
            '他把逻辑、自然研究、数学和形而上学组织成系统，分析存在、必然与可能、灵魂及认识等问题。亚里士多德传统在这里经过重新论证，也与伊斯兰时代的哲学和宗教争论发生联系。',
            '学生、抄本和翻译使这些作品传向不同地区，后来影响阿拉伯语、波斯语和拉丁语学术。具体著作在不同时段写成，不能把作者所有重要思想都压到1024年一个节点。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Ibn Sina [Avicenna]',
        url: 'https://plato.stanford.edu/entries/ibn-sina/',
        note: '第1.1节 Life：伊斯法罕约1024—1037年及完成《治疗论》；第1.2节与第4节解释著作范围。',
      },
    ],
  },
  'world-schism': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1054年，罗马教皇使节与君士坦丁堡牧首一方相互采取绝罚行动，成为东西方教会关系破裂的标志。争端牵涉礼仪、教义措辞和权威，也受到帝国与地方政治的影响。',
            '双方此前已经积累语言、制度与管辖权分歧，1054年的行动并不等于所有东西方基督徒当日都切断联系。后来的冲突，尤其十字军时代的战争，又进一步加深隔阂。',
            '因此，所谓“大分裂”更适合看作一个长期过程中的醒目节点。罗马天主教与东正教的不同传统，在争论、交往和各自制度发展中逐渐形成更明确边界。',
          ],
        },
      ],
    },
    sources: [
      {
        title:
          'OpenStax · World History 1 · 13-3-patriarch-and-papacy-the-church-and-the-call-to-crusade',
        url: 'https://openstax.org/books/world-history-volume-1/pages/13-3-patriarch-and-papacy-the-church-and-the-call-to-crusade',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-hastings': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1066年，诺曼底公爵威廉渡海争夺英格兰王位，在黑斯廷斯击败并杀死哈罗德。英王忏悔者爱德华去世后的继承争议，使英格兰同时面对来自不同方向的军事竞争。',
            '哈罗德此前在北方击败另一支入侵军，随后南下迎战威廉。诺曼军结合步兵、弓手和骑兵作战，英军防线最终瓦解；古代叙事对具体战术和国王死法仍有不同说法。',
            '威廉同年加冕，但征服没有在会战后立即完成。各地抵抗、土地重新分配、城堡营建和行政接收继续多年，改变了英格兰精英结构及其与欧洲大陆的关系。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '英国历史遗产委员会 · History of Battle Abbey and Battlefield',
        url: 'https://www.english-heritage.org.uk/visit/places/1066-battle-of-hastings-abbey-and-battlefield/history-and-stories/history/',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-manzikert': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1071年，东罗马皇帝罗曼诺斯四世在曼齐刻尔特与塞尔柱军交战，败后被俘。阿尔普·阿尔斯兰的胜利打击了帝国军队，也使皇帝在国内政治斗争中失去优势。',
            '战后双方曾商谈安排，但东罗马内部的废立与内战使局势继续恶化。突厥集团进入安纳托利亚，与地方势力、城市和乡村形成新的政治关系。',
            '曼齐刻尔特是重要转折，却不能单独解释安纳托利亚随后数十年的变化。军事失败、继承争夺和地方控制崩解相互作用，才使原有边境逐步变成新的社会空间。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Oxford Bibliographies · Battle of Manzikert',
        url: 'https://academic.oup.com/reference/62399/reference-article-abstract/561732157',
        note: '条目导论，1071年8月26日及交战双方；后续解释参见所列研究。',
      },
    ],
  },
  'category-bologna': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '11—12世纪，博洛尼亚的罗马法教学逐渐聚集师生，成为欧洲大学传统的重要起点。1088年是后来采用的纪念性建校年份，早期教学并不是一次现代式开学典礼所创造。',
            '教师解释法律文本，学生通过研读、问答和辩论学习如何处理条文之间的关系。来自不同地区的学生还组织团体，协调费用、住宿和与城市的关系，使求学逐渐具有稳定制度。',
            '法学训练回应教会、城市和统治者对文书及裁判人才的需要。博洛尼亚的影响因此既来自经典文本，也来自教学共同体和城市生活共同塑造的组织办法。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '博洛尼亚大学 · Our history',
        url: 'https://www.unibo.it/en/university/who-we-are/our-history/our-history',
        note: '“Nine centuries of history”明确把1088年称为conventionally referred founding year。',
      },
    ],
  },
  'world-crusade': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1096年起，响应教皇号召的不同军队从欧洲西部向东地中海进发，第一次十字军东征展开。宗教热情、贵族关系、财富与政治机会以不同方式影响参加者，远征并非完全统一指挥。',
            '军队需要穿越陌生地区、取得粮食，并与东罗马和当地统治者交涉。途中也发生针对犹太社群的屠杀，宗教动员对未参加战斗的人同样造成暴力。',
            '1099年，十字军攻占耶路撒冷并屠杀居民，随后建立拉丁政权。占领使地区权力关系改变，却无法终结穆斯林、东部基督徒和拉丁势力之间的长期竞争。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 1 · 13-4-the-crusading-movement',
        url: 'https://openstax.org/books/world-history-volume-1/pages/13-4-the-crusading-movement',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'depth-oxford-teaching': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '牛津在1096年前后已有教学活动的记录，但没有一个能够概括全部大学起源的确切创办日期。教师与学生的聚集、课程和资格的形成，经历了更长过程。',
            '学习逐渐围绕讲授、文本解释和辩论展开，求学者也需要处理与城镇居民、教会及王权的关系。后来出现的学院提供住宿、供养和共同生活，使部分教学与制度安排更稳定。',
            '因此，牛津的历史可以从一个学习网络怎样延续和组织起来理解。今天大学的管理、学科和学院体系，并不是1096年已经全部具备的形式。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'University of Oxford · Our history',
        url: 'https://www.ox.ac.uk/about/the-university/history',
        note: '1096 Evidence of teaching：明言无明确创立日期。',
      },
    ],
  },
  'world-great-zimbabwe': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '约11—15世纪，大津巴布韦在非洲南部高原兴盛，石墙建筑与周围聚落形成重要政治中心。畜牧、农业和地方手工业为居民与精英提供资源，远距离贸易又把这里连接到印度洋世界。',
            '干砌石墙不使用灰浆，围合空间与高地建筑展示了熟练工艺和持续动员。进口器物证明交流，却不改变建筑由当地非洲社会营建的事实。',
            '其政治中心后来转移，居民和文化传统并未因此从地区消失。遗址有力反驳了殖民时代否认非洲人建造能力的解释，也让我们看到内陆社会如何主动参与全球联系。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 1 · 15-2-medieval-sub-saharan-africa',
        url: 'https://openstax.org/books/world-history-volume-1/pages/15-2-medieval-sub-saharan-africa',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-khorezm-urgench': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '12—13世纪，乌尔根奇成为花剌子模的重要中心，连接阿姆河流域农业与中亚商路。清真寺、陵墓和公共建筑留下了城市财富、技艺及宗教生活的痕迹。',
            '花剌子模王权逐步扩大，城市中的官员、商人和学者也参与跨地区网络。财富来自腹地生产和交换，政治扩张则使这里更深卷入周边竞争。',
            '13世纪蒙古征服给城市造成严重破坏，此后仍经历恢复和新的营建。遗址所见建筑跨越不同时段，不能全部归于王朝最初兴起的同一年。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'UNESCO · 库尼亚－乌尔根奇',
        url: 'https://whc.unesco.org/en/list/1199/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-angkor-wat': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '12世纪前期，高棉王苏利耶跋摩二世主持营建吴哥寺。建筑以毗湿奴崇拜和王权表达为重要背景，护城河、回廊与中央塔群共同构成宏大秩序。',
            '浮雕把史诗、神话和王室活动置于礼仪空间，修建与维护则依靠工匠、物资和广大农业社会的支持。建筑的象征意义与日常资源组织不能分开。',
            '吴哥寺后来成为佛教礼拜场所，并持续经历修缮和使用。今天的建筑既保存12世纪的政治宗教构想，也包含此后信仰与生活延续的历史。',
          ],
        },
      ],
      note: '1101年是12世纪范围的起点标记，不是已确认的开工日。',
    },
    sources: [
      {
        title: 'NASA Earth Observatory · Angkor Wat：遗址及营建时期',
        url: 'https://science.nasa.gov/earth/earth-observatory/angkor-wat-5112/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'UNESCO · 吴哥',
        url: 'https://whc.unesco.org/en/list/668/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-lalibela-churches': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '约12—13世纪，埃塞俄比亚拉利贝拉形成一组岩石教堂。工匠在岩体中向下开凿，再分出外墙、门窗与内部空间，建筑与地形由此成为一体。',
            '通道、沟渠和礼拜路线把教堂群连接起来，也处理排水和人员流动。它们与当地基督教王权及朝圣传统相联系，长期吸引信徒。',
            '传统常把工程归于拉利贝拉王，实际营建阶段和参与者仍有讨论。持续礼拜说明这里不只是废弃遗址，而是经历修缮、环境压力与宗教生活的活建筑群。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'UNESCO · 拉利贝拉岩石教堂',
        url: 'https://whc.unesco.org/en/list/18/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'depth-notre-dame-begins': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1163年前后，巴黎圣母院开始长期营建。巴黎城市和王权地位不断上升，主教座堂既需要容纳礼仪，也成为城市公共景观的重要中心。',
            '石工、木匠、雕刻者及其他工匠用多代劳动推进唱诗席、中殿、立面与支承结构。哥特式技术让墙体和窗户关系改变，彩色玻璃、雕像与空间共同组织信仰体验。',
            '建筑并未在一个工期内完全定型，后来的增建、损坏和修复持续改变它。1163年适合标记工程的传统起点，不能当作今天所见全部部分的完成日期。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Ville de Paris · Notre-Dame de Paris rouvre ses portes',
        url: 'https://www.paris.fr/pages/cinq-ans-apres-notre-dame-de-paris-s-apprete-a-rouvrir-ses-portes-29209',
        note: '历史背景明确1163年至十四世纪中叶的营建过程；本条只呈现起点。',
      },
    ],
  },
  'phil-averroes-decisive': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '12世纪后期，伊本·鲁世德在《决定论》中讨论哲学研究与伊斯兰宗教法的关系。他既是哲学评注者，也有法律与医学工作经验，问题因此不只是抽象争辩。',
            '他主张，对具备相应能力的人而言，考察存在并作理性论证可以得到宗教上的正当位置。经典文本的解释也应考虑论证与读者能力，而不能把所有表达都按同一层次处理。',
            '这并不是现代意义上简单宣布宗教和哲学彼此隔离，而是在宗教法框架内说明求知的职责与边界。作品后来在不同语言和传统中被重新理解，也显示经典解释如何参与公共权威的争论。',
          ],
        },
      ],
      note: '1178年前后为约略写作定位。',
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Ibn Rushd [Averroes]',
        url: 'https://plato.stanford.edu/entries/ibn-rushd/',
        note: '第6节 Religion 与著作目录 Decisive Treatise（1178/9）；另见第9节接受史。',
      },
    ],
  },
  'world-kamakura-shogun': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1192年，源赖朝获征夷大将军称号。此前他已经在镰仓组织武士政权，并在源平战争后扩大对军事和地方关系的控制，称号是既有力量获得朝廷认可的重要节点。',
            '守护、地头及御家人关系，把军事服务、土地收益和裁判联系起来。京都朝廷仍然存在，镰仓也不是一夜取代全部旧制度，而是与贵族、寺社和地方势力交错运行。',
            '赖朝死后，北条氏等继续改变幕府权力结构。因而理解镰仓幕府的形成，需要把称号、地方组织和后来的执权政治分别放在各自时间中。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '大都会艺术博物馆 · Japan, 1000–1400',
        url: 'https://www.metmuseum.org/toah/ht/07/eaj',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-sukhothai': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '13世纪，素可泰在今泰国北部发展为重要政权，王权、城市与上座部佛教传统逐渐结合。寺院、佛像和水利设施，留下都城经营与宗教赞助的实物痕迹。',
            '统治者需要连接周围城镇、农业人口与地方首领，权力范围常以层次不同的关系维持，而非现代边界内均一管理。与高棉及其他邻近势力的竞争，也影响其发展。',
            '素可泰后来被赋予泰文化起源的重要意义，但文字、艺术和政治传统都承接多种地区联系。具体王室铭文与后世记忆，需要分别理解。',
          ],
        },
      ],
      note: '1201年标示13世纪分期，不把全部国家和文化成果归于这一年。',
    },
    sources: [
      {
        title: 'UNESCO · 素可泰历史城镇及相关城镇',
        url: 'https://whc.unesco.org/en/list/574/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-kilwa-trade': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '约13—15世纪，基尔瓦在东非斯瓦希里海岸繁荣，海港与城市联系内陆黄金等资源及印度洋航线。当地社会主动经营贸易，远方商人也带来陶器、纺织品和宗教联系。',
            '珊瑚石建筑、清真寺与宫殿展示财富和工艺，港口居民的语言与生活则融合非洲本地传统和跨海往来。伊斯兰教在城市中占有重要位置，并非因此使其成为脱离非洲腹地的外来据点。',
            '基尔瓦的强盛随商路与政治竞争变化，后来葡萄牙介入又改变海岸局势。把海港与内陆放在一起，才能看见繁荣背后多方参与的网络。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'UNESCO · 基尔瓦基斯瓦尼与松戈马拉遗址',
        url: 'https://whc.unesco.org/en/list/144/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-constantinople-sack': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1204年，第四次十字军攻陷并洗劫君士坦丁堡。原本以东地中海远征为目标的行动，在运输债务、威尼斯利益和东罗马皇位争夺中改变方向，最终攻击了基督教城市。',
            '攻城后发生掠夺、破坏和人口苦难，拉丁势力在首都建立政权，其他东罗马力量则退往不同地区继续争夺继承权。帝国的财政、政治与文化资源遭到严重分割。',
            '1261年君士坦丁堡被收复，但旧有力量难以完全恢复。1204年也加深了东西方教会和社会的隔阂，宗教共同身份并未阻止利益冲突导致战争。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 1 · 13-4-the-crusading-movement',
        url: 'https://openstax.org/books/world-history-volume-1/pages/13-4-the-crusading-movement',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-delhi': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1206年前后，德里苏丹国兴起，北印度进入新的政权竞争阶段。军事首领在原有征服基础上建立统治，需要把军队支持转化为对城市、土地收益与地方精英的管理。',
            '苏丹统治并不抹去当地社会，税收、行政和宗教安排不断与不同地区的传统协调。波斯语政治文化、伊斯兰机构和南亚工艺在城市中形成新的联系。',
            '德里苏丹国后来由多个王朝先后掌权，范围也反复变化。1206年是政治起点之一，不能把后继数百年的最大疆域与制度一并放入建立之年。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · 2-1-india-and-international-connections',
        url: 'https://openstax.org/books/world-history-volume-2/pages/2-1-india-and-international-connections',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'east-dogen-shobogenzo': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '13世纪，道元在日本讲授并撰写后来汇为《正法眼藏》的多篇文字，把修行、语言、身体与时间作为相互关联的问题。他曾赴宋学习，又在返日后逐渐组织自己的僧团。',
            '坐禅在其教导中不是先忍耐练习、以后才换取觉悟的单纯手段，修行与证悟的关系本身需要重新理解。经典、公案和日常行动，也被用来检验人怎样理解自身与世界。',
            '《正法眼藏》包含不同时期、不同场合的文章，后来又有不同编排和版本。1231年只是相关写作活动的一个早期节点，不表示整部书已经一次完成。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'University of St Andrews · Dōgen (1200–1253)',
        url: 'https://www.saet.ac.uk/Buddhism/Dogen',
        note: '生平与著作部分：1231年《辨道话》及1230年代以后的著述、修证与时间思想；《正法眼藏》是长期形成且有版本差异的文集。',
      },
    ],
  },
  'world-mali-sundiata': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '13世纪前期，桑贾塔在西非曼德地区整合联盟，奠定马里政权的重要基础。地方首领、军事力量与商路收益，使一个能够扩展的政治中心逐渐形成。',
            '后世史诗把桑贾塔的成长与胜利讲成共同体起源，书面记载则留下较少的同时代细节。两类材料都重要，但不能把口传中每个场面直接当作精确战报。',
            '马里此后控制更广阔的农业与贸易地区，黄金和跨撒哈拉联系推动其声望。桑贾塔的整合、后继君主的扩张及曼萨·穆萨时期的繁荣，属于连续而不同的阶段。',
          ],
        },
      ],
      note: '1235年为传统常用节点，具体战事年代与早期政治结构仍有讨论。',
    },
    sources: [
      {
        title: 'OpenStax · Early Modern Africa 年代图',
        url: 'https://openstax.org/books/world-history-volume-2/pages/3-introduction',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'OpenStax · Medieval Sub-Saharan Africa',
        url: 'https://openstax.org/books/world-history-volume-1/pages/15-2-medieval-sub-saharan-africa',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'depth-tripitaka-koreana': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '13世纪蒙古入侵高丽期间，高丽重新组织大藏经雕刻工程。此前经版在战争中毁坏，新工程既为保存佛典，也寄托了以佛教功德护佑国家的愿望。',
            '校勘、书写、刻版和物资供应需要大规模协作，数万块木版把经文转为可以反复印刷的稳定载体。文字的统一与差错控制，和木材加工、储存环境同样重要。',
            '这些木版后来保存于海印寺，延续为佛教学习和印刷的珍贵资源。工程显示，在战争压力下，宗教信仰、国家动员与知识保存仍可能共同推动长期文化建设。',
          ],
        },
      ],
      note: '1237年定位重新雕刻阶段的开始，完整工程延续多年。',
    },
    sources: [
      {
        title: 'UNESCO World Heritage Centre · Haeinsa Temple Janggyeong Panjeon',
        url: 'https://whc.unesco.org/en/list/737/',
        note: '现存经版雕于1237—1248年，藏经建筑年代另列。',
      },
    ],
  },
  'world-baghdad': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1258年，旭烈兀率蒙古军攻陷巴格达，阿拔斯哈里发被杀。此前蒙古已在西亚持续扩张，哈里发宫廷却难以动员足够力量应对围城。',
            '攻城与屠杀使居民、市场和城市机构遭受重创，延续数百年的巴格达阿拔斯政治中心由此结束。毁坏的规模巨大，但古代记载的死亡总数差异很大，不能当成精确统计。',
            '城市此后在蒙古及后继统治下继续存在，伊斯兰学术和社会也在其他中心延续。巴格达陷落改变了权力格局，不等于一个文明在同一天终止。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 1 · 14-3-the-mongol-empire-fragments',
        url: 'https://openstax.org/books/world-history-volume-1/pages/14-3-the-mongol-empire-fragments',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-ayn-jalut': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1260年，埃及马穆鲁克军在艾因贾鲁击败蒙古留守军。旭烈兀主力此前撤离叙利亚，留下的军队与马穆鲁克政权争夺通向埃及和黎凡特的关键空间。',
            '马穆鲁克统治者忽都思、拜巴尔等组织进军，在交战中利用机动和战场部署取得优势。胜利增强了新政权的威望，也使蒙古在当地的推进受到阻挡。',
            '战役并未结束蒙古与马穆鲁克之间的战争，双方此后仍多次争夺叙利亚。它的重要性在于改变一阶段的军事局势，而不是证明蒙古军队从此不再具有威胁。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Texas Tech University · Jami al-Tawarikh: The Battle of Ayn Jalut',
        url: 'https://www.myweb.ttu.edu/jhowe/syllabi/Ayn%20Jalut.html',
        note: '大学课程收录拉施特《史集》节译；核对1260年、主力撤离背景与战役叙事，日历换算不据此精确到日。',
      },
    ],
  },
  'phil-aquinas-summa': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '13世纪60年代，托马斯·阿奎那开始写作《神学大全》，为学习者组织有关上帝、世界、人类行为和基督的系统讨论。作品采用问题、反对意见、答复与辨析的形式，让争论进入教学结构。',
            '阿奎那吸收亚里士多德哲学，也与基督教教父和其他思想传统对话。他希望说明理性能够认识什么，哪些真理又依赖启示，以及两者为何不应真正矛盾。',
            '著作在他去世时尚未亲自完成，后来通过弟子整理、课程和教会传统获得巨大影响。它既是个人思想成果，也是中世纪大学辩论与教学文化的产物。',
          ],
        },
      ],
      note: '1267年为写作过程中的节点，不能当作全书出版或完稿日。',
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Thomas Aquinas',
        url: 'https://plato.stanford.edu/entries/aquinas/',
        note: '第1节 Life and Works 及参考书目 A1：Summa theologiae（1267—73，未完成）；第8节伦理。',
      },
    ],
  },
  'category-ducat': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1284年，威尼斯开始铸造金杜卡特。海上贸易需要便于接受和比较的支付手段，较稳定的重量、成色与城市信用，使这种金币逐渐获得广泛使用。',
            '币面以圣马可、总督和基督等图像表达宗教与共和国权威，货币的可信度则还依靠铸造、检验和长期流通。商人使用金币时，需要在不同货币和计价单位之间兑换。',
            '杜卡特后来被多地仿铸，名称也进入不同地区的货币语言。它的影响来自数百年贸易实践，不能仅凭1284年的开铸就认定地中海支付已经统一。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '加泰罗尼亚国家艺术博物馆 · Ducat',
        url: 'https://www.museunacional.cat/en/ducat',
        note: '钱币术语条目明确记1284年在威尼斯创设黄金货币单位。',
      },
    ],
  },
  'world-majapahit-foundation': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1293年，满者伯夷在爪哇兴起，罗登·维阇耶在当地冲突及蒙古远征带来的局势中建立新的统治中心。新王国接续岛上既有的农业、宫廷和港口网络。',
            '王权需要协调地方首领、寺院、稻作腹地与海上交换，后继统治者又进一步扩大影响。对外关系常有层次不同的朝贡和联盟，不能简单等同于连续直接统治。',
            '后来的文学和国家记忆把满者伯夷与广阔群岛联系起来。理解这些说法时，应区分宫廷宣示、实际控制和更松散的政治文化影响。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '大都会艺术博物馆 · Southeast Asia, 1000–1400',
        url: 'https://www.metmuseum.org/toah/ht/07/sse',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-ottoman-origins': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '13世纪末，奥斯曼在安纳托利亚西北部逐渐形成政权。它处在东罗马边境与突厥诸势力交错地带，战争、迁徙和地方联盟为新首领提供了扩张机会。',
            '早期力量依靠亲随武士，也吸收不同背景的人与既有城镇资源。随着取得城市和农业人口，统治逐渐需要税收、官职和更稳定的组织，边地集团由此发展为王朝国家。',
            '1299年常被作为象征性起点，但早期材料有限，国家并非在某一天按后来形式建立。奥斯曼帝国的广阔范围和制度，要在其后数代扩张中才逐步形成。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '大都会艺术博物馆 · The Ottoman Empire',
        url: 'https://www.metmuseum.org/learn/educators/curriculum-resources/art-of-the-islamic-world/unit-five/chapter-two/the-ottoman-empire',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-vijayanagara-hampi': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '14世纪，毗奢耶那伽罗在南印度兴起，以亨比地区为主要都城中心。河流、岩丘与农业腹地提供了防御、用水和物资基础，王权在这里组织宫廷、军队与宗教赞助。',
            '城市拥有神庙、市场街道、宫廷设施和水利工程，不同群体在交易、礼拜和服务中相遇。王国参与南印度与印度洋的政治经济网络，文化发展也承接更早的地方传统。',
            '都城在16世纪战争后遭到严重破坏，许多遗迹却仍留在景观中。它们记录的是长期营建的帝国中心，而非1301年一次建立的完整城市。',
          ],
        },
      ],
      note: '通常将王朝兴起联系到14世纪前半叶；本条年份为世纪范围的阅读标记。',
    },
    sources: [
      {
        title: 'UNESCO · 亨比古迹群',
        url: 'https://whc.unesco.org/en/list/241/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'category-dante': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1321年但丁去世前，《神曲》的写作走向完成。作品以地狱、炼狱和天堂的旅程，讨论罪、责任、爱与人的归宿，也让流亡诗人面对自己所处时代的政治与道德冲突。',
            '但丁使用意大利俗语写作，把古典人物、基督教神学和当代人物纳入同一想象世界。读者随引导者前行，既阅读宇宙秩序，也不断看到个人选择与公共权力的后果。',
            '作品通过抄本、注释和后来印刷广泛流传，成为意大利文学与语言的重要参照。三部分写于不同阶段，1321年应理解为作者晚年完成的节点，不是有现代出版记录的统一发售日。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '牛津大学博德利图书馆 · Illustrating Dante’s Divine Comedy',
        url: 'https://blogs.bodleian.ox.ac.uk/oxfordtrainees/wp-content/uploads/sites/133/2021/09/Exhibition-Handlist-Illustrating-Dantes-Divine-Comedy-October-2020.pdf',
        note: '展览手册开篇记作品在1321年9月去世前不久完成。',
      },
    ],
  },
  'world-mansa-musa': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1324年前后，马里统治者曼萨·穆萨前往麦加朝觐，庞大随行队伍和黄金支出使西非王国在更广伊斯兰世界获得声望。经过开罗等城市，朝觐也成为外交和公共展示。',
            '黄金财富建立在王国对生产、贸易与贡赋的经营之上，远行又需要粮食、牲畜、护卫和道路安排。相关记述突出了挥金与富庶，但随行人数和黄金总量不宜按传说精确复原。',
            '回国后对城市、清真寺和学术活动的赞助，进一步联系了马里与北非、西亚。朝觐的重要性在于扩大既有网络，而非西非从此才第一次参与远距离世界。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 1 · 15-2-medieval-sub-saharan-africa',
        url: 'https://openstax.org/books/world-history-volume-1/pages/15-2-medieval-sub-saharan-africa',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-tenochtitlan': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '传统将1325年视为墨西加人在特斯科科湖中建立特诺奇蒂特兰的年份。湖泊环境既限制土地，也提供水路、渔业和农业经营的条件，城市逐渐在堤道与渠道间成长。',
            '墨西加人最初需要在周边更强政治力量之间寻找位置，后来的联盟和战争才使都城取得更大资源。贡赋、市场和工艺不断集中，支撑城市建筑与人口扩大。',
            '建城传说中的征兆表达了共同体的身份与合法性，城市实际发展则经历长期营建。前后不同时段的规模，不能全部压到1325年的起点。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 1 · 8-3-the-age-of-empires-in-the-americas',
        url: 'https://openstax.org/books/world-history-volume-1/pages/8-3-the-age-of-empires-in-the-americas',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-hundred-years-war': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1337年起，英格兰与法兰西王权围绕王位继承、封地与政治利益进入长期战争，后来合称百年战争。它并非持续不断的一场会战，而是多轮进攻、休战与地区冲突。',
            '英军在克雷西、阿金库尔等战役取得胜利，法方随后又在财政、军队和地方支持的重组中恢复优势。城市、农田和居民承受劫掠、征税与军队活动的代价，战争也不断改变贵族及地方政治。',
            '到1453年前后，法方收复英军大部分大陆领地。长期竞争推动两国王权和认同变化，却不是现代民族国家在战争开始时就已经完整对立。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '英国皇家军械博物馆 · The Hundred Years’ War',
        url: 'https://royalarmouries.org/objects-and-stories/stories/the-hundred-years-war-1337-1453',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-black-death': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '14世纪中叶，鼠疫沿欧亚交通网络传播，并在1347年前后进入地中海港口，随后席卷欧洲许多地区。人员、船只与物资的流动，也让疾病跨越原有政治边界。',
            '高死亡率打击家庭、市场和劳动力供应，地方社会尝试隔离、照护与宗教应对。恐惧还引发对犹太人等群体的迫害，把无法理解的灾难转化为针对无辜者的暴力。',
            '人口减少改变了部分地区的土地、工资和劳动关系，各地结果却不一致。黑死病之后鼠疫仍多次复发，1347年只是这一长期疫情史中的欧洲传播节点。',
          ],
        },
      ],
      note: '不使用覆盖所有地区的单一死亡比例，传播起源、路线和时间需保留研究上的复杂性。',
    },
    sources: [
      {
        title: 'OpenStax · World History 1 · 16-3-the-black-death-from-east-to-west',
        url: 'https://openstax.org/books/world-history-volume-1/pages/16-3-the-black-death-from-east-to-west',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-ayutthaya-foundation': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '14世纪中叶，阿瑜陀耶在湄南河流域兴起，逐渐成为连接内陆农业与海上贸易的重要都城。河道提供交通，也让统治者能够经营港口、市场和粮食腹地。',
            '王权吸收不同地区的宫廷、法律和宗教传统，与周边政权通过战争、婚姻和朝贡交往。外国商人与使者后来在城市中活动，使都城形成多元人口和交易空间。',
            '阿瑜陀耶的地位经过数代扩张才形成，通常采用的建国纪年并不等于城市和制度一次完成。它的兴盛也需要放回东南亚多个竞争中心的网络中理解。',
          ],
        },
      ],
      note: '1350或1351年为常见建国纪年。',
    },
    sources: [
      {
        title: 'UNESCO · 阿瑜陀耶古城',
        url: 'https://whc.unesco.org/en/list/576/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-timurid-rise': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1370年，帖木儿在中亚巩固统治，并以撒马尔罕为中心建立自己的权力。军事联盟、贵族竞争和察合台政治遗产，为他的兴起提供了条件，也限制了他需要采用的合法性形式。',
            '此后远征带来土地、财富与被迁徙的工匠，撒马尔罕因宫廷赞助而不断营建。建筑和艺术的繁荣，与战争造成的毁坏、屠杀和人口移动属于同一扩张过程。',
            '帖木儿死后，继承者继续争夺和经营不同地区。帖木儿时代的文化影响因而可以长期延续，帝国的政治统一却并未同样稳定。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Oxford Research Encyclopedia · Tamerlane and the Timurids（作者摘要）',
        url: 'https://academic.oup.com/edited-volume/61799/chapter-abstract/546289926',
        note: '依据作者公开摘要核实基础事实；不声称已读取付费全文。',
      },
      {
        title: 'UNESCO · 撒马尔罕：文化的十字路口',
        url: 'https://whc.unesco.org/en/list/603/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-joseon-foundation': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1392年，李成桂取代高丽王朝，建立后来称为朝鲜的新王朝。军事势力、士大夫改革主张与高丽末年的内外危机，共同推动了这次更替。',
            '新朝逐渐重新安排土地、官僚与王室秩序，并以儒学作为重要治理语言。佛教机构的地位也随政策调整，宗教生活和地方社会却不会在改朝换代后立即消失。',
            '随后迁都汉阳、整理制度和处理王室继承，使新的政治中心逐步稳定。1392年标记王朝建立，不能把朝鲜前期数代形成的制度全部归给这一年。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · Exchange in East Asia',
        url: 'https://openstax.org/books/world-history-volume-2/pages/2-3-exchange-in-east-asia',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-malacca': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '约1400年前后，马六甲在连接印度洋与南海的海峡沿岸成长为港口政权。商船可在这里停泊、补给和转运，不同季风时段的航行也使等待与交易成为港口生活的一部分。',
            '统治者通过管理市场、安排商人关系和发展对外联系吸引航运。伊斯兰教的传播与商业网络相互促进，来自不同地区的人又各自保留语言和习惯，使城市形成多元社区。',
            '马六甲的兴起改变了地区贸易的集聚位置，却没有控制所有航线。它的力量取决于商人是否愿意来、邻近势力怎样反应，以及海峡两侧持续变化的政治关系。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · 2-2-the-malacca-sultanate',
        url: 'https://openstax.org/books/world-history-volume-2/pages/2-2-the-malacca-sultanate',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-renaissance': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '14—16世纪，佛罗伦萨等意大利城市的文学、艺术与学术活动出现显著发展，后来被称为文艺复兴。商贸财富、城市竞争和赞助者需求，为作家、艺术家与学者提供了不同机会。',
            '人文主义者重新研读古典语言和文献，艺术家则结合观察、几何与古代形式处理人体和空间。所谓复兴并非照抄古代，而是在当时的宗教、政治和日常需求中重新使用旧材料。',
          ],
        },
        {
          title: '作品背后的城市关系',
          paragraphs: [
            '教会、行会、家族和统治者委托作品，艺术家的名声与工坊劳动共同运作。财富和权力也使这种繁荣带有鲜明的不平等，许多人的生产与生活并没有进入最著名的作品。',
            '文艺复兴不是欧洲某年统一开始的运动，各地区节奏与形式不同。1400年适合标记一个发展阶段，而非文化突然从中世纪脱离的界线。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '大都会艺术博物馆 · Florence and Central Italy, 1400–1600',
        url: 'https://www.metmuseum.org/toah/ht/08/eustc',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-timbuktu-learning': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '约15—16世纪，通布图在撒哈拉商路和尼日尔河区域网络中发展为学术中心。商人、学者与求学者的往来，让宗教、法律和语言知识与城市经济相互支持。',
            '教学常依托清真寺、学者家庭与私人藏书，手稿通过抄写、购藏和继承流传。书页上的批注、所有者记录与内容本身，一起显示知识怎样进入日常交往。',
            '这些收藏不仅关乎远方输入的经典，也包含当地作者处理法律、社会和政治问题的成果。通布图的历史因而展现西非社会主动生产和保存知识的能力，其繁荣又随战争与商路变化不断调整。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '开普敦大学手稿研究项目 · Timbuktu’s History',
        url: 'https://tombouctoumanuscripts.uct.ac.za/overview/timbuktus-history',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-machu-picchu': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '15世纪，印加人在安第斯山地营建马丘比丘。建筑依托陡峭山脊展开，以石构、梯田、道路与排水设施协调居住和环境，通常被解释为与王室活动有关的地点。',
            '石墙和地形之间的细致结合，不只是视觉效果，也回应降雨、坡面和有限空间的要求。工程需要工匠、劳力与物资供应，显示帝国能够把远方资源组织到高山地点。',
            '遗址并非从未被当地人知晓的空白地点，20世纪进入国际视野也不能称为其历史的起点。具体用途、居住人口与停用过程仍有研究空间。',
          ],
        },
      ],
      note: '1401年代表15世纪区间起点，主要营建一般与该世纪中叶印加发展联系，不作精确开工年。',
    },
    sources: [
      {
        title: 'UNESCO · Historic Sanctuary of Machu Picchu',
        url: 'https://whc.unesco.org/en/list/274',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-ulugh-beg-observatory': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '15世纪20年代，帖木儿王朝统治者兀鲁伯在撒马尔罕组织天文观测，并营建大型天文台。宫廷赞助使学者能够结合精密仪器、长期记录与数学计算开展工作。',
            '巨大的固定测量装置帮助观测天体位置，星表和历算则需要对不同记录作比较、修正。这里的成就依赖多位学者和技术人员，而不是统治者个人独自完成的观察。',
            '天文台后来衰落，相关表册却通过手稿与学术网络继续传播。建筑的命运与知识的延续并不相同，撒马尔罕也由此成为跨地区天文学传统的重要节点。',
          ],
        },
      ],
      note: '1420年为营建和学术活动阶段的约略定位。',
    },
    sources: [
      {
        title: 'ICOMOS–IAU · Astronomical Heritage：Ulugh Beg’s Observatory',
        url: 'https://whc.unesco.org/document/104639',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-aztec': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1428年，特诺奇蒂特兰、特斯科科与特拉科潘结成三方同盟，在击败旧霸权后重新安排墨西哥谷地的力量关系。所谓阿兹特克帝国，主要由这一联盟持续扩张而形成。',
            '战争把更多城邦纳入贡赋关系，粮食、纺织品与其他物资流向中心，地方统治者却常继续管理自己的居民。联盟各方地位并不始终平等，特诺奇蒂特兰的优势逐渐扩大。',
            '这种统治方式能迅速取得资源，也留下被征服者的不满和竞争。16世纪西班牙到来后，许多原住民势力按自己的目标选择联盟，正与此前形成的地区政治有关。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 1 · 8-3-the-age-of-empires-in-the-americas',
        url: 'https://openstax.org/books/world-history-volume-1/pages/8-3-the-age-of-empires-in-the-americas',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'category-florence-dome': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1436年，佛罗伦萨主教座堂举行祝圣，布鲁内莱斯基主持的巨大穹顶成为城市最醒目的建筑。此前教堂已长期营建，如何跨越宽阔空间而不依赖通常规模的支架，是工程的核心难题。',
            '穹顶通过双层结构、砖石排列和施工组织逐步升起，起重与运输设备同样是成功的条件。设计者、工匠与管理工程的机构共同把几何设想落实成可建造的结构。',
            '穹顶展示了城市财富、宗教委托与技术创新的结合，顶部灯亭等部分又在此后继续完成。1436年因此是重要工程节点，而非整座建筑所有构件同时竣工。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '佛罗伦萨主教座堂工程处 · Dome',
        url: 'https://duomo.firenze.it/en/40/dome',
        note: '官方介绍记1420—1436年、双壳与肋架；不把后来采光亭并入主穹顶完成年。',
      },
    ],
  },
  'world-inca': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '15世纪中叶，帕查库蒂时期的印加王权以库斯科为中心显著扩张。后世传统把他与重要军事胜利和国家重组相联系，但早期事件主要经较晚记载保存，具体细节需保留分寸。',
            '帝国利用道路、仓储和劳役组织，把不同海拔的生产区域与人口连接起来。地方首领可能被纳入统治，也有群体遭迁徙，扩大王权的过程兼有协商和强制。',
            '此后统治者继续推进，形成纵贯安第斯的庞大网络。1438年前后只是扩张的重要起点，帝国最大范围与全部行政办法并非同时出现。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 1 · 8-3-the-age-of-empires-in-the-americas',
        url: 'https://openstax.org/books/world-history-volume-1/pages/8-3-the-age-of-empires-in-the-americas',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-benin-ewuare': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '15世纪，埃乌阿雷时期的贝宁王权扩大影响，并推动都城与宫廷制度发展。王室、贵族、行会和地方社会之间的关系，支撑了资源与劳力的集中。',
            '宫廷艺术通过黄铜、象牙和木雕表达祖先、官职与统治者地位，工匠组织也参与保存政治记忆。城市工程与仪式活动使王权进入具体空间和日常关系。',
            '有关埃乌阿雷的历史同时依靠口传与较晚记录，不能把每项制度都视为某一年独自创造。贝宁后来与大西洋贸易联系更深，又经历不同阶段的政治变化。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '芝加哥艺术博物馆 · Oba Ewuare and the Portuguese',
        url: 'https://archive.artic.edu/benin/oba/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: '剑桥大学考古与人类学博物馆 · Kingdom of Benin',
        url: 'https://maa.cam.ac.uk/schools/resources/african-collections-schools-resources/kingdom-benin',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-hunminjeongeum': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1446年，朝鲜王朝公布《训民正音》，介绍世宗主持创制的新文字及其用法。面对汉字学习门槛和朝鲜语表达需要，新文字试图让记录本国语言有更便利的办法。',
            '字母设计与发音结构紧密联系，说明文字可以被有意识地分析和组织。公布解释本不仅给出字形，也阐明组合与读音，使教学有可参照的依据。',
            '新文字的使用并未立即取代汉文，官僚、学者与不同读者的态度也不一致。它通过翻译、文学和日常记录逐步扩大作用，后来的韩文发展属于这一长期实践。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'UNESCO 世界记忆 · Hunminjeongum Manuscript',
        url: 'https://www.unesco.org/en/memory-world/hunminjeongum-manuscript?hub=1081',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-ottoman-constantinople': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1453年，穆罕默德二世率奥斯曼军围攻君士坦丁堡。东罗马帝国此时领地和资源已大为缩减，首都仍凭城墙、海峡位置与守军维持防御。',
            '围城结合火炮、陆军和舰队行动，守方则修补城防并等待有限援助。城池最终失守，皇帝君士坦丁十一世在战斗中死亡，掠夺与俘虏使居民遭受严重苦难。',
          ],
        },
        {
          title: '把征服的城市变成新的首都',
          paragraphs: [
            '奥斯曼随后修复、安置人口并重新安排宗教和行政机构，使城市成为帝国中心。圣索菲亚等建筑转换用途，原有居民和传统也以不同方式延续。',
            '征服结束了以君士坦丁堡为都的东罗马皇权，但并没有使当地社会全部消失。新旧制度的接合与改造，塑造了后来伊斯坦布尔的历史。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 1 · 17-1-the-ottomans-and-the-mongols',
        url: 'https://openstax.org/books/world-history-volume-1/pages/17-1-the-ottomans-and-the-mongols',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-dias': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1488年，葡萄牙航海者巴尔托洛梅乌·迪亚士绕过非洲南端，证明大西洋航路能够继续通向印度洋。他的船队随后沿非洲东南海岸航行，最终返航。',
            '航行依赖海图、风向、补给与船员经验，也属于葡萄牙沿非洲海岸持续探索和扩张的一部分。当地居民并非航线上的空白背景，接触时既有交换，也可能发生冲突。',
            '绕过南端为后来驶向印度的船队提供重要经验，迪亚士本人却没有在此次到达印度。地理认识的扩大、商业目标和王室竞争，在这条新航路上始终交织。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · 5-2-crossing-the-atlantic',
        url: 'https://openstax.org/books/world-history-volume-2/pages/5-2-crossing-the-atlantic',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-kongo-baptism': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1491年，刚果国王恩津加·恩库武受洗，采用若昂一世的基督教名。此前葡萄牙航海者已与刚果王国建立联系，受洗使宗教、外交和技术往来获得新的形式。',
            '刚果统治者并非只被动接受外来信仰，而是把基督教符号、教育与王权安排结合。后继君主继续与葡萄牙交涉，试图利用联系加强统治，同时也面对奴隶贸易和外部势力带来的压力。',
            '基督教在刚果逐渐形成当地解释与艺术表达，宫廷受洗不意味着所有居民立即转变信仰。国家选择、社会实践与大西洋暴力，需要在这段交往中同时观察。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '大都会艺术博物馆 · Christianity and Kongo Visual Culture',
        url: 'https://www.metmuseum.org/it/essays/christianity-kongo-visual-culture',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-granada': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1492年，纳斯尔王朝交出格拉纳达，卡斯蒂利亚和阿拉贡君主取得对这一地区的控制。持续多年的战争、围困与内部矛盾，使伊比利亚最后一个穆斯林王国失去继续抵抗的条件。',
            '投降安排起初包含对居民财产和宗教生活的保障，后来的政策却转向更强的改宗与控制。王朝结束与居民处境的变化，因此不能只用一次和平交城概括。',
            '格拉纳达的宫殿、农业和城市社会没有随王朝消失，但权力、信仰与人口关系逐步改变。1492年也是西班牙王权扩大与宗教排斥加深的复杂节点。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '阿尔罕布拉宫管理委员会 · History',
        url: 'https://www.alhambra-patronato.es/en/discover/alhambra-y-generalife/history',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
      {
        title: 'OpenStax · World History 2 · The Protestant Reformation',
        url: 'https://openstax.org/books/world-history-volume-2/pages/5-1-the-protestant-reformation',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-tordesillas': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1494年，西班牙与葡萄牙签订《托尔德西里亚斯条约》，以大西洋中的分界线安排彼此对海外扩张的主张。双方希望减少航路和领地竞争，条约也与教皇此前的划分有关。',
            '分界并没有来自当地社会的同意，也无法凭纸上经线直接控制遥远地区。航海测量、地理知识和实际占领的差距，又使条文在后续扩张中不断引发争论。',
            '条约影响了两国在美洲等地的殖民主张，却不是世界各国共同认可的分配。原住民与其他欧洲势力始终以自己的行动挑战这套安排。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · 5.2 Crossing the Atlantic',
        url: 'https://openstax.org/books/world-history-volume-2/pages/5-2-crossing-the-atlantic',
        note: 'The Treaty of Tordesillas小节；明确1494年签约、1506年教皇认可及巴西关联。',
      },
    ],
  },
  'depth-leonardo-supper': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '15世纪90年代，达·芬奇在米兰圣玛利亚感恩教堂修院的餐厅墙上绘制《最后的晚餐》。基督宣布有人将出卖他，门徒不同的反应被组织在同一空间与瞬间。',
            '透视、人物分组和手势把观者目光引向中心，修士日常用餐的地点也因此与宗教故事发生联系。作品采用的墙面绘画办法带来表现机会，也使材料保存面临困难。',
            '绘画后来经历损坏、修复和大量复制，今天的观看已隔着多层保存历史。1494年前后对应委托与早期工作阶段，主要绘制延续至其后数年。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Museo del Cenacolo Vinciano · The Last Supper',
        url: 'https://cenacolovinciano.org/en/museum/the-works/the-last-supper-leonardo-da-vinci-1452-1519/',
        note: '作品说明记1494年至1498年初；本条不复制图像。',
      },
    ],
  },
  'world-dagama': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1498年，达·伽马船队绕过非洲抵达印度卡利卡特，葡萄牙建立通向印度洋的海路取得关键进展。到达依靠此前沿非洲海岸积累的知识，也依靠印度洋已有航海者与向导。',
            '卡利卡特本来就是繁忙港口，阿拉伯、南亚和其他商人经营成熟网络。葡萄牙人希望进入香料贸易，却必须面对当地统治者、商品需求和既有商人关系，而不是找到一个等待被开启的市场。',
            '此后葡萄牙以舰队、堡垒和强制手段扩大影响，海路的意义因而不止于航海成就，也包含商业竞争与殖民暴力。1498年的初次到达尚未完成这套统治。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · 5-2-crossing-the-atlantic',
        url: 'https://openstax.org/books/world-history-volume-2/pages/5-2-crossing-the-atlantic',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-atlantic-slavery': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '16世纪以后，跨大西洋奴隶贸易随欧洲在美洲的殖民和种植园扩张不断增加。被掳掠或出售的非洲人被迫离开家乡，经海运送往美洲，成为强制劳动体系的核心。',
            '贸易依靠欧洲商船、殖民法律、非洲沿海与内陆的战争及交易网络共同运作。参与者利益并不相同，受害者则经历家庭分离、囚禁、疾病和航程中的高死亡风险。',
          ],
        },
        {
          title: '被迫迁移的人也继续行动',
          paragraphs: [
            '在美洲，奴役劳动生产的糖、烟草等进入国际市场，财富流向许多港口与投资者。被奴役者通过逃亡、起义、亲属网络和文化实践抵抗，也重新塑造当地社会。',
            '1500年只是长期扩张的阶段定位。理解这一贸易，需要追踪制度如何把人变成可买卖财产，而不把受害者仅写成经济统计中的劳动力。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · 5-4-the-atlantic-slave-trade',
        url: 'https://openstax.org/books/world-history-volume-2/pages/5-4-the-atlantic-slave-trade',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-songhai': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '15世纪末至16世纪，桑海以加奥为中心扩展，控制尼日尔河沿岸城市和跨撒哈拉贸易节点。阿斯基亚穆罕默德等统治者组织军队、官员和税收，经营一个跨越不同生态区域的帝国。',
            '通布图、杰内等城市的市场和学术生活，联系农业人口、商人和宗教学者。王权赞助伊斯兰机构，也需要与地方传统及精英关系协调。',
            '桑海的力量依赖河运、陆路和持续动员，后来内争与摩洛哥进攻改变了局势。1500年前后呈现的是鼎盛阶段，不能作为全部帝国制度的统一创始年。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · 3-2-the-songhai-empire',
        url: 'https://openstax.org/books/world-history-volume-2/pages/3-2-the-songhai-empire',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-safavid': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1501年，伊斯玛仪在大不里士称王，萨法维王朝开始建立对伊朗大片地区的统治。他依靠宗教追随者和军事力量，把一个运动转为王朝政权。',
            '十二伊玛目什叶派被确立为国家信仰的重要基础，教士、礼仪和教育的组织随之变化。这种转变需要长期推行，不同地区人口的信仰并未在称王之年全部一致。',
            '萨法维此后与奥斯曼、乌兹别克等势力竞争，也发展城市、工艺和贸易。王朝建立的宗教政治边界，对伊朗后来的历史产生深远影响。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · 4-3-the-safavid-empire',
        url: 'https://openstax.org/books/world-history-volume-2/pages/4-3-the-safavid-empire',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'depth-sistine-ceiling': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1508—1512年，米开朗琪罗应教皇尤利乌斯二世委托绘制西斯廷礼拜堂天顶画。原本以雕塑著称的艺术家，必须把庞大建筑表面转为能够从地面阅读的图像体系。',
            '《创世记》场景、先知和相关人物被组织在绘画建筑框架中，人体姿态与透视回应仰望的角度。脚手架、颜料与湿壁画工序，又使创作成为复杂的现场工程。',
            '作品属于教皇礼仪空间中的宗教叙事，也体现委托者权威与艺术家表达之间的关系。后来祭坛墙《最后的审判》是另一时期的工程，不应与天顶画同时叙述为1508年完成。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Vatican Museums · Sistine Chapel: Ceiling',
        url: 'https://www.museivaticani.va/content/museivaticani/en/collezioni/musei/cappella-sistina/volta.html',
        note: '1508年合同、天顶方案与1512年完成说明。',
      },
    ],
  },
  'world-malacca-conquest': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1511年，阿尔布克尔克率葡萄牙军攻占马六甲，试图控制连接印度洋与南海的重要港口。城内贸易网络复杂，葡萄牙的目标是把海军优势转为关税、据点和商业支配。',
            '军事占领没有让所有商人继续留城，一部分贸易转向其他港口，原统治者及其后继力量也继续抵抗。葡萄牙需要维护堡垒、补给和地方关系，城市的商业地位因战争重新分布。',
            '马六甲由此成为葡萄牙亚洲据点之一，海峡却始终无法被一座堡垒完全封锁。地区政权和商人的选择，持续限制和改变殖民控制。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · 2-2-the-malacca-sultanate',
        url: 'https://openstax.org/books/world-history-volume-2/pages/2-2-the-malacca-sultanate',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-chaldiran': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1514年，奥斯曼苏丹塞利姆一世在查尔迪兰击败萨法维王伊斯玛仪。两国争夺安纳托利亚及其周边影响，也把宗教与政治忠诚带入边境竞争。',
            '奥斯曼的火炮、火器步兵和部署发挥作用，萨法维骑兵受到重创。但胜利还取决于组织、行军和指挥，不能把战果仅归为某种武器自动战胜另一种武器。',
            '伊斯玛仪失去此前不败的威望，奥斯曼却没有由此彻底消灭萨法维。双方继续争夺边地，后来才逐渐形成更稳定的疆界与政治分野。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · The Safavid Empire',
        url: 'https://openstax.org/books/world-history-volume-2/pages/4-3-the-safavid-empire',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
      {
        title: '大都会艺术博物馆 · Pen Box Depicting Shah Isma’il in Battle',
        url: 'https://www.metmuseum.org/art/collection/search/455304',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'modern-more-utopia': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1516年，托马斯·莫尔出版《乌托邦》，让旅行者叙述一座虚构岛屿的制度和生活。财产、劳动、惩罚与宗教被放进设想社会，与欧洲现实形成对照。',
            '作品采用对话和多重叙述声音，读者难以把每项制度都直接认作作者赞成的政策。虚构既提供批评贫困、战争与贪欲的距离，也留下对秩序代价和个人自由的疑问。',
            '“乌托邦”后来成为设想理想社会的通用词。回到原书，则能看到它同时包含严肃制度思考、讽刺和不确定性，而非一张等待立即照建的社会蓝图。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Thomas More',
        url: 'https://plato.stanford.edu/entries/thomas-more/',
        note: 'SEP Thomas More关于Utopia的专节及1516年初版书目，区别1518年附入诗集的后续版本。',
      },
    ],
  },
  'world-reformation': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1517年，马丁·路德针对赎罪券及相关教义提出论题，争论很快超出学术范围。印刷、讲道和地方政治帮助文本传播，教会权威、信仰与金钱的关系成为公共问题。',
            '路德后来拒绝撤回核心主张，与罗马教会决裂，不同城市和诸侯又按各自利益支持或反对改革。宗教改革因此不是一位作者单独完成的运动，而是信徒、政治力量和传播方式共同推动的变化。',
          ],
        },
        {
          title: '改革产生了多条道路',
          paragraphs: [
            '新教内部逐渐形成不同传统，天主教也推进自己的整顿与教义重申。战争、迁徙和强制改宗伴随这一过程，宗教选择往往同时受地方政权约束。',
            '1517年是常用起点，不能把后来欧洲全部宗派和政治格局提前放到九十五条论题出现的时刻。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · 5-1-the-protestant-reformation',
        url: 'https://openstax.org/books/world-history-volume-2/pages/5-1-the-protestant-reformation',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-conquest-mexico': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1519年，科尔特斯进入墨西哥，开始与特诺奇蒂特兰及周边势力交涉和作战。当地并非政治统一的空间，特拉斯卡拉等原住民政权有自己的敌友和目标，成为决定战局的参与者。',
            '西班牙人曾进入都城，随后在冲突中被迫撤退；疫病、围困和联盟重新动员，又削弱墨西加抵抗。1521年，西班牙与原住民盟军攻陷特诺奇蒂特兰，城中居民经历严重死亡、饥饿和破坏。',
            '征服不只是少数欧洲人凭武器击败庞大帝国。原住民联盟、地区矛盾、疾病和海陆封锁共同作用，战后殖民统治仍要经过长期战争、谈判与强制安排。',
          ],
        },
      ],
      note: '1519年为行动起点，不能与1521年都城陷落混同。',
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · 6-1-european-colonization-in-the-americas',
        url: 'https://openstax.org/books/world-history-volume-2/pages/6-1-european-colonization-in-the-americas',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-circumnavigation': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1519年，麦哲伦率西班牙资助的船队西航，希望从另一方向到达香料群岛。船队穿过南美洲海峡进入太平洋，漫长航程使补给、疾病和船员关系成为生存难题。',
            '麦哲伦在菲律宾冲突中死亡，剩余人员继续航行。埃尔卡诺最终率“维多利亚号”绕过非洲，于1522年返回西班牙，完成首次有记录的环球航行。',
            '航程把不同海域的距离和联系变得更具体，也以大量生命和强制接触为代价。它不是麦哲伦个人走完的一圈，更不是沿途社会此前没有自身航海知识的证明。',
          ],
        },
      ],
      note: '1519—1522年分别对应出发与返回，完成航行的人数及船只应按幸存记录理解。',
    },
    sources: [
      {
        title: '西班牙文化部 · Primera vuelta al mundo de Magallanes y Elcano',
        url: 'https://www.cultura.gob.es/cultura/archivos/difusion/registro-memoria-unesco/2023/vuelta-mundo-magallanes-elcano.html',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
      {
        title: '美国国会图书馆 · The First Map of the Strait of Magellan, 1520',
        url: 'https://www.loc.gov/item/2021668426/',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-mughal': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1526年，巴布尔在第一次帕尼帕特战役击败德里苏丹易卜拉欣·洛迪，为莫卧儿王朝在北印度建立统治奠定基础。他此前已在中亚和阿富汗经历长期竞争，入印度并非一次孤立冒险。',
            '火器和部署帮助军队取胜，巴布尔随后还需要面对其他地区势力，争取土地收入与地方支持。战胜一位苏丹并不等于立即控制整个南亚。',
            '莫卧儿国家在后继君主时期反复受挫、恢复与扩张，形成多元官僚、军队和宫廷文化。1526年标记新王朝的重要军事起点，成熟制度则属于此后的发展。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · 2-1-india-and-international-connections',
        url: 'https://openstax.org/books/world-history-volume-2/pages/2-1-india-and-international-connections',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-conquest-inca': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1532年，皮萨罗在卡哈马卡会面中突袭并俘虏印加统治者阿塔瓦尔帕。帝国内战刚结束，疫病和继承斗争已使政治关系紧张，西班牙人进入的是一个正处危机的社会。',
            '俘获统治者让小规模外来军队获得巨大谈判优势，赎金未能换来阿塔瓦尔帕的自由，他随后被处死。西班牙人与地方盟友继续向库斯科推进，争夺资源和权威。',
            '印加抵抗没有在一次会面后消失，后续政权和地方武装继续作战数十年。殖民征服既依靠军事强制，也利用原有冲突，给居民带来奴役、迁移和社会重组。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · 6-1-european-colonization-in-the-americas',
        url: 'https://openstax.org/books/world-history-volume-2/pages/6-1-european-colonization-in-the-americas',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-copernicus': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1543年，哥白尼《天体运行论》出版，把地球运动与太阳居于行星体系中心附近的安排系统提出。地球不再是全部天体绕转的固定参照，许多熟悉现象由新的几何关系解释。',
            '理论仍使用圆周等传统工具，首先是一套天文计算与宇宙结构方案。它引出关于物理、观察和经典权威的难题，不能仅凭出版便让所有人立即接受。',
            '第谷、开普勒、伽利略和牛顿等后续工作，才进一步改变证据、轨道与运动解释。哥白尼的书是这一长期变革的重要起点，并非现代天文学在1543年已经全部完成。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '格拉斯哥大学特藏 · Copernicus: De Revolutionibus',
        url: 'https://www.gla.ac.uk/myglasgow/archivespecialcollections/digitisedcollections/revolutionsinastronomy/copernicusderevolutionibus/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'depth-vesalius-fabrica': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1543年，维萨里出版《人体的构造》，以详细文字和图像组织人体解剖知识。作者重视亲自观察人体，并以此检验长期沿用的盖伦传统中哪些说明不适合人类身体。',
            '书中图版把姿态、层次和结构结合，使读者能够跟随解剖逐步理解身体。绘图、刻版和印刷因此不只是装饰，而是知识传授与论证的一部分。',
            '作品没有立即消除旧医学，也仍保留时代认识的限制。它推动的变化在于，让经典权威面对可观察的身体，并把解剖、教学和出版更紧密地连接起来。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'U.S. National Library of Medicine · Vesalius: Author and Title',
        url: 'https://www.nlm.nih.gov/exhibition/historicalanatomies/vesalius_bio.html',
        note: '1543年巴塞尔出版及解剖学背景；另见馆藏书目信息。',
      },
    ],
  },
  'category-trent': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1545年，特伦托会议开始，天主教会在宗教改革冲击下讨论教义与整顿。会议分期召开至1563年，战争、政治关系和教皇权威都影响了进程。',
            '会议重申经典、圣礼和救赎等立场，也要求改进主教职责、神职教育与教会纪律。神学院等安排试图让教导和地方牧灵更稳定，教义界定与制度改革因而同时推进。',
            '决议随后仍需在不同国家和教区落实，并未一次化解所有问题。特伦托成为近代天主教的重要框架，也使与新教传统的边界更加明确。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '圣安德鲁斯大学 · Council of Trent',
        url: 'https://www.saet.ac.uk/Christianity/CouncilofTrent',
        note: '见会议三阶段与教义、纪律改革各节。',
      },
    ],
  },
  'depth-augsburg-peace': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1555年，《奥格斯堡宗教和约》试图在神圣罗马帝国内安排天主教与路德宗之间的共处。诸侯的宗教选择被赋予关键地位，臣民在特定条件下可以迁出。',
            '这是一套结束部分冲突的政治法律办法，而不是现代意义上人人平等选择信仰的自由。加尔文宗等并未获得同样承认，教会领地及改宗问题又留下争议。',
            '和约使若干地区暂时稳定，却把信仰归属与领土统治紧密联系。后来三十年战争显示，这些未解决的制度和政治矛盾仍可能再次转为武力冲突。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'German History in Documents and Images · Religious Peace of Augsburg',
        url: 'https://germanhistorydocs.org/en/from-the-reformations-to-the-thirty-years-war-1500-1648/the-religious-peace-of-augsburg-september-25-1555',
        note: '1555年9月25日和约原典节译及导言。',
      },
    ],
  },
  'east-yi-hwang-ten-diagrams': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1568年，李滉向朝鲜国王进呈《圣学十图》，以图解、经典摘录和解释组织儒学修养。他希望把君主如何学习、克己和处理事务的问题，转成可以反复阅读的实践路径。',
            '图中连接宇宙秩序、人伦与心性，强调敬和持续用功，不把道德知识只当作记诵。王者修养因而与公共政治相关，个人行为会影响臣民与治理。',
            '作品承接宋代儒学，又在朝鲜的学术与宫廷环境中重新选择材料。它后来成为讲学和思想争论的重要参照，而非一份单靠进呈便能立即落实的改革法令。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Korean Confucianism',
        url: 'https://plato.stanford.edu/entries/korean-confucianism/',
        note: '§4 Sage Learning and the Four-Seven Debate：李滉1501—1570年，《圣学十图》作于1568年；与李珥及四端七情论辩的思想背景。',
      },
    ],
  },
  'world-dutch-abjuration': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1581年，尼德兰部分省份通过《弃绝法案》，宣布不再承认腓力二世的统治。长期反抗涉及宗教迫害、税收、地方权利和王权控制，法案为政治决裂提出理由。',
            '文本把统治者描述为应保护臣民的存在，若转为压迫，便可能失去效忠。这种论证服务于具体斗争，也反映欧洲对君臣关系的重新思考。',
            '弃绝没有立即带来统一、和平或现代民主。战争继续，北方共和国逐步形成，南部地区则走向不同政治道路；1581年是独立过程中的法律节点。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '荷兰国立博物馆 · The Republic',
        url: 'https://www.rijksmuseum.nl/en/collection/node/The-Republic--2447420802fc4934bd9db55c8c6cc003',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-spanish-armada': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1588年，西班牙派舰队进入英吉利海峡，计划配合尼德兰的陆军入侵英格兰。远征需要舰队、运输与陆军按时会合，协调本身就是巨大难题。',
            '英军持续袭扰，火船与交战打乱队形，西班牙舰队未能完成配合，只得绕苏格兰、爱尔兰返航，风暴、损坏和缺乏补给造成更多损失。',
            '失败保住了英格兰，也没有立刻结束西班牙的海上力量或双方战争。后来把事件讲成单纯以小舰击败大舰，容易略去计划、天气、港口和后勤的共同作用。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '英国议会 · Armada Tapestries: History',
        url: 'https://armada.parliament.uk/history.html',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'depth-edict-nantes': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1598年，法国国王亨利四世颁布《南特敕令》，试图结束长期宗教内战。敕令在天主教占主导的国家中，为胡格诺派安排一定礼拜、司法与安全保障。',
            '保障依地区和条件而不同，并不是所有人都获得同样的宗教自由。它通过复杂妥协减少公开战争，让王权有机会恢复行政和财政秩序。',
            '此后保障逐渐受限，1685年又被撤销，导致迫害与迁徙。1598年的和解因此是一项需要政治维护的安排，而非宗教冲突永久解决的终点。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Musée protestant · The Edict of Nantes (1598)',
        url: 'https://museeprotestant.org/en/notice/the-edict-of-nantes-1598/',
        note: '1598年敕令、民事平等与新教礼拜限制。',
      },
    ],
  },
  'category-globe': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1599年，环球剧场在伦敦泰晤士河南岸启用，莎士比亚所属剧团由此获得重要演出空间。剧团成员与出资者共同承担经营，剧场同时是艺术生产和商业活动的场所。',
            '露天院落、楼层看台与伸出舞台，让不同票价观众从多个方向接近表演。对白、动作、服装和观众反应共同制造舞台效果，并不依赖后来镜框式剧场的完整布景。',
            '原剧场1613年被火灾毁坏，随后重建，又在17世纪中叶关闭。今天复建的环球剧场与历史建筑有关联，却不是1599年原物完整保存至今。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Shakespeare’s Globe · Globe Theatre',
        url: 'https://www.shakespearesglobe.com/discover/about-us/globe-theatre/',
        note: '场馆历史与问答记1599年原剧场及可能的首批剧目。',
      },
    ],
  },
  'world-east-india-charter': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1600年，英国东印度公司获得王室贸易特许状，组织投资者共同经营东方贸易。高昂航程、船舶和货物成本，使集中资本、分担风险成为重要办法。',
            '公司起初需要与亚洲既有港口、政权和商人协商，取得货物和经营空间。特许状赋予的英国垄断权，并不意味着它能立即控制印度或排除其他国家。',
            '后来公司通过战争、征税和行政扩张取得大片领土，商业机构逐渐变成殖民统治者。1600年是公司组织的起点，后来的领土国家属于更长历史。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'British Library · East India Company Charters, IOR/A/1',
        url: 'https://searcharchives.bl.uk/catalog/036-000178601',
        note: '馆藏IOR/A/1的1600年特许状与Administrative Context；本条仅采用一致的年份，不据目录导言确定月日。',
      },
    ],
  },
  'depth-hamlet': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '约1600—1601年，莎士比亚创作《哈姆雷特》，把丹麦王子的复仇故事展开为对行动、证据、死亡和权力的追问。人物既要判断鬼魂与他人的话是否可信，也难以把判断立刻转为行动。',
            '宫廷监视、家庭关系和戏中戏使私人悲剧具有公共政治维度，演员又能通过语言与身体呈现犹疑、伪装和突发暴力。作品由此保留了远超复仇情节的张力。',
            '早期印本与对开本存在差异，演出也不断删改和解释。所谓创作年份是约略定位，今天读到的文本并非一个从未变化的唯一舞台版本。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Royal Shakespeare Company · Hamlet: Dates and sources',
        url: 'https://www.rsc.org.uk/hamlet/about-the-play/dates-and-sources',
        note: 'Dating the play小节，1601年推算、1602年登记及旧剧来源。',
      },
    ],
  },
  'world-voc-founded': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1602年，荷兰东印度公司成立，把若干竞争的贸易组织合并，以较大资本和特许权经营亚洲航线。公司能够安排舰队、设立据点，也获得在海外缔约和使用武力的权力。',
            '这种组织把投资、贸易与国家竞争结合，股份和持续经营帮助集中资金，收益却与垄断、战争和强制劳动相连。亚洲商人与政权并没有退出竞争，而是不断协商、抵抗或改换合作。',
            '公司后来发展出广泛殖民据点，不能只被看成现代股票公司的先驱。它同时是商业网络与武装统治机构，给不同地区带来极不相同的后果。',
          ],
        },
      ],
    },
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
  },
  'world-tokugawa': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1603年，德川家康获征夷大将军称号，在江户建立新的幕府中心。此前关原之战已改变主要大名的力量对比，称号进一步使德川优势获得制度表达。',
            '幕府通过领地安排、婚姻与军事关系约束大名，京都朝廷仍保有重要名义和礼仪地位。后来参勤交代等制度逐步完善，政治秩序不是在1603年一次定型。',
            '德川统治带来较长时期的内部稳定，也以身份、地方控制和对外关系限制维持秩序。城市、市场与文化发展在这一框架下持续变化，不能把整个江户时代理解为完全静止的社会。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · 2-3-exchange-in-east-asia',
        url: 'https://openstax.org/books/world-history-volume-2/pages/2-3-exchange-in-east-asia',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'category-adi-granth': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1604年，锡克教第五代古鲁阿尔琼组织编成《阿迪·格兰特》，汇集前代古鲁及其他宗教诗人的赞歌。编纂把散布的教导整理成共同诵读和礼拜的核心文本。',
            '诗歌以不同语言和表达传统讨论神、劳动、平等与人的生活，选择和排序也确立教团对传承的理解。经典因此不仅保存文字，还帮助共同体辨认哪些声音具有权威。',
            '后来第十代古鲁时期又有增补和地位变化，形成今天《古鲁·格兰特·萨希卜》的传承。1604年应定位于早期经典编纂，不与此后的全部历史合并。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Sikh Missionary Society · Guru Granth Sahib',
        url: 'https://www.sikhmissionarysociety.org/sms/smsarticles/advisorypanel/gurmukhsinghsewauk/gurugranthsahib/',
        note: '开篇说明第五代古鲁于1604年整理Aad Granth，并区分后续版本。',
      },
    ],
  },
  'category-quixote': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1605年，塞万提斯出版《堂吉诃德》第一部，让一位沉迷骑士小说的人走入现实道路。堂吉诃德与桑丘的经历，把英雄想象、社会身份和日常需要不断碰在一起。',
            '作品既讽刺陈套故事，也让读者难以轻易否定主人公对正义和尊严的坚持。叙述者、传闻和书中之书又使“谁在讲述”成为作品本身的问题。',
            '第二部于1615年出版，并回应读者和伪续作造成的环境。两部书的关系显示，文学并非写成后便静止，而是在出版、名声与再创作中继续生长。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '西班牙国家图书馆 · El ingenioso hidalgo don Quixote de la Mancha',
        url: 'https://www.bne.es/es/colecciones/cervantes/ingenioso-hidalgo-don-quixote-mancha',
        note: '馆藏初版说明区分1604年底印成与1605年1月上市。',
      },
    ],
  },
  'depth-kepler-new-astronomy': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1609年，开普勒出版《新天文学》，利用第谷留下的火星观测，提出行星轨道为椭圆及面积规律。精密记录中无法被旧模型消除的差异，迫使他重新考虑运动形式。',
            '研究不只是寻找一条更好看的曲线，还尝试追问太阳与行星运动之间的物理联系。计算、观测误差与理论假设在反复修正中共同工作。',
            '第三条行星运动定律属于后来1619年的著作，牛顿的引力解释又更晚。《新天文学》因此是改变轨道观念的重要一步，不能把全部现代天体力学提前放入1609年。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'University of Oklahoma Libraries · The New Astronomy',
        url: 'https://galileo.ou.edu/exhibits/new-astronomy.html',
        note: 'Astronomia nova展品，1609年及开普勒的轨道解释。',
      },
    ],
  },
  'depth-amsterdam-wisselbank': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1609年，阿姆斯特丹市设立汇兑银行，回应市场上钱币种类、重量和成色混杂的问题。商人可以把钱币存入银行，以账面单位进行支付和结算。',
            '共同的结算基础减少了每次交易都检验钱币的成本，城市信用和规章也帮助商人信任账面余额。银行因此与繁忙港口、票据和国际贸易密切联系。',
            '它的业务和政策后来不断变化，与现代中央银行并不完全相同。理解其创新，首先应看它怎样处理当时具体的支付和货币质量问题。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stadsarchief Amsterdam · Omwisselen',
        url: 'https://www.amsterdam.nl/stadsarchief/stukken/handel/omwisselen/',
        note: 'Wisselbank段记1609年设立、货币鉴定与转账功能。',
      },
    ],
  },
  'category-galileo': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1610年，伽利略出版《星际信使》，报告借助望远镜观察到的月面起伏、密集星群和环绕木星运行的卫星。新仪器让天体不再只能按肉眼所见来讨论。',
            '观察结果挑战了天界完美不变、所有运动都围绕地球的若干传统认识，但并非每项发现都单独证明地球绕日。读者还需要判断仪器是否可靠、图像如何形成以及记录能否重复。',
            '伽利略通过出版、演示和与其他观察者交往扩大影响。新的天文学由此同时涉及技术、证据、赞助和权威，后来的宗教争论又在不同条件下展开。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '伽利略博物馆 · Sidereus Nuncius (1610)',
        url: 'https://www2.museogalileo.it/en/library-and-research-institute/projects/meet-galileo/38-works/464-sidereus-nuncius-the-starry-messenger-1610.html',
        note: '作品介绍记1610年3月出版及1609—1610年望远镜观测。',
      },
    ],
  },
  'world-thirty-years-war': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1618年，波希米亚反抗哈布斯堡统治，开启通常所称的三十年战争。宗教分歧与诸侯权利、王朝继承及皇帝权力交织，使地方冲突不断吸引外部势力。',
            '丹麦、瑞典、法国等先后参战，各方并不始终按宗教阵营站队。军队需要粮食、军饷和驻地，征敛、疾病和破坏给德意志许多地区带来严重人口损失。',
          ],
        },
        {
          title: '战争扩大，也改变谈判目标',
          paragraphs: [
            '最初关于信仰和帝国权利的问题，逐渐与欧洲力量平衡相连。盟友会转换，战争也在不同战区呈现不同节奏，不能当成三十年不间断的同一场会战。',
            '1648年的威斯特伐利亚和约结束主要冲突，调整宗教及领土安排。和平需要许多条款协调不同利益，并没有一举创造今日国际关系的全部规则。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · The Protestant Reformation',
        url: 'https://openstax.org/books/world-history-volume-2/pages/5-1-the-protestant-reformation',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-batavia': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1619年，荷兰东印度公司在攻取并破坏爪哇雅加达旧城后，建立巴达维亚作为亚洲经营中心。科恩等公司领导希望集中仓储、舰队和行政，以支持贸易与军事行动。',
            '新城规划和港口依靠当地及移入人口的劳动，商人、工匠、奴隶和公司人员形成复杂社会。公司一面需要吸引交易，一面以堡垒、法规和暴力维护支配。',
            '巴达维亚的建立因此既是商业组织的扩展，也是殖民占领。它后来发展为雅加达的一部分，原有社会并非在公司命名城市时才开始存在。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '荷兰国家档案馆 · Coen bouwt fort Batavia (1619)',
        url: 'https://www.nationaalarchief.nl/beleven/onderwijs/bronnenbox/coen-bouwt-fort-batavia-1619',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'phil-bacon-novum-organum': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1620年，弗朗西斯·培根出版《新工具》，批评依赖权威、习惯和草率归纳的求知办法。他希望重新组织自然研究，使知识能够在共同积累中增加。',
            '所谓“偶像”指容易误导判断的倾向，研究者需要警惕语言、个人经验与学派成见。收集材料、安排实验和比较案例，则用于逐步形成较可靠解释。',
            '培根没有提供后来一切科学研究照用的单一程序，他的计划仍带有时代限制。作品的力量在于，把知识的改进理解为有组织、可协作并能影响生活的长期工作。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Francis Bacon',
        url: 'https://plato.stanford.edu/entries/francis-bacon/',
        note: '第1节明确1620年10月《大复兴》卷出版并含《新工具》两卷；第4.2节讨论新方法。',
      },
    ],
  },
  'category-harvey': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1628年，威廉·哈维发表关于心脏与血液运动的论著，论证血液在身体中循环。心脏、瓣膜和血管的观察，与流量计算和动物实验共同支持了这一解释。',
            '如果血液不断由肝脏新造并在组织中耗尽，所需数量将难以成立；循环模型则把许多观察连接起来。动脉与静脉之间的微细通路，当时还不能直接完整看见。',
            '论证引发争议，后来显微观察和生理研究才补充更多环节。哈维的成果说明，新解释可以由多种证据相互支持，而不必等待每个机制已经全部可见。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '英国皇家内科医师学会博物馆 · Timeline',
        url: 'https://history.rcp.ac.uk/timeline',
        note: '1628年条目及图注确认《心血运动论》在法兰克福出版和循环论证。',
      },
    ],
  },
  'depth-taj-mahal': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1632年前后，沙贾汗在阿格拉为去世的妻子穆姆泰兹·玛哈尔营建泰姬陵。陵墓、清真寺、附属建筑和花园共同组成沿河展开的王室纪念空间。',
            '白色大理石、嵌饰、书法与对称布局，把宗教观念、哀悼和帝国权威结合。工程需要来自不同地区的材料、工匠和持续资源调配，不能只用一段爱情传说概括。',
            '主体与附属部分分阶段完成，后来的维护、环境变化和保护也影响今天的景观。泰姬陵既是个人纪念，也是莫卧儿王权组织大型工程的成果。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'UNESCO World Heritage Centre · Taj Mahal',
        url: 'https://whc.unesco.org/en/list/252/',
        note: 'Outstanding Universal Value—Brief synthesis列1632、1648及1653年的施工阶段。',
      },
    ],
  },
  'depth-harvard-founded': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1636年，马萨诸塞湾殖民地议会拨款创办学院，后来发展为哈佛。殖民者希望培养受过教育的神职人员与公共事务人才，使新英格兰的宗教和社会秩序能够延续。',
            '学院最初规模有限，课程、住宿和供养都需要逐步安排。约翰·哈佛的遗赠随后帮助学校发展，名称由此确定；今天的大学体系远非最初即已具备。',
            '这一教育事业建立在殖民地社会之中，与原住民土地被占有的历史同时发生。理解建校既要看到求学与制度积累，也要看到它所依托的权力和资源环境。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Harvard University · History timeline',
        url: 'https://www.harvard.edu/about/history/timeline/',
        note: '1636年议会拨款、1637年选址和1639年命名条目。',
      },
    ],
  },
  'phil-descartes-discourse': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1637年，笛卡尔出版《方法谈》，并附上光学、气象和几何等科学论著。他以自身求学经历引出问题：怎样审查已经接受的意见，并让推理有清楚次序。',
            '怀疑、分析与逐步综合不是脱离具体研究的口号，附论展示了几何和自然问题怎样成为方法的试验场。使用法语也让作品超出仅熟悉拉丁语的学术读者。',
            '作品后来与现代主体和科学方法的讨论紧密相连，但笛卡尔并没有凭一本书终结其他求知传统。不同论著中的论证，也需要按各自问题分别理解。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · René Descartes',
        url: 'https://plato.stanford.edu/entries/descartes/',
        note: '条目导言列1637年《方法谈》及三篇附论；第1.3节讨论其形成与发表。',
      },
    ],
  },
  'phil-descartes-meditations': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1641年，笛卡尔出版《第一哲学沉思集》，让读者跟随一系列怀疑，重新追问什么能够被可靠认识。感官、梦境和可能的欺骗被逐步检验，思考者自身的存在成为关键立足点。',
            '作品进一步论证上帝、清楚明白的观念及心灵与身体的区别，并与同时出版的反对意见和答辩形成对话。它不是只留下“我思故我在”的一句格言，而是一套需要逐步评估的推理。',
            '后来的哲学既继承它的问题，也批评其前提和结论。文本的影响来自这种持续争论，而非所有读者从此共享同一确定基础。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · René Descartes',
        url: 'https://plato.stanford.edu/entries/descartes/',
        note: '导言明确1641年初版、1642年第二版；第1.4及第3节讨论形而上学与异议答辩。',
      },
    ],
  },
  'world-british-civil-wars': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '17世纪40年代，英格兰国王查理一世与议会冲突转为内战，苏格兰与爱尔兰的战争又与之交织。宗教、征税、军队和统治权问题，使三个王国不能作为互不相干的舞台理解。',
            '国王与议会双方不断筹款、征兵并争取地方支持，议会军在组织改革和联盟变化中取得优势。战争也使军队与民间出现更激进的宗教、财产和政治主张。',
          ],
        },
        {
          title: '处死国王以后，冲突仍未结束',
          paragraphs: [
            '1649年，查理一世被审判并处死，王政被废，英格兰建立共和国。克伦威尔时期继续在爱尔兰和苏格兰用兵，征服、屠杀与土地剥夺留下深刻创伤。',
            '共和国和护国政体仍难稳定权力继承，1660年王政复辟。战争改变了军队、议会和王权的关系，却没有沿一条直线立即建立现代民主。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '英国国家陆军博物馆 · British Civil Wars',
        url: 'https://www.nam.ac.uk/explore/british-civil-wars',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'depth-rembrandt-nightwatch': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1642年，伦勃朗完成一幅阿姆斯特丹市民卫队群像，后世称为《夜巡》。作品并非原本要表现夜间巡逻，名称与后来画面变暗及观看习惯有关。',
            '画家没有把所有出资者平均排成一列，而是利用光线、动作和空间，把队伍表现为正在集合出发。公共身份、个人肖像与戏剧性场景因此结合，也使群像委托成为艺术实验。',
            '作品后来被裁切、修复和重新展示，今天对它的认识包含保存历史。它既记录市民组织的自我形象，也显示艺术家如何在具体赞助关系中改变惯例。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Rijksmuseum · 10 things about Rembrandt’s Night Watch',
        url: 'https://www.rijksmuseum.nl/en/stories/10-things/story/10-things-about-rembrandt-s-night-watch',
        note: '作品纪年1642年、名称及保存史说明。',
      },
    ],
  },
  'world-westphalia': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1648年，各方在明斯特和奥斯纳布吕克达成一组和约，结束三十年战争的主要冲突，并处理荷兰与西班牙等关系。谈判涉及众多使者，条款必须协调领土、宗教和帝国内部权利。',
            '和约承认新的力量安排，也扩展对加尔文宗等问题的法律处理。帝国仍然存在，诸侯权利与共同制度继续并行，不能简单说成每个地区都立即成为完全独立国家。',
            '“威斯特伐利亚体系”是后人概括国际秩序时使用的说法。回到条文和谈判，可以看到的是对具体战争后果的复杂解决，而非现代主权原则在一天内被完整发明。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · 5-1-the-protestant-reformation',
        url: 'https://openstax.org/books/world-history-volume-2/pages/5-1-the-protestant-reformation',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'phil-hobbes-leviathan': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1651年，霍布斯出版《利维坦》，在内战经验中追问何种共同权力能够维持和平。他从人的欲望、恐惧和相互不信任出发，说明缺少稳定权威时为何可能陷入冲突。',
            '政治共同体通过授权建立主权者，以法律和强制结束人人自行裁判的危险。主权可以由一人或集体承担，论证重点是公共权力的统一，而不只是赞美国王。',
            '这种安排也引出服从与自我保存的边界：统治为何正当，人何时仍保有不能放弃的行动空间。作品因此长期成为安全、契约与自由争论的重要参照。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Thomas Hobbes',
        url: 'https://plato.stanford.edu/entries/hobbes/',
        note: '第1节 Life and Works：法国流亡及1651年《利维坦》出版；其结构包括认识、政治和经文解释。',
      },
    ],
  },
  'depth-boyle-chymist': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1661年，罗伯特·波义耳出版《怀疑的化学家》，以对话方式检验传统元素和物质解释。他不满足于把一次加热分离出的产物，直接认定为物体最根本的组成。',
            '实验操作、仪器条件与结果解释必须区分，物质变化也可能比固定的少数原则复杂。书中的怀疑因此指向如何取得证据，而不是拒绝化学研究。',
            '作品常被视为近代化学的重要节点，但现代元素观和定量体系仍要经过后续发展。波义耳的贡献在于推进实验与论证的要求，不能据此把炼金术与化学划成一夜断裂的两界。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Science History Institute · Robert Boyle',
        url: 'https://www.sciencehistory.org/education/scientific-biographies/robert-boyle/',
        note: 'Sceptical Chymist (1661)及元素概念与后世差异。',
      },
    ],
  },
  'depth-paradise-lost': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1667年，约翰·弥尔顿《失乐园》初版出版，以史诗形式重写撒旦反叛、人的诱惑与失落。宗教故事也成为讨论自由意志、服从和责任的空间。',
            '弥尔顿经历英国内战、共和国和王政复辟，个人政治经验与古典、圣经传统一起进入作品，但诗中人物不能简单与现实人物一一对号。',
            '初版与后来的修订在篇章安排上不同，作品又持续被不同立场阅读。它的生命力来自语言和道德冲突的复杂性，而不只是提供一个没有疑问的宗教结论。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Cambridge University Library · Living at this Hour: John Milton',
        url: 'https://wwwe.lib.cam.ac.uk/CUL/exhibitions/Milton/captions.html',
        note: '1667年《失乐园》初版展品说明，区别后续修订版。',
      },
    ],
  },
  'phil-spinoza-ethics': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1677年，斯宾诺莎去世后，《伦理学》与其他著作一同出版。书以定义、公理和命题组织论证，从上帝或自然出发，讨论身体、心灵、情感与自由。',
            '人的欲望和情感被放入自然因果之中理解，摆脱束缚并非脱离自然，而是更充分认识自身为何这样行动。自由因此与理解、能力和共同生活相联系。',
            '几何式写法给作品严密外观，也要求读者逐项审查前提。它后来激发关于宗教、决定论和政治的广泛争论，作者身后的传播又使其思想超出原有小圈子。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Baruch Spinoza',
        url: 'https://plato.stanford.edu/entries/spinoza/',
        note: '第1节 Biography 记1677年去世后友人出版未刊作品；第2节详细解释《伦理学》的体系。',
      },
      {
        title: 'Cambridge University Press · The Textual History of Spinoza’s Ethics',
        url: 'https://www.cambridge.org/core/books/abs/cambridge-companion-to-spinozas-ethics/textual-history-of-spinozas-ethics/DB85086DF14DD34231AC1D56270DBD3F',
        note: 'Piet Steenbakkers，The Cambridge Companion to Spinoza’s Ethics，第1章，第26—41页；摘要明确1677年阿姆斯特丹《遗著集》刊行《伦理学》，并说明生前印前准备。',
      },
    ],
  },
  'world-pueblo-revolt': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1680年，今新墨西哥地区多个普韦布洛社群联合起义，反抗西班牙殖民统治。强制劳动、征取资源和压制宗教生活积累不满，波佩等人协调不同聚落行动。',
            '起义者攻击殖民据点，迫使西班牙人撤出圣菲及周边地区。胜利为恢复本地仪式和政治空间提供机会，但不同社群的利益并不完全相同，联合也需要持续维系。',
            '西班牙在1690年代重新进入，抵抗和谈判继续改变统治条件。起义的重要性在于显示原住民能够组织跨聚落行动，而非殖民秩序只能单向扩张。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'U.S. National Park Service · The Spaniards, El Morro',
        url: 'https://home.nps.gov/elmo/learn/historyculture/the-spaniards.htm',
        note: 'The Pueblo Revolt小节，1680年起义与1692年西班牙重返。',
      },
    ],
  },
  'world-glorious-revolution': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1688年，威廉率军进入英格兰，詹姆斯二世出走，王位随后由威廉与玛丽共同承继。宗教政策、继承与对王权的疑虑，使部分政治精英转向邀请外来军事介入。',
            '1689年《权利法案》等安排限制若干王室行为，强调议会在法律、税收和政治秩序中的地位。它没有立即给予全民选举权，宗教与身份排斥仍然存在。',
            '所谓“光荣”容易掩盖其他地区的战争。苏格兰、尤其爱尔兰的冲突伴随这次权力更替，王权与议会关系的调整也有鲜明的地区差别。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '英国议会 · Overview of the Glorious Revolution',
        url: 'https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/revolution/overview/',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'phil-locke-essay': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1689—1690年前后，洛克《人类理解论》与《政府论》问世，分别追问知识从哪里来、政治权力为何正当。两书面对不同问题，又共同关注人能够合理接受什么。',
            '《人类理解论》讨论经验、观念和认识限度，反对把某些知识直接视为天生具备。《政府论》则以自然权利、同意和信托解释政府，并讨论统治者破坏职责时的抵抗问题。',
            '这些论证后来参与自由主义和革命政治，但不能忽略作者所处社会仍有财产、性别与殖民排斥。书中的普遍语言与实际政治边界，构成后人持续争论的张力。',
          ],
        },
      ],
      note: '两书版面纪年与实际发行时间存在跨年差异，本条用1689年作问世阶段定位。',
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · John Locke',
        url: 'https://plato.stanford.edu/entries/locke/',
        note: '导言以1689年标《人类理解论》；第1.3节说明返英后出版《人类理解论》《政府论》及宽容书信。',
      },
    ],
  },
  'category-bank-england': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1694年，英格兰银行成立，以投资者认购资金向政府提供贷款，换取特许经营地位。战争财政与国家信用，是这一金融组织出现的直接背景。',
            '银行把存款、票据和政府债务联系起来，使借款不只依赖君主个人信用。它的稳定仍需要法律、税收与市场信任支持，创设并不意味着金融危机从此消失。',
            '后来银行逐渐取得更多货币和金融职责，最终成为中央银行。1694年的机构应按当时政府融资与商业银行业务理解，而不把今天全部职能提前归给它。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '英格兰银行 · History',
        url: 'https://www.bankofengland.co.uk/about/history',
        note: '1694年7月27日创设与8月1日营业条目，并注明最初私人银行性质。',
      },
    ],
  },
  'world-khalsa': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1699年，古鲁戈宾德·辛格建立卡尔萨团体，为锡克教徒确立更鲜明的入团仪式、纪律和共同身份。宗教生活与面对迫害、战争和政治压力的组织需要相互联系。',
            '卡尔萨强调共同责任、平等和守护信仰，外在标志与日常规范使承诺能够被持续实践。团体内部及与其他锡克教徒的关系，也在后来的历史中发展。',
            '这一节点不能被缩成单纯军事化，更不是所有锡克教传统此前不存在。它重新组织了教团认同，并为后续政治和宗教共同体提供重要基础。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '英国司法机构 · Vaisakhi：Jinder Singh Boora 的社群说明',
        url: 'https://www.judiciary.uk/reflections-on-vaisakhi-hhj-jinder-singh-boora-shares-his-experience/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: '华莱士收藏馆 · Punjab: Historical Context：卡尔萨的形成',
        url: 'https://www.wallacecollection.org/explore/explore-in-depth/the-sikh-empire/punjab-land-of-the-five-rivers/historical-context/',
        note: '博物馆的锡克帝国专题核实1699年纪年与团体性质；中文由本站独立编写。',
      },
    ],
  },
  'world-enlightenment': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '17世纪末至18世纪，欧洲及大西洋世界的作者和读者在沙龙、咖啡馆、学会与出版物中讨论理性、宗教、自然和政治，后来通常被称为启蒙运动。它没有统一组织，也没有人人相同的纲领。',
            '批评传统权威、传播知识和改革制度的主张，依靠印刷市场、教育和社交网络扩大。读者可以比较不同论证，政府与教会也持续以审查、赞助或惩罚影响讨论。',
          ],
        },
        {
          title: '普遍理想与现实边界',
          paragraphs: [
            '自由和平等的语言不断扩展，却常与奴隶制、殖民统治及性别排斥并存。被排除者也使用这些语言提出要求，使启蒙并非少数欧洲思想家单向赠与世界的成果。',
            '1700年仅标示长期发展阶段，具体作品和改革应按各自年代、地区与参与者理解。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · 7-1-the-enlightenment',
        url: 'https://openstax.org/books/world-history-volume-2/pages/7-1-the-enlightenment',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-saint-petersburg': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1703年，彼得一世在涅瓦河口营建圣彼得堡，试图把俄国权力更直接地连接到波罗的海。城市兴起与对瑞典战争、海军建设和国家改革密切相关。',
            '堡垒、港口和街道需要大量劳力、木石与粮食，潮湿地面和艰苦条件使建设付出沉重生命代价。贵族与官员随后被要求迁入，新都逐渐成为宫廷与行政中心。',
            '“通向欧洲的窗口”概括了统治者的方向，却不能代替具体地理和强制动员的历史。城市的辉煌与建设者承受的负担，属于同一工程。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'UNESCO · Historic Centre of Saint Petersburg and Related Groups of Monuments',
        url: 'https://whc.unesco.org/en/list/540/',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'phil-leibniz-monadology': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1714年，莱布尼茨写成后来称为《单子论》的短篇，概括其对实体、知觉和世界秩序的思考。单子不是微小物质粒子，而是用来说明现实根基的简单实体。',
            '不同单子各自表现世界，变化又通过上帝所安排的和谐联系起来，作品因此回应心身关系、因果与整体秩序等问题。简洁条目背后依赖作者更广泛的论证。',
            '文本没有在写成当年以今天熟悉的方式公开出版，标题和传播也有后来的历史。1714年应理解为成稿节点，不能与读者普遍接触作品的时间合并。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Gottfried Wilhelm Leibniz',
        url: 'https://plato.stanford.edu/entries/leibniz/',
        note: '第1.1节 Chronology of Major Writings 列1714年 Monadology；第2—4节说明体系与实体。',
      },
    ],
  },
  'east-ogyu-sorai-bendo': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '18世纪前期，荻生徂徕在《辨道》等著作中重读儒家经典，强调从古代语言和制度理解圣人之道。他质疑只以内心修养和抽象理气说明政治秩序的办法。',
            '礼、乐和制度在其论述中具有组织社会的作用，需要由公共安排塑造行为与关系。学习古典因此不只是个人品德训练，也关乎统治者怎样建立可运行的秩序。',
            '这些主张生长于德川日本的思想与政治环境，不能简单当作恢复中国古代制度的照搬计划。作品后来引发对学问、语言和政治责任的持续争论。',
          ],
        },
      ],
      note: '1717年为相关写作阶段的定位，文本成稿、刊行和传播须分别理解。',
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Japanese Confucian Philosophy',
        url: 'https://plato.stanford.edu/entries/japanese-confucian/',
        note: '§4.1 Language、§4.7 Political Thought：荻生徂徕1666—1728年及《辨道》《辨名》对语言、礼乐和制度的解释。',
      },
      {
        title: '国文学研究资料馆 · 《辨道》国书数据库',
        url: 'https://kokusho.nijl.ac.jp/biblio/100391144/',
        note: '著作信息“成立年 享保二刊（1717）”；日本图书馆存本目录，区别原刊纪年与后来的重刊本。',
      },
    ],
  },
  'phil-hume-treatise': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1739—1740年，休谟分卷出版《人性论》，尝试把观察人的经验、感情与习惯作为哲学研究基础。理解、情感和道德被放在同一关于人性的计划中。',
            '他追问因果信念为什么形成，指出人并非每次都通过严格证明才期待未来。道德判断也与情感和共同生活密切相关，理性不能独自提供行动的全部动力。',
            '作品最初反响有限，休谟后来以其他形式重新表达若干论点。它的怀疑并不只是宣布知识无用，而是要求解释人实际上如何相信、行动和评价。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · David Hume',
        url: 'https://plato.stanford.edu/entries/hume/',
        note: '第1节 Life and Works 明确1739年第一、二卷及1740年第三卷；第2—4节讨论认识、激情和伦理。',
      },
    ],
  },
  'world-seven-years': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1756—1763年，欧洲强国及其盟友在欧洲、美洲和亚洲展开相互连接的战争，通常合称七年战争。北美英法冲突更早已开始，殖民竞争与欧洲联盟重组随后合流。',
            '普鲁士、奥地利、法国、英国、俄国等在不同战区争夺，原住民政权和南亚势力也按自身目标参与。舰队、贷款、补给与殖民资源，使战争具有跨洲动员规模。',
            '1763年的和约扩大英国在北美和印度方向的优势，也留下巨额债务和新的征税压力。战后秩序没有消除冲突，反而为美洲革命及更深殖民扩张创造条件。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · 6-2-the-rise-of-a-global-economy',
        url: 'https://openstax.org/books/world-history-volume-2/pages/6-2-the-rise-of-a-global-economy',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-plassey': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1757年，英国东印度公司在普拉西击败孟加拉纳瓦卜西拉杰·乌德·道拉。战前密谋与地方精英倒向公司，对结果的作用不亚于战场上的武力。',
            '克莱武等人利用宫廷和商业集团之间的矛盾，战后扶立新的统治者，取得金钱与政治影响。公司由此更深入干预孟加拉，但尚未在此战后立即建立全印度统治。',
            '后来征税权、战争与行政接收进一步把贸易公司变成领土政权。普拉西显示殖民扩张经常通过当地联盟和利益重组推进，不能只讲成欧洲军队单独征服一切。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · 6-2-the-rise-of-a-global-economy',
        url: 'https://openstax.org/books/world-history-volume-2/pages/6-2-the-rise-of-a-global-economy',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'phil-rousseau-contract-emile': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1762年，卢梭出版《社会契约论》和《爱弥儿》，分别讨论政治共同体与人的教育。两书都追问：既有社会关系怎样使人依赖他人，又有什么安排能够保存或重建自由。',
            '《社会契约论》以共同立法和公意讨论正当权威，《爱弥儿》则通过设想的成长过程检验教育、经验与道德判断。它们不是同一份政策方案，性别和公民边界等问题也留下争议。',
            '两书遭禁与引发的讨论，说明教育、宗教和主权并非可彼此隔离。后来革命和教育思想反复借用卢梭，也不断重新解释其自由观。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Jean Jacques Rousseau',
        url: 'https://plato.stanford.edu/entries/rousseau/',
        note: '第1节 Life 及主要著作目录明确两书均发表于1762年；第3节政治哲学、第5节教育。',
      },
    ],
  },
  'world-cook-new-zealand': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1769年，库克率“奋进号”抵达新西兰海岸，随后进行测绘与航行考察。欧洲地图由此获得更完整的海岸认识，船队也与毛利社群发生多次接触。',
            '接触既有交换和沟通，也发生枪击与死亡。毛利人拥有自己的土地、政治关系和航海知识，库克并非发现无人之地，欧洲命名也不能替代当地历史。',
            '这次考察扩大了欧洲关于太平洋的知识，并为后来的贸易、移民和殖民提供条件。但英国主权扩张及《怀唐伊条约》属于此后不同阶段，不是1769年已经完成。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '新西兰文化与遗产部 · James Cook',
        url: 'https://nzhistory.govt.nz/people/james-cook',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-partitions-poland': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1772年，俄罗斯、普鲁士和奥地利第一次瓜分波兰—立陶宛联邦。邻国力量、联邦内部政治危机与外部干预相互作用，使其主权和领土不断受侵蚀。',
            '联邦内部随后尝试改革，1791年宪法希望重整制度，却遭国内反对者和俄国等干预。1793年、1795年再次瓜分后，联邦作为国家从地图上消失。',
            '国家消失不表示人口、语言和政治愿望一并终结。流亡、起义与文化活动继续维持复国诉求，三次瓜分也成为欧洲力量政治中弱国处境的深刻例子。',
          ],
        },
      ],
      note: '1772年为第一次瓜分，三次行动的参与国与具体安排并不完全相同。',
    },
    sources: [
      {
        title: '拿破仑基金会 · The Duchy of Warsaw: The Gradual Disappearance of Poland',
        url: 'https://www.napoleon.org/en/history-of-the-two-empires/close-up/a-close-up-on-the-duchy-of-warsaw/',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-wealth-nations': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1776年，亚当·斯密出版《国富论》，研究劳动分工、交换、价格与国家财富如何联系。他试图解释商业社会的运作，而不只计算君主金银储备的多少。',
            '分工能提高生产，也依赖市场扩大和人与人之间的合作。书中同时批评垄断、商人集团左右政策及殖民制度的代价，国家仍承担司法、防务和部分公共设施等职责。',
            '后来常用“看不见的手”概括斯密，容易略去其制度与道德背景。《国富论》提出的是一套需要考察具体规则和权力关系的分析，并非任何市场结果都自动合理的保证。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · 6-3-capitalism-and-the-first-industrial-revolution',
        url: 'https://openstax.org/books/world-history-volume-2/pages/6-3-capitalism-and-the-first-industrial-revolution',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'phil-kant-pure-reason': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1781年，康德出版《纯粹理性批判》第一版，追问经验知识何以可能，以及理性何时越过自身能够证明的界限。问题既回应经验论与理性论争论，也关系数学和自然科学的有效性。',
            '空间、时间与理解的范畴被视为经验能够被组织的条件，人并非只是被动接收零散感觉。与此同时，对灵魂、世界整体和上帝的传统证明受到批判，理性的要求与知识的边界被区分。',
            '1787年第二版作出重要改写，读者对其含义又持续争论。所谓哲学转折不是一句口号，而是重新检查我们用什么条件说自己知道某事。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Immanuel Kant',
        url: 'https://plato.stanford.edu/entries/kant/',
        note: '导言和第1节明确第一版1781年、第二版1787年；第2—4节讨论知识条件、先验唯心论及演绎。',
      },
    ],
  },
  'world-us-constitution': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1787年，费城制宪会议通过美国宪法文本，试图解决邦联政府财政和协调能力不足的问题。联邦与州之间如何分权、人口不同的州怎样获得代表，是争论核心。',
            '文本设置总统、国会与法院，并安排相互限制。对奴隶人口计数和贸易的妥协，又使新的自由共和国继续容纳奴隶制，妇女和许多居民同样被排除在完整政治参与之外。',
            '宪法仍需各州批准，1789年新政府才开始运作，《权利法案》随后补充。1787年是文本形成节点，制度合法性与参与边界仍在此后长期斗争中改变。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '美国国家档案馆 · Constitution of the United States (1787)',
        url: 'https://www.archives.gov/milestone-documents/constitution',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'world-first-fleet': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1788年，英国第一舰队在悉尼湾建立殖民据点，把囚犯、军人和官员带到澳大利亚东岸。远航和定居服务于帝国的刑罚、战略与资源安排，早期殖民者也面临粮食和环境困难。',
            '这片土地已有原住民社群长期生活。殖民据点扩大带来土地侵占、疾病和暴力，英国对领土的主张并没有获得当地人的共同同意。',
            '悉尼后来发展为大城市，但1788年的意义不能只讲成现代国家的开端。它同时开启了持续的定居殖民过程，原住民社会也始终抵抗、适应并维护自身关系。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '澳大利亚国家博物馆 · Defining moments timeline',
        url: 'https://www.nma.gov.au/defining-moments/defining-moments-timeline',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'phil-kant-practical-reason': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1788年，康德出版《实践理性批判》，系统讨论道德法则、自由与行动理由。一个行为是否有道德价值，不能只由它碰巧带来多少利益或满足多少欲望决定。',
            '人需要检验自己的准则能否作为普遍法则，并把自己理解为能够为行动负责的主体。自由不是随意而行，而与理性自我立法和尊重他人密切相连。',
            '作品还讨论最高善及实践信念，与此前理论认识的批判形成区别。道德要求不因此成为关于世界一切事实的知识，却对人应当如何行动提出约束。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Immanuel Kant',
        url: 'https://plato.stanford.edu/entries/kant/',
        note: '条目导言列1788年《实践理性批判》；第5节 Morality and freedom 讨论自律、自由和定言命令。',
      },
    ],
  },
  'depth-lavoisier-chemistry': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1789年，拉瓦锡出版《化学基础论》，把氧参与燃烧、定量实验与新的化学命名组织成教学体系。实验中的称量，使物质转化不只依赖外观和传统名称解释。',
            '书中对简单物质的处理与现代元素概念并不完全相同，却推动研究者按可分析的证据分类。水被解释为可分解和合成的物质，旧有燃素理论也面临更系统挑战。',
            '这场变化依靠多位实验者、仪器制造者与合作者，拉瓦锡的书使相关工作更有组织地传播。现代化学不是由一本著作独自创造，而是在共同方法和语言重组中形成。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Science History Institute · Traité Élémentaire de Chimie',
        url: 'https://digital.sciencehistory.org/works/v979v4270',
        note: '1789年巴黎Cuchet版馆藏，作者、绘图者与教学内容说明。',
      },
    ],
  },
  'world-haitian-revolution': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1791年，法属圣多明各大批被奴役者起义，海地革命展开。法国革命的权利语言与殖民地种植园的残酷奴役形成尖锐矛盾，自由有色人、白人集团和外部国家又各有政治目标。',
            '杜桑·卢维杜尔等领导者在战争、谈判和联盟转换中扩大力量，法国一度废除奴隶制。拿破仑后来派军恢复控制，反抗在黄热病、军事消耗和奴隶制威胁中继续。',
          ],
        },
        {
          title: '从反奴役斗争走向独立',
          paragraphs: [
            '1804年，德萨林等宣布海地独立，殖民地奴隶起义最终建立新国家。这场胜利打击了大西洋奴隶制度，也使新国家面对封锁、战争压力和后来的赔款要求。',
            '革命不是宗主国赐予自由的结果，被奴役者的组织与战斗是核心动力。其不同阶段的参与者和目标不断改变，1791年的起义与1804年的独立必须分别交代。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 · 7-3-revolutions-america-france-and-haiti',
        url: 'https://openstax.org/books/world-history-volume-2/pages/7-3-revolutions-america-france-and-haiti',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
  },
  'depth-mozart-magic-flute': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1791年，莫扎特作曲、席卡内德编剧的《魔笛》在维也纳首演。作品以德语歌唱剧形式结合对白、歌曲、奇幻场景与严肃仪式，面向商业剧场的多样观众。',
            '塔米诺、帕米娜与帕帕基诺的经历，把爱情、试炼、恐惧与求知放进同一舞台。音乐使不同人物和空间拥有鲜明性格，观众也可以在娱乐故事中听到关于启蒙和权威的争论。',
            '作品的象征与性别安排后来引发不同解释。它并非只是一份秘密社团观念的密码，也是一场需要演员、布景、经营者与观众共同完成的戏剧。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Mozarteum Foundation · Köchel catalogue KV 620',
        url: 'https://kv.mozarteum.at/en/work/die-zauberflote-7137',
        note: 'Dating与First Performance字段，维也纳1791年9月30日首演。',
      },
    ],
  },
  'phil-wollstonecraft-rights': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1792年，玛丽·沃斯通克拉夫特出版《女权辩护》，把教育和理性能力引入关于妇女地位的公共争论。她反对把女性只培养成讨人喜爱、依赖男性的存在，认为这种教育本身制造了所谓天性缺陷。',
            '女性若承担家庭与公共生活的责任，就应获得发展判断力和独立人格的条件。论证借用当时普遍权利的语言，追问为何这些承诺一到女性便被缩小。',
            '作品仍有时代和社会位置的局限，却为后来关于教育、公民身份与性别平等的讨论提供重要资源。它的意义在于把看似私人的教养问题，揭示为公共制度的问题。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Mary Wollstonecraft',
        url: 'https://plato.stanford.edu/entries/wollstonecraft/',
        note: '导言及第3节 Moral and Political Writings 明确《女权辩护》1792年出版，并讨论理性、德性和教育。',
      },
    ],
  },
  'category-jenner': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1796年，爱德华·詹纳进行牛痘接种试验，探索感染牛痘是否能提供对天花的保护。工作与当地关于挤奶者较少患天花的经验相联系，也建立在此前接种实践的背景上。',
            '他后来公布结果，疫苗接种逐步传播，但生产、保存、接种安全与公共接受仍需长期改进。早期试验使用儿童等对象，也应放回历史条件与伦理问题中理解。',
            '天花最终在20世纪被根除，是后续疫苗、监测和全球公共卫生动员的共同成果。1796年是重要实验节点，不能把两百年后的结果归于单次试验已经完成。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '世界卫生组织 · History of smallpox vaccination',
        url: 'https://www.who.int/news-room/spotlight/history-of-vaccination/history-of-smallpox-vaccination',
        note: '见人痘接种传统、1796年5月试验与7月后续检验的段落。',
      },
    ],
  },
}
