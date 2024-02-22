import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from '@/app/providers/StoreProvider'
import { getUserAuthData } from '@/entities/User'
import { getArticleDetailsData } from '@/entities/Article/model/selectors/articleDetails'
import { type IComment } from '@/entities/Comment'
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId'

export const addCommentForArticle =
createAsyncThunk<IComment, string, ThunkConfig<string>>(
  'articleDetails/addCommentForArticle',
  async (text, { extra, rejectWithValue, getState, dispatch }) => {
    const userData = getUserAuthData(getState())
    const article = getArticleDetailsData(getState())

    if (!userData || !text || !article) {
      return rejectWithValue('no data')
    }

    try {
      const response = await extra.api.post<IComment>('/comments', {
        articleId: article.id,
        userId: userData.id,
        text
      })

      const comment = response.data
      if (!comment) {
        throw new Error()
      }

      void dispatch(fetchCommentsByArticleId(article.id))

      return comment
    } catch (e) {
      return rejectWithValue('error')
    }
  }
)
