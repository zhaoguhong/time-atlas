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
      '爱因斯坦出生于乌尔姆，在瑞士求学，曾任职伯尔尼专利局。1905年，他以多篇论文分别讨论光量子、布朗运动与狭义相对论，从微观运动、光和时空关系等方向推动物理学研究。光电效应定律后来成为1921年度诺贝尔物理学奖特别表彰的成果。\n\n1915年形成的广义相对论场方程，把引力与时空几何联系起来。理论推导、数学交流与观测检验共同参与了这一研究的传播。后来，他在普林斯顿继续工作，并围绕量子理论的解释与同行长期争论。',
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
      '牛顿出生于英国伍尔索普，在剑桥学习并任教，以数学方法研究运动、引力和光。他将几何论证、计算与自然现象联系起来，又发展无穷小方法，试图为地面物体和天体运动建立共同解释。\n\n1687年，《自然哲学的数学原理》在哈雷推动下出版，运动定律与万有引力由此进入系统论证。他的研究也涉及神学、炼金术和年代学，后来还从事铸币局工作。其生年采用公历1643年；按当时英国儒略历记载，则为1642年圣诞节。',
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
      '达尔文在爱丁堡与剑桥学习，1831至1836年随“小猎犬”号航行，观察地质、动植物和珊瑚礁。标本和旅途中的问题成为长期研究的起点；返回英国后，他继续通过育种、植物实验及通信网络比较生物差异。\n\n1858年，华莱士的来信促使自然选择学说走向公开讨论，次年《物种起源》出版。繁殖、变异与环境条件怎样共同影响生物，是这套解释的核心。他后来继续研究人类、情绪和其他生命问题，使理论在新的材料中发展。',
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
      '伽利略在比萨和帕多瓦任教，研究运动、测量与仪器。获知荷兰望远镜的消息后，他改进仪器并转向天空，观察月面起伏与木星卫星，把这些新材料写入1610年的《星际信使》。观察工具由此改变了天体结构争论的证据条件。\n\n他对哥白尼体系的支持，与教会权威、经文解释和当时的科学争议发生冲突。晚年在受限制的环境中，他仍继续研究运动。其工作将仪器制作、数学分析与公开讨论连接起来，成为近代自然研究的重要部分。',
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
      '开普勒在数学和天文学研究中追求宇宙的秩序，与第谷·布拉赫合作后，利用精密观测反复计算火星运动。1609年的《新天文学》以椭圆轨道和面积定律解释行星位置，改变了坚持匀速圆周运动的传统方案。\n\n1619年，《宇宙和谐论》提出第三定律，把周期与轨道尺度联系起来。他还研究光学，编制1627年出版的《鲁道夫星表》。模型与观测不断互相校正，同时保留其对宇宙和谐的宗教与哲学关切。',
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
      '玛丽·居里原名玛丽亚·斯克沃多夫斯卡，出生于华沙，后来赴巴黎求学。她从贝克勒尔发现的铀辐射出发测量矿物，与皮埃尔·居里等合作者识别钋和镭，再通过艰难的分离、制备与测定工作研究这些元素的性质。\n\n物理学和化学两个领域的诺贝尔奖先后认可其成果，研究组织与应用也逐渐成为工作的一部分。第一次世界大战期间，她与女儿伊雷娜推动流动X射线设备用于伤员检查并培训操作人员，将实验知识带入医疗实践。',
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
      '达·芬奇出生于芬奇一带，在佛罗伦萨韦罗基奥的作坊学习，后来服务米兰宫廷，从事绘画、雕塑、工程与舞台设计。不同委托让观察、制作和艺术表达互相进入他的工作。《最后的晚餐》以姿态和空间安排组织人物反应，体现其对观看与情感表达的研究。\n\n手稿记录他对水流、机械、人体和自然现象的反复观察，也保留许多尚未实现的构想。晚年他前往法国，1519年去世。作坊训练、宫廷资源与持续的个人研究，共同支持了这些跨领域探索。',
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
      '米开朗琪罗出生于卡普雷塞，先学习绘画，随后在美第奇家族赞助的环境中研习雕塑。他往返佛罗伦萨与罗马，为宗教和政治委托制作作品，《圣殇》等早期雕塑以人体和材料处理表达宗教情感，也建立了他的声誉。\n\n1508至1512年，他为西斯廷礼拜堂穹顶绘制《创世记》等旧约场景，以复杂姿态和大规模构图组织人物。此后，雕塑、建筑与诗歌继续并行，委托变动和未竟项目也贯穿其生涯，显示创作与权力、资源之间的联系。',
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
      '梵高出生于荷兰，做过艺术品交易和宗教工作，后来转向绘画。早期乡村与农民题材多用沉厚色调，1886年抵达巴黎后，印象派、日本版画和同行探索促使他采用更明亮的颜色与更显著的笔触。1888年，他前往阿尔勒。\n\n此后在圣雷米等地的作品不断结合观察、记忆和想象。《星夜》重新组织村庄与天空，书信则记录了他对色彩和工作的思考。画面背后既有个人处境，也有反复练习和具体选择，这些劳动构成理解其艺术的重要线索。',
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
      '莫扎特出生于萨尔茨堡，在父亲利奥波德的音乐教育中成长，童年与姐姐南内尔随家人巡演。不同地区的听众、演奏者和音乐传统，成为其学习与创作的条件。歌剧、交响曲、协奏曲和室内乐在他的工作中不断交汇。\n\n1791年的《魔笛》把他的音乐、席卡内德的剧本与剧团表演结合为面向公众的德语歌唱剧。喜剧、考验与庄严场景通过不同声音和舞台行动展开，呈现出作曲、演出与剧场合作共同塑造作品的过程。',
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
      '莎士比亚来自埃文河畔斯特拉特福，后来在伦敦兼任演员、剧作家和剧团合伙人。悲剧、喜剧与历史剧都在剧场合作中形成，语言、演员和观众的关系参与了作品的写作与修改。\n\n《哈姆雷特》等剧将复仇、行动、权力与表演的问题交给不同人物展开，演出和印刷又留下不同文本。他去世后，同行于1623年刊行第一对开本，保存了许多剧作。1564年4月26日的受洗记录可以确认，确切生日及部分早年经历仍不清楚。',
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
      '雨果出生于贝桑松，以诗歌、戏剧与小说参与法国浪漫主义。他的政治立场从早年保王倾向逐步转向共和和社会改革，1851年反对路易-拿破仑政变后，先后流亡比利时、泽西与根西，后来返回法国并任参议员。\n\n《悲惨世界》从贫困、刑罚和个人责任讨论社会正义，《静观集》等诗作则写出家庭丧失与记忆。他也通过公共论说反对死刑，支持教育和言论自由，使文学表达与政治行动持续相连。',
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
