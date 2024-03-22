import { useMemo, useState, useEffect, type ReactNode } from 'react'

import { useUserSettings } from '@/entities/User'
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/consts/localStorage'
import { Theme } from '@/shared/consts/theme'
import { ThemeContext } from '@/shared/lib/context/ThemeContext'

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme

interface ThemeProviderProps {
  initialTheme?: Theme
  children?: ReactNode
}

const ThemeProvider = ({ children, initialTheme }: ThemeProviderProps) => {
  const [isThemeInited, setThemeInited] = useState(false)
  const { theme: userSettingsTheme } = useUserSettings()
  const [theme, setTheme] = useState(
    initialTheme ?? userSettingsTheme ?? defaultTheme ?? Theme.LIGHT,
  )

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  )

  useEffect(() => {
    if (!isThemeInited && userSettingsTheme) {
      setTheme(userSettingsTheme)
      setThemeInited(true)
    }
  }, [initialTheme, isThemeInited, theme, userSettingsTheme])

  useEffect(() => {
    document.body.className = theme
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
