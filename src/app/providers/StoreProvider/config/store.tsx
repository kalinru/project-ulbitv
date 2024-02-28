import {
  type ReducersMapObject,
  configureStore,
  type Reducer,
  type CombinedState,
} from '@reduxjs/toolkit'

import { counterReducer } from '@/entities/Counter'
import { userReducer } from '@/entities/User'
import { UIReducer } from '@/features/UI'
import { $api } from '@/shared/api/api'
import { rtkApi } from '@/shared/api/rtkApi'

import { createReducerManager } from './reducerManager'
import { type ThunkExtraArg, type StateSchema } from './StateSchema'

export function createReduxStore(
  initialState: StateSchema,
  asyncReducers: ReducersMapObject<StateSchema>,
) {
  const reducer: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
    ui: UIReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  }

  const reducerManager = createReducerManager(reducer)

  const extraArgument: ThunkExtraArg = {
    api: $api,
  }

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    preloadedState: initialState,
    devTools: __IS_DEV__,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument,
        },
      }).concat(rtkApi.middleware),
  })

  // @ts-expect-error fixme
  store.reducerManager = reducerManager

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
