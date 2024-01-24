import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { memo, useState } from 'react'
import { Button, ButtonTheme, ThemeSwitcher } from 'shared/ui'
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher'
import { ButtonSize } from 'shared/ui/Button/Button'
import { SidebaarItemsList } from 'widgets/Sidebar/model/items'
import { SidebarItem } from '../SidebarItem/SidebarItem'

interface SidebarProps {
  className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)

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
        {SidebaarItemsList.map((item) => (
          <SidebarItem key={item.path}
                       collapsed={collapsed}
                       item={item}/>
        ))}
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed}/>
      </div>
    </div>
  )
})

Sidebar.displayName = 'Sidebar'
