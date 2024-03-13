import { memo, type FC, useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import { ArticleSortField } from '@/entities/Article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { type SortOrder } from '@/shared/types/sort'
import { Select, type SelectOption } from '@/shared/ui/deprecated/Select'

import cls from './ArticleSortSelector.module.scss'

interface ArticleSortSelectorProps {
  className?: string
  sort: ArticleSortField
  order: SortOrder
  onChangeOrder: (newOrder: SortOrder) => void
  onChangeSort: (newSort: ArticleSortField) => void
}

export const ArticleSortSelector: FC<ArticleSortSelectorProps> = memo(
  ({ className, sort, order, onChangeOrder, onChangeSort }) => {
    const { t } = useTranslation()

    const sortFieldOptions = useMemo<Array<SelectOption<ArticleSortField>>>(
      () => [
        {
          value: ArticleSortField.CREATED,
          label: t('По дате создания'),
        },
        {
          value: ArticleSortField.TITLE,
          label: t('По названию'),
        },
        {
          value: ArticleSortField.VIEW,
          label: t('По количеству просмотров'),
        },
      ],
      [t],
    )

    const orderOptions = useMemo<Array<SelectOption<SortOrder>>>(
      () => [
        {
          value: 'asc',
          label: t('По возрастанию'),
        },
        {
          value: 'desc',
          label: t('По убыванию'),
        },
      ],
      [t],
    )

    return (
      <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
        <Select
          label={t('Сортировка')}
          options={sortFieldOptions}
          onChange={onChangeSort}
          value={sort}
        />
        <Select
          label={t('Порядок')}
          options={orderOptions}
          onChange={onChangeOrder}
          value={order}
        />
      </div>
    )
  },
)

ArticleSortSelector.displayName = 'ArticleSortSelector'
