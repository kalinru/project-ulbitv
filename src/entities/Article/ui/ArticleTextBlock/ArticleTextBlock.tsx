import { memo, type FC } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleTextBlock.module.scss'
import { type IArticleTextBlock } from '../../model/types/article'
import { Text, TextSize } from '@/shared/ui/Text'

interface ArticleTextBlockProps {
  className?: string
  data: IArticleTextBlock
}

export const ArticleTextBlock: FC<ArticleTextBlockProps> = memo(({ className, data }) => {
  return (
    <div className={classNames(cls.ArticleTextBlock, {}, [className])}>
      {data.title && (
        <Text className={cls.title} size={TextSize.L} element='h3'>{data.title}</Text>
      )}
      {data.paragraphs.map((paragraph) => (
        <Text key={paragraph} className={cls.paragraph} element='p'>{paragraph}</Text>
      ))}
    </div>
  )
})

ArticleTextBlock.displayName = 'ArticleTextBlock'
