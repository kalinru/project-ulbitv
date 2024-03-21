import { memo, type FC } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { ToggleFeatures } from '@/shared/lib/features'
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'

import { type IArticleImageBlock } from '../../model/types/article'

import cls from './ArticleImageBlock.module.scss'

interface ArticleImageBlockProps {
  className?: string
  data: IArticleImageBlock
}

export const ArticleImageBlock: FC<ArticleImageBlockProps> = memo(
  ({ className, data }) => {
    return (
      <div className={classNames(cls.ArticleImageBlock, {}, [className])}>
        <img src={data.src} alt={data.title} className={cls.img} />
        {data.title && (
          <div>
            <ToggleFeatures
              feature="isAppRedesigned"
              on={<Text size="s">{data.title}</Text>}
              off={
                <TextDeprecated size={TextSize.S}>{data.title}</TextDeprecated>
              }
            />
          </div>
        )}
      </div>
    )
  },
)

ArticleImageBlock.displayName = 'ArticleImageBlock'
