import { Button } from '../../../Button/Button'

import { Dropdown } from './Dropdown'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'shared/Dropdown',
  component: Dropdown,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    items: [
      {
        content: 'adasdasfas',
      },
      {
        content: 'bdasd asdasa',
      },
    ],
    trigger: <Button>Trigger</Button>,
  },
}
