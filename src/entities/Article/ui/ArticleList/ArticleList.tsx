import { memo, type FC, useCallback, type HTMLAttributeAnchorTarget } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleList.module.scss'
import { ArticleView, type IArticle } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'

interface ArticleListProps {
  className?: string
  articles: IArticle[]
  isLoading?: boolean
  view?: ArticleView
  target?: HTMLAttributeAnchorTarget
}

const getSkeletons = (view: ArticleView) => {
  return new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, idx) => (
      <ArticleListItemSkeleton key={idx} view={view} className={cls.card}/>
    ))
}

export const ArticleList: FC<ArticleListProps> = memo(({
  className,
  articles,
  isLoading,
  view = ArticleView.SMALL,
  target = ''
}) => {
  const renderArticle = useCallback((article: IArticle) => {
    return (
      <ArticleListItem article={article}
                       view={view}
                       className={cls.card}
                       target={target}
                       key={article.id}/>
    )
  }, [target, view])

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.length
        ? articles.map(renderArticle)
        : null}
      {isLoading && getSkeletons(view)}
    </div>
  )
})

ArticleList.displayName = 'ArticleList'
