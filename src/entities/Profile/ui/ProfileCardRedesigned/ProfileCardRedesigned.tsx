import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { CountrySelect } from '@/entities/Country'
import { CurrencySelect } from '@/entities/Currency'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { Card } from '@/shared/ui/redesigned/Card'
import { Input } from '@/shared/ui/redesigned/Input'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'

import { type ProfileCardProps } from '../ProfileCard/ProfileCardProps'

export const ProfileCardRedesignedError = () => {
  const { t } = useTranslation()

  return (
    <HStack justify="center" max>
      <Text style="danger" align="center">
        {t('Произошла ошибка при загрузке профиля')}
      </Text>
    </HStack>
  )
}

export const ProfileCardRedesignedSkeleton = () => {
  return (
    <Card padding="24" max>
      <VStack gap="32">
        <HStack max justify="center">
          <Skeleton border="100%" width={128} height={128} />
        </HStack>
        <HStack gap="32" max>
          <VStack gap="16" max>
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
          </VStack>

          <VStack gap="16" max>
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  )
}

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
  const {
    className,
    data,
    readOnly,
    onChangeFirstName,
    onChangeLastName,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername,
    onChangeCountry,
    onChangeCurrency,
  } = props
  const { t } = useTranslation('profile')

  return (
    <Card padding="24" border="partial" max className={className}>
      <VStack gap="32">
        {data?.avatar && (
          <HStack justify="center" max>
            <Avatar size={128} src={data?.avatar} />
          </HStack>
        )}
        <HStack gap="24" max align="start">
          <VStack gap="16" max>
            <Input
              value={data?.first}
              label={t('Имя')}
              onChange={onChangeFirstName}
              readOnly={readOnly}
              data-testid="ProfileCard.first"
            />
            <Input
              value={data?.lastname}
              label={t('Фамилия')}
              onChange={onChangeLastName}
              readOnly={readOnly}
              data-testid="ProfileCard.lastname"
            />
            <Input
              value={data?.age}
              label={t('Возраст')}
              onChange={onChangeAge}
              readOnly={readOnly}
            />
            <Input
              value={data?.city}
              label={t('Город')}
              onChange={onChangeCity}
              readOnly={readOnly}
            />
          </VStack>
          <VStack gap="16" max>
            <Input
              value={data?.username}
              label={t('Логин')}
              onChange={onChangeUsername}
              readOnly={readOnly}
            />
            <Input
              value={data?.avatar}
              label={t('Аватар')}
              onChange={onChangeAvatar}
              readOnly={readOnly}
            />
            <CurrencySelect
              value={data?.currency}
              onChange={onChangeCurrency}
              readOnly={readOnly}
            />
            <CountrySelect
              value={data?.country}
              onChange={onChangeCountry}
              readOnly={readOnly}
            />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  )
})

ProfileCardRedesigned.displayName = 'ProfileCardRedesigned'
