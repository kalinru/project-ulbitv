import ArticlesPage from './ArticlesPage'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'pages/ArticlesPage',
  component: ArticlesPage,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ArticlesPage>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: { }
}
