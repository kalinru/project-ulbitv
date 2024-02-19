import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfilePage.module.scss'
import { type FC } from 'react'
import { Page } from 'widgets/Page/Page'
import { VStack } from 'shared/ui/Stack/VStack/VStack'
import { EditableProfileCard } from 'features/editableProfileCard'
import { useParams } from 'react-router-dom'

interface ProfilePageProps {
  className?: string
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
  const { id: profileId } = useParams<{ id: string }>()

  return (
    <Page className={classNames(cls.ProfilePage, {}, [className])}>
      <VStack max gap='16'>
        <EditableProfileCard id={profileId} />
      </VStack>
    </Page>
  )
}

export default ProfilePage
