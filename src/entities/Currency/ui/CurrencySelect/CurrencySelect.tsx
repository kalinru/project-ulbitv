import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import { ToggleFeatures } from '@/shared/lib/features'
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups'
import { ListBox } from '@/shared/ui/redesigned/Popups'

import { Currency } from './../../model/types/currency'

interface CurrencySelectProps {
  className?: string
  readOnly?: boolean
  value?: string
  onChange?: (value: Currency) => void
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
]

export const CurrencySelect = memo(
  ({ className, readOnly, value, onChange }: CurrencySelectProps) => {
    const { t } = useTranslation()

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Currency)
      },
      [onChange],
    )

    const props = {
      value,
      onChange: onChangeHandler,
      defaultValue: t('Валюта'),
      readOnly,
      className,
      direction: 'top right' as const,
      label: t('Валюта'),
      items: options,
    }

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<ListBox {...props} />}
        off={<ListBoxDeprecated {...props} />}
      />
    )
    // return (
    //   <Select className={classNames('', {}, [className])}
    //           label={t('Валюта')}
    //           readOnly={readOnly}
    //           value={value}
    //           onChange={onChangeHandler}
    //           options={options}/>
    // )
  },
)

CurrencySelect.displayName = 'CurrencySelect'
