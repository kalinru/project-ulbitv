import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/consts/theme'

import { Sidebar } from './Sidebar'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'widgets/Sidebar',
  component: Sidebar,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      user: {
        authData: {},
      },
    }),
  ],
}

export const Dark: Story = {
  args: {},
}
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    user: {
      authData: {},
    },
  }),
]

export const NonAuthenticated: Story = {
  args: {},
}
NonAuthenticated.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    user: {},
  }),
]
