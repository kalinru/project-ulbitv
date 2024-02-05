import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Text.module.scss'
import { memo, type ReactNode } from 'react'

interface TextProps {
  className?: string
  style?: TextStyle
  size?: TextSize
  children?: ReactNode
}

export enum TextSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl'
}

export enum TextStyle {
  DEFAULT = '',
  DANGER = 'danger'
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    style = TextStyle.DEFAULT,
    size = TextSize.M,
    children
  } = props

  const mods = {
    [cls[size]]: true,
    [cls[style]]: true
  }

  return (
    <span className={classNames(cls.Text, mods, [className])}>
      {children}
    </span>
  )
})

Text.displayName = 'Text'
