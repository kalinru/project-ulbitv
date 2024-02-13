import { type Reducer } from '@reduxjs/toolkit'
import { type ReduxStoreWithManager } from 'app/providers/StoreProvider'
import {
  type StateSchema,
  type StateSchemaKey
} from 'app/providers/StoreProvider/config/StateSchema'
import { type FC, useEffect } from 'react'
import { useDispatch, useStore } from 'react-redux'

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>
}

interface DynamicModuleLoaderProps {
  reducers: ReducersList
  removeAfterUnmount?: boolean
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  const {
    children,
    reducers,
    removeAfterUnmount
  } = props

  const dispatch = useDispatch()
  const store = useStore() as ReduxStoreWithManager

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers()
    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKey]
      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer)
        dispatch({ type: `@INIT ${name} reducer` })
      }
    })

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as StateSchemaKey)
          dispatch({ type: `@DESTROY ${name} reducer` })
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (<>
    {children}
  </>)
}
