import { makeEvents, makePeople, webSource } from './expansion-kit'
import { beagleDiary, beagleItinerary } from './journey-researchers'

const unescosite = (title: string, id: number, note: string) =>
  webSource(`联合国教科文组织 · ${title}`, `https://whc.unesco.org/en/list/${id}/`, note)

const panjakent = webSource(
  '联合国教科文组织 · ICOMOS 丝路遗产评估（2014）',
  'https://whc.unesco.org/archive/2014/whc14-38com-inf8B1-en.pdf',
  '见 Penjikent 一节，关于古城年代、住宅壁画、宗教建筑与粟特文化的证据。',
)
const zarafshan = webSource(
  '联合国教科文组织 · 45 COM 8B.13 泽拉夫尚—卡拉库姆走廊',
  'https://whc.unesco.org/en/decisions/8394',
  '见泽拉夫尚河流域、绿洲通道及古彭吉肯特的组成遗产说明。',
)
const ryukyuTimeline = webSource(
  '冲绳县立图书馆 · 首里古地图与三山时期',
  'https://www.library.pref.okinawa.jp/archive/contents/cat39/map-knowledge.html',
  '见三山时代、尚巴志统一与首里城扩充；页面并列不同纪年说法。',
)
const gowa = webSource(
  '印度尼西亚戈瓦县 · 哈桑丁生平',
  'https://humas.gowakab.go.id/peringatan-kelahiran-sultan-hasananuddin-di-gowa/',
  '见哈桑丁生卒、承继王位与1667年签订邦加亚条约。',
)
const makassar = webSource(
  'David Bulbeck、Ian Caldwell · 南苏拉威西本土防御建筑研究',
  'https://oxis.org/downloads/bulbek-and-caldwell-2020.pdf',
  '见 Fort Rotterdam 段关于《邦加亚条约》要求交割的记载与堡垒研究。',
)
const meri = webSource(
  '新西兰国家传记辞典 · Meri Te Tai Mangakāhia',
  'https://teara.govt.nz/en/biographies/2m30/mangakahia-meri-te-tai/print',
  '见生平、1893年5月18日怀帕图动议、发言理由与讨论结果。',
)
const suffrage = webSource(
  '新西兰议会 · 9月19日妇女参政纪念日',
  'https://www3.parliament.nz/en/get-involved/features/suffrage-day-19-september-celebrating-women-s-right-to-vote/',
  '见集体请愿、1893年选举权、毛利女性参政诉求与后续参选资格。',
)
const kamehameha = webSource(
  '美国国家公园管理局 · 卡美哈梅哈一世',
  'https://home.nps.gov/puhe/learn/historyculture/kamehameha.htm',
  '见可能出生年代、统一进程、与考艾岛统治者达成协议及卒年。',
)
const hawaiiPetition = webSource(
  '美国国家档案馆 · 1897年反对兼并夏威夷的请愿书',
  'https://www.archives.gov/education/lessons/hawaii-petition',
  '见夏威夷爱国联盟签名原件、1897年代表赴华盛顿和参议院审议经过。',
)

const parityTest = webSource(
  '美国国家标准与技术研究院 · The Fall of Parity',
  'https://www.nist.gov/pml/fall-parity',
  '见1956年底在华盛顿实验、团队成员、李政道与杨振宁的理论提议及实验结果。',
)

