import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import cls from './ArticleRecommendationsList.module.scss'
import { memo } from 'react'
import { Text, TextSize, TextStyle } from '@/shared/ui/Text'
import { ArticleList } from '@/entities/Article'
import { VStack } from '@/shared/ui/Stack'
import {
  useGetArticleRecommendationsListQuery
} from '../../api/articleRecommendationsApi'

interface ArticleRecommendationsListProps {
  className?: string
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
  const { className } = props
  const { t } = useTranslation()

  const { isLoading, data: recommendations, error } = useGetArticleRecommendationsListQuery(4)

  if (isLoading || !recommendations || error) {
    return null
  }

  return (
    <VStack gap='8' className={classNames(cls.ArticleRecommendationsList, {}, [className])}>
      <Text className={cls.commentTitle}
              size={TextSize.XL}
              style={TextStyle.SECONDARY}>
        {t('Рекомендуем')}
      </Text>
      <ArticleList articles={recommendations}
                   isLoading={isLoading}
                   target='_blank'
                   className={cls.recommendations} />
    </VStack>
  )
})

ArticleRecommendationsList.displayName = 'ArticleRecommendationsList'
