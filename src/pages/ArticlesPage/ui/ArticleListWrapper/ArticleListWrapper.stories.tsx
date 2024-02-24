import { ArticleListWrapper } from './ArticleListWrapper'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'shared/ArticleListWrapper',
  component: ArticleListWrapper,
  parameters: {},
  tags: ['autodocs']
} satisfies Meta<typeof ArticleListWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: { }
}
