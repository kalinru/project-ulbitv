import type { Meta, StoryObj } from '@storybook/react'
import { ArticleListItem } from './ArticleListItem'
import { ArticleView, type IArticle } from 'entities/Article/model/types/article'

const meta = {
  title: 'shared/ArticleListItem',
  component: ArticleListItem,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ArticleListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    article: {} as IArticle,
    view: ArticleView.SMALL
  }
}
