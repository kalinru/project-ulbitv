import { type Meta, type StoryObj } from '@storybook/react'

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/consts/theme'

import { NotFoundPage } from './NotFoundPage'

const meta = {
  title: 'pages/NotFoundPage',
  component: NotFoundPage,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof NotFoundPage>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {},
}

export const Dark: Story = {
  args: {},
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