export const worldCoverageEvents = [
  ...makeEvents('americas', [
    {
      id: 'caguana-taino-courts',
      title: '泰诺人在卡瓜纳修建石列广场',
      year: 1200,
      endYear: 1500,
      dateLabel: '约1200—1500年',
      dateNote: '按美国国家历史地标登记文件所载卡帕阶段约定范围，个别场地未确切定年。',
      category: '文化',
      themes: ['泰诺', '考古', '加勒比海'],
      importance: 4,
      place: ['卡瓜纳遗址 · 今波多黎各乌图阿多', [-66.78, 18.29]],
      locationNote: '标示卡瓜纳遗址所在区域，不能代表整个泰诺人活动范围。',
      summary: '波多黎各内陆留有成组铺陈石列的场地，石面刻绘为认识殖民接触前的泰诺社会提供了线索。',
      text: [
        '在波多黎各内陆河谷，泰诺人用土和成排立石围出多个场地。发掘与遗址登记辨认出球场、仪式场地和刻有图像的石块。人群如何在场地中心和边缘聚集，是建筑布局能够帮助回答的问题。',
        '场地的具体用途需要结合考古和文献分辨；有些活动还可与西班牙接触初期的记录对读。卡瓜纳留下了原住民建设公共空间的实物，阅读加勒比海历史可以从他们已经经营的聚落与设施开始。',
      ],
      impact: '为研究欧洲殖民接触前后泰诺人的集体活动与仪式空间提供实物。',
      sources: [
        webSource(
          '美国国家公园管理局 · 卡瓜纳遗址登记档案',
          'https://npgallery.nps.gov/GetAsset/13028e15-be57-4528-8404-8d8d349bd154',
          '见遗址类型、卡帕阶段纪年、球场和刻石描述。',
        ),
      ],
    },
    {
      id: 'wu-parity-experiment',
      title: '吴健雄等人观测到弱相互作用中的宇称不守恒',
      year: 1956,
      endYear: 1957,
      dateLabel: '1956年末实验，1957年2月发表',
      dateNote: '1956年末取得实验结果，论文1957年2月15日出版。',
      category: '文化',
      themes: ['物理', '科学', '实验'],
      importance: 4,
      people: ['exp-em-wu-jianxiong', 'chen-ning-yang', 'tsung-dao-lee'],
      peopleNotes: {
        'exp-em-wu-jianxiong': '论文第一作者，与美国国家标准局研究人员共同完成实验。',
        'chen-ning-yang': '与李政道合写在弱相互作用中检验宇称的理论论文，未列为实验论文作者。',
        'tsung-dao-lee': '与杨振宁提出理论问题及检验途径，未列为实验论文作者。',
      },
      place: ['美国国家标准局旧址 · 华盛顿哥伦比亚特区', [-77.066, 38.944]],
      locationNote: '坐标定位华盛顿国家标准局旧址，现址另在马里兰州。',
      summary: '吴健雄与美国国家标准局同事通过钴-60衰变实验，观察到左右镜像不对称。',
      text: [
        '1956年，李政道和杨振宁重新检查弱相互作用的证据，发现已有实验不足以判定它是否遵守左右镜像对称，并提出可检验的情形。吴健雄与美国国家标准局的安布勒等人合作，把问题落到钴-60衰变中可测量的方向差异。',
        '如果镜像对称成立，实验所比较的两个方向应没有这种差异。团队在1956年底观测到差异，次年发表论文。这项实验把此前缺乏检验的对称性变成了可以凭实测结果讨论的问题。',
      ],
      impact: '实验结果为改变粒子物理中对弱相互作用的对称性理解提供了直接证据。',
      sources: [
        parityTest,
        webSource(
          '美国物理学会 · 国家标准局物理史迹',
          'https://www.aps.org/funding-recognition/historic-sites/nbs',
          '见实验地点为华盛顿旧园区。',
        ),
        webSource(
          '吴健雄等 · Experimental Test of Parity Conservation in Beta Decay',
          'https://doi.org/10.1103/PhysRev.105.1413',
          '《物理评论》105卷，核对作者和发表日期。',
        ),
      ],
    },
  ]),
  ...makeEvents('europe', [
    {
      id: 'darwin-beagle-departure',
      title: '达尔文随小猎犬号自普利茅斯启航',
      year: 1831,
      endYear: 1836,
      dateLabel: '1831年12月27日启航，1836年返航',
      dateNote: '起点取达尔文日记所记驶出港口的日期；日程表以翌日作为逐日编号的第一天。',
      category: '交流',
      themes: ['博物学', '航海', '科学考察'],
      importance: 4,
      people: ['category-person-darwin'],
      place: ['普利茅斯港 · 英国', [-4.15, 50.35]],
      locationNote: '坐标为启航港；详情及人物行迹另列考察地点。',
      summary: '小猎犬号执行测绘任务，达尔文参加这次航行，在不同停靠地进行地质及博物考察。',
      text: [
        '1831年12月27日，小猎犬号驶离普利茅斯。菲茨罗伊船长主持海岸测绘，达尔文则利用停港和离船的时间上岸观察。两人的任务不同，却都依赖航行把不同海岸及港口串在同一日程内。',
        '达尔文的日记把岩层、地震、海岸和动植物记在相邻的页上。航行所采集的标本和现场记录回到英国后还能继续辨认与比较。1836年返抵英国结束的是取样和观察的航程，相关研究随后还持续了多年。',
      ],
      impact: '在航行期间形成的日记与标本成为达尔文随后研究地质和生物变化的材料。',
      sources: [beagleDiary, beagleItinerary],
    },
    {
      id: 'darwin-wallace-linnean',
      title: '林奈学会同场宣读达尔文与华莱士的自然选择文稿',
      year: 1858,
      dateLabel: '1858年7月1日',
      category: '文化',
      themes: ['科学', '演化', '出版'],
      importance: 4,
      people: ['category-person-darwin', 'exp-em-wallace'],
      peopleNotes: {
        'category-person-darwin': '会议宣读达尔文较早文稿的节选及其书信节选。',
        'exp-em-wallace': '华莱士独立构思并来信寄送论文，文稿由他人提交会议。',
      },
      place: ['伦敦 · 林奈学会', [-0.14, 51.51]],
      locationNote: '坐标仅标示伦敦会议一带；两位作者均未出席。',
      summary: '华莱士寄来论文后，莱尔与胡克安排把它同达尔文较早的材料一起公开，两位作者都没到会。',
      text: [
        '华莱士在马来群岛研究动植物，写了一篇解释种群如何变化的论文并寄给达尔文。达尔文读到这篇论文时，发现对方独立提出了与自己研究相近的机制。莱尔和胡克随后把华莱士的论文、达尔文早期手稿节选和书信节选送到伦敦林奈学会。',
        '7月1日，学会同场宣读这些材料，两位作者都没有到场。会议记录与后来的刊本可以区分哪些文字由谁撰写，也让1858年的共同公布与1859年达尔文出版《物种起源》各有自己的时间和作者关系。',
      ],
      impact: '自然选择的两份独立论证得以一同公开，后来可与达尔文的系统著作逐段比较。',
      sources: [
        webSource(
          '英国自然史博物馆 · 1858年林奈学会论文校样及重印本',
          'https://www.nhm.ac.uk/CalmView/Record.aspx?id=WP%2F7%2F9&src=CalmView.Catalog',
          '馆藏档案列两位作者及宣读时间。',
        ),
        webSource(
          '英国自然史博物馆 · 华莱士生平',
          'https://www.nhm.ac.uk/discover/who-was-alfred-russel-wallace.html',
          '见华莱士寄稿及莱尔、胡克安排共同公布经过。',
        ),
      ],
    },
  ]),
  ...makeEvents('south-asia', [
    {
      id: 'taxila-sirkap',
      title: '塔克西拉的锡尔卡普城形成',
      year: -150,
      dateLabel: '约前2世纪中叶',
      dateNote: '以锡尔卡普的建城阶段约定起点；塔克西拉各址及其佛教设施的年代不同。',
      category: '社会',
      themes: ['城市', '考古', '佛教'],
      importance: 4,
      place: ['锡尔卡普遗址 · 今巴基斯坦塔克西拉', [72.84, 33.76]],
      locationNote: '坐标定位锡尔卡普一带，塔克西拉遗产还包括其他城址和寺院。',
      summary: '锡尔卡普按主要街道与成组街区组织城内空间，是塔克西拉先后兴起的城址之一。',
      text: [
        '古代塔克西拉有几处先后发展的城址。较早的比尔土丘保留曲折的街巷；锡尔卡普在公元前二世纪形成，城墙以内可以辨认较规则的街道和成组街区。沿街遗存包括住处、作坊和宗教建筑，能看到城市规划怎样落到居民的日常活动上。',
        '锡尔卡普后来仍经过多次使用与改建。与周围的佛塔、寺院及更晚的锡尔苏克城合读，可以区分同一区域的多段历史，建筑形式的相似也需要结合遗物和地层判断。',
      ],
      impact: '多处城址和宗教建筑为研究南亚西北部的城市与文化交流提供了连续材料。',
      sources: [
        unescosite('塔克西拉', 139, '见比尔土丘、锡尔卡普、锡尔苏克及周边佛教遗址。'),
        webSource(
          '塔克西拉遗产地定期报告 · 第三周期',
          'https://whc.unesco.org/document/216186',
          '见锡尔卡普建城时间及遗产组成。',
        ),
      ],
    },
  ]),
  ...makeEvents('central-asia', [
    {
      id: 'panjakent-sogdian-city',
      title: '古彭吉肯特留下粟特城市壁画',
      year: 601,
      endYear: 750,
      dateLabel: '约7世纪至8世纪中叶',
      dateNote: '以壁画和城市繁盛期的大致范围定位；遗址整体沿革还包括更早阶段。',
      category: '文化',
      themes: ['粟特', '建筑', '壁画'],
      importance: 4,
      place: ['古彭吉肯特 · 今塔吉克斯坦彭吉肯特', [67.62, 39.48]],
      placeIds: ['ancient-panjakent'],
      locationNote: '标示古城遗址，现代城区与古城范围不同。',
      summary: '泽拉夫尚河上游的粟特城中，住宅和庙宇的壁画留下宴饮、叙事与仪式场景。',
      text: [
        '粟特商人的活动越过许多绿洲，古彭吉肯特遗址则保存了他们故乡一种具体的城市生活。发掘者在城内辨认出住宅、街道和庙宇。有些住宅的会客厅以壁画装饰，画中可见宴饮、叙事和仪式场景。',
        '壁画原本属于房间的一部分。把图像放回建筑里，可以问哪些人有条件委托画师、怎样接待来客，以及哪些故事适合在公共交往空间展示。图像的解释仍要结合出土环境，不能只凭人物衣着就认定画的是某一国的使节。',
      ],
      impact: '住宅与壁画为重建粟特城市生活提供了与外地商旅文书不同的证据。',
      sources: [panjakent, zarafshan],
    },
  ]),
  ...makeEvents('southeast-asia', [
    {
      id: 'kedukan-bukit-inscription',
      title: '吉都坎武吉碑刻记下室利佛逝的早期活动',
      year: 682,
      category: '政治',
      themes: ['铭文', '室利佛逝', '苏门答腊'],
      importance: 4,
      place: ['吉都坎武吉 · 今印度尼西亚巨港', [104.74, -3.0]],
      locationNote: '坐标代表碑石出土地的巨港一带；铭文所涉行程不据此绘制。',
      summary: '巨港附近发现的古马来语碑刻记有682年的出行与集结，为室利佛逝早期活动提供纪年。',
      text: [
        '苏门答腊南部巨港附近发现的吉都坎武吉碑，用古马来语记录了一次出行和人员集结。石刻有明确纪年，为观察室利佛逝的早期活动提供了当地文献；这类短铭文所能提供的信息，与跨海来访者的见闻不同。',
        '铭文的出发地、相关地名及这次行动的性质，历来有不同解释。碑上的纪年可以帮助梳理政权活动，却无法单凭一块石刻划出室利佛逝当时的边界，也不能把682年精确等同于建国之年。',
      ],
      impact: '为早期室利佛逝的政治活动和古马来语的使用提供了可定位的材料。',
      sources: [
        webSource(
          '联合国教科文组织丝路项目 · 苏门答腊佛教的考古证据',
          'https://en.unesco.org/silkroad/sites/default/files/knowledge-bank-article/traces_of_buddhism_in_sumatra_an_archaeological_perspective.pdf',
          '见 Kedukan Bukit 碑、682年纪年及相关解释。',
        ),
      ],
    },
    {
      id: 'bungaya-treaty',
      title: '戈瓦与荷兰东印度公司签订《邦加亚条约》',
      year: 1667,
      category: '政治',
      themes: ['海上贸易', '条约', '望加锡'],
      importance: 4,
      people: ['sultan-hasanuddin'],
      place: ['望加锡一带 · 今印度尼西亚南苏拉威西', [119.41, -5.14]],
      placeIds: ['makassar'],
      locationNote: '以条约交割所涉乌戎潘当堡一带标示，未定位签字建筑。',
      summary: '戈瓦苏丹哈桑丁签下条约，乌戎潘当堡交予荷兰东印度公司，望加锡港的权力格局随之改变。',
      text: [
        '望加锡的海上贸易原由当地政权维持。荷兰东印度公司试图加强在苏拉威西及周边水域的控制，与戈瓦等当地力量交战。1667年11月，戈瓦苏丹哈桑丁签订《邦加亚条约》，乌戎潘当堡交予公司。',
        '公司后来把这座堡垒改称鹿特丹堡，利用它驻守并经营港口。条约只是过程中的一个节点，围绕贸易和地方政权的冲突仍有延续。岸边堡垒从当地王国转入公司手中，使条文落实为可以看见的港口控制变化。',
      ],
      impact: '东印度公司在望加锡取得据点，苏拉威西南部的贸易与权力关系随之重组。',
      sources: [gowa, makassar],
    },
    {
      id: 'penang-george-town',
      title: '英国东印度公司在槟榔屿建立乔治市据点',
      year: 1786,
      category: '交流',
      themes: ['海峡贸易', '港市', '殖民'],
      importance: 4,
      place: ['乔治市 · 今马来西亚槟城', [100.34, 5.42]],
      summary: '东印度公司人员在吉打沿岸的槟榔屿登陆并建立据点，后来的乔治市发展成海峡港口。',
      text: [
        '十八世纪末，英国东印度公司在印度洋东缘寻找供船只停靠、补给和贸易的据点。1786年，弗朗西斯·莱特在槟榔屿登陆，港湾附近逐步形成乔治市。岛屿原与吉打苏丹国相连，建立据点涉及双方交涉及随后才确定的安排。',
        '乔治市后来吸引不同地区的商人和劳工。由海边据点发展出的街区，可见店屋、宗教设施和社区空间相邻而建。把乔治市与马六甲对照，可以看出海峡港市共同依靠海运，也分别受到不同政权和移民网络的影响。',
      ],
      impact: '乔治市后来成为马六甲海峡北口的重要港市。',
      sources: [
        unescosite('马六甲与乔治市', 1223, '见英国时期港城及多社群城市遗产。'),
        webSource(
          '马六甲与乔治市遗产申报档案 · 乔治市',
          'https://whc.unesco.org/document/103167',
          '见3.2.1节乔治市地理、1786年设立据点与城市格局。',
        ),
      ],
      relatedEvents: [
        {
          id: 'world-malacca',
          label: '对读海峡两端的港市',
          note: '比较乔治市与马六甲形成的时代、政权及贸易网络。',
        },
      ],
    },
  ]),
  ...makeEvents('east-asia', [
    {
      id: 'ryukyu-three-kingdoms',
      title: '尚巴志统一冲绳岛三山，以首里为王都',
      year: 1429,
      dateLabel: '1429年（通行纪年）',
      dateNote: '采用北山先并、1429年南山结束的通行编年；史料对部分节点年份存在异说。',
      category: '政治',
      themes: ['琉球', '王国', '海上贸易'],
      importance: 4,
      people: ['sho-hashi'],
      place: ['首里 · 今日本冲绳县那霸市', [127.72, 26.22]],
      locationNote: '坐标为首里城一带，三山的政治中心分处冲绳岛各地。',
      summary: '尚巴志先后取得中山、北山和南山的统治权，以首里为中心整合冲绳岛的政权。',
      text: [
        '中山、北山和南山各有首领与城郭，已能分别同海外交往。由佐敷兴起的尚巴志一方先取得中山的支配权，再并北山、南山，形成以首里为王都的琉球王国。通常以1429年作为三山统一的节点。',
        '首里城后来继续扩建。王都与那霸港相邻，王府既要处理岛内地方势力，也要经营与明朝、朝鲜和日本诸地的使节往来。早于统一的海外联系不会因为政权更替突然中断，统一后的王府则有了统筹使节与贸易的新条件。',
      ],
      impact: '首里成为琉球王国的政治中心，岛内整合与对外交往由王府继续经营。',
      sources: [
        ryukyuTimeline,
        webSource(
          '日本文化厅 · 琉球王国时代与地方治理资料',
          'https://www.bunka.go.jp/seisaku/bunkazai/rekishibunka/pdf/93522312_01.pdf',
          '见古琉球小节，分列中山、北山与南山的阶段。',
        ),
      ],
    },
  ]),
  ...makeEvents('africa', [
    {
      id: 'timbuktu-scholarly-centre',
      title: '曼萨·穆萨在廷巴克图兴建津加里贝尔清真寺',
      year: 1325,
      endYear: 1328,
      dateLabel: '约1325—1328年',
      dateNote: '按遗产报告所列的初建阶段约定。今日所见建筑还包括十六世纪等后续重建。',
      category: '文化',
      themes: ['清真寺', '建筑', '马里帝国'],
      importance: 4,
      people: ['region-person-musa'],
      peopleNotes: {
        'region-person-musa': '遗产报告将寺院初建归于曼萨·穆萨返自朝觐后的营建活动。',
      },
      place: ['廷巴克图 · 今马里', [-3.01, 16.77]],
      placeIds: ['timbuktu'],
      summary: '曼萨·穆萨朝觐归来后在廷巴克图营建清真寺。寺院以土料为主，多次修葺和扩建。',
      text: [
        '十四世纪，曼萨·穆萨朝觐归来后推动廷巴克图营建津加里贝尔清真寺。寺院为当地信众提供聚礼空间。墙体和外挑的木构件使人能从实体建筑看见西非土筑清真寺的特点。',
        '初建寺院后来经过改造。联合国教科文组织的遗产说明记载，十六世纪后期，廷巴克图法官阿基卜主持扩建。今天看到的寺院叠合了这些不同时期的工作，城市在十五、十六世纪的手稿和教学传统可另作专题阅读。',
      ],
      impact:
        '寺院把马里帝国时期的王室赞助和后世廷巴克图居民使用、维修建筑的历史保存在同一处遗址。',
      sources: [
        unescosite('廷巴克图', 119, '见津加里贝尔清真寺初建及1570—1583年的重建、扩建。'),
        webSource(
          '联合国教科文组织 · 廷巴克图遗产保护研究',
          'https://whc.unesco.org/document/174278',
          '见1325年起营建、1328年建成的编年说明。',
        ),
      ],
      relatedEvents: [
        {
          id: 'world-mansa-musa',
          label: '曼萨·穆萨的朝觐',
          note: '朝觐归来后，他支持兴建廷巴克图的清真寺。',
        },
        {
          id: 'world-timbuktu-learning',
          label: '后来的教学与手稿传统',
          note: '寺院的营建和城市的学术兴盛属于不同阶段。',
        },
      ],
    },
    {
      id: 'abomey-dahomey-palaces',
      title: '达荷美历代君主营建阿波美王宫',
      year: 1650,
      endYear: 1900,
      dateLabel: '约17世纪中叶至19世纪末',
      dateNote: '指王国兴起以后宫殿群逐步形成的阶段，遗产所列具体建筑分别定年。',
      category: '政治',
      themes: ['达荷美', '建筑', '王权'],
      importance: 4,
      place: ['阿波美王宫群 · 今贝宁', [1.99, 7.18]],
      summary: '历代国王在阿波美营建相邻的宫苑，土墙、庭院和浮雕保留了达荷美王国的宫廷遗存。',
      text: [
        '十七世纪中叶以后，达荷美诸王在阿波美建立和扩充宫苑。宫殿群经过几代营造，多处院落各有门墙。庭院的排列和把不同空间隔开的做法，让人有机会追问王宫如何处理仪式、生活与日常治理。',
        '宫墙浮雕把王室徽记、历史叙事及权威象征留在建筑上。它们是宫廷选择呈现的历史，须和其他证据一起读。阿波美位于今天的贝宁共和国境内，历史上的达荷美王国与更东边、位于今尼日利亚的贝宁王国各有其政治沿革。',
      ],
      impact: '宫殿群为研究西非内陆王权的组织和视觉表达提供了成组实物。',
      sources: [unescosite('阿波美王宫', 323, '见达荷美王国、诸王宫院的建筑特点与装饰。')],
    },
  ]),
  ...makeEvents('oceania', [
    {
      id: 'meri-kotahitanga-motion',
      title: '梅里·特泰·芒阿卡希娅请求毛利议会开放女性参政',
      year: 1893,
      dateLabel: '1893年5月18日',
      category: '政治',
      themes: ['毛利', '女性', '参政'],
      importance: 4,
      people: ['meri-te-tai-mangakahia'],
      place: ['怀帕图 · 今新西兰霍克斯湾', [176.87, -39.63]],
      locationNote: '坐标为怀帕图会址一带。',
      summary:
        '在怀帕图召开的毛利议会上，她以毛利女性持有并管理土地为理由，提出投票与担任议员两项要求。',
      text: [
        '1893年5月18日，毛利议会下院议长提出梅里·特泰·芒阿卡希娅的动议，并请她到会解释。她指出一些毛利女性自己持有、管理土地，要求议会承认女性选举代表的权利，也允许她们自己当选。',
        '随后发言的阿克内希·托莫阿纳建议等议会取得承认后再议，提案没有在当次会议落实。同年9月，新西兰殖民地选举法赋予妇女国会选举投票权。两次行动所面对的议会不同，梅里的提案还明确涉及女性能否进入毛利议会。',
      ],
      impact: '动议保留了毛利女性从土地权和集体自治出发提出参政要求的记录。',
      sources: [meri, suffrage],
    },
    {
      id: 'hawaii-kue-petition',
      title: '夏威夷爱国联盟递交反兼并请愿',
      year: 1897,
      category: '政治',
      themes: ['夏威夷', '请愿', '主权'],
      importance: 4,
      people: ['region-person-liliuokalani'],
      peopleNotes: {
        'region-person-liliuokalani':
          '女王另向美国提出正式抗议；爱国联盟组织联署和递交，不将全部请愿活动归为女王个人行动。',
      },
      place: ['檀香山 · 夏威夷瓦胡岛', [-157.86, 21.31]],
      locationNote: '标示群岛内组织活动的中心；联署来自多岛，代表赴美国华盛顿递交。',
      summary:
        '群岛居民签名反对并入美国，代表把请愿书送到华盛顿，促使参议院审议时面对当地反对意见。',
      text: [
        '夏威夷君主制在1893年被推翻后，美国和新政府推动吞并条约。女王莉莉乌奥卡拉尼提出正式抗议，夏威夷爱国联盟则在群岛组织联署。美国国家档案馆所藏一组请愿书列有两万余名签署者；各地居民通过逐页签名留下了自己的立场。',
        '1897年底，联盟代表抵达华盛顿，请愿书随后列入参议院记录。吞并条约未获得通过所需的票数；1898年，美国国会又以联合决议推进兼并。保留下来的签名和抗议书让人可以把美国国内的程序，同群岛居民的意见放在一起核对。',
      ],
      impact: '原始签名保存了夏威夷居民反对被兼并的具体证据，并可与美国国会记录对照。',
      sources: [
        hawaiiPetition,
        webSource(
          '美国国家档案馆 · 1898年兼并夏威夷联合决议与女王抗议',
          'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands',
          '见女王抗议书、吞并条约未通过及后续联合决议原件。',
        ),
      ],
    },
  ]),
]

