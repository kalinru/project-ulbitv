import { type HTMLAttributes, type DetailedHTMLProps, type FC } from 'react'
import { type Mods, classNames } from 'shared/lib/classNames/classNames'
import cls from './Flex.module.scss'

export type FlexJustify = 'start' | 'center' | 'end' | 'between'
export type FlexAlign = 'start' | 'center' | 'end'
export type FlexDirection = 'row' | 'column'
export type FlexGap = '4' | '8' | '16' | '32'

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

// TODO сделать вывод типа исходя из переданного пропса component (общий тип -  HTMLAttributes<HTMLElement>)
export interface FlexProps extends DivProps {
  className?: string
  justify?: FlexJustify
  align?: FlexAlign
  direction?: FlexDirection
  gap?: FlexGap
  max?: boolean
  component?: keyof HTMLElementTagNameMap
}

export const Flex: FC<FlexProps> = ({
  className,
  children,
  justify = 'start',
  align = 'center',
  direction = 'row',
  gap,
  max,
  // TODO реализвать возможность передачи тега, который будет рендерится (какая-то ошибка не дает)
  component,
  ...restProps
}) => {
  const classes = [
    className,
    cls[`justify-${justify}`],
    cls[`align-${align}`],
    cls[`direction-${direction}`],
    gap && cls[`gap-${gap}`]
  ]

  const mods: Mods = {
    [cls.max]: max
  }

  return (
    <div className={classNames(cls.Flex, mods, classes)} {...restProps}>
      {children}
    </div>
  )
}