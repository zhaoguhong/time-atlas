import type { Tour } from '../types'

export const expandedTopicTours: Tour[] = [
  {
    id: 'water-food-cities',
    name: '水、粮食与城市',
    question: '水利如何把田地、运输与城市生活联系起来？',
    introduction: [
      '水利工程需要选择水源、组织劳动并持续维修。农田获得灌溉，城市得到粮食，沿线居民也可能承担征发、迁移和河患的代价。',
      '从关中和成都平原读到运河、西湖与黄河治理，比较不同工程怎样应对当地地形、供水和运输问题。',
    ],
    conclusion: '选择一处工程，分别说明受益者、维护者与可能承担负担的人。',
    chapters: [
      {
        eventId: 'dujiangyan',
        explanation: '成都平原的用水安排把分流、排沙与灌溉连接起来，工程依靠后续维护继续发挥作用。',
        mapReading: '比较岷江山口与成都平原，观察水进入田地的方向。',
      },
      {
        eventId: 'zhengguo-canal',
        explanation: '关中渠道与秦的农业资源相联系，水利投入也参与国家竞争。',
        mapReading: '比较泾河、关中与秦都，思考施工投入与长期收成的时间差。',
      },
      {
        eventId: 'early-plus-dushi-water',
        explanation: '水力鼓风把水流用于冶铁，说明水的利用还涉及生产动力。',
        mapReading: '从南阳水系思考稳定动力与铁器生产地点的关系。',
      },
      {
        eventId: 'canal',
        explanation: '南北水道服务都城和军政运输，也需要沿线征工、仓储和船只配合。',
        mapReading: '沿河道比较北方政治中心与江淮粮食产地。',
      },
      {
        eventId: 'category-champa-rice',
        explanation: '稻种改良、地方试种和官府推广改变农业选择，供水仍是重要条件。',
        mapReading: '在江淮位置上思考生长期与水旱风险。',
      },
      {
        eventId: 'sudi',
        explanation: '疏浚西湖兼顾城市用水和湖区治理，挖出的淤泥又用于筑堤。',
        mapReading: '把杭州城、西湖和周围农田放在同一空间理解。',
      },
      {
        eventId: 'yuan-maritime-grain',
        explanation: '海运为北方都城提供另一条粮食通道，风险与运河运输不同。',
        mapReading: '比较东南沿海到大都的海路与内河方向。',
      },
      {
        eventId: 'jialu-river-work',
        explanation: '黄河治理需要动员大量劳力，河道与沿岸社会的压力相互交织。',
        mapReading: '比较河流、堤防和人口聚居区，思考谁承担维护。',
      },
      {
        eventId: 'completeness-wuhan-bridge',
        explanation: '公铁两用桥将跨江交通纳入连续线路，改变城市与全国运输联系。',
        mapReading: '比较长江两岸与南北铁路，区分过江渡运和桥梁通行。',
      },
    ],
    steps: [
      'dujiangyan',
      'zhengguo-canal',
      'early-plus-dushi-water',
      'canal',
      'category-champa-rice',
      'sudi',
      'yuan-maritime-grain',
      'jialu-river-work',
      'completeness-wuhan-bridge',
    ],
    sources: [
      {
        title: '《史记》卷29 · 河渠书（蜀守李冰治水）',
        url: 'https://zh.wikisource.org/wiki/史記/卷029',
        note: '古籍参考；事件简介、背景和影响为现代中文整理。',
      },
      {
        title: 'UNESCO · 青城山与都江堰灌溉系统',
        url: 'https://whc.unesco.org/en/list/1001/',
      },
      {
        title: '《後漢書》卷31',
        url: 'https://zh.wikisource.org/wiki/後漢書/卷31',
        note: '据原典相关篇章编写；本批沿用出处，未逐条重新抓取校勘。',
      },
      {
        title: '《隋书》卷3 · 大业元年开通济渠、巡幸江都',
        url: 'https://zh.wikisource.org/wiki/隋書/卷03',
      },
      {
        title: '隋唐大运河 · 条目与参考文献',
        url: 'https://zh.wikipedia.org/wiki/隋唐大运河',
      },
      {
        title: '哥伦比亚大学 Asia for Educators · Rice Cultivation（占城稻传播、早熟与耐旱）',
        url: 'https://afe.easia.columbia.edu/songdynasty-module/tech-rice.html',
        note: '“New Varieties of Rice”引述1012年前后江淮传播及早熟、耐旱特征。',
      },
      {
        title: '《宋史》卷338 · 苏轼传（疏湖、堰闸、六井与苏公堤）',
        url: 'https://zh.wikisource.org/wiki/宋史/卷338',
      },
      {
        title: 'UNESCO · West Lake Cultural Landscape（景观长期形成）',
        url: 'https://whc.unesco.org/en/list/1334/',
      },
      {
        title: '平顶山学院 · 苏轼年谱简编',
        url: 'https://fns.pdsu.edu.cn/info/1062/1655.htm',
      },
      {
        title: '《元史》卷93 · 食货志（海运试行与后续沿革）',
        url: 'https://zh.wikisource.org/wiki/元史/卷093',
        note: '古籍参考；事件简介、背景和影响为现代中文整理。',
      },
      {
        title: '《元史》卷187 · 贾鲁传（至正治河的筹划、动员与施工）',
        url: 'https://zh.wikisource.org/wiki/元史/卷187',
        note: '古籍参考；事件简介、背景和影响为现代中文整理。',
      },
      {
        title: '武汉市人民政府 · 武汉长江大桥',
        url: 'https://www.wuhan.gov.cn/ztzl/25zt/qiao/whzjdq/index.shtml',
        note: '桥梁专题所列1957年10月通车、公铁两用结构与交通连接。',
      },
    ],
    color: '#71836b',
    icon: 'route',
    subtitle: '9 章 · 地图与史事对读',
    description:
      '水利工程需要选择水源、组织劳动并持续维修。农田获得灌溉，城市得到粮食，沿线居民也可能承担征发、迁移和河患的代价。',
  },
  {
    id: 'tax-money-markets',
    name: '从田亩到钱币：财政与交易',
    question: '官府征收与民间交换，怎样通过钱币和账目相连？',
    introduction: [
      '田亩、户口、钱币和商品价格决定资源怎样在官府与家庭之间流动。不同制度改变征收对象，也改变谁需要到市场换取缴纳所需的货币。',
      '沿着土地税、铸币、两税、纸币和白银征收阅读，再看现代金融市场。每种办法都有相应的信用、运输和执行条件。',
    ],
    conclusion: '比较实物、金属钱币和纸币各自需要哪些信任与管理。',
    chapters: [
      {
        eventId: 'lu-land-tax',
        explanation: '按田亩征收的记载使土地经营与国家收入之间的关系更加具体。',
        mapReading: '从鲁地田亩出发，思考登记与实际占有的差别。',
      },
      {
        eventId: 'qin-standardization',
        explanation: '钱币和度量标准有助于跨地区征收与交易，统一规定仍需实际执行。',
        mapReading: '比较秦都与原六国地区，观察跨区域交换的需求。',
      },
      {
        eventId: 'wuzhu-currency',
        explanation: '五铢钱把铸造标准和国家财政联系起来，货币流通仍受质量和供应影响。',
        mapReading: '将中央铸造与地方市场分开，思考钱怎样进入家庭。',
      },
      {
        eventId: 'early-plus-han-silk-market',
        explanation: '蚕桑和织造由大量家庭劳动支持，商品也进入赋税与馈赠。',
        mapReading: '从生产地区向市场展开，追踪丝织物和家庭劳动。',
      },
      {
        eventId: 'early-plus-han-monopoly-liquor',
        explanation: '酒类经营进入财政管理，使税收直接联系粮食和日常消费。',
        mapReading: '比较官府经营节点与居民、商户的分散生产。',
      },
      {
        eventId: 'two-tax',
        explanation: '以财产和土地为依据的两税调整征收办法，也反映户籍与流动人口变化。',
        mapReading: '比较农业区与城市市场，留意缴税所需资源的转换。',
      },
      {
        eventId: 'official-jiaozi',
        explanation: '交子务把地方纸币纳入官府经营，信用需要兑付和发行制度支持。',
        mapReading: '以成都与四川盆地为中心，思考铁钱搬运与纸币使用。',
      },
      {
        eventId: 'exp-em-treasure-notes',
        explanation: '宝钞发行需要兑换与信用支持，国家规定和市场接受程度并不相同。',
        mapReading: '比较京师财政安排与各地商人使用货币的条件。',
      },
      {
        eventId: 'exp-em-grain-silver',
        explanation: '粮食折银改变运输与征收方式，家庭和地方需要获得缴纳用银。',
        mapReading: '比较东南产粮地区、运河和北方支用地点。',
      },
      {
        eventId: 'single-whip',
        explanation: '将部分赋役合并以银征收，改变家庭筹措税款的方式。',
        mapReading: '比较产粮区、城镇市场与白银流通，追踪家庭的缴纳过程。',
      },
      {
        eventId: 'completeness-shanghai-stock-exchange',
        explanation: '交易所把证券买卖置于集中组织与规则之下，投资也伴随价格风险。',
        mapReading: '定位上海，区分交易场所与企业、投资者所在地区。',
      },
    ],
    steps: [
      'lu-land-tax',
      'qin-standardization',
      'wuzhu-currency',
      'early-plus-han-silk-market',
      'early-plus-han-monopoly-liquor',
      'two-tax',
      'official-jiaozi',
      'exp-em-treasure-notes',
      'exp-em-grain-silver',
      'single-whip',
      'completeness-shanghai-stock-exchange',
    ],
    sources: [
      {
        title: '《史记》· 鲁周公世家',
        url: 'https://zh.wikisource.org/wiki/史記/卷033',
      },
      {
        title: '《史记》卷6 · 秦始皇本纪',
        url: 'https://zh.wikisource.org/wiki/史記/卷006',
        note: '古籍参考；事件简介、背景和影响为现代中文整理。',
      },
      {
        title: '中国国家博物馆 · 秦汉时期',
        url: 'https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail4.html',
      },
      {
        title: '《汉书》卷24下 · 食货志（五铢钱、赤仄钱与上林三官铸币）',
        url: 'https://zh.wikisource.org/wiki/漢書/卷024下',
        note: '古籍参考；事件简介、背景和影响为现代中文整理。',
      },
      {
        title: '《史记》卷30 · 平准书（币制调整与铸钱背景）',
        url: 'https://zh.wikisource.org/wiki/史記/卷030',
      },
      {
        title: '中国国家博物馆 · 中国古代钱币展',
        url: 'https://www.chnmuseum.cn/portals/0/web/zt/202102gdqianbi/',
      },
      {
        title: '《漢書》卷24上',
        url: 'https://zh.wikisource.org/wiki/漢書/卷024上',
        note: '据原典相关篇章编写；本批沿用出处，未逐条重新抓取校勘。',
      },
      {
        title: '《史記》卷129',
        url: 'https://zh.wikisource.org/wiki/史記/卷129',
        note: '据原典相关篇章编写；本批沿用出处，未逐条重新抓取校勘。',
      },
      {
        title: '《新唐书》卷52 · 食货志（两税法及陆贽论其弊）',
        url: 'https://zh.wikisource.org/wiki/新唐書/卷052',
        note: '古籍参考；事件简介、背景和影响为现代中文整理。',
      },
      {
        title: '《宋史》卷181 · 食货志（益州交子务、发行额与换界）',
        url: 'https://zh.wikisource.org/wiki/宋史/卷181',
        note: '古籍参考；事件简介、背景和影响为现代中文整理。',
      },
      {
        title: '大明宝钞 · 基础条目与参考文献',
        url: 'https://zh.wikipedia.org/wiki/大明宝钞',
        note: '基础出处；未声称本轮重新抓取核验。',
      },
      {
        title: '金花银 · 基础条目与参考文献',
        url: 'https://zh.wikipedia.org/wiki/金花银',
        note: '基础出处；未声称本轮重新抓取核验。',
      },
      {
        title: '《一条鞭法》· 嘉靖试行与万历推广、折银及地方差异',
        url: 'https://zh.wikipedia.org/wiki/一条鞭法',
      },
      {
        title: '上海证券交易所 · Overview',
        url: 'https://english.sse.com.cn/aboutsse/overview/',
        note: '成立、开业日期与最初浦江饭店地址；现代机构介绍不用于倒推1990年已有全部现行规则。',
      },
    ],
    color: '#71836b',
    icon: 'route',
    subtitle: '11 章 · 地图与史事对读',
    description:
      '田亩、户口、钱币和商品价格决定资源怎样在官府与家庭之间流动。不同制度改变征收对象，也改变谁需要到市场换取缴纳所需的货币。',
  },
  {
    id: 'schools-and-examinations',
    name: '学校、考试与求学道路',
    question: '哪些人能够进入学校，又怎样获得继续学习的机会？',
    introduction: [
      '学校需要教师、书籍、经费与制度安排。考试能够改变选拔途径，也会受到身份、家庭资源、地域和性别差别的影响。',
      '从汉代太学与宋代书院走向近代大学、战时迁校和义务教育，比较国家组织、地方支持与个人求学之间的关系。',
    ],
    conclusion: '选两个时期，比较入学者、学习内容与承担费用的方式。',
    chapters: [
      {
        eventId: 'han-taixue',
        explanation: '博士弟子员把经学学习与官员培养联系起来，官学仍只容纳有限人群。',
        mapReading: '比较京师集中教学与地方学生赴京的距离。',
      },
      {
        eventId: 'early-plus-hongdu-school',
        explanation: '鸿都门学引起人才资格与知识高下的争论，学校也是政治选择。',
        mapReading: '把宫廷招纳同地方经学师生网络进行比较。',
      },
      {
        eventId: 'category-yuelu',
        explanation: '地方书院将教学、藏书和学者交往结合起来，发展依靠持续支持。',
        mapReading: '看潭州与周围地区，思考区域学校如何吸引学生。',
      },
      {
        eventId: 'white-deer-academy',
        explanation: '朱熹重建白鹿洞书院并讨论学习规则，建筑和教学组织共同构成学校。',
        mapReading: '比较庐山的学习环境与城市官学。',
      },
      {
        eventId: 'region-phule-girls-school',
        explanation: '地方改革者主动开办女子学校，回应性别和种姓带来的教育限制。',
        mapReading: '从浦那出发，思考一所学校怎样改变具体家庭的学习机会。',
      },
      {
        eventId: 'imperial-university',
        explanation: '京师大学堂把新的学科和学校组织引入中央教育改革。',
        mapReading: '从北京观察学校与全国人才需求的联系。',
      },
      {
        eventId: 'region-tsuda-college',
        explanation: '女子英学塾为女性提供新的专业学习道路，办学仍需资源与社会支持。',
        mapReading: '比较东京的学校中心与不同地区学生的来处。',
      },
      {
        eventId: 'exams-end',
        explanation: '废除科举改变旧有升学与入仕路径，也使新式学校承担更多期待。',
        mapReading: '将地方读书人的道路与京城制度变化并读。',
      },
      {
        eventId: 'completeness-southwest-university',
        explanation: '迁校师生在云南继续办学，课堂、实验和日常生活都受战争影响。',
        mapReading: '比较昆明、蒙自与原来北方校址之间的距离。',
      },
      {
        eventId: 'modern-gaokao-restored',
        explanation: '恢复统一招生为许多青年重新打开升学机会，准备条件仍各不相同。',
        mapReading: '关注全国报名与分散考场，避免只把录取看作首都的一次决定。',
      },
      {
        eventId: 'completeness-compulsory-education',
        explanation: '九年义务教育需要学校、教师与地方经费逐步落实。',
        mapReading: '比较城乡服务范围，思考从法律原则到可到达学校的距离。',
      },
    ],
    steps: [
      'han-taixue',
      'early-plus-hongdu-school',
      'category-yuelu',
      'white-deer-academy',
      'region-phule-girls-school',
      'imperial-university',
      'region-tsuda-college',
      'exams-end',
      'completeness-southwest-university',
      'modern-gaokao-restored',
      'completeness-compulsory-education',
    ],
    sources: [
      {
        title: '《汉书》卷88 · 儒林传（公孙弘奏置博士弟子与考课任用）',
        url: 'https://zh.wikisource.org/wiki/漢書/卷088',
        note: '古籍参考；事件简介、背景和影响为现代中文整理。',
      },
      {
        title: '《後漢書》卷8',
        url: 'https://zh.wikisource.org/wiki/後漢書/卷8',
        note: '据原典相关篇章编写；本批沿用出处，未逐条重新抓取校勘。',
      },
      {
        title: '《後漢書》卷60下',
        url: 'https://zh.wikisource.org/wiki/後漢書/卷60下',
        note: '据原典相关篇章编写；本批沿用出处，未逐条重新抓取校勘。',
      },
      {
        title: '湖南大学出版社 ·《岳麓书院史》内容简介（976年始建及沿革）',
        url: 'https://press.hnu.edu.cn/info/1133/4271.htm',
        note: '内容介绍明确记北宋开宝九年（976年）创设及1903年改学堂。',
      },
      {
        title: '《宋史》卷429 · 朱熹传（奏复白鹿洞与学规）',
        url: 'https://zh.wikisource.org/wiki/宋史/卷429',
        note: '古籍参考；事件简介、背景和影响为现代中文整理。',
      },
      {
        title: '大英百科全书 · 萨维特丽拜与乔蒂拉奥在浦那办女子学校',
        url: 'https://www.britannica.com/biography/Savitribai-Phule',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
      {
        title: '《清史稿》卷24',
        url: 'https://zh.wikisource.org/wiki/清史稿/卷24',
        note: '古籍参考；事件简介、背景和影响为现代中文整理。',
      },
      {
        title: '故宫博物院 · 光绪皇帝大事年表',
        url: 'https://www.dpm.org.cn/court/lineage/226254.html',
      },
      {
        title: '大英百科全书 · 津田梅子开办女子英学塾',
        url: 'https://www.britannica.com/biography/Tsuda-Umeko',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
      {
        title: '《清史稿》',
        url: 'https://zh.wikisource.org/wiki/清史稿',
        note: '古籍参考；事件简介、背景和影响为现代中文整理。',
      },
      {
        title: '清华大学校史馆 · 父亲袁复礼的西南联大情结',
        url: 'https://xsg.tsinghua.edu.cn/info/1004/3408.htm',
        note: '1937—1938年南迁、昆明开课、分散校址及地质教学调查的校史回顾。',
      },
      {
        title: '清华大学 · 辗转西南，离乱弦歌不辍',
        url: 'https://www.tsinghua.edu.cn/info/1771/71988.htm',
        note: '联合办学、院系组织和1946年5月4日结业节点。',
      },
      {
        title: '北京大学新闻网 · 中华人民共和国大事记',
        url: 'https://news.pku.edu.cn/info/1651/17081.htm',
        note: '新华社大事记一九七七年10月12日条，记恢复统一考试、当年11—12月考试与录取；不把招生年份与全部入学年份混同。',
      },
      {
        title: '中国教育和科研计算机网 · 中华人民共和国义务教育法（1986年）',
        url: 'https://www.edu.cn/jiao_yu_fa_lv_766/20060303/t20060303_165119.shtml',
        note: '1986年原版法律，第二、四、五及十条等；与2006年修订文本分开。',
      },
    ],
    color: '#71836b',
    icon: 'route',
    subtitle: '11 章 · 地图与史事对读',
    description:
      '学校需要教师、书籍、经费与制度安排。考试能够改变选拔途径，也会受到身份、家庭资源、地域和性别差别的影响。',
  },
  {
    id: 'chinese-literature-and-performance',
    name: '文字走向生活：诗文、小说与戏曲',
    question: '作品怎样从个人写作进入共同阅读和表演？',
    introduction: [
      '文学在写作、抄刻、出版、讲唱和演出中获得不同生命。文人的迁居和交往为作品提供处境，读者与表演者也不断形成新的理解。',
      '本专题从归田与诗文，读到话本、长篇小说和现代戏剧，关注语言、体裁及传播方式的变化。',
    ],
    conclusion: '比较一篇散文和一部戏剧，它们各自怎样组织读者或观众的经验？',
    chapters: [
      {
        eventId: 'early-plus-shi-poems',
        explanation: '歌诗保存劳动、婚恋与礼仪的不同声音，结集又经历后世传承。',
        mapReading: '以周代区域为参照，不把诗中所有地点当作一位作者的路线。',
      },
      {
        eventId: 'early-plus-jianan-poetry',
        explanation: '战乱、交游与人生感受进入诗歌，文学活动在多个地方持续。',
        mapReading: '比较邺城与北方战乱地区，思考迁移怎样影响写作。',
      },
      {
        eventId: 'lanting',
        explanation: '集会、书写与文章流传相互结合，后世摹本又形成不同观看经验。',
        mapReading: '以会稽为参照，区分聚会地点与书迹后来的收藏地点。',
      },
      {
        eventId: 'tao-retire',
        explanation: '辞官后的田园写作联系劳动、家庭和个人选择，作品又经过后世传抄。',
        mapReading: '从彭泽与浔阳周边看仕宦和归居的空间变化。',
      },
      {
        eventId: 'bai-juyi-jiangzhou',
        explanation: '贬居经历进入诗歌叙述，个人处境与对他人生活的观察交织。',
        mapReading: '关注江州的水路和往来人群，理解诗中的相遇条件。',
      },
      {
        eventId: 'sushi-red-cliff',
        explanation: '黄州生活与历史想象共同进入赋作，写作地点与古战场地望应区分。',
        mapReading: '比较黄州江岸和赤壁战场的不同位置。',
      },
      {
        eventId: 'depth-peony-pavilion',
        explanation: '剧本通过梦境、家庭和生死组织情感问题，后来的舞台又继续改编。',
        mapReading: '从临川向表演和刊刻网络展开，区分作者地点与虚构故事。',
      },
      {
        eventId: 'exp-em-jinpingmei-print',
        explanation: '长篇小说借家庭、消费和社会关系组织故事，刊印使不同读者接触文本。',
        mapReading: '区分刊刻网络与小说虚构空间。',
      },
      {
        eventId: 'depth-honglou-chengjia',
        explanation: '一百二十回印本扩大小说传播，版本整理和作品形成具有不同过程。',
        mapReading: '观察北京出版节点与各地读者之间的联系。',
      },
      {
        eventId: 'modern-luxun-diary',
        explanation: '白话小说通过报刊进入公共讨论，叙述形式也参与社会批评。',
        mapReading: '从北京的刊物网络思考作品如何抵达其他城市。',
      },
      {
        eventId: 'completeness-thunderstorm',
        explanation: '现代话剧将家庭关系、身世和社会差别组织成舞台冲突。',
        mapReading: '比较剧本发表地、首演地与故事空间，三者不必重合。',
      },
    ],
    steps: [
      'early-plus-shi-poems',
      'early-plus-jianan-poetry',
      'lanting',
      'tao-retire',
      'bai-juyi-jiangzhou',
      'sushi-red-cliff',
      'depth-peony-pavilion',
      'exp-em-jinpingmei-print',
      'depth-honglou-chengjia',
      'modern-luxun-diary',
      'completeness-thunderstorm',
    ],
    sources: [
      {
        title: '《漢書》卷30',
        url: 'https://zh.wikisource.org/wiki/漢書/卷030',
        note: '据原典相关篇章编写；本批沿用出处，未逐条重新抓取校勘。',
      },
      {
        title: '《史記》卷47',
        url: 'https://zh.wikisource.org/wiki/史記/卷047',
        note: '据原典相关篇章编写；本批沿用出处，未逐条重新抓取校勘。',
      },
      {
        title: '《三國志》卷21',
        url: 'https://zh.wikisource.org/wiki/三國志/卷21',
        note: '据原典相关篇章编写；本批沿用出处，未逐条重新抓取校勘。',
      },
      {
        title: '王羲之 ·《兰亭集序》',
        url: 'https://zh.wikisource.org/wiki/蘭亭集序',
      },
      {
        title: '故宫博物院 · 冯承素行书摹兰亭序卷（传统归属及摹本流传）',
        url: 'https://www.dpm.org.cn/collection/handwriting/228279.html',
      },
      {
        title: '陶渊明《归去来兮辞》并序（辞彭泽令与归田自述）',
        url: 'https://zh.wikisource.org/wiki/歸去來兮辭',
      },
      {
        title: '《旧唐书》卷166 · 白居易传（武元衡遇刺后上疏与贬江州）',
        url: 'https://zh.wikisource.org/wiki/舊唐書/卷166',
        note: '古籍参考；事件简介、背景和影响为现代中文整理。',
      },
      {
        title: '平顶山学院 · 苏轼年谱简编（元丰五年前后赤壁赋）',
        url: 'https://fns.pdsu.edu.cn/info/1062/1655.htm',
      },
      {
        title: 'Indiana University Press · The Peony Pavilion（作品、作者及情节）',
        url: 'https://iupress.org/9780253215277/the-peony-pavilion-second-edition/',
        note: 'Description明确原作由汤显祖写于1598年；页面2002年为该英文译本第二版的出版年，不混同原作年代。',
      },
      {
        title: 'Harvard · Sounding China（牡丹亭与表演）',
        url: 'https://soundingchina.fas.harvard.edu/chinaobj6.html',
        note: '用于了解昆曲、后世曲谱及演出传统；馆藏影印本为1921年，不用该版本年代或演出记载证明原作完稿年月。',
      },
      {
        title: '金瓶梅 · 基础条目与参考文献',
        url: 'https://zh.wikipedia.org/wiki/金瓶梅',
        note: '基础出处；未声称本轮重新抓取核验。',
      },
      {
        title: '台湾图书馆 · 红楼梦版本与程甲本相关介绍',
        url: 'https://www.ncl.edu.tw/information_236_15182.html',
        note: '版本发展段明确乾隆五十六年1791年程甲本及次年程乙本。',
      },
      {
        title: '香港中文大学图书馆 · 文学散步：鲁迅',
        url: 'https://hklit.lib.cuhk.edu.hk/wp-content/uploads/2020/10/litwalkd.pdf',
        note: '鲁迅生平说明记1918年以鲁迅为笔名发表《狂人日记》；作品初刊见《新青年》4卷5号。',
      },
      {
        title: '国家大剧院 · 跨越世纪的经典——《雷雨》的前生今世',
        url: 'https://www.chncpa.org/cgyl_278/yszl/wqzl/201508/t20150819_158895.shtml',
        note: '1934年7月《文学季刊》发表、1935年东京演出及1936年单行本分列。',
      },
    ],
    color: '#71836b',
    icon: 'route',
    subtitle: '11 章 · 地图与史事对读',
    description:
      '文学在写作、抄刻、出版、讲唱和演出中获得不同生命。文人的迁居和交往为作品提供处境，读者与表演者也不断形成新的理解。',
  },
  {
    id: 'central-asian-oases',
    name: '绿洲之间：中亚的商贸与知识',
    question: '绿洲城市怎样依靠当地生产参与远距离联系？',
    introduction: [
      '中亚的绿洲、草原与山口连接不同生活方式。灌溉、商旅、宗教学习和政治组织共同维持往来，当地社会主动选择货物、语言与合作对象。',
      '从贵霜和粟特网络走向布哈拉、语言著述与帖木儿时代，关注城市自身的组织能力。',
    ],
    conclusion: '选择一座城市，说明本地资源与远距离往来如何共同支持它。',
    chapters: [
      {
        eventId: 'world-kushan-networks',
        explanation: '贵霜联结中亚与北印度，商贸和宗教活动跨越不同区域。',
        mapReading: '比较阿富汗山口、北印度和平原交通。',
      },
      {
        eventId: 'world-sogdian',
        explanation: '粟特商人通过社群和语言联系组织贸易，家乡与侨居地互相支持。',
        mapReading: '以撒马尔罕方向观察绿洲链条，不将网络画成一条固定道路。',
      },
      {
        eventId: 'world-turkic-khaganate',
        explanation: '草原政治力量影响交通与联盟，绿洲城市仍保留自身生产和社群。',
        mapReading: '比较草原通道与绿洲分布，思考不同资源的交换。',
      },
      {
        eventId: 'world-samanid-culture',
        explanation: '布哈拉的宫廷、学者和城市生活共同支持知识与文学活动。',
        mapReading: '定位布哈拉，比较政治赞助和商贸网络的重叠。',
      },
      {
        eventId: 'region-biruni-india',
        explanation: '比鲁尼比较语言、宗教和数学知识，知识往来伴随政治与翻译条件。',
        mapReading: '联系花剌子模、阿富汗与北印度，保留求知和征服的不同关系。',
      },
      {
        eventId: 'completeness-kutadgu-bilig',
        explanation: '突厥语作品把治国和个人修养写入文学，语言本身也是知识选择。',
        mapReading: '联系喀什及河中地区，观察多语言文化的相遇。',
      },
      {
        eventId: 'completeness-turkic-dictionary',
        explanation: '语言材料与地理认识被整理进辞书，使跨地区知识获得新的表达。',
        mapReading: '比较作者搜集的广泛地区与著述呈现的代表地点。',
      },
      {
        eventId: 'world-timurid-rise',
        explanation: '帖木儿以撒马尔罕组织政治与营建，也通过征服调集资源和工匠。',
        mapReading: '同时看城市中心与战争涉及的区域，理解营建的资源来源。',
      },
    ],
    steps: [
      'world-kushan-networks',
      'world-sogdian',
      'world-turkic-khaganate',
      'world-samanid-culture',
      'region-biruni-india',
      'completeness-kutadgu-bilig',
      'completeness-turkic-dictionary',
      'world-timurid-rise',
    ],
    sources: [
      {
        title: 'OpenStax · The Margins of Empire（贵霜的地理位置与多元联系）',
        url: 'https://openstax.org/books/world-history-volume-1/pages/10-4-the-margins-of-empire',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'Encyclopaedia Iranica · Sogdian Trade（古信札、移民与商路网络）',
        url: 'https://www.iranicaonline.org/articles/sogdian-trade/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'University of Washington · Sogdian Ancient Letters（书信译文与导读）',
        url: 'https://depts.washington.edu/silkroad/texts/sogdlet.html',
      },
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
      {
        title: 'UNESCO · 布哈拉历史中心',
        url: 'https://whc.unesco.org/en/list/602/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: '大英百科全书 · 比鲁尼撰书介绍印度知识与社会',
        url: 'https://www.britannica.com/biography/al-Biruni',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
      {
        title: '土耳其联合国教科文组织全国委员会 · 《福乐智慧》成书950周年',
        url: 'https://www.unesco.org.tr/Pages/2000/1393/Anma-ve-Kutlama-Y%C4%B1l-D%C3%B6n%C3%BCmleri',
        note: '2019年纪念事项列1069年成书。',
      },
      {
        title:
          'Amasya Üniversitesi Sosyal Bilimler Dergisi · Fergana Nüshasından Kutadgu Bilig’in Söz Varlığına Katkılar',
        url: 'https://dergipark.org.tr/en/pub/asobid/article/937743',
        note: '摘要列回历462年／1069—1070年及原作者手稿不存，研究费尔干纳抄本。',
      },
      {
        title: 'UNESCO 世界记忆 · Diwan Lughat al-Turk',
        url: 'https://www.unesco.org/en/memory-world/diwan-lughat-al-turk-compendium-turkic-dialects',
        note: '词典、民族志、诗文材料和世界地图的档案介绍；详细年代见所附申报材料。',
      },
      {
        title: 'UNESCO 世界记忆 · Diwan Lughat al-Turk申报表',
        url: 'https://media.unesco.org/sites/default/files/webform/mow001/turkey_compendium_eng.pdf',
        note: '区分十一世纪编写、作者与现存抄本的说明。',
      },
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
    color: '#71836b',
    icon: 'route',
    subtitle: '8 章 · 地图与史事对读',
    description:
      '中亚的绿洲、草原与山口连接不同生活方式。灌溉、商旅、宗教学习和政治组织共同维持往来，当地社会主动选择货物、语言与合作对象。',
  },
  {
    id: 'west-asian-urban-worlds',
    name: '西亚的城市、王权与知识',
    question: '城市怎样组织水源、贸易、法律与学习？',
    introduction: [
      '西亚城市具有不同的语言、宗教与治理传统。农业腹地、供水和交通支撑人口集中，王权、商人、学者与工匠又形成多种合作和冲突。',
      '从两河流域的记录与法条读到伊斯兰时代的都城及学术活动，比较城市解决共同生活问题的不同方式。',
    ],
    conclusion: '比较两个城市阶段，说明政治中心与知识中心怎样相互联系。',
    chapters: [
      {
        eventId: 'uruk-city',
        explanation: '乌鲁克的集聚需要粮食分配、工艺和组织，城市并非只是一组宏大建筑。',
        mapReading: '比较河流、农田与城市核心之间的关系。',
      },
      {
        eventId: 'world-hammurabi',
        explanation: '法律条文使财产、家庭与身份差别进入可阅读的治理材料。',
        mapReading: '定位巴比伦，思考王权宣示与地方纠纷的联系。',
      },
      {
        eventId: 'region-ashurbanipal-library',
        explanation: '泥板收集依赖书吏、抄写和宫廷需要，使知识跨越个人记忆保存。',
        mapReading: '从尼尼微看向文献来源的不同城市。',
      },
      {
        eventId: 'world-umayyad',
        explanation: '倭马亚以叙利亚为中心组织广阔政治空间，大马士革获得新的角色。',
        mapReading: '从城市向地中海和阿拉伯地区比较交通方向。',
      },
      {
        eventId: 'world-baghdad-founded',
        explanation: '新都营建聚集宫廷、市场和居民，河运与腹地提供持续供给。',
        mapReading: '看底格里斯河与伊拉克平原，理解城市选址。',
      },
      {
        eventId: 'category-algebra',
        explanation: '代数学著述将计算方法组织起来，回应学习、分配和实用问题。',
        mapReading: '从巴格达的学术环境思考书籍与学习者的流动。',
      },
      {
        eventId: 'category-optics',
        explanation: '光学研究结合观察、实验和论证，城市学术网络支持知识交换。',
        mapReading: '从开罗回望巴格达，比较不同研究中心的联系。',
      },
      {
        eventId: 'region-nizamiyya-baghdad',
        explanation: '学院的教学需要捐产、教师和学生生活安排，学术机构进入城市日常。',
        mapReading: '比较学院、市场与宗教建筑在巴格达的相互联系。',
      },
      {
        eventId: 'world-baghdad',
        explanation: '征服造成严重破坏，知识传统和居民活动仍在多地延续。',
        mapReading: '区分攻城地点与更广阔的学者、书籍传播网络。',
      },
      {
        eventId: 'region-shah-abbas-isfahan',
        explanation: '新都把广场、宫廷、市场与宗教建筑联系起来，也依赖人口和工匠迁移。',
        mapReading: '看伊斯法罕与区域商路，讨论营建资源从何而来。',
      },
    ],
    steps: [
      'uruk-city',
      'world-hammurabi',
      'region-ashurbanipal-library',
      'world-umayyad',
      'world-baghdad-founded',
      'category-algebra',
      'category-optics',
      'region-nizamiyya-baghdad',
      'world-baghdad',
      'region-shah-abbas-isfahan',
    ],
    sources: [
      {
        title: '大都会艺术博物馆 · Uruk: The First City（城市组织、物资记录与传播）',
        url: 'https://www.metmuseum.org/essays/uruk-the-first-city',
      },
      {
        title: '卢浮宫 · The Code of Hammurabi（条文结构、浮雕与出土流传）',
        url: 'https://www.louvre.fr/en/the-code-of-hammurabi',
      },
      {
        title: 'OpenStax · World History 1 · 4-1-from-old-babylon-to-the-medes',
        url: 'https://openstax.org/books/world-history-volume-1/pages/4-1-from-old-babylon-to-the-medes',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: '大英百科全书 · 亚述巴尼拔收集泥板文献',
        url: 'https://www.britannica.com/biography/Ashurbanipal',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
      {
        title:
          'OpenStax · World History 1 · 11-2-the-arab-islamic-conquests-and-the-first-islamic-states',
        url: 'https://openstax.org/books/world-history-volume-1/pages/11-2-the-arab-islamic-conquests-and-the-first-islamic-states',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'Cambridge University Press · World Cities in History · Baghdad',
        url: 'https://www.cambridge.org/core/books/abs/world-cities-in-history/baghdad/436F7DC281A07230C18E78D741E172E7',
        note: '第8章摘要明确曼苏尔762年建城，并讨论贸易与学术网络。',
      },
      {
        title: '美国数学协会 Convergence · Latin Manuscript of Al-Khwarizmi’s Algebra',
        url: 'https://old.maa.org/node/1409908',
        note: 'Frank J. Swetz文章开篇记约825年写成及后来的拉丁译本，并列六种方程。',
      },
      {
        title: 'Annals of Saudi Medicine · Ibn Al-Haytham: Father of Modern Optics',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6074172/',
        note: '见关于《光学》写作时间1011—1021及实验和视觉理论的段落。',
      },
      {
        title: '大英百科全书 · 巴格达尼扎米亚学院开办',
        url: 'https://www.britannica.com/topic/Nizamiyyah',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
      {
        title: 'OpenStax · World History 1 · 14-3-the-mongol-empire-fragments',
        url: 'https://openstax.org/books/world-history-volume-1/pages/14-3-the-mongol-empire-fragments',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: '大英百科全书 · 阿拔斯一世迁都伊斯法罕',
        url: 'https://www.britannica.com/biography/Abbas-I-shah-of-Persia',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
    ],
    color: '#71836b',
    icon: 'route',
    subtitle: '10 章 · 地图与史事对读',
    description:
      '西亚城市具有不同的语言、宗教与治理传统。农业腹地、供水和交通支撑人口集中，王权、商人、学者与工匠又形成多种合作和冲突。',
  },
  {
    id: 'south-asian-societies',
    name: '南亚：城市、知识与生产',
    question: '怎样从不同地区和社会活动认识南亚历史？',
    introduction: [
      '南亚包含河流平原、海岸、山地与多种政治文化。城市组织、宗教学习、数学著述和纺织生产，各自提供理解当地社会的入口。',
      '本专题跨越较长时间，比较不同阶段的制度与生产条件，保留各地区的差别。',
    ],
    conclusion: '从政治、知识和生产中各举一例，说明南亚怎样参与跨地区联系。',
    chapters: [
      {
        eventId: 'moenjodaro-city',
        explanation: '城市排水、街道与建筑反映组织生活的技术与劳动。',
        mapReading: '以印度河流域为参照，关注水源和居民空间。',
      },
      {
        eventId: 'region-lothal-crafts',
        explanation: '珠饰制作将精细技术与远距离交换相连，地方工匠主动参与市场。',
        mapReading: '联系古吉拉特海岸与印度河城市，观察原料和成品的不同流向。',
      },
      {
        eventId: 'world-maurya',
        explanation: '孔雀王朝整合多个地区，中央权力需要官员和地方资源支持。',
        mapReading: '比较恒河腹地与王朝扩展方向。',
      },
      {
        eventId: 'world-gupta-age',
        explanation: '北印度文化活动在赞助、学术和地方社会中发展，成果不只来自宫廷。',
        mapReading: '区分文化观察区间与某一年的固定政权边界。',
      },
      {
        eventId: 'depth-brahmagupta',
        explanation: '数学与天文计算形成系统著述，后续翻译使知识进入其他语言环境。',
        mapReading: '联系西印度学术中心与更广泛的书籍传播。',
      },
      {
        eventId: 'world-delhi',
        explanation: '德里苏丹国的建立改变北印度政治组织，治理需要同既有社会互动。',
        mapReading: '看德里与旁遮普、恒河平原的联系。',
      },
      {
        eventId: 'completeness-indian-textiles',
        explanation: '纺织工匠、商人和消费者共同形成跨海市场，花样与用途不断调整。',
        mapReading: '比较孟加拉、古吉拉特和海岸港口，不把生产归于单一城市。',
      },
      {
        eventId: 'world-mughal',
        explanation: '莫卧儿建立是新的政治阶段，土地收入、军队与区域合作继续发展。',
        mapReading: '比较西北通道、德里和印度河—恒河平原。',
      },
      {
        eventId: 'region-phule-girls-school',
        explanation: '女性与被限制群体争取学习，地方办学成为社会改革的一种行动。',
        mapReading: '比较浦那学校与城乡家庭的可及条件。',
      },
      {
        eventId: 'completeness-bombay-thane',
        explanation: '铁路把港口与内陆联系得更紧，也带来资本、土地与劳动问题。',
        mapReading: '比较孟买海港和塔那，思考短线路如何进入更大网络。',
      },
    ],
    steps: [
      'moenjodaro-city',
      'region-lothal-crafts',
      'world-maurya',
      'world-gupta-age',
      'depth-brahmagupta',
      'world-delhi',
      'completeness-indian-textiles',
      'world-mughal',
      'region-phule-girls-school',
      'completeness-bombay-thane',
    ],
    sources: [
      {
        title: 'UNESCO · Archaeological Ruins at Moenjodaro（街区、砖构与排水遗存）',
        url: 'https://whc.unesco.org/en/list/138/',
      },
      {
        title: '大英百科全书 · 洛塔尔的珠饰生产与远距离交换',
        url: 'https://www.britannica.com/place/Lothal',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
      {
        title: 'OpenStax · Vedic India to the Fall of the Maurya Empire（旃陀罗笈多与帝国组织）',
        url: 'https://openstax.org/books/world-history-volume-1/pages/5-4-vedic-india-to-the-fall-of-the-maurya-empire',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'Princeton University Art Museum · Seated Male Figure（笈多陶塑与宗教艺术）',
        url: 'https://artmuseum.princeton.edu/art/collections/objects/33030',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: '大都会艺术博物馆 · Standing Buddha Offering Protection（5世纪马图拉佛像）',
        url: 'https://www.metmuseum.org/art/collection/search/38198',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
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
      {
        title: 'OpenStax · World History 2 · 2-1-india-and-international-connections',
        url: 'https://openstax.org/books/world-history-volume-2/pages/2-1-india-and-international-connections',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'V&A · Indian textiles',
        url: 'https://www.vam.ac.uk/articles/indian-textiles/',
        note: '印度织物的工艺、既有亚洲贸易、欧洲公司进入及生产者处境。',
      },
      {
        title: '大都会艺术博物馆 · Indian Textiles: Trade and Production',
        url: 'https://www.metmuseum.org/ja/essays/indian-textiles-trade-and-production',
        note: '纺织工艺、亚洲贸易及欧洲公司以布匹交换香料的馆藏研究。',
      },
      {
        title: '大英百科全书 · 萨维特丽拜与乔蒂拉奥在浦那办女子学校',
        url: 'https://www.britannica.com/biography/Savitribai-Phule',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
      {
        title: '印度铁道部新闻局 · Milestones in Glorious History of Indian Railways',
        url: 'https://www.pib.gov.in/newsite/erelcontent.aspx?lang=2&reg=3&relid=46428',
        note: '1836、1849及1853年条，区分早期轨道、收益保证和孟买至塔那客运开通。',
      },
    ],
    color: '#71836b',
    icon: 'route',
    subtitle: '10 章 · 地图与史事对读',
    description:
      '南亚包含河流平原、海岸、山地与多种政治文化。城市组织、宗教学习、数学著述和纺织生产，各自提供理解当地社会的入口。',
  },
  {
    id: 'southeast-asian-centres',
    name: '东南亚：河谷、寺院与港市',
    question: '海上港口和内陆王国，各自依靠什么发展？',
    introduction: [
      '东南亚的稻作平原、河流和海峡形成不同中心。寺院、宫廷、村落和商人社群共同参与政治与经济活动，区域之间一直存在往来。',
      '将吴哥、蒲甘、满者伯夷和阿瑜陀耶同海峡港口并读，可以看到多种中心并立的历史。',
    ],
    conclusion: '比较一个内陆中心和一个港市，说明供给、交通和权力组织的差异。',
    chapters: [
      {
        eventId: 'world-srivijaya',
        explanation: '室利佛逝依靠港口联系与宗教赞助参与海上网络。',
        mapReading: '关注苏门答腊、海峡与沿岸补给点。',
      },
      {
        eventId: 'world-angkor-centres',
        explanation: '高棉都城的发展连接水利、农业与宗教营建。',
        mapReading: '比较洞里萨湖地区、河流和都城群。',
      },
      {
        eventId: 'world-bagan-kingdom',
        explanation: '蒲甘寺塔景观反映政治赞助、土地供养与工匠劳动。',
        mapReading: '以伊洛瓦底江平原理解城市与农业资源。',
      },
      {
        eventId: 'world-majapahit-foundation',
        explanation: '满者伯夷兴起于爪哇政治竞争，区域联系有多种层次。',
        mapReading: '比较爪哇农业腹地与北岸港口。',
      },
      {
        eventId: 'world-ayutthaya-foundation',
        explanation: '阿瑜陀耶的河流区位帮助组织农业、贸易和对外往来。',
        mapReading: '看河流汇合与通向海湾的道路。',
      },
      {
        eventId: 'completeness-nagarakretagama',
        explanation: '宫廷诗记录王权理想和地方关系，应结合其赞颂体裁阅读。',
        mapReading: '将诗中的政治空间与实际城市和交通分别考察。',
      },
      {
        eventId: 'world-malacca',
        explanation: '马六甲聚集不同社群，在海峡交换中形成港市组织。',
        mapReading: '比较海峡港口与前面河谷中心的地理差别。',
      },
      {
        eventId: 'region-hongduc-law',
        explanation: '黎朝法典整理土地、家庭和司法规则，使当地治理传统更为具体。',
        mapReading: '定位越南北部，比较都城法令与地方社会的执行。',
      },
      {
        eventId: 'completeness-malay-annals',
        explanation: '对历史的重编保存政治记忆，也表达编者时代的身份与秩序。',
        mapReading: '联系马六甲与柔佛，观察王室和文本的转移。',
      },
      {
        eventId: 'region-ayutthaya-diplomacy',
        explanation: '阿瑜陀耶主动派使参与外交，港市与宫廷共同组织远距离往来。',
        mapReading: '将使团出发地与海路联系起来，未核准的中途停留仍留白。',
      },
    ],
    steps: [
      'world-srivijaya',
      'world-angkor-centres',
      'world-bagan-kingdom',
      'world-majapahit-foundation',
      'world-ayutthaya-foundation',
      'completeness-nagarakretagama',
      'world-malacca',
      'region-hongduc-law',
      'completeness-malay-annals',
      'region-ayutthaya-diplomacy',
    ],
    sources: [
      {
        title: 'OpenStax · World History 1 · 5-3-korea-japan-and-southeast-asia',
        url: 'https://openstax.org/books/world-history-volume-1/pages/5-3-korea-japan-and-southeast-asia',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'UNESCO · 吴哥',
        url: 'https://whc.unesco.org/en/list/668/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'UNESCO · 蒲甘',
        url: 'https://whc.unesco.org/en/list/1588/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: '大都会艺术博物馆 · Southeast Asia, 1000–1400',
        url: 'https://www.metmuseum.org/toah/ht/07/sse',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'UNESCO · 阿瑜陀耶古城',
        url: 'https://whc.unesco.org/en/list/576/',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'UNESCO 亚太世界记忆委员会 · Nāgarakrĕtāgama or Description of the Country',
        url: 'https://www.mowcapunesco.org/register/nagara-kertagama-or-description-of-the-country-1365-ad/',
        note: '1365年古爪哇文本、贝叶载体与满者伯夷政府社会材料介绍。',
      },
      {
        title: '印度尼西亚教育文化部文献库 · Nagarakertagama dan Trowulan',
        url: 'https://repositori.kemendikdasmen.go.id/9924/',
        note: '普拉班查、1365年成文及特罗乌兰遗址之间关系的研究入口。',
      },
      {
        title: 'OpenStax · World History 2 · 2-2-the-malacca-sultanate',
        url: 'https://openstax.org/books/world-history-volume-2/pages/2-2-the-malacca-sultanate',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: '大英百科全书 · 黎朝《国朝刑律》整理法律秩序',
        url: 'https://www.britannica.com/place/Vietnam/The-later-Le-dynasty',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
      {
        title: '澳大利亚国立大学 Malay Concordance Project · Sejarah Melayu bibliography',
        url: 'https://mcp.anu.edu.au/N/SM_bib.html',
        note: '文本1612年重编与所用1808年抄本、版本差别的书目说明。',
      },
      {
        title: 'UNESCO 世界记忆 · Sejarah Melayu申报资料',
        url: 'https://media.unesco.org/sites/default/files/webform/mow001/malaysia_sejarah_melayu.pdf',
        note: '马来宫廷历史叙事、1612年文本节点与传存手稿。',
      },
      {
        title: '大英百科全书 · 阿瑜陀耶向法国派遣使团',
        url: 'https://www.britannica.com/biography/Narai',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
    ],
    color: '#71836b',
    icon: 'route',
    subtitle: '10 章 · 地图与史事对读',
    description:
      '东南亚的稻作平原、河流和海峡形成不同中心。寺院、宫廷、村落和商人社群共同参与政治与经济活动，区域之间一直存在往来。',
  },
  {
    id: 'african-cities-and-networks',
    name: '非洲：河流、商路与城市',
    question: '非洲不同地区怎样组织生产、知识和政治联系？',
    introduction: [
      '尼罗河、撒哈拉商路、东非海岸与西非城市具有不同发展条件。当地生产者、统治者、商人和学者共同参与跨地区往来。',
      '从努比亚和阿克苏姆读到加纳、马里、津巴布韦及桑海，再看现代教育，避免用单一地区代表整个非洲。',
    ],
    conclusion: '选择两种交通环境，比较它们怎样影响当地城市。',
    chapters: [
      {
        eventId: 'world-kerma',
        explanation: '努比亚王国依靠本地组织和尼罗河往来发展，并与埃及互动。',
        mapReading: '比较尼罗河沿线与向内陆展开的资源方向。',
      },
      {
        eventId: 'world-aksum',
        explanation: '阿克苏姆的王权与宗教变化联系红海贸易和地方社会。',
        mapReading: '看高地、红海港口与阿拉伯半岛之间的距离。',
      },
      {
        eventId: 'world-ghana-trade',
        explanation: '加纳参与跨撒哈拉贸易，黄金、盐和政治组织相互联系。',
        mapReading: '比较萨赫勒农业区与沙漠商路。',
      },
      {
        eventId: 'world-great-zimbabwe',
        explanation: '石城营建依靠当地生产和权力组织，也参与更远的贸易。',
        mapReading: '从南部非洲内陆看向东海岸，追问货物如何移动。',
      },
      {
        eventId: 'world-mali-sundiata',
        explanation: '马里政权整合地方力量，政治传统也通过口述保存。',
        mapReading: '以尼日尔河流域理解农业、交通和政治中心。',
      },
      {
        eventId: 'world-timbuktu-learning',
        explanation: '书籍、教学和商旅共同支持廷巴克图学术生活。',
        mapReading: '比较城市与撒哈拉南缘商路，思考知识和物资怎样同行。',
      },
      {
        eventId: 'world-songhai',
        explanation: '桑海的扩展改变尼日尔河区域关系，城市仍有超越王朝的历史。',
        mapReading: '比较河流上的多个中心，区分帝国范围与地方生活。',
      },
      {
        eventId: 'completeness-ibadan-college',
        explanation: '本地对大学教育的需求推动学校建立，争取自主与办学继续相连。',
        mapReading: '从伊巴丹向周边学生来源地区展开，观察教育机会的地理范围。',
      },
    ],
    steps: [
      'world-kerma',
      'world-aksum',
      'world-ghana-trade',
      'world-great-zimbabwe',
      'world-mali-sundiata',
      'world-timbuktu-learning',
      'world-songhai',
      'completeness-ibadan-college',
    ],
    sources: [
      {
        title: 'OpenStax · The Kingdom of Kush（克尔玛与尼罗河流域政治）',
        url: 'https://openstax.org/books/world-history-volume-1/pages/9-3-the-kingdom-of-kush',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'OpenStax · The Kingdoms of Aksum and Himyar（埃扎纳、钱币与弗鲁门提乌斯）',
        url: 'https://openstax.org/books/world-history-volume-1/pages/10-3-the-kingdoms-of-aksum-and-himyar',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'OpenStax · Medieval Sub-Saharan Africa',
        url: 'https://openstax.org/books/world-history-volume-1/pages/15-2-medieval-sub-saharan-africa',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'OpenStax · Early Modern Africa 年代图',
        url: 'https://openstax.org/books/world-history-volume-2/pages/3-introduction',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: '开普敦大学手稿研究项目 · Timbuktu’s History',
        url: 'https://tombouctoumanuscripts.uct.ac.za/overview/timbuktus-history',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'OpenStax · World History 2 · 3-2-the-songhai-empire',
        url: 'https://openstax.org/books/world-history-volume-2/pages/3-2-the-songhai-empire',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: '伊巴丹大学 · About Us',
        url: 'https://ui.edu.ng/content/about-us',
        note: '校史所列本地教育诉求、1948年开课、原院址和永久校址奠基。',
      },
      {
        title: '伊巴丹大学 · University Calendar · History of the University',
        url: 'https://ui.edu.ng/sites/default/files/2018%20University%20Calendar%2023%20May%2018.pdf',
        note: '大学校历中的机构历史，区分学院与独立大学阶段。',
      },
    ],
    color: '#71836b',
    icon: 'route',
    subtitle: '8 章 · 地图与史事对读',
    description:
      '尼罗河、撒哈拉商路、东非海岸与西非城市具有不同发展条件。当地生产者、统治者、商人和学者共同参与跨地区往来。',
  },
  {
    id: 'american-urban-traditions',
    name: '美洲的城市与区域社会',
    question: '欧洲到来之前，美洲有哪些不同的城市道路？',
    introduction: [
      '安第斯、中美洲和墨西哥高原拥有不同的农业、建筑和政治传统。道路、市场、仪式与居民劳动支持城市，城邦之间也存在战争和合作。',
      '先沿各地自身的营建与组织阅读，再观察征服怎样改变原有关系。',
    ],
    conclusion: '比较两处城市，说明环境、粮食和政治组织如何共同支撑它。',
    chapters: [
      {
        eventId: 'caral-city',
        explanation: '安第斯早期公共建筑与聚落显示资源和劳动的组织。',
        mapReading: '看沿海河谷与海岸资源，不把早期中心孤立于周边。',
      },
      {
        eventId: 'world-olmec',
        explanation: '巨石头像和中心遗址呈现仪式、运输和权力组织。',
        mapReading: '比较墨西哥湾低地与石材来源方向。',
      },
      {
        eventId: 'world-teotihuacan',
        explanation: '大型城市的街道、住宅与公共空间需要持续供给和管理。',
        mapReading: '观察高原盆地与周边生产地区的关系。',
      },
      {
        eventId: 'world-maya',
        explanation: '玛雅城邦通过文字、王权和区域竞争形成多中心世界。',
        mapReading: '比较低地不同城邦，避免把它们看作一个统一首都。',
      },
      {
        eventId: 'world-tenochtitlan',
        explanation: '湖区城市依靠堤道、水路和市场与周边社会联系。',
        mapReading: '观察湖中位置及通向陆地的道路。',
      },
      {
        eventId: 'world-machu-picchu',
        explanation: '山地建筑体现石工与地形利用，其具体功能仍有讨论。',
        mapReading: '从安第斯坡地观察工程和周边交通。',
      },
      {
        eventId: 'world-inca',
        explanation: '印加扩展通过道路、劳动征集和地方安排连接不同生态地区。',
        mapReading: '比较高山、河谷与沿海道路，思考运输条件。',
      },
      {
        eventId: 'world-conquest-mexico',
        explanation: '西班牙与原住民联盟共同参与征服，不同地方力量具有自身诉求。',
        mapReading: '回到湖区城市，观察围困、供水和盟军来源。',
      },
    ],
    steps: [
      'caral-city',
      'world-olmec',
      'world-teotihuacan',
      'world-maya',
      'world-tenochtitlan',
      'world-machu-picchu',
      'world-inca',
      'world-conquest-mexico',
    ],
    sources: [
      {
        title: 'UNESCO · Sacred City of Caral-Supe（台基、广场及前3000—前1800年年代）',
        url: 'https://whc.unesco.org/en/list/1269/',
      },
      {
        title:
          'OpenStax · Early Cultures and Civilizations in the Americas（奥尔梅克台地、头像与区域中心）',
        url: 'https://openstax.org/books/world-history-volume-1/pages/8-2-early-cultures-and-civilizations-in-the-americas',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'OpenStax · World History 1 · 8-3-the-age-of-empires-in-the-americas',
        url: 'https://openstax.org/books/world-history-volume-1/pages/8-3-the-age-of-empires-in-the-americas',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'UNESCO · Historic Sanctuary of Machu Picchu',
        url: 'https://whc.unesco.org/en/list/274',
        note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
      },
      {
        title: 'OpenStax · World History 2 · 6-1-european-colonization-in-the-americas',
        url: 'https://openstax.org/books/world-history-volume-2/pages/6-1-european-colonization-in-the-americas',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
    ],
    color: '#71836b',
    icon: 'route',
    subtitle: '8 章 · 地图与史事对读',
    description:
      '安第斯、中美洲和墨西哥高原拥有不同的农业、建筑和政治传统。道路、市场、仪式与居民劳动支持城市，城邦之间也存在战争和合作。',
  },
  {
    id: 'women-public-life',
    name: '女性、教育与公共权利',
    question: '思想主张怎样走向组织、法律与实际机会？',
    introduction: [
      '女性参与知识、劳动和政治的形式始终多样，制度却常限制教育、财产和公共权利。争取改变既包括写作，也包括组织、诉讼和日常行动。',
      '从权利论述、妇女大会和选举权，读到婚姻法与国际公约，区分宣示原则和实际落实。',
    ],
    conclusion: '比较教育、家庭和选举三种领域，权利实现各需要什么条件？',
    chapters: [
      {
        eventId: 'region-enheduanna-hymns',
        explanation: '女祭司名下的诗歌提示女性宗教权威与作者身份，传本归属仍有讨论。',
        mapReading: '以乌尔为参照，区分祭司活动和后世抄本的保存地点。',
      },
      {
        eventId: 'early-plus-ban-zhao-women',
        explanation: '班昭强调女性学习，也在礼法中规定不平等的家庭职责。',
        mapReading: '比较宫廷知识活动与不同家庭的实际学习机会。',
      },
      {
        eventId: 'phil-wollstonecraft-rights',
        explanation: '对女性教育和理性的讨论，把家庭安排与公共平等联系起来。',
        mapReading: '从伦敦出版网络观察思想如何进入更广泛争论。',
      },
      {
        eventId: 'world-seneca-falls',
        explanation: '妇女大会以公开声明和组织合作争取改变。',
        mapReading: '联系纽约州地方会议与跨地区改革网络。',
      },
      {
        eventId: 'region-phule-girls-school',
        explanation: '萨维特丽拜等以办学直接回应教育排斥，使权利讨论进入日常实践。',
        mapReading: '从浦那学校看向种姓、性别和家庭资源的交叉影响。',
      },
      {
        eventId: 'world-nz-suffrage',
        explanation: '请愿与政治组织推动女性取得议会选举投票权，参选等权利仍需区分。',
        mapReading: '看新西兰分散居民如何通过请愿形成共同诉求。',
      },
      {
        eventId: 'category-curie',
        explanation: '科研工作连接教育机会、实验条件与长期合作，也呈现女性进入专业领域的道路。',
        mapReading: '区分华沙求学背景与巴黎实验工作的地点。',
      },
      {
        eventId: 'region-japan-women-suffrage',
        explanation: '战后改革赋予女性投票权，女性组织与个人此后继续进入公共政治。',
        mapReading: '比较制度中心与各地选区，观察权利如何实际使用。',
      },
      {
        eventId: 'completeness-marriage-law',
        explanation: '婚姻自由和男女平等原则需要通过登记、司法与地方实践落实。',
        mapReading: '比较全国法律与不同地区家庭关系的变化。',
      },
      {
        eventId: 'modern-cedaw',
        explanation: '国际公约把消除歧视转为持续的公共承诺，执行依赖各国制度和社会行动。',
        mapReading: '从联合国协商中心看向不同国家的教育、劳动和家庭领域。',
      },
    ],
    steps: [
      'region-enheduanna-hymns',
      'early-plus-ban-zhao-women',
      'phil-wollstonecraft-rights',
      'world-seneca-falls',
      'region-phule-girls-school',
      'world-nz-suffrage',
      'category-curie',
      'region-japan-women-suffrage',
      'completeness-marriage-law',
      'modern-cedaw',
    ],
    sources: [
      {
        title: '大英百科全书 · 恩赫杜安娜与苏美尔赞美诗传统',
        url: 'https://www.britannica.com/biography/Enheduanna',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
      {
        title: '《後漢書》卷84',
        url: 'https://zh.wikisource.org/wiki/後漢書/卷84',
        note: '据原典相关篇章编写；本批沿用出处，未逐条重新抓取校勘。',
      },
      {
        title: 'Stanford Encyclopedia of Philosophy · Mary Wollstonecraft',
        url: 'https://plato.stanford.edu/entries/wollstonecraft/',
        note: '导言及第3节 Moral and Political Writings 明确《女权辩护》1792年出版，并讨论理性、德性和教育。',
      },
      {
        title: 'U.S. National Park Service · Nineteenth Century Activism',
        url: 'https://www.nps.gov/articles/featured_stories_wori.htm',
        note: '1848年7月19—20日大会、组织者及Declaration of Sentiments段。',
      },
      {
        title: '大英百科全书 · 萨维特丽拜与乔蒂拉奥在浦那办女子学校',
        url: 'https://www.britannica.com/biography/Savitribai-Phule',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
      {
        title: '新西兰文化与遗产部 · Women win the right to vote',
        url: 'https://nzhistory.govt.nz/womens-suffrage-day',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: '诺贝尔奖机构 · Marie and Pierre Curie and the discovery of polonium and radium',
        url: 'https://www.nobelprize.org/prizes/lists/marie-and-pierre-curie-and-the-discovery-of-polonium-and-radium/',
        note: '见“Marie and Pierre — a fruitful collaboration”和“Arduous work”，区分1898年报告与后续分离。',
      },
      {
        title: '大英百科全书 · 日本选举制度改革赋予女性投票权',
        url: 'https://www.britannica.com/place/Japan/Women-in-postwar-Japan',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
      {
        title: '中国国家博物馆 · 《中华人民共和国婚姻法》',
        url: 'https://www.chnmuseum.cn/zp/zpml/gshww/202103/t20210331_249352.shtml',
        note: '馆藏1950年婚姻法及公布实施说明，区分法令颁布与5月1日实施。',
      },
      {
        title: '《中华人民共和国婚姻法》（1950年）',
        url: 'https://zh.wikisource.org/wiki/中华人民共和国婚姻法_(1950年)',
        note: '1950年法律原文第一章至离婚章节；维基文库为文本入口，不混用后续修订版本。',
      },
      {
        title: 'OHCHR · Convention on the Elimination of All Forms of Discrimination against Women',
        url: 'https://searchlibrary.ohchr.org/record/7990/files/7990.pdf',
        note: '标题明确1979年12月18日大会34/180号决议及公约条款；通过与生效分开。',
      },
    ],
    color: '#71836b',
    icon: 'route',
    subtitle: '10 章 · 地图与史事对读',
    description:
      '女性参与知识、劳动和政治的形式始终多样，制度却常限制教育、财产和公共权利。争取改变既包括写作，也包括组织、诉讼和日常行动。',
  },
  {
    id: 'labor-rights-citizenship',
    name: '劳动、身份与公民权利',
    question: '法律身份的改变，怎样进入工作与日常生活？',
    introduction: [
      '自由、公民资格和劳动权利在不同社会中具有具体的制度条件。废奴、农奴解放和选举改革改变法律位置，土地、工资、教育及社会歧视仍影响实际机会。',
      '将不同改革并读，关注提出诉求的人、组织行动和变化后的生活条件。',
    ],
    conclusion: '选择一项身份改革，说明法律变化之后还需要解决哪些现实问题。',
    chapters: [
      {
        eventId: 'world-haitian-revolution',
        explanation: '被奴役者主动发动斗争，革命与帝国冲突交织。',
        mapReading: '比较殖民种植园、港口与岛内不同力量。',
      },
      {
        eventId: 'world-slave-trade-abolition',
        explanation: '禁止贸易针对跨海贩运，不能直接等同于解放所有被奴役者。',
        mapReading: '从英国立法地看向大西洋贸易网络和执行海域。',
      },
      {
        eventId: 'world-slavery-abolition-act',
        explanation: '废奴立法改变部分殖民地法律身份，过渡制度和赔偿安排仍体现不平等。',
        mapReading: '比较立法中心与各殖民地的具体执行。',
      },
      {
        eventId: 'world-peoples-charter',
        explanation: '工人和改革者通过请愿、集会争取政治代表权。',
        mapReading: '联系工业城市和伦敦，观察组织如何跨地区扩展。',
      },
      {
        eventId: 'world-russian-emancipation',
        explanation: '农奴解放改变人身关系，土地与赎买安排继续影响家庭。',
        mapReading: '比较庄园、村社与国家行政之间的联系。',
      },
      {
        eventId: 'world-brazil-abolition',
        explanation: '奴隶制度的终结来自被奴役者、废奴组织和政治变化的多重作用。',
        mapReading: '将城市运动与种植园劳动地区并读。',
      },
      {
        eventId: 'region-siam-slavery-abolition',
        explanation: '奴役身份的渐进废除需要处理债务和家庭生活，法律与执行相互衔接。',
        mapReading: '从暹罗中央改革看向地方雇佣和债务关系。',
      },
      {
        eventId: 'modern-brown-education',
        explanation: '反对公立学校种族隔离的判决回应长期诉讼与社区争取，执行仍经历阻力。',
        mapReading: '从最高法院所在地看向不同地方学校和家庭。',
      },
    ],
    steps: [
      'world-haitian-revolution',
      'world-slave-trade-abolition',
      'world-slavery-abolition-act',
      'world-peoples-charter',
      'world-russian-emancipation',
      'world-brazil-abolition',
      'region-siam-slavery-abolition',
      'modern-brown-education',
    ],
    sources: [
      {
        title: 'OpenStax · World History 2 · 7-3-revolutions-america-france-and-haiti',
        url: 'https://openstax.org/books/world-history-volume-2/pages/7-3-revolutions-america-france-and-haiti',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: 'UK Parliament · Parliament abolishes the slave trade',
        url: 'https://www.parliament.uk/about/living-heritage/transformingsociety/tradeindustry/slavetrade/overview/parliament-abolishes-the-slave-trade/',
        note: '1807年法案提出及通过过程；禁止贸易与废除奴隶制度有别。',
      },
      {
        title: 'UK Parliament · The Transatlantic Slave Trade',
        url: 'https://heritagecollections.parliament.uk/stories/the-transatlantic-slave-trade/',
        note: 'Slavery Abolition Act, 1833小节，生效年份、赔偿与学徒制；学徒制1838年结束另见议会研究报告。',
      },
      {
        title: 'House of Commons Library · The public finances: a historical overview',
        url: 'https://researchbriefings.files.parliament.uk/documents/CBP-8265/CBP-8265.pdf',
        note: '2.4 Abolition of slavery，1834年实施、1838年完全结束学徒制及赔偿对象。',
      },
      {
        title: 'UK Parliament · The Chartist movement',
        url: 'https://www.parliament.uk/about/living-heritage/transformingsociety/electionsvoting/chartists/overview/chartistmovement/',
        note: '1838年宪章六项要求、1839年请愿及后续运动。',
      },
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
      {
        title: 'OpenStax · World History 2 · 8-4-portuguese-south-america',
        url: 'https://openstax.org/books/world-history-volume-2/pages/8-4-portuguese-south-america',
        note: '史实与年代参考；中文叙述由本站独立编写。',
      },
      {
        title: '大英百科全书 · 暹罗立法完成奴役身份的渐进废除',
        url: 'https://www.britannica.com/biography/Chulalongkorn',
        note: '参考入口待核：本轮未逐页重新核对网页链接及其对应段落。',
      },
      {
        title: 'U.S. National Archives · Brown v. Board of Education',
        url: 'https://www.archives.gov/milestone-documents/brown-v-board-of-education',
        note: 'RG267，1954年5月17日最高法院意见及公立学校种族隔离违宪说明。',
      },
    ],
    color: '#71836b',
    icon: 'route',
    subtitle: '8 章 · 地图与史事对读',
    description:
      '自由、公民资格和劳动权利在不同社会中具有具体的制度条件。废奴、农奴解放和选举改革改变法律位置，土地、工资、教育及社会歧视仍影响实际机会。',
  },
]
