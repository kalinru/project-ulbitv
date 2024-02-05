import { Suspense, memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { type AppRoutesProps, routeConfig } from 'shared/config/routerConfig/routerConfig'
import { PageLoader } from 'shared/ui/PageLoader/PageLoader'
import { RequireAuth } from './RequireAuth'

const renderWithWrapper = (route: AppRoutesProps) => {
  const { path, element } = route

  const renderElement = (
    <Suspense fallback={<PageLoader />}>
      <div className="page-wrapper">
        {element}
      </div>
    </Suspense>
  )

  return (
    <Route
      key={path}
      path={path}
      element={route.authOnly ? <RequireAuth>{renderElement}</RequireAuth> : renderElement}
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
