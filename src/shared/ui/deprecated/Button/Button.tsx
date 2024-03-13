import {
  memo,
  type ButtonHTMLAttributes,
  type FC,
  forwardRef,
  type ForwardedRef,
} from 'react'

import { type Mods, classNames } from '@/shared/lib/classNames/classNames'

import cls from './Button.module.scss'

export enum ButtonTheme {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ButtonTheme
  square?: boolean
  size?: ButtonSize
  disabled?: boolean
}

/**
 * @deprecated
 */
export const Button: FC<ButtonProps> = memo(
  forwardRef((props, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
      children,
      className,
      theme = ButtonTheme.CLEAR,
      square = false,
      size = ButtonSize.M,
      disabled = false,
      ...restProps
    } = props

    const mods: Mods = {
      [cls.square]: square,
      [cls.disabled]: disabled,
    }

    return (
      <button
        disabled={disabled}
        className={classNames(cls.Button, mods, [
          className,
          cls[theme],
          cls[size],
        ])}
        {...restProps}
      >
        {children}
      </button>
    )
  }),
)

Button.displayName = 'Button'
