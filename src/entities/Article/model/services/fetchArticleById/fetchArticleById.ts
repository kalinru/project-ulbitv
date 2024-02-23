import { createAsyncThunk } from '@reduxjs/toolkit'

import { type ThunkConfig } from '@/app/providers/StoreProvider'

import { type IArticle } from '../../types/article'

export const fetchArticleById =
createAsyncThunk<IArticle, string | undefined, ThunkConfig<string>>(
  'articleDetails/fetchArticleById',
  async (articleId, { dispatch, extra, rejectWithValue }) => {
    try {
      if (!articleId) {
        throw new Error('articleDetails/fetchArticleById: articleId = ' + articleId)
      }

      const response = await extra.api.get<IArticle>(`/articles/${articleId}`, {
        params: {
          _expand: 'user'
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
