import { ArticleBlockType } from '../../model/consts/consts'

import { ArticleCodeBlock } from './ArticleCodeBlock'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'entities/ArticleCodeBlock',
  component: ArticleCodeBlock,
  parameters: {},
  tags: ['autodocs']
} satisfies Meta<typeof ArticleCodeBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    data: { code: 'code', id: '1', type: ArticleBlockType.CODE }
  }
}
