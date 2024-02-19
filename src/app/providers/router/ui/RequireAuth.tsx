import { useAppSelector } from 'app/providers/StoreProvider/config/store'
import { getUserAuthData } from 'entities/User'
import { getUserRoles } from 'entities/User/model/selectors/roleSelectors'
import { type UserRole } from 'entities/User/model/types/user'
import { type FC, memo, useMemo } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { RoutePath } from 'shared/config/routerConfig/routerConfig'

interface RequireAuthProps {
  roles?: UserRole[]
}

export const RequireAuth: FC<RequireAuthProps> = memo(({ children, roles }) => {
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
    return <Navigate to={RoutePath.main} state={{ from: location }} replace />
  }

  if (!hasRequiredRoles) {
    return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />
  }

  return <>{children}</>
})

RequireAuth.displayName = 'RequireAuth'
