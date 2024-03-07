import { createAsyncThunk } from '@reduxjs/toolkit'

import { type ThunkConfig } from '@/app/providers/StoreProvider'

import { setUserSettingsMutation } from '../../api/userApi'
import { getUserAuthData } from '../selectors/getUserAuthData.ts/getUserAuthData'
import { getUserSettings } from '../selectors/userSettings'
import { type Settings } from '../types/settings'

export const saveUserSettings = createAsyncThunk<
  Settings,
  Settings,
  ThunkConfig<string>
>(
  'user/saveUserSettings',
  async (newUserSettings, { getState, dispatch, rejectWithValue }) => {
    const userData = getUserAuthData(getState())
    const userSettings = getUserSettings(getState())
    if (!userData) {
      return rejectWithValue('no user data')
    }
    try {
      const response = await dispatch(
        setUserSettingsMutation({
          userId: userData.id,
          userSettings: {
            ...userSettings,
            ...newUserSettings,
          },
        }),
      ).unwrap()

      if (!response.settings) {
        return rejectWithValue('no user settings in response')
      }

      return response.settings
    } catch (e) {
      return rejectWithValue('error')
    }
  },
)
