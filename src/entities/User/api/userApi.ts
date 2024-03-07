import { rtkApi } from '@/shared/api/rtkApi'

import { type Settings } from '../model/types/settings'
import { type User } from '../model/types/user'

interface SetUserSettingsArgs {
  userId: string
  userSettings: Settings
}

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    setUserSettings: build.mutation<User, SetUserSettingsArgs>({
      query: ({ userId, userSettings }) => ({
        url: '/users/' + userId,
        method: 'PATCH',
        body: {
          settings: userSettings,
        },
      }),
    }),
    getUserDataById: build.query<User, string>({
      query: (userId) => ({
        url: '/users/' + userId,
        method: 'GET',
      }),
    }),
  }),
})

export const setUserSettingsMutation =
  userApi.endpoints.setUserSettings.initiate

export const getUserDataById = userApi.endpoints.getUserDataById.initiate
