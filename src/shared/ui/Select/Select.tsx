import { type Mods, classNames } from 'shared/lib/classNames/classNames'
import cls from './Select.module.scss'
import { type ChangeEvent, memo, useMemo } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  className?: string
  label?: string
  readOnly?: boolean
  options?: SelectOption[]
  value?: string
  onChange?: (value: string) => void
}

export const Select = memo(({
  className,
  label,
  readOnly,
  options,
  value,
  onChange
}: SelectProps) => {
  const mods: Mods = {

  }

  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event.target.value)
  }

  const optionsElement = useMemo(() => {
    return options?.map((option) => (
      <option className={cls.option}
              key={option.value}
              value={option.value}>
        {option.label}
      </option>
    ))
  }, [options])

  return (
    <div className={classNames(cls.Wrapper, mods, [className])}>
      {label && (
        <div className={cls.label}>
          {label}
        </div>
      )}
      <select className={cls.select}
              disabled={readOnly}
              value={value}
              onChange={onChangeHandler}>
        {optionsElement}
      </select>
    </div>
  )
})

Select.displayName = 'Select'
