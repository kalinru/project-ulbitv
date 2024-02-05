import { type Story } from '@storybook/react'
import { type StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice'
import { profileReducer } from 'entities/Profile'
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'
import { type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer
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
