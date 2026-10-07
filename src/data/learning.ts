import type { PeriodProfile, Tour } from '../types'
import { periods } from './periods'

// Entry years and event-based learning paths are distinct from file/navigation
// boundaries. Establishment, unification and a representative map are separate ideas.
export const profiles: Record<string, PeriodProfile> = {
  prehistory: {
    focusReason:
      '以约前7000年为入口，比较贾湖、杰里科与海岛聚落；再沿节点观察粟黍、稻作、独木舟和聚落分区。',
    question: '没有文字的共同体，怎样留下可供研究的生活证据？',
    context:
      '聚落、植物遗存、器物、墓葬和公共建筑提供不同线索。黄河与长江流域的粟黍、稻作，可与西亚聚落及新几内亚高地农业比较；房屋、陶窑和独木舟则把生活落实到具体材料。农业、定居和社会协作是长期过程，各地并不遵循完全一样的顺序。',
    chronologyNote:
      '前10000年是本版浏览起点，不表示人类历史始于此年。遗址显示近似年代区间；没有可靠的政权轮廓时只显示遗址和地理参照。',
    polities: ['中国多区域聚落', '西亚早期共同体', '东地中海岛屿聚落', '新几内亚高地农业'],
    people: [],
    steps: [
      'gobekli-tepe',
      'jericho-neolithic',
      'shangshan-culture',
      'catalhoyuk',
      'jiahu-settlement',
      'choirokoitia-village',
      'xinglonggou-millet',
      'peiligang-settlement',
      'kuahuqiao-canoe',
      'yangshao-culture',
      'hemudu-rice',
      'kuk-early-farming',
      'banpo-village',
      'dawenkou-burials',
    ],
  },
  'early-civilizations': {
    focusReason:
      '选择约前3000年，对照良渚、屈家岭、两河书写与印度河城市，并从节点跳转到卡拉尔、金字塔、陶寺和石峁。',
    question: '城市、公共工程和精细工艺，怎样呈现早期社会的不同路径？',
    context:
      '两河、尼罗河、印度河及中国多个区域留下城市、公共工程、玉器、彩陶和书写的证据。日本绳文、欧洲石屋村落与安第斯城市提供更多比较：复杂的共同生活不都依靠同一种谷物农业，也不都形成制度相同的国家。中国早期社会同样不限于一个流域。',
    chronologyNote:
      '约前4000—前2071年只是导航区间，不是各地文明共同的起止日期。跨期遗址在其收录区间内继续显示，前3000年不是所有遗址的始建年。',
    polities: [
      '中国多区域中心聚落',
      '两河城市',
      '古埃及早王朝与古王国',
      '哈拉帕文化城市',
      '日本绳文共同体',
      '奥克尼石屋村落',
      '安第斯苏佩河谷城市',
    ],
    people: [],
    steps: [
      'sannai-maruyama',
      'lingjiatan-jade',
      'niuheliang-ritual',
      'liangzhu-city',
      'uruk-city',
      'uruk-writing',
      'egypt-unification',
      'qujialing-water',
      'dholavira-city',
      'moenjodaro-city',
      'caral-city',
      'skara-brae',
      'djoser-step-pyramid',
      'khufu-pyramid',
      'shijiahe-city',
      'taosi-city',
      'shimao-city',
      'xia-tradition',
    ],
  },
  xia: {
    focusReason: '以约前1800年作为二里头都邑发展阶段的阅读入口，不表示它在这一年突然建成。',
    question: '传世王朝记忆与考古遗址，分别能告诉我们什么？',
    context:
      '《史记》保存禹、启及夏代世系的传统叙述；二里头遗址则提供宫殿、道路和作坊的实物证据。两者性质不同，联系需要论证。',
    chronologyNote:
      '约前2070—前1600年是采用的一种常见年代框架。遗址年代用区间表示；当前来源没有可核对的夏代疆域，不以文化分布代替国界。',
    polities: ['夏（传世记载）'],
    people: ['early-yu'],
    steps: ['xia-tradition', 'erlitou-centre', 'shang-begins'],
  },
  shang: {
    focusReason: '以约前1250年武丁时期为入口，结合晚商甲骨与殷墟材料阅读。',
    question: '文字和考古怎样改变我们对早期王朝的认识？',
    context:
      '商王朝经历早期都邑发展与多次迁徙，晚期以殷为政治中心。甲骨卜辞、青铜礼器和墓葬揭示王权、宗教和资源组织之间的关系。',
    chronologyNote:
      '前841年之前许多绝对年代仍有讨论；商的起止年和盘庚、武丁纪年均应结合说明阅读，源地图的采样边界不等于王朝起止。',
    polities: ['商'],
    people: ['early-tang', 'early-wuding'],
    steps: ['shang-begins', 'pan-geng-yin', 'wuding-era', 'muye'],
  },
  'western-zhou': {
    focusReason: '选择前841年共和行政节点，观察王室治理危机与可连续追溯的纪年。',
    question: '周王室怎样把克商后的政治联盟变成长期秩序？',
    context:
      '西周通过封邦建国、宗族关系和礼仪制度建立秩序。诸侯具有地方基础，王权并非现代中央集权式的均匀控制，不能把轮廓线当作行政边界。',
    chronologyNote:
      '前1046年采用断代工程的常见考定，仍有讨论；前841年起《史记》十二诸侯年表提供连续纪年。',
    polities: ['周', '诸侯封国'],
    people: ['early-wuwang', 'early-zhougong'],
    steps: [
      'muye',
      'zhougong-east',
      'gonghe',
      'xuan-restoration',
      'western-zhou-falls',
      'zhou-east',
    ],
  },
  spring: {
    focusReason: '选择前651年葵丘会盟，观察齐国霸业与诸侯联盟。',
    question: '王室影响衰退后，诸侯如何建立新的秩序？',
    context:
      '齐、晋、楚、秦及吴越等力量先后影响区域格局。霸主依靠会盟和战争组织联盟；赋税、成文法与教学活动也改变着地方社会。',
    chronologyNote:
      '导航采用前770—前476年。春秋起讫有不同分法，不能把前475年视为各地同时进入全新制度的瞬间。',
    polities: ['周王室', '齐', '晋', '楚', '秦', '吴', '越'],
    people: ['early-qihuan', 'early-guanzhong', 'early-jinwen', 'confucius', 'early-goujian'],
    steps: [
      'zhou-east',
      'qihuan-guanzhong',
      'kuiqiu',
      'chengpu',
      'bi-battle',
      'lu-land-tax',
      'zheng-law',
      'wu-enters-ying',
      'kongzi-teaching',
      'yue-defeats-wu',
    ],
  },
  warring: {
    focusReason: '选择前350年，观察诸国竞争与改革展开后的格局，便于接着理解秦的崛起。',
    question: '秦如何从诸侯竞争中取得优势？',
    context:
      '诸侯间的竞争既发生在战场，也发生在土地、赋税、军队与政治制度的组织方式上。变法与兼并相互推动，统一并不是一开始就确定的结局。',
    chronologyNote:
      '“战国”是历史分期，不是一个王朝。前475年是这一导航分期的起点，学习路线从已收录的三家分晋节点展开。',
    polities: ['秦', '楚', '齐', '赵', '魏', '韩', '燕'],
    people: ['shangyang', 'sunbin', 'zhaowuling', 'baiqi', 'yingzheng'],
    steps: ['three-jin', 'shangyang', 'guiling', 'hufu', 'changping', 'qin-unifies'],
  },
  qin: {
    focusReason: '选择前210年，在统一之后观察帝国格局，同时接近皇位继承与起义的转折点。',
    question: '统一的制度为什么很快遇到危机？',
    context:
      '统一六国后，秦把不同地区纳入新的行政与政治秩序。继续扩张、大型动员和继承问题，使新帝国的整合与社会负担同时成为理解这一时期的线索。',
    chronologyNote:
      '路线从前221年统一六国开始。时期起止用于导航；末年事件跨越起义、战争与政权更替。',
    polities: ['秦朝'],
    people: ['yingzheng', 'lisi', 'chensheng', 'xiangyu'],
    steps: ['qin-unifies', 'qin-south', 'books', 'qin-death', 'dazexiang', 'julu'],
  },
  han: {
    focusReason: '选择前100年，观察汉武帝时期的帝国与向西交流；这一年不代表汉代疆域的最大范围。',
    question: '统一帝国如何整合内部并连接外部世界？',
    context:
      '汉代经历西汉、新朝与东汉的政治转折。地方治理、宫廷权力、社会动员和跨区域交流，让持续数百年的历史呈现出不同阶段。',
    chronologyNote:
      '前206年是本版楚汉阶段的导航起点，前202年是刘邦称帝节点。西汉与东汉不是一段毫无中断的统治。',
    polities: ['汉朝', '新朝', '匈奴', '西域诸政权'],
    people: ['liubang', 'hanwudi', 'zhangqian', 'wangmang', 'liuxiu', 'caocao'],
    steps: [
      'hongmen',
      'han-founded',
      'seven-states',
      'zhangqian',
      'western-regions',
      'xin-founded',
      'eastern-han',
      'yellow-turbans',
      'chibi',
      'wei-founded',
    ],
  },
  three: {
    focusReason: '选择230年，魏、蜀、吴的政治名分已形成，适合观察三个政权并立的典型格局。',
    question: '三个政权如何形成，又怎样走向统一？',
    context:
      '三个政权各有政治名分、地域基础与军事条件。长江、山地与北方平原影响竞争方式，政权内部的权力转移也会改变地图上的格局。',
    chronologyNote:
      '220年建魏、221年刘备称帝、229年孙权称帝是不同节点。汉末的前史另见“三国，从群雄到归一”专题。',
    polities: ['曹魏', '蜀汉', '吴'],
    people: ['caopi', 'liubei', 'sunquan', 'zhugeliang', 'simayi', 'simayan'],
    steps: [
      'wei-founded',
      'shu-founded',
      'yiling',
      'wu-emperor',
      'gaoping',
      'shu-falls',
      'jin-founded',
      'jin-unifies',
    ],
  },
  jin: {
    focusReason: '选择383年，配合淝水之战观察南北并立；这一时期并不存在统一的“盛世”标签。',
    question: '短暂统一之后，为什么又出现长期分立？',
    context:
      '西晋的内部冲突与北方战争推动人口迁徙和政权重组。晋室南渡后，东晋与北方多个政权并存，地方社会与文化也在迁徙中改变。',
    chronologyNote:
      '本版导航从281年开始，路线从280年统一节点读起。317年的东晋建立与北方十六国历史相互交织。',
    polities: ['西晋', '东晋', '前秦', '北方诸政权'],
    people: ['simayan', 'fujian', 'xiean'],
    steps: ['jin-unifies', 'eight-princes', 'yongjia', 'eastern-jin', 'feishui', 'liu-song'],
  },
  'north-south': {
    focusReason: '选择500年，观察北魏迁都改革之后与南方政权并立的格局。',
    question: '南北竞争如何推动制度与文化变化？',
    context:
      '南北各政权既有军事竞争，也有人口、宗教与文化的流动。北方的迁都与改革、南方的朝代更替，为理解隋的统一提供了背景。',
    chronologyNote:
      '这是多个政权并立的历史时期。420年刘宋建立早于本版421年的导航起点；路线也包含向隋统一的过渡。',
    polities: ['北魏', '东魏', '西魏', '北齐', '北周', '南朝诸政权'],
    people: ['xiaowen', 'yangjian'],
    steps: ['liu-song', 'north-wei', 'xiaowen', 'wei-divides', 'sui-founded', 'sui-unifies'],
  },
  sui: {
    focusReason: '选择605年，以运河建设为线索观察统一之后的区域整合。',
    question: '统一与大规模动员为何带来不同后果？',
    context:
      '隋从北方政权发展为统一王朝，通过行政整合和交通工程连接南北。工程、战争与征发叠加，也使社会压力逐渐转化为统治危机。',
    chronologyNote: '581年建隋与589年灭陈统一是两个节点，不能合并为同一个“王朝开始”。',
    polities: ['隋朝'],
    people: ['yangjian', 'yangguang'],
    steps: ['sui-founded', 'sui-unifies', 'canal', 'tang-founded'],
  },
  tang: {
    focusReason: '选择750年，便于观察安史之乱前的格局，并与755年之后的变化对照。',
    question: '开放的帝国如何转变为新的地方格局？',
    context:
      '唐代的城市、宗教、贸易与边疆交流形成广泛联系。宫廷继承、军事力量与地方治理之间的关系，在安史之乱前后发生重要变化。',
    chronologyNote:
      '618年是建唐节点；690年的武周与安史之乱等转折须分别理解。750年是代表年份，不是对整段唐代的评价。',
    polities: ['唐朝', '吐蕃', '突厥与西域诸政权'],
    people: ['liyuan', 'lishimin', 'xuanzang', 'wuzetian', 'lilongji', 'dufu'],
    steps: [
      'tang-founded',
      'xuanwu',
      'xuanzang',
      'wu-zhou',
      'talas',
      'an-lushan',
      'an-shi-ends',
      'diamond-sutra',
      'tang-ends',
    ],
  },
  five: {
    focusReason: '选择950年，观察北方朝代与南方多个政权并存的阶段。',
    question: '长期分立中，区域社会怎样继续发展？',
    context:
      '北方的朝代更替与南方政权的发展呈现不同节奏。战争延续，但地方建设、商业与文化也在发展，宋的建立并不意味着全部地区立即统一。',
    chronologyNote:
      '907—959年是导航分期。以唐亡、刻印九经、燕云十六州与后周改革连接前后，观察政治更替中延续的文化、边防和区域经营。',
    polities: ['五代诸朝', '吴越', '南唐', '后蜀', '南汉等'],
    people: ['zhaokuangyin'],
    steps: [
      'tang-ends',
      'nine-classics-printing',
      'yanyun',
      'gaoping-954',
      'later-zhou-reforms',
      'later-zhou-huainan',
      'later-zhou-north',
      'song-founded',
    ],
  },
  song: {
    focusReason: '选择1140年，以南宋与金的竞争为入口；宋、辽、西夏、金的存续区间并不相同。',
    question: '多国并立与经济文化发展如何同时发生？',
    context:
      '战争、盟约与贸易是理解这些政权关系的三条线索。宋代的城市、技术和政治改革，需要与周边政权及蒙古扩张放在同一时间中观察。',
    chronologyNote:
      '这是宋与周边政权的合并导航分期。1127年的转折、1271年定国号元与1279年宋亡分别标注，不互相替代。',
    polities: ['北宋', '南宋', '辽', '金', '西夏', '蒙古'],
    people: ['zhaokuangyin', 'bisheng', 'wanganshi', 'yuefei', 'genghis', 'kublai'],
    steps: [
      'song-founded',
      'chanyuan',
      'movable-type',
      'wanganshi',
      'jingkang',
      'yancheng',
      'mongol',
      'yuan-name',
      'yashan',
    ],
  },
  yuan: {
    focusReason: '选择1294年，观察统一后的元代格局，并联系大都与交通建设。',
    question: '欧亚联系怎样影响统治和城市？',
    context:
      '蒙古扩张形成广泛的区域联系，元朝则面对不同地区与人群的治理。大都、交通、水利和跨区域流动，是这条学习路线的重要线索。',
    chronologyNote:
      '1271年定国号元，1279年宋亡。本版元的导航区间从1279年开始；从建立节点学习会先进入宋末的地图年份。',
    polities: ['元朝', '蒙古诸汗国'],
    people: ['kublai', 'guoshoujing'],
    steps: ['yuan-name', 'yashan', 'tonghui', 'ming-founded'],
  },
  ming: {
    focusReason: '选择1421年，以迁都北京为入口，连接政治中心、交通与海洋活动。',
    question: '政治中心与海洋联系如何重塑秩序？',
    context:
      '明初建立新的统治秩序，随后迁都并组织远洋航行。中后期的商业、财政和边疆问题，又让国家与地方社会的关系发生变化。',
    chronologyNote:
      '1368年建明、1421年迁都与1644年北京政权更替是不同节点。南明等延续政权也需要单独观察。',
    polities: ['明朝', '后金', '周边诸政权'],
    people: ['zhuyuanzhang', 'zhudi', 'zhenghe', 'zhangjuzheng', 'nurhaci'],
    steps: [
      'ming-founded',
      'zhenghe',
      'beijing-capital',
      'tumu',
      'single-whip',
      'later-jin',
      'qing-enters',
    ],
  },
  qing: {
    focusReason:
      '选择1750年，观察18世纪中叶的格局，并与19世纪的战争和变革对照；不把它标为疆域最大年份。',
    question: '区域治理与全球变化如何相互影响？',
    context:
      '清代的统治、边疆关系与人口经济变化，逐渐与全球贸易和军事竞争相遇。19世纪的战争、改革和革命推动了政治秩序的转折。',
    chronologyNote:
      '1616年后金建立与1644年入关分别标注。这里的路线从前身后金起步；1644年只是本版清的导航起点。',
    polities: ['清朝', '周边诸政权'],
    people: ['nurhaci', 'kangxi', 'qianlong', 'linzexu', 'lihongzhang', 'sunyatsen', 'puyi'],
    steps: [
      'later-jin',
      'qing-enters',
      'taiwan',
      'nerchinsk',
      'canton',
      'humen',
      'opium-war',
      'nanjing-treaty',
      'sino-japanese',
      'wuchang',
      'abdication',
    ],
  },
}

export const periodCourses: Tour[] = periods.map((period) => ({
  id: `period-${period.id}`,
  name: `${period.name} · 从开篇读起`,
  subtitle: '按历史节点逐步阅读',
  description: profiles[period.id].question,
  color: period.color,
  icon: 'swords',
  steps: profiles[period.id].steps,
}))
