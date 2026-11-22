import type { City } from '../types'
import { modernMapSources as ref } from './modern-map-sources'

// Dates are the map's observation windows for these labels.
export const modernMapPlaces: City[] = [
  {
    id: 'taipei',
    name: '台北',
    modern: '今中国台湾台北市',
    coordinates: [121.51, 25.04],
    from: 1913,
    to: 1950,
    capitals: [],
  },
  {
    id: 'penghu',
    name: '澎湖',
    modern: '今中国台湾澎湖县马公一带',
    coordinates: [119.56, 23.57],
    from: 1913,
    to: 1950,
    capitals: [],
  },
  {
    id: 'haikou',
    name: '海口',
    modern: '今中国海南省海口市',
    coordinates: [110.33, 20.03],
    from: 1913,
    to: 1950,
    capitals: [],
  },
  {
    id: 'hong-kong',
    name: '香港',
    modern: '今中国香港特别行政区',
    coordinates: [114.17, 22.28],
    from: 1913,
    to: 1950,
    capitals: [],
  },
  {
    id: 'macao',
    name: '澳门',
    modern: '今中国澳门特别行政区',
    coordinates: [113.54, 22.19],
    from: 1913,
    to: 1950,
    capitals: [],
  },
  {
    id: 'diaoyu',
    name: '钓鱼岛',
    modern: '今中国钓鱼岛及其附属岛屿，标在钓鱼岛一带',
    coordinates: [123.47, 25.74],
    from: 1913,
    to: 1950,
    capitals: [],
  },
  {
    id: 'dongsha',
    name: '东沙岛',
    modern: '今中国东沙群岛东沙岛',
    coordinates: [116.73, 20.7],
    from: 1913,
    to: 1950,
    capitals: [],
  },
  {
    id: 'yongxing',
    name: '永兴岛',
    modern: '今中国西沙群岛永兴岛',
    coordinates: [112.34, 16.83],
    from: 1946,
    to: 1950,
    capitals: [],
  },
  {
    id: 'huangyan',
    name: '黄岩岛',
    modern: '今中国中沙群岛黄岩岛',
    coordinates: [117.77, 15.13],
    from: 1935,
    to: 1950,
    capitals: [],
  },
  {
    id: 'taiping-island',
    name: '太平岛',
    modern: '今中国南沙群岛太平岛',
    coordinates: [114.36, 10.38],
    from: 1946,
    to: 1950,
    capitals: [],
  },
  {
    id: 'changdu',
    name: '昌都',
    modern: '今中国西藏自治区昌都市卡若区',
    coordinates: [97.18, 31.14],
    from: 1913,
    to: 1950,
    capitals: [],
  },
  {
    id: 'shenyang',
    name: '奉天 / 沈阳',
    modern: '今中国辽宁省沈阳市',
    coordinates: [123.43, 41.8],
    from: 1928,
    to: 1950,
    capitals: [],
  },
  {
    id: 'changchun',
    name: '长春',
    modern: '今中国吉林省长春市',
    coordinates: [125.34, 43.91],
    from: 1932,
    to: 1950,
    capitals: [],
  },
  {
    id: 'chongqing',
    name: '重庆',
    modern: '今中国重庆市渝中区一带',
    coordinates: [106.55, 29.56],
    from: 1937,
    to: 1950,
    capitals: [],
  },
]

export const modernMapPlacesById = new Map(modernMapPlaces.map((place) => [place.id, place]))

export function taiwanReturnedByYearEnd(year: number) {
  return year >= 1945
}

export function modernMapNotes(year: number) {
  return [
    {
      label: '台湾、澎湖',
      text: taiwanReturnedByYearEnd(year)
        ? year >= 1949
          ? '1945年光复，属于中国。1949年中华人民共和国成立后，国民党退往台湾，海峡两岸形成政治对立。'
          : '1945年10月25日在台北举行受降仪式，中国恢复对台湾、澎湖行使主权。'
        : '这一年仍处于日本殖民统治之下。1945年10月25日，中国在台北受降并恢复对台湾、澎湖行使主权。',
      sources: year >= 1949 ? [ref.taiwan] : [ref.taiwan, ref.taiwanSurrender],
    },
    {
      label: '香港、澳门',
      text:
        year >= 1941 && year <= 1944
          ? '香港、澳门是中国领土。香港这一年处于日军占领之下。澳门当时由葡萄牙管治。'
          : '香港、澳门是中国领土。这一年香港由英国管治，澳门由葡萄牙管治。',
      sources: [ref.hongKong, ref.hongKongSurrender, ref.macao],
    },
    {
      label: '钓鱼岛及其附属岛屿',
      text: '中国政府认定为中国固有领土。日方于1895年窃占，战后沿革见白皮书。',
      sources: [ref.diaoyu],
    },
    {
      label: '南海诸岛',
      text:
        year >= 1948
          ? '中国在战后恢复行使主权，1947年重新命名有关岛礁，1948年在公开发行的官方地图上标绘南海断续线。'
          : year >= 1946
            ? '中国政府派员分批登岛接收，恢复对南海诸岛行使主权。'
            : '中国政府在二战后派员到岛礁接收，历史沿革见外交部资料。',
      sources: [ref.southChinaSea],
    },
    ...(year >= 1949
      ? [
          {
            label: '海南、西藏',
            text:
              year === 1950
                ? '海南全岛于5月1日解放，昌都于10月19日解放。西藏和平解放协议于1951年5月签署。'
                : '海南的战事仍在继续，西藏地方的治理交接也在此后分阶段推进。',
            sources: [ref.hainan, ref.tibet],
          },
        ]
      : []),
  ]
}

export function modernMapPlaceLabel(id: string, name: string, year: number) {
  if (id === 'taipei' || id === 'penghu')
    return taiwanReturnedByYearEnd(year) ? `${name}（中国）` : name
  if (id === 'yongxing' && year === 1946) return '永兴岛（今名）'
  if (id === 'huangyan' && year >= 1935 && year <= 1950)
    return year >= 1947 ? '黄岩岛（时称民主礁）' : '黄岩岛（时称斯卡巴洛礁）'
  if (id === 'shenyang' && year === 1928) return '奉天'
  if (id === 'changchun' && year >= 1932 && year <= 1944) return '长春（时称新京）'
  return name
}
