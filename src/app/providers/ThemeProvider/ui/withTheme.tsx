import React from 'react'

import { useUserSettings } from '@/entities/User'

import ThemeProvider from './ThemeProvider'

export const withTheme = (Component: React.ComponentType) => {
  // eslint-disable-next-line react/display-name
  return () => {
    const { theme: defaultTheme } = useUserSettings()
    return (
      <ThemeProvider initialTheme={defaultTheme}>
        <Component />
      </ThemeProvider>
    )
  }
}
