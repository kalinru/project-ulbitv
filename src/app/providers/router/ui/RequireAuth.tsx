import { useAppSelector } from 'app/providers/StoreProvider/config/store'
import { getUserAuthData } from 'entities/User'
import { memo } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { RoutePath } from 'shared/config/routerConfig/routerConfig'

export const RequireAuth = memo(({ children }: { children: JSX.Element }) => {
  const auth = useAppSelector(getUserAuthData)
  const location = useLocation()

  if (!auth) {
    return <Navigate to={RoutePath.main} state={{ from: location }} replace />
  }

  return children
})

RequireAuth.displayName = 'RequireAuth'
