import { type Story } from '@storybook/react'
import { ThemeProvider, type Theme } from '@/app/providers/ThemeProvider'

// eslint-disable-next-line react/display-name
export const ThemeDecorator = (theme: Theme) => (Story: Story): JSX.Element => (
  <ThemeProvider initialTheme={theme}>
    <div className={`app ${theme}`}>
      <Story />
    </div>
  </ThemeProvider>
)
