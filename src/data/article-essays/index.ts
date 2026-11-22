import { focusedHistoryEssays } from './focused-histories'
import { objectHistoryEssays } from './object-histories'
import { comparativeEssays } from './comparative-essays'
import { globalConnectionEssays } from './global-connections'
import { historyEssays } from './history'
import { cultureEssays } from './culture'
import { societyEssays } from './society'
import { institutionEssays } from './institutions'
import { chinaTurningPointEssays } from './china-turning-points'
import { connectionEssays } from './connections'
import { worldTurningPointEssays } from './world-turning-points'

const earlierEssays = { ...historyEssays, ...cultureEssays, ...societyEssays }

/** Keep the preceding directory's public titles searchable after another consolidation. */
export const previousArticleTitles: Record<string, string> = {
  ...Object.fromEntries(Object.entries(earlierEssays).map(([id, essay]) => [id, essay.name])),
  reformation: '宗教改革：一场信仰争论怎样改变欧洲',
  'qin-unification': '从战国到秦汉：统一与治理',
  'tang-turning-point': '安史之乱与唐代转折',
  'opium-wars': '晚清的危机与转型：从鸦片战争到辛亥革命',
}

/** Titles from the immediately preceding public edition remain valid catalog queries. */
export const recentArticleTitles: Record<string, string> = {
  'qin-unification': '大一统国家如何治理辽阔的中国',
  'tang-turning-point': '安史之乱：一场战争怎样改变唐朝',
  'opium-wars': '鸦片战争与甲午：晚清改革的困局',
  'xinhai-revolution': '辛亥革命：帝制怎样结束，共和怎样开始',
  'silk-road': '丝绸之路：陆海之间的贸易与文明交流',
  'mongol-conquests': '蒙古征服：欧亚大陆怎样被重新连接',
  'age-of-exploration': '大航海时代：几片海洋怎样连成一个世界',
  reformation: '宗教如何塑造社会：信仰、组织与权力',
  'porcelain-world': '瓷器的世界史：泥土、技术与全球贸易',
  'constitutions-rights-and-participation': '大西洋革命：自由、奴隶制与公民权',
  'industry-transport-and-life': '工业革命：机器怎样改变整个社会',
  'world-wars': '两次世界大战：战争如何重塑世界秩序',
  'grand-canal': '河流、运河与城市：水怎样改变中国',
  'tax-money-markets': '国家、市场与生计：从赋税到王安石变法',
  'writing-and-knowledge': '书籍如何改变社会：文字、教育与历史记忆',
  'chinese-literature-and-performance': '文学与人生：从诗文写作到小说、戏曲',
  'observing-sky-measuring-position': '从计时到科学革命：人们怎样测准世界',
  'disease-medicine-public-health': '疾病、医学与公共卫生',
  'west-asian-urban-worlds': '世界文明的多种道路：城市、知识与区域社会',
}

/** Explicit event marks from earlier editions still belong to their saved guides. */
export const retainedGuideEvents: Record<string, string[]> = {
  'world-wars': worldTurningPointEssays['world-wars'].eventIds ?? [],
  'constitutions-rights-and-participation':
    worldTurningPointEssays['constitutions-rights-and-participation'].eventIds ?? [],
  'observing-sky-measuring-position':
    institutionEssays['observing-sky-measuring-position'].eventIds ?? [],
}

export const articleEssays = {
  ...earlierEssays,
  ...institutionEssays,
  ...chinaTurningPointEssays,
  ...connectionEssays,
  ...worldTurningPointEssays,
  ...globalConnectionEssays,
  ...comparativeEssays,
  ...objectHistoryEssays,
  ...focusedHistoryEssays,
}
