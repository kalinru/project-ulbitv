import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import { type Profile } from '../../types/profile'

export const fetchProfileData =
createAsyncThunk<Profile, undefined, ThunkConfig<string>>(
  'profile/fetchProfileData',
  async (_, { dispatch, extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Profile>('/profile')
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
