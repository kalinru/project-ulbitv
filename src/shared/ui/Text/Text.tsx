import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Text.module.scss'
import { memo, type ReactNode } from 'react'

interface TextProps {
  className?: string
  style?: TextStyle
  size?: TextSize
  // header?: HeaderTagType
  element?: keyof JSX.IntrinsicElements
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
  DANGER = 'danger',
  SECONDARY = 'secondary'
}

// type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4'

// const mapSizeToHeaderTag: Record<HeaderTagType, TextSize> = {
//   h4: TextSize.S,
//   h3: TextSize.M,
//   h2: TextSize.L,
//   h1: TextSize.XL
// }

export const Text = memo((props: TextProps) => {
  const {
    className,
    style = TextStyle.DEFAULT,
    size = TextSize.M,
    element: Element = 'span',
    children
  } = props

  // const Element = header ? mapSizeToHeaderTag[header] :

  let mods = {
    [cls[size]]: true,
    [cls[style]]: true
  }

  if (Element) {
    mods = {
      ...mods,
      [cls[Element]]: true
    }
  }

  return (
    <Element className={classNames(cls.Text, mods, [className])}>
      {children}
    </Element>
  )
})

Text.displayName = 'Text'
