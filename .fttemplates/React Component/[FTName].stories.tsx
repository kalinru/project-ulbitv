import type { Meta, StoryObj } from '@storybook/react'
import { [FTName] } from './[FTName]'

const meta = {
  title: 'shared/[FTName]',
  component: [FTName],
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof [FTName]>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: { }
}
