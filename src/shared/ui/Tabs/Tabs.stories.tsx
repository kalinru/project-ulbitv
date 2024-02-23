import { Tabs } from './Tabs'
import type { Meta, StoryObj } from '@storybook/react'

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
