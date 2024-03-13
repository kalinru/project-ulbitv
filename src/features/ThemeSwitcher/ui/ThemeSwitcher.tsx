import { memo, type FC, useCallback } from 'react'

import { saveUserSettings } from '@/entities/User'
import ThemeIcon from '@/shared/assets/icons/theme-light.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import useTheme from '@/shared/lib/hooks/useTheme/useTheme'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { Icon } from '@/shared/ui/deprecated/Icon'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo((props) => {
  const { className } = props
  const { toggleTheme } = useTheme()
  const dispatch = useAppDispatch()

  const onToggleHandler = useCallback(() => {
    toggleTheme((newTheme) => {
      void dispatch(saveUserSettings({ theme: newTheme }))
    })
  }, [dispatch, toggleTheme])

  return (
    <Button
      theme={ButtonTheme.CLEAR}
      onClick={onToggleHandler}
      className={classNames('', {}, [className])}
    >
      <Icon Svg={ThemeIcon} width={40} height={40} />
    </Button>
  )
})

ThemeSwitcher.displayName = 'ThemeSwitcher'
