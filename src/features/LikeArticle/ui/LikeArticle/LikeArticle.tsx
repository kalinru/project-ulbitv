import { type MouseEvent, memo, useCallback } from 'react'

import {
  type IArticle,
  getIsLiked,
  getArticleLikesCount,
} from '@/entities/Article'
import { getUserAuthData } from '@/entities/User'
import LikeIcon from '@/shared/assets/icons/like.svg'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'

import { useLike } from '../../model/hooks/useLike'

interface LikeArticleProps {
  className?: string
  article?: IArticle
}

export const LikeArticle = memo((props: LikeArticleProps) => {
  const { className, article } = props
  const user = useAppSelector(getUserAuthData)

  const { doLike, isPending } = useLike(article)

  const onLikeClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault()
      if (!article || isPending) {
        return
      }
      void doLike()
    },
    [article, isPending, doLike],
  )

  return (
    <HStack gap="4" align="start" className={className}>
      <Text>{getArticleLikesCount(article)}</Text>
      <Icon
        clickable
        onClick={onLikeClick}
        Svg={LikeIcon}
        height={20}
        width={20}
        fill={getIsLiked(article, user) ? 'green' : 'white'}
      />
    </HStack>
  )
})

LikeArticle.displayName = 'LikeArticle'
