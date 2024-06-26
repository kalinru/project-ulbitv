import { memo, useCallback, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getUserAuthData } from '@/entities/User'
import { LoginModal } from '@/features/AuthByUsername'
import { AvatarDropdown } from '@/features/AvatarDropdown'
import { NotificationButton } from '@/features/notificationButton'
import { RoutePath } from '@/shared/consts/router'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features'
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink'
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button'
import { Text, TextSize, TextStyle } from '@/shared/ui/deprecated/Text'
import { Button } from '@/shared/ui/redesigned/Button'
import { HStack } from '@/shared/ui/redesigned/Stack'

import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false)
  const { t } = useTranslation()

  const authData = useSelector(getUserAuthData)

  const onCloseModal = useCallback(() => {
    setIsAuthModalOpened(false)
  }, [])

  const onOpenModal = useCallback(() => {
    setIsAuthModalOpened(true)
  }, [])

  const mainClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => cls.NavbarRedesigned,
    off: () => cls.Navbar,
  })

  if (authData) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <header className={classNames(mainClass, {}, [className])}>
            <HStack gap="16" className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
        off={
          <header className={classNames(mainClass, {}, [className])}>
            <Text
              className={cls.appName}
              style={TextStyle.SECONDARY}
              size={TextSize.XL}
            >
              {t('Articles App')}
            </Text>
            <AppLink
              to={RoutePath.article_create()}
              theme={AppLinkTheme.SECONDARY}
            >
              {t('Добавить статью')}
            </AppLink>
            <HStack gap="16" className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
      />
    )
  }

  return (
    <header className={classNames(mainClass, {}, [className])}>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Button variant="outline" onClick={onOpenModal}>
            {t('Войти')}
          </Button>
        }
        off={
          <ButtonDeprecated
            className={cls.links}
            theme={ButtonTheme.OUTLINE}
            onClick={onOpenModal}
          >
            {t('Войти')}
          </ButtonDeprecated>
        }
      />
      <LoginModal isOpen={isAuthModalOpened} onClose={onCloseModal} />
    </header>
  )
})

Navbar.displayName = 'Navbar'
