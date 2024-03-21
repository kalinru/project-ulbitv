import { memo, type FC } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { ToggleFeatures } from '@/shared/lib/features'
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'

import { type IArticleTextBlock } from '../../model/types/article'

import cls from './ArticleTextBlock.module.scss'

interface ArticleTextBlockProps {
  className?: string
  data: IArticleTextBlock
}

export const ArticleTextBlock: FC<ArticleTextBlockProps> = memo(
  ({ className, data }) => {
    return (
      <div className={classNames(cls.ArticleTextBlock, {}, [className])}>
        {data.title && (
          <ToggleFeatures
            feature="isAppRedesigned"
            on={
              <Text className={cls.title} size="l" element="h3">
                {data.title}
              </Text>
            }
            off={
              <TextDeprecated
                className={cls.title}
                size={TextSize.L}
                element="h3"
              >
                {data.title}
              </TextDeprecated>
            }
          />
        )}
        {data.paragraphs.map((paragraph) => (
          <ToggleFeatures
            key={paragraph}
            feature="isAppRedesigned"
            on={
              <Text className={cls.paragraph} element="p">
                {paragraph}
              </Text>
            }
            off={
              <TextDeprecated className={cls.paragraph} element="p">
                {paragraph}
              </TextDeprecated>
            }
          />
        ))}
      </div>
    )
  },
)

ArticleTextBlock.displayName = 'ArticleTextBlock'
