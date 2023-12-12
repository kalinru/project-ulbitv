import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Input.module.scss'
import React, { memo, type InputHTMLAttributes } from 'react'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string
  label?: string
  onChange?: (value: string) => void
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    label,
    ...restProps
  } = props

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <div className={classNames(cls.Input, {}, [className])}>
      { !!label &&
        <div className={cls.label}>
          {label}
        </div>
      }
      <input value={value}
             onChange={onChangeHandler}
             type={type}
             className={cls.input}
             {...restProps}/>
    </div>

  )
})

Input.displayName = 'Input'
