import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { ArticleList } from '@/entities/Article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ToggleFeatures } from '@/shared/lib/features'
import {
  Text as TextDeprecated,
  TextSize,
  TextStyle,
} from '@/shared/ui/deprecated/Text'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'

import { useGetArticleRecommendationsListQuery } from '../../api/articleRecommendationsApi'

import cls from './ArticleRecommendationsList.module.scss'

interface ArticleRecommendationsListProps {
  className?: string
}

export const ArticleRecommendationsList = memo(
  (props: ArticleRecommendationsListProps) => {
    const { className } = props
    const { t } = useTranslation()

    const {
      isLoading,
      data: recommendations,
      error,
    } = useGetArticleRecommendationsListQuery(4)

    if (isLoading || !recommendations || error) {
      return null
    }

    return (
      <VStack
        gap="8"
        className={classNames(cls.ArticleRecommendationsList, {}, [className])}
        data-testid="ArticleRecommendationsList"
      >
        <ToggleFeatures
          feature="isAppRedesigned"
          on={
            <Text className={cls.commentTitle} size="xl">
              {t('Рекомендуем')}
            </Text>
          }
          off={
            <TextDeprecated
              className={cls.commentTitle}
              size={TextSize.XL}
              style={TextStyle.SECONDARY}
            >
              {t('Рекомендуем')}
            </TextDeprecated>
          }
        />
        <ArticleList
          articles={recommendations}
          isLoading={isLoading}
          target="_blank"
          className={cls.recommendations}
        />
      </VStack>
    )
  },
)

ArticleRecommendationsList.displayName = 'ArticleRecommendationsList'
