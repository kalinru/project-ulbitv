import { type FC } from 'react'

import { useParams } from 'react-router-dom'

import { EditableProfileCard } from '@/features/editableProfileCard'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Page } from '@/widgets/Page'

interface ProfilePageProps {
  className?: string
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
  const { id: profileId } = useParams<{ id: string }>()

  return (
    <Page className={classNames('', {}, [className])} data-testid="ProfilePage">
      <VStack max gap="16">
        <EditableProfileCard id={profileId} />
      </VStack>
    </Page>
  )
}

export default ProfilePage
