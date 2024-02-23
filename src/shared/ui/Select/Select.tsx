import { type ChangeEvent, useMemo, memo } from 'react'

import { type Mods, classNames } from '@/shared/lib/classNames/classNames'

import cls from './Select.module.scss'

export interface SelectOption<T extends string> {
  value: T
  label: string
}

interface SelectProps<T extends string> {
  className?: string
  label?: string
  readOnly?: boolean
  options?: Array<SelectOption<T>>
  value?: T
  onChange?: (value: T) => void
}

const typedMemo: <T>(c: T) => T = memo

export const Select = typedMemo(<T extends string>({
  className,
  label,
  readOnly,
  options,
  value,
  onChange
}: SelectProps<T>) => {
  const mods: Mods = {

  }

  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event.target.value as T)
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
