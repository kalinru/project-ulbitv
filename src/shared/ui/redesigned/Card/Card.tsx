import { memo, type FC, type HTMLAttributes } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Card.module.scss'

export type CardVariant = 'default' | 'outlined' | 'light'
export type CardPadding = '0' | '4' | '8' | '16' | '24' | '32'
export type CardBorder = 'round' | 'normal' | 'partial'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  variant?: CardVariant
  max?: boolean
  padding?: CardPadding
  border?: CardBorder
}

const mapPaddingToClass: Record<CardPadding, string> = {
  '0': 'gap_0',
  '4': 'gap_4',
  '8': 'gap_8',
  '16': 'gap_16',
  '24': 'gap_24',
  '32': 'gap_32',
}

export const Card: FC<CardProps> = memo(
  ({
    className,
    children,
    variant = 'default',
    max,
    padding = '8',
    border = 'normal',
    ...restProps
  }) => {
    return (
      <div
        className={classNames(cls.Card, { [cls.max]: max }, [
          className,
          cls[variant],
          cls[border],
          cls[mapPaddingToClass[padding]],
        ])}
        {...restProps}
      >
        {children}
      </div>
    )
  },
)

Card.displayName = 'Card'
