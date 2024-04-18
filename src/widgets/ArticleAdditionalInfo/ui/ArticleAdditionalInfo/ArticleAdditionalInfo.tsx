import { useTranslation } from 'react-i18next'

import { type User } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { Button } from '@/shared/ui/redesigned/Button'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'

interface ArticleAdditionalInfoProps {
  className?: string
  author?: User
  createdAt: string
  views: number
  canEdit?: boolean
  onEdit: () => void
}

export const ArticleAdditionalInfo = ({
  className,
  author,
  createdAt,
  views,
  canEdit,
  onEdit,
}: ArticleAdditionalInfoProps) => {
  const { t } = useTranslation('article-details')

  return (
    <VStack gap="32" className={classNames('', {}, [className])}>
      <HStack gap="8">
        {author && (
          <>
            <Avatar src={author.avatar} size={32} />
            <Text bold>{author.username}</Text>
          </>
        )}

        <Text>{createdAt}</Text>
      </HStack>
      {canEdit && <Button onClick={onEdit}>{t('Редактировать')}</Button>}
      <Text>{t('{{count}} просмотров', { count: views })}</Text>
    </VStack>
  )
}
