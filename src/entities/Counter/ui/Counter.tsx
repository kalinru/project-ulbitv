import { Button } from '@/shared/ui'

import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue'
import { useCounterActions } from '../model/slice/counterSlice'

export const Counter = () => {
  const { add, decremented, incremented } = useCounterActions()
  const counterValue = useCounterValue()

  const inc = () => {
    incremented()
  }

  const dec = () => {
    decremented()
  }

  const addFive = () => {
    add(5)
  }

  return (
    <div>
      <h1 data-testid="value">{counterValue}</h1>
      <Button onClick={inc} data-testid="inc">
        +
      </Button>
      <Button onClick={dec} data-testid="dec">
        -
      </Button>
      <Button onClick={addFive} data-testid="inc5">
        +5
      </Button>
    </div>
  )
}
