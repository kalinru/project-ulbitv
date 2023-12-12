import { type ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { type StateSchema } from './StateSchema'
import { counterReducer } from 'entities/Counter'
import { userReducer } from 'entities/User'

export function createReduxStore (initialState?: StateSchema): ReturnType<typeof configureStore> {
  const reducer: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer
  }

  return configureStore<StateSchema>({
    reducer,
    preloadedState: initialState,
    devTools: __IS_DEV__
  })
}
