import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import { RatingCard } from '@/entities/Rating'
import { getUserAuthData } from '@/entities/User'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'
import { Skeleton } from '@/shared/ui/deprecated/Skeleton'

import {
  useArticleRatings,
  useSetArticleRating,
} from '../../api/articleRatingApi'

export interface ArticleRatingProps {
  className?: string
  articleId: string
}

const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, articleId } = props
  const { t } = useTranslation()

  const authData = useAppSelector(getUserAuthData)
  const { isLoading, data: articleRatings } = useArticleRatings({
    userId: authData?.id ?? '',
    articleId,
  })
  const [setArticleRatingMutation] = useSetArticleRating()

  const rate = articleRatings?.[0]

  const setArticleRating = useCallback(
    (startCount: number, feedback?: string) => {
      void setArticleRatingMutation({
        articleId,
        rate: startCount,
        userId: authData?.id ?? '',
        feedback,
      })
    },
    [articleId, authData?.id, setArticleRatingMutation],
  )

  const onCancel = useCallback(
    (startCount: number) => {
      setArticleRating(startCount)
    },
    [setArticleRating],
  )

  const onAccept = useCallback(
    (startCount: number, feedback?: string) => {
      setArticleRating(startCount, feedback)
    },
    [setArticleRating],
  )

  if (isLoading) {
    return <Skeleton width={'100%'} height={120} />
  }

  return (
    <RatingCard
      className={className}
      title={t('Оцените статью')}
      feedbackTitle={t('Пожалуйста, напиши отзыв о статье')}
      hasFeedback
      rate={rate?.rate}
      onAccept={onAccept}
      onCancel={onCancel}
    />
  )
})

ArticleRating.displayName = 'ArticleRating'

export default ArticleRating
