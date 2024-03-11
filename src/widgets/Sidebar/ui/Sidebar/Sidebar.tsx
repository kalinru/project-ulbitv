import { memo, useMemo, useState } from 'react'

import { LangSwitcher } from '@/features/LangSwitcher'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures/ToggleFeatures'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'
import { Button, ButtonTheme } from '@/shared/ui'
import { AppLogo } from '@/shared/ui/AppLogo'
import { ButtonSize } from '@/shared/ui/Button'
import { VStack } from '@/shared/ui/Stack'

import { getSidebarItems } from '../../model/selectors/getSidebarItems'
import { SidebarItem } from '../SidebarItem/SidebarItem'

import cls from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const items = useAppSelector(getSidebarItems)

  const onToggle = () => {
    setCollapsed((value) => !value)
  }

  const itemsElement = useMemo(
    () =>
      items.map((item) => (
        <SidebarItem key={item.path} collapsed={collapsed} item={item} />
      )),
    [collapsed, items],
  )

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <aside
          className={classNames(
            cls.SidebarRedesigned,
            { [cls.collapsed]: collapsed },
            [className],
          )}
          data-testid="sidebar"
        >
          <AppLogo className={cls.appLogo} />
          <Button
            onClick={onToggle}
            theme={ButtonTheme.BACKGROUND_INVERTED}
            style={{ color: 'white' }}
            className={cls.collapsedBtn}
            square
            size={ButtonSize.L}
            data-testid="sidebar-toggle"
          >
            {collapsed ? '>' : '<'}
          </Button>
          <VStack role="navigation" className={cls.items} gap="8">
            {itemsElement}
          </VStack>
          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} />
          </div>
        </aside>
      }
      off={
        <aside
          className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
            className,
          ])}
          data-testid="sidebar"
        >
          <Button
            onClick={onToggle}
            theme={ButtonTheme.BACKGROUND_INVERTED}
            style={{ color: 'white' }}
            className={cls.collapsedBtn}
            square
            size={ButtonSize.L}
            data-testid="sidebar-toggle"
          >
            {collapsed ? '>' : '<'}
          </Button>
          <VStack role="navigation" className={cls.items} gap="8">
            {itemsElement}
          </VStack>
          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} />
          </div>
        </aside>
      }
    />
  )
})

Sidebar.displayName = 'Sidebar'
