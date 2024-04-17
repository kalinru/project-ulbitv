import { createAsyncThunk } from '@reduxjs/toolkit'

import { type ThunkConfig } from '@/app/providers/StoreProvider'
import { type IArticle } from '@/entities/Article'

export const likeArticle = createAsyncThunk<
  IArticle,
  { articleId: string; userId: string },
  ThunkConfig<string>
>(
  'articles/like',
  async ({ articleId, userId }, { extra, rejectWithValue }) => {
    try {
      await extra.api.post('/article_likes', {
        userId,
        articleId,
      })

      const response = await extra.api.get(`/articles/${articleId}`, {
        params: {
          _expand: 'user',
          _embed: 'article_likes',
        },
      })

      return response.data
    } catch (e) {
      return rejectWithValue('error')
    }
  },
)
