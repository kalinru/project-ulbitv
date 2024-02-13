import type { Meta, StoryObj } from '@storybook/react'
import { ArticlePageFilter } from './ArticlePageFilter'

const meta = {
  title: 'shared/ArticlePageFilter',
  component: ArticlePageFilter,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ArticlePageFilter>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: { }
}
