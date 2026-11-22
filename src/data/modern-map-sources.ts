import type { Source } from '../types'

export const modernMapSources = {
  cairo: {
    title: '外交部 · 《开罗宣言》',
    url: 'https://www.fmprc.gov.cn/web/ziliao_674904/zt_674979/dnzt_674981/qtzt/twwt/zylswj/202206/t20220606_10699034.html',
    note: '公布日期及关于中国东北、台湾、澎湖的条文。',
  },
  potsdam: {
    title: '外交部 · 《波茨坦公告》',
    url: 'https://www.fmprc.gov.cn/ziliao_674904/zt_674979/dnzt_674981/qtzt/twwt/zylswj/202206/t20220606_10699035.html',
    note: '1945年7月26日发布，第八条重申实施《开罗宣言》。',
  },
  surrender: {
    title: '外交部 · 《日本投降书》',
    url: 'https://www.fmprc.gov.cn/diaoyudao/chn/flfg/gjty/201510/t20151009_8560602.html',
    note: '1945年9月2日签署，日本接受并承诺履行《波茨坦公告》。',
  },
  surrenderOriginal: {
    title: '美国国家档案馆 · 日本投降书原件',
    url: 'https://www.archives.gov/milestone-documents/surrender-of-japan',
    note: '原件及签署说明，记1945年9月2日密苏里号签字。',
  },
  taiwanSurrender: {
    title: '国家档案局 · 《中国受降档案》第二十三集',
    url: 'https://www.saac.gov.cn/zt/2014-09/03/content_65320_2.htm',
    note: '台湾区受降负责人、澎湖守备队和10月25日台北受降仪式。',
  },
  taiwan: {
    title: '国务院台办、国务院新闻办 · 《台湾问题与新时代中国统一事业》',
    url: 'https://www.gwytb.gov.cn/m/headline/202208/t20220810_12459870.htm',
    note: '第一节关于1895年、1945年和1949年的沿革，以及中国政府对台湾地位的表述。',
  },
  diaoyu: {
    title: '国务院新闻办 · 《钓鱼岛是中国的固有领土》',
    url: 'https://newyork.china-consulate.gov.cn/jbwzlm/zt/3/201211/t20121106_5434835.htm',
    note: '第二、三节关于1895年日方窃占及战后安排。',
  },
  southChinaSea: {
    title: '外交部 · 南海仲裁案管辖权问题立场文件',
    url: 'https://www.mfa.gov.cn/web/wjb_673085/zzjg_673183/tyfls_674667/xwlb_674669/201412/t20141207_7670243.shtml',
    note: '第4段关于战后接收、1947年重新命名及1948年公开发行的官方地图。',
  },
  southChinaSeaCharts: {
    title: '中国南海研究院 · 南海历史地图、档案',
    url: 'https://www.nanhai.org.cn/images_c/6/4.html',
    note: '1947年岛礁命名公函、位置图及新旧名称对照表。',
  },
  huangyanNames: {
    title: '中国驻菲律宾大使馆 · 黄岩岛主权属于中国',
    url: 'https://ph.china-embassy.gov.cn/chn/zgxw/201206/t20120608_1221827.htm',
    note: '第一问第二项列出1935年、1947年及1983年公布的岛礁名称。',
  },
  taiping: {
    title: '外交部 · 1946年中国海军赴南沙群岛宣示主权',
    url: 'https://www.mfa.gov.cn/web/ziliao_674904/historytoday_674971/200312/t20031212_7949226.shtml',
    note: '1946年12月12日太平舰、中业舰前往南沙群岛的记录。',
  },
  cppcc: {
    title: '国家档案局 · 中国人民政治协商会议第一届全体会议档案',
    url: 'https://www.saac.gov.cn/daj/gqzt/05.html',
    note: '会议程序、会议记录及同一专辑中的组织法、国都决议和选举材料。',
  },
  commonProgram: {
    title: '国家档案局 · 《中国人民政治协商会议共同纲领》原件',
    url: 'https://www.saac.gov.cn/daj/gqzt/content/05/05_68.html',
    note: '1949年9月29日通过的文件原件。',
  },
  xinjiang: {
    title: '新疆维吾尔自治区人大常委会 · 新疆和平解放史料',
    url: 'https://www.xjpcsc.gov.cn/article/cf8e2d68dc274dd587fc868b63b27d76',
    note: '关于陶峙岳、包尔汉分别于9月25日、26日通电，以及解放军随后抵达新疆各地的记载。',
  },
  germany: {
    title: '德国联邦档案馆 · 1949年两次建国档案',
    url: 'https://www.bundesarchiv.de/themen-entdecken/online-entdecken/geschichtsgalerien/doppelte-staatsgruendung-1949/',
    note: '波恩宣布《基本法》、德国民主共和国成立及两德关系的档案图文。',
  },
  sinoSoviet: {
    title: '外交部 · 新中国外交历史回顾',
    url: 'https://www.mfa.gov.cn/web/ziliao_674904/wjs_674919/2159_674923/200011/t20001107_7950025.shtml',
    note: '新中国成立初期一节，记1950年2月14日莫斯科签署中苏条约、协定及两国换文。',
  },
  daliansAgreement: {
    title: '外交部条约数据库 · 关于中国长春铁路、旅顺口及大连的协定',
    url: 'https://treaty.mfa.gov.cn/tykfiles/20180718/1531876373704.pdf',
    note: '1950年2月14日协定正文，前三条记载铁路、旅顺口和大连安排。',
  },
  founding: {
    title: '国家档案局 · 从“五一口号”到开国大典',
    url: 'https://www.saac.gov.cn/daj/gqzt/06.html',
    note: '1949年10月1日中央人民政府公告相关文电及开国大典原始影像目录。',
  },
  hainan: {
    title: '海南省退役军人事务厅 · 五指山革命根据地纪念园',
    url: 'https://tyt.hainan.gov.cn/twjr/jnss1/202003/5aa5deed7757421d817abb77edb7ff88.shtml',
    note: '1949年10月海南的历史情形及1950年5月1日解放海南。',
  },
  hainanCrossing: {
    title: '琼海市人民政府 · 《琼东县城和嘉积市的解放》',
    url: 'https://qionghai.hainan.gov.cn/rdzt/qhtx/2142/202410/t20241014_3747838.html',
    note: '琼东地方党史节选，记海南渡海作战的筹备、琼崖纵队配合及主力登陆。',
  },
  changdu: {
    title: '西藏自治区人民政府 · 1950年昌都战役',
    url: 'https://www.xizang.gov.cn/xwzx_406/ztzl_416/gdzt/66zn/dsj/201901/t20190117_51822.html',
    note: '1950年10月在昌都的交战及次年签订和平解放西藏协议。',
  },
  tibet: {
    title: '国务院新闻办 · 《西藏和平解放与繁荣发展》',
    url: 'https://www.xinhuanet.com/2021-05/21/c_1127472252.htm',
    note: '西藏和平解放的历史背景及1951年《十七条协议》。',
  },
  hongKong: {
    title: '外交部条约数据库 · 《中英联合声明》',
    url: 'https://treaty.mfa.gov.cn/tykfiles/20180718/1531876578136.pdf',
    note: '第一、二项关于香港地区的范围和恢复行使主权的时间。',
  },
  hongKongSurrender: {
    title: '香港海关 · 《香港海关百年史》第四章',
    url: 'https://www.customs.gov.hk/hcms/filemanager/en/content_274/Customs_PDF_05_CH04.pdf',
    note: '书页186，1945年9月16日驻港日军投降以及英国恢复管治。',
  },
  macao: {
    title: '外交部 · 《中葡联合声明》',
    url: 'https://www.mfa.gov.cn/ziliao_674904/1179_674909/200306/t20030626_7946856.shtml',
    note: '第一、二项关于澳门地区归属和恢复行使主权前的管理。',
  },
} satisfies Record<string, Source>
