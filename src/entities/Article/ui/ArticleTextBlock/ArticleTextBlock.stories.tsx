import type { Meta, StoryObj } from '@storybook/react'
import { ArticleTextBlock } from './ArticleTextBlock'
import { ArticleBlockType } from '../../model/types/article'

const meta = {
  title: 'entities/ArticleTextBlock',
  component: ArticleTextBlock,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ArticleTextBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    data: { paragraphs: ['paragraph 1', 'paragraph 2', 'paragraph 3'], id: '1', type: ArticleBlockType.TEXT }
  }
}
