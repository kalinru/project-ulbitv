import { memo, type FC } from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/redesigned/Stack'

import { type IComment } from '../../model/types/comment'
import { CommentCard } from '../CommentCard/CommentCard'

interface CommentListProps {
  className?: string
  comments?: IComment[]
  isLoading?: boolean
}

export const CommentList: FC<CommentListProps> = memo(
  ({ className, comments, isLoading }) => {
    const { t } = useTranslation()

    if (isLoading) {
      return (
        <VStack gap="16" max className={classNames('', {}, [className])}>
          <CommentCard isLoading className={''} />
          <CommentCard isLoading className={''} />
          <CommentCard isLoading className={''} />
        </VStack>
      )
    }

    return (
      <VStack gap="16" max className={classNames('', {}, [className])}>
        {comments?.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            isLoading={isLoading}
          />
        ))}
        {!comments?.length && t('Нет комментариев')}
      </VStack>
    )
  },
)

CommentList.displayName = 'CommentList'
