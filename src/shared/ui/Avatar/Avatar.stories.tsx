import AvatarImg from '@/shared/assets/tests/avatar.png'

import { Avatar } from './Avatar'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'shared/Avatar',
  component: Avatar,
  parameters: {},
  tags: ['autodocs']
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    src: AvatarImg,
    size: 100
  }
}
