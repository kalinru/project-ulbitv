import { memo, type FC, useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg'
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'
import { Avatar } from '@/shared/ui/deprecated/Avatar'
import { Icon } from '@/shared/ui/deprecated/Icon'
import { Skeleton } from '@/shared/ui/deprecated/Skeleton'
import { Text, TextSize, TextStyle } from '@/shared/ui/deprecated/Text'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'

import { ArticleBlockType } from '../../model/consts/consts'
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails'
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import { type TArticleBlock } from '../../model/types/article'
import { ArticleCodeBlock } from '../ArticleCodeBlock/ArticleCodeBlock'
import { ArticleImageBlock } from '../ArticleImageBlock/ArticleImageBlock'
import { ArticleTextBlock } from '../ArticleTextBlock/ArticleTextBlock'

import cls from './ArticleDetails.module.scss'

interface ArticleDetailsProps {
  className?: string
  id?: string
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
}

const renderBlock = (block: TArticleBlock) => {
  switch (block.type) {
    case ArticleBlockType.CODE:
      return <ArticleCodeBlock key={block.id} data={block} />
    case ArticleBlockType.TEXT:
      return <ArticleTextBlock key={block.id} data={block} />
    case ArticleBlockType.IMAGE:
      return <ArticleImageBlock key={block.id} data={block} />
    default:
      return null
  }
}

export const ArticleDetails: FC<ArticleDetailsProps> = memo(
  ({ className, id }) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation('article-details')

    const article = useAppSelector(getArticleDetailsData)
    const isLoading = useAppSelector(getArticleDetailsIsLoading)
    const error = useAppSelector(getArticleDetailsError)

    useEffect(() => {
      if (__PROJECT__ !== 'storybook') {
        void dispatch(fetchArticleById(id))
      }
    }, [dispatch, id])

    let content

    if (isLoading) {
      content = (
        <>
          <Skeleton
            className={cls.avatar}
            width={200}
            height={200}
            border="50%"
          />
          <Skeleton width={300} height={32} />
          <Skeleton width={600} height={24} />
          <Skeleton width="100%" height={200} />
          <Skeleton width="100%" height={200} />
        </>
      )
    } else if (error) {
      content = (
        <Text style={TextStyle.DANGER}>
          {t('Произошла ошибка при загрузке статьи')}
        </Text>
      )
    } else {
      content = (
        <>
          <HStack justify="center" max>
            <Avatar
              src={article?.img}
              size={200}
              className={cls.avatar}
              alt={article?.title}
            />
          </HStack>
          <VStack gap="4" max data-testid="ArticleDetails.Info">
            <Text size={TextSize.XL} element="h1">
              {article?.title}
            </Text>
            <Text size={TextSize.L} element="h2">
              {article?.subtitle}
            </Text>
            <HStack gap="4">
              <Icon Svg={EyeIcon} />
              <Text size={TextSize.S}>{article?.views}</Text>
            </HStack>
            <HStack gap="4">
              <Icon Svg={CalendarIcon} />
              <Text size={TextSize.S}>{article?.createdAt}</Text>
            </HStack>
            <Text size={TextSize.S}>
              {t('Категория')}: {article?.type}
            </Text>
          </VStack>
          {article?.blocks?.map(renderBlock)}
        </>
      )
    }

    return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <VStack
          gap="16"
          max
          className={classNames(cls.ArticleDetails, {}, [className])}
        >
          {content}
        </VStack>
      </DynamicModuleLoader>
    )
  },
)

ArticleDetails.displayName = 'ArticleDetails'
