import { render, screen } from '@testing-library/react'
import { ListBox } from './ListBox'

describe('ListBox.test', () => {
  test('default', () => {
    render(<ListBox>Test</ListBox>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
