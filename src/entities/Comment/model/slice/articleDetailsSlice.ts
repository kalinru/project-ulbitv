import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type IComment } from '../types/comment'
import { type ArticleDetailsSchema } from '../types/CommentsSchema'
import { fetchCommentsByArticleId } from '../services/fetchArticleById/fetchArticleById'

const initialState: ArticleDetailsSchema = {
  isLoading: false,
  data: undefined,
  error: undefined
}

export const articleDetailsSlice = createSlice({
  name: 'articleDetails',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchCommentsByArticleId.fulfilled, (state, action: PayloadAction<IComment>) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { actions: articleDetailsActions } = articleDetailsSlice
export const { reducer: articleDetailsReducer } = articleDetailsSlice
