import type { HistoryEvent } from '../types'

// Original concise Chinese readings; all coordinates are representative map anchors.
export const worldAtlanticEvents: HistoryEvent[] = [
  {
    id: 'world-hastings',
    year: 1066,
    title: '黑斯廷斯之战与诺曼征服',
    category: '战争',
    region: 'europe',
    themes: ['英国', '王权'],
    location: '黑斯廷斯附近的巴特尔',
    coordinates: [0.49, 50.91],
    summary: '诺曼底公爵威廉击败英格兰国王哈罗德，随后取得王位，英格兰统治集团发生重大更替。',
    background:
      '英格兰王位继承引发多方竞争。哈罗德刚在北方击败挪威入侵者，又率军南下迎战诺曼军队。',
    details: [
      '战场位于今天巴特尔一带，后来建起修道院。征服推动了土地分配、贵族权力和城堡建设的变化，但不能把一次战役等同于所有地方立即服从。',
    ],
    impact: '英格兰与法国北部的王朝联系更紧密，语言、土地制度与政治文化在此后数代中逐步改变。',
    importance: 5,
    sources: [
      {
        title: '英国历史遗产委员会 · History of Battle Abbey and Battlefield',
        url: 'https://www.english-heritage.org.uk/visit/places/1066-battle-of-hastings-abbey-and-battlefield/history-and-stories/history/',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
    relatedEvents: [
      {
        id: 'world-magna-carta',
        label: '王权变化的长期对照',
        note: '两条记录相隔约一个半世纪，便于比较征服王权与后来贵族、国王的权力争议，不表示简单的直接因果。',
      },
    ],
  },
  {
    id: 'world-hundred-years-war',
    year: 1337,
    endYear: 1453,
    dateLabel: '1337—1453年',
    dateNote: '通用起讫年概括多轮战争与停战；并非连续作战一百多年。',
    title: '英法百年战争',
    category: '战争',
    region: 'europe',
    themes: ['英法', '王权'],
    location: '英法战区（以奥尔良为参照）',
    coordinates: [1.91, 47.9],
    summary: '英法王室围绕王位和领土展开多轮战争，战事反复影响法国大片地区。',
    background:
      '英格兰国王同时在法国持有领地，封建从属、继承权与财政利益纠缠，冲突难以通过单次谈判解决。',
    details: [
      '长弓、城堡围攻和火炮都在战争中发挥作用。最终法国王权收复大部分失地；漫长战事也造成征税、抢掠和人口流离，不能只从著名将领理解这段历史。',
    ],
    impact: '战争改变了两国王权组织与军事动员方式，也为后来英法政治关系留下长期影响。',
    importance: 5,
    sources: [
      {
        title: '英国皇家军械博物馆 · The Hundred Years’ War',
        url: 'https://royalarmouries.org/objects-and-stories/stories/the-hundred-years-war-1337-1453',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-granada',
    year: 1492,
    title: '格拉纳达纳斯尔王朝结束',
    category: '政治',
    region: 'europe',
    themes: ['伊比利亚', '宗教与政治'],
    location: '格拉纳达',
    coordinates: [-3.59, 37.18],
    summary: '卡斯蒂利亚与阿拉贡君主取得格拉纳达，伊比利亚半岛最后的穆斯林王国结束。',
    background:
      '半岛各王国经历长期竞争。格拉纳达逐渐成为穆斯林人口汇聚之地，阿尔罕布拉宫是纳斯尔王权的中心。',
    details: [
      '征服后宫城转为基督教王室使用。政权结束并不意味着当地穆斯林文化和居民生活在同一年消失；建筑、手工业与社区的历史仍继续发展。',
    ],
    impact: '半岛政治格局进一步整合，宗教身份与王权之间的关系也进入新的阶段。',
    importance: 5,
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
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-circumnavigation',
    year: 1519,
    endYear: 1522,
    dateLabel: '1519—1522年',
    dateNote: '标注远航的起讫区间；麦哲伦于途中去世，返航由埃尔卡诺等人完成。',
    title: '麦哲伦—埃尔卡诺船队完成环球航行',
    category: '交流',
    region: 'europe',
    themes: ['航海', '全球联系'],
    location: '桑卢卡尔（出入海口参照）',
    coordinates: [-6.35, 36.78],
    summary: '受西班牙王室资助的船队寻找通往香料群岛的西向海路，幸存者最终绕行全球返回。',
    background: '欧洲君主与商人竞逐远洋贸易，西向航行试图突破既有海路和势力范围的限制。',
    details: [
      '船队穿过南美海峡进入太平洋，经历饥饿、冲突与大量死亡。麦哲伦死于菲律宾，埃尔卡诺指挥维多利亚号经印度洋回航，不能称为麦哲伦本人完成环球。',
    ],
    impact: '远航加深了对海洋距离与全球地理的认识，也伴随殖民竞争和对沿途社会的暴力介入。',
    importance: 5,
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
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
    relatedEvents: [
      {
        id: 'world-columbus',
        label: '另一条远洋航行',
        note: '两次航行展现不同阶段的海洋知识和殖民竞争，沿途各社会拥有自己的历史。',
      },
    ],
  },
  {
    id: 'world-dutch-abjuration',
    year: 1581,
    title: '尼德兰签署《弃绝法案》',
    category: '政治',
    region: 'europe',
    themes: ['尼德兰', '制度'],
    location: '海牙',
    coordinates: [4.31, 52.08],
    summary: '反叛的尼德兰各省宣布不再效忠西班牙国王腓力二世，走向共和国政治。',
    background: '宗教分歧、税收和地方权利引发长期冲突，各省在反对西班牙统治的过程中建立合作。',
    details: [
      '共同声明没有消除各省差异，省份、城市与奥兰治家族继续分配权力。法案是独立进程的重要节点，后续战争和国际承认仍延续多年。',
    ],
    impact: '共和国成为欧洲重要的海上贸易与金融力量，其联合体结构也展示了王朝国家之外的政治道路。',
    importance: 4,
    sources: [
      {
        title: '荷兰国立博物馆 · The Republic',
        url: 'https://www.rijksmuseum.nl/en/collection/node/The-Republic--2447420802fc4934bd9db55c8c6cc003',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-spanish-armada',
    year: 1588,
    title: '西班牙无敌舰队远征失败',
    category: '战争',
    region: 'europe',
    themes: ['英西', '海洋'],
    location: '英吉利海峡（格拉夫林附近）',
    coordinates: [2.1, 51.03],
    summary: '西班牙舰队未能接应登陆部队进攻英格兰，在海战、补给困难与返航风暴中遭到重大损失。',
    background: '宗教与王位冲突、英格兰对尼德兰反叛的支持，以及海上袭击，共同推动英西对抗。',
    details: [
      '远征需要舰队与驻佛兰德陆军配合，英荷行动使会合困难。英格兰防御成功具有重大意义，但并不表示西班牙海上力量在这一年完全消失。',
    ],
    impact: '入侵计划失败巩固了伊丽莎白一世的统治，英西之间的战争和海上竞争仍继续。',
    importance: 4,
    sources: [
      {
        title: '英国议会 · Armada Tapestries: History',
        url: 'https://armada.parliament.uk/history.html',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-thirty-years-war',
    year: 1618,
    endYear: 1648,
    dateLabel: '1618—1648年',
    dateNote: '这是包含不同战区与多次结盟变化的战争区间，停战并不在所有地方同时发生。',
    title: '三十年战争',
    category: '战争',
    region: 'europe',
    themes: ['宗教与政治', '欧洲秩序'],
    location: '中欧战区（以布拉格为参照）',
    coordinates: [14.42, 50.08],
    summary: '神圣罗马帝国内的宗教与政治冲突扩大为多国战争，德意志地区承受严重破坏。',
    background:
      '天主教、新教诸侯与皇权存在长期矛盾，丹麦、瑞典和法国等也追求各自的安全与领土利益。',
    details: [
      '参战阵营并不完全按宗教划分，天主教法国也支持反哈布斯堡力量。雇佣军征发、疾病和农业破坏使平民付出巨大代价，最后通过多项和约逐步结束主要战事。',
    ],
    impact: '威斯特伐利亚和约调整帝国与列强关系，显示信仰、王朝和国家利益在欧洲政治中的交织。',
    importance: 5,
    sources: [
      {
        title: 'OpenStax · World History 2 · The Protestant Reformation',
        url: 'https://openstax.org/books/world-history-volume-2/pages/5-1-the-protestant-reformation',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
    relatedEvents: [
      {
        id: 'world-westphalia',
        label: '战争的主要和解安排',
        note: '1648年的多项和约结束主要战事并调整欧洲政治关系。',
      },
    ],
  },
  {
    id: 'world-british-civil-wars',
    year: 1642,
    endYear: 1651,
    dateLabel: '1642—1651年',
    dateNote: '通用区间覆盖数次内战；苏格兰、爱尔兰的相关冲突另有更早起点。',
    title: '英国内战与三王国战争',
    category: '战争',
    region: 'europe',
    themes: ['英国', '制度'],
    location: '英伦三国（以伦敦为参照）',
    coordinates: [-0.13, 51.51],
    summary: '王权与议会的矛盾转为战争，英格兰、苏格兰和爱尔兰都被卷入，君主制一度被废除。',
    background: '征税、宗教改革和统治方式引发不满，查理一世与议会无法就权力分配达成稳定妥协。',
    details: [
      '战争并非一场单一的英格兰战役，联盟随着地区利益而变化。新模范军的兴起和国王被处死改变了政治，但军事胜利并未立即建立普遍的民主制度。',
    ],
    impact: '战争使常备军与政治权力更紧密，也让王权、议会和民众参与之间的关系成为公开争论的核心。',
    importance: 5,
    sources: [
      {
        title: '英国国家陆军博物馆 · British Civil Wars',
        url: 'https://www.nam.ac.uk/explore/british-civil-wars',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
    relatedEvents: [
      {
        id: 'world-glorious-revolution',
        label: '后来的王权与议会重组',
        note: '内战和光荣革命是不同阶段，期间还经历王政复辟，不能视为连续不变的运动。',
      },
    ],
  },
  {
    id: 'world-glorious-revolution',
    year: 1688,
    endYear: 1689,
    dateLabel: '1688—1689年',
    dateNote: '区间标记王位更替及其主要制度安排；相关战争与权力调整此后仍继续。',
    title: '光荣革命与《权利法案》',
    category: '政治',
    region: 'europe',
    themes: ['英国', '制度'],
    location: '伦敦',
    coordinates: [-0.13, 51.51],
    summary: '詹姆斯二世出逃后，议会安排威廉与玛丽承继王位，王权受到新的制度约束。',
    background: '国王的宗教政策与统治方式加剧冲突，政治危机同荷兰介入及欧洲战争相联系。',
    details: [
      '议会在王位继承和臣民权利方面获得更大的作用，财政实践也逐步改变王权与议会的关系。光荣是后来的政治称谓，不能据此认为整个过程和所有地区都没有暴力。',
    ],
    impact: '此后英国宪政的发展有了新的基础，但政治权利仍受宗教、财产与身份等限制。',
    importance: 5,
    sources: [
      {
        title: '英国议会 · Overview of the Glorious Revolution',
        url: 'https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/revolution/overview/',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-saint-petersburg',
    year: 1703,
    title: '彼得一世营建圣彼得堡',
    category: '政治',
    region: 'europe',
    themes: ['俄罗斯', '城市'],
    location: '圣彼得堡',
    coordinates: [30.32, 59.94],
    summary: '彼得一世在涅瓦河口启动大规模城市建设，新的港口和政治中心体现俄罗斯面向欧洲的转变。',
    background: '俄罗斯希望扩大波罗的海联系，并通过军事、行政与文化改革增强国家力量。',
    details: [
      '河道、堡垒、造船与宫殿构成持续多代的营建工程。城市结合俄国与西欧建筑传统，1703年是建设的起点，不能把后来的完整城市视为当年已经建成。',
    ],
    impact: '圣彼得堡成为俄罗斯重要的首都与贸易窗口，帝国政治和欧洲交流在此汇聚。',
    importance: 4,
    sources: [
      {
        title: 'UNESCO · Historic Centre of Saint Petersburg and Related Groups of Monuments',
        url: 'https://whc.unesco.org/en/list/540/',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-partitions-poland',
    year: 1772,
    endYear: 1795,
    dateLabel: '1772—1795年',
    dateNote: '三次主要瓜分发生于1772、1793和1795年；各次参与者和取得的区域并不相同。',
    title: '波兰—立陶宛联邦遭三次瓜分',
    category: '政治',
    region: 'europe',
    themes: ['波兰', '欧洲秩序'],
    location: '华沙及联邦地区',
    coordinates: [21.01, 52.23],
    summary: '俄罗斯、普鲁士与奥地利先后分割联邦领土，1795年最后一次瓜分使独立政权消失。',
    background: '邻国干预与国内政治弱点互相强化，改革派试图通过宪法等措施重建国家能力。',
    details: [
      '1791年宪法和1794年起义未能阻止后续入侵。三次瓜分改变的是领土和统治关系，波兰社会、语言及恢复独立的政治诉求并没有因此消失。',
    ],
    impact: '瓜分重组了中东欧地图，也使波兰问题长期参与欧洲战争、外交与民族运动。',
    importance: 5,
    sources: [
      {
        title: '拿破仑基金会 · The Duchy of Warsaw: The Gradual Disappearance of Poland',
        url: 'https://www.napoleon.org/en/history-of-the-two-empires/close-up/a-close-up-on-the-duchy-of-warsaw/',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
    relatedEvents: [
      {
        id: 'world-vienna',
        label: '后来的领土安排',
        note: '拿破仑时期的变化之后，维也纳会议再次处理波兰地区的归属。',
      },
    ],
  },
  {
    id: 'world-napoleon-empire',
    year: 1804,
    title: '法兰西第一帝国建立',
    category: '政治',
    region: 'europe',
    themes: ['法国', '王权'],
    location: '巴黎',
    coordinates: [2.35, 48.86],
    summary: '拿破仑通过元老院决议取得世袭皇帝地位，法国从执政府体制转为帝国。',
    background: '革命后的政治动荡与军事胜利推动行政权集中，终身执政进一步走向家族世袭。',
    details: [
      '建立帝国的制度节点是1804年5月的元老院决议，12月加冕则通过仪式展示新权威。法律程序与政治动员共同塑造合法性，不能仅以加冕日期解释建国。',
    ],
    impact: '法国政治权力进一步集中，新王朝也随欧洲战争扩大影响，并遭到持续的反法联盟挑战。',
    importance: 5,
    sources: [
      {
        title: '拿破仑基金会 · The proclamation of Empire, 18 May 1804',
        url: 'https://www.napoleon.org/en/history-of-the-two-empires/close-up/a-close-up-on-the-proclamation-of-empire/',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
    relatedEvents: [
      {
        id: 'world-waterloo',
        label: '帝国最终失败的节点',
        note: '1815年滑铁卢战败结束了拿破仑重返帝位的百日统治。',
      },
    ],
  },
  {
    id: 'world-napoleonic-civil-code',
    year: 1804,
    title: '法国《民法典》颁行',
    category: '政治',
    region: 'europe',
    themes: ['法律', '制度'],
    location: '巴黎',
    coordinates: [2.35, 48.86],
    summary: '法国以统一民法框架整理财产、契约和家庭关系，成为拿破仑重建国家制度的重要组成。',
    background: '革命改变了法律和财产权，执政府希望把分散规定整理为更稳定的社会规则。',
    details: [
      '法典保留部分革命成果，也强化了父亲与丈夫在家庭中的权力，妇女的法律处境并不平等。因此统一法律与扩大每个人的权利需要分别观察。',
    ],
    impact: '法典成为理解近代大陆法与国家治理的重要参照，它的影响同战争、改革和地方选择交织。',
    importance: 4,
    sources: [
      {
        title: '拿破仑基金会 · The masses of granite: The Civil Code',
        url: 'https://www.napoleon.org/en/young-historians/napodoc/les-masses-de-granit-de-nouvelles-institutions-napoleoniennes',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
    relatedEvents: [
      {
        id: 'world-napoleon-empire',
        label: '同年的另一项制度变化',
        note: '法典与帝国建立可并读，用于观察统一法律与权力集中的关系，并不说明二者等同。',
      },
    ],
  },
  {
    id: 'world-waterloo',
    year: 1815,
    title: '滑铁卢战役',
    category: '战争',
    region: 'europe',
    themes: ['拿破仑战争', '欧洲秩序'],
    location: '滑铁卢附近',
    coordinates: [4.41, 50.68],
    summary: '威灵顿统率的盟军与布吕歇尔率领的普鲁士军队击败拿破仑，终结其最后一次夺回帝国的尝试。',
    background: '拿破仑从厄尔巴岛返回后重新执政，希望在反法各军会合前分别击败对手。',
    details: [
      '盟军坚守阵地，普军的及时到达改变了战局。这不是英法两军独自交战，而是多国部队合作的结果；战败后拿破仑再次退位并被流放。',
    ],
    impact: '战役结束了拿破仑的百日统治，与维也纳安排一道推动战后欧洲权力秩序的形成。',
    importance: 5,
    sources: [
      {
        title: '英国国家陆军博物馆 · Battle of Waterloo',
        url: 'https://www.nam.ac.uk/explore/battle-waterloo',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-greek-independence',
    year: 1821,
    endYear: 1830,
    dateLabel: '1821—1830年',
    dateNote: '以起义至独立获承认为观察区间；王国体制和边界仍在后续外交安排中调整。',
    title: '希腊独立运动',
    category: '政治',
    region: 'europe',
    themes: ['民族国家', '奥斯曼'],
    location: '希腊地区（以纳夫普利翁为参照）',
    coordinates: [22.8, 37.57],
    summary: '希腊反奥斯曼运动在1821年起事，经过战争与外交介入，于1830年取得独立承认。',
    background: '民族主义与革命观念传播，挑战维也纳秩序强调的王朝合法性和既有边界。',
    details: [
      '独立建立了新的政治框架，但并不意味着当时所有希腊语人口都进入同一国家。将起义、国际承认和后来疆域分别观察，才能避免以现代地图回推。',
    ],
    impact: '希腊独立成为十九世纪民族运动的重要案例，也改变了奥斯曼在东地中海的地位。',
    importance: 4,
    sources: [
      {
        title:
          'OpenStax · World History 2 · Nationalism, Liberalism, Conservatism, and the Political Order',
        url: 'https://openstax.org/books/world-history-volume-2/pages/7-4-nationalism-liberalism-conservatism-and-the-political-order',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-revolutions-1848',
    year: 1848,
    endYear: 1849,
    dateLabel: '1848—1849年',
    dateNote: '多个地区的革命与镇压具有不同起讫时间，此处使用总体观察区间。',
    title: '1848年欧洲革命浪潮',
    category: '政治',
    region: 'europe',
    themes: ['民族国家', '制度'],
    location: '欧洲多地（以法兰克福为参照）',
    coordinates: [8.68, 50.11],
    summary: '法国革命引发欧洲多地政治动荡，民族统一、宪法权利和社会改革成为集中诉求。',
    background:
      '经济困境与既有王朝秩序中的政治限制，使自由派、民族主义者和劳动群体的不满互相汇集。',
    details: [
      '法兰克福国民议会试图通过宪法建立统一国家，却遭君主势力拒绝。不同地区和群体的目标并不一致，多数革命最终被武力压制。',
    ],
    impact: '革命失败没有消除宪法和民族统一的诉求；其议会实践与权利讨论继续影响后来的政治。',
    importance: 5,
    sources: [
      {
        title: '德国历史博物馆 · Die Revolution von 1848/49',
        url: 'https://www.dhm.de/lemo/kapitel/vormaerz-und-revolution/revolution-1848',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-crimean-war',
    year: 1853,
    endYear: 1856,
    dateLabel: '1853—1856年',
    dateNote: '总战争区间；英国和法国于1854年介入，部分英国资料因此以1854年作为叙述起点。',
    title: '克里米亚战争',
    category: '战争',
    region: 'europe',
    themes: ['俄罗斯', '奥斯曼', '欧洲秩序'],
    location: '黑海战区（以塞瓦斯托波尔为参照）',
    coordinates: [33.52, 44.62],
    summary: '俄罗斯与奥斯曼的冲突扩大，英法等国参战，战争最终以俄国接受巴黎和约告终。',
    background: '列强围绕奥斯曼帝国的未来与黑海力量平衡展开竞争，俄国在多瑙河地区的行动加剧危机。',
    details: [
      '塞瓦斯托波尔围攻成为主要战场，但战争还涉及波罗的海和高加索。军需、疾病与冬季补给造成重大损失，显示工业运输和后勤组织对战争的重要性。',
    ],
    impact: '战败暴露俄国制度与工业的弱点，削弱其黑海优势，也推动战争报道、医疗和军事改革的讨论。',
    importance: 4,
    sources: [
      {
        title: '英国国家陆军博物馆 · Crimean War',
        url: 'https://www.nam.ac.uk/explore/crimean-war',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
      {
        title: '英国国家档案馆 · British Army operations up to 1913',
        url: 'https://www.nationalarchives.gov.uk/help-with-your-research/research-guides/british-army-operations-up-to-1913',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-russian-emancipation',
    year: 1861,
    title: '俄国废除农奴制',
    category: '社会',
    region: 'europe',
    themes: ['俄罗斯', '劳动与社会'],
    location: '圣彼得堡',
    coordinates: [30.32, 59.94],
    summary: '亚历山大二世政府颁布改革，解除大批农民的人身依附，俄国农村制度发生重大变化。',
    background: '克里米亚战争的失败暴露国家力量不足，农奴制也限制人口流动和新的劳动组织。',
    details: [
      '法律身份的改变为进入工厂等流动打开条件，却不能理解为所有农村家庭立即获得平等、富裕或充分土地。改革与铁路、工业扩张共同改变俄国社会。',
    ],
    impact: '改革打破旧制度的重要支柱，为后续工业化创造条件，农业与社会矛盾仍长期存在。',
    importance: 5,
    sources: [
      {
        title: 'OpenStax · World History 2 · The Second Industrial Revolution',
        url: 'https://openstax.org/books/world-history-volume-2/pages/9-1-the-second-industrial-revolution',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
      {
        title: '狄金森学院 · Tsar Alexander II signs the legislation ending serfdom',
        url: 'https://hd.housedivided.dickinson.edu/node/34893',
        note: '亚历山大二世及改革年代参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-russian-revolution-1905',
    year: 1905,
    title: '俄国1905年革命',
    category: '政治',
    region: 'europe',
    themes: ['俄罗斯', '制度'],
    location: '圣彼得堡与俄国多地',
    coordinates: [30.32, 59.94],
    summary: '请愿遭军队镇压后，罢工与抗议扩展，沙皇被迫承诺设立全国立法机构。',
    background: '工业劳动条件、专制统治与社会不平等积累不满，改革和革命思潮在知识界与工人中传播。',
    details: [
      '1906年杜马开会，但选举与权力分配受到严格限制，沙皇仍保有广泛权力。设立议会并不等于完成民主转型，也没有消除社会危机。',
    ],
    impact: '革命动摇沙皇统治的合法性，为俄国政党、工人组织和宪政争论留下重要经验。',
    importance: 5,
    sources: [
      {
        title: 'OpenStax · World History 2 · The War Ends: The Russian Revolution',
        url: 'https://openstax.org/books/world-history-volume-2/pages/11-5-the-war-ends',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
    relatedEvents: [
      {
        id: 'world-russo-japanese',
        label: '同一时期的国际背景',
        note: '战争和国内革命在时间上交错；本链接提供并读入口，不把两者的关系化约为单一原因。',
      },
    ],
  },
  {
    id: 'world-ottoman-origins',
    year: 1299,
    title: '奥斯曼政权在安纳托利亚兴起',
    category: '政治',
    region: 'west-asia',
    themes: ['奥斯曼', '王权'],
    location: '安纳托利亚西北部（瑟于特一带）',
    coordinates: [30.18, 40.02],
    dateLabel: '约1299年',
    dateNote:
      '1299年是奥斯曼建国的传统纪年；边疆政权的形成是逐步过程，不代表已存在后来的帝国疆域。',
    summary: '奥斯曼一世通过战争与外交整合边疆领地，形成后来横跨欧亚非的奥斯曼王朝。',
    background: '安纳托利亚存在多个地方政权，与拜占庭边疆的竞争和人员流动为新势力崛起创造条件。',
    details: [
      '早期政权规模有限，巴尔干、阿拉伯地区和北非的扩张属于后世统治者。地图应随年代观察，不能把帝国鼎盛版图直接套在传统建国年。',
    ],
    impact: '奥斯曼逐步成为西亚和欧洲的重要政治力量，最终改变东地中海及巴尔干的权力关系。',
    importance: 5,
    sources: [
      {
        title: '大都会艺术博物馆 · The Ottoman Empire',
        url: 'https://www.metmuseum.org/learn/educators/curriculum-resources/art-of-the-islamic-world/unit-five/chapter-two/the-ottoman-empire',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-chaldiran',
    year: 1514,
    title: '查尔迪兰之战',
    category: '战争',
    region: 'west-asia',
    themes: ['奥斯曼', '波斯'],
    location: '查尔迪兰地区',
    coordinates: [44.38, 39.07],
    summary: '奥斯曼军队击败萨法维力量，随后进入大不里士，萨法维早期扩张遭到重大挫折。',
    background: '两个帝国争夺安纳托利亚与伊朗西北部的影响，宗教动员、边境征募与领土竞争互相强化。',
    details: [
      '战争削弱伊斯玛仪在军中的声望，但没有消灭萨法维王朝。双方此后仍反复交战和议和，边境也继续变化，不能把一场胜利当成永久划界。',
    ],
    impact: '战役使奥斯曼和萨法维的竞争进入新阶段，军事组织、火器与政治合法性的关系更为突出。',
    importance: 4,
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
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-persian-constitution',
    year: 1906,
    endYear: 1907,
    dateLabel: '1906—1907年',
    dateNote: '指议会与基本法、补充法的建立阶段；整个立宪革命通常观察为1905—1911年。',
    title: '波斯立宪与议会建立',
    category: '政治',
    region: 'west-asia',
    themes: ['伊朗', '制度'],
    location: '德黑兰',
    coordinates: [51.39, 35.69],
    summary: '立宪运动推动召开议会，颁行基本法及补充法，试图通过法律约束沙阿权力。',
    background:
      '财政危机、外国影响和政治不满汇集，商人、宗教人士与改革知识分子提出不同的变革方案。',
    details: [
      '宪制安排围绕议会、君主和宗教权威的关系展开激烈争论。1906年的基本法与1907年的补充法合成宪法框架，但颁法并未终结政变和反立宪斗争。',
    ],
    impact: '波斯出现新的代表政治与权力限制语言，立宪成败仍受到国内分歧和列强干预影响。',
    importance: 5,
    sources: [
      {
        title: 'Encyclopaedia Iranica · Constitutional Revolution: The Constitution',
        url: 'https://www.iranicaonline.org/articles/constitutional-revolution-iii/',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-young-turk-revolution',
    year: 1908,
    title: '青年土耳其革命与宪政恢复',
    category: '政治',
    region: 'west-asia',
    themes: ['奥斯曼', '制度'],
    location: '奥斯曼帝国（以伊斯坦布尔为参照）',
    coordinates: [28.98, 41.01],
    summary: '青年土耳其运动迫使苏丹恢复1876年宪法，奥斯曼帝国进入第二宪政时期。',
    background: '改革力量反对专制统治，试图通过宪政和新的公民身份来回应帝国的政治危机。',
    details: [
      '恢复宪法使议会与公民权利再次成为公共讨论。教育中出现新的公民课程，强调个人对共同国家的权利和义务，但宪政恢复并不意味着所有社会矛盾得到解决。',
    ],
    impact: '运动重组帝国政治竞争，为理解奥斯曼末期的议会、公民观念和权力冲突提供重要节点。',
    importance: 4,
    sources: [
      {
        title: '美国国会图书馆法律图书馆 · Civic Education Models: Turkey',
        url: 'https://tile.loc.gov/storage-services/service/ll/llglrd/2020714996/2020714996.pdf',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-us-constitution',
    year: 1787,
    title: '美国制宪会议通过宪法文本',
    category: '政治',
    region: 'americas',
    themes: ['北美', '制度'],
    location: '费城独立厅',
    coordinates: [-75.15, 39.95],
    summary: '费城制宪会议制定新的联邦宪法，安排中央政府、各州和不同权力部门之间的关系。',
    background: '独立后的邦联体制难以解决财政与协调问题，各州代表起初为修改邦联条例而集会。',
    details: [
      '代表随后选择重写政府框架，围绕联邦权限、各州代表名额和代表产生方式反复妥协。1787年签署文本与之后各州批准、政府开始运作应分开理解。',
    ],
    impact: '新宪法奠定美国联邦制度的基本结构，也把权力分配与修宪问题带入持续的政治实践。',
    importance: 5,
    sources: [
      {
        title: '美国国家档案馆 · Constitution of the United States (1787)',
        url: 'https://www.archives.gov/milestone-documents/constitution',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
    relatedEvents: [
      {
        id: 'world-american-independence',
        label: '从独立到联邦制度',
        note: '1776年的独立宣言与1787年的制宪处理不同问题，后者重建政府权力分配。',
      },
    ],
  },
  {
    id: 'world-louisiana-purchase',
    year: 1803,
    title: '美国与法国签订路易斯安那购地条约',
    category: '政治',
    region: 'americas',
    themes: ['北美', '领土与扩张'],
    location: '新奥尔良（区域参照）',
    coordinates: [-90.07, 29.95],
    summary: '美国通过同法国的条约获得密西西比河以西的广大领土主张，国家扩张越过原有范围。',
    background: '新奥尔良港与河流交通关系到美国西部贸易，谈判最初围绕港口及其使用展开。',
    details: [
      '法国最终提出转让整个路易斯安那地区。条约主要处理两国之间的领土权利，并不意味着所有原住民土地和地方社会都已被美国实际控制。',
    ],
    impact: '美国向西扩张的条件显著改变，河运、移民以及对原住民领地的侵占进入更大范围。',
    importance: 4,
    sources: [
      {
        title: '美国国家档案馆 · Louisiana Purchase Treaty (1803)',
        url: 'https://www.archives.gov/milestone-documents/louisiana-purchase-treaty',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    locationNote:
      '坐标为新奥尔良这一地区性阅读锚点；条约在巴黎谈判签署，不表示所有领土实际控制或原住民同意转让。',
    people: [],
  },
  {
    id: 'world-mexican-independence',
    year: 1810,
    endYear: 1821,
    dateLabel: '1810—1821年',
    dateNote: '从多洛雷斯起义到独立实现的通用观察区间；不同地区与派别的参战阶段并不相同。',
    title: '墨西哥独立战争',
    category: '政治',
    region: 'americas',
    themes: ['拉丁美洲', '民族国家'],
    location: '墨西哥中部（多洛雷斯）',
    coordinates: [-100.93, 21.16],
    summary: '伊达尔戈发动反殖民起义后，战争延续多年，最终西班牙在新西班牙的统治结束。',
    background: '殖民社会存在身份与权力差异，西班牙本土政治危机使新西班牙的自治与独立争论加剧。',
    details: [
      '独立阵营经历失败、重组与谈判，1821年出现新的联合方案和政治安排。墨西哥独立不是南美战事的简单延伸，其参与群体与建国选择有自身历程。',
    ],
    impact: '新的墨西哥国家取代新西班牙殖民政权，但独立之后的制度与社会问题仍需继续解决。',
    importance: 5,
    sources: [
      {
        title: '墨西哥国家档案馆 · Documentos de la consumación de la Independencia de México',
        url: 'https://www.gob.mx/agn/articulos/archivisticaclio-documentos-de-la-consumacion-de-la-independencia-de-mexico?idiom=es',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
    relatedEvents: [
      {
        id: 'world-spanish-america',
        label: '拉丁美洲的跨区域对照',
        note: '墨西哥与西属南美的独立同时发生于更广泛的帝国危机中，各自具有独立的社会力量和战争过程。',
      },
    ],
  },
  {
    id: 'world-monroe-doctrine',
    year: 1823,
    title: '门罗提出西半球政策原则',
    category: '政治',
    region: 'americas',
    themes: ['美洲', '国际关系'],
    location: '华盛顿',
    coordinates: [-77.04, 38.9],
    summary: '美国总统门罗在国情咨文中警告欧洲不要在美洲继续殖民或干涉新国家，后来称为门罗主义。',
    background: '拉丁美洲多地独立改变了殖民秩序，美国政府同时考虑本国安全、商业和欧洲列强的行动。',
    details: [
      '这是一项美国提出的政策主张，不能把它当成各美洲国家共同签署的平等协议。其含义后来被不断重释，也被用来支持美国自身的干预和势力范围。',
    ],
    impact: '门罗主义成为美国对拉美关系中的长期语言，防止欧洲干预与美国扩张之间的张力始终存在。',
    importance: 4,
    sources: [
      {
        title: '美国国家档案馆 · Monroe Doctrine (1823)',
        url: 'https://www.archives.gov/milestone-documents/monroe-doctrine',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-mexican-american-war',
    year: 1846,
    endYear: 1848,
    dateLabel: '1846—1848年',
    dateNote: '战争以1848年《瓜达卢佩—伊达尔戈条约》结束；之后仍有条约批准和撤军事项。',
    title: '美墨战争与墨西哥割地',
    category: '战争',
    region: 'americas',
    themes: ['北美', '领土与扩张'],
    location: '墨西哥城及美墨战区',
    coordinates: [-99.13, 19.43],
    summary:
      '美国与墨西哥开战，美军占领墨西哥城后双方议和，墨西哥割让大片北部领土并放弃对得克萨斯的主张。',
    background: '美国的领土扩张和得克萨斯问题加剧两国冲突，边界争端最终转化为大规模战争。',
    details: [
      '1848年条约涉及今日加利福尼亚、新墨西哥等广大地区，并就居民权利作出规定。国家边界改变不代表地方居民的土地与公民权问题从此消失。',
    ],
    impact: '美国版图向太平洋大幅扩展，墨西哥失去重要领土，北美边界与区域社会被深刻重组。',
    importance: 5,
    sources: [
      {
        title: '美国国家档案馆 · Treaty of Guadalupe Hidalgo (1848)',
        url: 'https://www.archives.gov/milestone-documents/treaty-of-guadalupe-hidalgo',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-canadian-confederation',
    year: 1867,
    title: '加拿大联邦成立',
    category: '政治',
    region: 'americas',
    themes: ['北美', '制度'],
    location: '渥太华',
    coordinates: [-75.7, 45.42],
    summary: '《英属北美法》生效，加拿大省、新不伦瑞克与新斯科舍组成新的联邦自治领。',
    background: '英属北美各殖民地面对防务、财政和交通联系等问题，部分政治领袖推动建立共同政府。',
    details: [
      '1867年是联邦成立的节点，当时范围尚不同于今天。自治领仍处于英帝国内，之后其他省区加入与主权逐步变化属于更长的历史过程。',
    ],
    impact: '加拿大形成新的联邦政府框架，区域权力分配、语言和原住民关系继续影响国家发展。',
    importance: 4,
    sources: [
      {
        title: '加拿大政府 · The history of Canada Day',
        url: 'https://www.canada.ca/en/canadian-heritage/campaigns/canada-day/about.html',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
      {
        title: 'OpenStax · World History 2 · The Second Industrial Revolution',
        url: 'https://openstax.org/books/world-history-volume-2/pages/9-1-the-second-industrial-revolution',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-mexican-revolution',
    year: 1910,
    title: '墨西哥革命兴起',
    category: '政治',
    region: 'americas',
    themes: ['拉丁美洲', '土地与社会'],
    location: '墨西哥多地（以华雷斯城为参照）',
    coordinates: [-106.49, 31.74],
    summary: '马德罗号召反对迪亚斯长期统治，各地反抗逐渐扩大，政治改革与土地诉求交织。',
    background: '独裁统治与选举危机引发不满，大土地经营和工农处境也推动不同群体追求变革。',
    details: [
      '1911年起义军夺取华雷斯城，迪亚斯随后辞职；马德罗上台后仍面对土地与社会改革的冲突。革命延续多年，本条仅呈现1910—1912年的早期阶段。',
    ],
    impact: '革命打破长期个人统治，政治代表、土地和劳动问题成为国家重建的中心议题。',
    importance: 5,
    sources: [
      {
        title: '美国国会图书馆 · The Rise of Francisco Madero',
        url: 'https://www.loc.gov/exhibits/mexican-revolution-and-the-united-states/rise-of-madero.html',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    dateNote: '1910年标记革命兴起，不表示革命当年结束；此处叙述范围限于1912年及以前。',
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-spanish-american-war',
    year: 1898,
    title: '美西战争与殖民版图重组',
    category: '战争',
    region: 'americas',
    themes: ['美洲', '殖民与抵抗'],
    location: '圣地亚哥及加勒比海战区',
    coordinates: [-75.83, 20.02],
    summary: '美国击败西班牙，巴黎和约改变古巴、波多黎各、关岛和菲律宾的国际地位。',
    background: '古巴反殖民战争与美国的战略、经济利益交织，缅因号爆炸后两国紧张加剧。',
    details: [
      '西班牙放弃对古巴的主权要求，并向美国转让波多黎各、关岛和菲律宾。不能据此把所有地区都称为同时获得独立：不少地方转入新的美国统治或控制。',
    ],
    impact: '西班牙旧殖民体系进一步瓦解，美国成为更强的加勒比海和太平洋势力，后续抵抗仍持续。',
    importance: 5,
    sources: [
      {
        title: '美国国务院历史办公室 · The Spanish-American War, 1898',
        url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-norse-newfoundland',
    year: 1000,
    title: '北欧航海者在纽芬兰留下营地',
    category: '交流',
    region: 'americas',
    themes: ['北大西洋', '航海'],
    location: '兰塞奥兹牧草地',
    coordinates: [-55.53, 51.59],
    dateLabel: '约1000年前后',
    dateNote: '年代概括遗址及相近建筑的考古分期，不是可确定的单日登陆日期；萨迦成文晚于所述航行。',
    summary: '兰塞奥兹牧草地的草皮建筑、金属加工遗存，证明北欧航海者曾从格陵兰来到北美。',
    background:
      '北大西洋的航海联系向西延伸，木材等资源对格陵兰居民具有吸引力；北美早已有原住民生活。',
    details: [
      '考古材料可同北欧萨迦相互讨论，但不能把传说中的每一处地名和个人行动都确定下来。营地存在时间有限，也不构成对整个北美的长期控制。',
    ],
    impact: '遗址为跨大西洋接触提供了物证，使人们能在哥伦布之前的年代观察不同人群的海洋联系。',
    importance: 4,
    sources: [
      {
        title: '加拿大国家公园管理局 · Culture and history: L’Anse aux Meadows',
        url: 'https://parks.canada.ca/lhn-nhs/nl/meadows/culture',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
    relatedEvents: [
      {
        id: 'world-columbus',
        label: '跨大西洋航行的年代对照',
        note: '两条记录相隔近五百年，不表示从北欧营地到加勒比航行存在已知的连续航线。',
      },
    ],
  },
  {
    id: 'world-machu-picchu',
    year: 1401,
    endYear: 1500,
    dateLabel: '约15世纪',
    dateNote:
      '区间表示来源给出的营建世纪，不断言工程从1401年持续至1500年；具体建筑阶段仍有研究空间。',
    title: '印加营建马丘比丘',
    category: '文化',
    region: 'americas',
    themes: ['安第斯', '城市'],
    location: '马丘比丘',
    coordinates: [-72.55, -13.16],
    summary: '印加人在安第斯山地营建石构建筑、梯田和水利设施，形成与陡峭地形结合的复杂空间。',
    background: '印加国家在十五世纪扩张，山地聚落、道路与农业工程共同支撑资源组织和区域联系。',
    details: [
      '遗址包含居住、农业和仪式空间，其确切用途与部分天文解释仍有争论。它是观察印加建设能力的地点，并非整个国家首都，也不能把1911年的外界报道称为当地首次知道遗址。',
    ],
    impact:
      '马丘比丘保存了印加石作、土地利用和山地环境结合的材料，补充仅靠征服史理解安第斯社会的视角。',
    importance: 4,
    sources: [
      {
        title: 'UNESCO · Historic Sanctuary of Machu Picchu',
        url: 'https://whc.unesco.org/en/list/274',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
    relatedEvents: [
      {
        id: 'world-inca',
        label: '同一文明的政治背景',
        note: '把建筑遗址与印加扩张并读，可以区分城市工程、国家范围与不确定的具体营建阶段。',
      },
    ],
  },
  {
    id: 'world-us-transcontinental-railway',
    year: 1869,
    title: '美国首条横贯大陆铁路接轨',
    category: '交流',
    region: 'americas',
    themes: ['交通', '劳动与社会'],
    location: '普罗蒙特里峰',
    coordinates: [-112.55, 41.62],
    summary: '中央太平洋与联合太平洋铁路在犹他接轨，把美国东西部铁路网络连接起来。',
    background:
      '联邦政府支持建设跨大陆交通，铁路公司需要解决山地施工、劳动力不足和漫长补给等问题。',
    details: [
      '大批华工承担中央太平洋铁路的艰险工程，工资与待遇却存在差别。庆典照片长期遮蔽他们的贡献；接轨点也不等于铁路直接抵达两个海岸的每一座城市。',
    ],
    impact:
      '铁路缩短跨区域旅行和运输时间，推动商业与移民；华工的劳动和长期被忽视的处境，也使它成为理解技术与不平等的重要节点。',
    importance: 4,
    sources: [
      {
        title: '美国国家公园管理局 · The Archeology of Chinese Laborers Who Connected the Country',
        url: 'https://home.nps.gov/articles/archeology-of-chinese-laborers-connected-country.htm',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-hawaiian-kingdom',
    year: 1810,
    title: '卡美哈梅哈完成夏威夷群岛政治统一',
    category: '政治',
    region: 'oceania',
    themes: ['太平洋', '王权'],
    location: '夏威夷群岛（考艾岛为参照）',
    coordinates: [-159.5, 22.04],
    summary: '考艾岛统治者承认卡美哈梅哈一世的宗主地位，群岛逐步统一为夏威夷王国。',
    background:
      '岛际战争与海上贸易改变权力分配，卡美哈梅哈先后控制主要岛屿，考艾岛仍保持独立安排。',
    details: [
      '1810年的承认关系使统一进程达到关键节点，不表示每一岛都在同年遭到军事征服。王国后来发展外交关系与成文制度，不能以今日美国州的身份回看当时。',
    ],
    impact:
      '统一的王国成为太平洋外交和贸易中的行动者，其独立与本土主权此后面临越来越强的外来压力。',
    importance: 4,
    sources: [
      {
        title: '美国国务院历史办公室 · Hawaii: Recognition and Diplomatic Relations',
        url: 'https://history.state.gov/countries/hawaii',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
    relatedEvents: [
      {
        id: 'world-hawaiian-overthrow',
        label: '王国后来面临的危机',
        note: '独立王国的形成和1893年的政变属于不同阶段，前者不能用后来的殖民身份解释。',
      },
    ],
  },
  {
    id: 'world-hawaiian-overthrow',
    year: 1893,
    title: '夏威夷君主制被推翻',
    category: '政治',
    region: 'oceania',
    themes: ['太平洋', '殖民与抵抗'],
    location: '檀香山',
    coordinates: [-157.86, 21.31],
    summary: '以种植园主和商人为重要力量的政变推翻莉莉乌欧卡拉尼女王，夏威夷王国主权遭到破坏。',
    background: '外来商业利益和美国政治影响不断增强，王权、公民资格和经济利益之间的冲突加深。',
    details: [
      '政变得到美国在当地力量的支持，但并吞并未立即完成。1893年的政权更替与1898年的美国并吞是不同节点，不能将其压缩成一次自愿加入。',
    ],
    impact: '本土统治体系被打断，夏威夷人的政治权利和土地问题继续成为太平洋殖民历史的重要议题。',
    importance: 4,
    sources: [
      {
        title: '美国国家公园管理局 · Hawaiian History',
        url: 'https://www.nps.gov/locations/hawaii/history.htm',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
      {
        title: '美国国务院历史办公室 · The Spanish-American War, 1898',
        url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
  },
  {
    id: 'world-cook-new-zealand',
    year: 1769,
    endYear: 1770,
    dateLabel: '1769—1770年',
    dateNote:
      '指库克首次考察新西兰的阶段；后续到访另有年代，且他不是最早生活于此或最早抵达的欧洲人。',
    title: '库克考察新西兰海岸',
    category: '交流',
    region: 'oceania',
    themes: ['太平洋', '航海'],
    location: '新西兰海岸（以吉斯伯恩为参照）',
    coordinates: [178.02, -38.66],
    summary: '库克的奋进号考察新西兰海岸，毛利人与欧洲人展开新的接触、合作与冲突。',
    background: '英国以科学考察为目标进入南太平洋，也寻求贸易和帝国机会；毛利社会早已在当地形成。',
    details: [
      '接触并非对无人之地的发现。塔斯曼在1642年已有短暂遭遇，库克的航行则留下更系统的海图与记录，交流同时伴随暴力和权力不对等。',
    ],
    impact: '海岸测绘把新西兰更密切地接入欧洲航海网络，成为后来商贸、移民和殖民扩张的重要背景。',
    importance: 4,
    sources: [
      {
        title: '新西兰文化与遗产部 · James Cook',
        url: 'https://nzhistory.govt.nz/people/james-cook',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    locationNote:
      '吉斯伯恩仅为首次接触区域的阅读参照；考察涉及新西兰多段海岸，不表示精确航线或逐年位置。',
    people: [],
    relatedEvents: [
      {
        id: 'world-waitangi',
        label: '后来的主权与条约问题',
        note: '海洋接触之后，商贸、移民与政治关系继续发展，1840年条约构成另一个重要节点。',
      },
    ],
  },
  {
    id: 'world-new-zealand-wars',
    year: 1845,
    endYear: 1872,
    dateLabel: '1845—1872年',
    dateNote: '这是多场战争的常见整体区间；1843年怀劳冲突为此前的重要背景，并非所有地区连续交战。',
    title: '新西兰战争与土地争夺',
    category: '战争',
    region: 'oceania',
    themes: ['太平洋', '土地与社会'],
    location: '新西兰北岛（岛屿湾为参照）',
    coordinates: [174.1, -35.3],
    summary: '围绕主权与土地，部分毛利部族同英国及殖民政府军队反复交战，另一些毛利群体与政府结盟。',
    background: '殖民人口增加和土地压力加剧争端，条约之后各方对主权及土地处置权的理解仍不一致。',
    details: [
      '战事从北方战争延伸至塔拉纳基、怀卡托和其他地区，毛利堡垒与游击方式发挥重要作用。其阵营不能简单划成全部毛利人对全部欧洲人。',
    ],
    impact: '战争与土地没收改变北岛的社会和权力结构，后续毛利权利诉求与历史追索具有长期根源。',
    importance: 4,
    sources: [
      {
        title: '新西兰自然保护部 · New Zealand Wars',
        url: 'https://www.doc.govt.nz/our-work/heritage/heritage-topics/new-zealand-wars/',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
    relatedEvents: [
      {
        id: 'world-waitangi',
        label: '条约之后的争议',
        note: '战争与对主权和土地权的不同理解相联系，双方阵营并不能只按族群简单划分。',
      },
    ],
  },
  {
    id: 'world-atlantic-telegraph',
    year: 1866,
    title: '跨大西洋海底电缆实现持续通信',
    category: '交流',
    region: 'europe',
    themes: ['通信', '全球联系'],
    location: '瓦伦蒂亚岛—纽芬兰（东端参照）',
    coordinates: [-10.37, 51.93],
    summary:
      '在早期故障与失败之后，新的海底电缆连接欧洲与北美，使跨洋消息传递从航运尺度转向电信尺度。',
    background:
      '铁路和商业已推动陆上电报网络发展，跨洋通信仍要克服长距离铺缆、绝缘与信号传输困难。',
    details: [
      '1858年电缆曾短暂通报，但很快失效，1866年的成功才建立更可靠的连接。因此首次试通与持续运作不是同一年，技术进步依赖反复试验和投资。',
    ],
    impact:
      '跨洋信息流大幅加速，新闻、外交与金融逐渐纳入更紧密的通信网络，也改变国家和企业的全球行动。',
    importance: 4,
    sources: [
      {
        title: '英国科学博物馆 · Sending messages across the Atlantic',
        url: 'https://blog.sciencemuseum.org.uk/sending-messages-across-the-atlantic-156-years-on-from-the-first-transatlantic-cable/',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
    ],
    people: [],
    locationNote:
      '坐标为地点或区域的近似阅读参照，不表示事件只发生于此，不构成精确战场边界、政治疆域或人物行迹。',
    relatedEvents: [
      {
        id: 'world-second-industrial',
        label: '通信与工业网络',
        note: '跨洋电报可同第二次工业革命并读，观察技术如何改变信息速度和全球联系。',
      },
    ],
  },
]
