import type { Source } from '../types'

export const transitionSources = {
  centralAsianRevolt: {
    title: '吉尔吉斯斯坦国际创新大学《学报》 · 1916年起义的开端与领导者',
    url: 'https://journal.uia.gov.kg/index.php/main/en/article/view/772',
    note: '摘要概述俄国战时征工命令及吉尔吉斯地区起义的社会背景。',
  },
  centralAsianRefugees: {
    title: 'Aminat Chokobaeva · 1916年起义后七河地区的难民、安置与暴力',
    url: 'https://www.cambridge.org/core/books/abs/central-asian-revolt-of-1916/refugees-resettlement-and-revolutionary-violence-in-semireche-after-the-1916-revolt/3AE048618F9306B3082593862070146D',
    note: '使用档案的研究章节，核对难民赴中国及1917年归来的土地问题。',
  },
  northeast: {
    title: '国务院参事室 · 王卓然与张学良',
    url: 'https://www.counsellor.gov.cn/2021-07/07/c_1211231118.htm',
    note: '记1928年12月29日奉、吉、黑三省易帜及东北政务机构改组。',
  },
  liaoning: {
    title: '辽宁省人民政府 · 历史沿革',
    url: 'https://www.ln.gov.cn/web/sqgk/lsyg/index.shtml',
    note: '东北易帜、辽宁改名、日军占领及1948年全境解放。',
  },
  changchun: {
    title: '吉林省地方志 · 东北沦陷时期的吉林',
    url: 'https://dfz.jl.gov.cn/jgdg/201701/t20170106_5218987.html',
    note: '记1932年3月日本扶植伪满洲国、长春改名及殖民统治。',
  },
  iraq: {
    title: '国际联盟资料 · 委任统治制度（联合国存档）',
    url: 'https://www.un.org/unispal/document/auto-insert-176218/',
    note: '伊拉克一节记述英国的义务、1932年10月3日入会及委任统治终止。',
  },
  lugouqiao: {
    title: '国家档案局 · 《档案里的中国抗战》卢沟桥事变',
    url: 'https://www.saac.gov.cn/zt/2014-08/22/content_63601_2.htm',
    note: '1937年7月7日夜至8日事变经过、宛平守军及军政部收存的报告电文。',
  },
  ethiopia: {
    title: '美国国会图书馆 · Ethiopia: A Country Study',
    url: 'https://www.loc.gov/item/92000507/',
    note: '电子版历史章记1941年5月5日回都、1942年英埃协定及海尔·塞拉西的后期统治。',
  },
  ethiopiaAgreement: {
    title: '美国国务院外交文书 · 1943年埃塞俄比亚备忘录',
    url: 'https://history.state.gov/historicaldocuments/frus1943v04/d115',
    note: '记1941年回都后的安排及1942年1月31日英埃协定与军事公约。',
  },
  haile: {
    title: '史密森学会国家非洲艺术博物馆 · 布鲁米特档案目录',
    url: 'https://sirismm.si.edu/EADpdfs/EEPA.2004-001.pdf',
    note: '海尔·塞拉西一世生卒、统治年、埃塞俄比亚参加联合国及非洲统一组织的背景。',
  },
  nanjingSurrender: {
    title: '国家档案局 · 《中国受降档案》第十四集',
    url: 'https://www.saac.gov.cn/zt/2014-08/26/content_64057.htm',
    note: '1945年9月9日南京总受降、双方代表、会场照片及降书。',
  },
  nanjingVenue: {
    title: '南京市地方志工作办公室 · 抗战胜利南京受降仪式',
    url: 'https://dfz.nanjing.gov.cn/gzdt/202508/t20250815_5628715.html',
    note: '仪式地点为南京黄埔路中央军校大礼堂。',
  },
  heYingqin: {
    title: '日本国立信息学研究所 CiNii Books · 《何应钦大传》书目',
    url: 'https://ci.nii.ac.jp/ncid/BA90656251',
    note: '书目主题记录核对1890—1987年生卒。',
  },
  heArchive: {
    title: '浙江省档案馆 · 民国人物图库中的何应钦',
    url: 'https://zjdy.zjdafw.gov.cn/art/2017/12/27/art_15_45723.html',
    note: '档案条目 Z027-ZZ-000003 标注籍贯贵州兴义。',
  },
  chongqing: {
    title: '重庆市地方志办公室 · 重庆谈判期间的毛泽东',
    url: 'https://dfz.cq.gov.cn/zqlswh/rwby_417819/202312/t20231215_12710760.html',
    note: '中共代表团赴渝、谈判中的分歧及10月10日在桂园签署会谈纪要。',
  },
  chongqingAgreement: {
    title: '国家档案局 · 档案天天看毛泽东系列',
    url: 'https://www.saac.gov.cn/zt/mzd_5.htm',
    note: '1945年10月12日关于《双十协定》后工作的指示。',
  },
  koreanDivision: {
    title: '韩国国史编纂委员会 · 韩国史年表',
    url: 'https://contents.history.go.kr/front/kc/printViewPopup.do?levelId=kc_i502100',
    note: '朝鲜半岛战后分区、联合国临时委员会、1948年南北建政。',
  },
  koreanFounding: {
    title: '美国国务院历史存档 · Background Notes: Korea',
    url: 'https://1997-2001.state.gov/background_notes/southkorea_0006_bgn.html',
    note: '“Division of Korea”一节记1948年8月15日和9月9日分别建政。',
  },
  beiping: {
    title: '北京市公安局警察博物馆 · 北平解放前后的公安机构',
    url: 'https://gaj.beijing.gov.cn/jcbwg/yjcg/jsyj/202006/t20200628_1933167.html',
    note: '记1949年1月31日北平和平解放和北平市公安局进城。',
  },
  beipingTransfer: {
    title: '北京市园林绿化局 · 景福阁内曾处理过渡时期军政事宜',
    url: 'https://yllhj.beijing.gov.cn/ztxx/lhysh/st/202107/t20210713_2435588.shtml',
    note: '1月29日、2月1日两次会议和北平联合办事处。',
  },
  fuZuoyi: {
    title: '人民网党史频道 · 傅作义的北平谈判与水利工作',
    url: 'https://dangshi.people.com.cn/gb/n1/2018/0418/c85037-29934504.html',
    note: '生卒、抗战中的任职、北平和平解放及此后的工作。',
  },
  earlyWaterWorks: {
    title: '国务院参事室 · 新中国成立初期党对水利工作的领导',
    url: 'https://www.counsellor.gov.cn/2021-05/28/c_1211176146.htm',
    note: '傅作义主持组建水利部、组织水利人才及制定1950年度计划。',
  },
  indonesiaTransfer: {
    title: '荷兰国家档案馆 · 印度尼西亚主权移交文件（1949）',
    url: 'https://www.nationaalarchief.nl/beleven/onderwijs/bronnenbox/soevereiniteitsoverdracht-indonesie-1949',
    note: '1949年12月27日移交文件、荷兰与印度尼西亚联邦共和国的安排。',
  },
  indonesiaUN: {
    title: '美国国务院外交文书 · 印度尼西亚与荷兰新几内亚问题',
    url: 'https://history.state.gov/historicaldocuments/frus1950v03/d676',
    note: '回顾1949年末海牙圆桌会议与主权移交，记双方仍待解决的新几内亚西部问题。',
  },
} satisfies Record<string, Source>
