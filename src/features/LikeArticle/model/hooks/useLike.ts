import { useCallback, useState } from 'react'

import { type IArticle, getIsLiked } from '@/entities/Article'
import { getUserAuthData } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'

import { dislikeArticle } from '../services/dislikeArticle'
import { likeArticle } from '../services/likeArticle'

export const useLike = (article?: IArticle) => {
  const user = useAppSelector(getUserAuthData)
  const dispatch = useAppDispatch()

  const [isPending, setIsPending] = useState(false)

  const doLike = useCallback(async () => {
    if (!article || !user) {
      return
    }

    setIsPending(true)

    if (getIsLiked(article, user)) {
      const articleLike = article.article_likes?.find(
        (like) => like.userId === user?.id,
      )
      if (articleLike) {
        await dispatch(dislikeArticle(articleLike))
      }
    } else {
      await dispatch(likeArticle({ articleId: article.id, userId: user?.id }))
    }

    setIsPending(false)
  }, [article, user, dispatch])

  return {
    isLiked: getIsLiked(article, user),
    doLike,
    isPending,
  }
}
