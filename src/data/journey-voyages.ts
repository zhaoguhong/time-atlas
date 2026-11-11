import type { JourneyNode, PersonJourney, Source } from '../types'

type Stop = Omit<JourneyNode, 'id'> & { key: string }

function journey(personId: string, introduction: string, stops: Stop[]): PersonJourney {
  return {
    personId,
    introduction,
    nodes: stops.map(({ key, ...stop }) => ({ id: `${personId}-record-${key}`, ...stop })),
  }
}

const cityNote = '坐标为所述城市或寺院所在区域的阅读参照，不表示当时建筑和港口的精确边界。'
const seaNote = '坐标为史料所述港湾的区域参照；记录之间的海上航线未作复原。'
const eastward = (note: string): Source => ({
  title: '《唐大和上东征传》',
  url: 'https://zh.wikisource.org/wiki/唐大和上東征傳',
  note,
})
const ganjinChronology: Source = {
  title: '扬州大明寺 · 鉴真年表',
  url: 'https://www.damingsi.com/jzview1.asp?id=9&lbid=4',
  note: '年表辅助核对东渡受阻和各地活动；与原典有不同的返程纪年处保留原典明确纪年，不据年表复述宗教传说。',
}
const arrivalYear: Source = {
  title: '外交部 · 外交史上的今天（鉴真754年抵日）',
  url: 'https://www.fmprc.gov.cn/ziliao_674904/historytoday_674971/200301/t20030123_9284495.shtml',
  note: '采用西历754年抵日；网页所列1月23日不作为秋妻屋浦登陆的精确日期。',
}
const japaneseCalendar: Source = {
  title: '日本国立天文台历计算室 · 754年历月与节月',
  url: 'https://eco.mtk.nao.ac.jp/cgi-bin/koyomi/caldb_s.cgi?year=754',
  note: '天平胜宝六年正月初一对应西历754年1月28日；原历年末与西历年界不同，不将原历十二月直接视为西历十二月。',
}
const toshodaiji: Source = {
  title: '唐招提寺 · 鉴真大和上',
  url: 'https://www.toshodaiji.jp/ganjin.html',
  note: '鉴真受邀、东渡及在东大寺和唐招提寺的活动；该页以天平胜宝五年标抵日年，本版另区分西历754年。',
}

const mingHistory = (note: string): Source => ({
  title: '《明史》卷304 · 郑和传',
  url: 'https://zh.wikisource.org/wiki/明史/卷304',
  note,
})
const liujiagang = (note: string): Source => ({
  title: '郑和等《娄东刘家港天妃宫石刻通番事迹记》',
  url: 'https://zh.wikisource.org/wiki/婁東劉家港天妃宮石刻通番事蹟記',
  note: `${note}原碑已佚，文本据《吴都文粹续集》卷28；碑文中的神助叙述不作为独立史实。`,
})
const voyageStudy: Source = {
  title: '邹振环《郑和下西洋与明朝的“麒麟外交”》',
  url: 'https://xbzs.ecnu.edu.cn/CN/html/2018-2-1.htm',
  note: '《华东师范大学学报（哲学社会科学版）》2018年第2期；第四次远航中1414年忽鲁谟斯、1415年苏门答剌及返朝的纪年，与碑文、传记对读。',
}

