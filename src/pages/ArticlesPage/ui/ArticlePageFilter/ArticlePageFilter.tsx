import { memo, type FC } from 'react'

import { useTranslation } from 'react-i18next'

import { ArticleSortSelector } from '@/features/ArticleSortSelector'
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs'
import { ArticleViewSelector } from '@/features/ArticleViewSelector'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Card } from '@/shared/ui/deprecated/Card'
import { Input } from '@/shared/ui/deprecated/Input'

import { useArticleFilters } from '../../lib/hooks/useArticleFilters'

import cls from './ArticlePageFilter.module.scss'

interface ArticlePageFilterProps {
  className?: string
}

export const ArticlePageFilter: FC<ArticlePageFilterProps> = memo(
  ({ className }) => {
    const { t } = useTranslation()
    const {
      onChangeOrder,
      onChangeSearch,
      onChangeSort,
      onChangeType,
      onChangeView,
      order,
      search,
      sort,
      type,
      view,
    } = useArticleFilters()

    return (
      <div className={classNames(cls.ArticlePageFilter, {}, [className])}>
        <div className={cls.sortWrapper}>
          <ArticleSortSelector
            order={order}
            sort={sort}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
          />
          <ArticleViewSelector view={view} onViewClick={onChangeView} />
        </div>
        <Card className={cls.search}>
          <Input
            placeholder={t('Поиск')}
            onChange={onChangeSearch}
            value={search}
          />
        </Card>
        <ArticleTypeTabs
          value={type}
          onChangeType={onChangeType}
          className={cls.types}
        />
      </div>
    )
  },
)

ArticlePageFilter.displayName = 'ArticlePageFilter'
