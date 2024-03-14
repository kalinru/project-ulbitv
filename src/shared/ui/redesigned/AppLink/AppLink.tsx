import { memo, type FC, forwardRef, type ForwardedRef } from 'react'

import { type LinkProps } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './AppLink.module.scss'

export type AppLinkVariant = 'primary' | 'secondary'

interface AppLinkProps extends LinkProps {
  className?: string
  variant?: AppLinkVariant
  activeClassName?: string
}

export const AppLink: FC<AppLinkProps> = memo(
  forwardRef((props, ref: ForwardedRef<HTMLAnchorElement>) => {
    const {
      to,
      className,
      children,
      variant = 'primary',
      activeClassName = '',
      ...restProps
    } = props

    return (
      <NavLink
        ref={ref}
        to={to}
        className={({ isActive }) =>
          classNames(cls.AppLink, { [activeClassName]: isActive }, [
            className,
            cls[variant],
          ])
        }
        {...restProps}
      >
        {children}
      </NavLink>
    )
  }),
)

AppLink.displayName = 'AppLink'
