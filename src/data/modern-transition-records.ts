import type { HistoryEvent, Person } from '../types'
import { transitionSources as ref } from './modern-transition-sources'

export const modernTransitionPeople: Person[] = [
  {
    id: 'modern-fu-zuoyi',
    name: '傅作义',
    courtesy: '宜生',
    birth: 1895,
    death: 1974,
    era: '近现代',
    recordKind: 'curated',
    role: '抗日将领、水利部长',
    color: '#658a87',
    summary: '抗日战争期间长期在北方领兵，1949年参与促成北平和平解放，后来负责新中国早期水利工作。',
    biography:
      '傅作义是山西荣河人。全面抗战时期，他在绥远等地指挥部队作战。国共内战末期，他担任国民党华北军政方面的主要负责人之一。1949年1月，经过谈判，他接受了和平解决北平问题的安排，所部陆续出城，北平防务于1月31日交接。中华人民共和国成立后，傅作义担任水利部长。1949年末，他主持召开全国解放区水利联席会议，了解各地水利工作，并参与制定1950年度计划。',
    sources: [ref.fuZuoyi, ref.earlyWaterWorks, ref.beiping],
  },
  {
    id: 'modern-he-yingqin',
    name: '何应钦',
    aliases: ['何應欽'],
    courtesy: '敬之',
    birth: 1890,
    death: 1987,
    era: '近现代',
    recordKind: 'curated',
    role: '国民政府军政官员、中国战区受降代表',
    color: '#967b5a',
    summary: '曾任国民政府军政部长。1945年任中国陆军总司令，在南京接受侵华日军投降。',
    biography:
      '何应钦出身贵州兴义，先后任国民政府军政部长、中国陆军总司令等职。1937年卢沟桥事变后，前线将领曾将宛平一带交战经过电报呈送军政部。日本战败后，何应钦以中国战区受降全权代表身份主持总受降。1945年9月9日，他在南京中央军校大礼堂接收侵华日军总司令冈村宁次递交的降书。部队缴械与地方接收另按战区安排展开。',
    sources: [ref.heYingqin, ref.heArchive, ref.lugouqiao, ref.nanjingSurrender],
  },
  {
    id: 'modern-haile-selassie',
    name: '海尔·塞拉西一世',
    aliases: ['海尔·塞拉西', '塔法里·马康南', 'Haile Selassie'],
    birth: 1892,
    death: 1975,
    era: '20世纪',
    recordKind: 'curated',
    role: '埃塞俄比亚皇帝',
    color: '#927256',
    summary: '意大利侵占埃塞俄比亚后曾向国际联盟申诉，1941年返回首都，后来参与非洲统一组织的创建。',
    biography:
      '海尔·塞拉西原名塔法里·马康南，1930年加冕为埃塞俄比亚皇帝。意大利发动侵略后，他离开埃塞俄比亚，1936年在国际联盟陈述本国遭受侵略的处境。埃塞俄比亚抵抗力量在英国部队协助下反攻。他于1941年5月5日回到亚的斯亚贝巴。战后他继续推动埃塞俄比亚参与国际事务，1963年非洲统一组织在亚的斯亚贝巴成立。国内在他的统治下仍存在土地、税负和政治参与等尖锐矛盾，军方于1974年废黜他。',
    sources: [ref.ethiopia, ref.haile],
  },
]

