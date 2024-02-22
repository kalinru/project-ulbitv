import { memo, type FC, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './avatarDropdown.module.scss'
import { Dropdown } from '@/shared/ui/Popups'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { RoutePath } from '@/shared/config/routerConfig/routerConfig'
import { useSelector } from 'react-redux'
import { getIsUserAdmin, getIsUserManager, getUserAuthData, userActions } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useTranslation } from 'react-i18next'

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

  return (
    <Dropdown trigger={<Avatar src={authData.avatar} size={30}/>}
              direction='bottom left'
              className={classNames(cls.avatarDropdown, {}, [className])}
              items={[
                ...(isAdminPanelAvailable
                  ? [{
                      content: t('Админка'),
                      href: RoutePath.admin_panel
                    }]
                  : []),
                {
                  content: t('Профиль'),
                  href: RoutePath.profile + authData.id
                },
                {
                  content: t('Выйти'),
                  onClick: onLogout
                }
              ]} />
  )
})

AvatarDropdown.displayName = 'AvatarDropdown'
