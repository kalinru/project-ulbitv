import { memo, type FC } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleListWrapper.module.scss'
import { useAppSelector } from '@/app/providers/StoreProvider/config/store'
import { ArticleList } from '@/entities/Article'
import {
  getArticlesPageView,
  getArticlesPageIsLoading,
  getArticlesPageError
} from '../../model/selectors/articlesPageSelectors'
import { getArticles } from '../../model/slices/articlesPageSlice'
import { useTranslation } from 'react-i18next'

interface ArticleListWrapperProps {
  className?: string
}

export const ArticleListWrapper: FC<ArticleListWrapperProps> = memo(({ className }) => {
  const { t } = useTranslation()

  const view = useAppSelector(getArticlesPageView)
  const isLoading = useAppSelector(getArticlesPageIsLoading)
  const error = useAppSelector(getArticlesPageError)
  const articles = useAppSelector(getArticles.selectAll)

  if (error) {
    return <div>{t('Ошибка при загрузке статей')}</div>
  }

  return (
    <div className={classNames(cls.ArticleListWrapper, {}, [className])}>
      <ArticleList className={className}
                   articles={articles}
                   view={view}
                   isLoading={isLoading}/>
    </div>
  )
})

ArticleListWrapper.displayName = 'ArticleListWrapper'
