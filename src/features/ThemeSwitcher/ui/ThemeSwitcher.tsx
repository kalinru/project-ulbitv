import { memo, type FC, useCallback } from 'react'

import { saveUserSettings } from '@/entities/User'
import ThemeIconDeprecated from '@/shared/assets/icons/theme-light.svg'
import ThemeIcon from '@/shared/assets/icons/theme.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures/ToggleFeatures'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import useTheme from '@/shared/lib/hooks/useTheme/useTheme'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import { Icon } from '@/shared/ui/redesigned/Icon'

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
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Icon
          Svg={ThemeIcon}
          onClick={onToggleHandler}
          clickable
          className={classNames('', {}, [className])}
        />
      }
      off={
        <Button
          theme={ButtonTheme.CLEAR}
          onClick={onToggleHandler}
          className={classNames('', {}, [className])}
        >
          <IconDeprecated Svg={ThemeIconDeprecated} width={40} height={40} />
        </Button>
      }
    />
  )
})

ThemeSwitcher.displayName = 'ThemeSwitcher'
