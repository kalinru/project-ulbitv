import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import { userActions, type User } from 'entities/User'
import { USER_LOCAL_STORAGE_KEY } from 'shared/consts/localStorage'

interface LoginByUsernameProps {
  username: string
  password: string
}

export const loginByUsername =
createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
  'login/loginByUsername',
  async (authData, { dispatch, extra, rejectWithValue }) => {
    try {
      const response = await extra.api.post('/login', authData)

      const userData = response.data
      if (!userData) {
        throw new Error()
      }

      localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(userData))
      dispatch(userActions.setUserData(userData))

      extra.navigate?.('/about')

      return userData
    } catch (e) {
      return rejectWithValue('error')
    }
  }
)
