import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './Sidebar'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'

const meta = {
  title: 'widgets/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: {
  }
}
Light.decorators = [
  StoreDecorator({
    user: {
      authData: {}
    }
  })
]

export const Dark: Story = {
  args: {
  }
}
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    user: {
      authData: {}
    }
  })
]

export const NonAuthenticated: Story = {
  args: {
  }
}
NonAuthenticated.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    user: {}
  })
]
