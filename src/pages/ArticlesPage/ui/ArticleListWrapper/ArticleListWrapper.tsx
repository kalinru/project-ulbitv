import { type ReactElement, memo, type FC } from 'react'

import { useTranslation } from 'react-i18next'

import { ArticleList } from '@/entities/Article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'

import {
  getArticlesPageView,
  getArticlesPageIsLoading,
  getArticlesPageError,
} from '../../model/selectors/articlesPageSelectors'
import { getArticles } from '../../model/slices/articlesPageSlice'

interface ArticleListWrapperProps {
  className?: string
  Slot?: ReactElement
}

export const ArticleListWrapper: FC<ArticleListWrapperProps> = memo(
  ({ className, Slot }) => {
    const { t } = useTranslation()

    const view = useAppSelector(getArticlesPageView)
    const isLoading = useAppSelector(getArticlesPageIsLoading)
    const error = useAppSelector(getArticlesPageError)
    const articles = useAppSelector(getArticles.selectAll)

    if (error) {
      return <div>{t('Ошибка при загрузке статей')}</div>
    }

    return (
      <div className={classNames('', {}, [className])}>
        <ArticleList
          className={className}
          articles={articles}
          view={view}
          isLoading={isLoading}
          Slot={Slot}
        />
      </div>
    )
  },
)

ArticleListWrapper.displayName = 'ArticleListWrapper'
