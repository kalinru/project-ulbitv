import { useTranslation } from 'react-i18next'
import { type Mods, classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfileCard.module.scss'
import { Loader } from 'shared/ui'
import { Input } from 'shared/ui/Input/Input'
import { type Profile } from '../../model/types/profile'
import { Text, TextStyle } from 'shared/ui/Text/Text'
import { type FC } from 'react'
import { type Country } from 'entities/Country/model/types/country'
import { type Currency } from 'entities/Currency/model/types/currency'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { CurrencySelect } from 'entities/Currency'
import { CountrySelect } from 'entities/Country'
import { HStack, VStack } from 'shared/ui/Stack'

interface ProfileCardProps {
  className?: string
  data?: Profile
  isLoading?: boolean
  error?: string
  readOnly?: boolean
  onChangeFirstName?: (value?: string) => void
  onChangeLastName?: (value?: string) => void
  onChangeCity?: (value?: string) => void
  onChangeAge?: (value?: string) => void
  onChangeUsername?: (value?: string) => void
  onChangeAvatar?: (value?: string) => void
  onChangeCurrency?: (value?: Currency) => void
  onChangeCountry?: (value?: Country) => void
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
  const {
    className,
    data,
    error,
    isLoading,
    readOnly,
    onChangeFirstName,
    onChangeLastName,
    onChangeCity,
    onChangeAge,
    onChangeCountry,
    onChangeUsername,
    onChangeCurrency,
    onChangeAvatar
  } = props
  const { t } = useTranslation('profile')

  if (isLoading) {
    return (
      <HStack justify='center'
              max
              className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
        <Loader />
      </HStack>
    )
  }

  if (error) {
    return (
      <HStack justify='center'
              max
              className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text style={TextStyle.DANGER}>{t('Ошибка')}: {error}</Text>
      </HStack>
    )
  }

  const mods: Mods = {
    [cls.editing]: !readOnly
  }

  return (
    <VStack max gap='8' className={classNames(cls.ProfileCard, mods, [className])}>
      {data?.avatar && (
      <HStack justify='center' max className={cls.avatarWrapper}>
        <Avatar src={data?.avatar}/>
      </HStack>
      )}
      <Input value={data?.first}
             onChange={onChangeFirstName}
             readOnly={readOnly}
             placeholder={t('Ваше имя')}
             className={cls.input}/>
      <Input value={data?.lastname}
             onChange={onChangeLastName}
             placeholder={t('Ваша фамилия')}
             readOnly={readOnly}
             className={cls.input}/>
      <Input value={data?.age}
             onChange={onChangeAge}
             placeholder={t('Возраст')}
             readOnly={readOnly}
             className={cls.input}/>
      <Input value={data?.city}
             onChange={onChangeCity}
             placeholder={t('Город')}
             readOnly={readOnly}
             className={cls.input}/>
      <Input value={data?.username}
             onChange={onChangeUsername}
             placeholder={t('Логин')}
             readOnly={readOnly}
             className={cls.input}/>
      <Input value={data?.avatar}
             onChange={onChangeAvatar}
             placeholder={t('Аватар')}
             readOnly={readOnly}
             className={cls.input}/>
      <CurrencySelect value={data?.currency}
                      readOnly={readOnly}
                      onChange={onChangeCurrency}/>
      <CountrySelect value={data?.country}
                      readOnly={readOnly}
                      onChange={onChangeCountry}/>
    </VStack>
  )
}
