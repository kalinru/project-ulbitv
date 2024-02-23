import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article'
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'

import { fetchArticles } from '../fetchArticles/fetchArticles'

import { fetchNextArticlesPage } from './fetchNextArticlesPage'

jest.mock('../fetchArticles/fetchArticles')

describe('fetchNextArticlesPage.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
        view: ArticleView.SMALL,
        order: 'asc',
        search: '',
        sort: ArticleSortField.CREATED,
        type: ArticleType.ALL,
        _inited: true
      }
    })

    await thunk.callThunk(undefined)

    expect(thunk.dispatch).toBeCalledTimes(4)
    expect(fetchArticles).toHaveBeenCalled()
  })
  test('fetchAritcleList not called', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false,
        view: ArticleView.SMALL,
        order: 'asc',
        search: '',
        sort: ArticleSortField.CREATED,
        type: ArticleType.ALL,
        _inited: true
      }
    })

    await thunk.callThunk(undefined)

    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(fetchArticles).not.toHaveBeenCalled()
  })
})
