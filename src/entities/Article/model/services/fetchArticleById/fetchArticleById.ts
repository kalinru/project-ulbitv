import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import { type IArticle } from '../../types/article'

export const fetchArticleById =
createAsyncThunk<IArticle, string, ThunkConfig<string>>(
  'articleDetails/fetchArticleById',
  async (articleId, { dispatch, extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<IArticle>(`/articles/${articleId}`)
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
