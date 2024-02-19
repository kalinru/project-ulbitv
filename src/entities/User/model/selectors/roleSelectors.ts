import { createSelector } from '@reduxjs/toolkit'
import { type StateSchema } from 'app/providers/StoreProvider'
import { UserRole } from '../consts/consts'

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles

export const getIsUserAdmin = createSelector(
  getUserRoles,
  (roles) => Boolean(roles?.includes(UserRole.ADMIN))
)

export const getIsUserManager = createSelector(
  getUserRoles,
  (roles) => Boolean(roles?.includes(UserRole.MANAGER))
)
