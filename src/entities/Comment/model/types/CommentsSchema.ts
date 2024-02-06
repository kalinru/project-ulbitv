import { type IComment } from './comment'

export interface ArticleDetailsSchema {
  isLoading: boolean
  error?: string
  data?: IComment
}
