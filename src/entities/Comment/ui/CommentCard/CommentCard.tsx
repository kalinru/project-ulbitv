import { memo, type FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CommentCard.module.scss'
import { type IComment } from '../../model/types/comment'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Text } from 'shared/ui/Text/Text'
import { Skeleton } from 'shared/ui/Skeleton'

interface CommentCardProps {
  className?: string
  comment: IComment
  isLoading?: boolean
}

export const CommentCard: FC<CommentCardProps> = memo(({ className, comment, isLoading }) => {
  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCard, {}, [className])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} border='50%' />
          <Skeleton height={16} width={100} className={cls.commentUser} />
        </div>
        <Skeleton width={'100%'} height={40} className={cls.commentText} />
      </div>
    )
  }

  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <div className={cls.header}>
        {comment.user.avatar && (
          <Avatar size={20} src={comment.user.avatar} />
        )}
        <Text className={cls.commentUser}>{comment.user.username}</Text>
      </div>
      <div className={cls.commentText}>
        <Text>{comment.text}</Text>
      </div>
    </div>
  )
})

CommentCard.displayName = 'CommentCard'
