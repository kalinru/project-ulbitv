import { render, screen } from '@testing-library/react'
import { VStack } from './VStack'

describe('VStack.test', () => {
  test('default', () => {
    render(<VStack>Test</VStack>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
