import { memo, type FC, type HTMLAttributes } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Card.module.scss'

export enum CardTheme {
  DEFAULT = 'default',
  OUTLINED = 'outlined'
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  theme?: CardTheme
}

export const Card: FC<CardProps> = memo(({
  className,
  children,
  theme = CardTheme.DEFAULT,
  ...restProps
}) => {
  return (
    <div className={classNames(cls.Card, {}, [className, cls[theme]])} {...restProps}>
      {children}
    </div>
  )
})

Card.displayName = 'Card'
