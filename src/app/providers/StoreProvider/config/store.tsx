import { configureStore } from '@reduxjs/toolkit'
import { type StateSchema } from './StateSchema'
import { counterReducer } from 'entities/Counter/model/slice/counterSlice'

export function createReduxStore (initialState?: StateSchema): ReturnType<typeof configureStore> {
  return configureStore<StateSchema>({
    reducer: {
      counter: counterReducer
    },
    preloadedState: initialState,
    devTools: __IS_DEV__
  })
}
