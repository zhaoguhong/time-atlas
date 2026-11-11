import type { Tour } from '../types'

type Focus = {
  id: string
  name: string
  subject: string
  question: string
  introduction: string
  paragraphs: string[]
  conclusion: string
  parents: string[]
  steps: string[]
}
const focusedTopics: Focus[] = [
  {
    id: 'chibi-and-alliance',
    name: '赤壁之后，孙刘为什么还会交战？',
    subject: '战争与格局',
    question: '共同抵抗曹操的盟友，为什么后来在夷陵相遇？',
    introduction:
      '赤壁把孙权与刘备联在一起，荆州和各自的发展方向又使双方发生冲突。联盟的变化，取决于共同威胁与各自利益怎样消长。',
    paragraphs: [
      '曹操南下时，孙权担心江东受到威胁，刘备则需要摆脱败退的处境。合作使双方能够集中力量，阻止曹操继续推进。胜利以后，两方都要安排自己的土地、军队和后续发展，原先暂时搁置的利益问题随之显露。',
      '荆州连接长江中游与周围地区，对刘备向西经营、孙氏保障江东都有意义。刘备取得益州和汉中之后，力量基础发生变化，双方争夺荆州又进一步破坏关系。夷陵战争由此发生在多年合作与竞争之后。',
      '刘备东征失败，蜀吴仍须面对北方强大的魏国，重新合作便有现实理由。地图上相邻的政权既可能需要共同抵抗外敌，也可能争夺同一片资源与通道，这两种关系会随着战局变化。',
    ],
    conclusion:
      '孙刘合作解决了赤壁时共同面对的危险，却没有消除荆州及各自发展的矛盾。夷陵之后的重新结盟，也来自双方对力量与安全的再次判断。',
    parents: ['three-kingdoms'],
    steps: ['chibi', 'hanzhong', 'shu-founded', 'yiling', 'wu-emperor'],
  },
  {
    id: 'qin-conquest-and-government',
    name: '打下六国以后，秦怎样把命令送到地方？',
    subject: '政治与制度',
    question: '统一怎样从军事胜利进入县廷与居民的日常事务？',
    introduction:
      '城邑被攻下以后，官府要处理户口、粮食、案件和征发。秦的统治能力，很大一部分就在这些日常工作里。',
    paragraphs: [
      '兼并使秦取得更多土地与人口，也增加了处理事务的距离。地方官需要知道上级要求什么，上级则要知道地方完成了多少。文字、度量和账目能够衔接，才便于核对征收、仓储与交付。',
      '文书要由人起草、递送和接收，再落实到具体事务。县廷的吏员记录人口、案件与物资，使责任能够被追查。统一的规则必须通过这些地方工作人员，才能真正到达居民生活。',
      '朝廷因此能动员更广的人力，但征发过多也会把压力传到家庭。大泽乡起义及其后的战争，发生在地方负担与政治危机相互交织的环境中。汉后来继承并调整秦的制度，说明行政工具与使用工具的政治选择可以有不同命运。',
    ],
    conclusion:
      '秦的统一依靠标准、文书与地方官府把远方接起来。制度使命令能够执行，也使朝廷的征发进入日常，居民承受的负担因而成为统治能否持续的重要条件。',
    parents: ['qin-unification', 'messages-distance-and-access'],
    steps: [
      'qin-han-state',
      'qin-standardization',
      'early-plus-qin-courier',
      'dazexiang',
      'han-founded',
    ],
  },
  {
    id: 'hexi-and-oases',
    name: '河西走廊为什么如此重要？',
    subject: '交通与交流',
    question: '一段狭长地带，怎样影响汉朝与西域的往来？',
    introduction:
      '从关中向西，旅行者需要穿过河西，再进入更远的绿洲与山口。沿途能否取得水、粮食与保护，决定远行能否继续。',
    paragraphs: [
      '地图上的距离只是旅行的一部分。山地和干旱地区限制了可以选择的通道，有水与聚落的地点便成为补给处。使节、商人和军队需要这些地方，也必须处理与沿途居民和政治力量的关系。',
      '张骞第一次出使带回许多西方信息，河西战争随后改变了汉与匈奴在通道上的力量关系。军事胜利之后，建郡、驻军和地方经营继续影响道路是否可用。朝廷还须为军队筹粮，并维持与绿洲诸国的交往。',
      '西域都护和班超的活动说明，经营并未在取得河西后结束。进入更远地区，仍要面对不同的政治条件。河西提供了重要的连接，却需要与西域各地的合作一起发挥作用。',
    ],
    conclusion:
      '河西的重要性来自它将地理通道、沿途补给和政治控制集中在一起。取得通道为远行创造条件，维持联系则是一项长期工作。',
    parents: ['silk-road'],
    steps: ['zhangqian', 'hexi', 'zhangqian-second', 'western-regions', 'ban-chao'],
  },
  {
    id: 'capital-and-grain',
    name: '都城为什么离不开远方的粮食？',
    subject: '地区与城市',
    question: '朝廷选择都城时，怎样处理政治位置与粮食供应之间的距离？',
    introduction:
      '宫廷、官员、军队和城市居民需要稳定供给。都城的政治位置很重要，粮食能否年年抵达，同样关系到它能否长久维持。',
    paragraphs: [
      '一个政治中心能够吸引人口，也会集中消费。附近农业不足以承担全部需要时，远方粮食必须通过运输网络送来。仓库、水路和转运地点于是成为都城的一部分，只是分布在更广的地域。',
      '洛阳营建与隋运河相互配合，元朝则为大都同时经营海运和内河。会通河与通惠河分别处理不同路段的困难，任何一段不畅，都可能影响最后的交付。',
      '明迁都北京以后，政治中心与南方粮源之间仍有很长距离。维持都城因此包含沿途修河、组织船运和征收粮食。迁都的成本会落到首都以外许多地区，也使那些地方的生产与朝廷日常联系起来。',
    ],
    conclusion:
      '都城能够远离主要产粮区，依靠的是持续组织运输的能力。政治选择决定城市的位置，供给网络使这个选择成为可以维持的现实。',
    parents: ['grand-canal'],
    steps: [
      'sui-east-capital',
      'canal',
      'yuan-maritime-grain',
      'huitong-canal',
      'tonghui',
      'beijing-capital',
    ],
  },
  {
    id: 'tax-enters-household',
    name: '赋税怎样改变一家人的生活？',
    subject: '生产与经济',
    question: '交粮、出役与缴钱，为什么会给家庭带来不同压力？',
    introduction:
      '官府账目中的一个税额，到了家庭里，要变成粮食、现金或离家服役的时间。制度变化因而会改变劳动和收支的安排。',
    paragraphs: [
      '交实物需要生产和保存相应物资，服役要抽出能够劳动的人。一个家庭在农忙时失去劳力，与在收获以后缴纳粮食，面对的困难并不相同。官府决定征收办法时，也在改变居民安排生活的条件。',
      '部分赋役折为银钱以后，家庭要通过出售产品或其他收入取得货币。卖价、收成和当地货币流通会影响实际负担。法定数额相同，获得缴纳所需的钱却可能有不同难度。',
      '摊丁入亩又把部分丁银分摊到田赋。制度上土地占有者承担更多，但租佃和地方分摊会影响最后由谁支付。理解税制，需要从法令继续读到具体执行与家庭之间的关系。',
    ],
    conclusion:
      '赋税不仅转移财物，也安排了家庭何时出售产品、何时拿出劳力。判断一项改革的效果，必须同时看征收标准和居民筹措的办法。',
    parents: ['tax-money-markets', 'qing-state'],
    steps: [
      'lu-land-tax',
      'two-tax',
      'exp-em-grain-silver',
      'single-whip',
      'yongzheng-tax-integration',
    ],
  },
  {
    id: 'paper-money-and-trust',
    name: '一张纸为什么能当钱用？',
    subject: '生产与经济',
    question: '纸币的便利怎样依靠发行、兑换与信用？',
    introduction:
      '纸张比金属钱币轻便，但收钱的人必须相信下一次交易仍有人接受它。交子与宝钞的历史，把这种信任背后的制度显露出来。',
    paragraphs: [
      '四川交易使用铁钱，携带与大额支付有实际困难。交子提供了较便于转移的凭据，官府设立交子务后，发行和管理成为公共事务。纸张的价值由此与发行者能否履行承诺联系起来。',
      '规定纸币可以使用，还要处理发行多少、怎样兑换以及市场是否接受的问题。发行者需要资源和管理，持有者则关心它能换到多少货物。当这些预期发生变化，纸面数额与实际购买力也可能出现距离。',
      '大明宝钞提供了另一种观察：国家的规定与市场使用并不总是同步。把纸币与金属货币放在一起看，货币既有材料与制造问题，也有管理、供给和信用问题。',
    ],
    conclusion:
      '纸币能够流通，依靠的是接受与支付的关系被持续维持。轻便使它有用，发行、兑换和公众预期则决定人们愿不愿继续使用。',
    parents: ['tax-money-markets'],
    steps: ['wuzhu-currency', 'official-jiaozi', 'exp-em-treasure-notes'],
  },
  {
    id: 'poetry-in-exile',
    name: '贬居怎样进入诗文？',
    subject: '文学与艺术',
    question: '白居易与苏轼怎样把生活转折写成后来不断被阅读的作品？',
    introduction:
      '离开原来的官职与交往环境，意味着生计、身份和日常生活都要调整。作品保存了这种变化，也通过声音、景物与叙述重新安排经验。',
    paragraphs: [
      '白居易贬江州以后，《琵琶行》把一位艺人的身世与自己的迁谪处境放在一起。演奏让身世得以被听见，身世又使音乐获得新的意味。诗人通过相遇和倾诉，把原先属于两个人的失意联系起来。',
      '苏轼在黄州写赤壁赋，以江水、明月和历史人物展开对人生的思考。眼前景物与想象中的古人交错，使个人处境进入更长的时间感。理解乌台诗案与贬居经历，可以帮助读者看见这些问题为何在此时变得迫切。',
      '文学对经历有所选择：一段生活中发生许多事，作品只留下足以组成情感和思想线索的部分。读诗文时既看生平，也看叙述怎样推进，才容易理解同样的失意为何能够写出不同作品。',
    ],
    conclusion:
      '贬居改变生活的条件，诗文则将这些条件转为可以分享的感受与思考。作品的力量来自经历，也来自作者安排语言和叙述的能力。',
    parents: ['tang-poets-lives', 'northern-song-reform-reversals'],
    steps: ['bai-juyi-jiangzhou', 'depth-bai-juyi-pipa', 'wutai-poetry', 'sushi-red-cliff'],
  },
  {
    id: 'translation-workshops',
    name: '经典怎样被译成另一种语言？',
    subject: '思想与信仰',
    question: '求得经书以后，翻译者还要完成哪些工作？',
    introduction:
      '一本经书抵达长安，读者却未必能够理解。文字、概念和讲授之间的距离，需要译者与合作者长期处理。',
    paragraphs: [
      '译经首先要读懂原文，再选择汉语中能够承载意思的表达。熟悉语言、解释义理、记录译文和校订文本，涉及不同能力。译场让这些工作能够持续配合，也使翻译与讨论同时进行。',
      '玄奘西行与既有译本和学说的分歧有关。旅途中学习所得，归国后还要转为文本和教学，才能成为他人可以阅读的知识。鸠摩罗什的译场与玄奘后来的工作，展示了不同阶段的长期协作。',
      '经典传播又依赖寺院、教师与学习者。鉴真所参与的戒律传授说明，宗教知识还包括如何实践、如何培养人员。语言转换、文本保存与日常传授由此接在一起。',
    ],
    conclusion:
      '翻译是一连串理解、选择和校订的工作。旅程带来材料，译场与教学使材料进入新的语言生活。',
    parents: ['buddhist-texts-and-networks'],
    steps: ['category-kumarajiva', 'category-nalanda', 'xuanzang', 'xuanzang-return', 'jianzhen'],
  },
  {
    id: 'port-and-hinterland',
    name: '一座港口靠什么繁荣？',
    subject: '地区与城市',
    question: '泉州、基尔瓦与马六甲怎样连接海上来客和地方社会？',
    introduction:
      '港口是船只停泊的地方，也是货物、劳力和语言相遇的地方。海峡位置带来机会，城市还要有办法留住商人并持续供应交易。',
    paragraphs: [
      '船只需要补水、修理和等待航行时机，货物需要仓储、运输和买家。内陆道路与河流把产地接到海边，工匠、搬运者和市场参与者共同维持港口生活。没有腹地支持，泊位本身无法形成长期贸易。',
      '泉州市舶管理将征税与船货联系起来，基尔瓦依靠东非地方社会参与远洋交换，马六甲则吸引不同社群在海峡交易。港口的共同需要相似，具体的权力与合作方式却各有历史。',
      '政治控制改变时，税费、安全与商人的选择也会变化。葡萄牙占领马六甲后，其他港口仍然存在，商人可以调整活动地点。海洋网络由许多选择组成，一座港口的得失会影响全局，却无法代替全局。',
    ],
    conclusion:
      '港口繁荣来自区位、腹地与城市组织共同发挥作用。海上航线把来客带来，地方生产与交易条件让往来能够持续。',
    parents: ['indian-ocean-ports'],
    steps: [
      'quanzhou-office',
      'world-kilwa-trade',
      'world-malacca',
      'completeness-indian-textiles',
      'world-malacca-conquest',
    ],
  },
  {
    id: 'factory-city-sanitation',
    name: '工厂增多以后，城市怎样应对污水和疾病？',
    subject: '社会与生活',
    question: '生产增长为什么会把饮水、住房和排污变成公共事务？',
    introduction:
      '工业城市吸引劳动者集中居住，生产与人口增长改变了街区的生活条件。工厂的产量上升，城市却还要另行解决共同使用的水和道路。',
    paragraphs: [
      '工人需要在工作地点附近居住，人口集中增加住房和供水需求。污水和拥挤影响许多家庭，一个住户即使改善自己的房屋，也无法独自处理整片街区的环境。卫生问题因此超出个人能够解决的范围。',
      '英国公共卫生立法将这些事务纳入治理，但法令还需要地方财政、工程和人员配合。饮水与排污设施要施工、维护并覆盖居民生活的地区。城市公共健康由此与征收、管理和建设能力相连。',
      '工业化继续发展时，铁路、轮船和电力扩大了城市联系，公共设施也要随之调整。交通便利可以带来物资和就业，人口与活动增加又提出新的日常需要。生产与城市生活在这种往复中共同改变。',
    ],
    conclusion:
      '城市卫生成为公共事务，是因为居民共享同一套环境与设施。处理这些问题需要持续的组织与经费，机器生产本身无法完成这些工作。',
    parents: ['industry-transport-and-life'],
    steps: ['world-industrial', 'world-public-health', 'world-second-industrial'],
  },
  {
    id: 'vaccine-to-eradication',
    name: '从接种到根除天花，还要走多远？',
    subject: '社会与生活',
    question: '一种预防办法，怎样成为能够覆盖人群的长期行动？',
    introduction:
      '牛痘接种提供了新的预防办法，天花根除却还需要生产、接种、监测和跨地区合作。两者之间，隔着把知识落实到许多地方的工作。',
    paragraphs: [
      '接种方法从试验走向广泛使用，要保证材料与操作可靠，也要让人员能够持续提供服务。不同地区的交通、经费和医疗条件影响谁能获得保护。发现一种办法之后，扩大可及性成为另一项任务。',
      '疫苗试验与推广逐渐需要更大规模的组织，脊灰疫苗提供了另一种观察。评估效果、生产分发和实际接种各有环节，任何一处出现问题，都可能影响人群中的结果。',
      '根除天花还要持续发现病例、追踪疫情并组织相应接种。跨国合作使不同地方的行动能够联系起来，监测又帮助判断传播是否仍在继续。1980年的确认，是这些长期工作累积的结果。',
    ],
    conclusion:
      '预防方法提供工具，根除行动则要把工具、信息和人组织起来。天花的历史展示了这种合作能够取得的成果，也说明医学发现需要怎样的后续投入。',
    parents: ['disease-medicine-public-health'],
    steps: ['category-jenner', 'modern-polio-vaccine', 'modern-smallpox-eradication'],
  },
  {
    id: 'school-and-access',
    name: '有了学校，谁能真正走进课堂？',
    subject: '知识与教育',
    question: '办学怎样面对家庭资源、性别与地域带来的差别？',
    introduction:
      '学校提供学习的场所，一个人能否就读，还取决于身份资格、费用、距离和家庭安排。教育机会是在这些条件共同变化时扩大的。',
    paragraphs: [
      '书院需要藏书、教师和持续支持，学生则需要离家学习的条件。学校存在于某个地方，并不表示周围所有人都有相同机会。谁能够负担时间与生活费用，影响着课堂中的人群。',
      '浦那女子学校和津田梅子的办学直接回应女性教育受限的问题。组织者要寻找资金、安排教学，并面对社会习惯。争取学习权利由此落实为可以进入的教室与可以继续的课程。',
      '义务教育进一步把保障入学转为公共责任。学校和教师怎样分布，地方能否持续负担经费，决定原则怎样成为居民身边的服务。法律、资源与日常实践必须接续起来。',
    ],
    conclusion:
      '教育机会不仅取决于学校的数量，也取决于学生能否到达并持续学习。办学者与公共制度需要同时处理资源和原有排斥。',
    parents: ['schools-and-examinations'],
    steps: [
      'white-deer-academy',
      'region-phule-girls-school',
      'region-tsuda-college',
      'completeness-compulsory-education',
    ],
  },
  {
    id: 'history-and-commentary',
    name: '读史为什么要连注释一起读？',
    subject: '知识与教育',
    question: '一部史书的正文之外，注释和考订能够补充什么？',
    introduction:
      '古书中的词义和制度会随时代变得陌生，同一件事也可能留下不同记载。注释把这些问题带到正文旁边，让读者看见更多材料。',
    paragraphs: [
      '陈寿以纪传安排三国史事，人物的不同经历分散在各篇之中。后来裴松之引用其他记载，补入背景、异闻与不同解释，读者因此能够比较材料，而不只是沿着一条叙述读下去。',
      '颜师古注《汉书》时，需要处理字音、词义与旧有解释。同一个词若按后世习惯理解，可能误解原来的制度。注释把理解文本所需的知识重新放到读者面前，同时也包含注者自己的判断。',
      '刘知几进一步讨论史家怎样取材和叙事，《资治通鉴》的编纂又要在不同记载之间考订和排列。读史因此可以从“发生了什么”继续追问“这件事根据什么这样写”。',
    ],
    conclusion:
      '注释帮助读懂古书，也保留正文之外的证据。把不同说法放在一起，读者才更容易看出哪些结论可靠、哪些问题仍有余地。',
    parents: ['how-history-is-written'],
    steps: [
      'chen-shou-history',
      'early-plus-yanshigu-hanshu',
      'early-plus-tang-shitong',
      'zizhi-tongjian',
    ],
  },
  {
    id: 'longitude-and-clock',
    name: '航海者怎样用时间找位置？',
    subject: '知识与教育',
    question: '为什么一只走得准的钟，会成为远洋航行的重要工具？',
    introduction:
      '船离开陆地以后，需要判断自己向东或向西走了多远。当地太阳时与参考地点时间之间的差别，为求经度提供了一条办法。',
    paragraphs: [
      '地球自转使不同经度的地方在不同时间迎来正午。若能知道参考地点的时间，再与当地太阳时比较，就能由时间差求出经度差。困难在于远洋航行很长，计时器必须在船上持续保持足够精度。',
      '格林尼治的观测工作与航海需求联系在一起，经度法案又提出奖励和检验要求。天文测量与精密计时是不同的解决路径，都要把理论放到真实航行中测试。',
      'H4航海钟接受跨洋试验，需要经受温度变化和船体运动。一场有效试验之后，还有复试、评审和制造供应的问题。工具能够被更多船只使用，依靠的是精密工艺逐步成为可持续的生产能力。',
    ],
    conclusion:
      '时间差提供定位原理，精密计时把原理变成海上工具。观测、工艺与测试共同解决了其中的困难。',
    parents: ['observing-sky-measuring-position'],
    steps: ['exp-em-greenwich', 'exp-em-longitude-act', 'exp-em-harrison-h4'],
  },
  {
    id: 'abolition-and-livelihood',
    name: '摆脱奴役以后，人们怎样谋生？',
    subject: '社会与生活',
    question: '法律自由与土地、劳动和收入之间，为什么还有一段距离？',
    introduction:
      '废除奴隶制或农奴身份，改变了一个人受支配的法律关系。原有土地、财富和雇佣条件却未必同时改变，新的生活仍须在这些条件中展开。',
    paragraphs: [
      '禁止奴隶贸易与废除奴隶制分别针对不同问题，法律实施也常有过渡安排。被奴役者的反抗、废奴组织与政治动员共同推动改变；谁获得赔偿、谁仍须承担劳动义务，又表现出改革中的利益分配。',
      '农奴解放以后，土地取得与赎买安排继续影响家庭。获得迁移和选择工作的自由，并不自动带来维持生活的资源。其他地区的废奴同样要面对贫困、债务与地方权力的延续。',
      '因此，观察改革需要把法令与此后的劳动条件放在一起。法律身份变化扩大了行动空间，人们还要通过谋生、组织和进一步争取，把新的权利变成能够使用的机会。',
    ],
    conclusion:
      '法律解放具有直接意义，生活条件的改变则需要继续处理土地、收入和社会关系。两者相互联系，也有不同的时间过程。',
    parents: ['labor-rights-citizenship'],
    steps: [
      'world-slave-trade-abolition',
      'world-slavery-abolition-act',
      'world-russian-emancipation',
      'world-brazil-abolition',
      'region-siam-slavery-abolition',
    ],
  },
  {
    id: 'city-water-and-labor',
    name: '古代城市怎样组织水与劳动？',
    subject: '地区与城市',
    question: '不同环境中的城市，靠什么持续供水、排水和维护公共空间？',
    introduction:
      '城市把许多人集中在一起，水和公共设施需要共同安排。河谷、平原和湖区提供不同条件，也提出不同的维护任务。',
    paragraphs: [
      '印度河城市的排水与街道显示了营建中的组织，成都平原水利则处理河流进入田地的方式。设施需要工艺，也需要持续劳动；水流、淤积和损坏会不断改变它们的使用条件。',
      '苏轼疏浚西湖时，用水、湖区治理与筑堤相互联系。挖出淤泥以后怎样利用，湖水怎样服务周围居民，都属于具体安排。城市工程往往同时影响交通、生产与景观。',
      '特诺奇蒂特兰在湖区利用堤道、水路和市场连接周边。地理环境为城市提供便利，也使城市依赖那些需要维护的连接。比较这些地点，可以看见不同社会怎样把自然条件转为共同生活的基础。',
    ],
    conclusion:
      '城市水利的长期作用，来自技术与共同劳动的结合。地形决定要解决什么问题，社会组织决定工程能否持续使用。',
    parents: ['south-asian-societies', 'water-food-cities', 'american-urban-traditions'],
    steps: ['moenjodaro-city', 'dujiangyan', 'sudi', 'world-tenochtitlan'],
  },
]

