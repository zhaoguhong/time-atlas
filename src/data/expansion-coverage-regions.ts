import { makeEvents, makePeople, webSource } from './expansion-kit'
import { douglassChronology, northStarIssue } from './journey-public-life'

const heritage = (id: number, name: string, note: string) =>
  webSource(`联合国教科文组织 · ${name}`, `https://whc.unesco.org/en/list/${id}/`, note)

const abaiWords = webSource(
  '哈萨克斯坦语言资源平台 · 阿拜《箴言录》',
  'https://oq.gov.kz/en/abai/abai-45',
  '见分篇正文与分年，尤其第七篇论儿童求知、第二十五篇论语言和学习。',
)
const abaiBiography = webSource(
  '哈萨克斯坦外交部 · 阿拜·库南巴耶夫生平',
  'https://www.gov.kz/org/mfa-baku/press/article/details/7902?lang=ru',
  '见生卒、著述及翻译活动。',
)
const lamKinh = webSource(
  '越南国家旅游局 · 蓝京遗址',
  'https://vietnamtourism.gov.vn/en/post/17725',
  '见蓝山起义、黎利于1428年即位与蓝京纪念地点。',
)
const leChronology = webSource(
  '越南教育培训部 · 11年级历史教学材料',
  'https://moet.gov.vn/content/vanban/Lists/VBDH/Attachments/3713/3mon-lich-su-lop-11-ban-chinh-thuc-chot-ngay-30-8-2024signed.pdf',
  '蓝山起义课程材料见黎利生卒、起事和永陵。',
)
const tongaConstitution = webSource(
  '汤加总检察长办公室 · 汤加宪法',
  'https://ago.gov.to/cms/images/LEGISLATION/PRINCIPAL/1988/1988-0002/ConstitutionofTonga.pdf_3.pdf',
  '修订汇编卷首保留1875年11月4日乔治·图普一世颁行日期。后续修订条文与原法有别。',
)
const tongaParliament = webSource(
  '汤加议会 · 议会史',
  'https://parliament.gov.to/en/about-parliament/history',
  '见宪法制定前的议会形式、1875年成文法和各类代表的安排。',
)

