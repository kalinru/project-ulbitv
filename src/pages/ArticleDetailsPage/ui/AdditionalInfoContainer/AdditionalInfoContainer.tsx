import { memo, useCallback } from 'react'

import { useNavigate } from 'react-router-dom'

import { getArticleDetailsData } from '@/entities/Article'
import { RoutePath } from '@/shared/consts/router'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'
import { Card } from '@/shared/ui/redesigned/Card'
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo'

import { getCanEditArticle } from '../../model/selectors/article'

import cls from './AdditionalInfoContainer.module.scss'

export const AdditionalInfoContainer = memo(() => {
  const article = useAppSelector(getArticleDetailsData)
  const canEdit = useAppSelector(getCanEditArticle)

  const navigate = useNavigate()

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(RoutePath.article_edit(article.id))
    }
  }, [article, navigate])

  if (!article) {
    return null
  }

  return (
    <Card padding="24" border="partial" className={cls.card}>
      <ArticleAdditionalInfo
        canEdit={canEdit}
        onEdit={onEditArticle}
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
      />
    </Card>
  )
})

AdditionalInfoContainer.displayName = 'AdditionalInfoContainer'
