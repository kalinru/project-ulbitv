import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderComponent } from 'shared/lib/tests/renderComponent'
import { Counter } from './Counter'

describe('Counter', () => {
  test('render', () => {
    renderComponent(<Counter />, {
      initialState: { counter: { value: 10 } }
    })
    expect(screen.getByTestId('value')).toHaveTextContent('10')
  })

  test('click increment', async () => {
    renderComponent(<Counter />, {
      initialState: { counter: { value: 10 } }
    })
    await userEvent.click(screen.getByTestId('inc'))
    expect(screen.getByTestId('value')).toHaveTextContent('11')
  })

  test('click decrement', async () => {
    renderComponent(<Counter />, {
      initialState: { counter: { value: 10 } }
    })
    await userEvent.click(screen.getByTestId('dec'))
    expect(screen.getByTestId('value')).toHaveTextContent('9')
  })
})
