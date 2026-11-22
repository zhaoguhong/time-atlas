import { expandedChinaEarlyEvents, expandedChinaEarlyPeople } from './expansion-china-early'
import { expandedEuropeModernEvents, expandedEuropeModernPeople } from './expansion-europe-modern'
import { expandedWorldRegionEvents, expandedWorldRegionPeople } from './expansion-world-regions'
import {
  chinaCoverageEvents,
  chinaCoveragePeople,
  chinaFollowupEvents,
  chinaFollowupPeople,
} from './expansion-coverage-china'
import { worldCoverageEvents, worldCoveragePeople } from './expansion-coverage-world'
import { regionalFollowupEvents, regionalFollowupPeople } from './expansion-coverage-regions'

export const newExpandedEvents = [
  ...expandedChinaEarlyEvents,
  ...expandedEuropeModernEvents,
  ...expandedWorldRegionEvents,
  ...chinaCoverageEvents,
  ...chinaFollowupEvents,
  ...worldCoverageEvents,
  ...regionalFollowupEvents,
]
export const newExpandedPeople = [
  ...expandedChinaEarlyPeople,
  ...expandedEuropeModernPeople,
  ...expandedWorldRegionPeople,
  ...chinaCoveragePeople,
  ...chinaFollowupPeople,
  ...worldCoveragePeople,
  ...regionalFollowupPeople,
]
