import { createAsyncThunk } from '@reduxjs/toolkit'

import { type ThunkConfig } from '@/app/providers/StoreProvider'
import { type IArticle, type ArticleLike } from '@/entities/Article'

export const dislikeArticle = createAsyncThunk<
  IArticle,
  ArticleLike,
  ThunkConfig<string>
>('articles/dislike', async (articleLike, { extra, rejectWithValue }) => {
  try {
    await extra.api.delete(`/article_likes/${articleLike.id}`)

    const response = await extra.api.get(`/articles/${articleLike.articleId}`, {
      params: {
        _expand: 'user',
        _embed: 'article_likes',
      },
    })

    return response.data
  } catch (e) {
    return rejectWithValue('error')
  }
})
