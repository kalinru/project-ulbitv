import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import { type Profile } from '../../types/profile'
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm'

export const updateProfileData =
createAsyncThunk<Profile, undefined, ThunkConfig<string>>(
  'profile/updateProfileData',
  async (_, { dispatch, extra, rejectWithValue, getState }) => {
    const formData = getProfileForm(getState())

    try {
      const response = await extra.api.put<Profile>('/profile', formData)
      const data = response.data
      if (!data) {
        throw new Error()
      }
      return data
    } catch (e) {
      return rejectWithValue('error')
    }
  }
)
