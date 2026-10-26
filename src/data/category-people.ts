import type { Person, Source } from '../types'

const mactutor = (slug: string, name: string, note: string): Source => ({
  title: `University of St Andrews · MacTutor · ${name}`,
  url: `https://mathshistory.st-andrews.ac.uk/Biographies/${slug}/`,
  note,
})

// Authorship and research links below are reading relationships, not journey evidence.
export const categoryPeople: Person[] = [
  {
    id: 'category-person-einstein',
    name: '阿尔伯特·爱因斯坦',
    aliases: ['爱因斯坦', 'Albert Einstein', 'Einstein'],
    birth: 1879,
    death: 1955,
    role: '物理学家',
    era: '欧洲与美国 · 十九至二十世纪',
    color: '#4f7897',
    recordKind: 'curated',
    summary: '研究相对论、光量子与统计物理的物理学家，以理论分析重新讨论空间、时间、引力和物质。',
    biography:
      '爱因斯坦出生于乌尔姆，在瑞士求学并曾任职于伯尔尼专利局。1905年的论文分别讨论光电效应、布朗运动和狭义相对论，从不同方向研究光、物质与运动。1921年度诺贝尔物理学奖特别表彰其光电效应定律，并非以广义相对论作为授奖理由。\n\n他在1915年形成广义相对论的最终场方程，把引力研究与时空几何联系起来；这项工作也依赖当时的数学发展和同行交流。后来他在普林斯顿继续研究，并参与关于量子理论解释的争论。理解这些成果需要区分理论提出、观测检验和公众接受的不同过程。',
    sources: [
      mactutor(
        'Einstein',
        'Albert Einstein',
        '生卒、1905年论文、1915年广义相对论与1921年度诺奖的授奖内容。',
      ),
    ],
  },
  {
    id: 'category-person-newton',
    name: '艾萨克·牛顿',
    aliases: ['牛顿', 'Isaac Newton', 'Newton'],
    birth: 1643,
    death: 1727,
    role: '数学家、自然哲学家',
    era: '欧洲 · 十七至十八世纪',
    color: '#4f7897',
    recordKind: 'curated',
    summary: '以数学方法研究运动、引力与光，1687年出版《自然哲学的数学原理》。',
    biography:
      '牛顿在英国伍尔索普出生，后在剑桥学习并任教。他把几何论证、数学计算和自然现象的研究结合起来，研究运动、引力、光学与无穷小方法。其出生日期按当时英国使用的儒略历记为1642年圣诞节，换算公历为1643年1月4日；本站生年采用后者。\n\n1687年的《自然哲学的数学原理》在哈雷推动下问世，以运动定律和万有引力讨论地面物体及天体运动。他的研究还涉及神学、炼金术与年代学，后来从事铸币局工作。将他置于十七世纪知识与制度的环境中，才能理解这些研究为何在其生活中并存。',
    sources: [
      mactutor(
        'Newton',
        'Isaac Newton',
        '生卒采用换算公历1643—1727；传记明确当时英国旧历出生记1642年，另述1687年《原理》与研究、任职。',
      ),
    ],
  },
  {
    id: 'category-person-darwin',
    name: '查尔斯·达尔文',
    aliases: ['达尔文', 'Charles Darwin', 'Charles Robert Darwin'],
    birth: 1809,
    death: 1882,
    role: '博物学家',
    era: '欧洲 · 十九世纪',
    color: '#557b63',
    recordKind: 'curated',
    summary: '通过航海观察、标本、实验与通信研究生物变化，1859年出版《物种起源》。',
    biography:
      '达尔文出生于什鲁斯伯里，曾在爱丁堡与剑桥学习。1831至1836年随“小猎犬”号航行，考察地质、动植物与珊瑚礁，积累了此后长期研究的标本和问题。他返回英国后整理这些材料，并通过育种、植物实验和广泛通信继续研究物种的变化。\n\n1858年华莱士的来信促使自然选择学说走向公开讨论，次年《物种起源》出版。达尔文后来仍研究变异、人类和情绪等主题，不能把1859年当作其研究的终点。自然选择讨论繁殖、差异与环境条件，也不能直接等同于后人用来论证社会强弱等级的口号。',
    sources: [
      {
        title: 'University of Cambridge · Darwin Correspondence Project · About Darwin',
        url: 'https://www.darwinproject.ac.uk/people/about-darwin',
        note: '生卒、1831—1836年航行、标本与通信网络、华莱士1858年来信及1859年出版。',
      },
    ],
  },
  {
    id: 'category-person-galileo',
    name: '伽利略·伽利莱',
    aliases: ['伽利略', 'Galileo Galilei', 'Galileo'],
    birth: 1564,
    death: 1642,
    role: '天文学家、自然哲学家',
    era: '欧洲 · 十六至十七世纪',
    color: '#4f7897',
    recordKind: 'curated',
    summary: '改进望远镜用于天文观察，并以数学和实验研究运动，1610年出版《星际信使》。',
    biography:
      '伽利略出生于比萨，曾在比萨和帕多瓦任教。他研究运动、测量与仪器，在获知荷兰望远镜的消息后改进仪器并用于天文观察。月面起伏、木星卫星等发现进入1610年的《星际信使》，为关于天体结构的争论提供了新的观察材料。\n\n这些成果并不意味着他发明了望远镜，也不意味着一种仪器能独自解决全部宇宙论问题。他对哥白尼体系的支持与当时教会权威、经文解释及证据争议发生冲突，晚年在受限制的环境中继续研究。其工作连接了仪器制作、数学论证和公开讨论。',
    sources: [
      mactutor(
        'Galileo',
        'Galileo Galilei',
        '生卒、任教、1609年望远镜改进、1610年《星际信使》与运动研究；不采用页面内部有出入的出版月份。',
      ),
    ],
  },
  {
    id: 'category-person-kepler',
    name: '约翰内斯·开普勒',
    aliases: ['开普勒', 'Johannes Kepler', 'Kepler'],
    birth: 1571,
    death: 1630,
    role: '天文学家、数学家',
    era: '欧洲 · 十六至十七世纪',
    color: '#4f7897',
    recordKind: 'curated',
    summary: '利用第谷观测研究行星轨道，在1609年和1619年分阶段提出行星运动定律。',
    biography:
      '开普勒出生于魏尔德尔施塔特，在数学和天文学研究中探索宇宙的秩序。他与第谷·布拉赫合作，并利用精密观测反复计算火星运动。1609年的《新天文学》提出椭圆轨道和面积定律，改变了用匀速圆周组合解释行星位置的传统路径。\n\n第三定律见于1619年的《宇宙和谐论》，不能把三条定律都归到1609年。他还研究光学，并编制1627年出版的《鲁道夫星表》。这些成果既体现数学模型与观测数据的相互校正，也保留了作者关于宇宙和谐的宗教与哲学关切。',
    sources: [
      mactutor(
        'Kepler',
        'Johannes Kepler',
        '生卒、与第谷的工作、1609及1619年定律、光学著作与1627年星表。',
      ),
    ],
  },
  {
    id: 'category-person-marie-curie',
    name: '玛丽·居里',
    aliases: ['居里夫人', '玛丽居里', 'Marie Curie', 'Maria Skłodowska', 'Marie Skłodowska Curie'],
    birth: 1867,
    death: 1934,
    role: '物理学家、化学家',
    era: '欧洲 · 十九至二十世纪',
    color: '#557b63',
    recordKind: 'curated',
    summary: '以放射性研究连接物理与化学，与皮埃尔·居里等人共同发现钋和镭。',
    biography:
      '玛丽·居里原名玛丽亚·斯克沃多夫斯卡，出生于华沙，后来在巴黎学习和研究。她在贝克勒尔发现铀辐射的基础上测量矿物的放射性，与皮埃尔·居里等合作者识别出钋和镭。报告新元素的证据与后续分离、制备和测定性质，是相互关联而不同的研究阶段。\n\n她的工作获得物理学和化学两个领域的诺贝尔奖认可，也延伸到研究组织与实际应用。第一次世界大战期间，她与女儿伊雷娜推动流动X射线设备用于伤员检查，并培训操作者。其经历同时呈现实验工作的协作、研究条件的约束与女性进入科学机构的路径。',
    sources: [
      {
        title: 'Oxford University Museum of Natural History · Marie Curie',
        url: 'https://oumnh.ox.ac.uk/learn-marie-curie',
        note: '核对1867—1934年、放射性合作研究、两个科学领域诺奖与战时X射线工作；该页赴巴黎年份有误，未采纳。',
      },
      {
        title: 'Musée d’Orsay · Marie Curie (203740)',
        url: 'https://www.musee-orsay.fr/fr/ressources/repertoire-artistes-personnalites/marie-curie-203740',
        note: '人物规范记录核对原名、生卒年、华沙出生及波兰出生后归化法国的身份。',
      },
    ],
  },
  {
    id: 'category-person-leonardo',
    name: '列奥纳多·达·芬奇',
    aliases: ['达·芬奇', '达芬奇', '莱昂纳多·达·芬奇', 'Leonardo da Vinci', 'Leonardo'],
    birth: 1452,
    death: 1519,
    role: '画家、工程与自然研究者',
    era: '欧洲 · 十五至十六世纪',
    color: '#9a6d51',
    recordKind: 'curated',
    summary:
      '在绘画、机械、人体与自然观察之间持续探索的文艺复兴艺术家，《最后的晚餐》为其代表作品。',
    biography:
      '达·芬奇出生于芬奇一带，青年时在佛罗伦萨韦罗基奥的作坊学习。他后来服务于米兰宫廷，兼顾绘画、雕塑、工程和舞台设计等工作。《最后的晚餐》把人物姿态、空间组织与叙事时刻结合起来，体现其对观看方式与情感表达的长期研究。\n\n他的手稿记录了对机械、水流、人体和其他自然现象的观察与构想，但纸面设计不能一概视为已经建成或实际可用的机器。晚年他前往法国并于1519年去世。其跨领域工作既与个人的观察方法相关，也依赖作坊、宫廷委托和当时的技术条件。',
    sources: [
      {
        title: 'Museo Leonardiano di Vinci · Leonardo’s biography',
        url: 'https://museoleonardiano.it/en/leonardo-in-vinci/biografia/',
        note: '1452—1519年、韦罗基奥作坊、米兰多种职务、《最后的晚餐》与1516年赴法国。',
      },
    ],
  },
  {
    id: 'category-person-michelangelo',
    name: '米开朗琪罗·博纳罗蒂',
    aliases: ['米开朗琪罗', '米开朗基罗', 'Michelangelo', 'Michelangelo Buonarroti'],
    birth: 1475,
    death: 1564,
    role: '雕塑家、画家、建筑师',
    era: '欧洲 · 十五至十六世纪',
    color: '#9a6d51',
    recordKind: 'curated',
    summary: '在雕塑、壁画、建筑与诗歌中工作的文艺复兴艺术家，1508至1512年绘制西斯廷礼拜堂穹顶。',
    biography:
      '米开朗琪罗出生于卡普雷塞，先在吉兰达约门下学习绘画，随后在美第奇家族赞助的环境中研习雕塑。他往返佛罗伦萨与罗马，为宗教和政治委托制作作品。罗马的《圣殇》等雕塑体现其对人体、材料和宗教情感的处理，也确立了其早期声誉。\n\n1508至1512年，他为西斯廷礼拜堂穹顶绘制《创世记》等旧约场景，以复杂姿态和大规模构图组织众多人物。他也从事建筑设计和诗歌写作，长年面对委托变动与未竟项目。研究这些作品时，需要区分不同委托、施工阶段及后来艺术家对其形式的借鉴。',
    sources: [
      {
        title: 'National Gallery, London · Michelangelo',
        url: 'https://www.nationalgallery.org.uk/artists/Michelangelo',
        note: '1475—1564年、绘画和雕塑训练、《圣殇》、1508—1512年穹顶与建筑、诗歌工作。',
      },
    ],
  },
  {
    id: 'category-person-van-gogh',
    name: '文森特·梵高',
    aliases: ['梵高', '凡高', 'Vincent van Gogh', 'Van Gogh'],
    birth: 1853,
    death: 1890,
    role: '画家',
    era: '欧洲 · 十九世纪',
    color: '#9a6d51',
    recordKind: 'curated',
    summary: '以色彩、笔触和自然题材探索表达的荷兰画家，1889年在圣雷米绘制《星夜》。',
    biography:
      '梵高出生于荷兰，早年曾从事艺术品交易和宗教工作，后来转向绘画。其早期乡村与农民题材多用沉厚色调；1886年抵达巴黎后，他接触印象派、日本版画及其他艺术家的探索，逐渐采用更明亮的色彩和更显著的笔触。1888年，他前往法国南部阿尔勒。\n\n此后在圣雷米等地的创作把观察与记忆、想象结合起来，《星夜》的村庄和天空经过重新组织。其书信保留了关于色彩与工作的思考，说明画面表达背后也有反复练习和具体选择。把作品简单归因于精神疾病，会遮蔽这些可从画作与文献中研究的劳动。',
    sources: [
      {
        title: 'National Gallery of Art · Vincent van Gogh',
        url: 'https://www.nga.gov/artists/1349-vincent-van-gogh',
        note: '1853—1890年、早期职业、1886年巴黎、1888年阿尔勒与色彩、笔触的变化。',
      },
      {
        title: 'Museum of Modern Art · The Starry Night',
        url: 'https://www.moma.org/collection/works/79802',
        note: '核对圣雷米1889年《星夜》、观察与想象的结合，以及书信和持续作画的记录。',
      },
    ],
  },
  {
    id: 'category-person-mozart',
    name: '沃尔夫冈·阿马德乌斯·莫扎特',
    aliases: ['莫扎特', 'Wolfgang Amadeus Mozart', 'Mozart'],
    birth: 1756,
    death: 1791,
    role: '作曲家、演奏家',
    era: '欧洲 · 十八世纪',
    color: '#9a6d51',
    recordKind: 'curated',
    summary: '创作歌剧、交响曲、协奏曲和室内乐的作曲家，《魔笛》于1791年在维也纳首演。',
    biography:
      '莫扎特出生于萨尔茨堡，在父亲利奥波德的音乐教育和家庭演出环境中成长。童年曾与姐姐南内尔随家人巡演，接触不同地区的听众和音乐传统。其作品跨越歌剧、交响曲、协奏曲与室内乐，既体现作曲技巧，也与演奏、委托和出版的条件相联系。\n\n1791年的《魔笛》由他谱曲，与席卡内德的剧本及剧团表演共同构成面向公众的德语歌唱剧。作品中的喜剧、考验与庄严场景依靠音乐和舞台合作展开。理解其创作应同时关注乐谱、歌词、演出者与剧场，不能只用早慧传说替代对具体作品的阅读。',
    sources: [
      {
        title: 'International Mozarteum Foundation · Wolfgang Amadé Mozart',
        url: 'https://mozarteum.at/en/wolfgang-amade-mozart',
        note: '1756—1791年、音乐家庭、南内尔及家庭巡演；与父亲同页介绍的1756年小提琴教材不是他的作品。',
      },
      {
        title: 'Mozarteum Foundation · Köchel catalogue KV 620',
        url: 'https://kv.mozarteum.at/en/work/die-zauberflote-7137',
        note: '《魔笛》作品目录KV 620；谱曲、剧本作者及创作与首演纪年的区别参见关联事件。',
      },
    ],
  },
  {
    id: 'category-person-shakespeare',
    name: '威廉·莎士比亚',
    aliases: ['莎士比亚', 'William Shakespeare', 'Shakespeare'],
    birth: 1564,
    death: 1616,
    role: '剧作家、诗人、演员',
    era: '欧洲 · 十六至十七世纪',
    color: '#9a6d51',
    recordKind: 'curated',
    summary:
      '活跃于伦敦商业剧场的剧作家、演员和剧团合伙人，《哈姆雷特》等作品长期在舞台和阅读中流传。',
    biography:
      '莎士比亚来自埃文河畔斯特拉特福，1564年4月26日受洗，确切生日没有可靠记录。他后来在伦敦从事戏剧，兼有演员、剧作家和剧团合伙人等身份。现存材料中有其早期活动的空白，不能用后世传说填满这些缺口，也不能把传统的4月23日当作已证实生日。\n\n其戏剧在演出与印刷中形成不同文本，悲剧、喜剧和历史剧都与当时的剧场合作环境相关。《哈姆雷特》中的复仇、行动和表演问题持续引发解释，而人物台词并不自动等同于作者的个人观点。他去世后，同行在1623年刊行第一对开本，使许多剧作得以保存。',
    sources: [
      {
        title: 'Folger Shakespeare Library · Shakespeare’s life',
        url: 'https://www.folger.edu/explore/shakespeares-life/',
        note: '1564年洗礼与生日不确定性、1616年逝世、伦敦戏剧职业、剧团关系及1623年第一对开本。',
      },
      {
        title: 'Royal Shakespeare Company · Hamlet: Dates and sources',
        url: 'https://www.rsc.org.uk/hamlet/about-the-play/dates-and-sources',
        note: '《哈姆雷特》约1601年的创作估计与早期登记、版本；不把创作约年当确日。',
      },
    ],
  },
  {
    id: 'category-person-hugo',
    name: '维克多·雨果',
    aliases: ['雨果', 'Victor Hugo', 'Victor-Marie Hugo'],
    birth: 1802,
    death: 1885,
    role: '作家、公共政治参与者',
    era: '欧洲 · 十九世纪',
    color: '#9a6d51',
    recordKind: 'curated',
    summary: '法国浪漫主义作家，以诗歌、戏剧和小说关注社会与个人命运，亦长期参与公共政治。',
    biography:
      '雨果出生于贝桑松，在诗歌、戏剧和小说中写作，是法国浪漫主义的重要人物。他的政治立场在一生中发生变化，从早年的保王倾向逐步转向共和与社会改革议题。1851年反对路易-拿破仑政变后，他先后流亡比利时、泽西和根西，后来返回法国并任参议员。\n\n《悲惨世界》通过贫困、刑罚与个人责任讨论社会正义；《静观集》等作品也呈现家庭丧失与记忆。他在公共论说中反对死刑、为教育与言论自由发声。小说的出版地点、人物行动的地点和作者当时的居住地应分别考察，文学场景不能直接变成其本人行程。',
    sources: [
      {
        title: 'Archives du Sénat · Victor Hugo, écrivain et sénateur',
        url: 'https://archives.senat.fr/en-2025-le-senat-fete-ses-150-ans/victor-hugo-ecrivain-et-senateur.html',
        note: '1802—1885年、文学作品、政治立场变化、1851年后流亡及回国后的参议员任职。',
      },
    ],
  },
]

