import { createAsyncThunk } from '@reduxjs/toolkit'

import { type ThunkConfig } from '@/app/providers/StoreProvider'
import { type IArticle } from '@/entities/Article'

export const fetchArticleRecommendations = createAsyncThunk<
  IArticle[],
  undefined,
  ThunkConfig<string>
>(
  'articleDetailsPage/fetchArticleRecommendations',
  async (_, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<IArticle[]>('/articles', {
        params: {
          _limit: 4,
        },
      })

      const data = response.data

      if (!data) {
        throw new Error()
      }

      return data
    } catch (e) {
      return rejectWithValue('error')
    }
  },
)
