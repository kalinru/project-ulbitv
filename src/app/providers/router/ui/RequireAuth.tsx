import { memo, useMemo, type ReactNode } from 'react'

import { Navigate, useLocation } from 'react-router-dom'

import { getUserAuthData, getUserRoles, type UserRole } from '@/entities/User'
import { RoutePath } from '@/shared/consts/router'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'

interface RequireAuthProps {
  children?: ReactNode
  roles?: UserRole[]
}

export const RequireAuth = memo(({ children, roles }: RequireAuthProps) => {
  const auth = useAppSelector(getUserAuthData)
  const location = useLocation()
  const userRoles = useAppSelector(getUserRoles)

  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true
    }

    return roles.some((role) => userRoles?.includes(role))
  }, [roles, userRoles])

  if (!auth) {
    return <Navigate to={RoutePath.main()} state={{ from: location }} replace />
  }

  if (!hasRequiredRoles) {
    return <Navigate to={RoutePath.forbidden()} state={{ from: location }} replace />
  }

  return <>{children}</>
})

RequireAuth.displayName = 'RequireAuth'
