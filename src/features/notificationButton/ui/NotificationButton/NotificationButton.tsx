import { memo, useState } from 'react'

import { NotificationList } from '@/entities/Notification'
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useIsMobile } from '@/shared/lib/hooks/useIsMobile/useIsMobile'
import { Button, ButtonTheme } from '@/shared/ui'
import { Drawer } from '@/shared/ui/Drawer'
import { Icon } from '@/shared/ui/Icon'
import { Popover } from '@/shared/ui/Popups'

import cls from './NotificationButton.module.scss'

interface NotificationButtonProps {
  className?: string
  inverted?: boolean
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className, inverted = true } = props
  //   const [isOpen, setIsOpen] = useState(false)

  //   const onOpenDrawer = useCallback(() => {
  //     setIsOpen(true)
  //   }, [])

  //   const onCloseDrawer = useCallback(() => {
  //     setIsOpen(false)
  //   }, [])

  //   const trigger = (
  //     <ToggleFeatures
  //             feature="isAppRedesigned"
  //             on={
  //               <Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />
  //             }
  //             off={
  //               <ButtonDeprecated
  //                     onClick={onOpenDrawer}
  //                     theme={ButtonTheme.CLEAR}
  //                 >
  //                 <IconDeprecated Svg={NotificationIconDeprecated} inverted />
  //               </ButtonDeprecated>
  //             }
  //         />
  //   )
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)

  const onCloseDrawer = () => {
    setIsOpen(false)
  }

  const onOpenDrawer = () => {
    setIsOpen(true)
  }

  const trigger = (
    <Button theme={ButtonTheme.CLEAR} onClick={onOpenDrawer}>
      <Icon Svg={NotificationIcon} inverted={inverted} />
    </Button>
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
        <Popover
          className={classNames(cls.NotificationButton, {}, [className])}
          direction="bottom left"
          trigger={trigger}
        >
          <NotificationList className={cls.notifications} />
        </Popover>
      )}
    </div>
  )
})

NotificationButton.displayName = 'NotificationButton'
