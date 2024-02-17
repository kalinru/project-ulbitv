import {
  type ReducersMapObject,
  configureStore,
  type Reducer,
  type CombinedState
} from '@reduxjs/toolkit'
import { type ThunkExtraArg, type StateSchema } from './StateSchema'
import { counterReducer } from 'entities/Counter'
import { userReducer } from 'entities/User'
import { type TypedUseSelectorHook, useSelector } from 'react-redux'
import { createReducerManager } from './reducerManager'
import { $api } from 'shared/api/api'
import { UIReducer } from 'features/UI'
import { rtkApi } from 'shared/api/rtkApi'

export function createReduxStore (
  initialState: StateSchema,
  asyncReducers: ReducersMapObject<StateSchema>
) {
  const reducer: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
    ui: UIReducer,
    [rtkApi.reducerPath]: rtkApi.reducer
  }

  const reducerManager = createReducerManager(reducer)

  const extraArgument: ThunkExtraArg = {
    api: $api
  }

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    preloadedState: initialState,
    devTools: __IS_DEV__,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      thunk: {
        extraArgument
      }
    }).concat(rtkApi.middleware)
  })

  // @ts-expect-error fixme
  store.reducerManager = reducerManager

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector
