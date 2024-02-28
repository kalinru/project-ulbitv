import { CommentList } from './CommentList'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'shared/CommentList',
  component: CommentList,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof CommentList>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {},
}
