import { memo, type FC, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { getArticleDetailsData } from '@/entities/Article'
import { RoutePath } from '@/shared/consts/router'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'
import { Button } from '@/shared/ui/deprecated/Button/Button'
import { HStack } from '@/shared/ui/redesigned/Stack'

import { getCanEditArticle } from '../../model/selectors/article'

interface ArticleDetailsPageHeaderProps {
  className?: string
}

export const ArticleDetailsPageHeader: FC<ArticleDetailsPageHeaderProps> = memo(
  ({ className }) => {
    const { t } = useTranslation('article-details')
    const navigate = useNavigate()
    const canEdit = useAppSelector(getCanEditArticle)
    const article = useAppSelector(getArticleDetailsData)

    const onBackToList = useCallback(() => {
      navigate(RoutePath.articles())
    }, [navigate])

    const onEditArticle = useCallback(() => {
      if (!article?.id) {
        return
      }
      navigate(RoutePath.article_edit(article.id))
    }, [article?.id, navigate])

    return (
      <HStack
        gap="16"
        max
        justify="between"
        className={classNames('', {}, [className])}
      >
        <Button onClick={onBackToList}>{t('Назад')}</Button>
        {canEdit && (
          <Button onClick={onEditArticle}>{t('Редактировать')}</Button>
        )}
      </HStack>
    )
  },
)

ArticleDetailsPageHeader.displayName = 'ArticleDetailsPageHeader'
