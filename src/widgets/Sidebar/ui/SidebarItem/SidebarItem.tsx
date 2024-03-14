import { memo } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getUserAuthData } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures/ToggleFeatures'
import {
  AppLink as AppLinkDeprecated,
  AppLinkTheme,
} from '@/shared/ui/deprecated/AppLink'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { Icon } from '@/shared/ui/redesigned/Icon'

import { type ISidebarItem } from '../../model/types/sidebar'

import cls from './SidebarItem.module.scss'

interface SidebarItemProps {
  item: ISidebarItem
  collapsed: boolean
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { Icon: ItemIcon, path, text } = item
  const { t } = useTranslation()

  const isAuth = useSelector(getUserAuthData)

  if (item.authOnly && !isAuth) {
    return null
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <AppLink
          to={path}
          className={classNames(cls.itemRedesigned, {
            [cls.collapsedRedesigned]: collapsed,
          })}
          activeClassName={cls.active}
        >
          <Icon Svg={ItemIcon} />
          <span className={cls.link}>{t(text)}</span>
        </AppLink>
      }
      off={
        <AppLinkDeprecated
          to={path}
          theme={AppLinkTheme.SECONDARY}
          className={classNames(cls.item, { [cls.collapsed]: collapsed })}
        >
          <ItemIcon className={cls.icon} />
          <span className={cls.link}>{t(text)}</span>
        </AppLinkDeprecated>
      }
    />
  )
})

SidebarItem.displayName = 'SidebarItem'
