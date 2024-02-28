import { type CounterSchema } from '../types/counterSchema'

import { counterActions, counterReducer } from './counterSlice'

describe('counterSlice', () => {
  test('should increment counter value', () => {
    const state: CounterSchema = {
      value: 10,
    }
    expect(counterReducer(state, counterActions.incremented())).toEqual({
      value: 11,
    })
  })

  test('should decriment counter value', () => {
    const state: CounterSchema = {
      value: 10,
    }
    expect(counterReducer(state, counterActions.decremented())).toEqual({
      value: 9,
    })
  })

  test('should work with empty state', () => {
    expect(counterReducer(undefined, counterActions.incremented())).toEqual({
      value: 1,
    })
  })
})
