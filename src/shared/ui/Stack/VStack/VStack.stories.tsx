import type { Meta, StoryObj } from '@storybook/react'
import { VStack } from './VStack'

const meta = {
  title: 'shared/VStack',
  component: VStack,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof VStack>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: { }
}
