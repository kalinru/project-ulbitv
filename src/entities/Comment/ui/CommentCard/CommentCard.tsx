import { memo, type FC } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './CommentCard.module.scss'
import { type IComment } from '../../model/types/comment'
import { Avatar } from '@/shared/ui/Avatar'
import { Text } from '@/shared/ui/Text'
import { Skeleton } from '@/shared/ui/Skeleton'
import { AppLink } from '@/shared/ui'
import { RoutePath } from '@/shared/consts/router'
import { VStack } from '@/shared/ui/Stack'

interface CommentCardProps {
  className?: string
  comment?: IComment
  isLoading?: boolean
}

export const CommentCard: FC<CommentCardProps> = memo(({ className, comment, isLoading }) => {
  if (isLoading) {
    return (
      <VStack gap='8' max className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
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
    <VStack gap='8' max className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={cls.header}>
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
