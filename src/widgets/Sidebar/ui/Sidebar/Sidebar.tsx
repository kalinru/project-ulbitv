import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { memo, useMemo, useState } from 'react'
import { Button, ButtonTheme, ThemeSwitcher } from 'shared/ui'
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher'
import { ButtonSize } from 'shared/ui/Button/Button'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { useAppSelector } from 'app/providers/StoreProvider/config/store'

interface SidebarProps {
  className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const items = useAppSelector(getSidebarItems)

  const onToggle = () => {
    setCollapsed(value => !value)
  }

  const itemsElement = useMemo(() => items.map((item) => (
    <SidebarItem key={item.path}
                 collapsed={collapsed}
                 item={item}/>
  )), [collapsed, items])

  return (
    <menu className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
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
        {itemsElement}
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed}/>
      </div>
    </menu>
  )
})

Sidebar.displayName = 'Sidebar'
