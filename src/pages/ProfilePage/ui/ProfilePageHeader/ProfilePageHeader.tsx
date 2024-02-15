import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfilePageHeader.module.scss'
import { Button, ButtonTheme } from 'shared/ui'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  getProfileData,
  getProfileReadOnly,
  profileActions,
  updateProfileData
} from 'entities/Profile'
import { useCallback } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getUserAuthData } from 'entities/User'
import { HStack } from 'shared/ui/Stack/HStack/HStack'

interface ProfilePageHeaderProps {
  className?: string
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
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
    <HStack max justify='between' className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <h1>{t('Профиль123')}</h1>
      {canEdit && (
        <>
          {readOnly
            ? (
              <Button theme={ButtonTheme.OUTLINE}
                      onClick={onEdit}>
                {t('Редактировать')}
              </Button>
              )
            : (
              <HStack gap='8'>
                <Button theme={ButtonTheme.OUTLINE}
                        onClick={onCancelEdit}>
                  {t('Отменить')}
                </Button>
                <Button theme={ButtonTheme.OUTLINE}
                        className={cls.saveBtn}
                        onClick={onSave}>
                  {t('Сохранить')}
                </Button>
              </HStack>
              )
          }
        </>
      )}
    </HStack>
  )
}
