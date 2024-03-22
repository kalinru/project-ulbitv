import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
  LOCAL_STORAGE_DESIGN_KEY,
  USER_LOCAL_STORAGE_KEY,
} from '@/shared/consts/localStorage'
import { setFeatureFlags } from '@/shared/lib/features'

import { initAuthData } from '../services/initAuthData'
import { saveUserSettings } from '../services/saveUserSettings'
import { type Settings } from '../types/settings'
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
      localStorage.setItem(USER_LOCAL_STORAGE_KEY, action.payload.id)
      localStorage.setItem(
        LOCAL_STORAGE_DESIGN_KEY,
        action.payload.features?.isAppRedesigned ? 'new' : 'old',
      )
    },
    // initAuthData: (state) => {
    //   const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY)
    //   if (user) {
    //     const userData = JSON.parse(user) as User
    //     state.authData = userData
    //     setFeatureFlags(userData.features)
    //   }
    //   state.inited = true
    // },
    logout: (state) => {
      state.authData = undefined
      localStorage.removeItem(USER_LOCAL_STORAGE_KEY)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        saveUserSettings.fulfilled,
        (state, { payload }: PayloadAction<Settings>) => {
          if (state.authData) {
            state.authData.settings = payload
          }
        },
      )
      .addCase(
        initAuthData.fulfilled,
        (state, { payload }: PayloadAction<User>) => {
          state.authData = payload
          state.inited = true
          setFeatureFlags(payload.features)
        },
      )
      .addCase(initAuthData.rejected, (state) => {
        state.inited = true
      })
  },
})

export const { actions: userActions } = counterSlice
export const { reducer: userReducer } = counterSlice
