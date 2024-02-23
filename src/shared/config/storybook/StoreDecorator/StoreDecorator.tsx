import { type Story } from '@storybook/react'

import { type StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { articleDetailsReducer } from '@/entities/Article/testing'
import { addCommentFormReducer } from '@/features/addCommentForm/testing'
import { loginReducer } from '@/features/AuthByUsername/testing'
import { profileReducer } from '@/features/editableProfileCard/testing'
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/testing'
import { type ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articleDetailsPage: articleDetailsPageReducer
}

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asynncReducers?: ReducersList
// eslint-disable-next-line react/display-name
) => (Story: Story): JSX.Element => (
  <StoreProvider initialState={state}
                 asyncReducers={{ ...defaultAsyncReducers, ...asynncReducers }}>
    <Story />
  </StoreProvider>
)
