import { rtkApi } from '@/shared/api/rtkApi'
import { type Rating } from '@/entities/RatingCard'

interface GetArticleRatingArgs {
  userId: string
  articleId: string
}

interface SetArticleRatingArgs {
  userId: string
  articleId: string
  rate: number
  feedback?: string
}

const articleRatingsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRatings: build.query<Rating[], GetArticleRatingArgs>({
      query: ({ userId, articleId }) => ({
        url: '/article-ratings',
        params: {
          userId,
          articleId
        }
      })
    }),
    setArticleRating: build.mutation<undefined, SetArticleRatingArgs>({
      query: (args) => ({
        url: '/article-ratings',
        method: 'POST',
        body: args
      })
    })
  })
})

export const useArticleRatings = articleRatingsApi.useGetArticleRatingsQuery
export const useSetArticleRating = articleRatingsApi.useSetArticleRatingMutation
