import { useMemo } from 'react'

import { bindActionCreators, createSlice } from '@reduxjs/toolkit'
import { type SliceCaseReducers, type CreateSliceOptions, type Slice } from '@reduxjs/toolkit/dist'
import { useDispatch } from 'react-redux'

export const buildSlice = <State, CaseReducers extends SliceCaseReducers<State>, Name extends string = string>(
  options: CreateSliceOptions<State, CaseReducers, Name>
): Slice<State, CaseReducers, Name> & { useActions: typeof useActions } => {
  const slice = createSlice(options)

  const useActions = (): typeof slice.actions => {
    const dispatch = useDispatch()

    // @ts-expect-error TODO
    return useMemo(() => bindActionCreators(slice.actions, dispatch), [dispatch])
  }

  return {
    ...slice,
    useActions
  }
}

// TODO сделать тоже самое для AsyncThunk. В комментариях к уроку есть примеры https://ulbitv.ru/pl/teach/control/lesson/view?id=261589594
