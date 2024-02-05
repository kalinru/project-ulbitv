import { memo, type FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage: FC<ArticlesPageProps> = memo(({ className }) => {
  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
    </div>
  )
})

ArticlesPage.displayName = 'ArticlesPage'

export default ArticlesPage
