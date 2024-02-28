import { Suspense, useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { getUserIninted, userActions } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'
import useTheme from '@/shared/lib/hooks/useTheme/useTheme'
import { Navbar } from '@/widgets/Navbar'
import { Sidebar } from '@/widgets/Sidebar'

import { AppRouter } from './providers/router'

const App = (): JSX.Element => {
  const { theme } = useTheme()

  const dispatch = useDispatch()
  const inited = useAppSelector(getUserIninted)

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <Sidebar />
          {inited && <AppRouter />}
        </div>
      </Suspense>
    </div>
  )
}

export default App
