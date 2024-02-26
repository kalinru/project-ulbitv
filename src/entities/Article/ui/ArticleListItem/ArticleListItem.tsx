import { memo, type FC, type HTMLAttributeAnchorTarget } from 'react'

import { useTranslation } from 'react-i18next'

import EyeIcon from '@/shared/assets/icons/eye-20-20.svg'
import { RoutePath } from '@/shared/consts/router'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink, Button, ButtonTheme } from '@/shared/ui'
import { AppImage } from '@/shared/ui/AppImage'
import { Avatar } from '@/shared/ui/Avatar'
import { Card } from '@/shared/ui/Card'
import { Icon } from '@/shared/ui/Icon'
import { Skeleton } from '@/shared/ui/Skeleton'
import { Text } from '@/shared/ui/Text'

import {
  ArticleBlockType,
  ArticleView
} from '../../model/consts/consts'
import {
  type IArticleTextBlock,
  type IArticle
} from '../../model/types/article'
import { ArticleTextBlock } from '../ArticleTextBlock/ArticleTextBlock'

import cls from './ArticleListItem.module.scss'

interface ArticleListItemProps {
  className?: string
  article: IArticle
  view: ArticleView
  target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem: FC<ArticleListItemProps> = memo(({
  className,
  article,
  view,
  target = ''
}) => {
  const { t } = useTranslation()

  const types = <Text className={cls.types}>{article.type.join(', ')}</Text>
  const views = (
    <>
      <Text className={cls.views}>{article.views}</Text>
      <Icon Svg={EyeIcon} />
    </>
  )

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      block => block.type === ArticleBlockType.TEXT
    ) as IArticleTextBlock

    return (
      <div
          data-testid="ArticleListItem"
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view]
          ])}
      >
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user?.avatar} />
            <Text className={cls.username}>{article.user?.username}</Text>
            <Text className={cls.createdAt}>{article.createdAt}</Text>
          </div>
          <Text className={cls.title}>{article.title}</Text>
          {types}
          <AppImage fallback={<Skeleton width="100%" height={250} />}
                    src={article.img}
                    className={cls.img}
                    alt={article.title}/>
          {textBlock && (
          <ArticleTextBlock data={textBlock}
                            className={cls.textBlock}/>
          )}
          <div className={cls.footer}>
            {/* <AppLink
                  target={target}
                  to={getRouteArticleDetails(article.id)}
              > */}
            <AppLink to={RoutePath.article_details(article.id)} target={target}>
              <Button theme={ButtonTheme.OUTLINE}>
                {t('Читать далее...')}
              </Button>
            </AppLink>
            {/* </AppLink> */}
            {views}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <AppLink to={RoutePath.article_details(article.id)}
             target={target}
             className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <AppImage fallback={<Skeleton width={200} height={200} />}
                    src={article.img}
                    className={cls.img}
                    alt={article.title}/>
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
})

ArticleListItem.displayName = 'ArticleListItem'
