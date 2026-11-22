import type { HistoryEvent } from '../types'

export const modernEraCoverageEvents: HistoryEvent[] = [
  {
    id: 'modern-samoa-occupation-1914',
    year: 1914,
    dateLabel: '1914年8月29日',
    title: '新西兰占领德属萨摩亚',
    category: '战争',
    region: 'oceania',
    location: '德属萨摩亚阿皮亚',
    coordinates: [-171.75, -13.83],
    people: [],
    importance: 4,
    summary: '第一次世界大战初期，新西兰远征军在阿皮亚登陆，接管德国在萨摩亚的殖民统治中心。',
    background: '英国要求新西兰夺取阿皮亚附近的无线电台，以中断德军在太平洋的通信。',
    impact: '新西兰先以军事当局管治当地，1920年又取得国际联盟授予的委任统治权。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1914年8月，英国向德国宣战后，请新西兰夺取阿皮亚附近的无线电台。德国东亚舰队的活动范围远及太平洋，这处电台是它与外界联络的节点之一。8月29日，新西兰远征军在阿皮亚登陆，未遇到武装抵抗便占领当地。',
            '军事占领延续到战后。1920年，国际联盟把西萨摩亚交给新西兰委任统治。萨摩亚人随后在当地组织争取自治和独立，阿皮亚也成为他们与殖民当局交涉的地方。',
          ],
        },
      ],
    },
    relatedEvents: [
      {
        id: 'modern-samoa-black-saturday-1929',
        label: '委任统治下的萨摩亚独立运动',
        note: '阿皮亚的独立示威在1929年遭到殖民警察开枪镇压。',
      },
    ],
    sources: [
      {
        title: '新西兰文化与遗产部 NZ History · 萨摩亚的邮政与电报分队',
        url: 'https://nzhistory.govt.nz/media/photo/postal-service-samoa',
        note: '说明无线电台的作用及新西兰军队登陆阿皮亚的日期。',
      },
      {
        title: '新西兰蒂帕帕国家博物馆 · 德属萨摩亚被新西兰军队占领',
        url: 'https://blog.tepapa.govt.nz/2014/08/29/german-samoa-captured-by-new-zealand-troops-august-1914/',
        note: '用馆藏资料说明1914年8月新西兰远征军的登陆与接管。',
      },
    ],
  },
  {
    id: 'modern-bukhara-republic-1920',
    year: 1920,
    dateLabel: '1920年10月8日',
    title: '布哈拉人民苏维埃共和国成立',
    aliases: ['布哈拉埃米尔国覆亡', '青年布哈拉派'],
    category: '政治',
    region: 'central-asia',
    location: '布哈拉近郊锡托赖莫希霍萨宫',
    coordinates: [64.45, 39.82],
    people: [],
    importance: 4,
    summary: '红军与青年布哈拉派进入布哈拉后，代表大会宣布成立布哈拉人民苏维埃共和国。',
    background: '青年布哈拉派早先主张改革埃米尔国，后来在苏俄支持下争取改变当地政权。',
    impact: '布哈拉改由新建的共和国机构治理。1924年中亚重新划界时，这一共和国的辖区被重新分配。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1920年9月2日，苏俄红军和青年布哈拉派进入布哈拉。埃米尔先向东撤走，后来逃往阿富汗。10月6日至8日，各地代表在布哈拉近郊的旧王宫集会，宣布建立布哈拉人民苏维埃共和国。',
            '新政府接管原有的政务，1921年第二次代表大会通过宪法。1924年苏联按民族共和国重新划分中亚行政区，布哈拉原辖区被划入新成立的共和国和自治地区。布哈拉城划入乌兹别克苏维埃社会主义共和国。',
          ],
        },
      ],
    },
    relatedEvents: [
      {
        id: 'central-asia-national-delimitation',
        label: '中亚如何重新划界',
        note: '1924年的建制调整改变了布哈拉和周边地区的归属。',
      },
    ],
    sources: [
      {
        title: '布哈拉国立大学博物馆 · 布哈拉人民苏维埃共和国展厅',
        url: 'https://buxdu.uz/ru/166-muzey/8153/8153-ya-xoll-6-ekspozitsiya-respublika-buxarskaya-narodnie-soveti/',
        note: '列出1920年9月布哈拉被占领、10月代表大会及1921年通过宪法的日期。',
      },
    ],
  },
  {
    id: 'modern-samoa-black-saturday-1929',
    year: 1929,
    dateLabel: '1929年12月28日',
    title: '阿皮亚的萨摩亚独立示威遭到镇压',
    aliases: ['萨摩亚黑色星期六', '毛乌运动', 'Mau'],
    category: '社会',
    region: 'oceania',
    location: '西萨摩亚阿皮亚',
    coordinates: [-171.75, -13.83],
    people: [],
    importance: 4,
    summary:
      '新西兰殖民警察向毛乌运动的示威人群开枪，萨摩亚独立运动领袖图普阿·塔马塞塞·莱阿洛菲三世遇难。',
    background:
      '西萨摩亚处于新西兰委任统治下。殖民当局的行政措施及其处理1918年流感疫情的方式引发广泛不满。',
    impact: '参与示威的萨摩亚人受到进一步追捕。2002年，新西兰总理就早期管治中的不当行为正式道歉。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '毛乌运动在萨摩亚组织抵制与和平示威，争取萨摩亚人自己管理地方事务。1929年12月28日，示威者走过首府阿皮亚，警察试图逮捕一名运动领导者，随后开枪。独立运动领袖塔马塞塞·莱阿洛菲三世在镇压中受伤身亡。',
            '许多毛乌支持者暂时躲进内陆。西萨摩亚直到1962年才取得独立，这一天后来仍被当地称作“黑色星期六”。',
          ],
        },
      ],
    },
    relatedEvents: [
      {
        id: 'region-samoa-independence',
        label: '西萨摩亚取得独立',
        note: '在长期独立运动与托管体制的过渡后，西萨摩亚于1962年独立。',
      },
    ],
    sources: [
      {
        title: '新西兰文化与遗产部 NZ History · 萨摩亚的“黑色星期六”',
        url: 'https://nzhistory.govt.nz/black-saturday-nz-police-open-fire-on-mau-protestors-in-apia-nine-samoans-killed',
        note: '委任统治背景、1929年12月28日的示威经过及后来的正式道歉。',
      },
      {
        title: '新西兰国家档案馆 · 萨摩亚毛乌运动与殖民统治的结束',
        url: 'https://www.archives.govt.nz/discover-our-stories/the-rise-of-the-mau-and-the-fall-of-colonial-rule-in-samoa',
        note: '汇集毛乌运动、1929年示威与后续独立进程的馆藏资料。',
      },
    ],
  },
  {
    id: 'modern-central-asian-union-republics-1936',
    year: 1936,
    dateLabel: '1936年12月5日',
    title: '哈萨克与吉尔吉斯升为苏联加盟共和国',
    aliases: ['苏联1936年宪法', '吉尔吉斯苏维埃社会主义共和国'],
    category: '政治',
    region: 'central-asia',
    location: '哈萨克与吉尔吉斯地区',
    coordinates: [76.95, 43.24],
    locationNote: '以当时哈萨克共和国首府阿拉木图为代表点，宪法在莫斯科通过。',
    people: [],
    importance: 4,
    summary:
      '苏联新宪法将哈萨克和吉尔吉斯列为加盟共和国，两者此前是俄罗斯苏维埃联邦社会主义共和国下的自治共和国。',
    background: '1920年代重新划界后，中亚各地按照不同的行政层级纳入苏联体制。',
    impact:
      '哈萨克和吉尔吉斯在苏联体制中的行政层级提高。两地此后维持加盟共和国建制，直至1991年独立。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1936年12月5日，苏联第八次非常苏维埃代表大会通过新宪法。第十三条把哈萨克和吉尔吉斯列在加盟共和国名录中。两者原为俄罗斯苏维埃联邦社会主义共和国下的自治共和国，自此改为直接组成苏联的共和国。',
            '宪法所列的建制变化发生在苏联内部。哈萨克和吉尔吉斯后来各自建立加盟共和国宪法和政府机构，到1991年才成为独立国家。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '苏联第八次非常苏维埃代表大会 · 1936年《苏联宪法》',
        url: 'https://www.marxists.org/history/ussr/government/constitution/1936/1936-constitution.pdf',
        note: '宪法原文英译及通过决议的影印本，见第十三条的加盟共和国名录。',
      },
    ],
  },
  {
    id: 'modern-dunkirk-evacuation-1940',
    year: 1940,
    dateLabel: '1940年5月26日—6月4日',
    title: '敦刻尔克撤退',
    aliases: ['发电机行动', 'Operation Dynamo'],
    category: '战争',
    region: 'europe',
    location: '法国敦刻尔克港及附近海滩',
    coordinates: [2.38, 51.05],
    people: [],
    importance: 5,
    summary:
      '德军推进到英吉利海峡后，英军组织多种船只，将约33.8万名英军和盟军人员从敦刻尔克撤往英国。',
    background: '1940年5月德军向法国北部推进，切断了部分盟军部队与法军主力的陆上联系。',
    impact: '英国保住了大批受过训练的军人。法国战事仍在继续，撤出的部队也丢失了大量重装备。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1940年5月，德军先抵达英吉利海峡沿岸，把在法国北部和比利时作战的一部分盟军压向敦刻尔克。5月26日，英国启动海上撤运。军舰、商船和小型船只参加行动，士兵从港口和附近海滩分批登船。',
            '到6月4日，约33.8万名英军和盟军人员撤到了英国。撤运保存了大量人员，但重装备很难带走。德军随后继续南进，法国在6月下旬签署停战协定。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '英国帝国战争博物馆 · 敦刻尔克撤退资料',
        url: 'https://www.iwm.org.uk/sites/default/files/press-release/dunkirk_film_2017_fact_sheet_and_iwm_resources_available.pdf',
        note: '馆方整理的撤运起止日、参加船只及撤出人数。',
      },
      {
        title: '英国帝国战争博物馆战争纪念物登记册 · 发电机行动纪念碑',
        url: 'https://memorials.iwm.org.uk/memorial/100768',
        note: '收录刻有撤运日期和人数的纪念碑铭文。',
      },
    ],
  },
  {
    id: 'modern-hundred-regiments-offensive-1940',
    year: 1940,
    endYear: 1941,
    dateLabel: '1940年8月20日—1941年1月',
    dateNote: '以大规模破袭发动为起点，时段包括1941年初的反“扫荡”。',
    title: '百团大战',
    category: '战争',
    region: 'china',
    location: '华北正太铁路沿线等地',
    coordinates: [113.58, 37.86],
    locationNote: '以今山西阳泉、正太铁路沿线为代表点。战事涉及华北多地。',
    people: [],
    importance: 5,
    summary: '八路军在华北发动百团大战，首先对正太铁路等日军交通线展开大规模破袭。',
    background: '侵华日军沿铁路和公路设置据点，试图切断华北抗日根据地之间的交通。',
    impact: '部分交通线和据点遭到破坏，日军随后扩大报复性“扫荡”，华北根据地与民众承受新的损失。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1939年以来，侵华日军利用铁路、公路和据点分割华北抗日根据地。1940年8月20日晚，八路军对正太铁路等交通线发动破袭。正太铁路连接石家庄与太原，是日军横贯太行山调动人员和物资的一条干线。',
            '最初的交通破袭后，作战转向部分据点。日军随后对根据地展开报复性“扫荡”，八路军与地方武装又转入反“扫荡”作战。分段记录从1940年夏延续至1941年初。',
          ],
        },
      ],
    },
    relatedEvents: [
      {
        id: 'modern-china-war',
        label: '百团大战所处的中国战场',
        note: '从1937年全面抗战爆发看正面战场和敌后根据地的变化。',
      },
    ],
    sources: [
      {
        title: '中央纪委监察部网站 · 百团大战',
        url: 'https://m.ccdi.gov.cn/content/bf/ed/5404.html',
        note: '记述战役的发动、正太铁路破袭和后续反“扫荡”。',
      },
      {
        title: '西藏自治区国防动员办公室 · 百团大战',
        url: 'https://drc.xizang.gov.cn/gfdy/gfdy_zzzl/202401/t20240112_398368.html',
        note: '涵盖1940年8月至1941年1月的战事时段。',
      },
    ],
  },
  {
    id: 'modern-singapore-surrender-1942',
    year: 1942,
    dateLabel: '1942年2月15日',
    title: '英军在新加坡向日军投降',
    aliases: ['新加坡陷落', '福特汽车厂投降'],
    category: '战争',
    region: 'southeast-asia',
    location: '新加坡武吉知马旧福特汽车厂',
    coordinates: [103.769, 1.352],
    people: [],
    importance: 5,
    summary: '英军指挥官珀西瓦尔在福特汽车厂签署投降文件，新加坡进入日军占领时期。',
    background: '日军沿马来半岛推进，渡过柔佛海峡并攻入新加坡岛；英军守备范围随之缩小。',
    impact: '新加坡到1945年才结束日军占领，居民在占领期间遭受资源短缺及清洗、拘禁等暴力。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1942年2月，日军从马来半岛渡过柔佛海峡，攻入新加坡岛。15日下午，英军指挥官珀西瓦尔到武吉知马的福特汽车厂，与日军第二十五军司令官山下奉文交涉，当晚签署投降文件。',
            '汽车厂在投降前已被日军用作临时司令部。投降以后，新加坡进入日军占领时期。当地居民面对粮食短缺和严格的管制，日军也对华人展开了“肃清”搜捕和屠杀。旧厂房如今保存着与投降、占领及战后记忆有关的档案。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '新加坡国家档案馆 · 旧福特汽车厂常设展',
        url: 'https://corporate.nas.gov.sg/former-ford-factory/overview/',
        note: '以旧址和馆藏记录说明英国投降及占领下的居民生活。',
      },
      {
        title: '新加坡国家图书馆 BiblioAsia · 签署新加坡投降文件的代表',
        url: 'https://biblioasia.nlb.gov.sg/all-sections/vol-20-issue-2-jul-sep-2024-men-surrender-singapore-japanese-occupation/',
        note: '记述1942年2月15日会谈的地点、参加者及签署经过。',
      },
    ],
  },
  {
    id: 'modern-darwin-air-raids-1942',
    year: 1942,
    dateLabel: '1942年2月19日',
    title: '日军首次空袭达尔文',
    aliases: ['达尔文空袭'],
    category: '战争',
    region: 'oceania',
    location: '澳大利亚达尔文港',
    coordinates: [130.84, -12.47],
    people: [],
    importance: 4,
    summary: '日军在同一天两次空袭澳大利亚北部达尔文，港口船只、城镇和机场均受波及。',
    background: '太平洋战争扩大后，达尔文港是盟军向东南亚调运物资和人员的据点。',
    impact:
      '港口与航空设施都受到损毁，多名居民、船员和军人遇难。战争期间，达尔文及澳大利亚北部继续遭遇空袭。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1942年2月19日上午，日军飞机轰炸达尔文港及城内设施，港内多艘船只受损或沉没。当天第二轮空袭袭击了达尔文附近的空军基地。新加坡数日前陷落，战火随即波及服务东南亚航线的澳大利亚北部港口。',
            '遇难者包括船员、军人和当地居民。此后达尔文又遭到多次空袭，军事设施与城镇生活都面对持续的战时压力。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '澳大利亚战争纪念馆 · 达尔文空袭',
        url: 'https://www.awm.gov.au/articles/encyclopedia/air_raids/darwin',
        note: '介绍1942年2月19日两轮空袭及之后的袭击。',
      },
    ],
  },
  {
    id: 'modern-manchester-pan-african-congress-1945',
    year: 1945,
    dateLabel: '1945年10月15—21日',
    title: '第五次泛非大会在曼彻斯特召开',
    aliases: ['1945年泛非大会', '曼彻斯特泛非大会'],
    category: '政治',
    region: 'africa',
    location: '英国曼彻斯特乔尔顿市政厅',
    coordinates: [-2.238, 53.47],
    locationNote: '会场在英国，按大会所讨论的非洲殖民统治与独立问题收入非洲史。',
    people: ['region-person-nkrumah'],
    importance: 4,
    summary: '来自非洲及非洲侨民社群的代表在曼彻斯特集会，讨论殖民地自治、工人组织和独立。',
    background:
      '第二次世界大战结束后，殖民地的民族运动和工会组织借泛非大会交换经验并提出政治诉求。',
    impact: '大会建立和加强跨地区联系。一批与会者随后在非洲各地的独立运动中承担组织工作。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1945年10月，乔治·帕德莫尔、夸梅·恩克鲁玛等人在曼彻斯特组织第五次泛非大会。与会者有来自非洲殖民地和海外社群的活动者、工会代表和学者。会上讨论自治、种族歧视与工人的处境，并要求殖民地居民能够自己决定政务。',
            '与会者返回各地后继续开展政治组织工作。恩克鲁玛后来在英属黄金海岸参与独立运动，兼具工会、政党与跨国联络的泛非网络也在多个殖民地延续。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '曼彻斯特大学 · 第五次泛非大会和非洲独立运动',
        url: 'https://www.manchester.ac.uk/about/news/manchesters-role-in-the-african-independence-movement/',
        note: '根据馆藏及校方纪念项目介绍大会、参加者和历史背景。',
      },
      {
        title: '曼彻斯特大学图书馆 · Ahmed Iqbal Ullah 种族研究中心档案',
        url: 'https://www.library.manchester.ac.uk/aiu-race-centre/collections/archives/',
        note: '提供泛非大会及其纪念活动的馆藏入口。',
      },
    ],
  },
  {
    id: 'modern-transjordan-independence-1946',
    year: 1946,
    dateLabel: '1946年5月25日',
    title: '外约旦宣布独立',
    aliases: ['约旦独立', '外约旦哈希姆王国'],
    category: '政治',
    region: 'west-asia',
    location: '外约旦安曼',
    coordinates: [35.93, 31.95],
    people: [],
    importance: 4,
    summary: '外约旦结束英国委任统治，宣布建立独立的哈希姆王国，阿卜杜拉一世成为国王。',
    background: '第一次世界大战后，英国在外约旦建立委任统治。阿卜杜拉自1921年起主持地方政务。',
    impact: '外约旦政府取得独立国家地位。王国的名称在之后的政局变化中改为约旦哈希姆王国。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1946年5月25日，外约旦宣布独立，统治当地二十余年的阿卜杜拉由埃米尔成为国王。英国政府已与外约旦缔结新条约，独立宣告结束了委任统治时期。这个国家起初沿用“外约旦”的名称，后来定名为约旦哈希姆王国。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '约旦王室 · 阿卜杜拉一世',
        url: 'https://rhc.jo/en/king-abdullah-bin-al-hussein-1882-1951',
        note: '记载外约旦建制、1946年5月25日独立和阿卜杜拉一世成为国王。',
      },
    ],
  },
  {
    id: 'modern-philippines-sovereignty-1946',
    year: 1946,
    dateLabel: '1946年7月4日',
    title: '美国承认菲律宾独立',
    aliases: ['菲律宾第三共和国', '美菲一般关系条约', '马尼拉条约'],
    category: '政治',
    region: 'southeast-asia',
    location: '菲律宾马尼拉',
    coordinates: [120.98, 14.59],
    people: [],
    importance: 5,
    summary:
      '美国宣布承认菲律宾为独立国家，菲律宾共和国开始运作。两国同日在马尼拉签署一般关系条约。',
    background:
      '菲律宾人在1898年已宣布脱离西班牙。美西战争后群岛转入美国统治，1935年建立过渡性质的菲律宾自治邦。',
    impact:
      '菲律宾取得独立国家地位，并着手重建战后经济与政府。菲律宾后来以6月12日纪念1898年的独立宣言。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1946年7月4日，美国总统杜鲁门发布公告，宣布撤销美国在菲律宾行使的主权并承认菲律宾共和国。美菲代表同日在马尼拉签署《一般关系条约》。菲律宾经历了自治邦时期与第二次世界大战期间的日军占领，独立之初便面临重建工作。',
            '菲律宾争取独立的时间线还要往前追溯到1898年。菲律宾革命力量于当年6月12日宣布脱离西班牙；这一日期后来成为菲律宾的独立日。',
          ],
        },
      ],
    },
    relatedEvents: [
      {
        id: 'world-philippine-independence-declaration',
        label: '回看1898年的独立宣言',
        note: '菲律宾革命力量在卡维特宣布脱离西班牙。',
      },
    ],
    sources: [
      {
        title: '美国国家档案馆 · 杜鲁门第2695号总统公告',
        url: 'https://www.archives.gov/federal-register/codification/proclamations/02695.html',
        note: '1946年7月4日承认菲律宾独立的公告原文。',
      },
      {
        title: '美国国务院《美国对外关系文件》1946年第八卷 · 对菲律宾独立的承认',
        url: 'https://history.state.gov/historicaldocuments/frus1946v08/d683',
        note: '附注记载一般关系条约在马尼拉签署及交换批准书的日期。',
      },
      {
        title: '菲律宾国家历史委员会 · 独立宣言与菲律宾国旗',
        url: 'https://philhistoricsites.nhcp.gov.ph/registry_database/the-philippine-national-flag/',
        note: '记载1898年6月12日的独立宣告。',
      },
    ],
  },
  {
    id: 'modern-south-pacific-commission-1947',
    year: 1947,
    dateLabel: '1947年2月6日',
    title: '《堪培拉协定》设立南太平洋委员会',
    aliases: ['南太平洋委员会', '太平洋共同体', 'Canberra Agreement'],
    category: '交流',
    region: 'oceania',
    location: '澳大利亚堪培拉',
    coordinates: [149.13, -35.3],
    people: [],
    importance: 4,
    summary: '六国在堪培拉签署协定，为当时尚未自治的南太平洋岛屿设立一个技术与社会事务合作机构。',
    background: '第二次世界大战结束后，管理太平洋岛屿的政府就经济、卫生和社会事务寻找合作方式。',
    impact:
      '岛屿社会通过这一机构获得技术合作渠道。随各地取得自治、独立和参加组织，成员结构此后发生变化。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1947年2月6日，澳大利亚、法国、荷兰、新西兰、英国和美国在堪培拉签署协定，设立南太平洋委员会。协定把经济和社会事务列为合作重点，为卫生、农业等技术工作建立跨岛屿的协调机构。最初签约的是当时管理当地岛屿的六国政府。',
            '随着一些岛屿获得自治或独立，岛屿成员逐渐有了更直接的参与渠道。机构后来改称太平洋共同体。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '太平洋共同体 · 治理文件汇编《堪培拉协定》',
        url: 'https://www.spc.int/sites/default/files/resources/2018-05/The_Pacific_Community_Governance_Compendium_2018.pdf',
        note: '第四部分为带修订注记的协定文本，第五部分收录后续修正。',
      },
    ],
  },
  {
    id: 'modern-liaoshen-campaign-1948',
    year: 1948,
    dateLabel: '1948年9月12日—11月2日',
    title: '辽沈战役',
    category: '战争',
    region: 'china',
    location: '辽宁锦州、沈阳及东北多地',
    coordinates: [121.14, 41.1],
    locationNote: '标记设在锦州，战事涉及东北多地。',
    people: [],
    importance: 5,
    summary: '东北野战军攻克锦州，随后取得沈阳、营口等地，辽沈战役于11月2日结束。',
    background:
      '1948年，国民党军在东北据守沈阳、长春、锦州等城市。锦州处在东北与关内联系的交通要道上。',
    impact: '战役后，东北全境解放，东北野战军随后入关参加平津战役。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '1948年9月12日，东北野战军发起辽沈战役。锦州处在东北通往关内的走廊上。10月15日锦州失守后，国民党军由东北经陆路撤往关内的通道被切断。长春的国民党守军随后一部起义、一部投降。',
            '辽西的战斗结束后，东北野战军进占沈阳和营口，11月2日战役结束。国民党在东北的主要军事力量瓦解，东北野战军随后入关，参加华北战事。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '中华人民共和国应急管理部 · 1948：风卷残云如卷席',
        url: 'https://www.mem.gov.cn/xw/ztzl/2021/dsxxjy/xxfd/202103/t20210329_382261.shtml',
        note: '见辽沈战役部分的起止、锦州与长春战况以及沈阳、营口的战局。',
      },
    ],
  },
  {
    id: 'modern-eritrea-federation-decision-1950',
    year: 1950,
    dateLabel: '1950年12月2日',
    title: '联合国通过厄立特里亚联邦方案',
    aliases: ['联合国大会第390（V）号决议', '厄立特里亚与埃塞俄比亚联邦'],
    category: '政治',
    region: 'africa',
    location: '厄立特里亚阿斯马拉',
    coordinates: [38.93, 15.34],
    locationNote: '标记对应厄立特里亚的行政中心。决议在美国举行的联合国大会通过。',
    people: [],
    importance: 4,
    summary: '联合国大会通过第390（V）号决议，安排厄立特里亚作为自治单位与埃塞俄比亚组成联邦。',
    background:
      '意大利在第二次世界大战中失去厄立特里亚，英国临时管治，当地各界和周边政府对战后归属有不同主张。',
    impact: '决议确定了战后过渡的制度框架，联邦安排到1952年才开始实施。',
    narrative: {
      sections: [
        {
          paragraphs: [
            '第二次世界大战中，英国从意大利手中夺取厄立特里亚并临时管治。意大利战后放弃其非洲殖民地，厄立特里亚的前途由联合国讨论。1950年12月2日，大会通过方案，把厄立特里亚作为自治单位与埃塞俄比亚组成联邦，由埃塞俄比亚王室行使联邦体系中的主权。',
            '决议通过后还有两年左右的过渡。联合国专员协助拟订厄立特里亚宪法，英国在1952年交接行政事务，联邦安排才实际生效。',
          ],
        },
      ],
    },
    sources: [
      {
        title: '联合国大会 · 第390（V）号决议',
        url: 'https://digitallibrary.un.org/record/670401',
        note: '1950年12月2日通过。A部分第1段规定厄立特里亚的自治地位与联邦安排。',
      },
      {
        title: '联合国新闻部 · 《联合国与厄立特里亚独立》',
        url: 'https://digitallibrary.un.org/record/229464',
        note: '概述联邦方案、1952年实施及后续进程。',
      },
    ],
  },
]
