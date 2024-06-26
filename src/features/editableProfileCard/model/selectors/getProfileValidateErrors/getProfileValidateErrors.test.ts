import { type StateSchema } from '@/app/providers/StoreProvider'

import { ValidateProfileError } from '../../consts/consts'

import { getProfilevalidateErrors } from './getProfileValidateErrors'

describe('getProfilevalidateErrors.test', () => {
  test('should work with filled state', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: [
          ValidateProfileError.SERVER_ERROR,
          ValidateProfileError.INCORRECT_AGE,
        ],
      },
    }
    expect(getProfilevalidateErrors(state as StateSchema)).toEqual([
      ValidateProfileError.SERVER_ERROR,
      ValidateProfileError.INCORRECT_AGE,
    ])
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfilevalidateErrors(state as StateSchema)).toEqual(undefined)
  })
})
