import { memo, type FC } from 'react'

import DarkIcon from '@/shared/assets/icons/theme-dark.svg'
import LightIcon from '@/shared/assets/icons/theme-light.svg'
import { Theme } from '@/shared/consts/theme'
import { classNames } from '@/shared/lib/classNames/classNames'
import useTheme from '@/shared/lib/hooks/useTheme/useTheme'
import { Button, ButtonTheme } from '@/shared/ui'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo((props) => {
  const { className } = props
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
          theme={ButtonTheme.CLEAR}
          onClick={toggleTheme}
          className={classNames('', {}, [className])}>
      { theme === Theme.LIGHT ? <LightIcon /> : <DarkIcon /> }
    </Button>
  )
})

ThemeSwitcher.displayName = 'ThemeSwitcher'