export const modernTransitionEvents: HistoryEvent[] = [
  {
    id: 'modern-central-asia-revolt-1916',
    year: 1916,
    dateLabel: '1916年夏秋',
    dateNote: '起事、镇压和逃亡在各地先后发生，以主要阶段定位。',
    title: '中亚反征工起义',
    aliases: ['1916年中亚大起义', '乌尔昆', 'Ürkün'],
    category: '社会',
    region: 'central-asia',
    location: '俄属中亚七河地区等地',
    coordinates: [78.38, 42.49],
    locationNote: '标在今天吉尔吉斯斯坦伊塞克湖东侧，作为七河地区的代表点。',
    people: [],
    importance: 4,
    summary: '俄国战时征工命令引发中亚多地反抗。镇压造成大批吉尔吉斯人越境进入中国新疆。',
    background: '第一次世界大战加重俄国在中亚的经济索取，移民定居与土地分配也早有矛盾。',
    impact: '逃亡给家庭和牧业造成重创。部分难民1917年返回后又面对土地被占及迁置问题。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1916年夏，俄国政府命令征调中亚居民承担战线后方的劳动。命令传到地方时，战时负担和移民定居引起的土地矛盾已经延续多年。起义在各地陆续发生，七河地区的吉尔吉斯人与哈萨克人也卷入其中。',
            '俄军和当地武装镇压起义，许多吉尔吉斯家庭越过天山进入中国新疆。逃亡中的死亡和财产损失难以精确计数。1917年部分难民回到七河，有些人已无法返回原有土地。吉尔吉斯历史记忆里的“乌尔昆”常指这一段大出逃。',
          ],
        },
      ],
    },
    sources: [ref.centralAsianRevolt, ref.centralAsianRefugees],
  },
  {
    id: 'modern-northeast-flag-replacement',
    year: 1928,
    dateLabel: '1928年12月29日',
    title: '东北易帜',
    aliases: ['东北改旗易帜'],
    category: '政治',
    region: 'china',
    location: '奉天（今辽宁沈阳）',
    coordinates: [123.43, 41.8],
    placeIds: ['shenyang'],
    people: ['exp-em-zhang-xueliang'],
    importance: 5,
    summary: '张学良通电奉、吉、黑三省换旗并服从南京国民政府，东北政务机构随后改组。',
    background: '北伐改变了华北政局。皇姑屯事件后，张学良接掌东北军政事务，与南京方面交涉。',
    impact: '南京政府获得东北地方政权的承认，东北主要军政力量仍由原有机构及人员组织。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1928年12月29日，张学良通电宣布奉天、吉林、黑龙江三省更换旗帜，服从南京国民政府。东北保安委员会改组为东北政务委员会。经过北伐和南北交涉，南京方面由此取得东北主要军政力量的政治承认。',
            '易帜之后，地方建制仍有具体调整。1929年奉天省改称辽宁省。东北军的编制、地方财政和对日本、苏联的交涉继续涉及当地既有机构。',
          ],
        },
      ],
    },
    relatedEvents: [
      {
        id: 'exp-em-september-eighteen',
        label: '再看东北在1931年的变化',
        note: '九一八事变中，日本关东军发动对中国东北的侵略。',
      },
    ],
    sources: [ref.northeast, ref.liaoning],
  },
  {
    id: 'modern-manchukuo-puppet-regime',
    year: 1932,
    dateLabel: '1932年3月',
    title: '日本扶植伪满洲国',
    aliases: ['伪满洲国成立', '伪满政权'],
    category: '政治',
    region: 'china',
    location: '吉林长春',
    coordinates: [125.34, 43.91],
    placeIds: ['changchun'],
    people: ['puyi'],
    importance: 4,
    summary: '日本在侵占中国东北后扶植伪满洲国，拥立溥仪执政，以长春为统治中心。',
    background: '九一八事变后，日本关东军占领东北多地，开始以新设机构控制地方政务。',
    impact: '伪满机构成为日本在东北推行殖民统治、征用资源与控制经济的工具。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1932年3月，日本在侵占中国东北后扶植伪满洲国，由清朝逊帝溥仪担任执政，长春成为统治中心。同年，伪满当局将长春改称“新京”。关东军仍掌握军事与政治上的实权。',
            '铁路、矿产和工业生产逐步被纳入日本的资源调配。1934年日本操纵伪满实行帝制，溥仪的头衔由执政改为皇帝。伪满当局的机关与日军占领共同维持了对东北的殖民统治。',
          ],
        },
      ],
    },
    relatedEvents: [
      {
        id: 'exp-em-september-eighteen',
        label: '占领的开端',
        note: '九一八事变后关东军侵占东北多地。',
      },
    ],
    sources: [ref.changchun, ref.liaoning],
  },
  {
    id: 'modern-iraq-mandate-ends',
    year: 1932,
    dateLabel: '1932年10月3日',
    title: '伊拉克结束英国委任统治并加入国际联盟',
    aliases: ['伊拉克独立'],
    category: '政治',
    region: 'west-asia',
    location: '伊拉克巴格达',
    coordinates: [44.37, 33.31],
    placeIds: ['baghdad'],
    locationNote: '标在伊拉克首都。国际联盟的入会程序在日内瓦进行。',
    people: [],
    importance: 4,
    summary: '国际联盟批准伊拉克入会，英国在伊拉克的委任统治随之终止。',
    background:
      '奥斯曼帝国战败后，伊拉克处于英国委任统治之下。伊拉克政府通过谈判争取结束这一制度。',
    impact: '伊拉克取得国际联盟成员资格，并按与英国订立的条约继续处理外交与军事关系。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '英国在第一次世界大战后受国际联盟委任管理伊拉克。伊拉克王国建立以后，伊拉克政府与英方以条约商议结束委任统治的条件。1932年10月3日，国际联盟接纳伊拉克，英国的委任统治随即终止。',
            '入会意味着伊拉克以独立国家身份参与国际联盟。此前为处理独立后关系而订立的英伊条约仍然有效，双方的军事与外交合作延续下来。',
          ],
        },
      ],
    },
    sources: [ref.iraq],
  },
  {
    id: 'modern-lugou-bridge-incident',
    year: 1937,
    dateLabel: '1937年7月7日',
    title: '七七事变',
    aliases: ['卢沟桥事变'],
    category: '战争',
    region: 'china',
    location: '北平卢沟桥、宛平城',
    coordinates: [116.21, 39.85],
    placeIds: ['beijing'],
    people: [],
    importance: 5,
    summary: '日军在卢沟桥附近挑起事变，中国守军抵抗。交战随后扩大，中国进入全面抗战阶段。',
    background:
      '日本侵占东北后不断加紧对华北的军事和政治压力，北平西南的卢沟桥与宛平城处于冲突前沿。',
    impact: '交战在7月下旬扩大到北平、天津。对日战争由局部抵抗进入全民族抗战。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1937年7月7日夜，日军在卢沟桥附近演习，以一名士兵失踪为由要求进入宛平城搜查，中国守军拒绝。次日清晨，日军向宛平和卢沟桥一带的驻军进攻，守卫这一带的中国第二十九军还击。',
            '双方交涉一度持续，日军同时向华北增兵。7月底，北平和天津先后被日军占领。卢沟桥的冲突由此成为全面抗战开始的节点，东北等地抗日活动的时间还要往前追溯。',
          ],
        },
      ],
    },
    relatedEvents: [
      {
        id: 'modern-china-war',
        label: '接着读全面抗日战争',
        note: '由一次冲突进入持续八年的全面战争。',
      },
    ],
    sources: [ref.lugouqiao],
  },
  {
    id: 'modern-ethiopia-restoration-1941',
    year: 1941,
    dateLabel: '1941年5月5日',
    title: '海尔·塞拉西一世返回亚的斯亚贝巴',
    aliases: ['埃塞俄比亚恢复独立', '埃塞俄比亚结束意大利占领'],
    category: '政治',
    region: 'africa',
    location: '埃塞俄比亚亚的斯亚贝巴',
    coordinates: [38.76, 9.03],
    people: ['modern-haile-selassie'],
    importance: 4,
    summary: '埃塞俄比亚抵抗力量与英军反攻后，海尔·塞拉西一世返回首都，着手恢复本国政府。',
    background: '意大利军队1936年占领亚的斯亚贝巴，埃塞俄比亚多地仍有抵抗活动。',
    impact: '埃塞俄比亚恢复国家机构。1942年与英国签订协定，进一步确认主权地位。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1941年5月5日，流亡多年的海尔·塞拉西一世回到亚的斯亚贝巴。此前，埃塞俄比亚国内的抵抗力量与进入东非战场的英国部队共同对意军发动反攻，意大利在首都的占领已经结束。',
            '皇帝回到首都以后，政府着手恢复行政。部分地区的军事行动仍在继续。1942年签订的英埃协定确认埃塞俄比亚的主权地位，两国随后仍须交涉战时驻军和地方管理等事宜。',
          ],
        },
      ],
    },
    sources: [ref.ethiopia, ref.ethiopiaAgreement],
  },
  {
    id: 'modern-nanjing-surrender-1945',
    year: 1945,
    dateLabel: '1945年9月9日',
    title: '中国战区南京受降',
    aliases: ['抗战胜利南京受降', '中国战区总受降'],
    category: '政治',
    region: 'china',
    location: '南京黄埔路中央军校大礼堂',
    coordinates: [118.81, 32.04],
    placeIds: ['nanjing'],
    people: ['modern-he-yingqin'],
    importance: 5,
    summary: '中国战区总受降仪式在南京举行，何应钦代表中国方面接受冈村宁次递交的降书。',
    background: '日本已在9月2日签署投降书。盟军按战区和受降区域安排签字、缴械及交接。',
    impact: '南京受降确认了中国战区的投降手续。台湾等地的受降与地方接收随后分区办理。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1945年9月9日，中国战区受降仪式在南京黄埔路的中央军校大礼堂举行。侵华日军总司令冈村宁次作为日本方面代表签署降书，中国陆军总司令何应钦代表中国战区接受投降。',
            '南京是中国战区的总受降地点。部队缴械、人员遣返和各地接收各有安排。台湾省受降仪式于10月25日在台北举行，澎湖守备队也在台湾区的受降名单之中。',
          ],
        },
      ],
    },
    relatedEvents: [
      {
        id: 'modern-japanese-surrender-instrument',
        label: '东京湾签署投降书',
        note: '日本9月2日向同盟国签署投降书。',
      },
      {
        id: 'exp-em-taiwan-retrocession',
        label: '台湾区的受降',
        note: '中国战区台湾省受降典礼于10月25日在台北举行。',
      },
    ],
    sources: [ref.nanjingSurrender, ref.nanjingVenue],
  },
  {
    id: 'modern-chongqing-talks-agreement',
    year: 1945,
    dateLabel: '1945年10月10日',
    title: '重庆谈判签署《双十协定》',
    aliases: ['政府与中共代表会谈纪要', '国共双方代表会谈纪要'],
    category: '政治',
    region: 'china',
    location: '重庆桂园',
    coordinates: [106.56, 29.56],
    placeIds: ['chongqing'],
    locationNote: '坐标取桂园所在的渝中区中山四路一带。',
    people: ['modern-phil-mao', 'exp-em-zhou-enlai'],
    importance: 5,
    summary: '国共两党在重庆签署会谈纪要，同意就和平建国等问题继续协商。',
    background: '日本投降后，国共两党围绕战后政治安排、军队与地方治理展开谈判。',
    impact: '谈判使部分共同主张见诸文件。双方在军队及解放区治理上的分歧此后仍然存在。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1945年8月28日，毛泽东、周恩来和王若飞赴重庆谈判。抗战刚结束，国共两党需要讨论军队安排、地方政权和政治协商等事项。10月10日，双方代表在桂园签署《政府与中共代表会谈纪要》，即《双十协定》。',
            '纪要记录了双方关于和平建国的共同主张，也留下军队与地方政治安排等尚待解决的问题。这些问题在会后继续成为交涉的焦点。',
          ],
        },
      ],
    },
    sources: [ref.chongqing, ref.chongqingAgreement],
  },
  {
    id: 'modern-republic-of-korea-government-1948',
    year: 1948,
    dateLabel: '1948年8月15日',
    title: '大韩民国政府成立',
    category: '政治',
    region: 'east-asia',
    location: '汉城（今首尔）',
    coordinates: [126.98, 37.57],
    placeIds: ['seoul'],
    people: [],
    importance: 4,
    summary: '在半岛南部选举和制宪之后，大韩民国政府于汉城宣告成立。',
    background:
      '日本殖民统治于1945年结束，朝鲜半岛南北分别由美军和苏军接收。统一建政的协商陷入僵局。',
    impact: '半岛南部建立了自己的政府。随后北部也宣告建国，半岛分立格局持续。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '日本战败后，朝鲜半岛南北分别由美苏接收。联合国曾推动通过选举建立政府，其委员会主要在南部开展工作。1948年5月南部举行选举，新成立的议会随后制定宪法并选举李承晚为总统。',
            '8月15日，大韩民国政府在汉城宣告成立。9月，半岛北部又成立朝鲜民主主义人民共和国。南北各自建政，战后分区逐渐演变为政治分立。',
          ],
        },
      ],
    },
    relatedEvents: [
      {
        id: 'modern-dprk-founded-1948',
        label: '对照北部建政',
        note: '同年9月，朝鲜民主主义人民共和国成立。',
      },
    ],
    sources: [ref.koreanDivision, ref.koreanFounding],
  },
  {
    id: 'modern-dprk-founded-1948',
    year: 1948,
    dateLabel: '1948年9月9日',
    title: '朝鲜民主主义人民共和国成立',
    category: '政治',
    region: 'east-asia',
    location: '朝鲜平壤',
    coordinates: [125.75, 39.03],
    placeIds: ['pyongyang'],
    people: [],
    importance: 4,
    summary: '朝鲜半岛北部建立朝鲜民主主义人民共和国，金日成出任政府首脑。',
    background: '日本战败后，苏军接收半岛北部。北部先后建立人民委员会等机构。',
    impact: '南北两个政府分别运作，战后的分区格局进一步固化。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '日本殖民统治结束后，半岛北部在苏军接收区内建立人民委员会。随着南北政治协商难以推进，两地分别组织政府。1948年9月9日，朝鲜民主主义人民共和国在平壤宣告成立，由金日成担任首相。',
            '半岛南部已于同年8月建立大韩民国政府。两个政府相继成立，到1950年朝鲜战争爆发时，分区治理已持续数年。',
          ],
        },
      ],
    },
    relatedEvents: [
      {
        id: 'modern-republic-of-korea-government-1948',
        label: '对照南部建政',
        note: '大韩民国政府于1948年8月成立。',
      },
      { id: 'modern-korean-war', label: '其后的朝鲜战争', note: '1950年战争爆发。' },
    ],
    sources: [ref.koreanDivision, ref.koreanFounding],
  },
  {
    id: 'modern-beiping-peaceful-liberation',
    year: 1949,
    dateLabel: '1949年1月31日',
    title: '北平和平解放',
    aliases: ['北平和平接管'],
    category: '政治',
    region: 'china',
    location: '北平（今北京）',
    coordinates: [116.4, 39.91],
    placeIds: ['beijing'],
    people: ['modern-fu-zuoyi'],
    importance: 5,
    summary: '傅作义所部陆续撤出城内，人民解放军接管北平防务，地方机构展开过渡期交接。',
    background: '平津战役期间，人民解放军包围北平，双方就和平接管安排举行谈判。',
    impact: '北平避免城内大规模战斗，军政机构逐步交接。同年9月，北平改名北京并被确定为新中国首都。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1949年1月，傅作义方面与人民解放军谈判，接受以和平方式解决北平问题的安排。傅部陆续出城。1月31日，人民解放军接管北平防务，新的公安机构也于当日进城。',
            '交接还涉及城市日常事务。双方代表在颐和园召开会议，商定成立联合办事处，处理过渡时期的军政问题。北平于同年9月改称北京，随后成为中华人民共和国首都。',
          ],
        },
      ],
    },
    relatedEvents: [
      {
        id: 'modern-first-cppcc',
        label: '9月的定都决议',
        note: '政协第一届全体会议决定定都北平，并改名北京。',
      },
    ],
    sources: [ref.beiping, ref.beipingTransfer, ref.fuZuoyi],
  },
  {
    id: 'modern-indonesia-sovereignty-transfer',
    year: 1949,
    dateLabel: '1949年12月27日',
    title: '荷兰向印度尼西亚移交主权',
    aliases: ['荷印圆桌会议主权移交', '印度尼西亚获荷兰承认'],
    category: '政治',
    region: 'southeast-asia',
    location: '荷兰阿姆斯特丹王宫',
    coordinates: [4.89, 52.37],
    placeIds: ['amsterdam'],
    locationNote: '标记落在移交文书的签署地，事件按议题归入东南亚。',
    people: ['region-person-hatta'],
    importance: 5,
    summary: '荷兰签署主权移交文件，承认印度尼西亚联邦共和国。新几内亚西部另待谈判。',
    background: '印度尼西亚1945年宣告独立。荷兰试图恢复殖民统治，此后发生战争并持续交涉。',
    impact: '荷兰正式承认印度尼西亚的主权，联邦形式和新几内亚西部的地位仍须处理。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1945年8月，苏加诺和哈达宣布印度尼西亚独立。荷兰仍试图恢复对群岛的统治，双方经过数年交战与谈判，至1949年在海牙圆桌会议达成主权移交协议。',
            '12月27日，移交文件在阿姆斯特丹签署，向印度尼西亚联邦共和国移交主权。协议暂将新几内亚西部除外，约定继续谈判。当地的归属问题因此延续到1950年代以后。',
          ],
        },
      ],
    },
    relatedEvents: [
      {
        id: 'modern-indonesia-independence',
        label: '回看1945年独立宣言',
        note: '印度尼西亚宣布独立与荷兰承认主权相隔四年。',
      },
    ],
    sources: [ref.indonesiaTransfer, ref.indonesiaUN],
  },
]
