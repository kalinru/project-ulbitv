import { memo, type ReactNode } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Text.module.scss'

interface TextProps {
  className?: string
  style?: TextStyle
  size?: TextSize
  align?: TextAlign
  bold?: boolean
  element?: keyof JSX.IntrinsicElements
  children?: ReactNode

  'data-testid'?: string
}

export type TextAlign = 'right' | 'left' | 'center'

export type TextSize = 's' | 'm' | 'l' | 'xl'

export type TextStyle = 'primary' | 'danger' | 'secondary'

// TODO добавить align
export const Text = memo((props: TextProps) => {
  const {
    className,
    style = 'primary',
    size = 'm',
    align = 'left',
    bold,
    element: Element = 'span',
    children,
    'data-testid': dataTestId = 'Text',
  } = props

  return (
    <Element
      className={classNames('', { [cls.bold]: bold }, [
        className,
        cls[size],
        cls[style],
        cls[align],
      ])}
      data-testid={`${dataTestId}.Text`}
    >
      {children}
    </Element>
  )
})

Text.displayName = 'Text'
