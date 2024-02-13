import { type IArticleDetailsCommentsSchema } from './ArticleDetailsCommentsSchema'
import { type IArticleDetailsRecommendationsSchema } from './ArticleDetailsRecommendationsSchema'

export interface ArticleDetailsPageSchema {
  comments: IArticleDetailsCommentsSchema
  recommendations: IArticleDetailsRecommendationsSchema
}
