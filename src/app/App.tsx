import { Suspense, memo, useEffect } from 'react'

import { getUserIninted, initAuthData } from '@/entities/User'
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout'
import { MainLayout } from '@/shared/layouts/MainLayout'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ToggleFeatures } from '@/shared/lib/features'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'
import useTheme from '@/shared/lib/hooks/useTheme/useTheme'
import { Navbar } from '@/widgets/Navbar'
import { PageLoader } from '@/widgets/PageLoader'
import { Sidebar } from '@/widgets/Sidebar'

import { useAppToolbar } from './lib/useAppToolbar'
import { AppRouter } from './providers/router'
import { withTheme } from './providers/ThemeProvider/ui/withTheme'

const App = memo((): JSX.Element => {
  const { theme } = useTheme()

  const dispatch = useAppDispatch()
  const inited = useAppSelector(getUserIninted)
  const toolbar = useAppToolbar()

  useEffect(() => {
    if (!inited) {
      void dispatch(initAuthData())
    }
  }, [dispatch, inited])

  if (!inited) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <div id="app" className={classNames('app_redesigned', {}, [theme])}>
            <AppLoaderLayout />
          </div>
        }
        off={<PageLoader />}
      />
    )
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <div id="app" className={classNames('app', {}, [theme])}>
          <Suspense fallback="">
            <Navbar />
            <div className="content-page">
              <Sidebar />
              <AppRouter />
            </div>
          </Suspense>
        </div>
      }
      on={
        <div id="app" className={classNames('app_redesigned', {}, [theme])}>
          <Suspense fallback="">
            <MainLayout
              content={<AppRouter />}
              header={<Navbar />}
              sidebar={<Sidebar />}
              toolbar={toolbar}
            />
          </Suspense>
        </div>
      }
    />
  )
})

App.displayName = 'App'

export default withTheme(App)
