import type { Meta, StoryObj } from '@storybook/react'
import { ArticleList } from './ArticleList'

const meta = {
  title: 'shared/ArticleList',
  component: ArticleList,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ArticleList>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    articles: []
  }
}
