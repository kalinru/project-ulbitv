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
  max?: boolean
}

export const Card: FC<CardProps> = memo(({
  className,
  children,
  theme = CardTheme.DEFAULT,
  max,
  ...restProps
}) => {
  return (
    <div className={classNames(cls.Card, { [cls.max]: max }, [className, cls[theme]])} {...restProps}>
      {children}
    </div>
  )
})

Card.displayName = 'Card'
