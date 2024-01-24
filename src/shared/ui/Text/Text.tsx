import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Text.module.scss'
import { memo, type ReactNode } from 'react'

interface TextProps {
  className?: string
  fontStyle?: string
  children?: ReactNode
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    fontStyle = '',
    children
  } = props

  const mods = {

  }

  return (
    <span className={classNames(cls.Text, mods, [className, cls[fontStyle]])}>
      {children}
    </span>
  )
})

Text.displayName = 'Text'
