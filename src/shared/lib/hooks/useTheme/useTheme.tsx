import { useContext } from 'react'

import { Theme } from '../../../consts/theme'
import { ThemeContext } from '../../context/ThemeContext'
import { toggleFeatures } from '../../features'

interface useThemeResult {
  theme: Theme
  toggleTheme: (saveAction?: (theme: Theme) => void) => void
}

const useTheme = (): useThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = (saveAction?: (theme: Theme) => void) => {
    let newTheme: Theme
    switch (theme) {
      case Theme.LIGHT:
        newTheme = Theme.DARK
        break
      case Theme.DARK:
        newTheme = toggleFeatures({
          name: 'isAppRedesigned',
          on: () => Theme.SAND,
          off: () => Theme.CONTRAST,
        })
        break
      case Theme.CONTRAST:
        newTheme = Theme.LIGHT
        break
      default:
        newTheme = Theme.LIGHT
    }
    setTheme?.(newTheme)
    saveAction?.(newTheme)
  }

  return {
    theme: theme ?? Theme.LIGHT,
    toggleTheme,
  }
}

export default useTheme
