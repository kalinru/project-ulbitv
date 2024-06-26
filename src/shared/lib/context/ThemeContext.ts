import { createContext } from 'react'

import { type Theme } from '../../consts/theme'

export interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>(
  {} as ThemeContextProps,
)
