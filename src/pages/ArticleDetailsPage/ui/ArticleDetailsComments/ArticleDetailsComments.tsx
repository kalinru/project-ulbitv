import { memo, type FC, useCallback, Suspense } from 'react'

import { useTranslation } from 'react-i18next'

import { CommentList } from '@/entities/Comment'
import { AddCommentForm } from '@/features/addCommentForm'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Loader } from '@/shared/ui/deprecated/Loader'
import { Text, TextSize, TextStyle } from '@/shared/ui/deprecated/Text'
import { VStack } from '@/shared/ui/redesigned/Stack'

import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'

interface ArticleDetailsCommentsProps {
  className?: string
  id?: string
}

export const ArticleDetailsComments: FC<ArticleDetailsCommentsProps> = memo(
  ({ className, id }) => {
    const { t } = useTranslation('article-details')
    const dispatch = useAppDispatch()
    const comments = useAppSelector(getArticleComments.selectAll)
    const commentsIsLoading = useAppSelector(getArticleCommentsIsLoading)
    // const error = useAppSelector(getArticleCommentsError)

    const onSendComment = useCallback(
      (text: string) => {
        void dispatch(addCommentForArticle(text))
      },
      [dispatch],
    )

    useInitialEffect(() => {
      void dispatch(fetchCommentsByArticleId(id))
    }, [id])

    return (
      <VStack gap="16" max className={classNames('', {}, [className])}>
        <Text size={TextSize.XL} style={TextStyle.SECONDARY}>
          {t('Комментарии')}
        </Text>
        <Suspense fallback={<Loader />}>
          <AddCommentForm onSendComment={onSendComment} />
        </Suspense>
        <CommentList comments={comments} isLoading={commentsIsLoading} />
      </VStack>
    )
  },
)

ArticleDetailsComments.displayName = 'ArticleDetailsComments'
