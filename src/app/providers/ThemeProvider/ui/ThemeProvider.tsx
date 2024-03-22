import { useMemo, useState, useEffect, type ReactNode } from 'react'

import { LOCAL_STORAGE_THEME_KEY } from '@/shared/consts/localStorage'
import { Theme } from '@/shared/consts/theme'
import { ThemeContext } from '@/shared/lib/context/ThemeContext'

interface ThemeProviderProps {
  initialTheme?: Theme
  children?: ReactNode
}

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme

const ThemeProvider = ({ children, initialTheme }: ThemeProviderProps) => {
  const [isThemeInited, setThemeInited] = useState(false)
  const [theme, setTheme] = useState(
    initialTheme ?? defaultTheme ?? Theme.LIGHT,
  )

  useEffect(() => {
    if (!isThemeInited && initialTheme) {
      setTheme(initialTheme)
      setThemeInited(true)
    }
  }, [initialTheme, isThemeInited])

  useEffect(() => {
    document.body.className = theme
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme)
  }, [theme])

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  )

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
