import { type Story } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

export const RouterDecorator = (Story: Story): JSX.Element => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
)
