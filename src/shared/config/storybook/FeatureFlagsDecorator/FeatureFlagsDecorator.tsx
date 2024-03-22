import { type Story } from '@storybook/react'

import { setFeatureFlags } from '@/shared/lib/features'
import { type FeatureFlags } from '@/shared/types/featureFlags'

export const FeatureFlagsDecorator =
  (features: FeatureFlags) =>
  // eslint-disable-next-line react/display-name
  (Story: Story): JSX.Element => {
    setFeatureFlags(features)

    return <Story />
  }
