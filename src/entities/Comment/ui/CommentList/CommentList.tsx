import { memo, type FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CommentList.module.scss'
import { type IComment } from '../../model/types/comment'
import { CommentCard } from '../CommentCard/CommentCard'
import { useTranslation } from 'react-i18next'

interface CommentListProps {
  className?: string
  comments?: IComment[]
  isLoading?: boolean
}

export const CommentList: FC<CommentListProps> = memo(({ className, comments, isLoading }) => {
  const { t } = useTranslation()
  comments?.forEach(c => { console.log(c) })
  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {comments?.map((comment) => (
        <CommentCard key={comment.id}
                     comment={comment}
                     isLoading={isLoading}
                     className={cls.comment} />
      ))}
      {!comments?.length && (
        t('Нет комментариев')
      )}
    </div>
  )
})

CommentList.displayName = 'CommentList'
