import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import { type IComment } from '../../types/comment'

export const fetchArticleById =
createAsyncThunk<IComment, string, ThunkConfig<string>>(
  'articleDetails/fetchArticleById',
  async (articleId, { dispatch, extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<IComment>(`/comments/${articleId}`)
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
