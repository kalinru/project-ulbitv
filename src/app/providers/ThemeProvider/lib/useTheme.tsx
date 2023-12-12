import { useContext } from 'react'
import { Theme, ThemeContext } from './ThemeContext'

interface useThemeResult {
  theme: Theme
  toggleTheme: () => void
}

const useTheme = (): useThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    setTheme(newTheme)
  }

  return {
    theme,
    toggleTheme
  }
}

export default useTheme
