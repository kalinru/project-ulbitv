import ArticleEditPage from './ArticleEditPage'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'shared/ArticleEditPage',
  component: ArticleEditPage,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ArticleEditPage>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: { }
}
