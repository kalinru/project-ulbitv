import type { Meta, StoryObj } from '@storybook/react'
import { ArticleListWrapper } from './ArticleListWrapper'

const meta = {
  title: 'shared/ArticleListWrapper',
  component: ArticleListWrapper,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ArticleListWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: { }
}
