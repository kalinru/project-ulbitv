import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from './Tabs'

const meta = {
  title: 'shared/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    tabs: [],
    value: ''
  }
}
