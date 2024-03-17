import React, {
  memo,
  type InputHTMLAttributes,
  useEffect,
  useState,
  useRef,
  type ReactNode,
} from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import { HStack } from '../Stack'
import { Text } from '../Text'

import cls from './Input.module.scss'

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly' | 'size'
>

type InputSize = 's' | 'm' | 'l'

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string | number
  label?: string
  readOnly?: boolean
  size?: InputSize
  autofocus?: boolean
  addonLeft?: ReactNode
  addonRight?: ReactNode
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
    size = 'm',
    autofocus,
    addonLeft,
    addonRight,
    ...restProps
  } = props
  const ref = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true)
      ref.current?.focus()
    }
  }, [autofocus])

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  const onBlur = () => {
    setIsFocused(false)
  }

  const onFocus = () => {
    setIsFocused(true)
  }

  const mods = {
    [cls.readOnly]: readOnly,
    [cls.focused]: isFocused,
    [cls.withAddonLeft]: Boolean(addonLeft),
    [cls.withAddonRight]: Boolean(addonRight),
  }
  const input = (
    <div className={classNames(cls.InputWrapper, mods, [className, cls[size]])}>
      <div className={cls.addonLeft}>{addonLeft}</div>
      <input
        ref={ref}
        value={value}
        onChange={onChangeHandler}
        onFocus={onFocus}
        onBlur={onBlur}
        type={type}
        className={cls.input}
        readOnly={readOnly}
        {...restProps}
      />
      <div className={cls.addonRight}>{addonRight}</div>
    </div>
  )

  if (label) {
    return (
      <HStack gap="8" max>
        <Text>{label}</Text>
        {input}
      </HStack>
    )
  }

  return input
})

Input.displayName = 'Input'
