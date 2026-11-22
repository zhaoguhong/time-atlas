import grainSupply from '../assets/articles/grain-supply.svg'
import type { ArticleMedia } from '../types'

/** Museum objects and authored diagrams are placed beside the passage they explain. */
export const articleVisuals: Record<
  string,
  { section: string; paragraph?: number; media: Omit<ArticleMedia, 'afterParagraph'> }[]
> = {
  'qin-unification': [
    {
      section: '从新武陵到迁陵，回信往哪里送',
      paragraph: 0,
      media: {
        id: 'qin-dispatch',
        src: 'images/articles/qin-dispatch.svg',
        width: 600,
        height: 480,
        alt: '酉阳送公文给迁陵，迁陵向酉阳回报已收到，两支箭头各指一个方向。',
        caption:
          '据里耶秦简9-2283所记传递要求，图中只画酉阳、迁陵相接的一段。回报让上一县知道公文已到，办理结果还须另查。',
        credit: '山河纪绘制 · 据里耶秦简释文',
      },
    },
  ],
  'tang-turning-point': [
    {
      section: '官吏夜里来，诗让谁说话',
      paragraph: 1,
      media: {
        id: 'shihao-household',
        src: 'images/articles/shihao-household.svg',
        width: 600,
        height: 478,
        alt: '三个儿子都到邺城一带从军，一个儿子捎信，两人新近战死。诗末老妇又请往河阳准备早饭。',
        caption: '据杜甫《石壕吏》。邺城是儿子们从军之处，河阳是老妇提出去应役的地方。',
        credit: '山河纪绘制',
      },
    },
  ],
  'opium-wars': [
    {
      section: '条约签过以后，谁来同外国交涉',
      media: {
        id: 'met-728348',
        src: 'images/articles/met-728348.jpg',
        width: 599,
        height: 463,
        alt: '费利斯·比托1860年拍摄的奕訢肖像，装裱于相册页中。',
        caption:
          '1860年，摄影师费利斯·比托为恭亲王奕訢拍下这张肖像。馆藏英文题名把他误称为皇帝，他当时以亲王身份参与交涉。',
        credit: '大都会艺术博物馆 · 开放获取（CC0）',
        sourceUrl: 'https://www.metmuseum.org/art/collection/search/728348',
      },
    },
  ],
  'silk-road': [
    {
      section: '绿洲之间，商队靠什么继续走下去',
      media: {
        id: 'met-49368',
        src: 'images/articles/met-49368.jpg',
        width: 439,
        height: 624,
        alt: '唐代三彩骆驼俑，长颈上扬，两座驼峰清晰可见。馆藏照片为黑白影像。',
        caption:
          '这件8世纪的唐三彩陶俑塑出了双峰驼昂首站立的姿态。商队借助驼力穿越绿洲之间的旱地，沿途仍要有人照料驼群。',
        credit: '大都会艺术博物馆 · 开放获取（CC0）',
        sourceUrl: 'https://www.metmuseum.org/art/collection/search/49368',
      },
    },
  ],
  'mongol-conquests': [
    {
      section: '通行牌背后的马匹、粮食与劳动',
      paragraph: 0,
      media: {
        id: 'met-39624',
        src: 'images/articles/met-39624.jpg',
        width: 500,
        height: 625,
        alt: '元代通行牌，牌面有竖排的银质八思巴字，顶部装有挂环。',
        caption:
          '13世纪晚期的元代通行牌。铁牌顶部装有挂环，嵌银的八思巴字传达大汗的敕令，使者能把这份凭据随身带到下一站。',
        credit: '大都会艺术博物馆 · 开放获取（CC0）',
        sourceUrl: 'https://www.metmuseum.org/art/collection/search/39624',
      },
    },
  ],
  'age-of-exploration': [
    {
      section: '发现海路以后，为什么还要一次次回来',
      media: {
        id: 'met-338712',
        src: 'images/articles/met-338712.jpg',
        width: 600,
        height: 459,
        alt: '一艘四桅船和两艘三桅船泊在设防的海岛附近。',
        caption:
          '弗兰斯·许斯据老彼得·勃鲁盖尔的图样刻制，1561—1565年。四桅船旁还泊着两艘三桅船，后方的岛上建有防御工事和灯塔。',
        credit: '大都会艺术博物馆 · 开放获取（CC0）',
        sourceUrl: 'https://www.metmuseum.org/art/collection/search/338712',
      },
    },
    {
      section: '白银为什么把美洲矿区与亚洲市场接起来',
      paragraph: 1,
      media: {
        id: 'silver-payment',
        src: 'images/articles/silver-payment.svg',
        width: 600,
        height: 485,
        alt: '四段长短相同的布，分成两组。布价高时卖出较少布匹便足以缴税，布价低时要卖得更多。',
        caption:
          '布匹换银示意。两种情况的应缴银额相同，所画布匹的数量只用来对照，不代表史实中的兑换率。',
        credit: '山河纪绘制 · 关系示意',
      },
    },
  ],
  'qiaopi-remittances': [
    {
      section: '信里有两笔钱，只有一笔用途写得分明',
      paragraph: 0,
      media: {
        id: 'qiaopi-two-payments',
        src: 'images/articles/qiaopi-two-payments.svg',
        width: 600,
        height: 450,
        alt: '黄宝世先托寄三百元港银，信中追问是否收妥，再托寄五百五十元用于学费与家用。',
        caption:
          '据中国华侨历史博物馆所录家信摘记。左右是信中提到的两次托寄，旧款是否收妥要等家人回信。',
        credit: '山河纪绘制 · 据正文所列史料',
      },
    },
  ],
  'nanhai-shipwreck': [
    {
      section: '瓷罐和铜钱把年代夹到哪里',
      paragraph: 0,
      media: {
        id: 'nanhai-dating',
        src: 'images/articles/nanhai-dating.svg',
        width: 600,
        height: 450,
        alt: '淳熙元宝与瓷罐上癸卯墨书并读，可推断这艘船出航不早于南宋淳熙十年，即1183年。',
        caption: '钱币、罐形均为示意。两件证据合在一起可以推断最早可能的出航年代，沉没日期仍待考。',
        credit: '山河纪绘制 · 据正文所列史料',
      },
    },
  ],
  reformation: [
    {
      section: '同样引用福音，提出的要求却不相同',
      paragraph: 1,
      media: {
        id: 'swabian-articles',
        src: 'images/articles/swabian-articles.svg',
        width: 600,
        height: 450,
        alt: '1525年施瓦本农民十二条款将村社选牧师、林木使用和劳役负担写入同一份文书。',
        caption:
          '据施瓦本农民《十二条款》第1、5、6条摘意。牧师、林木和劳役同列，正可看出请愿人希望改变哪些日常规则。',
        credit: '山河纪绘制 · 据正文所列史料',
      },
    },
  ],
  'buddhist-texts-and-networks': [
    {
      section: '须菩提和善现，原来是同一个人',
      paragraph: 1,
      media: {
        id: 'sutra-names',
        src: 'images/articles/sutra-names.svg',
        width: 600,
        height: 450,
        alt: '梵语人名Subhūti，在鸠摩罗什本中依音作须菩提，在玄奘本中依名义作善现。',
        caption:
          '鸠摩罗什《金刚般若波罗蜜经》和玄奘《大般若波罗蜜多经》第五百七十七卷的问法者是同一位弟子。',
        credit: '山河纪绘制 · 据正文所列史料',
      },
    },
    {
      section: '先开口讲，再决定怎样落笔',
      paragraph: 1,
      media: {
        id: 'translation-work',
        src: 'images/articles/sutra-colloquy.svg',
        width: 600,
        height: 450,
        alt: '鸠摩罗什拿外文经本口译，姚兴对照已有汉译，学僧们商量文意，再定下译句。',
        caption:
          '据僧叡《大品经序》所记的逍遥园译讲绘制。这里把两份经本分开标出，具体座次无从考定。',
        credit: '山河纪绘制 · 据《大品经序》',
      },
    },
    {
      section: '鉴真东渡，要带去可以延续的传授',
      media: {
        id: 'met-690059',
        src: 'images/articles/met-690059.jpg',
        width: 600,
        height: 450,
        alt: '日本8世纪中叶《因果经》绘卷，上方图像与下方经文并排展开。',
        caption:
          '日本8世纪中叶《因果经》绘卷。上排画释迦说法，下排抄录经文，是鉴真生活的时代在日本流传佛教故事的一种形式。',
        credit: '大都会艺术博物馆 · 开放获取（CC0）',
        sourceUrl: 'https://www.metmuseum.org/art/collection/search/690059',
      },
    },
  ],
  'porcelain-world': [
    {
      section: '远方买家的生活，怎样进入器形与纹样',
      paragraph: 1,
      media: {
        id: 'met-202581',
        src: 'images/articles/met-202581.jpg',
        width: 538,
        height: 625,
        alt: '青花执壶，壶身可见葡萄牙王室纹章。',
        caption:
          '景德镇青花执壶，约1520—1540年。壶身上的葡萄牙王室纹章被倒过来画了。图稿已传到窑场，对纹章朝向的理解却可能在转手时丢失。',
        credit: '大都会艺术博物馆 · 开放获取（CC0）',
        sourceUrl: 'https://www.metmuseum.org/art/collection/search/202581',
      },
    },
    {
      section: '景德镇的优势，怎样从原料变成生产能力',
      paragraph: 1,
      media: {
        id: 'porcelain-work',
        src: 'images/articles/porcelain-work.svg',
        width: 600,
        height: 448,
        alt: '买家的图样先要适应弯曲的壶身，再由画工在瓷胎上施青料，经施釉烧成，纹样才固定在釉下。',
        caption: '以釉下青花器为例。展开的图样要落到曲面上，器形、画工与烧成共同决定成品的样貌。',
        credit: '山河纪绘制 · 关系示意',
      },
    },
  ],
  'industry-transport-and-life': [
    {
      section: '棉布把机器、煤炭与远方的土地连起来',
      paragraph: 0,
      media: {
        id: 'met-447109',
        src: 'images/articles/met-447109.jpg',
        width: 600,
        height: 426,
        alt: '18世纪印花棉布残片，布面可见成排的树木、动物和花卉。',
        caption:
          '这块18世纪印花棉布据馆方判断产自印度。英国开始用机器纺纱时，商人和买家早已熟悉由印度织工和印染工制作的花布。',
        credit: '大都会艺术博物馆 · 开放获取（CC0）',
        sourceUrl: 'https://www.metmuseum.org/art/collection/search/447109',
      },
    },
  ],
  'grand-canal': [
    {
      section: '明迁北京，南方供给成为北方都城的日常',
      media: {
        id: 'met-41493',
        src: 'images/articles/met-41493.jpg',
        width: 599,
        height: 290,
        alt: '《乾隆南巡图》第六卷局部，一艘长船行于水面，岸边的人群排成长列。',
        caption:
          '徐扬1770年绘成《乾隆南巡图》第六卷，画的是乾隆1751年循运河进入苏州。截取的这一段里，带篷的长船在水面上行进，行列沿着河岸展开。',
        credit: '大都会艺术博物馆 · 开放获取（CC0）',
        sourceUrl: 'https://www.metmuseum.org/art/collection/search/41493',
      },
    },
    {
      section: '粮在河上，谁靠它谋生',
      paragraph: 0,
      media: {
        id: 'grain-supply',
        src: grainSupply,
        width: 800,
        height: 650,
        alt: '粮食从产地经过征收、仓储、水陆运输和交付进入都城，沿途需要人力、维护与补给。',
        caption:
          '都城供粮涉及的环节。各时代的征收与转运办法不同；图中只解释这些环节的关系，不表示一条实际漕运路线。',
        credit: '山河纪绘制 · 流程示意',
      },
    },
  ],
  'writing-and-knowledge': [
    {
      section: '打开经卷，先看见什么',
      paragraph: 1,
      media: {
        id: 'diamond-scroll',
        src: 'images/articles/diamond-scroll.svg',
        width: 600,
        height: 365,
        alt: '七张纸从右向左接成长卷，卷首有说法图，接着是经文，最后一张留有施印题记。',
        caption:
          '据英国图书馆藏Or.8210/P.2绘制。右端卷首有说法图，经卷向左展开，卷尾留下王玠的题记。图中纸幅等宽，仅示次序。',
        credit: '山河纪绘制 · 据英国图书馆国际敦煌项目',
        sourceUrl: 'https://idp.bl.uk/collection/51FDAEAFB4A24E2E9981692A98130BC8/',
      },
    },
  ],
  'chinese-literature-and-performance': [
    {
      section: '赋文写上四方瓶',
      paragraph: 0,
      media: {
        id: 'met-701291',
        src: 'images/articles/met-701291.jpg',
        width: 468,
        height: 624,
        alt: '清代青花方瓶，这一面画着岸边山石和江上的小舟。',
        caption:
          '康熙年间（1662—1722）的青花方瓶，以图和文装饰四方瓶身。这一面画舟游赤壁，转到别的瓶面还可以读到苏轼的赋文。',
        credit: '大都会艺术博物馆 · 开放获取（CC0）',
        sourceUrl: 'https://www.metmuseum.org/art/collection/search/701291',
      },
    },
  ],
  'observing-sky-measuring-position': [
    {
      section: '同一轮太阳，两地的正午',
      paragraph: 2,
      media: {
        id: 'longitude-two-times',
        src: 'images/articles/longitude-two-times.svg',
        width: 600,
        height: 494,
        alt: '船的当地时刻十二点，港口同一时刻十四点。港口先过正午，船在它的西方，地方时相差两小时相当于经度三十度。',
        caption: '按两地采用相同时间尺度举例。每小时相差15度经度。实际测量要校正太阳时与钟表误差。',
        credit: '山河纪绘制',
      },
    },
    {
      section: '同一轮太阳，两地的正午',
      paragraph: 1,
      media: {
        id: 'met-444408',
        src: 'images/articles/met-444408.jpg',
        width: 467,
        height: 624,
        alt: '也门1291年星盘，圆形盘面上有重叠刻度和可转动的构件。',
        caption:
          '也门星盘，1291年。观测者把天体的位置与盘面刻度对照，从中读数。海上辨认经度，还要知道另一地在同一瞬间的时间。',
        credit: '大都会艺术博物馆 · 开放获取（CC0）',
        sourceUrl: 'https://www.metmuseum.org/art/collection/search/444408',
      },
    },
  ],
  'west-asian-urban-worlds': [
    {
      section: '乌鲁克：一笔谷物怎样留下账目',
      paragraph: 1,
      media: {
        id: 'met-327384',
        src: 'images/articles/met-327384.jpg',
        width: 468,
        height: 624,
        alt: '一块巴掌大的泥板，横竖划线分出格子，格子里留有刻画的图形和圆形压痕。',
        caption:
          '约公元前3100—前2900年的谷物账板，可能出自乌鲁克。泥板宽约6.5厘米，图形旁的圆印表示数目。学者推测记录涉及大麦和二粒小麦，个别条目的细节仍难确知。',
        credit: '大都会艺术博物馆 · 开放获取（CC0）',
        sourceUrl: 'https://www.metmuseum.org/art/collection/search/327384',
      },
    },
  ],
  'xinhai-revolution': [
    {
      section: '南北议和，把军事实力带到谈判桌上',
      media: {
        id: 'negotiation',
        src: 'images/articles/negotiation.svg',
        width: 600,
        height: 508,
        alt: '时间线分别标出南京临时政府成立、清帝退位和临时参议院选举袁世凯，区分皇位的终止与总统的产生。',
        caption:
          '从南京临时政府成立到袁世凯当选临时大总统。议和解决了最高职位的交接，北洋军的指挥权与各省军饷仍待安排。',
        credit: '山河纪绘制 · 关系示意',
      },
    },
  ],
  'constitutions-rights-and-participation': [
    {
      section: '没有奴隶的种植园，要怎样开工',
      paragraph: 0,
      media: {
        id: 'haiti-freedom',
        src: 'images/articles/haiti-freedom.svg',
        width: 600,
        height: 452,
        alt: '1801年圣多明各宪法第三条废除奴隶制，第十四至十六条要求维持种植园生产，并限制耕作者自由迁居。',
        caption: '据1801年圣多明各宪法。当地人身自由已有明文保证，1804年才宣布独立。',
        credit: '山河纪绘制',
      },
    },
  ],
  'world-wars': [
    {
      section: '三年后，港口和铁路分别怎样交接',
      paragraph: 1,
      media: {
        id: 'shandong-railway',
        src: 'images/articles/shandong-railway.svg',
        width: 600,
        height: 488,
        alt: '1919年对德和约将德国原有胶济铁路及附属财产权益交给日本，中国代表没有签署。1922年中日另议移交，中国以有偿方式接收铁路。',
        caption:
          '1919年《凡尔赛条约》第156条与1922年山东交涉所规定的两次移转。港口租借地与铁路分别交接。',
        credit: '山河纪绘制',
      },
    },
  ],
  'disease-medicine-public-health': [
    {
      section: '从最后一例到全球认证',
      media: {
        id: 'smallpox',
        src: 'images/articles/smallpox.svg',
        width: 600,
        height: 472,
        alt: '时间线从1977年索马里最后一例自然感染，到继续搜寻和独立核查，再到1980年世界卫生大会确认根除天花。',
        caption:
          '最后一例自然感染与世界卫生大会确认根除相隔数年。期间仍要查找可能遗漏的病例，并核实各地的监测结果。',
        credit: '山河纪绘制 · 关系示意',
      },
    },
  ],
  'tax-money-markets': [
    {
      section: '到了收获季，借户要卖多少粮',
      paragraph: 0,
      media: {
        id: 'green-shoots-loan',
        src: 'images/articles/green-shoots-loan.svg',
        width: 600,
        height: 400,
        alt: '五格表示借来的一千文。还钱时在五格之外再加一格二百文利息，合计一千二百文。',
        caption:
          '依《宋史·王安石传》所记二分利息举例。一千文是算例中的借款数，每一行各表示一次借或还。',
        credit: '山河纪绘制 · 据《宋史》卷三百二十七',
      },
    },
  ],
}
