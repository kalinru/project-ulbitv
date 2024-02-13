import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import { Text } from '../Text/Text'

const meta = {
  title: 'shared/Card',
  component: Card,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    children: <Text>some text on card</Text>
  }
}
