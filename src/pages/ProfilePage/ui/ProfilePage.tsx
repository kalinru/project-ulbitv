import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfilePage.module.scss'
import { useTranslation } from 'react-i18next'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
  ProfileCard,
  fetchProfileData,
  getProfileError,
  getProfileForm,
  getProfileIsLoading,
  getProfileReadOnly,
  profileActions,
  profileReducer
} from 'entities/Profile'
import { useCallback, useEffect } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useAppSelector } from 'app/providers/StoreProvider/config/store'
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'
import { type Country } from 'entities/Country/model/types/country'
import { type Currency } from 'entities/Currency/model/types/currency'
const reducers: ReducersList = {
  profile: profileReducer
}

interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const formData = useAppSelector(getProfileForm)
  const error = useAppSelector(getProfileError)
  const isLoading = useAppSelector(getProfileIsLoading)
  const readOnly = useAppSelector(getProfileReadOnly)

  useEffect(() => {
    void dispatch(fetchProfileData())
  }, [dispatch])

  const onChangeFirstName = useCallback((value?: string) => {
    dispatch(profileActions.setProfileForm({ first: value ?? '' }))
  }, [dispatch])

  const onChangeLastName = useCallback((value?: string) => {
    dispatch(profileActions.setProfileForm({ lastname: value ?? '' }))
  }, [dispatch])

  const onChangeAge = useCallback((value?: string) => {
    dispatch(profileActions.setProfileForm({ age: Number(value ?? 0) }))
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
        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
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
