import { type StateSchema } from '@/app/providers/StoreProvider'

import { getLoginState } from '../getLoginState/getLoginState'

export const getLoginUsername = (state: StateSchema) =>
  getLoginState(state)?.username ?? ''
