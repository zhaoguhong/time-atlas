import type { Person, Source } from '../types'
const text = (book: string, volume: string): Source => ({
  title: `《${book}》${volume ? `卷${volume.replace(/^0+/, '')}` : ''}`,
  url: `https://zh.wikisource.org/wiki/${book}${volume ? `/卷${volume}` : ''}`,
  note: '古籍传记参考；以下简介为现代中文整理。',
})
const su: Source = {
  title: '平顶山学院 · 苏轼年谱简编',
  url: 'https://fns.pdsu.edu.cn/info/1062/1655.htm',
}
// Rich introductions for the first learning paths. Other imported people are
// explicitly basic identity records; a biography is not fabricated from dates.
export const personEnrichment: Record<string, Partial<Person>> = {
  sushi: {
    courtesy: '子瞻',
    role: '北宋文学家、书画家',
    recordKind: 'curated',
    summary:
      '苏轼，号东坡居士，诗、词、散文、书画皆有影响。仕途与贬居经历横跨中原、江南、岭南和海南。',
    biography:
      '苏轼出生于眉山，是苏洵之子、苏辙之兄，合称“三苏”。他既参与宋代士大夫的政治讨论，也在杭州、密州、徐州等地任职。乌台诗案后贬居黄州，留下赤壁赋等名篇；晚年又先后贬居惠州、儋州，北归途中病逝常州。人生中的相遇、治水、流放与创作，可以结合年谱和地点一起阅读。',
    sources: [su, text('宋史', '338')],
  },
  libai: {
    courtesy: '太白',
    role: '唐代诗人',
    recordKind: 'curated',
    biography:
      '李白，号青莲居士，是唐代重要诗人。青年离开蜀地后广泛游历，一度进入长安供奉翰林。他的诗歌以想象力、鲜明的个性和富于变化的语言著称。安史之乱中卷入永王事件，后获赦，晚年在当涂去世。作品中的地点可以帮助理解经历，但诗中地名不能一律当作亲访记录。',
    sources: [text('舊唐書', '190下')],
  },
  liqingzhao: {
    role: '宋代词人',
    recordKind: 'curated',
    biography:
      '李清照是宋代重要词人，与赵明诚共同从事金石收藏和研究。北宋覆亡后南渡，经历离乱、丧偶及藏品散失。早期作品常写日常情思，后期作品多呈现身世与时代的沉重。其确切晚年纪年有争议，本版不凭推测填写精确行程。',
    sources: [text('金石錄後序', '')],
  },
  confucius: {
    courtesy: '仲尼',
    role: '春秋思想家、教育家',
    recordKind: 'curated',
    biography:
      '孔子是鲁国思想家、教育家，关注礼、仁与政治秩序。他曾在鲁国任职并游历列国，晚年教学；后学整理的《论语》记录其言行，对中国和东亚的思想与教育产生长久影响。他生活在本地图导航范围之前，档案可检索，地图不把战国疆域当作孔子时代。',
    sources: [text('史記', '047')],
  },
  mengzi: {
    courtesy: '子舆',
    role: '战国思想家',
    recordKind: 'curated',
    biography:
      '孟子是战国时期儒家思想的重要代表。他讨论仁政、民本与人性，曾游说诸侯，希望将自己的政治理念付诸实践。《孟子》保留其与君主、门人讨论的内容。生卒纪年有不同说法，应区别传世记载与后人的考定。',
    sources: [text('史記', '074')],
  },
  mozi: {
    role: '春秋战国之际思想家',
    recordKind: 'curated',
    summary: '墨家代表人物，讨论兼爱、非攻与社会治理；个人生卒和行迹纪年仍有限。',
    biography:
      '墨子名翟，墨家学派的代表人物。墨家讨论兼爱、非攻、尚贤、节用，也重视守城技术和知识论。有关墨子个人的可靠行迹和生卒纪年较少，不以后世故事补成精确路线。',
    sources: [
      text('史記', '074'),
      {
        title: '《墨子》· 公输',
        url: 'https://zh.wikisource.org/wiki/墨子/公輸',
        note: '用于阅读止楚攻宋与模拟攻守的叙事；篇中没有可独立核定的绝对纪年。',
      },
    ],
  },
  wangxizhi: {
    courtesy: '逸少',
    role: '东晋书法家',
    recordKind: 'curated',
    biography:
      '王羲之是东晋书法家，曾任右军将军、会稽内史。其书法在后世形成广泛影响，《兰亭集序》与永和九年的兰亭雅集密切相关。学习时可以把士族文化、江南生活和书法作品放在同一时代中观察。',
    sources: [text('晉書', '080')],
  },
  taoyuanming: {
    courtesy: '元亮',
    role: '东晋至刘宋诗人',
    recordKind: 'curated',
    biography:
      '陶渊明，又名陶潜，曾短暂任官，后归居乡里。他的田园诗、辞赋与《桃花源记》以不同方式讨论日常生活、政治与理想。其生平与东晋末年的社会变化相连，具体生年存在考证分歧。',
    sources: [text('宋書', '093')],
  },
  xinqiji: {
    courtesy: '幼安',
    role: '南宋词人、抗金官员',
    recordKind: 'curated',
    biography:
      '辛弃疾出生于济南，青年参加北方抗金活动，后来归宋，历任地方官。他关心恢复北方，也在失意退居时持续创作。其词作题材广阔，既有战争与家国，也有乡村、友情和日常生活。',
    sources: [text('宋史', '401')],
  },
  simaguang: {
    courtesy: '君实',
    role: '北宋史学家、政治人物',
    recordKind: 'curated',
    biography:
      '司马光是北宋官员、史学家，主持编修编年体史书《资治通鉴》。他与王安石对政治改革有不同主张。编书活动与宋代政治讨论共同构成其生平的重要部分。',
    sources: [text('宋史', '336')],
  },
  ouyangxiu: {
    courtesy: '永叔',
    role: '北宋文学家、史学家',
    recordKind: 'curated',
    biography:
      '欧阳修，号醉翁，晚号六一居士，是北宋文学与史学的重要人物。他倡导古文写作，参与政治改革，提携苏轼等后辈，并编撰《新五代史》。地方任职、士人交往与文字创作相互联系。',
    sources: [text('宋史', '319')],
  },
  zhuxi: {
    courtesy: '元晦',
    role: '南宋思想家、教育家',
    recordKind: 'curated',
    biography:
      '朱熹整理儒家经典、参与思想论争和地方教育，其《四书章句集注》在后世科举与教育中地位突出。他的学术活动与讲学地点、书院及师友网络相连，人物地图可进一步用经过核对的年谱扩充。',
    sources: [text('宋史', '429')],
  },
  xuxiake: {
    role: '明代旅行家、地理观察者',
    recordKind: 'curated',
    biography:
      '徐霞客名弘祖，号霞客，长期旅行并记录山川、洞穴与地方见闻。《徐霞客游记》提供细致的日期和地点材料，是以后扩充人物行迹的重要原典。旅行记录不能直接变成现代道路导航路线。',
    sources: [{ title: '《徐霞客游记》', url: 'https://zh.wikisource.org/wiki/徐霞客遊記' }],
  },
  wangyangming: {
    courtesy: '伯安',
    role: '明代思想家、官员',
    recordKind: 'curated',
    biography:
      '王守仁，世称王阳明，是明代思想家，也曾参与地方治理与军事行动。其思想讨论知行合一、致良知，在中国和东亚产生影响。龙场贬居、讲学和任职等经历需要分别以年谱与原典确定地点。',
    sources: [text('明史', '195')],
  },
  zhengchenggong: {
    role: '明清之际军事人物',
    recordKind: 'curated',
    biography:
      '郑成功原名森，福建南安人，父亲为郑芝龙。明清更替中依托东南沿海与海上网络抗清，1661年率军进入台湾，1662年荷兰方面投降。他在台湾的活动需要和后来郑经、郑克塽及施琅的经历区分。',
    sources: [
      {
        title: '故宫博物院 · 康熙时期年表',
        url: 'https://www.dpm.org.cn/court/lineage/226256.html',
      },
      text('清史稿', '224'),
    ],
  },
}
