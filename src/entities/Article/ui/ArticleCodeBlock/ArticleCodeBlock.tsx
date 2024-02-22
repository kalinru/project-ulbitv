import { memo, type FC } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleCodeBlock.module.scss'
import { type IArticleCodeBlock } from '../../model/types/article'
import { Code } from '@/shared/ui/Code/Code'

interface ArticleCodeBlockProps {
  className?: string
  data: IArticleCodeBlock
}

export const ArticleCodeBlock: FC<ArticleCodeBlockProps> = memo(({ className, data }) => {
  return (
    <div className={classNames(cls.ArticleCodeBlock, {}, [className])}>
      <Code text={data.code} />
    </div>
  )
})

ArticleCodeBlock.displayName = 'ArticleCodeBlock'
