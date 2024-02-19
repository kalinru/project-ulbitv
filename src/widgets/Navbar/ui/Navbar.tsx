import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AppLink, AppLinkTheme, Button, ButtonTheme } from 'shared/ui'
import { LoginModal } from 'features/AuthByUsername'
import { useDispatch, useSelector } from 'react-redux'
import { getIsUserAdmin, getIsUserManager, getUserAuthData, userActions } from 'entities/User'
import { Text, TextSize, TextStyle } from 'shared/ui/Text/Text'
import { RoutePath } from 'shared/config/routerConfig/routerConfig'
import { Dropdown } from 'shared/ui/Dropdown/Dropdown'
import { Avatar } from 'shared/ui/Avatar/Avatar'

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const authData = useSelector(getUserAuthData)
  const isAdmin = useSelector(getIsUserAdmin)
  const isManager = useSelector(getIsUserManager)

  const isAdminPanelAvailable = isAdmin || isManager

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
        <Dropdown trigger={<Avatar src={authData.avatar} size={30}/>}
                  direction='bottom left'
                  className={cls.dropdown}
                  items={[
                    ...(isAdminPanelAvailable
                      ? [{
                          content: t('Админка'),
                          href: RoutePath.admin_panel
                        }]
                      : []),
                    {
                      content: t('Профиль'),
                      href: RoutePath.profile + authData.id
                    },
                    {
                      content: t('Выйти'),
                      onClick: onLogout
                    }
                  ]} />
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
