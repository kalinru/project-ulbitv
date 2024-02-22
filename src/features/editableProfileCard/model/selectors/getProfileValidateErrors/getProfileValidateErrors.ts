import { type StateSchema } from '@/app/providers/StoreProvider'

export const getProfilevalidateErrors = (state: StateSchema) => state.profile?.validateErrors
