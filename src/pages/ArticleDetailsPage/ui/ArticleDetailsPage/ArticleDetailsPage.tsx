import React, { memo, type FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsPage.module.scss'
import { useTranslation } from 'react-i18next'
import { ArticleDetails } from 'entities/Article'
import { useParams } from 'react-router-dom'

interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = memo(({ className }) => {
  const { t } = useTranslation('article-details')
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return (
      <Wrapper className={className}>
        { t('Статья не найдена') }
      </Wrapper>
    )
  }

  return (
    <Wrapper className={className}>
      <ArticleDetails id={id} />
    </Wrapper>
  )
})

const Wrapper: FC<ArticleDetailsPageProps> = ({ children, className }) => {
  return (
    <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      {children}
    </div>
  )
}

ArticleDetailsPage.displayName = 'ArticleDetailsPage'

export default ArticleDetailsPage
