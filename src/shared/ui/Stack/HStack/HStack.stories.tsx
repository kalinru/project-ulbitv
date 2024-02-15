import type { Meta, StoryObj } from '@storybook/react'
import { HStack } from './HStack'

const meta = {
  title: 'shared/HStack',
  component: HStack,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof HStack>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: { }
}
