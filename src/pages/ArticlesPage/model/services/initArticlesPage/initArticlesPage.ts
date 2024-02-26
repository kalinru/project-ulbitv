import { createAsyncThunk } from '@reduxjs/toolkit'

import { type ThunkConfig } from '@/app/providers/StoreProvider'
import { type ArticleType, type ArticleSortField } from '@/entities/Article'
import { type SortOrder } from '@/shared/types/sort'

import { getArticlesPageInited } from '../../selectors/articlesPageSelectors'
import { articlesPageActions } from '../../slices/articlesPageSlice'
import { fetchArticles } from '../fetchArticles/fetchArticles'

export const initArticlesPage =
createAsyncThunk<unknown, URLSearchParams, ThunkConfig<string>>(
  'articlesPage/initArticlesPage',
  async (searchParams, { getState, dispatch }) => {
    const inited = getArticlesPageInited(getState())

    if (!inited) {
      const order = searchParams.get('order') as SortOrder
      const sort = searchParams.get('sort') as ArticleSortField
      const search = searchParams.get('search')
      const type = searchParams.get('type') as ArticleType

      if (order) {
        dispatch(articlesPageActions.setOrder(order))
      }

      if (sort) {
        dispatch(articlesPageActions.setSort(sort))
      }

      if (search) {
        dispatch(articlesPageActions.setSearch(search))
      }

      if (type) {
        dispatch(articlesPageActions.setType(type))
      }

      dispatch(articlesPageActions.initState())
      void dispatch(fetchArticles({}))
    }
  }
)
