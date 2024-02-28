import { ArticleList } from './ArticleList'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'shared/ArticleList',
  component: ArticleList,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleList>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    articles: [],
  },
}
