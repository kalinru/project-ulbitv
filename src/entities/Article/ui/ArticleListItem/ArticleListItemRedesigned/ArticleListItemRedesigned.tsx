import { memo, type FC } from 'react'

import { useTranslation } from 'react-i18next'

import EyeIcon from '@/shared/assets/icons/eye.svg'
import { RoutePath } from '@/shared/consts/router'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { Button } from '@/shared/ui/redesigned/Button'
import { Card } from '@/shared/ui/redesigned/Card'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'

import { ArticleBlockType, ArticleView } from '../../../model/consts/consts'
import { type IArticleTextBlock } from '../../../model/types/article'
import { type ArticleListItemProps } from '../ArticleListItemProps'

import cls from './ArticleListItemRedesigned.module.scss'

export const ArticleListItemRedesigned: FC<ArticleListItemProps> = memo(
  ({ className, article, view, target = '' }) => {
    const { t } = useTranslation()

    const types = <Text className={cls.types}>{article.type.join(', ')}</Text>
    const views = (
      <HStack>
        <Text className={cls.views}>{article.views}</Text>
        <Icon Svg={EyeIcon} />
      </HStack>
    )

    if (view === ArticleView.BIG) {
      const textBlock = article.blocks.find(
        (block) => block.type === ArticleBlockType.TEXT,
      ) as IArticleTextBlock

      return (
        <Card
          padding="24"
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view],
          ])}
          data-testid="ArticleListItem"
        >
          <VStack gap="16" max>
            <HStack gap="8" max>
              <Avatar size={30} src={article.user?.avatar} />
              <Text bold>{article.user?.username}</Text>
              <Text>{article.createdAt}</Text>
            </HStack>
            <Text bold size="xl">
              {article.title}
            </Text>
            <Text bold size="l">
              {article.subtitle}
            </Text>
            {types}
            <AppImage
              fallback={<Skeleton width="100%" height={250} />}
              src={article.img}
              className={cls.img}
              alt={article.title}
            />
            {textBlock?.paragraphs && (
              <Text className={cls.textBlock}>
                {textBlock.paragraphs.slice(0, 2).join(' ')}
              </Text>
            )}
            <HStack justify="between" max>
              <AppLink
                to={RoutePath.article_details(article.id)}
                target={target}
              >
                <Button variant="outline">{t('Читать далее...')}</Button>
              </AppLink>
              {views}
            </HStack>
          </VStack>
        </Card>
      )
    }

    return (
      <AppLink
        to={RoutePath.article_details(article.id)}
        target={target}
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
        data-testid="ArticleListItem"
      >
        <Card className={cls.card}>
          <div className={cls.imageWrapper}>
            <AppImage
              fallback={<Skeleton width={200} height={200} />}
              src={article.img}
              className={cls.img}
              alt={article.title}
            />
            <Text className={cls.createdAt}>{article.createdAt}</Text>
          </div>
          <div className={cls.infoWrapper}>
            {types}
            {views}
          </div>
          <Text className={cls.title}>{article.title}</Text>
        </Card>
      </AppLink>
    )
  },
)

ArticleListItemRedesigned.displayName = 'ArticleListItemRedesigned'
