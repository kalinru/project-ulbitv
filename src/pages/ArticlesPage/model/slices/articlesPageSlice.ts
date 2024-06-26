import {
  type PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'

import { type StateSchema } from '@/app/providers/StoreProvider'
import {
  type ArticleLike,
  ArticleView,
  type IArticle,
} from '@/entities/Article'
import { ArticleSortField, ArticleType } from '@/entities/Article'
import { likeArticle, dislikeArticle } from '@/features/LikeArticle'
import { ARTICLES_VIEW_LOCAL_STORAGE_KEY } from '@/shared/consts/localStorage'
import { type SortOrder } from '@/shared/types/sort'

import { fetchArticles } from '../services/fetchArticles/fetchArticles'
import { type ArticlesPageSchema } from '../types/articlesPageSchema'

const articlesAdapter = createEntityAdapter<IArticle>({
  selectId: (article: IArticle) => article.id,
})

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage ?? articlesAdapter.getInitialState(),
)

const articlesPageSlice = createSlice({
  name: 'articlesPage',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    entities: {},
    ids: [],
    error: undefined,
    isLoading: false,
    view: ArticleView.SMALL,
    page: 1,
    hasMore: true,
    _inited: false,
    sort: ArticleSortField.CREATED,
    search: '',
    order: 'asc',
    limit: 9,
    type: ArticleType.ALL,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload
      localStorage.setItem(ARTICLES_VIEW_LOCAL_STORAGE_KEY, action.payload)
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload
    },
    setArticle: (state, action: PayloadAction<IArticle>) => {
      articlesAdapter.setOne(state, action.payload)
    },
    initState: (state) => {
      const view =
        (localStorage.getItem(
          ARTICLES_VIEW_LOCAL_STORAGE_KEY,
        ) as ArticleView) ?? ArticleView.SMALL
      state.view = view
      state.limit = view === ArticleView.SMALL ? 9 : 4
      state._inited = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state, action) => {
        state.isLoading = true
        state.error = undefined
        if (action.meta.arg.replace) {
          articlesAdapter.removeAll(state)
        }
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false
        state.hasMore = action.payload.length >= state.limit

        if (action.meta.arg.replace) {
          articlesAdapter.setMany(state, action.payload)
        } else {
          articlesAdapter.addMany(state, action.payload)
        }
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      .addCase(likeArticle.pending, (state, action) => {
        const articleId = action.meta.arg.articleId
        const userId = action.meta.arg.userId
        const article = articlesAdapter
          .getSelectors()
          .selectById(state, articleId)
        if (!article) {
          return
        }
        const articleLikes: ArticleLike[] = [
          ...(article.article_likes ?? []),
          { articleId, userId, id: '' },
        ]
        articlesAdapter.setOne(state, {
          ...article,
          article_likes: articleLikes,
        })
      })
      .addCase(likeArticle.fulfilled, (state, action) => {
        const article = action.payload
        articlesAdapter.setOne(state, { ...article })
      })
      .addCase(likeArticle.rejected, (state, action) => {})

      .addCase(dislikeArticle.pending, (state, action) => {
        const articleId = action.meta.arg.articleId
        const userId = action.meta.arg.userId
        const article = articlesAdapter
          .getSelectors()
          .selectById(state, articleId)
        if (!article) {
          return
        }
        const articleLikes = article.article_likes?.filter(
          (like) => like.userId !== userId,
        )
        articlesAdapter.setOne(state, {
          ...article,
          article_likes: articleLikes,
        })
      })
      .addCase(dislikeArticle.fulfilled, (state, action) => {
        const article = action.payload
        articlesAdapter.setOne(state, { ...article })
      })
      .addCase(dislikeArticle.rejected, (state, action) => {})
  },
})

export const { actions: articlesPageActions } = articlesPageSlice
export const { reducer: articlesPageReducer } = articlesPageSlice
