import {
  memo,
  type FC,
  useCallback,
  type HTMLAttributeAnchorTarget,
  cloneElement,
  type ReactElement,
} from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { ToggleFeatures } from '@/shared/lib/features'
import { HStack } from '@/shared/ui/redesigned/Stack'

import { ArticleView } from '../../model/consts/consts'
import { type IArticle } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'

import cls from './ArticleList.module.scss'

interface ArticleListProps {
  className?: string
  articles: IArticle[]
  isLoading?: boolean
  view?: ArticleView
  target?: HTMLAttributeAnchorTarget
  // MAYBE p2 виртуальный списка
  virtualized?: boolean
  Slot?: ReactElement
}

const getSkeletons = (view: ArticleView) => {
  return new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, idx) => (
      <ArticleListItemSkeleton key={idx} view={view} className={cls.card} />
    ))
}

/**
 * TODO сделать виртуальный список используя react-window или react-virtuoso
 * (урок 63 - используется устаревший react-virtualized)
 * там же есть видео реализции на React virtuoso https://1drv.ms/v/s!AsJfm7HR-TbV4xcTzX43JvEBNiS1?e=XDTWDL
 */
export const ArticleList: FC<ArticleListProps> = memo(
  ({
    className,
    articles,
    isLoading,
    view = ArticleView.SMALL,
    target = '',
    virtualized = true,
    Slot,
  }) => {
    const renderArticle = useCallback(
      (article: IArticle) => {
        let slot
        if (Slot) {
          slot = cloneElement(Slot, { article })
        }
        return (
          <ArticleListItem
            article={article}
            view={view}
            className={cls.card}
            target={target}
            key={article.id}
            Slot={slot}
          />
        )
      },
      [Slot, target, view],
    )

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <HStack
            wrap="wrap"
            gap="16"
            className={classNames(cls.ArticleListRedesigned, {}, [])}
            data-testid="ArticleList"
          >
            {articles.length ? articles.map(renderArticle) : null}
            {isLoading && getSkeletons(view)}
          </HStack>
        }
        off={
          <div
            className={classNames(cls.ArticleList, {}, [className, cls[view]])}
            data-testid="ArticleList"
          >
            {articles.length ? articles.map(renderArticle) : null}
            {isLoading && getSkeletons(view)}
          </div>
        }
      />
    )
  },
)

ArticleList.displayName = 'ArticleList'
