import { Suspense, memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { type AppRoutesProps, routeConfig } from '@/shared/config/routerConfig/routerConfig'
import { PageLoader } from '@/widgets/PageLoader/PageLoader'
import { RequireAuth } from './RequireAuth'

const renderWithWrapper = (route: AppRoutesProps) => {
  const { path, element, roles } = route

  const renderElement = (
    <Suspense fallback={<PageLoader />}>
      {element}
    </Suspense>
  )

  return (
    <Route
      key={path}
      path={path}
      element={route.authOnly ? <RequireAuth roles={roles}>{renderElement}</RequireAuth> : renderElement}
    />
  )
}

const AppRouter = () => {
  return (
    <Routes>
      {Object.values(routeConfig).map(renderWithWrapper)}
    </Routes>
  )
}

export default memo(AppRouter)
