import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator'

import { CommentCard } from './CommentCard'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'shared/CommentCard',
  component: CommentCard,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof CommentCard>

export default meta
type Story = StoryObj<typeof meta>

const defaultProps = {
  args: {
    comment: {
      articleId: '1',
      id: '1',
      text: 'comment 1',
      user: {
        id: '1',
        username: 'admin',
      },
    },
  },
}

export const Normal: Story = {
  ...defaultProps,
  decorators: [FeatureFlagsDecorator({ isAppRedesigned: false })],
}

export const NormalRedesigned: Story = {
  ...defaultProps,
  decorators: [FeatureFlagsDecorator({ isAppRedesigned: true })],
}
