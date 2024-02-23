import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

import { ArticleDetailsComments } from './ArticleDetailsComments'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'shared/ArticleDetailsComments',
  component: ArticleDetailsComments,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ArticleDetailsComments>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    id: '1'
  },
  decorators: [StoreDecorator({})]
}