export const voyageJourneys: PersonJourney[] = [
  journey(
    'q714061',
    '鉴真的东渡由多次准备、受阻、海难和重新出发组成。漂至海南之后，他辗转返回江淮，再随遣唐使船赴日；抵达后，传戒、培养僧人和营建寺院又持续多年。荣睿、普照、思托等同行者的参与，使这段经历成为一群人跨海传承学问与制度的过程。',
    [
      {
        key: 'yangzhou-invitation',
        year: 742,
        location: '扬州大明寺',
        coordinates: [119.41, 32.42],
        kind: '居住',
        title: '在扬州接受赴日传戒的邀请',
        summary:
          '荣睿、普照来到大明寺邀请律学高僧赴日。正在讲律的鉴真同意前往，弟子中也有人表示愿意同行。',
        sources: [eastward('篇首天宝元年、扬州大明寺讲律及荣睿、普照来请段。'), toshodaiji],
        locationNote: cityNote,
      },
      {
        key: 'first-preparation',
        year: 743,
        location: '扬州',
        coordinates: [119.42, 32.39],
        kind: '居住',
        title: '首次造船准备被官府中止',
        summary:
          '僧众在扬州备船、备粮，同行者之间的争执引发告发。官府查问后将船没收，第一次准备没有成为实际出海。',
        sources: [eastward('天宝二载造舟、如海告发、船没官及僧众获释段。'), ganjinChronology],
        dateNote: '采用天宝二载；本节点为扬州的准备与受阻，不表示已抵达日本或海上某处。',
        locationNote: cityNote,
      },
      {
        key: 'ayuwang',
        year: 744,
        location: '明州阿育王寺 · 今宁波',
        coordinates: [121.76, 29.86],
        kind: '居住',
        title: '海难获救后住阿育王寺',
        summary:
          '再次出海后接连遇风损船，缺水缺粮，获救后由明州官府安置到阿育王寺。这里成为随后巡回讲律与筹划东渡的落脚点。',
        sources: [eastward('天宝二载十二月出海、船破获救及安置鄮山阿育王寺段。'), ganjinChronology],
        dateNote: '天宝二载十二月的出航已近西历年界；寺院年表将获救及入寺活动系于744年。',
        locationNote: cityNote,
      },
      {
        key: 'yuezhou',
        year: 744,
        location: '越州 · 今绍兴',
        coordinates: [120.58, 30.0],
        kind: '到访',
        title: '应邀到越州讲律授戒',
        summary:
          '越州龙兴寺邀请鉴真讲律授戒。此后杭州、湖州、宣州也相继邀请，传记记其巡游后又回到阿育王寺。',
        sources: [eastward('明确记天宝三载越州龙兴寺邀请及其后巡游、返回阿育王寺段。')],
        locationNote: '坐标仅定位越州州城一带，未据今同名寺院反推唐代龙兴寺精确地址。',
      },
      {
        key: 'guoqing',
        year: 744,
        location: '天台山国清寺',
        coordinates: [121.04, 29.31],
        kind: '到访',
        title: '南行途中到国清寺',
        summary:
          '为改从福建出海，鉴真一行离开明州，经宁海越岭到国清寺，随后继续南行。这次尝试后来遭官府追还。',
        sources: [
          eastward('遣法进到福州买舟，鉴真本人经宁海、始丰入国清寺及其后被追回段。'),
          ganjinChronology,
        ],
        dateNote: '沿天宝三载叙事顺序；福州是先遣人员买船地点，不据此列为鉴真本人到访。',
        locationNote: cityNote,
      },
      {
        key: 'fifth-departure',
        year: 748,
        location: '扬州',
        coordinates: [119.42, 32.39],
        kind: '出行',
        title: '重新备船，从扬州出发',
        summary:
          '荣睿、普照再来商议东渡。鉴真与同行者备办船只、粮食和物资，从崇福寺出发，经扬州新河登舟。',
        sources: [eastward('天宝七载春重议东渡、六月二十七日发自崇福寺段。')],
        dateNote: '六月二十七日保留原历法；与当年后来漂至振州分为不同节点。',
        locationNote: cityNote,
      },
      {
        key: 'zhenzhou',
        year: 748,
        location: '振州 · 今海南三亚地区',
        coordinates: [109.17, 18.35],
        kind: '居住',
        title: '风暴后到达海南振州',
        summary:
          '船只在风浪中偏离原定方向，最终抵达海南南部。当地官员迎入州城，鉴真等住大云寺，并参与修建佛殿。',
        sources: [
          eastward('天宝七载出海、十一月着岸、至振州江口与大云寺居住修殿段。'),
          ganjinChronology,
        ],
        dateNote: '原典记冬十一月；停居延续至下一年，未将留居时长化为确定的每日行程。',
        locationNote:
          '坐标采用今三亚崖州地区作为唐振州阅读参照；唐代振州与当时海南北部的崖州不同，不能因同名而混用。',
      },
      {
        key: 'shaoguan',
        year: 750,
        location: '韶州 · 今广东韶关',
        coordinates: [113.6, 24.81],
        kind: '到访',
        title: '北返途中在韶州与普照暂别',
        summary:
          '经广西、广州北返，在韶州寺院停留。普照从这里先往明州，鉴真继续北行；返程中，荣睿与弟子祥彦先后去世，同行者遭受重大损失。',
        sources: [eastward('广州之后到韶州禅居寺、法泉寺、开元寺及“是岁天宝九载也”段。')],
        dateNote:
          '采用原典此处明确的天宝九载750年；大明寺年表将离广州、到韶州列为751年，两者有异，保留说明。',
        locationNote: cityNote,
      },
      {
        key: 'sixth-invitation',
        year: 753,
        location: '扬州',
        coordinates: [119.42, 32.39],
        kind: '居住',
        title: '与归国的遣唐使商议同行',
        summary:
          '回到扬州后继续讲律。遣唐使归国前来拜访，再次邀请鉴真赴日；鉴真虽已失明，仍决定随船同行。',
        sources: [
          eastward('天宝十二载十月，遣唐使到扬州延光寺来请及随后离扬州段。'),
          ganjinChronology,
        ],
        locationNote: cityNote,
      },
      {
        key: 'huangsipu',
        year: 753,
        location: '黄泗浦 · 今江苏张家港地区',
        coordinates: [120.6, 31.95],
        kind: '出行',
        title: '在黄泗浦登遣唐使船',
        summary:
          '鉴真与弟子到黄泗浦集结，搭乘大伴古麻吕的船。遣唐使船队随后出海，几艘船在航行中的遭遇并不相同。',
        sources: [
          eastward('天宝十二载十月二十三日分舟、十一月大伴副使接入己舟及十五、十六日发船段。'),
          ganjinChronology,
        ],
        dateNote: '保留原典天宝十二载十一月的出航次序；不将原历十一月日期直接当作公历。',
        locationNote: seaNote,
      },
      {
        key: 'yakushima',
        year: 754,
        location: '益救岛 · 今日本屋久岛',
        coordinates: [130.5, 30.4],
        kind: '到访',
        title: '在屋久岛停泊后再航',
        summary:
          '鉴真所在的第二船在益救岛停泊，待到能够继续航行时才离开。此后遇到风雨，最终驶抵萨摩的港湾。',
        sources: [eastward('十二月七日至益救岛、十八日发、二十日抵秋妻屋浦段。'), japaneseCalendar],
        dateNote: '原历天平胜宝五年十二月的行程已跨入西历754年初；只按年定位，不换算精确西历日。',
        locationNote: '坐标为屋久岛北部港湾的区域参照，未确定该船的具体泊位。',
      },
      {
        key: 'akime',
        year: 754,
        location: '秋妻屋浦 · 今日本鹿儿岛县秋目',
        coordinates: [130.12, 31.36],
        kind: '到访',
        title: '在萨摩秋妻屋浦登陆',
        summary:
          '第六次东渡终于抵达日本。鉴真与同行僧人的工作由跨海旅行转向当地的传戒、学习与寺院生活。',
        sources: [
          eastward('十二月二十日第二舟着萨摩国阿多郡秋妻屋浦段。'),
          arrivalYear,
          japaneseCalendar,
        ],
        dateNote:
          '原典为天平胜宝五年十二月二十日，常依该原历年简称753年；西历已入754年，本节点采用754年。',
        locationNote: seaNote,
      },
      {
        key: 'dazaifu',
        year: 754,
        location: '太宰府 · 今日本福冈县太宰府',
        coordinates: [130.52, 33.51],
        kind: '到访',
        title: '由延庆引至太宰府',
        summary:
          '登陆后由僧人延庆引到太宰府，使团将鉴真抵达的消息报告朝廷，随后安排继续前往日本都城。',
        sources: [
          eastward('十二月二十六日延庆引入太宰府、次年正月大伴副使上奏段。'),
          arrivalYear,
          japaneseCalendar,
        ],
        dateNote: '原历天平胜宝五年十二月二十六日，对应西历754年初；不与秋妻屋浦登陆合成同一地点。',
        locationNote: cityNote,
      },
      {
        key: 'naniwa',
        year: 754,
        location: '难波 · 今日本大阪',
        coordinates: [135.5, 34.68],
        kind: '到访',
        title: '到难波，准备进入奈良',
        summary:
          '由九州继续东行，到难波后受到在日唐僧迎接，再经河内进入平城京。日本境内的接应与交通继续支持这次远行。',
        sources: [eastward('天平胜宝六年二月一日到难波、三日至河内、四日入京段。')],
        dateNote: '二月一日为原历法；这里只采用754年，不写成公历2月1日。',
        locationNote: cityNote,
      },
      {
        key: 'todaiji',
        year: 754,
        location: '奈良东大寺',
        coordinates: [135.84, 34.69],
        kind: '居住',
        title: '住东大寺并主持授戒',
        summary:
          '进入平城京后安置于东大寺，获准主持受戒传律。此后在大佛殿前设坛，为皇室及僧人授戒，帮助建立持续的戒律传承。',
        sources: [eastward('天平胜宝六年二月入京、安置东大寺及其年四月立戒坛段。'), toshodaiji],
        dateNote: '入寺与四月授戒是同年的不同活动；原历月日不作公历直译。',
        locationNote: cityNote,
      },
      {
        key: 'toshodaiji',
        year: 759,
        location: '奈良唐招提寺',
        coordinates: [135.78, 34.68],
        kind: '居住',
        title: '在唐招提寺延续传律工作',
        summary:
          '利用获赐园地营建寺院，立唐律招提之名。弟子在寺院和其他讲席讲授律学，使跨海带来的学问进入较稳定的学习生活。',
        sources: [eastward('宝字三年八月一日立唐律招提及弟子讲疏记段。'), toshodaiji],
        dateNote: '采用天平宝字三年759年；唐招提寺建立与754年抵日分开。',
        locationNote: cityNote,
      },
      {
        key: 'death',
        year: 763,
        location: '奈良唐招提寺',
        coordinates: [135.78, 34.68],
        kind: '逝世',
        title: '在唐招提寺去世',
        summary:
          '在日本生活和传戒多年后去世。弟子所作肖像、传记与延续的讲学，使这段跨海经历留有文字与实物记忆。',
        sources: [eastward('宝字七年弟子造影及五月六日去世段。'), toshodaiji],
        dateNote: '五月六日为天平宝字七年原历日期；不将其直接视为公历5月6日。',
        locationNote: cityNote,
      },
    ],
  ),
  journey(
    'zhenghe',
    '郑和组织的远航连接东南亚与印度洋，既有使节交涉和贸易，也有武装冲突。这里选取首次出航、旧港活动、忽鲁谟斯与苏门答剌之行，以及国内有碑刻支持的停留，读到第七次出洋前的长乐候风。船队分遣使者各有行程，郑和晚年去世的时间和地点也仍有争议。',
    [
      {
        key: 'first-liujiagang',
        year: 1405,
        location: '刘家港 · 今江苏太仓浏河',
        coordinates: [121.26, 31.5],
        kind: '出行',
        title: '从刘家港开始首次远航',
        summary:
          '奉命与王景弘等组织舟师，从刘家港南下福建，再由五虎门驶入海洋。数万人的船队需要造船、物资、通译和沿途港口共同支持。',
        sources: [
          mingHistory('永乐三年六月奉命，自苏州刘家河至福建、由五虎门扬帆段。'),
          liujiagang('碑记永乐三年首次统领舟师、五年回还。'),
        ],
        dateNote: '1405年是首次航行的通行起点；六月十五日是奉诏日期，不作为从港口开船的精确日期。',
        locationNote: seaNote,
      },
      {
        key: 'palembang',
        year: 1407,
        location: '旧港 · 今印度尼西亚巨港',
        coordinates: [104.76, -2.99],
        kind: '到访',
        title: '在旧港与陈祖义势力交战',
        summary:
          '到旧港后卷入当地海上势力冲突，郑和率军击败并擒获陈祖义。此次远航的交往也伴随军事强制和地方权力重组。',
        sources: [
          {
            title: '马欢《瀛涯胜览》· 旧港国',
            url: 'https://zh.wikisource.org/wiki/瀛涯勝覽',
            note: '旧港国条明确记永乐五年郑和统领宝船到此、施进卿告陈祖义及擒获。',
          },
          mingHistory('首次远航旧港交战、永乐五年返朝献俘段。'),
        ],
        locationNote: '坐标为巨港与穆西河港区的阅读参照，不表示交战或登陆的精确位置。',
      },
      {
        key: 'first-return',
        year: 1407,
        location: '南京',
        coordinates: [118.8, 32.06],
        kind: '到访',
        title: '首次远航后返回朝廷',
        summary:
          '带陈祖义等返回，沿途诸国的使者也随船来朝。远航所建立的联系，由港口交涉继续进入明朝的朝贡与赏赐制度。',
        sources: [mingHistory('永乐五年九月和等还、诸国使者随和朝见及献俘段。')],
        dateNote: '采用永乐五年返朝纪年；该时明朝京师在南京。',
        locationNote: cityNote,
      },
      {
        key: 'ceylon-captives',
        year: 1411,
        location: '南京',
        coordinates: [118.8, 32.06],
        kind: '到访',
        title: '锡兰冲突后返朝献俘',
        summary:
          '远航中与锡兰地方统治者发生武装冲突，郑和将所俘人员带回朝廷。史书与当地叙述对冲突的背景和王权关系并不完全一致。',
        sources: [
          mingHistory('永乐九年六月献锡兰俘于朝段。'),
          liujiagang('永乐七年起第三次出航、九年归献段。'),
        ],
        dateNote: '1411年明确定位返朝活动，不用返朝年反推锡兰战斗和登岸的确切日期。',
        locationNote: cityNote,
      },
      {
        key: 'hormuz',
        year: 1414,
        location: '忽鲁谟斯 · 今伊朗霍尔木兹岛',
        coordinates: [56.46, 27.09],
        kind: '到访',
        title: '第四次远航到忽鲁谟斯',
        summary:
          '率舟师抵达波斯湾入口的忽鲁谟斯，与当地统治者交涉并颁赐物品。这次远航使官方船队的活动进一步进入印度洋西部的贸易网络。',
        sources: [liujiagang('永乐十二年统领舟师往忽鲁谟斯等国段。'), voyageStudy],
        dateNote: '采用研究文献据第四次远航材料所列1414年；永乐十一年奉诏与随后实际航行分开。',
        locationNote:
          '坐标采用新忽鲁谟斯所在的霍尔木兹岛，不将其与伊朗大陆上的旧城遗址混为同一地点。',
      },
      {
        key: 'samudra',
        year: 1415,
        location: '苏门答剌 · 今印度尼西亚亚齐北部',
        coordinates: [97.21, 5.12],
        kind: '到访',
        title: '返航经苏门答剌并介入冲突',
        summary:
          '返航时介入苏门答剌的权力争斗，与苏干剌一方交战并将其擒获。船队的外交活动与武力介入在这里相互交织。',
        sources: [
          mingHistory('郑和至苏门答剌、与苏干剌交战并追擒段。'),
          liujiagang('永乐十二年出航、十三年归献苏干剌段。'),
          voyageStudy,
        ],
        dateNote: '采用研究文献所列1415年返航阶段；不把国家范围或追击所及地区都画为本人足迹。',
        locationNote:
          '坐标采用北亚齐Samudera一带，为古苏门答剌国区域参照，不表示整座苏门答腊岛的中心。',
      },
      {
        key: 'fourth-return',
        year: 1415,
        location: '南京',
        coordinates: [118.8, 32.06],
        kind: '到访',
        title: '第四次远航后返朝',
        summary:
          '带俘虏和远航所得返回，朝廷赏赐将士。不同地区的使者、物产与海上冲突，由此一同进入朝廷对远航的记录。',
        sources: [mingHistory('永乐十三年七月还朝、赏赐将士段。'), voyageStudy],
        dateNote: '七月保留原历法；以返朝明确纪年收束此次航行。',
        locationNote: cityNote,
      },
      {
        key: 'quanzhou',
        year: 1417,
        location: '泉州灵山圣墓',
        coordinates: [118.64, 24.92],
        kind: '到访',
        title: '在泉州行香祈求航行平安',
        summary:
          '又一次出海前，郑和到灵山圣墓行香。随员留下记事碑，直接保存这次本人停留的日期与活动。',
        sources: [
          {
            title: '泉州市人民政府 · 伊斯兰教圣墓（郑和行香碑）',
            url: 'https://www.quanzhou.gov.cn/lyb/lytj/rmjdtj/202202/t20220224_2699971.htm',
            note: '说明永乐十五年郑和第五次下西洋途经泉州、本人到圣墓行香所留石碑。',
          },
          {
            title: '泉州市人民政府 · 石湖码头（附郑和行香碑文）',
            url: 'https://www.quanzhou.gov.cn/lyb/lyxw/202107/t20210712_2586392.htm',
            note: '引碑文永乐十五年五月十六日到此行香；采用本人活动，不将当地所有三宝传说转成节点。',
          },
        ],
        dateNote: '永乐十五年五月十六日为原历日期；不将原历五月直接写成公历五月。',
        locationNote: cityNote,
      },
      {
        key: 'nanjing-guard',
        year: 1425,
        location: '南京',
        coordinates: [118.8, 32.06],
        kind: '任职',
        title: '在南京承担守备工作',
        summary:
          '仁宗时远航项目暂停，郑和与下番军士承担南京守备。两次大规模出洋之间，他也参与国内的军务和组织工作。',
        sources: [mingHistory('洪熙元年二月命郑和以下番诸军守备南京段。')],
        dateNote: '本条依在南京领下番军守备的明确记述，不扩展为其辖区内各地的到访记录。',
        locationNote: cityNote,
      },
      {
        key: 'last-longwan',
        year: 1431,
        location: '南京龙江一带',
        coordinates: [118.74, 32.09],
        kind: '出行',
        title: '从南京起行，筹备最后一次远航',
        summary:
          '恢复远航后，从南京龙湾开船，沿江前往太仓集结。奉诏、国内调集与真正出海是先后不同的阶段。',
        sources: [
          {
            title: '祝允明《前闻记》· 下西洋',
            url: 'https://zh.wikisource.org/wiki/前聞記',
            note: '下西洋条起首宣德五年闰十二月六日龙湾开船，随后到徐山、刘家港；不将该船队整份日程直接视为郑和独立行程。',
          },
          {
            title: '中国社会科学院 · 郑和下西洋七至满剌加',
            url: 'https://www.cass.cn/xueshuchengguo/xscg_lsyjy/201912/t20191202_5051930.shtml',
            note: '区分奉诏与出航，指出宣德五年闰十二月开船实际已是1431年初。',
          },
        ],
        dateNote: '宣德五年闰十二月六日已入西历1431年；不误作1430年公历出航。',
        locationNote: seaNote,
      },
      {
        key: 'last-liujiagang',
        year: 1431,
        location: '刘家港 · 今江苏太仓浏河',
        coordinates: [121.26, 31.5],
        kind: '居住',
        title: '在刘家港驻船并立碑',
        summary:
          '郑和等在刘家港泊船，修整天妃行宫并立碑回顾历次远航。碑文留下出航、返回和对外冲突的自述，也记录了船队的祭祀活动。',
        sources: [liujiagang('宣德六年春朔立碑，记宣德五年冬奉使后泊舟祠下。')],
        dateNote: '采用碑首宣德六年春朔1431年；同年先刘家港、后长乐，按文献顺序排列。',
        locationNote: seaNote,
      },
      {
        key: 'last-changle',
        year: 1431,
        location: '长乐太平港 · 今福建福州长乐',
        coordinates: [119.52, 25.96],
        kind: '居住',
        title: '在长乐候风，立碑记述远航',
        summary:
          '郑和等在长乐驻船候风，修建祠宇并留下《天妃灵应之记》。长时间的准备、补给与等待季风，是组织远航的重要部分。',
        sources: [
          {
            title: '郑和等《天妃之神灵应记》',
            url: 'https://zh.wikisource.org/wiki/天妃之神靈應記',
            note: '宣德六年仲冬立碑，末段记舟师驻船兹港、等候朔风开洋；不将碑中船队所历诸国一一当作郑和本人到访。',
          },
          {
            title: '上海交通大学董浩云航运博物馆 ·《天妃灵应之记》碑',
            url: 'https://maritimemuseum.sjtu.edu.cn/info/1161/5931.htm',
            note: '碑立于1431年第七次下西洋出发前，详记长乐活动与历次远航。',
          },
        ],
        dateNote:
          '取宣德六年仲冬有碑文支持的驻港活动；末次远航后期及去世年地的争议不在此补成确定节点。',
        locationNote: seaNote,
      },
    ],
  ),
]
