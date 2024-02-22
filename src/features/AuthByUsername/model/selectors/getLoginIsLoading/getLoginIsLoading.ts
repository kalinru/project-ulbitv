import { type StateSchema } from '@/app/providers/StoreProvider'
import { getLoginState } from '../getLoginState/getLoginState'

export const getLoginIsLoading = (state: StateSchema) => getLoginState(state)?.isLoading ?? false
