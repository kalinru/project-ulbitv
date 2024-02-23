import { ArticleSortField } from '../../model/consts/consts'

import { ArticleSortSelector } from './ArticleSortSelector'

import type { Meta, StoryObj } from '@storybook/react'

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
