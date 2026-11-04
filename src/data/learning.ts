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
      '聚落布局、植物遗存与器物，让我们能从居住、食物和劳动认识早期共同体。黄河流域的粟黍、长江流域的稻作，以及西亚和新几内亚的农业实践各有条件；房屋、陶窑和独木舟进一步显示人群怎样协作并利用环境。各地的发展节奏与组合方式有所不同。',
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
      '城市道路、公共工程、精细工艺和书写，体现人们组织劳动与保存知识的新方式。良渚、两河、尼罗河、印度河和安第斯地区留下不同组合的证据，绳文聚落和欧洲石屋村落又扩展了比较范围。由具体遗存出发，可以观察复杂社会怎样在多样环境中形成。',
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
      '《史记》以禹、启及世系讲述夏代，二里头的宫殿、道路和作坊则显示都邑规划与手工业分工。将文献记忆与实物材料放在一起，可以追问权力和资源怎样集中；二者的对应关系仍需论证，确切年代与王朝地望也保留讨论。',
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
      '商代都邑经历迁移，晚期以殷为重要中心。卜辞记录祭祀、征战与农事，青铜器、墓葬和作坊呈现礼仪等级与资源组织。文字和考古相互对照，使王室决策、地方关系与日常生产进入可具体研究的历史。',
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
      '克商后的周王室通过封邦建国、宗族和礼仪组织联盟，诸侯也逐渐形成各自的地方资源。青铜铭文中的封赏、征伐与贵族活动，显示这种关系怎样运转。王室后期的危机与东迁，又使原有秩序进入新的调整阶段。',
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
      '齐、晋、楚、秦及吴越先后改变区域力量，霸主通过战争、婚姻与会盟组织合作。诸侯内部也调整赋税和治理，成文法与教学活动带来新的公共讨论。阅读会盟与思想节点，可以同时观察国家之间和地方社会内部的变化。',
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
      '列国将竞争推进到土地、赋税、军队和地方组织，变法增强动员能力，也改变居民的负担与机会。士人游说与百家论辩同时展开，对秩序和人的生活提出不同解释。秦的优势在多阶段战争与治理中形成，统一的走向仍经历持续竞争。',
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
      '秦将六国地区纳入郡县和皇帝主导的行政秩序，统一文字、货币与度量衡等标准，面对的是长期整合的任务。边地扩张和道路、宫室等工程持续征集资源，始皇死后的继承争夺又削弱协调，使地方反抗迅速扩大。',
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
      '汉初在郡县与诸侯之间重建统治，随后以财政、选官和军事安排加强朝廷能力。张骞出使及河西经营推动对外联系，城市与绿洲连接更广阔的商旅网络。新朝更替、东汉重建到汉末战争，展示数百年间政治与地方社会的多次重组。',
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
      '魏、蜀、吴拥有不同的人口、粮食与交通条件，长江防线、汉中通道和北方平原因而影响各自选择。战争与联盟持续调整，地方经营也支撑长期对抗。司马氏在魏内部取得权力后建立晋，统一由不同战线的多年行动逐步完成。',
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
      '西晋内部争斗与北方战争，使皇室、军队和地方力量重新组合。晋室南渡后，移民家族与江南原有社会共同参与东晋统治，农业和文化生活也随之变化。北方诸政权则在联盟、扩张与重建之间发展，与江南保持战争和交流。',
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
      '南北政权围绕土地、军队和地方集团调整治理，北魏迁都改革与南方王朝更替各有动力。佛教寺院、石窟艺术、学术与技术传播，使政治分立与文化往来同时发展。长期积累的组织和交通条件，也进入隋朝统一后的治理。',
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
      '隋继承北方军政资源并统一南方，接着需要整合户籍、税收与地方行政。运河把政治中心与粮食产区联系起来，交通和制度互相支持。持续工程与对外战争却叠加劳役和供给压力，反抗与统治集团分裂最终推动王朝崩溃。',
    chronologyNote: '581年建隋与589年灭陈统一是两个节点，不能合并为同一个“王朝开始”。',
    polities: ['隋朝'],
    people: ['yangjian', 'yangguang'],
    steps: ['sui-founded', 'sui-unifies', 'canal', 'tang-founded'],
  },
  tang: {
    focusReason: '选择750年，便于观察安史之乱前的格局，并与755年之后的变化对照。',
    question: '开放的帝国如何转变为新的地方格局？',
    context:
      '唐代都城连接贸易、宗教与多种语言文化，选官和官僚制度支撑帝国治理。边军力量与财政需求长期增长，安史之乱又改变中央和地方的资源关系。此后的藩镇、赋税调整与城市文化共同构成中晚唐的发展，战争并未概括全部社会生活。',
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
      '北方军队与朝廷反复更替，南方政权则利用水运、农业和商业经营区域。战争之外，水利、刻书与文化赞助持续积累，地方社会具有不同的发展节奏。后周整顿军政与宋朝建立相衔接，统一各地仍需要后续行动。',
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
      '宋与周边政权既相互作战，也借盟约、使节和贸易协调关系。财政与边防压力推动改革，城市商业和印刷又改变知识传播。靖康之后的南移重组人口与经济中心，蒙古扩张进一步改变各国处境，政治竞争与社会创造始终交织。',
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
      '蒙古帝国形成的联系进入元朝治理，大都的供应与行政依靠水运、驿站和区域协作。官员、商旅、工匠及知识在更广阔范围流动，制度也要处理不同人群与地方条件。财政、水利与社会冲突相互影响，逐渐进入元末危机。',
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
      '明初通过军政和户籍制度组织人口资源，迁都北京使运河供应与北方防御更加紧密，远洋航行又联结海上世界。中后期商业、出版和白银贸易改变社会生活，赋税调整与地方经济相互牵连，边防、灾害和政治冲突最终汇入统治危机。',
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
      '清朝整合不同区域与人群，地方行政、边疆制度和人口经济共同塑造帝国。市场联系扩大时，土地与生计压力也在增长。19世纪对外战争和内部动乱改变财政与军队结构，新政、公共讨论与革命最终推动皇朝秩序结束。',
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
