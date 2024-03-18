import { rtkApi } from '@/shared/api/rtkApi'
import { type FeatureFlags } from '@/shared/types/featureFlags'

interface UpdateFeatureFlagsArgs {
  userId: string
  features: Partial<FeatureFlags>
}

const featureFlagsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    updateFeatureFlags: build.mutation<undefined, UpdateFeatureFlagsArgs>({
      query: ({ features, userId }) => ({
        url: '/users/' + userId,
        method: 'PATCH',
        body: {
          features,
        },
      }),
    }),
  }),
})

export const updateFeatureFlagsMutation =
  featureFlagsApi.endpoints.updateFeatureFlags.initiate
