import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { useState } from 'react'
import { AppLink, AppLinkTheme, Button, ButtonTheme, ThemeSwitcher } from 'shared/ui'
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher'
import { ButtonSize } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { RoutePath } from 'shared/config/routerConfig/routerConfig'
import AboutIcon from 'shared/assets/icons/about.svg'
import MainIcon from 'shared/assets/icons/home.svg'

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)

  const { t } = useTranslation()

  const onToggle = () => {
    setCollapsed(value => !value)
  }

  return (
    <div className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
         data-testid='sidebar'>
      <Button onClick={onToggle}
              theme={ButtonTheme.BACKGROUND_INVERTED}
              style={{ color: 'white' }}
              className={cls.collapsedBtn}
              square
              size={ButtonSize.L}
              data-testid='sidebar-toggle'>
        { collapsed ? '>' : '<' }
      </Button>
      <div className={cls.items}>
        <AppLink to={RoutePath.main}
                 theme={AppLinkTheme.SECONDARY}
                 className={cls.item}>
          <MainIcon className={cls.icon}/>
          <span className={cls.link}>{ t('Главная') }</span>
        </AppLink>
        <AppLink to={RoutePath.about}
                 theme={AppLinkTheme.SECONDARY}
                 className={cls.item}>
          <AboutIcon className={cls.icon}/>
          <span className={cls.link}>{ t('О сайте') }</span>
        </AppLink>
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed}/>
      </div>
    </div>
  )
}
