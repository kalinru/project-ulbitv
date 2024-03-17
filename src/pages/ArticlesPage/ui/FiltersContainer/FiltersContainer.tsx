import { memo, type FC } from 'react'

import { ArticlesFilters } from '@/widgets/ArticlesFilters'

import { useArticleFilters } from '../../lib/hooks/useArticleFilters'

interface FiltersContainerProps {
  className?: string
}

export const FiltersContainer: FC<FiltersContainerProps> = memo(
  ({ className }) => {
    const {
      onChangeOrder,
      onChangeSearch,
      onChangeSort,
      onChangeType,
      order,
      search,
      sort,
      type,
    } = useArticleFilters()

    return (
      <ArticlesFilters
        className={className}
        onChangeOrder={onChangeOrder}
        onChangeSearch={onChangeSearch}
        onChangeSort={onChangeSort}
        onChangeType={onChangeType}
        order={order}
        search={search}
        sort={sort}
        type={type}
      />
    )
  },
)

FiltersContainer.displayName = 'FiltersContainer'
