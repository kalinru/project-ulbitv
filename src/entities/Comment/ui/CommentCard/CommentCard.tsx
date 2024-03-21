import { memo, type FC } from 'react'

import { RoutePath } from '@/shared/consts/router'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features'
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink'
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar'
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton'
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { Card } from '@/shared/ui/redesigned/Card'
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'

import { type IComment } from '../../model/types/comment'

import cls from './CommentCard.module.scss'

interface CommentCardProps {
  className?: string
  comment?: IComment
  isLoading?: boolean
}

export const CommentCard: FC<CommentCardProps> = memo(
  ({ className, comment, isLoading }) => {
    const Skeleton = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => SkeletonRedesigned,
      off: () => SkeletonDeprecated,
    })

    if (isLoading) {
      return (
        <VStack
          gap="8"
          max
          className={classNames(cls.CommentCard, {}, [className, cls.loading])}
          data-testid="CommentCard.Loading"
        >
          <div className={cls.header}>
            <Skeleton width={30} height={30} border="50%" />
            <Skeleton height={16} width={100} className={cls.commentUser} />
          </div>
          <Skeleton width={'100%'} height={40} className={cls.commentText} />
        </VStack>
      )
    }

    if (!comment) {
      return null
    }

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Card fullWidth padding="24" border="partial">
            <VStack
              gap="8"
              max
              className={classNames(cls.CommentCardRedesigned, {}, [className])}
              data-testid="CommentCard.Content"
            >
              <AppLink to={RoutePath.profile(comment.user.id)}>
                <HStack gap="8">
                  {comment.user.avatar && (
                    <Avatar size={20} src={comment.user.avatar} />
                  )}
                  <Text bold>{comment.user.username}</Text>
                </HStack>
              </AppLink>
              <Text>{comment.text}</Text>
            </VStack>
          </Card>
        }
        off={
          <VStack
            gap="8"
            max
            className={classNames(cls.CommentCard, {}, [className])}
            data-testid="CommentCard.Content"
          >
            <AppLinkDeprecated
              to={RoutePath.profile(comment.user.id)}
              className={cls.header}
            >
              {comment.user.avatar && (
                <AvatarDeprecated size={20} src={comment.user.avatar} />
              )}
              <TextDeprecated className={cls.commentUser}>
                {comment.user.username}
              </TextDeprecated>
            </AppLinkDeprecated>
            <div className={cls.commentText}>
              <TextDeprecated>{comment.text}</TextDeprecated>
            </div>
          </VStack>
        }
      />
    )
  },
)

CommentCard.displayName = 'CommentCard'
