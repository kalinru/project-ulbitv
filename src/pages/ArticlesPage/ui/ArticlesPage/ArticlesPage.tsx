import { memo, type FC, useCallback } from 'react'

import { useSearchParams } from 'react-router-dom'

import { ArticlePageGreeting } from '@/features/ArticlePageGreeting'
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ToggleFeatures } from '@/shared/lib/features'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Page } from '@/widgets/Page'

import { useArticleById } from '../../model/selectors/articlesPageSelectors'
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import { articlesPageReducer } from '../../model/slices/articlesPageSlice'
import { ArticleListWrapper } from '../ArticleListWrapper/ArticleListWrapper'
import { ArticlePageFilter } from '../ArticlePageFilter/ArticlePageFilter'
import { FiltersContainer } from '../FiltersContainer/FiltersContainer'
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer'

import cls from './ArticlesPage.module.scss'

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
}

const ArticlesPage: FC<ArticlesPageProps> = memo(({ className }) => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  const data = useArticleById('7')
  console.log(data)

  const onLoadNextPart = useCallback(() => {
    void dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useInitialEffect(() => {
    void dispatch(initArticlesPage(searchParams))
  })

  const content = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <StickyContentLayout
          content={
            <Page
              className={classNames(cls.ArticlesPageRedesigned, {}, [
                className,
              ])}
              onScrollEnd={onLoadNextPart}
              data-testid="ArticlesPage"
            >
              <ArticleListWrapper className={cls.list} />
              <ArticlePageGreeting />
            </Page>
          }
          left={<ViewSelectorContainer />}
          right={<FiltersContainer />}
        />
      }
      off={
        <Page
          className={classNames(cls.ArticlesPage, {}, [className])}
          onScrollEnd={onLoadNextPart}
          data-testid="ArticlesPage"
        >
          <ArticlePageFilter />
          <ArticleListWrapper className={cls.list} />
          <ArticlePageGreeting />
        </Page>
      }
    />
  )

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  )
})

ArticlesPage.displayName = 'ArticlesPage'

export default ArticlesPage
