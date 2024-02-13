import cls from './SidebarItem.module.scss'
import { AppLink, AppLinkTheme } from 'shared/ui'
import { type ISidebarItem } from '../../model/types/sidebar'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User'

interface SidebarItemProps {
  item: ISidebarItem
  collapsed: boolean
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { Icon, path, text } = item
  const { t } = useTranslation()

  const isAuth = useSelector(getUserAuthData)

  if (item.authOnly && !isAuth) {
    return null
  }

  return (
    <AppLink to={path}
             theme={AppLinkTheme.SECONDARY}
             className={classNames(cls.item, { [cls.collapsed]: collapsed })}>
      <Icon className={cls.icon}/>
      <span className={cls.link}>{ t(text) }</span>
    </AppLink>
  )
})

SidebarItem.displayName = 'SidebarItem'
