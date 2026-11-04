import {
  europeTwentiethEvents,
  europeCultureModernPeople,
} from './expansion-europe-modern-europe-3'
import { europeIndustrialEvents, europeSciencePeople } from './expansion-europe-modern-europe-2'
import {
  europeEarlyModernEvents,
  europeEarlyModernPeople,
} from './expansion-europe-modern-europe-1'
import { chinaLateImperialEvents, chinaModernPeople } from './expansion-europe-modern-china-1'
import { chinaTwentiethEvents, chinaScienceArtsPeople } from './expansion-europe-modern-china-2'

export const expandedEuropeModernEvents = [
  ...chinaLateImperialEvents,
  ...chinaTwentiethEvents,
  ...europeEarlyModernEvents,
  ...europeIndustrialEvents,
  ...europeTwentiethEvents,
]
export const expandedEuropeModernPeople = [
  ...chinaModernPeople,
  ...chinaScienceArtsPeople,
  ...europeEarlyModernPeople,
  ...europeSciencePeople,
  ...europeCultureModernPeople,
]
