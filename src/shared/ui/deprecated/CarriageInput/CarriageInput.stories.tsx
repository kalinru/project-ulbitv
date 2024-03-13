import { Input } from './CarriageInput'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'shared/CarriageInput',
  component: Input,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    placeholder: 'Type text',
    value: '123123',
  },
}
