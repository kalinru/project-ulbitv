import { ArticlePageFilter } from './ArticlePageFilter'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'shared/ArticlePageFilter',
  component: ArticlePageFilter,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof ArticlePageFilter>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {},
}
