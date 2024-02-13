import type { Meta, StoryObj } from '@storybook/react'
import { CommentCard } from './CommentCard'

const meta = {
  title: 'shared/CommentCard',
  component: CommentCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof CommentCard>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    comment: {
      articleId: '1',
      id: '1',
      text: 'comment 1',
      user: {
        id: '1',
        username: 'admin'
      }
    }
  }
}