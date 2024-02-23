import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

import LoginForm from './LoginForm'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'features/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
  decorators: [StoreDecorator({
    loginForm: {
      username: 'Peter',
      password: 'secret'
    }
  })]
}
