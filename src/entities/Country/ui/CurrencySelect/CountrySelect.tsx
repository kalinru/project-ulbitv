import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import { ToggleFeatures } from '@/shared/lib/features'
import { Select as SelectDeprecated } from '@/shared/ui/deprecated/Select'
import { ListBox } from '@/shared/ui/redesigned/Popups'

import { Country } from '../../model/types/country'

interface CountrySelectProps {
  className?: string
  readOnly?: boolean
  value?: string
  onChange?: (value: Country) => void
}

const options = [
  { value: Country.Russian, label: Country.Russian },
  { value: Country.Belarus, label: Country.Belarus },
  { value: Country.USA, label: Country.USA },
]

export const CountrySelect = memo(
  ({ className, readOnly, value, onChange }: CountrySelectProps) => {
    const { t } = useTranslation()

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Country)
      },
      [onChange],
    )

    const props = {
      className,
      value,
      defaultValue: t('Укажите страну'),
      label: t('Укажите страну'),
      items: options,
      onChange: onChangeHandler,
      readOnly,
      direction: 'top right' as const,
    }

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<ListBox {...props} />}
        off={<SelectDeprecated {...props} />}
      />
    )
  },
)

CountrySelect.displayName = 'CountrySelect'
