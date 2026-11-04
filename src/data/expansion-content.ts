import { expandedChinaEarlyEvents, expandedChinaEarlyPeople } from './expansion-china-early'
import { expandedEuropeModernEvents, expandedEuropeModernPeople } from './expansion-europe-modern'
import { expandedWorldRegionEvents, expandedWorldRegionPeople } from './expansion-world-regions'

export const newExpandedEvents = [
  ...expandedChinaEarlyEvents,
  ...expandedEuropeModernEvents,
  ...expandedWorldRegionEvents,
]
export const newExpandedPeople = [
  ...expandedChinaEarlyPeople,
  ...expandedEuropeModernPeople,
  ...expandedWorldRegionPeople,
]
