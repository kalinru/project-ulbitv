import { type FC } from 'react'
import { Theme, useTheme } from 'app/providers/ThemeProvider'
import { classNames } from 'shared/lib/classNames/classNames'
import LightIcon from 'shared/assets/icons/theme-light.svg'
import DarkIcon from 'shared/assets/icons/theme-dark.svg'
import cls from './ThemeSwitcher.module.scss'
import { Button, ThemeButton } from 'shared/ui'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = (props) => {
  const { className, children } = props
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
          theme={ThemeButton.CLEAR}
          onClick={toggleTheme}
          className={classNames(cls.ThemeSwitcher, {}, [className])}>
      { theme === Theme.LIGHT ? <LightIcon /> : <DarkIcon /> }
    </Button>
  )
}
