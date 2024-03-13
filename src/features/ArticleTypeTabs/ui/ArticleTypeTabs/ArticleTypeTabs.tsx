import { memo, type FC, useCallback, useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import { ArticleType } from '@/entities/Article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { type TabItem, Tabs } from '@/shared/ui/deprecated/Tabs'

interface ArticleTypeTabsProps {
  className?: string
  value: ArticleType
  onChangeType: (type: ArticleType) => void
}

export const ArticleTypeTabs: FC<ArticleTypeTabsProps> = memo(
  ({ className, value, onChangeType }) => {
    const { t } = useTranslation()

    const onTabClick = useCallback(
      (tab: TabItem) => {
        onChangeType(tab.value as ArticleType)
      },
      [onChangeType],
    )

    const typeTabs = useMemo<TabItem[]>(
      () => [
        {
          content: t('Все статьи'),
          value: ArticleType.ALL,
        },
        {
          content: t('Экономика'),
          value: ArticleType.ECONOMICS,
        },
        {
          content: t('IT'),
          value: ArticleType.IT,
        },
        {
          content: t('Наука'),
          value: ArticleType.SCIENCE,
        },
      ],
      [t],
    )

    return (
      <Tabs
        tabs={typeTabs}
        value={value}
        onTabClick={onTabClick}
        className={classNames('', {}, [className])}
      />
    )
  },
)

ArticleTypeTabs.displayName = 'ArticleTypeTabs'
