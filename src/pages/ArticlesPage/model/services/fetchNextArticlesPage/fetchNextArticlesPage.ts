import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from '@/app/providers/StoreProvider'
import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNumber
} from '../../selectors/articlesPageSelectors'
import { articlesPageActions } from '../../slices/articlesPageSlice'
import { fetchArticles } from '../fetchArticles/fetchArticles'

export const fetchNextArticlesPage =
createAsyncThunk<unknown, undefined, ThunkConfig<string>>(
  'articlesPage/fetchNextArticlesPage',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const page = getArticlesPageNumber(getState())
    const hasMore = getArticlesPageHasMore(getState())
    const isLoading = getArticlesPageIsLoading(getState())
    const nextPage = page + 1

    if (hasMore && !isLoading) {
      dispatch(articlesPageActions.setPage(nextPage))
      void dispatch(fetchArticles({}))
    }
  }
)
