import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Select } from '@/shared/ui/deprecated/Select'

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

    return (
      <Select
        className={classNames('', {}, [className])}
        label={t('Страна')}
        readOnly={readOnly}
        value={value}
        onChange={onChangeHandler}
        options={options}
      />
    )
  },
)

CountrySelect.displayName = 'CountrySelect'
