import { classNames } from 'shared/lib/classNames/classNames'
import { Select } from 'shared/ui/Select/Select'
import { useTranslation } from 'react-i18next'
import { Currency } from './../../model/types/currency'
import { memo, useCallback } from 'react'

interface CurrencySelectProps {
  className?: string
  readOnly?: boolean
  value?: string
  onChange?: (value: Currency) => void
}

const options = [
  { value: Currency.RUB, label: Currency.RUB },
  { value: Currency.EUR, label: Currency.EUR },
  { value: Currency.USD, label: Currency.USD }
]

export const CurrencySelect = memo(({
  className,
  readOnly,
  value,
  onChange
}: CurrencySelectProps) => {
  const { t } = useTranslation()

  const onChangeHandler = useCallback((value) => {
    onChange?.(value as Currency)
  }, [onChange])

  return (
    <Select className={classNames('', {}, [className])}
            label={t('Валюта')}
            readOnly={readOnly}
            value={value}
            onChange={onChangeHandler}
            options={options}/>
  )
})

CurrencySelect.displayName = 'CurrencySelect'
