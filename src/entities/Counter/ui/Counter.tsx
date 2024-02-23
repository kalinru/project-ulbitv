import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/shared/ui'
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue'
import { counterActions } from '../model/slice/counterSlice'

export const Counter = () => {
  const dispatch = useDispatch()
  const counterValue = useSelector(getCounterValue)
  const inc = () => {
    dispatch(counterActions.incremented())
  }

  const dec = () => {
    dispatch(counterActions.decremented())
  }

  return (
    <div>
      <h1 data-testid='value'>{counterValue}</h1>
      <Button onClick={inc}
              data-testid='inc'>+</Button>
      <Button onClick={dec}
              data-testid='dec'>-</Button>
    </div>
  )
}
