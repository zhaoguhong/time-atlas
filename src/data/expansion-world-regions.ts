import { westRegionEvents, westRegionPeople } from './expansion-world-regions-west'
import { southRegionEvents, southRegionPeople } from './expansion-world-regions-south'
import { eastRegionEvents, eastRegionPeople } from './expansion-world-regions-east'

import { africaRegionEvents, africaRegionPeople } from './expansion-world-regions-africa'

import {
  americaOceaniaEvents,
  americaOceaniaPeople,
} from './expansion-world-regions-america-oceania'

export const expandedWorldRegionEvents = [
  ...westRegionEvents,
  ...southRegionEvents,
  ...eastRegionEvents,
  ...africaRegionEvents,
  ...americaOceaniaEvents,
]
export const expandedWorldRegionPeople = [
  ...westRegionPeople,
  ...southRegionPeople,
  ...eastRegionPeople,
  ...africaRegionPeople,
  ...americaOceaniaPeople,
]
