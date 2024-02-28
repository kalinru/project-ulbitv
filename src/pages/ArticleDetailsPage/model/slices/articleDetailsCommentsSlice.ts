import {
  type PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'

import { type StateSchema } from '@/app/providers/StoreProvider'
import { type IComment } from '@/entities/Comment'

import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { type IArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema'

const commentsAdapter = createEntityAdapter<IComment>({
  selectId: (comment: IComment) => comment.id,
})

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) =>
    state.articleDetailsPage?.comments ?? commentsAdapter.getInitialState(),
)

const articleDetailsCommentsSlice = createSlice({
  name: 'articleDetailsComments',
  initialState: commentsAdapter.getInitialState<IArticleDetailsCommentsSchema>({
    entities: {},
    ids: [],
    error: undefined,
    isLoading: false,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(
        fetchCommentsByArticleId.fulfilled,
        (state, action: PayloadAction<IComment[]>) => {
          state.isLoading = false
          commentsAdapter.setAll(state, action.payload)
        },
      )
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { actions: articleDetailsCommentsActions } =
  articleDetailsCommentsSlice
export const { reducer: articleDetailsCommentsReducer } =
  articleDetailsCommentsSlice
