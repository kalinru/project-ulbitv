import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import { type Country } from '@/entities/Country'
import { type Currency } from '@/entities/Currency'
import { ProfileCard } from '@/entities/Profile'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { toggleFeatures } from '@/shared/lib/features'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Text as TextDeprecated, TextStyle } from '@/shared/ui/deprecated/Text'
import { Card } from '@/shared/ui/redesigned/Card'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'

import { ValidateProfileError } from '../../model/consts/consts'
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError'
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm'
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading'
import { getProfileReadOnly } from '../../model/selectors/getProfileReadOnly/getProfileReadOnly'
import { getProfilevalidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors'
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData'
import { profileActions, profileReducer } from '../../model/slice/profileSlice'
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader'

interface EditableProfileCardProps {
  className?: string
  id?: string
}

const reducers: ReducersList = {
  profile: profileReducer,
}

// MAYBE FEATURE p1: оценка профиля другими пользователями. При оценке, пользоваетль получает уведомление.
export const EditableProfileCard = memo(
  ({ className, id }: EditableProfileCardProps) => {
    const { t } = useTranslation('profile')
    const dispatch = useAppDispatch()

    const formData = useAppSelector(getProfileForm)
    const error = useAppSelector(getProfileError)
    const isLoading = useAppSelector(getProfileIsLoading)
    const readOnly = useAppSelector(getProfileReadOnly)
    const profileValidateErrors = useAppSelector(getProfilevalidateErrors)

    const validateErrorsTranslates = {
      [ValidateProfileError.INCORRECT_USER_DATA]: t(
        'Имя и фамилия обязательны',
      ),
      [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
      [ValidateProfileError.INCORRECT_COUNTRY]: t('Страна обязательна'),
      [ValidateProfileError.NO_DATA]: t('Нет данных'),
      [ValidateProfileError.SERVER_ERROR]: t('Ошибка сервера'),
    }

    useInitialEffect(() => {
      void dispatch(fetchProfileData(id))
    })

    const onChangeFirstName = useCallback(
      (value?: string) => {
        dispatch(profileActions.setProfileForm({ first: value ?? '' }))
      },
      [dispatch],
    )

    const onChangeLastName = useCallback(
      (value?: string) => {
        dispatch(profileActions.setProfileForm({ lastname: value ?? '' }))
      },
      [dispatch],
    )

    const onChangeAge = useCallback(
      (value?: string) => {
        const validatedValue = value?.replace(/\D+/gm, '')
        dispatch(
          profileActions.setProfileForm({ age: Number(validatedValue ?? 0) }),
        )
      },
      [dispatch],
    )

    const onChangeCity = useCallback(
      (value?: string) => {
        dispatch(profileActions.setProfileForm({ city: value ?? '' }))
      },
      [dispatch],
    )

    const onChangeCountry = useCallback(
      (value?: Country) => {
        dispatch(profileActions.setProfileForm({ country: value }))
      },
      [dispatch],
    )

    const onChangeUsername = useCallback(
      (value?: string) => {
        dispatch(profileActions.setProfileForm({ username: value ?? '' }))
      },
      [dispatch],
    )

    const onChangeCurrency = useCallback(
      (value?: Currency) => {
        dispatch(profileActions.setProfileForm({ currency: value }))
      },
      [dispatch],
    )

    const onChangeAvatar = useCallback(
      (value?: string) => {
        dispatch(profileActions.setProfileForm({ avatar: value ?? '' }))
      },
      [dispatch],
    )

    const errors = toggleFeatures({
      name: 'isAppRedesigned',
      off: () => (
        <div style={{ display: 'flex', gap: 10 }}>
          {profileValidateErrors?.map((error) => (
            <TextDeprecated
              key={error}
              style={TextStyle.DANGER}
              data-testid={'EditableProfileCard.Error'}
            >
              {validateErrorsTranslates[error]}
            </TextDeprecated>
          ))}
        </div>
      ),
      on: () => (
        <Card max padding="24">
          <VStack gap="8" max>
            {profileValidateErrors?.map((error) => (
              <Text
                key={error}
                style="danger"
                data-testid={'EditableProfileCard.Error'}
              >
                {validateErrorsTranslates[error]}
              </Text>
            ))}
          </VStack>
        </Card>
      ),
    })

    return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <VStack gap="16" max className={classNames('', {}, [className])}>
          <EditableProfileCardHeader />
          {profileValidateErrors?.length && errors}
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
        </VStack>
      </DynamicModuleLoader>
    )
  },
)

EditableProfileCard.displayName = 'EditableProfileCard'
