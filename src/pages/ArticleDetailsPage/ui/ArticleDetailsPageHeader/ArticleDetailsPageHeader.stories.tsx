import type { Meta, StoryObj } from '@storybook/react'
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader'

const meta = {
  title: 'shared/ArticleDetailsPageHeader',
  component: ArticleDetailsPageHeader,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ArticleDetailsPageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: { }
}
