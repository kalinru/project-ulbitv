import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/consts/theme'
import { Navbar } from './Navbar'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'widgets/Navbar',
  component: Navbar,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Navbar>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: {
  },
  decorators: [
    StoreDecorator({})
  ]
}

export const Dark: Story = {
  args: {
  },
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      user: { authData: { id: '1', username: 'name' } }
    })
  ]
}
