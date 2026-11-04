import { hanExpansionEvents, hanExpansionPeople } from './expansion-china-early-han'
import { medievalExpansionEvents, medievalExpansionPeople } from './expansion-china-early-medieval'
import { tangExpansionEvents, tangExpansionPeople } from './expansion-china-early-tang'
import { songyuanExpansionEvents, songyuanExpansionPeople } from './expansion-china-early-songyuan'
import { archaeologyExpansionEvents } from './expansion-china-early-archaeology'
import { artsExpansionEvents } from './expansion-china-early-arts'

export const expandedChinaEarlyEvents = [
  ...hanExpansionEvents,
  ...medievalExpansionEvents,
  ...tangExpansionEvents,
  ...songyuanExpansionEvents,
  ...archaeologyExpansionEvents,
  ...artsExpansionEvents,
]
export const expandedChinaEarlyPeople = [
  ...hanExpansionPeople,
  ...medievalExpansionPeople,
  ...tangExpansionPeople,
  ...songyuanExpansionPeople,
]
