import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonTheme } from 'shared/ui'
import { LoginModal } from 'features/AuthByUsername'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthData, userActions } from 'entities/User'

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
      <div className={classNames(cls.Navbar, {}, [className])}>
        <Button className={cls.links}
              theme={ButtonTheme.OUTLINE}
              onClick={onLogout}>
          { t('Выйти') }
        </Button>
      </div>
    )
  }

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button className={cls.links}
              theme={ButtonTheme.OUTLINE}
              onClick={onOpenModal}>
        { t('Войти') }
      </Button>
      {isAuthModalOpened &&
      <LoginModal isOpen={isAuthModalOpened}
                  onClose={onCloseModal}/>
      }
    </div>
  )
})

Navbar.displayName = 'Navbar'
