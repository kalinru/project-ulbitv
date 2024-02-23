import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from '@/app/providers/StoreProvider'
import { ArticleType, type IArticle } from '@/entities/Article'
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams'
import {
  getArticlesPageLimit,
  getArticlesPageNumber,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType
} from '../../selectors/articlesPageSelectors'

interface FetchArticlesProps {
  replace?: boolean
}

export const fetchArticles =
createAsyncThunk<IArticle[], FetchArticlesProps, ThunkConfig<string>>(
  'articlesPage/fetchArticles',
  async ({ replace }, { extra, rejectWithValue, getState }) => {
    const limit = getArticlesPageLimit(getState())
    const sort = getArticlesPageSort(getState())
    const order = getArticlesPageOrder(getState())
    const search = getArticlesPageSearch(getState())
    const page = getArticlesPageNumber(getState())
    const type = getArticlesPageType(getState())

    try {
      addQueryParams({
        sort, order, search, type
      })
      const response = await extra.api.get<IArticle[]>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
          q: search,
          type: type === ArticleType.ALL ? undefined : type
        }
      })
      const data = response.data

      if (!data) {
        throw new Error()
      }

      return data
    } catch (e) {
      return rejectWithValue('error')
    }
  }
)