export function createFocusedTopics(existing: Tour[]): Tour[] {
  const topics = new Map(existing.map((topic) => [topic.id, topic]))
  const chapters = new Map(
    existing.flatMap((topic) =>
      (topic.chapters ?? []).map((chapter) => [chapter.eventId, chapter] as const),
    ),
  )
  return focusedTopics.map((topic) => {
    const parents = topic.parents.map((id) => {
      const parent = topics.get(id)
      if (!parent) throw new Error(`Missing source topic: ${id}`)
      return parent
    })
    const sources = [
      ...new Map(
        parents
          .flatMap((parent) => parent.sources ?? [])
          .map((source) => [JSON.stringify(source), source]),
      ).values(),
    ]
    const steps = topic.steps.map((id) => {
      const chapter = chapters.get(id)
      if (!chapter) throw new Error(`Missing source chapter: ${topic.id}/${id}`)
      return { ...chapter }
    })
    return {
      id: topic.id,
      name: topic.name,
      question: topic.question,
      subject: topic.subject,
      introduction: [topic.introduction],
      description: topic.introduction,
      conclusion: topic.conclusion,
      article: { paragraphs: topic.paragraphs, eventIds: topic.steps },
      steps: topic.steps,
      chapters: steps,
      sources,
      color: parents[0].color,
      icon: topic.subject === '战争与格局' ? 'swords' : 'route',
      subtitle: `${topic.subject} · ${topic.steps.length} 章`,
    }
  })
}
