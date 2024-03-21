import { memo, type FC } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Code } from '@/shared/ui/redesigned/Code'

import { type IArticleCodeBlock } from '../../model/types/article'

import cls from './ArticleCodeBlock.module.scss'

interface ArticleCodeBlockProps {
  className?: string
  data: IArticleCodeBlock
}

export const ArticleCodeBlock: FC<ArticleCodeBlockProps> = memo(
  ({ className, data }) => {
    return (
      <div className={classNames(cls.ArticleCodeBlock, {}, [className])}>
        <Code text={data.code} />
      </div>
    )
  },
)

ArticleCodeBlock.displayName = 'ArticleCodeBlock'
