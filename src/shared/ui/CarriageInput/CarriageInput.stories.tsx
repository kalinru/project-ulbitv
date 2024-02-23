import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './CarriageInput'

const meta = {
  title: 'shared/CarriageInput',
  component: Input,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    placeholder: 'Type text',
    value: '123123'
  }
}
