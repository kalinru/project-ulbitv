import { memo, type FC } from 'react'

import { useTranslation } from 'react-i18next'

import { type ArticleSortField, type ArticleType } from '@/entities/Article'
import { ArticleSortSelector } from '@/features/ArticleSortSelector'
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs'
import SearchIcon from '@/shared/assets/icons/search.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { type SortOrder } from '@/shared/types/sort'
import { Card } from '@/shared/ui/redesigned/Card'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { Input } from '@/shared/ui/redesigned/Input'
import { VStack } from '@/shared/ui/redesigned/Stack'

import cls from './ArticlesFilters.module.scss'

interface ArticlesFiltersProps {
  className?: string

  order: SortOrder
  onChangeOrder: (newOrder: SortOrder) => void

  sort: ArticleSortField
  onChangeSort: (newSort: ArticleSortField) => void

  type: ArticleType
  onChangeType: (type: ArticleType) => void

  search?: string | number
  onChangeSearch?: (value: string) => void
}

export const ArticlesFilters: FC<ArticlesFiltersProps> = memo(
  ({
    className,
    order,
    onChangeOrder,
    sort,
    onChangeSort,
    type,
    onChangeType,
    search,
    onChangeSearch,
  }) => {
    const { t } = useTranslation()

    return (
      <Card
        className={classNames(cls.ArticlesFilters, {}, [className])}
        padding="16"
      >
        <VStack gap="32">
          <Input
            placeholder={t('Поиск')}
            onChange={onChangeSearch}
            value={search}
            addonLeft={<Icon Svg={SearchIcon} />}
          />
          <ArticleSortSelector
            order={order}
            sort={sort}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
          />

          <ArticleTypeTabs
            value={type}
            onChangeType={onChangeType}
            className={cls.types}
          />
        </VStack>
      </Card>
    )
  },
)

ArticlesFilters.displayName = 'ArticlesFilters'
