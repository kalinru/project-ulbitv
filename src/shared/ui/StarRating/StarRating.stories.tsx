import { StarRating } from './StarRating'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'shared/StarRating',
  component: StarRating,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof StarRating>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: { }
}
