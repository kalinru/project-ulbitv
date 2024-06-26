import { memo, useCallback, useState } from 'react'

import { NotificationList } from '@/entities/Notification'
import NotificationIconDeprecated from '@/shared/assets/icons/notification-20-20.svg'
import NotificationIcon from '@/shared/assets/icons/notification.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ToggleFeatures } from '@/shared/lib/features'
import { useIsMobile } from '@/shared/lib/hooks/useIsMobile/useIsMobile'
import {
  ButtonTheme,
  Button as ButtonDeprecated,
} from '@/shared/ui/deprecated/Button'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups'
import { Drawer } from '@/shared/ui/redesigned/Drawer'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { Popover } from '@/shared/ui/redesigned/Popups'

import cls from './NotificationButton.module.scss'

interface NotificationButtonProps {
  className?: string
  inverted?: boolean
}

// выводить количество непрочитанных уведомлений.
// Как то помечать непрочитанные.
// при выводе в область видимости (intersectionObserver) делать уведомление прочитаным
// и соответсвенно изменять кол-во непрочитанных и убирать пометку что непрочитано
// HPopover.unmount = true или вынести фетчинг данных сюда
export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true)
  }, [])

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false)
  }, [])

  const trigger = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />}
      off={
        <ButtonDeprecated onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
          <IconDeprecated Svg={NotificationIconDeprecated} inverted />
        </ButtonDeprecated>
      }
    />
  )

  const popover = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Popover
          className={classNames(cls.NotificationButton, {}, [className])}
          direction="bottom left"
          trigger={trigger}
        >
          <NotificationList className={cls.notifications} />
        </Popover>
      }
      off={
        <PopoverDeprecated
          className={classNames(cls.NotificationButton, {}, [className])}
          direction="bottom left"
          trigger={trigger}
        >
          <NotificationList className={cls.notifications} />
        </PopoverDeprecated>
      }
    />
  )

  return (
    <div>
      {isMobile ? (
        <>
          {trigger}
          <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
            <NotificationList />
          </Drawer>
        </>
      ) : (
        popover
      )}
    </div>
  )
})

NotificationButton.displayName = 'NotificationButton'
