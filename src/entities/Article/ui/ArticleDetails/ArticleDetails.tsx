import { memo, type FC, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg'
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'
import { Avatar } from '@/shared/ui/deprecated/Avatar'
import { Icon } from '@/shared/ui/deprecated/Icon'
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton'
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'

import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails'
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'

import cls from './ArticleDetails.module.scss'
import { renderBlock } from './renderBlock'

interface ArticleDetailsProps {
  className?: string
  id?: string
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
}

const Deprecated = () => {
  const article = useSelector(getArticleDetailsData)
  const { t } = useTranslation('article-details')

  return (
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
        <TextDeprecated size={TextSize.XL} element="h1">
          {article?.title}
        </TextDeprecated>
        <TextDeprecated size={TextSize.L} element="h2">
          {article?.subtitle}
        </TextDeprecated>
        <HStack gap="4">
          <Icon Svg={EyeIcon} />
          <TextDeprecated size={TextSize.S}>{article?.views}</TextDeprecated>
        </HStack>
        <HStack gap="4">
          <Icon Svg={CalendarIcon} />
          <TextDeprecated size={TextSize.S}>
            {article?.createdAt}
          </TextDeprecated>
        </HStack>
        <TextDeprecated size={TextSize.S}>
          {t('Категория')}: {article?.type}
        </TextDeprecated>
      </VStack>
      {article?.blocks?.map(renderBlock)}
    </>
  )
}

const Redesigned = () => {
  const article = useSelector(getArticleDetailsData)

  return (
    <>
      <Text size="l" bold>
        {article?.title}
      </Text>
      <Text>{article?.subtitle}</Text>
      <AppImage
        fallback={
          <SkeletonRedesigned width="100%" height={420} border="16px" />
        }
        src={article?.img}
        className={cls.img}
      />
      {article?.blocks.map(renderBlock)}
    </>
  )
}

export const ArticleDetailsSkeleton = () => {
  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  })
  return (
    <VStack gap="16" max>
      <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
      <Skeleton className={cls.title} width={300} height={32} />
      <Skeleton className={cls.skeleton} width={600} height={24} />
      <Skeleton className={cls.skeleton} width="100%" height={200} />
      <Skeleton className={cls.skeleton} width="100%" height={200} />
    </VStack>
  )
}

export const ArticleDetails: FC<ArticleDetailsProps> = memo(
  ({ className, id }) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation('article-details')
    const isLoading = useAppSelector(getArticleDetailsIsLoading)
    const error = useAppSelector(getArticleDetailsError)

    useEffect(() => {
      if (__PROJECT__ !== 'storybook') {
        void dispatch(fetchArticleById(id))
      }
    }, [dispatch, id])

    let content

    if (isLoading) {
      content = <ArticleDetailsSkeleton />
    } else if (error) {
      content = (
        <Text style="danger">{t('Произошла ошибка при загрузке статьи')}</Text>
      )
    } else {
      content = (
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Redesigned />}
          off={<Deprecated />}
        />
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
