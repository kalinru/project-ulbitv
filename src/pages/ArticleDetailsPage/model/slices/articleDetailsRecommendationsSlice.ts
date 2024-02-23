import {
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit'

import { type StateSchema } from '@/app/providers/StoreProvider'
import { type IArticle } from '@/entities/Article'

import {
  fetchArticleRecommendations
} from '../services/fetchArticleRecommendations/fetchArticleRecommendations'
import {
  type IArticleDetailsRecommendationsSchema
} from '../types/ArticleDetailsRecommendationsSchema'

const recommendationsAdapter = createEntityAdapter<IArticle>({
  selectId: (article: IArticle) => article.id
})

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsPage?.recommendations ?? recommendationsAdapter.getInitialState()
)

const articleDetailsRecommendationsSlice = createSlice({
  name: 'articleDetailsRecommendations',
  initialState: recommendationsAdapter.getInitialState<IArticleDetailsRecommendationsSchema>({
    entities: {},
    ids: [],
    error: undefined,
    isLoading: false
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
        state.isLoading = false
        recommendationsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { actions: articleDetailsRecommendationsActions } = articleDetailsRecommendationsSlice
export const { reducer: articleDetailsRecommendationsReducer } = articleDetailsRecommendationsSlice
