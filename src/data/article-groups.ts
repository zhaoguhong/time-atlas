/** Stable article IDs and the legacy essays whose material they bring together. */
export const articleGroups = [
  [
    'qin-unification',
    'qin-conquest-and-government',
    'three-kingdoms',
    'chibi-and-alliance',
    'north-south-unification',
    'qing-state',
  ],
  ['tang-turning-point'],
  ['opium-wars', 'self-strengthening-course', 'first-sino-japanese', 'late-qing-transition'],
  ['xinhai-revolution'],
  [
    'silk-road',
    'hexi-and-oases',
    'central-asian-oases',
    'maritime-connections',
    'indian-ocean-ports',
    'port-and-hinterland',
    'zheng-he-voyages',
  ],
  ['mongol-conquests'],
  ['age-of-exploration', 'columbus-atlantic', 'gama-indian-ocean', 'magellan-elcano'],
  ['reformation'],
  [
    'buddhist-texts-and-networks',
    'translation-workshops',
    'xuanzang-pilgrimage',
    'ganjin-crossing',
  ],
  ['porcelain-world'],
  ['qiaopi-remittances'],
  ['nanhai-shipwreck'],
  [
    'constitutions-rights-and-participation',
    'labor-rights-citizenship',
    'abolition-and-livelihood',
    'women-public-life',
  ],
  ['industry-transport-and-life', 'factory-city-sanitation', 'messages-distance-and-access'],
  ['world-wars'],
  [
    'grand-canal',
    'capital-and-grain',
    'capital-moves-and-city-life',
    'water-food-cities',
    'city-water-and-labor',
  ],
  [
    'tax-money-markets',
    'tax-enters-household',
    'paper-money-and-trust',
    'song-learning',
    'northern-song-reform-reversals',
  ],
  [
    'writing-and-knowledge',
    'from-scroll-to-book',
    'craft-knowledge-in-books',
    'schools-and-examinations',
    'school-and-access',
    'how-history-is-written',
    'history-and-commentary',
  ],
  ['chinese-literature-and-performance', 'tang-poets-lives', 'poetry-in-exile'],
  ['observing-sky-measuring-position', 'longitude-and-clock', 'measuring-a-day'],
  ['disease-medicine-public-health', 'vaccine-to-eradication'],
  [
    'west-asian-urban-worlds',
    'south-asian-societies',
    'southeast-asian-centres',
    'african-cities-and-networks',
    'american-urban-traditions',
  ],
] as const

/** Retired main IDs whose previous edition combined multiple event guides. */
export const previousMergedArticleGroups = [
  ['three-kingdoms', 'chibi-and-alliance'],
  ['song-learning', 'northern-song-reform-reversals'],
  ['maritime-connections', 'indian-ocean-ports', 'port-and-hinterland', 'zheng-he-voyages'],
  ['water-food-cities', 'city-water-and-labor'],
  [
    'buddhist-texts-and-networks',
    'translation-workshops',
    'xuanzang-pilgrimage',
    'ganjin-crossing',
  ],
  ['schools-and-examinations', 'school-and-access'],
  ['how-history-is-written', 'history-and-commentary'],
] as const

export const canonicalArticleId = new Map<string, string>(
  articleGroups.flatMap(([id, ...aliases]) => [id, ...aliases].map((alias) => [alias, id])),
)

/** Public positional links created before the two religion articles were separated. */
export const combinedReligionSteps = [
  'world-buddhism',
  'world-ashoka',
  'world-kushan-networks',
  'category-kumarajiva',
  'category-nalanda',
  'xuanzang',
  'xuanzang-return',
  'jianzhen',
  'world-reformation',
  'exp-em-german-peasants',
  'exp-em-english-supremacy',
  'category-trent',
  'depth-augsburg-peace',
  'world-westphalia',
]
