import type { Meta, StoryObj } from '@storybook/react'
import { ArticleTypeTabs } from './ArticleTypeTabs'
import { ArticleType } from '../../model/consts/consts'

const meta = {
  title: 'shared/ArticleTypeTabs',
  component: ArticleTypeTabs,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ArticleTypeTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    value: ArticleType.ALL
  }
}
