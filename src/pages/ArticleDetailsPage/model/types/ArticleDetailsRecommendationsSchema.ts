import { type EntityState } from '@reduxjs/toolkit'
import { type IArticle } from '@/entities/Article'

export interface IArticleDetailsRecommendationsSchema extends EntityState<IArticle> {
  isLoading?: boolean
  error?: string
}
