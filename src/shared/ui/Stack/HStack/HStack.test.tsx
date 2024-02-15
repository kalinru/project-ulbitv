import { render, screen } from '@testing-library/react'
import { HStack } from './HStack'

describe('HStack.test', () => {
  test('default', () => {
    render(<HStack>Test</HStack>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
