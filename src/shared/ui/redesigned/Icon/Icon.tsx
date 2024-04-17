import { type MouseEvent, memo, type FC } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Icon.module.scss'

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>

interface IconBaseProps extends SvgProps {
  className?: string
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>
}

interface NonClickableIconProps extends IconBaseProps {
  clickable?: false
}

interface ClickableBaseProps extends IconBaseProps {
  clickable: true
  onClick: (event: MouseEvent) => void
}

type IconProps = NonClickableIconProps | ClickableBaseProps

export const Icon: FC<IconProps> = memo((props) => {
  const {
    className,
    Svg,
    height = 32,
    width = 32,
    clickable,
    ...restProps
  } = props

  const icon = (
    <Svg
      className={classNames(cls.Icon, {}, [className])}
      height={height}
      width={width}
      {...restProps}
      onClick={undefined}
    />
  )

  if (clickable) {
    return (
      <button
        type="button"
        className={cls.button}
        onClick={props.onClick}
        style={{ height, width }}
      >
        {icon}
      </button>
    )
  }

  return icon
})

Icon.displayName = 'Icon'
