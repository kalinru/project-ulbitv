import { memo, type ReactNode } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Text.module.scss'

interface TextProps {
  className?: string
  style?: TextStyle
  size?: TextSize
  // header?: HeaderTagType
  element?: keyof JSX.IntrinsicElements
  children?: ReactNode

  'data-testid'?: string
}

export enum TextSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

export enum TextStyle {
  DEFAULT = '',
  DANGER = 'danger',
  SECONDARY = 'secondary',
}

// type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4'

// const mapSizeToHeaderTag: Record<HeaderTagType, TextSize> = {
//   h4: TextSize.S,
//   h3: TextSize.M,
//   h2: TextSize.L,
//   h1: TextSize.XL
// }

/**
 * @deprecated
 */
export const Text = memo((props: TextProps) => {
  const {
    className,
    style = TextStyle.DEFAULT,
    size = TextSize.M,
    element: Element = 'span',
    children,
    'data-testid': dataTestId = 'Text',
  } = props

  // const Element = header ? mapSizeToHeaderTag[header] :

  let mods = {
    [cls[size]]: true,
    [cls[style]]: true,
  }

  if (Element) {
    mods = {
      ...mods,
      [cls[Element]]: true,
    }
  }

  return (
    <Element
      className={classNames(cls.Text, mods, [className])}
      data-testid={`${dataTestId}.Text`}
    >
      {children}
    </Element>
  )
})

Text.displayName = 'Text'
