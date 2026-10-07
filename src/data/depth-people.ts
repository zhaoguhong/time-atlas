import type { Person, Source } from '../types'
import { bookUrl } from './sources'

const book = (name: string, volume: string): Source => ({
  title: `《${name}》卷${Number(volume)}`,
  url: bookUrl(name, volume),
  note: '古籍原文参考；介绍为本项目撰写的现代整理稿。',
})
const profiles: Array<
  Pick<Person, 'id' | 'name' | 'role' | 'summary' | 'biography' | 'sources' | 'era'> &
    Partial<Person>
> = [
  {
    id: 'depth-zhengguo',
    name: '郑国',
    era: 'warring',
    role: '战国水利工程人物',
    summary: '主持引泾灌溉工程，与秦的关中农业和战争资源经营相联系。',
    biography:
      '郑国是战国时期的水利工程人物，《史记》将其进入秦国与韩国希望耗费秦力的安排联系起来。秦廷发现有关计划后仍继续工程，因为引水灌溉对农业有实际价值。个人来历、政治策划与技术作用需要分别理解。\n\n郑国渠利用泾水改善关中生产条件，修筑、完工与长期效益形成不是同一年。工程需要劳力、技术和维护，不能只归功于一人的设计。可靠生卒材料有限，本版保留未知，也不将工程涉及的全部渠道当作郑国逐年亲访的路线。',
    sources: [book('史記', '029')],
  },
  {
    id: 'depth-chenqun',
    name: '陈群',
    era: 'three',
    role: '汉末曹魏官员',
    summary: '提出九品选官安排，参与曹魏中枢组织与政治。',
    biography:
      '陈群是汉末至曹魏的重要官员，参与曹氏集团的中枢政务，在魏建立时提出九品选官安排。地方品评与中央任命的联系，为理解曹魏官僚组织提供入口。制度并不是他一人完全执行，运行依赖官署、地方人物网络与朝廷。\n\n后来门第与士族资源对九品制度产生深刻影响，不应把全部后世结果都当作220年原始设计已定。陈群的政治生涯也超出一项制度，传记反映其家族、官职和朝廷关系。资料未在本轮逐项核定的生卒仍留未知，不用常见推算补成精确行迹。',
    sources: [book('三國志', '22')],
  },
  {
    id: 'depth-liuyuan',
    name: '刘渊',
    era: 'jin',
    role: '十六国汉赵建立者',
    summary: '在西晋内乱中利用匈奴及地方资源建国，采用汉的政治名义。',
    biography:
      '刘渊在西晋政治与军事环境中发展力量，利用匈奴及其他地方人员建立政权，采用汉的国号与合法性表达。不同人口和军事资源共同支持其组织，并不表示它就是刘秀东汉直接恢复。西晋内乱削弱中央，也为其崛起创造条件。\n\n其后继者继续战争，洛阳失陷等事件发生在新的阶段，不能全部写成刘渊本人亲自完成。汉赵的国号、首都和实际控制又有变化。学习可将晋末危机、304年建国和永嘉之乱连读，区分创始人的生平与政权后续发展。',
    sources: [book('晉書', '101')],
  },
  {
    id: 'depth-guantianpei',
    name: '关天培',
    era: 'qing',
    role: '清代广东水师提督',
    summary: '组织珠江口海防，在第一次鸦片战争虎门战事中殉职。',
    biography:
      '关天培在广东水师与海防职任中处理炮台、舰船和训练，林则徐禁烟期间参与地方防务。珠江口既是贸易通道也是军事前沿，朝廷的和战命令与实际防守条件不断变化。个人尽责与军队总体能力之间不能简单画等号。\n\n1841年英军攻虎门炮台，关天培与守军战死，珠江口防线遭严重突破。后世纪念强调其抵抗与牺牲，理解事件仍需舰船火力、指挥、资源和战争跨区域推进的背景。战死节点不应遮盖此前实际海防工作，也不据炮台范围生成未核对的个人轨迹。',
    sources: [book('清史稿', '372')],
  },
  {
    id: 'depth-shenbaozhen',
    name: '沈葆桢',
    era: 'qing',
    role: '清代官员、船政与台湾事务人物',
    summary: '主持福州船政等事务，参与晚清技术、教育与地方治理。',
    biography:
      '沈葆桢在晚清地方政务与战争环境中任职，继左宗棠筹划后主持福州船政。造船、学堂和技术人员培养依赖工厂、财政、外籍人员与本地工匠协作，不能由一位官员的姓名替代整个组织。项目各阶段的职责也需要区别。\n\n他后来处理台湾等事务，其政治与技术经验在不同地方条件下发挥作用。船政长期培养的人才、后来舰队和战争并非都由他本人直接指挥。阅读生平可以连读洋务、船政和海防，行政责任范围不等于逐年亲自访问的所有地点。',
    sources: [book('清史稿', '413')],
  },
  {
    id: 'depth-zengjize',
    name: '曾纪泽',
    era: 'qing',
    role: '晚清外交官',
    summary: '参与清与俄国的伊犁交涉，也从事驻外及中外外交事务。',
    biography:
      '曾纪泽是曾国藩之子，担任驻外外交职务，利用语言、文书与谈判处理清与列强关系。伊犁交涉在此前条约和新疆军事收复的背景下展开，外交代表的选择受到国家力量、清廷政策和外国立场制约。\n\n1881年条约调整了伊犁相关安排，但仍有赔款和其他代价，不能仅以成功或失败一个词概括。使节、军队和地方官各有不同角色，谈判与1884年建省也不是同一步。原典可帮助理解其职任与活动，完整个人旅程仍需逐年独立核对。',
    sources: [book('清史稿', '446')],
  },
  {
    id: 'depth-cian',
    name: '慈安',
    aliases: ['慈安太后', '孝贞显皇后'],
    era: 'qing',
    role: '清代皇太后',
    summary: '与慈禧等参与辛酉政变，在同治、光绪早期宫廷政治中具有重要地位。',
    biography:
      '慈安是咸丰皇后，同治幼年继位时成为皇太后，与慈禧、恭亲王等联合改变辅政格局，参与垂帘听政。幼帝、皇太后、亲王与中枢官员之间形成新的权力关系，不能把所有清廷决策都直接归为一人独立行动。\n\n她在同治及光绪早期宫廷中有重要地位，但可靠材料和后世传说对具体作用的描述并不相同。关于个人性格、与慈禧关系和死亡的故事须谨慎辨别。生平可从辛酉政变、幼帝政治和当时制度关系理解，不用未证实传闻填充介绍或人物行迹。',
    sources: [book('清史稿', '214')],
  },
  {
    id: 'depth-yixin',
    name: '奕䜣',
    aliases: ['奕訢', '奕欣', '恭亲王', '恭亲王奕䜣'],
    era: 'qing',
    role: '清代恭亲王、外交与中枢政治人物',
    summary: '参与第二次鸦片战争后的交涉、辛酉政变及总理衙门事务。',
    biography:
      '奕䜣是道光帝之子、咸丰帝的兄弟，封恭亲王，在1860年北京危机中留下处理交涉。次年与两宫皇太后等参与辛酉政变，并在新设总理衙门承担重要职责。战争后的外交与技术需求，使传统皇室和官僚面对新的组织问题。\n\n其政治地位又随慈禧及中枢关系变化，多次进退，支持洋务不意味着拥有不受限制的决策权。个人谈判、机构领导与具体项目执行应分开说明。不同字形“奕䜣”“奕訢”指同一人，可作为检索别名，行政影响范围不能直接变成人物旅行。',
    sources: [book('清史稿', '221')],
  },
  {
    id: 'depth-ronghong',
    name: '容闳',
    aliases: ['容閎', 'Yung Wing'],
    birth: 1828,
    death: 1912,
    era: 'qing',
    role: '近代留学教育与改革人物',
    summary: '留学美国，参与机器采购并倡议、组织留美幼童教育。',
    biography:
      '容闳在澳门、香港等地接受教育，后来赴美国学习，毕业于耶鲁大学后回国，尝试通过技术和教育改善国家条件。他参与近代机器采购，与曾国藩、李鸿章等官员合作推动幼童赴美，个人经验与清廷洋务需求在此相连。\n\n1872年首批学生出发后，项目涉及寄宿、课程、监护与跨国生活，后来因政治和教育争议中止。回国学生的影响仍持续，容闳又参与清末改革与政治活动。其生平和自述有不同材料层次，完整行迹不以留学项目地图自动生成。',
    sources: [
      { title: '珠海博物馆 · 容闳', url: 'https://www.zhmuseum.org.cn/yanjiu/mrgsInfo?id=7' },
      {
        title: '中山市文化广电旅游局 · 容闳',
        url: 'https://www.zs.gov.cn/zjzs/zsmr/content/post_220052.html',
      },
    ],
  },
  {
    id: 'depth-ricci',
    name: '利玛窦',
    aliases: ['Matteo Ricci', '利瑪竇'],
    birth: 1552,
    death: 1610,
    era: 'ming',
    role: '明末来华耶稣会传教士、知识交流人物',
    summary: '与中国士人交往，合作传播数学、地图与天文等知识。',
    biography:
      '利玛窦是意大利耶稣会传教士，来华后学习语言、与官员和士人交往，1601年到北京。宗教活动与数学、地图和仪器介绍相连，交流依赖中国合作者、翻译和出版，不是欧洲知识单向传入便自动改变社会。\n\n他与徐光启合作译《几何原本》前六卷，术语和论证方式需要共同推敲。传教目的、文化适应与学术贡献应分别理解，不能只用友好交流覆盖所有政治宗教条件。文本传播到的地区不一定本人亲访，网站不由作品影响范围生成年度轨迹。',
    sources: [
      { title: '故宫博物院 · 利玛窦', url: 'https://www.dpm.org.cn/lemmas/240156.html' },
      {
        title: '故宫博物院 · 几何原本',
        url: 'https://www.dpm.org.cn/ancient/mingqing/142246.html',
      },
    ],
  },
]

export function enrichDepthPeople(people: Person[]): Person[] {
  const result = [...people]
  for (const profile of profiles) {
    const index = result.findIndex(
      (person) => person.name === profile.name || person.aliases?.includes(profile.name),
    )
    if (index >= 0) {
      const existing = result[index]
      result[index] = {
        ...existing,
        ...profile,
        id: existing.id,
        recordKind: 'curated',
        sources: [...profile.sources, ...existing.sources],
      }
    } else {
      result.push({ birth: null, death: null, color: '#82916e', ...profile, recordKind: 'curated' })
    }
  }
  return result
}
