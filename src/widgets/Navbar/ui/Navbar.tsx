import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonTheme } from 'shared/ui'
import { LoginModal } from 'features/AuthByUsername'

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false)
  const { t } = useTranslation()

  const onCloseModal = useCallback(() => {
    setIsAuthModalOpened(false)
  }, [])

  const onOpenModal = useCallback(() => {
    setIsAuthModalOpened(true)
  }, [])

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button className={cls.links}
              theme={ButtonTheme.OUTLINE}
              onClick={onOpenModal}>
        { t('Войти') }
      </Button>
      <LoginModal isOpen={isAuthModalOpened}
                  onClose={onCloseModal}/>
    </div>
  )
}
