import { ArticleView } from '@/entities/Article'

import { ArticleViewSelector } from './ArticleViewSelector'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'shared/ArticleViewSelector',
  component: ArticleViewSelector,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleViewSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    view: ArticleView.SMALL,
  },
}
