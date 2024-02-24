import { type Meta, type StoryObj } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/consts/theme'

import AboutPage from './AboutPage'

const meta = {
  title: 'pages/AboutPage',
  component: AboutPage,
  parameters: {},
  tags: ['autodocs']
} satisfies Meta<typeof AboutPage>

export default meta
  type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
  }
}
Normal.decorators = [StoreDecorator({})]

export const Dark: Story = {
  args: {
  }
}
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})]
