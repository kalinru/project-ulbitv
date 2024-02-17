import { useTranslation } from 'react-i18next'
import { Currency } from './../../model/types/currency'
import { memo, useCallback } from 'react'
import { ListBox } from 'shared/ui/ListBox/ListBox'

interface CurrencySelectProps {
  className?: string
  readOnly?: boolean
  value?: string
  onChange?: (value: Currency) => void
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD }
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
    <ListBox value={value}
             onChange={onChangeHandler}
             defaultValue={t('Валюта')}
             readOnly={readOnly}
             className={className}
             direction='top right'
             label={t('Выберите валюту')}
             items={options}/>
  )
  // return (
  //   <Select className={classNames('', {}, [className])}
  //           label={t('Валюта')}
  //           readOnly={readOnly}
  //           value={value}
  //           onChange={onChangeHandler}
  //           options={options}/>
  // )
})

CurrencySelect.displayName = 'CurrencySelect'
