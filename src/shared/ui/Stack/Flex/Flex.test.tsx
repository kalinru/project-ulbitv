import { render, screen } from '@testing-library/react'

import { Flex } from './Flex'

describe('Flex.test', () => {
  test('default', () => {
    render(<Flex>Test</Flex>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
