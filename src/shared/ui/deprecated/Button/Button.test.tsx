import { render, screen } from '@testing-library/react'

import { Button, ButtonTheme } from './Button'

describe('Button', () => {
  test('simple button', () => {
    render(<Button>Test</Button>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  test('button with theme', () => {
    render(<Button theme={ButtonTheme.CLEAR}>Test</Button>)
    expect(screen.getByText('Test')).toHaveClass('clear')
    screen.debug()
  })
})
