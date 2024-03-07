import { buildSelector } from '@/shared/lib/store'

import { type Settings } from '../types/settings'

const defaultUserSettings: Settings = {}

export const [useUserSettings, getUserSettings] = buildSelector(
  (state) => state.user?.authData?.settings ?? defaultUserSettings,
)

export const [useUserSettingsByKey, getUserSettingsByKey] = buildSelector(
  (state, key: keyof Settings) => state.user?.authData?.settings?.[key],
)
