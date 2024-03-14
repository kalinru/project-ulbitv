import {
  memo,
  type ButtonHTMLAttributes,
  type FC,
  forwardRef,
  type ForwardedRef,
  type ReactNode,
} from 'react'

import { type Mods, classNames } from '@/shared/lib/classNames/classNames'

import cls from './Button.module.scss'

export type ButtonVariant = 'clear' | 'outline'
export type ButtonColor = 'normal' | 'success' | 'error'
export type ButtonSize = 'm' | 'l' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  /**
   * Тема кнопки. Отвечает за визуал (в рамке, без стилей, противоположный теме приложения цвет и тд)
   */
  variant?: ButtonVariant
  /**
   * Флаг, делающий кнопку квадратной
   */
  square?: boolean
  /**
   * Размер кнопки в соответствии с дизайн системой
   */
  size?: ButtonSize
  /**
   * Флаг, отвечающий за работу кнопки
   */
  disabled?: boolean
  /**
   * Увеличивает кнопку на всю свободную ширину
   */
  fullWidth?: boolean
  color?: ButtonColor
  addonLeft?: ReactNode
  addonRight?: ReactNode
}

export const Button: FC<ButtonProps> = memo(
  forwardRef((props, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
      children,
      className,
      variant = 'outline',
      square = false,
      size = 'm',
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
          cls[variant],
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
