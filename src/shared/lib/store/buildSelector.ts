import { useSelector } from 'react-redux'

import { type StateSchema } from '@/app/providers/StoreProvider'

type Selector<T> = (state: StateSchema) => T
type Result<T> = [() => T, Selector<T>]

export const buildSelector = <T>(selector: Selector<T>): Result<T> => {
  const useSelectorHook = () => {
    return useSelector(selector)
  }

  return [useSelectorHook, selector]
}

// TODO доделать возможнеость работы с reselect. В комментариях к уроку есть примеры https://ulbitv.ru/pl/teach/control/lesson/view?id=261589594
