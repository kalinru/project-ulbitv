import {
  type AnyAction,
  type EnhancedStore,
  type ReducersMapObject,
  type Reducer,
  type CombinedState
} from '@reduxjs/toolkit'
import { type AxiosInstance } from 'axios'
import { type ArticleDetailsSchema } from '@/entities/Article'
import { type CounterSchema } from '@/entities/Counter'
import { type UserSchema } from '@/entities/User'
import { type LoginSchema } from '@/features/AuthByUsername'
import { type UISchema } from '@/features/UI'
import { type AddCommentFormSchema } from '@/features/addCommentForm'
import { type ProfileSchema } from '@/features/editableProfileCard'
import {
  type ArticleDetailsPageSchema
} from '@/pages/ArticleDetailsPage'
import { type ArticlesPageSchema } from '@/pages/ArticlesPage'
import { type rtkApi } from '@/shared/api/rtkApi'

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
  ui: UISchema
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

  // Async reducers
  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  addCommentForm?: AddCommentFormSchema
  articlesPage?: ArticlesPageSchema
  articleDetailsPage?: ArticleDetailsPageSchema
}

export type StateSchemaKey = keyof StateSchema
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
  getMountedReducers: () => MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
