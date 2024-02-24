import { Select } from './Select'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'shared/Select',
  component: Select,
  parameters: {},
  tags: ['autodocs']
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: 'Selector',
    options: [
      { label: 'option 1', value: '1' },
      { label: 'option 2', value: '2' }
    ],
    value: '2'
  }
}
