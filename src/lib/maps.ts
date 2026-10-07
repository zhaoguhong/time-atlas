import type { PolityFeature, PolityProperties } from '../types'

const primary = new Set([
  'Shang Dynasty',
  'Zhou Dynasty',
  'Qin',
  'Qi',
  'Chu',
  'Yan',
  'Zhao',
  'Wei',
  'Han',
  'Jin',
  'Qin Dynasty',
  'Han Dynasty',
  'Xin Dynasty',
  'Cao Wei',
  'Shu Han',
  'Eastern Wu',
  'Western Jin',
  'Eastern Jin',
  'Northern Wei',
  'Eastern Wei',
  'Western Wei',
  'Northern Qi',
  'Northern Zhou',
  'Liu Song Dynasty',
  'Southern Qi',
  'Liang Dynasty',
  'Chen Dynasty',
  'Former Qin',
  'Sui Dynasty',
  'Tang Dynasty',
  'Northern Song',
  'Southern Song',
  'Great Jin',
  'Liao Dynasty',
  'Western Xia',
  'Yuan Dynasty',
  'Ming Dynasty',
  'Qing Dynasty',
  'Southern Ming',
])
const neighbors = new Set([
  'Xiongnu',
  'Southern Xiongnu',
  'Xianbei',
  'Goguryeo',
  'Wusun',
  'Tibetan Empire',
  'Nanzhao',
  'Kingdom of Dali',
  'Uyghur Khaganate',
  'Kushan Empire',
  'Parthian Empire',
])

export function activeMapFeatures(features: PolityFeature[], year: number): PolityFeature[] {
  return (
    features
      .filter((f) => f.properties.from <= year && f.properties.to >= year)
      // This source retains a Han-labelled polygon in Lingnan after the end of Han.
      // Omit the disputed attribution rather than reassigning or inventing a border.
      .filter((f) => !(f.properties.name === 'Han Dynasty' && year >= 220))
      // Coarse upstream snapshots extend Shang past the conventional conquest date.
      // Omit that attribution instead of assigning Shang's geometry to Zhou.
      .filter((f) => !(f.properties.name === 'Shang Dynasty' && year >= -1046))
      .map((feature) => {
        const properties = { ...feature.properties }
        if (properties.name === 'Later Zhou' && year < 0) {
          properties.nameZh = '周王室'
          properties.displayNote =
            '原始记录以 Later Zhou 分组；这里指东周王室，不能与五代的后周混淆。轮廓与年代按来源粗粒度采样，不能当作完整周代封国体系。'
        }
        if (['Shang Dynasty', 'Zhou Dynasty'].includes(properties.name)) {
          properties.nameZh = properties.name === 'Shang Dynasty' ? '商' : '周'
          properties.displayNote =
            '商周疆域是来源按较粗年代建立的近似轮廓，采样起讫与常见王朝纪年不完全吻合。它不表示边界精确，也不能将整个文化分布区域视为直接统治区。'
        }
        if (properties.name === '(Five Dynasties and Ten Kingdoms)') {
          properties.nameZh = '五代十国'
          properties.displayNote =
            '来源将多个五代十国政权合为一条区域记录；这不是一个统一政权的疆域，不能据此区分宋初各国的实际边界。原始名称、几何和适用区间保留。'
        }
        if (properties.name === 'Eastern Wu' && year < 222) {
          properties.nameZh = '孙氏势力'
          properties.displayNote =
            '来源分组名为 Eastern Wu；222年前使用“孙氏势力”说明，避免提前呈现吴国的政治名分。'
        }
        if (properties.name === 'Western Jin' && year >= 317) {
          properties.nameZh = '东晋'
          properties.displayNote =
            '来源将这一时期的南方晋朝几何仍分组为 Western Jin；展示名按317年后的东晋调整，原始名称和时间区间保留。'
        }
        return { ...feature, properties }
      })
  )
}
export function polityOrder(a: PolityProperties, b: PolityProperties) {
  const rank = (p: PolityProperties) => (primary.has(p.name) ? 2 : neighbors.has(p.name) ? 1 : 0)
  return rank(b) - rank(a) || b.area - a.area
}
