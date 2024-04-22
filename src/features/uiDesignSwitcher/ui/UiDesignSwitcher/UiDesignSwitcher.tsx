import { memo, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { getUserAuthData } from '@/entities/User'
import { LOCAL_STORAGE_DESIGN_KEY } from '@/shared/consts/localStorage'
import { getFeatureFlag, updateFeatureFlag } from '@/shared/lib/features'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'
import { useForceUpdate } from '@/shared/lib/render/forceUpdate'
import { ListBox } from '@/shared/ui/redesigned/Popups'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'

interface UiDesignSwitcherProps {
  className?: string
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const authData = useAppSelector(getUserAuthData)
  const [isLoading, setIsLoading] = useState(false)
  const forceUpdate = useForceUpdate()

  const isAppRedesigned = getFeatureFlag('isAppRedesigned')

  const items = [
    {
      content: t('Новый'),
      value: 'new',
    },
    {
      content: t('Старый'),
      value: 'old',
    },
  ]

  const onChange = (value: string) => {
    void (async () => {
      if (!authData) {
        return
      }
      setIsLoading(true)
      await dispatch(
        updateFeatureFlag({
          newFeatures: {
            isAppRedesigned: value === 'new',
          },
          userId: authData?.id,
        }),
      )
      localStorage.setItem(LOCAL_STORAGE_DESIGN_KEY, value)
      setIsLoading(false)
      forceUpdate()
    })()
  }

  return (
    <HStack gap="16">
      <Text>{t('Вариант интерфейса')}</Text>
      {isLoading ? (
        <Skeleton width={100} height={40} />
      ) : (
        <ListBox
          onChange={onChange}
          items={items}
          value={isAppRedesigned ? 'new' : 'old'}
          className={className}
        />
      )}
    </HStack>
  )
})

UiDesignSwitcher.displayName = 'UiDesignSwitcher'
