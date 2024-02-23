import { memo, type FC } from 'react'

import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'

import cls from './ArticleEditPage.module.scss'

interface ArticleEditPageProps {
  className?: string
}

const ArticleEditPage: FC<ArticleEditPageProps> = memo(({ className }) => {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)

  return (
    <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
      {isEdit
        ? t('Редактирование статьи с ID = ') + id
        : t('Создание новой статьи')}
      {/* TODO реализовать редактирование и создание статьи в виджете или фиче */}
    </Page>
  )
})

ArticleEditPage.displayName = 'ArticleEditPage'

export default ArticleEditPage
