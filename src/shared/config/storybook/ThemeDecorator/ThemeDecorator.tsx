import { type Story } from '@storybook/react'

// eslint-disable-next-line ulbi-tv-plugin-kalinru/fsd-layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { type Theme } from '@/shared/consts/theme'

// eslint-disable-next-line react/display-name
export const ThemeDecorator = (theme: Theme) => (Story: Story): JSX.Element => (
  <ThemeProvider initialTheme={theme}>
    <div className={`app ${theme}`}>
      <Story />
    </div>
  </ThemeProvider>
)
