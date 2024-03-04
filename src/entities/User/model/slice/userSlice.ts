import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import { USER_LOCAL_STORAGE_KEY } from '@/shared/consts/localStorage'
import { setFeatureFlags } from '@/shared/lib/features'

import { type User, type UserSchema } from '../types/user'

const initialState: UserSchema = {
  inited: false,
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload
      setFeatureFlags(action.payload.features)
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY)
      if (user) {
        const userData = JSON.parse(user) as User
        state.authData = userData
        setFeatureFlags(userData.features)
      }
      state.inited = true
    },
    logout: (state) => {
      state.authData = undefined
      localStorage.removeItem(USER_LOCAL_STORAGE_KEY)
    },
  },
})

export const { actions: userActions } = counterSlice
export const { reducer: userReducer } = counterSlice
