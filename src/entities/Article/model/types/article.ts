import { type User } from '@/entities/User'

import { type ArticleBlockType, type ArticleType } from '../consts/consts'

export interface IArticleBlockBase {
  id: string
  type: ArticleBlockType
}

export interface IArticleTextBlock extends IArticleBlockBase {
  type: ArticleBlockType.TEXT
  title?: string
  paragraphs: string[]
}

export interface IArticleCodeBlock extends IArticleBlockBase {
  type: ArticleBlockType.CODE
  code: string
}

export interface IArticleImageBlock extends IArticleBlockBase {
  type: ArticleBlockType.IMAGE
  title: string
  src: string
}

export type TArticleBlock =
  | IArticleTextBlock
  | IArticleCodeBlock
  | IArticleImageBlock

export interface IArticle {
  user?: User
  id: string
  title: string
  subtitle: string
  img: string
  views: number
  createdAt: string
  userId: string
  type: ArticleType[]
  blocks: TArticleBlock[]
}
