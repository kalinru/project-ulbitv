import type { Meta, StoryObj } from '@storybook/react'
import { ArticleCodeBlock } from './ArticleCodeBlock'
import { ArticleBlockType } from '../../model/types/article'

const meta = {
  title: 'entities/ArticleCodeBlock',
  component: ArticleCodeBlock,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ArticleCodeBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    data: { code: 'code', id: '1', type: ArticleBlockType.CODE }
  }
}
