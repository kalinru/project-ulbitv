import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfilePage.module.scss'
import { useTranslation } from 'react-i18next'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
  ProfileCard,
  ValidateProfileError,
  fetchProfileData,
  // getProfileError,
  getProfileForm,
  getProfileIsLoading,
  getProfileReadOnly,
  getProfilevalidateErrors,
  profileActions,
  profileReducer
} from 'entities/Profile'
import { type FC, useCallback, useEffect } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useAppSelector } from 'app/providers/StoreProvider/config/store'
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'
import { type Country } from 'entities/Country/model/types/country'
import { type Currency } from 'entities/Currency/model/types/currency'
import { Text, TextStyle } from 'shared/ui/Text/Text'

const reducers: ReducersList = {
  profile: profileReducer
}

interface ProfilePageProps {
  className?: string
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
  const { t } = useTranslation('profile')
  const dispatch = useAppDispatch()

  const formData = useAppSelector(getProfileForm)
  // const error = useAppSelector(getProfileError)
  const isLoading = useAppSelector(getProfileIsLoading)
  const readOnly = useAppSelector(getProfileReadOnly)
  const profileValidateErrors = useAppSelector(getProfilevalidateErrors)

  const validateErrorsTranslates = {
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
    [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Страна обязательна'),
    [ValidateProfileError.NO_DATA]: t('Нет данных'),
    [ValidateProfileError.SERVER_ERROR]: t('Ошибка сервера')
  }

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      void dispatch(fetchProfileData())
    }
  }, [dispatch])

  const onChangeFirstName = useCallback((value?: string) => {
    dispatch(profileActions.setProfileForm({ first: value ?? '' }))
  }, [dispatch])

  const onChangeLastName = useCallback((value?: string) => {
    dispatch(profileActions.setProfileForm({ lastname: value ?? '' }))
  }, [dispatch])

  const onChangeAge = useCallback((value?: string) => {
    const validatedValue = value?.replace(/\D+/gm, '')
    dispatch(profileActions.setProfileForm({ age: Number(validatedValue ?? 0) }))
  }, [dispatch])

  const onChangeCity = useCallback((value?: string) => {
    dispatch(profileActions.setProfileForm({ city: value ?? '' }))
  }, [dispatch])

  const onChangeCountry = useCallback((value?: Country) => {
    dispatch(profileActions.setProfileForm({ country: value }))
  }, [dispatch])

  const onChangeUsername = useCallback((value?: string) => {
    dispatch(profileActions.setProfileForm({ username: value ?? '' }))
  }, [dispatch])

  const onChangeCurrency = useCallback((value?: Currency) => {
    dispatch(profileActions.setProfileForm({ currency: value }))
  }, [dispatch])

  const onChangeAvatar = useCallback((value?: string) => {
    dispatch(profileActions.setProfileForm({ avatar: value ?? '' }))
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ProfilePage, {}, [className])}>
        <ProfilePageHeader/>
        {profileValidateErrors?.length && (
          <div style={{ display: 'flex', gap: 10 }}>
            {profileValidateErrors.map(error => (
              <Text key={error} style={TextStyle.DANGER}>{validateErrorsTranslates[error]}</Text>
            ))}
          </div>
        )}
        <ProfileCard
          data={formData}
          isLoading={isLoading}
          // error={error}
          readOnly={readOnly}
          onChangeFirstName={onChangeFirstName}
          onChangeLastName={onChangeLastName}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangeCountry={onChangeCountry}
          onChangeUsername={onChangeUsername}
          onChangeCurrency={onChangeCurrency}
          onChangeAvatar={onChangeAvatar}
        />
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
