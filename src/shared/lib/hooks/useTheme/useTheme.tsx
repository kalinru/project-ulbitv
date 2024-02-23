import { ThemeContext } from '../../context/ThemeContext'
import { Theme } from '../../../consts/theme'
import { useContext } from 'react'

interface useThemeResult {
  theme: Theme
  toggleTheme: () => void
}

const useTheme = (): useThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = () => {
    let newTheme: Theme
    switch (theme) {
      case Theme.LIGHT:
        newTheme = Theme.DARK
        break
      case Theme.DARK:
        newTheme = Theme.CONTRAST
        break
      case Theme.CONTRAST:
        newTheme = Theme.LIGHT
        break
      default:
        newTheme = Theme.LIGHT
    }
    setTheme?.(newTheme)
  }

  return {
    theme: theme ?? Theme.LIGHT,
    toggleTheme
  }
}

export default useTheme
