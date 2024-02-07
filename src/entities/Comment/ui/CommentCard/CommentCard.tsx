import { memo, type FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CommentCard.module.scss'
import { type IComment } from '../../model/types/comment'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Text } from 'shared/ui/Text/Text'
import { Skeleton } from 'shared/ui/Skeleton'
import { AppLink } from 'shared/ui'
import { RoutePath } from 'shared/config/routerConfig/routerConfig'

interface CommentCardProps {
  className?: string
  comment?: IComment
  isLoading?: boolean
}

export const CommentCard: FC<CommentCardProps> = memo(({ className, comment, isLoading }) => {
  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} border='50%' />
          <Skeleton height={16} width={100} className={cls.commentUser} />
        </div>
        <Skeleton width={'100%'} height={40} className={cls.commentText} />
      </div>
    )
  }

  if (!comment) {
    return null
  }

  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={cls.header}>
        {comment.user.avatar && (
          <Avatar size={20} src={comment.user.avatar} />
        )}
        <Text className={cls.commentUser}>{comment.user.username}</Text>
      </AppLink>
      <div className={cls.commentText}>
        <Text>{comment.text}</Text>
      </div>
    </div>
  )
})

CommentCard.displayName = 'CommentCard'
