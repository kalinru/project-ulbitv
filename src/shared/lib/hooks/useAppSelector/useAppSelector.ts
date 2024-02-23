import { type TypedUseSelectorHook, useSelector } from 'react-redux'

import { type StateSchema } from '@/app/providers/StoreProvider'

export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector
