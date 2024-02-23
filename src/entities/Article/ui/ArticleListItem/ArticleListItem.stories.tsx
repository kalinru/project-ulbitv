import { ArticleView } from '../../model/consts/consts'
import { type IArticle } from '../../model/types/article'

import { ArticleListItem } from './ArticleListItem'

import type { Meta, StoryObj } from '@storybook/react'

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