export const regionalFollowupEvents = [
  ...makeEvents('americas', [
    {
      id: 'douglass-north-star',
      year: 1847,
      dateLabel: '1847年12月3日',
      title: '弗雷德里克·道格拉斯创办《北极星报》',
      category: '文化',
      themes: ['新闻', '废奴', '美国'],
      people: ['region-person-douglass'],
      importance: 4,
      place: ['罗切斯特 · 美国纽约州', [-77.61, 43.16]],
      summary: '道格拉斯在罗切斯特创办反奴隶制报纸，首期在1847年12月3日出版。',
      text: [
        '在美国演讲和到英国、爱尔兰巡讲之后，道格拉斯开始筹办自己的报纸。他选择在罗切斯特编辑和印行，1847年12月3日出版第一期。报纸可以把演讲所讨论的奴役和公民权问题送到无法到场的读者手里。',
        '查阅创刊号，可以看到报纸用社论、通讯和消息把不同地方的讨论放在一起。道格拉斯以后又参与其他报刊，《北极星报》为他以编辑身份介入政治开辟了一个长期的渠道。',
      ],
      impact: '使反奴隶制运动多了一个由曾受奴役者主持编辑的公共讨论场所。',
      sources: [northStarIssue, douglassChronology],
    },
  ]),
  ...makeEvents('central-asia', [
    {
      id: 'ai-khanoum-bactria',
      year: -300,
      endYear: -145,
      dateLabel: '约前300年至前145年',
      dateNote: '概括遗址约前300年起的希腊化城市阶段。较早活动、城市成长和废弃过程另有年代证据。',
      title: '阿姆河畔的艾哈努姆发展为巴克特里亚城市',
      category: '社会',
      themes: ['巴克特里亚', '考古', '城市'],
      importance: 4,
      place: ['艾哈努姆遗址 · 今阿富汗塔哈尔省', [69.41, 37.17]],
      locationNote: '定位阿姆河与科克恰河汇流处的古城遗址，古城范围以发掘资料为准。',
      summary: '两河汇合处的这座城留有剧场、公共建筑和带有不同艺术传统的器物。',
      text: [
        '艾哈努姆位于阿姆河与科克恰河汇流处。考古发掘辨认出剧场和体育场所，也看到宫殿、宗教建筑和家庭使用的器物。某些设施采用了希腊城市熟悉的形式，另一些建筑的布置和装饰则延续了中亚及周边地区的做法。',
        '城市的废弃大致发生在公元前二世纪中叶。遗物为辨认不同人群在当地生活和工作提供了线索，也让巴克特里亚的城市史可以从实物、建筑和铭文读起。',
      ],
      impact: '为研究希腊化时期巴克特里亚的城市制度与文化接触提供遗址证据。',
      sources: [
        webSource(
          '大都会艺术博物馆 · Afghanistan: Hidden Treasures from the National Museum, Kabul',
          'https://www.metmuseum.org/exhibitions/listings/2009/afghanistan',
          '见艾哈努姆城的公共建筑及出土器物介绍。',
        ),
        webSource(
          '大都会艺术博物馆 · The Art of Gandhara',
          'https://resources.metmuseum.org/resources/metpublications/pdf/The_Art_of_Gandhara_in_The_Metropolitan_Museum_of_Art.pdf',
          '见有关巴克特里亚和艾哈努姆年代的讨论。',
        ),
      ],
      relatedEvents: [
        {
          id: 'taxila-sirkap',
          label: '并读塔克西拉古城',
          note: '比较两处城市如何从街道、公共设施和遗物呈现区域往来。',
        },
      ],
    },
    {
      id: 'yasawi-mausoleum-building',
      year: 1389,
      endYear: 1405,
      dateLabel: '1389—1405年',
      dateNote: '采用遗产说明所列的主体工程时段，1405年工程停下时仍有细部未完成。',
      title: '帖木儿下令营建艾哈迈德·亚萨维陵寝',
      category: '文化',
      themes: ['苏菲传统', '建筑', '帖木儿王朝'],
      importance: 4,
      people: ['region-person-timur'],
      peopleNotes: { 'region-person-timur': '帖木儿支持陵寝营建，关联建筑委托。' },
      place: ['亚萨维陵寝 · 今哈萨克斯坦突厥斯坦市', [68.27, 43.3]],
      placeIds: ['turkestan-yasi'],
      summary: '帖木儿政权在苏菲学者亚萨维的墓地营建带有礼拜、聚会等空间的大型陵寝。',
      text: [
        '亚萨维去世后，他的墓地成为访谒场所。十四世纪末，帖木儿下令在原墓一带兴建大型陵寝。工匠把墓室、礼拜和集会所需的房间组织在一座建筑里，由大穹顶覆盖的中央厅可容多人聚集。',
        '工程在帖木儿去世前后停下，多处细部留在未完状态。不同部分的砌筑和装饰仍可供比较，使后来的研究者能看到这座建筑具体怎样建起来。',
      ],
      impact: '亚萨维陵寝延续了当地宗教纪念活动，并保存帖木儿时期的大型建筑工艺。',
      sources: [
        heritage(1103, '艾哈迈德·亚萨维陵寝', '见1390年前后的营建、起止年份、设施及未完部分。'),
      ],
      relatedEvents: [
        {
          id: 'world-timurid-rise',
          label: '帖木儿政权的形成',
          note: '把王朝的政治中心与其在草原南缘支持的宗教建筑并读。',
        },
      ],
    },
    {
      id: 'khiva-ichan-kala',
      year: 1700,
      endYear: 1900,
      dateLabel: '约18—19世纪',
      dateNote: '选择现存重要建筑集中的两世纪作阅读窗口。希瓦绿洲及内城的历史早于这一区间。',
      title: '希瓦内城营建宫殿、经学院和礼拜场所',
      category: '社会',
      themes: ['绿洲', '城市', '中亚商路'],
      importance: 4,
      place: ['希瓦内城 · 今乌兹别克斯坦希瓦', [60.36, 41.38]],
      placeIds: ['khiva'],
      summary: '砖墙围起希瓦内城，宫殿、经学院、清真寺和商旅所需的设施分布在城中。',
      text: [
        '希瓦所在的绿洲可以为穿越沙漠的商队提供停歇和补给。内城有砖砌城墙，墙内街巷把住处、清真寺和经学院与王室空间连在一起。',
        '现存建筑有多次重建留下的层次，例如聚礼清真寺见多个时期的木柱，宫殿则保留接见与居住的分区。走过这些街巷，可以从木作、砖墙和庭院看到绿洲城市怎样同时处理礼拜、商旅和王室生活。',
      ],
      impact: '保存了花剌子模绿洲城市日常生活与建筑组织的成组遗存。',
      sources: [
        heritage(543, '希瓦内城 Itchan Kala', '见城墙、沙漠商路、聚礼清真寺及现存宫殿与经学院。'),
      ],
      relatedEvents: [
        {
          id: 'world-khorezm-urgench',
          label: '同一地区的另一座古城',
          note: '同读花剌子模地区不同时期的乌尔根奇和希瓦。',
        },
      ],
    },
    {
      id: 'abai-book-of-words',
      year: 1890,
      endYear: 1898,
      dateLabel: '约1890年代',
      dateNote: '以现刊分篇年代定位写作期，现传《箴言录》由不同年份的散篇组成。',
      title: '阿拜写作《箴言录》',
      category: '文化',
      themes: ['哈萨克文学', '教育', '思想'],
      importance: 4,
      people: ['abai-kunanbayev'],
      place: ['塞米巴拉金斯克地区 · 今哈萨克斯坦塞梅伊一带', [80.23, 50.41]],
      locationNote: '以作者生活和接受教育的塞梅伊一带入图，不把各篇都定在同一房屋。',
      summary: '阿拜用哈萨克语写下一组短文，讨论儿童求知、家庭教养、谋生和学习外语。',
      text: [
        '在《箴言录》里，阿拜写孩子生来既需要饮食，也想看、想问。后一个愿望能否保留下来，要看成年人是否继续学习，也看家庭怎样对待孩子的好奇。',
        '他还讨论学习俄语能够接触哪些知识，以及学习的人如何判断该吸收什么。短文沿着常见的生活困难发问，不断回到同一个问题：人得到新的知识后，怎样改变自己的判断和做法。',
      ],
      impact: '将面向读者的短论和劝学文字纳入近代哈萨克语书面文学。',
      sources: [abaiWords, abaiBiography],
    },
    {
      id: 'central-asia-national-delimitation',
      year: 1924,
      endYear: 1925,
      dateLabel: '1924—1925年',
      dateNote: '以这轮划界决定和新单位陆续建立的阶段定位，后续区划仍有调整。',
      title: '苏联在中亚实施民族共和国划界',
      category: '政治',
      themes: ['边界', '民族', '苏联'],
      importance: 4,
      place: ['中亚绿洲与草原 · 以塔什干为参照', [69.24, 41.31]],
      locationNote:
        '划界涉及多个邻接地区。点位选作区域参照，不表示边界几何或全部交涉在塔什干举行。',
      summary:
        '1924年起，苏联在旧突厥斯坦、布哈拉和花剌子模等地重组行政单位，建立新的共和国与自治单位。',
      text: [
        '苏联成立后，原有中亚行政区的边界仍在调整。1924年，来自地方和中央的不同机构提交划界方案，讨论哪些绿洲、城市和牧场应进入拟设单位。人口使用的语言与自我认同是其中一部分依据，灌渠、市场及牧群移动也会受边界影响。',
        '划界产生了乌兹别克、土库曼等共和国和若干自治单位。地方争议与行政调整持续到后来，一些新边界成为二十世纪末独立国家边界的基础。',
      ],
      impact: '重组中亚的行政管辖，并影响后来区域内的国家边界与地方往来。',
      sources: [
        webSource(
          'Adrienne Lynn Edgar · Borders in Red',
          'https://ecommons.cornell.edu/bitstreams/9ae9d05d-a62c-4d8a-b26f-ff83b2be2c77/download',
          '见1924年中亚划界一章、地方方案与牧场争议。',
        ),
      ],
      relatedEvents: [
        {
          id: 'region-central-asia-independence',
          label: '从划界读到独立',
          note: '区分苏联时期行政重组和1991年各国独立。',
        },
      ],
    },
  ]),
  ...makeEvents('southeast-asia', [
    {
      id: 'my-son-champa-sanctuary',
      year: 400,
      endYear: 1300,
      dateLabel: '约4—13世纪',
      dateNote: '记录美山圣地从早期记载到多次营建的长时段，今存各建筑的主体年代分别考察。',
      title: '占城在美山谷地营建砖塔与寺庙',
      category: '文化',
      themes: ['占城', '建筑', '宗教'],
      importance: 4,
      place: ['美山圣地 · 今越南广南省', [108.12, 15.76]],
      summary: '占城诸王在美山营建多组寺塔，砖石建筑和铭文保存了祭祀及王室奉献的记录。',
      text: [
        '美山谷地里许多砖塔组成一座座寺院，建筑、雕刻和铭文分别留下不同年代的证据。占城统治者在那里营造祭祀空间，奉祀湿婆等神祇，部分碑文还记下重修或奉献。',
        '各座寺塔并非一次建成。门框、雕饰以及砖塔安排会随时期变化，可以据此观察占城工匠怎样在本地材料和建筑传统中表达从印度传来的宗教观念。',
      ],
      impact: '留下理解占城政治、宗教和建筑史所需的一组长期连续材料。',
      sources: [heritage(949, '美山圣地', '见4—13世纪营建时段、砖塔群及占城宗教实践。')],
      relatedEvents: [
        {
          id: 'category-champa-rice',
          label: '从占城寺塔读到区域往来',
          note: '另读以占城命名的稻种在宋代的传播。',
        },
      ],
    },
    {
      id: 'le-loi-later-le',
      year: 1428,
      title: '黎利即位，建立后黎朝',
      category: '政治',
      themes: ['越南', '王朝', '国家治理'],
      importance: 4,
      people: ['le-loi'],
      place: ['东都升龙 · 今越南河内', [105.84, 21.04]],
      placeIds: ['hanoi'],
      locationNote: '以新王朝都城升龙标示，黎利起兵的蓝山位于今清化。',
      summary: '蓝山起义历经多年，明朝军队撤离后，黎利于1428年即位并建立后黎朝。',
      text: [
        '黎利从清化蓝山地区起兵，队伍的活动范围经过数年扩大。明军撤离前后，蓝山一方从战时动员转入接管城镇和官署。1428年黎利即位，王朝以升龙为都。',
        '后世在蓝京保存陵墓、祭祀建筑和石刻。把蓝山、升龙和蓝京放在一起阅读，可以分别看到起事的地方基础、新朝处理政务的中心，以及王朝怎样纪念其开端。',
      ],
      impact: '后黎朝的建立改变了越南的政治秩序，蓝山起义及其纪念遗存延续下来。',
      sources: [lamKinh, leChronology],
      relatedEvents: [
        {
          id: 'region-hongduc-law',
          label: '后黎朝后来的法典',
          note: '比较建朝时的政权接管与后来成文法的整理。',
        },
      ],
    },
    {
      id: 'thonburi-new-capital',
      year: 1767,
      title: '郑昭在吞武里建立新都',
      category: '政治',
      themes: ['暹罗', '都城', '河运'],
      importance: 4,
      place: ['昭披耶河西岸吞武里 · 今泰国曼谷', [100.49, 13.74]],
      summary: '阿瑜陀耶陷落后，郑昭在昭披耶河下游的吞武里建立统治中心。',
      text: [
        '1767年，阿瑜陀耶失守。郑昭重整队伍，在昭披耶河下游西岸的吞武里设立新都。这里靠近出海口，人员、物资可以沿河进出，同时还能经水路联系内陆。',
        '吞武里作为都城延续到1782年，新王朝将都城移到东岸的曼谷。老都阿瑜陀耶、河西的吞武里与河东的曼谷，分别对应这一时期政权重组的不同阶段。',
      ],
      impact: '暹罗的政治中心转到昭披耶河下游，河两岸后来形成延续至今的城市格局。',
      sources: [
        webSource(
          '泰国艺术厅 · Bangkok Period',
          'https://www.finearts.go.th/storage/contents/2021/06/file/EiwJGL4IEMd1qFTvC2dDVNVRA0FDfDY33DYY5N6v.pdf',
          '见1767年阿瑜陀耶陷落、吞武里立都和1782年迁都。',
        ),
      ],
      relatedEvents: [
        {
          id: 'world-ayutthaya-foundation',
          label: '回看阿瑜陀耶的兴起',
          note: '比较暹罗先前的都城与1767年以后沿河下移的中心。',
        },
      ],
    },
    {
      id: 'rizal-la-liga-filipina',
      year: 1892,
      dateLabel: '1892年7月3日',
      title: '黎刹在马尼拉组织菲律宾联盟',
      category: '政治',
      themes: ['菲律宾', '结社', '殖民'],
      importance: 4,
      place: ['汤都区 · 今菲律宾马尼拉', [120.967, 14.617]],
      people: ['region-person-rizal'],
      locationNote: '取菲律宾国家历史委员会所记汤都纪念地点一带参照。',
      summary: '何塞·黎刹在马尼拉汤都成立菲律宾联盟，试图以互助、教育和结社推进改革。',
      text: [
        '1892年7月3日，何塞·黎刹在马尼拉汤都召集志同道合者，成立菲律宾联盟。组织希望联系各地成员，在遇到不公时提供互助，也把教育和经济改进列为活动目标。',
        '成立几天后，殖民当局逮捕黎刹，随后将他流放到达皮丹。部分参加者继续另寻组织形式。联盟的结社主张与同年出现的卡蒂普南可以对读，理解殖民地反对者如何选择各自的政治道路。',
      ],
      impact: '留下菲律宾改革者利用结社、互助和教育来组织公众的一项尝试。',
      sources: [
        webSource(
          '菲律宾国家历史委员会 · La Liga Filipina 历史标识',
          'https://philhistoricsites.nhcp.gov.ph/registry_database/la-liga-filipina/',
          '见1892年7月3日创立、汤都会址和联盟宗旨。',
        ),
        webSource(
          '菲律宾国家历史委员会 · Ladislao Diwa at ang Katipunan',
          'https://memory.nhcp.gov.ph/wp-content/uploads/2024/01/Ladislao-Diwa-at-ang-Katipunan.pdf',
          '见1892年黎刹被捕及联盟成员后来参加不同组织。',
        ),
      ],
      relatedEvents: [
        {
          id: 'region-katipunan',
          label: '同年的另一种组织道路',
          note: '比较联盟的社会改革与卡蒂普南争取独立的组织目标。',
        },
      ],
    },
  ]),
  ...makeEvents('oceania', [
    {
      id: 'tonga-constitution-1875',
      year: 1875,
      dateLabel: '1875年11月4日',
      title: '乔治·图普一世颁布汤加宪法',
      category: '政治',
      themes: ['汤加', '宪法', '太平洋'],
      importance: 4,
      people: ['george-tupou-i'],
      place: ['努库阿洛法 · 汤加塔布岛', [-175.2, -21.14]],
      placeIds: ['nukualofa'],
      summary: '汤加把王位继承、权利与议会等安排写入宪法。',
      text: [
        '汤加已有议事和立法的做法。1875年11月4日，乔治·图普一世颁布宪法，把王位继承、政府和议会的安排写进同一部成文法，也列出有关人身和信仰的规定。',
        '王室、贵族和民众代表如何分享立法权力，需要放回当时的制度阅读。汤加此后的宪法多次修改，现行代表席位和政府形成办法也经过调整。',
      ],
      impact: '为汤加王国的治理和权力继承建立了延续至今的宪法框架。',
      sources: [tongaConstitution, tongaParliament],
    },
    {
      id: 'cook-islands-self-government',
      year: 1965,
      dateLabel: '1965年8月4日',
      title: '库克群岛在与新西兰自由联系下实行自治',
      category: '政治',
      themes: ['库克群岛', '自治', '太平洋'],
      importance: 4,
      place: ['拉罗汤加岛 · 库克群岛', [-159.78, -21.21]],
      summary: '库克群岛宪法生效，由本地议会和内阁承担治理，并同新西兰保持自由联系。',
      text: [
        '1965年8月4日，库克群岛宪法安排生效。当地的立法机关和内阁承担治理事务，并保留与新西兰的自由联系。宪法法案在规定地方机构权力的同时，也保留了关于对外事务和防务的关系。',
        '自由联系给当地居民留出了自行决定公共事务的空间，两地的公民身份和往来则继续存在。此后双方又通过新的文件厘清发展、外交及合作中的分工。',
      ],
      impact: '在太平洋去殖民化过程中确立另一种经自治选择形成的政治安排。',
      sources: [
        webSource(
          '新西兰立法网 · Cook Islands Constitution Act 1964',
          'https://www.legislation.govt.nz/act/public/1964/0069/latest/DLM354260.html',
          '见生效时间、自治、外事防务与公民身份条款。',
        ),
        webSource(
          '新西兰外交贸易部 · 新西兰与库克群岛百年联合声明',
          'https://www.mfat.govt.nz/assets/Countries-and-Regions/Pacific/Cook-Islands/Cook-Islands-2001-Joint-Centenary-Declaration-signed.pdf',
          '见自由联系如何在实际关系中延续。',
        ),
      ],
    },
    {
      id: 'australia-1967-referendum',
      year: 1967,
      dateLabel: '1967年5月27日',
      title: '澳大利亚公投修改涉及原住民的宪法条款',
      category: '政治',
      themes: ['原住民', '宪法', '澳大利亚'],
      importance: 4,
      place: ['澳大利亚全国 · 以堪培拉为参照', [149.13, -35.31]],
      locationNote: '全国公投，地图用联邦首都作阅读参照。',
      summary: '公投支持修宪，扩大联邦就原住民事务立法的权限，并废除一项人口统计限制。',
      text: [
        '争取修宪的团体在多个州组织活动。1967年5月27日，九成以上的有效票赞成修宪。结果允许联邦依相关条款就原住民事务立法，也废除了原住民在宪法规定的人口统计中被排除的条款。',
        '公投改变的是宪法权限与统计规则。联邦选举权在此前已经由选举法扩大，土地权后来又经运动、裁判和立法推进。把几次变化放回各自年份，才能看清不同的权利怎样取得。',
      ],
      impact: '使联邦成为能够直接就原住民事务立法的层级之一，也为后续政策争论改变了制度条件。',
      sources: [
        webSource(
          '澳大利亚国家档案馆 · The 1967 Referendum',
          'https://www.naa.gov.au/explore-collection/first-australians/other-resources-about-first-australians/1967-referendum',
          '见5月27日、表决结果以及两项宪法条款修改。',
        ),
        webSource(
          '澳大利亚国家博物馆 · First Nations peoples counted in Census',
          'https://www.nma.gov.au/defining-moments/resources/first-nations-peoples-census',
          '见宪法人口口径与人口普查实践的区别。',
        ),
      ],
      relatedEvents: [
        {
          id: 'region-wave-hill',
          label: '同时代的土地诉求',
          note: '区分公投改变的联邦权限与古林吉人提出的劳动、土地要求。',
        },
      ],
    },
    {
      id: 'waitangi-tribunal-establishment',
      year: 1975,
      title: '新西兰设立怀唐伊裁判所',
      category: '政治',
      themes: ['毛利', '条约', '土地'],
      importance: 4,
      place: ['新西兰议会 · 惠灵顿', [174.78, -41.28]],
      placeIds: ['wellington'],
      locationNote: '标示推动立法的地点，调查和听证在不同地区举行。',
      summary: '新西兰设立受理毛利条约申诉的机构，1985年才把调查追溯到1840年。',
      text: [
        '1975年的《怀唐伊条约法》设立裁判所，使毛利人可以就王室的行为和政策提出与条约有关的申诉。裁判所调查证据并提出意见，申请人能把地方材料、口述和政府记录带入同一听证程序。',
        '最初权限限于法案通过后的事项。1985年修法扩大到1840年，十九世纪土地征收等历史争议才进入这套调查框架。调查结论与政府随后采取的和解、立法措施各有进程。',
      ],
      impact: '为梳理新西兰自条约签署以来的争议建立了可累积证据的制度渠道。',
      sources: [
        webSource(
          '怀唐伊裁判所 · 2023—24年度报告',
          'https://www.waitangitribunal.govt.nz/assets/Annual-Reports/Annual-Report-2023-24-English.pdf',
          '见机构职责、1975年设立及1985年扩大追溯权限。',
        ),
      ],
      relatedEvents: [
        {
          id: 'world-waitangi',
          label: '回到1840年条约',
          note: '对比两种条约文本与此后处理争议的机构。',
        },
        {
          id: 'region-maori-land-march',
          label: '同年的土地行动',
          note: '并读毛利土地运动与申诉制度的发展。',
        },
      ],
    },
    {
      id: 'kiribati-independence',
      year: 1979,
      dateLabel: '1979年7月12日',
      title: '基里巴斯独立',
      category: '政治',
      themes: ['太平洋', '去殖民化', '岛屿'],
      importance: 4,
      place: ['塔拉瓦环礁 · 基里巴斯', [173.01, 1.42]],
      locationNote: '塔拉瓦作首都所在区域的参照，国土包括分散的岛屿与环礁。',
      summary: '原英属吉尔伯特群岛于1979年以基里巴斯为名独立，采用新宪法。',
      text: [
        '英国曾把吉尔伯特群岛和埃利斯群岛置于同一殖民安排内。两部分后来分别走向自决，埃利斯群岛成为图瓦卢。1979年7月12日，以吉尔伯特群岛为主体的基里巴斯独立。',
        '基里巴斯的各岛相距很远。新政府处理议会、行政和公共服务时，要让不同岛屿都能参与。联合国的去殖民化报告记录了这些岛屿在独立前所处的行政地位。',
      ],
      impact: '结束英国对吉尔伯特群岛的殖民统治，确立基里巴斯的国家机构。',
      sources: [
        webSource(
          '联合国去殖民化事务 · 吉尔伯特群岛档案',
          'https://www.un.org/dppa/decolonization/sites/www.un.org.dppa.decolonization/files/decon_num_15-1.pdf',
          '见独立前行政地位以及1979年以基里巴斯独立。',
        ),
        webSource(
          '联合国海洋事务和海洋法司 · 基里巴斯海洋治理研究',
          'https://www.un.org/oceancapacity/sites/www.un.org.oceancapacity/files/files/Projects/Norad/OGS/kiribati_ogs_final.pdf',
          '见1979年7月12日独立、宪法及群岛地理。',
        ),
      ],
    },
    {
      id: 'marshall-islands-compact',
      year: 1986,
      dateLabel: '1986年10月21日',
      title: '马绍尔群岛与美国的自由联系协定生效',
      category: '政治',
      themes: ['马绍尔群岛', '自由联系', '太平洋'],
      importance: 4,
      place: ['马朱罗环礁 · 马绍尔群岛', [171.38, 7.08]],
      summary: '协定确立双方的自由联系，马绍尔群岛管理本国事务，美国承担协定所列防务职责。',
      text: [
        '第二次世界大战后，马绍尔群岛属于由美国管理的联合国托管领土。群岛先建立自己的宪政机构，双方随后就对外关系、防务与经济协助制定条款，自由联系协定于1986年10月21日生效。',
        '协定明确马绍尔群岛政府的治理和对外事务能力，也为美国在防务上的权利义务规定条件。托管的正式终止另有联合国程序，核试验遗留问题也继续由不同制度处理。',
      ],
      impact: '改变群岛同美国的政治关系，并为双方后续的防务、财政和公民往来提供法律框架。',
      sources: [
        webSource(
          '美国内政部 · 马绍尔群岛',
          'https://www.doi.gov/oia/islands/marshallislands',
          '见1979年政府、1986年自由联系与后续安排。',
        ),
        webSource(
          '美国内政部 · 575 DM 1 联邦自由联系沿革',
          'https://www.doi.gov/sites/default/files/elips/documents/575-dm-1.pdf',
          '见协定1986年10月21日生效及托管沿革。',
        ),
      ],
      relatedEvents: [
        {
          id: 'region-bikini-tests',
          label: '托管之前后的核试验遗产',
          note: '区分核试验及迁居、后来自由联系协定与核损害救济各阶段。',
        },
      ],
    },
  ]),
]

