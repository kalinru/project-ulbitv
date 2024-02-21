import { memo, type FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Icon.module.scss'

interface IconProps {
  className?: string
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>
  inverted?: boolean
}

export const Icon: FC<IconProps> = memo(({ className, Svg, inverted }) => {
  return (
    <Svg className={classNames(cls.Icon, { [cls.inverted]: inverted }, [className])} />
  )
})

Icon.displayName = 'Icon'
