import { memo, type FC, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsPage.module.scss'
import { useTranslation } from 'react-i18next'
import { ArticleDetails, ArticleList } from 'entities/Article'
import { useNavigate, useParams } from 'react-router-dom'
import { Text, TextSize, TextStyle } from 'shared/ui/Text/Text'
import { CommentList } from 'entities/Comment'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
  getArticleComments
} from '../../model/slices/articleDetailsCommentsSlice'
import { useAppSelector } from 'app/providers/StoreProvider/config/store'
import {
  getArticleCommentsIsLoading,
  getArticleCommentsError
} from '../../model/selectors/comments'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import {
  fetchCommentsByArticleId
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { AddCommentForm } from 'features/addCommentForm'
import {
  addCommentForArticle
} from '../../model/services/addCommentForArticle/addCommentForArticle'
import { Button } from 'shared/ui'
import { RoutePath } from 'shared/config/routerConfig/routerConfig'
import { Page } from 'widgets/Page/Page'
import {
  getArticleRecommendations
} from 'pages/ArticleDetailsPage/model/slices/articleDetailsRecommendationsSlice'
import {
  fetchArticleRecommendations
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations'
import { articleDetailsPageReducer } from '../../model/slices'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = memo(({ className }) => {
  const { t } = useTranslation('article-details')
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const comments = useAppSelector(getArticleComments.selectAll)
  const commentsIsLoading = useAppSelector(getArticleCommentsIsLoading)
  const error = useAppSelector(getArticleCommentsError)
  const recommendations = useAppSelector(getArticleRecommendations.selectAll)
  const recommendationsIsLoading = useAppSelector(getArticleCommentsIsLoading)

  const onSendComment = useCallback((text: string) => {
    void dispatch(addCommentForArticle(text))
  }, [dispatch])

  useInitialEffect(() => {
    void dispatch(fetchCommentsByArticleId(id))
    void dispatch(fetchArticleRecommendations())
  }, [id])

  if (!id) {
    return (
      <Wrapper className={className}>
        { t('Статья не найдена') }
      </Wrapper>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Wrapper className={className}>
        <ArticleDetailsPageHeader />
        <ArticleDetails id={id} />
        <Text className={cls.commentTitle}
              size={TextSize.XL}
              style={TextStyle.SECONDARY}>
          {t('Рекомендуем')}
        </Text>
        <ArticleList articles={recommendations}
                     isLoading={recommendationsIsLoading}
                     target='_blank'
                     className={cls.recommendations} />
        <Text className={cls.commentTitle}
              size={TextSize.XL}
              style={TextStyle.SECONDARY}>
          {t('Комментарии')}
        </Text>
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList comments={comments} isLoading={commentsIsLoading} />
      </Wrapper>
    </DynamicModuleLoader>
  )
})

const Wrapper: FC<ArticleDetailsPageProps> = ({ children, className }) => {
  return (
    <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      {children}
    </Page>
  )
}

ArticleDetailsPage.displayName = 'ArticleDetailsPage'

export default ArticleDetailsPage
