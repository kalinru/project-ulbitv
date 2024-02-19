import { type Story } from '@storybook/react'
import { Suspense } from 'react'

export const SuspenseDecorator = (Story: Story): JSX.Element => (
  <Suspense>
    <Story />
  </Suspense>
)
