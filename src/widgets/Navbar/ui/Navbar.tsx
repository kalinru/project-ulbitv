import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AppLink, AppLinkTheme, Button, ButtonTheme } from 'shared/ui'
import { LoginModal } from 'features/AuthByUsername'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthData, userActions } from 'entities/User'
import { Text, TextSize, TextStyle } from 'shared/ui/Text/Text'
import { RoutePath } from 'shared/config/routerConfig/routerConfig'

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false)
  const { t } = useTranslation()
  const authData = useSelector(getUserAuthData)
  const dispatch = useDispatch()

  const onCloseModal = useCallback(() => {
    setIsAuthModalOpened(false)
  }, [])

  const onOpenModal = useCallback(() => {
    setIsAuthModalOpened(true)
  }, [])

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <Text className={cls.appName} style={TextStyle.SECONDARY} size={TextSize.XL}>
          {t('Articles App')}
        </Text>
        <AppLink to={RoutePath.article_create} theme={AppLinkTheme.SECONDARY}>
          {t('Добавить статью')}
        </AppLink>
        <Button className={cls.links}
                theme={ButtonTheme.OUTLINE}
                onClick={onLogout}>
          { t('Выйти') }
        </Button>
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
