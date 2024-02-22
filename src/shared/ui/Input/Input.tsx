import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Input.module.scss'
import React, { memo, type InputHTMLAttributes } from 'react'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string | number
  label?: string
  readOnly?: boolean
  onChange?: (value: string) => void
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    label,
    readOnly,
    ...restProps
  } = props

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }
  const mods = {
    [cls.readOnly]: readOnly
  }

  return (
    <div className={classNames(cls.Input, mods, [className])}>
      { !!label &&
        <div className={cls.label}>
          {label}
        </div>
      }
      <input value={value}
             onChange={onChangeHandler}
             type={type}
             className={cls.input}
             readOnly={readOnly}
             {...restProps}/>
    </div>

  )
})

Input.displayName = 'Input'
