import { useCallback } from 'react'

import {
  type ArticleView,
  type ArticleSortField,
  type ArticleType,
} from '@/entities/Article'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'
import { type SortOrder } from '@/shared/types/sort'

import {
  getArticlesPageSort,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageType,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors'
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles'
import { articlesPageActions } from '../../model/slices/articlesPageSlice'

export const useArticleFilters = () => {
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

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view))
    },
    [dispatch],
  )
  const onChangeOrder = useCallback(
    (order: SortOrder) => {
      dispatch(articlesPageActions.setOrder(order))
      dispatch(articlesPageActions.setPage(1))
      fetchData()
    },
    [dispatch, fetchData],
  )

  const onChangeSort = useCallback(
    (sort: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(sort))
      dispatch(articlesPageActions.setPage(1))
      fetchData()
    },
    [dispatch, fetchData],
  )

  const onChangeSearch = useCallback(
    (search: string) => {
      dispatch(articlesPageActions.setSearch(search))
      dispatch(articlesPageActions.setPage(1))
      debouncedFetchData()
    },
    [dispatch, debouncedFetchData],
  )

  const onChangeType = useCallback(
    (type: ArticleType) => {
      dispatch(articlesPageActions.setType(type))
      dispatch(articlesPageActions.setPage(1))
      fetchData()
    },
    [dispatch, fetchData],
  )

  return {
    view,
    sort,
    order,
    search,
    type,
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeType,
    onChangeView,
  }
}
