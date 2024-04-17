import { type User } from '@/entities/User'

import { type IArticle } from '../types/article'

export const getArticleLikesCount = (article?: IArticle): number =>
  article?.article_likes?.length ?? 0

export const getIsLiked = (article?: IArticle, user?: User): boolean =>
  article?.article_likes?.some((like) => like.userId === user?.id) ?? false