export const worldCoveragePeople = makePeople([
  {
    id: 'chen-ning-yang',
    name: '杨振宁',
    aliases: ['楊振寧', 'Chen Ning Yang', 'C. N. Yang'],
    birth: 1922,
    death: 2025,
    era: '中国与世界 · 二十世纪',
    role: '理论物理学家',
    summary: '与李政道讨论弱相互作用中的宇称检验，也研究规范场与统计物理。',
    text: '杨振宁生于合肥，早年就读西南联合大学，后来赴美国深造。1950年代，他和米尔斯研究非阿贝尔规范场，又和李政道重新审查弱相互作用中关于宇称守恒的证据。两人提出可由实验回答的检验问题，并因这项研究共同获得1957年诺贝尔物理学奖。',
    sources: [
      webSource(
        '清华大学校史馆 · 追记杨振宁先生',
        'https://xsg.tsinghua.edu.cn/info/1004/3806.htm',
        '核对生卒、求学和学术工作。',
      ),
      webSource(
        '杨振宁 · 1957年诺贝尔物理学奖演讲',
        'https://www.nobelprize.org/uploads/2018/06/yang-lecture.pdf',
        '关于宇称检验以及其他物理对称性。',
      ),
    ],
  },
  {
    id: 'tsung-dao-lee',
    name: '李政道',
    aliases: ['Tsung-Dao Lee', 'T. D. Lee'],
    birth: 1926,
    death: 2024,
    era: '中国与世界 · 二十世纪',
    role: '理论物理学家',
    summary: '与杨振宁提出检验弱相互作用中宇称守恒的方案，也从事场论与粒子物理研究。',
    text: '李政道生于上海，后赴美国深造并在哥伦比亚大学任教。1956年，他和杨振宁审查弱相互作用中的对称性证据并提出新检验，两人次年共同获诺贝尔物理学奖。此后他继续研究场论，并推动中国和美国在高能物理、人才培养方面的合作。',
    sources: [
      webSource(
        '上海交通大学李政道图书馆 · 李政道大事记',
        'https://tdllib.sjtu.edu.cn/lzd/rwjs/dsj.htm',
        '核对生卒、任教、粒子物理及中美合作。',
      ),
      webSource(
        '李政道 · 1957年诺贝尔物理学奖演讲',
        'https://www.nobelprize.org/uploads/2018/06/lee-lecture.pdf',
        '见弱相互作用中的宇称不守恒研究。',
      ),
    ],
  },
  {
    id: 'kamehameha-i',
    name: '卡美哈梅哈一世',
    aliases: ['卡美哈梅哈', 'Kamehameha I', 'Paiʻea'],
    birth: null,
    death: 1819,
    role: '夏威夷王国建立者',
    summary: '先后控制多个岛屿，并于1810年与考艾岛统治者达成协议。',
    text: '卡美哈梅哈出身夏威夷岛的高阶首领家族，出生年代有多种说法。十八世纪末，他通过岛际战争与结盟逐步控制主要岛屿。1810年，考艾岛统治者卡乌穆阿利承认他的宗主地位，并继续治理当地。卡美哈梅哈于1819年去世；王国还要在继承与对外交往中调整新形成的政治关系。',
    sources: [kamehameha],
  },
  {
    id: 'sho-hashi',
    name: '尚巴志',
    aliases: ['Shō Hashi', 'Sho Hashi', 'しょうはし'],
    birth: 1372,
    death: 1439,
    role: '第一尚氏王统的琉球国王',
    summary: '出身佐敷，先后整合冲绳岛三山，以首里为王都。',
    text: '尚巴志原为佐敷按司。他先取得中山的统治权，再并北山和南山，首里成为新王国的中心。地方首领与城郭势力并未随统一立即消失，后继诸王继续调整地方治理。冲绳史料常以1429年为三山统一的节点，部分阶段也有不同纪年。',
    sources: [
      ryukyuTimeline,
      webSource(
        '冲绳县文化财资料 · 冲绳县埋藏文化财篇',
        'https://www.pref.okinawa.jp/_res/projects/default_project/_page_/001/009/660/2018-06-01.pdf',
        '见尚巴志生卒年条。',
      ),
    ],
  },
  {
    id: 'sultan-hasanuddin',
    name: '苏丹哈桑丁',
    aliases: ['哈桑努丁', 'Sultan Hasanuddin'],
    birth: 1631,
    death: 1670,
    role: '戈瓦苏丹',
    summary: '在苏拉威西南部统治戈瓦，与荷兰东印度公司交战并在1667年签署《邦加亚条约》。',
    text: '哈桑丁继承戈瓦苏丹之位时，望加锡已参与群岛贸易。他统治期间与荷兰东印度公司及其地方盟友交战，1667年签订《邦加亚条约》。戈瓦随后失去乌戎潘当堡，公司将其改称鹿特丹堡。堡垒的更替为阅读他的生平留下了一处可定位的地方遗存。',
    sources: [gowa, makassar],
  },
  {
    id: 'meri-te-tai-mangakahia',
    name: '梅里·特泰·芒阿卡希娅',
    aliases: ['Meri Te Tai Mangakāhia', 'Meri Te Tai Mangakahia'],
    birth: 1868,
    death: 1920,
    role: '毛利女性参政倡议者',
    summary: '1893年在毛利议会主张女性应有选举代表和自己担任议员的权利。',
    text: '梅里·特泰出身霍基昂加的毛利家庭，1893年到怀帕图参加毛利议会。她用女性持有、经营土地的现实说明为什么议会需要听取女性自己的意见，并明确提出选举与担任议员两项权利。提案搁置后，她继续参与毛利妇女的组织活动。新西兰国家传记辞典把她的出生年记为1868年，同时注明日期来自传述。',
    sources: [meri, suffrage],
  },
])
