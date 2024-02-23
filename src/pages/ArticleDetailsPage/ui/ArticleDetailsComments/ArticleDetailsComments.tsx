import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'
import { CommentList } from '@/entities/Comment'
import { AddCommentForm } from '@/features/addCommentForm'
import {
  addCommentForArticle
} from '../../model/services/addCommentForArticle/addCommentForArticle'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import { memo, type FC, useCallback, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Text, TextSize, TextStyle } from '@/shared/ui/Text'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { VStack } from '@/shared/ui/Stack'
import { Loader } from '@/shared/ui'

interface ArticleDetailsCommentsProps {
  className?: string
  id?: string
}

export const ArticleDetailsComments: FC<ArticleDetailsCommentsProps> = memo(({ className, id }) => {
  const { t } = useTranslation('article-details')
  const dispatch = useAppDispatch()
  const comments = useAppSelector(getArticleComments.selectAll)
  const commentsIsLoading = useAppSelector(getArticleCommentsIsLoading)
  // const error = useAppSelector(getArticleCommentsError)

  const onSendComment = useCallback((text: string) => {
    void dispatch(addCommentForArticle(text))
  }, [dispatch])

  useInitialEffect(() => {
    void dispatch(fetchCommentsByArticleId(id))
  }, [id])

  return (
    <VStack gap='16' max className={classNames('', {}, [className])}>
      <Text size={TextSize.XL}
            style={TextStyle.SECONDARY}>
        {t('Комментарии')}
      </Text>
      <Suspense fallback={<Loader />}>
        <AddCommentForm onSendComment={onSendComment} />
      </Suspense>
      <CommentList comments={comments} isLoading={commentsIsLoading} />
    </VStack>
  )
})

ArticleDetailsComments.displayName = 'ArticleDetailsComments'
