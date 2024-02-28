import { useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getUserAuthData } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button, ButtonTheme } from '@/shared/ui'
import { HStack } from '@/shared/ui/Stack'

import { getProfileData } from '../../model/selectors/getProfileData/getProfileData'
import { getProfileReadOnly } from '../../model/selectors/getProfileReadOnly/getProfileReadOnly'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'
import { profileActions } from '../../model/slice/profileSlice'

import cls from './EditableProfileCardHeader.module.scss'

interface EditableProfileCardHeaderProps {
  className?: string
}

export const EditableProfileCardHeader = ({
  className,
}: EditableProfileCardHeaderProps) => {
  const { t } = useTranslation('profile')
  const readOnly = useSelector(getProfileReadOnly)
  const userAuthData = useSelector(getUserAuthData)
  const profileData = useSelector(getProfileData)
  const dispatch = useAppDispatch()

  const canEdit = String(userAuthData?.id) === String(profileData?.id)

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadOnly(false))
  }, [dispatch])

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit())
  }, [dispatch])

  const onSave = useCallback(() => {
    void dispatch(updateProfileData())
  }, [dispatch])

  return (
    <HStack
      max
      justify="between"
      className={classNames(cls.ProfilePageHeader, {}, [className])}
    >
      <h1>{t('Профиль')}</h1>
      {canEdit && (
        <>
          {readOnly ? (
            <Button
              theme={ButtonTheme.OUTLINE}
              onClick={onEdit}
              data-testid="EditableProfileCardHeader.EditButton"
            >
              {t('Редактировать')}
            </Button>
          ) : (
            <HStack gap="8">
              <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onCancelEdit}
                data-testid="EditableProfileCardHeader.CancelButton"
              >
                {t('Отменить')}
              </Button>
              <Button
                theme={ButtonTheme.OUTLINE}
                className={cls.saveBtn}
                onClick={onSave}
                data-testid="EditableProfileCardHeader.SaveButton"
              >
                {t('Сохранить')}
              </Button>
            </HStack>
          )}
        </>
      )}
    </HStack>
  )
}
