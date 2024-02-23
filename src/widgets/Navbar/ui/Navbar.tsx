import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getUserAuthData } from '@/entities/User'
import { LoginModal } from '@/features/AuthByUsername'
import { AvatarDropdown } from '@/features/avatarDropdown'
import { NotificationButton } from '@/features/notificationButton'
import { RoutePath } from '@/shared/consts/router'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme, Button, ButtonTheme } from '@/shared/ui'
import { HStack } from '@/shared/ui/Stack'
import { Text, TextSize, TextStyle } from '@/shared/ui/Text'
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

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <Text className={cls.appName} style={TextStyle.SECONDARY} size={TextSize.XL}>
          {t('Articles App')}
        </Text>
        <AppLink to={RoutePath.article_create} theme={AppLinkTheme.SECONDARY}>
          {t('Добавить статью')}
        </AppLink>
        <HStack gap='16' className={cls.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    )
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <Button className={cls.links}
              theme={ButtonTheme.OUTLINE}
              onClick={onOpenModal}>
        { t('Войти') }
      </Button>
      {isAuthModalOpened &&
      <LoginModal isOpen={isAuthModalOpened}
                  onClose={onCloseModal}/>
      }
    </header>
  )
})

Navbar.displayName = 'Navbar'
