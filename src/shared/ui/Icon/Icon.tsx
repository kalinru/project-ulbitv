import { memo, type FC } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Icon.module.scss'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>
  inverted?: boolean
  primary?: boolean
}

export const Icon: FC<IconProps> = memo(({ className, Svg, inverted, primary, ...restProps }) => {
  return (
    <Svg
      className={classNames(
        cls.Icon, {
          [cls.inverted]: inverted,
          [cls.primary]: primary
        }, [className]
      )}
      {...restProps}/>
  )
})

Icon.displayName = 'Icon'
