import { HStack } from './HStack'

import type { Meta, StoryObj } from '@storybook/react'

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
