import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/consts/theme'

import { AppLink, AppLinkTheme } from './AppLink'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'shared/AppLink',
  component: AppLink,
  parameters: {},
  tags: ['autodocs'],
  args: {
    to: '/'
  }
} satisfies Meta<typeof AppLink>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    theme: AppLinkTheme.PRIMARY,
    children: 'Button'
  }
}

export const Secondary: Story = {
  args: {
    theme: AppLinkTheme.SECONDARY,
    children: 'Button'
  }
}

export const PrimaryDark: Story = {
  args: {
    theme: AppLinkTheme.PRIMARY,
    children: 'Button'
  }
}
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const SecondaryDark: Story = {
  args: {
    theme: AppLinkTheme.SECONDARY,
    children: 'Button'
  }
}
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)]
