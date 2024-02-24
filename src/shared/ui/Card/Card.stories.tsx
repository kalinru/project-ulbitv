import { Text } from '../Text/Text'

import { Card } from './Card'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'shared/Card',
  component: Card,
  parameters: {},
  tags: ['autodocs']
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    children: <Text>some text on card</Text>
  }
}
