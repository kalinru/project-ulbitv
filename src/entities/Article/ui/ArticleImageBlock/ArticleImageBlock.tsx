import { memo, type FC } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text, TextSize } from '@/shared/ui/Text'
import { type IArticleImageBlock } from '../../model/types/article'
import cls from './ArticleImageBlock.module.scss'

interface ArticleImageBlockProps {
  className?: string
  data: IArticleImageBlock
}

export const ArticleImageBlock: FC<ArticleImageBlockProps> = memo(({ className, data }) => {
  return (
    <div className={classNames(cls.ArticleImageBlock, {}, [className])}>
      <img src={data.src} alt={data.title} className={cls.img}/>
      {data.title && (
        <div>
          <Text size={TextSize.S}>{data.title}</Text>
        </div>
      )}
    </div>
  )
})

ArticleImageBlock.displayName = 'ArticleImageBlock'
