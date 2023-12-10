import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { Modal } from 'shared/ui/Modal/Modal'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonTheme } from 'shared/ui'

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false)
  const { t } = useTranslation()

  const toggleAuthModal = useCallback(() => {
    setIsAuthModalOpened(prev => !prev)
  }, [])

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button className={cls.links}
              theme={ButtonTheme.OUTLINE}
              onClick={toggleAuthModal}>
        { t('Войти') }
      </Button>
      <Modal isOpen={isAuthModalOpened}
             onClose={toggleAuthModal}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, veritatis. Fuga iure praesentium rem asperiores aspernatur, ratione provident, nemo nisi quas dignissimos suscipit. Ducimus sit unde sed id laudantium inventore.
      </Modal>
    </div>
  )
}
