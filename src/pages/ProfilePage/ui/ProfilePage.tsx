import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfilePage.module.scss'
import { type FC } from 'react'
import { Page } from 'widgets/Page/Page'
import { VStack } from 'shared/ui/Stack/VStack/VStack'
import { EditableProfileCard } from 'features/editableProfileCard'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Text } from 'shared/ui/Text/Text'

interface ProfilePageProps {
  className?: string
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
  const { t } = useTranslation('profile')
  const { id: profileId } = useParams<{ id: string }>()

  if (!profileId) {
    return <Text>{t('Профиль не найден')}</Text>
  }

  return (
    <Page className={classNames(cls.ProfilePage, {}, [className])}>
      <VStack max gap='16'>
        <EditableProfileCard id={profileId} />
      </VStack>
    </Page>
  )
}

export default ProfilePage
