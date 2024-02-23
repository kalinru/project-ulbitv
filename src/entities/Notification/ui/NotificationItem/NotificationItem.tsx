import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Card, CardTheme } from '@/shared/ui/Card'
import { Text } from '@/shared/ui/Text'

import { type Notification } from '../../model/types/notification'

import cls from './NotificationItem.module.scss'

interface NotificationItemProps {
  className?: string
  item: Notification
}

export const NotificationItem = memo(({ className, item }: NotificationItemProps) => {
  const content = (
    <Card className={classNames(cls.NotificationItem, {}, [className])}
          theme={CardTheme.OUTLINED}>
      <Text element='h5'>{item.title}</Text>
      <Text element='p'>{item.description}</Text>
    </Card>
  )

  if (item.href) {
    return (
      <a className={cls.link}
         target="_blank"
         href={item.href}
         rel="noreferrer">
        {content}
      </a>
    )
  }

  return content
})

NotificationItem.displayName = 'NotificationItem'
