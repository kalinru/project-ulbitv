import { createAsyncThunk } from '@reduxjs/toolkit'

import { type ThunkConfig } from '@/app/providers/StoreProvider'
import {
  LOCAL_STORAGE_DESIGN_KEY,
  USER_LOCAL_STORAGE_KEY,
} from '@/shared/consts/localStorage'

import { getUserDataById } from '../../api/userApi'
import { type User } from '../types/user'

export const initAuthData = createAsyncThunk<
  User,
  undefined,
  ThunkConfig<string>
>('user/initAuthData', async (_, { dispatch, rejectWithValue }) => {
  const userId = localStorage.getItem(USER_LOCAL_STORAGE_KEY)

  if (!userId) {
    return rejectWithValue('no user id')
  }

  try {
    const response = await dispatch(getUserDataById(userId)).unwrap()

    localStorage.setItem(
      LOCAL_STORAGE_DESIGN_KEY,
      response.features?.isAppRedesigned ? 'new' : 'old',
    )

    return response
  } catch (e) {
    return rejectWithValue('error')
  }
})
