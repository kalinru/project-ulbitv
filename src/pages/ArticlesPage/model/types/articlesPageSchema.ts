import { type EntityState } from '@reduxjs/toolkit'

import {
  type ArticleView,
  type IArticle,
  type ArticleType,
  type ArticleSortField,
} from '@/entities/Article'
import { type SortOrder } from '@/shared/types/sort'

export interface ArticlesPageSchema extends EntityState<IArticle> {
  isLoading?: boolean
  error?: string
  view: ArticleView

  //   pagination
  page: number
  hasMore: boolean
  limit: number

  // filters
  order: SortOrder
  sort: ArticleSortField
  search: string
  type: ArticleType

  _inited: boolean
}
