import { memo, type FC, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button } from 'shared/ui'
import { RoutePath } from 'shared/config/routerConfig/routerConfig'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from 'app/providers/StoreProvider/config/store'
import { getCanEditArticle } from '../../model/selectors/article'
import { getArticleDetailsData } from 'entities/Article'
import { HStack } from 'shared/ui/Stack'

interface ArticleDetailsPageHeaderProps {
  className?: string
}

export const ArticleDetailsPageHeader: FC<ArticleDetailsPageHeaderProps> = memo(({ className }) => {
  const { t } = useTranslation('article-details')
  const navigate = useNavigate()
  const canEdit = useAppSelector(getCanEditArticle)
  const article = useAppSelector(getArticleDetailsData)

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles)
  }, [navigate])

  const onEditArticle = useCallback(() => {
    navigate(RoutePath.articles + '/' + article?.id + '/edit')
  }, [article?.id, navigate])

  return (
    <HStack gap='16' max justify='between'
            className={classNames('', {}, [className])}>
      <Button onClick={onBackToList}>{t('Назад')}</Button>
      {canEdit && (
        <Button onClick={onEditArticle}>{t('Редактировать')}</Button>
      )}
    </HStack>
  )
})

ArticleDetailsPageHeader.displayName = 'ArticleDetailsPageHeader'
