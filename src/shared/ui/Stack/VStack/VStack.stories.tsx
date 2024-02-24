import { VStack } from './VStack'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'shared/VStack',
  component: VStack,
  parameters: {},
  tags: ['autodocs']
} satisfies Meta<typeof VStack>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: { }
}
