import { memo, type FC, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import {
  getIsUserAdmin,
  getIsUserManager,
  getUserAuthData,
  userActions,
} from '@/entities/User'
import { RoutePath } from '@/shared/consts/router'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ToggleFeatures } from '@/shared/lib/features'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar'
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { Dropdown } from '@/shared/ui/redesigned/Popups'

interface avatarDropdownProps {
  className?: string
}

export const AvatarDropdown: FC<avatarDropdownProps> = memo(({ className }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const authData = useSelector(getUserAuthData)
  const isAdmin = useSelector(getIsUserAdmin)
  const isManager = useSelector(getIsUserManager)

  const isAdminPanelAvailable = isAdmin || isManager

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  if (!authData) {
    return null
  }

  const items = [
    ...(isAdminPanelAvailable
      ? [
          {
            content: t('Админка'),
            href: RoutePath.admin_panel(),
          },
        ]
      : []),
    {
      content: t('Профиль'),
      href: RoutePath.profile(authData.id),
    },
    {
      content: t('Выйти'),
      onClick: onLogout,
    },
  ]

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Dropdown
          trigger={<Avatar src={authData.avatar} size={40} />}
          direction="bottom left"
          className={classNames('', {}, [className])}
          items={items}
        />
      }
      off={
        <DropdownDeprecated
          trigger={
            <AvatarDeprecated
              src={authData.avatar}
              size={30}
              fallbackInverted
            />
          }
          direction="bottom left"
          className={classNames('', {}, [className])}
          items={items}
        />
      }
    />
  )
})

AvatarDropdown.displayName = 'AvatarDropdown'
