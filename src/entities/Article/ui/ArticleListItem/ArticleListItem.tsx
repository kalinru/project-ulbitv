import { memo } from 'react'

import { ToggleFeatures } from '@/shared/lib/features'

import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated'
import { type ArticleListItemProps } from './ArticleListItemProps'
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned'

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<ArticleListItemRedesigned {...props} />}
      off={<ArticleListItemDeprecated {...props} />}
    />
  )
})

ArticleListItem.displayName = 'ArticleListItem'

// TODO p1 FEATURE добавить еще фич, через слоты, не нарушая архитектуру (лайк, поделиться ...)
