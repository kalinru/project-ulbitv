import { ListBox } from './ListBox'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'shared/ListBox',
  component: ListBox,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof ListBox>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {},
}
