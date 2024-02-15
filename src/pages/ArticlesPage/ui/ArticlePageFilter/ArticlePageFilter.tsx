import { memo, type FC, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlePageFilter.module.scss'
import {
  type ArticleView,
  ArticleViewSelector,
  type ArticleSortField,
  ArticleSortSelector,
  ArticleTypeTabs,
  type ArticleType
} from 'entities/Article'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useAppSelector } from 'app/providers/StoreProvider/config/store'
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView
} from '../../model/selectors/articlesPageSelectors'
import { articlesPageActions } from '../../model/slices/articlesPageSlice'
import { useTranslation } from 'react-i18next'
import { Card } from 'shared/ui/Card/Card'
import { Input } from 'shared/ui/Input/Input'

import { type SortOrder } from 'shared/types'
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles'
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce'

interface ArticlePageFilterProps {
  className?: string
}

export const ArticlePageFilter: FC<ArticlePageFilterProps> = memo(({ className }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const view = useAppSelector(getArticlesPageView)
  const sort = useAppSelector(getArticlesPageSort)
  const order = useAppSelector(getArticlesPageOrder)
  const search = useAppSelector(getArticlesPageSearch)
  const type = useAppSelector(getArticlesPageType)

  const fetchData = useCallback(() => {
    void dispatch(fetchArticles({ replace: true }))
  }, [dispatch])

  const debouncedFetchData = useDebounce(fetchData, 500)

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view))
  }, [dispatch])

  const onChangeOrder = useCallback((order: SortOrder) => {
    dispatch(articlesPageActions.setOrder(order))
    dispatch(articlesPageActions.setPage(1))
    fetchData()
  }, [dispatch, fetchData])

  const onChangeSort = useCallback((sort: ArticleSortField) => {
    dispatch(articlesPageActions.setSort(sort))
    dispatch(articlesPageActions.setPage(1))
    fetchData()
  }, [dispatch, fetchData])

  const onChangeSearch = useCallback((search: string) => {
    dispatch(articlesPageActions.setSearch(search))
    dispatch(articlesPageActions.setPage(1))
    debouncedFetchData()
  }, [dispatch, debouncedFetchData])

  const onChangeType = useCallback((type: ArticleType) => {
    dispatch(articlesPageActions.setType(type))
    dispatch(articlesPageActions.setPage(1))
    fetchData()
  }, [dispatch, fetchData])

  return (
    <div className={classNames(cls.ArticlePageFilter, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector order={order}
                             sort={sort}
                             onChangeOrder={onChangeOrder}
                             onChangeSort={onChangeSort}/>
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={cls.search}>
        <Input placeholder={t('Поиск')} onChange={onChangeSearch} value={search} />
      </Card>
      <ArticleTypeTabs value={type} onChangeType={onChangeType} className={cls.types}/>
    </div>
  )
})

ArticlePageFilter.displayName = 'ArticlePageFilter'
