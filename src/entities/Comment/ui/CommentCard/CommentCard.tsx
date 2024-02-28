import { memo, type FC } from 'react'

import { RoutePath } from '@/shared/consts/router'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink } from '@/shared/ui'
import { Avatar } from '@/shared/ui/Avatar'
import { Skeleton } from '@/shared/ui/Skeleton'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import { type IComment } from '../../model/types/comment'

import cls from './CommentCard.module.scss'

interface CommentCardProps {
  className?: string
  comment?: IComment
  isLoading?: boolean
}

export const CommentCard: FC<CommentCardProps> = memo(({ className, comment, isLoading }) => {
  if (isLoading) {
    return (
      <VStack gap='8' max className={classNames(cls.CommentCard, {}, [className, cls.loading])}
      data-testid='CommentCard.Loading'>
        <div className={cls.header}>
          <Skeleton width={30} height={30} border='50%' />
          <Skeleton height={16} width={100} className={cls.commentUser} />
        </div>
        <Skeleton width={'100%'} height={40} className={cls.commentText} />
      </VStack>
    )
  }

  if (!comment) {
    return null
  }

  return (
    <VStack gap='8' max className={classNames(cls.CommentCard, {}, [className])}
            data-testid='CommentCard.Content'>
      <AppLink to={RoutePath.profile(comment.user.id)} className={cls.header}>
        {comment.user.avatar && (
          <Avatar size={20} src={comment.user.avatar} />
        )}
        <Text className={cls.commentUser}>{comment.user.username}</Text>
      </AppLink>
      <div className={cls.commentText}>
        <Text>{comment.text}</Text>
      </div>
    </VStack>
  )
})

CommentCard.displayName = 'CommentCard'
