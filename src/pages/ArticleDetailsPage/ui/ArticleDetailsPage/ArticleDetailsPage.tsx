import { memo, type FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsPage.module.scss'
import { useTranslation } from 'react-i18next'
import { ArticleDetails } from 'entities/Article'
import { useParams } from 'react-router-dom'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { Page } from 'widgets/Page/Page'
import { articleDetailsPageReducer } from '../../model/slices'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import { VStack } from 'shared/ui/Stack'
import { ArticleRecommendationsList } from 'features/articleRecommendationsList'
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = memo(({ className }) => {
  const { t } = useTranslation('article-details')
  const { id } = useParams<{ id: string }>()

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
        <ArticleRecommendationsList />
        <ArticleDetailsComments id={id} />
      </Wrapper>
    </DynamicModuleLoader>
  )
})

const Wrapper: FC<ArticleDetailsPageProps> = ({ children, className }) => {
  return (
    <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      <VStack gap='16' max>
        {children}
      </VStack>
    </Page>
  )
}

ArticleDetailsPage.displayName = 'ArticleDetailsPage'

export default ArticleDetailsPage
