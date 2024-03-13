import { memo, type FC, forwardRef, type ForwardedRef } from 'react'

import { Link, type LinkProps } from 'react-router-dom'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './AppLink.module.scss'

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string
  theme?: AppLinkTheme
}

export const AppLink: FC<AppLinkProps> = memo(
  forwardRef((props, ref: ForwardedRef<HTMLAnchorElement>) => {
    const {
      to,
      className,
      children,
      theme = AppLinkTheme.PRIMARY,
      ...restProps
    } = props

    return (
      <Link
        ref={ref}
        to={to}
        className={classNames(cls.AppLink, {}, [className, cls[theme]])}
        {...restProps}
      >
        {children}
      </Link>
    )
  }),
)

AppLink.displayName = 'AppLink'
