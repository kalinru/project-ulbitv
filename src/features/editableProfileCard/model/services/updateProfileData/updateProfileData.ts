import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from '@/app/providers/StoreProvider'
import { type Profile } from '@/entities/Profile'
import { ValidateProfileError } from '../../consts/consts'
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm'
import { validateProfileData } from '../validateProfileData/validateProfileData'

export const updateProfileData =
createAsyncThunk<Profile, undefined, ThunkConfig<ValidateProfileError[]>>(
  'profile/updateProfileData',
  async (_, { dispatch, extra, rejectWithValue, getState }) => {
    const formData = getProfileForm(getState())

    const errors = validateProfileData(formData)
    if (errors.length) {
      return rejectWithValue(errors)
    }

    try {
      const response = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData)
      const data = response.data
      if (!data) {
        throw new Error()
      }
      return data
    } catch (e) {
      return rejectWithValue([ValidateProfileError.SERVER_ERROR])
    }
  }
)
