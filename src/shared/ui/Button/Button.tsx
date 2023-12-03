import { type ButtonHTMLAttributes, type FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export enum ThemeButton {
  CLEAR = 'clear',
  OUTLINE = 'outline',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ThemeButton
}

export const Button: FC<ButtonProps> = (props) => {
  const { children, className, theme, ...restProps } = props

  const themeClass = (theme != null) ? cls[theme] : ''

  return (
    <button
          {...restProps}
          className={classNames(cls.Button, {}, [className, themeClass])}
        >
      { children }
    </button>
  )
}