export const regionalFollowupPeople = makePeople([
  {
    id: 'abai-kunanbayev',
    name: '阿拜·库南巴耶夫',
    aliases: ['阿拜', 'Abai Kunanbayev', 'Abay Qunanbaiuly'],
    birth: 1845,
    death: 1904,
    role: '哈萨克诗人、作家和译者',
    summary: '用哈萨克语写诗和短论，讨论学习、劳动与共同生活，并译介俄语文学。',
    text: '阿拜出身于塞梅伊地区，在当地求学。写诗之外，他把对家庭教育、语言学习和谋生的看法写进《箴言录》，也翻译和改写俄语文学作品。诗、译文和短论可以合在一起读，看到他如何在哈萨克语中表达自己经不同语言接触的知识。',
    sources: [abaiWords, abaiBiography],
  },
  {
    id: 'le-loi',
    name: '黎利',
    aliases: ['黎太祖', 'Lê Lợi', 'Le Loi'],
    birth: 1385,
    death: 1433,
    role: '蓝山起义领袖、后黎朝开国皇帝',
    summary: '在清化蓝山起兵。明军撤离后于1428年即位，开创后黎朝。',
    text: '黎利出身清化蓝山地区，1418年率众起事。队伍经历多年战争和交涉，明军撤离后，他在1428年即位。后黎朝以升龙为都，黎利去世后葬在蓝山一带。蓝京今天保存的陵墓和纪念建筑，可与起事和建朝的史料对读。',
    sources: [lamKinh, leChronology],
  },
  {
    id: 'george-tupou-i',
    name: '乔治·图普一世',
    aliases: ['乔治·图普一世', 'George Tupou I', 'Taufaʻahau Tupou I'],
    birth: null,
    death: 1893,
    role: '汤加国王、1875年宪法颁布者',
    summary: '在群岛政治整合中取得领导地位，1875年颁行汤加宪法。',
    text: '乔治·图普一世在十九世纪逐步整合汤加诸岛的王权，推动王室、首领、议会和新兴行政机关形成成文的权力安排。1875年宪法由他颁布。汤加官方介绍将其生年约定在1797年前后，确年未明，卒于1893年。',
    sources: [
      tongaConstitution,
      tongaParliament,
      webSource(
        '汤加公共企业部 · 图普一世纪念日及生平',
        'https://mpe.gov.to/?tribe_events=tupou-1-day',
        '见约略生年、群岛统一、制宪及1893年卒。',
      ),
    ],
  },
])
