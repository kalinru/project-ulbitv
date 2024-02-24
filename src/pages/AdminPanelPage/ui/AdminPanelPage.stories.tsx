import { type Meta, type StoryObj } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/consts/theme'

import AdminPanelPage from './AdminPanelPage'

const meta = {
  title: 'pages/AdminPanelPage',
  component: AdminPanelPage,
  parameters: {},
  tags: ['autodocs']
} satisfies Meta<typeof AdminPanelPage>

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
