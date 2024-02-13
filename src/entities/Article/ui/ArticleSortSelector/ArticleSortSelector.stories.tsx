import type { Meta, StoryObj } from '@storybook/react'
import { ArticleSortSelector } from './ArticleSortSelector'
import { ArticleSortField } from 'entities/Article/model/types/article'

const meta = {
  title: 'shared/ArticleSortSelector',
  component: ArticleSortSelector,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ArticleSortSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    order: 'asc',
    sort: ArticleSortField.CREATED
  }
}