export const categoryEventPeople: Record<string, string[]> = {
  'modern-general-relativity': ['category-person-einstein'],
  'world-newton': ['category-person-newton'],
  'world-darwin': ['category-person-darwin'],
  'category-galileo': ['category-person-galileo'],
  'depth-kepler-new-astronomy': ['category-person-kepler'],
  'category-curie': ['category-person-marie-curie'],
  'depth-leonardo-supper': ['category-person-leonardo'],
  'depth-sistine-ceiling': ['category-person-michelangelo'],
  'depth-van-gogh-starry-night': ['category-person-van-gogh'],
  'depth-mozart-magic-flute': ['category-person-mozart'],
  'depth-hamlet': ['category-person-shakespeare'],
  'depth-les-miserables': ['category-person-hugo'],
}

export const categoryPeopleNotes: Record<string, string> = {
  'modern-general-relativity':
    '关联爱因斯坦为理论研究者；本条理论发表节点不独立证明其在事件坐标的具体活动。',
  'world-newton': '关联牛顿为《原理》作者；出版地点与作者当时的居住或任职地点应分别核对。',
  'world-darwin':
    '关联达尔文为《物种起源》作者；伦敦出版节点不等于本人在伦敦，年谱需另据活动记录。',
  'category-galileo': '关联伽利略为《星际信使》作者；出版关系本身不作为其行程证据。',
  'depth-kepler-new-astronomy': '关联开普勒为《新天文学》作者；海德堡出版地不表示作者当年在该地。',
  'category-curie':
    '关联玛丽·居里为共同研究者；研究亦涉及皮埃尔·居里等合作者，镭报告另有贝蒙参与；不将共同成果归为她一人，也不据此生成个人行程。',
  'depth-leonardo-supper': '关联达·芬奇为作品创作者；这里的作品关系不替代独立活动记录。',
  'depth-sistine-ceiling': '关联米开朗琪罗为穹顶壁画创作者；施工区间与个人逐年活动仍需各自证据。',
  'depth-van-gogh-starry-night':
    '关联梵高为画作作者；事件是作品节点，不据画面中的地景推定个人行程。',
  'depth-mozart-magic-flute':
    '关联莫扎特为作曲者，席卡内德为剧本作者；首演节点本身不作为作曲者到场证据。',
  'depth-hamlet':
    '关联莎士比亚为剧作作者；约略创作年、登记年、刊印年应区别，也不据剧情地名生成作者行程。',
  'depth-les-miserables':
    '关联雨果为小说作者；巴黎与布鲁塞尔是出版网络参照，小说情节或出版点不证明作者在场。',
}
