import { memo, type FC, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetails.module.scss'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading
} from '../../model/selectors/articleDetails'
import { useAppSelector } from 'app/providers/StoreProvider/config/store'
import { Text, TextSize, TextStyle } from 'shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { Skeleton } from 'shared/ui/Skeleton'
import { ArticleBlockType, type TArticleBlock } from '../../model/types/article'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import EyeIcon from 'shared/assets/icons/eye-20-20.svg'
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg'
import { Icon } from 'shared/ui/Icon/Icon'
import { ArticleCodeBlock } from '../ArticleCodeBlock/ArticleCodeBlock'
import { ArticleTextBlock } from '../ArticleTextBlock/ArticleTextBlock'
import { ArticleImageBlock } from '../ArticleImageBlock/ArticleImageBlock'

interface ArticleDetailsProps {
  className?: string
  id: string
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer
}

const renderBlock = (block: TArticleBlock) => {
  switch (block.type) {
    case ArticleBlockType.CODE:
      return <ArticleCodeBlock
        key={block.id}
        data={block}
        className={cls.block}
      />
    case ArticleBlockType.TEXT:
      return <ArticleTextBlock
        key={block.id}
        data={block}
        className={cls.block}
      />
    case ArticleBlockType.IMAGE:
      return <ArticleImageBlock
        key={block.id}
        data={block}
        className={cls.block}
      />
    default:
      return null
  }
}

export const ArticleDetails: FC<ArticleDetailsProps> = memo(({ className, id }) => {
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
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
      </>
    )
  } else if (error) {
    content = (
      <Text style={TextStyle.DANGER}>{t('Произошла ошибка при загрузке статьи')}</Text>
    )
  } else {
    content = (<>
      <div className={cls.avatarWrapper}>
        <Avatar
          src={article?.img}
          size={200}
          className={cls.avatar}
          alt={article?.title}
        />
      </div>
      <Text size={TextSize.XL}
            className={cls.title}>
        {article?.title}
      </Text>
      <Text size={TextSize.L}>
        {article?.subtitle}
      </Text>
      <div className={cls.articleInfo}>
        <Icon Svg={EyeIcon}/>
        <Text size={TextSize.S}>
          {article?.views}
        </Text>
      </div>
      <div className={cls.articleInfo}>
        <Icon Svg={CalendarIcon}/>
        <Text size={TextSize.S}>
          {article?.createdAt}
        </Text>
      </div>
      <Text size={TextSize.S}>
        {t('Категория')}: {article?.type}
      </Text>
      <div>
        {article?.blocks.map(renderBlock)}
      </div>
    </>)
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleLoader>
  )
})

ArticleDetails.displayName = 'ArticleDetails'
