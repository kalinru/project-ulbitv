import { type HTMLAttributeAnchorTarget } from 'react'

import { type ArticleView } from '../../model/consts/consts'
import { type IArticle } from '../../model/types/article'

export interface ArticleListItemProps {
  className?: string
  article: IArticle
  view: ArticleView
  target?: HTMLAttributeAnchorTarget
}
