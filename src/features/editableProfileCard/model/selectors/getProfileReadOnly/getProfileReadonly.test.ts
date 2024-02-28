import { type StateSchema } from '@/app/providers/StoreProvider'

import { getProfileReadOnly } from './getProfileReadOnly'

describe('getProfileReadonly.test', () => {
  test('should work with filled state', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        readonly: false,
      },
    }
    expect(getProfileReadOnly(state as StateSchema)).toEqual(false)
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileReadOnly(state as StateSchema)).toEqual(true)
  })
})
