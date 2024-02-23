import { Flex } from './Flex'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'shared/Flex',
  component: Flex,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Flex>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    children: (<>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </>)
  }
}
