import { memo, type FC, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'
import { ArticleList } from 'entities/Article'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useAppSelector } from 'app/providers/StoreProvider/config/store'
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView
} from '../../model/selectors/articlesPageSelectors'
import {
  articlesPageReducer,
  getArticles
} from '../../model/slices/articlesPageSlice'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Page } from 'widgets/Page/Page'
import {
  fetchNextArticlesPage
} from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import { ArticlePageFilter } from '../ArticlePageFilter/ArticlePageFilter'
import { useSearchParams } from 'react-router-dom'

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer
}

const ArticlesPage: FC<ArticlesPageProps> = memo(({ className }) => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const view = useAppSelector(getArticlesPageView)
  const isLoading = useAppSelector(getArticlesPageIsLoading)
  const error = useAppSelector(getArticlesPageError)
  const articles = useAppSelector(getArticles.selectAll)

  const onLoadNextPart = useCallback(() => {
    void dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useInitialEffect(() => {
    void dispatch(initArticlesPage(searchParams))
  })

  if (error) {
    return <div>Error</div>
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page className={classNames(cls.ArticlesPage, {}, [className])} onScrollEnd={onLoadNextPart}>
        <ArticlePageFilter />
        <ArticleList className={cls.list}
                     articles={articles}
                     view={view}
                     isLoading={isLoading}/>
      </Page>
    </DynamicModuleLoader>
  )
})

ArticlesPage.displayName = 'ArticlesPage'

export default ArticlesPage
