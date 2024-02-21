import type { Meta, StoryObj } from '@storybook/react'
import { AvatarDropdown } from './AvatarDropdown'

const meta = {
  title: 'feature/AvatarDropdown',
  component: AvatarDropdown,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof AvatarDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: { }
}
