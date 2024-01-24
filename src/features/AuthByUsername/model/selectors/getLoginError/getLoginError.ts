import { type StateSchema } from 'app/providers/StoreProvider'
import { getLoginState } from '../getLoginState/getLoginState'

export const getLoginError = (state: StateSchema) => getLoginState(state)?.error
