import { AppRouter } from '@/app/providers/router'
import useTheme from '@/app/providers/ThemeProvider/lib/useTheme'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Navbar } from '@/widgets/Navbar'
import { Sidebar } from '@/widgets/Sidebar'
import { Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUserIninted, userActions } from '@/entities/User'
import { useAppSelector } from './providers/StoreProvider/config/store'

const App = (): JSX.Element => {
  const { theme } = useTheme()

  const dispatch = useDispatch()
  const inited = useAppSelector(getUserIninted)

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback=''>
        <Navbar />
        <div className="content-page">
          <Sidebar />
          { inited && <AppRouter /> }
        </div>
      </Suspense>
    </div>
  )
}

export default App
