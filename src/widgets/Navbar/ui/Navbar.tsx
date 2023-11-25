import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme, ThemeSwitcher } from 'shared/ui'

import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.links}>
        <AppLink to={'/'} theme={AppLinkTheme.SECONDARY}>Home</AppLink>
        <AppLink to={'/about'} theme={AppLinkTheme.SECONDARY}>About</AppLink>
      </div>
    </div>
  )
}
