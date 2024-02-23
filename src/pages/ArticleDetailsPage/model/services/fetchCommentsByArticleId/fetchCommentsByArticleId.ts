import { createAsyncThunk } from '@reduxjs/toolkit'

import { type ThunkConfig } from '@/app/providers/StoreProvider'
import { type IComment } from '@/entities/Comment'

export const fetchCommentsByArticleId =
createAsyncThunk<IComment[], string | undefined, ThunkConfig<string>>(
  'articleDetails/fetchCommentsByArticleId',
  async (articleId, { extra, rejectWithValue }) => {
    if (!articleId) {
      return rejectWithValue('no article id provided')
    }

    try {
      const response = await extra.api.get<IComment[]>('/comments', {
        params: {
          articleId,
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
