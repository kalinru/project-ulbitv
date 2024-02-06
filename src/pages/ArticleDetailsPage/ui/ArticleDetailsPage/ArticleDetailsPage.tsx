import React, { memo, type FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsPage.module.scss'
import { useTranslation } from 'react-i18next'
import { ArticleDetails } from 'entities/Article'
import { useParams } from 'react-router-dom'
import { Text, TextSize, TextStyle } from 'shared/ui/Text/Text'
import { CommentList } from 'entities/Comment'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
  articleDetailsCommentsReducer, getArticleComments
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

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = memo(({ className }) => {
  const { t } = useTranslation('article-details')
  const { id } = useParams<{ id: string }>()

  const dispatch = useAppDispatch()
  const comments = useAppSelector(getArticleComments.selectAll)
  const commentsIsLoading = useAppSelector(getArticleCommentsIsLoading)
  const error = useAppSelector(getArticleCommentsError)

  useInitialEffect(() => {
    void dispatch(fetchCommentsByArticleId(id))
  })

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
        <ArticleDetails id={id} />
        <Text className={cls.commentTitle}
            size={TextSize.XL}
            style={TextStyle.SECONDARY}>
          {t('Комментарии')}
        </Text>
        <CommentList comments={comments} isLoading={commentsIsLoading}/>
      </Wrapper>
    </DynamicModuleLoader>
  )
})

const Wrapper: FC<ArticleDetailsPageProps> = ({ children, className }) => {
  return (
    <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      {children}
    </div>
  )
}

ArticleDetailsPage.displayName = 'ArticleDetailsPage'

export default ArticleDetailsPage
