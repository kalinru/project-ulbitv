import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import { type Profile } from '../../types/profile'

export const fetchProfileData =
createAsyncThunk<Profile, string | undefined, ThunkConfig<string>>(
  'profile/fetchProfileData',
  async (profileId, { dispatch, extra, rejectWithValue }) => {
    if (!profileId) {
      return rejectWithValue('no profileId provided')
    }

    try {
      const response = await extra.api.get<Profile>(`/profile/${profileId}`)
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
