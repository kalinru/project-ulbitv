import { memo, useMemo, useState } from 'react'

import { LangSwitcher } from '@/features/LangSwitcher'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ToggleFeatures } from '@/shared/lib/features'
import { Button, ButtonTheme, ButtonSize } from '@/shared/ui/deprecated/Button'
import { AppLogo } from '@/shared/ui/redesigned/AppLogo'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { VStack } from '@/shared/ui/redesigned/Stack'

import { useSidebarItems } from '../../model/selectors/getSidebarItems'
import { SidebarItem } from '../SidebarItem/SidebarItem'

import cls from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)

  // const items = useAppSelector(getSidebarItems)
  const items = useSidebarItems()

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
            { [cls.collapsedRedesigned]: collapsed },
            [className],
          )}
          data-testid="sidebar"
        >
          <AppLogo className={cls.appLogo} size={collapsed ? 30 : 50} />
          <VStack role="navigation" className={cls.items} gap="8">
            {itemsElement}
          </VStack>
          <Icon
            Svg={ArrowIcon}
            clickable
            onClick={onToggle}
            className={cls.collapseBtn}
            data-testid="sidebar-toggle"
          />
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
