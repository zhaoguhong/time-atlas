import type { HistoryEvent, Source } from '../types'

export const worldEventNarratives: Record<
  string,
  { narrative: NonNullable<HistoryEvent['narrative']>; sources: Source[] }
> = {
  'world-hammurabi': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '约公元前1750年，巴比伦王汉谟拉比将一组法律裁断刻在石碑上。碑顶的浮雕中，国王面对太阳神、正义之神沙马什，接受权力的象征；下方密集的楔形文字，则把这种维护秩序的王权落实到财产、交易、家庭和劳动等事务。',
            '条文常从一个具体情境写起，再规定应如何赔偿或处罚。例如伤害他人、房屋建造失当、借贷和婚姻纠纷，都可以成为裁断对象。这种写法让我们看到，当时的人已经试图把复杂的社会争端归纳成可以参照的规则。',
            '规则同时保留了社会等级：不同身份的人遭受同样伤害，可能对应不同的处罚或赔偿。石碑所宣示的正义，属于当时的王权和身份秩序。它提供了观察两河社会的具体材料，也提醒读者追问，法律在保护谁、要求谁承担责任。',
          ],
        },
        {
          title: '石碑自己的旅程',
          paragraphs: [
            '数百年后，石碑被作为战利品带到苏萨，20世纪初又在那里出土，后来进入卢浮宫。今天的收藏地点、出土地与最初刻立的政治环境各不相同；把这几处放在地图上，可以看到文物的流传本身也经历了战争和权力转移。',
          ],
        },
      ],
      note: '“法典”是惯用名称，这组裁断与现代全面编纂的法律体系有区别；刻立年代为约年，巴比伦坐标是王国中心的阅读参照。',
    },
    sources: [
      {
        title: '卢浮宫 · The Code of Hammurabi（条文结构、浮雕与出土流传）',
        url: 'https://www.louvre.fr/en/the-code-of-hammurabi',
      },
    ],
  },
  'world-magna-carta': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1215年，英格兰国王约翰与反叛贵族在兰尼米德达成协议，接受后来被称为《大宪章》的文件。长期战争、征敛和王权的使用方式，使国王与部分贵族关系破裂；文件首先承担的是结束眼前政治危机的任务。',
            '宪章规定教会、贵族和自由人的一些权利，涉及征税、继承、司法及王室官员的行为。今天常被引用的条款，要求对自由人的拘禁和剥夺依照合法裁断或本国法律进行。这些约束来自当时社会的权利关系，许多居民并不享有相同地位。',
          ],
        },
        {
          title: '一次失败的和解，怎样留下长久影响',
          paragraphs: [
            '协议很快遭到破坏，教皇宣布1215年宪章无效，内战继续。约翰去世后，幼王亨利三世的政府又以修订宪章争取支持；1216年、1217年及1225年的重颁，使文本逐步进入此后的政治与法律生活。',
            '后人从中发展出更广泛的解释，尤其强调统治者也应受法律约束。它的重要性既来自1215年写下的条款，也来自不同世代对这些条款的引用和重新解释。现代权利观念与这份中世纪文件之间，存在一段漫长的历史。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '英国议会 · Magna Carta（形成背景与适用对象）',
        url: 'https://www.parliament.uk/magnacarta/',
      },
      {
        title: '英国国家档案馆 · Magna Carta 1214–1225（文本与重颁年表）',
        url: 'https://www.nationalarchives.gov.uk/education/teaching-resources/magna-carta-1214-1225/',
      },
    ],
  },
  'world-printing': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '15世纪中叶，美因茨的古腾堡等人把可重复使用的金属活字与印刷工艺结合起来，形成能够批量制作书页的工作方式。字模需要整齐耐用，油墨、纸张和压印也须相互配合，工匠与出资者共同支撑了这项耗费资金的事业。',
            '约1455年印成的《古腾堡圣经》，展示了这套工艺的成果。字母被排列成版，印完后可以拆开，用于其他书页。同一版能复制多份文字，但大写字母和装饰仍由人手绘制，印刷与手工书籍的传统在同一部书中并存。',
            '作坊后来扩展到欧洲多座城市，使书籍、学术论述和宗教文本可以用更多份数流通。读者能接触什么，仍取决于语言、价格、识字能力和出版管理。印刷改变了复制文字的条件，这些变化又在商业、教育与宗教争论中逐步展开。',
          ],
        },
      ],
      note: '约1450年表示欧洲金属活字印刷发展的一段时期；东亚更早已有雕版和活字印刷，本文不把古腾堡称为全世界印刷术的首创者。',
    },
    sources: [
      {
        title: '美国国会图书馆 · The Gutenberg Bible（工艺与约1455年印本）',
        url: 'https://wwws.loc.gov/exhibits/bibles/the-gutenberg-bible.html',
      },
      {
        title: '美因茨古腾堡博物馆 · Gutenberg and his time in data（作坊与资金）',
        url: 'https://www.gutenberg.de/en/microsite/gutenberg/zeit/zeitleiste_gutenberg',
      },
      {
        title: '中国国家博物馆 · 科技的力量（东亚造纸与印刷）',
        url: 'https://www.chnmuseum.cn/portals/0/web/zt/202012kxyjs/',
      },
    ],
  },
  'world-columbus': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1492年，哥伦布在卡斯蒂利亚王室支持下向西横渡大西洋，希望寻找通往亚洲的航路。船队抵达加勒比海岛屿，与当地居民相遇。对航行者而言，这是通向未知地区的旅程；对泰诺人等原住民而言，来者进入的是他们已经生活、耕作和航行的世界。',
          ],
        },
        {
          title: '同一次相遇中的不同处境',
          paragraphs: [
            '哥伦布在报告中强调土地、物产与占有这些岛屿的权利，希望证明航行值得王室继续支持。美国国会图书馆保存的早期印本，展示了他的叙述怎样在欧洲传播。原住民自身的社会组织和利益，却无法仅从这份为资助者撰写的报告中充分看见。',
            '随后的航行与殖民活动，把加勒比海更紧密地卷入跨大西洋的统治和贸易。强迫劳动、暴力和外来疾病严重冲击当地社会；作物、人口及物资的跨洋移动也逐渐扩大。原住民的文化与后裔仍然延续，他们的经历属于这段历史的核心。',
            '1492年的意义，在于开启了一轮持续加强的跨洋联系及殖民过程。理解它，需要同时观察欧洲王室的目标、航海行动与加勒比居民承受的变化，不能只沿着航行者的视角讲述。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '美国国会图书馆 · Columbus and the Taíno（航行报告与原住民社会）',
        url: 'https://wwws.loc.gov/exhibits/exploring-the-early-americas/columbus-and-the-taino.html',
      },
      {
        title: '美国国家公园管理局 · The Taíno Legacy Lives（文化与社群延续）',
        url: 'https://www.nps.gov/places/the-ta%C3%ADno-legacy-lives.htm',
      },
    ],
  },
  'world-newton': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1687年，牛顿的《自然哲学的数学原理》在伦敦出版。书中的运动定律与引力研究，把地上物体和天体的运动放进同一个数学框架：行星怎样运行、力怎样改变运动，可以通过明确的条件与推导进行讨论。',
            '这部书的形成依赖多年研究，也有同行的推动。1684年，哈雷与牛顿讨论行星运动，促使牛顿继续整理和证明相关成果。此后近三年，牛顿扩充论述，哈雷协助处理伦敦的出版事务，原先分散的思考最终成为一部系统著作。',
            '《原理》使研究者能够用计算检验运动规律，并把理论与天文观测联系起来；它的论证也很艰深，当时并非所有读者都能接受。牛顿解释了引力作用所产生的运动效果，对引力究竟如何传递仍留下问题。书的影响由此既包括新的研究能力，也包括同行围绕证据、方法和解释展开的持续讨论。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '剑桥大学图书馆 · Newton: Glory and Gravity（1684—1687年的研究与出版）',
        url: 'https://wwwe.lib.cam.ac.uk/CUL/exhibitions/Footprints_of_the_Lion/gravity_glory.html',
      },
    ],
  },
  'world-industrial': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '18世纪后半叶，英国一些行业的生产方式开始加速变化。棉纺等部门采用更多机器，工人逐渐集中到工厂，煤炭、蒸汽动力与新的运输条件相互配合。所谓第一次工业革命，是许多技术和组织变化在数十年间汇合的过程。',
          ],
        },
        {
          title: '机器进入生产，也改变工作的安排',
          paragraphs: [
            '工厂能把设备、原料与劳动力集中起来，由管理者协调连续生产。随着动力和机器改进，制造更多商品所需的时间下降，企业扩大规模，煤矿、冶铁和运输的需求也随之增加。不同部门彼此带动，变化逐步超出单一发明的范围。',
            '工人的生活同时受到影响。越来越多家庭依靠工资收入，在规定时刻进入厂房，按机器和管理者安排的节奏工作。妇女和儿童也大量参与劳动，长工时、危险环境和居住拥挤成为突出问题。廉价商品与生产增长，并没有使收益和代价在人群之间平均分配。',
          ],
        },
        {
          title: '一座工业城市连着怎样的世界',
          paragraphs: [
            '曼彻斯特棉纺业的发展依赖远方的原棉与销售市场，其中许多原料来自奴隶劳动。殖民贸易和跨洋金融，把厂房里的机器与其他地区的土地、劳动和强制制度联系起来。英国的工业变化因此也要放在全球经济中理解。',
            '此后工业化向更多地区扩展，各地进入的时间、采用的方式与付出的代价不同。约1760—1840年是观察英国早期变化的常用范围，无法充当所有社会共同的起止线。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'OpenStax · World History 2 §6.3（机械化、工厂与劳动条件）',
        url: 'https://openstax.org/books/world-history-volume-2/pages/6-3-capitalism-and-the-first-industrial-revolution',
      },
      {
        title: '英国科学与工业博物馆 · Langworthy Brothers（曼彻斯特棉业与奴隶制联系）',
        url: 'https://blog.scienceandindustrymuseum.org.uk/langworthy-brothers/',
      },
    ],
  },
  'world-french-revolution': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1789年，法国王室为应对财政危机召开三级会议。贵族、教士和第三等级的代表聚集凡尔赛，却很快围绕代表权与表决方式发生冲突。怎样筹钱的问题，逐步转为谁有权代表国家、制定制度的问题。',
          ],
        },
        {
          title: '从会议厅走向街头',
          paragraphs: [
            '6月，第三等级代表宣布组成国民议会，随后在网球厅宣誓，在制定宪法之前不解散。王权受到直接挑战。7月14日，巴黎民众攻占巴士底狱，城市的武装行动改变了朝廷与议会面对的力量关系。粮食压力、政治传闻和对军队行动的恐惧，也推动更多人参与。',
            '乡村的不安与反抗继续扩大。8月，议会着手废除旧制度的特权，并通过《人权和公民权宣言》，用自由、平等和主权等原则表达新的政治秩序。文本中的原则要怎样变成法律、谁能实际参与政治，仍存在激烈分歧。',
          ],
        },
        {
          paragraphs: [
            '1789年的革命起初仍在寻求限制君权的制度，1791年制定了宪法。共和国的建立、国王被处决以及更激烈的政治斗争，属于其后的阶段。革命不断改变方向，也使不同群体对财产、宗教、政治参与和社会平等的期待相互碰撞。',
            '这场变动削弱了旧有等级与王权秩序，把国家合法性的来源推入公开争论。它在法国及海外引发长期回响，但各地接续这些观念时，也有自己的冲突与选择。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '法国国民议会 · 从三级会议到国民议会（1789—1791）',
        url: 'https://www2.assemblee-nationale.fr/15/evenements/2019/la-revolution-s-affiche/des-etats-generaux-a-l-assemblee-nationale-juin-1789-octobre-1791',
      },
      {
        title: 'OpenStax · World History 2 §7.3（法国革命的起因与阶段）',
        url: 'https://openstax.org/books/world-history-volume-2/pages/7-3-revolutions-america-france-and-haiti',
      },
    ],
  },
  'world-american-independence': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1776年7月4日，大陆会议在费城通过《独立宣言》，向外界说明北美殖民地为什么决定脱离英国。围绕税收、代表权和统治权限的争议此前已升级为战争，宣言把分离的决定转化为一份公开的政治论证。',
          ],
        },
        {
          title: '一份宣言怎样形成',
          paragraphs: [
            '会议先委托五人委员会起草，杰斐逊撰写初稿，亚当斯和富兰克林等参与修改。7月2日，会议先表决独立决议，随后继续审议宣言文字；4日通过后交付印刷，副本再被送往各地议会、委员会和军队。今天著名的羊皮纸签名本，则在稍后誊写，主要签署发生于8月2日。',
          ],
        },
        {
          title: '平等原则留下的问题',
          paragraphs: [
            '宣言以人的权利和被统治者同意为依据，论证改变政府与取得独立的正当性。它同时列出对英国国王的控诉，争取殖民地居民及外部世界理解这一选择。文字的传播，使独立事业有了可以共同引用的原则和理由。',
            '这些原则并未使奴隶制消失，也没有给予妇女和原住民同等的政治地位。宣言中的平等语言与社会现实之间的距离，成为后人持续争论和争取权利的依据。独立本身也仍须经过战争与外交，直到1783年的和约才获得英国承认。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '美国国家档案馆 · Creating the Declaration: A Timeline（起草、通过与签署）',
        url: 'https://www.archives.gov/founding-docs/timeline',
      },
      {
        title: '美国国家档案馆 · Declaration of Independence: A Transcription',
        url: 'https://www.archives.gov/founding-docs/declaration-transcript',
      },
    ],
  },
  'world-darwin': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1859年，达尔文在《物种起源》中系统提出以自然选择解释生物变化的论证。他讨论个体差异、繁殖、资源限制与适应，尝试说明：可以遗传的差异，怎样在许多世代中改变种群，并形成生命的多样性。',
            '这本书来自长期积累。航行见闻、化石与标本、育种实践，以及和其他研究者的通信，都进入他的思考。1858年，华莱士寄来提出相近机制的文章，促成两人有关自然选择的材料在伦敦林奈学会共同公布，也推动达尔文把多年研究整理成较短的著作。',
          ],
        },
        {
          title: '把生命变化变成可以追问的过程',
          paragraphs: [
            '自然选择关注的是特定环境中生存和繁殖的差异。某种可遗传的特征若使个体更可能留下后代，它就可能在以后世代中变得常见；环境和相互关系不同，有利的特征也会不同。这个解释把复杂的适应现象与可以研究的过程联系起来。',
            '出版引发了科学、宗教与公众层面的广泛讨论。达尔文当时还不能充分解释遗传机制，后来的遗传学等研究继续改变演化理论。1859年因而是一个重要的公开论证节点，书所提出的问题与方法，则在后续研究中继续发展。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '剑桥大学 · Darwin Correspondence Project: Origin（1858—1859年的写作与通信）',
        url: 'https://www.darwinproject.ac.uk/letters/darwins-works-letters/origin',
      },
      {
        title: '加州大学古生物博物馆 · Understanding Evolution: Natural Selection',
        url: 'https://evolution.berkeley.edu/evolution-101/mechanisms-the-processes-of-evolution/natural-selection/',
      },
    ],
  },
  'modern-apollo11': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1969年7月16日，阿波罗11号从佛罗里达发射，搭载阿姆斯特朗、奥尔德林和柯林斯前往月球。此前的火箭、飞船、交会与绕月试验，为这次任务逐步验证了条件；地面控制、追踪和工程团队，则在飞行中持续提供支持。',
          ],
        },
        {
          title: '两人降落，一人留在月球轨道',
          paragraphs: [
            '进入月球轨道后，阿姆斯特朗与奥尔德林乘“鹰”号登月舱分离下降，柯林斯驾驶“哥伦比亚”号留在轨道。7月20日，登月舱在静海着陆。数小时后，两人先后走出舱外，采集岩石和土壤、拍摄照片，并布置科学设备。人类由此首次直接在另一个天体表面活动。',
            '任务还必须完成返程。登月舱上升级离开月面，与轨道中的飞船交会对接，三人会合后返回地球，7月24日在太平洋溅落。安全着陆、月面工作、再次起飞和回收，是相互依赖的一整套工程过程。',
          ],
        },
        {
          paragraphs: [
            '带回的样本与观测为研究月球提供了材料，电视传播又让远方的任务进入许多人的生活。登月也处于冷战竞争和大规模公共投入的背景中，既是一项科学工程成就，也体现了国家目标、资源组织与众多人员合作的作用。',
          ],
        },
      ],
      note: '着陆发生于7月20日20:17 UTC，首次踏上月面为7月21日02:56 UTC；美国当地日期仍是20日。地图标记休斯敦任务控制中心，月面着陆地不使用地球经纬度表示。',
    },
    sources: [
      {
        title: 'NASA · Apollo 11 Mission Overview（发射、登月、交会与返回）',
        url: 'https://www.nasa.gov/history/apollo-11-mission-overview/',
      },
      {
        title: 'NASA · Apollo 11 Lunar Surface Journal: Mission Overview（任务时间）',
        url: 'https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11ov.html',
      },
    ],
  },
}
