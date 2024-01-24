import { type StateSchema } from 'app/providers/StoreProvider'
import { getLoginState } from '../getLoginState/getLoginState'

export const getLoginPassword = (state: StateSchema) => getLoginState(state)?.password ?? ''
