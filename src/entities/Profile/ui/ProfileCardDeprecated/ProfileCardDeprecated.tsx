import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { CountrySelect } from '@/entities/Country'
import { CurrencySelect } from '@/entities/Currency'
import { classNames, type Mods } from '@/shared/lib/classNames/classNames'
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import { Loader } from '@/shared/ui/deprecated/Loader'
import { Text as TextDeprecated, TextStyle } from '@/shared/ui/deprecated/Text'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'

import { type ProfileCardProps } from '../ProfileCard/ProfileCardProps'

import cls from './ProfileCardDeprecated.module.scss'

export const ProfileCardDeprecatedError = () => {
  const { t } = useTranslation()

  return (
    <HStack
      justify="center"
      max
      className={classNames(cls.ProfileCard, {}, [cls.error])}
    >
      <TextDeprecated style={TextStyle.DANGER}>
        {t('Произошла ошибка при загрузке профиля')}
      </TextDeprecated>
    </HStack>
  )
}

export const ProfileCardDeprecatedLoader = () => {
  return (
    <HStack
      justify="center"
      max
      className={classNames(cls.ProfileCard, { [cls.loading]: true })}
    >
      <Loader />
    </HStack>
  )
}

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
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

  const mods: Mods = {
    [cls.editing]: !readOnly,
  }

  return (
    <VStack
      gap="8"
      max
      className={classNames(cls.ProfileCard, mods, [className])}
    >
      {data?.avatar && (
        <HStack justify="center" max className={cls.avatarWrapper}>
          <AvatarDeprecated src={data?.avatar} />
        </HStack>
      )}
      <InputDeprecated
        value={data?.first}
        placeholder={t('Ваше имя')}
        className={cls.input}
        onChange={onChangeFirstName}
        readOnly={readOnly}
        data-testid="ProfileCard.first"
      />
      <InputDeprecated
        value={data?.lastname}
        placeholder={t('Ваша фамилия')}
        className={cls.input}
        onChange={onChangeLastName}
        readOnly={readOnly}
        data-testid="ProfileCard.lastname"
      />
      <InputDeprecated
        value={data?.age}
        placeholder={t('Ваш возраст')}
        className={cls.input}
        onChange={onChangeAge}
        readOnly={readOnly}
      />
      <InputDeprecated
        value={data?.city}
        placeholder={t('Город')}
        className={cls.input}
        onChange={onChangeCity}
        readOnly={readOnly}
      />
      <InputDeprecated
        value={data?.username}
        placeholder={t('Введите имя пользователя')}
        className={cls.input}
        onChange={onChangeUsername}
        readOnly={readOnly}
      />
      <InputDeprecated
        value={data?.avatar}
        placeholder={t('Введите ссылку на аватар')}
        className={cls.input}
        onChange={onChangeAvatar}
        readOnly={readOnly}
      />
      <CurrencySelect
        className={cls.input}
        value={data?.currency}
        onChange={onChangeCurrency}
        readOnly={readOnly}
      />
      <CountrySelect
        className={cls.input}
        value={data?.country}
        onChange={onChangeCountry}
        readOnly={readOnly}
      />
    </VStack>
  )
})

ProfileCardDeprecated.displayName = 'ProfileCardDeprecated'
