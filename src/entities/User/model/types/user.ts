import { type FeatureFlags } from '@/shared/types/featureFlags'

import { type UserRole } from '../consts/consts'

import { type Settings } from './settings'

export interface User {
  id: string
  username: string
  avatar?: string
  roles?: UserRole[]
  features?: FeatureFlags
  settings?: Settings
}

export interface UserSchema {
  authData?: User

  inited: boolean
}
