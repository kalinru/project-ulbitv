import { LOCAL_STORAGE_DESIGN_KEY } from '@/shared/consts/localStorage'
import { type FeatureFlags } from '@/shared/types/featureFlags'

const defaultFeatures: FeatureFlags = {
  isAppRedesigned: localStorage.getItem(LOCAL_STORAGE_DESIGN_KEY) === 'new',
}

let featureFlags: FeatureFlags = {
  ...defaultFeatures,
}

export function setFeatureFlags(newFeatureFlags?: FeatureFlags): void {
  if (newFeatureFlags) {
    featureFlags = newFeatureFlags
  }
}

export function getFeatureFlag(flag: keyof FeatureFlags): boolean | undefined {
  return featureFlags?.[flag]
}

export function getAllFeatureFlags() {
  return featureFlags
}
