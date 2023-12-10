import { getCounter } from '../getCounter/getCounter'
import { createSelector } from 'reselect'
import { type CounterSchema } from '../../types/counterSchema'

export const getCounterValue = createSelector(
  getCounter,
  (counter: CounterSchema) => counter.value
)
