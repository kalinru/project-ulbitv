import { type Story } from '@storybook/react'
import { type Theme } from 'app/providers/ThemeProvider'

export const ThemeDecorator = (theme: Theme) => (Story: Story): JSX.Element => (
  <div className={`app ${theme}`}>
    <Story />
  </div>
)
